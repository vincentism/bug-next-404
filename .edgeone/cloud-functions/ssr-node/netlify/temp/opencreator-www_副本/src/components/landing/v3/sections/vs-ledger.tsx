import React, { memo } from 'react'

const manualSteps = [
  ['01', 'Write script', '$19/mo', '20min'],
  ['02', 'Find trending topics', '$0–50/mo', '30–60min'],
  ['03', 'Photoreal images', '$15/mo', '20min'],
  ['04', 'Photoreal video', '$20–100/mo', '30–60min'],
  ['05', 'Find footage', '$50', '30min'],
  ['06', 'Photoreal audio', '$10/mo', '10–20min'],
  ['07', 'Editing', '$130/mo', '60–120min'],
]

export const VsLedgerSection = memo(function VsLedgerSection() {
  return (
    <section className="section-paper vs" id="vs" aria-label="OpenCreator vs the old way">
      <div className="section-inner">
        <header className="section-head">
          <h2 className="section-title">The fastest way<br />to <em>ship creative.</em><br /><s>hands-down.</s></h2>
          <p className="section-lead">Manual production vs. the OpenCreator white-box scaling agent — 5 creatives a week becomes 50+ a day.</p>
        </header>
        <div className="vs-ledger" role="group" aria-label="Manual production vs OpenCreator comparison">
          <article className="vs-ledger__col">
            <header>
              <span className="section-kicker">01 · Manual production</span>
              <h3 className="vs-ledger__col-title">The traditional <em>stack.</em></h3>
            </header>
            <ol className="vs-ledger__steps">
              {manualSteps.map(([num, name, cost, time]) => (
                <li className="vs-ledger__step" key={num}>
                  <span><span>{num}</span> {name}</span>
                  <span>{cost}</span>
                  <span>{time}</span>
                </li>
              ))}
            </ol>
            <footer className="vs-ledger__foot"><span>Total output</span><span>5/week</span><span>2–3h/video</span></footer>
          </article>
          <article className="vs-ledger__col vs-ledger__col--oc">
            <header>
              <span className="section-kicker">02 · OpenCreator</span>
              <h3 className="vs-ledger__col-title">White-box <em>scaling agent.</em></h3>
            </header>
            <div className="vs-ledger__answer">
              <span className="vs-ledger__answer-quote">“Just describe what you want.”</span>
              <div className="vs-ledger__saving-num">$19</div>
              <p>2–3 min end-to-end · 50+ creatives/day · from $1/video</p>
            </div>
          </article>
          <div className="vs-ledger__savings" aria-label="Savings per video">
            <div><span>Time saved</span><span className="vs-ledger__saving-num"><span>178</span><em>min</em></span></div>
            <div><span>Money saved</span><span className="vs-ledger__saving-num">$<span>374</span></span></div>
          </div>
        </div>
      </div>
    </section>
  )
})
