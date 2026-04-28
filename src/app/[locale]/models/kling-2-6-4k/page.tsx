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
  const t = await getTranslations({ locale, namespace: 'models.kling264K.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Kling 2.6 4K',
      'Kling AI 4K',
      'Kuaishou 4K video',
      '4K AI video generation',
      '60fps AI video',
      'custom voice library',
      'Kling 2026',
      'ultra HD video AI',
      'OpenCreator Kling 4K',
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
          alt: 'Kling 2.6 4K AI Video Generator',
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

// Static comparison data
const comparisonData = {
  features: ['resolution', 'framerate', 'audioGeneration', 'customVoice', 'lipSync'],
  models: [
    {
      name: 'Kling 2.6 4K',
      isHighlighted: true,
      values: {
        resolution: '4K',
        framerate: '60fps',
        audioGeneration: true,
        customVoice: true,
        lipSync: true,
      },
    },
    {
      name: 'Kling 2.6 Pro',
      values: {
        resolution: '1080p',
        framerate: '30fps',
        audioGeneration: true,
        customVoice: false,
        lipSync: true,
      },
    },
    {
      name: 'Veo 3',
      values: {
        resolution: '1080p',
        framerate: '24fps',
        audioGeneration: true,
        customVoice: false,
        lipSync: true,
      },
    },
  ],
}

export default async function Kling264KModelPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'models.kling264K.model' })
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/kling-2-6-4k`

  // Hero data from translations
  const heroData = {
    modelName: t('hero.modelName'),
    tagline: t('hero.tagline'),
    description: t('hero.description'),
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (17).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Enterprise Product Ad.png',
    capabilities: [
      t('hero.capabilities.resolution'),
      t('hero.capabilities.framerate'),
      t('hero.capabilities.customVoice'),
      t('hero.capabilities.audioVisual'),
      t('hero.capabilities.duration'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  // Features from translations
  const features = [
    {
      title: t('features.items.resolution.title'),
      description: t('features.items.resolution.description'),
    },
    {
      title: t('features.items.framerate.title'),
      description: t('features.items.framerate.description'),
    },
    {
      title: t('features.items.customVoice.title'),
      description: t('features.items.customVoice.description'),
    },
    {
      title: t('features.items.audioSync.title'),
      description: t('features.items.audioSync.description'),
    },
    {
      title: t('features.items.characterConsistency.title'),
      description: t('features.items.characterConsistency.description'),
    },
    {
      title: t('features.items.promptFollowing.title'),
      description: t('features.items.promptFollowing.description'),
    },
  ]

  // Gallery items - using existing Kling 2.6 Pro examples as preview
  const gallery = [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (17).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Enterprise Product Ad.png',
      title: t('gallery.items.cinematic.title'),
      description: t('gallery.items.cinematic.description'),
      useCase: t('gallery.items.cinematic.useCase'),
      link: getAppUrl('/canvas?shareid=691f25484cd0', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (16).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Streetwear UGC Promo.png',
      title: t('gallery.items.commercial.title'),
      description: t('gallery.items.commercial.description'),
      useCase: t('gallery.items.commercial.useCase'),
      link: getAppUrl('/canvas?shareid=691f269d38df', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
      title: t('gallery.items.vr.title'),
      description: t('gallery.items.vr.description'),
      useCase: t('gallery.items.vr.useCase'),
      link: getAppUrl('/canvas?shareid=691f2a048044', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (5).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
      title: t('gallery.items.sports.title'),
      description: t('gallery.items.sports.description'),
      useCase: t('gallery.items.sports.useCase'),
      link: getAppUrl('/canvas?shareid=691f3139a814', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (8).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
      title: t('gallery.items.documentary.title'),
      description: t('gallery.items.documentary.description'),
      useCase: t('gallery.items.documentary.useCase'),
      link: getAppUrl('/canvas?shareid=692053b03267', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (13).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/ASMR Promo.png',
      title: t('gallery.items.branding.title'),
      description: t('gallery.items.branding.description'),
      useCase: t('gallery.items.branding.useCase'),
      link: getAppUrl('/canvas?shareid=691f27c703c2', locale),
    },
  ]

  // Specs data
  const specs = [
    {
      title: t('specs.categories.inputOutput.title'),
      items: [
        { label: t('specs.categories.inputOutput.inputFormats'), value: 'Image, Text' },
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'MP4' },
        { label: t('specs.categories.inputOutput.maxResolution'), value: '4K (3840×2160)' },
        { label: t('specs.categories.inputOutput.framerate'), value: 'Up to 60fps' },
      ],
    },
    {
      title: t('specs.categories.capabilities.title'),
      items: [
        { label: t('specs.categories.capabilities.imageToVideo'), value: true },
        { label: t('specs.categories.capabilities.textToVideo'), value: true },
        { label: t('specs.categories.capabilities.audioGeneration'), value: true },
        { label: t('specs.categories.capabilities.customVoice'), value: true },
      ],
    },
    {
      title: t('specs.categories.audioFeatures.title'),
      items: [
        { label: t('specs.categories.audioFeatures.voiceCloning'), value: true },
        { label: t('specs.categories.audioFeatures.multiVoice'), value: true },
        { label: t('specs.categories.audioFeatures.soundEffects'), value: true },
        { label: t('specs.categories.audioFeatures.ambientAudio'), value: true },
      ],
    },
    {
      title: t('specs.categories.performance.title'),
      items: [
        { label: t('specs.categories.performance.generationTime'), value: 'TBA' },
        { label: t('specs.categories.performance.apiAccess'), value: true },
        { label: t('specs.categories.performance.batchProcessing'), value: true },
      ],
    },
  ]

  // Comparison features with i18n
  const comparisonFeatureKeys = comparisonData.features
  const comparisonFeatures = comparisonFeatureKeys.map(key => t(`comparison.features.${key}`))

  const comparisonModels = comparisonData.models.map(model => ({
    ...model,
    values: Object.fromEntries(
      comparisonFeatureKeys.map((key, index) => [
        comparisonFeatures[index],
        model.values[key as keyof typeof model.values],
      ])
    ),
  }))

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
      name: 'Kling 2.6 4K',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Kling 2.6 4K FAQ',
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
          modelId="Fal kling 2.6 Pro Image to Video"
          modelName="Kling 2.6 4K"
          description={t('pricing.description')}
          note={t('pricing.note')}
          viewFullPricingText={t('pricing.viewFullPricing')}
          comingSoon={true}
        />

        {/* FAQ Section */}
        <LandingFAQ title={t('faq.title')} items={faqItems} />
      </main>

      <LandingFooter />
    </>
  )
}
