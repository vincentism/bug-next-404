import type { Metadata } from 'next'
import { LandingNavbar, LandingFAQ, LandingFooter } from '@/components/landing'
import OffModalTips from '@/components/dialog/off_modal_tips'
import {
  ModelHero,
  ModelFeatures,
  ModelGallery,
  ModelSpecs,
  ModelPricing,
} from '@/components/landing/model'
import { JsonLd } from '@/components/seo/json-ld'
import {
  createSchemaGraph,
  buildWebPageSchema,
  buildFaqPageSchema,
  buildSoftwareApplicationSchema,
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
  const t = await getTranslations({ locale, namespace: 'models.grokImagineVideo.model.meta' })
  const canonical = getCanonicalUrl('/models/grok-imagine-video', locale)

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Grok Imagine Video',
      'xAI video',
      'AI video generator',
      'video with audio',
      'text to video',
      'image to video',
      'Grok AI',
      'xAI Grok',
      'video generation',
      'OpenCreator Grok',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: canonical,
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/landing/models/grok.png',
          width: 1024,
          height: 1024,
          alt: 'Grok Imagine Video AI Generator',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    alternates: {
      ...buildAlternatesMetadata('/models/grok-imagine-video', locale),
    },
  }
}

const modelData = {
  pricing: {
    modelId: 'Fal Grok Imagine Video I2V',
    note: 'Credits scale with duration: 60 credits per second. A 6-second video costs 360 credits.',
  },
}

export default async function GrokImagineVideoModelPage({ params }: PageProps) {
  const { locale } = await params
  const pageUrl = getCanonicalUrl('/models/grok-imagine-video', locale)

  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.grokImagineVideo.model' }),
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
    heroVideo: 'https://ik.imagekit.io/opencreator/videos/result-aV0z1Pd9Fv1lLvUQda1V9dhLkqI4ke6R.mp4',
    heroImage: 'https://ik.imagekit.io/opencreator/web/landing/models/grok.png',
    capabilities: [
      t('hero.capabilities.nativeAudio'),
      t('hero.capabilities.lipSync'),
      t('hero.capabilities.upTo15s'),
      t('hero.capabilities.payPerSecond'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.nativeAudio.title'),
      description: t('features.items.nativeAudio.description'),
    },
    {
      title: t('features.items.lipSync.title'),
      description: t('features.items.lipSync.description'),
    },
    {
      title: t('features.items.duration.title'),
      description: t('features.items.duration.description'),
    },
    {
      title: t('features.items.flexiblePricing.title'),
      description: t('features.items.flexiblePricing.description'),
    },
    {
      title: t('features.items.fast.title'),
      description: t('features.items.fast.description'),
    },
    {
      title: t('features.items.aspectRatios.title'),
      description: t('features.items.aspectRatios.description'),
    },
  ]

  // Gallery items - using actual Grok Imagine Video generated videos
  const gallery = [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/videos/result-aV0z1Pd9Fv1lLvUQda1V9dhLkqI4ke6R.mp4',
      title: t('gallery.items.lipSync.title'),
      description: t('gallery.items.lipSync.description'),
      useCase: t('gallery.items.lipSync.useCase'),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/videos/result-pMi-8LC53iVMhyhngBXkZ3i4gbAcUCR9.mp4',
      title: t('gallery.items.product.title'),
      description: t('gallery.items.product.description'),
      useCase: t('gallery.items.product.useCase'),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/videos/result--8bZkPcy5rlimXcazrjp9Cp2MFpK05fj.mp4',
      title: t('gallery.items.playful.title'),
      description: t('gallery.items.playful.description'),
      useCase: t('gallery.items.playful.useCase'),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/videos/result-0Tf7XuEi7n05hWrAB2qFO7D5a_M-lCsd.mp4',
      title: t('gallery.items.lion.title'),
      description: t('gallery.items.lion.description'),
      useCase: t('gallery.items.lion.useCase'),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/videos/result-_kc3dWplxR8gCJCutozFo7JSDFtgPHhJ.mp4',
      title: t('gallery.items.ocean.title'),
      description: t('gallery.items.ocean.description'),
      useCase: t('gallery.items.ocean.useCase'),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/videos/result-A05i1PSeFmsA8HkiMPLpceE4RMUufxkx.mp4',
      title: t('gallery.items.tokyo.title'),
      description: t('gallery.items.tokyo.description'),
      useCase: t('gallery.items.tokyo.useCase'),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/videos/result-SyKtO1CX7xj7pjADXKklPxtN2aSVAj7u.mp4',
      title: t('gallery.items.barista.title'),
      description: t('gallery.items.barista.description'),
      useCase: t('gallery.items.barista.useCase'),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/videos/result-XXOj6yMSYm1h6yzBq7UugqIa-nJK7wrM.mp4',
      title: t('gallery.items.butterfly.title'),
      description: t('gallery.items.butterfly.description'),
      useCase: t('gallery.items.butterfly.useCase'),
    },
  ]

  const faqItems: FAQItem[] = Array.from({ length: 6 }).map((_, index) => ({
    question: t(`faq.items.${index}.question`),
    answer: t(`faq.items.${index}.answer`),
  }))

  // Specs data with i18n support - based on fal.ai API documentation
  const specs = [
    {
      title: t('specs.categories.video.title'),
      items: [
        { label: t('specs.categories.video.duration'), value: '1-15 seconds' },
        { label: t('specs.categories.video.resolution'), value: '480p, 720p' },
        { label: t('specs.categories.video.frameRate'), value: 'Returned in output (fps)' },
        {
          label: t('specs.categories.video.aspectRatios'),
          value: 'auto, 16:9, 4:3, 3:2, 1:1, 2:3, 3:4, 9:16',
        },
      ],
    },
    {
      title: t('specs.categories.audio.title'),
      items: [
        { label: t('specs.categories.audio.nativeAudio'), value: true },
        { label: t('specs.categories.audio.lipSync'), value: 'Not specified' },
        { label: t('specs.categories.audio.soundEffects'), value: 'Not specified' },
      ],
    },
    {
      title: t('specs.categories.input.title'),
      items: [
        { label: t('specs.categories.input.textToVideo'), value: true },
        { label: t('specs.categories.input.imageToVideo'), value: true },
      ],
    },
    {
      title: t('specs.categories.pricing.title'),
      items: [
        { label: t('specs.categories.pricing.costPerSecond'), value: '60 credits' },
        { label: t('specs.categories.pricing.minimumDuration'), value: '1 second' },
        { label: t('specs.categories.pricing.maximumDuration'), value: '15 seconds' },
      ],
    },
  ]

  // Schema.org structured data
  const schemaData = createSchemaGraph([
    buildWebPageSchema({
      url: pageUrl,
      name: t('meta.title'),
      description: t('meta.description'),
    }),
    buildSoftwareApplicationSchema({
      url: pageUrl,
      name: 'Grok Imagine Video',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Grok Imagine Video FAQ',
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

        {/* Pricing Section */}
        <ModelPricing
          title={t('pricing.title')}
          subtitle={t('pricing.subtitle')}
          modelId={modelData.pricing.modelId}
          modelName="Grok Imagine Video"
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
