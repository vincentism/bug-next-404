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

// SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'models.gptImage15.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'GPT Image 1.5',
      'OpenAI image generator',
      'AI image generation',
      'text to image AI',
      'GPT Image 1.5 API',
      'OpenAI image model',
      'AI image editing',
      'text rendering AI',
      'ChatGPT images',
      'image generation API',
      'OpenCreator GPT Image',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [
        {
          url: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Amazon Product Photo Set.png',
          width: 1200,
          height: 630,
          alt: 'GPT Image 1.5 AI Image Generator',
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
  hero: {
    modelName: 'GPT Image 1.5',
    tagline: "OpenAI's Flagship Image Generator",
    description:
      "GPT Image 1.5 is OpenAI's newest flagship image generation model, delivering 4x faster creation speeds, precise editing capabilities, and stronger instruction following. Perfect for iterative creative workflows and professional image production.",
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Amazon Product Photo Set.png',
    capabilities: [
      'Text to Image',
      'Precise Editing',
      '4x Faster',
      'Text Rendering',
      'Strong Instructions',
    ],
    badge: 'New',
    ctaText: 'Try GPT Image 1.5 Free',
  },
  features: [
    {
      title: '4x Faster Generation',
      description:
        'Generate images up to four times faster than previous models, enabling rapid iteration and efficient creative workflows.',
    },
    {
      title: 'Precise Editing',
      description:
        'Add or remove objects, change visual styles, adjust clothing, and refine specific areas without regenerating the entire image.',
    },
    {
      title: 'Stronger Instruction Following',
      description:
        'Enhanced ability to follow complex prompts accurately, especially during iterative edits for consistent results.',
    },
    {
      title: 'Improved Text Rendering',
      description:
        'Generate more legible text inside images, addressing a long-standing challenge in AI image generation.',
    },
    {
      title: 'Detail Preservation',
      description:
        'Maintains fine details and quality during edits, ensuring professional-grade output for commercial use.',
    },
    {
      title: 'Versatile Styles',
      description:
        'Support for diverse visual styles from photorealistic to artistic, with preset filters and trending designs.',
    },
  ],
  gallery: [
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Amazon Product Photo Set.png',
      title: 'Product Photography',
      description: 'E-commerce Imagery',
      useCase:
        'Create professional product photos with perfect lighting and backgrounds for online stores.',
      shareId: '69204e7cce26',
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Post.png',
      title: 'Marketing Visuals',
      description: 'Brand Assets',
      useCase: 'Generate cohesive marketing materials with accurate text and brand elements.',
      shareId: '691f24bb8dda',
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/LinkedIn Headshot.png',
      title: 'Portrait Generation',
      description: 'Professional Headshots',
      useCase:
        'Create realistic portraits and headshots for professional profiles and social media.',
      shareId: '691f1fe0bb8b',
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Black Friday Poster.png',
      title: 'Poster Design',
      description: 'Typography & Layout',
      useCase: 'Design stunning posters with accurate text rendering and professional typography.',
      shareId: '691f2e16b9f1',
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Virtual Try-on.png',
      title: 'Virtual Try-on',
      description: 'Fashion & Apparel',
      useCase: 'Create virtual try-on experiences for fashion and apparel products.',
      shareId: '691f244dde65',
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Product Background Swap.png',
      title: 'Background Swap',
      description: 'Image Editing',
      useCase: 'Edit existing images with targeted changes while preserving overall quality.',
      shareId: '692050d932cf',
    },
  ],
  comparison: {
    features: [
      'Text to Image',
      'Image Editing',
      'Text Rendering',
      'Max Resolution',
      'Generation Speed',
      'Instruction Following',
    ],
    models: [
      {
        name: 'GPT Image 1.5',
        isHighlighted: true,
        values: {
          'Text to Image': true,
          'Image Editing': true,
          'Text Rendering': true,
          'Max Resolution': '4K',
          'Generation Speed': '4x Faster',
          'Instruction Following': true,
        },
      },
      {
        name: 'Nano Banana Pro',
        values: {
          'Text to Image': true,
          'Image Editing': true,
          'Text Rendering': true,
          'Max Resolution': '4K',
          'Generation Speed': 'Fast',
          'Instruction Following': true,
        },
      },
      {
        name: 'FLUX 1.1 Pro',
        values: {
          'Text to Image': true,
          'Image Editing': 'partial',
          'Text Rendering': 'partial',
          'Max Resolution': '2K',
          'Generation Speed': 'Fast',
          'Instruction Following': 'partial',
        },
      },
    ],
  },
  pricing: {
    modelId: 'Fal_GPT_Image_1.5_Text_to_Image',
    note: 'Credits vary by image size and quality. Subscribe to save more.',
  },
  faq: [
    {
      question: 'What is GPT Image 1.5 and who developed it?',
      answer:
        "GPT Image 1.5 is OpenAI's newest flagship image generation model, released in December 2025. It delivers 4x faster generation speeds, precise editing capabilities, and stronger instruction following compared to previous models.",
    },
    {
      question: 'What types of content can I create with GPT Image 1.5?',
      answer:
        'GPT Image 1.5 excels at creating product photography, marketing visuals, portraits, poster designs, social media content, and image editing. It supports diverse visual styles from photorealistic to artistic.',
    },
    {
      question: 'How fast is GPT Image 1.5?',
      answer:
        'GPT Image 1.5 runs up to 4x faster than its predecessor, enabling rapid iteration and efficient creative workflows for professional use.',
    },
    {
      question: 'Can GPT Image 1.5 render text in images?',
      answer:
        'Yes! GPT Image 1.5 has significantly improved text rendering capabilities, producing more legible text inside images. This addresses a long-standing challenge in AI image generation.',
    },
    {
      question: 'What editing capabilities does GPT Image 1.5 have?',
      answer:
        'GPT Image 1.5 supports precise editing including adding or removing objects, changing visual styles, adjusting clothing, and refining specific areas without regenerating the entire image.',
    },
    {
      question: 'How does GPT Image 1.5 compare to other AI image models?',
      answer:
        'GPT Image 1.5 stands out for its speed (4x faster), precise editing capabilities, and strong instruction following. While models like Nano Banana Pro offer different strengths, GPT Image 1.5 excels in iterative creative workflows.',
    },
  ],
}

