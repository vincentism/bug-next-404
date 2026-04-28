const FALLBACK_APP_BASE_URL = 'https://app.opencreator.io'

const normalizeBaseUrl = (url: string) => url.replace(/\/$/, '')
const normalizePath = (path: string) => (path.startsWith('/') ? path : `/${path}`)

const getAppBaseUrl = () =>
  process.env.NEXT_PUBLIC_APP_URL || process.env.APP_BASE_URL || FALLBACK_APP_BASE_URL

export function getAppUrl(path: string, locale?: string) {
  const baseUrl = normalizeBaseUrl(getAppBaseUrl())
  const normalizedPath = normalizePath(path)
  const localizedPath = locale ? `/${locale}${normalizedPath === '/' ? '' : normalizedPath}` : normalizedPath

  return new URL(localizedPath, baseUrl).toString()
}

/** Spread onto `<a>` when `href` is from {@link getAppUrl} — opens app on a separate origin in a new tab. */
export const appExternalAnchorProps = {
  target: '_blank' as const,
  rel: 'noopener noreferrer',
} as const
