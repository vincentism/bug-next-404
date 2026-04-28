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
  const t = await getTranslations({ locale, namespace: 'models.seedance15Pro.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
          width: 1200,
          height: 630,
          alt: 'Seedance 1.5 Pro on OpenCreator',
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
      'Native Audio',
      'Lip-sync',
      'Text to Video',
      'Image to Video',
      'Camera Control',
      'Character Consistency',
    ],
    models: [
      {
        name: 'Seedance 1.5 Pro',
        isHighlighted: true,
        values: {
          'Native Audio': true,
          'Lip-sync': true,
          'Text to Video': true,
          'Image to Video': true,
          'Camera Control': true,
          'Character Consistency': true,
        },
      },
      {
        name: 'Seedance 1.0 Pro',
        values: {
          'Native Audio': false,
          'Lip-sync': 'partial',
          'Text to Video': true,
          'Image to Video': true,
          'Camera Control': 'partial',
          'Character Consistency': 'partial',
        },
      },
      {
        name: 'Veo 3',
        values: {
          'Native Audio': true,
          'Lip-sync': 'partial',
          'Text to Video': true,
          'Image to Video': true,
          'Camera Control': true,
          'Character Consistency': 'partial',
        },
      },
    ],
  },
  pricing: {
    modelId: '',
  },
}

export default async function Seedance15ProModelPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'models.seedance15Pro.model' })
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/seedance-1-5-pro`

  const heroData = {
    modelName: t('hero.modelName'),
    tagline: t('hero.tagline'),
    description: t('hero.description'),
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (5).mp4',
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
    capabilities: [
      t('hero.capabilities.nativeAudio'),
      t('hero.capabilities.lipsync'),
      t('hero.capabilities.multilingual'),
      t('hero.capabilities.camera'),
      t('hero.capabilities.story'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: '/pricing',
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.nativeAudio.title'),
      description: t('features.items.nativeAudio.description'),
    },
    {
      title: t('features.items.lipsync.title'),
      description: t('features.items.lipsync.description'),
    },
    {
      title: t('features.items.multilingual.title'),
      description: t('features.items.multilingual.description'),
    },
    {
      title: t('features.items.camera.title'),
      description: t('features.items.camera.description'),
    },
    {
      title: t('features.items.consistency.title'),
      description: t('features.items.consistency.description'),
    },
    {
      title: t('features.items.marketing.title'),
      description: t('features.items.marketing.description'),
    },
  ]

  const gallery = [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (5).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
      title: t('gallery.items.lipsync.title'),
      description: t('gallery.items.lipsync.description'),
      useCase: t('gallery.items.lipsync.useCase'),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (17).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Enterprise Product Ad.png',
      title: t('gallery.items.product.title'),
      description: t('gallery.items.product.description'),
      useCase: t('gallery.items.product.useCase'),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (14).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Product Floral Effect.png',
      title: t('gallery.items.story.title'),
      description: t('gallery.items.story.description'),
      useCase: t('gallery.items.story.useCase'),
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
        { label: t('specs.categories.inputOutput.audio'), value: t('specs.values.audio') },
      ],
    },
    {
      title: t('specs.categories.capabilities.title'),
      items: [
        { label: t('specs.categories.capabilities.textToVideo'), value: true },
        { label: t('specs.categories.capabilities.imageToVideo'), value: true },
        { label: t('specs.categories.capabilities.nativeAudio'), value: true },
        { label: t('specs.categories.capabilities.lipsync'), value: true },
      ],
    },
    {
      title: t('specs.categories.useCases.title'),
      items: [
        { label: t('specs.categories.useCases.ads'), value: true },
        { label: t('specs.categories.useCases.multilingual'), value: true },
        { label: t('specs.categories.useCases.storytelling'), value: true },
      ],
    },
  ]

  const comparisonFeatureKeys = [
    'nativeAudio',
    'lipSync',
    'textToVideo',
    'imageToVideo',
    'cameraControl',
    'characterConsistency',
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
      name: 'Seedance 1.5 Pro',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Seedance 1.5 Pro FAQ',
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
          modelName="Seedance 1.5 Pro"
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
