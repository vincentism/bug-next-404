import React, { memo } from 'react'

const logos = ['aws', 'Google', 'Meta', 'Alibaba', 'ByteDance', 'Tencent', 'NETFLIX', 'ACE Studio', 'Marathon Ventures', 'Koupon', 'CalArts', 'USC', 'CMU']

export const EndorseSection = memo(function EndorseSection() {
  return (
    <section className="section-paper endorse" id="testimonials" aria-label="Endorsement and numbers">
      <div className="section-inner endorse__inner">
        <div className="endorse__logos">
          <p className="endorse__eyebrow reveal">Trusted by the world’s leading content marketing team</p>
          <div className="endorse__row reveal" data-reveal-delay="120" aria-label="Customer logos">
            {logos.map(logo => (
              <svg className="endorse__logo" viewBox="0 0 180 40" aria-label={logo} role="img" key={logo}>
                <text x="0" y="28" fontFamily="Roboto, Inter, sans-serif" fontWeight="900" fontSize="24" letterSpacing="-.5" fill="currentColor">
                  {logo}
                </text>
              </svg>
            ))}
          </div>
        </div>
        <div className="endorse__nums" role="group" aria-label="By the numbers">
          <article className="bignum reveal" data-reveal-delay="80">
            <div className="bignum__big"><span data-count-to="50000">0</span><span className="bignum__plus">+</span></div>
            <div className="bignum__label">Brands &amp; Studios</div>
          </article>
          <article className="bignum reveal" data-reveal-delay="180">
            <div className="bignum__big"><span data-count-to="500">0</span><span className="bignum__suffix">K+</span></div>
            <div className="bignum__label">Creatives Generated</div>
          </article>
          <article className="bignum reveal" data-reveal-delay="280">
            <div className="bignum__big"><span data-count-to="10">0</span><span className="bignum__suffix">M+</span></div>
            <div className="bignum__label">Ad Spend</div>
          </article>
        </div>
      </div>
    </section>
  )
})
