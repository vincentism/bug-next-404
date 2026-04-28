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
  const t = await getTranslations({ locale, namespace: 'models.sora2.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Sora 2',
      'OpenAI Sora 2',
      'Sora 2 AI video generator',
      'Sora 2 image to video',
      'Sora 2 image to video free',
      'Sora 2 text to video',
      'Sora 2 video generation',
      'Sora 2 video model',
      'Sora 2 generation time',
      'Sora 2 video resolution',
      'Sora 2 1080p',
      'Sora 2 free generator',
      'free Sora 2 AI video generator',
      'OpenAI Sora 2 video generation model',
      'OpenAI Sora 2 specifications',
      'Sora 2 online',
      'Sora 2 free trial',
      'realistic AI video',
      'physics simulation video',
      'OpenCreator Sora 2',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Sora 2 x UGC Promo.png',
          width: 1200,
          height: 630,
          alt: 'Sora 2 AI Video Generator',
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
      'Object Permanence',
      'Camera Control',
      'Audio Generation',
    ],
    models: [
      {
        name: 'Sora 2',
        isHighlighted: true,
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Max Duration': 'Up to 25s',
          Resolution: 'Up to 1080p',
          'Physics Simulation': true,
          'Object Permanence': true,
          'Camera Control': true,
          'Audio Generation': false,
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
          'Object Permanence': true,
          'Camera Control': true,
          'Audio Generation': true,
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
          'Object Permanence': 'partial',
          'Camera Control': false,
          'Audio Generation': 'partial',
        },
      },
    ],
  },
  pricing: {
    modelId: 'opencreator-fal-sora2-i2v-v1',
    note: 'Credits are consumed per generation. Actual cost depends on your subscription plan.',
  },
}

export default async function Sora2ModelPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/sora-2`

  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.sora2.model' }),
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
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (20).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Sora 2 x UGC Promo.png',
    capabilities: [
      t('hero.capabilities.imageToVideo'),
      t('hero.capabilities.textToVideo'),
      t('hero.capabilities.duration'),
      t('hero.capabilities.resolution'),
      t('hero.capabilities.physics'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.physics.title'),
      description: t('features.items.physics.description'),
    },
    {
      title: t('features.items.realism.title'),
      description: t('features.items.realism.description'),
    },
    {
      title: t('features.items.duration.title'),
      description: t('features.items.duration.description'),
    },
    {
      title: t('features.items.steerability.title'),
      description: t('features.items.steerability.description'),
    },
    {
      title: t('features.items.consistency.title'),
      description: t('features.items.consistency.description'),
    },
    {
      title: t('features.items.multimodal.title'),
      description: t('features.items.multimodal.description'),
    },
  ]

  const gallery = [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (20).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Sora 2 x UGC Promo.png',
      title: t('gallery.items.ugc.title'),
      description: t('gallery.items.ugc.description'),
      useCase: t('gallery.items.ugc.useCase'),
      link: getAppUrl('/canvas?shareid=69204d83c7cd', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (19).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Sora 2 x Ads.png',
      title: t('gallery.items.ads.title'),
      description: t('gallery.items.ads.description'),
      useCase: t('gallery.items.ads.useCase'),
      link: getAppUrl('/canvas?shareid=691f25e6c72a', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (18).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Sora 2 x Idols.png',
      title: t('gallery.items.idols.title'),
      description: t('gallery.items.idols.description'),
      useCase: t('gallery.items.idols.useCase'),
      link: getAppUrl('/canvas?shareid=691f23a9053d', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (17).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Enterprise Product Ad.png',
      title: t('gallery.items.product.title'),
      description: t('gallery.items.product.description'),
      useCase: t('gallery.items.product.useCase'),
      link: getAppUrl('/canvas?shareid=691f25484cd0', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (8).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
      title: t('gallery.items.cinematic.title'),
      description: t('gallery.items.cinematic.description'),
      useCase: t('gallery.items.cinematic.useCase'),
      link: getAppUrl('/canvas?shareid=692053b03267', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (2).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Animal Olympics.png',
      title: t('gallery.items.animation.title'),
      description: t('gallery.items.animation.description'),
      useCase: t('gallery.items.animation.useCase'),
      link: getAppUrl('/canvas?shareid=691f3145c52e', locale),
    },
  ]

  const faqItemsRaw = t.raw('faq.items') as unknown
  const faqItems: FAQItem[] = Array.isArray(faqItemsRaw)
    ? (faqItemsRaw as FAQItem[])
    : Object.keys(faqItemsRaw as Record<string, FAQItem>)
        .sort((a, b) => Number(a) - Number(b))
        .map(key => (faqItemsRaw as Record<string, FAQItem>)[key])

  // Specs data with i18n support
  const specs = [
    {
      title: t('specs.categories.inputOutput.title'),
      items: [
        { label: t('specs.categories.inputOutput.inputFormats'), value: 'JPG, PNG, WEBP, Text' },
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'MP4' },
        { label: t('specs.categories.inputOutput.maxResolution'), value: 'Up to 1080p (Pro)' },
        {
          label: t('specs.categories.inputOutput.durationOptions'),
          value: '8s / 12s / up to 25s (Pro)',
        },
      ],
    },
    {
      title: t('specs.categories.capabilities.title'),
      items: [
        { label: t('specs.categories.capabilities.imageToVideo'), value: true },
        { label: t('specs.categories.capabilities.textToVideo'), value: true },
        { label: t('specs.categories.capabilities.videoExtension'), value: true },
        { label: t('specs.categories.capabilities.cameraControl'), value: true },
      ],
    },
    {
      title: t('specs.categories.advanced.title'),
      items: [
        { label: t('specs.categories.advanced.physicsSimulation'), value: true },
        { label: t('specs.categories.advanced.objectPermanence'), value: true },
        { label: t('specs.categories.advanced.sceneComposition'), value: true },
        { label: t('specs.categories.advanced.styleTransfer'), value: true },
      ],
    },
    {
      title: t('specs.categories.performance.title'),
      items: [
        { label: t('specs.categories.performance.generationTime'), value: 'Varies' },
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
    'objectPermanence',
    'cameraControl',
    'audioGeneration',
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
      name: 'Sora 2',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Sora 2 FAQ',
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
          modelName="Sora 2"
          description={t('pricing.description')}
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
