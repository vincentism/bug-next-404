import type { Metadata } from 'next'
import React from 'react'
import {
  LandingNavbar,
  WorkflowHero,
  ModelShowcase,
  TemplatesCarousel,
  WhoIsOpenCreator,
  LandingFAQ,
  LandingCTA,
  LandingFooter,
  ModelFeatureHighlights,
} from '@/components/landing'
import OffModalTips from '@/components/dialog/off_modal_tips'
import { JsonLd } from '@/components/seo/json-ld'
import { buildFaqPageSchema, createSchemaGraph, getSiteUrl } from '@/lib/seo/schema'
import type { FAQItem } from '@/components/landing/faq'
import { getTranslations } from '@/i18n/get-translations'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.nanobanana2.seo' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
  }
}

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function NanoBananaLandingPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.nanobanana2' })
  const faqItems: FAQItem[] = t.raw('faq.items') ?? []
  const features = t.raw('features') ?? []
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/nanobanana2`

  const faqSchema = createSchemaGraph([
    buildFaqPageSchema({
      url: pageUrl,
      name: t('schema.faqPage.name'),
      faqItems: faqItems,
    }),
  ])

  const outputImages = [
    'https://ik.imagekit.io/opencreator/web/landing/nano-banana-2/images/1.png',
    'https://ik.imagekit.io/opencreator/web/landing/nano-banana-2/images/2.png',
    'https://ik.imagekit.io/opencreator/web/landing/nano-banana-2/images/3.png',
    'https://ik.imagekit.io/opencreator/web/landing/nano-banana-2/images/4.png',
    'https://ik.imagekit.io/opencreator/web/landing/nano-banana-2/images/5.png',
    'https://ik.imagekit.io/opencreator/web/landing/nano-banana-2/images/6.png',
  ]

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#F7F7F7]">
      <OffModalTips />
      <LandingNavbar />
      <WorkflowHero
        type="image"
        featureTag={t('hero.featureTag')}
        featureTagColor="green"
        tags={t.raw('hero.tags')}
        title={
          <div className="leading-tight">
            <span className="text-[#E6CC44] block">{t('hero.title.line1')}</span>
            <span className="block">{t('hero.title.line2')}</span>
          </div>
        }
        description={t('hero.description')}
        inputTitle={t('hero.inputTitle')}
        inputPlaceholder={t('hero.inputPlaceholder')}
        inputType="text"
        outputImages={outputImages}
        ctaText={t('hero.ctaText')}
        ctaLink="https://opencreator.io?source_id=landingpage"
      />
      <ModelShowcase />
      <ModelFeatureHighlights
        imageSrc="https://ik.imagekit.io/opencreator/web/landing/nano-banana-2/images/banana.webp"
        imageAlt="Nano Banana 2 glass banana sculpture on a pedestal"
        features={features}
      />
      <TemplatesCarousel />
      <WhoIsOpenCreator />
      <LandingFAQ items={faqItems} />
      <LandingCTA />
      <LandingFooter />
      <JsonLd id="nano-banana-2-faq-schema" data={faqSchema} />
    </div>
  )
}
