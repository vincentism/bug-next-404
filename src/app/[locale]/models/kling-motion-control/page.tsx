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

// Demo video URL
const HERO_VIDEO_URL = 'https://ik.imagekit.io/opencreator/videos/NuxBJ_bDG-.mp4'

// SEO Metadata - Enhanced with comprehensive keywords
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'models.klingMotionControl.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      // Primary keywords
      'Kling Motion Control',
      'Kling 2.6 Motion Control',
      'Kling AI motion transfer',
      'motion control AI',
      // Feature keywords
      'dance transfer AI',
      'dance choreography transfer',
      'video motion control',
      'character animation AI',
      'gesture transfer AI',
      'video reference animation',
      'portrait animation',
      'motion replication AI',
      // Use case keywords
      'TikTok dance video maker',
      'viral dance video generator',
      'social media content AI',
      'virtual influencer video',
      'AI avatar animation',
      'character motion transfer',
      // Technical keywords
      'video-oriented mode',
      'image-oriented mode',
      'keep original sound AI',
      'audio preservation video',
      'Kuaishou Kling',
      'fal AI video',
      // Brand keywords
      'OpenCreator AI',
      'OpenCreator motion control',
      'AI video generation',
      'AI video maker free',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/images/jSBlBUQu2s.png',
          width: 1200,
          height: 630,
          alt: 'Kling Motion Control AI Video Generator - Transfer Dance Moves to Any Character',
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

