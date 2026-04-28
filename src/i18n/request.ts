import { getRequestConfig } from 'next-intl/server'
import fs from 'fs'
import path from 'path'
import { routing } from './routing'
import { headers } from 'next/headers'

type SegmentedMessageDir = 'templates' | 'models' | 'solutions' | 'features'
type SegmentedMessageRequest =
  | { type: 'all' }
  | { type: 'single'; dir: SegmentedMessageDir; slug: string }
  | null

const slugToKey = (slug: string): string => {
  const result = slug.replace(/[-_\s]+([a-zA-Z0-9])/g, (_, char: string) => char.toUpperCase())
  const match = result.match(/^(\d+)([A-Z])/)
  if (match) {
    const [, digits, letter] = match
    const originalMatch = slug.match(/^(\d+)([a-zA-Z])/)
    if (originalMatch) {
      return digits + letter.toLowerCase() + result.slice(digits.length + 1)
    }
  }
  return result
}

const stripLocaleAndTrailingSlash = (pathname: string) => {
  const stripped = pathname.replace(/^\/(en|zh)(?=\/|$)/, '') || '/'
  return stripped.length > 1 && stripped.endsWith('/') ? stripped.slice(0, -1) : stripped
}

function getSegmentedMessageRequest(pathname: string): SegmentedMessageRequest {
  if (pathname === '') {
    // Static generation cannot reliably access request headers, so keep the safe full-load fallback.
    return { type: 'all' }
  }

  const stripped = stripLocaleAndTrailingSlash(pathname)
  if (stripped === '/') return null
  if (stripped === '/nanobanana2') return { type: 'single', dir: 'templates', slug: 'nanobanana2' }

  if (stripped.startsWith('/template-')) {
    return { type: 'single', dir: 'templates', slug: stripped.replace(/^\/template-/, '') }
  }

  const [, section, slug] = stripped.split('/')
  if (section === 'models') return { type: 'single', dir: 'models', slug: slug || 'index' }
  if (section === 'solutions' && slug) return { type: 'single', dir: 'solutions', slug }
  if (section === 'features' && slug) return { type: 'single', dir: 'features', slug }

  return null
}

function loadDirSlugs(dirPath: string): string[] {
  try {
    return fs
      .readdirSync(dirPath, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
  } catch {
    return []
  }
}

async function loadSlugMessages(
  dir: string,
  locale: string
): Promise<Record<string, Record<string, unknown>>> {
  const slugs = loadDirSlugs(path.join(process.cwd(), 'messages', dir))
  const result: Record<string, Record<string, unknown>> = {}
  await Promise.all(
    slugs.map(async slug => {
      try {
        result[slugToKey(slug)] = (
          await import(`../../messages/${dir}/${slug}/${locale}.json`)
        ).default
      } catch {
        // Some slugs may not exist for all locales
      }
    })
  )
  return result
}

async function loadSingleSlugMessage(
  dir: SegmentedMessageDir,
  slug: string,
  locale: string
): Promise<Record<string, Record<string, unknown>>> {
  try {
    return {
      [slugToKey(slug)]: (await import(`../../messages/${dir}/${slug}/${locale}.json`)).default,
    }
  } catch {
    return {}
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale
  }

  // 通过中间件转发的 x-pathname 头判断当前路由，按当前 SEO 页面加载分段消息；
  // 产品路径已迁移到 app 域，首页和 blog 等非分段内容页只需要 base + landing。
  const [baseMessages, landingMessages, pathname] = await Promise.all([
    import(`../../messages/${locale}.json`).then(module => module.default),
    import(`../../messages/landing/${locale}.json`).then(module => module.default),
    headers()
      .then(headersList => headersList.get('x-pathname') || '')
      .catch(() => ''),
  ])

  const segmentedMessageRequest = getSegmentedMessageRequest(pathname)

  if (!segmentedMessageRequest) {
    return {
      locale,
      messages: {
        ...baseMessages,
        ...landingMessages,
      },
    }
  }

  const [templates, models, solutions, features] =
    segmentedMessageRequest.type === 'all'
      ? await Promise.all([
          loadSlugMessages('templates', locale),
          loadSlugMessages('models', locale),
          loadSlugMessages('solutions', locale),
          loadSlugMessages('features', locale),
        ])
      : await Promise.all(
          (['templates', 'models', 'solutions', 'features'] as const).map(dir =>
            dir === segmentedMessageRequest.dir
              ? loadSingleSlugMessage(dir, segmentedMessageRequest.slug, locale)
              : Promise.resolve({})
          )
        )

  return {
    locale,
    messages: {
      ...baseMessages,
      ...landingMessages,
      templates,
      models,
      solutions,
      features,
    },
  }
})
