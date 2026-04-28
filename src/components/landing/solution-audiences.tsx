'use client'

import React from 'react'

export interface AudienceItem {
  key: string
  title: string
  description: string
  roles: string
}

export interface SolutionAudiencesProps {
  badge: string
  title: string
  description: string
  items: AudienceItem[]
}

export function SolutionAudiences({ badge, title, description, items }: SolutionAudiencesProps) {
  return (
    <section className="py-16 md:py-24 bg-black text-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-10 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#1fde1f] text-black mb-4">
            {badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-poller-one mb-4">{title}</h2>
          <p className="text-base text-gray-400">{description}</p>
        </div>

        <div className="space-y-3">
          {items.map(item => (
            <div
              key={item.key}
              className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 px-4 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.08] transition-colors"
            >
              <div className="md:w-1/3 min-w-0">
                <h3 className="text-lg md:text-xl font-poller-one text-white">{item.title}</h3>
              </div>
              <div className="flex-1 min-w-0 text-sm text-gray-300">
                <p className="mb-2 leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.roles.split(', ').map((role: string, i: number) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full text-[11px] bg-white/5 text-gray-200 border border-white/10"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
