'use client'

import React, { memo, useCallback } from 'react'
import { useTranslations } from '@/i18n/client'

export interface FAQItem {
  question: string
  answer: string
}

export interface LandingFAQProps {
  items: FAQItem[]
  title?: string
  variant?: 'page' | 'modal'
}

const FAQListItem = memo(function FAQListItem({
  item,
  index,
  isOpen,
  isLast,
  onToggle,
}: {
  item: FAQItem
  index: number
  isOpen: boolean
  isLast: boolean
  onToggle: (index: number) => void
}) {
  const handleClick = useCallback(() => {
    onToggle(index)
  }, [index, onToggle])

  return (
    <li>
      <button
        className={`w-full flex items-center justify-between gap-3 md:gap-4 text-left p-4 text-sm md:text-base lg:text-lg font-medium text-[#2E2E2E] transition-colors ${isOpen ? 'bg-black/[0.03]' : 'hover:bg-black/[0.03]'}`}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
        onClick={handleClick}
      >
        <span>{item.question}</span>
        <span className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 border border-[#2E2E2E] rounded-full flex-shrink-0">
          <span className="relative inline-flex w-3.5 h-3.5">
            <span className="absolute inset-x-0 inset-y-1/2 -translate-y-1/2 h-0.5 w-full bg-[#2E2E2E]" />
            <span
              className={`absolute inset-y-0 inset-x-1/2 -translate-x-1/2 w-0.5 h-full bg-[#2E2E2E] transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`}
            />
          </span>
        </span>
      </button>
      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-hidden={!isOpen}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-4 px-8 text-xs md:text-sm lg:text-base text-[#4F4F4F] leading-relaxed whitespace-pre-line">
          <p>{item.answer}</p>
        </div>
      </div>
      {!isLast && <div className="h-px bg-black/5" />}
    </li>
  )
})

export function LandingFAQ({ items, title, variant = 'page' }: LandingFAQProps) {
  const t = useTranslations('landing.faq')
  const resolvedTitle = title ?? t('title')
  const isModal = variant === 'modal'
  const [openIndices, setOpenIndices] = React.useState<Set<number>>(new Set([0]))

  const toggleItem = useCallback((index: number) => {
    setOpenIndices(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }, [])

  return (
    <section className={isModal ? 'mt-8' : 'py-12 md:py-16 lg:py-24'}>
      <div className={isModal ? '' : 'container mx-auto max-w-5xl px-4'}>
        {isModal ? (
          <h3 className="text-[18px] font-poller-one text-black mb-4 text-center">
            {resolvedTitle}
          </h3>
        ) : (
          <div className="text-center mb-10 md:mb-12 lg:mb-16">
            <div className="relative inline-flex flex-col items-center">
              <h2 className="relative z-10 text-3xl md:text-4xl lg:text-5xl font-poller-one text-black tracking-wide">
                {resolvedTitle}
              </h2>
              <svg
                width="330"
                height="80"
                viewBox="0 0 330 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute -bottom-14 -left-8 drop-shadow-[0_8px_30px_rgba(4,254,5,0.35)] w-48 md:w-64 lg:w-[330px]"
                aria-hidden
              >
                <g transform="translate(165, 36.802)">
                  <path
                    d="M-153.17,20.736 C-153.17,20.736 -123.546,-12.372 -107.167,-14.812 C-90.787,-17.251 -136.093,33.632 -123.198,28.404 C-110.303,23.175 -52.799,-20.039 -40.949,-22.13 C-29.1,-24.222 -61.86,11.327 -58.375,20.387 C-54.89,29.449 1.569,-18.823 13.767,-22.219 C25.964,-25.616 -17.599,24.918 1.917,22.827 C8.545,22.117 18.188,15.377 28.266,7.454"
                    stroke="rgb(4, 254, 5)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    fill="none"
                    opacity="0.95"
                    className="faq-scribble-path"
                  />
                </g>
              </svg>
            </div>
          </div>
        )}

        <div
          className={
            isModal
              ? 'bg-white border border-black/10 rounded-[16px] overflow-hidden'
              : 'bg-white border-2 border-[#2E2E2E] rounded-[24px] shadow-[0_35px_55px_rgba(0,0,0,0.08)] overflow-hidden'
          }
        >
          <ul>
            {items.map((item, index) => (
              <FAQListItem
                key={item.question}
                item={item}
                index={index}
                isOpen={openIndices.has(index)}
                isLast={index === items.length - 1}
                onToggle={toggleItem}
              />
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        @keyframes faq-scribble-draw {
          0% {
            stroke-dashoffset: 1200;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        :global(.faq-scribble-path) {
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          animation: faq-scribble-draw 3s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.faq-scribble-path) {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
