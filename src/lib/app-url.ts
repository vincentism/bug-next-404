const FALLBACK_APP_BASE_URL = 'https://app.opencreator.io'

const normalizeBaseUrl = (url: string) => url.replace(/\/$/, '')
const normalizePath = (path: string) => (path.startsWith('/') ? path : `/${path}`)

export function getAppUrl(path: string, locale?: string) {
  const baseUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_APP_URL || FALLBACK_APP_BASE_URL)
  const normalizedPath = normalizePath(path)
  const localizedPath = locale ? `/${locale}${normalizedPath === '/' ? '' : normalizedPath}` : normalizedPath

  return new URL(localizedPath, baseUrl).toString()
}
