'use client'

import { memo, useCallback, useRef } from 'react'
import type { AnchorHTMLAttributes, FocusEvent, PointerEvent } from 'react'

type AppExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

export const AppExternalLink = memo(function AppExternalLink({
  href,
  onPointerEnter,
  onFocus,
  ...rest
}: AppExternalLinkProps) {
  const prefetchedRef = useRef(false)

  const prefetch = useCallback(() => {
    if (prefetchedRef.current) {
      return
    }

    prefetchedRef.current = true

    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.as = 'document'
    link.href = href
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  }, [href])

  const handlePointerEnter = useCallback(
    (event: PointerEvent<HTMLAnchorElement>) => {
      prefetch()
      onPointerEnter?.(event)
    },
    [onPointerEnter, prefetch]
  )

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLAnchorElement>) => {
      prefetch()
      onFocus?.(event)
    },
    [onFocus, prefetch]
  )

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerEnter={handlePointerEnter}
      onFocus={handleFocus}
      {...rest}
    />
  )
})
