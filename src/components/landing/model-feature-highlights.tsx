import React from 'react'
import Image from 'next/image'
import { getImageKitImageUrlWithSize } from '@/lib/image-cdn'

interface FeatureHighlightItem {
  title: string
  description: string
}

interface ModelFeatureHighlightsProps {
  imageSrc?: string
  imageAlt?: string
  features: FeatureHighlightItem[]
}

export function ModelFeatureHighlights({
  imageSrc,
  imageAlt,
  features,
}: ModelFeatureHighlightsProps) {
  return (
    <section className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: '#FFD54F' }}>
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] items-stretch gap-6">
          <div className="relative flex items-center justify-center p-6 md:p-10">
            {imageSrc ? (
              <div className="relative w-full max-w-xs aspect-square">
                <Image
                  src={getImageKitImageUrlWithSize(imageSrc, 520, 520)}
                  alt={imageAlt || 'AI model feature visual'}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(min-width: 1024px) 260px, (min-width: 768px) 220px, 60vw"
                />
              </div>
            ) : null}
          </div>

          <div className="border-t md:border-t-0 md:border-l border-white/40 px-4 md:px-8 py-4 md:py-6">
            {features.map((feature, index) => {
              const isLast = index === features.length - 1
              const indexLabel = String(index + 1).padStart(3, '0')
              return (
                <div
                  key={feature.title}
                  className={`flex flex-col md:flex-row md:items-start gap-2 md:gap-6 py-4 md:py-5 ${
                    !isLast ? 'border-b border-white/40' : ''
                  }`}
                >
                  <div className="text-[10px] md:text-xs font-mono text-black/60 tracking-[0.12em] uppercase">
                    [{indexLabel}]
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <h3 className="text-lg md:text-xl font-poller-one text-black leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-xs md:text-sm text-black/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
