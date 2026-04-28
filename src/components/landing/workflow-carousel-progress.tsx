'use client'

import React, { memo, useCallback } from 'react'
import { cn } from '@/lib/utils'

export interface WorkflowScene {
  id: string
  title: string
}

interface WorkflowCarouselProgressProps {
  scenes: WorkflowScene[]
  activeIndex: number
  progress: number // 0-100，当前场景的播放进度
  onSceneClick: (index: number) => void
  className?: string
}

/**
 * 工作流轮播进度条组件
 * 简洁的标签式设计，底部进度条
 */
const WorkflowProgressButton = memo(function WorkflowProgressButton({
  scene,
  index,
  isActive,
  progress,
  onSceneClick,
}: {
  scene: WorkflowScene
  index: number
  isActive: boolean
  progress: number
  onSceneClick: (index: number) => void
}) {
  const handleClick = useCallback(() => {
    onSceneClick(index)
  }, [index, onSceneClick])

  return (
    <button
      onClick={handleClick}
      className={cn(
        'relative py-3 md:py-4',
        'transition-colors duration-200',
        'focus:outline-none focus-visible:outline-none',
        'ring-0 outline-none',
        isActive ? 'text-black' : 'text-black/40 hover:text-black/70'
      )}
    >
      {/* 标题 */}
      <span
        className={cn(
          'text-xs md:text-sm lg:text-base font-semibold',
          'block text-center whitespace-nowrap'
        )}
      >
        {scene.title}
      </span>

      {/* 底部进度条 */}
      <div className="absolute bottom-0 left-1 right-1 h-0.5 bg-black/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-black rounded-full"
          style={{
            width: isActive ? `${progress}%` : '0%',
            transition: isActive ? 'width 50ms linear' : 'none',
          }}
        />
      </div>
    </button>
  )
})

export const WorkflowCarouselProgress = memo(function WorkflowCarouselProgress({
  scenes,
  activeIndex,
  progress,
  onSceneClick,
  className,
}: WorkflowCarouselProgressProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* 标签列表 */}
      <div className="grid grid-cols-5 w-full">
        {scenes.map((scene, index) => (
          <WorkflowProgressButton
            key={scene.id}
            scene={scene}
            index={index}
            isActive={index === activeIndex}
            progress={progress}
            onSceneClick={onSceneClick}
          />
        ))}
      </div>
    </div>
  )
})

export default WorkflowCarouselProgress
