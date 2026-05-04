import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

// 创建 intl middleware
const intlMiddleware = createIntlMiddleware(routing)

const isMetadataRoute = (pathname: string) =>
  pathname === '/sitemap.xml' ||
  pathname === '/robots.txt' ||
  pathname === '/manifest.json' || // 确保 manifest 不被中间件拦截
  pathname.startsWith('/favicon')

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (isMetadataRoute(pathname)) {
    return NextResponse.next()
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
    // 排除静态资源和媒体文件；产品路由迁移已由 next.config.ts redirects() 优先处理
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp4|webm|ogg|mp3|wav|flac|aac)).*)',
    '/(api|trpc)(.*)',
  ],
}
