import type { Metadata } from 'next'
import { LandingNavbar, LandingFAQ, LandingFooter } from '@/components/landing'
import OffModalTips from '@/components/dialog/off_modal_tips'
import {
  ModelHero,
  ModelFeatures,
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
  const t = await getTranslations({ locale, namespace: 'models.kling30.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords') as string[],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Enterprise Product Ad.png',
          width: 1200,
          height: 630,
          alt: 'Kling 3.0 AI Video Generator',
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
  comparison: {
    features: [
      'Image to Video',
      'Text to Video',
      'Max Duration',
      'Native Audio',
      'Multi-Shot',
      'Subject Consistency',
    ],
    models: [
      {
        name: 'Kling 3.0 Pro',
        isHighlighted: true,
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Max Duration': '15s',
          'Native Audio': true,
          'Multi-Shot': true,
          'Subject Consistency': true,
        },
      },
      {
        name: 'Kling 2.6 Pro',
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Max Duration': '10s',
          'Native Audio': true,
          'Multi-Shot': false,
          'Subject Consistency': 'partial' as const,
        },
      },
      {
        name: 'Veo 3.1',
        values: {
          'Image to Video': true,
          'Text to Video': true,
          'Max Duration': '8s',
          'Native Audio': true,
          'Multi-Shot': false,
          'Subject Consistency': 'partial' as const,
        },
      },
    ],
  },
  pricing: {
    modelId: 'Fal kling 3.0 Pro Image to Video',
    note: 'Credits vary by duration and tier (Standard/Pro). Subscribe to save more.',
  },
}

export default async function Kling30ModelPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/kling-3-0`

  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.kling30.model' }),
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
    heroVideo: 'https://ik.imagekit.io/opencreator/videos/result-fDBjTTRv1ujGSdTR6WcGpmqv3I-P3vxa.mp4',
    capabilities: [
      t('hero.capabilities.imageToVideo'),
      t('hero.capabilities.textToVideo'),
      t('hero.capabilities.duration'),
      t('hero.capabilities.resolution'),
      t('hero.capabilities.nativeAudio'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.cinematic4K.title'),
      description: t('features.items.cinematic4K.description'),
    },
    {
      title: t('features.items.multiShot.title'),
      description: t('features.items.multiShot.description'),
    },
    {
      title: t('features.items.audioGeneration.title'),
      description: t('features.items.audioGeneration.description'),
    },
    {
      title: t('features.items.subjectConsistency.title'),
      description: t('features.items.subjectConsistency.description'),
    },
    {
      title: t('features.items.physics.title'),
      description: t('features.items.physics.description'),
    },
    {
      title: t('features.items.extendedDuration.title'),
      description: t('features.items.extendedDuration.description'),
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
        { label: t('specs.categories.inputOutput.inputFormats'), value: 'Image, Text, Video Ref' },
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'MP4' },
        { label: t('specs.categories.inputOutput.maxResolution'), value: 'Up to 4K' },
        { label: t('specs.categories.inputOutput.durationOptions'), value: '5s / 10s / 15s' },
      ],
    },
    {
      title: t('specs.categories.capabilities.title'),
      items: [
        { label: t('specs.categories.capabilities.imageToVideo'), value: true },
        { label: t('specs.categories.capabilities.textToVideo'), value: true },
        { label: t('specs.categories.capabilities.audioGeneration'), value: true },
        { label: t('specs.categories.capabilities.multiShot'), value: true },
      ],
    },
    {
      title: t('specs.categories.audioFeatures.title'),
      items: [
        { label: t('specs.categories.audioFeatures.multiLanguage'), value: 'EN, ZH, JA, KO, ES' },
        { label: t('specs.categories.audioFeatures.dialects'), value: true },
        { label: t('specs.categories.audioFeatures.multiCharacter'), value: true },
        { label: t('specs.categories.audioFeatures.soundEffects'), value: true },
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
    'nativeAudio',
    'multiShot',
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
      name: 'Kling 3.0',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Kling 3.0 FAQ',
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

        {/* Tier Comparison Section - Standard vs Pro */}
        <section className="bg-[#f7f7f7] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="font-poller-one text-center text-3xl md:text-4xl text-black mb-3">
              {t('tierComparison.title')}
            </h2>
            <p className="text-center text-[#4F4F4F] text-base md:text-lg mb-8 max-w-2xl mx-auto">
              {t('tierComparison.subtitle')}
            </p>

            {/* Prompt Display */}
            <div className="bg-white rounded-2xl border-2 border-black p-4 md:p-6 shadow-[0_8px_0_#000] mb-10 max-w-4xl mx-auto">
              <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">
                {t('tierComparison.promptLabel')}
              </p>
              <p className="text-sm md:text-base text-[#4F4F4F] leading-relaxed">
                {t('tierComparison.prompt')}
              </p>
            </div>

            {/* Video Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Standard */}
              <div className="flex flex-col items-center">
                <div className="w-full aspect-video rounded-2xl border-2 border-black overflow-hidden shadow-[6px_6px_0px_#000] mb-4">
                  <video
                    className="w-full h-full object-cover"
                    src="https://ik.imagekit.io/opencreator/videos/result-xdxRSFLLt_la0KsQZgn17JGKRFXRHlB5.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
                <span className="px-4 py-1.5 rounded-full border-2 border-black text-sm font-poller-one bg-white">
                  {t('tierComparison.standardLabel')}
                </span>
              </div>

              {/* Pro */}
              <div className="flex flex-col items-center">
                <div className="w-full aspect-video rounded-2xl border-2 border-black overflow-hidden shadow-[6px_6px_0px_#000] mb-4">
                  <video
                    className="w-full h-full object-cover"
                    src="https://ik.imagekit.io/opencreator/videos/result-AmCu9UrBXia5isTJF8jMOoI50Mck7FQ9.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
                <span className="px-4 py-1.5 rounded-full border-2 border-[#1fde1f] text-sm font-poller-one bg-black text-[#1fde1f]">
                  {t('tierComparison.proLabel')}
                </span>
              </div>
            </div>
          </div>
        </section>

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
          modelName="Kling 3.0 Pro"
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
