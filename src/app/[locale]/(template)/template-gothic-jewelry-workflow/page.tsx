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
  'https://ik.imagekit.io/opencreator/web/xm/0108/OpenCreator_image_1767857280031.png'
const OUTPUT_VIDEO =
  'https://ik.imagekit.io/opencreator/web/xm/0108/OpenCreator_图生视频_1767862610938.mp4'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.gothicJewelryWorkflow.seo' })
  const canonical =
    locale === 'zh'
      ? `${getSiteUrl()}/zh/template-gothic-jewelry-workflow`
      : `${getSiteUrl()}/template-gothic-jewelry-workflow`
  return {
    title: t('title'),
    description: t('description'),
    keywords: (t.raw('keywords') as string[]) || [],
    alternates: {
      canonical,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonical,
      type: 'video.other',
      images: [
        {
          url: OUTPUT_IMAGE,
        },
      ],
      videos: [
        {
          url: OUTPUT_VIDEO,
          type: 'video/mp4',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [OUTPUT_IMAGE],
    },
  }
}

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function GothicJewelryWorkflowLandingPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.gothicJewelryWorkflow' })
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/template-gothic-jewelry-workflow`

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
        inputType="image"
        outputImages={outputImages}
        outputVideos={outputVideos}
        outputImageAlts={[
          'AI-generated gothic-style jewelry photo with dramatic dark aesthetic lighting',
        ]}
        ctaText={t('hero.ctaText')}
        ctaLink={getAppUrl('/canvas?shareid=695f7a560fdd', locale)}
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
        id="gothic-jewelry-workflow-schema"
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
