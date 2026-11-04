'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import companyData from '@/data/company-data.json'
import sliderManifest from '@/content/slider.manifest.json'

type SlideCopy = {
  line1: string
  line2: string
  text: string
  cta: string
  href: string
}

type SliderSlide = SlideCopy & {
  type: 'image' | 'video'
  src: string
  sources?: { webp: Record<string, string>; avif: Record<string, string> }
  poster?: string
  width: number
  height: number
  blurDataURL?: string
  objectPosition?: string
  alt?: string
}

const SLIDE_DURATION_MS = 6000
const SLIDE_COPY = companyData.heroSlides as SlideCopy[]

const FALLBACK_MEDIA: SliderSlide[] = [
  {
    type: 'image',
    src: '/gallery/img_asrs_10_1600w.webp',
    width: 1600,
    height: 900,
    alt: 'Automated storage and retrieval racks at an industrial installation',
    ...SLIDE_COPY[0],
  },
  {
    type: 'image',
    src: '/images/hero/hero-6.jpg',
    width: 1920,
    height: 1080,
    alt: 'Industrial storage equipment at a Space Magnum installation',
    ...SLIDE_COPY[1],
  },
  {
    type: 'image',
    src: '/gallery/img_stolift_128_1600w.webp',
    width: 1600,
    height: 900,
    alt: 'STOLIFT vertical lift storage system',
    ...SLIDE_COPY[2],
  },
  {
    type: 'image',
    src: '/gallery/img_storder_132_1600w.webp',
    width: 1600,
    height: 900,
    alt: 'Automated multi-axis vertical picking system',
    ...SLIDE_COPY[3],
  },
  {
    type: 'image',
    src: '/gallery/img_compactors_74_1600w.webp',
    width: 1600,
    height: 900,
    alt: 'Mobile shelving units with mechanical handwheel drives',
    ...SLIDE_COPY[4],
  },
  {
    type: 'image',
    src: '/gallery/img_carousel_50_1600w.webp',
    width: 1600,
    height: 900,
    alt: 'Vertical carousel trays at the access opening',
    ...SLIDE_COPY[5],
  },
]

const SLIDES = (sliderManifest.length ? sliderManifest : FALLBACK_MEDIA) as SliderSlide[]

