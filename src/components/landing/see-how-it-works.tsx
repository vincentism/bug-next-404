'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useInViewport } from 'ahooks'
import { WorkflowCarouselProgress, type WorkflowScene } from './workflow-carousel-progress'
import { useWorkflowCarousel, type WorkflowSceneConfig } from './use-workflow-carousel'
import { WORKFLOW_SCENES_DATA } from './workflow-scenes-data'
import { appExternalAnchorProps, getAppUrl } from '@/lib/app-url'

const LazyLandingWorkflowDemo = dynamic(
  () => import('./landing-workflow-demo').then(mod => mod.LandingWorkflowDemo),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl animate-pulse" />
    ),
  }
)

// 工作流场景配置 - 从 workflow-scenes-data 动态生成（模块级别常量，避免重复创建）
const WORKFLOW_SCENES: WorkflowSceneConfig[] = WORKFLOW_SCENES_DATA.map(scene => ({
  id: scene.id,
  title: scene.title,
  duration: 10000,
}))

// 进度条场景数据（模块级别常量）
const PROGRESS_SCENES: WorkflowScene[] = WORKFLOW_SCENES.map(s => ({
  id: s.id,
  title: s.title,
}))

export function SeeHowItWorks() {
  const locale = useLocale()
  const appHomeUrl = getAppUrl('/', locale)
  const { activeIndex, progress, setActiveIndex, pause, resume } = useWorkflowCarousel({
    scenes: WORKFLOW_SCENES,
    autoPlay: true,
  })

  const sectionRef = React.useRef<HTMLElement | null>(null)
  const [isInView] = useInViewport(sectionRef, { threshold: 0, rootMargin: '120px' })

  React.useEffect(() => {
    if (isInView) {
      resume()
    } else {
      pause()
    }
  }, [isInView, pause, resume])

  return (
    <section ref={sectionRef} className="relative w-full py-12 md:py-16 lg:py-20 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-poller-one text-center text-black mb-4 relative z-20">
          See How It Works
        </h2>

        <div className="relative bg-[#1fde1f] rounded-xl p-6 md:p-8 lg:p-12 lg:px-24 lg:pt-12">
          {/* 轮播进度条 */}
          <WorkflowCarouselProgress
            scenes={PROGRESS_SCENES}
            activeIndex={activeIndex}
            progress={progress}
            onSceneClick={setActiveIndex}
            className="relative z-20 mb-6 lg:mb-8"
          />

          <div className="relative bg-gray-50 rounded-2xl border-4 border-black mx-auto overflow-hidden z-20 h-[400px] md:h-[500px] lg:h-[600px]">
            <LazyLandingWorkflowDemo
              className="w-full h-full"
              sceneIndex={activeIndex}
              key={activeIndex}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center items-center pt-6 lg:pt-8">
            <a
              href={appHomeUrl}
              {...appExternalAnchorProps}
              className="inline-flex items-center justify-center text-base lg:text-lg px-8 lg:px-12 py-2.5 lg:py-3 bg-black text-white font-bold rounded-xl border-2 border-transparent hover:bg-[#1fde1f] hover:text-black hover:border-black hover:border-dashed transition-colors w-full sm:w-auto"
            >
              Explore Templates
            </a>
            <Link
              href="https://uusd8j57636y.sg.larksuite.com/share/base/form/shrlgNBmyK5OBha9x1PFYWXnA3e?from=navigation"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 text-base lg:text-lg px-8 lg:px-12 py-2.5 lg:py-3 bg-white text-black font-bold rounded-xl border-2 border-[#131713] hover:bg-theme-pink hover:text-white hover:border-black hover:border-dashed transition-colors w-full sm:w-auto"
            >
              Book a Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
