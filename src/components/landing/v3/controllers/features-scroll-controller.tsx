'use client'

import { memo, useEffect } from 'react'
import { clamp01 } from './animation-utils'

export const FeaturesScrollController = memo(function FeaturesScrollController() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('.features[data-features-pin]')
    if (!section) return

    const scenes = Array.from(section.querySelectorAll<HTMLElement>('.features__scene'))
    const feed = section.querySelector<HTMLElement>('[data-f1-feed]')
    const body = feed?.querySelector<HTMLElement>('.f1-feed__body')
    const track = feed?.querySelector<HTMLElement>('.f1-feed__track')
    const cards = track ? (Array.from(track.children) as HTMLElement[]) : []
    const desktopQuery = window.matchMedia('(min-width: 960px)')
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let lastActive = -1
    let feedRaf = 0
    let scrollRaf = 0

    const clearActive = () => {
      if (lastActive === -1) return
      scenes.forEach(scene => scene.setAttribute('data-active', '0'))
      lastActive = -1
    }

    const applyProgress = (progress: number) => {
      const idx = Math.min(scenes.length - 1, Math.floor(progress * scenes.length * 0.9999))
      if (idx === lastActive) return
      lastActive = idx
      scenes.forEach((scene, index) => scene.setAttribute('data-active', index <= idx ? '1' : '0'))
    }

    const updateFeed = () => {
      if (!body || !cards.length) return
      const bodyTopY = body.getBoundingClientRect().top
      let topCard: HTMLElement | null = null
      let topCardRel = Infinity
      cards.forEach(card => {
        const cardTopRel = card.getBoundingClientRect().top - bodyTopY
        if (cardTopRel >= -10 && cardTopRel <= 96 && cardTopRel < topCardRel) {
          topCard = card
          topCardRel = cardTopRel
        }
      })
      cards.forEach(card => {
        if (card.dataset.heat === 'hot') card.classList.toggle('is-top', card === topCard)
      })
      feedRaf = window.requestAnimationFrame(updateFeed)
    }

    const updateFromScroll = () => {
      if (!desktopQuery.matches || reducedQuery.matches) {
        scenes.forEach(scene => scene.setAttribute('data-active', '1'))
        lastActive = scenes.length - 1
        return
      }

      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 1
      const travel = section.offsetHeight - viewportHeight
      if (travel <= 0) {
        applyProgress(1)
        return
      }

      const raw = -rect.top / travel
      if (raw < -0.05) {
        clearActive()
        return
      }

      applyProgress(clamp01(raw))
    }

    const requestScrollUpdate = () => {
      if (scrollRaf) return
      scrollRaf = window.requestAnimationFrame(() => {
        scrollRaf = 0
        updateFromScroll()
      })
    }

    feedRaf = window.requestAnimationFrame(updateFeed)
    window.addEventListener('scroll', requestScrollUpdate, { passive: true })
    window.addEventListener('resize', requestScrollUpdate)
    desktopQuery.addEventListener('change', requestScrollUpdate)
    reducedQuery.addEventListener('change', requestScrollUpdate)
    requestScrollUpdate()

    return () => {
      if (feedRaf) window.cancelAnimationFrame(feedRaf)
      if (scrollRaf) window.cancelAnimationFrame(scrollRaf)
      window.removeEventListener('scroll', requestScrollUpdate)
      window.removeEventListener('resize', requestScrollUpdate)
      desktopQuery.removeEventListener('change', requestScrollUpdate)
      reducedQuery.removeEventListener('change', requestScrollUpdate)
    }
  }, [])

  return null
})
