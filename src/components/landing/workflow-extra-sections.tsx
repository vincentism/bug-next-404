'use client'

import React from 'react'
import { useLocale } from 'next-intl'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from '@/i18n/client'
import { appExternalAnchorProps, getAppUrl } from '@/lib/app-url'

function extractShareIdFromLink(link: string): string | null {
  try {
    return new URL(link).searchParams.get('shareid')
  } catch {
    return null
  }
}

interface AudienceItem {
  label: string
  description: string
}

interface WorkflowWhoIsForSectionProps {
  title?: string
  subtitle?: string
  audiences: AudienceItem[]
}

export function WorkflowWhoIsForSection({
  title = 'Who is this for?',
  audiences,
}: WorkflowWhoIsForSectionProps) {
  return (
    <section className="bg-[#F7F7F7] py-16 md:py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-3xl font-poller-one text-black md:text-4xl lg:text-5xl">{title}</h2>
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {audiences.map(audience => (
            <div
              key={audience.label}
              className="rounded-2xl border-2 border-black bg-white p-5 shadow-[0_14px_0_#000]"
            >
              <h3 className="font-poller-one text-lg text-black">{audience.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface WorkflowStepItem {
  title?: string
  description?: string
}

interface WorkflowHowItWorksSectionProps {
  title?: string
  subtitle?: string
  workflowKey?: string
  steps?: WorkflowStepItem[]
  ctaLink?: string
}

export function WorkflowHowItWorksSection({
  title = 'How it works',
  subtitle = 'Follow the workflow from inputs to final creative output.',
  workflowKey,
  steps = [],
  ctaLink,
}: WorkflowHowItWorksSectionProps) {
  void workflowKey

  const locale = useLocale()
  const shareId = ctaLink ? extractShareIdFromLink(ctaLink) : null
  const appLink = shareId ? getAppUrl(`/canvas?shareid=${shareId}`, locale) : getAppUrl('/', locale)

  return (
    <section className="bg-white py-16 md:py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-poller-one text-black md:text-4xl lg:text-5xl">{title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 md:text-base">{subtitle}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={`${step.title}-${index}`}
              className="rounded-2xl border-2 border-black bg-[#F7F7F7] p-5 shadow-[0_10px_0_#000]"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black bg-[#1fde1f] text-xs font-black">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-black">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={appLink}
            {...appExternalAnchorProps}
            className="inline-flex items-center rounded-full bg-black px-6 py-3 text-sm font-bold text-[#1fde1f]"
          >
            Open in OpenCreator App
            <ChevronRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

interface WorkflowSharePreviewProps {
  shareId?: string
  ctaLink?: string
}

export function WorkflowSharePreview({ shareId, ctaLink }: WorkflowSharePreviewProps) {
  const locale = useLocale()
  const t = useTranslations('landing.workflow')
  const resolvedShareId = shareId || (ctaLink ? extractShareIdFromLink(ctaLink) : null)

  if (!resolvedShareId) {
    return (
      <div className="mx-auto flex h-[280px] w-full max-w-5xl items-center justify-center rounded-2xl border-2 border-dashed border-black/10 bg-white/60 text-xs text-gray-400">
        No workflow to preview
      </div>
    )
  }

  const appLink = getAppUrl(`/canvas?shareid=${resolvedShareId}`, locale)

  return (
    <div className="mx-auto w-full max-w-5xl rounded-2xl border-2 border-black bg-white p-6 shadow-[0_14px_0_#000]">
      <div className="grid gap-4 md:grid-cols-3">
        {['Input assets', 'AI workflow', 'Final output'].map((label, index) => (
          <div key={label} className="rounded-2xl border border-black/10 bg-[#f7f8f9] p-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black bg-[#1fde1f] text-xs font-black">
              {index + 1}
            </span>
            <h3 className="mt-4 font-bold text-black">{label}</h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-500">
              Open the full interactive workflow in OpenCreator App.
            </p>
          </div>
        ))}
      </div>
      <a
        href={appLink}
        {...appExternalAnchorProps}
        className="mt-6 inline-flex items-center rounded-full bg-black px-5 py-3 text-sm font-bold text-[#1fde1f]"
      >
        {t('copyThisTemplate')}
        <ChevronRight className="ml-2 h-4 w-4" />
      </a>
    </div>
  )
}

interface WorkflowPreviewSectionProps {
  shareId?: string
  ctaLink?: string
  title?: string
  subtitle?: string
}

export function WorkflowPreviewSection({
  shareId,
  ctaLink,
  title = 'See the Workflow in Action',
  subtitle = 'Explore the actual AI workflow that powers this template.',
}: WorkflowPreviewSectionProps) {
  const resolvedShareId = shareId || (ctaLink ? extractShareIdFromLink(ctaLink) : null)

  if (!resolvedShareId) return null

  return (
    <section className="bg-[#F7F7F7] py-12 md:py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="mb-3 text-3xl font-poller-one text-black md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-gray-600 md:text-base">{subtitle}</p>
        </div>
        <WorkflowSharePreview shareId={resolvedShareId} />
      </div>
    </section>
  )
}

interface WorkflowCTASectionProps {
  title?: string
  description?: string
  ctaLabel?: string
  ctaLink?: string
}

export function WorkflowCTASection({
  title = 'Ready to use this workflow?',
  description = 'Open it in OpenCreator App and start producing content.',
  ctaLabel = 'Open workflow',
  ctaLink,
}: WorkflowCTASectionProps) {
  const locale = useLocale()
  const shareId = ctaLink ? extractShareIdFromLink(ctaLink) : null
  const appLink = shareId ? getAppUrl(`/canvas?shareid=${shareId}`, locale) : getAppUrl('/', locale)

  return (
    <section className="bg-black py-16 text-white md:py-20">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-poller-one md:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 md:text-base">{description}</p>
        <a
          href={appLink}
          {...appExternalAnchorProps}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[#1fde1f] px-8 py-3 text-sm font-bold text-black"
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  )
}
