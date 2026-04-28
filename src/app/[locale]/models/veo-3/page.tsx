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
import { buildAlternatesMetadata, getCanonicalUrl } from '@/lib/seo/urls'
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
  const t = await getTranslations({ locale, namespace: 'models.veo3.model.meta' })
  const canonical = getCanonicalUrl('/models/veo-3', locale)

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Veo 3',
      'Google Veo 3',
      'Google Veo 3 native audio',
      'Google Veo 3 native audio features',
      'Google Veo 3 native audio generation',
      'Veo 3 native audio generation features',
      'Veo 3.1 fast',
      'Veo 3.1 fast generation time',
      'Veo 3.1 fast generation speed',
      'Veo AI video generator',
      'AI video with audio',
      'native audio generation AI',
      'Google DeepMind video model',
      'text to video with sound',
      'image to video AI',
      'Veo 3 online',
      'Veo 3 free trial',
      'AI video dialogue generation',
      'sound effects AI video',
      'cinematic AI video',
      'OpenCreator Veo 3',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: canonical,
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/ASMR Promo.png',
          width: 1200,
          height: 630,
          alt: 'Veo 3 AI Video Generator',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    alternates: {
      ...buildAlternatesMetadata('/models/veo-3', locale),
    },
  }
}

// Static model data (non-translatable)
const modelData = {
  comparison: {
    features: [
      'Image to Video',
      'Text to Video',
      'Native Audio',
      'Max Duration',
      'Resolution',
      'Physics Simulation',
      'Camera Controls',
      'Scene Extension',
      'Character Consistency',
    ],
    models: [
      {
        name: 'Veo 3',
        isHighlighted: true,
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Native Audio': true,
          'Max Duration': '8s',
          Resolution: '1080p',
          'Physics Simulation': true,
          'Camera Controls': true,
          'Scene Extension': true,
          'Character Consistency': true,
        },
      },
      {
        name: 'Kling 2.1',
        values: {
          'Image to Video': true,
          'Text to Video': false,
          'Native Audio': 'partial',
          'Max Duration': '10s',
          Resolution: '1080p',
          'Physics Simulation': true,
          'Camera Controls': false,
          'Scene Extension': false,
          'Character Consistency': true,
        },
      },
      {
        name: 'Sora 2',
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Native Audio': false,
          'Max Duration': '20s',
          Resolution: '1080p',
          'Physics Simulation': true,
          'Camera Controls': 'partial',
          'Scene Extension': true,
          'Character Consistency': false,
        },
      },
    ],
  },
  pricing: {
    modelId: 'Fal Veo 3 Image To Video',
    note: 'Credits are consumed per generation. Actual cost depends on your subscription plan.',
  },
}

export default async function Veo3ModelPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = getCanonicalUrl('/models/veo-3', locale)

  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.veo3.model' }),
    getPricingConfig(),
  ])
  const planSummaries = subscriptionData
    ? buildPlanSummaries(subscriptionData, stripePlan, modelData.pricing.modelId)
    : []

  // 从翻译文件获取数据
  const heroData = {
    modelName: t('hero.modelName'),
    tagline: t('hero.tagline'),
    description: t('hero.description'),
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (13).mp4',
    heroImage: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/ASMR Promo.png',
    capabilities: [
      t('hero.capabilities.imageToVideo'),
      t('hero.capabilities.textToVideo'),
      t('hero.capabilities.nativeAudio'),
      t('hero.capabilities.resolution'),
      t('hero.capabilities.physics'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    { title: t('features.items.audio.title'), description: t('features.items.audio.description') },
    {
      title: t('features.items.physics.title'),
      description: t('features.items.physics.description'),
    },
    {
      title: t('features.items.prompt.title'),
      description: t('features.items.prompt.description'),
    },
    {
      title: t('features.items.quality.title'),
      description: t('features.items.quality.description'),
    },
    {
      title: t('features.items.control.title'),
      description: t('features.items.control.description'),
    },
    {
      title: t('features.items.consistency.title'),
      description: t('features.items.consistency.description'),
    },
  ]

  // Using actual Veo 3 workflow assets from mapping (7 available)
  const gallery = [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (13).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/ASMR Promo.png',
      title: t('gallery.items.cinematic.title'),
      description: t('gallery.items.cinematic.description'),
      useCase: t('gallery.items.cinematic.useCase'),
      link: getAppUrl('/canvas?shareid=691f27c703c2', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (9).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Food Product ASMR.png',
      title: t('gallery.items.product.title'),
      description: t('gallery.items.product.description'),
      useCase: t('gallery.items.product.useCase'),
      link: getAppUrl('/canvas?shareid=691f295ce7e5', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (3).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/POV Leaked Footage.png',
      title: t('gallery.items.social.title'),
      description: t('gallery.items.social.description'),
      useCase: t('gallery.items.social.useCase'),
      link: getAppUrl('/canvas?shareid=6920541088dc', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (27).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Cutting Fruit ASMR.png',
      title: t('gallery.items.animation.title'),
      description: t('gallery.items.animation.description'),
      useCase: t('gallery.items.animation.useCase'),
      link: getAppUrl('/canvas?shareid=691f3403eece', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (26).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Crunchy Mukbang ASMR.png',
      title: t('gallery.items.commercial.title'),
      description: t('gallery.items.commercial.description'),
      useCase: t('gallery.items.commercial.useCase'),
      link: getAppUrl('/canvas?shareid=691f3372747c', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (25).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Kitten x Slime ASMR.png',
      title: t('gallery.items.documentary.title'),
      description: t('gallery.items.documentary.description'),
      useCase: t('gallery.items.documentary.useCase'),
      link: getAppUrl('/canvas?shareid=691f33af7990', locale),
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
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'MP4 with Audio' },
        { label: t('specs.categories.inputOutput.maxResolution'), value: '1080p HD' },
        { label: t('specs.categories.inputOutput.durationOptions'), value: 'Up to 8s' },
      ],
    },
    {
      title: t('specs.categories.capabilities.title'),
      items: [
        { label: t('specs.categories.capabilities.imageToVideo'), value: true },
        { label: t('specs.categories.capabilities.textToVideo'), value: true },
        { label: t('specs.categories.capabilities.nativeAudio'), value: true },
        { label: t('specs.categories.capabilities.cameraControls'), value: true },
      ],
    },
    {
      title: t('specs.categories.advanced.title'),
      items: [
        { label: t('specs.categories.advanced.physicsSimulation'), value: true },
        { label: t('specs.categories.advanced.sceneExtension'), value: true },
        { label: t('specs.categories.advanced.styleMatching'), value: true },
        { label: t('specs.categories.advanced.characterConsistency'), value: true },
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
    'nativeAudio',
    'maxDuration',
    'resolution',
    'physicsSimulation',
    'cameraControls',
    'sceneExtension',
    'characterConsistency',
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
      name: 'Veo 3',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Veo 3 FAQ',
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
          modelName="Veo 3"
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
