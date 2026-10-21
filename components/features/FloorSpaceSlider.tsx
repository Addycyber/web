'use client'

import * as React from 'react'
import { Ruler, Maximize2 } from 'lucide-react'

interface FloorSpaceSliderProps {
  className?: string
  initialPosition?: number // 0 to 100 percentage
}

export function FloorSpaceSlider({ className = '', initialPosition = 50 }: FloorSpaceSliderProps) {
  const [sliderPos, setSliderPos] = React.useState(initialPosition)
  const [isDragging, setIsDragging] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleMove = React.useCallback(
    (clientX: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPos(percentage)
    },
    []
  )

  const handleTouchMove = React.useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return
      handleMove(e.touches[0].clientX)
    },
    [isDragging, handleMove]
  )

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      handleMove(e.clientX)
    },
    [isDragging, handleMove]
  )

  const handleEnd = React.useCallback(() => {
    setIsDragging(false)
  }, [])

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleEnd)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleEnd)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [isDragging, handleMouseMove, handleTouchMove, handleEnd])

  return (
    <div className={`relative w-full rounded-2xl border border-[var(--border)] overflow-hidden bg-[var(--bg-subtle)] shadow-md select-none ${className}`}>
      {/* Top Banner */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="flex items-center gap-2">
          <Ruler className="w-4 h-4 text-[var(--accent)]" />
          <span className="font-mono text-xs uppercase tracking-wider font-bold text-[var(--text)]">
            Floor Space Comparison
          </span>
        </div>
        <div className="font-mono text-xs text-[var(--text-muted)]">
          Drag slider to compare layouts
        </div>
      </div>

      {/* Comparison Canvas Area */}
      <div
        ref={containerRef}
        className="relative h-80 sm:h-96 w-full cursor-ew-resize overflow-hidden"
        onMouseDown={e => {
          setIsDragging(true)
          handleMove(e.clientX)
        }}
        onTouchStart={e => {
          setIsDragging(true)
          handleMove(e.touches[0].clientX)
        }}
      >
        {/* Layer 1: BEFORE (Conventional Sprawling Racks) */}
        <div className="absolute inset-0 bg-[#F4F6F9] dark:bg-[#121B2C] flex flex-col justify-between p-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-rose-500/10 text-rose-700 dark:text-rose-400 font-mono text-xs font-bold w-fit">
            <span>BEFORE: Conventional Static Racks (10,000 sq ft)</span>
          </div>

          {/* Graphical layout illustration of wasteful aisles */}
          <div className="grid grid-cols-6 gap-3 my-auto opacity-75">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2 items-center">
                <div className="w-full h-32 rounded bg-zinc-300 dark:bg-zinc-700 border border-dashed border-zinc-400 flex items-center justify-center text-[10px] font-mono text-zinc-600 dark:text-zinc-300">
                  Aisle {i + 1}
                </div>
                <span className="text-[10px] font-mono text-zinc-500">Forklift Path</span>
              </div>
            ))}
          </div>

          <div className="text-xs text-[var(--text-muted)] font-mono flex justify-between">
            <span>Footprint: 100% floor consumption</span>
            <span>Wasted aisle space: ~70%</span>
          </div>
        </div>

        {/* Layer 2: AFTER (Space Magnum Vertical ASRS & Compactors) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden bg-[var(--bg)] border-r-2 border-[var(--accent)]"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="w-full h-full min-w-[320px] flex flex-col justify-between p-6 bg-gradient-to-br from-[var(--bg)] via-[var(--bg-subtle)] to-[var(--accent-soft)]/20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-bold w-fit">
              <span>AFTER: Space Magnum Vertical ASRS (1,500 sq ft)</span>
            </div>

            {/* Graphical layout illustration of compact vertical tower */}
            <div className="flex items-center gap-6 my-auto">
              {/* Vertical Module Tower */}
              <div className="w-24 sm:w-32 h-40 rounded-xl bg-[var(--brand)] text-white flex flex-col items-center justify-center shadow-lg border border-[var(--accent)] shrink-0">
                <div className="text-[10px] font-mono text-zinc-300">14m Height</div>
                <div className="font-bold text-sm text-[var(--accent)] mt-1">STOMAT</div>
                <div className="text-[9px] font-mono text-zinc-300 mt-2">VLM Tower</div>
              </div>

              {/* Reclaimed Production Space */}
              <div className="flex-1 h-40 rounded-xl border-2 border-dashed border-emerald-500/50 bg-emerald-500/5 flex flex-col items-center justify-center text-center p-4">
                <Maximize2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-1" />
                <span className="font-bold text-base sm:text-lg text-emerald-700 dark:text-emerald-400">
                  85% Floor Space Reclaimed
                </span>
                <span className="text-xs text-[var(--text-secondary)] mt-1 max-w-xs">
                  Repurposed for active CNC manufacturing, assembly lines, or revenue generation.
                </span>
              </div>
            </div>

            <div className="text-xs text-emerald-700 dark:text-emerald-400 font-mono font-semibold flex justify-between">
              <span>Vertical Density: 8.5x increase</span>
              <span>Footprint: Only 15% required</span>
            </div>
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute top-0 bottom-0 -ml-4 w-8 flex items-center justify-center pointer-events-none z-10"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white shadow-xl flex items-center justify-center border-2 border-white dark:border-[var(--bg)] cursor-grab active:cursor-grabbing">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
              <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
