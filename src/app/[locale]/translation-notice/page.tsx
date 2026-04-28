'use client'

import React, { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { Globe, Languages } from 'lucide-react'
import { HeroBackground } from '@/components/landing/hero-background'
import { addLocaleToUrl, removeLocaleFromUrl } from '@/lib/i18n-link'

export default function TranslationNoticePage() {
  const currentLocale = useLocale()
  const isZh = currentLocale === 'zh'

  // 从 sessionStorage 获取原始 URL
  const [returnUrl, setReturnUrl] = useState<string>('/')

  useEffect(() => {
    const savedUrl = sessionStorage.getItem('translation-return-url')
    if (savedUrl) {
      setReturnUrl(savedUrl)
    }
  }, [])

  const handleLanguageSwitch = (targetLocale: 'en' | 'zh') => {
    // 规范化原始 URL，先去掉任何 locale 前缀
    const rawPath = returnUrl || '/'
    const cleanPath = removeLocaleFromUrl(rawPath) || '/'

    // 根据目标语言重新加上 locale 前缀
    const localizedPath = addLocaleToUrl(cleanPath, targetLocale)

    // 使用 location 跳转，确保完全刷新并清除翻译状态
    window.location.href = localizedPath
  }

  const content = {
    en: {
      title: 'Browser translation detected',
      desc: 'OpenCreator already supports multiple languages. Browser translation may cause layout or button issues. Please turn it off in your browser toolbar, then use the language buttons below to switch the interface.',
      chooseLabel: 'OpenCreator available languages',
      enLabel: 'English',
      zhLabel: '中文',
    },
    zh: {
      title: '检测到浏览器自动翻译',
      desc: 'OpenCreator 本身支持多语言。浏览器自动翻译有时会导致页面排版或按钮异常。请先在浏览器工具栏中关闭翻译，再点击下方语言按钮切换界面。',
      chooseLabel: 'OpenCreator 当前支持的语言',
      enLabel: 'English',
      zhLabel: '中文',
    },
  }

  const t = isZh ? content.zh : content.en

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      <HeroBackground />

      <div className="container mx-auto px-4 py-16 relative z-10 max-w-3xl">
        <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6 text-center">
          {/* 图标 */}
          <div className="relative">
            <div className="absolute inset-0 bg-[#1fde1f]/20 blur-3xl rounded-full" />
            <div className="relative bg-white p-6 rounded-full border-2 border-dashed border-black">
              <Globe className="w-14 h-14 text-black" />
            </div>
          </div>

          {/* 标题 & 描述 */}
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-poller-one leading-tight">
              {t.title}
            </h1>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-xl mx-auto">
              {t.desc}
            </p>
          </div>

          {/* 语言选择卡片 */}
          <div className="bg-gray-50 border border-black rounded-2xl px-4 py-4 md:px-6 md:py-5 max-w-md w-full text-left space-y-3">
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-[#1fde1f]" />
              <span className="text-sm font-medium">{t.chooseLabel}</span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleLanguageSwitch('en')}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-1.5 text-xs md:text-sm font-medium bg-white hover:bg-gray-100"
              >
                <span>{t.enLabel}</span>
              </button>

              <button
                type="button"
                onClick={() => handleLanguageSwitch('zh')}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-1.5 text-xs md:text-sm font-medium bg-white hover:bg-gray-100"
              >
                <span>{t.zhLabel}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
