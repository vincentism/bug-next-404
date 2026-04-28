import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { locales, defaultLocale } from '@/i18n/config'
import { getAllBlogSlugs } from '@/lib/blog'

const FALLBACK_BASE_URL = 'https://opencreator.io'
let templatePagesCache: string[] | null = null
let modelPagesCache: string[] | null = null

const normalizeBaseUrl = (host: string) => host.replace(/\/$/, '')
const normalizePath = (path: string) => (path === '/' ? '/' : `/${path.replace(/^\/+/, '')}`)
const getAbsoluteUrl = (path: string, locale?: string) => {
  // as-needed: 默认 locale 不需要前缀
  const localePath = locale && locale !== defaultLocale ? `/${locale}${path}` : path
  return new URL(
    normalizePath(localePath),
    normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_BASE_URL)
  ).toString()
}

// 动态读取所有模板目录
function getTemplatePages(): string[] {
  if (templatePagesCache) return templatePagesCache

  try {
    const templatesDir = path.join(process.cwd(), 'src/app/[locale]/(template)')
    const entries = fs.readdirSync(templatesDir, { withFileTypes: true })

    templatePagesCache = entries
      .filter(entry => entry.isDirectory() && entry.name.startsWith('template-'))
      .map(entry => entry.name)
    return templatePagesCache
  } catch (error) {
    console.error('Error reading template directories:', error)
    return []
  }
}

// 动态读取所有模型落地页目录
function getModelPages(): string[] {
  if (modelPagesCache) return modelPagesCache

  try {
    const modelsDir = path.join(process.cwd(), 'src/app/[locale]/models')
    const entries = fs.readdirSync(modelsDir, { withFileTypes: true })

    modelPagesCache = entries
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('['))
      .map(entry => entry.name)
    return modelPagesCache
  } catch (error) {
    console.error('Error reading model directories:', error)
    return []
  }
}

export const revalidate = 86400 // regenerate once per day

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const coreRoutes = [
    { path: '/', changeFrequency: 'daily', priority: 1.0 },
    { path: '/pricing', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/models', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/openclaw', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.5 },
    { path: '/terms-of-use', changeFrequency: 'yearly', priority: 0.5 },
  ] as const

  const solutionRoutes = [
    { path: '/solutions/ecommerce-product-images', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/solutions/ai-fashion', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/solutions/ai-portrait', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/solutions/ai-video', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/solutions/ai-design', changeFrequency: 'weekly', priority: 0.8 },
  ] as const

  const featureRoutes = [
    { path: '/features/image-angle-control', changeFrequency: 'weekly', priority: 0.8 },
  ] as const

  // 动态获取所有模板页面 + 手动添加特殊页面
  const templatePages = ['nanobanana2', ...getTemplatePages()]

  const workflowRoutes = templatePages.map(slug => ({
    path: `/${slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // 动态获取所有模型落地页
  const modelPages = getModelPages()

  const modelRoutes = modelPages.map(slug => ({
    path: `/models/${slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const allRoutes = [
    ...coreRoutes,
    ...solutionRoutes,
    ...featureRoutes,
    ...workflowRoutes,
    ...modelRoutes,
  ]

  // 为每个 locale 生成 URL
  const sitemapEntries: MetadataRoute.Sitemap = []

  locales.forEach(locale => {
    allRoutes.forEach(route => {
      sitemapEntries.push({
        url: getAbsoluteUrl(route.path, locale),
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      })
    })

    sitemapEntries.push({
      url: getAbsoluteUrl('/blog', locale),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })

    getAllBlogSlugs(locale).forEach(slug => {
      sitemapEntries.push({
        url: getAbsoluteUrl(`/blog/${slug}`, locale),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })
  })

  return sitemapEntries
}
