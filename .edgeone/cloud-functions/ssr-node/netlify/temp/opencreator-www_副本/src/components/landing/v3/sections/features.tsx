import React, { memo, type CSSProperties } from 'react'
import { FeaturesScrollController } from '../controllers/features-scroll-controller'

const feedCards = [
  {
    heat: 'hot',
    title: '"Get ready with me, 30 seconds."',
    platform: 'TikTok',
    platformClass: 'f1-card__platform--tiktok',
    metrics: ['1.2M views', '12h'],
    hook: '+184%',
  },
  {
    heat: 'cold',
    title: '"Two cleansers. One obvious winner."',
    platform: 'Reels',
    platformClass: 'f1-card__platform--reels',
    metrics: ['68K views', '5h'],
    hook: '+12%',
    thumbClass: 'f1-card__thumb--b',
  },
  {
    heat: 'hot',
    title: '"POV: Your barrier, repaired."',
    platform: 'Shorts',
    platformClass: 'f1-card__platform--shorts',
    metrics: ['910K views', '8h'],
    hook: '+210%',
    thumbClass: 'f1-card__thumb--c',
  },
  {
    heat: 'hot',
    title: '"Stop buying six serums."',
    platform: 'TikTok',
    platformClass: 'f1-card__platform--tiktok',
    metrics: ['540K views', '3h'],
    hook: '+143%',
    thumbClass: 'f1-card__thumb--d',
  },
  {
    heat: 'cold',
    title: '"Oil-cleanse, double-cleanse, rinse."',
    platform: 'Reels',
    platformClass: 'f1-card__platform--reels',
    metrics: ['42K views', '9h'],
    hook: '-8%',
    thumbClass: 'f1-card__thumb--e',
  },
  {
    heat: 'hot',
    title: '"30 seconds to glass skin."',
    platform: 'Shorts',
    platformClass: 'f1-card__platform--shorts',
    metrics: ['860K views', '6h'],
    hook: '+128%',
  },
]

const slotCells = [
  'Expert Derm',
  'Micro-creator',
  'ASMR Voice',
  'Office POV',
  'Dad Energy',
  'Influencer Duo',
  'Soft Pastel',
  'Studio Lift',
  'Gen Z UGC',
]

const stackCards = [
  ['ll', 'KR'],
  ['l', 'JP'],
  ['r', 'ES'],
  ['rr', 'DE'],
]

function customDelay(delay: string): CSSProperties {
  return { '--d': delay } as CSSProperties
}

function FlameIcon() {
  return (
    <svg className="f1-card__flame" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 1.5c.7 1.7.1 2.9-.9 3.9C5.8 6.7 4.4 8 4.4 10.3c0 2.2 1.7 4.2 4 4.2s4-1.9 4-4.3c0-1.4-.6-2.2-1.2-2.9-.3-.3-.5-.1-.5.2.1 1.1-.4 1.6-.9 1.6-.6 0-1-.4-1-1.2 0-2.3-.4-4.5-.8-6.4z"
        fill="currentColor"
      />
    </svg>
  )
}

function FeedCard({ card, index }: { card: (typeof feedCards)[number]; index: number }) {
  return (
    <div className="f1-card" data-heat={card.heat}>
      <span className={['f1-card__thumb', card.thumbClass].filter(Boolean).join(' ')} />
      <span className="f1-card__meta">
        <span className="f1-card__title">{card.title}</span>
        <span className="f1-card__sub">
          <span className={`f1-card__platform ${card.platformClass}`}>{card.platform}</span>
          {card.metrics.map(metric => (
            <span className="f1-card__metric" key={`${index}-${metric}`}>
              {metric}
            </span>
          ))}
        </span>
      </span>
      <span className="f1-card__hook">
        {card.heat === 'hot' ? <FlameIcon /> : null}
        {card.hook}
      </span>
    </div>
  )
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 28 28" fill="currentColor">
      <path d="M14 2.5 L15.9 10.1 L23.5 12 L15.9 13.9 L14 21.5 L12.1 13.9 L4.5 12 L12.1 10.1 Z" />
      <path
        d="M22 17 L22.85 20.15 L26 21 L22.85 21.85 L22 25 L21.15 21.85 L18 21 L21.15 20.15 Z"
        opacity=".85"
      />
      <path
        d="M6.5 17.5 L7.2 20.3 L10 21 L7.2 21.7 L6.5 24.5 L5.8 21.7 L3 21 L5.8 20.3 Z"
        opacity=".65"
      />
    </svg>
  )
}

function ContentIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="currentColor">
      <path d="M7 0.5 L8.35 5.65 L13.5 7 L8.35 8.35 L7 13.5 L5.65 8.35 L0.5 7 L5.65 5.65 Z" />
    </svg>
  )
}

function EcomIcon() {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 1.2 H12 A1 1 0 0 1 13 2.2 V7 L7 13 L1 7 Z" />
      <circle cx="10" cy="4.2" r="1" fill="currentColor" />
    </svg>
  )
}

function AvatarIcon() {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7" cy="4.8" r="2.4" />
      <path d="M2 12.6 C 3 10.2, 5 9.2, 7 9.2 S 11 10.2, 12 12.6" />
    </svg>
  )
}

function SkillOut({
  className,
  trail,
  delay,
  label,
  children,
}: {
  className: string
  trail: string
  delay: string
  label: string
  children: React.ReactNode
}) {
  return (
    <span className={`f3-skill-out ${className}`} data-trail={trail} style={customDelay(delay)}>
      <span className="f3-skill-out__icon" aria-hidden="true">
        {children}
      </span>
      <span>{label}</span>
    </span>
  )
}

export const FeaturesSection = memo(function FeaturesSection() {
  return (
    <section className="features" id="features" aria-label="Feature sequence" data-features-pin>
      <div className="features__pin">
        <article className="features__scene features__scene--1" data-scene-idx="0" data-active="0">
          <div className="features__copy">
            <span className="features__kicker">Trendiness Insights</span>
            <h2 className="features__h3">
              Catch the trends <em>while they&apos;re&nbsp;still&nbsp;hot.</em>
            </h2>
            <p className="features__lead">
              A real-time trend scanner is built right into your agent. Whenever inspiration runs
              dry, OpenCreator pulls the exact videos winning <em>right now</em> across TikTok,
              Reels and Shorts — so you never stare at a blank canvas wondering what to make next.
            </p>
            <ul className="features__chips" aria-label="Sources">
              <li>TikTok</li>
              <li>Reels</li>
              <li>Shorts</li>
            </ul>
          </div>
          <div className="features__stage">
            <div className="f1-feed" aria-hidden="true" data-f1-feed>
              <div className="f1-feed__head">
                <span className="f1-feed__head-dot" aria-hidden="true" />
                <span>Trending now · Content analysis</span>
                <span className="f1-feed__head-count">
                  <strong>214</strong> signals
                </span>
              </div>
              <div className="f1-feed__body">
                <div className="f1-feed__track">
                  {[...feedCards, ...feedCards, ...feedCards, ...feedCards].map((card, index) => (
                    <FeedCard card={card} index={index} key={`${card.title}-${index}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="features__scene features__scene--2" data-scene-idx="1" data-active="0">
          <div className="features__copy">
            <span className="features__kicker">Comment Edit</span>
            <h2 className="features__h3">
              Point, comment, revise — <em>nothing else drifts.</em>
            </h2>
            <p className="features__lead">
              Drop a comment on any script line, product shot, or video moment — OpenCreator
              rewrites only what you pointed at. Everything else stays locked.
            </p>
            <ul className="features__chips" aria-label="Edit scope">
              <li>Script</li>
              <li>Product image</li>
              <li>Video animation</li>
            </ul>
          </div>
          <div className="features__stage">
            <div className="f2-stage" aria-hidden="true">
              <div className="f2-canvas">
                <div className="f2-image">
                  <div className="f2-image__slot f2-image__slot--a" />
                  <div className="f2-image__slot f2-image__slot--b" />
                </div>
                <div className="f2-input">
                  <span className="f2-input__pin" />
                  <span className="f2-input__text">
                    <span className="f2-input__type">Cooler lighting — studio blue wash</span>
                    <span className="f2-input__caret" />
                  </span>
                  <button className="f2-input__send" type="button" aria-hidden="true">
                    <svg viewBox="0 0 14 14">
                      <path
                        d="M2 7 L12 7 M7 2 L12 7 L7 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="f2-toolbar">
                <button className="f2-tool f2-tool--arrow" type="button" aria-hidden="true">
                  <svg viewBox="0 0 16 16">
                    <path d="M3 3 L13 8 L8 9.5 L6.5 13 Z" fill="currentColor" />
                  </svg>
                </button>
                <button className="f2-tool f2-tool--comment" type="button" aria-hidden="true">
                  <svg viewBox="0 0 18 18">
                    <path
                      d="M3 4 H15 A2 2 0 0 1 17 6 V12 A2 2 0 0 1 15 14 H9 L5.5 17 L6 14 H3 A2 2 0 0 1 1 12 V6 A2 2 0 0 1 3 4 Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
              <div className="f2-cursor">
                <svg className="f2-cursor__arrow" viewBox="0 0 16 16">
                  <path
                    d="M3 3 L13 8 L8 9.5 L6.5 13 Z"
                    fill="#fff"
                    stroke="rgba(0,0,0,.5)"
                    strokeWidth=".5"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg className="f2-cursor__bubble" viewBox="0 0 28 28">
                  <path
                    d="M5 4 H22 A4 4 0 0 1 26 8 V17 A4 4 0 0 1 22 21 H14 L8 26 L9 21 H5 A4 4 0 0 1 1 17 V8 A4 4 0 0 1 5 4 Z"
                    fill="#8E9DFF"
                    stroke="#fff"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <circle cx="8.5" cy="12.5" r="1.2" fill="#fff" />
                  <circle cx="13.5" cy="12.5" r="1.2" fill="#fff" />
                  <circle cx="18.5" cy="12.5" r="1.2" fill="#fff" />
                </svg>
              </div>
            </div>
          </div>
        </article>

        <article className="features__scene features__scene--3" data-scene-idx="2" data-active="0">
          <div className="features__copy">
            <span className="features__kicker">Save Skills</span>
            <h2 className="features__h3">
              Winning&nbsp;flows, <em>saved&nbsp;as&nbsp;skills.</em>
            </h2>
            <p className="features__lead">
              When a flow lands, save the whole execution recipe as a Skill. Reuse it on the next
              brief — skip the token-burning re-exploration loop.
            </p>
            <ul className="features__chips" aria-label="Skill types">
              <li>Prompts</li>
              <li>Workflows</li>
              <li>Assets</li>
            </ul>
          </div>
          <div className="features__stage">
            <div className="f3-stage" aria-hidden="true">
              <div className="f3-stage__inner">
                <svg className="f3-trails" viewBox="0 0 640 400" preserveAspectRatio="none">
                  <path d="M 20 40 C 110 60, 195 130, 245 200" />
                  <path d="M 10 200 C 100 200, 190 200, 245 200" />
                  <path d="M 20 360 C 110 340, 195 270, 245 200" />
                  <path d="M 395 200 C 495 160, 570 90, 625 40" />
                  <path d="M 395 200 C 495 200, 570 200, 625 200" />
                  <path d="M 395 200 C 495 240, 570 310, 625 360" />
                </svg>

                <span className="f3-in-dot" data-trail="L1" style={customDelay('0s')} />
                <span className="f3-in-dot" data-trail="L1" style={customDelay('2s')} />
                <span className="f3-in-dot" data-trail="L2" style={customDelay('.7s')} />
                <span className="f3-in-dot" data-trail="L2" style={customDelay('2.7s')} />
                <span className="f3-in-dot" data-trail="L3" style={customDelay('1.3s')} />
                <span className="f3-in-dot" data-trail="L3" style={customDelay('3.3s')} />

                <div className="f3-hub">
                  <span className="f3-hub__inner">
                    <span className="f3-hub__icon" aria-hidden="true">
                      <SparkleIcon />
                    </span>
                    <span className="f3-hub__title">Save Skill</span>
                  </span>
                </div>

                <SkillOut
                  className="f3-skill-out--content"
                  trail="R1"
                  delay="0s"
                  label="Brand Visual"
                >
                  <ContentIcon />
                </SkillOut>
                <SkillOut
                  className="f3-skill-out--content"
                  trail="R1"
                  delay="2.5s"
                  label="AI Animation"
                >
                  <ContentIcon />
                </SkillOut>
                <SkillOut
                  className="f3-skill-out--ecom"
                  trail="R2"
                  delay=".83s"
                  label="Model Try-on"
                >
                  <EcomIcon />
                </SkillOut>
                <SkillOut
                  className="f3-skill-out--ecom"
                  trail="R2"
                  delay="3.33s"
                  label="Story Marketing"
                >
                  <EcomIcon />
                </SkillOut>
                <SkillOut
                  className="f3-skill-out--avatar"
                  trail="R3"
                  delay="1.66s"
                  label="Talk & Sell"
                >
                  <AvatarIcon />
                </SkillOut>
                <SkillOut
                  className="f3-skill-out--avatar"
                  trail="R3"
                  delay="4.16s"
                  label="Lip Sync"
                >
                  <AvatarIcon />
                </SkillOut>
              </div>
            </div>
          </div>
        </article>

        <article className="features__scene features__scene--4" data-scene-idx="3" data-active="0">
          <div className="features__copy">
            <span className="features__kicker">Infinite Variations</span>
            <h2 className="features__h3">
              One idea,{' '}
              <em>
                every&nbsp;test&nbsp;variant
                <br />
                at&nbsp;once.
              </em>
            </h2>
            <p className="features__lead">
              Pick the axes — markets, creator personas, aspect ratios — and OpenCreator fans your
              concept into every variant your A/B plan demands.
            </p>
            <ul className="features__chips" aria-label="Axes">
              <li>Creator type</li>
              <li>Market</li>
              <li>Aspect ratio</li>
            </ul>
          </div>
          <div className="features__stage">
            <div className="f4-stage" aria-hidden="true">
              <div className="f4-anim-container">
                <div className="f4-inputs">
                  <div className="f4-slot-col f4-slot-col--product">
                    <div className="f4-product">
                      <div className="f4-product__media" />
                    </div>
                    <span className="f4-slot-col__tag">Product</span>
                  </div>

                  <div className="f4-plus">+</div>

                  <div className="f4-slot-col f4-slot-col--slot">
                    <div className="f4-slot-machine">
                      <span className="f4-pointer" aria-hidden="true">
                        <svg viewBox="0 0 60 56" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M30 50 L8.5 14.5 A7 7 0 0 1 14.5 4 L45.5 4 A7 7 0 0 1 51.5 14.5 Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <div className="f4-slot-window">
                        <div className="f4-slot-track">
                          {slotCells.map((label, index) => (
                            <div
                              className={`f4-slot-cell${
                                index === slotCells.length - 1 ? ' f4-slot-cell--target' : ''
                              }`}
                              key={label}
                            >
                              <span className="f4-slot-cell__label">{label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="f4-slot-col__tag">Creator</span>
                  </div>
                </div>

                {stackCards.map(([pos, loc]) => (
                  <div className="f4-stack-card" data-pos={pos} aria-hidden="true" key={pos}>
                    <span className="f4-stack-card__loc">{loc}</span>
                  </div>
                ))}

                <div className="f4-result">
                  <span className="f4-result__glow" />
                  <span className="f4-result__tick" aria-hidden="true">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="12" fill="#E8FF4B" />
                      <path
                        d="M7.2 12.4 L10.6 15.8 L16.8 9.3"
                        fill="none"
                        stroke="#0C0C10"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div className="f4-result__label">
                    <span>Gen Z UGC</span>
                    <span>MENA · ar</span>
                    <span>Aspect 3:4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
      <FeaturesScrollController />
    </section>
  )
})
