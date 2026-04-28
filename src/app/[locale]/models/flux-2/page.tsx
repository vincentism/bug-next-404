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
  const t = await getTranslations({ locale, namespace: 'models.flux2.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/3C Brand Poster.png',
          width: 1200,
          height: 630,
          alt: 'FLUX.2 on OpenCreator',
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
      'Multi-Reference',
      'Text Rendering',
      'Image Editing',
      'Resolution',
      'Prompt Following',
      'Product Consistency',
    ],
    models: [
      {
        name: 'FLUX.2',
        isHighlighted: true,
        values: {
          'Multi-Reference': true,
          'Text Rendering': true,
          'Image Editing': true,
          Resolution: '4MP',
          'Prompt Following': true,
          'Product Consistency': true,
        },
      },
      {
        name: 'Flux 1.1 Pro',
        values: {
          'Multi-Reference': 'partial',
          'Text Rendering': 'partial',
          'Image Editing': true,
          Resolution: 'High',
          'Prompt Following': true,
          'Product Consistency': 'partial',
        },
      },
      {
        name: 'Ideogram 3.0',
        values: {
          'Multi-Reference': 'partial',
          'Text Rendering': true,
          'Image Editing': 'partial',
          Resolution: 'High',
          'Prompt Following': 'partial',
          'Product Consistency': 'partial',
        },
      },
    ],
  },
  pricing: {
    modelId: 'Fal Flux 2 Pro',
  },
}

export default async function Flux2ModelPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'models.flux2.model' })
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/flux-2`

  const heroData = {
    modelName: t('hero.modelName'),
    tagline: t('hero.tagline'),
    description: t('hero.description'),
    heroImage: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/3C Brand Poster.png',
    heroVideo: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (7).mp4',
    capabilities: [
      t('hero.capabilities.multiRef'),
      t('hero.capabilities.typography'),
      t('hero.capabilities.product'),
      t('hero.capabilities.editing'),
      t('hero.capabilities.highRes'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: '/pricing',
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.multiRef.title'),
      description: t('features.items.multiRef.description'),
    },
    { title: t('features.items.text.title'), description: t('features.items.text.description') },
    {
      title: t('features.items.detail.title'),
      description: t('features.items.detail.description'),
    },
    {
      title: t('features.items.editing.title'),
      description: t('features.items.editing.description'),
    },
    {
      title: t('features.items.prompt.title'),
      description: t('features.items.prompt.description'),
    },
    {
      title: t('features.items.workflow.title'),
      description: t('features.items.workflow.description'),
    },
  ]

  const gallery = [
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/3C Brand Poster.png',
      title: t('gallery.items.brand.title'),
      description: t('gallery.items.brand.description'),
      useCase: t('gallery.items.brand.useCase'),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
      title: t('gallery.items.product.title'),
      description: t('gallery.items.product.description'),
      useCase: t('gallery.items.product.useCase'),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Streetwear UGC Promo.png',
      title: t('gallery.items.typography.title'),
      description: t('gallery.items.typography.description'),
      useCase: t('gallery.items.typography.useCase'),
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
          label: t('specs.categories.inputOutput.maxResolution'),
          value: t('specs.values.maxResolution'),
        },
      ],
    },
    {
      title: t('specs.categories.capabilities.title'),
      items: [
        { label: t('specs.categories.capabilities.multiReference'), value: true },
        { label: t('specs.categories.capabilities.textRendering'), value: true },
        { label: t('specs.categories.capabilities.imageEditing'), value: true },
      ],
    },
    {
      title: t('specs.categories.useCases.title'),
      items: [
        { label: t('specs.categories.useCases.productShots'), value: true },
        { label: t('specs.categories.useCases.brandDesign'), value: true },
        { label: t('specs.categories.useCases.typography'), value: true },
      ],
    },
  ]

  const comparisonFeatureKeys = [
    'multiReference',
    'textRendering',
    'imageEditing',
    'resolution',
    'promptFollowing',
    'productConsistency',
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
      name: 'FLUX.2',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'FLUX.2 FAQ',
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
          modelName="FLUX.2"
          description={t('pricing.description')}
          note={t('pricing.note')}
          viewFullPricingText={t('pricing.viewFullPricing')}
          ctaText={t('pricing.ctaText')}
          ctaLink="/pricing"
        />
        <LandingFAQ title={t('faq.title')} items={faqItems} />
      </main>
      <LandingFooter />
    </>
  )
}
