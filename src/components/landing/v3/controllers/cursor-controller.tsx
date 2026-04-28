'use client'

import { memo, useEffect } from 'react'

export const CursorController = memo(function CursorController() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const cursor = document.getElementById('cursor')
    const cursorLabel = cursor?.querySelector<HTMLElement>('[data-cursor-label]')
    if (!cursor || !cursorLabel) return

    if (!canHover || reduced) {
      cursor.style.display = 'none'
      return
    }

    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let cx = tx
    let cy = ty
    let cursorFrame = 0
    const labels: Record<string, string> = { open: 'Open', play: 'Play', view: 'View' }

    const onMouseMove = (event: MouseEvent) => {
      tx = event.clientX
      ty = event.clientY
    }

    const tick = () => {
      cx += (tx - cx) * 0.2
      cy += (ty - cy) * 0.2
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`
      const el = document.elementFromPoint(cx, cy)
      const host = el?.closest('[data-surface]') as HTMLElement | null
      const surface = host?.dataset.surface
      cursor.classList.toggle('on-ink', surface === 'ink')
      cursor.classList.toggle('on-green', surface === 'green')
      cursorFrame = window.requestAnimationFrame(tick)
    }

    const onMouseOver = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest('[data-cursor]') as HTMLElement | null
      if (!target) return
      const kind = target.dataset.cursor ?? ''
      cursor.classList.add('is-expanded')
      if (labels[kind]) {
        cursor.classList.add('is-label')
        cursorLabel.textContent = labels[kind]
      }
    }

    const onMouseOut = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest('[data-cursor]')
      if (!target) return
      cursor.classList.remove('is-expanded', 'is-label')
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseover', onMouseOver)
    window.addEventListener('mouseout', onMouseOut)
    cursorFrame = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mouseout', onMouseOut)
      window.cancelAnimationFrame(cursorFrame)
    }
  }, [])

  return null
})
