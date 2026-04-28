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
  const t = await getTranslations({ locale, namespace: 'templates.lipSync.seo' })
  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
    alternates: {
      canonical:
        locale === 'zh'
          ? `${getSiteUrl()}/zh/template-lip-sync`
          : `${getSiteUrl()}/template-lip-sync`,
    },
  }
}

const TEMPLATE_LIP_SYNC_OUTPUTIMAGES_1 = [
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Lip Sync.png',
        ]

type PageProps = { params: Promise<{ locale: string }> }

export default async function LipSyncLandingPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.lipSync' })
  const faqItems: FAQItem[] = t.raw('faq.items')
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/template-lip-sync`

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
        outputImages={TEMPLATE_LIP_SYNC_OUTPUTIMAGES_1}
        outputImageAlts={['AI lip sync workflow example showing synchronized mouth movements']}
        ctaText={t('hero.ctaText')}
        ctaLink={getAppUrl('/canvas?shareid=69205c1ba9ca', locale)}
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
        id="lip-sync-schema"
        data={createSchemaGraph([
          buildWebPageSchema({
            url: pageUrl,
            name: t.raw('schema.webPage.name') || 'Lip Sync',
            description: t.raw('schema.webPage.description') || '',
          }),
          buildSoftwareApplicationSchema({
            url: pageUrl,
            name: t.raw('schema.softwareApplication.name') || 'Lip Sync Workflow',
            description: t.raw('schema.softwareApplication.description') || '',
            applicationCategory: 'VideoApplication',
            offers: {
              price: '0',
              priceCurrency: 'USD',
            },
          }),
          buildFaqPageSchema({
            url: pageUrl,
            name: t.raw('schema.faqPage.name') || 'Lip Sync - FAQ',
            faqItems: faqItems,
          }),
          buildVideoObjectSchema({
            url: pageUrl,
            name: t.raw('schema.webPage.name') || 'Lip Sync',
            description: t.raw('schema.webPage.description') || '',
            thumbnailUrl:
              'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Lip Sync.png',
          }),
        ])}
      />
    </div>
  )
}
