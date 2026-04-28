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
  const t = await getTranslations({ locale, namespace: 'models.kling26Pro.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Kling 2.6 Pro',
      'Kling AI',
      'Kuaishou video model',
      'AI video generation',
      'audio-visual generation',
      'lip sync video',
      'image to video AI',
      'text to video AI',
      'Kling 2.6',
      'sound effects AI',
      'OpenCreator Kling',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Enterprise Product Ad.png',
          width: 1200,
          height: 630,
          alt: 'Kling 2.6 Pro AI Video Generator',
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

// Model data based on research
const modelData = {
  hero: {
    modelName: 'Kling 2.6 Pro',
    tagline: 'Simultaneous Audio-Visual Generation',
    description:
      "Kling 2.6 Pro is Kuaishou's latest video model featuring simultaneous audio-visual generation. Generate videos complete with speech, sound effects, and ambient sounds in a single pass, revolutionizing the AI video creation workflow.",
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (17).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Enterprise Product Ad.png',
    capabilities: ['Image to Video', 'Text to Video', 'Up to 10s', 'Audio-Visual', 'Lip Sync'],
    badge: 'New',
    ctaText: 'Try Kling 2.6 Pro Free',
  },
  features: [
    {
      title: 'Simultaneous Audio-Visual',
      description:
        'Generate visuals, natural voiceovers, sound effects, and ambient atmosphere in a single pass - no more separate dubbing workflows.',
    },
    {
      title: 'World-Leading Voice Generation',
      description:
        'Exceptional Chinese and English voice generation with tight coordination between voice rhythm, ambient sound, and visual motion.',
    },
    {
      title: 'Professional Audio Quality',
      description:
        'Generate cleaner, richly layered audio that closely mirrors realistic audio mixing, meeting professional-grade production standards.',
    },
    {
      title: 'Robust Semantic Understanding',
      description:
        'Accurately captures creator intent from textual descriptions, colloquial expressions, and complex storylines across varied scenarios.',
    },
    {
      title: 'Versatile Audio Types',
      description:
        'Support for speech, dialogue, narration, singing, rap, ambient sound effects, and mixed sound effects in generated videos.',
    },
    {
      title: 'Accurate Lip Sync',
      description:
        'Deep alignment ensures visual dynamics match audio rhythms, eliminating mismatched audio-video experiences.',
    },
  ],
  gallery: [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (17).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Enterprise Product Ad.png',
      title: 'Short Ads',
      description: 'Advertising & Marketing',
      useCase:
        'One-click generation of short ads featuring narration, character dialogue, and product showcases with comprehensive sound effects.',
      shareId: '691f25484cd0',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (16).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Streetwear UGC Promo.png',
      title: 'Social Media Content',
      description: 'TikTok & Reels',
      useCase:
        'Create engaging social content with multi-character dialogue, interviews, scripted performances, and comedy skits.',
      shareId: '691f269d38df',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
      title: 'E-commerce Videos',
      description: 'Product Showcase',
      useCase:
        'Automate creation of product showcase videos highlighting key selling points with narration and monologue.',
      shareId: '691f2a048044',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (5).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
      title: 'Music Performance',
      description: 'Singing & Rap',
      useCase:
        'Generate music videos with singing, rap, and instrumental performances with accurate lip synchronization.',
      shareId: '691f3139a814',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (8).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
      title: 'Character Dialogue',
      description: 'Multi-Character',
      useCase:
        'Create videos with natural multi-character dialogue, interviews, and scripted performances.',
      shareId: '692053b03267',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (13).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/ASMR Promo.png',
      title: 'Narrated Content',
      description: 'Voice-Over Videos',
      useCase:
        'Generate videos with professional narration and ambient sound effects for storytelling.',
      shareId: '691f27c703c2',
    },
  ],
  comparison: {
    features: [
      'Image to Video',
      'Text to Video',
      'Max Duration',
      'Audio Generation',
      'Lip Sync',
      'Sound Effects',
    ],
    models: [
      {
        name: 'Kling 2.6 Pro',
        isHighlighted: true,
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Max Duration': '10s',
          'Audio Generation': true,
          'Lip Sync': true,
          'Sound Effects': true,
        },
      },
      {
        name: 'Veo 3',
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Max Duration': '8s',
          'Audio Generation': true,
          'Lip Sync': true,
          'Sound Effects': true,
        },
      },
      {
        name: 'Wan 2.6',
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Max Duration': '15s',
          'Audio Generation': true,
          'Lip Sync': true,
          'Sound Effects': true,
        },
      },
    ],
  },
  pricing: {
    modelId: 'Fal kling 2.6 Pro Image to Video',
    note: 'Credits vary by duration. Subscribe to save more.',
  },
  faq: [
    {
      question: 'What is Kling 2.6 Pro and who developed it?',
      answer:
        "Kling 2.6 Pro is Kuaishou's latest AI video model released in December 2025. It features simultaneous audio-visual generation, producing videos complete with speech, sound effects, and ambient sounds in a single pass.",
    },
    {
      question: 'What types of content can I create with Kling 2.6 Pro?',
      answer:
        'Kling 2.6 Pro excels at creating advertising videos, social media content, e-commerce showcases, music performances, character dialogues, and narrated content. It supports both text-to-video and image-to-video generation.',
    },
    {
      question: 'How long can Kling 2.6 Pro videos be?',
      answer:
        'Kling 2.6 Pro can generate videos up to 10 seconds in length with complete audio-visual content including speech, sound effects, and ambient sounds.',
    },
    {
      question: 'What audio types does Kling 2.6 Pro support?',
      answer:
        'Kling 2.6 Pro supports speech, dialogue, narration, singing, rap, ambient sound effects, and mixed sound effects. It currently supports Chinese and English voice generation.',
    },
    {
      question: 'How is the audio quality in Kling 2.6 Pro?',
      answer:
        'Kling 2.6 Pro generates cleaner, richly layered audio that closely mirrors realistic audio mixing. The audio-visual coordination ensures tight synchronization between voice rhythm, ambient sound, and visual motion.',
    },
    {
      question: 'How does Kling 2.6 Pro compare to other AI video models?',
      answer:
        'Kling 2.6 Pro stands out for its simultaneous audio-visual generation capability, eliminating the need for separate dubbing workflows. While Veo 3 also offers audio generation, Kling 2.6 Pro excels in Chinese voice generation and audio-visual coordination.',
    },
  ],
}

