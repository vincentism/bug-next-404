'use client'

import React from 'react'
import { Check, X } from 'lucide-react'

export interface SpecItem {
  label: string
  value: string | boolean
}

export interface SpecCategory {
  title: string
  items: SpecItem[]
}

export interface ModelSpecsProps {
  title?: string
  subtitle?: string
  categories: SpecCategory[]
}

export function ModelSpecs({
  title = 'Technical Specifications',
  subtitle,
  categories,
}: ModelSpecsProps) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#F7F7F7]">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-poller-one text-black mb-2">
            {title}
          </h2>
          {subtitle && <p className="text-sm md:text-base text-gray-600 max-w-xl">{subtitle}</p>}
        </div>

        {/* Specs grid - 参考 WorkflowHowItWorksSection 的卡片样式 */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {categories.map((category, catIndex) => (
            <div
              key={catIndex}
              className="bg-white rounded-2xl border-2 border-black p-4 md:p-5 shadow-[0_6px_0_#000]"
            >
              <h3 className="text-base md:text-lg font-poller-one text-black mb-4 pb-3 border-b-2 border-dashed border-gray-300">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center justify-between gap-4">
                    <span className="text-xs md:text-sm text-gray-700">{item.label}</span>
                    {typeof item.value === 'boolean' ? (
                      item.value ? (
                        <span className="w-6 h-6 rounded-full bg-[#1fde1f] border border-black flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-black" />
                        </span>
                      ) : (
                        <span className="w-6 h-6 rounded-full bg-gray-200 border border-black flex items-center justify-center">
                          <X className="w-3.5 h-3.5 text-gray-500" />
                        </span>
                      )
                    ) : (
                      <span className="text-xs md:text-sm font-bold text-black">{item.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
