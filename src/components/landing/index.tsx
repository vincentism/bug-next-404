import dynamic from 'next/dynamic'
import React from 'react'
import type { LandingFAQProps } from './faq'

export { LandingNavbar } from './navbar'
export { Hero } from './hero'
export { HeroBackground } from './hero-background'
export { SeeHowItWorks } from './see-how-it-works'
export { WorkflowCarouselProgress } from './workflow-carousel-progress'
export { useWorkflowCarousel } from './use-workflow-carousel'
export { TemplatesCarousel } from './templates-carousel'
export { WhyOpenCreator } from './why-opencreator'
export { WorkflowHero } from './workflow-hero'
export {
  WorkflowWhoIsForSection,
  WorkflowHowItWorksSection,
} from './workflow-extra-sections'
export { ModelFeatureHighlights } from './model-feature-highlights'
export { RelatedSolutions } from './related-solutions'

export const ModelShowcase = dynamic(
  () => import('./model-showcase').then(mod => ({ default: mod.ModelShowcase })),
  {
    loading: () => <div className="w-full py-8 md:py-10 lg:py-12" />,
    ssr: true,
  }
)

export const WhoIsOpenCreator = dynamic(
  () => import('./who-is-opencreator').then(mod => ({ default: mod.WhoIsOpenCreator })),
  {
    loading: () => <div className="w-full py-12 md:py-16 lg:py-20" />,
    ssr: true,
  }
)

export const LandingFAQ = dynamic<LandingFAQProps>(
  () => import('./faq').then(mod => ({ default: mod.LandingFAQ })),
  {
    loading: () => <div className="w-full py-12 md:py-16 lg:py-24" />,
    ssr: true,
  }
)

export const LandingCTA = dynamic(
  () => import('./cta').then(mod => ({ default: mod.LandingCTA })),
  {
    loading: () => <div className="w-full bg-[#2563EB] py-12 md:py-16 lg:py-24" />,
    ssr: true,
  }
)

export const LandingFooter = dynamic(
  () => import('./footer').then(mod => ({ default: mod.LandingFooter })),
  {
    loading: () => <div className="w-full bg-white py-12 lg:py-16" />,
    ssr: true,
  }
)
