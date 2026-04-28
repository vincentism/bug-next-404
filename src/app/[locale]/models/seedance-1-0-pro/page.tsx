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
  const t = await getTranslations({ locale, namespace: 'models.seedance10Pro.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Seedance 1.0 Pro',
      'Seedance AI',
      'ByteDance video',
      'Seedance video generator',
      'multi-shot AI video',
      'cinematic video AI',
      'Seedance Pro online',
      'Seedance free trial',
      'text to video AI',
      'image to video generator',
      'storytelling AI video',
      'first last frame control',
      'Seed video model',
      'OpenCreator Seedance',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
          width: 1200,
          height: 630,
          alt: 'Seedance 1.0 Pro AI Video Generator',
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
      'Multi-Shot',
      'Max Duration',
      'Resolution',
      'Smooth Motion',
      'Prompt Following',
      'Style Variety',
    ],
    models: [
      {
        name: 'Seedance Pro',
        isHighlighted: true,
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Multi-Shot': true,
          'Max Duration': '10s',
          Resolution: '1080p',
          'Smooth Motion': true,
          'Prompt Following': true,
          'Style Variety': true,
        },
      },
      {
        name: 'Kling 2.1',
        values: {
          'Image to Video': true,
          'Text to Video': false,
          'Multi-Shot': false,
          'Max Duration': '10s',
          Resolution: '1080p',
          'Smooth Motion': true,
          'Prompt Following': 'partial',
          'Style Variety': 'partial',
        },
      },
      {
        name: 'Veo 3',
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Multi-Shot': false,
          'Max Duration': '8s',
          Resolution: '1080p',
          'Smooth Motion': true,
          'Prompt Following': true,
          'Style Variety': true,
        },
      },
    ],
  },
  pricing: {
    modelId: 'doubao-seedance-1-0-pro',
    note: 'Credits are consumed per generation. Actual cost depends on your subscription plan.',
  },
}

export default async function Seedance10ProModelPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/seedance-1-0-pro`

  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.seedance10Pro.model' }),
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
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (8).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
    capabilities: [
      t('hero.capabilities.imageToVideo'),
      t('hero.capabilities.textToVideo'),
      t('hero.capabilities.multiShot'),
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
      title: t('features.items.multiShot.title'),
      description: t('features.items.multiShot.description'),
    },
    {
      title: t('features.items.motion.title'),
      description: t('features.items.motion.description'),
    },
    {
      title: t('features.items.prompt.title'),
      description: t('features.items.prompt.description'),
    },
    { title: t('features.items.style.title'), description: t('features.items.style.description') },
    {
      title: t('features.items.quality.title'),
      description: t('features.items.quality.description'),
    },
    {
      title: t('features.items.resolution.title'),
      description: t('features.items.resolution.description'),
    },
  ]

  // Using actual Seedance Pro (doubao-seedance-1-0-pro) workflow assets
  const gallery = [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (17).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Enterprise Product Ad.png',
      title: t('gallery.items.cinematic.title'),
      description: t('gallery.items.cinematic.description'),
      useCase: t('gallery.items.cinematic.useCase'),
      link: getAppUrl('/canvas?shareid=691f25484cd0', locale),
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
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (11).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Billboard Ad.png',
      title: t('gallery.items.fashion.title'),
      description: t('gallery.items.fashion.description'),
      useCase: t('gallery.items.fashion.useCase'),
      link: getAppUrl('/canvas?shareid=691f282fb403', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/uploads/II5UT76IWu.mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/3D Figure Design.png',
      title: t('gallery.items.storytelling.title'),
      description: t('gallery.items.storytelling.description'),
      useCase: t('gallery.items.storytelling.useCase'),
      link: getAppUrl('/canvas?shareid=691f325f2bc1', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-videos/Houte.mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/haute.png',
      title: t('gallery.items.commercial.title'),
      description: t('gallery.items.commercial.description'),
      useCase: t('gallery.items.commercial.useCase'),
      link: getAppUrl('/canvas?shareid=69285afcf73f', locale),
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
        { label: t('specs.categories.inputOutput.maxResolution'), value: '1080p HD' },
        { label: t('specs.categories.inputOutput.durationOptions'), value: '5s / 10s' },
      ],
    },
    {
      title: t('specs.categories.capabilities.title'),
      items: [
        { label: t('specs.categories.capabilities.imageToVideo'), value: true },
        { label: t('specs.categories.capabilities.textToVideo'), value: true },
        { label: t('specs.categories.capabilities.multiShot'), value: true },
        { label: t('specs.categories.capabilities.firstLastFrame'), value: true },
      ],
    },
    {
      title: t('specs.categories.advanced.title'),
      items: [
        { label: t('specs.categories.advanced.smoothMotion'), value: true },
        { label: t('specs.categories.advanced.promptFollowing'), value: true },
        { label: t('specs.categories.advanced.styleVariety'), value: true },
        { label: t('specs.categories.advanced.cinematicQuality'), value: true },
      ],
    },
    {
      title: t('specs.categories.performance.title'),
      items: [
        { label: t('specs.categories.performance.generationTime'), value: '2-4 min' },
        { label: t('specs.categories.performance.apiAccess'), value: true },
        { label: t('specs.categories.performance.batchProcessing'), value: true },
      ],
    },
  ]

  // Comparison features with i18n
  const comparisonFeatureKeys = [
    'imageToVideo',
    'textToVideo',
    'multiShot',
    'maxDuration',
    'resolution',
    'smoothMotion',
    'promptFollowing',
    'styleVariety',
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
      name: 'Seedance 1.0 Pro',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Seedance 1.0 Pro FAQ',
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
          modelName="Seedance 1.0 Pro"
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
