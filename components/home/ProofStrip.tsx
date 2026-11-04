'use client'

import * as React from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const subscribeToMotionPreference = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches
const getServerReducedMotion = () => true

const PROOF_STATS = [
  {
    targetNum: 40,
    prefix: '',
    suffix: '%',
    label: 'Floor-Space Saving',
    detail: 'STOMAT & STOLIFT brochure statement',
  },
  {
    staticVal: '250 / 500 kg',
    label: 'Tray Load Classes',
    detail: 'STOLIFT tray load classes',
  },
  {
    staticVal: 'Up to 16 m',
    label: 'Machine Height',
    detail: 'STOPICK AS/RS machine height',
  },
  {
    staticVal: 'Up to 25 m',
    label: 'Storage Height',
    detail: 'STOLONG high-bay storage height',
  },
] as const

export function ProofStrip() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [inView, setInView] = React.useState(false)
  const [count, setCount] = React.useState(0)
  const reducedMotion = React.useSyncExternalStore(
    subscribeToMotionPreference,
    getReducedMotion,
    getServerReducedMotion,
  )
  const displayedCount = reducedMotion && inView ? 40 : count

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Smooth count-up for 40%
  React.useEffect(() => {
    if (!inView || reducedMotion) return

    const start = performance.now()
    const duration = 900
    let frame = 0

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const current = Math.floor(progress * 40)
      setCount(current)
      if (progress < 1) {
        frame = requestAnimationFrame(step)
      } else {
        setCount(40)
      }
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [inView, reducedMotion])

  return (
    <section
      ref={containerRef}
      data-theme="dark"
      className="w-full border-y border-white/10 bg-[#070D18] py-8 text-white sm:py-10"
      aria-label="Brochure-stated product specifications"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Source badge header */}
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Brochure-stated figures
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
            Source: Space Magnum Product Catalogue
          </span>
        </div>

        {/* Single Full-Width Row with Hairline Dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {PROOF_STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`py-4 sm:py-2 ${
                idx === 0
                  ? 'sm:pr-6 lg:pr-8'
                  : idx === 3
                  ? 'sm:pl-6 lg:pl-8'
                  : 'sm:px-6 lg:px-8'
              }`}
            >
              <div className="font-mono text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                {'targetNum' in stat ? `${displayedCount}${stat.suffix}` : stat.staticVal}
              </div>
              <div className="mt-2 text-sm font-bold text-zinc-200">
                {stat.label}
              </div>
              <div className="mt-0.5 font-mono text-xs text-zinc-400">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
