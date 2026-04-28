'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useTranslations } from '@/i18n/client'
import { getCdnImageUrlWithSize } from '@/lib/image-cdn'
import { appExternalAnchorProps, getAppUrl } from '@/lib/app-url'

const LazyWhyDemo = dynamic(() => import('./why-demo').then(mod => mod.WhyDemo), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl animate-pulse" />
  ),
})

export function WhyOpenCreator() {
  const t = useTranslations('landing.whyOpenCreator')
  const locale = useLocale()
  const appHomeUrl = getAppUrl('/', locale)

  return (
    <section className="relative w-full bg-black py-12 md:py-16 lg:py-24 overflow-hidden">
      {/* Grid gradient background - centered at top, fading outward */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(64, 64, 64, 0.3) 0%, transparent 50%),
            linear-gradient(to right, rgba(64, 64, 64, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(64, 64, 64, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12 lg:mb-16" id="features">
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-poller-one text-white">
              {t('title')}
            </h2>

            {/* UFO Image with Framer Motion animation */}
            <motion.div
              className="hidden md:block w-[200px] h-auto"
              style={{
                transform: 'rotate(8deg)',
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [6, 12, 6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <motion.img
                src={getCdnImageUrlWithSize(
                  'https://ik.imagekit.io/opencreator/web/landing/why-opencreator/ufo.png',
                  200,
                  113
                )}
                alt="UFO"
                width={200}
                height={113}
                className="w-full h-auto drop-shadow-[0_16px_32px_rgba(0,0,0,0.6)]"
                loading="lazy"
                whileHover={{ scale: 1.1 }}
              />
            </motion.div>
          </div>
        </div>

        {/* Section 1: All-in-One AI Models */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-12 md:mb-16 lg:mb-24">
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-poller-one">
              <span className="text-[#1fde1f]">{t('section1.titleHighlight')}</span>
              <span className="text-[#A6A6A6]">{t('section1.titleRest')}</span>
            </h3>

            <p className="text-[#A6A6A6] text-sm md:text-base lg:text-lg leading-relaxed">
              {t('section1.description')}
            </p>

            <ul className="space-y-2 text-[#A6A6A6] text-sm md:text-base lg:text-lg">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('section1.bullets.0')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('section1.bullets.1')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('section1.bullets.2')}</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <a
                href={appHomeUrl}
                {...appExternalAnchorProps}
                className="inline-flex items-center justify-center px-5 lg:px-6 py-2.5 lg:py-3 bg-white text-black font-bold rounded-xl border-2 border-[#131713] hover:bg-theme-pink hover:text-white hover:border-black hover:border-dashed transition-colors text-sm lg:text-base"
              >
                {t('section1.ctaPrimary')}
              </a>
              <Link
                href="https://uusd8j57636y.sg.larksuite.com/share/base/form/shrlgNBmyK5OBha9x1PFYWXnA3e?from=navigation"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 px-5 lg:px-6 py-2.5 lg:py-3 bg-black text-white font-bold rounded-xl border-2 border-transparent hover:bg-[#1fde1f] hover:text-black hover:border-black hover:border-dashed transition-colors text-sm lg:text-base"
              >
                {t('section1.ctaSecondary')}
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </Link>
            </div>
          </div>

          {/* Right: Images */}
          <div className="relative">
            {/* Demo 1: Multi-Model Comparison */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-800 h-[300px] md:h-[350px] lg:h-[400px] bg-[#0a0a0a]">
              <LazyWhyDemo variant="demo1" className="w-full h-full" />
            </div>
          </div>
        </div>

        {/* Section 2: Seriously Great Content in Minutes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Demo 2: Fast Production */}
          <div className="relative rounded-2xl overflow-hidden border border-theme-pink h-[300px] md:h-[350px] lg:h-[400px] bg-[#0a0a0a]">
            <LazyWhyDemo variant="demo2" className="w-full h-full" />
          </div>

          {/* Right: Text Content */}
          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-poller-one">
              <span className="text-theme-pink">{t('section2.titleHighlight')}</span>{' '}
              <span className="text-[#A6A6A6]">{t('section2.titleRest')}</span>
            </h3>

            <p className="text-[#A6A6A6] text-sm md:text-base lg:text-lg leading-relaxed">
              {t('section2.description')}
            </p>

            <ul className="space-y-2 text-[#A6A6A6] text-sm md:text-base lg:text-lg">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('section2.bullets.0')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('section2.bullets.1')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{t('section2.bullets.2')}</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <a
                href={appHomeUrl}
                {...appExternalAnchorProps}
                className="inline-flex items-center justify-center px-5 lg:px-6 py-2.5 lg:py-3 bg-white text-black font-bold rounded-xl border-2 border-[#131713] hover:bg-theme-pink hover:text-white hover:border-black hover:border-dashed transition-colors text-sm lg:text-base"
              >
                {t('section2.ctaPrimary')}
              </a>
              <Link
                href="https://uusd8j57636y.sg.larksuite.com/share/base/form/shrlgNBmyK5OBha9x1PFYWXnA3e?from=navigation"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 px-5 lg:px-6 py-2.5 lg:py-3 bg-black text-white font-bold rounded-xl border-2 border-transparent hover:bg-[#1fde1f] hover:text-black hover:border-black hover:border-dashed transition-colors text-sm lg:text-base"
              >
                {t('section2.ctaSecondary')}
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
