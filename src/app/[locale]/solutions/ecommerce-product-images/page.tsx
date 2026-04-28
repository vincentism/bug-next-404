import type { Metadata } from 'next'
import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ImageIcon, ShoppingCart, Smartphone } from 'lucide-react'
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

/**
 * 图片占位说明（供设计参考）
 * ========================================
 * 1. HERO_IMAGE (hero-ecommerce-solution.png)
 *    - 尺寸: 800x800px (1:1)
 *    - 内容: 电商产品图整体效果拼贴，展示多个产品、多角度、白底图和场景图的组合
 *    - 风格: 现代、干净、专业感，可以是 3D 风格的产品堆叠或网格展示
 *
 * 2. WORKFLOW_STEP_IMAGES (3张) - 用于 "How it works" 模块
 *    - step-1-system.png: 600x800px (3:4) - 展示图片系统/模板选择界面
 *    - step-2-batch.png: 600x800px (3:4) - 展示批量处理/上传界面
 *    - step-3-evolve.png: 600x800px (3:4) - 展示季节性/渠道变体
 *
 * 3. TEMPLATE_IMAGES - 模板卡片图片比例为 3:4
 */

// 按场景分类的模板数据
const SOLUTION_SECTIONS = [
  {
    id: 'pdp',
    title: 'Product Detail Pages',
    subtitle: 'Clear, informative galleries',
    description:
      'Hero shots, multi-angle views, and lifestyle images that answer "how does this fit my life?"',
    icon: 'image',
    gradient: 'from-amber-50 to-orange-50',
    accentColor: 'bg-amber-100',
    iconColor: 'text-amber-600',
    features: [
      'Hero shots that match your brand system',
      'Multi-angle and zoomable views for key SKUs',
      'Lifestyle images that show product in context',
    ],
    templates: [
      {
        slug: 'template-multi-angle-product-image-set',
        title: 'Multi-angle Product Image Set',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1203-templates/Multi-angle Product Image Set.png',
      },
      {
        slug: 'template-product-360-view-picture',
        title: 'Product 360° View Picture',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/Product 360° View Picture.png',
      },
      {
        slug: 'template-product-360-video',
        title: 'Product 360° Video',
        video: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-videos/360.mp4',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/Product 360.png',
      },
      {
        slug: 'template-skincare-e-commerce-photo-set',
        title: 'Skincare E-commerce Photo Set',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Skincare E-commerce Photo Set.png',
      },
      {
        slug: 'template-product-background-swap',
        title: 'Product Background Swap',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Product Background Swap.png',
      },
      {
        slug: 'template-product-re-light',
        title: 'Product Re-light',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Product Re-light.png',
      },
      {
        slug: 'template-close-up-texture-shots',
        title: 'Close-up Texture Shots',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/Close-up Texture Shots.png',
      },
      {
        slug: 'template-product-comparison-image',
        title: 'Product Comparison Image',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/Product Comparison Image.png',
      },
      {
        slug: 'template-multi-purpose-products-image',
        title: 'Multi-Purpose Products Image',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0123_YUJUN/Templates Covers.png',
      },
    ],
  },
  {
    id: 'marketplace',
    title: 'Marketplaces',
    subtitle: 'Amazon-ready sets',
    description:
      'White-background packshots that pass marketplace requirements with consistent framing across your entire catalogue.',
    icon: 'cart',
    gradient: 'from-blue-50 to-cyan-50',
    accentColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    features: [
      'White-background packshots that pass requirements',
      'Consistent framing across entire categories',
      'Variant images aligned with main visuals',
    ],
    templates: [
      {
        slug: 'template-amazon-product-photo-set',
        title: 'Amazon Product Photo Set',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Amazon Product Photo Set.png',
      },
      {
        slug: 'template-amazon-luggage-bags-image-set',
        title: 'Amazon Luggage & Bags',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1203-templates/Amazon Luggage & Bags Image Set.png',
      },
      {
        slug: 'template-e-commerce-photo-set-3c-device',
        title: '3C Device Photo Set',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1203-templates/E-commerce Photo Set (3C Device).png',
      },
      {
        slug: 'template-daily-necessities-amazon-image-set',
        title: 'Daily Necessities Set',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1203-templates/Daily Necessities Amazon Image Set.png',
      },
      {
        slug: 'template-maternity-baby-product-image-set',
        title: 'Maternity & Baby Product Set',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/Maternity & Baby Product Image Set.png',
      },
      {
        slug: 'template-pet-christmas-accessories-image-set',
        title: 'Pet Christmas Accessories',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1203-templates/Pet Christmas Accessories Image Set.png',
      },
    ],
  },
  {
    id: 'ads',
    title: 'Ads & Social',
    subtitle: 'Ready for campaigns',
    description:
      'Feed and story formats re-using the same product base for seasonal campaigns and A/B testing.',
    icon: 'phone',
    gradient: 'from-pink-50 to-purple-50',
    accentColor: 'bg-pink-100',
    iconColor: 'text-theme-pink',
    features: [
      'Feed and story formats from same product base',
      'On-brand scenes for seasonal campaigns',
      'Visuals you can A/B test quickly',
    ],
    templates: [
      {
        slug: 'template-amazon-product-photo-set-christmas',
        title: 'Christmas Photo Set',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1203-templates/Amazon Product Photo Set (Christmas).png',
      },
      {
        slug: 'template-outdoor-sports-product-image-set',
        title: 'Outdoor Sports Set',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1203-templates/Outdoor Sports Product Image Set.png',
      },
      {
        slug: 'template-cosmetics-e-commerce-photo-set',
        title: 'Cosmetics Photo Set',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Cosmetics E-commerce Photo Set.png',
      },
      {
        slug: 'template-cleaning-product-image-set',
        title: 'Cleaning Product Set',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/Cleaning Product Image Set.png',
      },
      {
        slug: 'template-jewelry-ad',
        title: 'Jewelry Ad',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Jewelry Ad.png',
      },
      {
        slug: 'template-jewelry-ear-model',
        title: 'Jewelry Ear Model',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Jewelry Ear Model.png',
      },
      {
        slug: 'template-jewelry-hand-model',
        title: 'Jewelry Hand Model',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Jewelry Hand Model.png',
      },
      {
        slug: 'template-homeware-lifestyle-ad',
        title: 'Homeware Lifestyle Ad',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Homeware Lifestyle Ad.png',
      },
      {
        slug: 'template-food-product-ad',
        title: 'Food Product Ad',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Food Product Ad.png',
      },
      {
        slug: 'template-billboard-ad',
        title: 'Billboard Ad',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Billboard Ad.png',
      },
      {
        slug: 'template-enterprise-product-ad',
        title: 'Enterprise Product Ad',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Enterprise Product Ad.png',
      },
      {
        slug: 'template-product-explosion-effect',
        title: 'Product Explosion Effect',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Product Explosion Effect.png',
      },
      {
        slug: 'template-product-floral-effect',
        title: 'Product Floral Effect',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Product Floral Effect.png',
      },
      {
        slug: 'template-product-infographics',
        title: 'Product Infographics',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1121-templates-covers/Product Infographics.png',
      },
      {
        slug: 'template-jewelry-full-cycle-generator',
        title: 'Jewelry Full-Cycle Generator',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1216/12月16日-封面.jpg',
      },
      {
        slug: 'template-gothic-jewelry-workflow',
        title: 'Gothic-Style Jewelry Workflow',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0108/OpenCreator_image_1767857280031.png',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0108/OpenCreator_图生视频_1767862610938.mp4',
      },
      {
        slug: 'template-high-quality-product-image-set',
        title: 'High-Quality Product Image Set',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0108/OpenCreator_Image_to_Image_17678.jpg',
      },
      {
        slug: 'template-digital-3c-special-effect-lighting',
        title: 'Digital 3C Special Effect Lighting',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/0108/OpenCreator_Image_to_Image_17678(2).jpg',
        video:
          'https://ik.imagekit.io/opencreator/web/xm/0108/video_9iapiIDF34mrpVkxvrBb_p-REx7D_rsE.mp4',
      },
      {
        slug: 'template-ring-display',
        title: 'Retouched Ring Display',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0108/戒指.png',
        video:
          'https://ik.imagekit.io/opencreator/web/xm/0108/OpenCreator_Image_to_Video_1767876855662.mp4',
      },
      {
        slug: 'template-fashion-accessories-display',
        title: 'Fashion Accessories Display',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0115/图片2.jpg',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0115/视频.mp4',
      },
      {
        slug: 'template-hat-model-advertisement',
        title: 'Hat Model Advertisement',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1229/36836386e15601b9e27f17bf6d1860cb.jpg',
      },
      {
        slug: 'template-one-click-commercial-product-ads',
        title: 'One-Click Commercial Product Ads',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0129/运动鞋产品图竖版3比4.jpg',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0129/1月29日.mp4',
      },
      {
        slug: 'template-millennial-vintage-dreamcore-bracelet',
        title: 'Millennial Vintage Dreamcore Bracelet',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/0127/OpenCreator_Image_to_Image_1769607494700.png',
        video:
          'https://ik.imagekit.io/opencreator/web/xm/0127/OpenCreator_Image_to_Video_1769607497724.mp4',
      },
      {
        slug: 'template-ai-full-workflow-fashion-accessories',
        title: 'AI Full Workflow for Fashion Accessories',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/0127/OpenCreator_Image_to_Image_1769349751031.png',
        video:
          'https://ik.imagekit.io/opencreator/web/xm/0127/OpenCreator_Image_to_Video_1769438132936.mp4',
      },
      {
        slug: 'template-tech-inspired-accessories-showcase',
        title: 'Tech-Inspired Accessories Showcase',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0127/微信图片_20260127112451_39_202.jpg',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0127/f407e44a7f640b0658537e9809970fc9.mp4',
      },
      {
        slug: 'template-dynamic-product-retouching-scene',
        title: 'Dynamic Product Retouching & Scene',
        image: 'https://ik.imagekit.io/opencreator/web/xm/0126/Weixin Image_2026-01-23_184902_920.png',
        video: 'https://ik.imagekit.io/opencreator/web/xm/0126/OpenCreator_图生视频_1769161894228.mp4',
      },
    ],
  },
]

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'solutions.ecommerceProductImages.seo' })
  const canonical = getCanonicalUrl('/solutions/ecommerce-product-images', locale)

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
    alternates: {
      ...buildAlternatesMetadata('/solutions/ecommerce-product-images', locale),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonical,
    },
  }
}

export default async function EcommerceProductImagesSolutionPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = getCanonicalUrl('/solutions/ecommerce-product-images', locale)

  const [t, tNavbar] = await Promise.all([
    getTranslations({ locale, namespace: 'solutions.ecommerceProductImages' }),
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
      name: 'AI Ecommerce Product Image Generator',
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
        { name: 'Solutions', url: pageUrl },
      ],
    }),
  ])

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#F7F7F7]">
      <OffModalTips />
      <LandingNavbar />

      {/* Hero Section - 更丰富的视觉 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F7F7F7] via-white to-[#FFF8E7]">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#1fde1f]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-theme-pink/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#217EFF]/5 to-transparent rounded-full" />
        </div>

        <div className="container mx-auto max-w-7xl px-4 pt-12 pb-16 md:pt-20 md:pb-24 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* 左侧文案 */}
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

              {/* Stats bar */}
              <div className="flex flex-wrap gap-6 py-4 border-y border-black/10">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-poller-one text-black">
                    {t('hero.stats.quality.value')}
                  </p>
                  <p className="text-xs text-gray-600">{t('hero.stats.quality.label')}</p>
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
                  href={getAppUrl('/canvas?shareid=69204e7cce26', locale)}
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

            {/* 右侧 Hero 图片区域 */}
            <div className="relative">
              {/* 主图容器 - 占位图 */}
              <div className="relative rounded-3xl bg-white shadow-2xl overflow-hidden aspect-square">
                <Image
                  src={getCdnImageUrlWithSize(
                    'https://ik.imagekit.io/opencreator/images/image_20251210_eba33028-026f-44fa-80b4-4440ab5a06ce.png',
                    800,
                    800
                  )}
                  alt="Ecommerce product images solution showcase"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* 浮动小卡片 - 左下 */}
              <div className="absolute -left-4 -bottom-4 md:-left-8 md:-bottom-8 w-32 md:w-40 rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0_#000] p-3 hover:-translate-y-1 transition-transform">
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Output</p>
                <p className="text-lg font-poller-one">8-12</p>
                <p className="text-xs text-gray-700">images per SKU</p>
              </div>

              {/* 浮动小卡片 - 右上 */}
              <div className="absolute -right-2 -top-2 md:-right-6 md:-top-6 w-28 md:w-36 rounded-2xl border-2 border-black bg-[#1fde1f] shadow-[6px_6px_0_#000] p-3 hover:-translate-y-1 transition-transform">
                <p className="text-[10px] text-black/60 uppercase tracking-wide">Time</p>
                <p className="text-lg font-poller-one">5 min</p>
                <p className="text-xs text-black/80">per batch</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 合并的 Solution Sections - 紧凑布局 */}
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
              const sectionKey =
                section.id === 'pdp'
                  ? 'productPages'
                  : section.id === 'marketplaces'
                    ? 'marketplaces'
                    : 'adsAndSocial'
              return (
                <div key={section.id} className="space-y-6">
                  {/* 场景标题区 */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                      {section.icon === 'image' && <ImageIcon className="w-6 h-6 text-gray-600" />}
                      {section.icon === 'cart' && (
                        <ShoppingCart className="w-6 h-6 text-gray-600" />
                      )}
                      {section.icon === 'phone' && <Smartphone className="w-6 h-6 text-gray-600" />}
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

                  {/* 所有模板统一展示 - 4 列网格 */}
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
                                alt={template.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 50vw, 25vw"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                              <p className="text-white font-medium text-sm md:text-base group-hover:text-[#1fde1f] transition-colors line-clamp-2">
                                {template.title}
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
            key: 'dtc',
            title: t('audiences.items.dtc.title'),
            description: t('audiences.items.dtc.description'),
            roles: t('audiences.items.dtc.roles'),
          },
          {
            key: 'marketplace',
            title: t('audiences.items.marketplace.title'),
            description: t('audiences.items.marketplace.description'),
            roles: t('audiences.items.marketplace.roles'),
          },
          {
            key: 'agencies',
            title: t('audiences.items.agencies.title'),
            description: t('audiences.items.agencies.description'),
            roles: t('audiences.items.agencies.roles'),
          },
        ]}
      />

      {/* FAQ */}
      <LandingFAQ items={faqItems} title={t('faq.title')} />

      {/* Related Solutions */}
      <RelatedSolutions
        title={t('relatedSolutions.title')}
        subtitle={t('relatedSolutions.subtitle')}
        ctaLabel={t('relatedSolutions.ctaLabel')}
        items={SOLUTION_ITEMS.filter(
          item => item.href !== '/solutions/ecommerce-product-images'
        ).map(item => ({
          href: item.href,
          title: tNavbar(item.titleKey),
          description: tNavbar(item.descKey),
          image: item.image,
        }))}
      />

      <LandingCTA />
      <LandingFooter />
      <JsonLd id="ecommerce-product-images-solution" data={schema} />
    </div>
  )
}
