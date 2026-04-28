'use client'

import React from 'react'
import { WORKFLOW_SCENES_DATA } from './workflow-scenes-data'

interface LandingWorkflowDemoProps {
  className?: string
  sceneIndex?: number
}

export function LandingWorkflowDemo({ className, sceneIndex = 0 }: LandingWorkflowDemoProps) {
  const scene = WORKFLOW_SCENES_DATA[sceneIndex % WORKFLOW_SCENES_DATA.length]
  const nodes = scene.nodes.slice(0, 5)

  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#f7f8f9] p-4 md:p-6 ${className || ''}`}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-4 rounded-2xl border-2 border-black bg-white p-4 shadow-[0_8px_0_#000]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Workflow Preview</p>
          <h3 className="mt-1 font-poller-one text-2xl text-black">{scene.title}</h3>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
          {nodes.map((node, index) => (
            <div
              key={node.id}
              className="relative flex min-h-[120px] flex-col justify-between rounded-2xl border-2 border-black bg-white p-4 shadow-[0_8px_0_rgba(0,0,0,0.9)]"
            >
              {index < nodes.length - 1 && (
                <span className="absolute -right-4 top-1/2 hidden h-1 w-4 -translate-y-1/2 bg-black md:block" />
              )}
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black bg-[#1fde1f] text-xs font-black">
                {index + 1}
              </span>
              <div>
                <p className="mt-4 text-sm font-bold text-black">{node.label || node.type}</p>
                <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                  {node.inputHint || node.inputText || node.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LandingWorkflowDemo
