import type { Metadata } from 'next'
import React from 'react'
import { getTranslations } from '@/i18n/get-translations'
import OffModalTips from '@/components/dialog/off_modal_tips'
import type { FAQItem } from '@/components/landing/faq'
import { OpenClawLanding } from '@/components/openclaw/openclaw-landing'
import { JsonLd } from '@/components/seo/json-ld'
import { buildFaqPageSchema, buildWebPageSchema, createSchemaGraph } from '@/lib/seo/schema'
import { buildAlternatesMetadata, getCanonicalUrl } from '@/lib/seo/urls'

type PageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'openclaw' })

  return {
    title: t('seo.title'),
    description: t('seo.description'),
    keywords: t.raw('seo.keywords') as string[],
    alternates: buildAlternatesMetadata('/openclaw', locale),
  }
}

export default async function OpenClawPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'openclaw' })
  const faqItems = t.raw('faq.items') as FAQItem[]
  const pageUrl = getCanonicalUrl('/openclaw', locale)

  return (
    <>
      <OffModalTips />
      <OpenClawLanding />
      <JsonLd
        id="openclaw-schema"
        data={createSchemaGraph([
          buildWebPageSchema({
            url: pageUrl,
            name: t('seo.webPageName'),
            description: t('seo.description'),
          }),
          buildFaqPageSchema({
            url: pageUrl,
            name: t('seo.faqSchemaName'),
            faqItems,
          }),
        ])}
      />
    </>
  )
}
