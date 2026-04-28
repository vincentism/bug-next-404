'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'
import BrandLogoIcon from '@/assets/icons/brand-logo.svg'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)

    // 检测是否是 ChunkLoadError
    const isChunkError =
      error.name === 'ChunkLoadError' ||
      error.message?.includes('Loading chunk') ||
      error.message?.includes('Failed to fetch dynamically imported module')

    if (isChunkError && typeof window !== 'undefined') {
      // 防止无限刷新循环
      const lastReload = sessionStorage.getItem('chunk_error_reload')
      const now = Date.now()
      if (!lastReload || now - parseInt(lastReload) > 10000) {
        sessionStorage.setItem('chunk_error_reload', now.toString())
        window.location.reload()
      }
    }

    console.error('Global error:', error)
  }, [error])

  const subtitle = 'Please check your connection and try again'
  const retryText = 'Try again'

  return (
    <html>
      <body>
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F7F7F7',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <div style={{ color: '#000' }}>
              <BrandLogoIcon style={{ width: 32, height: 32 }} />
            </div>
            <p style={{ color: '#888', fontSize: 12, margin: 0 }}>{subtitle}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => reset()}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#000',
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 500,
                  borderRadius: 8,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {retryText}
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
