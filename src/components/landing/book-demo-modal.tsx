'use client'

import React, { memo, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Check } from 'lucide-react'
import { useLocale } from 'next-intl'
import { usePathname } from '@/i18n/navigation'
import { useTranslations } from '@/i18n/client'
import { cn } from '@/lib/utils'

const BOOK_DEMO_CAL_URL = 'https://cal.com/annie-liu/opencreator'
/** 中文落地页通用企业咨询码 */
const QR_ZH_DEFAULT = 'https://ik.imagekit.io/opencreator/web/qrcode/qrcode.jpg'
/** 中文 /zh/openclaw 专用微信码（pathname 在 next-intl 下为 /openclaw） */
const QR_ZH_OPENCLAW = 'https://ik.imagekit.io/opencreator/web/qrcode/wechat_code.jpeg'

type LandingBookDemoModalProps = {
  open: boolean
  onClose: () => void
}

export const LandingBookDemoModal = memo(function LandingBookDemoModal({
  open,
  onClose,
}: LandingBookDemoModalProps) {
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('landing.bookDemoModal')
  const locale = useLocale()
  const pathname = usePathname()
  const isZh = locale === 'zh'
  const bullets = t.raw('bullets') as string[]

  const zhQrSrc = pathname === '/openclaw' ? QR_ZH_OPENCLAW : QR_ZH_DEFAULT

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    },
    [onClose]
  )

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) onClose()
    },
    [onClose]
  )

  const stopDialogClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown, open])

  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!mounted || !open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm"
      role="presentation"
      onClick={handleBackdropClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-demo-modal-title"
        className={cn(
          'relative w-full max-w-[460px] rounded-[24px] bg-white px-8 pt-9 pb-8',
          'shadow-[0_12px_40px_rgba(0,0,0,0.13),0_2px_8px_rgba(0,0,0,0.05)]'
        )}
        onClick={stopDialogClick}
      >
        <button
          type="button"
          className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full border border-[#e5e5e5] bg-[#f5f5f5] text-[13px] text-[#888] transition-colors hover:bg-[#ebebeb] hover:text-[#333]"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <h2
          id="book-demo-modal-title"
          className="mb-3.5 pr-8 font-poller-one text-[22px] font-normal leading-tight tracking-wide text-[#101010]"
        >
          {t('title')}
        </h2>

        <p className="mb-5 text-sm leading-relaxed text-[#666]">{t('description')}</p>

        <p className="mb-3.5 text-[13px] font-bold uppercase tracking-wider text-[#111]">
          {t('offerLabel')}
        </p>

        <ul className="mb-7 flex flex-col gap-[13px] p-0">
          {bullets.map(item => (
            <li key={item} className="flex items-start gap-[11px] text-sm leading-normal text-[#222]">
              <span
                className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-green-500"
                aria-hidden
              >
                <Check className="h-2.5 w-2.5 text-green-500" strokeWidth={2.5} aria-hidden />
              </span>
              {item}
            </li>
          ))}
        </ul>

        {isZh ? (
          // eslint-disable-next-line @next/next/no-img-element -- modal QR from CDN; path-specific asset for /openclaw
          <img
            src={zhQrSrc}
            alt={t('qrAlt')}
            width={180}
            height={180}
            className="mx-auto block h-[180px] w-[180px] rounded-xl object-contain"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <a
            href={BOOK_DEMO_CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-[14px] bg-[#111] py-3.5 text-center text-sm font-bold tracking-wide text-white transition-colors hover:bg-[#2a2a2a]"
            onClick={onClose}
          >
            {t('cta')}
          </a>
        )}
      </div>
    </div>,
    document.body
  )
})