function sourceSet(sources: Record<string, string> | undefined): string | undefined {
  if (!sources) return undefined
  return Object.entries(sources)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([width, src]) => `${src} ${width}w`)
    .join(', ')
}

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)
  const [isFocused, setIsFocused] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(false)
  const [isDocumentVisible, setIsDocumentVisible] = React.useState(true)
  const [reducedMotion, setReducedMotion] = React.useState(false)
  const sectionRef = React.useRef<HTMLElement>(null)
  const touchStart = React.useRef<{ x: number; y: number } | null>(null)
  const autoplay = !isPaused && !isHovered && !isFocused && isVisible && isDocumentVisible && !reducedMotion

  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  React.useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    const update = () => setIsDocumentVisible(!document.hidden)
    update()
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  React.useEffect(() => {
    if (!autoplay) return
    const timer = window.setTimeout(
      () => setActiveIndex((index) => (index + 1) % SLIDES.length),
      SLIDE_DURATION_MS,
    )
    return () => window.clearTimeout(timer)
  }, [activeIndex, autoplay])

  const goToSlide = React.useCallback((index: number) => {
    setActiveIndex((index + SLIDES.length) % SLIDES.length)
    setIsPaused(false)
  }, [])

  const showPrevious = React.useCallback(() => goToSlide(activeIndex - 1), [activeIndex, goToSlide])
  const showNext = React.useCallback(() => goToSlide(activeIndex + 1), [activeIndex, goToSlide])
  const activeSlide = SLIDES[activeIndex]

  return (
    <section
      ref={sectionRef}
      className="hero-bleed hero-slider relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-[#080d15] text-white"
      role="region"
      aria-roledescription="carousel"
      aria-label="Space Magnum industrial storage systems showcase"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setIsHovered(true)
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') setIsHovered(false)
        sectionRef.current?.style.setProperty('--hero-parallax-x', '0px')
        sectionRef.current?.style.setProperty('--hero-parallax-y', '0px')
      }}
      onPointerMove={(event) => {
        if (event.pointerType !== 'mouse' || window.innerWidth < 1024) return
        const bounds = event.currentTarget.getBoundingClientRect()
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 24
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 24
        sectionRef.current?.style.setProperty('--hero-parallax-x', `${-x}px`)
        sectionRef.current?.style.setProperty('--hero-parallax-y', `${-y}px`)
      }}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
          setIsFocused(false)
        }
      }}
      onTouchStart={(event) => {
        const touch = event.touches[0]
        if (!touch) return
        touchStart.current = { x: touch.clientX, y: touch.clientY }
        setIsPaused(true)
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current
        const touch = event.changedTouches[0]
        touchStart.current = null
        if (!start || !touch) return
        const deltaX = touch.clientX - start.x
        const deltaY = touch.clientY - start.y
        if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY)) return
        goToSlide(activeIndex + (deltaX < 0 ? 1 : -1))
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          showPrevious()
        } else if (event.key === 'ArrowRight') {
          event.preventDefault()
          showNext()
        }
      }}
    >
      <div className="absolute inset-0">
        {SLIDES.map((slide, index) => {
          const isActive = index === activeIndex
          const distance = Math.min(
            (index - activeIndex + SLIDES.length) % SLIDES.length,
            (activeIndex - index + SLIDES.length) % SLIDES.length,
          )
          if (distance > 1) return null

          return (
            <div
              key={slide.src}
              className={`hero-slide-layer absolute inset-0 ${isActive ? 'is-active' : ''} ${index % 2 ? 'hero-slide-layer--reverse' : ''}`}
              aria-hidden={!isActive}
            >
              <div className={`hero-slide-photo ${isActive && !reducedMotion ? 'is-moving' : ''}`}>
                <div className="hero-slide-parallax">
                  {slide.type === 'video' ? (
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      src={slide.src}
                      poster={slide.poster}
                      autoPlay={isActive && !reducedMotion}
                      muted
                      loop
                      playsInline
                      preload={isActive ? 'auto' : 'none'}
                      aria-hidden="true"
                      style={{ objectPosition: slide.objectPosition ?? '50% 50%' }}
                    />
                  ) : (
                    <picture className="absolute inset-0 block">
                      {sourceSet(slide.sources?.avif) && (
                        <source type="image/avif" srcSet={sourceSet(slide.sources?.avif)} sizes="100vw" />
                      )}
                      {sourceSet(slide.sources?.webp) && (
                        <source type="image/webp" srcSet={sourceSet(slide.sources?.webp)} sizes="100vw" />
                      )}
                      <Image
                        src={slide.sources?.webp?.['1920'] ?? slide.src}
                        alt={slide.alt ?? ''}
                        fill
                        sizes="100vw"
                        {...(index === 0 && activeIndex === 0
                          ? { preload: true }
                          : {
                              loading: isActive ? 'eager' as const : 'lazy' as const,
                              fetchPriority: isActive ? 'high' as const : 'auto' as const,
                            })}
                        placeholder={slide.blurDataURL ? 'blur' : 'empty'}
                        blurDataURL={slide.blurDataURL}
                        className="object-cover"
                        style={{ objectPosition: slide.objectPosition ?? '50% 50%' }}
                      />
                    </picture>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#080d15]/95 via-[#080d15]/45 to-[#080d15]/25" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#080d15]/80 via-[#080d15]/30 to-transparent" />

      <div className="relative z-20 mx-auto flex h-full max-w-7xl items-end px-5 pb-36 sm:px-8 sm:pb-32 lg:px-12 lg:pb-36">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeIndex}
            className="max-w-4xl"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: reducedMotion ? 0 : 0.35, ease: 'easeOut' }}
          >
            <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)] sm:text-sm">
              Space Magnum <span className="mx-2 text-white/40">/</span> Pune, India
            </p>
            <h1 className="mb-6 max-w-4xl text-[clamp(2.5rem,7.2vw,6.8rem)] font-black uppercase leading-[0.94] tracking-[-0.045em] text-white">
              <span className="hero-line-mask">
                <span className="hero-headline-line">{activeSlide.line1}</span>
              </span>
              <span className="hero-line-mask">
                <span className="hero-headline-line hero-headline-line--accent">{activeSlide.line2}</span>
              </span>
            </h1>
            <p className="hero-body-in max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl">
              {activeSlide.text}
            </p>
            <Link
              href={activeSlide.href}
              className="hero-cta-in mt-7 inline-flex min-h-12 items-center gap-3 rounded-sm bg-[var(--accent)] px-6 py-3 text-sm font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[var(--accent-hover)] focus-visible:outline-2 focus-visible:outline-white sm:mt-9"
            >
              {activeSlide.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-5 z-30 flex items-center gap-4 sm:bottom-8 sm:left-8 lg:left-12">
        <button
          type="button"
          onClick={() => setIsPaused((paused) => !paused)}
          aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
          aria-pressed={isPaused}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white"
        >
          {isPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
        </button>
        <div className="flex items-center gap-1.5" role="group" aria-label="Choose slide">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              className="group flex h-10 w-8 items-center focus-visible:outline-2 focus-visible:outline-white"
            >
              <span className="relative h-0.5 w-full overflow-hidden bg-white/35">
                {index === activeIndex && (
                  <span
                    key={`${activeIndex}-${isPaused}`}
                    className="hero-progress-fill absolute inset-0 origin-left bg-[var(--accent)]"
                    style={{
                      animationDuration: `${SLIDE_DURATION_MS}ms`,
                      animationPlayState: autoplay ? 'running' : 'paused',
                    }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <span className="font-mono text-xs tracking-[0.12em] text-white/75" aria-label={`Slide ${activeIndex + 1} of ${SLIDES.length}`}>
          <span className="text-white">{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="mx-2 text-white/40">—</span>
          {String(SLIDES.length).padStart(2, '0')}
        </span>
      </div>

      <div className="absolute bottom-6 right-5 z-30 flex items-center gap-2 sm:bottom-8 sm:right-8 lg:right-12">
        <button
          type="button"
          onClick={showPrevious}
          aria-label="Previous slide"
          className="hero-arrow flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur focus-visible:outline-2 focus-visible:outline-white"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label="Next slide"
          className="hero-arrow flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur focus-visible:outline-2 focus-visible:outline-white"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        Slide {activeIndex + 1} of {SLIDES.length}: {activeSlide.line1} {activeSlide.line2}
      </p>
    </section>
  )
}
