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
  buildWebPageSchema,
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
  const tSeo = await getTranslations({ locale, namespace: 'templates.batchAiModelTryOn.seo' })

  return {
    title: tSeo('title'),
    description: tSeo('description'),
    keywords: (tSeo.raw('keywords') as string[]) || [],
    alternates: {
      canonical:
        locale === 'zh'
          ? `${getSiteUrl()}/zh/template-batch-ai-model-try-on`
          : `${getSiteUrl()}/template-batch-ai-model-try-on`,
    },
  }
}

export default async function BatchAiModelTryOnLandingPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.batchAiModelTryOn' })
  const faqItems = t.raw('faq.items') as FAQItem[]
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/template-batch-ai-model-try-on`

  const outputImages = [
    'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/Batch AI Model Try-On.png',
  ]

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
        outputImages={outputImages}
        outputImageAlts={[
          'Batch AI model try-on image set showing consistent on-model visuals for fashion products',
        ]}
        ctaText={t('hero.ctaText')}
        ctaLink={getAppUrl('/canvas?shareid=6928296ef9d8', locale)}
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
        id="batch-ai-model-try-on-schema"
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
            applicationCategory: 'PhotoApplication',
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
        ])}
      />
    </div>
  )
}
