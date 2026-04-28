'use client'

import React from 'react'
import { useLocale } from 'next-intl'
import { SubscriptionTemplateData } from '@/types/pricing'
import { appExternalAnchorProps, getAppUrl } from '@/lib/app-url'

type PricingVariantSwitcherProps = {
  pricingTemplate?: SubscriptionTemplateData | null
}

type PlanKey = 'starter' | 'creator' | 'pro'

const fallbackPlans: Record<
  PlanKey,
  {
    price: number
    credits: string
    features: string[]
    highlighted?: boolean
  }
> = {
  starter: {
    price: 19,
    credits: '2,000 credits / month',
    features: ['Starter workflow credits', 'Commercial usage', 'Email support'],
  },
  creator: {
    price: 39,
    credits: '6,000 credits / month',
    highlighted: true,
    features: ['More generation credits', 'Advanced AI models', 'Unlimited workflows'],
  },
  pro: {
    price: 99,
    credits: '20,000 credits / month',
    features: ['Lowest cost per credit', 'Priority feature requests', 'Workflow tuning support'],
  },
}

const copy = {
  en: {
    title: 'Choose a plan for your AI content workflow',
    subtitle:
      'Pricing is managed in the OpenCreator app. Compare the headline plans here, then continue to checkout or account management on app.opencreator.io.',
    yearly: 'Yearly plan',
    perMonth: '/month',
    getStarted: 'Continue in app',
    starter: 'Starter',
    creator: 'Creator',
    pro: 'Pro',
    popular: 'Most popular',
  },
  zh: {
    title: '为你的 AI 内容工作流选择套餐',
    subtitle:
      '订阅和支付已迁移到 OpenCreator App。你可以先在官网了解核心套餐，再前往 app.opencreator.io 继续购买或管理账户。',
    yearly: '年付套餐',
    perMonth: '/月',
    getStarted: '前往 App',
    starter: '入门版',
    creator: '创作者版',
    pro: '专业版',
    popular: '热门选择',
  },
} as const

function formatPrice(amount?: string) {
  const numericAmount = Number(amount)
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) return null

  const dollars = numericAmount > 100 ? numericAmount / 100 : numericAmount
  return Math.round(dollars).toString()
}

function getPlanPrice(pricingTemplate: SubscriptionTemplateData | null | undefined, plan: PlanKey) {
  const priceItems = pricingTemplate?.yearly?.[plan]?.pricing_items ?? []
  const firstPrice = priceItems[0]
  return formatPrice(firstPrice?.amount) ?? fallbackPlans[plan].price.toString()
}

function getPlanCredits(pricingTemplate: SubscriptionTemplateData | null | undefined, plan: PlanKey) {
  const priceItems = pricingTemplate?.yearly?.[plan]?.pricing_items ?? []
  const credits = priceItems[0]?.monthly_credits
  if (!credits) return fallbackPlans[plan].credits

  return `${credits.toLocaleString()} credits / month`
}

export default function PricingVariantSwitcher({ pricingTemplate }: PricingVariantSwitcherProps) {
  const locale = useLocale()
  const t = locale === 'zh' ? copy.zh : copy.en
  const appPricingUrl = getAppUrl('/pricing', locale)
  const planOrder: PlanKey[] = ['starter', 'creator', 'pro']

  return (
    <section className="w-full">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="mb-3 inline-flex rounded-full border border-black bg-[#1fde1f] px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-black">
          {t.yearly}
        </p>
        <h1 className="font-poller-one text-4xl leading-tight text-black md:text-6xl">{t.title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">{t.subtitle}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {planOrder.map(plan => {
          const planCopy = fallbackPlans[plan]
          const isHighlighted = planCopy.highlighted

          return (
            <article
              key={plan}
              className={`relative flex min-h-[420px] flex-col rounded-3xl border-2 border-black bg-white p-6 shadow-[0_14px_0_#000] ${
                isHighlighted ? 'md:-translate-y-3 bg-[#f7fff2]' : ''
              }`}
            >
              {isHighlighted && (
                <span className="absolute right-5 top-5 rounded-full bg-black px-3 py-1 text-xs font-bold text-[#1fde1f]">
                  {t.popular}
                </span>
              )}
              <h2 className="font-poller-one text-3xl text-black">{t[plan]}</h2>
              <div className="mt-6 flex items-end gap-1">
                <span className="text-5xl font-black text-black">${getPlanPrice(pricingTemplate, plan)}</span>
                <span className="pb-2 text-sm font-semibold text-gray-500">{t.perMonth}</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-gray-700">
                {getPlanCredits(pricingTemplate, plan)}
              </p>
              <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm text-gray-700">
                {planCopy.features.map(feature => (
                  <li key={feature} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#1fde1f] ring-1 ring-black" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={appPricingUrl}
                {...appExternalAnchorProps}
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full border-2 border-black bg-black px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_#1fde1f]"
              >
                {t.getStarted}
              </a>
            </article>
          )
        })}
      </div>
    </section>
  )
}
