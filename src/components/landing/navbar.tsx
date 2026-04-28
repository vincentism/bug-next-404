'use client'

import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { useSafeState } from 'ahooks'
import { Menu, X } from 'lucide-react'
import { Listbox, ListboxItem } from '@heroui/listbox'
import { Tooltip } from '@heroui/tooltip'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { useLocale } from 'next-intl'
import { useTranslations } from '@/i18n/client'
import { getCdnImageUrlWithSize } from '@/lib/image-cdn'
import { appExternalAnchorProps, getAppUrl } from '@/lib/app-url'
import { LandingBookDemoModal } from './book-demo-modal'
import { SOLUTION_ITEMS } from './solution-items'
import { AnnouncementBarController } from './v3/controllers/announcement-bar-controller'
import { LandingAnnouncementBar } from './v3/layout/announcement-bar'
import './v3/styles/landing-v3.css'

const navbarLanguages = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'zh', label: '中文', nativeName: '中文' },
] as const

const MarkIcon = memo(function MarkIcon() {
  return (
    <svg className="nav__mark-svg" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M4.74503 0.102047L26.8104 0.102042C29.58 0 32 2.42 32 5.19V26.46C32 29.5 29.5 32 26.21 32C22.84 31.31 19.45 31.1 16.05 31.1C12.83 31.1 9.62 31.41 6.74 31.86C3.02 32.44 0 29.56 0 25.93V5.19C0 2.39 2.11 0.21 4.74503 0.102047ZM16 30.06C19.04 30.06 21.06 28.35 23.92 24.07C25.07 22.35 28.99 20.61 29.77 15.73C29.35 10.05 24.36 8.77 21.87 5.22C20.05 2.62 17.56 1.92 15.95 1.94C13.43 2.15 11.72 3.16 10.35 5.42C8.38 8.67 3.51 11.04 2.09 16.37C2.2 20.26 4.98 21.76 7.85 24.49C10.3 26.83 11.31 29.72 16 30.06Z" />
    </svg>
  )
})

