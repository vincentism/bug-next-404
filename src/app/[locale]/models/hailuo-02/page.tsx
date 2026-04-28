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

// SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'models.hailuo02.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Hailuo Video 02',
      'Hailuo AI',
      'MiniMax video',
      'Hailuo video generator',
      'cinematic AI video',
      'realistic video AI',
      'Hailuo 02 online',
      'Hailuo free trial',
      'smooth motion AI',
      'affordable AI video',
      'text to video AI',
      'image to video generator',
      'MiniMax AI model',
      'OpenCreator Hailuo',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Food Product Ad.png',
          width: 1200,
          height: 630,
          alt: 'Hailuo Video 02 AI Video Generator',
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

// Static model data (non-translatable)
const modelData = {
  comparison: {
    features: [
      'Image to Video',
      'Text to Video',
      'Max Duration',
      'Resolution',
      'Physics Simulation',
      'Motion Quality',
      'Cost Efficiency',
      'Prompt Adherence',
    ],
    models: [
      {
        name: 'Hailuo 02',
        isHighlighted: true,
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Max Duration': '6s',
          Resolution: '768p',
          'Physics Simulation': true,
          'Motion Quality': true,
          'Cost Efficiency': true,
          'Prompt Adherence': true,
        },
      },
      {
        name: 'Kling 2.1',
        values: {
          'Image to Video': true,
          'Text to Video': false,
          'Max Duration': '10s',
          Resolution: '1080p',
          'Physics Simulation': true,
          'Motion Quality': true,
          'Cost Efficiency': 'partial',
          'Prompt Adherence': true,
        },
      },
      {
        name: 'Veo 3',
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Max Duration': '8s',
          Resolution: '1080p',
          'Physics Simulation': true,
          'Motion Quality': true,
          'Cost Efficiency': false,
          'Prompt Adherence': true,
        },
      },
    ],
  },
  pricing: {
    modelId: 'fal-hailuo-2.0-image2video',
    note: 'Credits are consumed per generation. Actual cost depends on your subscription plan.',
  },
}

