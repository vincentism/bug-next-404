'use client'

import React, { memo, useCallback, useMemo, useRef, useState } from 'react'
import { Camera } from 'lucide-react'

const HORIZONTAL_SCHEMA = { min: 0, max: 360, step: 1, default: 0 }
const VERTICAL_SCHEMA = { min: -30, max: 90, step: 1, default: 0 }
const ZOOM_SCHEMA = { min: 0, max: 10, step: 0.1, default: 5 }

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))
const wrap360 = (value: number) => {
  const wrapped = value % 360
  return wrapped < 0 ? wrapped + 360 : wrapped
}

const AngleRange = memo(function AngleRange({
  id,
  name,
  min,
  max,
  step,
  value,
  ariaLabel,
  onChange,
}: {
  id: string
  name: string
  min: number
  max: number
  step: number
  value: number
  ariaLabel: string
  onChange: (value: number) => void
}) {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(event.target.value))
    },
    [onChange]
  )

  return (
    <input
      id={id}
      name={name}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      aria-label={ariaLabel}
      onChange={handleChange}
      className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-gray-200 accent-black"
    />
  )
})

type Vec3 = { x: number; y: number; z: number }
const cross = (a: Vec3, b: Vec3): Vec3 => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x,
})
const normalize = (v: Vec3): Vec3 => {
  const len = Math.hypot(v.x, v.y, v.z)
  if (len <= 1e-6) return { x: 0, y: 0, z: 0 }
  return { x: v.x / len, y: v.y / len, z: v.z / len }
}
const dot = (a: Vec3, b: Vec3) => a.x * b.x + a.y * b.y + a.z * b.z

interface AngleControlDemoProps {
  horizontalLabel?: string
  verticalLabel?: string
  zoomLabel?: string
  resetLabel?: string
  dragHint?: string
  previewImageUrl?: string
}

