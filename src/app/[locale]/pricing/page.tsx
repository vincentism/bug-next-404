import type { Metadata } from 'next'
import React from 'react'
import {
  LandingNavbar,
  ModelShowcase,
  LandingFAQ,
  LandingCTA,
  LandingFooter,
} from '@/components/landing'
import PricingVariantSwitcher from '@/components/landing/pricing-variant-switcher'
import { JsonLd } from '@/components/seo/json-ld'
import { buildFaqPageSchema, createSchemaGraph, getSiteUrl } from '@/lib/seo/schema'
import { SubscriptionData, StripePlan, SubscriptionTemplateData } from '@/types/pricing'
import type { FAQItem } from '@/components/landing/faq'
import { getTranslations } from '@/i18n/get-translations'

const defaultFAQItems: FAQItem[] = [
  {
    question: 'What can I do if I run out of credits?',
    answer:
      'If you exceed your credit limit, you have a few options: upgrade to a higher-tier plan with more credits, purchase additional credits to supplement your current plan, or use your monthly free credits, which refresh automatically every month.',
  },
  {
    question: 'What happens when I upgrade my plan?',
    answer:
      'When you upgrade, all benefits and credits from your new plan are unlocked immediately. Any unused credits from your previous plan will be prorated and automatically applied toward your next payment.',
  },
  {
    question: 'How can I get more credits?',
    answer:
      "Additional credits can be purchased through the Buy More Credits page (available to all users on Creator or higher plans). These credits act as a backup and activate only when your plan's monthly allocation is used up.",
  },
  {
    question: 'Can I change my subscription plan?',
    answer:
      'Yes. Both Monthly and Yearly users can update their subscription plan anytime. Yearly plans are eligible for prorated refunds based on remaining credits.',
  },
  {
    question: 'Can unused credits roll over to next month?',
    answer:
      "No, credits reset at the start of each billing cycle. Any unused credits from the previous month won't carry over, ensuring every user begins each month with a full allocation.",
  },
  {
    question: 'What is the refund policy?',
    answer:
      'Yearly plan subscribers are eligible for a 100% no-questions-asked refund. Please email support@opencreator.io with your account email and order details.',
  },
  {
    question: 'Where is user data stored?',
    answer:
      'User data is securely stored in US data centers that comply with the highest standards of security and privacy. We are committed to protecting your information and ensuring that it is handled with the utmost care.',
  },
  {
    question: 'Who should I contact if I have a question?',
    answer:
      'If you have any questions or suggestions, feel free to reach out at support@opencreator.io. To learn more about OpenCreator, visit our Discord community for comprehensive guides, fun content, FAQs, and resources to enhance your experience.',
  },
]

export const metadata: Metadata = {
  title: 'OpenCreator Pricing & Plans',
  description:
    'Compare OpenCreator pricing plans and choose the right amount of AI video and image generation credits for your content workflow.',
  keywords: [
    'OpenCreator pricing',
    'OpenCreator plans',
    'AI tool pricing',
    'AI video generator pricing',
    'AI image generator credits',
    'subscription plans',
    'creator pricing',
  ],
}

type PricingPageProps = {
  // In Next.js 15, dynamic route params are provided as a Promise
  params: Promise<{ locale: string }>
}

async function getPricingConfig(): Promise<{
  subscriptionData: SubscriptionData | null
  stripePlan: Record<string, StripePlan> | null
  pricingTemplate: SubscriptionTemplateData | null
}> {
  const siteUrl = getSiteUrl()

  try {
    const [templateRes, planRes] = await Promise.all([
      fetch(`${siteUrl}/api/v1/payments/subscription/template`, { cache: 'no-store' }),
      fetch(`${siteUrl}/api/v1/payments/subscription/stripe_plan_config`, {
        cache: 'no-store',
      }),
    ])

    if (!templateRes.ok || !planRes.ok) {
      return { subscriptionData: null, stripePlan: null, pricingTemplate: null }
    }

    const [templateJson, planJson] = await Promise.all([templateRes.json(), planRes.json()])
    const subscriptionData = templateJson as SubscriptionData
    const stripePlan = planJson as Record<string, StripePlan>
    const pricingTemplate = subscriptionData as unknown as SubscriptionTemplateData

    return { subscriptionData, stripePlan, pricingTemplate }
  } catch {
    return { subscriptionData: null, stripePlan: null, pricingTemplate: null }
  }
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/pricing`

  const [t, { pricingTemplate }] = await Promise.all([
    getTranslations('upgrade'),
    getPricingConfig(),
  ])

  // Build translated FAQ items
  const translatedFAQItems: FAQItem[] = [
    { question: t('faqs.q4'), answer: t('faqs.a4') },
    { question: t('faqs.q5'), answer: t('faqs.a5') },
    { question: t('faqs.q1'), answer: t('faqs.a1') },
    { question: t('faqs.q2'), answer: t('faqs.a2') },
    { question: t('faqs.q6'), answer: t('faqs.a6') },
    { question: t('faqs.q3'), answer: t('faqs.a3') },
  ]

  const faqSchema = createSchemaGraph([
    buildFaqPageSchema({
      url: pageUrl,
      name: 'OpenCreator Pricing FAQ',
      faqItems: defaultFAQItems, // Keep English for SEO schema
    }),
  ])

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#F7F7F7]">
      <LandingNavbar />
      <div className="bg-white py-12 md:py-16 lg:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <PricingVariantSwitcher pricingTemplate={pricingTemplate} />
        </div>
      </div>
      <ModelShowcase />
      <LandingFAQ items={translatedFAQItems} />
      <LandingCTA />
      <LandingFooter />
      <JsonLd id="pricing-faq-schema" data={faqSchema} />
    </div>
  )
}
