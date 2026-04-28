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
  buildSoftwareApplicationSchema,
  buildVideoObjectSchema,
  buildWebPageSchema,
  createSchemaGraph,
  getSiteUrl,
} from '@/lib/seo/schema'
import type { FAQItem } from '@/components/landing/faq'
import { getAppUrl } from '@/lib/app-url'

const OUTPUT_IMAGE =
  'https://ik.imagekit.io/opencreator/web/xm/0115/pasted-image-2026-01-14T16-50-23-381Z.png'
const OUTPUT_VIDEO = 'https://ik.imagekit.io/opencreator/web/xm/0115/train background.mp4'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: 'templates.aiInfluencerHyperRealLifestyleStudio.seo',
  })
  const canonical =
    locale === 'zh'
      ? `${getSiteUrl()}/zh/template-ai-influencer-hyper-real-lifestyle-studio`
      : `${getSiteUrl()}/template-ai-influencer-hyper-real-lifestyle-studio`
  return {
    title: t('title'),
    description: t('description'),
    keywords: (t.raw('keywords') as string[]) || [],
    alternates: {
      canonical,
    },
  }
}

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function AIInfluencerHyperRealLifestyleStudioLandingPage({
  params,
}: PageProps) {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: 'templates.aiInfluencerHyperRealLifestyleStudio',
  })
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/template-ai-influencer-hyper-real-lifestyle-studio`

  const outputImages = [OUTPUT_IMAGE]
  const outputVideos = [OUTPUT_VIDEO]

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#F7F7F7]">
      <OffModalTips />
      <LandingNavbar />
      <WorkflowHero
        type="video"
        layout="classic"
        featureTag={t('hero.featureTag')}
        featureTagColor="pink"
        tags={t.raw('hero.tags')}
        title={t('hero.title')}
        description={t('hero.description')}
        inputPlaceholder={t('hero.inputPlaceholder')}
        inputType="text"
        outputImages={outputImages}
        outputVideos={outputVideos}
        outputImageAlts={[t('hero.outputImageAlt')]}
        ctaText={t('hero.ctaText')}
        ctaLink={getAppUrl('/canvas?shareid=6967c97776d3', locale)}
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
      <LandingFAQ items={t.raw('faq.items') as FAQItem[]} />
      <LandingCTA />
      <LandingFooter />
      <JsonLd
        id="ai-influencer-hyper-real-lifestyle-studio-schema"
        data={createSchemaGraph([
          buildWebPageSchema({
            url: pageUrl,
            name: t('schema.webPage.name'),
            description: t('schema.webPage.description'),
          }),
          buildSoftwareApplicationSchema({
            url: pageUrl,
            name: t('schema.softwareApplication.name'),
            description: t('schema.softwareApplication.description'),
            applicationCategory: 'MultimediaApplication',
            offers: {
              price: '0',
              priceCurrency: 'USD',
            },
          }),
          buildFaqPageSchema({
            url: pageUrl,
            name: t('schema.faqPage.name'),
            faqItems: t.raw('faq.items') as FAQItem[],
          }),
          buildVideoObjectSchema({
            url: pageUrl,
            name: t('schema.webPage.name'),
            description: t('schema.webPage.description'),
            thumbnailUrl: outputImages[0],
            contentUrl: outputVideos[0],
            embedUrl: pageUrl,
          }),
        ])}
      />
    </div>
  )
}
