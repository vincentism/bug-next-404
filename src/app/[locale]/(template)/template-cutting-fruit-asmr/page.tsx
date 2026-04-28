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

type PageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.cuttingFruitAsmr.seo' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
    alternates: {
      canonical:
        locale === 'zh'
          ? `${getSiteUrl()}/zh/template-cutting-fruit-asmr`
          : `${getSiteUrl()}/template-cutting-fruit-asmr`,
    },
  }
}

export default async function CuttingFruitAsmrLandingPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.cuttingFruitAsmr' })
  const faqItems: FAQItem[] = t.raw('faq.items')
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/template-cutting-fruit-asmr`

  const outputVideos = ['https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (27).mp4']
  const inputImages = [
    'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Cutting Fruit ASMR.png',
  ]

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
        inputImages={inputImages}
        inputImageAlts={[
          'Cutting Fruit ASMR AI video cover showing sliced fruit and cutting visuals',
        ]}
        outputVideos={outputVideos}
        ctaText={t('hero.ctaText')}
        ctaLink={getAppUrl('/canvas?shareid=691f3403eece', locale)}
      />
      <ModelShowcase />
      <WorkflowHowItWorksSection
        workflowKey="cutting-fruit-asmr"
        steps={t.raw('howItWorks.steps')}
      />
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
        id="cutting-fruit-asmr-schema"
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
            faqItems,
          }),
          buildVideoObjectSchema({
            url: pageUrl,
            name: 'AI Cutting Fruit ASMR Generator | Satisfying Slice Videos',
            description:
              'Create AI-generated cutting fruit ASMR clips for food channels, kitchen product ads, and satisfying content feeds.',
            thumbnailUrl:
              'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Cutting Fruit ASMR.png',
          }),
        ])}
      />
    </div>
  )
}
