'use client'

import React, { memo, useRef, useEffect, useMemo } from 'react'
import { Link } from '@/i18n/navigation'
import Image, { StaticImageData } from 'next/image'
import { Play } from 'lucide-react'
import { HeroBackground } from './hero-background'
import { AutoPlayVideo } from './auto-play-video'
import { getCdnImageUrlWithSize } from '@/lib/image-cdn'
import { appExternalAnchorProps } from '@/lib/app-url'

const getMediaKey = (media: string | StaticImageData, index: number) =>
  `${typeof media === 'string' ? media : media.src}-${index}`

interface WorkflowHeroProps {
  type: 'video' | 'image'
  featureTag: string // 功能标签，如 'Video Gen', 'Image Gen', 'NEW!'
  featureTagColor?: 'pink' | 'blue' | 'green' // 标签颜色
  tags: string[]
  title: React.ReactNode
  description: string
  inputTitle?: string
  inputPlaceholder?: string
  inputType: 'text' | 'image' // 输入区类型
  inputImages?: (string | StaticImageData)[] // 输入区显示的图片（最多2张）
  inputImageAlts?: string[] // 输入图片的 alt 文案
  outputVideos?: (string | StaticImageData)[] // 输出视频
  outputImages?: (string | StaticImageData)[] // 输出图片
  outputImageAlts?: string[] // 输出图片的 alt 文案
  ctaText?: string
  ctaLink?: string
  layout?: 'workflow' | 'classic'
}

