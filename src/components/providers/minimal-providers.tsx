'use client'

import { ReactNode } from 'react'
import { HeroUIProvider } from '@heroui/system'

export default function MinimalProviders({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>{children}</HeroUIProvider>
  )
}
