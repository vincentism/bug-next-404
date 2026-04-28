'use client'

import React, { useEffect, useRef } from 'react'

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const offsetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    // Set canvas size
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drawDots()
    }

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw random scattered dots with varying opacity
      const dotCount = Math.floor((canvas.width * canvas.height) / 6000)

      for (let i = 0; i < dotCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const opacity = 0.1 + Math.random() * 0.3 // Random opacity between 0.1 and 0.4
        const size = 1 + Math.random() * 2 // Random size between 1 and 3

        ctx.fillStyle = `rgba(100, 100, 100, ${opacity})`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    resize()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  // Track mouse movement and smooth offset without re-rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      canvas.style.transform = 'translate(0px, 0px)'
      return
    }

    let isRunning = true
    let isPageVisible = document.visibilityState === 'visible'
    const maxOffset = 15

    const updateTransform = () => {
      if (!canvas) return
      const { x, y } = offsetRef.current
      canvas.style.transform = `translate(${x}px, ${y}px)`
    }

    const animate = () => {
      if (!isRunning || !isPageVisible) return

      const targetX = mouseRef.current.x * maxOffset
      const targetY = mouseRef.current.y * maxOffset
      const smoothing = 0.05
      const nextX = offsetRef.current.x + (targetX - offsetRef.current.x) * smoothing
      const nextY = offsetRef.current.y + (targetY - offsetRef.current.y) * smoothing

      offsetRef.current = { x: nextX, y: nextY }
      updateTransform()

      rafRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
        y: (e.clientY - window.innerHeight / 2) / window.innerHeight,
      }
    }

    const handleVisibilityChange = () => {
      isPageVisible = document.visibilityState === 'visible'
      if (isPageVisible && rafRef.current === null) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      isRunning = false
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 0,
        transition: 'transform 0.1s ease-out',
      }}
    />
  )
}
