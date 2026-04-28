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
  createSchemaGraph,
  getSiteUrl,
} from '@/lib/seo/schema'
import type { FAQItem } from '@/components/landing/faq'
import { getTranslations } from '@/i18n/get-translations'
import { getAppUrl } from '@/lib/app-url'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.textToImage.seo' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
    alternates: {
      canonical:
        locale === 'zh'
          ? `${getSiteUrl()}/zh/template-text-to-image`
          : `${getSiteUrl()}/template-text-to-image`,
    },
  }
}

const TEMPLATE_TEXT_TO_IMAGE_OUTPUTIMAGES_1 = [
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Text to Image.png',
        ]

type PageProps = { params: Promise<{ locale: string }> }

const textToImageFAQItems_old: FAQItem[] = [
  {
    question: 'What does the Text to Image AI workflow do?',
    answer:
      'This workflow turns your written prompts into high-quality images. It is designed as a text to image AI generator for concept art, campaign visuals, product ideas, and more.',
  },
  {
    question: 'How should I write prompts for the best results?',
    answer:
      'Clear, specific prompts work best. Describe the subject, style, mood, lighting, composition, and any reference artists or mediums you care about—for example “cinematic wide shot of a product on a reflective table, warm sunset lighting, studio-quality photograph.”',
  },
  {
    question: 'Can I control different visual styles with this workflow?',
    answer:
      'Yes. You can guide the workflow toward photography, illustration, 3D, flat graphics, or more experimental looks by describing the style and medium in your prompt or by using style presets where available.',
  },
  {
    question: 'What are typical use cases for AI Text to Image?',
    answer:
      'Common use cases include generating early visual directions for campaigns, landing pages, or product concepts, producing mood boards, and creating reference images for designers and illustrators.',
  },
  {
    question: 'Can I use AI-generated images in client work or campaigns?',
    answer:
      'Many teams use AI images for internal exploration, mockups, and sometimes external campaigns. Before using outputs in client-facing or commercial work, always review the latest OpenCreator usage terms and any relevant model policies.',
  },
  {
    question: 'How do credits and costs work for Text to Image generation?',
    answer:
      'Each generation consumes credits based on the model and settings you choose. A good workflow is to explore multiple lower-cost drafts first, then spend more credits on higher-fidelity or upscaled versions once you are happy with a direction.',
  },
]

export default async function TextToImageLandingPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.textToImage' })
  const faqItems: FAQItem[] = t.raw('faq.items')
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/template-text-to-image`

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
        outputImages={TEMPLATE_TEXT_TO_IMAGE_OUTPUTIMAGES_1}
        outputImageAlts={[
          'AI text to image generation workflow example showing creative visual output',
        ]}
        ctaText={t('hero.ctaText')}
        ctaLink={getAppUrl('/canvas?shareid=692057e16e2c', locale)}
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
        id="text-to-image-schema"
        data={createSchemaGraph([
          buildWebPageSchema({
            url: pageUrl,
            name: t.raw('schema.webPage.name') || 'Text to Image',
            description: t.raw('schema.webPage.description') || '',
          }),
          buildSoftwareApplicationSchema({
            url: pageUrl,
            name: t.raw('schema.softwareApplication.name') || 'Text to Image Workflow',
            description: t.raw('schema.softwareApplication.description') || '',
            applicationCategory: 'GraphicsApplication',
            offers: {
              price: '0',
              priceCurrency: 'USD',
            },
          }),
          buildFaqPageSchema({
            url: pageUrl,
            name: t.raw('schema.faqPage.name') || 'Text to Image - FAQ',
            faqItems: faqItems,
          }),
        ])}
      />
    </div>
  )
}
