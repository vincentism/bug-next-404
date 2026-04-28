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
  buildVideoObjectSchema,
  createSchemaGraph,
  getSiteUrl,
} from '@/lib/seo/schema'
import type { FAQItem } from '@/components/landing/faq'
import { getAppUrl } from '@/lib/app-url'

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.specialMaterialAsmr.seo' })
  return {
    title: t('title'),
    description: t('description'),
    keywords: (t.raw('keywords') as string[]) || [],
    alternates: {
      canonical:
        locale === 'zh'
          ? `${getSiteUrl()}/zh/template-special-material-asmr`
          : `${getSiteUrl()}/template-special-material-asmr`,
    },
  }
}

export default async function SpecialMaterialAsmrLandingPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.specialMaterialAsmr' })
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/template-special-material-asmr`

  const outputVideos = ['https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (24).mp4']
  const inputImages = [
    'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Special Material ASMR.png',
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
        inputImageAlts={['Special Material ASMR AI video cover showing unique material textures']}
        outputVideos={outputVideos}
        ctaText={t('hero.ctaText')}
        ctaLink={getAppUrl('/canvas?shareid=691f3679d23e', locale)}
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
        id="special-material-asmr-schema"
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
            thumbnailUrl:
              'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Special Material ASMR.png',
          }),
        ])}
      />
    </div>
  )
}
