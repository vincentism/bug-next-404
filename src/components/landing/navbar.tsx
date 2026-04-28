'use client'

import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { useSafeState } from 'ahooks'
import { Languages, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Image } from '@heroui/image'
import { Listbox, ListboxItem } from '@heroui/listbox'
import { Tooltip } from '@heroui/tooltip'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import LandingDiscordIcon from '@/assets/icons/landing-discord.svg'
import LandingWechatIcon from '@/assets/icons/landing-wechat.svg'
import { cn } from '@/lib/utils'
import { useLocale } from 'next-intl'
import { useTranslations } from '@/i18n/client'
import { getCdnImageUrlWithSize } from '@/lib/image-cdn'
import { LandingBookDemoModal } from './book-demo-modal'
import { SOLUTION_ITEMS } from './solution-items'

const DISCORD_URL = 'https://discord.gg/rRKngTWjt6'
const WECHAT_QR_URL = 'https://ik.imagekit.io/opencreator/web/qrcode/qrcode.jpg'
const navbarLanguages = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'zh', label: '中文', nativeName: '中文' },
] as const

const ChevronDownIcon = memo(function ChevronDownIcon({ rotated }: { rotated: boolean }) {
  return (
    <span
      className={cn('inline-flex transition-transform shrink-0', rotated && 'rotate-180')}
      aria-hidden
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  )
})

const navLinkClass =
  'inline-flex items-center py-2 text-base text-gray-900 transition-colors hover:text-gray-600'

const navIconBtnClass =
  'w-9 h-9 rounded-full border-2 border-black/[0.12] bg-transparent text-[#444] inline-grid place-items-center shrink-0 transition-colors hover:text-gray-600 hover:bg-gray-50/90 hover:border-black'

