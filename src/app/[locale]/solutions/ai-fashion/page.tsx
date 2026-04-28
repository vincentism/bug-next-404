import type { Metadata } from 'next'
import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Shirt, Users, Sparkles } from 'lucide-react'
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

// 按场景分类的模板数据 - 使用真实的模板数据
const SOLUTION_SECTIONS = [
  {
    id: 'tryon',
    icon: 'shirt',
    accentColor: 'bg-pink-100',
    iconColor: 'text-theme-pink',
    templates: [
      {
        slug: 'template-virtual-try-on',
        titleKey: 'virtualTryOn',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Virtual Try-on.png',
      },
      {
        slug: 'template-batch-ai-model-try-on',
        titleKey: 'batchAiModelTryOn',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/Batch AI Model Try-On.png',
      },
      {
        slug: 'template-360-outfit-display',
        titleKey: '360OutfitDisplay',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/360° Outfit Display.png',
      },
      {
        slug: 'template-all-things-wearable',
        titleKey: 'allThingsWearable',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1203-templates/All things wearable.png',
      },
      {
        slug: 'template-pet-model-try-on',
        titleKey: 'petModelTryOn',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/Pet Model Try-on.png',
      },
      {
        slug: 'template-haute-adornment-studio',
        titleKey: 'hauteAdornmentStudio',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/haute.png',
      },
      {
        slug: 'template-headwear-styling',
        titleKey: 'headwearStyling',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/0122/image_20260115_47ed6dc1-e7db-4e6 (1).jpg',
      },
    ],
  },
  {
    id: 'lookbook',
    icon: 'users',
    accentColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    templates: [
      {
        slug: 'template-fashion-lookbook-mockup',
        titleKey: 'fashionLookbookMockup',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/Fashion Lookbook Mockup.png',
      },
      {
        slug: 'template-fashion-model-staging',
        titleKey: 'fashionModelStaging',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1203-templates/Fashion Model Staging.png',
      },
      {
        slug: 'template-outfit-breakdown-poster',
        titleKey: 'outfitBreakdownPoster',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/Outfit Breakdown Poster.png',
      },
      {
        slug: 'template-model-poses-ideation',
        titleKey: 'modelPosesIdeation',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Model Poses Ideation.png',
      },
    ],
  },
  {
    id: 'promo',
    icon: 'sparkles',
    accentColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
    templates: [
      {
        slug: 'template-streetwear-ugc-promo',
        titleKey: 'streetwearUgcPromo',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Streetwear UGC Promo.png',
      },
      {
        slug: 'template-sportswear-on-model-ad',
        titleKey: 'sportswearOnModelAd',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Sportswear On-Model Ad.png',
      },
      {
        slug: 'template-ai-fashion-outdoor-shorts',
        titleKey: 'aiFashionOutdoorShorts',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1207-templates/Outdoor Fashion.png',
      },
      {
        slug: 'template-sora-2-x-ugc-promo',
        titleKey: 'sora2UgcPromo',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Sora 2 x UGC Promo.png',
      },
      {
        slug: 'template-live-model-ai-environment-integration',
        titleKey: 'liveModelAiEnvironment',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1130-template/Templates Covers (1).png',
      },
      {
        slug: 'template-texture-projection-home-textiles',
        titleKey: 'textureProjectionHomeTextiles',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/Texture Projection (Home Textiles).png',
      },
      {
        slug: 'template-product-to-background-bags-shoes',
        titleKey: 'productToBackgroundBagsShoes',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1203-templates/Product to Background (Bags & Shoes).png',
      },
      {
        slug: 'template-product-to-background-outdoor-gear',
        titleKey: 'productToBackgroundOutdoorGear',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/Product to Background (Outdoor Gear).png',
      },
      {
        slug: 'template-editorial-photography',
        titleKey: 'editorialPhotography',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Editorial Photography.png',
      },
      {
        slug: 'template-christmas-fashion-storyboards',
        titleKey: 'christmasFashionStoryboards',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1217/Templates Covers (1).png',
      },
      {
        slug: 'template-christmas-fashion-editorial',
        titleKey: 'christmasFashionEditorial',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1223/未命名(3)(4).jpg',
      },
      {
        slug: 'template-fabric-to-model-catwalk',
        titleKey: 'fabricToModelCatwalk',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1229/result-f3JcdYRtygAPhgpAjKxsSth1h.jpg',
        video: 'https://ik.imagekit.io/opencreator/web/xm/1229/il0hClmHmw3ni22GL1JcnADW-qCpngWX.mp4',
      },
      {
        slug: 'template-aigc-fashion-photography',
        titleKey: 'aigcFashionPhotography',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0104/b8bf31beccdf10a9323c7e52ef6f2f2a.png',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0104/41cfe00d957cbb84a48aac4275d8d1a4.mp4',
      },
      {
        slug: 'template-accessories-model-reproduction',
        titleKey: 'accessoriesModelReproduction',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/0107/result-VmiGPzOJcyNBi0xBUbAyZ8jYu_4Yf8Qw.png',
      },
      {
        slug: 'template-brand-fashion-editorial',
        titleKey: 'brandFashionEditorial',
        image: 'https://ik.imagekit.io/opencreator/ylg/4ba4c06880068cf05148f561168ad2ca.jpg',
        video: 'https://ik.imagekit.io/opencreator/ylg/d1fcc6faac2942ba6c8e31c75594bf2c_raw.mp4',
      },
      {
        slug: 'template-tiktok-fashion-haul',
        titleKey: 'tiktokFashionHaul',
        image: 'https://ik.imagekit.io/opencreator/ylg/d4b05112644504a61e6f6ec56411a020.png',
        video: 'https://ik.imagekit.io/opencreator/ylg/e7f1f9ad502b383c462b0bb1ca059f6a_raw.mp4',
      },
      {
        slug: 'template-fashion-accessories-display',
        titleKey: 'fashionAccessoriesDisplay',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0115/图片2.jpg',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0115/视频.mp4',
      },
      {
        slug: 'template-apparel-ai-promotional-video',
        titleKey: 'apparelAiPromotionalVideo',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0123/897bebdd-cdc9-466d-a2c1-ee687656.jpg',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0123/1月23日(1).mov',
      },
      {
        slug: 'template-ecommerce-fashion-model',
        titleKey: 'ecommerceFashionModel',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0126/微信图片_20260126202904_134_1275.jpg',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0126/7585cad3afbbceef035b7a70385cf674.mp4',
      },
      {
        slug: 'template-clothing-promotion-short-film',
        titleKey: 'clothingPromotionShortFilm',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0129/微信图片_20260129143856_73_329.jpg',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0129/d277f4384d472e3d660f79da7426249d.mp4',
      },
    ],
  },
]

