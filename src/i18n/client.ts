import { useTranslations as useNextIntlTranslations } from 'next-intl';

/**
 * Client-side hook for translations
 * @param namespace - The translation namespace (e.g., 'common')
 *
 * @example
 * ```tsx
 * import { useTranslations } from '@/i18n/client';
 *
 * function MyComponent() {
 *   const t = useTranslations('common');
 *   return <button>{t('save')}</button>;
 * }
 * ```
 */
export const useTranslations = useNextIntlTranslations;

