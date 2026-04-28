'use client'

import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { BookOpenText } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useTranslations } from 'next-intl'
import PixelLobsterIcon from '@/assets/icons/pixel-lobster.svg'
import { cn } from '@/lib/utils'
import { LandingNavbar } from '@/components/landing'
import { OPENCLAW_HOW_VIDEO_COLUMNS } from '@/components/openclaw/openclaw-how-videos'
import { getVideoThumbnailUrl } from '@/lib/image-cdn'
import { getAppUrl } from '@/lib/app-url'
import styles from './openclaw-landing.module.css'

type TimelineStepCopy = {
  icon: string
  step: string
  title: string
  description: string
}

type FaqItemCopy = {
  question: string
  answer: string
}

function edgeProximity(el: HTMLElement, x: number, y: number): number {
  const { width, height } = el.getBoundingClientRect()
  const cx = width / 2
  const cy = height / 2
  const dx = x - cx
  const dy = y - cy
  if (dx === 0 && dy === 0) return 0
  const kx = dx !== 0 ? cx / Math.abs(dx) : Number.POSITIVE_INFINITY
  const ky = dy !== 0 ? cy / Math.abs(dy) : Number.POSITIVE_INFINITY
  return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1) * 100
}

function cursorAngle(el: HTMLElement, x: number, y: number): number {
  const { width, height } = el.getBoundingClientRect()
  const dx = x - width / 2
  const dy = y - height / 2
  if (dx === 0 && dy === 0) return 0
  const deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90
  return deg < 0 ? deg + 360 : deg
}

/** 两段完全相同的内容，配合 translateY(-50%) 做无缝循环 */
function buildSeamlessVideoSrcs(pair: readonly string[]): string[] {
  const [a, b] = pair
  const half = Array.from({ length: 8 }, (_, i) => (i % 2 === 0 ? a : b))
  return [...half, ...half]
}

const OpenClawHowVideoTrack = memo(function OpenClawHowVideoTrack({
  urls,
  direction,
  duration,
}: {
  urls: readonly string[]
  direction: 'up' | 'down'
  duration: string
}) {
  const srcs = React.useMemo(() => buildSeamlessVideoSrcs(urls), [urls])

  return (
    <div className={styles.ugcColumn}>
      <div
        className={cn(
          styles.ugcTrack,
          direction === 'up' ? styles.ugcTrackUp : styles.ugcTrackDown
        )}
        style={{ '--duration': duration } as React.CSSProperties}
      >
        {srcs.map((src, i) => (
          <div key={`${i}-${src}`} className={styles.ugcVideoCard}>
            {/* eslint-disable-next-line @next/next/no-img-element -- CDN first-frame thumbs; not in App Router image config */}
            <img
              className={styles.ugcVideo}
              src={getVideoThumbnailUrl(src)}
              alt=""
              loading="lazy"
              decoding="async"
              aria-hidden
            />
          </div>
        ))}
      </div>
    </div>
  )
})

const OpenClawFaqItem = memo(function OpenClawFaqItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItemCopy
  index: number
  isOpen: boolean
  onToggle: (index: number) => void
}) {
  const handleClick = useCallback(() => {
    onToggle(index)
  }, [index, onToggle])

  return (
    <article className={cn(styles.faqItem, isOpen && styles.faqItemOpen)}>
      <button
        type="button"
        className={styles.faqQ}
        onClick={handleClick}
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>
        <i className={styles.faqIcon}>+</i>
      </button>
      <div className={styles.faqAWrap}>
        <p className={styles.faqA}>{item.answer}</p>
      </div>
    </article>
  )
})

