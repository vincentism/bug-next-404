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
  const t = await getTranslations({ locale, namespace: 'models.wan25.model.meta' })
  const canonical = getCanonicalUrl('/models/wan-2-5', locale)

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Wan 2.5',
      'Alibaba video model',
      'AI video generation',
      'long duration video',
      'image to video AI',
      'text to video AI',
      'Wan AI',
      'lip sync video',
      '30 second video',
      'OpenCreator Wan',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: canonical,
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
          width: 1200,
          height: 630,
          alt: 'Wan 2.5 AI Video Generator',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    alternates: {
      ...buildAlternatesMetadata('/models/wan-2-5', locale),
    },
  }
}

// Model data based on research
const modelData = {
  hero: {
    modelName: 'Wan 2.5',
    tagline: 'Extended Duration Video Generation',
    description:
      "Wan 2.5 is Alibaba's powerful video generation model featuring extended 30-second duration, 1080p resolution output, and lip-synced audio generation. Perfect for longer-form content and professional video production.",
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
    capabilities: ['Image to Video', 'Text to Video', 'Up to 30s', '1080p Output', 'Audio Sync'],
    badge: 'Popular',
    ctaText: 'Try Wan 2.5 Free',
  },
  features: [
    {
      title: 'Extended Duration',
      description:
        'Generate videos up to 30 seconds per clip - the longest duration among Wan models, perfect for complete narratives and detailed showcases.',
    },
    {
      title: '1080p HD Output',
      description:
        'Generate high-definition 1080p videos at 24fps, suitable for professional production and social media platforms.',
    },
    {
      title: 'Lip-Synced Audio',
      description:
        'Native audio-visual synchronization with accurate lip-sync for natural-looking character speech and dialogue.',
    },
    {
      title: 'Smooth Motion',
      description:
        'Advanced motion synthesis ensures fluid, natural movements that outperform previous Wan versions.',
    },
    {
      title: 'Multilingual Support',
      description:
        'Support for English, Chinese, and other major languages for both prompting and audio generation.',
    },
    {
      title: 'Image to Video',
      description:
        'Transform static images into dynamic videos with motion generation based on text prompts.',
    },
  ],
  gallery: [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
      title: 'Product Showcase',
      description: 'E-commerce Videos',
      useCase:
        'Create detailed product demonstration videos from unboxing to usage with extended duration.',
      shareId: '691f2a048044',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (16).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Streetwear UGC Promo.png',
      title: 'Social Media Content',
      description: 'TikTok & Reels',
      useCase: 'Generate engaging short-form videos for social media platforms with smooth motion.',
      shareId: '691f269d38df',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (17).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Enterprise Product Ad.png',
      title: 'Marketing Videos',
      description: 'Brand Advertising',
      useCase: 'Produce professional marketing videos with narration and product showcases.',
      shareId: '691f25484cd0',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (8).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
      title: 'Story Content',
      description: 'Narrative Videos',
      useCase: 'Tell complete stories with beginning, middle, and end in a single generation.',
      shareId: '692053b03267',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (6).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Sportswear On-Model Ad.png',
      title: 'Fashion Display',
      description: 'Apparel Showcase',
      useCase: 'Create dynamic fashion videos with model movements and outfit displays.',
      shareId: '691f2991a2bc',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (5).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
      title: 'Character Speech',
      description: 'Lip-Synced Content',
      useCase: 'Generate videos with natural character speech and accurate lip synchronization.',
      shareId: '691f3139a814',
    },
  ],
  comparison: {
    features: [
      'Image to Video',
      'Text to Video',
      'Max Duration',
      'Resolution',
      'Audio Sync',
      'Lip Sync',
    ],
    models: [
      {
        name: 'Wan 2.5',
        isHighlighted: true,
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Max Duration': '30s',
          Resolution: '1080p',
          'Audio Sync': true,
          'Lip Sync': true,
        },
      },
      {
        name: 'Wan 2.6',
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Max Duration': '15s',
          Resolution: '1080p',
          'Audio Sync': true,
          'Lip Sync': true,
        },
      },
      {
        name: 'Kling 2.1',
        values: {
          'Image to Video': true,
          'Text to Video': false,
          'Max Duration': '10s',
          Resolution: '1080p',
          'Audio Sync': 'partial',
          'Lip Sync': 'partial',
        },
      },
    ],
  },
  pricing: {
    modelId: 'Fal Wan 2.5 Image to Video',
    note: 'Credits vary by duration and resolution. Subscribe to save more.',
  },
  faq: [
    {
      question: 'What is Wan 2.5 and who developed it?',
      answer:
        "Wan 2.5 is Alibaba's powerful AI video generation model. It features extended 30-second duration, 1080p resolution output, and lip-synced audio generation for professional video production.",
    },
    {
      question: 'What types of content can I create with Wan 2.5?',
      answer:
        'Wan 2.5 excels at creating product showcases, social media content, marketing videos, story content, fashion displays, and character dialogue videos. It supports both text-to-video and image-to-video generation.',
    },
    {
      question: 'How long can Wan 2.5 videos be?',
      answer:
        'Wan 2.5 can generate videos up to 30 seconds per clip - the longest duration among Wan models. This is perfect for complete narratives and detailed product showcases.',
    },
    {
      question: 'What resolution does Wan 2.5 output?',
      answer:
        'Wan 2.5 generates videos in 480p and 1080p resolution at 24fps frame rate, suitable for social media and professional production.',
    },
    {
      question: 'Does Wan 2.5 support audio generation?',
      answer:
        'Yes! Wan 2.5 features native audio-visual synchronization with accurate lip-sync for natural-looking character speech. It supports English, Chinese, and other major languages.',
    },
    {
      question: 'How does Wan 2.5 compare to Wan 2.6?',
      answer:
        'Wan 2.5 offers longer duration (30s vs 15s) while Wan 2.6 focuses on multi-shot storytelling and enhanced audio features. Choose Wan 2.5 for longer single-shot videos, or Wan 2.6 for multi-shot narratives.',
    },
  ],
}

