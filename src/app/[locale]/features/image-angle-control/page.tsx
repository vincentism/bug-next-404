import type { Metadata } from 'next'
import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import {
  RotateCw,
  ArrowUpDown,
  ZoomIn,
  Globe,
  Workflow,
  Layers,
  ShoppingCart,
  Shirt,
  Store,
  Sparkles,
} from 'lucide-react'
import { getTranslations } from '@/i18n/get-translations'
import OffModalTips from '@/components/dialog/off_modal_tips'
import {
  LandingNavbar,
  LandingCTA,
  LandingFooter,
  LandingFAQ,
  RelatedSolutions,
} from '@/components/landing'
import { SOLUTION_ITEMS } from '@/components/landing/solution-items'
import { AngleControlDemo } from '@/components/landing/angle-control-demo'
import { JsonLd } from '@/components/seo/json-ld'
import {
  buildFaqPageSchema,
  buildSoftwareApplicationSchema,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  createSchemaGraph,
  getSiteUrl,
} from '@/lib/seo/schema'
import { buildAlternatesMetadata, getCanonicalUrl } from '@/lib/seo/urls'
import { getCdnImageUrlWithSize } from '@/lib/image-cdn'
import { appExternalAnchorProps, getAppUrl } from '@/lib/app-url'

type PageProps = {
  params: Promise<{ locale: string }>
}

// Image URLs for the angle showcase
const SHOWCASE_IMAGES = {
  hero: 'https://ik.imagekit.io/opencreator/images/image_20260207_fda1df94-0420-4bba-90b8-b29d7ededede.png',
  topDown: 'https://ik.imagekit.io/opencreator/images/bTDO9wQJkOJ0eT6cYqsdkwaWTnABKdeJ.png',
  leftToRight: 'https://ik.imagekit.io/opencreator/images/O04CK-_Q1Ejwa4eA4eumwmTqmumCtSSk.png',
  rightToLeft: 'https://ik.imagekit.io/opencreator/images/Z834ux4y4_APG8qa2mM-cp_cs57CYYgY.png',
  lowAngle: 'https://ik.imagekit.io/opencreator/images/CKClsV5CLxlouJ41SPXod24UkZgrF2hM.png',
}

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  horizontal: <RotateCw className="w-6 h-6" />,
  vertical: <ArrowUpDown className="w-6 h-6" />,
  zoom: <ZoomIn className="w-6 h-6" />,
  preview3d: <Globe className="w-6 h-6" />,
  workflow: <Workflow className="w-6 h-6" />,
  batch: <Layers className="w-6 h-6" />,
}

