'use client'

import { memo, useEffect } from 'react'
import { clamp01, type Point } from './animation-utils'

export const PositioningScrollController = memo(function PositioningScrollController() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('.positioning[data-positioning-pin]')
    if (!section) return

    const typedEl = section.querySelector<HTMLElement>('.pm-msg-user')
    const typedSpan = section.querySelector<HTMLElement>('.pm-msg-user .pm-typed')
    const caretEl = section.querySelector<HTMLElement>('.pm-msg-user .pm-caret')
    const fullText = typedEl?.dataset.full ?? ''
    const thinkEl = section.querySelector<HTMLElement>('.pm-think')
    const thinkLabel = thinkEl?.querySelector<HTMLElement>('.pm-think-label')
    const msgs = Array.from(section.querySelectorAll<HTMLElement>('.pm-msg'))
    const nodes = Array.from(section.querySelectorAll<HTMLElement>('.pm-node'))
    const edges = Array.from(section.querySelectorAll<SVGPathElement>('.pm-edges path'))
    const viewport = section.querySelector<HTMLElement>('.pm-viewport')
    const edgesSvg = section.querySelector<SVGSVGElement>('.pm-edges')
    const stream = section.querySelector<HTMLElement>('.pm-chat-stream')
    const canvasEl = section.querySelector<HTMLElement>('.pm-canvas')
    const canvasTabs = Array.from(section.querySelectorAll<HTMLElement>('.pm-canvas-tab[data-tab]'))
    const pinMap = new Map<string, HTMLElement>()
    const desktopQuery = window.matchMedia('(min-width: 960px)')
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let rafId = 0

    section.querySelectorAll<HTMLElement>('.pm-pin-dot[data-pin]').forEach(dot => {
      if (dot.dataset.pin) pinMap.set(dot.dataset.pin, dot)
    })

    const pinCenter = (key: string | null, hostRect: DOMRect): Point | null => {
      if (!key) return null
      const el = pinMap.get(key)
      if (!el) return null
      const rect = el.getBoundingClientRect()
      return {
        x: rect.left + rect.width / 2 - hostRect.left,
        y: rect.top + rect.height / 2 - hostRect.top,
      }
    }

    const buildPath = (a: Point, b: Point) => {
      const dx = Math.max(30, Math.abs(b.x - a.x) * 0.45)
      return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} C ${(a.x + dx).toFixed(1)} ${a.y.toFixed(1)}, ${(b.x - dx).toFixed(1)} ${b.y.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
    }

    const recomputeEdges = () => {
      if (!viewport || !edgesSvg) return
      const host = viewport.getBoundingClientRect()
      edgesSvg.setAttribute('viewBox', `0 0 ${host.width} ${host.height}`)
      edgesSvg.style.width = `${host.width}px`
      edgesSvg.style.height = `${host.height}px`
      edges.forEach(path => {
        const a = pinCenter(path.dataset.src ?? null, host)
        const b = pinCenter(path.dataset.dst ?? null, host)
        if (!a || !b) return
        path.setAttribute('d', buildPath(a, b))
        const len = Math.hypot(b.x - a.x, b.y - a.y) * 1.4 + 40
        path.style.strokeDasharray = `${len}`
        path.style.setProperty('--edge-len', len.toFixed(0))
        if (path.dataset.show !== '1') path.style.strokeDashoffset = `${len}`
      })
    }

    const applyProgress = (p: number) => {
      section.style.setProperty('--p', p.toFixed(3))
      const msgThr = [0.02, 0.1, 0.18, 0.26]
      let lastVisibleIndex = -1
      msgs.forEach((msg, index) => {
        const show = p >= (msgThr[index] ?? 1)
        msg.setAttribute('data-show', show ? '1' : '0')
        if (show) lastVisibleIndex = index
      })
      const lastVisible = lastVisibleIndex >= 0 ? msgs[lastVisibleIndex] : null
      if (stream && lastVisible) {
        const lastBottom = lastVisible.offsetTop + lastVisible.offsetHeight
        const overflow = lastBottom - stream.clientHeight
        stream.scrollTop = overflow > 0 ? overflow + 12 : 0
      }

      if (typedSpan) {
        const typeP = clamp01((p - 0.02) / 0.08)
        typedSpan.textContent = fullText.slice(0, Math.round(fullText.length * typeP))
        if (caretEl) caretEl.style.opacity = typeP < 1 ? '' : '0'
      }

      if (thinkEl) {
        thinkEl.setAttribute('data-open', p >= 0.14 && p < 0.3 ? '1' : '0')
        if (thinkLabel) thinkLabel.textContent = p < 0.13 ? 'Thinking...' : 'Thought for 8 seconds'
      }

      const nodeThr = [0.34, 0.42, 0.5]
      const workThr = [0.42, 0.5, 0.58]
      const doneThr = [0.58, 0.66, 0.74]
      nodes.forEach((node, index) => {
        node.setAttribute('data-show', p >= nodeThr[index] ? '1' : '0')
        node.setAttribute(
          'data-state',
          p >= doneThr[index] ? 'complete' : p >= workThr[index] ? 'working' : 'idle'
        )
      })

      const edgeThr = [0.42, 0.52]
      const flowThr = [0.48, 0.58]
      const compThr = [0.66, 0.74]
      edges.forEach((edge, index) => {
        const show = p >= edgeThr[index]
        edge.setAttribute('data-show', show ? '1' : '0')
        if (show) edge.style.strokeDashoffset = '0'
        if (p >= compThr[index]) edge.setAttribute('data-flow', 'complete')
        else if (p >= flowThr[index]) edge.setAttribute('data-flow', 'running')
        else edge.removeAttribute('data-flow')
      })

      const activeTab = p >= 0.7 ? 'preview' : 'canvas'
      canvasEl?.setAttribute('data-view', activeTab)
      canvasTabs.forEach(tab =>
        tab.setAttribute('data-active', tab.dataset.tab === activeTab ? '1' : '0')
      )
    }

    const updateFromScroll = () => {
      if (!desktopQuery.matches || reducedQuery.matches) {
        applyProgress(1)
        thinkEl?.setAttribute('data-open', '1')
        canvasEl?.setAttribute('data-view', 'preview')
        canvasTabs.forEach(tab =>
          tab.setAttribute('data-active', tab.dataset.tab === 'preview' ? '1' : '0')
        )
        recomputeEdges()
        return
      }

      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 1
      const travel = section.offsetHeight - viewportHeight
      const progress = travel > 0 ? clamp01(-rect.top / travel) : 1
      applyProgress(progress)
      recomputeEdges()
    }

    const requestUpdate = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(() => {
        rafId = 0
        updateFromScroll()
      })
    }

    const imageListeners: Array<() => void> = []
    section.querySelectorAll<HTMLImageElement>('.pm-node img').forEach(img => {
      if (img.complete) return
      img.addEventListener('load', requestUpdate, { once: true })
      imageListeners.push(() => img.removeEventListener('load', requestUpdate))
    })

    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    desktopQuery.addEventListener('change', requestUpdate)
    reducedQuery.addEventListener('change', requestUpdate)
    document.fonts?.ready.then(requestUpdate).catch(() => {})
    requestUpdate()

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      desktopQuery.removeEventListener('change', requestUpdate)
      reducedQuery.removeEventListener('change', requestUpdate)
      imageListeners.forEach(cleanup => cleanup())
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return null
})
