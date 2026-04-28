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

type PageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'models.lumaRay3.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
          width: 1200,
          height: 630,
          alt: 'Luma Ray3 on OpenCreator',
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
  comparison: {
    features: [
      'Text to Video',
      'Image to Video',
      'Video-to-Video',
      'Character Reference',
      'Keyframes',
      'Cinematic Quality',
    ],
    models: [
      {
        name: 'Ray3',
        isHighlighted: true,
        values: {
          'Text to Video': true,
          'Image to Video': true,
          'Video-to-Video': true,
          'Character Reference': true,
          Keyframes: true,
          'Cinematic Quality': true,
        },
      },
      {
        name: 'Luma Ray 2',
        values: {
          'Text to Video': true,
          'Image to Video': true,
          'Video-to-Video': 'partial',
          'Character Reference': 'partial',
          Keyframes: false,
          'Cinematic Quality': 'partial',
        },
      },
      {
        name: 'Kling 2.6 Pro',
        values: {
          'Text to Video': true,
          'Image to Video': true,
          'Video-to-Video': 'partial',
          'Character Reference': false,
          Keyframes: 'partial',
          'Cinematic Quality': true,
        },
      },
    ],
  },
  pricing: {
    modelId: '',
  },
}

export default async function LumaRay3ModelPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'models.lumaRay3.model' })
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/luma-ray-3`

  const heroData = {
    modelName: t('hero.modelName'),
    tagline: t('hero.tagline'),
    description: t('hero.description'),
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
    capabilities: [
      t('hero.capabilities.reasoning'),
      t('hero.capabilities.cinematic'),
      t('hero.capabilities.control'),
      t('hero.capabilities.consistency'),
      t('hero.capabilities.speed'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: '/pricing',
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.reasoning.title'),
      description: t('features.items.reasoning.description'),
    },
    { title: t('features.items.hdr.title'), description: t('features.items.hdr.description') },
    {
      title: t('features.items.temporal.title'),
      description: t('features.items.temporal.description'),
    },
    {
      title: t('features.items.control.title'),
      description: t('features.items.control.description'),
    },
    {
      title: t('features.items.workflow.title'),
      description: t('features.items.workflow.description'),
    },
    {
      title: t('features.items.production.title'),
      description: t('features.items.production.description'),
    },
  ]

  const gallery = [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (8).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
      title: t('gallery.items.character.title'),
      description: t('gallery.items.character.description'),
      useCase: t('gallery.items.character.useCase'),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (16).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Streetwear UGC Promo.png',
      title: t('gallery.items.advertising.title'),
      description: t('gallery.items.advertising.description'),
      useCase: t('gallery.items.advertising.useCase'),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-videos/Houte.mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/haute.png',
      title: t('gallery.items.cinematic.title'),
      description: t('gallery.items.cinematic.description'),
      useCase: t('gallery.items.cinematic.useCase'),
    },
  ]

  const faqItemsRaw = t.raw('faq.items') as unknown
  const faqItems: FAQItem[] = Array.isArray(faqItemsRaw)
    ? (faqItemsRaw as FAQItem[])
    : Object.keys(faqItemsRaw as Record<string, FAQItem>)
        .sort((a, b) => Number(a) - Number(b))
        .map(key => (faqItemsRaw as Record<string, FAQItem>)[key])

  const specs = [
    {
      title: t('specs.categories.inputOutput.title'),
      items: [
        {
          label: t('specs.categories.inputOutput.inputFormats'),
          value: t('specs.values.inputFormats'),
        },
        {
          label: t('specs.categories.inputOutput.outputFormat'),
          value: t('specs.values.outputFormat'),
        },
        {
          label: t('specs.categories.inputOutput.resolution'),
          value: t('specs.values.resolution'),
        },
      ],
    },
    {
      title: t('specs.categories.control.title'),
      items: [
        { label: t('specs.categories.control.prompt'), value: true },
        { label: t('specs.categories.control.character'), value: true },
        { label: t('specs.categories.control.keyframes'), value: true },
      ],
    },
    {
      title: t('specs.categories.production.title'),
      items: [
        { label: t('specs.categories.production.temporal'), value: true },
        { label: t('specs.categories.production.pipeline'), value: true },
      ],
    },
  ]

  const comparisonFeatureKeys = [
    'textToVideo',
    'imageToVideo',
    'videoToVideo',
    'characterReference',
    'keyframes',
    'cinematicQuality',
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
      name: 'Luma Ray3',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Luma Ray3 FAQ',
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
          modelName="Luma Ray3"
          description={t('pricing.description')}
          note={t('pricing.note')}
          viewFullPricingText={t('pricing.viewFullPricing')}
          ctaText={t('pricing.ctaText')}
          ctaLink="/pricing"
          comingSoon={true}
          comingSoonText={t('pricing.comingSoonBadge')}
        />
        <LandingFAQ title={t('faq.title')} items={faqItems} />
      </main>
      <LandingFooter />
    </>
  )
}
