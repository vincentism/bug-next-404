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
  const t = await getTranslations({ locale, namespace: 'models.imagen4.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Imagen 4',
      'Google Imagen',
      'Google DeepMind',
      'text to image AI',
      'photorealistic AI',
      'AI image generation',
      'text rendering AI',
      '2K resolution',
      'ultra fast image',
      'Imagen 4 online',
      'OpenCreator Imagen',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/AI Headshot.png',
          width: 1200,
          height: 630,
          alt: 'Imagen 4 AI Image Generator',
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
      'Photorealism',
      'Text Rendering',
      'Max Resolution',
      'Generation Speed',
      'Art Style Diversity',
    ],
    models: [
      {
        name: 'Imagen 4',
        isHighlighted: true,
        values: {
          'Text to Image': true,
          Photorealism: 'Excellent',
          'Text Rendering': 'Excellent',
          'Max Resolution': '2K',
          'Generation Speed': 'Ultra-Fast',
          'Art Style Diversity': 'High',
        },
      },
      {
        name: 'FLUX 1.1 Pro',
        values: {
          'Text to Image': true,
          Photorealism: 'Excellent',
          'Text Rendering': 'partial',
          'Max Resolution': '4MP',
          'Generation Speed': 'Very Fast',
          'Art Style Diversity': 'High',
        },
      },
      {
        name: 'Nano Banana 2',
        values: {
          'Text to Image': true,
          Photorealism: 'Good',
          'Text Rendering': 'Excellent',
          'Max Resolution': '2K',
          'Generation Speed': 'Fast',
          'Art Style Diversity': 'High',
        },
      },
    ],
  },
  pricing: {
    modelId: 'Fal Imagen 4',
    note: 'Credits are consumed per generation. Actual cost depends on your subscription plan.',
  },
}

export default async function Imagen4ModelPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/imagen-4`

  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.imagen4.model' }),
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
    heroImage: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Movie Poster.png',
    capabilities: [
      t('hero.capabilities.textToImage'),
      t('hero.capabilities.photorealistic'),
      t('hero.capabilities.textRendering'),
      t('hero.capabilities.highResolution'),
      t('hero.capabilities.ultraFast'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.photorealistic.title'),
      description: t('features.items.photorealistic.description'),
    },
    {
      title: t('features.items.textRendering.title'),
      description: t('features.items.textRendering.description'),
    },
    {
      title: t('features.items.ultraFast.title'),
      description: t('features.items.ultraFast.description'),
    },
    {
      title: t('features.items.resolution.title'),
      description: t('features.items.resolution.description'),
    },
    {
      title: t('features.items.styles.title'),
      description: t('features.items.styles.description'),
    },
    {
      title: t('features.items.details.title'),
      description: t('features.items.details.description'),
    },
  ]

  // Gallery items - using actual Fal Imagen 4 workflow covers from mapping
  // Note: This model has very limited workflow examples (2 total)
  const gallery = [
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/YouTube Vlog Thumbnail.png',
      title: t('gallery.items.photorealistic.title'),
      description: t('gallery.items.photorealistic.description'),
      useCase: t('gallery.items.photorealistic.useCase'),
      workflowLink: getAppUrl('/canvas?shareid=691f24c7302f', locale),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Movie Poster.png',
      title: t('gallery.items.typography.title'),
      description: t('gallery.items.typography.description'),
      useCase: t('gallery.items.typography.useCase'),
      workflowLink: getAppUrl('/canvas?shareid=691f2302e27c', locale),
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
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'PNG, JPG' },
        { label: t('specs.categories.inputOutput.maxResolution'), value: '2K' },
        { label: t('specs.categories.inputOutput.aspectRatios'), value: '1:1, 16:9, 9:16, 4:3' },
      ],
    },
    {
      title: t('specs.categories.modes.title'),
      items: [
        { label: t('specs.categories.modes.textToImage'), value: true },
        { label: t('specs.categories.modes.ultraFast'), value: true },
        { label: t('specs.categories.modes.highQuality'), value: true },
      ],
    },
    {
      title: t('specs.categories.capabilities.title'),
      items: [
        { label: t('specs.categories.capabilities.textRendering'), value: 'Excellent' },
        { label: t('specs.categories.capabilities.photorealism'), value: 'Excellent' },
        { label: t('specs.categories.capabilities.artStyles'), value: 'Diverse' },
      ],
    },
    {
      title: t('specs.categories.safety.title'),
      items: [
        { label: t('specs.categories.safety.synthId'), value: true },
        { label: t('specs.categories.safety.safetyFilters'), value: true },
      ],
    },
  ]

  // Comparison features with i18n
  const comparisonFeatureKeys = [
    'textToImage',
    'photorealism',
    'textRendering',
    'resolution',
    'speed',
    'artStyles',
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
      name: 'Imagen 4',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Imagen 4 FAQ',
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
          modelName="Imagen 4"
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
