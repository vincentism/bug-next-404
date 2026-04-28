import React, { memo, type ReactNode } from 'react'

type Quote = {
  variant: string
  tag: string
  name: string
  role: string
  avatar: number
  quote: ReactNode
  metric?: {
    value: string
    suffix?: ReactNode
    label: ReactNode
  }
}

const quotes: Quote[] = [
  {
    variant: 'qcard--ad qcard--span-3 qcard--big',
    tag: 'Ad campaigns',
    name: 'Joe',
    role: 'Founder · ACE Studio',
    avatar: 57,
    quote: <>We’ve used OpenCreator as our creative engine for half a year — scaling up creatives so we can scale up paid ads. <em>200 variations</em> of one ad idea in a short period.</>,
    metric: { value: '200', label: <>variations<br />per ad idea</> },
  },
  {
    variant: 'qcard--ecom qcard--span-3 qcard--big',
    tag: 'Growth',
    name: 'Daniel Cruz',
    role: 'Head of Growth · DTC brand',
    avatar: 33,
    quote: <>We used to spend days just trying to get a few creatives out — it never felt like enough. Now we’re <em>testing dozens every day.</em> For the first time it feels like we actually have leverage in our ads.</>,
    metric: { value: '12', suffix: <>+<em>/day</em></>, label: <>creatives<br />tested live</> },
  },
  {
    variant: 'qcard--ad qcard--span-2',
    tag: 'Ad campaigns',
    name: 'El.cine',
    role: 'Film Director',
    avatar: 65,
    quote: <>No way this is <em>not disturbing</em> the ad industry.</>,
  },
  {
    variant: 'qcard--creative qcard--span-2',
    tag: 'Creative',
    name: 'CJ',
    role: 'Founder · architectural rendering studio',
    avatar: 12,
    quote: <>We place boards with multiple functions linked through connectors, and explore the latest models <em>inside one unique canvas.</em></>,
  },
  {
    variant: 'qcard--creative qcard--span-2',
    tag: 'Creative',
    name: 'Willie Pena',
    role: 'Owner · TeensWannaKnow.com',
    avatar: 15,
    quote: <>I literally depend on this service to launch my business ideas. <em>Game changer.</em></>,
  },
  {
    variant: 'qcard--ad qcard--span-3 qcard--big',
    tag: 'Ad campaigns',
    name: 'Iris',
    role: 'Marketing Consultant · ex-COO @ AFFiNE',
    avatar: 49,
    quote: <>If your team runs UGC across multiple channels, you know the pain — endless reshoots, never enough hands. OpenCreator batch-generates UGC videos from one workflow. <em>The fastest way I’ve seen to scale UGC without scaling your team.</em></>,
    metric: { value: '0', label: <>extra headcount<br />to scale UGC</> },
  },
  {
    variant: 'qcard--creative qcard--span-3 qcard--big',
    tag: 'Creative',
    name: 'Anil',
    role: 'Creative Director & Founder · fastcommercial.ai',
    avatar: 52,
    quote: <>OpenCreator lets me use 120+ image and video models without juggling subscriptions — saving me hundreds each month. New tools ship incredibly fast, and <em>the team actually listens</em> — all my feedback made it into the roadmap.</>,
    metric: { value: '120', suffix: '+', label: <>models<br />one subscription</> },
  },
  {
    variant: 'qcard--ad qcard--span-2',
    tag: 'Ad campaigns',
    name: 'Sarah Mitchell',
    role: 'Marketing Lead · performance agency',
    avatar: 47,
    quote: <>What used to take our team days now <em>literally takes minutes.</em> We didn’t hire anyone new, but somehow we’re producing way more than before. It’s kind of crazy.</>,
  },
  {
    variant: 'qcard--ecom qcard--span-2',
    tag: 'Growth',
    name: 'Kevin Park',
    role: 'Founder · UGC content studio',
    avatar: 68,
    quote: <>We’ve tried a lot of AI tools, but most just make things look nice. This is the first one where <em>content actually turned into real results.</em></>,
  },
  {
    variant: 'qcard--creative qcard--span-2',
    tag: 'Creative',
    name: 'Yury',
    role: 'Founder · creative agency',
    avatar: 60,
    quote: <>OpenCreator streamlined our creative briefing and made development for commercial ads <em>much more efficient.</em> The collaboration features noticeably improved our workflow.</>,
  },
]

export const CommunitySection = memo(function CommunitySection() {
  return (
    <section className="section-paper community" id="community" aria-label="Community testimonials">
      <div className="section-inner">
        <header className="section-head">
          <h2 className="section-title">The teams<br />already <em>shipping faster.</em></h2>
          <p className="section-lead">Ten unfiltered notes from ad teams, DTC founders, creative agencies and indie studios who traded shoot days and edit backlogs for a single canvas.</p>
        </header>
        <div className="community__grid" role="list">
          {quotes.map(({ variant, tag, name, role, avatar, quote, metric }) => (
            <figure className={`qcard ${variant}`} role="listitem" key={name}>
              <span className="qcard__tag"><span className="qcard__tag-dot" />{tag}</span>
              <blockquote className="qcard__quote">{quote}</blockquote>
              {metric ? (
                <div className="qcard__metric">
                  <span className="qcard__metric-num"><span>{metric.value}</span>{metric.suffix}</span>
                  <span className="qcard__metric-lbl">{metric.label}</span>
                </div>
              ) : null}
              <figcaption className="qcard__who">
                <span className="qcard__avatar" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element -- remote avatar source */}
                  <img src={`https://i.pravatar.cc/160?img=${avatar}`} alt="" loading="lazy" decoding="async" width="56" height="56" />
                </span>
                <span className="qcard__who-text">
                  <span className="qcard__name">{name}</span>
                  <span className="qcard__role">{role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
})