const USE_CASE_ICONS: Record<string, React.ReactNode> = {
  ecommerce: <ShoppingCart className="w-6 h-6" />,
  fashion: <Shirt className="w-6 h-6" />,
  marketplace: <Store className="w-6 h-6" />,
  creative: <Sparkles className="w-6 h-6" />,
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'features.imageAngleControl.seo' })
  const canonical = getCanonicalUrl('/features/image-angle-control', locale)

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
    alternates: {
      ...buildAlternatesMetadata('/features/image-angle-control', locale),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonical,
      images: [
        {
          url: getCdnImageUrlWithSize(SHOWCASE_IMAGES.hero, 1200, 630),
          width: 1200,
          height: 630,
          alt: 'AI Multi-Angle Image Generator',
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

export default async function ImageAngleControlPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = getCanonicalUrl('/features/image-angle-control', locale)

  const [t, tNavbar] = await Promise.all([
    getTranslations({ locale, namespace: 'features.imageAngleControl' }),
    getTranslations({ locale, namespace: 'landing.navbar' }),
  ])

  const faqItems = [
    { question: t('faq.items.q1.question'), answer: t('faq.items.q1.answer') },
    { question: t('faq.items.q2.question'), answer: t('faq.items.q2.answer') },
    { question: t('faq.items.q3.question'), answer: t('faq.items.q3.answer') },
    { question: t('faq.items.q4.question'), answer: t('faq.items.q4.answer') },
    { question: t('faq.items.q5.question'), answer: t('faq.items.q5.answer') },
  ]

  const schema = createSchemaGraph([
    buildWebPageSchema({
      url: pageUrl,
      name: t('seo.title'),
      description: t('seo.description'),
    }),
    buildSoftwareApplicationSchema({
      url: pageUrl,
      name: 'AI Multi-Angle Image Generator',
      description: t('seo.description'),
      applicationCategory: 'MultimediaApplication',
      offers: { price: '0', priceCurrency: 'USD' },
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: `${t('seo.title')} - FAQ`,
      faqItems,
    }),
    buildBreadcrumbSchema({
      items: [
        { name: 'Home', url: siteUrl },
        { name: 'Features', url: `${siteUrl}/features/image-angle-control` },
        { name: t('seo.title'), url: pageUrl },
      ],
    }),
  ])

  const featureKeys = ['horizontal', 'vertical', 'zoom', 'preview3d', 'workflow', 'batch'] as const
  const useCaseKeys = ['ecommerce', 'fashion', 'marketplace', 'creative'] as const

  const showcaseItems = [
    { key: 'topDown', src: SHOWCASE_IMAGES.topDown },
    { key: 'leftToRight', src: SHOWCASE_IMAGES.leftToRight },
    { key: 'rightToLeft', src: SHOWCASE_IMAGES.rightToLeft },
    { key: 'lowAngle', src: SHOWCASE_IMAGES.lowAngle },
  ] as const

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#F7F7F7]">
      <OffModalTips />
      <LandingNavbar />

      {/* ================================================================
          HERO SECTION
          ================================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F7F7F7] via-white to-[#E8F5E9]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#1fde1f]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#217EFF]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#1fde1f]/5 to-transparent rounded-full" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 pt-12 pb-16 md:pt-20 md:pb-24 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left: Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="px-4 py-1.5 rounded-full text-xs font-poller-one border-2 border-[#1fde1f] text-[#1fde1f] bg-[#1fde1f]/10 animate-pulse">
                  {t('hero.badge')}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-poller-one text-black leading-[1.1]">
                {t('hero.title')}
              </h1>

              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-xl">
                {t('hero.description')}
              </p>

              <div className="flex flex-wrap gap-6 py-4 border-y border-black/10">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-poller-one text-black">
                    {t('hero.stats.rotation.value')}
                  </p>
                  <p className="text-xs text-gray-600">{t('hero.stats.rotation.label')}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-poller-one text-black">
                    {t('hero.stats.axes.value')}
                  </p>
                  <p className="text-xs text-gray-600">{t('hero.stats.axes.label')}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={getAppUrl('/', locale)}
                  {...appExternalAnchorProps}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-black text-[#1fde1f] border-2 border-black font-poller-one text-base hover:bg-[#1fde1f] hover:text-black hover:shadow-[4px_4px_0_#000] transition-all duration-200"
                >
                  <span>{t('hero.cta')}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
                <a
                  href={getAppUrl('/', locale)}
                  {...appExternalAnchorProps}
                  className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border-2 border-black bg-white text-black font-poller-one text-base shadow-[4px_4px_0_#000] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                >
                  {t('hero.secondaryCta')}
                </a>
              </div>
            </div>

            {/* Right: Hero Image (9-grid multi-angle) */}
            <div className="relative">
              <div className="relative rounded-3xl bg-white shadow-2xl overflow-hidden border-2 border-black">
                <Image
                  src={getCdnImageUrlWithSize(SHOWCASE_IMAGES.hero, 800, 800)}
                  alt="AI multi-angle image generation - 9 perspectives from a single photo"
                  width={800}
                  height={800}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -left-4 -bottom-4 md:-left-8 md:-bottom-8 w-32 md:w-40 rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0_#000] p-3 hover:-translate-y-1 transition-transform">
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Input</p>
                <p className="text-lg font-poller-one">1</p>
                <p className="text-xs text-gray-700">photo</p>
              </div>

              <div className="absolute -right-2 -top-2 md:-right-6 md:-top-6 w-28 md:w-36 rounded-2xl border-2 border-black bg-[#1fde1f] shadow-[6px_6px_0_#000] p-3 hover:-translate-y-1 transition-transform">
                <p className="text-[10px] text-black/60 uppercase tracking-wide">Output</p>
                <p className="text-lg font-poller-one">9+</p>
                <p className="text-xs text-black/80">angles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          ANGLE SHOWCASE SECTION
          ================================================================ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-poller-one text-black mb-4">
              {t('showcase.title')}
            </h2>
            <p className="text-base md:text-lg text-gray-600">{t('showcase.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {showcaseItems.map(item => (
              <div
                key={item.key}
                className="group relative rounded-2xl overflow-hidden bg-white border-2 border-black shadow-[4px_4px_0_#000] hover:shadow-[8px_8px_0_#000] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={getCdnImageUrlWithSize(item.src, 700, 525)}
                    alt={t(`showcase.items.${item.key}.label`)}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Angle badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-sm border border-white/20">
                  <span className="text-[#1fde1f] text-xs font-mono font-bold">
                    {t(`showcase.items.${item.key}.angle`)}
                  </span>
                </div>

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <p className="text-white font-poller-one text-lg md:text-xl">
                    {t(`showcase.items.${item.key}.label`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          INTERACTIVE DEMO SECTION
          ================================================================ */}
      <section className="py-16 md:py-24 bg-[#F7F7F7]">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-5">
              <span className="px-3 py-1 rounded-full text-xs font-bold border-2 border-black bg-white">
                {t('demo.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-poller-one text-black leading-[1.1]">
                {t('demo.title')}
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {t('demo.description')}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-black text-[#1fde1f] flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                    ↻
                  </span>
                  <span className="text-sm text-gray-700">{t('demo.hints.drag')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-black text-[#1fde1f] flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                    ⇕
                  </span>
                  <span className="text-sm text-gray-700">{t('demo.hints.scroll')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-black text-[#1fde1f] flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                    ≡
                  </span>
                  <span className="text-sm text-gray-700">{t('demo.hints.sliders')}</span>
                </li>
              </ul>
            </div>
            <AngleControlDemo
              horizontalLabel={t('demo.sliders.horizontal')}
              verticalLabel={t('demo.sliders.vertical')}
              zoomLabel={t('demo.sliders.zoom')}
              resetLabel={t('demo.sliders.reset')}
              dragHint={t('demo.dragHint')}
            />
          </div>
        </div>
      </section>

      {/* ================================================================
          HOW IT WORKS SECTION
          ================================================================ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-poller-one text-black mb-4">
              {t('howItWorks.title')}
            </h2>
            <p className="text-base md:text-lg text-gray-600">{t('howItWorks.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {(['upload', 'adjust', 'generate'] as const).map((stepKey, index) => (
              <div
                key={stepKey}
                className="relative bg-white rounded-2xl border-2 border-black p-6 md:p-8 shadow-[4px_4px_0_#000] hover:shadow-[8px_8px_0_#000] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Step number */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                    <span className="text-[#1fde1f] font-poller-one text-lg">
                      {t(`howItWorks.steps.${stepKey}.step`)}
                    </span>
                  </div>
                  <h3 className="text-xl font-poller-one text-black">
                    {t(`howItWorks.steps.${stepKey}.title`)}
                  </h3>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {t(`howItWorks.steps.${stepKey}.description`)}
                </p>

                {/* Connector line (desktop only, not on last item) */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 md:-right-5 w-8 md:w-10 h-[2px] bg-black z-10">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-black" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          FEATURES SECTION
          ================================================================ */}
      <section className="py-16 md:py-24 bg-[#F7F7F7]">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-poller-one text-black mb-4">
              {t('features.title')}
            </h2>
            <p className="text-base md:text-lg text-gray-600">{t('features.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureKeys.map(key => (
              <div
                key={key}
                className="bg-[#F7F7F7] rounded-2xl border-2 border-black p-6 shadow-[4px_4px_0_#000] hover:shadow-[8px_8px_0_#000] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-black text-[#1fde1f] flex items-center justify-center mb-4">
                  {FEATURE_ICONS[key]}
                </div>
                <h3 className="text-lg font-poller-one text-black mb-2">
                  {t(`features.items.${key}.title`)}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t(`features.items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          USE CASES SECTION
          ================================================================ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-poller-one text-black mb-4">
              {t('useCases.title')}
            </h2>
            <p className="text-base md:text-lg text-gray-600">{t('useCases.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCaseKeys.map(key => (
              <div
                key={key}
                className="bg-white rounded-2xl border-2 border-black p-6 md:p-8 shadow-[4px_4px_0_#000] hover:shadow-[8px_8px_0_#000] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1fde1f]/10 text-black flex items-center justify-center flex-shrink-0">
                    {USE_CASE_ICONS[key]}
                  </div>
                  <div>
                    <h3 className="text-lg font-poller-one text-black mb-2">
                      {t(`useCases.items.${key}.title`)}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t(`useCases.items.${key}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          FAQ
          ================================================================ */}
      <LandingFAQ items={faqItems} title={t('faq.title')} />

      {/* ================================================================
          RELATED SOLUTIONS
          ================================================================ */}
      <RelatedSolutions
        title={t('relatedSolutions.title')}
        subtitle={t('relatedSolutions.subtitle')}
        ctaLabel={t('relatedSolutions.ctaLabel')}
        items={SOLUTION_ITEMS.map(item => ({
          href: item.href,
          title: tNavbar(item.titleKey),
          description: tNavbar(item.descKey),
          image: item.image,
        }))}
      />

      {/* ================================================================
          CTA + FOOTER
          ================================================================ */}
      <LandingCTA />
      <LandingFooter />
      <JsonLd id="image-angle-control" data={schema} />
    </div>
  )
}
