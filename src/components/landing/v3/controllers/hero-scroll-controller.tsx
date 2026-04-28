'use client'

import { memo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { clamp01, easeInOutQuad, type Point } from './animation-utils'
import { gsap, ScrollTrigger } from './gsap-init'

export const HeroScrollController = memo(function HeroScrollController() {
  const scopeRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = document.querySelector<HTMLElement>('.hero--v3[data-hero-pin]')
      if (!section) return

      const pinEl = section.querySelector<HTMLElement>('.hero__pin')
      if (!pinEl) return

      const stageA = section.querySelector<HTMLElement>('.hero__stage-a')
      const stageB = section.querySelector<HTMLElement>('.hero__stage-b')
      const inlineDot = section.querySelector<HTMLElement>('.hero__dot-inline')
      const composerAct = section.querySelector<HTMLElement>('[data-hero-composer]')
      const composerTyped = section.querySelector<HTMLElement>('.hero__composer-typed')
      const composerCaret = section.querySelector<HTMLElement>('.hero__composer-caret')
      const composerFull = composerTyped?.dataset.full ?? ''
      const cursorEl = section.querySelector<HTMLElement>('.hero__cursor')
      const catItems = Array.from(section.querySelectorAll<HTMLElement>('[data-cat-nav] li'))
      const cats = ['ugc', 'brand', 'social', 'product', 'stories']
      const catStart = 0.52
      const catEnd = 1
      let originCache: Point | null = null
      let targetCache: Point | null = null
      let motionPathSvg: SVGSVGElement | null = null
      let motionPathEl: SVGPathElement | null = null
      let cursorTween: ReturnType<typeof gsap.to> | null = null
      let cursorTravelProgress = 0
      let restoreFrame = 0
      let lastCat = -1

      const restoreCssVar = (el: HTMLElement, name: string, value: string) => {
        if (value) el.style.setProperty(name, value)
        else el.style.removeProperty(name)
      }

      const ensureMotionPath = () => {
        if (motionPathSvg && motionPathEl) return
        const ns = 'http://www.w3.org/2000/svg'
        motionPathSvg = document.createElementNS(ns, 'svg')
        motionPathEl = document.createElementNS(ns, 'path')
        motionPathSvg.setAttribute('aria-hidden', 'true')
        motionPathSvg.setAttribute('focusable', 'false')
        motionPathEl.setAttribute('fill', 'none')
        motionPathEl.setAttribute('stroke', 'none')
        motionPathSvg.appendChild(motionPathEl)
        Object.assign(motionPathSvg.style, {
          position: 'absolute',
          inset: '0',
          zIndex: '-1',
          width: '100%',
          height: '100%',
          overflow: 'visible',
          opacity: '0',
          pointerEvents: 'none',
        })
        pinEl.appendChild(motionPathSvg)
      }

      const rebuildCursorTween = () => {
        if (!cursorEl || !motionPathEl) return
        cursorTween?.kill()
        cursorTween = gsap.to(cursorEl, {
          duration: 1,
          ease: 'none',
          paused: true,
          overwrite: true,
          motionPath: {
            path: motionPathEl,
            align: motionPathEl,
            alignOrigin: [0.5, 0.5],
          },
        })
        cursorTween.progress(cursorTravelProgress)
      }

      const updateMotionPath = () => {
        if (!originCache || !targetCache || !motionPathSvg || !motionPathEl) return
        const pinRect = pinEl.getBoundingClientRect()
        motionPathSvg.setAttribute('viewBox', `0 0 ${pinRect.width} ${pinRect.height}`)
        motionPathSvg.setAttribute('width', `${pinRect.width}`)
        motionPathSvg.setAttribute('height', `${pinRect.height}`)

        const dx = targetCache.x - originCache.x
        const dy = targetCache.y - originCache.y
        const c1x = originCache.x + dx * 0.15 + Math.sign(dx || 1) * 60
        const c1y = originCache.y + dy * 0.05 - 40
        const c2x = originCache.x + dx * 0.7
        const c2y = originCache.y + dy * 0.75
        motionPathEl.setAttribute(
          'd',
          `M ${originCache.x.toFixed(1)} ${originCache.y.toFixed(1)} C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${targetCache.x.toFixed(1)} ${targetCache.y.toFixed(1)}`
        )
        rebuildCursorTween()
      }

      const measureAnchors = () => {
        const savedSaP = section.style.getPropertyValue('--sa-p')
        const savedSectionTransition = section.style.transition
        const savedStageATransition = stageA?.style.transition ?? ''
        const savedComposerTransition = composerAct?.style.transition ?? ''
        const savedCaP = composerAct?.style.getPropertyValue('--ca-p') ?? ''
        const savedCaFade = composerAct?.style.getPropertyValue('--ca-fade') ?? ''

        if (restoreFrame) window.cancelAnimationFrame(restoreFrame)
        section.style.transition = 'none'
        if (stageA) stageA.style.transition = 'none'
        if (composerAct) composerAct.style.transition = 'none'
        section.style.setProperty('--sa-p', '0')
        composerAct?.style.setProperty('--ca-p', '1')
        composerAct?.style.setProperty('--ca-fade', '0')

        void section.offsetHeight
        const pinRect = pinEl.getBoundingClientRect()
        if (inlineDot) {
          const rect = inlineDot.getBoundingClientRect()
          originCache = { x: rect.left - pinRect.left + rect.width / 2, y: rect.top - pinRect.top + rect.height / 2 }
        }
        const sendBtn = composerAct?.querySelector<HTMLElement>('.hero__composer-send')
        if (sendBtn) {
          const rect = sendBtn.getBoundingClientRect()
          targetCache = { x: rect.left - pinRect.left + rect.width / 2, y: rect.top - pinRect.top + rect.height / 2 }
        }
        updateMotionPath()

        restoreCssVar(section, '--sa-p', savedSaP)
        if (composerAct) {
          restoreCssVar(composerAct, '--ca-p', savedCaP)
          restoreCssVar(composerAct, '--ca-fade', savedCaFade)
        }

        void section.offsetHeight
        restoreFrame = window.requestAnimationFrame(() => {
          section.style.transition = savedSectionTransition
          if (stageA) stageA.style.transition = savedStageATransition
          if (composerAct) composerAct.style.transition = savedComposerTransition
        })
      }

      const applyCursor = (ph: number) => {
        if (!cursorEl) return
        cursorEl.style.setProperty('--cursor-op', clamp01((ph - 0.02) / 0.03).toFixed(3))
        cursorTravelProgress = easeInOutQuad(clamp01((ph - 0.04) / 0.26))
        cursorTween?.progress(cursorTravelProgress)
        let state = 'idle'
        if (ph >= 0.44) state = 'dissolve'
        else if (ph >= 0.34) state = 'clicked'
        else if (ph >= 0.3) state = 'landed'
        cursorEl.setAttribute('data-cursor-state', state)
        gsap.set(cursorEl, { scale: state === 'clicked' ? 0.82 : 1 })
      }

      const applyComposerAct = (ph: number) => {
        const saP = clamp01((ph - 0.04) / 0.18)
        const caP = clamp01((ph - 0.04) / 0.18)
        const caFade = clamp01((ph - 0.44) / 0.08)
        section.style.setProperty('--sa-p', saP.toFixed(3))
        composerAct?.style.setProperty('--ca-p', caP.toFixed(3))
        composerAct?.style.setProperty('--ca-fade', caFade.toFixed(3))
        if (composerTyped) {
          const typeP = clamp01((ph - 0.1) / 0.2)
          composerTyped.textContent = composerFull.slice(0, Math.round(composerFull.length * typeP))
          if (composerCaret) composerCaret.style.opacity = typeP < 1 || ph < 0.34 ? '' : '0'
        }
        composerAct?.setAttribute('data-send', ph >= 0.34 && ph < 0.46 ? 'pressed' : 'idle')
      }

      const computeActiveCat = (ph: number) => {
        if (ph <= catStart) return 0
        if (ph >= catEnd) return cats.length - 1
        return Math.max(0, Math.min(cats.length - 1, Math.floor(((ph - catStart) / (catEnd - catStart)) * cats.length)))
      }

      const applyActiveCat = (idx: number) => {
        if (idx === lastCat) return
        lastCat = idx
        stageB?.setAttribute('data-active-cat', cats[idx])
        catItems.forEach((item, index) => item.classList.toggle('is-active', index === idx))
      }

      const applyProgress = (ph: number) => {
        section.style.setProperty('--ph', ph.toFixed(3))
        section.setAttribute('data-phase', ph > 0.56 ? 'b' : 'a')
        stageB?.setAttribute('data-active', ph > 0.5 ? '1' : '0')
        applyComposerAct(ph)
        applyCursor(ph)
        applyActiveCat(computeActiveCat(ph))
      }

      const desktopQuery = '(min-width: 960px)'
      const reducedQuery = '(prefers-reduced-motion: reduce)'
      ScrollTrigger.matchMedia({
        [desktopQuery]: () => {
          ensureMotionPath()
          const refreshTimers: number[] = []
          const reanchor = () => {
            measureAnchors()
            if (trigger) applyProgress(trigger.progress)
          }
          let trigger: ReturnType<typeof ScrollTrigger.create> | null = null
          measureAnchors()
          trigger = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            pin: pinEl,
            pinSpacing: false,
            invalidateOnRefresh: true,
            onRefresh: reanchor,
            onUpdate: self => applyProgress(self.progress),
          })
          document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {})
          refreshTimers.push(window.setTimeout(() => ScrollTrigger.refresh(), 80))
          refreshTimers.push(window.setTimeout(() => ScrollTrigger.refresh(), 400))
          applyProgress(trigger.progress)
          return () => {
            refreshTimers.forEach(timer => window.clearTimeout(timer))
            if (restoreFrame) window.cancelAnimationFrame(restoreFrame)
            trigger?.kill()
            cursorTween?.kill()
            motionPathSvg?.remove()
            motionPathSvg = null
            motionPathEl = null
            cursorTween = null
          }
        },
        [reducedQuery]: () => {
          applyProgress(0)
        },
      })
    },
    { scope: scopeRef }
  )

  return <div ref={scopeRef} hidden />
})
