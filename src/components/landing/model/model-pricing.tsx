'use client'

import React from 'react'
import { Link } from '@/i18n/navigation'
import { Play } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { getModelsById } from '@/constants/availableModelInstances'
import { calculateCloudCredits, calculateCloudCreditsRange } from '@/lib/cloudPricing'
import { appExternalAnchorProps } from '@/lib/app-url'

interface ModelPlanSummary {
  plan: string
  label?: string
  amountUsd: number
  creditsPerMonth: number
  usdPerCredit: number
  costPerGenerationUsd?: number
  originalCostPerGenerationUsd?: number
}

// 多档位模型定义
interface ModelTier {
  modelId: string
  label: string // 如 "Standard", "Pro"
}

export interface ModelPricingProps {
  title?: string
  subtitle?: string
  modelId: string // 模型 ID，用于从 availableModelInstances 获取定价
  modelName?: string // 显示名称
  creditsDisplay?: string | number // 覆盖 credits 展示（用于不在 availableModelInstances 中的特殊模型）
  ctaText?: string
  ctaLink?: string
  description?: string
  viewFullPricingText?: string
  note?: string
  planSummaries?: ModelPlanSummary[]
  planSectionTitle?: string
  planCreditsPerMonthLabel?: string
  planPerGenerationLabel?: string
  comingSoon?: boolean // 是否为即将上线的模型
  comingSoonText?: string // "Coming Soon" 文案
  modelTiers?: ModelTier[] // 多档位模型（如 Standard + Pro）
}

