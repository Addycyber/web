'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Calculator, ShieldCheck, Layers, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const HERO_SLIDES = [
  {
    src: '/images/hero/hero-1.jpg',
    label: 'ASRS Vertical Storage',
    caption: 'STOMAT Vertical Lift Modules',
  },
  {
    src: '/images/hero/hero-3.jpg',
    label: 'High-Density Racking',
    caption: 'Mobile Compactor Systems',
  },
  {
    src: '/images/hero/hero-4.jpg',
    label: 'Automated Carousel',
    caption: 'STOLIFT Carousel Retrieval',
  },
  {
    src: '/images/hero/hero-5.jpg',
    label: 'Warehouse Solutions',
    caption: 'Space Magnum Pune Facility',
  },
  {
    src: '/images/hero/hero-6.jpg',
    label: 'Industrial Storage',
    caption: 'Custom Engineering Solutions',
  },
]

export function Hero() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  const next = () => {
    setDirection(1)
    setCurrent((c) => (c + 1) % HERO_SLIDES.length)
  }

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-[#0A0D14]">

      {/* ── Full-bleed Background Photo Carousel ── */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_SLIDES[current].src}
              alt={HERO_SLIDES[current].caption}
              fill
              className="object-cover"
              priority={current === 0}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D14]/95 via-[#0A0D14]/70 to-[#0A0D14]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14]/80 via-transparent to-[#0A0D14]/40" />
        {/* Subtle grid lines over image */}
        <div className="absolute inset-0 grid-lines opacity-30" />
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[75vh]">

          {/* Left: Messaging */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Status Pill */}
            <div className="pill-signal">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span>Pune, India · ISO 9001:2015 Certified</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.0] tracking-[-0.03em]">
                Reclaim{' '}
                <span className="text-gradient-signal">85%</span>
                <br />
                Floor Space
                <br />
                <span className="text-[#B0BECE] font-semibold text-4xl sm:text-5xl lg:text-6xl">
                  Vertical Automated Storage
                </span>
              </h1>

              <p className="font-body text-lg sm:text-xl text-[#8A9BB5] max-w-xl leading-relaxed">
                Precision Indian engineering for heavy industrial storage. STOMAT Vertical Lift Modules & STOLIFT Carousels — manufactured in Pune.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/tools/calculator"
                className="group flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-zinc-950 font-bold text-base shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all active:scale-[0.98]"
              >
                <Calculator className="w-5 h-5" />
                <span>Calculate Space Reclaim</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/get-a-quote"
                className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white font-semibold text-base backdrop-blur-sm transition-all"
              >
                <span>Request Custom Quote</span>
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-5">
              <div className="space-y-1">
                <div className="text-white font-heading font-bold text-xl flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-orange-400" />
                  85%
                </div>
                <div className="text-[#8A9BB5] text-xs font-mono uppercase tracking-wide">Floor Space Saved</div>
              </div>
              <div className="space-y-1">
                <div className="text-white font-heading font-bold text-xl flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  TÜV
                </div>
                <div className="text-[#8A9BB5] text-xs font-mono uppercase tracking-wide">Quality Certified</div>
              </div>
              <div className="space-y-1">
                <div className="text-white font-heading font-bold text-xl">
                  30+yrs
                </div>
                <div className="text-[#8A9BB5] text-xs font-mono uppercase tracking-wide">Pune Manufacturing</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Image caption + slide controls */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="lg:col-span-5 relative hidden lg:flex flex-col justify-end h-full pb-4"
          >
            {/* Current slide info */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-orange-400 font-mono text-xs uppercase tracking-widest font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                {HERO_SLIDES[current].label}
              </div>
              <p className="text-white font-heading font-semibold text-lg">
                {HERO_SLIDES[current].caption}
              </p>

              {/* Slide Dots */}
              <div className="flex items-center gap-2 pt-1">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                    className={`transition-all duration-300 rounded-full ${
                      i === current
                        ? 'w-8 h-2 bg-orange-400'
                        : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
                <div className="ml-auto flex gap-2">
                  <button onClick={prev} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={next} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom Scroll Indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40 animate-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-white/0 to-white/40" />
      </div>
    </section>
  )
}
