'use client'

import { useState, useCallback, useRef, useEffect } from 'react'

export interface WorkflowSceneConfig {
  id: string
  title: string
  duration: number // 每个场景的播放时长（毫秒）
}

interface UseWorkflowCarouselOptions {
  scenes: WorkflowSceneConfig[]
  autoPlay?: boolean
}

interface UseWorkflowCarouselReturn {
  activeIndex: number
  progress: number
  setActiveIndex: (index: number) => void
  pause: () => void
  resume: () => void
  reset: () => void
}

/**
 * 工作流轮播控制 Hook
 * 管理场景切换、进度更新、自动播放等逻辑
 */
export function useWorkflowCarousel({
  scenes,
  autoPlay = true,
}: UseWorkflowCarouselOptions): UseWorkflowCarouselReturn {
  const [activeIndex, setActiveIndexState] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(!autoPlay)

  const startTimeRef = useRef<number>(0)
  const animationFrameRef = useRef<number | null>(null)
  const isVisibleRef = useRef(true)

  const currentScene = scenes[activeIndex]
  const duration = currentScene?.duration || 10000

  // 清理动画帧
  const cancelAnimation = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
  }, [])

  // 切换到下一个场景
  const goToNextScene = useCallback(() => {
    setActiveIndexState(prev => (prev + 1) % scenes.length)
    setProgress(0)
    startTimeRef.current = performance.now()
  }, [scenes.length])

  // 手动切换场景
  const setActiveIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < scenes.length) {
        cancelAnimation()
        setActiveIndexState(index)
        setProgress(0)
        startTimeRef.current = performance.now()
      }
    },
    [scenes.length, cancelAnimation]
  )

  // 暂停
  const pause = useCallback(() => {
    setIsPaused(true)
    cancelAnimation()
  }, [cancelAnimation])

  // 恢复
  const resume = useCallback(() => {
    setIsPaused(false)
    startTimeRef.current = performance.now() - (progress / 100) * duration
  }, [progress, duration])

  // 重置
  const reset = useCallback(() => {
    cancelAnimation()
    setActiveIndexState(0)
    setProgress(0)
    startTimeRef.current = performance.now()
    setIsPaused(!autoPlay)
  }, [autoPlay, cancelAnimation])

  // 动画循环 - 使用 RAF 实现流畅进度
  useEffect(() => {
    if (isPaused || !isVisibleRef.current) return

    startTimeRef.current = performance.now() - (progress / 100) * duration

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current
      const newProgress = Math.min((elapsed / duration) * 100, 100)

      // 直接设置进度，不做节流，让 RAF 控制帧率
      setProgress(newProgress)

      if (newProgress >= 100) {
        goToNextScene()
      } else {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return cancelAnimation
  }, [activeIndex, isPaused, duration, goToNextScene, cancelAnimation])

  // 页面可见性控制
  useEffect(() => {
    const handleVisibilityChange = () => {
      const wasVisible = isVisibleRef.current
      isVisibleRef.current = document.visibilityState === 'visible'

      if (!isVisibleRef.current) {
        cancelAnimation()
      } else if (!wasVisible && isVisibleRef.current && !isPaused) {
        // 页面重新可见时，重新开始当前场景
        startTimeRef.current = performance.now()
        setProgress(0)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isPaused, cancelAnimation])

  return {
    activeIndex,
    progress,
    setActiveIndex,
    pause,
    resume,
    reset,
  }
}

export default useWorkflowCarousel
