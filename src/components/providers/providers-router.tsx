'use client'

import { ReactNode } from 'react'
import MinimalProviders from './minimal-providers'

type ProvidersRouterProps = {
  children: ReactNode
  locale?: string
}

export default function ProvidersRouter({ children, locale }: ProvidersRouterProps) {
  void locale

  return <MinimalProviders>{children}</MinimalProviders>
}
