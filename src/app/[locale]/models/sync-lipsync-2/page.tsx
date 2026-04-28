import type { Metadata } from 'next'
import { LandingNavbar, LandingFAQ, LandingFooter } from '@/components/landing'
import OffModalTips from '@/components/dialog/off_modal_tips'
import {
  ModelHero,
  ModelFeatures,
  ModelGallery,
  ModelSpecs,
  ModelComparison,
  ModelPricing,
} from '@/components/landing/model'
import { JsonLd } from '@/components/seo/json-ld'
import {
  createSchemaGraph,
  buildWebPageSchema,
  buildFaqPageSchema,
  buildSoftwareApplicationSchema,
  getSiteUrl,
} from '@/lib/seo/schema'
import { getTranslations } from '@/i18n/get-translations'
import type { FAQItem } from '@/components/landing/faq'
import { getPricingConfig, buildPlanSummaries } from '../model-plan-pricing'
import { getAppUrl } from '@/lib/app-url'

type PageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'models.syncLipsync2.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Sync Lipsync 2.0',
      'Sync Labs',
      'AI lip sync',
      'zero-shot lip sync',
      'video dubbing AI',
      'style preservation',
      'cross-domain lip sync',
      'natural lip sync',
      'OpenCreator Sync',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
          width: 1200,
          height: 630,
          alt: 'Sync Lipsync 2.0 AI',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  }
}

const modelData = {
  hero: {
    modelName: 'Sync Lipsync 2.0',
    tagline: 'Zero-Shot Natural Lip Sync',
    description:
      'Sync Lipsync 2.0 is a zero-shot model for generating realistic lip movements that match spoken audio. It preserves speaker style across languages and works with live-action, animation, and AI-generated characters.',
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (5).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
    capabilities: [
      'Zero-Shot',
      'Style Preservation',
      'Cross-Domain',
      'Multi-Language',
      'High Quality',
    ],
    badge: 'Pro',
    ctaText: 'Try Sync Lipsync 2.0',
  },
  comparison: {
    features: [
      'Zero-Shot',
      'Style Preservation',
      'Cross-Domain',
      'Active Speaker',
      'Temperature Control',
      'Quality',
    ],
    models: [
      {
        name: 'Sync Lipsync 2.0',
        isHighlighted: true,
        values: {
          'Zero-Shot': true,
          'Style Preservation': true,
          'Cross-Domain': true,
          'Active Speaker': true,
          'Temperature Control': true,
          Quality: 'Very High',
        },
      },
      {
        name: 'Pixverse Lipsync',
        values: {
          'Zero-Shot': true,
          'Style Preservation': 'partial',
          'Cross-Domain': 'partial',
          'Active Speaker': false,
          'Temperature Control': false,
          Quality: 'High',
        },
      },
      {
        name: 'Kling Lipsync',
        values: {
          'Zero-Shot': true,
          'Style Preservation': 'partial',
          'Cross-Domain': true,
          'Active Speaker': false,
          'Temperature Control': false,
          Quality: 'High',
        },
      },
    ],
  },
  pricing: {
    modelId: 'Fal Sync Lipsync V2',
    note: 'Credits based on video duration. Subscribe to save more.',
  },
}