export function ModelPricing({
  title,
  subtitle,
  modelId,
  modelName,
  creditsDisplay: creditsDisplayOverride,
  ctaText,
  ctaLink = '/',
  description,
  viewFullPricingText,
  note,
  planSummaries,
  planSectionTitle,
  planCreditsPerMonthLabel,
  planPerGenerationLabel,
  comingSoon = false,
  comingSoonText,
  modelTiers,
}: ModelPricingProps) {
  // 从 availableModelInstances 获取模型定价信息
  const modelData = getModelsById(modelId)
  const getPricingMeta = (data: typeof modelData) => {
    const cloudPricing = data?.cloudPricing
    const tokenPricing =
      cloudPricing && typeof cloudPricing !== 'number' && cloudPricing.per === 'perToken'
        ? cloudPricing
        : undefined
    const isPerToken = !!tokenPricing
    const perTokenInputCredits = tokenPricing
      ? +(tokenPricing.baseCredits.prompt * 1000 * 100).toFixed(2)
      : undefined
    const perTokenOutputCredits = tokenPricing
      ? +(tokenPricing.baseCredits.completion * 1000 * 100).toFixed(2)
      : undefined
    const cloudPricingRange = cloudPricing ? calculateCloudCreditsRange(cloudPricing) : null
    const calculatedCloudCredits =
      cloudPricing && !isPerToken && !cloudPricingRange
        ? calculateCloudCredits(cloudPricing)
        : undefined

    const priceDisplay = isPerToken
      ? `↑${perTokenInputCredits} / ↓${perTokenOutputCredits}`
      : cloudPricingRange
        ? `${cloudPricingRange.min}~${cloudPricingRange.max}`
        : (calculatedCloudCredits ?? data?.credits ?? 0)

    return {
      priceDisplay,
      isPerToken,
    }
  }

  const pricingMeta = getPricingMeta(modelData)
  const isPerTokenPricing = pricingMeta.isPerToken
  const creditsDisplay = creditsDisplayOverride ?? pricingMeta.priceDisplay
  const displayName = modelName || (modelData?.display_name ?? modelData?.name) || modelId
  const modelDescription = modelData?.description || ''
  const finalDescription = description ?? modelDescription

  // 获取折扣信息
  const currentDiscount = (modelData as any)?.model_off as number | undefined
  const upgradeDiscount = (modelData as any)?.model_next_off as number | undefined
  const hasDiscount = currentDiscount !== undefined || upgradeDiscount !== undefined

  // 多档位模型数据
  const tiersData = modelTiers?.map(tier => {
    const data = getModelsById(tier.modelId)
    const tierPricingMeta = getPricingMeta(data)

    return {
      ...tier,
      data,
      priceDisplay: tierPricingMeta.priceDisplay,
      isPerToken: tierPricingMeta.isPerToken,
    }
  })

  const t = useTranslations('landing.pricing')

  const finalTitle = title ?? t('title')
  const finalCtaText = ctaText ?? t('cta')

  const creditsPerMonthLabel = planCreditsPerMonthLabel ?? t('creditsPerMonth')
  const perGenerationLabel = planPerGenerationLabel ?? t('perGeneration')
  const sectionTitle = planSectionTitle ?? t('sectionTitle')
  const creditsLabel = t('creditsLabel')
  const perThousandTokensLabel = t('perThousandTokens')
  const usageBasedLabel = t('usageBased')
  const fullPricingText = viewFullPricingText ?? t('viewFullPricing')
  const noteText = note
  const finalComingSoonText = comingSoonText ?? 'Coming Soon'

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#2563EB]">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-poller-one text-black mb-2">
            {finalTitle}
          </h2>
          {subtitle && <p className="text-sm md:text-base text-white/80">{subtitle}</p>}
        </div>

        {/* Pricing card - 统一设计风格 */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl border-2 border-black p-6 md:p-8 shadow-[0_8px_0_#000]">
            {/* 折扣标签 */}
            {hasDiscount && (
              <div
                className="absolute -top-3 -right-2 z-10 text-black font-bold text-[10px] px-3 py-1 shadow-md whitespace-nowrap text-center rounded-full"
                style={{
                  background: 'linear-gradient(112deg, #F6DD62 5.48%, #FFA040 91.69%)',
                }}
              >
                {currentDiscount != null
                  ? t('badgeCurrent', { discount: currentDiscount })
                  : upgradeDiscount
                    ? t('badgeUpTo', { discount: upgradeDiscount })
                    : null}
              </div>
            )}
            <div className="md:flex md:items-stretch md:gap-10">
              {/* 左侧：基础定价信息 */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-poller-one text-black mb-2">
                  {displayName}
                </h3>
                {finalDescription && (
                  <p className="text-xs md:text-sm text-gray-600 mb-4">{finalDescription}</p>
                )}

                {comingSoon ? (
                  /* Coming Soon 模式 */
                  <div className="mb-4">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-poller-one text-lg md:text-xl rounded-full">
                      {finalComingSoonText}
                    </span>
                  </div>
                ) : tiersData && tiersData.length > 0 ? (
                  /* 多档位定价模式 */
                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-3">
                      {tiersData.map(tier => (
                        <div
                          key={tier.modelId}
                          className="bg-gray-50 rounded-xl p-3 border border-gray-200"
                        >
                          <p className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
                            {tier.label}
                          </p>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl md:text-3xl font-poller-one text-black">
                              {tier.priceDisplay}
                            </span>
                            <span className="text-sm text-gray-600">
                              {tier.isPerToken ? perThousandTokensLabel : creditsLabel}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 mt-3">
                      {tiersData[0]?.isPerToken ? usageBasedLabel : perGenerationLabel}
                    </p>
                  </div>
                ) : (
                  /* 单一定价模式 */
                  <>
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <span className="text-4xl md:text-5xl font-poller-one text-black">
                        {creditsDisplay}
                      </span>
                      <span className="text-lg text-gray-600">
                        {isPerTokenPricing ? perThousandTokensLabel : creditsLabel}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 mb-4">
                      {isPerTokenPricing ? usageBasedLabel : perGenerationLabel}
                    </p>
                  </>
                )}

                {/* 折扣详情 */}
                {hasDiscount && (
                  <div className="mb-4 p-3 bg-[#1fde1f]/10 rounded-xl border border-[#1fde1f]/30">
                    {currentDiscount != null && (
                      <p className="text-xs text-gray-700">
                        {t('discountCurrent', { discount: currentDiscount })}
                      </p>
                    )}
                    {upgradeDiscount && upgradeDiscount !== currentDiscount && (
                      <p className="text-xs text-gray-700 mt-1">
                        {t('discountUpgrade', { discount: upgradeDiscount })}
                      </p>
                    )}
                  </div>
                )}

                {/* CTA */}
                {ctaLink.startsWith('http') ? (
                  <a
                    href={ctaLink}
                    {...appExternalAnchorProps}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-[#1fde1f] font-poller-one font-bold text-sm md:text-base rounded-xl border-2 border-transparent hover:bg-[#1fde1f] hover:text-black hover:border-black hover:border-dashed transition-colors"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{finalCtaText}</span>
                  </a>
                ) : (
                  <Link
                    href={ctaLink}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-[#1fde1f] font-poller-one font-bold text-sm md:text-base rounded-xl border-2 border-transparent hover:bg-[#1fde1f] hover:text-black hover:border-black hover:border-dashed transition-colors"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{finalCtaText}</span>
                  </Link>
                )}
              </div>

              {/* 右侧：订阅方案价格摘要（突出每次生成价格），Coming Soon 模式也可使用 */}
              {planSummaries && planSummaries.length > 0 && (
                <div className="mt-6 md:mt-0 md:w-[60%] border-t md:border-t-0 md:border-l border-dashed border-gray-200 md:pl-6 pt-4 md:pt-0">
                  <p className="text-xs md:text-sm font-semibold text-gray-900 mb-3 md:mb-4">
                    {sectionTitle}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 items-stretch">
                    {planSummaries.map((plan: ModelPlanSummary) => {
                      const defaultLabel = plan.plan.charAt(0).toUpperCase() + plan.plan.slice(1)
                      const planLabel = plan.label ?? defaultLabel

                      return (
                        <div
                          key={plan.plan}
                          className="px-3 py-3 flex flex-col justify-between h-full min-h-[120px] md:min-h-[140px]"
                        >
                          {/* 顶部：Plan 名称 & 月费 */}
                          <div className="flex items-baseline justify-between mb-2">
                            <span className="text-xs md:text-sm font-semibold text-gray-900 uppercase tracking-wide">
                              {planLabel}
                            </span>
                            <span className="text-[11px] md:text-xs text-gray-700">
                              ${plan.amountUsd.toFixed(0)}
                              <span className="text-[10px] text-gray-500">/mo</span>
                            </span>
                          </div>

                          {/* 核心：每次生成价格，作为视觉主角 */}
                          {plan.costPerGenerationUsd !== undefined ? (
                            <p className="text-lg md:text-xl font-poller-one text-[#0a8a0a] mb-1">
                              ${plan.costPerGenerationUsd.toFixed(2)}{' '}
                              <span className="text-[11px] md:text-xs font-normal text-gray-700">
                                {perGenerationLabel}
                              </span>
                            </p>
                          ) : isPerTokenPricing ? (
                            <p className="text-sm md:text-base font-medium text-[#0a8a0a] mb-1">
                              {usageBasedLabel}
                            </p>
                          ) : null}

                          <p className="text-xs text-gray-500 mt-0.5">
                            {plan.creditsPerMonth.toLocaleString()} {creditsPerMonthLabel}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Note */}
        {noteText && (
          <p className="text-center text-xs md:text-sm text-white/70 mt-6">{noteText}</p>
        )}

        {/* Link to full pricing */}
        <div className="text-center mt-6">
          <Link href="/pricing" className="text-sm font-semibold text-white hover:underline">
            {fullPricingText}
          </Link>
        </div>
      </div>
    </section>
  )
}
