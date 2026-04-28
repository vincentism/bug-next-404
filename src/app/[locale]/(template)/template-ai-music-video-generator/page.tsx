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
import {
  buildFaqPageSchema,
  buildVideoObjectSchema,
  createSchemaGraph,
  getSiteUrl,
} from '@/lib/seo/schema'
import type { FAQItem } from '@/components/landing/faq'
import { getAppUrl } from '@/lib/app-url'

type PageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.aiMusicVideoGenerator.seo' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: (t.raw('keywords') as string[]) || [],
    alternates: {
      canonical:
        locale === 'zh'
          ? `${getSiteUrl()}/zh/template-ai-music-video-generator`
          : `${getSiteUrl()}/template-ai-music-video-generator`,
    },
  }
}

export default async function LyricsToMvLandingPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.aiMusicVideoGenerator' })

  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/template-ai-music-video-generator`

  const faqItems: FAQItem[] = t.raw('faq.items')

  const faqSchema = createSchemaGraph([
    buildFaqPageSchema({
      url: pageUrl,
      name: t('schema.faqPage.name'),
      faqItems,
    }),
    buildVideoObjectSchema({
      url: pageUrl,
      name: t('schema.webPage.name'),
      description: t('schema.webPage.description'),
      thumbnailUrl:
        'https://ik.imagekit.io/opencreator/web/landing/ai-music-video-generator/videos/1.mp4',
    }),
  ])

  const outputVideos = [
    'https://ik.imagekit.io/opencreator/web/landing/ai-music-video-generator/videos/1.mp4',
    'https://ik.imagekit.io/opencreator/web/landing/ai-music-video-generator/videos/2.mp4',
    'https://ik.imagekit.io/opencreator/web/landing/ai-music-video-generator/videos/3.mp4',
  ]

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#F7F7F7]">
      <OffModalTips />
      <LandingNavbar />
      <WorkflowHero
        type="video"
        featureTag={t('hero.featureTag')}
        featureTagColor="pink"
        tags={t.raw('hero.tags')}
        title={t('hero.title')}
        description={t('hero.description')}
        inputTitle={t('hero.inputTitle')}
        inputPlaceholder={t('hero.inputPlaceholder')}
        inputType="text"
        outputVideos={outputVideos}
        ctaText={t('hero.ctaText')}
        ctaLink={getAppUrl('/canvas?shareid=691f3672857c', locale)}
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
      <JsonLd id="lyrics-to-music-video-faq-schema" data={faqSchema} />
    </div>
  )
}
