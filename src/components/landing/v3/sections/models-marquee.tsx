import React, { memo } from 'react'

const rowA = ['Seedance 2.0', 'Nano Banana 2', 'VEO 3.1', 'ElevenLabs', 'Wan 2.6', 'Gemini 3.0', 'Qwen Image Edit']
const rowB = ['Sora 2', 'Kling 3.0', 'Banana Pro', 'Fish Audio', 'Seedream 5.0 Lite', 'Grok Imagine', 'Hailuo', 'GPT 1.5 Image']

function renderTokens(items: string[]) {
  return [...items, ...items].map((item, index) => (
    <span className={index % 3 === 0 ? 'marquee-token marquee-token--green' : index % 4 === 0 ? 'marquee-token marquee-token--ghost' : 'marquee-token'} key={`${item}-${index}`}>
      {item.includes(' ') ? (
        <>
          {item.split(' ').slice(0, -1).join(' ')} <em>{item.split(' ').slice(-1)}</em>
        </>
      ) : item}
    </span>
  ))
}

export const ModelsMarqueeSection = memo(function ModelsMarqueeSection() {
  return (
    <section className="models" id="models" aria-label="Models" data-surface="ink">
      <div className="models__head">
        <h2 className="models__h2">One Subscription to <em>Rule Them All</em></h2>
      </div>
      <div className="models__marquee" aria-label="Model roster">
        <div className="marquee-row marquee-row--left" aria-hidden="true">
          <div className="marquee-row__track">{renderTokens(rowA)}</div>
        </div>
        <div className="marquee-row marquee-row--right" aria-hidden="true">
          <div className="marquee-row__track">{renderTokens(rowB)}</div>
        </div>
      </div>
    </section>
  )
})
