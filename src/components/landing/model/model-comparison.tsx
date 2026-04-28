'use client'

import React from 'react'
import { Check, X, Minus } from 'lucide-react'

export interface ComparisonModel {
  name: string
  isHighlighted?: boolean
  values: Record<string, string | boolean | 'partial'>
}

export interface ModelComparisonProps {
  title?: string
  subtitle?: string
  features: string[]
  models: ComparisonModel[]
  // i18n labels
  featureLabel?: string
  recommendedLabel?: string
  supportedLabel?: string
  partialLabel?: string
  notSupportedLabel?: string
}

export function ModelComparison({
  title = 'Model Comparison',
  subtitle,
  features,
  models,
  featureLabel = 'Feature',
  recommendedLabel = '★ Recommended',
  supportedLabel = 'Supported',
  partialLabel = 'Partial',
  notSupportedLabel = 'Not Supported',
}: ModelComparisonProps) {
  const renderValue = (value: string | boolean | 'partial') => {
    if (value === true) {
      return (
        <span className="w-6 h-6 rounded-full bg-[#1fde1f] border border-black flex items-center justify-center">
          <Check className="w-3.5 h-3.5 text-black" />
        </span>
      )
    }
    if (value === false) {
      return (
        <span className="w-6 h-6 rounded-full bg-gray-200 border border-black flex items-center justify-center">
          <X className="w-3.5 h-3.5 text-gray-500" />
        </span>
      )
    }
    if (value === 'partial') {
      return (
        <span className="w-6 h-6 rounded-full bg-yellow-300 border border-black flex items-center justify-center">
          <Minus className="w-3.5 h-3.5 text-black" />
        </span>
      )
    }
    return <span className="text-xs md:text-sm font-bold text-black">{value}</span>
  }

  return (
    <section
      className="py-12 md:py-16 lg:py-20"
      style={{ backgroundColor: 'rgba(246, 98, 204, 0.08)' }}
    >
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-poller-one text-black mb-2">
            {title}
          </h2>
          {subtitle && <p className="text-sm md:text-base text-gray-600 max-w-xl">{subtitle}</p>}
        </div>

        {/* Comparison table - 统一设计风格 */}
        <div className="bg-white rounded-2xl border-2 border-black overflow-hidden shadow-[0_8px_0_#000]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="text-left p-3 md:p-4 font-poller-one text-black text-sm">
                    {featureLabel}
                  </th>
                  {models.map((model, index) => (
                    <th
                      key={index}
                      className={`text-center p-3 md:p-4 ${
                        model.isHighlighted ? 'bg-[#1fde1f]/20' : ''
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        {model.isHighlighted && (
                          <span className="inline-flex items-center px-2 py-0.5 bg-black text-[#1fde1f] text-[10px] md:text-xs font-bold rounded-full">
                            {recommendedLabel}
                          </span>
                        )}
                        <span className="font-poller-one text-sm md:text-base text-black">
                          {model.name}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, featureIndex) => (
                  <tr
                    key={featureIndex}
                    className={`border-b border-gray-200 ${
                      featureIndex % 2 === 0 ? 'bg-gray-50/50' : ''
                    }`}
                  >
                    <td className="p-3 md:p-4 text-xs md:text-sm text-gray-700">{feature}</td>
                    {models.map((model, modelIndex) => (
                      <td
                        key={modelIndex}
                        className={`p-3 md:p-4 text-center ${
                          model.isHighlighted ? 'bg-[#1fde1f]/10' : ''
                        }`}
                      >
                        <div className="flex justify-center">
                          {renderValue(model.values[feature])}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4 md:mt-6 text-xs md:text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#1fde1f] border border-black flex items-center justify-center">
              <Check className="w-3 h-3 text-black" />
            </span>
            <span>{supportedLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-yellow-300 border border-black flex items-center justify-center">
              <Minus className="w-3 h-3 text-black" />
            </span>
            <span>{partialLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-gray-200 border border-black flex items-center justify-center">
              <X className="w-3 h-3 text-gray-500" />
            </span>
            <span>{notSupportedLabel}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
