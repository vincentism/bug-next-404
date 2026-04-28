'use client'

import React, { memo } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import { useLocale } from 'next-intl'
import { HeroBackground } from './hero-background'
import { useTranslations } from '@/i18n/client'
import { getCdnImageUrlWithSize } from '@/lib/image-cdn'
import { getAppUrl } from '@/lib/app-url'

export const Hero = memo(function Hero() {
  const t = useTranslations('landing.hero')
  const locale = useLocale()
  const appSkillsUrl = getAppUrl('/skills', locale)

  return (
    <section className="relative w-full overflow-hidden ">
      <HeroBackground />

      <div className="container mx-auto px-4 py-8 lg:p-16 lg:py-8 relative z-10 max-w-[1440px]">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-3 lg:space-y-4 pt-8 lg:pt-40">
              <h1 className="text-3xl md:text-4xl lg:text-6xl leading-tight font-poller-one">
                {t('titleLine1')}
                <br />
                {t('titleLine2')}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-[#1fde1f] font-bold">
                {t('tagline')}
              </p>
              <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-xl">
                {t('description')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <a
                href={appSkillsUrl}
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

          <div className="py-8 lg:py-20 hidden md:block">
            <div className="relative h-[350px] md:h-[450px] lg:h-[500px] scale-[0.8] md:scale-100 origin-center">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 md:left-20 space-y-2">
                <div className="relative">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl overflow-hidden border-2 border-black">
                    <img
                      src={getCdnImageUrlWithSize(
                        'https://ik.imagekit.io/opencreator/web/landing/models/flux.png',
                        64,
                        64
                      )}
                      alt="Flux model icon"
                      width={64}
                      height={64}
                      loading="lazy"
                    />
                  </div>
                  <img
                    src="https://ik.imagekit.io/opencreator/web/landing/models/flux-label.png"
                    alt="Flux label text"
                    width={46}
                    height={20}
                    className="mt-1 mx-auto"
                    loading="lazy"
                  />
                  <span
                    className="pointer-events-none absolute -top-4 -left-32 w-40 h-44 hidden lg:block"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 160 180" className="w-full h-full" fill="none">
                      <defs>
                        <marker
                          id="hero-connector-arrowhead"
                          markerWidth="8"
                          markerHeight="8"
                          refX="7"
                          refY="4"
                          orient="auto"
                          markerUnits="strokeWidth"
                        >
                          <path d="M0 0 L8 4 L0 8 Z" fill="black" />
                        </marker>
                      </defs>
                      <path
                        d="M20 0 L20 100 Q20 140 70 140 L120 140"
                        stroke="black"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        markerEnd="url(#hero-connector-arrowhead)"
                      />
                    </svg>
                  </span>
                </div>
                <div className="relative">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl overflow-hidden border-2 border-black">
                    <img
                      src={getCdnImageUrlWithSize(
                        'https://ik.imagekit.io/opencreator/web/landing/models/imagen3.png',
                        64,
                        64
                      )}
                      alt="Imagen 3 model icon"
                      width={64}
                      height={64}
                      loading="lazy"
                    />
                  </div>
                  <img
                    src="https://ik.imagekit.io/opencreator/web/landing/models/imagen3-label.png"
                    alt="Imagen 3 label text"
                    width={75}
                    height={20}
                    className="mt-1 mx-auto"
                    loading="lazy"
                  />
                </div>
                <div className="relative">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl overflow-hidden border-2 border-black">
                    <img
                      src={getCdnImageUrlWithSize(
                        'https://ik.imagekit.io/opencreator/web/landing/models/Ideogram.png',
                        64,
                        64
                      )}
                      alt="Ideogram model icon"
                      width={64}
                      height={64}
                      loading="lazy"
                    />
                  </div>
                  <img
                    src="https://ik.imagekit.io/opencreator/web/landing/models/Ideogram-label.png"
                    alt="Ideogram label text"
                    width={75}
                    height={20}
                    className="mt-1 mx-auto"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-72 md:h-72">
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src={getCdnImageUrlWithSize(
                      'https://ik.imagekit.io/opencreator/web/landing/models/recraft.png',
                      288,
                      288
                    )}
                    alt="Luma model showcase"
                    width={288}
                    height={288}
                    priority
                    unoptimized
                  />
                </div>
                <img
                  src="https://ik.imagekit.io/opencreator/web/landing/models/recraft-label.png"
                  alt="Luma label text"
                  width={82}
                  height={20}
                  className="mt-2 mx-auto"
                  loading="lazy"
                />
                {/* Arrow to top tile */}
                <img
                  src={getCdnImageUrlWithSize(
                    'https://ik.imagekit.io/opencreator/web/landing/arrow-top.png',
                    48,
                    128
                  )}
                  alt=""
                  width={48}
                  height={128}
                  className="pointer-events-none absolute -top-8 -right-12 w-12 h-32 hidden lg:block"
                  loading="lazy"
                />
                {/* Arrow to middle tile */}
                <img
                  src={getCdnImageUrlWithSize(
                    'https://ik.imagekit.io/opencreator/web/landing/arrow-middle.png',
                    48,
                    160
                  )}
                  alt=""
                  width={48}
                  height={160}
                  className="pointer-events-none absolute top-14 -right-12 w-12 h-40 hidden lg:block"
                  loading="lazy"
                />
                {/* Arrow to bottom tile */}
                <img
                  src={getCdnImageUrlWithSize(
                    'https://ik.imagekit.io/opencreator/web/landing/arrow-bottom.png',
                    48,
                    160
                  )}
                  alt=""
                  width={48}
                  height={160}
                  className="pointer-events-none absolute top-40 -right-12 w-12 h-40 hidden lg:block"
                  loading="lazy"
                />
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 -right-4 space-y-2">
                <div className="relative">
                  <div className="w-24 h-24 md:w-[135px] md:h-[135px] rounded-2xl overflow-hidden border-2 border-black">
                    <img
                      src={getCdnImageUrlWithSize(
                        'https://ik.imagekit.io/opencreator/web/landing/models/luma.gif',
                        135,
                        135
                      )}
                      alt="Luma preview tile"
                      width={135}
                      height={135}
                      loading="lazy"
                    />
                  </div>
                  <img
                    src="https://ik.imagekit.io/opencreator/web/landing/models/luma-label.png"
                    alt="Luma label text"
                    width={62}
                    height={20}
                    className="mt-1 mx-auto"
                    loading="lazy"
                  />
                </div>
                <div className="relative">
                  <div className="w-24 h-24 md:w-[135px] md:h-[135px] rounded-2xl overflow-hidden border-2 border-black">
                    <img
                      src={getCdnImageUrlWithSize(
                        'https://ik.imagekit.io/opencreator/web/landing/models/hailuo.gif',
                        135,
                        135
                      )}
                      alt="Hailuo preview tile"
                      width={135}
                      height={135}
                      loading="lazy"
                    />
                  </div>
                  <img
                    src="https://ik.imagekit.io/opencreator/web/landing/models/hailuo-label.png"
                    alt="Hailuo label text"
                    width={62}
                    height={20}
                    className="mt-1 mx-auto"
                    loading="lazy"
                  />
                </div>
                <div className="relative">
                  <div className="w-24 h-24 md:w-[135px] md:h-[135px] rounded-2xl overflow-hidden border-2 border-black">
                    <img
                      src={getCdnImageUrlWithSize(
                        'https://ik.imagekit.io/opencreator/web/landing/models/kling.gif',
                        135,
                        135
                      )}
                      alt="Kling preview tile"
                      width={135}
                      height={135}
                      loading="lazy"
                    />
                  </div>
                  <img
                    src="https://ik.imagekit.io/opencreator/web/landing/models/kling-label.png"
                    alt="Kling label text"
                    width={62}
                    height={20}
                    className="mt-1 mx-auto"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="absolute top-0 -left-16 w-36 md:w-52">
                <img
                  src={getCdnImageUrlWithSize(
                    'https://ik.imagekit.io/opencreator/web/landing/models/text-block.png',
                    208,
                    120
                  )}
                  alt="Creative workflow text block"
                  width={208}
                  height={120}
                  loading="lazy"
                />
                <img
                  src="https://ik.imagekit.io/opencreator/web/landing/models/text-label.png"
                  alt="Creative workflow label"
                  width={64}
                  height={24}
                  className="w-16 mt-1"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
