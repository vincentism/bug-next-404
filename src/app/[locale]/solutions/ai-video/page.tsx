import type { Metadata } from 'next'
import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Video, Wand2, Megaphone } from 'lucide-react'
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

// Hero template for CTA link
const HERO_TEMPLATE = {
  shareId: '691f2a8b6b5a',
}

// 模板类型定义
type Template = {
  slug: string
  titleKey: string
  image: string
  video?: string
}

// 按场景分类的模板数据
const SOLUTION_SECTIONS: {
  id: string
  icon: string
  templates: Template[]
}[] = [
  {
    id: 'generation',
    icon: 'video',
    templates: [
      {
        slug: 'template-image-to-video',
        titleKey: 'imageToVideo',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Image to Video.png',
      },
      {
        slug: 'template-motion-transfer',
        titleKey: 'motionTransfer',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0211/Screenshot 2026-02-11 011630.png',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0211/3CQLhoBDoq8DGaYrOC3GsEKhU1aUzxXK.mp4',
      },
      {
        slug: 'template-ai-script-to-video-maker',
        titleKey: 'textToVideo',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Script to Film.png',
        video: 'https://ik.imagekit.io/opencreator/web/landing/videos/script-to-film-1.mp4',
      },
      {
        slug: 'template-ai-animation-generator',
        titleKey: 'aiAnimationGenerator',
        image: 'https://ik.imagekit.io/opencreator/web/landing/ai-animation-generator/images/1.png',
      },
      {
        slug: 'template-sketch-to-film',
        titleKey: 'sketchToFilm',
        image: 'https://ik.imagekit.io/opencreator/web/landing/sketch-to-film/input/input-1.png',
      },
      {
        slug: 'template-json-to-video',
        titleKey: 'jsonToVideo',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/JSON to Video.png',
      },
      {
        slug: 'template-ai-movie-trailer-maker',
        titleKey: 'aiMovieTrailerMaker',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/AI Movie Trailer Maker.png',
        video: 'https://ik.imagekit.io/opencreator/web/landing/ai-movie-trailer-maker/videos/1.mp4',
      },
      {
        slug: 'template-ai-music-video-generator',
        titleKey: 'aiMusicVideoGenerator',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/AI Music Video Generator.png',
        video: 'https://ik.imagekit.io/opencreator/web/landing/ai-music-video-generator/videos/1.mp4',
      },
      {
        slug: 'template-everything-turns-into-robots',
        titleKey: 'everythingTurnsIntoRobots',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0110/投流的原理与应用.jpg',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0110/7b21dbe7880b7bc3409e2cb1e19c958f.mp4',
      },
    ],
  },
  {
    id: 'effects',
    icon: 'wand',
    templates: [
      {
        slug: 'template-lip-sync',
        titleKey: 'lipSync',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Lip Sync.png',
      },
      {
        slug: 'template-background-vfx',
        titleKey: 'backgroundVfx',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Background VFX.png',
      },
      {
        slug: 'template-visual-effects',
        titleKey: 'visualEffects',
        image: 'https://ik.imagekit.io/opencreator/web/landing/visual-effects/input/input-1.png',
      },
      {
        slug: 'template-video-edit',
        titleKey: 'videoEdit',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Video Edit.png',
      },
      {
        slug: 'template-background-music',
        titleKey: 'backgroundMusic',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Background Music.png',
      },
    ],
  },
  {
    id: 'content',
    icon: 'megaphone',
    templates: [
      {
        slug: 'template-sora-2-x-ads',
        titleKey: 'sora2xAds',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Sora 2 x Ads.png',
      },
      {
        slug: 'template-veo-3-1-ads',
        titleKey: 'veo31Ads',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/VEO 3.1 x Ads.png',
      },
      {
        slug: 'template-asmr-promo',
        titleKey: 'asmrPromo',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/ASMR Promo.png',
      },
      {
        slug: 'template-ugc-unboxing-video',
        titleKey: 'ugcUnboxingVideo',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/ugc-unbox-2.png',
      },
      {
        slug: 'template-ugc-promo-video-lipsync-version',
        titleKey: 'ugcPromoVideoLipsync',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Video (Lipsync Version).png',
      },
      {
        slug: 'template-crunchy-mukbang-asmr',
        titleKey: 'crunchyMukbangAsmr',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Crunchy Mukbang ASMR.png',
      },
      {
        slug: 'template-cutting-fruit-asmr',
        titleKey: 'cuttingFruitAsmr',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Cutting Fruit ASMR.png',
      },
      {
        slug: 'template-food-slime-asmr',
        titleKey: 'foodSlimeAsmr',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Food Slime ASMR.png',
      },
      {
        slug: 'template-kitten-x-slime-asmr',
        titleKey: 'kittenSlimeAsmr',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Kitten x Slime ASMR.png',
      },
      {
        slug: 'template-special-material-asmr',
        titleKey: 'specialMaterialAsmr',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Special Material ASMR.png',
      },
      {
        slug: 'template-food-product-asmr',
        titleKey: 'foodProductAsmr',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Food Product ASMR.png',
      },
      {
        slug: 'template-sora-2-x-idols',
        titleKey: 'sora2xIdols',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Sora 2 x Idols.png',
      },
      {
        slug: 'template-veo-3-1-playground',
        titleKey: 'veo31Playground',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/VEO 3.1 x Playground.png',
        video: 'https://ik.imagekit.io/opencreator/web/xm/1120-home-page-hovers/1 (21).mp4',
      },
      {
        slug: 'template-nine-grid-shot-breakdown',
        titleKey: 'nineGridShotBreakdown',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1214/Templates Covers.png',
      },
      {
        slug: 'template-storyboard-generation',
        titleKey: 'storyboardGeneration',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1216/OpenCreator_image_1765592123594 (1).jpg',
      },
      {
        slug: 'template-multi-camera-storyboards',
        titleKey: 'multiCameraStoryboards',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1216/OpenCreator_image_1765592123594 (2).jpg',
      },
      {
        slug: 'template-commercial-ad-production',
        titleKey: 'commercialAdProduction',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1222/12月22日.png',
        video: 'https://ik.imagekit.io/opencreator/web/xm/1222/12月22日.mp4',
      },
      {
        slug: 'template-12-shot-storyboard',
        titleKey: '12ShotStoryboard',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1224/封面.png',
        video: 'https://ik.imagekit.io/opencreator/web/xm/1224/视频.mp4',
      },
      {
        slug: 'template-dynamic-poster-creation',
        titleKey: 'dynamicPosterCreation',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1224/result-DgOyIYM7TbN7wyRYvY2qUL6XKPYw3bEO.png',
        video:
          'https://ik.imagekit.io/opencreator/web/xm/1224/result-reaui8EOUHE_9d1dpuzrXurcN2cSNbPi.mp4',
      },
      {
        slug: 'template-high-converting-ugc-ads',
        titleKey: 'highConvertingUgcAds',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1229_Yujun/Screenshot 2025-12-29 at 11.44.11 AM.png',
        video:
          'https://ik.imagekit.io/opencreator/web/xm/1229_Yujun/video_-bfrQPLxJ1yMTCbcRYONqch8KHY9GlTd.mp4',
      },
      {
        slug: 'template-ads-remake',
        titleKey: 'adsRemake',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/0108Yujun/Screenshot 2026-01-08 at 10.04.38 PM.png',
        video:
          'https://ik.imagekit.io/opencreator/web/xm/0108Yujun/Uk1dZNSZtB7zIv0lTdvqDrMdrsl89GzY.mp4',
      },
      {
        slug: 'template-french-retro-style-promotional-video',
        titleKey: 'frenchRetroStylePromotionalVideo',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0113/1月13日.png',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0113/OpenCreator_video_1767550403462.mp4',
      },
      {
        slug: 'template-pet-seal-dance',
        titleKey: 'petSealDance',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0114/封面图.png',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0114/小红书.mp4',
      },
      {
        slug: 'template-pets-x-bridal-sedan-chair-dance',
        titleKey: 'petsXBridalSedanChairDance',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0114/1月14日 (2).png',
        video: 'https://ik.imagekit.io/opencreator/uploads/lS7-wK7Kyq.mp4',
      },
      {
        slug: 'template-ai-influencer-hyper-real-lifestyle-studio',
        titleKey: 'aiInfluencerHyperRealLifestyleStudio',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/0115/pasted-image-2026-01-14T16-50-23-381Z.png',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0115/train background.mp4',
      },
      {
        slug: 'template-virtual-human-sings',
        titleKey: 'virtualHumanSings',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0122/图片.png',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0122/2.mp4',
      },
      {
        slug: 'template-apparel-ai-promotional-video',
        titleKey: 'apparelAiPromotionalVideo',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0123/897bebdd-cdc9-466d-a2c1-ee687656.jpg',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0123/1月23日(1).mov',
      },
      {
        slug: 'template-automotive-advertising-storyboard',
        titleKey: 'automotiveAdvertisingStoryboard',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0129/1月29日 (1).png',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0129/1月29日 (1)(1).mp4',
      },
      {
        slug: 'template-concept-racing-car-video',
        titleKey: 'conceptRacingCarVideo',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0129/Quia1oGZjK.jpg',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0129/7cdf5f366c07699085e54cdf74a48b24.mp4',
      },
      {
        slug: 'template-clothing-promotion-short-film',
        titleKey: 'clothingPromotionShortFilm',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0129/微信图片_20260129143856_73_329.jpg',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0129/d277f4384d472e3d660f79da7426249d.mp4',
      },
      {
        slug: 'template-one-click-commercial-product-ads',
        titleKey: 'oneClickCommercialProductAds',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0129/运动鞋产品图竖版3比4.jpg',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0129/1月29日.mp4',
      },
      {
        slug: 'template-ai-handbag-promo-video',
        titleKey: 'aiHandbagPromoVideo',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/0203/image_20260203_71dcc5a9-e746-45ec-b2ed-070e823592ee (1).png',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0203/d9deee6707a69ae50ee6d1ae58fd1470.mp4',
      },
      {
        slug: 'template-connect-film',
        titleKey: 'connectFilm',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0201/2月1日 (1).png',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0201/2月1日 (1).mp4',
      },
      {
        slug: 'template-pure-sweet-girly-mv',
        titleKey: 'pureSweetGirlyMv',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0201/2月1日 (2).png',
      },
    ],
  },
]

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'solutions.aiVideo.seo' })
  const canonical = getCanonicalUrl('/solutions/ai-video', locale)

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
    alternates: {
      ...buildAlternatesMetadata('/solutions/ai-video', locale),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonical,
    },
  }
}

