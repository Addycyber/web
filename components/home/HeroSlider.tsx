'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react'

const SLIDES = [
  {
    src: '/gallery/img_asrs_10_1600w.webp',
    alt: 'High-bay automated storage and retrieval racks at a Pune installation',
    caption: 'ASRS High-Bay Racks',
  },
  {
    src: '/images/hero/hero-6.jpg',
    alt: 'Operator using the control panel of a Space Magnum storage system',
    caption: 'Operator Workstation',
  },
  {
    src: '/gallery/img_stolift_128_1600w.webp',
    alt: 'STOLIFT vertical lift module with shuttle carrier',
    caption: 'Vertical Lift Shuttle Systems',
  },
  {
    src: '/gallery/img_storder_132_1600w.webp',
    alt: 'STORDER automated multi-axis vertical picking system',
    caption: 'Multi-Axis Order Picking',
  },
  {
    src: '/gallery/img_compactors_74_1600w.webp',
    alt: 'Mobile shelving units with mechanical handwheel drives',
    caption: 'Mobile Compactor Storage',
  },
  {
    src: '/gallery/img_carousel_50_1600w.webp',
    alt: 'STOMAT vertical carousel trays at the access opening',
    caption: 'Vertical Carousel Systems',
  },
] as const

const SLIDE_DURATION_MS = 6000

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  const [reducedMotion, setReducedMotion] = React.useState(false)
  const touchStart = React.useRef<{ x: number; y: number } | null>(null)

  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  React.useEffect(() => {
    if (isPaused) return
    const timer = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length)
    }, SLIDE_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [activeIndex, isPaused])

  const goToSlide = React.useCallback((index: number) => {
    setActiveIndex((index + SLIDES.length) % SLIDES.length)
    setIsPaused(false)
  }, [])

  const showPrevious = () => goToSlide(activeIndex - 1)
  const showNext = () => goToSlide(activeIndex + 1)

  return (
    <section
      className="hero-bleed relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#0B1220]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Space Magnum industrial storage systems showcase"
      aria-live="off"
      onTouchStart={(event) => {
        const touch = event.touches[0]
        touchStart.current = { x: touch.clientX, y: touch.clientY }
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current
        if (!start) return
        const touch = event.changedTouches[0]
        const deltaX = touch.clientX - start.x
        const deltaY = touch.clientY - start.y
        touchStart.current = null
        if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY)) return
        goToSlide(activeIndex + (deltaX < 0 ? 1 : -1))
      }}
    >
      {/* Background Slides with Slow Ken-Burns & Crossfade */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, index) => {
          const isActive = index === activeIndex
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              aria-hidden={!isActive}
            >
              <div
                className={`relative h-full w-full transition-transform duration-[7000ms] ease-out ${
                  isActive && !reducedMotion ? 'scale-105' : 'scale-100'
                }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  quality={85}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Cinematic Scrims for Legibility over bright and dark slides */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/55 to-black/45" />
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-[#0B1220]/85 via-[#0B1220]/35 to-transparent" />

      {/* Hero Content Overlay (Huge Headline + Mono Eyebrow + CTAs) */}
      <div className="relative z-30 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-36 sm:px-6 sm:pb-24 md:pb-28 lg:px-8">
        <div className="max-w-4xl space-y-4">
          {/* Eyebrow: Mono small-caps */}
          <div className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--accent)] sm:text-sm sm:tracking-[0.25em]">
              SPACE MAGNUM · PUNE
            </span>
          </div>

          {/* Huge Uppercase Headline (clamp scale, tight tracking) */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[1.02]">
            Capacity² Efficiency² Safety²
          </h1>

          {/* Subline from verified company data */}
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-zinc-300 max-w-2xl leading-relaxed">
            Automated storage, built in Pune. High-density ASRS, vertical carousels, and
            mobile shelving engineered for Indian industry.
          </p>

          {/* Active slide caption */}
          <div
            key={activeIndex}
            className="hero-slide-caption flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 sm:text-xs"
          >
            <span className="text-[var(--accent)]">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="h-px w-6 bg-white/40" aria-hidden="true" />
            <span>{SLIDES[activeIndex].caption}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="#what-we-sell"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[var(--accent-hover)] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
            >
              <span>Explore systems</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-black/40 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:border-white/50 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
            >
              <span>Get a quote</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Controls: Pause, animated progress bars */}
      <div className="absolute bottom-24 left-4 z-30 flex items-center gap-2 sm:bottom-8 sm:left-6 lg:left-8">
        <button
          type="button"
          onClick={() => setIsPaused((paused) => !paused)}
          aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
          aria-pressed={isPaused}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
        >
          {isPaused ? (
            <Play className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Pause className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
        {SLIDES.map((slide, index) => {
          const isActive = index === activeIndex
          return (
            <button
              key={slide.src}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}: ${slide.caption}`}
              aria-current={isActive ? 'true' : undefined}
              className="group relative h-6 w-12 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
            >
              <span className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/20 transition-colors group-hover:bg-white/40">
                {isActive && (
                  <span
                    key={activeIndex}
                    className="hero-progress-fill block h-full w-full bg-[var(--accent)]"
                    style={{
                      animationDuration: `${SLIDE_DURATION_MS}ms`,
                      animationPlayState: isPaused ? 'paused' : 'running',
                    }}
                  />
                )}
              </span>
            </button>
          )
        })}
      </div>

      {/* Arrow controls */}
      <div className="absolute bottom-24 right-4 z-30 flex items-center gap-2 sm:bottom-8 sm:right-6 lg:right-8">
        <button
          type="button"
          onClick={showPrevious}
          aria-label="Previous slide"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label="Next slide"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Scroll Cue Bottom-Center */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 hidden flex-col items-center gap-1 text-zinc-400 pointer-events-none sm:flex sm:bottom-6">
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce text-[var(--accent)]" aria-hidden="true" />
      </div>

      <p className="sr-only" aria-live="polite">
        Slide {activeIndex + 1} of {SLIDES.length}: {SLIDES[activeIndex].caption}
      </p>
    </section>
  )
}
