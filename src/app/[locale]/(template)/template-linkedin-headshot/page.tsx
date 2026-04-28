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
  const t = await getTranslations({ locale, namespace: 'templates.linkedinHeadshot.seo' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
    alternates: {
      canonical:
        locale === 'zh'
          ? `${getSiteUrl()}/zh/template-linkedin-headshot`
          : `${getSiteUrl()}/template-linkedin-headshot`,
    },
  }
}

const TEMPLATE_LINKEDIN_HEADSHOT_OUTPUTIMAGES_1 = [
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/LinkedIn Headshot.png',
        ]

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function LinkedInHeadshotLandingPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.linkedinHeadshot' })
  const faqItems: FAQItem[] = t.raw('faq.items')
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/template-linkedin-headshot`

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
        outputImages={TEMPLATE_LINKEDIN_HEADSHOT_OUTPUTIMAGES_1}
        outputImageAlts={[
          'AI-generated professional LinkedIn headshot example showing polished portrait with clean background',
        ]}
        ctaText={t('hero.ctaText')}
        ctaLink={getAppUrl('/canvas?shareid=691f1fe0bb8b', locale)}
      />
      <ModelShowcase />
      <WorkflowHowItWorksSection
        workflowKey="linkedin-headshot"
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
        id="linkedin-headshot-schema"
        data={createSchemaGraph([
          buildWebPageSchema({
            url: pageUrl,
            name: 'LinkedIn Headshot – AI Professional Profile Photo Generator',
            description:
              'Generate professional LinkedIn profile photos from your existing pictures using AI.',
          }),
          buildSoftwareApplicationSchema({
            url: pageUrl,
            name: 'LinkedIn Headshot AI Workflow Template',
            description:
              'AI-powered workflow that enhances and standardizes professional headshots for LinkedIn and beyond.',
            applicationCategory: 'MultimediaApplication',
            offers: {
              price: '0',
              priceCurrency: 'USD',
            },
          }),
          buildFaqPageSchema({
            url: pageUrl,
            name: 'LinkedIn Headshot – FAQ',
            faqItems: faqItems,
          }),
        ])}
      />
    </div>
  )
}
