'use client'

import * as React from 'react'
import { Ruler } from 'lucide-react'

interface FloorSpaceSliderProps {
  className?: string
  initialPosition?: number
}

export function FloorSpaceSlider({ className = '', initialPosition = 50 }: FloorSpaceSliderProps) {
  const [sliderPos, setSliderPos] = React.useState(initialPosition)
  const [isDragging, setIsDragging] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleMove = React.useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const percentage = ((clientX - rect.left) / rect.width) * 100
    setSliderPos(Math.max(0, Math.min(100, percentage)))
  }, [])

  const handleTouchMove = React.useCallback((event: TouchEvent) => {
    if (isDragging && event.touches[0]) handleMove(event.touches[0].clientX)
  }, [handleMove, isDragging])

  const handleMouseMove = React.useCallback((event: MouseEvent) => {
    if (isDragging) handleMove(event.clientX)
  }, [handleMove, isDragging])

  const handleEnd = React.useCallback(() => setIsDragging(false), [])

  React.useEffect(() => {
    if (!isDragging) return
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleEnd)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [handleEnd, handleMouseMove, handleTouchMove, isDragging])

  return (
    <div className={`relative w-full select-none overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] shadow-md ${className}`}>
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-5 py-3">
        <div className="flex items-center gap-2">
          <Ruler className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text)]">
            Storage layout illustration
          </span>
        </div>
        <span className="font-mono text-xs text-[var(--text-muted)]">Drag to compare</span>
      </div>

      <div
        ref={containerRef}
        className="relative h-80 w-full cursor-ew-resize overflow-hidden sm:h-96"
        onMouseDown={(event) => {
          setIsDragging(true)
          handleMove(event.clientX)
        }}
        onTouchStart={(event) => {
          setIsDragging(true)
          if (event.touches[0]) handleMove(event.touches[0].clientX)
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-between bg-[var(--bg-subtle)] p-6">
          <div className="w-fit rounded bg-[var(--border)]/40 px-3 py-1 font-mono text-xs font-bold text-[var(--text)]">
            Fixed shelving (illustration)
          </div>
          <div className="my-auto grid grid-cols-4 gap-3 opacity-80">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex h-36 items-center justify-center rounded border border-dashed border-[var(--border)] bg-[var(--bg)] px-2 text-center font-mono text-[10px] text-[var(--text-muted)]">
                Storage bay
              </div>
            ))}
          </div>
          <p className="font-mono text-xs text-[var(--text-muted)]">
            Access aisles remain between fixed shelves.
          </p>
        </div>

        <div
          className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-[var(--accent)] bg-[var(--bg)]"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="flex h-full min-w-[320px] flex-col justify-between bg-gradient-to-br from-[var(--bg)] via-[var(--bg-subtle)] to-[var(--accent-soft)]/20 p-6">
            <div className="w-fit rounded bg-[var(--accent-soft)] px-3 py-1 font-mono text-xs font-bold text-[var(--accent)]">
              Mobile shelving (illustration)
            </div>
            <div className="my-auto flex h-40 items-stretch gap-3">
              <div className="flex flex-1 items-center justify-center rounded border border-[var(--border)] bg-[var(--bg-subtle)] px-2 text-center font-mono text-[10px] text-[var(--text-secondary)]">
                Movable shelving
              </div>
              <div className="flex w-20 shrink-0 items-center justify-center rounded border-2 border-dashed border-[var(--accent)]/50 bg-[var(--accent-soft)]/40 px-2 text-center font-mono text-[10px] text-[var(--accent)]">
                Open access aisle
              </div>
              <div className="flex flex-1 items-center justify-center rounded border border-[var(--border)] bg-[var(--bg-subtle)] px-2 text-center font-mono text-[10px] text-[var(--text-secondary)]">
                Movable shelving
              </div>
            </div>
            <p className="font-mono text-xs text-[var(--text-secondary)]">
              An aisle opens between movable shelving.
            </p>
          </div>
        </div>

        <div
          role="slider"
          tabIndex={0}
          aria-label="Compare fixed and mobile shelving illustrations"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPos)}
          className="absolute inset-y-0 z-10 -ml-4 flex w-8 items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          style={{ left: `${sliderPos}%` }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') setSliderPos((position) => Math.max(0, position - 5))
            if (event.key === 'ArrowRight') setSliderPos((position) => Math.min(100, position + 5))
          }}
        >
          <div className="flex h-8 w-8 cursor-grab items-center justify-center rounded-full border-2 border-white bg-[var(--accent)] text-white shadow-xl active:cursor-grabbing dark:border-[var(--bg)]">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2" aria-hidden="true">
              <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
