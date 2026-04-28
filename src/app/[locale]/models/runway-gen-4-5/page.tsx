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
  const t = await getTranslations({ locale, namespace: 'models.runwayGen45.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Athletic Ad.png',
          width: 1200,
          height: 630,
          alt: 'Runway Gen-4.5 on OpenCreator',
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
      'Prompt Adherence',
      'Motion Quality',
      'Camera Control',
      'Cinematic Quality',
    ],
    models: [
      {
        name: 'Gen-4.5',
        isHighlighted: true,
        values: {
          'Text to Video': true,
          'Image to Video': true,
          'Prompt Adherence': true,
          'Motion Quality': true,
          'Camera Control': true,
          'Cinematic Quality': true,
        },
      },
      {
        name: 'Runway Gen-4',
        values: {
          'Text to Video': true,
          'Image to Video': true,
          'Prompt Adherence': 'partial',
          'Motion Quality': 'partial',
          'Camera Control': 'partial',
          'Cinematic Quality': true,
        },
      },
      {
        name: 'Sora 2',
        values: {
          'Text to Video': true,
          'Image to Video': true,
          'Prompt Adherence': true,
          'Motion Quality': true,
          'Camera Control': 'partial',
          'Cinematic Quality': true,
        },
      },
    ],
  },
  pricing: {
    modelId: '',
  },
}

export default async function RunwayGen45ModelPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'models.runwayGen45.model' })
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/runway-gen-4-5`

  const heroData = {
    modelName: t('hero.modelName'),
    tagline: t('hero.tagline'),
    description: t('hero.description'),
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (4).mp4',
    heroImage: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Athletic Ad.png',
    capabilities: [
      t('hero.capabilities.motion'),
      t('hero.capabilities.adherence'),
      t('hero.capabilities.camera'),
      t('hero.capabilities.fidelity'),
      t('hero.capabilities.iteration'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: '/pricing',
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.motion.title'),
      description: t('features.items.motion.description'),
    },
    {
      title: t('features.items.adherence.title'),
      description: t('features.items.adherence.description'),
    },
    {
      title: t('features.items.camera.title'),
      description: t('features.items.camera.description'),
    },
    {
      title: t('features.items.realism.title'),
      description: t('features.items.realism.description'),
    },
    {
      title: t('features.items.consistency.title'),
      description: t('features.items.consistency.description'),
    },
    {
      title: t('features.items.workflow.title'),
      description: t('features.items.workflow.description'),
    },
  ]

  const gallery = [
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (4).mp4',
      poster: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Athletic Ad.png',
      title: t('gallery.items.action.title'),
      description: t('gallery.items.action.description'),
      useCase: t('gallery.items.action.useCase'),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
      title: t('gallery.items.product.title'),
      description: t('gallery.items.product.description'),
      useCase: t('gallery.items.product.useCase'),
    },
    {
      type: 'video' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (8).mp4',
      poster:
        'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
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
        { label: t('specs.categories.inputOutput.duration'), value: t('specs.values.duration') },
      ],
    },
    {
      title: t('specs.categories.quality.title'),
      items: [
        { label: t('specs.categories.quality.motion'), value: true },
        { label: t('specs.categories.quality.adherence'), value: true },
        { label: t('specs.categories.quality.camera'), value: true },
      ],
    },
    {
      title: t('specs.categories.workflow.title'),
      items: [
        { label: t('specs.categories.workflow.iteration'), value: true },
        { label: t('specs.categories.workflow.production'), value: true },
      ],
    },
  ]

  const comparisonFeatureKeys = [
    'textToVideo',
    'imageToVideo',
    'promptAdherence',
    'motionQuality',
    'cameraControl',
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
      name: 'Runway Gen-4.5',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Runway Gen-4.5 FAQ',
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
          modelName="Runway Gen-4.5"
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