export default async function AIVideoPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = getCanonicalUrl('/solutions/ai-video', locale)

  const [t, tNavbar] = await Promise.all([
    getTranslations({ locale, namespace: 'solutions.aiVideo' }),
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
      name: 'AI Video Generator',
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F7F7F7] via-white to-[#E7F0FF]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#1fde1f]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#6366F1]/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 pt-12 pb-16 md:pt-20 md:pb-24 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="px-4 py-1.5 rounded-full text-xs font-poller-one border-2 border-[#6366F1] text-[#6366F1] bg-[#6366F1]/10 animate-pulse">
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
              <div className="relative aspect-[3/4] max-w-lg mx-auto">
                <Image
                  src={getCdnImageUrlWithSize(
                    'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Image to Video.png',
                    600,
                    800
                  )}
                  alt="AI Video Generator"
                  fill
                  className="object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#6366F1]/20 flex items-center justify-center">
                      <Video className="w-5 h-5 text-[#6366F1]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Video Ready</p>
                      <p className="text-xs text-gray-500">Export in 4K</p>
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
              const sectionKey = section.id as 'generation' | 'effects' | 'content'
              return (
                <div key={section.id} className="space-y-6">
                  {/* Section Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                      {section.icon === 'video' && <Video className="w-6 h-6 text-gray-600" />}
                      {section.icon === 'wand' && <Wand2 className="w-6 h-6 text-gray-600" />}
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
                                src={template.video}
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
            key: 'creators',
            title: t('audiences.items.creators.title'),
            description: t('audiences.items.creators.description'),
            roles: t('audiences.items.creators.roles'),
          },
          {
            key: 'marketers',
            title: t('audiences.items.marketers.title'),
            description: t('audiences.items.marketers.description'),
            roles: t('audiences.items.marketers.roles'),
          },
          {
            key: 'filmmakers',
            title: t('audiences.items.filmmakers.title'),
            description: t('audiences.items.filmmakers.description'),
            roles: t('audiences.items.filmmakers.roles'),
          },
        ]}
      />

      <LandingFAQ items={faqItems} title={t('faq.title')} />

      {/* Related Solutions */}
      <RelatedSolutions
        title={t('relatedSolutions.title')}
        subtitle={t('relatedSolutions.subtitle')}
        ctaLabel={t('relatedSolutions.ctaLabel')}
        items={SOLUTION_ITEMS.filter(item => item.href !== '/solutions/ai-video').map(item => ({
          href: item.href,
          title: tNavbar(item.titleKey),
          description: tNavbar(item.descKey),
          image: item.image,
        }))}
      />

      <LandingCTA />
      <LandingFooter />
      <JsonLd id="ai-video-solution" data={schema} />
    </div>
  )
}
