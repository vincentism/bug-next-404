import React, { memo } from 'react'

type LandingAnnouncementBarProps = {
  text?: string
  linkText?: string
  linkHref?: string
}

export const LandingAnnouncementBar = memo(function LandingAnnouncementBar({
  text = 'New · VEO 3, Seedance, Nano Banana are live on canvas.',
  linkText = 'See the full roster →',
  linkHref = '#models',
}: LandingAnnouncementBarProps) {
  return (
    <header className="ann-bar" id="annBar" role="region" aria-label="Announcement" data-surface="ink">
      <div className="ann-bar__inner">
        <span className="ann-bar__dot" aria-hidden="true" />
        <span className="ann-bar__text">
          {text}
          <a className="ann-bar__link" href={linkHref} data-cursor="view">
            {linkText}
          </a>
        </span>
      </div>
      <button className="ann-bar__close" type="button" aria-label="Dismiss announcement" id="annClose">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2 2 L10 10 M10 2 L2 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
    </header>
  )
})
