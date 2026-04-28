'use client'

import React, { useEffect, useRef } from 'react'
import { useTranslations } from '@/i18n/client'
import { Link } from '@/i18n/navigation'
import { getCdnImageUrlWithSize } from '@/lib/image-cdn'

const models = [
  { name: 'Kling', image: 'https://ik.imagekit.io/opencreator/web/landing/models/kling.png' },
  { name: 'Hailuo', image: 'https://ik.imagekit.io/opencreator/web/landing/models/hailuo.png' },
  { name: 'Grok', image: 'https://ik.imagekit.io/opencreator/web/landing/models/grok.png' },
  { name: 'Flux', image: 'https://ik.imagekit.io/opencreator/web/landing/models/flux.png' },
  { name: 'Gemini', image: 'https://ik.imagekit.io/opencreator/web/landing/models/gemini.png' },
  { name: 'Luma', image: 'https://ik.imagekit.io/opencreator/web/landing/models/luma.png' },
  { name: 'Runway', image: 'https://ik.imagekit.io/opencreator/web/landing/models/runway.png' },
  {
    name: 'Stable Diffusion',
    image: 'https://ik.imagekit.io/opencreator/web/landing/models/stable-diffusion.png',
  },
  { name: 'OpenAI', image: 'https://ik.imagekit.io/opencreator/web/landing/models/openai.png' },
  { name: 'VEO', image: 'https://ik.imagekit.io/opencreator/web/landing/models/veo.png' },
]

export function ModelShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isMountedRef = useRef(true)
  const isInViewRef = useRef(true)
  const reduceMotionRef = useRef(false)
  const t = useTranslations('landing.modelShowcase')

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    isMountedRef.current = true
    let animationFrameId: number | null = null
    let scrollPosition = 0
    let lastTime: number | null = null
    const scrollSpeed = 30 // 像素/秒
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduceMotionRef.current = mediaQuery.matches

    const scroll = (currentTime: number) => {
      if (
        !isMountedRef.current ||
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

      if (isMountedRef.current) {
        animationFrameId = requestAnimationFrame(scroll)
      }
    }

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        isInViewRef.current = entry?.isIntersecting ?? true
        if (isInViewRef.current && !reduceMotionRef.current && isMountedRef.current) {
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
      isMountedRef.current = false
      observer.disconnect()
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }
    }
  }, [])

  return (
    <section className="relative w-full py-8 md:py-10 lg:py-12 pt-2 overflow-hidden">
      <div className="container mx-auto px-2 md:px-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-poller-one text-center text-black mb-8 md:mb-10 lg:mb-12">
          {t('title')}
        </h2>

        <div className="relative mx-auto" style={{ maxWidth: '1440px' }}>
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden no-scrollbar"
            style={{
              maskImage:
                'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }}
          >
            {[...models, ...models, ...models].map((model, index) => (
              <Link
                key={`${model.name}-${index}`}
                href="/models"
                className="flex flex-col items-center flex-shrink-0 rounded-xl px-3 py-2"
                style={{ width: '122px', height: '78px' }}
              >
                <div className="relative w-12 h-12 mb-1.5">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-contain cursor-pointer"
                    loading="lazy"
                  />
                </div>
                <p className="text-center font-poller-one text-sm whitespace-nowrap cursor-pointer">
                  {model.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
