'use client'

import React from 'react'

export interface ModelFeature {
  icon?: string
  title: string
  description: string
}

export interface ModelFeaturesProps {
  title?: string
  subtitle?: string
  features: ModelFeature[]
}

export function ModelFeatures({ title = 'Key Features', subtitle, features }: ModelFeaturesProps) {
  return (
    <section className="bg-[#F7F7F7] py-12 md:py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-poller-one text-black mb-2">
            {title}
          </h2>
          {subtitle && <p className="text-sm md:text-base text-gray-600 max-w-xl">{subtitle}</p>}
        </div>

        {/* Features grid - 参考 WorkflowWhoIsForSection 的卡片样式 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border-2 border-black p-4 md:p-5 shadow-[0_8px_0_#000] flex flex-col"
            >
              <div className="flex items-start gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#1fde1f] border border-black flex items-center justify-center text-xs font-bold flex-shrink-0">
                  ✱
                </div>
                <h3 className="text-base md:text-lg font-poller-one text-black leading-tight">
                  {feature.title}
                </h3>
              </div>
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
