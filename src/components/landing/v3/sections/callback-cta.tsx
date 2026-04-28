import React, { memo } from 'react'
import { appExternalAnchorProps, getAppUrl } from '@/lib/app-url'

export const CallbackCtaSection = memo(function CallbackCtaSection() {
  return (
    <section className="callback" id="start" aria-label="Start Free callback" data-surface="green">
      <div className="callback__inner">
        <p className="callback__eyebrow"><span className="callback__eyebrow-dot" aria-hidden="true" />Start today</p>
        <h2 className="callback__h2">Your 24/7 content team<br />starts <em>today.</em></h2>
        <p className="callback__sub">Free on sign-up. No card. No onboarding call. Ship the first spot before your coffee gets cold.</p>
        <div className="callback__cta-row">
          <a
            className="callback__cta"
            href={getAppUrl('/')}
            {...appExternalAnchorProps}
            data-cursor="open"
          >
            Start free <span aria-hidden="true">→</span>
          </a>
          <a className="callback__cta-secondary" href="#positioning">How it works</a>
        </div>
      </div>
      <div className="callback__marquee" aria-hidden="true">
        <div className="callback__track">
          {Array.from({ length: 6 }).map((_, index) => (
            <React.Fragment key={index}>
              <span>Create visuals that actually sell.</span><span>★</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
})
