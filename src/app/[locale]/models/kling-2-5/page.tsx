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
  const t = await getTranslations({ locale, namespace: 'models.kling25.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Kling 2.5',
      'Kling 2.5 Turbo',
      'Kling 2.5 Turbo AI video',
      'Kling 2.5 video model',
      'Kling 2.5 AI video model',
      'Kling 2.5 AI video generator',
      'Kling 2.5 Turbo 1080p',
      'Kling 2.5 pricing',
      'Kling 2.5 cost',
      'Kling 2.5 max video length',
      'Kling AI 2.5 Turbo features',
      'Kling AI Kuaishou',
      'Kuaishou Kling 2.5',
      'Kling O1',
      'Kling O1 video',
      'Kling 2.1 vs Kling 2.5',
      'image to video AI',
      'text to video generator',
      'affordable AI video generator',
      'style consistency AI video',
      'motion quality AI',
      'OpenCreator Kling 2.5',
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
          alt: 'Kling 2.5 Turbo AI Video Generator',
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
      'Multi-Reference Support',
      'Max Duration',
      'Resolution',
      'Motion Quality',
      'Style Consistency',
      'Cost Efficiency',
    ],
    models: [
      {
        name: 'Kling 2.5',
        isHighlighted: true,
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Multi-Reference Support': true,
          'Max Duration': '10s',
          Resolution: '1080p',
          'Motion Quality': true,
          'Style Consistency': true,
          'Cost Efficiency': true,
        },
      },
      {
        name: 'Kling 2.1',
        values: {
          'Image to Video': true,
          'Text to Video': false,
          'Multi-Reference Support': true,
          'Max Duration': '10s',
          Resolution: '1080p',
          'Motion Quality': 'partial',
          'Style Consistency': 'partial',
          'Cost Efficiency': 'partial',
        },
      },
      {
        name: 'Veo 3',
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Multi-Reference Support': false,
          'Max Duration': '8s',
          Resolution: '1080p',
          'Motion Quality': true,
          'Style Consistency': true,
          'Cost Efficiency': false,
        },
      },
    ],
  },
  pricing: {
    modelId: 'Fal kling 2.5 Pro',
    note: 'Credits are consumed per generation. 30% lower than Kling 2.1 pricing.',
  },
}

export default async function Kling25ModelPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'models.kling25.model' })
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/kling-2-5`

  // Hero data from translations
  const heroData = {
    modelName: t('hero.modelName'),
    tagline: t('hero.tagline'),
    description: t('hero.description'),
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
    capabilities: [
      t('hero.capabilities.imageToVideo'),
      t('hero.capabilities.textToVideo'),
      t('hero.capabilities.duration'),
      t('hero.capabilities.resolution'),
      t('hero.capabilities.performance'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.prompt.title'),
      description: t('features.items.prompt.description'),
    },
    {
      title: t('features.items.motion.title'),
      description: t('features.items.motion.description'),
    },
    { title: t('features.items.style.title'), description: t('features.items.style.description') },
    {
      title: t('features.items.aesthetic.title'),
      description: t('features.items.aesthetic.description'),
    },
    {
      title: t('features.items.expressions.title'),
      description: t('features.items.expressions.description'),
    },
    { title: t('features.items.cost.title'), description: t('features.items.cost.description') },
  ]

  // Using Kling 2.1 gallery videos as they showcase similar capabilities
  const gallery = [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
      title: t('gallery.items.outfit.title'),
      description: t('gallery.items.outfit.description'),
      useCase: t('gallery.items.outfit.useCase'),
      link: getAppUrl('/canvas?shareid=691f2a048044', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (16).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Streetwear UGC Promo.png',
      title: t('gallery.items.streetwear.title'),
      description: t('gallery.items.streetwear.description'),
      useCase: t('gallery.items.streetwear.useCase'),
      link: getAppUrl('/canvas?shareid=691f269d38df', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (8).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
      title: t('gallery.items.character.title'),
      description: t('gallery.items.character.description'),
      useCase: t('gallery.items.character.useCase'),
      link: getAppUrl('/canvas?shareid=692053b03267', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (6).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Sportswear On-Model Ad.png',
      title: t('gallery.items.sportswear.title'),
      description: t('gallery.items.sportswear.description'),
      useCase: t('gallery.items.sportswear.useCase'),
      link: getAppUrl('/canvas?shareid=691f2991a2bc', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (4).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Athletic Ad.png',
      title: t('gallery.items.combat.title'),
      description: t('gallery.items.combat.description'),
      useCase: t('gallery.items.combat.useCase'),
      link: getAppUrl('/canvas?shareid=691f312a6838', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-videos/Houte.mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/haute.png',
      title: t('gallery.items.dance.title'),
      description: t('gallery.items.dance.description'),
      useCase: t('gallery.items.dance.useCase'),
      link: getAppUrl('/canvas?shareid=69285afcf73f', locale),
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
        { label: t('specs.categories.capabilities.multiReference'), value: true },
        { label: t('specs.categories.capabilities.motionBrush'), value: true },
      ],
    },
    {
      title: t('specs.categories.advanced.title'),
      items: [
        { label: t('specs.categories.advanced.promptAdherence'), value: true },
        { label: t('specs.categories.advanced.motionQuality'), value: true },
        { label: t('specs.categories.advanced.styleConsistency'), value: true },
        { label: t('specs.categories.advanced.microExpressions'), value: true },
      ],
    },
    {
      title: t('specs.categories.performance.title'),
      items: [
        { label: t('specs.categories.performance.generationTime'), value: 'Varies' },
        { label: t('specs.categories.performance.apiAccess'), value: true },
        { label: t('specs.categories.performance.costReduction'), value: '30%' },
      ],
    },
  ]

  // Comparison features with i18n
  const comparisonFeatureKeys = [
    'imageToVideo',
    'textToVideo',
    'multiReference',
    'maxDuration',
    'resolution',
    'motionQuality',
    'styleConsistency',
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
      name: 'Kling 2.5 Turbo',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Kling 2.5 Turbo FAQ',
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
          modelName="Kling 2.5 Turbo"
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
