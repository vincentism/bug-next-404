'use client'

import React, { memo, useMemo } from 'react'
import { Link } from '@/i18n/navigation'
import { Globe2, Instagram, Youtube } from 'lucide-react'
import { useTranslations } from '@/i18n/client'
import { useLocale } from 'next-intl'
import './v3/styles/landing-v3.css'

const footerLanguages = [
  { code: 'en', label: 'English (US)', nativeName: 'English' },
  { code: 'zh', label: '中文', nativeName: '中文' },
] as const

export const LandingFooter = memo(function LandingFooter() {
  const t = useTranslations('landing.footer')
  const tNavbar = useTranslations('landing.navbar')
  const locale = useLocale()

  const currentLanguage = useMemo(
    () => footerLanguages.find(language => language.code === locale) ?? footerLanguages[0],
    [locale]
  )

  return (
    <div className="landing-v3" data-surface="paper">
      <footer className="footer" id="footer" role="contentinfo" data-surface="ink">
        <div className="footer__inner">
          <div className="footer__top">
            <div className="footer__brand">
              <Link className="footer__logo" href="/" aria-label="OpenCreator home">
                OpenCreator
              </Link>
              <p className="footer__tag">The commercial content agent.</p>
              <ul className="footer__socials" aria-label="Social links">
                <li>
                  <Link
                    href="https://discord.gg/rRKngTWjt6"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Discord"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.63 12.63 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .031-.056c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.youtube.com/@OpenCreator-io"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                  >
                    <Youtube size={18} />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://x.com/opencreator_io"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X / Twitter"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M18.244 2H21.5l-7.5 8.57L22.75 22h-6.84l-5.36-6.88L4.26 22H1l8.08-9.23L1.38 2h7.02l4.85 6.34L18.24 2zm-1.2 18h1.88L6.97 3.92H4.96L17.04 20z" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/annieliu_opencreator/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <Instagram size={18} />
                  </Link>
                </li>
              </ul>
            </div>

            <nav className="footer__col" aria-label="Product">
              <h4 className="footer__h4">{t('productTitle')}</h4>
              <ul>
                <li>
                  <Link
                    href="https://opencreator.super.site/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('links.productWiki')}
                  </Link>
                </li>
                <li>
                  <Link href="/pricing">{t('links.pricing')}</Link>
                </li>
                <li>
                  <Link
                    href="https://discord.gg/rRKngTWjt6"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('links.community')}
                  </Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </nav>

            <nav className="footer__col" aria-label="Solutions">
              <h4 className="footer__h4">{t('solutionsTitle')}</h4>
              <ul>
                <li>
                  <Link href="/solutions/ecommerce-product-images">
                    {t('solutionsLinks.ecommerceProductImages')}
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/ai-fashion">{t('solutionsLinks.aiFashion')}</Link>
                </li>
                <li>
                  <Link href="/solutions/ai-portrait">{t('solutionsLinks.aiPortrait')}</Link>
                </li>
                <li>
                  <Link href="/solutions/ai-video">{t('solutionsLinks.aiVideo')}</Link>
                </li>
                <li>
                  <Link href="/solutions/ai-design">{t('solutionsLinks.aiDesign')}</Link>
                </li>
              </ul>
            </nav>

            <nav className="footer__col" aria-label="Company">
              <h4 className="footer__h4">{t('companyTitle')}</h4>
              <ul>
                <li>
                  <Link href="/privacy-policy">{t('companyLinks.privacyPolicy')}</Link>
                </li>
                <li>
                  <Link href="/terms-of-use">{t('companyLinks.termsOfService')}</Link>
                </li>
                <li>
                  <Link
                    href="https://www.freeprivacypolicy.com/live/c04f0fc9-eb4d-443a-90dc-1cf893172a85"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('companyLinks.cookiePolicy')}
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="footer__col footer__col--contact" aria-label="Contact">
              <h4 className="footer__h4">{t('contactTitle')}</h4>
              <ul>
                <li>
                  <Link href="mailto:support@opencreator.io">{t('contactLinks.supportEmail')}</Link>
                </li>
                <li>
                  <Link
                    href="https://uusd8j57636y.sg.larksuite.com/share/base/form/shrlgNBmyK5OBha9x1PFYWXnA3e?from=navigation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__founder"
                  >
                    {t('contactLinks.talkToFounder')} <span aria-hidden="true">→</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer__bottom">
            <p className="footer__copy">© 2026 OpenCreator, Inc. All rights reserved.</p>
            <div className="footer__lang">
              <button
                className="footer__lang-btn"
                type="button"
                aria-label={tNavbar('ariaSwitchLanguage')}
              >
                <Globe2 size={14} aria-hidden="true" />
                {currentLanguage.label}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M1 3l4 4 4-4" />
                </svg>
              </button>
            </div>
            <p className="footer__wordmark" aria-hidden="true">
              OPENCREATOR
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
})
