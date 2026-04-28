'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import type { FAQItem } from './faq'

// 首屏组件 - 直接导入
export { LandingNavbar } from './navbar'
export { Hero } from './hero'

// 非首屏组件 - 动态导入懒加载
export const LazySeeHowItWorks = dynamic(
  () => import('./see-how-it-works').then(mod => ({ default: mod.SeeHowItWorks })),
  {
    loading: () => <div className="w-full py-12 md:py-16 lg:py-20" />,
    ssr: true,
  }
)

export const LazyModelShowcase = dynamic(
  () => import('./model-showcase').then(mod => ({ default: mod.ModelShowcase })),
  {
    loading: () => <div className="w-full py-8 md:py-10 lg:py-12" />,
    ssr: true,
  }
)

export const LazyTemplatesCarousel = dynamic(
  () => import('./templates-carousel').then(mod => ({ default: mod.TemplatesCarousel })),
  {
    loading: () => <div className="w-full py-12 md:py-14 lg:py-16" />,
    ssr: true,
  }
)

export const LazyWhyOpenCreator = dynamic(
  () => import('./why-opencreator').then(mod => ({ default: mod.WhyOpenCreator })),
  {
    loading: () => <div className="w-full bg-black py-12 md:py-16 lg:py-24" />,
    ssr: true,
  }
)

export const LazyLandingFAQ = dynamic(
  () => import('./faq').then(mod => ({ default: mod.LandingFAQ })),
  {
    loading: () => <div className="w-full py-12 md:py-16 lg:py-24" />,
    ssr: true,
  }
)

export const LazyLandingCTA = dynamic(
  () => import('./cta').then(mod => ({ default: mod.LandingCTA })),
  {
    loading: () => <div className="w-full bg-[#2563EB] py-12 md:py-16 lg:py-24" />,
    ssr: true,
  }
)

export const LazyLandingFooter = dynamic(
  () => import('./footer').then(mod => ({ default: mod.LandingFooter })),
  {
    loading: () => <div className="w-full bg-white py-12 lg:py-16" />,
    ssr: true,
  }
)

// 包装组件用于传递 props
export function LazyFAQWrapper({ items }: { items: FAQItem[] }) {
  return <LazyLandingFAQ items={items} />
}
