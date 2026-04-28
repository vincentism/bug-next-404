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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'models.pixverseLipsync.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Pixverse Lipsync',
      'AI lip sync',
      'lip sync video',
      'talking head video',
      'audio to video sync',
      'video dubbing AI',
      'lip sync generator',
      'realistic lip sync',
      'OpenCreator Pixverse',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
          width: 1200,
          height: 630,
          alt: 'Pixverse Lipsync AI',
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

const modelData = {
  hero: {
    modelName: 'Pixverse Lipsync',
    tagline: 'Realistic AI Lip Sync',
    description:
      'Pixverse Lipsync generates realistic lip sync animations from audio using advanced algorithms for high-quality synchronization. Perfect for talking head videos, animated portraits, and social media content creation.',
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (5).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
    capabilities: [
      'Video to Video',
      'Audio Sync',
      'Lip Sync',
      'Realistic Output',
      'Fast Processing',
    ],
    badge: 'Popular',
    ctaText: 'Try Pixverse Lipsync Free',
  },
  comparison: {
    features: ['Lip Sync', 'Realism', 'Speed', 'Multi-Language', 'API Access', 'Free Tier'],
    models: [
      {
        name: 'Pixverse Lipsync',
        isHighlighted: true,
        values: {
          'Lip Sync': true,
          Realism: 'High',
          Speed: 'Fast',
          'Multi-Language': true,
          'API Access': true,
          'Free Tier': true,
        },
      },
      {
        name: 'Sync Lipsync 2.0',
        values: {
          'Lip Sync': true,
          Realism: 'Very High',
          Speed: 'Fast',
          'Multi-Language': true,
          'API Access': true,
          'Free Tier': false,
        },
      },
      {
        name: 'Kling Lipsync',
        values: {
          'Lip Sync': true,
          Realism: 'High',
          Speed: 'Medium',
          'Multi-Language': true,
          'API Access': true,
          'Free Tier': false,
        },
      },
    ],
  },
  pricing: {
    modelId: 'Fal Pixverse Lipsync',
    note: 'Credits based on video duration. Subscribe to save more.',
  },
}