export const AngleControlDemo = memo(function AngleControlDemo({
  horizontalLabel = 'Horizontal',
  verticalLabel = 'Vertical',
  zoomLabel = 'Zoom',
  resetLabel = 'Reset',
  dragHint = 'Drag to orbit · Scroll to zoom',
  previewImageUrl,
}: AngleControlDemoProps) {
  const [horizontalAngle, setHorizontalAngle] = useState(30)
  const [verticalAngle, setVerticalAngle] = useState(15)
  const [zoom, setZoom] = useState(5)
  const horizontalAngleRef = useRef(30)
  const verticalAngleRef = useRef(15)
  const zoomRef = useRef(5)

  const updateAngles = useCallback(
    (next: { horizontal_angle?: number; vertical_angle?: number; zoom?: number }) => {
      if (next.horizontal_angle !== undefined) {
        const value = wrap360(next.horizontal_angle)
        horizontalAngleRef.current = value
        setHorizontalAngle(value)
      }
      if (next.vertical_angle !== undefined) {
        const value = clamp(next.vertical_angle, VERTICAL_SCHEMA.min, VERTICAL_SCHEMA.max)
        verticalAngleRef.current = value
        setVerticalAngle(value)
      }
      if (next.zoom !== undefined) {
        const value = clamp(next.zoom, ZOOM_SCHEMA.min, ZOOM_SCHEMA.max)
        zoomRef.current = value
        setZoom(value)
      }
    },
    []
  )

  const handleHorizontalChange = useCallback(
    (value: number) => {
      updateAngles({ horizontal_angle: value })
    },
    [updateAngles]
  )

  const handleVerticalChange = useCallback(
    (value: number) => {
      updateAngles({ vertical_angle: value })
    },
    [updateAngles]
  )

  const handleZoomChange = useCallback(
    (value: number) => {
      updateAngles({ zoom: value })
    },
    [updateAngles]
  )

  const handleReset = useCallback(() => {
    updateAngles({ horizontal_angle: 30, vertical_angle: 15, zoom: 5 })
  }, [updateAngles])

  // Drag handling
  const previewRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ isDragging: boolean; lastX: number; lastY: number }>({
    isDragging: false,
    lastX: 0,
    lastY: 0,
  })

  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    dragRef.current = { isDragging: true, lastX: event.clientX, lastY: event.clientY }
  }, [])

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!dragRef.current.isDragging) return
      const deltaX = event.clientX - dragRef.current.lastX
      const deltaY = event.clientY - dragRef.current.lastY
      dragRef.current.lastX = event.clientX
      dragRef.current.lastY = event.clientY
      updateAngles({
        horizontal_angle: horizontalAngleRef.current + deltaX * 0.7,
        vertical_angle: verticalAngleRef.current - deltaY * 0.4,
      })
    },
    [updateAngles]
  )

  const handleMouseUp = useCallback(() => {
    dragRef.current.isDragging = false
  }, [])

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      event.preventDefault()
      const delta = Math.sign(event.deltaY) * 0.35
      updateAngles({ zoom: zoomRef.current - delta })
    },
    [updateAngles]
  )

  // --- 3D Math (same as original atom) ---
  const orbitRadius = 120
  const meridianAngles = [0, 45, 90, 135]
  const parallelAngles = [-30, 30]
  const wireColor = 'rgba(156,163,175,0.45)'
  const wireSecondaryColor = 'rgba(156,163,175,0.25)'
  const wireStrokeWidth = 1

  const zoomScale = useMemo(() => {
    const clamped = clamp(zoom, ZOOM_SCHEMA.min, ZOOM_SCHEMA.max)
    const range = ZOOM_SCHEMA.max - ZOOM_SCHEMA.min
    const ratio = range <= 0 ? 0.5 : (clamped - ZOOM_SCHEMA.min) / range
    return 0.7 + ratio * 0.6
  }, [zoom])

  const azimuthRad = useMemo(() => (wrap360(horizontalAngle) * Math.PI) / 180, [horizontalAngle])
  const elevationRad = useMemo(
    () => (clamp(verticalAngle, VERTICAL_SCHEMA.min, VERTICAL_SCHEMA.max) * Math.PI) / 180,
    [verticalAngle]
  )

  const camPos = useMemo(() => {
    const r = orbitRadius
    const ly = r * Math.sin(elevationRad)
    const hRadius = r * Math.cos(elevationRad)
    const lx = hRadius * Math.sin(azimuthRad)
    const lz = hRadius * Math.cos(azimuthRad)
    return { x: lx, y: -ly, z: lz }
  }, [azimuthRad, elevationRad])

  const cameraViz = useMemo(() => {
    const behind = camPos.z < 0
    return { x: camPos.x, y: camPos.y, z: camPos.z, behind }
  }, [camPos])

  const cameraSurfaceRotation = useMemo(() => {
    const forward = normalize({ x: -cameraViz.x, y: -cameraViz.y, z: -cameraViz.z })
    if (Math.hypot(forward.x, forward.y, forward.z) <= 1e-6) return 'none'
    let worldUp: Vec3 = { x: 0, y: -1, z: 0 }
    const dotProduct = dot(worldUp, forward)
    if (Math.abs(dotProduct) > 0.98) worldUp = { x: 0, y: 0, z: 1 }
    const right = normalize(cross(worldUp, forward))
    const up = cross(forward, right)
    const m = [
      right.x,
      right.y,
      right.z,
      0,
      up.x,
      up.y,
      up.z,
      0,
      forward.x,
      forward.y,
      forward.z,
      0,
      0,
      0,
      0,
      1,
    ]
    return `matrix3d(${m.join(',')})`
  }, [cameraViz])

  const subjectPlane = useMemo(() => {
    const baseEdge = 140 * zoomScale
    return { w: baseEdge, h: baseEdge }
  }, [zoomScale])

  const frustumLines = useMemo(() => {
    const halfW = subjectPlane.w / 2
    const halfH = subjectPlane.h / 2
    const corners = [
      { x: -halfW, y: -halfH, z: 0 },
      { x: halfW, y: -halfH, z: 0 },
      { x: -halfW, y: halfH, z: 0 },
      { x: halfW, y: halfH, z: 0 },
    ]
    const clamp01 = (v: number) => Math.max(-1, Math.min(1, v))
    const eps = 1e-6
    return corners.map(corner => {
      const dx = corner.x - cameraViz.x
      const dy = corner.y - cameraViz.y
      const dz = corner.z - cameraViz.z
      const length = Math.sqrt(dx * dx + dy * dy + dz * dz)
      if (length < eps) return { length: 0, transform: 'none' }
      const ux = dx / length
      const uy = dy / length
      const uz = dz / length
      const d = clamp01(ux)
      const angle = Math.acos(d)
      const ax = 0
      let ay = -uz
      let az = uy
      const axisLen = Math.hypot(ay, az)
      if (axisLen < eps) {
        if (ux >= 0) return { length, transform: 'none' }
        return { length, transform: 'rotate3d(0,1,0,180deg)' }
      }
      ay /= axisLen
      az /= axisLen
      const angleDeg = (angle * 180) / Math.PI
      return { length, transform: `rotate3d(${ax},${ay},${az},${angleDeg}deg)` }
    })
  }, [cameraViz, subjectPlane])

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* 3D Preview */}
      <div
        ref={previewRef}
        className="relative h-[320px] md:h-[380px] rounded-2xl border-2 border-black bg-gray-200 overflow-hidden select-none cursor-grab active:cursor-grabbing shadow-[4px_4px_0_#000]"
        style={{ touchAction: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* 3D Scene */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: '800px' }}
        >
          {/* Silhouette Circle */}
          <div
            className="absolute rounded-full"
            style={{
              width: `${orbitRadius * 2}px`,
              height: `${orbitRadius * 2}px`,
              border: `${wireStrokeWidth}px dashed ${wireColor}`,
              background:
                'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), rgba(156,163,175,0.05) 60%, rgba(156,163,175,0.1) 100%)',
              opacity: 0.8,
            }}
          />

          {/* World Origin (Rotated) */}
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: 0,
              height: 0,
              transformStyle: 'preserve-3d',
              transform: 'translate(-50%, -50%) rotateX(-20deg)',
            }}
          >
            <div className="absolute left-0 top-0" style={{ transformStyle: 'preserve-3d' }}>
              {/* Parallels */}
              {parallelAngles.map(lat => {
                const rad = (lat * Math.PI) / 180
                const ringR = orbitRadius * Math.cos(rad)
                const yOffset = orbitRadius * Math.sin(rad)
                if (ringR <= 1) return null
                return (
                  <div
                    key={`parallel-${lat}`}
                    className="absolute rounded-full"
                    style={{
                      width: `${ringR * 2}px`,
                      height: `${ringR * 2}px`,
                      left: '50%',
                      top: '50%',
                      transformStyle: 'preserve-3d',
                      transform: `translate(-50%, -50%) translate3d(0px, ${yOffset}px, 0px) rotateX(90deg)`,
                      border: `${wireStrokeWidth}px dashed ${wireSecondaryColor}`,
                    }}
                  />
                )
              })}

              {/* Meridians */}
              {meridianAngles.map(angle => {
                const isPrimary = angle % 90 === 0
                return (
                  <div
                    key={`meridian-${angle}`}
                    className="absolute rounded-full"
                    style={{
                      width: `${orbitRadius * 2}px`,
                      height: `${orbitRadius * 2}px`,
                      left: '50%',
                      top: '50%',
                      transformStyle: 'preserve-3d',
                      transform: `translate(-50%, -50%) rotateY(${angle}deg)`,
                      border: `${wireStrokeWidth}px dashed ${isPrimary ? wireColor : wireSecondaryColor}`,
                      opacity: isPrimary ? 1 : 0.8,
                    }}
                  />
                )
              })}

              {/* Equator */}
              <div
                className="absolute rounded-full"
                style={{
                  width: `${orbitRadius * 2}px`,
                  height: `${orbitRadius * 2}px`,
                  left: '50%',
                  top: '50%',
                  transformStyle: 'preserve-3d',
                  transform: 'translate(-50%, -50%) rotateX(90deg)',
                  border: `${wireStrokeWidth}px dashed ${wireColor}`,
                }}
              />
            </div>

            {/* Subject at center */}
            <div className="absolute" style={{ transform: 'translate(-50%, -50%)' }}>
              <div
                className="relative shadow-sm border border-gray-200 overflow-hidden flex items-center justify-center bg-white"
                style={{ width: `${subjectPlane.w}px`, height: `${subjectPlane.h}px` }}
              >
                {previewImageUrl ? (
                  <img
                    src={previewImageUrl}
                    alt="Preview subject"
                    className="w-full h-full object-contain"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                    <div className="w-10 h-10 bg-gray-200 rounded" />
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-0 border border-blue-600/45" />
                  <div className="absolute inset-0 bg-blue-500/10" />
                </div>
              </div>
            </div>

            {/* Camera on sphere surface */}
            <div
              className="absolute"
              style={{
                transformStyle: 'preserve-3d',
                transform: `translate3d(${cameraViz.x}px, ${cameraViz.y}px, ${cameraViz.z}px) translateZ(2px)`,
                zIndex: 10,
              }}
            >
              {/* Halo */}
              <div
                className="absolute rounded-full"
                style={{
                  width: '24px',
                  height: '24px',
                  transform: 'translate(-50%, -50%)',
                  border: '1px solid rgba(37,99,235,0.65)',
                  background:
                    'radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.0) 72%)',
                  boxShadow: '0 0 10px rgba(59,130,246,0.28)',
                }}
              />
              <div
                className="absolute flex items-center justify-center"
                style={{ transform: `translate(-50%, -50%) ${cameraSurfaceRotation}` }}
              >
                {/* Camera 3D Box */}
                <div
                  className="relative"
                  style={{
                    width: '32px',
                    height: '32px',
                    transformStyle: 'preserve-3d',
                    opacity: cameraViz.behind ? 0.6 : 1,
                  }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 rounded-[6px] flex items-center justify-center text-blue-700 shadow-sm"
                    style={{
                      transform: 'translateZ(5px)',
                      background:
                        'linear-gradient(135deg, rgba(239,246,255,1), rgba(191,219,254,1))',
                      border: cameraViz.behind
                        ? '1px dashed rgba(37,99,235,0.55)'
                        : '1px solid rgba(37,99,235,0.7)',
                      backfaceVisibility: 'hidden',
                      boxShadow: cameraViz.behind
                        ? '0 0 0 rgba(0,0,0,0)'
                        : '0 0 0 1px rgba(59,130,246,0.12), 0 6px 14px rgba(59,130,246,0.18)',
                    }}
                  >
                    <div style={{ transform: 'rotateX(180deg)' }}>
                      <Camera size={16} />
                    </div>
                  </div>
                  {/* Back */}
                  <div
                    className="absolute inset-0 rounded-[6px]"
                    style={{
                      transform: 'rotateY(180deg) translateZ(5px)',
                      background: '#e5e7eb',
                      border: cameraViz.behind ? '1px dashed #9ca3af' : '1px solid #d1d5db',
                      backfaceVisibility: 'hidden',
                    }}
                  />
                  {/* Right */}
                  <div
                    className="absolute top-0 left-0 h-full rounded-r-[2px]"
                    style={{
                      width: '10px',
                      left: '50%',
                      marginLeft: '-5px',
                      transform: 'translate3d(16px, 0, 0) rotateY(90deg)',
                      transformOrigin: 'center center',
                      background: '#d1d5db',
                      border: cameraViz.behind ? '1px dashed #9ca3af' : '1px solid #9ca3af',
                    }}
                  />
                  {/* Left */}
                  <div
                    className="absolute top-0 left-0 h-full rounded-l-[2px]"
                    style={{
                      width: '10px',
                      left: '50%',
                      marginLeft: '-5px',
                      transform: 'translate3d(-16px, 0, 0) rotateY(-90deg)',
                      transformOrigin: 'center center',
                      background: '#d1d5db',
                      border: cameraViz.behind ? '1px dashed #9ca3af' : '1px solid #9ca3af',
                    }}
                  />
                  {/* Top */}
                  <div
                    className="absolute top-0 left-0 w-full rounded-t-[2px]"
                    style={{
                      height: '10px',
                      top: '50%',
                      marginTop: '-5px',
                      transform: 'translate3d(0, -16px, 0) rotateX(90deg)',
                      transformOrigin: 'center center',
                      background: '#e5e7eb',
                      border: cameraViz.behind ? '1px dashed #9ca3af' : '1px solid #9ca3af',
                    }}
                  />
                  {/* Bottom */}
                  <div
                    className="absolute top-0 left-0 w-full rounded-b-[2px]"
                    style={{
                      height: '10px',
                      top: '50%',
                      marginTop: '-5px',
                      transform: 'translate3d(0, 16px, 0) rotateX(-90deg)',
                      transformOrigin: 'center center',
                      background: '#9ca3af',
                      border: cameraViz.behind ? '1px dashed #9ca3af' : '1px solid #6b7280',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Frustum lines */}
            <div
              className="absolute"
              style={{
                transformStyle: 'preserve-3d',
                transform: `translate3d(${cameraViz.x}px, ${cameraViz.y}px, ${cameraViz.z}px) translateZ(1px)`,
              }}
            >
              {frustumLines.map((line, index) => (
                <div
                  key={`frustum-${index}`}
                  className="absolute h-[3px] origin-left rounded-full"
                  style={{
                    width: `${line.length}px`,
                    transform: line.transform,
                    backgroundImage:
                      'linear-gradient(90deg, rgba(37,99,235,0.92), rgba(59,130,246,0.0))',
                    boxShadow: '0 0 10px rgba(37,99,235,0.25)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Hint overlay */}
        <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
          <span className="text-[11px] text-gray-500 bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full">
            {dragHint}
          </span>
        </div>
      </div>

      {/* Sliders */}
      <div className="mt-5 space-y-3 bg-white rounded-2xl border-2 border-black p-4 shadow-[4px_4px_0_#000]">
        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-gray-700 min-w-[80px]">
            {horizontalLabel}
          </label>
          <AngleRange
            id="demo-horizontal"
            name="horizontal_angle"
            min={HORIZONTAL_SCHEMA.min}
            max={HORIZONTAL_SCHEMA.max}
            step={HORIZONTAL_SCHEMA.step}
            value={horizontalAngle}
            onChange={handleHorizontalChange}
            ariaLabel={horizontalLabel}
          />
          <span className="text-xs text-gray-600 tabular-nums w-[44px] text-right font-mono">
            {Math.round(horizontalAngle)}°
          </span>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-gray-700 min-w-[80px]">{verticalLabel}</label>
          <AngleRange
            id="demo-vertical"
            name="vertical_angle"
            min={VERTICAL_SCHEMA.min}
            max={VERTICAL_SCHEMA.max}
            step={VERTICAL_SCHEMA.step}
            value={verticalAngle}
            onChange={handleVerticalChange}
            ariaLabel={verticalLabel}
          />
          <span className="text-xs text-gray-600 tabular-nums w-[44px] text-right font-mono">
            {Math.round(verticalAngle)}°
          </span>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-gray-700 min-w-[80px]">{zoomLabel}</label>
          <AngleRange
            id="demo-zoom"
            name="zoom"
            min={ZOOM_SCHEMA.min}
            max={ZOOM_SCHEMA.max}
            step={ZOOM_SCHEMA.step}
            value={zoom}
            onChange={handleZoomChange}
            ariaLabel={zoomLabel}
          />
          <span className="text-xs text-gray-600 tabular-nums w-[44px] text-right font-mono">
            {zoom.toFixed(1)}
          </span>
        </div>
        <div className="pt-1">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-gray-700 px-3 py-1.5 rounded-lg border-2 border-black bg-white hover:bg-[#1fde1f] hover:text-black transition-colors font-medium"
          >
            {resetLabel}
          </button>
        </div>
      </div>
    </div>
  )
})
