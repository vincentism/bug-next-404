import type { Metadata } from 'next'
import React from 'react'
import { LandingNavbar, Hero } from '@/components/landing'
import {
  LazySeeHowItWorks,
  LazyModelShowcase,
  LazyTemplatesCarousel,
  LazyWhyOpenCreator,
  LazyFAQWrapper,
  LazyLandingCTA,
  LazyLandingFooter,
} from '@/components/landing/lazy-sections'
import { JsonLd } from '@/components/seo/json-ld'
import { buildFaqPageSchema, createSchemaGraph, getSiteUrl } from '@/lib/seo/schema'
import PageLoading from '@/components/ui/pageLoading'
import type { FAQItem } from '@/components/landing/faq'
import { getTranslations } from '@/i18n/get-translations'

type LandingPageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.seo' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords') as string[],
    alternates: {
      canonical: locale === 'zh' ? `${getSiteUrl()}/zh` : getSiteUrl(),
    },
  }
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}`

  const tFaq = await getTranslations({ locale, namespace: 'landing.faq' })

  const faqItems: FAQItem[] = Array.from({ length: 8 }).map((_, index) => ({
    question: tFaq(`items.${index}.question`),
    answer: tFaq(`items.${index}.answer`),
  }))

  const homepageSchema = createSchemaGraph([
    {
      '@type': 'Organization',
      '@id': `${siteUrl}#organization`,
      name: 'OpenCreator',
      url: siteUrl,
      logo: `${siteUrl}/og-image.jpg`,
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}#website`,
      url: siteUrl,
      name: 'OpenCreator',
      publisher: {
        '@id': `${siteUrl}#organization`,
      },
    },
    buildFaqPageSchema({
      url: pageUrl,
      name: 'OpenCreator FAQ',
      faqItems: faqItems,
    }),
  ])

  return (
    <React.Suspense fallback={<PageLoading />}>
      <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#F7F7F7]">
        <LandingNavbar />
        <Hero />
        <LazySeeHowItWorks />
        <LazyModelShowcase />
        <LazyTemplatesCarousel />
        <LazyWhyOpenCreator />
        <LazyFAQWrapper items={faqItems} />
        <LazyLandingCTA />
        <LazyLandingFooter />
        <JsonLd id="landing-schema" data={homepageSchema} />
      </div>
    </React.Suspense>
  )
}
