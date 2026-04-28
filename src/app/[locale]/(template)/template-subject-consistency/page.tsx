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
  const t = await getTranslations({ locale, namespace: 'templates.subjectConsistency.seo' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
    alternates: {
      canonical:
        locale === 'zh'
          ? `${getSiteUrl()}/zh/template-subject-consistency`
          : `${getSiteUrl()}/template-subject-consistency`,
    },
  }
}

const TEMPLATE_SUBJECT_CONSISTENCY_OUTPUTIMAGES_1 = [
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Subject Consistency.png',
        ]

type PageProps = { params: Promise<{ locale: string }> }

export default async function SubjectConsistencyLandingPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.subjectConsistency' })
  const faqItems: FAQItem[] = t.raw('faq.items')
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/template-subject-consistency`

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
        outputImages={TEMPLATE_SUBJECT_CONSISTENCY_OUTPUTIMAGES_1}
        outputImageAlts={[
          'AI subject consistency workflow example showing consistent character across scenes',
        ]}
        ctaText={t('hero.ctaText')}
        ctaLink={getAppUrl('/canvas?shareid=69205b65cd34', locale)}
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
        id="subject-consistency-schema"
        data={createSchemaGraph([
          buildWebPageSchema({
            url: pageUrl,
            name: 'Subject Consistency – AI Subject Consistency Generator',
            description:
              'Maintain consistent appearance for characters, products, and mascots across many images with AI-generated variations.',
          }),
          buildSoftwareApplicationSchema({
            url: pageUrl,
            name: 'AI Subject Consistency Generator',
            description:
              'AI workflow that keeps subjects on-model across multiple poses, scenes, and use cases for brand and product teams.',
            applicationCategory: 'GraphicsApplication',
            offers: {
              price: '0',
              priceCurrency: 'USD',
            },
          }),
          buildFaqPageSchema({
            url: pageUrl,
            name: 'Subject Consistency – FAQ',
            faqItems: faqItems,
          }),
        ])}
      />
    </div>
  )
}
