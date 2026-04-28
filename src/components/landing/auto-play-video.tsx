'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import { getImageKitPosterUrl, getImageKitVideoUrl } from '@/lib/image-cdn'

type AutoPlayVideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  disabled?: boolean
}

export function AutoPlayVideo({
  disabled = false,
  muted = true,
  playsInline = true,
  loop = true,
  preload = 'metadata',
  poster,
  src,
  ...rest
}: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const normalizedSrc = useMemo(
    () => (typeof src === 'string' ? getImageKitVideoUrl(src) : src),
    [src]
  )
  const normalizedPoster = useMemo(
    () => (typeof poster === 'string' ? getImageKitPosterUrl(poster) : poster),
    [poster]
  )

  useEffect(() => {
    if (disabled) return

    const video = videoRef.current
    if (!video) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      video.pause()
      return
    }

    let isInView = true
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        isInView = entry?.isIntersecting ?? true
        if (document.visibilityState !== 'visible') {
          video.pause()
          return
        }
        if (isInView) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: '160px' }
    )

    observer.observe(video)

    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') {
        video.pause()
        return
      }
      if (isInView) {
        video.play().catch(() => {})
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [disabled])

  return (
    <video
      ref={videoRef}
      muted={muted}
      playsInline={playsInline}
      loop={loop}
      preload={preload}
      poster={normalizedPoster}
      src={normalizedSrc}
      {...rest}
    />
  )
}
