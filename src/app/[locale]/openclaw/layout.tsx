import { DM_Mono, DM_Sans } from 'next/font/google'
import React from 'react'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  display: 'swap',
  variable: '--font-openclaw-dm-sans',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-openclaw-dm-mono',
})

export default function OpenClawLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${dmSans.variable} ${dmMono.variable} min-h-screen`}>{children}</div>
  )
}
