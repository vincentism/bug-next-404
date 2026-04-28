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
  const t = await getTranslations({ locale, namespace: 'models.lumaRay2.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Luma Ray 2',
      'Luma AI',
      'Luma Dream Machine',
      'Luma video generator',
      'photorealistic AI video',
      'natural motion AI',
      'Luma Ray 2 online',
      'Luma Ray free trial',
      'image to video AI',
      'realistic video generation',
      'physics simulation video',
      'instruction following AI',
      'Luma Labs video',
      'OpenCreator Luma',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Background VFX.png',
          width: 1200,
          height: 630,
          alt: 'Luma Ray 2 AI Video Generator',
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
      'Natural Motion',
      'Photorealism',
      'Physics Simulation',
      'Instruction Following',
      'Video Input',
      'Style Control',
    ],
    models: [
      {
        name: 'Luma Ray 2',
        isHighlighted: true,
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Natural Motion': true,
          Photorealism: true,
          'Physics Simulation': true,
          'Instruction Following': true,
          'Video Input': true,
          'Style Control': true,
        },
      },
      {
        name: 'Kling 2.1',
        values: {
          'Image to Video': true,
          'Text to Video': false,
          'Natural Motion': true,
          Photorealism: true,
          'Physics Simulation': true,
          'Instruction Following': 'partial',
          'Video Input': false,
          'Style Control': 'partial',
        },
      },
      {
        name: 'Veo 3',
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Natural Motion': true,
          Photorealism: true,
          'Physics Simulation': true,
          'Instruction Following': true,
          'Video Input': false,
          'Style Control': true,
        },
      },
    ],
  },
  pricing: {
    modelId: 'Luma Ray 2',
    note: 'Credits are consumed per generation. Actual cost depends on your subscription plan.',
  },
}

export default async function LumaRay2ModelPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/luma-ray-2`

  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.lumaRay2.model' }),
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
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (15).mp4',
    heroImage: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Background VFX.png',
    capabilities: [
      t('hero.capabilities.imageToVideo'),
      t('hero.capabilities.naturalMotion'),
      t('hero.capabilities.physics'),
      t('hero.capabilities.photorealism'),
      t('hero.capabilities.instructions'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.motion.title'),
      description: t('features.items.motion.description'),
    },
    {
      title: t('features.items.photorealism.title'),
      description: t('features.items.photorealism.description'),
    },
    {
      title: t('features.items.physics.title'),
      description: t('features.items.physics.description'),
    },
    {
      title: t('features.items.instructions.title'),
      description: t('features.items.instructions.description'),
    },
    {
      title: t('features.items.imageToVideo.title'),
      description: t('features.items.imageToVideo.description'),
    },
    {
      title: t('features.items.cinematic.title'),
      description: t('features.items.cinematic.description'),
    },
  ]

  // Using existing gallery videos as reference
  const gallery = [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (15).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Background VFX.png',
      title: t('gallery.items.nature.title'),
      description: t('gallery.items.nature.description'),
      useCase: t('gallery.items.nature.useCase'),
      link: getAppUrl('/canvas?shareid=691f26e8e3be', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (14).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Product Floral Effect.png',
      title: t('gallery.items.product.title'),
      description: t('gallery.items.product.description'),
      useCase: t('gallery.items.product.useCase'),
      link: getAppUrl('/canvas?shareid=691f2718d87a', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (6).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Sportswear On-Model Ad.png',
      title: t('gallery.items.portrait.title'),
      description: t('gallery.items.portrait.description'),
      useCase: t('gallery.items.portrait.useCase'),
      link: getAppUrl('/canvas?shareid=691f2991a2bc', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (2).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Animal Olympics.png',
      title: t('gallery.items.surreal.title'),
      description: t('gallery.items.surreal.description'),
      useCase: t('gallery.items.surreal.useCase'),
      link: getAppUrl('/canvas?shareid=691f3145c52e', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (9).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Food Product ASMR.png',
      title: t('gallery.items.closeup.title'),
      description: t('gallery.items.closeup.description'),
      useCase: t('gallery.items.closeup.useCase'),
      link: getAppUrl('/canvas?shareid=691f295ce7e5', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (12).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Product Explosion Effect.png',
      title: t('gallery.items.vfx.title'),
      description: t('gallery.items.vfx.description'),
      useCase: t('gallery.items.vfx.useCase'),
      link: getAppUrl('/canvas?shareid=691f27d7ca9a', locale),
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
        { label: t('specs.categories.inputOutput.inputFormats'), value: 'JPG, PNG, WEBP, Video' },
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'MP4' },
        { label: t('specs.categories.inputOutput.maxResolution'), value: '1080p HD' },
        { label: t('specs.categories.inputOutput.durationOptions'), value: '5s' },
      ],
    },
    {
      title: t('specs.categories.capabilities.title'),
      items: [
        { label: t('specs.categories.capabilities.imageToVideo'), value: true },
        { label: t('specs.categories.capabilities.textToVideo'), value: true },
        { label: t('specs.categories.capabilities.videoInput'), value: true },
        { label: t('specs.categories.capabilities.styleControl'), value: true },
      ],
    },
    {
      title: t('specs.categories.advanced.title'),
      items: [
        { label: t('specs.categories.advanced.physicsSimulation'), value: true },
        { label: t('specs.categories.advanced.naturalMotion'), value: true },
        { label: t('specs.categories.advanced.photorealism'), value: true },
        { label: t('specs.categories.advanced.instructionFollowing'), value: true },
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
    'naturalMotion',
    'photorealism',
    'physicsSimulation',
    'instructionFollowing',
    'videoInput',
    'styleControl',
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
      name: 'Luma Ray 2',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Luma Ray 2 FAQ',
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
          modelName="Luma Ray 2"
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
