import React from 'react'
import { Link } from '@/i18n/navigation'
import { Youtube, Instagram } from 'lucide-react'
import { useTranslations } from '@/i18n/client'

export function LandingFooter() {
  const t = useTranslations('landing.footer')
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto max-w-7xl px-4 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand and Social Media - Takes 2 columns on lg screens */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-poller-one mb-6">{t('brand')}</h3>
            <div className="flex gap-4">
              <Link
                href="https://discord.gg/rRKngTWjt6"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Discord"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </Link>
              <Link
                href="https://www.youtube.com/@OpenCreator-io"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </Link>
              <Link
                href="https://x.com/opencreator_io"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/annieliu_opencreator/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* PRODUCT Column */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-gray-900">{t('productTitle')}</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://opencreator.super.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                >
                  {t('links.productWiki')}
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                >
                  {t('links.pricing')}
                </Link>
              </li>
              <li>
                <Link
                  href="https://discord.gg/rRKngTWjt6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                >
                  {t('links.community')}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* SOLUTIONS Column */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-gray-900">{t('solutionsTitle')}</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/solutions/ecommerce-product-images"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                >
                  {t('solutionsLinks.ecommerceProductImages')}
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/ai-fashion"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                >
                  {t('solutionsLinks.aiFashion')}
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/ai-portrait"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                >
                  {t('solutionsLinks.aiPortrait')}
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/ai-video"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                >
                  {t('solutionsLinks.aiVideo')}
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/ai-design"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                >
                  {t('solutionsLinks.aiDesign')}
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY Column */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-gray-900">{t('companyTitle')}</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                >
                  {t('companyLinks.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                >
                  {t('companyLinks.termsOfService')}
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.freeprivacypolicy.com/live/c04f0fc9-eb4d-443a-90dc-1cf893172a85"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                >
                  {t('companyLinks.cookiePolicy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT US Column */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-gray-900">{t('contactTitle')}</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="mailto:support@opencreator.io"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                >
                  {t('contactLinks.supportEmail')}
                </Link>
              </li>
              <li>
                <Link
                  href="https://uusd8j57636y.sg.larksuite.com/share/base/form/shrlgNBmyK5OBha9x1PFYWXnA3e?from=navigation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                >
                  {t('contactLinks.talkToFounder')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
