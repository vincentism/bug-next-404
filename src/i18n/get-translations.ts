import { cache } from 'react'
import { getTranslations as getNextIntlTranslations } from 'next-intl/server'

export const getTranslations = cache(getNextIntlTranslations)
