'use client'
import dynamic from 'next/dynamic'
const UTMTracker = dynamic(() => import('@/components/UTMTracker'), { ssr: false })
const TranslationDetector = dynamic(
  () => import('@/components/translation-detector').then(m => ({ default: m.TranslationDetector })),
  { ssr: false }
)

/**
 * 非关键追踪/检测组件：hydration 后再加载，避免阻塞首屏。
 */
export function LazyTrackers() {
  return (
    <>
      <UTMTracker />
      <TranslationDetector />
    </>
  )
}
