'use client'

import React, { memo, useMemo, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { AutoPlayVideo } from '../auto-play-video'
import { getImageKitImageUrlWithSize } from '@/lib/image-cdn'

export interface GalleryItem {
  type: 'image' | 'video'
  src: string
  poster?: string
  title: string
  description?: string
  useCase?: string // 使用场景描述
  link?: string
}

export interface ModelGalleryProps {
  title?: string
  subtitle?: string
  items: GalleryItem[]
}

export const ModelGallery = memo(function ModelGallery({
  title = 'See It In Action',
  subtitle,
  items,
}: ModelGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasMultipleItems = items.length > 3
  const isInViewRef = useRef(true)
  const reduceMotionRef = useRef(false)

  // 自动滚动效果（使用基于时间的动画确保速度稳定）
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer || !hasMultipleItems) return

    let animationFrameId: number | null = null
    let isRunning = true
    let scrollPosition = 0
    let lastTime: number | null = null
    const scrollSpeed = 30 // 像素/秒
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

      // 计算时间差（delta time）
      if (lastTime === null) {
        lastTime = currentTime
      }
      const deltaTime = (currentTime - lastTime) / 1000 // 转换为秒
      lastTime = currentTime

      // 基于时间的滚动增量，确保速度稳定
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
  }, [hasMultipleItems])

  const displayItems = useMemo(
    () => (hasMultipleItems ? [...items, ...items] : items),
    [hasMultipleItems, items]
  )

  return (
    <section
      className="py-12 md:py-16 lg:py-20"
      style={{ backgroundColor: 'rgba(246, 98, 204, 0.08)' }}
    >
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-poller-one text-black mb-2">
            {title}
          </h2>
          {subtitle && <p className="text-sm md:text-base text-gray-600 max-w-xl">{subtitle}</p>}
        </div>

        {/* Gallery - 横向滚动布局，3:4 比例 */}
        <div className="overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            {displayItems.map((item, index) => (
              <div key={`${item.src}-${index}`} className="flex-shrink-0 w-[240px] md:w-[280px]">
                {/* Media container - 3:4 aspect ratio */}
                <div className="relative aspect-[3/4] rounded-2xl border-2 border-black bg-white overflow-hidden shadow-[6px_6px_0px_#000]">
                  {item.type === 'video' ? (
                    <AutoPlayVideo
                      src={item.src}
                      poster={item.poster}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={getImageKitImageUrlWithSize(item.src, 560, 746)}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 240px, 280px"
                    />
                  )}

                  {/* Type badge */}
                  {item.type === 'video' && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-full bg-black text-[#1fde1f] border border-black">
                        <Play className="w-3 h-3 fill-current" />
                        Video
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="mt-3">
                  <h3 className="font-poller-one text-black text-sm md:text-base leading-tight">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                  )}
                  {item.useCase && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.useCase}</p>
                  )}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-theme-pink hover:underline mt-2"
                    >
                      Try this workflow →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})
