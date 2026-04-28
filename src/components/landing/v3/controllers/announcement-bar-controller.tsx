'use client'

import { memo, useEffect } from 'react'

export const AnnouncementBarController = memo(function AnnouncementBarController() {
  useEffect(() => {
    const root = document.documentElement
    const landing = document.querySelector<HTMLElement>('.landing-v3')
    const annBar = document.getElementById('annBar')
    const annClose = document.getElementById('annClose')
    if (!annBar || !annClose) return

    let raf = 0

    const setAnnHeight = () => {
      const h = annBar.classList.contains('is-dismissed') ? 0 : annBar.offsetHeight
      const visibleH = annBar.classList.contains('is-dismissed') ? 0 : Math.max(0, annBar.getBoundingClientRect().bottom)
      root.style.setProperty('--ann-bar-h', `${h}px`)
      root.style.setProperty('--ann-bar-visible-h', `${Math.min(h, visibleH)}px`)
      landing?.style.setProperty('--ann-bar-h', `${h}px`)
      landing?.style.setProperty('--ann-bar-visible-h', `${Math.min(h, visibleH)}px`)
    }

    const scheduleAnnHeight = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        setAnnHeight()
      })
    }

    if (window.sessionStorage.getItem('annBar.dismiss') === 'true') {
      annBar.classList.add('is-dismissed')
    }

    const onClose = () => {
      annBar.classList.add('is-dismissed')
      window.sessionStorage.setItem('annBar.dismiss', 'true')
      setAnnHeight()
    }

    annClose.addEventListener('click', onClose)
    window.addEventListener('resize', scheduleAnnHeight)
    window.addEventListener('scroll', scheduleAnnHeight, { passive: true })
    setAnnHeight()

    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      annClose.removeEventListener('click', onClose)
      window.removeEventListener('resize', scheduleAnnHeight)
      window.removeEventListener('scroll', scheduleAnnHeight)
    }
  }, [])

  return null
})
