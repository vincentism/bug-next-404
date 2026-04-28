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
  const t = await getTranslations({ locale, namespace: 'models.wan26.model.meta' })
  const canonical = getCanonicalUrl('/models/wan-2-6', locale)

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Wan 2.6',
      'Wan 2.6 free',
      'Wan 2.6 multishot',
      'Wan 2.6 AI',
      'Wan 2.6 Alibaba',
      'Alibaba Wan 2.6',
      'Wan 2.6 video generation',
      'Wan 2.6 text to video',
      'Wan 2.6 pricing',
      'try Wan 2.6',
      'free Wan 2.6',
      'multi-shot video AI',
      'audio sync AI video',
      'lip sync video generator',
      'image to video AI',
      'text to video AI',
      'Wan AI video model',
      'character consistency AI',
      'OpenCreator Wan 2.6',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: canonical,
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Streetwear UGC Promo.png',
          width: 1200,
          height: 630,
          alt: 'Wan 2.6 AI Video Generator',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    alternates: {
      ...buildAlternatesMetadata('/models/wan-2-6', locale),
    },
  }
}

// Model data based on research
const modelData = {
  hero: {
    modelName: 'Wan 2.6',
    tagline: 'Multi-Shot Video with Audio Sync',
    description:
      "Wan 2.6 is Alibaba's latest video generation model featuring multi-shot storytelling, native audio-visual synchronization, and clone-level character consistency. Generate up to 15-second videos with synchronized speech, sound effects, and ambient sounds.",
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (16).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Streetwear UGC Promo.png',
    capabilities: ['Image to Video', 'Text to Video', 'Up to 15s', 'Audio Sync', 'Multi-Shot'],
    badge: 'New',
    ctaText: 'Try Wan 2.6 Free',
  },
  features: [
    {
      title: 'Multi-Shot Storytelling',
      description:
        'Generate complete narrative sequences with multiple camera angles. The model automatically plans shot transitions while maintaining consistency in characters, environment, and lighting.',
    },
    {
      title: 'Native Audio Sync',
      description:
        'Characters speak with accurate mouth shapes and timing. Generate visuals that match audio tracks frame by frame with precise lip-sync.',
    },
    {
      title: 'Clone-Level Consistency',
      description:
        'Reference subjects maintain their exact appearance across shots - near-identical preservation of facial features, clothing, body proportions, and distinctive characteristics.',
    },
    {
      title: 'Extended Duration',
      description:
        'Generate up to 15-second videos in a single run - enough for complete narrative arcs, product showcases, and social media content.',
    },
    {
      title: 'Dual-Subject Interactions',
      description:
        'Support for 1-3 reference videos enabling single-subject generation or complex dual-subject interactions in the same scene.',
    },
    {
      title: 'High Resolution Output',
      description:
        'Generate videos in 480p to 1080p resolution with 24fps frame rate, suitable for social media and professional production.',
    },
  ],
  gallery: [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (16).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Streetwear UGC Promo.png',
      title: 'Social Media Content',
      description: 'TikTok & Reels',
      useCase:
        'Create scroll-stopping short-form videos for TikTok, Instagram Reels, and YouTube Shorts.',
      shareId: '691f269d38df',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (17).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Enterprise Product Ad.png',
      title: 'Marketing Videos',
      description: 'Brand Advertising',
      useCase:
        'Produce professional marketing videos with narration, dialogue, and product showcases.',
      shareId: '691f25484cd0',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
      title: 'E-commerce Showcase',
      description: 'Product Videos',
      useCase:
        'Generate product videos from unboxing to usage with synchronized audio descriptions.',
      shareId: '691f2a048044',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (8).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
      title: 'Multi-Shot Stories',
      description: 'Narrative Content',
      useCase:
        'Tell complete stories with beginning, middle, and end using multiple camera angles.',
      shareId: '692053b03267',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (5).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
      title: 'Character Dialogue',
      description: 'Scripted Performances',
      useCase:
        'Create interviews, scripted performances, and comedy skits with multi-character dialogue.',
      shareId: '691f3139a814',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (6).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Sportswear On-Model Ad.png',
      title: 'Music Performance',
      description: 'Singing & Rap',
      useCase:
        'Generate music videos with singing, rap, and instrumental performances with lip-sync.',
      shareId: '691f2991a2bc',
    },
  ],
  comparison: {
    features: [
      'Image to Video',
      'Text to Video',
      'Multi-Shot',
      'Max Duration',
      'Audio Sync',
      'Lip Sync',
    ],
    models: [
      {
        name: 'Wan 2.6',
        isHighlighted: true,
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Multi-Shot': true,
          'Max Duration': '15s',
          'Audio Sync': true,
          'Lip Sync': true,
        },
      },
      {
        name: 'Veo 3',
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Multi-Shot': false,
          'Max Duration': '8s',
          'Audio Sync': true,
          'Lip Sync': true,
        },
      },
      {
        name: 'Kling 2.6',
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Multi-Shot': false,
          'Max Duration': '10s',
          'Audio Sync': true,
          'Lip Sync': true,
        },
      },
    ],
  },
  pricing: {
    modelId: 'Fal Wan 2.6 Image to Video',
    note: 'Credits vary by duration and resolution. Subscribe to save more.',
  },
}

