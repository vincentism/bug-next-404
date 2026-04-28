import type { Metadata } from 'next'
import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { User, Briefcase, Sparkles } from 'lucide-react'
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

// 按场景分类的模板数据 - 使用真实的模板数据
const SOLUTION_SECTIONS: {
  id: string
  icon: string
  accentColor: string
  iconColor: string
  templates: Template[]
}[] = [
  {
    id: 'professional',
    icon: 'briefcase',
    accentColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    templates: [
      {
        slug: 'template-linkedin-headshot',
        titleKey: 'linkedinHeadshot',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/LinkedIn Headshot.png',
      },
      {
        slug: 'template-ai-avatar-generator',
        titleKey: 'aiAvatarGenerator',
        image: 'https://ik.imagekit.io/opencreator/web/landing/ai-avatar-generator/images/1.jpeg',
      },
      {
        slug: 'template-studio-level-photography',
        titleKey: 'studioLevelPhotography',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1121-templates-covers/Studio-level Photography.png',
      },
    ],
  },
  {
    id: 'creative',
    icon: 'sparkles',
    accentColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    templates: [
      {
        slug: 'template-age-change-effect',
        titleKey: 'ageChangeEffect',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/Age Change Effect.png',
      },
      {
        slug: 'template-3d-character-render',
        titleKey: '3dCharacterRender',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/3D Character Render.png',
      },
      {
        slug: 'template-3d-figure-design',
        titleKey: '3dFigureDesign',
        image:
          'https://ik.imagekit.io/opencreator/thumbnails/images/FbGjhtXl4AovPL0d5Vgtx3GVgeKFqEpr.png',
      },
      {
        slug: 'template-consistent-character-ads',
        titleKey: 'consistentCharacterAds',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Consistent Character Ads.png',
      },
      {
        slug: 'template-hairstyle-lab',
        titleKey: 'hairstyleLab',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/Hairstyle Lab.png',
      },
      {
        slug: 'template-animal-olympics',
        titleKey: 'animalOlympics',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Animal Olympics.png',
      },
      {
        slug: 'template-multiverse-problem-solver',
        titleKey: 'multiverseProblemSolver',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1121-templates-covers/Multiverse Problem Solver.png',
      },
      {
        slug: 'template-pov-leaked-footage',
        titleKey: 'povLeakedFootage',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/POV Leaked Footage.png',
      },
    ],
  },
  {
    id: 'content',
    icon: 'user',
    accentColor: 'bg-green-100',
    iconColor: 'text-green-600',
    templates: [
      {
        slug: 'template-ugc-promo-post',
        titleKey: 'ugcPromoPost',
        image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/UGC Promo Post.png',
      },
      {
        slug: 'template-ai-thumbnail-maker',
        titleKey: 'aiThumbnailMaker',
        image: 'https://ik.imagekit.io/opencreator/web/landing/ai-thumbnail-maker/images/1.jpg',
      },
      {
        slug: 'template-youtube-vlog-thumbnail',
        titleKey: 'youtubeVlogThumbnail',
        image:
          'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/YouTube Vlog Thumbnail.png',
      },
    ],
  },
]

// Hero 区域使用的代表性模板
const HERO_TEMPLATE = {
  slug: 'template-linkedin-headshot',
  shareId: '691f1fe0bb8b',
  heroImage: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/LinkedIn Headshot.png',
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'solutions.aiPortrait.seo' })
  const canonical = getCanonicalUrl('/solutions/ai-portrait', locale)

  return {
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
    alternates: {
      ...buildAlternatesMetadata('/solutions/ai-portrait', locale),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonical,
    },
  }
}

export default async function AIPortraitSolutionPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = getCanonicalUrl('/solutions/ai-portrait', locale)

  const [t, tNavbar] = await Promise.all([
    getTranslations({ locale, namespace: 'solutions.aiPortrait' }),
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
      name: 'AI Portrait & Headshot Generator',
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
                  src={getCdnImageUrlWithSize(HERO_TEMPLATE.heroImage, 800, 800)}
                  alt="AI portrait and headshot generator solution showcase"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="absolute -left-4 -bottom-4 md:-left-8 md:-bottom-8 w-32 md:w-40 rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0_#000] p-3 hover:-translate-y-1 transition-transform">
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">No photoshoot</p>
                <p className="text-lg font-poller-one">100%</p>
                <p className="text-xs text-gray-700">AI generated</p>
              </div>

              <div className="absolute -right-2 -top-2 md:-right-6 md:-top-6 w-28 md:w-36 rounded-2xl border-2 border-black bg-[#1fde1f] shadow-[6px_6px_0_#000] p-3 hover:-translate-y-1 transition-transform">
                <p className="text-[10px] text-black/60 uppercase tracking-wide">Time</p>
                <p className="text-lg font-poller-one">2 min</p>
                <p className="text-xs text-black/80">per headshot</p>
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
              const sectionKey = section.id as 'professional' | 'creative' | 'content'
              return (
                <div key={section.id} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                      {section.icon === 'briefcase' && (
                        <Briefcase className="w-6 h-6 text-gray-600" />
                      )}
                      {section.icon === 'sparkles' && (
                        <Sparkles className="w-6 h-6 text-gray-600" />
                      )}
                      {section.icon === 'user' && <User className="w-6 h-6 text-gray-600" />}
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
            key: 'professionals',
            title: t('audiences.items.professionals.title'),
            description: t('audiences.items.professionals.description'),
            roles: t('audiences.items.professionals.roles'),
          },
          {
            key: 'teams',
            title: t('audiences.items.teams.title'),
            description: t('audiences.items.teams.description'),
            roles: t('audiences.items.teams.roles'),
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
        items={SOLUTION_ITEMS.filter(item => item.href !== '/solutions/ai-portrait').map(item => ({
          href: item.href,
          title: tNavbar(item.titleKey),
          description: tNavbar(item.descKey),
          image: item.image,
        }))}
      />

      <LandingCTA />
      <LandingFooter />
      <JsonLd id="ai-portrait-solution" data={schema} />
    </div>
  )
}
