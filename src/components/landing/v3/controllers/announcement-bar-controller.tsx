'use client'

import { memo, useEffect } from 'react'

export const AnnouncementBarController = memo(function AnnouncementBarController() {
  useEffect(() => {
    const root = document.documentElement
    const annBar = document.getElementById('annBar')
    const annClose = document.getElementById('annClose')
    if (!annBar || !annClose) return

    const setAnnHeight = () => {
      const h = annBar.classList.contains('is-dismissed') ? 0 : annBar.offsetHeight
      root.style.setProperty('--ann-bar-h', `${h}px`)
      document.querySelector<HTMLElement>('.landing-v3')?.style.setProperty('--ann-bar-h', `${h}px`)
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
    window.addEventListener('resize', setAnnHeight)
    setAnnHeight()

    return () => {
      annClose.removeEventListener('click', onClose)
      window.removeEventListener('resize', setAnnHeight)
    }
  }, [])

  return null
})
