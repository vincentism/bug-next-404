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
  const t = await getTranslations({ locale, namespace: 'models.veo31.model.meta' })
  const canonical = getCanonicalUrl('/models/veo-3-1', locale)

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Veo 3.1',
      'Google Veo 3.1',
      'Veo AI video generator',
      'multi-reference mode',
      'first last frame',
      'subject consistency',
      'AI video with audio',
      'native audio generation',
      'Google DeepMind video',
      'image to video AI',
      'Veo 3.1 online',
      'Veo 3.1 free trial',
      'scene extension',
      'OpenCreator Veo',
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
          alt: 'Veo 3.1 AI Video Generator',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    alternates: {
      ...buildAlternatesMetadata('/models/veo-3-1', locale),
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
      'Native Audio',
      'Max Duration',
      'Resolution',
      'Scene Extension',
      'Subject Consistency',
    ],
    models: [
      {
        name: 'Veo 3.1',
        isHighlighted: true,
        values: {
          'Image to Video': true,
          'Multi-Reference Mode': true,
          'First-Last Frame': true,
          'Native Audio': true,
          'Max Duration': '8s',
          Resolution: '1080p',
          'Scene Extension': true,
          'Subject Consistency': true,
        },
      },
      {
        name: 'Veo 3',
        values: {
          'Image to Video': true,
          'Multi-Reference Mode': false,
          'First-Last Frame': false,
          'Native Audio': true,
          'Max Duration': '8s',
          Resolution: '1080p',
          'Scene Extension': true,
          'Subject Consistency': 'partial',
        },
      },
      {
        name: 'Kling 2.1',
        values: {
          'Image to Video': true,
          'Multi-Reference Mode': false,
          'First-Last Frame': true,
          'Native Audio': 'partial',
          'Max Duration': '10s',
          Resolution: '1080p',
          'Scene Extension': false,
          'Subject Consistency': true,
        },
      },
    ],
  },
  pricing: {
    modelId: 'google/veo3.1/image-to-video',
    note: 'Credits are consumed per generation. Actual cost depends on your subscription plan.',
  },
}

export default async function Veo31ModelPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = getCanonicalUrl('/models/veo-3-1', locale)

  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.veo31.model' }),
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
      t('hero.capabilities.multiReference'),
      t('hero.capabilities.firstLastFrame'),
      t('hero.capabilities.nativeAudio'),
      t('hero.capabilities.resolution'),
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
      title: t('features.items.audio.title'),
      description: t('features.items.audio.description'),
    },
    {
      title: t('features.items.sceneExtension.title'),
      description: t('features.items.sceneExtension.description'),
    },
    {
      title: t('features.items.quality.title'),
      description: t('features.items.quality.description'),
    },
    {
      title: t('features.items.narrative.title'),
      description: t('features.items.narrative.description'),
    },
  ]

  // Gallery items - using Veo 3 series workflow assets (shared across Veo 3.x)
  const gallery = [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (13).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/ASMR Promo.png',
      title: t('gallery.items.consistency.title'),
      description: t('gallery.items.consistency.description'),
      useCase: t('gallery.items.consistency.useCase'),
      link: getAppUrl('/canvas?shareid=691f27c703c2', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (9).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Food Product ASMR.png',
      title: t('gallery.items.transition.title'),
      description: t('gallery.items.transition.description'),
      useCase: t('gallery.items.transition.useCase'),
      link: getAppUrl('/canvas?shareid=691f295ce7e5', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (3).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/POV Leaked Footage.png',
      title: t('gallery.items.product.title'),
      description: t('gallery.items.product.description'),
      useCase: t('gallery.items.product.useCase'),
      link: getAppUrl('/canvas?shareid=6920541088dc', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (27).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Cutting Fruit ASMR.png',
      title: t('gallery.items.dialogue.title'),
      description: t('gallery.items.dialogue.description'),
      useCase: t('gallery.items.dialogue.useCase'),
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
      title: t('gallery.items.storytelling.title'),
      description: t('gallery.items.storytelling.description'),
      useCase: t('gallery.items.storytelling.useCase'),
      link: getAppUrl('/canvas?shareid=691f33af7990', locale),
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
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'MP4 with Audio' },
        { label: t('specs.categories.inputOutput.maxResolution'), value: '1080p HD' },
        { label: t('specs.categories.inputOutput.durationOptions'), value: '4s, 6s, 8s' },
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
      title: t('specs.categories.audio.title'),
      items: [
        { label: t('specs.categories.audio.nativeAudio'), value: true },
        { label: t('specs.categories.audio.dialogue'), value: true },
        { label: t('specs.categories.audio.lipSync'), value: true },
        { label: t('specs.categories.audio.soundEffects'), value: true },
      ],
    },
    {
      title: t('specs.categories.advanced.title'),
      items: [
        { label: t('specs.categories.advanced.sceneExtension'), value: true },
        { label: t('specs.categories.advanced.subjectConsistency'), value: true },
        { label: t('specs.categories.advanced.aspectRatios'), value: '16:9, 9:16' },
      ],
    },
  ]

  // Comparison features with i18n
  const comparisonFeatureKeys = [
    'imageToVideo',
    'multiReference',
    'firstLastFrame',
    'nativeAudio',
    'maxDuration',
    'resolution',
    'sceneExtension',
    'subjectConsistency',
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
      name: 'Veo 3.1',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Veo 3.1 FAQ',
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
          modelName="Veo 3.1"
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
