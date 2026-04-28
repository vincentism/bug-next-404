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
  const t = await getTranslations({ locale, namespace: 'templates.interiorDesign.seo' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
    alternates: {
      canonical:
        locale === 'zh'
          ? `${getSiteUrl()}/zh/template-interior-design`
          : `${getSiteUrl()}/template-interior-design`,
    },
  }
}

const TEMPLATE_INTERIOR_DESIGN_OUTPUTIMAGES_1 = [
          'https://ik.imagekit.io/opencreator/web/xm/1121-templates-covers/Interior Design.png',
        ]

type PageProps = { params: Promise<{ locale: string }> }

export default async function InteriorDesignLandingPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.interiorDesign' })
  const faqItems: FAQItem[] = t.raw('faq.items')
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/template-interior-design`

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
        outputImages={TEMPLATE_INTERIOR_DESIGN_OUTPUTIMAGES_1}
        outputImageAlts={['AI interior design workflow example showing room visualization']}
        ctaText={t('hero.ctaText')}
        ctaLink={getAppUrl('/canvas?shareid=69206766ffd0', locale)}
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
        id="interior-design-schema"
        data={createSchemaGraph([
          buildWebPageSchema({
            url: pageUrl,
            name: 'Interior Design – AI Interior Design Generator',
            description:
              'Visualize interior design concepts and makeover ideas with AI for residential, commercial, and hospitality spaces.',
          }),
          buildSoftwareApplicationSchema({
            url: pageUrl,
            name: 'AI Interior Design Generator',
            description:
              'AI workflow that generates interior design concepts and room layouts from prompts and reference photos.',
            applicationCategory: 'GraphicsApplication',
            offers: {
              price: '0',
              priceCurrency: 'USD',
            },
          }),
          buildFaqPageSchema({
            url: pageUrl,
            name: 'Interior Design – FAQ',
            faqItems: faqItems,
          }),
        ])}
      />
    </div>
  )
}
