import React from 'react'
import { Noto_Sans_SC } from 'next/font/google'

const NotoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  preload: true,
  variable: '--font-noto-sans-sc',
  fallback: ['PingFang SC', 'Microsoft YaHei', 'sans-serif'],
})

export function ZhFontWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className={NotoSansSC.variable} style={{ fontFamily: NotoSansSC.style.fontFamily }}>
      {children}
    </div>
  )
}
