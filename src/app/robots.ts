import type { MetadataRoute } from 'next'

const FALLBACK_BASE_URL = 'https://opencreator.io'

const normalizeBaseUrl = (host: string) => host.replace(/\/$/, '')

export default function robots(): MetadataRoute.Robots {
  const baseUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_BASE_URL)

  return {
    rules: {
      userAgent: '*',
      // 允许的主要曝光页面：落地页 + 法务页面
      allow: [
        '/', // 根路由（会被 middleware 重写到对应 locale）
        '/blog',
        '/models',
        '/solutions',
        '/features',
        '/pricing',
        '/openclaw',
        '/template-', // 前缀，实际的 template-nano-banana-2 等仍然可抓取
        '/privacy-policy',
        '/terms-of-use',
      ],
      // 明确禁止抓取的内部应用路由
      disallow: [
        // 画布编辑器
        '/canvas',
        '/canvas/*',
        '/en/canvas',
        '/en/canvas/*',
        '/zh/canvas',
        '/zh/canvas/*',

        // 工作流 / 资产 / 账户类页面
        '/projects',
        '/projects/*',
        '/en/projects',
        '/en/projects/*',
        '/zh/projects',
        '/zh/projects/*',

        '/workflows',
        '/workflows/*',
        '/en/workflows',
        '/en/workflows/*',
        '/zh/workflows',
        '/zh/workflows/*',

        '/assets',
        '/assets/*',
        '/en/assets',
        '/en/assets/*',
        '/zh/assets',
        '/zh/assets/*',

        '/credits',
        '/credits/*',
        '/en/credits',
        '/en/credits/*',
        '/zh/credits',
        '/zh/credits/*',

        // 登录 / 注册 / 验证 / 支付中转
        '/sign-in',
        '/sign-in/*',
        '/sign-up',
        '/sign-up/*',
        '/verify',
        '/payment-redirect',
        '/en/sign-in',
        '/en/sign-in/*',
        '/en/sign-up',
        '/en/sign-up/*',
        '/en/verify',
        '/en/payment-redirect',
        '/zh/sign-in',
        '/zh/sign-in/*',
        '/zh/sign-up',
        '/zh/sign-up/*',
        '/zh/verify',
        '/zh/payment-redirect',

        // 第三方授权回调
        '/tiktok/auth',
        '/tiktok/auth/*',
        '/youtube/auth',
        '/youtube/auth/*',
        '/en/tiktok/auth',
        '/en/tiktok/auth/*',
        '/en/youtube/auth',
        '/en/youtube/auth/*',
        '/zh/tiktok/auth',
        '/zh/tiktok/auth/*',
        '/zh/youtube/auth',
        '/zh/youtube/auth/*',

        // Remotion 等非 SEO 页面
        '/remotion',
        '/remotion/*',
        '/en/remotion',
        '/en/remotion/*',
        '/zh/remotion',
        '/zh/remotion/*',

        // API 路由显式禁止
        '/api',
        '/api/*',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
