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
  const t = await getTranslations({ locale, namespace: 'templates.videoEdit.seo' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
    alternates: {
      canonical:
        locale === 'zh'
          ? `${getSiteUrl()}/zh/template-video-edit`
          : `${getSiteUrl()}/template-video-edit`,
    },
  }
}

const TEMPLATE_VIDEO_EDIT_OUTPUTIMAGES_1 = [
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Video Edit.png',
        ]

type PageProps = { params: Promise<{ locale: string }> }

const videoEditFAQItems_old: FAQItem[] = [
  {
    question: 'What does the Video Edit AI workflow do?',
    answer:
      'This workflow automates some of the most time-consuming parts of editing—such as rough cuts, highlight reels, and basic sequences—based on pacing, key moments, or simple instructions. It is an AI video edit assistant rather than a full replacement for your editor.',
  },
  {
    question: 'What kind of input should I provide for Video Edit?',
    answer:
      'Upload raw or lightly organized footage and describe the type of edit you want—for example “60-second highlight reel for TikTok,” “tutorial cutdown,” or “remove long pauses and dead air.” Clear instructions help AI propose more useful timelines.',
  },
  {
    question: 'Can this workflow fully replace my video editing software?',
    answer:
      'No. The goal is to give you a strong starting point, not to replace a professional editor or NLE. You still refine color, sound, titles, and final pacing in your editing tool of choice, using AI edits as version 0.8 instead of 0.0.',
  },
  {
    question: 'What types of projects benefit most from AI-assisted editing?',
    answer:
      'Long-form content that needs multiple cutdowns, podcasts and webinars that require trimming, and social or UGC footage that needs fast highlight reels are all good candidates for this workflow.',
  },
  {
    question: 'How do I use AI edits together with my normal editing workflow?',
    answer:
      'A typical process is to run this workflow to generate a first sequence, then export or recreate that structure in your editing software. From there, you refine timing, transitions, graphics, and sound as usual.',
  },
  {
    question: 'How do credits and costs work for Video Edit generations?',
    answer:
      'Each generated edit consumes credits based on input length and configuration. It is usually best to experiment on smaller batches or shorter sequences first, then scale once you find settings that match your style.',
  },
]

export default async function VideoEditLandingPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.videoEdit' })
  const faqItems: FAQItem[] = t.raw('faq.items')
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/template-video-edit`

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
        inputType="text"
        outputImages={TEMPLATE_VIDEO_EDIT_OUTPUTIMAGES_1}
        outputImageAlts={[
          'AI video editing workflow interface example showing automated editing tools',
        ]}
        ctaText={t('hero.ctaText')}
        ctaLink={getAppUrl('/canvas?shareid=69205c535d4e', locale)}
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
        id="video-edit-schema"
        data={createSchemaGraph([
          buildWebPageSchema({
            url: pageUrl,
            name: t.raw('schema.webPage.name') || 'Video Edit',
            description: t.raw('schema.webPage.description') || '',
          }),
          buildSoftwareApplicationSchema({
            url: pageUrl,
            name: t.raw('schema.softwareApplication.name') || 'Video Edit Workflow',
            description: t.raw('schema.softwareApplication.description') || '',
            applicationCategory: 'VideoApplication',
            offers: {
              price: '0',
              priceCurrency: 'USD',
            },
          }),
          buildFaqPageSchema({
            url: pageUrl,
            name: t.raw('schema.faqPage.name') || 'Video Edit - FAQ',
            faqItems: faqItems,
          }),
          buildVideoObjectSchema({
            url: pageUrl,
            name: t.raw('schema.webPage.name') || 'Video Edit',
            description: t.raw('schema.webPage.description') || '',
            thumbnailUrl:
              'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Video Edit.png',
          }),
        ])}
      />
    </div>
  )
}