export default async function Kling26ProModelPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/kling-2-6-pro`

  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.kling26Pro.model' }),
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
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (17).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Enterprise Product Ad.png',
    capabilities: [
      t('hero.capabilities.imageToVideo'),
      t('hero.capabilities.textToVideo'),
      t('hero.capabilities.duration'),
      t('hero.capabilities.audioVisual'),
      t('hero.capabilities.lipSync'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.audioVisual.title'),
      description: t('features.items.audioVisual.description'),
    },
    {
      title: t('features.items.voiceGeneration.title'),
      description: t('features.items.voiceGeneration.description'),
    },
    {
      title: t('features.items.audioQuality.title'),
      description: t('features.items.audioQuality.description'),
    },
    {
      title: t('features.items.semanticUnderstanding.title'),
      description: t('features.items.semanticUnderstanding.description'),
    },
    {
      title: t('features.items.multiAudio.title'),
      description: t('features.items.multiAudio.description'),
    },
    {
      title: t('features.items.lipSync.title'),
      description: t('features.items.lipSync.description'),
    },
  ]

  const gallery = [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (17).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Enterprise Product Ad.png',
      title: t('gallery.items.advertising.title'),
      description: t('gallery.items.advertising.description'),
      useCase: t('gallery.items.advertising.useCase'),
      link: getAppUrl('/canvas?shareid=691f25484cd0', locale),
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
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (5).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
      title: t('gallery.items.music.title'),
      description: t('gallery.items.music.description'),
      useCase: t('gallery.items.music.useCase'),
      link: getAppUrl('/canvas?shareid=691f3139a814', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (8).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
      title: t('gallery.items.dialogue.title'),
      description: t('gallery.items.dialogue.description'),
      useCase: t('gallery.items.dialogue.useCase'),
      link: getAppUrl('/canvas?shareid=692053b03267', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (13).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/ASMR Promo.png',
      title: t('gallery.items.narration.title'),
      description: t('gallery.items.narration.description'),
      useCase: t('gallery.items.narration.useCase'),
      link: getAppUrl('/canvas?shareid=691f27c703c2', locale),
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
        { label: t('specs.categories.inputOutput.durationOptions'), value: '5s / 10s' },
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
      title: t('specs.categories.audioFeatures.title'),
      items: [
        { label: t('specs.categories.audioFeatures.speech'), value: true },
        { label: t('specs.categories.audioFeatures.soundEffects'), value: true },
        { label: t('specs.categories.audioFeatures.ambientSound'), value: true },
        { label: t('specs.categories.audioFeatures.musicPerformance'), value: true },
      ],
    },
    {
      title: t('specs.categories.performance.title'),
      items: [
        { label: t('specs.categories.performance.generationTime'), value: '1-5 min' },
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
    'audioGeneration',
    'lipSync',
    'soundEffects',
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
      name: 'Kling 2.6 Pro',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Kling 2.6 Pro FAQ',
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
          modelName="Kling 2.6 Pro"
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
