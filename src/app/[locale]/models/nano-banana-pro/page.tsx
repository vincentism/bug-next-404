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
  const t = await getTranslations({ locale, namespace: 'models.nanoBananaPro.model.meta' })
  const canonical = getCanonicalUrl('/models/nano-banana-pro', locale)

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Nano Banana Pro',
      'Gemini 3 Pro Image',
      'Google DeepMind',
      'Google AI image model',
      'text to image AI',
      'image generator',
      'AI image generation',
      'text rendering AI',
      'multi-language image',
      'high quality image generation',
      'OpenCreator Nano Banana',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: canonical,
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/landing/nano-banana-2/images/1.png',
          width: 1200,
          height: 630,
          alt: 'Nano Banana Pro AI Image Generator',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    alternates: {
      ...buildAlternatesMetadata('/models/nano-banana-pro', locale),
    },
  }
}

// Static model data (non-translatable)
const modelData = {
  comparison: {
    features: [
      'Text to Image',
      'Image to Image',
      'Text Rendering',
      'Deep Reasoning',
      'Multi-Language',
      'Output Quality',
    ],
    models: [
      {
        name: 'Nano Banana Pro',
        isHighlighted: true,
        values: {
          'Text to Image': true,
          'Image to Image': true,
          'Text Rendering': true,
          'Deep Reasoning': true,
          'Multi-Language': true,
          'Output Quality': 'Excellent',
        },
      },
      {
        name: 'FLUX.1',
        values: {
          'Text to Image': true,
          'Image to Image': true,
          'Text Rendering': 'partial',
          'Deep Reasoning': false,
          'Multi-Language': 'partial',
          'Output Quality': 'Excellent',
        },
      },
      {
        name: 'Imagen 4',
        values: {
          'Text to Image': true,
          'Image to Image': true,
          'Text Rendering': true,
          'Deep Reasoning': 'partial',
          'Multi-Language': true,
          'Output Quality': 'Excellent',
        },
      },
    ],
  },
  pricing: {
    modelId: 'Fal Nano Banana',
    note: 'Credits are consumed per generation. Actual cost depends on your subscription plan.',
  },
}

// pricing 计算逻辑复用 shared helper（基于订阅模板 + availableModelInstances.credit）

export default async function NanoBananaProModelPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = getCanonicalUrl('/models/nano-banana-pro', locale)

  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.nanoBananaPro.model' }),
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
    heroImage: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/3C Brand Poster.png',
    capabilities: [
      t('hero.capabilities.textToImage'),
      t('hero.capabilities.imageToImage'),
      t('hero.capabilities.textRendering'),
      t('hero.capabilities.reasoning'),
      t('hero.capabilities.multiLanguage'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.compliance.title'),
      description: t('features.items.compliance.description'),
    },
    {
      title: t('features.items.presentation.title'),
      description: t('features.items.presentation.description'),
    },
    {
      title: t('features.items.reasoning.title'),
      description: t('features.items.reasoning.description'),
    },
    {
      title: t('features.items.fluency.title'),
      description: t('features.items.fluency.description'),
    },
    {
      title: t('features.items.textRendering.title'),
      description: t('features.items.textRendering.description'),
    },
    {
      title: t('features.items.quality.title'),
      description: t('features.items.quality.description'),
    },
  ]

  // Gallery items - using actual Fal Nano Banana Edit workflow covers from mapping
  const gallery = [
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/3C Brand Poster.png',
      title: t('gallery.items.conceptArt.title'),
      description: t('gallery.items.conceptArt.description'),
      useCase: t('gallery.items.conceptArt.useCase'),
      workflowLink: getAppUrl('/canvas?shareid=69284bf81862', locale),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Amazon Product Photo Set.png',
      title: t('gallery.items.productVisuals.title'),
      description: t('gallery.items.productVisuals.description'),
      useCase: t('gallery.items.productVisuals.useCase'),
      workflowLink: getAppUrl('/canvas?shareid=69204e7cce26', locale),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1121-templates-covers/Product Infographics.png',
      title: t('gallery.items.infographics.title'),
      description: t('gallery.items.infographics.description'),
      useCase: t('gallery.items.infographics.useCase'),
      workflowLink: getAppUrl('/canvas?shareid=69206a68f77b', locale),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Black Friday Poster.png',
      title: t('gallery.items.posters.title'),
      description: t('gallery.items.posters.description'),
      useCase: t('gallery.items.posters.useCase'),
      workflowLink: getAppUrl('/canvas?shareid=691f2e16b9f1', locale),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Editorial Photography.png',
      title: t('gallery.items.socialMedia.title'),
      description: t('gallery.items.socialMedia.description'),
      useCase: t('gallery.items.socialMedia.useCase'),
      workflowLink: getAppUrl('/canvas?shareid=691f1f18acaa', locale),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Jewelry Ad.png',
      title: t('gallery.items.moodBoards.title'),
      description: t('gallery.items.moodBoards.description'),
      useCase: t('gallery.items.moodBoards.useCase'),
      workflowLink: getAppUrl('/canvas?shareid=692052a047c6', locale),
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
        { label: t('specs.categories.inputOutput.inputFormats'), value: 'Text, JPG, PNG, WEBP' },
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'PNG, JPG' },
        { label: t('specs.categories.inputOutput.maxResolution'), value: 'Up to 2K' },
        { label: t('specs.categories.inputOutput.aspectRatios'), value: '1:1, 16:9, 9:16, 4:3' },
      ],
    },
    {
      title: t('specs.categories.modes.title'),
      items: [
        { label: t('specs.categories.modes.textToImage'), value: true },
        { label: t('specs.categories.modes.imageToImage'), value: true },
        { label: t('specs.categories.modes.inpainting'), value: true },
      ],
    },
    {
      title: t('specs.categories.capabilities.title'),
      items: [
        { label: t('specs.categories.capabilities.textRendering'), value: true },
        { label: t('specs.categories.capabilities.multiLanguage'), value: true },
        { label: t('specs.categories.capabilities.reasoning'), value: true },
      ],
    },
    {
      title: t('specs.categories.performance.title'),
      items: [
        { label: t('specs.categories.performance.generationSpeed'), value: 'Fast' },
        { label: t('specs.categories.performance.batchGeneration'), value: true },
      ],
    },
  ]

  // Comparison features with i18n
  const comparisonFeatureKeys = [
    'textToImage',
    'imageToImage',
    'textRendering',
    'reasoning',
    'multiLanguage',
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
      name: 'Nano Banana Pro',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Nano Banana Pro FAQ',
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
          modelName="Nano Banana Pro"
          description={t('pricing.description')}
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