// Hero 区域使用的代表性模板
const HERO_TEMPLATE = {
  slug: 'template-virtual-try-on',
  shareId: '691f244dde65',
  heroImage: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Virtual Try-on.png',
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'solutions.aiFashion.seo' })
  const canonical = getCanonicalUrl('/solutions/ai-fashion', locale)

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
    alternates: {
      ...buildAlternatesMetadata('/solutions/ai-fashion', locale),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonical,
    },
  }
}

export default async function AIFashionSolutionPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = getCanonicalUrl('/solutions/ai-fashion', locale)

  const [t, tNavbar] = await Promise.all([
    getTranslations({ locale, namespace: 'solutions.aiFashion' }),
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
      name: 'AI Fashion & Virtual Try-On Generator',
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F7F7F7] via-white to-[#FFF8E7]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#1fde1f]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-theme-pink/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#217EFF]/5 to-transparent rounded-full" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 pt-12 pb-16 md:pt-20 md:pb-24 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
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
                    {t('hero.stats.models.value')}
                  </p>
                  <p className="text-xs text-gray-600">{t('hero.stats.models.label')}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-poller-one text-black">
                    {t('hero.stats.cost.value')}
                  </p>
                  <p className="text-xs text-gray-600">{t('hero.stats.cost.label')}</p>
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

            <div className="relative">
              <div className="relative rounded-3xl bg-white shadow-2xl overflow-hidden aspect-square">
                <Image
                  src={getCdnImageUrlWithSize(encodeURI(HERO_TEMPLATE.heroImage), 800, 800)}
                  alt="AI fashion virtual try-on solution showcase"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="absolute -left-4 -bottom-4 md:-left-8 md:-bottom-8 w-32 md:w-40 rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0_#000] p-3 hover:-translate-y-1 transition-transform">
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                  No models needed
                </p>
                <p className="text-lg font-poller-one">AI</p>
                <p className="text-xs text-gray-700">generated models</p>
              </div>

              <div className="absolute -right-2 -top-2 md:-right-6 md:-top-6 w-28 md:w-36 rounded-2xl border-2 border-black bg-[#1fde1f] shadow-[6px_6px_0_#000] p-3 hover:-translate-y-1 transition-transform">
                <p className="text-[10px] text-black/60 uppercase tracking-wide">Save</p>
                <p className="text-lg font-poller-one">90%</p>
                <p className="text-xs text-black/80">vs photoshoots</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Sections */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-poller-one text-black mb-4">
              {t('oneSolution.title')}
            </h2>
            <p className="text-base md:text-lg text-gray-600">{t('oneSolution.description')}</p>
          </div>

          <div className="space-y-16">
            {SOLUTION_SECTIONS.map(section => {
              const sectionKey = section.id as 'tryon' | 'lookbook' | 'promo'
              return (
                <div key={section.id} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                      {section.icon === 'shirt' && <Shirt className="w-6 h-6 text-gray-600" />}
                      {section.icon === 'users' && <Users className="w-6 h-6 text-gray-600" />}
                      {section.icon === 'sparkles' && (
                        <Sparkles className="w-6 h-6 text-gray-600" />
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
                                src={getCdnImageUrlWithSize(encodeURI(template.image), 300, 400)}
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
            key: 'brands',
            title: t('audiences.items.brands.title'),
            description: t('audiences.items.brands.description'),
            roles: t('audiences.items.brands.roles'),
          },
          {
            key: 'sellers',
            title: t('audiences.items.sellers.title'),
            description: t('audiences.items.sellers.description'),
            roles: t('audiences.items.sellers.roles'),
          },
          {
            key: 'creators',
            title: t('audiences.items.creators.title'),
            description: t('audiences.items.creators.description'),
            roles: t('audiences.items.creators.roles'),
          },
        ]}
      />

      <LandingFAQ items={faqItems} title={t('faq.title')} />

      {/* Related Solutions */}
      <RelatedSolutions
        title={t('relatedSolutions.title')}
        subtitle={t('relatedSolutions.subtitle')}
        ctaLabel={t('relatedSolutions.ctaLabel')}
        items={SOLUTION_ITEMS.filter(item => item.href !== '/solutions/ai-fashion').map(item => ({
          href: item.href,
          title: tNavbar(item.titleKey),
          description: tNavbar(item.descKey),
          image: item.image,
        }))}
      />

      <LandingCTA />
      <LandingFooter />
      <JsonLd id="ai-fashion-solution" data={schema} />
    </div>
  )
}
