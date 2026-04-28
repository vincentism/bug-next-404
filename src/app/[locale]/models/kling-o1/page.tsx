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
  const t = await getTranslations({ locale, namespace: 'models.klingO1.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Kling O1',
      'Kling O1 video',
      'Kling O1 AI',
      'Kling O1 free',
      'Kling O1 pricing',
      'Kling O1 video model',
      'Kling O1 video model december 2025',
      'Kling AI O1',
      'Kling AI O1 video model',
      'Kling AI O1 model december 2025',
      'Kuaishou Kling O1',
      'Kuaishou Kling O1 model',
      'unified multimodal video',
      'AI video generation',
      'video editing AI',
      'multi-subject video AI',
      'style re-rendering AI',
      'director-like memory AI',
      'OpenCreator Kling O1',
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
          alt: 'Kling O1 AI Video Generator',
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
      'Unified Multimodal',
      'Text to Video',
      'Image to Video',
      'Video Editing',
      'Max Duration',
      'Multi-Subject',
    ],
    models: [
      {
        name: 'Kling O1',
        isHighlighted: true,
        values: {
          'Unified Multimodal': true,
          'Text to Video': true,
          'Image to Video': true,
          'Video Editing': true,
          'Max Duration': '10s',
          'Multi-Subject': true,
        },
      },
      {
        name: 'Kling 2.1',
        values: {
          'Unified Multimodal': false,
          'Text to Video': false,
          'Image to Video': true,
          'Video Editing': false,
          'Max Duration': '10s',
          'Multi-Subject': true,
        },
      },
      {
        name: 'Veo 3',
        values: {
          'Unified Multimodal': false,
          'Text to Video': true,
          'Image to Video': true,
          'Video Editing': 'partial',
          'Max Duration': '8s',
          'Multi-Subject': false,
        },
      },
    ],
  },
  pricing: {
    modelId: 'fal-ai/kling-video/o1/video-to-video',
  },
}

export default async function KlingO1ModelPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'models.klingO1.model' })
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/kling-o1`

  const klingO1CreditsPerSecond = 202
  const klingO1CreditsMin = klingO1CreditsPerSecond * 5
  const klingO1CreditsMax = klingO1CreditsPerSecond * 10
  const klingO1CreditsDisplay = `${klingO1CreditsMin}~${klingO1CreditsMax}`

  // 获取订阅方案定价（使用 Kling 2.1 Pro 作为参考模型）
  const { subscriptionData, stripePlan } = await getPricingConfig()
  const planSummaries = subscriptionData
    ? buildPlanSummaries(subscriptionData, stripePlan, modelData.pricing.modelId, {
        modelCreditsPerGeneration: klingO1CreditsMin,
      })
    : []

  // Hero data from translations
  const heroData = {
    modelName: t('hero.modelName'),
    tagline: t('hero.tagline'),
    description: t('hero.description'),
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
    capabilities: [
      t('hero.capabilities.unified'),
      t('hero.capabilities.duration'),
      t('hero.capabilities.multiSubject'),
      t('hero.capabilities.videoEditing'),
      t('hero.capabilities.styleRendering'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.unified.title'),
      description: t('features.items.unified.description'),
    },
    {
      title: t('features.items.directorMemory.title'),
      description: t('features.items.directorMemory.description'),
    },
    {
      title: t('features.items.multiSubject.title'),
      description: t('features.items.multiSubject.description'),
    },
    {
      title: t('features.items.skillCombos.title'),
      description: t('features.items.skillCombos.description'),
    },
    {
      title: t('features.items.semanticEditing.title'),
      description: t('features.items.semanticEditing.description'),
    },
    {
      title: t('features.items.flexibleDuration.title'),
      description: t('features.items.flexibleDuration.description'),
    },
  ]

  // Gallery items - using existing video templates as placeholders since this is a video model
  const gallery = [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
      title: t('gallery.items.filmProduction.title'),
      description: t('gallery.items.filmProduction.description'),
      useCase: t('gallery.items.filmProduction.useCase'),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (16).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Streetwear UGC Promo.png',
      title: t('gallery.items.socialMedia.title'),
      description: t('gallery.items.socialMedia.description'),
      useCase: t('gallery.items.socialMedia.useCase'),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (8).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
      title: t('gallery.items.advertising.title'),
      description: t('gallery.items.advertising.description'),
      useCase: t('gallery.items.advertising.useCase'),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (6).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Sportswear On-Model Ad.png',
      title: t('gallery.items.ecommerce.title'),
      description: t('gallery.items.ecommerce.description'),
      useCase: t('gallery.items.ecommerce.useCase'),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (5).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
      title: t('gallery.items.styleTransfer.title'),
      description: t('gallery.items.styleTransfer.description'),
      useCase: t('gallery.items.styleTransfer.useCase'),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-videos/Houte.mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/haute.png',
      title: t('gallery.items.videoEditing.title'),
      description: t('gallery.items.videoEditing.description'),
      useCase: t('gallery.items.videoEditing.useCase'),
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
        {
          label: t('specs.categories.inputOutput.inputTypes'),
          value: 'Text, Image, Video, Subject',
        },
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'MP4' },
        { label: t('specs.categories.inputOutput.maxResolution'), value: '1080p HD' },
        { label: t('specs.categories.inputOutput.durationOptions'), value: '3-10s' },
      ],
    },
    {
      title: t('specs.categories.capabilities.title'),
      items: [
        { label: t('specs.categories.capabilities.referenceVideo'), value: true },
        { label: t('specs.categories.capabilities.textToVideo'), value: true },
        { label: t('specs.categories.capabilities.imageToVideo'), value: true },
        { label: t('specs.categories.capabilities.startEndFrame'), value: true },
      ],
    },
    {
      title: t('specs.categories.editing.title'),
      items: [
        { label: t('specs.categories.editing.videoInpainting'), value: true },
        { label: t('specs.categories.editing.styleRerendering'), value: true },
        { label: t('specs.categories.editing.shotExtension'), value: true },
        { label: t('specs.categories.editing.semanticEditing'), value: true },
      ],
    },
    {
      title: t('specs.categories.advanced.title'),
      items: [
        { label: t('specs.categories.advanced.multiSubject'), value: true },
        { label: t('specs.categories.advanced.directorMemory'), value: true },
        { label: t('specs.categories.advanced.skillCombos'), value: true },
        { label: t('specs.categories.advanced.mvlFramework'), value: true },
      ],
    },
  ]

  // Comparison features with i18n
  const comparisonFeatureKeys = [
    'unifiedModel',
    'textToVideo',
    'imageToVideo',
    'videoEditing',
    'maxDuration',
    'multiSubject',
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
      name: 'Kling O1',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Kling O1 FAQ',
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

        {/* Pricing Section - Coming Soon */}
        <ModelPricing
          title={t('pricing.title')}
          subtitle={t('pricing.subtitle')}
          modelId={modelData.pricing.modelId}
          modelName="Kling O1"
          creditsDisplay={klingO1CreditsDisplay}
          description={t('pricing.description')}
          note={t('pricing.note')}
          viewFullPricingText={t('pricing.viewFullPricing')}
          planSummaries={planSummaries}
          planSectionTitle={locale === 'zh' ? '订阅更省钱' : 'Save more with a subscription'}
        />

        {/* FAQ Section */}
        <LandingFAQ title={t('faq.title')} items={faqItems} />
      </main>

      <LandingFooter />
    </>
  )
}
