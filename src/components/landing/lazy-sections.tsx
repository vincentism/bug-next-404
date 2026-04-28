import dynamic from 'next/dynamic'
import React from 'react'

// 首屏组件 - 直接导入
export { LandingNavbar } from './navbar'
export { Hero } from './hero'

export const LazyPositioning = dynamic(
  () => import('./v3/sections/positioning').then(mod => ({ default: mod.PositioningSection })),
  {
    loading: () => <div className="section-paper section-inner" />,
    ssr: true,
  }
)

export const LazyFeatures = dynamic(
  () => import('./v3/sections/features').then(mod => ({ default: mod.FeaturesSection })),
  {
    loading: () => <div className="section-paper section-inner" />,
    ssr: true,
  }
)

export const LazyModelsMarquee = dynamic(
  () => import('./v3/sections/models-marquee').then(mod => ({ default: mod.ModelsMarqueeSection })),
  {
    loading: () => <div className="models" />,
    ssr: true,
  }
)

export const LazyEndorse = dynamic(
  () => import('./v3/sections/endorse').then(mod => ({ default: mod.EndorseSection })),
  {
    loading: () => <div className="section-paper section-inner" />,
    ssr: true,
  }
)

export const LazyVsLedger = dynamic(
  () => import('./v3/sections/vs-ledger').then(mod => ({ default: mod.VsLedgerSection })),
  {
    loading: () => <div className="section-paper section-inner" />,
    ssr: true,
  }
)

export const LazyCommunity = dynamic(
  () => import('./v3/sections/community').then(mod => ({ default: mod.CommunitySection })),
  {
    loading: () => <div className="section-paper section-inner" />,
    ssr: true,
  }
)

export const LazyCallbackCta = dynamic(
  () => import('./v3/sections/callback-cta').then(mod => ({ default: mod.CallbackCtaSection })),
  {
    loading: () => <div className="callback" />,
    ssr: true,
  }
)
