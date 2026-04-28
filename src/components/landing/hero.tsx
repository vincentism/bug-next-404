import React, { memo } from 'react'

const heroCategories = [
  {
    key: 'ugc',
    number: '01',
    name: 'UGC Ads',
    bg: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=2200&h=1400&fit=crop&auto=format&q=80',
    img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700&h=1000&fit=crop&auto=format&q=80',
    hud: '9:16 · 00:07',
    caption: <>“My barrier <em>finally chilled.</em>”</>,
  },
  {
    key: 'brand',
    number: '02',
    name: 'Branding Ads',
    bg: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=2200&h=1400&fit=crop&auto=format&q=80',
    img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=700&h=1000&fit=crop&auto=format&q=80',
    hud: '4:5 · 00:06',
    caption: <>Amber drop · <em>perfume teaser.</em></>,
  },
  {
    key: 'social',
    number: '03',
    name: 'Social Media Mkt',
    bg: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=2200&h=1400&fit=crop&auto=format&q=80',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&h=1000&fit=crop&auto=format&q=80',
    hud: '1:1 · 00:15',
    caption: <>“Two cleansers, <em>one winner.</em>”</>,
  },
  {
    key: 'product',
    number: '04',
    name: 'Product Listings',
    bg: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=2200&h=1400&fit=crop&auto=format&q=80',
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&h=1000&fit=crop&auto=format&q=80',
    hud: '1:1 · still',
    caption: <>Heritage dial · <em>hero shot.</em></>,
  },
  {
    key: 'stories',
    number: '05',
    name: 'Stories',
    bg: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=2200&h=1400&fit=crop&auto=format&q=80',
    img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=700&h=1000&fit=crop&auto=format&q=80',
    hud: '9:16 · 00:08',
    caption: <>Behind the <em>drop day.</em></>,
  },
]

export const Hero = memo(function Hero() {
  return (
    <section className="hero hero--v3" id="hero" aria-label="Hero" data-hero-pin>
      <div className="hero__pin">
        <div className="hero__paper" aria-hidden="true" />
        <div className="hero__stage-a">
          <div className="hero__stage-a-group">
            <h1 className="hero__h1" id="heroH1">
              Create visuals
              <br />
              that actually{' '}
              <em>
                sell<span className="hero__dot-inline" aria-hidden="true" />
              </em>
            </h1>
            <p className="hero__sub">
              The video content agent that <em>gets you</em> — and gets the work done.
            </p>
          </div>
        </div>
        <div className="hero__cursor" aria-hidden="true" />
        <div className="hero__composer-act" data-hero-composer aria-hidden="true">
          <div className="hero__composer-card">
            <div className="hero__composer-input">
              <span className="hero__composer-placeholder">Start with a commercial visual idea…</span>
              <span className="hero__composer-typed" data-full="Create visuals that actually sell." />
              <span className="hero__composer-caret" />
            </div>
            <div className="hero__composer-bar">
              <div className="hero__composer-tools">
                <button className="hero__composer-tool" type="button" tabIndex={-1} aria-label="Attach">
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>
                <span className="hero__composer-pill">Assets</span>
                <span className="hero__composer-pill">Skills</span>
              </div>
              <button className="hero__composer-send" type="button" aria-label="Run idea" tabIndex={-1}>
                <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false" fill="none">
                  <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="hero__stage-b" data-cat-stage data-active-cat="ugc" aria-hidden="true">
          <div className="hero__cat-bg" aria-hidden="true">
            {heroCategories.map(category => (
              <div
                key={category.key}
                className="hero__cat-bg-layer"
                data-cat={category.key}
                style={{ backgroundImage: `url('${category.bg}')` }}
              />
            ))}
          </div>
          <div className="hero__cat-veil" aria-hidden="true" />
          <div className="hero__cat-rail" aria-hidden="true">
            <span className="hero__cat-rail-fill" />
          </div>
          <div className="hero__cat-inner">
            <div className="hero__cat-left">
              <ol className="hero__cat-nav" data-cat-nav>
                {heroCategories.map((category, index) => (
                  <li key={category.key} data-cat={category.key} className={index === 0 ? 'is-active' : undefined}>
                    <span className="hero__cat-num">{category.number}</span>
                    <span className="hero__cat-name">{category.name}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="hero__cat-right">
              {heroCategories.map(category => (
                <figure className="hero__cat-card" data-card={category.key} key={category.key}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- remote cinematic source, lazy beyond first viewport */}
                  <img src={category.img} alt="" loading="lazy" decoding="async" />
                  <div className="hero__cat-card-shade" />
                  <span className="hero__cat-card-tag">{category.name}</span>
                  <span className="hero__cat-card-hud">{category.hud}</span>
                  <figcaption className="hero__cat-card-cap">{category.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