export function OpenClawLanding() {
  const t = useTranslations('openclaw')
  const locale = useLocale()

  const command = t('command')
  const commandSteps = t.raw('commandSteps') as string[]
  const timelineSteps = t.raw('timeline.steps') as TimelineStepCopy[]
  const faqItems = t.raw('faq.items') as FaqItemCopy[]
  const skillsRepo = t('external.skillsRepo')

  const panelRef = useRef<HTMLElement | null>(null)
  const timelineRef = useRef<HTMLDivElement | null>(null)
  const [timelineVisible, setTimelineVisible] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [copyLabel, setCopyLabel] = useState(() => t('panel.copy'))

  const onPanelPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const panel = panelRef.current
      if (!panel) return
      const rect = panel.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      panel.style.setProperty('--edge-proximity', edgeProximity(panel, x, y).toFixed(2))
      panel.style.setProperty('--cursor-angle', `${cursorAngle(panel, x, y).toFixed(2)}deg`)
    },
    []
  )

  useEffect(() => {
    const el = timelineRef.current
    if (!el) return undefined
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimelineVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopyLabel(t('panel.copied'))
    } catch {
      setCopyLabel(t('panel.copyFailed'))
    }
    window.setTimeout(() => {
      setCopyLabel(t('panel.copy'))
    }, 900)
  }, [command, t])

  const toggleFaq = useCallback((idx: number) => {
    setOpenFaqIndex(prev => (prev === idx ? -1 : idx))
  }, [])

  const handleGetApiToken = useCallback(() => {
    window.location.href = getAppUrl('/developer/apikeys', locale)
  }, [locale])

  return (
    <div className={styles.root}>
      <LandingNavbar />
      <div className={styles.grain} aria-hidden />

      <div className={styles.heroZone}>
        <section className={styles.hero} aria-labelledby="openclaw-hero-title">
          <div className={styles.heroText}>
            <span className={styles.heroKicker}>{t('hero.kicker')}</span>
            <h1 id="openclaw-hero-title" className={cn(styles.heroTitle, 'font-poller-one')}>
              {t('hero.titleBefore')}{' '}
              <span className={styles.heroAccent}>{t('hero.titleJoin')}</span>{' '}
              {t('hero.titleAfter')}
            </h1>
            <p className={styles.heroSub}>{t('hero.subtitle')}</p>
          </div>

          <aside
            ref={panelRef}
            className={styles.commandPanel}
            onPointerMove={onPanelPointerMove}
            aria-labelledby="openclaw-panel-title"
          >
            <span className={styles.edgeLight} aria-hidden />
            <div className={styles.panelHead}>
              <div className={styles.pixelLobsterWrap}>
                <PixelLobsterIcon className={styles.pixelLobster} aria-hidden />
              </div>
              <strong id="openclaw-panel-title">{t('panel.title')}</strong>
            </div>
            <p className={styles.panelDesc}>{t('panel.description')}</p>

            <div className={styles.commandBox}>
              <div className={styles.commandShell}>
                <span className={styles.commandShellLeft}>
                  <span className={styles.shellArrow}>&gt;_</span>
                  {t('panel.shellLabel')}
                </span>
                <button type="button" className={styles.copyBtn} onClick={handleCopy}>
                  {copyLabel}
                </button>
              </div>
              <div className={styles.commandCode}>
                <code>{command}</code>
              </div>
            </div>

            <p className={styles.howItWorksLabel}>{t('panel.howItWorks')}</p>
            <ol className={styles.commandSteps}>
              {commandSteps.map((step, i) => (
                <li key={step}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>

            <div className={styles.panelDivider} />

            <div className={styles.panelActions}>
              <a
                href={skillsRepo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.panelLinkBtn}
              >
                {t('panel.learnMore')}
              </a>
              <button type="button" className={styles.panelCtaBtn} onClick={handleGetApiToken}>
                {t('panel.getApiToken')}
              </button>
            </div>
          </aside>
        </section>
      </div>

      <main className={styles.mainContainer}>
        <section className={cn(styles.section, styles.howSection)} aria-labelledby="openclaw-how-title">
          <div className={styles.sectionHead}>
            <h2 id="openclaw-how-title" className="font-poller-one">
              {t('howSection.title')}
            </h2>
            <p>{t('howSection.subtitle')}</p>
          </div>

          <div className={styles.howUserGuideRow}>
            <a
              href={t('howSection.userGuideUrl')}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.howUserGuideBtn}
            >
              <BookOpenText className={styles.howUserGuideIcon} strokeWidth={2} aria-hidden />
              {t('howSection.userGuide')}
            </a>
          </div>

          <div className={styles.ugcStage}>
            <div className={styles.ugcBg}>
              <div className={styles.ugcColumns}>
                <OpenClawHowVideoTrack
                  urls={OPENCLAW_HOW_VIDEO_COLUMNS[0]}
                  direction="up"
                  duration="20s"
                />
                <OpenClawHowVideoTrack
                  urls={OPENCLAW_HOW_VIDEO_COLUMNS[1]}
                  direction="down"
                  duration="26s"
                />
                <OpenClawHowVideoTrack
                  urls={OPENCLAW_HOW_VIDEO_COLUMNS[2]}
                  direction="up"
                  duration="22s"
                />
                <OpenClawHowVideoTrack
                  urls={OPENCLAW_HOW_VIDEO_COLUMNS[3]}
                  direction="down"
                  duration="29s"
                />
              </div>
            </div>

            <div className={styles.timelineWrap}>
              <div
                ref={timelineRef}
                className={cn(styles.timeline, timelineVisible && styles.timelineVisible)}
              >
                <div className={styles.timelineGrid}>
                  {timelineSteps.map((step, idx) => (
                    <article
                      key={step.step}
                      className={cn(styles.timelineStep, idx === 1 && styles.timelineStepActive)}
                    >
                      <div className={styles.stepCard}>
                        <div className={styles.stepIcon}>{step.icon}</div>
                        <b>{step.step}</b>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className={cn(styles.section, styles.faqSection)}
          aria-labelledby="openclaw-faq-title"
        >
          <div className={styles.sectionHead}>
            <h2 id="openclaw-faq-title" className="font-poller-one">
              {t('faq.title')}
            </h2>
            <p>{t('faq.subtitle')}</p>
          </div>

          <div className={styles.faq}>
            {faqItems.map((item, idx) => (
              <OpenClawFaqItem
                key={item.question}
                item={item}
                index={idx}
                isOpen={openFaqIndex === idx}
                onToggle={toggleFaq}
              />
            ))}
          </div>

          <div className={styles.faqCta}>
            <button type="button" className={styles.faqCtaPrimary} onClick={handleGetApiToken}>
              {t('cta.getApiToken')}
            </button>
            <a
              href={skillsRepo}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.faqCtaGhost}
            >
              {t('cta.learnMore')}
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
