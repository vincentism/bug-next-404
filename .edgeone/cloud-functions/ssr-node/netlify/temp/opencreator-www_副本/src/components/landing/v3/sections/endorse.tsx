import React, { memo } from 'react'

const logos = ['aws', 'Google', 'Meta', 'Alibaba', 'ByteDance', 'Tencent', 'NETFLIX', 'ACE Studio', 'Marathon Ventures', 'Koupon', 'CalArts', 'USC', 'CMU']

export const EndorseSection = memo(function EndorseSection() {
  return (
    <section className="section-paper endorse" id="testimonials" aria-label="Endorsement and numbers">
      <div className="section-inner endorse__inner">
        <div className="endorse__logos">
          <p className="endorse__eyebrow">Trusted by the world’s leading content marketing team</p>
          <div className="endorse__row" aria-label="Customer logos">
            {logos.map(logo => (
              <span className="endorse__logo" key={logo}>
                {logo}
              </span>
            ))}
          </div>
        </div>
        <div className="endorse__nums" role="group" aria-label="By the numbers">
          <article className="bignum">
            <div className="bignum__big"><span>50,000</span><span className="bignum__plus">+</span></div>
            <div className="bignum__label">Brands &amp; Studios</div>
          </article>
          <article className="bignum">
            <div className="bignum__big"><span>500</span><span className="bignum__suffix">K+</span></div>
            <div className="bignum__label">Creatives</div>
          </article>
          <article className="bignum">
            <div className="bignum__big"><span>10</span><span className="bignum__suffix">M+</span></div>
            <div className="bignum__label">Ad Spend</div>
          </article>
        </div>
      </div>
    </section>
  )
})
