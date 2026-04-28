// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // 生产环境采样 20%，开发环境 100%
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,

  environment: process.env.NODE_ENV,

  // 禁用 fetch 自动 instrumentation，减少 Node.js TransformStream 竞态触发
  // 参见 nodejs/node#62036 与生产环境 controller[kState].transformAlgorithm 错误
  integrations: integrations =>
    integrations.filter(integration => integration.name !== 'NativeNodeFetch'),
})
