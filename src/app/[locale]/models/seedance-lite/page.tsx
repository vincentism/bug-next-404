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
import { getAppUrl } from '@/lib/app-url'

type PageProps = {
  params: Promise<{ locale: string }>
}

// SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'models.seedanceLite.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Seedance Lite',
      'ByteDance Seedance',
      'Seedance video generator',
      'multi-reference video',
      'first last frame',
      'affordable AI video',
      'fast video generation',
      'TikTok AI video',
      'image to video AI',
      'Seedance Lite online',
      'budget AI video',
      'smooth motion video',
      'OpenCreator Seedance',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
          width: 1200,
          height: 630,
          alt: 'Seedance Lite AI Video Generator',
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
      'Multi-Reference Mode',
      'First-Last Frame',
      'Smooth Motion',
      'Max Duration',
      'Resolution',
      'Cost Efficiency',
    ],
    models: [
      {
        name: 'Seedance Lite',
        isHighlighted: true,
        values: {
          'Image to Video': true,
          'Multi-Reference Mode': true,
          'First-Last Frame': true,
          'Smooth Motion': true,
          'Max Duration': '10s',
          Resolution: '720p',
          'Cost Efficiency': 'High',
        },
      },
      {
        name: 'Seedance Pro',
        values: {
          'Image to Video': true,
          'Multi-Reference Mode': false,
          'First-Last Frame': true,
          'Smooth Motion': true,
          'Max Duration': '10s',
          Resolution: '1080p',
          'Cost Efficiency': 'Medium',
        },
      },
      {
        name: 'Kling 2.1',
        values: {
          'Image to Video': true,
          'Multi-Reference Mode': false,
          'First-Last Frame': true,
          'Smooth Motion': true,
          'Max Duration': '10s',
          Resolution: '1080p',
          'Cost Efficiency': 'Medium',
        },
      },
    ],
  },
  pricing: {
    // Seedance Lite is not yet in availableModelInstances, use Pro as reference
    modelId: 'Fal Seedance 1.0 Lite Image to Video',
    note: 'Seedance Lite pricing will be available upon launch. Expected to be more affordable than Pro version.',
  },
}

export default async function SeedanceLiteModelPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'models.seedanceLite.model' })
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/seedance-lite`

  // 从翻译文件获取数据
  const heroData = {
    modelName: t('hero.modelName'),
    tagline: t('hero.tagline'),
    description: t('hero.description'),
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
    capabilities: [
      t('hero.capabilities.imageToVideo'),
      t('hero.capabilities.multiReference'),
      t('hero.capabilities.firstLastFrame'),
      t('hero.capabilities.smoothMotion'),
      t('hero.capabilities.affordable'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.multiReference.title'),
      description: t('features.items.multiReference.description'),
    },
    {
      title: t('features.items.firstLastFrame.title'),
      description: t('features.items.firstLastFrame.description'),
    },
    {
      title: t('features.items.smoothMotion.title'),
      description: t('features.items.smoothMotion.description'),
    },
    {
      title: t('features.items.speed.title'),
      description: t('features.items.speed.description'),
    },
    {
      title: t('features.items.affordable.title'),
      description: t('features.items.affordable.description'),
    },
    {
      title: t('features.items.styles.title'),
      description: t('features.items.styles.description'),
    },
  ]

  // Gallery items - using Seedance series workflow assets (shared with Seedance Pro)
  const gallery = [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (17).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Enterprise Product Ad.png',
      title: t('gallery.items.consistency.title'),
      description: t('gallery.items.consistency.description'),
      useCase: t('gallery.items.consistency.useCase'),
      link: getAppUrl('/canvas?shareid=691f25484cd0', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (14).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Product Floral Effect.png',
      title: t('gallery.items.transition.title'),
      description: t('gallery.items.transition.description'),
      useCase: t('gallery.items.transition.useCase'),
      link: getAppUrl('/canvas?shareid=691f2718d87a', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (11).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Billboard Ad.png',
      title: t('gallery.items.product.title'),
      description: t('gallery.items.product.description'),
      useCase: t('gallery.items.product.useCase'),
      link: getAppUrl('/canvas?shareid=691f282fb403', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/uploads/II5UT76IWu.mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/3D Figure Design.png',
      title: t('gallery.items.social.title'),
      description: t('gallery.items.social.description'),
      useCase: t('gallery.items.social.useCase'),
      link: getAppUrl('/canvas?shareid=691f325f2bc1', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-videos/Houte.mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/haute.png',
      title: t('gallery.items.animation.title'),
      description: t('gallery.items.animation.description'),
      useCase: t('gallery.items.animation.useCase'),
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
        { label: t('specs.categories.inputOutput.maxResolution'), value: '720p' },
        { label: t('specs.categories.inputOutput.durationOptions'), value: '5s, 10s' },
      ],
    },
    {
      title: t('specs.categories.modes.title'),
      items: [
        { label: t('specs.categories.modes.imageToVideo'), value: true },
        { label: t('specs.categories.modes.textToVideo'), value: true },
        { label: t('specs.categories.modes.multiReference'), value: true },
        { label: t('specs.categories.modes.firstLastFrame'), value: true },
      ],
    },
    {
      title: t('specs.categories.motion.title'),
      items: [
        { label: t('specs.categories.motion.smoothMotion'), value: true },
        { label: t('specs.categories.motion.largeScale'), value: true },
        { label: t('specs.categories.motion.physicalRealism'), value: true },
      ],
    },
    {
      title: t('specs.categories.performance.title'),
      items: [
        { label: t('specs.categories.performance.generationSpeed'), value: 'Fast' },
        { label: t('specs.categories.performance.costEfficiency'), value: 'High' },
      ],
    },
  ]

  // Comparison features with i18n
  const comparisonFeatureKeys = [
    'imageToVideo',
    'multiReference',
    'firstLastFrame',
    'smoothMotion',
    'maxDuration',
    'resolution',
    'costEfficiency',
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
      name: 'Seedance Lite',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Seedance Lite FAQ',
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

        {/* Pricing Section - Note: Seedance Lite not yet in availableModelInstances */}
        <ModelPricing
          title={t('pricing.title')}
          subtitle={t('pricing.subtitle')}
          modelId={modelData.pricing.modelId}
          modelName="Seedance Lite"
          note={t('pricing.note')}
          viewFullPricingText={t('pricing.viewFullPricing')}
        />

        {/* FAQ Section */}
        <LandingFAQ title={t('faq.title')} items={faqItems} />
      </main>

      <LandingFooter />
    </>
  )
}
