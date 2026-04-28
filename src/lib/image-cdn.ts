/**
 * ImageKit media URL helpers.
 *
 * S3 keys map directly to the ImageKit path under the OpenCreator endpoint:
 * https://resource.opencreator.io/web/a.png -> https://ik.imagekit.io/opencreator/web/a.png
 */

export const IMAGEKIT_URL_ENDPOINT = 'https://ik.imagekit.io/opencreator'
const IMAGEKIT_HOST = 'ik.imagekit.io'
const IMAGEKIT_ACCOUNT_ID = 'opencreator'
const CLOUDFLARE_MEDIA_HOST = 'imgix.opencreator.io'
const RESOURCE_HOST = 'resource.opencreator.io'
const DEFAULT_IMAGE_TRANSFORMATION = 'f-auto,q-85'
const VIDEO_EXTENSION_PATTERN = /\.(mp4|webm|mov|m4v|mkv)(\?|#|$)/i

interface VideoThumbnailOptions {
  height?: number
  timeSeconds?: number
  width?: number
}

const isLocalPreviewUrl = (url: string) => url.startsWith('data:') || url.startsWith('blob:')

const trimSlashes = (value: string) => value.replace(/^\/+|\/+$/g, '')

const normalizePath = (path: string): string => {
  const withoutLeadingSlash = path.replace(/^\/+/, '')
  const withoutThumbnail = withoutLeadingSlash.replace(/\/ik-thumbnail\.jpg$/i, '')

  if (withoutThumbnail.startsWith('tr:')) {
    const [, ...rest] = withoutThumbnail.split('/')
    return rest.join('/')
  }

  return withoutThumbnail
}

const unwrapCloudflareUrl = (url: string): string | null => {
  const legacyImagePrefix = `https://${CLOUDFLARE_MEDIA_HOST}/cdn-cgi/image/`
  const legacyMediaPrefix = `https://${CLOUDFLARE_MEDIA_HOST}/cdn-cgi/media/`

  if (url.startsWith(legacyImagePrefix)) {
    const withoutPrefix = url.slice(legacyImagePrefix.length)
    const optionEndIndex = withoutPrefix.indexOf('/')
    return optionEndIndex >= 0 ? withoutPrefix.slice(optionEndIndex + 1) : null
  }

  if (url.startsWith(legacyMediaPrefix)) {
    const withoutPrefix = url.slice(legacyMediaPrefix.length)
    const optionEndIndex = withoutPrefix.indexOf('/')
    return optionEndIndex >= 0 ? withoutPrefix.slice(optionEndIndex + 1) : null
  }

  return null
}

const getUrlPath = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url)
    const hostname = parsedUrl.hostname.toLowerCase()

    if (hostname === IMAGEKIT_HOST) {
      const accountPrefix = `/${IMAGEKIT_ACCOUNT_ID}/`
      if (!parsedUrl.pathname.startsWith(accountPrefix)) return null
      return normalizePath(parsedUrl.pathname.slice(accountPrefix.length))
    }

    if (hostname === RESOURCE_HOST || hostname.endsWith('.opencreator.io')) {
      return normalizePath(parsedUrl.pathname)
    }

    return null
  } catch {
    return normalizePath(url)
  }
}

function getImageKitPath(url: string | undefined): string | null {
  if (!url) return null
  if (isLocalPreviewUrl(url)) return null

  try {
    const decodedUrl = decodeURIComponent(url)
    if (decodedUrl !== url && /^https?:\/\//i.test(decodedUrl)) {
      return getImageKitPath(decodedUrl)
    }
  } catch {
    // Keep the original value when it is not a percent-encoded URL.
  }

  const unwrappedUrl = unwrapCloudflareUrl(url)
  if (unwrappedUrl) return getImageKitPath(unwrappedUrl)

  const path = getUrlPath(url)
  if (!path) return null

  return trimSlashes(path)
}

function getImageKitFileUrl(url: string | undefined): string {
  if (!url) return ''
  if (isLocalPreviewUrl(url)) return url

  const path = getImageKitPath(url)
  if (!path) return url

  return `${IMAGEKIT_URL_ENDPOINT}/${path}`
}

export function getImageKitImageUrl(
  url: string | undefined,
  transformation = DEFAULT_IMAGE_TRANSFORMATION
): string {
  if (!url) return ''
  if (isLocalPreviewUrl(url)) return url

  const path = getImageKitPath(url)
  if (!path) return url

  const isGif = /\.gif(\?|#|$)/i.test(path)
  const transformationParts = [transformation]
  if (isGif && !transformation.includes('pr-true')) {
    transformationParts.push('pr-true')
  }

  return `${IMAGEKIT_URL_ENDPOINT}/tr:${transformationParts.join(',')}/${path}`
}

export function getImageKitImageUrlWithSize(
  url: string | undefined,
  width: number,
  height: number
): string {
  return getImageKitImageUrl(url, `${DEFAULT_IMAGE_TRANSFORMATION},w-${width},h-${height}`)
}

export function getImageKitVideoUrl(url: string | undefined): string {
  return getImageKitFileUrl(url)
}

function getImageKitVideoThumbnailUrl(
  url: string | undefined,
  options: VideoThumbnailOptions = {}
): string {
  if (!url) return ''
  if (isLocalPreviewUrl(url)) return url

  const path = getImageKitPath(url)
  if (!path) return url

  const timeSeconds = Math.max(0, Number((options.timeSeconds ?? 0).toFixed(2)))
  const transformations = [`so-${timeSeconds}`]

  if (options.width && options.width > 0) {
    transformations.push(`w-${Math.round(options.width)}`)
  }

  if (options.height && options.height > 0) {
    transformations.push(`h-${Math.round(options.height)}`)
  }

  return `${IMAGEKIT_URL_ENDPOINT}/${path}/ik-thumbnail.jpg?tr=${transformations.join(',')}`
}

export function getImageKitPosterUrl(
  url: string | undefined,
  options: VideoThumbnailOptions = {}
): string {
  if (!url) return ''

  const isVideoFrameUrl =
    url.includes(`://${CLOUDFLARE_MEDIA_HOST}/cdn-cgi/media/`) ||
    /\/ik-thumbnail\.jpg(\?|#|$)/i.test(url) ||
    VIDEO_EXTENSION_PATTERN.test(url)

  if (isVideoFrameUrl) {
    return getImageKitVideoThumbnailUrl(url, options)
  }

  if (options.width && options.height) {
    return getImageKitImageUrlWithSize(url, options.width, options.height)
  }

  return getImageKitImageUrl(url)
}

export function getVideoThumbnailUrl(url: string | undefined): string {
  return getImageKitVideoThumbnailUrl(url)
}

export function getCdnImageUrlWithSize(
  url: string | undefined,
  width: number,
  height: number
): string {
  return getImageKitImageUrlWithSize(url, width, height)
}
