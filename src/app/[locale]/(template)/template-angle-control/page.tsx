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

const OUTPUT_IMAGE = 'https://ik.imagekit.io/opencreator/web/xm/0211/官号封面（2026） (1).png'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.angleControl.seo' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: (t.raw('keywords') as string[]) || [],
    alternates: {
      canonical:
        locale === 'zh'
          ? `${getSiteUrl()}/zh/template-angle-control`
          : `${getSiteUrl()}/template-angle-control`,
    },
  }
}

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function AngleControlLandingPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.angleControl' })
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/template-angle-control`

  const outputImages = [OUTPUT_IMAGE]

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#F7F7F7]">
      <OffModalTips />
      <LandingNavbar />
      <WorkflowHero
        type="image"
        layout="classic"
        featureTag={t('hero.featureTag')}
        featureTagColor="pink"
        tags={t.raw('hero.tags')}
        title={t('hero.title')}
        description={t('hero.description')}
        inputPlaceholder={t('hero.inputPlaceholder')}
        inputType="image"
        outputImages={outputImages}
        outputImageAlts={['AI angle control output with consistent product identity']}
        ctaText={t('hero.ctaText')}
        ctaLink={getAppUrl('/canvas?shareid=698b6a305726', locale)}
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
        id="angle-control-schema"
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
        ])}
      />
    </div>
  )
}
