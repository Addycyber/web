'use client'

import * as React from 'react'
import { company, products } from '@/lib/company'

const QUERY = '(prefers-reduced-motion: reduce)'

function getProduct(slug: string) {
  const product = products.find((item) => item.slug === slug)
  if (!product) throw new Error(`Company data must include ${slug}.`)
  return product
}

// Every slide is drawn from data/company-data.json: product summaries and
// brochure-stated engineering statements. No process claims are inferred.
const TSM_ITEMS = [
  {
    title: 'Store planning',
    summary:
      'An integrated approach to storage planning and custom-built storage solutions, developed from work with conventional mobile-rack users.',
    source: company.name,
  },
  ...products.map((product) => ({
    title: product.name,
    summary: product.summary,
    source: product.type,
  })),
  {
    title: 'PLC control',
    summary: getProduct('stomat').controller[0],
    source: 'STOMAT · brochure',
  },
  {
    title: 'Safety',
    summary: getProduct('stomat').safety[0],
    source: 'STOMAT · brochure',
  },
  {
    title: 'Construction',
    summary: getProduct('stomat').features[3],
    source: 'STOMAT · brochure',
  },
]

export function TotalStoreManagement() {
  const sectionRef = React.useRef<HTMLElement>(null)
  const trackRef = React.useRef<HTMLDivElement>(null)
  const barRef = React.useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = React.useState(false)

  React.useEffect(() => {
    const query = window.matchMedia(QUERY)
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  React.useEffect(() => {
    if (reducedMotion) return
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    let frame = 0
    const update = () => {
      frame = 0
      const rect = section.getBoundingClientRect()
      const distance = section.offsetHeight - window.innerHeight
      if (distance <= 0) return
      const progress = Math.min(1, Math.max(0, -rect.top / distance))
      const shift = progress * (TSM_ITEMS.length - 1) * window.innerWidth
      track.style.transform = `translate3d(-${shift}px, 0, 0)`
      if (barRef.current) barRef.current.style.width = `${((progress * (TSM_ITEMS.length - 1) + 1) / TSM_ITEMS.length) * 100}%`
    }
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="tsm-heading"
      className="relative w-full border-b border-[var(--border)] bg-[var(--bg-subtle)] transition-colors"
      style={reducedMotion ? undefined : { height: `${TSM_ITEMS.length * 70}vh` }}
    >
      <div className="sticky top-0 flex min-h-[100svh] flex-col justify-center overflow-hidden py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                Total Store Management
              </span>
            </div>
            <h2
              id="tsm-heading"
              className="text-3xl font-black uppercase tracking-tight text-[var(--text)] sm:text-5xl"
            >
              One store, managed end to end
            </h2>
            <p className="text-base font-normal leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              The systems and controls in the Space Magnum range. Every statement below comes from the
              company brochure.
            </p>
          </div>
        </div>

        {reducedMotion ? (
          <ul className="mx-auto mt-10 grid w-full max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
            {TSM_ITEMS.map((item, index) => (
              <li
                key={item.title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6"
              >
                <span className="font-mono text-sm font-black text-[var(--accent)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-bold text-[var(--text)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{item.summary}</p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                  {item.source}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <div className="mt-10 overflow-hidden">
              <div
                ref={trackRef}
                className="flex w-max will-change-transform"
                style={{ transition: 'transform 120ms linear' }}
              >
                {TSM_ITEMS.map((item, index) => (
                  <article
                    key={item.title}
                    className="flex w-screen shrink-0 flex-col justify-center px-4 sm:px-6 lg:px-8"
                    aria-label={`${item.title}${index === 0 ? '' : `, item ${index + 1} of ${TSM_ITEMS.length}`}`}
                  >
                    <div className="mx-auto w-full max-w-5xl border-t border-[var(--border-strong)] pt-6">
                      <div className="flex items-baseline justify-between gap-6">
                        <span className="font-mono text-5xl font-black tracking-tighter text-[var(--accent)] sm:text-7xl">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                          {index + 1} / {TSM_ITEMS.length}
                        </span>
                      </div>
                      <h3 className="mt-6 text-3xl font-black uppercase tracking-tight text-[var(--text)] sm:text-5xl">
                        {item.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-xl">
                        {item.summary}
                      </p>
                      <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                        {item.source}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="h-px w-full bg-[var(--border)]">
                <div
                  ref={barRef}
                  className="h-px bg-[var(--accent)] transition-[width] duration-150"
                  style={{ width: `${100 / TSM_ITEMS.length}%` }}
                />
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                Scroll to move through the range
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
