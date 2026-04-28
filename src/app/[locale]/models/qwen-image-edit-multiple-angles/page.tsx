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
import { AngleControlDemo } from '@/components/landing/angle-control-demo'
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
import { getCdnImageUrlWithSize } from '@/lib/image-cdn'
import { getAppUrl } from '@/lib/app-url'

type PageProps = {
  params: Promise<{ locale: string }>
}

const SHOWCASE_IMAGES = {
  hero: 'https://ik.imagekit.io/opencreator/images/image_20260207_fda1df94-0420-4bba-90b8-b29d7ededede.png',
  topDown: 'https://ik.imagekit.io/opencreator/images/bTDO9wQJkOJ0eT6cYqsdkwaWTnABKdeJ.png',
  leftToRight: 'https://ik.imagekit.io/opencreator/images/O04CK-_Q1Ejwa4eA4eumwmTqmumCtSSk.png',
  lowAngle: 'https://ik.imagekit.io/opencreator/images/CKClsV5CLxlouJ41SPXod24UkZgrF2hM.png',
}

// SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: 'models.qwenImageEditMultipleAngles.model.meta',
  })

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
          url: getCdnImageUrlWithSize(SHOWCASE_IMAGES.hero, 1200, 630),
          width: 1200,
          height: 630,
          alt: 'Qwen Multi-Angle Image Generator',
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
const modelData = {
  comparison: {
    features: [
      'Angle Control',
      '360° Rotation',
      'Vertical Tilt',
      'Zoom Control',
      'Subject Consistency',
      'Batch Workflow',
    ],
    models: [
      {
        name: 'Qwen Multi-Angle',
        isHighlighted: true,
        values: {
          'Angle Control': true,
          '360° Rotation': true,
          'Vertical Tilt': true,
          'Zoom Control': true,
          'Subject Consistency': true,
          'Batch Workflow': true,
        },
      },
      {
        name: 'Generic Img2Img',
        values: {
          'Angle Control': false,
          '360° Rotation': false,
          'Vertical Tilt': false,
          'Zoom Control': false,
          'Subject Consistency': 'partial' as const,
          'Batch Workflow': true,
        },
      },
      {
        name: '3D Rendering',
        values: {
          'Angle Control': true,
          '360° Rotation': true,
          'Vertical Tilt': true,
          'Zoom Control': true,
          'Subject Consistency': true,
          'Batch Workflow': 'partial' as const,
        },
      },
    ],
  },
  pricing: {
    modelId: 'fal-ai/qwen-image-edit-2511-multiple-angles',
  },
}

