const DEFAULT_SITE_URL = 'https://opencreator.io'

export function getSiteUrl() {
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }

  return DEFAULT_SITE_URL
}

type FAQItemLike = {
  question: string
  answer: string
}

export function createSchemaGraph(schemas: unknown[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  }
}

export function buildOrganizationSchema(params: {
  url: string
  name: string
  logoUrl?: string
  sameAs?: string[]
}) {
  const { url, name, logoUrl, sameAs } = params

  return {
    '@type': 'Organization',
    '@id': `${url}#organization`,
    url,
    name,
    logo: logoUrl,
    sameAs,
  }
}

export function buildWebSiteSchema(params: { url: string; name: string }) {
  const { url, name } = params

  return {
    '@type': 'WebSite',
    '@id': `${url}#website`,
    url,
    name,
  }
}

export function buildWebPageSchema(params: {
  url: string
  name: string
  description?: string
  pageType?: string
}) {
  const { url, name, description, pageType } = params

  return {
    '@type': pageType || 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
  }
}

export function buildFaqPageSchema(params: { url: string; name: string; faqItems: FAQItemLike[] }) {
  const { url, name, faqItems } = params

  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    url,
    name,
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function buildSoftwareApplicationSchema(params: {
  url: string
  name: string
  description: string
  applicationCategory: string
  offers?: {
    price: string
    priceCurrency: string
  }
}) {
  const { url, name, description, applicationCategory, offers } = params

  return {
    '@type': 'SoftwareApplication',
    '@id': `${url}#software`,
    url,
    name,
    description,
    applicationCategory,
    operatingSystem: 'Web Browser',
    ...(offers && {
      offers: {
        '@type': 'Offer',
        price: offers.price,
        priceCurrency: offers.priceCurrency,
      },
    }),
  }
}

export function buildVideoObjectSchema(params: {
  url: string
  name: string
  description: string
  thumbnailUrl?: string
  uploadDate?: string
  contentUrl?: string
  embedUrl?: string
}) {
  const { url, name, description, thumbnailUrl, uploadDate, contentUrl, embedUrl } = params

  return {
    '@type': 'VideoObject',
    '@id': `${url}#video`,
    url,
    name,
    description,
    thumbnailUrl,
    uploadDate: uploadDate || new Date().toISOString(),
    contentUrl,
    embedUrl,
  }
}

export function buildBreadcrumbSchema(params: { items: { name: string; url: string }[] }) {
  const { items } = params

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
