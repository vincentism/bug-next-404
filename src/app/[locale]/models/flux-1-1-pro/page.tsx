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
  const t = await getTranslations({ locale, namespace: 'models.flux11Pro.model.meta' })
  const canonical = getCanonicalUrl('/models/flux-1-1-pro', locale)

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'FLUX 1.1 Pro',
      'Black Forest Labs',
      'FLUX AI',
      'text to image AI',
      'fast image generator',
      'AI image generation',
      'photorealistic AI',
      'prompt following',
      'high quality image',
      'FLUX Pro online',
      'OpenCreator FLUX',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: canonical,
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/3C Brand Poster.png',
          width: 1200,
          height: 630,
          alt: 'FLUX 1.1 Pro AI Image Generator',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    alternates: {
      ...buildAlternatesMetadata('/models/flux-1-1-pro', locale),
    },
  }
}

// Static model data (non-translatable)
const modelData = {
  comparison: {
    features: [
      'Text to Image',
      'Generation Speed',
      'Prompt Following',
      'Photorealism',
      'Output Diversity',
      'Visual Quality',
    ],
    models: [
      {
        name: 'FLUX 1.1 Pro',
        isHighlighted: true,
        values: {
          'Text to Image': true,
          'Generation Speed': 'Very Fast',
          'Prompt Following': 'Excellent',
          Photorealism: 'Excellent',
          'Output Diversity': 'High',
          'Visual Quality': 'Excellent',
        },
      },
      {
        name: 'Nano Banana 2',
        values: {
          'Text to Image': true,
          'Generation Speed': 'Fast',
          'Prompt Following': 'Excellent',
          Photorealism: 'Good',
          'Output Diversity': 'High',
          'Visual Quality': 'Excellent',
        },
      },
      {
        name: 'Imagen 4',
        values: {
          'Text to Image': true,
          'Generation Speed': 'Medium',
          'Prompt Following': 'Excellent',
          Photorealism: 'Excellent',
          'Output Diversity': 'Medium',
          'Visual Quality': 'Excellent',
        },
      },
    ],
  },
  pricing: {
    modelId: 'Flux 1.1 Pro',
    note: 'Credits are consumed per generation. Actual cost depends on your subscription plan.',
  },
}

export default async function Flux11ProModelPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = getCanonicalUrl('/models/flux-1-1-pro', locale)

  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.flux11Pro.model' }),
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
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
    capabilities: [
      t('hero.capabilities.textToImage'),
      t('hero.capabilities.blazingSpeed'),
      t('hero.capabilities.promptFollowing'),
      t('hero.capabilities.highQuality'),
      t('hero.capabilities.diversity'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.speed.title'),
      description: t('features.items.speed.description'),
    },
    {
      title: t('features.items.promptFollowing.title'),
      description: t('features.items.promptFollowing.description'),
    },
    {
      title: t('features.items.quality.title'),
      description: t('features.items.quality.description'),
    },
    {
      title: t('features.items.diversity.title'),
      description: t('features.items.diversity.description'),
    },
    {
      title: t('features.items.photorealism.title'),
      description: t('features.items.photorealism.description'),
    },
    {
      title: t('features.items.hands.title'),
      description: t('features.items.hands.description'),
    },
  ]

  // Gallery items - using actual Fal Flux Pro Kontext workflow covers from mapping
  // Note: This model has limited workflow examples (4 total)
  const gallery = [
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Streetwear UGC Promo.png',
      title: t('gallery.items.portrait.title'),
      description: t('gallery.items.portrait.description'),
      useCase: t('gallery.items.portrait.useCase'),
      workflowLink: getAppUrl('/canvas?shareid=691f269d38df', locale),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
      title: t('gallery.items.product.title'),
      description: t('gallery.items.product.description'),
      useCase: t('gallery.items.product.useCase'),
      workflowLink: getAppUrl('/canvas?shareid=692053b03267', locale),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Sportswear On-Model Ad.png',
      title: t('gallery.items.landscape.title'),
      description: t('gallery.items.landscape.description'),
      useCase: t('gallery.items.landscape.useCase'),
      workflowLink: getAppUrl('/canvas?shareid=691f2991a2bc', locale),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Lyrics to MV.png',
      title: t('gallery.items.artistic.title'),
      description: t('gallery.items.artistic.description'),
      useCase: t('gallery.items.artistic.useCase'),
      workflowLink: getAppUrl('/canvas?shareid=691f3672857c', locale),
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
        { label: t('specs.categories.inputOutput.inputFormats'), value: 'Text Prompt' },
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'PNG, JPG, WEBP' },
        { label: t('specs.categories.inputOutput.maxResolution'), value: 'Up to 4MP (Ultra)' },
        { label: t('specs.categories.inputOutput.aspectRatios'), value: '1:1, 16:9, 9:16, 4:3' },
      ],
    },
    {
      title: t('specs.categories.modes.title'),
      items: [
        { label: t('specs.categories.modes.textToImage'), value: true },
        { label: t('specs.categories.modes.ultraMode'), value: true },
        { label: t('specs.categories.modes.rawMode'), value: true },
      ],
    },
    {
      title: t('specs.categories.performance.title'),
      items: [
        { label: t('specs.categories.performance.generationSpeed'), value: 'Very Fast' },
        { label: t('specs.categories.performance.parameters'), value: '12B' },
        { label: t('specs.categories.performance.architecture'), value: 'Flow Transformer' },
      ],
    },
    {
      title: t('specs.categories.quality.title'),
      items: [
        { label: t('specs.categories.quality.photorealism'), value: 'Excellent' },
        { label: t('specs.categories.quality.promptFidelity'), value: 'Excellent' },
        { label: t('specs.categories.quality.anatomyAccuracy'), value: 'High' },
      ],
    },
  ]

  // Comparison features with i18n
  const comparisonFeatureKeys = [
    'textToImage',
    'speed',
    'promptFollowing',
    'photorealism',
    'diversity',
    'quality',
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
      name: 'FLUX 1.1 Pro',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'FLUX 1.1 Pro FAQ',
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
          modelName="FLUX 1.1 Pro"
          note={t('pricing.note')}
          viewFullPricingText={t('pricing.viewFullPricing')}
          planSummaries={planSummaries}
          planSectionTitle={t('pricing.planSectionTitle')}
          planCreditsPerMonthLabel={t('pricing.planCreditsPerMonthLabel')}
          planPerGenerationLabel={t('pricing.planPerGenerationLabel')}
        />

        {/* FAQ Section */}
        <LandingFAQ title={t('faq.title')} items={faqItems} />
      </main>

      <LandingFooter />
    </>
  )
}
