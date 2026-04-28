import type { Metadata } from 'next'
import React from 'react'
import { getTranslations } from '@/i18n/get-translations'
import {
  LandingNavbar,
  WorkflowHero,
  ModelShowcase,
  TemplatesCarousel,
  WorkflowWhoIsForSection,
  WorkflowHowItWorksSection,
  WhoIsOpenCreator,
  LandingFAQ,
  LandingCTA,
  LandingFooter,
} from '@/components/landing'
import OffModalTips from '@/components/dialog/off_modal_tips'
import { JsonLd } from '@/components/seo/json-ld'
import { buildFaqPageSchema, createSchemaGraph, getSiteUrl } from '@/lib/seo/schema'
import type { FAQItem } from '@/components/landing/faq'
import { getAppUrl } from '@/lib/app-url'

type PageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.aiThumbnailMaker.seo' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: (t.raw('keywords') as string[]) || [],
    alternates: {
      canonical:
        locale === 'zh'
          ? `${getSiteUrl()}/zh/template-ai-thumbnail-maker`
          : `${getSiteUrl()}/template-ai-thumbnail-maker`,
    },
  }
}

export default async function YouTubeThumbnailLandingPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.aiThumbnailMaker' })

  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/template-ai-thumbnail-maker`

  const faqItems: FAQItem[] = t.raw('faq.items')

  const faqSchema = createSchemaGraph([
    buildFaqPageSchema({
      url: pageUrl,
      name: t('schema.faqPage.name'),
      faqItems,
    }),
  ])

  const outputImages = [
    'https://ik.imagekit.io/opencreator/web/landing/ai-thumbnail-maker/images/1.jpg',
    'https://ik.imagekit.io/opencreator/web/landing/ai-thumbnail-maker/images/2.jpg',
    'https://ik.imagekit.io/opencreator/web/landing/ai-thumbnail-maker/images/3.jpg',
  ]

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#F7F7F7]">
      <OffModalTips />
      <LandingNavbar />
      <WorkflowHero
        type="image"
        featureTag={t('hero.featureTag')}
        featureTagColor="blue"
        tags={t.raw('hero.tags')}
        title={t('hero.title')}
        description={t('hero.description')}
        inputTitle={t('hero.inputTitle')}
        inputPlaceholder={t('hero.inputPlaceholder')}
        inputType="text"
        outputImages={outputImages}
        ctaText={t('hero.ctaText')}
        ctaLink={getAppUrl('/canvas?shareid=691f24c7302f', locale)}
      />
      <ModelShowcase />
      <WorkflowHowItWorksSection steps={t.raw('howItWorks.steps')} />
      <WorkflowWhoIsForSection
        title={t('whoIsFor.title')}
        subtitle={t('whoIsFor.subtitle')}
        audiences={t.raw('whoIsFor.audiences')}
      />
      <TemplatesCarousel />
      <WhoIsOpenCreator />
      <LandingFAQ items={faqItems} />
      <LandingCTA />
      <LandingFooter />
      <JsonLd id="ai-youtube-thumbnail-faq-schema" data={faqSchema} />
    </div>
  )
}
