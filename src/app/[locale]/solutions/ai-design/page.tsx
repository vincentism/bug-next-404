import type { Metadata } from 'next'
import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ImageIcon, Box, Megaphone } from 'lucide-react'
import { getTranslations } from '@/i18n/get-translations'
import OffModalTips from '@/components/dialog/off_modal_tips'
import {
  LandingNavbar,
  LandingCTA,
  LandingFooter,
  LandingFAQ,
  RelatedSolutions,
} from '@/components/landing'
import { AutoPlayVideo } from '@/components/landing/auto-play-video'
import { SOLUTION_ITEMS } from '@/components/landing/solution-items'
import { SolutionAudiences } from '@/components/landing/solution-audiences'
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

type Template = {
  slug: string
  titleKey: string
  image: string
  video?: string
}

// Hero template for CTA link
const HERO_TEMPLATE = {
  shareId: '691f2b1c8e3d',
}

// 按场景分类的模板数据
const SOLUTION_SECTIONS: {
  id: string
  icon: string
  templates: Template[]
}[] = [
  {
    id: 'imageEditing',
    icon: 'image',
    templates: [
      {
        slug: 'template-image-upscale',
        titleKey: 'imageUpscale',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Image Upscale.png',
      },
      {
        slug: 'template-background-remove-edit',
        titleKey: 'backgroundRemoveEdit',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Background Remove & Edit.png',
      },
      {
        slug: 'template-style-transfer-banana-pro',
        titleKey: 'styleTransferBananaPro',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1203-templates/Style Transfer (Banana Pro).png',
      },
      {
        slug: 'template-text-to-image',
        titleKey: 'textToImage',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Text to Image.png',
      },
      {
        slug: 'template-angle-control',
        titleKey: 'angleControl',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0211/官号封面（2026） (1).png',
      },
      {
        slug: 'template-draw-to-edit',
        titleKey: 'drawToEdit',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Draw to Edit.png',
      },
      {
        slug: 'template-ai-image-combiner',
        titleKey: 'aiImageCombiner',
        image: 'https://ik.imagekit.io/opencreator/web/landing/ai-image-combiner/input/input-1.jpg',
      },
      {
        slug: 'template-subject-consistency',
        titleKey: 'subjectConsistency',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Subject Consistency.png',
      },
      {
        slug: 'template-style-consistency',
        titleKey: 'styleConsistency',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Style Consistency.png',
      },
      {
        slug: 'template-subject-re-light',
        titleKey: 'subjectReLight',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Subject Re-light.png',
      },
      {
        slug: 'template-multi-references',
        titleKey: 'multiReferences',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Multi References.png',
      },
      {
        slug: 'template-mega-multi-reference-builder',
        titleKey: 'megaMultiReferenceBuilder',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1121-templates-covers/Mega Multi Reference Builder.png',
      },
    ],
  },
  {
    id: 'threeD',
    icon: 'box',
    templates: [
      {
        slug: 'template-3d-character-render',
        titleKey: '3dCharacterRender',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/3D Character Render.png',
      },
      {
        slug: 'template-interior-design',
        titleKey: 'interiorDesign',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1121-templates-covers/Interior Design.png',
      },
      {
        slug: 'template-brand-identity',
        titleKey: 'brandIdentity',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1121-templates-covers/Brand Identity.png',
      },
      {
        slug: 'template-blueprint-to-render',
        titleKey: 'blueprintToRender',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/Blueprint to Render.png',
      },
      {
        slug: 'template-character-model-sheet',
        titleKey: 'characterModelSheet',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1203-templates/Character Model Sheet.png',
      },
      {
        slug: 'template-3d-cartoon-ui-card-layout',
        titleKey: '3dCartoonUiCardLayout',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0108/未命名(27).jpg',
      },
    ],
  },
  {
    id: 'marketing',
    icon: 'megaphone',
    templates: [
      {
        slug: 'template-athletic-ad',
        titleKey: 'athleticAd',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Athletic Ad.png',
      },
      {
        slug: 'template-ai-thumbnail-maker',
        titleKey: 'aiThumbnailMaker',
        image: 'https://ik.imagekit.io/opencreator/web/landing/ai-thumbnail-maker/images/1.jpg',
      },
      {
        slug: 'template-ai-movie-poster-generator',
        titleKey: 'aiMoviePosterGenerator',
        image: 'https://ik.imagekit.io/opencreator/web/landing/ai-movie-poster-generator/images/1.jpg',
      },
      {
        slug: 'template-3c-brand-poster',
        titleKey: '3cBrandPoster',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/3C Brand Poster.png',
      },
      {
        slug: 'template-black-friday-poster',
        titleKey: 'blackFridayPoster',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Black Friday Poster.png',
      },
      {
        slug: 'template-christmas-sales-poster',
        titleKey: 'christmasSalesPoster',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Christmas Sales Poster.png',
      },
      {
        slug: 'template-christmas-x-fisheye-effect-poster',
        titleKey: 'christmasFisheyePoster',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/Christmas x Fisheye Effect Poster.png',
      },
      {
        slug: 'template-brand-logo-x-material',
        titleKey: 'brandLogoMaterial',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Brand logo x Material.png',
      },
      {
        slug: 'template-branding-visual-style-extractor',
        titleKey: 'brandingVisualStyleExtractor',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1203-templates/Branding Visual Style Extractor 品牌视觉设计衍生器.png',
      },
      {
        slug: 'template-ai-album-cover-generator',
        titleKey: 'aiAlbumCoverGenerator',
        image: 'https://ik.imagekit.io/opencreator/web/landing/ai-album-cover-generator/images/1.png',
      },
      {
        slug: 'template-ai-text-effect-generator',
        titleKey: 'aiTextEffectGenerator',
        image: 'https://ik.imagekit.io/opencreator/web/landing/ai-text-effect-generator/images/1.png',
      },
      {
        slug: 'template-instruction-flowchart-maker',
        titleKey: 'instructionFlowchartMaker',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1203-templates/Instruction Flowchart Maker.png',
      },
      {
        slug: 'template-food-flowchart-poster',
        titleKey: 'foodFlowchartPoster',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1203-templates/Food Poster Auto-Generation.png',
      },
      {
        slug: 'template-polaroid-art-collage',
        titleKey: 'polaroidArtCollage',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/Polaroid Art Collage.png',
      },
      {
        slug: 'template-meta-poster-ad',
        titleKey: 'metaPosterAd',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/Meta Poster Ad.png',
      },
      {
        slug: 'template-one-click-story-board',
        titleKey: 'oneClickStoryBoard',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/One-click Story Board.png',
      },
      {
        slug: 'template-storyboard-builder',
        titleKey: 'storyboardBuilder',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Storyboard Builder.png',
      },
      {
        slug: 'template-rednote-viral-post-factory',
        titleKey: 'rednoteViralPostFactory',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1216/UGC Promo Video (Lipsync Version).png',
      },
      {
        slug: 'template-rednote-auto-image-text-generator',
        titleKey: 'rednoteAutoImageTextGenerator',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0129/2.jpg',
      },
      {
        slug: 'template-mini-figure-world',
        titleKey: 'miniFigureWorld',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1217/Christmas Sales Poster.png',
      },
      {
        slug: 'template-three-panel-brand-creative-poster',
        titleKey: 'threePanelBrandCreativePoster',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1223/OpenCreator_图生图_1766496552767.png',
      },
      {
        slug: 'template-dreamy-glass-material',
        titleKey: 'dreamyGlassMaterial',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0201/未命名(2)(12).jpg',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0201/1.mp4',
      },
    ],
  },
]

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'solutions.aiDesign.seo' })
  const canonical = getCanonicalUrl('/solutions/ai-design', locale)

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
    alternates: {
      ...buildAlternatesMetadata('/solutions/ai-design', locale),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonical,
    },
  }
}