export const LandingNavbar = memo(function LandingNavbar() {
  const [showWorkflowsMenu, setShowWorkflowsMenu] = useSafeState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useSafeState(false)
  const [bookDemoOpen, setBookDemoOpen] = useSafeState(false)
  const hideWorkflowsTimeoutRef = useRef<number | null>(null)
  const pathname = usePathname()
  const locale = useLocale()

  const currentLanguage = useMemo(
    () => navbarLanguages.find(language => language.code === locale) ?? navbarLanguages[0],
    [locale]
  )
  const tNavbar = useTranslations('landing.navbar')

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

  const handleWorkflowsMouseEnter = useCallback(() => {
    if (hideWorkflowsTimeoutRef.current) {
      window.clearTimeout(hideWorkflowsTimeoutRef.current)
      hideWorkflowsTimeoutRef.current = null
    }
    setShowWorkflowsMenu(true)
  }, [setShowWorkflowsMenu])

  const handleWorkflowsMouseLeave = useCallback(() => {
    if (hideWorkflowsTimeoutRef.current) {
      window.clearTimeout(hideWorkflowsTimeoutRef.current)
    }
    hideWorkflowsTimeoutRef.current = window.setTimeout(() => {
      setShowWorkflowsMenu(false)
    }, 80)
  }, [setShowWorkflowsMenu])

  const openBookDemo = useCallback(() => {
    setBookDemoOpen(true)
  }, [setBookDemoOpen])

  const closeBookDemo = useCallback(() => {
    setBookDemoOpen(false)
  }, [setBookDemoOpen])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(value => !value)
  }, [setIsMobileMenuOpen])

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

  useEffect(() => {
    router.prefetch('/skills')
    router.prefetch('/openclaw')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    return () => {
      if (hideWorkflowsTimeoutRef.current) {
        window.clearTimeout(hideWorkflowsTimeoutRef.current)
        hideWorkflowsTimeoutRef.current = null
      }
    }
  }, [])

  const isHome = pathname === '/'
  const isOpenClaw = pathname === '/openclaw'
  const isPricing = pathname === '/pricing'

  return (
    <div className="h-20 w-full shrink-0">
      <header
        className="fixed top-0 z-50 w-full bg-white/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link
            href="/"
            prefetch={false}
            className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity"
          >
            <img src="/icons/logo_512.png" alt="OpenCreator" className="h-8 w-8 shrink-0" />
            <span className="text-xl font-black font-poller-one">OpenCreator</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6" aria-label="Main">
              <Link
                href="/"
                prefetch={false}
                className={cn(navLinkClass, isHome && 'font-semibold text-gray-900')}
              >
                {tNavbar('home')}
              </Link>

              <div
                className="relative"
                onMouseEnter={handleWorkflowsMouseEnter}
                onMouseLeave={handleWorkflowsMouseLeave}
              >
                <button
                  type="button"
                  className={cn(navLinkClass, 'gap-1 cursor-pointer')}
                  aria-expanded={showWorkflowsMenu}
                >
                  {tNavbar('solutions')}
                  <ChevronDownIcon rotated={showWorkflowsMenu} />
                </button>

                <AnimatePresence>
                  {showWorkflowsMenu && (
                    <>
                      <div className="absolute top-full left-0 w-64 h-2 bg-transparent" />
                      <motion.div
                        className="absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden"
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.16, ease: 'easeOut' }}
                      >
                        <div className="py-2">
                          {SOLUTION_ITEMS.map(item => (
                            <Link
                              key={item.href}
                              href={item.href}
                              prefetch={false}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                            >
                              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element -- small dropdown thumbs; CDN URLs */}
                                <img
                                  src={getCdnImageUrlWithSize(item.image, 96, 96)}
                                  alt=""
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">
                                  {tNavbar(item.titleKey)}
                                </p>
                                <p className="text-xs text-gray-500 line-clamp-1">
                                  {tNavbar(item.descKey)}
                                </p>
                              </div>
                            </Link>
                          ))}
                          <div className="border-t border-gray-100 mt-1 pt-1">
                            <Link
                              href="/skills"
                              prefetch={false}
                              className="block px-4 py-2 text-sm text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                            >
                              {tNavbar('solutionItems.viewAll')} →
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/pricing"
                prefetch={false}
                className={cn(navLinkClass, isPricing && 'font-semibold text-gray-900')}
              >
                {tNavbar('pricing')}
              </Link>

              <Link
                href="/openclaw"
                prefetch={false}
                className={cn(navLinkClass, isOpenClaw && 'font-semibold text-gray-900')}
              >
                <span aria-hidden>🦞</span>
                <span className="ml-1">{tNavbar('openClaw')}</span>
              </Link>
            </nav>

            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex items-center gap-2.5" aria-label="Social">
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={navIconBtnClass}
                  aria-label={tNavbar('ariaDiscord')}
                >
                  <LandingDiscordIcon className="w-[18px] h-[18px] shrink-0" aria-hidden />
                </a>
                <Tooltip
                  placement="bottom"
                  showArrow
                  classNames={{ content: 'px-3 py-2' }}
                  content={
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs text-gray-700">{tNavbar('ariaWeChat')}</span>
                      <Image
                        width={120}
                        height={120}
                        radius="none"
                        src={WECHAT_QR_URL}
                        alt=""
                        classNames={{ wrapper: 'shrink-0' }}
                      />
                    </div>
                  }
                >
                  <button
                    type="button"
                    className={navIconBtnClass}
                    aria-label={tNavbar('ariaWeChat')}
                  >
                    <LandingWechatIcon className="w-[18px] h-[18px] shrink-0" aria-hidden />
                  </button>
                </Tooltip>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center px-8 py-2 bg-white text-black font-bold rounded-xl border-2 border-gray-300 whitespace-nowrap transition-colors hover:text-gray-600 hover:border-black"
                onClick={openBookDemo}
              >
                {tNavbar('bookADemo')}
              </button>

              <Link
                href="/skills"
                prefetch={false}
                className="inline-flex items-center justify-center px-8 py-2 bg-white text-black font-bold rounded-xl border-2 border-black hover:bg-theme-pink hover:text-white hover:border-black hover:border-dashed transition-colors"
              >
                {tNavbar('startForFree')}
              </Link>

              <Tooltip
                placement="bottom"
                showArrow
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
                          <div className="flex items-center">
                            <span className="font-medium">{lang.nativeName}</span>
                          </div>
                        </ListboxItem>
                      ))}
                    </Listbox>
                  </div>
                }
              >
                <button
                  type="button"
                  className={navIconBtnClass}
                  aria-label={tNavbar('ariaSwitchLanguage')}
                >
                  <Languages className="w-4 h-4" strokeWidth={1.8} aria-hidden />
                </button>
              </Tooltip>
            </div>
          </div>

          <button
            type="button"
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1" aria-label="Mobile">
              <Link
                href="/"
                prefetch={false}
                className={cn('block py-2 text-base font-medium hover:text-gray-600 transition-colors', isHome && 'font-semibold')}
                onClick={closeMobileMenu}
              >
                {tNavbar('home')}
              </Link>
              <Link
                href="/skills"
                prefetch={false}
                className="block py-2 text-base font-medium hover:text-gray-600 transition-colors"
                onClick={closeMobileMenu}
              >
                {tNavbar('solutions')}
              </Link>
              <Link
                href="/pricing"
                prefetch={false}
                className={cn('block py-2 text-base font-medium hover:text-gray-600 transition-colors', isPricing && 'font-semibold')}
                onClick={closeMobileMenu}
              >
                {tNavbar('pricing')}
              </Link>
              <Link
                href="/openclaw"
                prefetch={false}
                className={cn('block py-2 text-base font-medium hover:text-gray-600 transition-colors', isOpenClaw && 'font-semibold')}
                onClick={closeMobileMenu}
              >
                🦞 {tNavbar('openClaw')}
              </Link>

              <div className="flex items-center gap-2 pt-3 pb-1">
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={navIconBtnClass}
                  aria-label={tNavbar('ariaDiscord')}
                >
                  <LandingDiscordIcon className="w-[18px] h-[18px] shrink-0" aria-hidden />
                </a>
                <Tooltip
                  placement="bottom"
                  showArrow
                  content={
                    <div className="flex flex-col items-center gap-2 p-1">
                      <Image
                        width={120}
                        height={120}
                        radius="none"
                        src={WECHAT_QR_URL}
                        alt=""
                      />
                    </div>
                  }
                >
                  <button type="button" className={navIconBtnClass} aria-label={tNavbar('ariaWeChat')}>
                    <LandingWechatIcon className="w-[18px] h-[18px] shrink-0" aria-hidden />
                  </button>
                </Tooltip>
              </div>

              <button
                type="button"
                className="block w-full text-center mt-2 py-2 px-8 rounded-xl border-2 border-gray-300 bg-white text-black font-bold hover:text-gray-600 hover:border-gray-400 transition-colors"
                onClick={handleMobileBookDemoClick}
              >
                {tNavbar('bookADemo')}
              </button>

              <Link
                href="/skills"
                prefetch={false}
                className="block w-full text-center mt-2 py-2 px-8 rounded-xl border-2 border-black bg-white text-black font-bold hover:bg-theme-pink hover:text-white hover:border-black hover:border-dashed transition-colors"
                onClick={closeMobileMenu}
              >
                {tNavbar('startForFree')}
              </Link>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-200 mt-4">
                <span className="text-sm text-gray-500">{tNavbar('language')}</span>
                <div className="flex gap-2 flex-wrap">
                  {navbarLanguages.map(lang => (
                    <button
                      key={lang.code}
                      type="button"
                      data-locale={lang.code}
                      onClick={handleMobileLanguageClick}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-base border transition-colors',
                        lang.code === currentLanguage.code
                          ? 'bg-[#111] text-white border-[#111]'
                          : 'bg-white text-gray-700 border-gray-300'
                      )}
                    >
                      {lang.nativeName}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      <LandingBookDemoModal open={bookDemoOpen} onClose={closeBookDemo} />
    </div>
  )
})
