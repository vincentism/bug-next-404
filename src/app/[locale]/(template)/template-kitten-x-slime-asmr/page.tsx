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
  const t = await getTranslations({ locale, namespace: 'templates.kittenXSlimeAsmr.seo' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
    alternates: {
      canonical:
        locale === 'zh'
          ? `${getSiteUrl()}/zh/template-kitten-x-slime-asmr`
          : `${getSiteUrl()}/template-kitten-x-slime-asmr`,
    },
  }
}

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function KittenSlimeAsmrLandingPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'templates.kittenXSlimeAsmr' })
  const faqItems: FAQItem[] = t.raw('faq.items')
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/template-kitten-x-slime-asmr`

  const outputVideos = ['https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (25).mp4']
  const inputImages = [
    'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Kitten x Slime ASMR.png',
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
          'Kitten x Slime ASMR AI video concept cover showing kitten and slime visuals',
        ]}
        outputVideos={outputVideos}
        ctaText={t('hero.ctaText')}
        ctaLink={getAppUrl('/canvas?shareid=691f33af7990', locale)}
      />
      <ModelShowcase />
      <WorkflowHowItWorksSection
        workflowKey="kitten-x-slime-asmr"
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
        id="kitten-slime-asmr-schema"
        data={createSchemaGraph([
          buildWebPageSchema({
            url: pageUrl,
            name: 'AI Kitten x Slime ASMR Generator | Cute + Satisfying Videos',
            description:
              'Create AI-generated kitten and slime ASMR clips that blend cute pets with satisfying textures for social media.',
          }),
          buildSoftwareApplicationSchema({
            url: pageUrl,
            name: 'Kitten x Slime ASMR Workflow Template',
            description:
              'AI workflow for creators and brands to generate kitten and slime ASMR-style visuals for feel-good content.',
            applicationCategory: 'MultimediaApplication',
            offers: {
              price: '0',
              priceCurrency: 'USD',
            },
          }),
          buildFaqPageSchema({
            url: pageUrl,
            name: 'Kitten x Slime ASMR – FAQ',
            faqItems: faqItems,
          }),
          buildVideoObjectSchema({
            url: pageUrl,
            name: 'AI Kitten x Slime ASMR Generator | Cute + Satisfying Videos',
            description:
              'Create AI-generated kitten and slime ASMR clips that blend cute pets with satisfying textures for social media.',
            thumbnailUrl:
              'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Kitten x Slime ASMR.png',
          }),
        ])}
      />
    </div>
  )
}