export default async function KlingMotionControlModelPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/kling-motion-control`

  // Get pricing configuration for plan summaries
  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.klingMotionControl.model' }),
    getPricingConfig(),
  ])
  const planSummaries = subscriptionData
    ? buildPlanSummaries(
        subscriptionData,
        stripePlan,
        'fal-ai/kling-video/v2.6/standard/motion-control'
      )
    : []

  // Hero data from translations
  const heroData = {
    modelName: t('hero.modelName'),
    tagline: t('hero.tagline'),
    description: t('hero.description'),
    heroVideo: HERO_VIDEO_URL,
    heroImage: 'https://ik.imagekit.io/opencreator/images/jSBlBUQu2s.png',
    capabilities: [
      t('hero.capabilities.motionTransfer'),
      t('hero.capabilities.videoReference'),
      t('hero.capabilities.imageSubject'),
      t('hero.capabilities.duration'),
      t('hero.capabilities.keepSound'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  // Features from translations
  const features = [
    {
      title: t('features.items.motionTransfer.title'),
      description: t('features.items.motionTransfer.description'),
    },
    {
      title: t('features.items.dualMode.title'),
      description: t('features.items.dualMode.description'),
    },
    {
      title: t('features.items.soundPreservation.title'),
      description: t('features.items.soundPreservation.description'),
    },
    {
      title: t('features.items.subjectFlexibility.title'),
      description: t('features.items.subjectFlexibility.description'),
    },
    {
      title: t('features.items.promptControl.title'),
      description: t('features.items.promptControl.description'),
    },
    {
      title: t('features.items.proQuality.title'),
      description: t('features.items.proQuality.description'),
    },
  ]

  // Gallery items with real workflow examples - featuring the demo video
  const gallery = [
    {
      type: 'video' as const,
      src: HERO_VIDEO_URL,
      poster: 'https://ik.imagekit.io/opencreator/images/jSBlBUQu2s.png',
      title: t('gallery.items.dance.title'),
      description: t('gallery.items.dance.description'),
      useCase: t('gallery.items.dance.useCase'),
      link: getAppUrl('/canvas?shareid=698066d28256', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/videos/I1O0a-WepH.mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/0114/1月14日 (2).png',
      title: t('gallery.items.character.title'),
      description: t('gallery.items.character.description'),
      useCase: t('gallery.items.character.useCase'),
      link: getAppUrl('/canvas?shareid=6967a913e769', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (5).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
      title: t('gallery.items.pet.title'),
      description: t('gallery.items.pet.description'),
      useCase: t('gallery.items.pet.useCase'),
      link: 'https://opencreator.io/templates',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/0115/train background.mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/0115/pasted-image-2026-01-14T16-50-23-381Z.png',
      title: t('gallery.items.influencer.title'),
      description: t('gallery.items.influencer.description'),
      useCase: t('gallery.items.influencer.useCase'),
      link: getAppUrl('/canvas?shareid=6967ca22660c', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
      title: t('gallery.items.product.title'),
      description: t('gallery.items.product.description'),
      useCase: t('gallery.items.product.useCase'),
      link: 'https://opencreator.io/templates',
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/videos/8uGTe8pQ_OjCxSZCdg6sI-CIp4X6J-kD.mp4',
      poster: 'https://ik.imagekit.io/opencreator/images/Q97lqL7Qez.png',
      title: t('gallery.items.tutorial.title'),
      description: t('gallery.items.tutorial.description'),
      useCase: t('gallery.items.tutorial.useCase'),
      link: getAppUrl('/canvas?shareid=698066d28256', locale),
    },
  ]

  // Specs data
  const specs = [
    {
      title: t('specs.categories.inputOutput.title'),
      items: [
        { label: t('specs.categories.inputOutput.inputImage'), value: 'PNG/JPG' },
        { label: t('specs.categories.inputOutput.inputVideo'), value: 'MP4' },
        { label: t('specs.categories.inputOutput.inputText'), value: 'Text Prompt' },
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'MP4' },
      ],
    },
    {
      title: t('specs.categories.modes.title'),
      items: [
        { label: t('specs.categories.modes.videoOriented'), value: true },
        { label: t('specs.categories.modes.imageOriented'), value: true },
      ],
    },
    {
      title: t('specs.categories.capabilities.title'),
      items: [
        { label: t('specs.categories.capabilities.motionTransfer'), value: true },
        { label: t('specs.categories.capabilities.keepSound'), value: true },
        { label: t('specs.categories.capabilities.textPrompt'), value: true },
        { label: t('specs.categories.capabilities.batchProcessing'), value: true },
      ],
    },
    {
      title: t('specs.categories.performance.title'),
      items: [
        { label: t('specs.categories.performance.generationTime'), value: '2-8 min' },
        { label: t('specs.categories.performance.apiAccess'), value: true },
        { label: t('specs.categories.performance.resolution'), value: '1080p' },
      ],
    },
  ]

  // Comparison data
  const comparisonFeatureKeys = [
    'motionTransfer',
    'maxDuration',
    'soundPreservation',
    'textControl',
    'proTier',
  ]
  const comparisonFeatures = comparisonFeatureKeys.map(key => t(`comparison.features.${key}`))

  const comparisonModels = [
    {
      name: 'Kling Motion Control',
      isHighlighted: true,
      values: {
        [comparisonFeatures[0]]: true,
        [comparisonFeatures[1]]: '30s',
        [comparisonFeatures[2]]: true,
        [comparisonFeatures[3]]: true,
        [comparisonFeatures[4]]: true,
      },
    },
    {
      name: 'Kling O1',
      values: {
        [comparisonFeatures[0]]: true,
        [comparisonFeatures[1]]: '60s',
        [comparisonFeatures[2]]: true,
        [comparisonFeatures[3]]: true,
        [comparisonFeatures[4]]: false,
      },
    },
    {
      name: 'Generic Motion Transfer',
      values: {
        [comparisonFeatures[0]]: true,
        [comparisonFeatures[1]]: '10s',
        [comparisonFeatures[2]]: false,
        [comparisonFeatures[3]]: false,
        [comparisonFeatures[4]]: false,
      },
    },
  ]

  // FAQ items
  const faqItems: FAQItem[] = Array.from({ length: 6 }).map((_, index) => ({
    question: t(`faq.items.${index}.question`),
    answer: t(`faq.items.${index}.answer`),
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
      name: 'Kling Motion Control',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Kling Motion Control FAQ',
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

        {/* Pricing Section */}
        <ModelPricing
          title={t('pricing.title')}
          subtitle={t('pricing.subtitle')}
          modelId="opencreator/kling/v2.6/standard/motion-control"
          modelName="Kling Motion Control"
          description={t('pricing.description')}
          note={t('pricing.note')}
          viewFullPricingText={t('pricing.viewFullPricing')}
          modelTiers={[
            {
              modelId: 'fal-ai/kling-video/v2.6/standard/motion-control',
              label: t('pricing.standardLabel'),
            },
            {
              modelId: 'fal-ai/kling-video/v2.6/pro/motion-control',
              label: t('pricing.proLabel'),
            },
          ]}
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
