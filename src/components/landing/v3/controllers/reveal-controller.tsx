'use client'

import { memo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from './gsap-init'

export const RevealController = memo(function RevealController() {
  const scopeRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.landing-v3 .reveal').forEach(el => el.classList.add('is-in'))
        return
      }

      ScrollTrigger.batch('.landing-v3 .reveal', {
        start: 'top 88%',
        once: true,
        onEnter: batch => {
          batch.forEach(el => {
            const delay = Number((el as HTMLElement).dataset.revealDelay || 0) / 1000
            gsap.delayedCall(delay, () => el.classList.add('is-in'))
          })
        },
      })
    },
    { scope: scopeRef }
  )

  return <div ref={scopeRef} hidden />
})
