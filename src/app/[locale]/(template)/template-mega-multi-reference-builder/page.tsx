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
  const t = await getTranslations({ locale, namespace: 'templates.megaMultiReferenceBuilder.seo' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
    alternates: {
      canonical:
        locale === 'zh'
          ? `${getSiteUrl()}/zh/template-mega-multi-reference-builder`
          : `${getSiteUrl()}/template-mega-multi-reference-builder`,
    },
  }
}

const TEMPLATE_MEGA_MULTI_REFERENCE_BUILDER_OUTPUTIMAGES_1 = [
          'https://ik.imagekit.io/opencreator/web/xm/1121-templates-covers/Mega Multi Reference Builder.png',
        ]

type PageProps = { params: Promise<{ locale: string }> }

export default async function MegaMultiReferenceBuilderLandingPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.megaMultiReferenceBuilder' })
  const faqItems: FAQItem[] = t.raw('faq.items')
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/template-mega-multi-reference-builder`

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
        outputImages={TEMPLATE_MEGA_MULTI_REFERENCE_BUILDER_OUTPUTIMAGES_1}
        outputImageAlts={[
          'AI mega multi reference builder workflow example showing reference collection',
        ]}
        ctaText={t('hero.ctaText')}
        ctaLink={getAppUrl('/canvas?shareid=69206ddc5cbd', locale)}
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
        id="mega-multi-reference-builder-schema"
        data={createSchemaGraph([
          buildWebPageSchema({
            url: pageUrl,
            name:
              t.raw('schema.webPage.name') ||
              'Mega Multi Reference Builder – AI Reference Board Generator',
            description: t.raw('schema.webPage.description') || '',
          }),
          buildSoftwareApplicationSchema({
            url: pageUrl,
            name: t.raw('schema.softwareApplication.name') || 'AI Mega Multi Reference Builder',
            description: t.raw('schema.softwareApplication.description') || '',
            applicationCategory: 'GraphicsApplication',
            offers: {
              price: '0',
              priceCurrency: 'USD',
            },
          }),
          buildFaqPageSchema({
            url: pageUrl,
            name: t.raw('schema.faqPage.name') || 'Mega Multi Reference Builder – FAQ',
            faqItems: faqItems,
          }),
        ])}
      />
    </div>
  )
}
