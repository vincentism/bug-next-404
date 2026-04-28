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
  const t = await getTranslations({ locale, namespace: 'models.kling16.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Kling 1.6',
      'Kuaishou Kling',
      'Kling AI video generator',
      'multi-reference video',
      'elements mode',
      'motion brush',
      'special effects AI',
      'image to video AI',
      'Kling 1.6 online',
      'Kling elements',
      '4 reference images',
      'OpenCreator Kling',
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
          alt: 'Kling 1.6 AI Video Generator',
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
      'Motion Brush',
      'Special Effects',
      'Max Duration',
      'Resolution',
    ],
    models: [
      {
        name: 'Kling 1.6',
        isHighlighted: true,
        values: {
          'Image to Video': true,
          'Multi-Reference Mode': true,
          'First-Last Frame': true,
          'Motion Brush': true,
          'Special Effects': true,
          'Max Duration': '10s',
          Resolution: '1080p',
        },
      },
      {
        name: 'Kling 2.1',
        values: {
          'Image to Video': true,
          'Multi-Reference Mode': false,
          'First-Last Frame': true,
          'Motion Brush': true,
          'Special Effects': true,
          'Max Duration': '10s',
          Resolution: '1080p',
        },
      },
      {
        name: 'Kling 2.5',
        values: {
          'Image to Video': true,
          'Multi-Reference Mode': false,
          'First-Last Frame': true,
          'Motion Brush': true,
          'Special Effects': true,
          'Max Duration': '10s',
          Resolution: '1080p',
        },
      },
    ],
  },
  pricing: {
    modelId: 'Kling 1.6',
    note: 'Credits are consumed per generation. Actual cost depends on your subscription plan.',
  },
}

export default async function Kling16ModelPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/kling-1-6`

  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.kling16.model' }),
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
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (8).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
    capabilities: [
      t('hero.capabilities.imageToVideo'),
      t('hero.capabilities.multiReference'),
      t('hero.capabilities.firstLastFrame'),
      t('hero.capabilities.motionBrush'),
      t('hero.capabilities.specialFx'),
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
      title: t('features.items.motionBrush.title'),
      description: t('features.items.motionBrush.description'),
    },
    {
      title: t('features.items.specialFx.title'),
      description: t('features.items.specialFx.description'),
    },
    {
      title: t('features.items.quality.title'),
      description: t('features.items.quality.description'),
    },
    {
      title: t('features.items.flexible.title'),
      description: t('features.items.flexible.description'),
    },
  ]

  // Gallery items - using Kling 1.6 workflow assets + Kling series shared assets
  const gallery = [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (15).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Background VFX.png',
      title: t('gallery.items.elements.title'),
      description: t('gallery.items.elements.description'),
      useCase: t('gallery.items.elements.useCase'),
      link: getAppUrl('/canvas?shareid=691f26e8e3be', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (10).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Food Product Ad.png',
      title: t('gallery.items.transition.title'),
      description: t('gallery.items.transition.description'),
      useCase: t('gallery.items.transition.useCase'),
      link: getAppUrl('/canvas?shareid=691f28f576af', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
      title: t('gallery.items.product.title'),
      description: t('gallery.items.product.description'),
      useCase: t('gallery.items.product.useCase'),
      link: getAppUrl('/canvas?shareid=691f2a048044', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (16).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Streetwear UGC Promo.png',
      title: t('gallery.items.effects.title'),
      description: t('gallery.items.effects.description'),
      useCase: t('gallery.items.effects.useCase'),
      link: getAppUrl('/canvas?shareid=691f269d38df', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (8).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
      title: t('gallery.items.fashion.title'),
      description: t('gallery.items.fashion.description'),
      useCase: t('gallery.items.fashion.useCase'),
      link: getAppUrl('/canvas?shareid=692053b03267', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (6).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Sportswear On-Model Ad.png',
      title: t('gallery.items.commercial.title'),
      description: t('gallery.items.commercial.description'),
      useCase: t('gallery.items.commercial.useCase'),
      link: getAppUrl('/canvas?shareid=691f2991a2bc', locale),
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
        { label: t('specs.categories.inputOutput.inputFormats'), value: 'JPG, PNG, WEBP' },
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'MP4' },
        { label: t('specs.categories.inputOutput.maxResolution'), value: '1080p' },
        { label: t('specs.categories.inputOutput.durationOptions'), value: '5s, 10s' },
      ],
    },
    {
      title: t('specs.categories.modes.title'),
      items: [
        { label: t('specs.categories.modes.imageToVideo'), value: true },
        { label: t('specs.categories.modes.elementsMode'), value: true },
        { label: t('specs.categories.modes.firstLastFrame'), value: true },
      ],
    },
    {
      title: t('specs.categories.controls.title'),
      items: [
        { label: t('specs.categories.controls.motionBrush'), value: true },
        { label: t('specs.categories.controls.staticMask'), value: true },
        { label: t('specs.categories.controls.dynamicMask'), value: true },
      ],
    },
    {
      title: t('specs.categories.effects.title'),
      items: [
        { label: t('specs.categories.effects.hug'), value: true },
        { label: t('specs.categories.effects.kiss'), value: true },
        { label: t('specs.categories.effects.heartGesture'), value: true },
        { label: t('specs.categories.effects.squish'), value: true },
      ],
    },
  ]

  // Comparison features with i18n
  const comparisonFeatureKeys = [
    'imageToVideo',
    'multiReference',
    'firstLastFrame',
    'motionBrush',
    'specialFx',
    'maxDuration',
    'resolution',
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
      name: 'Kling 1.6',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Kling 1.6 FAQ',
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
          modelName="Kling 1.6"
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
