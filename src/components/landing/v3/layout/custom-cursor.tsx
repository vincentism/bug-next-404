import React, { memo } from 'react'

export const CustomCursor = memo(function CustomCursor() {
  return (
    <div id="cursor" className="cursor" aria-hidden="true">
      <span className="cursor__label" data-cursor-label />
    </div>
  )
})
