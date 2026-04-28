import type { Metadata } from 'next'
import React from 'react'
import { LandingNavbar, LandingFooter } from '@/components/landing'
import OffModalTips from '@/components/dialog/off_modal_tips'
import { JsonLd } from '@/components/seo/json-ld'
import { buildWebPageSchema, createSchemaGraph, getSiteUrl } from '@/lib/seo/schema'
import { LegalMarkdown } from '@/components/legal/legal-markdown'

export const metadata: Metadata = {
  title: 'Privacy Policy | OpenCreator',
  description: 'Understand how OpenCreator collects, uses, and protects your data.',
  keywords: [
    'OpenCreator privacy policy',
    'data protection',
    'user data privacy',
    'AI tool privacy',
    'GDPR friendly',
  ],
}

type PrivacyPolicyPageProps = {
  // Next.js 15 dynamic route params are provided as a Promise
  params: Promise<{ locale: string }>
}

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const { locale } = await params
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/privacy-policy`

  const pageTitle = (metadata.title as string) || 'Privacy Policy | OpenCreator'
  const pageDescription =
    metadata.description || 'Understand how OpenCreator collects, uses, and protects your data.'

  const webPageSchema = createSchemaGraph([
    buildWebPageSchema({
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
      pageType: 'WebPage',
    }),
  ])

  return (
    <div className="w-full min-h-screen bg-[#F7F7F7]">
      <OffModalTips />
      <LandingNavbar />
      <div className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <div className="mb-10 md:mb-14">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-poller-one text-black mb-4 text-center">
              Privacy Policy
            </h1>
            <p className="text-base md:text-lg text-gray-600 text-center max-w-2xl mx-auto">
              Learn how OpenCreator handles your personal data responsibly.
            </p>
          </div>
          <div className="bg-white shadow-xs border border-gray-100">
            <LegalMarkdown markdownRelativePath="src/app/[locale]/privacy-policy/content.md" />
          </div>
        </div>
      </div>
      <LandingFooter />
      <JsonLd id="privacy-webpage-schema" data={webPageSchema} />
    </div>
  )
}
