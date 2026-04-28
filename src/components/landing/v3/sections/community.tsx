import React, { memo } from 'react'

const quotes = [
  ['qcard--ad qcard--span-3 qcard--big', 'Joe', 'ACE Studio', 'We’ve used OpenCreator as our creative engine — scaling up creatives so we can scale up paid ads. 200 variations of one ad idea in a short period.', '200'],
  ['qcard--ecom qcard--span-3 qcard--big', 'Daniel Cruz', 'Head of Growth', 'Now we’re testing dozens every day. For the first time it feels like we actually have leverage in our ads.', '12'],
  ['qcard--ad', 'El.cine', 'Film Director', 'No way this is not disturbing the ad industry.', ''],
  ['qcard--creative', 'CJ', 'Rendering Studio', 'We place boards with multiple functions linked through connectors and explore the latest models inside one unique canvas.', ''],
  ['qcard--creative', 'Willie Pena', 'Owner', 'I literally depend on this service to launch my business ideas. Game changer.', ''],
  ['qcard--ad qcard--span-3 qcard--big', 'Iris', 'Marketing Consultant', 'The fastest way I’ve seen to scale UGC without scaling your team.', '0'],
  ['qcard--creative qcard--span-3 qcard--big', 'Anil', 'Creative Director', '120+ image and video models without juggling subscriptions — all my feedback made it into the roadmap.', '120'],
  ['qcard--ad', 'Sarah Mitchell', 'Performance agency', 'What used to take days now literally takes minutes.', ''],
  ['qcard--ecom', 'Kevin Park', 'UGC studio', 'This is the first one where content actually turned into real results.', ''],
  ['qcard--creative', 'Yury', 'Creative agency', 'OpenCreator streamlined our creative briefing and made commercial ads much more efficient.', ''],
]

export const CommunitySection = memo(function CommunitySection() {
  return (
    <section className="section-paper community" id="community" aria-label="Community testimonials">
      <div className="section-inner">
        <header className="section-head">
          <h2 className="section-title reveal">The teams<br />already <em>shipping faster.</em></h2>
          <p className="section-lead reveal" data-reveal-delay="160">Ten unfiltered notes from ad teams, DTC founders, creative agencies and indie studios.</p>
        </header>
        <div className="community__grid" role="list">
          {quotes.map(([variant, name, role, quote, metric], index) => (
            <figure className={`qcard ${variant} reveal`} data-reveal-delay={(index % 3) * 80} role="listitem" key={name}>
              <span className="qcard__tag">Ad campaigns</span>
              <blockquote className="qcard__quote">{quote}</blockquote>
              {metric ? <div className="qcard__metric"><span className="qcard__metric-num"><span data-count-to={metric}>0</span>{name === 'Anil' ? '+' : ''}</span></div> : null}
              <figcaption className="qcard__who">
                <span className="qcard__avatar" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element -- remote avatar source */}
                  <img src={`https://i.pravatar.cc/160?img=${index + 20}`} alt="" loading="lazy" decoding="async" />
                </span>
                <span>
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
