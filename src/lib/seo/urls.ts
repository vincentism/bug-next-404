import { defaultLocale, locales } from '@/i18n/config'
import { getSiteUrl } from '@/lib/seo/schema'

function normalizeBaseUrl(url: string) {
  return url.replace(/\/$/, '')
}

function normalizePathname(pathname: string) {
  if (!pathname) return '/'
  return pathname === '/' ? '/' : `/${pathname.replace(/^\/+/, '')}`
}

function withLocalePrefix(pathname: string, locale?: string) {
  const normalized = normalizePathname(pathname)
  if (!locale || locale === defaultLocale) return normalized
  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`
}

export function getAbsoluteUrl(pathname: string, locale?: string) {
  const baseUrl = normalizeBaseUrl(getSiteUrl())
  return new URL(withLocalePrefix(pathname, locale), baseUrl).toString()
}

export function getCanonicalUrl(pathname: string, locale: string) {
  return getAbsoluteUrl(pathname, locale)
}

export function getLanguageAlternates(pathname: string) {
  const languages: Record<string, string> = {}

  locales.forEach(locale => {
    languages[locale] = getAbsoluteUrl(pathname, locale)
  })

  // Use default locale as x-default
  languages['x-default'] = getAbsoluteUrl(pathname, defaultLocale)

  return languages
}

export function buildAlternatesMetadata(pathname: string, locale: string) {
  return {
    canonical: getCanonicalUrl(pathname, locale),
    languages: getLanguageAlternates(pathname),
  }
}
