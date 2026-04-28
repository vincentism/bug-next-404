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
  const t = await getTranslations({ locale, namespace: 'models.kling21.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Kling 2.1',
      'Kling AI 2.1',
      'Kling 2.1 max video length',
      'Kling 2.1 maximum video length',
      'Kling AI 2.1 maximum video length',
      'Kling AI 2.1 maximum video duration',
      'Kling 2.1 max length',
      'Kling AI 2.1 features',
      'Kling 2.1 AI video model',
      'Kling AI 2.1 Kuaishou',
      'Kuaishou Kling 2.1',
      'Kling video generator',
      'image to video AI',
      'AI video generation',
      'Kling 2.1 Pro',
      'Kling 2.1 online',
      'Kling 2.1 free trial',
      'multi-reference video',
      'e-commerce video AI',
      'OpenCreator Kling 2.1',
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
          alt: 'Kling 2.1 AI Video Generator',
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
    modelName: 'Kling 2.1',
    tagline: 'Professional AI Video Generation',
    description:
      'Transform static images into fluid, natural-looking videos with Kling AI v2.1. Developed by Kuaishou, this powerful image-to-video model delivers professional-quality motion synthesis with realistic physics simulation and dynamic facial expressions.',
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
    capabilities: [
      'Image to Video',
      '5-10s Duration',
      '1080p Output',
      'Physics Simulation',
      'Multi-Reference',
    ],
    badge: 'Most Popular',
    ctaText: 'Try Kling 2.1 Free',
  },
  features: [
    {
      title: 'Natural Motion Synthesis',
      description:
        'Advanced 3D spatiotemporal attention mechanism accurately models complex movements, ensuring videos adhere to real-world physics.',
    },
    {
      title: 'Dynamic Facial Expressions',
      description:
        'Excels in generating life-like facial expressions and accurate movements, making characters more engaging and realistic.',
    },
    {
      title: 'Multi-Reference Support',
      description:
        'Support for up to 4 input images for multi-image generation, enabling consistent character and scene creation.',
    },
    {
      title: 'Flexible Duration',
      description:
        'Choose between 5 or 10 second video outputs to match your content needs, from quick social clips to longer narratives.',
    },
    {
      title: 'Special Effects',
      description:
        'Built-in special effects including hug, kiss, heart gesture, squish, and expansion for creative storytelling.',
    },
    {
      title: 'Quality Preservation',
      description:
        'Maintains fine details and textures from source images while adding natural, fluid motion to bring them to life.',
    },
  ],
  gallery: [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
      title: '360° Outfit Display',
      description: 'E-commerce Product Videos',
      useCase:
        'Transform static product photos into engaging video content. Perfect for fashion and lifestyle products.',
      shareId: '691f2a048044',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (16).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Streetwear UGC Promo.png',
      title: 'Streetwear UGC Promo',
      description: 'Social Media Content',
      useCase:
        'Create scroll-stopping UGC-style videos for Instagram, TikTok, and other platforms.',
      shareId: '691f269d38df',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (8).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
      title: 'Consistent Character Ads',
      description: 'Brand Advertising',
      useCase: 'Produce consistent character ads and brand storytelling videos across campaigns.',
      shareId: '692053b03267',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (6).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Sportswear On-Model Ad.png',
      title: 'Sportswear On-Model Ad',
      description: 'Athletic Wear Showcase',
      useCase: 'Dynamic poses and movements for sportswear and activewear products.',
      shareId: '691f2991a2bc',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (5).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
      title: 'UGC Promo with Lipsync',
      description: 'Lip-synced Promotions',
      useCase: 'Add voice-over and lip-sync to create authentic promotional content.',
      shareId: '691f3139a814',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-videos/Houte.mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/haute.png',
      title: 'Accessories Model Display',
      description: 'Jewelry & Accessories',
      useCase: 'E-commerce jewelry and accessories showcase with elegant model presentation.',
      shareId: '69285afcf73f',
    },
  ],
  comparison: {
    features: [
      'Image to Video',
      'Text to Video',
      'Multi-Reference Support',
      'Max Duration',
      'Resolution',
      'Physics Simulation',
      'Facial Expressions',
      'Audio Generation',
      'Lip Sync',
    ],
    models: [
      {
        name: 'Kling 2.1',
        isHighlighted: true,
        values: {
          'Image to Video': true,
          'Text to Video': false,
          'Multi-Reference Support': true,
          'Max Duration': '10s',
          Resolution: '1080p',
          'Physics Simulation': true,
          'Facial Expressions': true,
          'Audio Generation': 'partial',
          'Lip Sync': 'partial',
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
          'Physics Simulation': true,
          'Facial Expressions': true,
          'Audio Generation': true,
          'Lip Sync': true,
        },
      },
      {
        name: 'Sora 2',
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Multi-Reference Support': false,
          'Max Duration': '20s',
          Resolution: '1080p',
          'Physics Simulation': true,
          'Facial Expressions': true,
          'Audio Generation': false,
          'Lip Sync': false,
        },
      },
    ],
  },
  pricing: {
    modelId: 'Fal kling 2.1 Pro', // 从 availableModelInstances 获取定价
    note: 'Credits are consumed per generation. Actual cost depends on your subscription plan.',
  },
  faq: [
    {
      question: 'What is Kling 2.1 and who developed it?',
      answer:
        'Kling 2.1 is an advanced AI-powered video generation model developed by Kuaishou. It transforms reference images and text prompts into high-definition, cinematic videos using sophisticated 3D spatiotemporal attention mechanisms and diffusion transformer architectures.',
    },
    {
      question: 'What types of content can I create with Kling 2.1?',
      answer:
        'Kling 2.1 excels at creating e-commerce product videos, social media content, brand advertising, fashion showcases, UGC-style promotions, and entertainment content. It supports diverse content types including people, animals, objects, and scenes.',
    },
    {
      question: 'How long can Kling 2.1 videos be?',
      answer:
        'Kling 2.1 supports two duration options: 5 seconds and 10 seconds. This flexibility allows you to create quick social clips or longer narrative sequences depending on your needs.',
    },
    {
      question: 'What image formats does Kling 2.1 support?',
      answer:
        'Kling 2.1 accepts JPG, JPEG, PNG, WEBP, GIF, and AVIF image formats as input. The output is always in MP4 format with up to 1080p HD resolution.',
    },
    {
      question: 'Can I use multiple reference images?',
      answer:
        'Yes! Kling 2.1 supports multi-image generation with up to 4 input images. This feature enables consistent character and scene creation across your video content.',
    },
    {
      question: 'How does Kling 2.1 compare to other AI video models?',
      answer:
        'Kling 2.1 stands out for its realistic physics simulation, dynamic facial expressions, and multi-reference support. While models like Veo 3 offer better audio generation and Sora 2 supports longer durations, Kling 2.1 excels in image-to-video quality and is available for free.',
    },
  ],
}

