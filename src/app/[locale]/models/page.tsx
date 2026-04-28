import type { Metadata } from 'next'
import React from 'react'
import { LandingNavbar, LandingFooter } from '@/components/landing'
import { JsonLd } from '@/components/seo/json-ld'
import { createSchemaGraph, buildWebPageSchema, getSiteUrl } from '@/lib/seo/schema'
import { buildAlternatesMetadata, getCanonicalUrl } from '@/lib/seo/urls'
import { availModelsData, getEnrichedAvailableModels } from '@/constants/availableModelInstances'
import {
  cloudModelData as staticCloudModelData,
  getCloudModelListEndpoint,
  transformCloudModelListResponse,
  type CloudModelData,
} from '@/constants/cloudModelData'
import { Link } from '@/i18n/navigation'
import { getTranslations } from '@/i18n/get-translations'
import { getModelIcon } from '@/hooks/models/use-model-icon'
import OffModalTips from '@/components/dialog/off_modal_tips'
import { calculateCloudCredits, calculateCloudCreditsRange } from '@/lib/cloudPricing'

type PageProps = {
  params: Promise<{ locale: string }>
}

export const revalidate = 300

const fetchCloudModelData = async (): Promise<CloudModelData> => {
  const endpoint = getCloudModelListEndpoint(process.env.NEXT_PUBLIC_SERVER_URL)
  if (!endpoint) {
    return staticCloudModelData
  }

  try {
    const response = await fetch(endpoint, {
      next: { revalidate },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const payload: unknown = await response.json()
    const transformed = transformCloudModelListResponse(payload)

    return Object.keys(transformed).length > 0 ? transformed : staticCloudModelData
  } catch {
    return staticCloudModelData
  }
}

const MODEL_DETAIL_ROUTES: Record<string, string> = {
  // Image
  'Fal Nano Banana': '/models/nano-banana-pro',
  'Flux 1.1 Pro': '/models/flux-1-1-pro',
  'Fal Imagen 4': '/models/imagen-4',
  'Fal_Seedream_V4.5_Text_to_Image': '/models/seedream-4-5',
  'Fal_Seedream_V4.5_Image_to_Image': '/models/seedream-4-5',
  'Fal_GPT_Image_1.5_Text_to_Image': '/models/gpt-image-1-5',
  'Fal_GPT_Image_1.5_Image_to_Image': '/models/gpt-image-1-5',

  // Video (image-to-video)
  'Kling 1.6': '/models/kling-1-6',
  'Fal kling 2.1 Pro': '/models/kling-2-1',
  'Fal kling 2.5 Pro': '/models/kling-2-5',
  'Fal kling 2.6 Pro Image to Video': '/models/kling-2-6-pro',
  'Fal kling 2.6 Pro Text to Video': '/models/kling-2-6-pro',
  'Fal kling 3.0 Pro Image to Video': '/models/kling-3-0',
  'Fal kling 3.0 Standard Image to Video': '/models/kling-3-0',
  'Fal kling 3.0 Pro Text to Video': '/models/kling-3-0',
  'Fal kling 3.0 Standard Text to Video': '/models/kling-3-0',
  'fal-hailuo-2.0-image2video': '/models/hailuo-02',
  'Fal Seedance 1.0 Lite Image to Video': '/models/seedance-lite',
  'doubao-seedance-1-0-pro': '/models/seedance-1-0-pro',
  'Seedance 2.0': '/models/seedance-2-0',
  'opencreator-fal-sora2-i2v-v1': '/models/sora-2',
  'Luma Ray 2': '/models/luma-ray-2',
  'google/veo3.1-fast/image-to-video': '/models/veo-3-1-fast',
  'google/veo3.1/image-to-video': '/models/veo-3-1',
  'Fal Veo 3 Image To Video': '/models/veo-3',
  'Fal Wan 2.5 Image to Video': '/models/wan-2-5',
  'Fal Wan 2.6 Image to Video': '/models/wan-2-6',
  'Fal Wan 2.6 Text to Video': '/models/wan-2-6',

  // Angle Control
  'fal-ai/qwen-image-edit-2511-multiple-angles': '/models/qwen-image-edit-multiple-angles',

  // Lip Sync
  'Fal Pixverse Lipsync': '/models/pixverse-lipsync',
  'Fal Sync Lipsync V2': '/models/sync-lipsync-2',
}

const CATEGORY_KEYS: (keyof typeof availModelsData)[] = [
  'text',
  'image',
  'imageToImage',
  'video',
  'textToVideo',
  'DescribeImage',
  'imageAngleControl',
  'videoLipSync',
]

const SPECIAL_MODELS: Array<{
  name: string
  description: { en: string; zh: string }
  href: string
  status: 'live' | 'comingSoon'
}> = [
    {
      name: 'Kling O1',
      description: {
        en: 'Unified multimodal video model (live) with flexible duration and video editing.',
        zh: '统一多模态视频模型（已上线），支持灵活时长与视频编辑。',
      },
      href: '/models/kling-o1',
      status: 'live',
    },
    {
      name: 'Kling Motion Control',
      description: {
        en: 'Transfer motion from reference video to any subject. Standard & Pro tiers available.',
        zh: '将参考视频的动作迁移到任意角色。提供标准版和专业版。',
      },
      href: '/models/kling-motion-control',
      status: 'live',
    },
    {
      name: 'Luma Ray3',
      description: {
        en: 'Next-generation reasoning video model. Prelaunch page.',
        zh: '下一代“推理”视频模型。预热页。',
      },
      href: '/models/luma-ray-3',
      status: 'comingSoon',
    },
    {
      name: 'Luma Ray3 Modify',
      description: {
        en: 'Performance-preserving video-to-video workflow. Prelaunch page.',
        zh: '强调表演保真的视频编辑/重绘工作流。预热页。',
      },
      href: '/models/luma-ray-3-modify',
      status: 'comingSoon',
    },
    {
      name: 'Runway Gen-4.5',
      description: {
        en: 'Next-gen video generation with stronger motion. Prelaunch page.',
        zh: '更强运动质量的下一代视频生成。预热页。',
      },
      href: '/models/runway-gen-4-5',
      status: 'comingSoon',
    },
    {
      name: 'FLUX.2',
      description: {
        en: 'Multi-reference consistency, better text rendering, native image editing. Pro/Turbo/Dev tiers.',
        zh: '多参考图一致性、更可靠文字渲染、原生图像编辑。提供 Pro/Turbo/Dev 版本。',
      },
      href: '/models/flux-2',
      status: 'live',
    },
    {
      name: 'Seedance 1.5 Pro',
      description: {
        en: 'Native audio-video generation with tight lip-sync. Prelaunch page for upcoming availability.',
        zh: '音画同生 + 紧密口型同步。当前为预热页，等待正式接入。',
      },
      href: '/models/seedance-1-5-pro',
      status: 'comingSoon',
    },
    {
      name: 'Seedance 2.0',
      description: {
        en: 'Multimodal video model with image/video/audio/text references, @-material control, and timeline extension/editing.',
        zh: '多模态视频模型，支持图像/视频/音频/文本参考、@素材控制与时间线续写编辑。',
      },
      href: '/models/seedance-2-0',
      status: 'live', // seedance 2.0 is live
    },
    {
      name: 'Kling 2.6 4K',
      description: {
        en: '4K/60fps ultra HD video with custom voice library. Coming Q1 2026.',
        zh: '4K/60fps 超高清视频 + 自定义语音库。预计 2026 Q1 发布。',
      },
      href: '/models/kling-2-6-4k',
      status: 'comingSoon',
    },
    {
      name: 'Seedream 5.0',
      description: {
        en: 'Next-gen ByteDance image model with enhanced consistency and resolution.',
        zh: '字节跳动下一代图像模型，增强一致性和分辨率。',
      },
      href: '/models/seedream-5',
      status: 'comingSoon',
    },
  ]

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const canonical = getCanonicalUrl('/models', locale)

  return {
    title: 'AI models on OpenCreator',
    description: 'Browse all AI models available in OpenCreator for text, image and video.',
    alternates: {
      ...buildAlternatesMetadata('/models', locale),
    },
    openGraph: {
      title: 'AI models on OpenCreator',
      description: 'Browse all AI models available in OpenCreator for text, image and video.',
      url: canonical,
    },
  }
}

export default async function ModelsIndexPage({ params }: PageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models`
  const translationsPromise = getTranslations({ locale, namespace: 'models.index' })
  const cloudModelDataPromise = fetchCloudModelData()
  const [t, currentCloudModelData] = await Promise.all([translationsPromise, cloudModelDataPromise])
  const modelsByCategory = getEnrichedAvailableModels(currentCloudModelData)

  const specialTitle = locale === 'zh' ? '特别模型 / 预热页' : 'Special & Coming Soon'
  const specialDescription =
    locale === 'zh'
      ? '这些模型不一定出现在默认模型列表中（例如已上线但不在表内的模型，或即将上线的预热页）。'
      : 'These models may not appear in the default list (e.g. special cases or prelaunch pages).'
  const comingSoonBadge = locale === 'zh' ? '即将上线' : 'Coming Soon'
  const liveBadge = locale === 'zh' ? '已上线' : 'Live'

  const schemaData = createSchemaGraph([
    buildWebPageSchema({
      url: pageUrl,
      name: 'AI models on OpenCreator',
      description: 'Overview of all AI models available across text, image and video.',
    }),
  ])

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#F7F7F7] pt-10">
      <OffModalTips />
      <JsonLd data={schemaData} />
      <LandingNavbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#F7F7F7] via-white to-[#E7F0FF]">
          <div className="container mx-auto max-w-7xl px-4 pt-12 pb-12 md:pt-20 md:pb-16 relative z-10">
            <div className="space-y-6 max-w-3xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-poller-one text-black leading-[1.1]">
                {t('hero.title')}
              </h1>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl">
                {t('hero.description')}
              </p>
              <p className="text-xs md:text-sm text-gray-500">{t('hero.note')}</p>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14 bg-white">
          <div className="container mx-auto max-w-7xl px-4 space-y-5 md:space-y-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
              <div>
                <h2 className="text-2xl md:text-3xl font-poller-one text-black">{specialTitle}</h2>
                <p className="text-sm md:text-base text-gray-600 max-w-2xl">{specialDescription}</p>
              </div>
              <p className="text-xs text-gray-500">{SPECIAL_MODELS.length} models</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {SPECIAL_MODELS.map(model => {
                const description = locale === 'zh' ? model.description.zh : model.description.en
                const badgeText = model.status === 'comingSoon' ? comingSoonBadge : liveBadge
                const badgeClassName =
                  model.status === 'comingSoon'
                    ? 'bg-gray-100 text-gray-700 border border-gray-200'
                    : 'bg-black text-white border border-black'

                return (
                  <div
                    key={model.href}
                    className="group relative rounded-2xl border border-black/5 bg-[#F9FAFB] hover:bg-white shadow-sm hover:shadow-lg transition-all duration-200 p-4 md:p-5 flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="mt-0.5 flex h-8 w-8 md:h-9 md:w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white border border-black/5 overflow-hidden">
                          {(() => {
                            const Icon = getModelIcon(model.name)
                            return <Icon className="h-5 w-5" />
                          })()}
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-base md:text-lg font-poller-one text-black line-clamp-2">
                            {model.name}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-600 line-clamp-3">
                            {description}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 text-right">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] md:text-[11px] font-medium whitespace-nowrap ${badgeClassName}`}
                        >
                          {badgeText}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-end">
                      <Link
                        href={model.href}
                        className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] md:text-xs font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-800 hover:border-gray-200 transition-colors duration-150"
                      >
                        <span>{t('viewDetails')}</span>
                        <span className="translate-y-[0.5px]">→</span>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Model sections */}
        <section className="py-10 md:py-14 bg-white">
          <div className="container mx-auto max-w-7xl px-4 space-y-12 md:space-y-16">
            {CATEGORY_KEYS.filter(key => modelsByCategory[key]).map(key => {
              const models = modelsByCategory[key].filter(m => !m.isDisabled)

              if (!models || models.length === 0) return null

              return (
                <div key={key} className="space-y-5 md:space-y-6">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-poller-one text-black">
                        {t(`categories.${key}.title`)}
                      </h2>
                      <p className="text-sm md:text-base text-gray-600 max-w-2xl">
                        {t(`categories.${key}.description`)}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {models.length} {t('modelCount', { count: models.length })}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {models.map(model => {
                      const detailPath = MODEL_DETAIL_ROUTES[model.id]

                      return (
                        <div
                          key={model.id}
                          className="group relative rounded-2xl border border-black/5 bg-[#F9FAFB] hover:bg-white shadow-sm hover:shadow-lg transition-all duration-200 p-4 md:p-5 flex flex-col gap-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2 md:gap-3">
                              <div className="mt-0.5 flex h-8 w-8 md:h-9 md:w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white border border-black/5 overflow-hidden">
                                {(() => {
                                  const Icon = getModelIcon(model.name)
                                  return <Icon className="h-5 w-5" />
                                })()}
                              </div>
                              <div className="space-y-1">
                                <h3 className="text-base md:text-lg font-poller-one text-black line-clamp-2">
                                  {model.name}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-600 line-clamp-3">
                                  {model.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1 text-right">
                              <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-2.5 py-1 text-[10px] md:text-xs font-medium text-gray-900">
                                {(() => {
                                  if (model.cloudPricing) {
                                    if (
                                      typeof model.cloudPricing !== 'number' &&
                                      model.cloudPricing.per === 'perToken'
                                    ) {
                                      return <span className="text-gray-600">Usage-based</span>
                                    }
                                    const range = calculateCloudCreditsRange(model.cloudPricing)
                                    const value = range
                                      ? `${range.min}~${range.max}`
                                      : calculateCloudCredits(model.cloudPricing)
                                    return (
                                      <>
                                        {value}
                                        <span className="ml-1 text-gray-500">credits/gen</span>
                                      </>
                                    )
                                  }
                                  return (
                                    <>
                                      {model.credits ?? '--'}
                                      <span className="ml-1 text-gray-500">credits/gen</span>
                                    </>
                                  )
                                })()}
                              </span>
                              {/* New badge is intentionally hidden on this page */}
                              {model.isDisabled && (
                                <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-500 px-2 py-0.5 text-[10px] md:text-[11px] font-medium border border-gray-200 whitespace-nowrap">
                                  {t('badges.disabled')}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mt-1 flex flex-wrap gap-1.5">
                            {model.role?.length ? (
                              model.role.map(role => {
                                let labelKey: string
                                switch (role) {
                                  case 0:
                                    labelKey = 'roles.free'
                                    break
                                  case 1:
                                    labelKey = 'roles.canvas'
                                    break
                                  case 2:
                                    labelKey = 'roles.flow'
                                    break
                                  case 3:
                                    labelKey = 'roles.api'
                                    break
                                  default:
                                    labelKey = 'roles.other'
                                }
                                const label = t(labelKey)

                                return (
                                  <span
                                    key={role}
                                    className="inline-flex items-center rounded-full bg-white border border-black/5 px-2 py-0.5 text-[10px] md:text-[11px] text-gray-600"
                                  >
                                    {label}
                                  </span>
                                )
                              })
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-white border border-black/5 px-2 py-0.5 text-[10px] md:text-[11px] text-gray-500 whitespace-nowrap">
                                {t('badges.unavailable')}
                              </span>
                            )}
                          </div>

                          {detailPath && (
                            <div className="mt-3 flex justify-end">
                              <Link
                                href={detailPath}
                                className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] md:text-xs font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-800 hover:border-gray-200 transition-colors duration-150"
                              >
                                <span>{t('viewDetails')}</span>
                                <span className="translate-y-[0.5px]">→</span>
                              </Link>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  )
}
