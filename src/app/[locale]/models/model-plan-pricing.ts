import { getModelsById } from '@/constants/availableModelInstances'
import type { SubscriptionData, StripePlan, SubscriptionPlan } from '@/types/pricing'
import { calculateCloudCredits } from '@/lib/cloudPricing'

export type PlanSummary = {
  plan: string
  amountUsd: number
  creditsPerMonth: number
  usdPerCredit: number
  costPerGenerationUsd?: number
}

const PLAN_KEYS: SubscriptionPlan[] = ['starter', 'creator', 'pro']

export async function getPricingConfig(): Promise<{
  subscriptionData: SubscriptionData | null
  stripePlan: Record<string, StripePlan> | null
}> {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.opencreator.io'

  try {
    const [templateRes, planRes] = await Promise.all([
      fetch(`${apiUrl}/api/v1/payments/subscription/template`, { cache: 'no-store' }),
      fetch(`${apiUrl}/api/v1/payments/subscription/stripe_plan_config`, {
        cache: 'no-store',
      }),
    ])

    if (!templateRes.ok || !planRes.ok) {
      return { subscriptionData: null, stripePlan: null }
    }

    const [templateJson, planJson] = await Promise.all([templateRes.json(), planRes.json()])

    const subscriptionData = (templateJson.data || templateJson) as SubscriptionData
    const stripePlan = (planJson.data || planJson) as Record<string, StripePlan>

    return { subscriptionData, stripePlan }
  } catch {
    return { subscriptionData: null, stripePlan: null }
  }
}

export function buildPlanSummaries(
  subscriptionData: SubscriptionData | null,
  stripePlan: Record<string, StripePlan> | null,
  modelId: string,
  options?: {
    modelCreditsPerGeneration?: number
    modelKey?: string
  }
): PlanSummary[] {
  const summaries: PlanSummary[] = []

  const modelInfo = options?.modelCreditsPerGeneration !== undefined ? null : getModelsById(modelId)
  const modelKey =
    options?.modelKey ?? ((modelInfo as any)?.model_key as string | undefined) ?? modelId
  const isPerTokenPricing =
    !!modelInfo?.cloudPricing &&
    typeof modelInfo.cloudPricing !== 'number' &&
    modelInfo.cloudPricing.per === 'perToken'
  const cloudPricingCreditsPerGeneration =
    !isPerTokenPricing && modelInfo?.cloudPricing
      ? calculateCloudCredits(modelInfo.cloudPricing)
      : undefined
  const modelCreditsPerGeneration =
    options?.modelCreditsPerGeneration ?? cloudPricingCreditsPerGeneration ?? 0

  // 优先使用新的扁平 stripePlan 结构
  if (stripePlan) {
    PLAN_KEYS.forEach(planKey => {
      // 从 stripePlan 中找到匹配的年付计划
      let planData: {
        amount: string
        subscription_credits: number
        models_off?: Record<string, number>
      } | null = null

      for (const [, item] of Object.entries(stripePlan)) {
        const planItem = item as StripePlan
        if (
          planItem.subscription_key === planKey &&
          planItem.interval === 'yearly' &&
          planItem.status === 'on'
        ) {
          planData = {
            amount: planItem.amount,
            subscription_credits: planItem.subscription_credits,
            models_off: planItem.models_off,
          }
          break
        }
      }

      if (!planData) return

      const yearlyAmountUsd = Number(planData.amount || 0)
      const credits = planData.subscription_credits

      if (!yearlyAmountUsd || !credits) return

      const monthlyAmountUsd = yearlyAmountUsd / 12
      const usdPerCredit = monthlyAmountUsd / credits

      let costPerGenerationUsd =
        !isPerTokenPricing && modelCreditsPerGeneration > 0
          ? modelCreditsPerGeneration * usdPerCredit
          : undefined

      if (costPerGenerationUsd !== undefined && modelKey && planData.models_off) {
        const off = planData.models_off[modelKey]
        if (off && off > 0) {
          costPerGenerationUsd = costPerGenerationUsd * (1 - off / 100)
        }
      }

      summaries.push({
        plan: planKey,
        amountUsd: monthlyAmountUsd,
        creditsPerMonth: credits,
        usdPerCredit,
        costPerGenerationUsd,
      })
    })
    return summaries
  }

  // 回退到旧的 subscriptionData 嵌套结构
  const yearly = subscriptionData?.yearly
  if (!yearly?.plans) return summaries

  PLAN_KEYS.forEach(planKey => {
    const template = (yearly.plans as any)?.[planKey]
    if (!template) return

    const priceItem = template.pricing_items?.[0]
    const yearlyAmountUsd = Number(priceItem?.amount || 0)
    const credits = template.subscription_credits

    if (!yearlyAmountUsd || !credits) return

    const monthlyAmountUsd = yearlyAmountUsd / 12
    const usdPerCredit = monthlyAmountUsd / credits

    let costPerGenerationUsd =
      !isPerTokenPricing && modelCreditsPerGeneration > 0
        ? modelCreditsPerGeneration * usdPerCredit
        : undefined

    if (costPerGenerationUsd !== undefined && modelKey && stripePlan) {
      const priceId = priceItem?.price_id
      const planMeta = priceId ? (stripePlan[priceId] as StripePlan) : undefined
      const off = planMeta?.models_off?.[modelKey]
      if (off && off > 0) {
        costPerGenerationUsd = costPerGenerationUsd * (1 - off / 100)
      }
    }

    summaries.push({
      plan: planKey,
      amountUsd: monthlyAmountUsd,
      creditsPerMonth: credits,
      usdPerCredit,
      costPerGenerationUsd,
    })
  })

  return summaries
}
