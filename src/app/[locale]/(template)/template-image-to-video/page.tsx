import type { Metadata } from 'next'
import React from 'react'
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
  buildWebPageSchema,
  buildVideoObjectSchema,
  createSchemaGraph,
  getSiteUrl,
} from '@/lib/seo/schema'
import type { FAQItem } from '@/components/landing/faq'
import { getTranslations } from '@/i18n/get-translations'
import { getAppUrl } from '@/lib/app-url'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.imageToVideo.seo' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
    alternates: {
      canonical:
        locale === 'zh'
          ? `${getSiteUrl()}/zh/template-image-to-video`
          : `${getSiteUrl()}/template-image-to-video`,
    },
  }
}

const TEMPLATE_IMAGE_TO_VIDEO_OUTPUTIMAGES_1 = [
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Image to Video.png',
        ]

type PageProps = { params: Promise<{ locale: string }> }

export default async function ImageToVideoLandingPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.imageToVideo' })
  const faqItems: FAQItem[] = t.raw('faq.items')
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/template-image-to-video`

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#F7F7F7]">
      <OffModalTips />
      <LandingNavbar />
      <WorkflowHero
        type="image"
        layout="classic"
        featureTag={t('hero.featureTag')}
        featureTagColor="blue"
        tags={t.raw('hero.tags')}
        title={t('hero.title')}
        description={t('hero.description')}
        inputPlaceholder={t('hero.inputPlaceholder')}
        inputType="image"
        outputImages={TEMPLATE_IMAGE_TO_VIDEO_OUTPUTIMAGES_1}
        outputImageAlts={[
          'AI-generated image to video conversion example showing animated visual output',
        ]}
        ctaText={t('hero.ctaText')}
        ctaLink={getAppUrl('/canvas?shareid=692057c9a6b9', locale)}
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
      <JsonLd
        id="image-to-video-schema"
        data={createSchemaGraph([
          buildWebPageSchema({
            url: pageUrl,
            name: t.raw('schema.webPage.name') || 'Image to Video',
            description: t.raw('schema.webPage.description') || '',
          }),
          buildSoftwareApplicationSchema({
            url: pageUrl,
            name: t.raw('schema.softwareApplication.name') || 'Image to Video Workflow',
            description: t.raw('schema.softwareApplication.description') || '',
            applicationCategory: 'VideoApplication',
            offers: {
              price: '0',
              priceCurrency: 'USD',
            },
          }),
          buildFaqPageSchema({
            url: pageUrl,
            name: t.raw('schema.faqPage.name') || 'Image to Video - FAQ',
            faqItems: faqItems,
          }),
          buildVideoObjectSchema({
            url: pageUrl,
            name: t.raw('schema.webPage.name') || 'Image to Video',
            description: t.raw('schema.webPage.description') || '',
            thumbnailUrl:
              'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Image to Video.png',
          }),
        ])}
      />
    </div>
  )
}
