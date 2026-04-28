'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'

/**
 * 检测浏览器自动翻译
 *
 * 原理：浏览器翻译会在 DOM 中注入特定属性：
 * - Google 翻译：添加 font 标签和 class="translated-ltr/rtl"
 * - 其他翻译：修改 lang 属性或添加翻译标记
 */
export function TranslationDetector() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  useEffect(() => {
    // 不在翻译提示页面时才检测
    if (pathname?.includes('/translation-notice')) {
      return
    }

    let observer: MutationObserver | null = null
    let hasRedirected = false

    const checkTranslation = () => {
      if (hasRedirected) return

      // 方法 1: 检测 Google 翻译的 font 标签
      const hasFontTags = document.querySelectorAll('font[style*="vertical-align"]').length > 0

      // 方法 2: 检测 body 的翻译 class
      const hasTranslatedClass =
        document.body.classList.contains('translated-ltr') ||
        document.body.classList.contains('translated-rtl')

      // 方法 3: 检测 html lang 属性是否被修改（排除我们自己设置的）
      const htmlLang = document.documentElement.lang
      const isLangModified = htmlLang && !['en', 'zh', 'zh-CN', 'en-US', ''].includes(htmlLang)

      // 方法 4: 检测 Google 翻译的特殊 style 标签
      const hasGoogleTranslateStyle = Array.from(document.querySelectorAll('style')).some(
        style =>
          style.textContent?.includes('.goog-te-') || style.textContent?.includes('translated-')
      )

      // 方法 5: 检测翻译工具注入的 class
      const hasTranslateClass = document.documentElement.classList.contains('translated')

      // 方法 6: 检测 Microsoft Edge 翻译
      const hasEdgeTranslation = document.querySelector('[data-translated-by="edge"]') !== null

      if (
        hasFontTags ||
        hasTranslatedClass ||
        isLangModified ||
        hasGoogleTranslateStyle ||
        hasTranslateClass ||
        hasEdgeTranslation
      ) {
        hasRedirected = true

        // 记录用户来源页面（包含查询参数）
        try {
          const url = window.location.pathname + window.location.search
          sessionStorage.setItem('translation-return-url', url)
        } catch (error) {
          console.warn('Failed to save translation return url', error)
        }

        // 根据浏览器环境推断提示页语言：
        // 1) 如果 html lang 是 zh / zh-CN，则认为是中文
        // 2) 否则看浏览器首选语言 navigator.language / navigator.languages
        const htmlLangLower = (htmlLang || '').toLowerCase()

        let browserHasZh = false
        if (typeof navigator !== 'undefined') {
          const langs = (
            navigator.languages && navigator.languages.length > 0
              ? navigator.languages
              : [navigator.language]
          )
            .filter(Boolean)
            .map(l => l.toLowerCase())

          browserHasZh = langs.some(l => l.startsWith('zh'))
        }

        // 根据浏览器环境推断要使用的语言，优先使用当前 locale
        const useZhNotice = currentLocale === 'zh' || htmlLangLower.startsWith('zh') || browserHasZh

        // 跳转到提示页面（保持当前 locale）
        // next-intl 的 router.push 会自动添加当前 locale 前缀，所以只需要路径即可
        router.push('/translation-notice')
      }
    }

    // 立即检测一次
    checkTranslation()

    // 延迟检测，给翻译工具时间注入标记
    const detectionTimer = setTimeout(() => {
      checkTranslation()
    }, 300) // 300ms 后再检测一次

    // 持续监听 DOM 变化
    observer = new MutationObserver(mutations => {
      // 检查是否有相关的变化
      const hasRelevantChange = mutations.some(mutation => {
        if (mutation.type === 'attributes') {
          return mutation.attributeName === 'lang' || mutation.attributeName === 'class'
        }
        if (mutation.type === 'childList') {
          // 检查是否添加了 font 标签
          return Array.from(mutation.addedNodes).some(
            node => node.nodeName === 'FONT' || node.nodeName === 'STYLE'
          )
        }
        return false
      })

      if (hasRelevantChange) {
        checkTranslation()
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang', 'class'],
      childList: true,
      subtree: true,
    })

    return () => {
      clearTimeout(detectionTimer)
      if (observer) {
        observer.disconnect()
      }
    }
  }, [pathname, router, currentLocale])

  return null
}
