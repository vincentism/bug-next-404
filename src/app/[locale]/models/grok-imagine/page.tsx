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
  const t = await getTranslations({ locale, namespace: 'models.grokImagine.model.meta' })
  const canonical = getCanonicalUrl('/models/grok-imagine', locale)

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Grok Imagine',
      'xAI',
      'text to image AI',
      'AI image generator',
      'image generation',
      'prompt enhancement',
      'revised prompt',
      'image editing',
      'photorealistic AI',
      'Grok AI',
      'OpenCreator Grok',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: canonical,
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/images/result-yku8QuqVqnF7nyeU3c-n2kzxvwiK3u-X.jpg',
          width: 1200,
          height: 630,
          alt: 'Grok Imagine AI Image Generator',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    alternates: {
      ...buildAlternatesMetadata('/models/grok-imagine', locale),
    },
  }
}

const modelData = {
  pricing: {
    modelId: 'Fal Grok Imagine Image',
    note: 'Credits are consumed per generation. Actual cost depends on your subscription plan.',
  },
}

export default async function GrokImagineModelPage({ params }: PageProps) {
  const { locale } = await params
  const pageUrl = getCanonicalUrl('/models/grok-imagine', locale)

  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.grokImagine.model' }),
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
    heroImage: 'https://ik.imagekit.io/opencreator/images/result-yku8QuqVqnF7nyeU3c-n2kzxvwiK3u-X.jpg',
    capabilities: [
      t('hero.capabilities.auroraModel'),
      t('hero.capabilities.photorealistic'),
      t('hero.capabilities.styleModes'),
      t('hero.capabilities.fastAffordable'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.aurora.title'),
      description: t('features.items.aurora.description'),
    },
    {
      title: t('features.items.photorealistic.title'),
      description: t('features.items.photorealistic.description'),
    },
    {
      title: t('features.items.styleModes.title'),
      description: t('features.items.styleModes.description'),
    },
    {
      title: t('features.items.editing.title'),
      description: t('features.items.editing.description'),
    },
    {
      title: t('features.items.lowCost.title'),
      description: t('features.items.lowCost.description'),
    },
    {
      title: t('features.items.fast.title'),
      description: t('features.items.fast.description'),
    },
  ]

  // Gallery items - using actual Grok Imagine generated images
  const gallery = [
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/images/result-yku8QuqVqnF7nyeU3c-n2kzxvwiK3u-X.jpg',
      title: t('gallery.items.portrait.title'),
      description: t('gallery.items.portrait.description'),
      useCase: t('gallery.items.portrait.useCase'),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/images/result-sK3SavomIIBdyrQgoZGebmHFZzTGhZBJ.jpg',
      title: t('gallery.items.product.title'),
      description: t('gallery.items.product.description'),
      useCase: t('gallery.items.product.useCase'),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/images/result-Qtv-9p9PF3Mfu9QRTJylJ3ZN4oURY7SO.jpg',
      title: t('gallery.items.landscape.title'),
      description: t('gallery.items.landscape.description'),
      useCase: t('gallery.items.landscape.useCase'),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/images/result-3tZgFgTQeMuvbkdu8vPzkaPpQs2f5iPw.jpg',
      title: t('gallery.items.illustration.title'),
      description: t('gallery.items.illustration.description'),
      useCase: t('gallery.items.illustration.useCase'),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/images/result-q1v547NchVI4Tl2GZGm9kXJPNLVnLFPP.jpg',
      title: t('gallery.items.cyberpunk.title'),
      description: t('gallery.items.cyberpunk.description'),
      useCase: t('gallery.items.cyberpunk.useCase'),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/images/result-FkiM0s8KMFYb8yu4ilKpcsBD2oor7ZNX.jpg',
      title: t('gallery.items.food.title'),
      description: t('gallery.items.food.description'),
      useCase: t('gallery.items.food.useCase'),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/images/result-7DjzXskqY1cbGFEs-Un4oHcCPYKZrAMi.jpg',
      title: t('gallery.items.fashion.title'),
      description: t('gallery.items.fashion.description'),
      useCase: t('gallery.items.fashion.useCase'),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/images/result-qbS2-_T1FP92I1Ju8ecQQdTUQ_ndIxxZ.jpg',
      title: t('gallery.items.architecture.title'),
      description: t('gallery.items.architecture.description'),
      useCase: t('gallery.items.architecture.useCase'),
    },
  ]

  const faqItems: FAQItem[] = Array.from({ length: 6 }).map((_, index) => ({
    question: t(`faq.items.${index}.question`),
    answer: t(`faq.items.${index}.answer`),
  }))

  // Specs data with i18n support - based on fal.ai API documentation
  const specs = [
    {
      title: t('specs.categories.inputOutput.title'),
      items: [
        { label: t('specs.categories.inputOutput.inputFormats'), value: 'Text Prompt' },
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'jpeg, png, webp' },
        {
          label: t('specs.categories.inputOutput.aspectRatios'),
          value: '2:1, 20:9, 19.5:9, 16:9, 4:3, 3:2, 1:1, 2:3, 3:4, 9:16, 9:19.5, 9:20, 1:2',
        },
      ],
    },
    {
      title: t('specs.categories.modes.title'),
      items: [
        { label: t('specs.categories.modes.textToImage'), value: true },
        { label: t('specs.categories.modes.imageEditing'), value: true },
        { label: t('specs.categories.modes.styleModes'), value: 'revised_prompt' },
      ],
    },
    {
      title: t('specs.categories.performance.title'),
      items: [
        { label: t('specs.categories.performance.generationSpeed'), value: 'Varies' },
        { label: t('specs.categories.performance.architecture'), value: '—' },
      ],
    },
    {
      title: t('specs.categories.quality.title'),
      items: [
        { label: t('specs.categories.quality.photorealism'), value: 'Varies' },
        { label: t('specs.categories.quality.promptFidelity'), value: true }, // returns revised_prompt
        { label: t('specs.categories.quality.aesthetics'), value: 'Varies' },
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
      name: 'Grok Imagine',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Grok Imagine FAQ',
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
          modelName="Grok Imagine"
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
