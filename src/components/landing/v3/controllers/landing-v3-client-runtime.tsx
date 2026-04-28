'use client'

import { memo } from 'react'
import { AnnouncementBarController } from './announcement-bar-controller'
import { CountUpController } from './count-up-controller'
import { CursorController } from './cursor-controller'
import { HeroScrollController } from './hero-scroll-controller'
import { RevealController } from './reveal-controller'

export const LandingV3ClientRuntime = memo(function LandingV3ClientRuntime() {
  return (
    <>
      <AnnouncementBarController />
      <CursorController />
      <RevealController />
      <CountUpController />
      <HeroScrollController />
    </>
  )
})
