import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const APP_BASE_URL =
  process.env.APP_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://app.opencreator.io'

const WWW_ROUTE_REDIRECTS: Record<string, string> = {
  '/template': '/',
  '/templates': '/'
}

const APP_ROUTE_PREFIXES = [
  '/home',
  '/skills',
  '/projects',
  '/workflows',
  '/assets',
  '/developer/apikeys',
  '/canvas',
  '/credits',
  '/payment-redirect',
  '/auth-complete',
  '/sso-callback',
  '/custom-workflow',
  '/content-production',
  '/remotion',
  '/sign-in',
  '/sign-up',
  '/verify',
  '/tiktok/auth',
  '/youtube/auth',
] as const

// 创建 intl middleware
const intlMiddleware = createIntlMiddleware(routing)

const isMetadataRoute = (pathname: string) =>
  pathname === '/sitemap.xml' ||
  pathname === '/robots.txt' ||
  pathname === '/manifest.json' || // 确保 manifest 不被中间件拦截
  pathname.startsWith('/favicon')

const normalizePathname = (pathname: string) => {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }
  return pathname
}

const splitLocalePath = (pathname: string) => {
  const normalizedPathname = normalizePathname(pathname)
  const localeMatch = normalizedPathname.match(/^\/(en|zh)(\/.*)?$/)
  const locale = localeMatch?.[1] ?? null
  const localePrefix = locale ? `/${locale}` : ''
  const localePath = localeMatch?.[2] || '/'
  const basePath = locale ? normalizePathname(localePath) : normalizedPathname

  return {
    basePath,
    localePrefix,
  }
}

const getWwwRedirectPath = (pathname: string) => {
  const { basePath, localePrefix } = splitLocalePath(pathname)
  const target = WWW_ROUTE_REDIRECTS[basePath]

  if (!target) return null

  return target === '/' ? localePrefix || '/' : `${localePrefix}${target}`
}

const isAppRoute = (pathname: string) => {
  const { basePath } = splitLocalePath(pathname)

  return APP_ROUTE_PREFIXES.some(prefix => basePath === prefix || basePath.startsWith(`${prefix}/`))
}

const redirectToApp = (request: NextRequest) => {
  const target = new URL(request.nextUrl.pathname + request.nextUrl.search, APP_BASE_URL)
  return NextResponse.redirect(target, 308)
}

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (isMetadataRoute(pathname)) {
    return NextResponse.next()
  }

  if (isAppRoute(pathname)) {
    return redirectToApp(request)
  }

  const wwwRedirectPath = getWwwRedirectPath(pathname)
  if (wwwRedirectPath) {
    const url = request.nextUrl.clone()
    url.pathname = wwwRedirectPath
    return NextResponse.redirect(url, 308)
  }

  // 先处理 intl 路由
  const intlResponse = intlMiddleware(request)

  // 如果 intl middleware 返回了重定向，直接返回
  if (intlResponse.status === 307 || intlResponse.status === 308) {
    return intlResponse
  }

  // 地理位置检测：从 CDN/平台 headers 获取国家代码，写入 cookie 供客户端按地区加载脚本
  // 无法获取时默认 CN（本地开发 / 未经 CDN 直连场景按中国处理，更安全）
  const country =
    request.headers.get('cf-ipcountry') ||
    request.headers.get('cloudfront-viewer-country') ||
    request.headers.get('x-vercel-ip-country') ||
    'CN'
  const existingRegion = request.cookies.get('x-user-region')?.value
  if (country !== existingRegion) {
    intlResponse.cookies.set('x-user-region', country, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
  }

  // 将 pathname 作为请求头转发给服务端代码（用于 i18n 按路由分片加载翻译）
  const overrides = intlResponse.headers.get('x-middleware-override-headers')
  const overrideList = overrides ? overrides.split(',').filter(Boolean) : []
  if (!overrideList.includes('x-pathname')) {
    overrideList.push('x-pathname')
  }
  intlResponse.headers.set('x-middleware-override-headers', overrideList.join(','))
  intlResponse.headers.set('x-middleware-request-x-pathname', pathname)

  return intlResponse
}

export const config = {
  matcher: [
    // 排除静态资源和媒体文件（但保留 /assets 路由）
    '/((?!_next|assets/|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp4|webm|ogg|mp3|wav|flac|aac)).*)',
    '/(api|trpc)(.*)',
  ],
}
