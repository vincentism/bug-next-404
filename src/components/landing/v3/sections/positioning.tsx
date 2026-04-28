import React, { memo } from 'react'
import { PositioningScrollController } from '../controllers/positioning-scroll-controller'

export const PositioningSection = memo(function PositioningSection() {
  return (
    <section className="positioning" id="positioning" aria-label="Positioning" data-positioning-pin>
      <div className="positioning__pin">
        <header className="positioning__head">
          <h2 className="positioning__h2">
            The world’s first <span className="strike">black-box</span>{' '}
            <span className="hl">white-box</span> commercial <em>content agent.</em>
          </h2>
          <div className="positioning__beats">
            {[
              [
                '01 · Open',
                'Every block is nameable, editable, replayable.',
                'No black box — every step opens, nudges, or re-seeds.',
              ],
              [
                '02 · Build',
                'Type an idea. Watch the canvas build it.',
                'A whole crew — writing the workflow on one canvas.',
              ],
              [
                '03 · Ship',
                'Preview the ship, anytime.',
                'Every cut opens — review, rerun, remix on demand.',
              ],
            ].map(([num, title, sub]) => (
              <div className="positioning__beat" key={num}>
                <span className="positioning__beat-num">{num}</span>
                <p className="positioning__beat-title">{title}</p>
                <p className="positioning__beat-sub">{sub}</p>
              </div>
            ))}
          </div>
        </header>

        <div className="positioning__mockup" aria-hidden="true">
          <aside className="pm-chat">
            <header className="pm-chat-header">
              <button className="pm-chat-logo" type="button" tabIndex={-1}>
                O
              </button>
              <div className="pm-chat-proj">
                <span className="pm-chat-proj-name">Fashion Editorial · Lip Gloss Ad</span>
                <span className="pm-chat-proj-sess">Creative strategy</span>
              </div>
              <span className="pm-chat-header-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="5.5" cy="6" r="2.2" />
                  <path d="M2.2 12.5c.5-1.7 1.9-2.6 3.3-2.6s2.8.9 3.3 2.6" />
                  <circle cx="11.2" cy="5.6" r="1.7" />
                  <path d="M9.2 11.4c.4-1.2 1.2-1.9 2-1.9 1.3 0 2.4 1 2.9 2.6" />
                </svg>
              </span>
              <span className="pm-chat-avatar">U</span>
            </header>
            <div className="pm-chat-stream">
              <div
                className="pm-msg pm-msg-user"
                data-msg="0"
                data-full="Create a UGC lip gloss sales video targeting Gen Z in the US"
              >
                <div className="pm-bubble">
                  <span className="pm-typed" />
                  <span className="pm-caret" />
                </div>
              </div>
              <div className="pm-msg pm-think" data-msg="1" data-open="0">
                <button type="button" className="pm-think-head" tabIndex={-1}>
                  <span className="pm-think-label">Thought for 8 seconds</span>
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </button>
                <div className="pm-think-body">
                  <div className="pm-think-line">
                    <b>Product:</b> Beauty · lip gloss
                  </div>
                  <div className="pm-think-line">
                    <b>Market:</b> US · Gen Z
                  </div>
                  <div className="pm-think-line">
                    <b>Hook:</b> reaction / pain-point reversal
                  </div>
                </div>
              </div>
              <div className="pm-msg pm-section" data-msg="2">
                <div className="pm-section-head">
                  <span className="pm-section-dot" />
                  <span className="pm-section-title">Video Benchmark Search</span>
                </div>
                <p className="pm-section-body">
                  Narrowed the ad-creative library to three angles — pain-point reversal, GRWM
                  talking-head, and before/after payoff.
                </p>
                <div className="pm-bench">
                  <span className="pm-bench-rank">Top 1</span>
                  <div className="pm-bench-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element -- decorative mockup asset from design reference */}
                    <img
                      src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=220&h=220&fit=crop&auto=format&q=80"
                      alt=""
                      decoding="async"
                    />
                  </div>
                  <div className="pm-bench-text">
                    <span className="pm-bench-title">
                      Pain-point Flip Opening <span className="pm-bench-badge">Recommended</span>
                    </span>
                    <span className="pm-bench-desc">
                      Reverse hook in first 3s — high view-through
                    </span>
                  </div>
                </div>
              </div>
              <div className="pm-msg pm-section" data-msg="3">
                <div className="pm-section-head">
                  <span className="pm-section-dot pm-section-dot--work" />
                  <span className="pm-section-title">Producing key visuals</span>
                </div>
                <p className="pm-section-body">
                  Locking the Pain-point Flip opening. Drafting the script, shooting the hero frame,
                  editing the cut — the crew is on it.
                </p>
              </div>
            </div>
            <div className="pm-composer">
              <div className="pm-composer-input">
                <span className="pm-composer-prompt">Start with a commercial visual idea…</span>
              </div>
              <div className="pm-composer-actions">
                <button
                  className="pm-composer-attach"
                  type="button"
                  tabIndex={-1}
                  aria-label="Attach"
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10.8 4.4 6 9.2a1.8 1.8 0 0 0 2.5 2.5l5.2-5.2a3.1 3.1 0 1 0-4.4-4.4L3.9 7.8a4.4 4.4 0 1 0 6.2 6.2L14.5 9.6" />
                  </svg>
                </button>
                <div className="pm-composer-pills">
                  <span className="pm-composer-pill">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 5a2 2 0 0 1 2-2h3l1.5 1.5H12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5Z" />
                    </svg>
                    Assets
                  </span>
                  <span className="pm-composer-pill">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M8 1.5 3.5 4v4c0 3 2 5.5 4.5 6.5 2.5-1 4.5-3.5 4.5-6.5V4L8 1.5Z" />
                    </svg>
                    Skills
                  </span>
                </div>
                <button className="pm-composer-send" type="button" tabIndex={-1} aria-label="Send">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 13V3M4 7l4-4 4 4" />
                  </svg>
                </button>
              </div>
            </div>
          </aside>

          <section className="pm-canvas" data-view="canvas">
            <header className="pm-canvas-topbar">
              <span className="pm-canvas-topbar-spacer" />
              <div className="pm-canvas-tabs" role="tablist">
                <span className="pm-canvas-tab" role="tab" data-tab="preview">
                  Preview
                </span>
                <span className="pm-canvas-tab" role="tab" data-tab="canvas" data-active="1">
                  Canvas
                </span>
              </div>
              <span className="pm-canvas-topbar-spacer" />
            </header>
            <div className="pm-viewport" data-pm-viewport>
              <div className="pm-tools" aria-hidden="true">
                <span className="pm-tool" data-active="1" title="Add atom">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 3v10M3 8h10" />
                  </svg>
                </span>
                <span className="pm-tool" title="Skills">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 2 2 5l6 3 6-3-6-3Z" />
                    <path d="M2 8l6 3 6-3M2 11l6 3 6-3" />
                  </svg>
                </span>
                <span className="pm-tool" title="Assets">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2.5" y="2.5" width="11" height="11" rx="1.8" />
                    <circle cx="6" cy="6" r="1.2" />
                    <path d="M13.5 10 10 7l-5 6.5" />
                  </svg>
                </span>
              </div>
              <svg className="pm-edges" aria-hidden="true">
                <path data-edge="0" data-src="0:out:text" data-dst="1:in:text" />
                <path data-edge="1" data-src="1:out:image" data-dst="2:in:image" />
              </svg>
              <article
                className="pm-node pm-node--1"
                data-theme="green"
                data-node="0"
                data-state="idle"
              >
                <span className="pm-node-label">Creative idea</span>
                <div className="pm-node-card">
                  <div className="pm-node-form">
                    <span className="pm-node-form-label">Idea</span>
                    <p className="pm-node-form-text">
                      UGC lip gloss sales video — Gen Z, US, pain-point reversal hook.
                    </p>
                    <div className="pm-node-tabs">
                      <span className="pm-node-tab" data-active="1">
                        GPT·4o
                      </span>
                      <span className="pm-node-tab">Claude</span>
                    </div>
                  </div>
                  <div className="pm-node-action">
                    <button className="pm-node-cfg-run" type="button" tabIndex={-1}>
                      SUBMIT
                    </button>
                  </div>
                  <span className="pm-pins pm-pins--right" data-pin-group="0:out">
                    <span className="pm-pin-row">
                      <span className="pm-pin-dot" data-type="text" data-pin="0:out:text" />
                      <span className="pm-pin-label" data-type="text">
                        text
                      </span>
                    </span>
                  </span>
                </div>
              </article>
              <article
                className="pm-node pm-node--2"
                data-theme="blue"
                data-node="1"
                data-state="idle"
              >
                <span className="pm-node-label">Image generator</span>
                <div className="pm-node-card">
                  <div className="pm-node-media pm-node-media--16-9">
                    {/* eslint-disable-next-line @next/next/no-img-element -- decorative mockup asset from design reference */}
                    <img
                      src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=225&fit=crop&auto=format&q=80"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="pm-node-action">
                    <span className="pm-node-action-ghost" aria-hidden="true">
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.5 4.5h7M12.5 4.5h1M2.5 8h1M6.5 8h7M2.5 11.5h5M10.5 11.5h3" />
                        <circle cx="11" cy="4.5" r="1.2" />
                        <circle cx="5" cy="8" r="1.2" />
                        <circle cx="9" cy="11.5" r="1.2" />
                      </svg>
                    </span>
                    <span className="pm-node-action-spacer" />
                    <span className="pm-node-action-btn pm-node-action-btn--ghost">Rerun</span>
                    <span className="pm-node-action-btn pm-node-action-btn--primary">
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M8 2.5v7M5 6.5l3 3 3-3M3.5 13h9" />
                      </svg>
                      Download
                    </span>
                  </div>
                  <span className="pm-pins pm-pins--left" data-pin-group="1:in">
                    <span className="pm-pin-row">
                      <span className="pm-pin-dot" data-type="text" data-pin="1:in:text" />
                      <span className="pm-pin-label" data-type="text">
                        text
                      </span>
                    </span>
                  </span>
                  <span className="pm-pins pm-pins--right" data-pin-group="1:out">
                    <span className="pm-pin-row">
                      <span className="pm-pin-dot" data-type="image" data-pin="1:out:image" />
                      <span className="pm-pin-label" data-type="image">
                        image <b>x1</b>
                      </span>
                    </span>
                  </span>
                </div>
              </article>
              <article
                className="pm-node pm-node--3"
                data-theme="pink"
                data-node="2"
                data-state="idle"
              >
                <span className="pm-node-label">Image to video</span>
                <div className="pm-node-card">
                  <div className="pm-node-media pm-node-media--16-9 pm-node-media--video">
                    {/* eslint-disable-next-line @next/next/no-img-element -- decorative mockup asset from design reference */}
                    <img
                      src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=225&fit=crop&auto=format&q=80"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="pm-node-action">
                    <span className="pm-node-action-ghost" aria-hidden="true">
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.5 4.5h7M12.5 4.5h1M2.5 8h1M6.5 8h7M2.5 11.5h5M10.5 11.5h3" />
                        <circle cx="11" cy="4.5" r="1.2" />
                        <circle cx="5" cy="8" r="1.2" />
                        <circle cx="9" cy="11.5" r="1.2" />
                      </svg>
                    </span>
                    <span className="pm-node-action-spacer" />
                    <span className="pm-node-action-btn pm-node-action-btn--ghost">Rerun</span>
                    <span className="pm-node-action-btn pm-node-action-btn--primary">
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M8 2.5v7M5 6.5l3 3 3-3M3.5 13h9" />
                      </svg>
                      Download
                    </span>
                  </div>
                  <span className="pm-pins pm-pins--left" data-pin-group="2:in">
                    <span className="pm-pin-row">
                      <span className="pm-pin-dot" data-type="image" data-pin="2:in:image" />
                      <span className="pm-pin-label" data-type="image">
                        image
                      </span>
                    </span>
                  </span>
                  <span className="pm-pins pm-pins--right" data-pin-group="2:out">
                    <span className="pm-pin-row">
                      <span className="pm-pin-dot" data-type="video" data-pin="2:out:video" />
                      <span className="pm-pin-label" data-type="video">
                        video
                      </span>
                    </span>
                  </span>
                </div>
              </article>
            </div>
            <div className="pm-preview" data-pm-preview>
              <figure className="pm-preview-card">
                <div className="pm-preview-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element -- decorative mockup asset from design reference */}
                  <img
                    src="https://images.unsplash.com/photo-1503236823255-94609f598e71?w=900&h=1200&fit=crop&auto=format&q=88"
                    alt=""
                    decoding="async"
                  />
                  <span className="pm-preview-badge">HERO · 00:18</span>
                  <figcaption className="pm-preview-caption">
                    <span className="pm-preview-caption-title">Lip Gloss · Hero cut</span>
                    <span className="pm-preview-caption-meta">Ready for review</span>
                  </figcaption>
                </div>
              </figure>
            </div>
          </section>
        </div>
      </div>
      <PositioningScrollController />
    </section>
  )
})