export default async function GptImage15ModelPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/gpt-image-1-5`

  const [t, { subscriptionData, stripePlan }] = await Promise.all([
    getTranslations({ locale, namespace: 'models.gptImage15.model' }),
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
    heroImage:
      'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Amazon Product Photo Set.png',
    capabilities: [
      t('hero.capabilities.textToImage'),
      t('hero.capabilities.imageEditing'),
      t('hero.capabilities.speed'),
      t('hero.capabilities.textRendering'),
      t('hero.capabilities.instructionFollowing'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: getAppUrl('/', locale),
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.speed.title'),
      description: t('features.items.speed.description'),
    },
    {
      title: t('features.items.editing.title'),
      description: t('features.items.editing.description'),
    },
    {
      title: t('features.items.instruction.title'),
      description: t('features.items.instruction.description'),
    },
    {
      title: t('features.items.text.title'),
      description: t('features.items.text.description'),
    },
    {
      title: t('features.items.detail.title'),
      description: t('features.items.detail.description'),
    },
    {
      title: t('features.items.versatile.title'),
      description: t('features.items.versatile.description'),
    },
  ]

  const gallery = [
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Amazon Product Photo Set.png',
      title: t('gallery.items.product.title'),
      description: t('gallery.items.product.description'),
      useCase: t('gallery.items.product.useCase'),
      link: getAppUrl('/canvas?shareid=69204e7cce26', locale),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Post.png',
      title: t('gallery.items.marketing.title'),
      description: t('gallery.items.marketing.description'),
      useCase: t('gallery.items.marketing.useCase'),
      link: getAppUrl('/canvas?shareid=691f24bb8dda', locale),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/LinkedIn Headshot.png',
      title: t('gallery.items.portrait.title'),
      description: t('gallery.items.portrait.description'),
      useCase: t('gallery.items.portrait.useCase'),
      link: getAppUrl('/canvas?shareid=691f1fe0bb8b', locale),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Black Friday Poster.png',
      title: t('gallery.items.poster.title'),
      description: t('gallery.items.poster.description'),
      useCase: t('gallery.items.poster.useCase'),
      link: getAppUrl('/canvas?shareid=691f2e16b9f1', locale),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Virtual Try-on.png',
      title: t('gallery.items.social.title'),
      description: t('gallery.items.social.description'),
      useCase: t('gallery.items.social.useCase'),
      link: getAppUrl('/canvas?shareid=691f244dde65', locale),
    },
    {
      type: 'image' as const,
      src: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Product Background Swap.png',
      title: t('gallery.items.editing.title'),
      description: t('gallery.items.editing.description'),
      useCase: t('gallery.items.editing.useCase'),
      link: getAppUrl('/canvas?shareid=692050d932cf', locale),
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
        { label: t('specs.categories.inputOutput.inputFormats'), value: 'Text, Image' },
        { label: t('specs.categories.inputOutput.outputFormat'), value: 'PNG, JPEG' },
        { label: t('specs.categories.inputOutput.maxResolution'), value: '4K' },
        { label: t('specs.categories.inputOutput.aspectRatios'), value: 'Multiple' },
      ],
    },
    {
      title: t('specs.categories.capabilities.title'),
      items: [
        { label: t('specs.categories.capabilities.textToImage'), value: true },
        { label: t('specs.categories.capabilities.imageEditing'), value: true },
        { label: t('specs.categories.capabilities.inpainting'), value: true },
        { label: t('specs.categories.capabilities.textRendering'), value: true },
      ],
    },
    {
      title: t('specs.categories.advanced.title'),
      items: [
        { label: t('specs.categories.advanced.iterativeEditing'), value: true },
        { label: t('specs.categories.advanced.stylePresets'), value: true },
        { label: t('specs.categories.advanced.detailPreservation'), value: true },
        { label: t('specs.categories.advanced.instructionFollowing'), value: true },
      ],
    },
    {
      title: t('specs.categories.performance.title'),
      items: [
        { label: t('specs.categories.performance.generationTime'), value: '10-30s' },
        { label: t('specs.categories.performance.apiAccess'), value: true },
        { label: t('specs.categories.performance.batchProcessing'), value: true },
      ],
    },
  ]

  // Comparison features with i18n
  const comparisonFeatureKeys = [
    'textToImage',
    'imageEditing',
    'textRendering',
    'maxResolution',
    'speed',
    'instructionFollowing',
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
      name: 'GPT Image 1.5',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'GPT Image 1.5 FAQ',
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
          modelName="GPT Image 1.5"
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
