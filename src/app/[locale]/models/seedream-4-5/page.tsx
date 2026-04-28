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
  const t = await getTranslations({ locale, namespace: 'models.seedream45.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Seedream 4.5',
      'ByteDance Seedream 4.5',
      'ByteDance Seedream 4.5 image model',
      'ByteDance Seedream 4.5 AI model',
      'ByteDance Seedream 4.5 image model 2025',
      'Seedream 4.5 ByteDance image model',
      'ByteDance Seedream 4.5 image editing',
      'Seedream 4.5 AI model',
      'Doubao image model',
      'text to image AI',
      'AI image generation',
      'multi-reference AI image',
      'text rendering AI',
      '4K AI image generator',
      'e-commerce product photography AI',
      'Seedream 4.5 online',
      'Seedream 4.5 free',
      'OpenCreator Seedream 4.5',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/3C Brand Poster.png',
          width: 1200,
          height: 630,
          alt: 'Seedream 4.5 AI Image Generator',
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
      'Text to Image',
      'Image Editing',
      'Multi-Reference',
      'Max Resolution',
      'Text Rendering',
      'Max References',
    ],
    models: [
      {
        name: 'Seedream 4.5',
        isHighlighted: true,
        values: {
          'Text to Image': true,
          'Image Editing': true,
          'Multi-Reference': true,
          'Max Resolution': '4K',
          'Text Rendering': 'Excellent',
          'Max References': '10',
        },
      },
      {
        name: 'FLUX 1.1 Pro',
        values: {
          'Text to Image': true,
          'Image Editing': 'partial',
          'Multi-Reference': false,
          'Max Resolution': '4MP',
          'Text Rendering': 'partial',
          'Max References': '1',
        },
      },
      {
        name: 'Nano Banana Pro',
        values: {
          'Text to Image': true,
          'Image Editing': true,
          'Multi-Reference': true,
          'Max Resolution': '2K',
          'Text Rendering': 'Excellent',
          'Max References': '4',
        },
      },
    ],
  },
  pricing: {
    modelId: 'Fal_Seedream_V4.5_Text_to_Image',
  },
}

export default async function Seedream45ModelPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/seedream-4-5`

  // 获取订阅方案定价（使用 Nano Banana Pro 作为参考模型）
  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.seedream45.model' }),
    getPricingConfig(),
  ])
  const planSummaries = subscriptionData
    ? buildPlanSummaries(subscriptionData, stripePlan, 'fal-ai/nano-banana')
    : []

  // Hero data from translations
  const heroData = {
    modelName: t('hero.modelName'),
    tagline: t('hero.tagline'),
    description: t('hero.description'),
    heroImage: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/3C Brand Poster.png',
    capabilities: [
      t('hero.capabilities.textToImage'),
      t('hero.capabilities.multiReference'),
      t('hero.capabilities.resolution'),
      t('hero.capabilities.textRendering'),
      t('hero.capabilities.editing'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.multiRef.title'),
      description: t('features.items.multiRef.description'),
    },
    {
      title: t('features.items.textRendering.title'),
      description: t('features.items.textRendering.description'),
    },
    {
      title: t('features.items.clarity.title'),
      description: t('features.items.clarity.description'),
    },
    {
      title: t('features.items.resolution.title'),
      description: t('features.items.resolution.description'),
    },
    {
      title: t('features.items.faceRendering.title'),
      description: t('features.items.faceRendering.description'),
    },
    {
      title: t('features.items.instructionFollowing.title'),
      description: t('features.items.instructionFollowing.description'),
    },
  ]

  // Gallery items - using existing template covers as placeholders
  const gallery = [
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/3C Brand Poster.png',
      title: t('gallery.items.ecommerce.title'),
      description: t('gallery.items.ecommerce.description'),
      useCase: t('gallery.items.ecommerce.useCase'),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Black Friday Poster.png',
      title: t('gallery.items.brandVisual.title'),
      description: t('gallery.items.brandVisual.description'),
      useCase: t('gallery.items.brandVisual.useCase'),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Movie Poster.png',
      title: t('gallery.items.poster.title'),
      description: t('gallery.items.poster.description'),
      useCase: t('gallery.items.poster.useCase'),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Enterprise Product Ad.png',
      title: t('gallery.items.advertising.title'),
      description: t('gallery.items.advertising.description'),
      useCase: t('gallery.items.advertising.useCase'),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/3D Figure Design.png',
      title: t('gallery.items.gameArt.title'),
      description: t('gallery.items.gameArt.description'),
      useCase: t('gallery.items.gameArt.useCase'),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Christmas Sales Poster.png',
      title: t('gallery.items.localization.title'),
      description: t('gallery.items.localization.description'),
      useCase: t('gallery.items.localization.useCase'),
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
        { label: t('specs.categories.inputOutput.inputFormats'), value: 'JPG, PNG, WEBP' },
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'PNG, JPG' },
        { label: t('specs.categories.inputOutput.maxResolution'), value: '4K' },
        { label: t('specs.categories.inputOutput.refImages'), value: 'Up to 10' },
      ],
    },
    {
      title: t('specs.categories.capabilities.title'),
      items: [
        { label: t('specs.categories.capabilities.textToImage'), value: true },
        { label: t('specs.categories.capabilities.imageEditing'), value: true },
        { label: t('specs.categories.capabilities.multiReference'), value: true },
        { label: t('specs.categories.capabilities.textRendering'), value: true },
      ],
    },
    {
      title: t('specs.categories.advanced.title'),
      items: [
        { label: t('specs.categories.advanced.spatialCoherence'), value: true },
        { label: t('specs.categories.advanced.faceRendering'), value: true },
        { label: t('specs.categories.advanced.cinematicLighting'), value: true },
        { label: t('specs.categories.advanced.instructionFollowing'), value: true },
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
    'textToImage',
    'imageEditing',
    'multiReference',
    'maxResolution',
    'textRendering',
    'referenceCount',
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

  // Schema.org structured data
  const schemaData = createSchemaGraph([
    buildWebPageSchema({
      url: pageUrl,
      name: t('meta.title'),
      description: t('meta.description'),
    }),
    buildSoftwareApplicationSchema({
      url: pageUrl,
      name: 'Seedream 4.5',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Seedream 4.5 FAQ',
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

        {/* Gallery Section */}
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
          modelId="Fal_Seedream_V4.5_Text_to_Image"
          modelName="Seedream 4.5"
          description={t('pricing.description')}
          note={t('pricing.note')}
          viewFullPricingText={t('pricing.viewFullPricing')}
          planSummaries={planSummaries}
          planSectionTitle={t('pricing.planSectionTitle')}
        />

        {/* FAQ Section */}
        <LandingFAQ title={t('faq.title')} items={faqItems} />
      </main>

      <LandingFooter />
    </>
  )
}
