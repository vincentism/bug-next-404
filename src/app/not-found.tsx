'use client'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import { motion } from 'framer-motion'
// eslint-disable-next-line no-restricted-imports
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import * as Sentry from '@sentry/nextjs'

const NotFound = () => {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)
  const reportedRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined' || reportedRef.current) return
    reportedRef.current = true

    const path = window.location.pathname
    const search = window.location.search
    const href = window.location.href

    // 让当前页的 transaction 带上 not_found 状态，Traces 里可用 span.status is not_found 筛选
    const activeSpan = Sentry.getActiveSpan()
    const rootSpan = activeSpan ? Sentry.getRootSpan(activeSpan) : undefined
    if (rootSpan && typeof rootSpan.setStatus === 'function') {
      rootSpan.setStatus(Sentry.getSpanStatusFromHttpCode(404))
    }

    Sentry.captureMessage('Page not found (404)', {
      level: 'warning',
      tags: { type: '404' },
      extra: { path, search, href },
    })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (countdown <= 0) {
      router.push('/')
    }
  }, [countdown, router])

  return (
    <div className="relative w-full h-screen bg-white text-black flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-center px-4 animate-in fade-in zoom-in duration-500 max-w-3xl">
        {/* Brand Green Decor Element */}
        <div className="mb-8 relative flex items-center justify-center">
          <div className="text-[120px] md:text-[200px] leading-none font-poller-one text-black select-none tracking-tighter relative z-10">
            404
          </div>

          {/* UFO Animation - Flying next to 404 */}
          <motion.div
            className="absolute -right-16 -top-16 md:-right-32 md:-top-24 w-[120px] md:w-[200px] z-20 pointer-events-none"
            initial={{ rotate: 8 }}
            animate={{
              y: [0, -20, 0],
              rotate: [6, 12, 6],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <img
              src="https://ik.imagekit.io/opencreator/web/landing/why-opencreator/ufo.png"
              alt="Lost Alien"
              width={200}
              height={113}
              className="w-full h-auto drop-shadow-xl"
            />
          </motion.div>

          {/* 绿色高亮装饰，呼应网站风格 */}
          <div className="absolute -bottom-2 left-0 w-full h-4 md:h-8 bg-theme-green -z-10 rotate-[-1deg] opacity-80" />
        </div>

        <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight z-10">
          Oops! Page not found.
        </h2>

        <p className="max-w-[500px] text-gray-500 text-base md:text-lg mb-10 leading-relaxed font-medium z-10">
          The page you are looking for might have been removed, had its name changed, or is
          temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 z-10">
          <Button
            onClick={() => router.push('/')}
            className="h-12 px-8 rounded-full bg-black text-white hover:bg-black/80 font-bold text-base transition-all hover:scale-105 shadow-xl shadow-black/10"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home ({countdown}s)
          </Button>
        </div>
      </div>

      {/* 底部绿色装饰块，呼应首页底部 */}
      <div className="absolute bottom-0 w-full h-2 md:h-4 bg-theme-green" />
    </div>
  )
}

export default NotFound
