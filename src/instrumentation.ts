import * as Sentry from '@sentry/nextjs'

export async function register() {
  // 本地开发不加载 Sentry 服务端/Edge 配置
  if (process.env.NODE_ENV !== 'production') return

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config')
  }
}

export const onRequestError = Sentry.captureRequestError
