import type { Locale } from '@/i18n/config'

function getCurrentLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const pathname = window.location.pathname
  const localeMatch = pathname.match(/^\/(en|zh)(\/|$)/)

  if (localeMatch) {
    return localeMatch[1] as Locale
  }

  const savedLocale = localStorage.getItem('user-locale') as Locale | null
  if (savedLocale && (savedLocale === 'en' || savedLocale === 'zh')) {
    return savedLocale
  }

  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('zh')) {
    return 'zh'
  }

  return 'en'
}

export function addLocaleToUrl(url: string, locale?: Locale): string {
  const currentLocale = locale || getCurrentLocale()

  if (url.startsWith('http://') || url.startsWith('https://')) {
    if (url.includes('opencreator.io')) {
      try {
        const urlObj = new URL(url)
        const pathname = urlObj.pathname

        if (pathname.match(/^\/(en|zh)(\/|$)/)) {
          return url
        }

        if (currentLocale !== 'en') {
          urlObj.pathname = `/${currentLocale}${pathname}`
          return urlObj.toString()
        }
      } catch (e) {
        console.error('Error parsing URL:', e)
      }
    }
    return url
  }

  if (url.match(/^\/(en|zh)(\/|$)/)) {
    return url
  }

  if (currentLocale !== 'en') {
    return `/${currentLocale}${url}`
  }

  return url
}

export function removeLocaleFromUrl(url: string): string {
  return url.replace(/^\/(en|zh)(\/|$)/, '/')
}
