import { defineRouting } from 'next-intl/routing'
import { defaultLocale, locales } from '@/i18n/config'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: defaultLocale,

  // Only show locale prefix when needed (default locale 'en' won't have prefix)
  localePrefix: 'as-needed',

  // Disable automatic locale detection to prevent auto-redirect
  localeDetection: false,
})