export default async function Wan26ModelPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = getCanonicalUrl('/models/wan-2-6', locale)

  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.wan26.model' }),
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
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (16).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Streetwear UGC Promo.png',
    capabilities: [
      t('hero.capabilities.imageToVideo'),
      t('hero.capabilities.textToVideo'),
      t('hero.capabilities.duration'),
      t('hero.capabilities.audioSync'),
      t('hero.capabilities.multiShot'),
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
      title: t('features.items.audioSync.title'),
      description: t('features.items.audioSync.description'),
    },
    {
      title: t('features.items.consistency.title'),
      description: t('features.items.consistency.description'),
    },
    {
      title: t('features.items.duration.title'),
      description: t('features.items.duration.description'),
    },
    {
      title: t('features.items.dualSubject.title'),
      description: t('features.items.dualSubject.description'),
    },
    {
      title: t('features.items.resolution.title'),
      description: t('features.items.resolution.description'),
    },
  ]

  const gallery = [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (16).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Streetwear UGC Promo.png',
      title: t('gallery.items.social.title'),
      description: t('gallery.items.social.description'),
      useCase: t('gallery.items.social.useCase'),
      link: getAppUrl('/canvas?shareid=691f269d38df', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (17).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Enterprise Product Ad.png',
      title: t('gallery.items.marketing.title'),
      description: t('gallery.items.marketing.description'),
      useCase: t('gallery.items.marketing.useCase'),
      link: getAppUrl('/canvas?shareid=691f25484cd0', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
      title: t('gallery.items.ecommerce.title'),
      description: t('gallery.items.ecommerce.description'),
      useCase: t('gallery.items.ecommerce.useCase'),
      link: getAppUrl('/canvas?shareid=691f2a048044', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (8).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
      title: t('gallery.items.storytelling.title'),
      description: t('gallery.items.storytelling.description'),
      useCase: t('gallery.items.storytelling.useCase'),
      link: getAppUrl('/canvas?shareid=692053b03267', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (5).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
      title: t('gallery.items.dialogue.title'),
      description: t('gallery.items.dialogue.description'),
      useCase: t('gallery.items.dialogue.useCase'),
      link: getAppUrl('/canvas?shareid=691f3139a814', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (6).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Sportswear On-Model Ad.png',
      title: t('gallery.items.music.title'),
      description: t('gallery.items.music.description'),
      useCase: t('gallery.items.music.useCase'),
      link: getAppUrl('/canvas?shareid=691f2991a2bc', locale),
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
        { label: t('specs.categories.inputOutput.inputFormats'), value: 'Image, Text, Video' },
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'MP4' },
        { label: t('specs.categories.inputOutput.maxResolution'), value: '1080p' },
        { label: t('specs.categories.inputOutput.durationOptions'), value: '5s / 10s / 15s' },
      ],
    },
    {
      title: t('specs.categories.capabilities.title'),
      items: [
        { label: t('specs.categories.capabilities.imageToVideo'), value: true },
        { label: t('specs.categories.capabilities.textToVideo'), value: true },
        { label: t('specs.categories.capabilities.multiReference'), value: true },
        { label: t('specs.categories.capabilities.audioGeneration'), value: true },
      ],
    },
    {
      title: t('specs.categories.advanced.title'),
      items: [
        { label: t('specs.categories.advanced.multiShot'), value: true },
        { label: t('specs.categories.advanced.lipSync'), value: true },
        { label: t('specs.categories.advanced.soundEffects'), value: true },
        { label: t('specs.categories.advanced.ambientSound'), value: true },
      ],
    },
    {
      title: t('specs.categories.performance.title'),
      items: [
        { label: t('specs.categories.performance.generationTime'), value: 'Varies' },
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
    'audioSync',
    'lipSync',
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
      name: 'Wan 2.6',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Wan 2.6 FAQ',
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
          modelName="Wan 2.6"
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