export const WorkflowHero = memo(function WorkflowHero({
  type,
  featureTag,
  featureTagColor = 'pink',
  tags,
  title,
  description,
  inputTitle = 'INPUT',
  inputPlaceholder = 'Put your script here...',
  inputType,
  inputImages = [],
  inputImageAlts = [],
  outputVideos = [],
  outputImages = [],
  outputImageAlts = [],
  ctaText = 'Run for Free!',
  ctaLink = '/',
  layout = 'workflow',
}: WorkflowHeroProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInViewRef = useRef(true)
  const reduceMotionRef = useRef(false)
  const showCta = Boolean(ctaText && ctaLink)
  const hasMultipleOutputs =
    (type === 'video' && outputVideos.length > 1) || (type === 'image' && outputImages.length > 1)
  const renderedOutputVideos = useMemo(
    () => (outputVideos.length > 1 ? [...outputVideos, ...outputVideos] : outputVideos),
    [outputVideos]
  )
  const renderedOutputImages = useMemo(
    () => (outputImages.length > 1 ? [...outputImages, ...outputImages] : outputImages),
    [outputImages]
  )

  useEffect(() => {
    try {
      if (ctaLink && ctaLink.includes('shareid=')) {
        const w = window as any
        w.__oc_workflow_cta_link = ctaLink
        window.dispatchEvent(new Event('oc:workflowCtaLink'))
      }
    } catch {
      // ignore
    }
  }, [ctaLink])

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer || !hasMultipleOutputs) return

    let animationFrameId: number | null = null
    let isRunning = true
    let scrollPosition = 0
    let lastTime: number | null = null
    const scrollSpeed = 60 // 像素/秒
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduceMotionRef.current = mediaQuery.matches

    const scroll = (currentTime: number) => {
      if (
        !isRunning ||
        !scrollContainer ||
        !isInViewRef.current ||
        reduceMotionRef.current ||
        document.visibilityState !== 'visible'
      ) {
        return
      }

      // 计算时间差（delta time）确保速度稳定
      if (lastTime === null) {
        lastTime = currentTime
      }
      const deltaTime = (currentTime - lastTime) / 1000
      lastTime = currentTime

      scrollPosition += scrollSpeed * deltaTime

      if (scrollContainer.scrollWidth && scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }

      scrollContainer.scrollLeft = scrollPosition

      if (isRunning) {
        animationFrameId = requestAnimationFrame(scroll)
      }
    }

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        isInViewRef.current = entry?.isIntersecting ?? true
        if (isInViewRef.current && !reduceMotionRef.current && isRunning) {
          animationFrameId = requestAnimationFrame(scroll)
        }
      },
      { rootMargin: '120px' }
    )

    observer.observe(scrollContainer)

    if (!reduceMotionRef.current) {
      animationFrameId = requestAnimationFrame(scroll)
    }

    return () => {
      isRunning = false
      observer.disconnect()
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }
    }
  }, [hasMultipleOutputs])

  // 根据 featureTagColor 返回对应的样式
  const getTagColorClass = () => {
    switch (featureTagColor) {
      case 'blue':
        return 'border-[#217EFF] text-[#217EFF]'
      case 'green':
        return 'border-[#1fde1f] text-[#1fde1f]'
      case 'pink':
      default:
        return 'border-theme-pink text-theme-pink'
    }
  }

  if (layout === 'classic') {
    const firstVideo =
      type === 'video' && outputVideos.length > 0
        ? typeof outputVideos[0] === 'string'
          ? outputVideos[0]
          : outputVideos[0].src
        : null

    const posterCandidate = type === 'video' ? outputImages[0] || inputImages[0] || null : null

    const posterImage = posterCandidate
      ? typeof posterCandidate === 'string'
        ? posterCandidate
        : posterCandidate.src
      : null

    const posterCdn =
      typeof posterImage === 'string'
        ? getCdnImageUrlWithSize(encodeURI(posterImage), 720, 960)
        : posterImage

    const primaryImage =
      (type === 'image' && outputImages.length > 0 && outputImages[0]) || inputImages[0] || null

    const secondaryImage =
      (type === 'image' && outputImages.length > 1 && outputImages[1]) ||
      (inputImages.length > 1 && inputImages[1]) ||
      null

    return (
      <section className="relative w-full py-12 md:py-16 bg-[#F7F7F7]">
        <HeroBackground />
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Text + CTA */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-poller-one border-2 ${getTagColorClass()}`}
                >
                  {featureTag}
                </span>
                {tags.map((tag, index) => (
                  <span key={index} className="text-sm text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-poller-one text-black leading-tight">
                {title}
              </h1>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">{description}</p>

              {showCta && (
                <div className="flex flex-col gap-4 max-w-md">
                  {ctaLink.startsWith('http') ? (
                    <a
                      href={ctaLink}
                      {...appExternalAnchorProps}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-[#1fde1f] font-poller-one font-bold text-sm md:text-base rounded-xl border-2 border-transparent hover:bg-[#1fde1f] hover:text-black hover:border-black hover:border-dashed transition-colors w-full md:w-auto"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>{ctaText}</span>
                    </a>
                  ) : (
                    <Link
                      href={ctaLink}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-[#1fde1f] font-poller-one font-bold text-sm md:text-base rounded-xl border-2 border-transparent hover:bg-[#1fde1f] hover:text-black hover:border-black hover:border-dashed transition-colors w-full md:w-auto"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>{ctaText}</span>
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Media */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto h-[380px] md:h-[480px] max-w-[280px] md:max-w-[360px]">
                {/* Main device frame */}
                <div className="relative h-full w-full rounded-[28px] border-2 border-black bg-white overflow-hidden flex items-center justify-center shadow-[8px_8px_0px_#000]">
                  {type === 'video' && firstVideo && (
                    <AutoPlayVideo
                      src={firstVideo}
                      poster={posterCdn || undefined}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {type === 'image' && primaryImage && (
                    <Image
                      src={
                        typeof primaryImage === 'string'
                          ? getCdnImageUrlWithSize(encodeURI(primaryImage), 720, 960)
                          : primaryImage
                      }
                      alt={
                        outputImageAlts[0] ??
                        inputImageAlts[0] ??
                        'AI workflow output example image shown in the hero media section'
                      }
                      fill
                      className="object-contain"
                      priority
                      sizes="(max-width: 768px) 280px, 360px"
                    />
                  )}
                </div>

                {/* Thumbnail overlay for image usage */}
                {(type === 'video' || type === 'image') && (secondaryImage || inputImages[0]) && (
                  <div className="hidden md:block absolute -bottom-6 -left-10 w-[140px] h-[190px] rounded-2xl border-2 border-black bg-white overflow-hidden shadow-[6px_6px_0px_#000]">
                    <Image
                      src={
                        typeof (secondaryImage || inputImages[0]) === 'string'
                          ? getCdnImageUrlWithSize(
                              encodeURI((secondaryImage || inputImages[0]) as string),
                              280,
                              380
                            )
                          : secondaryImage || inputImages[0]
                      }
                      alt={
                        outputImageAlts[1] ??
                        inputImageAlts[1] ??
                        inputImageAlts[0] ??
                        'AI workflow reference image thumbnail'
                      }
                      fill
                      className="object-cover"
                      sizes="140px"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full py-12 md:py-16 bg-[#F7F7F7]">
      <HeroBackground />
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Top section with tags */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className={`px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-poller-one border-2 ${getTagColorClass()}`}
          >
            {featureTag}
          </span>
          {tags.map((tag, index) => (
            <span key={index} className="text-sm text-gray-600">
              {tag}
            </span>
          ))}
        </div>

        {/* Main title and description */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-poller-one text-black mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* Input/Output section */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Input section */}
          <div className="lg:col-span-4">
            <div className="mb-3">
              <span className="inline-block px-4 py-1 bg-white border-2 border-black rounded-full text-sm font-semibold text-black">
                {inputTitle}
              </span>
            </div>
            <div className="relative h-[350px] md:h-[410px] w-full lg:w-fit">
              <div
                className="h-full p-4 md:p-6 rounded-2xl border-2 border-black relative flex flex-col w-full lg:aspect-square"
                style={{ backgroundColor: 'rgba(245, 98, 203, 0.3)' }}
              >
                {/* Title */}
                <div className="mb-3">
                  <h6 className="text-sm font-bold text-black">{inputPlaceholder}</h6>
                </div>

                {/* Input area - text or image */}
                {inputType === 'text' ? (
                  <div className="flex-1 w-full p-4 bg-white border-2 border-dashed border-black rounded-xl relative">
                    {/* 如果有输入图片，显示在输入框内 */}
                    {inputImages.length > 0 && (
                      <div
                        className={`mb-3 flex gap-2 ${inputImages.length === 2 ? 'justify-start' : 'justify-center'}`}
                      >
                        {inputImages.slice(0, 2).map((img, idx) => (
                          <div
                            key={idx}
                            className="relative border-2 border-dashed border-black rounded-lg w-[100px] md:w-[120px] aspect-square"
                          >
                            <Image
                              src={
                                typeof img === 'string'
                                  ? getCdnImageUrlWithSize(encodeURI(img), 240, 240)
                                  : img
                              }
                              alt={
                                inputImageAlts[idx] ?? `Workflow input reference image ${idx + 1}`
                              }
                              fill
                              className="object-cover rounded-lg"
                              sizes="(max-width: 768px) 100px, 120px"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    <textarea
                      placeholder="In a foggy rainy night..."
                      className="w-full bg-transparent resize-none focus:outline-none text-sm md:text-base text-black placeholder:text-gray-600"
                    />
                  </div>
                ) : (
                  <div className="flex-1 w-full p-4 bg-white border-2 border-dashed border-black rounded-xl flex items-center justify-center">
                    {inputImages.length > 0 ? (
                      <div
                        className={`flex gap-3 ${inputImages.length === 2 ? 'justify-start' : 'justify-center'} w-full flex-wrap`}
                      >
                        {inputImages.slice(0, 2).map((img, idx) => (
                          <div
                            key={idx}
                            className="relative border-2 border-dashed border-black rounded-lg overflow-hidden w-[120px] aspect-square"
                          >
                            <Image
                              src={
                                typeof img === 'string'
                                  ? getCdnImageUrlWithSize(encodeURI(img), 240, 240)
                                  : img
                              }
                              alt={
                                inputImageAlts[idx] ?? `Workflow input reference image ${idx + 1}`
                              }
                              fill
                              className="object-cover"
                              sizes="120px"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-gray-400">
                        <p className="text-sm">Upload your images here</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Button */}
                {showCta && (
                  <div className="mt-4">
                    {ctaLink.startsWith('http') ? (
                      <a
                        href={ctaLink}
                        {...appExternalAnchorProps}
                        className="w-full flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-black text-[#1fde1f] font-poller-one font-bold text-sm md:text-base rounded-xl border-2 border-transparent hover:bg-[#1fde1f] hover:text-black hover:border-black hover:border-dashed transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
                        <span>{ctaText}</span>
                      </a>
                    ) : (
                      <Link
                        href={ctaLink}
                        className="w-full flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-black text-[#1fde1f] font-poller-one font-bold text-sm md:text-base rounded-xl border-2 border-transparent hover:bg-[#1fde1f] hover:text-black hover:border-black hover:border-dashed transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
                        <span>{ctaText}</span>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Output section */}
          <div className="lg:col-span-8">
            <div className="mb-3">
              <span className="inline-block px-4 py-1 bg-white border-2 border-black rounded-full text-sm font-semibold text-black">
                OUTPUT
              </span>
            </div>
            <div className="h-[300px] md:h-[350px] lg:h-[410px] overflow-hidden rounded-lg">
              <div
                ref={scrollRef}
                className="flex gap-5 h-full overflow-x-hidden"
                style={{ scrollBehavior: 'auto' }}
              >
                {/* 渲染视频两次以实现无限滚动 */}
                {type === 'video' &&
                  outputVideos.length > 0 &&
                  renderedOutputVideos.map((video, index) => {
                      const videoSrc = typeof video === 'string' ? video : video.src
                      const posterCandidate =
                        (outputImages.length > 0 && outputImages[0]) ||
                        (inputImages.length > 0 && inputImages[0])
                      const posterUrl =
                        typeof posterCandidate === 'string'
                          ? getCdnImageUrlWithSize(encodeURI(posterCandidate), 720, 960)
                          : posterCandidate
                      return (
                        <div
                          key={getMediaKey(video, index)}
                          className="flex-shrink-0 h-full bg-white rounded-lg overflow-hidden border-2 border-black"
                        >
                          <AutoPlayVideo
                            src={videoSrc}
                            poster={
                              posterUrl
                                ? typeof posterUrl === 'string'
                                  ? posterUrl
                                  : posterUrl.src
                                : undefined
                            }
                            preload={index === 0 ? 'metadata' : 'none'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )
                    })}

                {/* 渲染图片两次以实现无限滚动 */}
                {type === 'image' &&
                  outputImages.length > 0 &&
                  renderedOutputImages.map((image, index) => (
                      <div
                        key={getMediaKey(image, index)}
                        className="flex-shrink-0 h-full w-full bg-white rounded-lg overflow-hidden border-2 border-black relative"
                      >
                        <Image
                          src={
                            typeof image === 'string'
                              ? getCdnImageUrlWithSize(encodeURI(image), 1200, 800)
                              : image
                          }
                          alt={
                            outputImageAlts[index % outputImages.length] ??
                            `AI workflow output example image ${index + 1}`
                          }
                          fill
                          className="object-cover"
                          priority={index === 0}
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 720px"
                        />
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