export default async function Wan25ModelPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = getCanonicalUrl('/models/wan-2-5', locale)

  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.wan25.model' }),
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
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
    capabilities: [
      t('hero.capabilities.imageToVideo'),
      t('hero.capabilities.textToVideo'),
      t('hero.capabilities.duration'),
      t('hero.capabilities.resolution'),
      t('hero.capabilities.audioSync'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.duration.title'),
      description: t('features.items.duration.description'),
    },
    {
      title: t('features.items.resolution.title'),
      description: t('features.items.resolution.description'),
    },
    {
      title: t('features.items.audioSync.title'),
      description: t('features.items.audioSync.description'),
    },
    {
      title: t('features.items.motion.title'),
      description: t('features.items.motion.description'),
    },
    {
      title: t('features.items.multilingual.title'),
      description: t('features.items.multilingual.description'),
    },
    {
      title: t('features.items.imageToVideo.title'),
      description: t('features.items.imageToVideo.description'),
    },
  ]

  const gallery = [
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
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (6).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Sportswear On-Model Ad.png',
      title: t('gallery.items.fashion.title'),
      description: t('gallery.items.fashion.description'),
      useCase: t('gallery.items.fashion.useCase'),
      link: getAppUrl('/canvas?shareid=691f2991a2bc', locale),
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
        { label: t('specs.categories.inputOutput.inputFormats'), value: 'Image, Text' },
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'MP4' },
        { label: t('specs.categories.inputOutput.maxResolution'), value: '1080p' },
        { label: t('specs.categories.inputOutput.durationOptions'), value: '5s / 10s / 30s' },
      ],
    },
    {
      title: t('specs.categories.capabilities.title'),
      items: [
        { label: t('specs.categories.capabilities.imageToVideo'), value: true },
        { label: t('specs.categories.capabilities.textToVideo'), value: true },
        { label: t('specs.categories.capabilities.audioGeneration'), value: true },
        { label: t('specs.categories.capabilities.lipSync'), value: true },
      ],
    },
    {
      title: t('specs.categories.advanced.title'),
      items: [
        { label: t('specs.categories.advanced.motionSynthesis'), value: true },
        { label: t('specs.categories.advanced.multilingual'), value: true },
        { label: t('specs.categories.advanced.promptFollowing'), value: true },
        { label: t('specs.categories.advanced.characterConsistency'), value: true },
      ],
    },
    {
      title: t('specs.categories.performance.title'),
      items: [
        { label: t('specs.categories.performance.generationTime'), value: '1-3 min' },
        { label: t('specs.categories.performance.apiAccess'), value: true },
        { label: t('specs.categories.performance.batchProcessing'), value: true },
      ],
    },
  ]

  // Comparison features with i18n
  const comparisonFeatureKeys = [
    'imageToVideo',
    'textToVideo',
    'maxDuration',
    'resolution',
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
      name: 'Wan 2.5',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Wan 2.5 FAQ',
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
          modelName="Wan 2.5"
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
