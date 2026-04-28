'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { appExternalAnchorProps, getAppUrl } from '@/lib/app-url'

export function WhoIsOpenCreator() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const t = useTranslations('landing.whoIsOpenCreator')
  const locale = useLocale()
  const appHomeUrl = getAppUrl('/', locale)

  const handlePlayVideo = () => {
    setIsVideoLoaded(true)
  }

  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20 bg-[#1fde1f]">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-poller-one text-black mb-2">
            {t('title')}
          </h2>
          <p className="text-sm md:text-base text-white">{t('subtitle')}</p>
        </div>

        {/* Main Content - Left/Right Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 md:mb-16">
          {/* Left Side - Video */}
          <div>
            <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-black shadow-2xl">
              {!isVideoLoaded ? (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://i.ytimg.com/vi_webp/4BaUQpnbjpI/maxresdefault.webp")',
                    }}
                  />
                  <button
                    onClick={handlePlayVideo}
                    aria-label="Play"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-transparent hover:scale-110 transition-transform cursor-pointer z-10"
                  >
                    <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
                      <path
                        d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                        fill="#212121"
                        fillOpacity="0.8"
                        className="transition-all duration-100"
                      />
                      <path d="M 45,24 27,14 27,34" fill="#fff" />
                    </svg>
                  </button>
                </>
              ) : (
                <iframe
                  loading="lazy"
                  title="Youtube Video"
                  allow="presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  src="https://www.youtube.com/embed/4BaUQpnbjpI?iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=1"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                />
              )}
            </div>

            {/* CTA Buttons below video */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mt-6">
              <a
                href={appHomeUrl}
                {...appExternalAnchorProps}
                className="w-full inline-flex items-center justify-center text-base lg:text-lg px-8 lg:px-16 py-2.5 lg:py-3 bg-black text-white font-bold rounded-xl border-2 border-transparent hover:bg-[#1fde1f] hover:text-black hover:border-black hover:border-dashed transition-colors"
              >
                {t('getStarted')}
              </a>
              <Link
                href="https://torpid-breakfast-9f6.notion.site/Welcome-to-OpenCreator-World-170b97035ec480e3965bd7d8d0a3a26d"
                target="_blank"
                rel="noopener"
                className="w-full inline-flex items-center justify-center text-base lg:text-lg px-8 lg:px-12 py-2.5 lg:py-3 bg-white text-black font-bold rounded-xl border-2 border-[#131713] hover:bg-theme-pink hover:text-white hover:border-black hover:border-dashed transition-colors"
              >
                {t('learnMore')}
              </Link>
            </div>
          </div>

          {/* Right Side - Cards */}
          <div className="space-y-6 lg:space-y-8">
            {/* OpenCreator Card */}
            <div className="bg-white rounded-2xl border-2 border-black p-4 shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 flex-shrink-0">
                  <Image
                    src="/icons/logo_512.png"
                    alt="OpenCreator"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-poller-one text-black mb-1">
                    {t('openCreatorCard.title')}
                  </h3>
                  <p className="text-sm text-gray-600">{t('openCreatorCard.handle')}</p>
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                {t('openCreatorCard.description')}
              </p>
            </div>

            {/* Who is it for Card */}
            <div className="bg-white rounded-2xl border-2 border-black p-4 shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 flex-shrink-0">
                  <Image
                    src="https://ik.imagekit.io/opencreator/web/landing/who-is-it-for.png"
                    alt="Who is it for"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-poller-one text-black mb-1">
                    {t('whoIsItForCard.title')}
                  </h3>
                  <p className="text-sm text-gray-600">{t('whoIsItForCard.handle')}</p>
                </div>
              </div>
              <div className="space-y-2">
                <ul className="space-y-2 text-sm md:text-base text-gray-700">
                  {t.raw('whoIsItForCard.roles').map((role: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
