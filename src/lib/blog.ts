import fs from 'fs'
import path from 'path'
import { cache } from 'react'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

// Locale subdirectories
const LOCALE_DIRS: Record<string, string> = {
  zh: path.join(BLOG_DIR, 'zh'),
  en: path.join(BLOG_DIR, 'en'),
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  coverImage: string
  tags: string[]
  keywords?: string[]
  readTime: string
  content: string
  locale: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  author: string
  coverImage: string
  tags: string[]
  keywords?: string[]
  readTime: string
  locale: string
}

function getPostKeywords(rawKeywords: unknown, tagsFallback: string[]): string[] {
  if (Array.isArray(rawKeywords)) {
    const keywords = rawKeywords
      .filter(k => typeof k === 'string')
      .map(k => k.trim())
      .filter(Boolean)
    if (keywords.length > 0) return keywords
  }
  if (typeof rawKeywords === 'string' && rawKeywords.trim().length > 0) {
    return rawKeywords
      .split(',')
      .map(k => k.trim())
      .filter(Boolean)
  }
  return tagsFallback
}

function getPostLocale(rawLocale: unknown): string {
  if (typeof rawLocale === 'string' && rawLocale.trim().length > 0) {
    return rawLocale
  }
  return 'en'
}

function getPostSlug(rawSlug: unknown, filename: string): string {
  if (typeof rawSlug === 'string' && rawSlug.trim().length > 0) {
    return rawSlug
  }
  return filename.replace(/\.mdx?$/, '')
}

function getBlogFiles(locale?: string): { file: string; dir: string }[] {
  const results: { file: string; dir: string }[] = []

  // If locale is specified, only look in that locale's directory
  if (locale && LOCALE_DIRS[locale]) {
    const localeDir = LOCALE_DIRS[locale]
    if (fs.existsSync(localeDir)) {
      const files = fs
        .readdirSync(localeDir)
        .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
      files.forEach(file => results.push({ file, dir: localeDir }))
    }
    return results
  }

  // Otherwise, look in all locale directories
  Object.values(LOCALE_DIRS).forEach(localeDir => {
    if (fs.existsSync(localeDir)) {
      const files = fs
        .readdirSync(localeDir)
        .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
      files.forEach(file => results.push({ file, dir: localeDir }))
    }
  })

  // Also check root directory for backward compatibility
  if (fs.existsSync(BLOG_DIR)) {
    const rootFiles = fs
      .readdirSync(BLOG_DIR)
      .filter(
        file =>
          (file.endsWith('.mdx') || file.endsWith('.md')) &&
          !fs.statSync(path.join(BLOG_DIR, file)).isDirectory()
      )
    rootFiles.forEach(file => results.push({ file, dir: BLOG_DIR }))
  }

  return results
}

export const getAllBlogPosts = cache(function getAllBlogPosts(locale: string): BlogPostMeta[] {
  const files = getBlogFiles(locale)
  const posts: BlogPostMeta[] = []

  files.forEach(({ file, dir }) => {
    const filePath = path.join(dir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    let data: any
    try {
      ;({ data } = matter(fileContent))
    } catch {
      return
    }
    const postLocale = getPostLocale((data as any).locale)

    if (postLocale !== locale) return

    const slug = getPostSlug((data as any).slug, file)

    posts.push({
      slug,
      title: (data as any).title || '',
      description: (data as any).description || '',
      date: (data as any).date || '',
      author: (data as any).author || '',
      coverImage: (data as any).coverImage || '',
      tags: ((data as any).tags as string[]) || [],
      keywords: getPostKeywords(
        (data as any).keywords,
        (((data as any).tags as string[]) || []) as string[]
      ),
      readTime: (data as any).readTime || '',
      locale: postLocale,
    })
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

export const getBlogPostBySlug = cache(function getBlogPostBySlug(
  slug: string,
  locale: string
): BlogPost | null {
  const files = getBlogFiles(locale)

  for (const { file, dir } of files) {
    const filePath = path.join(dir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    let data: any
    let content = ''
    try {
      ;({ data, content } = matter(fileContent))
    } catch {
      continue
    }
    const postLocale = getPostLocale((data as any).locale)
    const postSlug = getPostSlug((data as any).slug, file)

    if (postLocale !== locale) continue
    if (postSlug !== slug) continue

    const tags = (((data as any).tags as string[]) || []) as string[]

    return {
      slug,
      title: (data as any).title || '',
      description: (data as any).description || '',
      date: (data as any).date || '',
      author: (data as any).author || '',
      coverImage: (data as any).coverImage || '',
      tags,
      keywords: getPostKeywords((data as any).keywords, tags),
      readTime: (data as any).readTime || '',
      content,
      locale: postLocale,
    }
  }

  return null
})

export const getAllBlogSlugs = cache(function getAllBlogSlugs(locale: string): string[] {
  const files = getBlogFiles(locale)
  const slugs: string[] = []

  files.forEach(({ file, dir }) => {
    const filePath = path.join(dir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    let data: any
    try {
      ;({ data } = matter(fileContent))
    } catch {
      return
    }
    const postLocale = getPostLocale((data as any).locale)

    if (postLocale !== locale) return

    slugs.push(getPostSlug((data as any).slug, file))
  })

  return Array.from(new Set(slugs))
})
