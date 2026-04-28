'use client'

import { memo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from './gsap-init'

export const CountUpController = memo(function CountUpController() {
  const scopeRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      document.querySelectorAll<HTMLElement>('.landing-v3 [data-count-to]').forEach(el => {
        const target = Number(el.dataset.countTo || 0)
        const format = (value: number) =>
          target >= 1000 ? Math.round(value).toLocaleString('en-US') : String(Math.round(value))

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          el.textContent = format(target)
          return
        }

        const obj = { value: 0 }
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              value: target,
              duration: 1.6,
              ease: 'power3.out',
              onUpdate: () => {
                el.textContent = format(obj.value)
              },
            })
          },
        })
      })
    },
    { scope: scopeRef }
  )

  return <div ref={scopeRef} hidden />
})