export default async function AIDesignPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = getCanonicalUrl('/solutions/ai-design', locale)

  const [t, tNavbar] = await Promise.all([
    getTranslations({ locale, namespace: 'solutions.aiDesign' }),
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
      name: 'AI Design Tools',
      description: t('seo.description'),
      applicationCategory: 'DesignApplication',
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
        { name: 'Solutions', url: `${siteUrl}/solutions/ecommerce-product-images` },
        { name: t('seo.title'), url: pageUrl },
      ],
    }),
  ])

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#F7F7F7]">
      <OffModalTips />
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F7F7F7] via-white to-[#FFF0F5]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#1fde1f]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#EC4899]/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 pt-12 pb-16 md:pt-20 md:pb-24 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="px-4 py-1.5 rounded-full text-xs font-poller-one border-2 border-[#EC4899] text-[#EC4899] bg-[#EC4899]/10 animate-pulse">
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
                    {t('hero.stats.tools.value')}
                  </p>
                  <p className="text-xs text-gray-600">{t('hero.stats.tools.label')}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-poller-one text-black">
                    {t('hero.stats.time.value')}
                  </p>
                  <p className="text-xs text-gray-600">{t('hero.stats.time.label')}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={getAppUrl(`/canvas?shareid=${HERO_TEMPLATE.shareId}`, locale)}
                  {...appExternalAnchorProps}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-black text-[#1fde1f] border-2 border-black font-poller-one text-base hover:bg-[#1fde1f] hover:text-black hover:shadow-[4px_4px_0_#000] transition-all duration-200"
                >
                  <span>{t('hero.cta')}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
                <a
                  href={getAppUrl('/', locale)}
                  {...appExternalAnchorProps}
                  className="inline-flex items-center justify-center px-6 py-4 rounded-2xl border-2 border-black text-sm bg-white hover:bg-black hover:text-white transition-all duration-200"
                >
                  {t('hero.secondaryCta')}
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-square max-w-lg mx-auto">
                <Image
                  src={getCdnImageUrlWithSize(
                    'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Image Upscale.png',
                    600,
                    600
                  )}
                  alt="AI Design Tools"
                  fill
                  className="object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EC4899]/20 flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-[#EC4899]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Design Ready</p>
                      <p className="text-xs text-gray-500">Export anywhere</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* One Solution Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-poller-one text-black mb-4">
              {t('oneSolution.title')}
            </h2>
            <p className="text-base text-gray-600">{t('oneSolution.description')}</p>
          </div>

          <div className="space-y-16">
            {SOLUTION_SECTIONS.map(section => {
              const sectionKey = section.id as 'imageEditing' | 'threeD' | 'marketing'
              return (
                <div key={section.id} className="space-y-6">
                  {/* Section Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                      {section.icon === 'image' && <ImageIcon className="w-6 h-6 text-gray-600" />}
                      {section.icon === 'box' && <Box className="w-6 h-6 text-gray-600" />}
                      {section.icon === 'megaphone' && (
                        <Megaphone className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-poller-one text-black">
                        {t(`oneSolution.sections.${sectionKey}.title`)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {t(`oneSolution.sections.${sectionKey}.subtitle`)}
                      </p>
                    </div>
                  </div>

                  {/* Templates Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {section.templates.map(template => (
                      <Link
                        key={template.slug}
                        href={`/${template.slug}`}
                        prefetch={false}
                        className="group"
                      >
                        <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                          <div className="aspect-[3/4] relative">
                            {template.video ? (
                              <AutoPlayVideo
                                src={encodeURI(template.video)}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <Image
                                src={getCdnImageUrlWithSize(template.image, 300, 400)}
                                alt={t(`oneSolution.templates.${template.titleKey}`)}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 50vw, 25vw"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                              <p className="text-white font-medium text-sm md:text-base group-hover:text-[#1fde1f] transition-colors line-clamp-2">
                                {t(`oneSolution.templates.${template.titleKey}`)}
                              </p>
                              <p className="text-white/60 text-xs mt-1 flex items-center gap-1">
                                {t('oneSolution.explore')}
                                <span className="group-hover:translate-x-1 transition-transform">
                                  →
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <SolutionAudiences
        badge={t('audiences.badge')}
        title={t('audiences.title')}
        description={t('audiences.description')}
        items={[
          {
            key: 'designers',
            title: t('audiences.items.designers.title'),
            description: t('audiences.items.designers.description'),
            roles: t('audiences.items.designers.roles'),
          },
          {
            key: 'marketers',
            title: t('audiences.items.marketers.title'),
            description: t('audiences.items.marketers.description'),
            roles: t('audiences.items.marketers.roles'),
          },
          {
            key: 'entrepreneurs',
            title: t('audiences.items.entrepreneurs.title'),
            description: t('audiences.items.entrepreneurs.description'),
            roles: t('audiences.items.entrepreneurs.roles'),
          },
        ]}
      />

      <LandingFAQ items={faqItems} title={t('faq.title')} />

      {/* Related Solutions */}
      <RelatedSolutions
        title={t('relatedSolutions.title')}
        subtitle={t('relatedSolutions.subtitle')}
        ctaLabel={t('relatedSolutions.ctaLabel')}
        items={SOLUTION_ITEMS.filter(item => item.href !== '/solutions/ai-design').map(item => ({
          href: item.href,
          title: tNavbar(item.titleKey),
          description: tNavbar(item.descKey),
          image: item.image,
        }))}
      />

      <LandingCTA />
      <LandingFooter />
      <JsonLd id="ai-design-solution" data={schema} />
    </div>
  )
}