export default async function SyncLipsync2ModelPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/sync-lipsync-2`

  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.syncLipsync2.model' }),
    getPricingConfig(),
  ])
  const planSummaries = subscriptionData
    ? buildPlanSummaries(subscriptionData, stripePlan, modelData.pricing.modelId)
    : []

  const heroData = {
    modelName: t('hero.modelName'),
    tagline: t('hero.tagline'),
    description: t('hero.description'),
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (5).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
    capabilities: [
      t('hero.capabilities.zeroShot'),
      t('hero.capabilities.stylePreserve'),
      t('hero.capabilities.crossDomain'),
      t('hero.capabilities.multiLanguage'),
      t('hero.capabilities.highQuality'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.zeroShot.title'),
      description: t('features.items.zeroShot.description'),
    },
    {
      title: t('features.items.stylePreserve.title'),
      description: t('features.items.stylePreserve.description'),
    },
    {
      title: t('features.items.crossDomain.title'),
      description: t('features.items.crossDomain.description'),
    },
    {
      title: t('features.items.temperature.title'),
      description: t('features.items.temperature.description'),
    },
    {
      title: t('features.items.activeSpeaker.title'),
      description: t('features.items.activeSpeaker.description'),
    },
    {
      title: t('features.items.editForever.title'),
      description: t('features.items.editForever.description'),
    },
  ]

  const gallery = [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (5).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
      title: t('gallery.items.dubbing.title'),
      description: t('gallery.items.dubbing.description'),
      useCase: t('gallery.items.dubbing.useCase'),
      link: getAppUrl('/canvas?shareid=691f3139a814', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (17).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Enterprise Product Ad.png',
      title: t('gallery.items.postEdit.title'),
      description: t('gallery.items.postEdit.description'),
      useCase: t('gallery.items.postEdit.useCase'),
      link: getAppUrl('/canvas?shareid=691f25484cd0', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (8).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
      title: t('gallery.items.animation.title'),
      description: t('gallery.items.animation.description'),
      useCase: t('gallery.items.animation.useCase'),
      link: getAppUrl('/canvas?shareid=692053b03267', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (16).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Streetwear UGC Promo.png',
      title: t('gallery.items.aiAvatar.title'),
      description: t('gallery.items.aiAvatar.description'),
      useCase: t('gallery.items.aiAvatar.useCase'),
      link: getAppUrl('/canvas?shareid=691f269d38df', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (13).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/ASMR Promo.png',
      title: t('gallery.items.multiPerson.title'),
      description: t('gallery.items.multiPerson.description'),
      useCase: t('gallery.items.multiPerson.useCase'),
      link: getAppUrl('/canvas?shareid=691f27c703c2', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
      title: t('gallery.items.translation.title'),
      description: t('gallery.items.translation.description'),
      useCase: t('gallery.items.translation.useCase'),
      link: getAppUrl('/canvas?shareid=691f2a048044', locale),
    },
  ]

  const faqItems: FAQItem[] = Array.from({ length: 6 }).map((_, index) => ({
    question: t(`faq.items.${index}.question`),
    answer: t(`faq.items.${index}.answer`),
  }))

  const specs = [
    {
      title: t('specs.categories.inputOutput.title'),
      items: [
        { label: t('specs.categories.inputOutput.videoFormats'), value: 'MP4, MOV, WebM' },
        { label: t('specs.categories.inputOutput.audioFormats'), value: 'MP3, WAV, AAC' },
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'MP4' },
        { label: t('specs.categories.inputOutput.maxDuration'), value: 'Variable' },
      ],
    },
    {
      title: t('specs.categories.capabilities.title'),
      items: [
        { label: t('specs.categories.capabilities.zeroShot'), value: true },
        { label: t('specs.categories.capabilities.stylePreservation'), value: true },
        { label: t('specs.categories.capabilities.activeSpeaker'), value: true },
        { label: t('specs.categories.capabilities.crossDomain'), value: true },
      ],
    },
    {
      title: t('specs.categories.controls.title'),
      items: [
        { label: t('specs.categories.controls.temperature'), value: true },
        { label: t('specs.categories.controls.expressiveness'), value: 'Adjustable' },
        { label: t('specs.categories.controls.languageSupport'), value: 'Multi-Language' },
        { label: t('specs.categories.controls.characterTypes'), value: 'All Types' },
      ],
    },
    {
      title: t('specs.categories.performance.title'),
      items: [
        { label: t('specs.categories.performance.generationTime'), value: 'Fast' },
        { label: t('specs.categories.performance.apiAccess'), value: true },
        { label: t('specs.categories.performance.batchProcessing'), value: true },
      ],
    },
  ]

  const comparisonFeatureKeys = [
    'zeroShot',
    'stylePreserve',
    'crossDomain',
    'activeSpeaker',
    'temperature',
    'quality',
  ]
  const comparisonFeatures = comparisonFeatureKeys.map(key => t(`comparison.features.${key}`))

  const comparisonModels = modelData.comparison.models.map(model => ({
    ...model,
    values: Object.fromEntries(
      comparisonFeatureKeys.map((key, index) => [
        comparisonFeatures[index],
        (model.values as Record<string, string | boolean>)[modelData.comparison.features[index]],
      ])
    ),
  }))

  const schemaData = createSchemaGraph([
    buildWebPageSchema({
      url: pageUrl,
      name: t('meta.title'),
      description: t('meta.description'),
    }),
    buildSoftwareApplicationSchema({
      url: pageUrl,
      name: 'Sync Lipsync 2.0',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Sync Lipsync 2.0 FAQ',
      faqItems,
    }),
  ])

  return (
    <>
      <OffModalTips />
      <JsonLd data={schemaData} />

      <LandingNavbar />

      <main>
        <ModelHero {...heroData} />

        <ModelFeatures
          title={t('features.title')}
          subtitle={t('features.subtitle')}
          features={features}
        />

        <ModelGallery title={t('gallery.title')} subtitle={t('gallery.subtitle')} items={gallery} />

        <ModelSpecs title={t('specs.title')} subtitle={t('specs.subtitle')} categories={specs} />

        <ModelComparison
          title={t('comparison.title')}
          subtitle={t('comparison.subtitle')}
          features={comparisonFeatures}
          models={comparisonModels}
          featureLabel={t('comparison.featureLabel')}
          recommendedLabel={t('comparison.recommended')}
          supportedLabel={t('comparison.supported')}
          partialLabel={t('comparison.partial')}
          notSupportedLabel={t('comparison.notSupported')}
        />

        <ModelPricing
          title={t('pricing.title')}
          subtitle={t('pricing.subtitle')}
          modelId={modelData.pricing.modelId}
          modelName="Sync Lipsync 2.0"
          description={t('pricing.description')}
          note={t('pricing.note')}
          viewFullPricingText={t('pricing.viewFullPricing')}
          planSummaries={planSummaries}
          planSectionTitle={t('pricing.planSectionTitle')}
          planCreditsPerMonthLabel={t('pricing.planCreditsPerMonthLabel')}
          planPerGenerationLabel={t('pricing.planPerGenerationLabel')}
        />

        <LandingFAQ title={t('faq.title')} items={faqItems} />
      </main>

      <LandingFooter />
    </>
  )
}