export default async function Hailuo02ModelPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/hailuo-02`

  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.hailuo02.model' }),
    getPricingConfig(),
  ])
  const planSummaries = subscriptionData
    ? buildPlanSummaries(subscriptionData, stripePlan, modelData.pricing.modelId)
    : []

  // Hero data from translations
  const heroData = {
    modelName: t('hero.modelName'),
    tagline: t('hero.tagline'),
    description: t('hero.description'),
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (10).mp4',
    heroImage: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Food Product Ad.png',
    capabilities: [
      t('hero.capabilities.imageToVideo'),
      t('hero.capabilities.textToVideo'),
      t('hero.capabilities.duration'),
      t('hero.capabilities.resolution'),
      t('hero.capabilities.cinematic'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.realism.title'),
      description: t('features.items.realism.description'),
    },
    {
      title: t('features.items.motion.title'),
      description: t('features.items.motion.description'),
    },
    {
      title: t('features.items.physics.title'),
      description: t('features.items.physics.description'),
    },
    {
      title: t('features.items.prompt.title'),
      description: t('features.items.prompt.description'),
    },
    {
      title: t('features.items.transitions.title'),
      description: t('features.items.transitions.description'),
    },
    { title: t('features.items.cost.title'), description: t('features.items.cost.description') },
  ]

  // Using actual Hailuo 02 workflow assets from mapping (only 2 available)
  const gallery = [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (2).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Animal Olympics.png',
      title: t('gallery.items.product.title'),
      description: t('gallery.items.product.description'),
      useCase: t('gallery.items.product.useCase'),
      link: getAppUrl('/canvas?shareid=691f3145c52e', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/uploads/ucqX2F4s7M.mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/3D Character Render.png',
      title: t('gallery.items.character.title'),
      description: t('gallery.items.character.description'),
      useCase: t('gallery.items.character.useCase'),
      link: getAppUrl('/canvas?shareid=691f33b8a0fb', locale),
    },
  ]

  const faqItems: FAQItem[] = Array.from({ length: 6 }).map((_, index) => ({
    question: t(`faq.items.${index}.question`),
    answer: t(`faq.items.${index}.answer`),
  }))

  // Specs data with i18n support
  const specs = [
    {
      title: t('specs.categories.inputOutput.title'),
      items: [
        { label: t('specs.categories.inputOutput.inputFormats'), value: 'JPG, PNG, WEBP, Text' },
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'MP4' },
        { label: t('specs.categories.inputOutput.maxResolution'), value: '768p' },
        { label: t('specs.categories.inputOutput.durationOptions'), value: '6s' },
      ],
    },
    {
      title: t('specs.categories.capabilities.title'),
      items: [
        { label: t('specs.categories.capabilities.imageToVideo'), value: true },
        { label: t('specs.categories.capabilities.textToVideo'), value: true },
        { label: t('specs.categories.capabilities.aspectRatios'), value: '16:9, 9:16, 1:1' },
        { label: t('specs.categories.capabilities.promptLength'), value: 'Up to 2000 chars' },
      ],
    },
    {
      title: t('specs.categories.advanced.title'),
      items: [
        { label: t('specs.categories.advanced.physicsSimulation'), value: true },
        { label: t('specs.categories.advanced.motionQuality'), value: true },
        { label: t('specs.categories.advanced.lightingEffects'), value: true },
        { label: t('specs.categories.advanced.textureDetail'), value: true },
      ],
    },
    {
      title: t('specs.categories.performance.title'),
      items: [
        { label: t('specs.categories.performance.generationTime'), value: '1-3 min' },
        { label: t('specs.categories.performance.apiAccess'), value: true },
        { label: t('specs.categories.performance.batchProcessing'), value: true },
      ],
    },
  ]

  // Comparison features with i18n
  const comparisonFeatureKeys = [
    'imageToVideo',
    'textToVideo',
    'maxDuration',
    'resolution',
    'physicsSimulation',
    'motionQuality',
    'costEfficiency',
    'promptAdherence',
  ]
  const comparisonFeatures = comparisonFeatureKeys.map(key => t(`comparison.features.${key}`))

  // Build models with translated feature keys
  const comparisonModels = modelData.comparison.models.map(model => ({
    ...model,
    values: Object.fromEntries(
      comparisonFeatureKeys.map((key, index) => [
        comparisonFeatures[index],
        (model.values as Record<string, string | boolean>)[modelData.comparison.features[index]],
      ])
    ),
  }))

  // Schema.org structured data
  const schemaData = createSchemaGraph([
    buildWebPageSchema({
      url: pageUrl,
      name: t('meta.title'),
      description: t('meta.description'),
    }),
    buildSoftwareApplicationSchema({
      url: pageUrl,
      name: 'Hailuo Video 02',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Hailuo Video 02 FAQ',
      faqItems,
    }),
  ])

  return (
    <>
      <OffModalTips />
      <JsonLd data={schemaData} />

      <LandingNavbar />

      <main>
        {/* Hero Section */}
        <ModelHero {...heroData} />

        {/* Features Section */}
        <ModelFeatures
          title={t('features.title')}
          subtitle={t('features.subtitle')}
          features={features}
        />

        {/* Gallery Section - includes use cases */}
        <ModelGallery title={t('gallery.title')} subtitle={t('gallery.subtitle')} items={gallery} />

        {/* Specs Section */}
        <ModelSpecs title={t('specs.title')} subtitle={t('specs.subtitle')} categories={specs} />

        {/* Comparison Section */}
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

        {/* Pricing Section */}
        <ModelPricing
          title={t('pricing.title')}
          subtitle={t('pricing.subtitle')}
          modelId={modelData.pricing.modelId}
          modelName="Hailuo Video 02"
          note={t('pricing.note')}
          viewFullPricingText={t('pricing.viewFullPricing')}
          planSummaries={planSummaries}
        />

        {/* FAQ Section */}
        <LandingFAQ title={t('faq.title')} items={faqItems} />
      </main>

      <LandingFooter />
    </>
  )
}
