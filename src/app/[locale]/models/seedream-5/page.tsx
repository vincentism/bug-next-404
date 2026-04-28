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

type PageProps = {
  params: Promise<{ locale: string }>
}

// SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'models.seedream5.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Seedream 5.0',
      'Seedream 5',
      'ByteDance Seedream',
      'Seedream AI',
      'ByteDance image model',
      'AI image generation',
      'text to image AI',
      'multi-reference AI',
      'text rendering AI',
      'OpenCreator Seedream',
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
          alt: 'Seedream 5.0 AI Image Generator',
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

// Static comparison data
const comparisonData = {
  features: ['textToImage', 'imageEditing', 'multiReference', 'maxResolution', 'textRendering'],
  models: [
    {
      name: 'Seedream 5.0',
      isHighlighted: true,
      values: {
        textToImage: true,
        imageEditing: true,
        multiReference: true,
        maxResolution: '>4K (TBA)',
        textRendering: 'Excellent',
      },
    },
    {
      name: 'Seedream 4.5',
      values: {
        textToImage: true,
        imageEditing: true,
        multiReference: true,
        maxResolution: '4K',
        textRendering: 'Excellent',
      },
    },
    {
      name: 'FLUX.2 Pro',
      values: {
        textToImage: true,
        imageEditing: true,
        multiReference: true,
        maxResolution: '4MP',
        textRendering: 'Excellent',
      },
    },
  ],
}

export default async function Seedream5ModelPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'models.seedream5.model' })
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/seedream-5`

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
    ctaLink: '/models/seedream-4-5',
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  // Features from translations
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
      title: t('features.items.resolution.title'),
      description: t('features.items.resolution.description'),
    },
    {
      title: t('features.items.editing.title'),
      description: t('features.items.editing.description'),
    },
    {
      title: t('features.items.promptFollowing.title'),
      description: t('features.items.promptFollowing.description'),
    },
    {
      title: t('features.items.speed.title'),
      description: t('features.items.speed.description'),
    },
  ]

  // Gallery items - using existing Seedream 4.5 examples as preview
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
      title: t('gallery.items.character.title'),
      description: t('gallery.items.character.description'),
      useCase: t('gallery.items.character.useCase'),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Christmas Sales Poster.png',
      title: t('gallery.items.localization.title'),
      description: t('gallery.items.localization.description'),
      useCase: t('gallery.items.localization.useCase'),
    },
  ]

  // Specs data
  const specs = [
    {
      title: t('specs.categories.inputOutput.title'),
      items: [
        { label: t('specs.categories.inputOutput.inputFormats'), value: 'JPG, PNG, WEBP' },
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'PNG, JPG' },
        { label: t('specs.categories.inputOutput.maxResolution'), value: 'TBA (expected >4K)' },
        { label: t('specs.categories.inputOutput.refImages'), value: 'TBA (expected >10)' },
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
        { label: t('specs.categories.advanced.layoutControl'), value: true },
        { label: t('specs.categories.advanced.styleTransfer'), value: true },
        { label: t('specs.categories.advanced.objectEditing'), value: true },
        { label: t('specs.categories.advanced.languageSupport'), value: '100+' },
      ],
    },
    {
      title: t('specs.categories.performance.title'),
      items: [
        { label: t('specs.categories.performance.generationTime'), value: 'TBA' },
        { label: t('specs.categories.performance.apiAccess'), value: true },
        { label: t('specs.categories.performance.batchProcessing'), value: true },
      ],
    },
  ]

  // Comparison features with i18n
  const comparisonFeatureKeys = comparisonData.features
  const comparisonFeatures = comparisonFeatureKeys.map(key => t(`comparison.features.${key}`))

  const comparisonModels = comparisonData.models.map(model => ({
    ...model,
    values: Object.fromEntries(
      comparisonFeatureKeys.map((key, index) => [
        comparisonFeatures[index],
        model.values[key as keyof typeof model.values],
      ])
    ),
  }))

  // FAQ items
  const faqItems: FAQItem[] = Array.from({ length: 6 }).map((_, index) => ({
    question: t(`faq.items.${index}.question`),
    answer: t(`faq.items.${index}.answer`),
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
      name: 'Seedream 5.0',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Seedream 5.0 FAQ',
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
          modelName="Seedream 5.0"
          description={t('pricing.description')}
          note={t('pricing.note')}
          viewFullPricingText={t('pricing.viewFullPricing')}
          comingSoon={true}
        />

        {/* FAQ Section */}
        <LandingFAQ title={t('faq.title')} items={faqItems} />
      </main>

      <LandingFooter />
    </>
  )
}