export default async function PixverseLipsyncModelPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/pixverse-lipsync`

  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.pixverseLipsync.model' }),
    getPricingConfig(),
  ])
  const planSummaries = subscriptionData
    ? buildPlanSummaries(subscriptionData, stripePlan, modelData.pricing.modelId)
    : []

  const heroData = {
    modelName: t('hero.modelName'),
    tagline: t('hero.tagline'),
    description: t('hero.description'),
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (5).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
    capabilities: [
      t('hero.capabilities.videoToVideo'),
      t('hero.capabilities.audioSync'),
      t('hero.capabilities.lipSync'),
      t('hero.capabilities.realistic'),
      t('hero.capabilities.fast'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.realistic.title'),
      description: t('features.items.realistic.description'),
    },
    {
      title: t('features.items.audioSync.title'),
      description: t('features.items.audioSync.description'),
    },
    {
      title: t('features.items.versatile.title'),
      description: t('features.items.versatile.description'),
    },
    {
      title: t('features.items.quality.title'),
      description: t('features.items.quality.description'),
    },
    {
      title: t('features.items.fast.title'),
      description: t('features.items.fast.description'),
    },
    {
      title: t('features.items.api.title'),
      description: t('features.items.api.description'),
    },
  ]

  const gallery = [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (5).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
      title: t('gallery.items.talkingHead.title'),
      description: t('gallery.items.talkingHead.description'),
      useCase: t('gallery.items.talkingHead.useCase'),
      link: getAppUrl('/canvas?shareid=691f3139a814', locale),
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
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (16).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Streetwear UGC Promo.png',
      title: t('gallery.items.dubbing.title'),
      description: t('gallery.items.dubbing.description'),
      useCase: t('gallery.items.dubbing.useCase'),
      link: getAppUrl('/canvas?shareid=691f269d38df', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (8).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
      title: t('gallery.items.ugc.title'),
      description: t('gallery.items.ugc.description'),
      useCase: t('gallery.items.ugc.useCase'),
      link: getAppUrl('/canvas?shareid=692053b03267', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (13).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/ASMR Promo.png',
      title: t('gallery.items.education.title'),
      description: t('gallery.items.education.description'),
      useCase: t('gallery.items.education.useCase'),
      link: getAppUrl('/canvas?shareid=691f27c703c2', locale),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
      title: t('gallery.items.avatar.title'),
      description: t('gallery.items.avatar.description'),
      useCase: t('gallery.items.avatar.useCase'),
      link: getAppUrl('/canvas?shareid=691f2a048044', locale),
    },
  ]

  const faqItems: FAQItem[] = Array.from({ length: 6 }).map((_, index) => ({
    question: t(`faq.items.${index}.question`),
    answer: t(`faq.items.${index}.answer`),
  }))

  const specs = [
    {
      title: t('specs.categories.inputOutput.title'),
      items: [
        { label: t('specs.categories.inputOutput.videoFormats'), value: 'MP4, MOV, WebM, GIF' },
        { label: t('specs.categories.inputOutput.audioFormats'), value: 'MP3, WAV, AAC, OGG' },
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'MP4' },
        { label: t('specs.categories.inputOutput.maxDuration'), value: 'Variable' },
      ],
    },
    {
      title: t('specs.categories.capabilities.title'),
      items: [
        { label: t('specs.categories.capabilities.lipSync'), value: true },
        { label: t('specs.categories.capabilities.audioSync'), value: true },
        { label: t('specs.categories.capabilities.faceDetection'), value: true },
        { label: t('specs.categories.capabilities.multiLanguage'), value: true },
      ],
    },
    {
      title: t('specs.categories.quality.title'),
      items: [
        { label: t('specs.categories.quality.realism'), value: 'High' },
        { label: t('specs.categories.quality.consistency'), value: true },
        { label: t('specs.categories.quality.resolution'), value: true },
        { label: t('specs.categories.quality.frameRate'), value: 'Preserved' },
      ],
    },
    {
      title: t('specs.categories.performance.title'),
      items: [
        { label: t('specs.categories.performance.generationTime'), value: '~$0.04/sec' },
        { label: t('specs.categories.performance.apiAccess'), value: true },
        { label: t('specs.categories.performance.batchProcessing'), value: true },
      ],
    },
  ]

  const comparisonFeatureKeys = [
    'lipSync',
    'realism',
    'speed',
    'multiLanguage',
    'apiAccess',
    'freeTier',
  ]
  const comparisonFeatures = comparisonFeatureKeys.map(key => t(`comparison.features.${key}`))

  const comparisonModels = modelData.comparison.models.map(model => ({
    ...model,
    values: Object.fromEntries(
      comparisonFeatureKeys.map((key, index) => [
        comparisonFeatures[index],
        (model.values as Record<string, string | boolean>)[modelData.comparison.features[index]],
      ])
    ),
  }))

  const schemaData = createSchemaGraph([
    buildWebPageSchema({
      url: pageUrl,
      name: t('meta.title'),
      description: t('meta.description'),
    }),
    buildSoftwareApplicationSchema({
      url: pageUrl,
      name: 'Pixverse Lipsync',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Pixverse Lipsync FAQ',
      faqItems,
    }),
  ])

  return (
    <>
      <OffModalTips />
      <JsonLd data={schemaData} />

      <LandingNavbar />

      <main>
        <ModelHero {...heroData} />

        <ModelFeatures
          title={t('features.title')}
          subtitle={t('features.subtitle')}
          features={features}
        />

        <ModelGallery title={t('gallery.title')} subtitle={t('gallery.subtitle')} items={gallery} />

        <ModelSpecs title={t('specs.title')} subtitle={t('specs.subtitle')} categories={specs} />

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

        <ModelPricing
          title={t('pricing.title')}
          subtitle={t('pricing.subtitle')}
          modelId={modelData.pricing.modelId}
          modelName="Pixverse Lipsync"
          description={t('pricing.description')}
          note={t('pricing.note')}
          viewFullPricingText={t('pricing.viewFullPricing')}
          planSummaries={planSummaries}
          planSectionTitle={t('pricing.planSectionTitle')}
          planCreditsPerMonthLabel={t('pricing.planCreditsPerMonthLabel')}
          planPerGenerationLabel={t('pricing.planPerGenerationLabel')}
        />

        <LandingFAQ title={t('faq.title')} items={faqItems} />
      </main>

      <LandingFooter />
    </>
  )
}
