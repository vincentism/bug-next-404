// This file configures the initialization of Sentry on the client.
// Sentry is loaded asynchronously after hydration to avoid blocking the critical path.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const isProduction = process.env.NODE_ENV === 'production'

let SentryModule: typeof import('@sentry/nextjs') | null = null

function initSentry() {
  if (!isProduction) return
  void import('@sentry/nextjs').then(Sentry => {
    SentryModule = Sentry
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      integrations: [Sentry.replayIntegration()],
      tracesSampleRate: 0.2,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      environment: process.env.NODE_ENV,
      beforeSend(event) {
        if (
          event.exception?.values?.some(
            e => e.type === 'SecurityError' && e.value?.includes('cross-origin')
          )
        ) {
          return null
        }
        return event
      },
    })
  })
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    initSentry()
  } else {
    window.addEventListener('load', initSentry)
  }
}

export function onRouterTransitionStart(...args: unknown[]) {
  if (!isProduction) return
  try {
    const capture = (
      SentryModule as { captureRouterTransitionStart?: (...a: unknown[]) => void } | null
    )?.captureRouterTransitionStart
    if (capture) capture(...args)
  } catch {
    // 跨域 iframe 序列化错误，静默忽略
  }
}