export default async function QwenMultiAnglePage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: 'models.qwenImageEditMultipleAngles.model',
  })
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/qwen-image-edit-multiple-angles`

  const { subscriptionData, stripePlan } = await getPricingConfig()
  const planSummaries = subscriptionData
    ? buildPlanSummaries(subscriptionData, stripePlan, modelData.pricing.modelId)
    : []

  // Hero data from translations
  const heroData = {
    modelName: t('hero.modelName'),
    tagline: t('hero.tagline'),
    description: t('hero.description'),
    heroImage: getCdnImageUrlWithSize(SHOWCASE_IMAGES.hero, 800, 800),
    capabilities: [
      t('hero.capabilities.angleControl'),
      t('hero.capabilities.multiView'),
      t('hero.capabilities.fullRotation'),
      t('hero.capabilities.zoomControl'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.horizontal.title'),
      description: t('features.items.horizontal.description'),
    },
    {
      title: t('features.items.vertical.title'),
      description: t('features.items.vertical.description'),
    },
    {
      title: t('features.items.zoom.title'),
      description: t('features.items.zoom.description'),
    },
    {
      title: t('features.items.consistency.title'),
      description: t('features.items.consistency.description'),
    },
    {
      title: t('features.items.preview3d.title'),
      description: t('features.items.preview3d.description'),
    },
    {
      title: t('features.items.workflow.title'),
      description: t('features.items.workflow.description'),
    },
  ]

  const gallery = [
    {
      type: 'image' as const,
      src: SHOWCASE_IMAGES.hero,
      poster: SHOWCASE_IMAGES.hero,
      title: t('gallery.items.multiGrid.title'),
      description: t('gallery.items.multiGrid.description'),
      useCase: t('gallery.items.multiGrid.useCase'),
    },
    {
      type: 'image' as const,
      src: SHOWCASE_IMAGES.topDown,
      poster: SHOWCASE_IMAGES.topDown,
      title: t('gallery.items.topDown.title'),
      description: t('gallery.items.topDown.description'),
      useCase: t('gallery.items.topDown.useCase'),
    },
    {
      type: 'image' as const,
      src: SHOWCASE_IMAGES.leftToRight,
      poster: SHOWCASE_IMAGES.leftToRight,
      title: t('gallery.items.leftRight.title'),
      description: t('gallery.items.leftRight.description'),
      useCase: t('gallery.items.leftRight.useCase'),
    },
    {
      type: 'image' as const,
      src: SHOWCASE_IMAGES.lowAngle,
      poster: SHOWCASE_IMAGES.lowAngle,
      title: t('gallery.items.lowAngle.title'),
      description: t('gallery.items.lowAngle.description'),
      useCase: t('gallery.items.lowAngle.useCase'),
    },
  ]

  const faqItems: FAQItem[] = Array.from({ length: 6 }).map((_, index) => ({
    question: t(`faq.items.${index}.question`),
    answer: t(`faq.items.${index}.answer`),
  }))

  // Specs data
  const specs = [
    {
      title: t('specs.categories.angleControl.title'),
      items: [
        { label: t('specs.categories.angleControl.horizontalRange'), value: '0° – 360°' },
        { label: t('specs.categories.angleControl.verticalRange'), value: '-30° – 90°' },
        { label: t('specs.categories.angleControl.zoomLevels'), value: '0 – 10 (step 0.1)' },
        { label: t('specs.categories.angleControl.loraScale'), value: '0 – 2 (default 1.0)' },
      ],
    },
    {
      title: t('specs.categories.inputOutput.title'),
      items: [
        { label: t('specs.categories.inputOutput.inputFormats'), value: 'Image (PNG, JPG, WebP)' },
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'PNG' },
        { label: t('specs.categories.inputOutput.resolution'), value: 'Same as input' },
      ],
    },
    {
      title: t('specs.categories.model.title'),
      items: [
        { label: t('specs.categories.model.architecture'), value: 'Qwen + LoRA' },
        { label: t('specs.categories.model.provider'), value: 'FAL.ai' },
        {
          label: t('specs.categories.model.apiKey'),
          value: 'fal-ai/qwen-image-edit-2511-multiple-angles',
        },
      ],
    },
  ]

  // Comparison features with i18n
  const comparisonFeatureKeys = [
    'angleControl',
    'fullRotation',
    'verticalTilt',
    'zoomControl',
    'subjectConsistency',
    'batchWorkflow',
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

  // Schema.org
  const schemaData = createSchemaGraph([
    buildWebPageSchema({
      url: pageUrl,
      name: t('meta.title'),
      description: t('meta.description'),
    }),
    buildSoftwareApplicationSchema({
      url: pageUrl,
      name: 'Qwen Multi-Angle Image Generator',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Qwen Multi-Angle FAQ',
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

        {/* Interactive Demo Section */}
        <section className="bg-[#f7f7f7] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-5">
                <h2 className="text-3xl md:text-4xl font-poller-one text-black leading-[1.1]">
                  {locale === 'zh' ? '交互式 3D 预览' : 'Interactive 3D Preview'}
                </h2>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  {locale === 'zh'
                    ? '这与 OpenCreator 画布中 Angle Control 原子内置的 3D 相机预览完全一致。拖动球体旋转相机，滚动缩放，或使用滑块精确控制。'
                    : 'This is the same 3D camera preview built into the Angle Control atom on the OpenCreator canvas. Drag the globe to orbit, scroll to zoom, or use the sliders for precision.'}
                </p>
              </div>
              <AngleControlDemo
                horizontalLabel={locale === 'zh' ? '水平角度' : 'Horizontal'}
                verticalLabel={locale === 'zh' ? '垂直角度' : 'Vertical'}
                zoomLabel={locale === 'zh' ? '缩放' : 'Zoom'}
                resetLabel={locale === 'zh' ? '重置' : 'Reset'}
                dragHint={
                  locale === 'zh' ? '拖动旋转 · 滚轮缩放' : 'Drag to orbit · Scroll to zoom'
                }
              />
            </div>
          </div>
        </section>

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
          modelId={modelData.pricing.modelId}
          modelName="Qwen Multi-Angle"
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
