'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Calculator, ShieldCheck, ChevronLeft, ChevronRight, Layers } from 'lucide-react'

const HERO_SLIDES = [
  {
    src: '/gallery/img_asrs_3_960w.webp',
    fallbackSrc: '/images/hero/hero-1.jpg',
    label: 'STOMAT Vertical Lift Module',
    caption: '14-meter automated vertical storage system commissioning in Pune, India.',
  },
  {
    src: '/gallery/img_stolift_14_960w.webp',
    fallbackSrc: '/images/hero/hero-3.jpg',
    label: 'STOLIFT Vertical Carousel',
    caption: 'Goods-to-person tray extraction with millimeter precision.',
  },
  {
    src: '/gallery/img_compactors_17_960w.webp',
    fallbackSrc: '/images/hero/hero-4.jpg',
    label: 'Heavy-Duty Mobile Compactors',
    caption: 'Multi-bay movable racking eliminating idle aisle footprints.',
  },
]

export function Hero() {
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % HERO_SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden bg-[var(--bg)] border-b border-[var(--border)] pt-8 pb-16 lg:pt-14 lg:pb-24 transition-colors">
      {/* Subtle Engineering Grid Backdrop */}
      <div className="absolute inset-0 eng-grid pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & Engineering Specs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status & Engineering Tag */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider border border-[var(--border)]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>TÜV Austria Certified • Pune, India</span>
              </span>
              <span className="inline-block px-2.5 py-1 rounded font-mono text-[11px] text-[var(--text-muted)] bg-[var(--bg-muted)]">
                STOMAT • STOLIFT • STORDER
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text)] leading-[1.08]">
              Reclaim up to <span className="text-[var(--accent)]">85%</span> of your warehouse floor space.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl font-body">
              Space Magnum engineers and manufactures custom Automated Storage &amp; Retrieval Systems (ASRS) and heavy-duty industrial compactors in Pune, India. Replace sprawling static aisles with high-density vertical towers.
            </p>

            {/* Dimension Reference Monospace Ticks */}
            <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] font-mono text-xs text-[var(--text-muted)] flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-[var(--text)]">Height Reach:</span> Up to 16m
              </span>
              <span className="text-[var(--border-strong)]">|</span>
              <span className="flex items-center gap-1.5">
                <span className="font-semibold text-[var(--text)]">Tray Payload:</span> Up to 1,000 kg
              </span>
              <span className="text-[var(--border-strong)]">|</span>
              <span className="flex items-center gap-1.5">
                <span className="font-semibold text-[var(--text)]">Cycle Time:</span> 15 – 25 sec
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/get-a-quote"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
              >
                <span>Request Facility Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform motion-safe:group-hover:translate-x-1" />
              </Link>

              <Link
                href="/tools/calculator"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg)] text-[var(--text)] text-sm font-semibold hover:border-[var(--brand)] hover:text-[var(--brand)] transition-all shadow-xs focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
              >
                <Calculator className="w-4 h-4 text-[var(--accent)]" />
                <span>Calculate Space ROI</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Large Crisp Equipment Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] shadow-lg overflow-hidden group">
              
              {/* Media Display */}
              <div className="relative aspect-[4/3] w-full bg-[var(--bg-muted)] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={HERO_SLIDES[current].src}
                      alt={HERO_SLIDES[current].label}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Top Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded bg-[var(--bg)]/90 backdrop-blur-md border border-[var(--border)] text-[11px] font-mono font-bold uppercase text-[var(--accent)] shadow-xs">
                  {HERO_SLIDES[current].label}
                </div>

                {/* Slide Nav Buttons */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-10">
                  <button
                    type="button"
                    onClick={() => setCurrent(c => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                    aria-label="Previous slide"
                    className="p-1.5 rounded-md bg-[var(--bg)]/80 hover:bg-[var(--bg)] text-[var(--text)] backdrop-blur-md border border-[var(--border)] transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrent(c => (c + 1) % HERO_SLIDES.length)}
                    aria-label="Next slide"
                    className="p-1.5 rounded-md bg-[var(--bg)]/80 hover:bg-[var(--bg)] text-[var(--text)] backdrop-blur-md border border-[var(--border)] transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Caption Strip */}
              <div className="p-4 bg-[var(--bg)] border-t border-[var(--border)] flex items-center justify-between">
                <p className="text-xs text-[var(--text-secondary)] font-medium line-clamp-1">
                  {HERO_SLIDES[current].caption}
                </p>
                <div className="font-mono text-[11px] text-[var(--text-muted)] shrink-0 ml-4">
                  0{current + 1} / 0{HERO_SLIDES.length}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4-Item Proof KPI Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[var(--border)]">
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[var(--accent)]">85%</div>
            <div className="text-xs font-semibold text-[var(--text)] mt-1">Floor Footprint Saved</div>
            <div className="text-[11px] text-[var(--text-muted)]">Vertical density multiplier</div>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[var(--text)]">15 – 25s</div>
            <div className="text-xs font-semibold text-[var(--text)] mt-1">Cycle Retrieval Time</div>
            <div className="text-[11px] text-[var(--text-muted)]">Direct goods-to-person</div>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[var(--text)]">1,000 kg</div>
            <div className="text-xs font-semibold text-[var(--text)] mt-1">Heavy Tray Payload</div>
            <div className="text-[11px] text-[var(--text-muted)]">Engineered steel carriages</div>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[var(--brand)] dark:text-[var(--brand)]">100%</div>
            <div className="text-xs font-semibold text-[var(--text)] mt-1">Made in Pune, India</div>
            <div className="text-[11px] text-[var(--text-muted)]">In-house design &amp; fabrication</div>
          </div>
        </div>

      </div>
    </section>
  )
}
