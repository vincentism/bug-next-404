import type { Metadata } from 'next'
import React from 'react'
import { LandingNavbar, Hero } from '@/components/landing'
import {
  LazyPositioning,
  LazyFeatures,
  LazyModelsMarquee,
  LazyEndorse,
  LazyVsLedger,
  LazyCommunity,
  LazyCallbackCta,
} from '@/components/landing/lazy-sections'
import { JsonLd } from '@/components/seo/json-ld'
import { createSchemaGraph, getSiteUrl } from '@/lib/seo/schema'
import PageLoading from '@/components/ui/pageLoading'
import { getTranslations } from '@/i18n/get-translations'
import { LandingFooter } from '@/components/landing'
import { CustomCursor } from '@/components/landing/v3/layout/custom-cursor'
import { Grain } from '@/components/landing/v3/layout/grain'
import { LandingV3ClientRuntime } from '@/components/landing/v3/controllers/landing-v3-client-runtime'
import '@/components/landing/v3/styles/landing-v3.css'

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
  await params
  const siteUrl = getSiteUrl()

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
  ])

  return (
    <React.Suspense fallback={<PageLoading />}>
      <div className="landing-v3" data-surface="paper">
        <LandingNavbar />
        <CustomCursor />
        <main id="main">
          <Hero />
          <LazyPositioning />
          <LazyFeatures />
          <LazyModelsMarquee />
          <LazyEndorse />
          <LazyVsLedger />
          <LazyCommunity />
          <LazyCallbackCta />
          <LandingFooter />
        </main>
        <LandingV3ClientRuntime />
        <Grain />
        <JsonLd id="landing-schema" data={homepageSchema} />
      </div>
    </React.Suspense>
  )
}
