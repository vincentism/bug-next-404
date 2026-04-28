'use client'

import React, { memo, useCallback, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useTranslations } from '@/i18n/client'
import { getCdnImageUrlWithSize } from '@/lib/image-cdn'
import { appExternalAnchorProps, getAppUrl } from '@/lib/app-url'

const images = [
  {
    src: 'https://ik.imagekit.io/opencreator/web/landing/cta/image-1.png',
    rotation: -25,
    stackOffset: { x: -120, y: 0 },
    hoverOffset: { x: -220, y: -100 },
  },
  {
    src: 'https://ik.imagekit.io/opencreator/web/landing/cta/image-2.png',
    rotation: -18,
    stackOffset: { x: -85, y: 5 },
    hoverOffset: { x: -80, y: -150 },
  },
  {
    src: 'https://ik.imagekit.io/opencreator/web/landing/cta/image-3.png',
    rotation: -10,
    stackOffset: { x: -50, y: 8 },
    hoverOffset: { x: 120, y: -110 },
  },
  {
    src: 'https://ik.imagekit.io/opencreator/web/landing/cta/image-4.png',
    rotation: -3,
    stackOffset: { x: -15, y: 10 },
    hoverOffset: { x: 280, y: -80 },
  },
  {
    src: 'https://ik.imagekit.io/opencreator/web/landing/cta/image-5.png',
    rotation: 4,
    stackOffset: { x: 20, y: 10 },
    hoverOffset: { x: 260, y: 60 },
  },
  {
    src: 'https://ik.imagekit.io/opencreator/web/landing/cta/image-6.png',
    rotation: 12,
    stackOffset: { x: 55, y: 8 },
    hoverOffset: { x: 180, y: 130 },
  },
  {
    src: 'https://ik.imagekit.io/opencreator/web/landing/cta/image-7.png',
    rotation: 20,
    stackOffset: { x: 90, y: 5 },
    hoverOffset: { x: 40, y: 150 },
  },
  {
    src: 'https://ik.imagekit.io/opencreator/web/landing/cta/image-8.png',
    rotation: 28,
    stackOffset: { x: 125, y: 0 },
    hoverOffset: { x: -160, y: 100 },
  },
]

export const LandingCTA = memo(function LandingCTA() {
  const [isHovered, setIsHovered] = useState(false)
  const t = useTranslations('landing.cta')
  const locale = useLocale()
  const appHomeUrl = getAppUrl('/', locale)
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  return (
    <section className="bg-[#2563EB] py-16 md:py-20 lg:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left side - Text and Buttons */}
          <div className="space-y-8 md:space-y-10 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-poller-one text-black leading-tight">
              {t('titleLine1')}
              <br />
              <span className="text-[#1fde1f]">{t('titleLine2')}</span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start">
              <a
                href={appHomeUrl}
                {...appExternalAnchorProps}
                className="inline-flex items-center justify-center text-base lg:text-lg px-8 lg:px-16 py-2.5 lg:py-3 bg-black text-white font-bold rounded-xl border-2 border-transparent hover:bg-[#1fde1f] hover:text-black hover:border-black hover:border-dashed transition-colors"
              >
                {t('ctaPrimary')}
              </a>
              <Link
                href="https://uusd8j57636y.sg.larksuite.com/share/base/form/shrlgNBmyK5OBha9x1PFYWXnA3e?from=navigation"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 text-base lg:text-lg px-8 lg:px-12 py-2.5 lg:py-3 bg-white text-black font-bold rounded-xl border-2 border-[#131713] hover:bg-theme-pink hover:text-white hover:border-black hover:border-dashed transition-colors"
              >
                {t('ctaSecondary')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right side - Image Stack */}
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center">
            <div
              className="relative w-full h-full"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {images.map((image, index) => {
                const offset = isHovered ? image.hoverOffset : image.stackOffset

                return (
                  <div
                    key={image.src}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
                    style={{
                      transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) rotate(${image.rotation}deg) scale(${isHovered ? 0.9 : 1})`,
                      zIndex: index,
                    }}
                  >
                    <div className="w-[200px] h-[200px] lg:w-[280px] lg:h-[280px] rounded-[14px] overflow-hidden border-2 border-black/10 shadow-2xl">
                      <img
                        src={getCdnImageUrlWithSize(image.src, 280, 280)}
                        alt={`Creative showcase ${index + 1}`}
                        width={280}
                        height={280}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
