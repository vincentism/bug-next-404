'use client'

import { useEffect } from 'react'
import BrandLogoIcon from '@/assets/icons/brand-logo.svg'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    const isChunkError =
      error.name === 'ChunkLoadError' ||
      error.message?.includes('Loading chunk') ||
      error.message?.includes('Failed to fetch dynamically imported module')

    if (isChunkError) {
      const lastReload = sessionStorage.getItem('chunk_error_reload')
      const now = Date.now()
      if (!lastReload || now - parseInt(lastReload) > 10000) {
        sessionStorage.setItem('chunk_error_reload', now.toString())
        window.location.reload()
      }
    }

    console.error('Page error:', error)
  }, [error])

  const subtitle = 'Please check your connection and try again'
  const retryText = 'Try again'

  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-[#F7F7F7]">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="text-black animate-spin">
          <BrandLogoIcon className="min-w-[22px] min-h-[22px] w-[32px] h-[32px] origin-center" />
        </div>
        <p className="text-gray-500 text-xs">{subtitle}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-black text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            {retryText}
          </button>
        </div>
      </div>
    </div>
  )
}
