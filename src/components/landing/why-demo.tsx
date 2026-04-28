'use client'

import React from 'react'
import { getCdnImageUrlWithSize, getImageKitVideoUrl } from '@/lib/image-cdn'

interface WhyDemoProps {
  className?: string
  variant: 'demo1' | 'demo2'
}

const demoImages = [
  'https://ik.imagekit.io/opencreator/images/result-XvtajZFc-oJFJoh2bBJVP5WdTsvEdr_O.png',
  'https://ik.imagekit.io/opencreator/images/image_20251215_1a179840-5829-466f-baf5-60022582937a.png',
  'https://ik.imagekit.io/opencreator/images/image_20251215_07045557-4b5d-428d-b7e4-9499ad01488c.png',
  'https://ik.imagekit.io/opencreator/images/result-gnTN-g1pST2YIFlrD3_jVafTofamgBoI.png',
]

const demoVideo = 'https://ik.imagekit.io/opencreator/uploads/i4w2_mpuXf.mp4'

export function WhyDemo({ className, variant }: WhyDemoProps) {
  if (variant === 'demo2') {
    return (
      <div className={`relative h-full w-full overflow-hidden bg-black ${className || ''}`}>
        <video
          src={getImageKitVideoUrl(demoVideo)}
          className="h-full w-full object-cover opacity-90"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1fde1f]">From concept to video</p>
          <p className="mt-2 text-lg font-bold text-white">Batch produce polished AI content in minutes.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`grid h-full w-full grid-cols-2 gap-3 bg-black p-4 ${className || ''}`}>
      {demoImages.map((image, index) => (
        <div key={image} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <img
            src={getCdnImageUrlWithSize(image, 360, 360)}
            alt={`OpenCreator AI result ${index + 1}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute left-3 top-3 rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold text-white">
            Model {index + 1}
          </div>
        </div>
      ))}
    </div>
  )
}

export default WhyDemo