export const LandingNavbar = memo(function LandingNavbar() {
  const [showWorkflowsMenu, setShowWorkflowsMenu] = useSafeState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useSafeState(false)
  const [bookDemoOpen, setBookDemoOpen] = useSafeState(false)
  const workflowsCloseTimerRef = useRef<number | null>(null)
  const pathname = usePathname()
  const locale = useLocale()
  const isHome = pathname === '/'
  const tNavbar = useTranslations('landing.navbar')

  const currentLanguage = useMemo(
    () => navbarLanguages.find(language => language.code === locale) ?? navbarLanguages[0],
    [locale]
  )
  const appHomeUrl = useMemo(() => getAppUrl('/', locale), [locale])
  const anchorHref = useCallback((hash: string) => (isHome ? hash : `/${hash}`), [isHome])

  const router = useRouter()
  const changeLanguage = useCallback(
    (nextLocale: string) => {
      router.replace(pathname, { locale: nextLocale as 'en' | 'zh' })
    },
    [pathname, router]
  )

  const handleLanguageAction = useCallback(
    (key: React.Key) => {
      changeLanguage(String(key))
    },
    [changeLanguage]
  )

  const clearWorkflowsCloseTimer = useCallback(() => {
    if (workflowsCloseTimerRef.current) {
      window.clearTimeout(workflowsCloseTimerRef.current)
      workflowsCloseTimerRef.current = null
    }
  }, [])

  const handleWorkflowsMouseEnter = useCallback(() => {
    clearWorkflowsCloseTimer()
    setShowWorkflowsMenu(true)
  }, [clearWorkflowsCloseTimer, setShowWorkflowsMenu])

  const handleWorkflowsMouseLeave = useCallback(() => {
    clearWorkflowsCloseTimer()
    workflowsCloseTimerRef.current = window.setTimeout(() => {
      setShowWorkflowsMenu(false)
      workflowsCloseTimerRef.current = null
    }, 140)
  }, [clearWorkflowsCloseTimer, setShowWorkflowsMenu])

  useEffect(() => clearWorkflowsCloseTimer, [clearWorkflowsCloseTimer])

  const openBookDemo = useCallback(() => {
    setBookDemoOpen(true)
  }, [setBookDemoOpen])

  const closeBookDemo = useCallback(() => {
    setBookDemoOpen(false)
  }, [setBookDemoOpen])

  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuOpen(value => !value),
    [setIsMobileMenuOpen]
  )

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [setIsMobileMenuOpen])

  const handleMobileBookDemoClick = useCallback(() => {
    setIsMobileMenuOpen(false)
    setBookDemoOpen(true)
  }, [setBookDemoOpen, setIsMobileMenuOpen])

  const handleMobileLanguageClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const nextLocale = event.currentTarget.dataset.locale
      if (nextLocale && nextLocale !== currentLanguage.code) {
        changeLanguage(nextLocale)
      }
      setIsMobileMenuOpen(false)
    },
    [changeLanguage, currentLanguage.code, setIsMobileMenuOpen]
  )

  const isOpenClaw = pathname === '/openclaw'
  const isPricing = pathname === '/pricing'

  return (
    <div className="landing-v3" data-surface="paper">
      <AnnouncementBarController />
      <LandingAnnouncementBar linkHref={anchorHref('#models')} />
      <nav className="nav" id="nav" aria-label="Primary" data-surface="paper">
        <Link href="/" prefetch={false} className="nav__brand" aria-label="OpenCreator home">
          <span className="nav__mark">
            <MarkIcon />
          </span>
          <span className="nav__wordmark">OpenCreator</span>
        </Link>
        <span className="nav__sep" aria-hidden="true" />
        <div className="nav__links">
          <Link href="/" prefetch={false} className={cn('nav__link', isHome && 'is-active')}>
            {tNavbar('home')}
          </Link>
          <div onMouseEnter={handleWorkflowsMouseEnter} onMouseLeave={handleWorkflowsMouseLeave}>
            <button
              type="button"
              className="nav__link"
              aria-haspopup="menu"
              aria-expanded={showWorkflowsMenu}
            >
              {tNavbar('solutions')}
              <svg
                className="nav__caret"
                viewBox="0 0 10 10"
                width="10"
                height="10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 4l3 3 3-3"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <Link
            href="/pricing"
            prefetch={false}
            className={cn('nav__link', isPricing && 'is-active')}
          >
            {tNavbar('pricing')}
          </Link>
          <Link
            href="/openclaw"
            prefetch={false}
            className={cn('nav__link', isOpenClaw && 'is-active')}
          >
            {tNavbar('openClaw')}
          </Link>
          <a className="nav__link" href={anchorHref('#community')}>
            {tNavbar('community')}
          </a>
        </div>
        <span className="nav__spacer" />
        <button
          type="button"
          className="nav__cta nav__cta--ghost"
          onClick={openBookDemo}
          data-cursor="open"
        >
          {tNavbar('bookADemo')}
        </button>
        <a
          href={appHomeUrl}
          {...appExternalAnchorProps}
          className="nav__cta nav__cta--primary"
          data-cursor="open"
        >
          {tNavbar('startForFree')}
        </a>
        <Tooltip
          placement="bottom"
          content={
            <div className="bg-white px-0 py-1 min-w-[120px]">
              <Listbox
                aria-label="Language selection"
                onAction={handleLanguageAction}
                variant="flat"
                className="p-0"
              >
                {navbarLanguages.map(lang => (
                  <ListboxItem
                    key={lang.code}
                    className={cn(
                      'text-[12px] px-2 py-1.5',
                      lang.code === currentLanguage.code && 'bg-[#F2F2F2]'
                    )}
                  >
                    {lang.nativeName}
                  </ListboxItem>
                ))}
              </Listbox>
            </div>
          }
        >
          <button type="button" className="nav__lang" aria-label={tNavbar('ariaSwitchLanguage')}>
            <span className="nav__lang-zh">文</span>
            <span className="nav__lang-en">A</span>
          </button>
        </Tooltip>
        <button
          type="button"
          className="nav__menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? 'Close' : 'Menu'}
          {isMobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
        </button>
        {showWorkflowsMenu && (
          <div
            className="nav__dropdown"
            onMouseEnter={handleWorkflowsMouseEnter}
            onMouseLeave={handleWorkflowsMouseLeave}
          >
            {SOLUTION_ITEMS.map(item => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className="nav__dropdown-item"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- small dropdown thumbnails */}
                <img
                  className="nav__dropdown-thumb"
                  src={getCdnImageUrlWithSize(item.image, 96, 96)}
                  alt=""
                  loading="lazy"
                />
                <span>
                  <span className="nav__dropdown-title">{tNavbar(item.titleKey)}</span>
                  <span className="nav__dropdown-desc">{tNavbar(item.descKey)}</span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </nav>
      {isMobileMenuOpen && (
        <div className="nav__mobile" data-surface="paper">
          <Link href="/" prefetch={false} onClick={closeMobileMenu}>
            {tNavbar('home')}
          </Link>
          <a href={appHomeUrl} {...appExternalAnchorProps} onClick={closeMobileMenu}>
            {tNavbar('solutions')}
          </a>
          <Link href="/pricing" prefetch={false} onClick={closeMobileMenu}>
            {tNavbar('pricing')}
          </Link>
          <Link href="/openclaw" prefetch={false} onClick={closeMobileMenu}>
            {tNavbar('openClaw')}
          </Link>
          <a href={anchorHref('#community')} onClick={closeMobileMenu}>
            {tNavbar('community')}
          </a>
          <button type="button" onClick={handleMobileBookDemoClick}>
            {tNavbar('bookADemo')}
          </button>
          <a href={appHomeUrl} {...appExternalAnchorProps} onClick={closeMobileMenu}>
            {tNavbar('startForFree')}
          </a>
          {navbarLanguages.map(lang => (
            <button
              key={lang.code}
              type="button"
              data-locale={lang.code}
              onClick={handleMobileLanguageClick}
            >
              {lang.nativeName}
            </button>
          ))}
        </div>
      )}
      <LandingBookDemoModal open={bookDemoOpen} onClose={closeBookDemo} />
    </div>
  )
})
