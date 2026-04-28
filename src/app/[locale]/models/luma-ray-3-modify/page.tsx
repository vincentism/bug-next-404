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
  const t = await getTranslations({ locale, namespace: 'models.lumaRay3Modify.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Streetwear UGC Promo.png',
          width: 1200,
          height: 630,
          alt: 'Luma Ray3 Modify on OpenCreator',
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
      'Video-to-Video',
      'Performance Preservation',
      'Character Reference',
      'Keyframes',
      'Continuity',
      'Control',
    ],
    models: [
      {
        name: 'Ray3 Modify',
        isHighlighted: true,
        values: {
          'Video-to-Video': true,
          'Performance Preservation': true,
          'Character Reference': true,
          Keyframes: true,
          Continuity: true,
          Control: true,
        },
      },
      {
        name: 'Traditional V2V',
        values: {
          'Video-to-Video': true,
          'Performance Preservation': 'partial',
          'Character Reference': 'partial',
          Keyframes: false,
          Continuity: 'partial',
          Control: 'partial',
        },
      },
      {
        name: 'Image-to-Video',
        values: {
          'Video-to-Video': false,
          'Performance Preservation': false,
          'Character Reference': false,
          Keyframes: false,
          Continuity: 'partial',
          Control: 'partial',
        },
      },
    ],
  },
  pricing: {
    modelId: '',
  },
}

export default async function LumaRay3ModifyModelPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'models.lumaRay3Modify.model' })
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/luma-ray-3-modify`

  const heroData = {
    modelName: t('hero.modelName'),
    tagline: t('hero.tagline'),
    description: t('hero.description'),
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (16).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Streetwear UGC Promo.png',
    capabilities: [
      t('hero.capabilities.v2v'),
      t('hero.capabilities.keyframes'),
      t('hero.capabilities.character'),
      t('hero.capabilities.performance'),
      t('hero.capabilities.continuity'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: '/pricing',
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.keyframes.title'),
      description: t('features.items.keyframes.description'),
    },
    {
      title: t('features.items.character.title'),
      description: t('features.items.character.description'),
    },
    {
      title: t('features.items.performance.title'),
      description: t('features.items.performance.description'),
    },
    {
      title: t('features.items.continuity.title'),
      description: t('features.items.continuity.description'),
    },
    {
      title: t('features.items.editing.title'),
      description: t('features.items.editing.description'),
    },
    {
      title: t('features.items.pipeline.title'),
      description: t('features.items.pipeline.description'),
    },
  ]

  const gallery = [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (6).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Sportswear On-Model Ad.png',
      title: t('gallery.items.modify.title'),
      description: t('gallery.items.modify.description'),
      useCase: t('gallery.items.modify.useCase'),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (4).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Athletic Ad.png',
      title: t('gallery.items.vfx.title'),
      description: t('gallery.items.vfx.description'),
      useCase: t('gallery.items.vfx.useCase'),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-videos/Houte.mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/haute.png',
      title: t('gallery.items.production.title'),
      description: t('gallery.items.production.description'),
      useCase: t('gallery.items.production.useCase'),
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
        { label: t('specs.categories.inputOutput.duration'), value: t('specs.values.duration') },
      ],
    },
    {
      title: t('specs.categories.controls.title'),
      items: [
        { label: t('specs.categories.controls.keyframes'), value: true },
        { label: t('specs.categories.controls.characterReference'), value: true },
        { label: t('specs.categories.controls.performance'), value: true },
      ],
    },
    {
      title: t('specs.categories.production.title'),
      items: [
        { label: t('specs.categories.production.continuity'), value: true },
        { label: t('specs.categories.production.repeatability'), value: true },
      ],
    },
  ]

  const comparisonFeatureKeys = [
    'videoToVideo',
    'performance',
    'characterReference',
    'keyframes',
    'continuity',
    'control',
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
      name: 'Luma Ray3 Modify',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Luma Ray3 Modify FAQ',
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
          modelName="Luma Ray3 Modify"
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
