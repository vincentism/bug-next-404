'use client'

import React from 'react'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { HeroBackground } from '../hero-background'
import { AutoPlayVideo } from '../auto-play-video'
import { getImageKitImageUrlWithSize } from '@/lib/image-cdn'
import { appExternalAnchorProps } from '@/lib/app-url'

const badgeColorClasses = {
  blue: 'border-[#217EFF] text-[#217EFF]',
  green: 'border-[#1fde1f] text-[#1fde1f]',
  pink: 'border-theme-pink text-theme-pink',
} as const

export interface ModelHeroProps {
  modelName: string
  tagline: string
  description: string
  heroImage?: string
  heroVideo?: string
  capabilities: string[]
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  badge?: string
  badgeColor?: 'pink' | 'blue' | 'green'
}

export function ModelHero({
  modelName,
  tagline,
  description,
  heroImage,
  heroVideo,
  capabilities,
  ctaText = 'Try Now',
  ctaLink = '/',
  secondaryCtaText = 'View Pricing',
  secondaryCtaLink = '/pricing',
  badge,
  badgeColor = 'pink',
}: ModelHeroProps) {
  const normalizedHeroImage = heroImage ? getImageKitImageUrlWithSize(heroImage, 800, 1066) : undefined

  const badgeColorClass = badgeColorClasses[badgeColor]

  return (
    <section className="relative w-full py-12 md:py-16 bg-[#F7F7F7]">
      <HeroBackground />
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Top section with badge and tags */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {badge && (
            <span
              className={`px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-poller-one border-2 ${badgeColorClass}`}
            >
              {badge}
            </span>
          )}
          {capabilities.map((cap, index) => (
            <span key={index} className="text-sm text-gray-600">
              {cap}
            </span>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left side - Text content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-poller-one text-black leading-tight">
                {modelName}
              </h1>
              <p className="text-lg md:text-xl text-[#1fde1f] font-bold">{tagline}</p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">{description}</p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              {ctaLink.startsWith('http') ? (
                <a
                  href={ctaLink}
                  {...appExternalAnchorProps}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-[#1fde1f] font-poller-one font-bold text-sm md:text-base rounded-xl border-2 border-transparent hover:bg-[#1fde1f] hover:text-black hover:border-black hover:border-dashed transition-colors"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{ctaText}</span>
                </a>
              ) : (
                <Link
                  href={ctaLink}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-[#1fde1f] font-poller-one font-bold text-sm md:text-base rounded-xl border-2 border-transparent hover:bg-[#1fde1f] hover:text-black hover:border-black hover:border-dashed transition-colors"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{ctaText}</span>
                </Link>
              )}
              <Link
                href={secondaryCtaLink}
                className="inline-flex items-center justify-center text-sm md:text-base px-6 py-3 bg-white text-black font-bold rounded-xl border-2 border-[#131713] hover:bg-theme-pink hover:text-white hover:border-black hover:border-dashed transition-colors"
              >
                {secondaryCtaText}
              </Link>
            </div>
          </div>

          {/* Right side - Hero media (3:4 aspect ratio) */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-[320px] md:max-w-[400px]">
              {/* Main media frame */}
              <div className="relative aspect-[3/4] rounded-[28px] border-2 border-black bg-white overflow-hidden shadow-[8px_8px_0px_#000]">
                {heroVideo ? (
                  <AutoPlayVideo
                    src={heroVideo}
                    poster={normalizedHeroImage}
                    className="w-full h-full object-cover"
                  />
                ) : heroImage ? (
                  <Image
                    src={normalizedHeroImage || heroImage}
                    alt={`${modelName} showcase`}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Preview</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