export default async function Kling21ModelPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/kling-2-1`

  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.kling21.model' }),
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
      t('hero.capabilities.duration'),
      t('hero.capabilities.resolution'),
      t('hero.capabilities.physics'),
      t('hero.capabilities.multiRef'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.motion.title'),
      description: t('features.items.motion.description'),
    },
    {
      title: t('features.items.facial.title'),
      description: t('features.items.facial.description'),
    },
    {
      title: t('features.items.multiRef.title'),
      description: t('features.items.multiRef.description'),
    },
    {
      title: t('features.items.duration.title'),
      description: t('features.items.duration.description'),
    },
    {
      title: t('features.items.effects.title'),
      description: t('features.items.effects.description'),
    },
    {
      title: t('features.items.quality.title'),
      description: t('features.items.quality.description'),
    },
  ]

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
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (5).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
      title: t('gallery.items.lipsync.title'),
      description: t('gallery.items.lipsync.description'),
      useCase: t('gallery.items.lipsync.useCase'),
      link: getAppUrl('/canvas?shareid=691f3139a814', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-videos/Houte.mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/haute.png',
      title: t('gallery.items.accessories.title'),
      description: t('gallery.items.accessories.description'),
      useCase: t('gallery.items.accessories.useCase'),
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
        { label: t('specs.categories.inputOutput.inputFormats'), value: 'JPG, PNG, WEBP, GIF' },
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'MP4' },
        { label: t('specs.categories.inputOutput.maxResolution'), value: '1080p HD' },
        { label: t('specs.categories.inputOutput.durationOptions'), value: '5s / 10s' },
      ],
    },
    {
      title: t('specs.categories.capabilities.title'),
      items: [
        { label: t('specs.categories.capabilities.imageToVideo'), value: true },
        { label: t('specs.categories.capabilities.textToVideo'), value: false },
        { label: t('specs.categories.capabilities.multiReference'), value: true },
        { label: t('specs.categories.capabilities.motionBrush'), value: true },
      ],
    },
    {
      title: t('specs.categories.advanced.title'),
      items: [
        { label: t('specs.categories.advanced.physicsSimulation'), value: true },
        { label: t('specs.categories.advanced.facialExpressions'), value: true },
        { label: t('specs.categories.advanced.specialEffects'), value: true },
        { label: t('specs.categories.advanced.cameraModes'), value: true },
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

  // Comparison features with i18n - map translated labels to original keys for model values lookup
  const comparisonFeatureKeys = [
    'imageToVideo',
    'textToVideo',
    'multiReference',
    'maxDuration',
    'resolution',
    'physicsSimulation',
    'facialExpressions',
    'audioGeneration',
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
      name: 'Kling 2.1',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Kling 2.1 FAQ',
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
          modelName="Kling 2.1 Pro"
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
