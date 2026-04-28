import React, { Suspense } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { locales } from '@/i18n/config'
import ProvidersRouter from '@/components/providers/providers-router'
import { Toaster } from 'sonner'
import PageLoading from '@/components/ui/pageLoading'
import { LazyTrackers } from '@/components/LazyTrackers'

const toasterStyle = {
  display: 'flex',
  justifyContent: 'center',
} as const

const toastOptions = {
  classNames: {
    toast: '!bg-white !text-[#1A1A1A] !border !border-gray-200 !rounded-xl !shadow-md !pr-10',
    title: '!text-[14px] !text-[#1A1A1A] !font-bold',
    description: '!text-[12px] !text-[#1A1A1A]/70',
    closeButton:
      '!left-auto !right-[10px] !top-1/2 !translate-x-0 !-translate-y-1/2 !h-5 !w-5 !border-0 !bg-transparent !shadow-none !text-[#BDBDBD] hover:!bg-transparent hover:!text-[#8C8C8C] focus-visible:!shadow-none',
    actionButton: '!bg-black !text-white !border !border-gray-200 !rounded-md !font-bold hover:!opacity-90',
    cancelButton:
      '!bg-transparent !text-[#1A1A1A] !border !border-gray-200 !rounded-md hover:!border-gray-400',
  },
} as const

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  const messages = await getMessages()

  const content = (
    <>
      <ProvidersRouter locale={locale}>
        <div className="w-full min-h-screen flex flex-col">{children}</div>
        <Toaster
          offset={24}
          position={'top-center'}
          closeButton={true}
          style={toasterStyle}
          toastOptions={toastOptions}
        />
      </ProvidersRouter>
      <LazyTrackers />
    </>
  )

  const Wrapper =
    locale === 'zh'
      ? (await import('./ZhFontWrapper')).ZhFontWrapper
      : ({ children }: { children: React.ReactNode }) => <>{children}</>

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Suspense fallback={<PageLoading />}>
        <Wrapper>{content}</Wrapper>
      </Suspense>
    </NextIntlClientProvider>
  )
}
