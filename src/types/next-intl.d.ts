import type { Locale } from '@/i18n/config'
import type { AppMessages } from '@/i18n/messages.types'

// Declare global IntlMessages for use-intl type system
declare global {
  type IntlMessages = AppMessages
}

// Also augment next-intl AppConfig for additional type safety
declare module 'next-intl' {
  interface AppConfig {
    Locale: Locale
    Messages: AppMessages
  }
}

export {}
