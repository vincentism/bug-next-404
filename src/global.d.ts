interface Window {
  showOpenFilePicker(options?: {
    types?: {
      description?: string
      accept: Record<string, string[]>
    }[]
  }): Promise<FileSystemFileHandle[]>
  dataLayer: Record<string, unknown>[]
  _cio: {
    identify: (data: Record<string, unknown>) => void
    track: (event: string, data?: Record<string, unknown>) => void
    [key: string]: unknown
  }
}

declare module 'canvas-confetti' {
  export default function confetti(options: ConfettiOptions): void
}

interface ConfettiOptions {
  particleCount: number
  angle: number
  spread: number
  startVelocity: number
  origin: { x: number; y: number }
  colors: string[]
}

declare module '*.svg' {
  import React from 'react'
  const SVGComponent: React.FC<React.SVGProps<SVGSVGElement>>
  export default SVGComponent
}