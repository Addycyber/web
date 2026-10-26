'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { getProduct } from '@/lib/company'

export function SimulatorCanvas() {
  const stolift = getProduct('stolift')
  if (!stolift) throw new Error('Company data must include STOLIFT.')

  const [atWindow, setAtWindow] = useState(false)
  const status = atWindow ? 'Tray at operating window' : 'Ready'

  return (
    <div className="grid items-start gap-8 lg:grid-cols-12">
      <section className="space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6 shadow-sm lg:col-span-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
          <h2 className="font-mono text-xs font-bold uppercase text-[var(--text)]">STOLIFT Simulator</h2>
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 font-mono text-xs font-bold text-[var(--accent)]" aria-live="polite">
            {status}
          </span>
        </div>

        <div className="relative flex min-h-80 items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6">
          <div className="relative h-64 w-full max-w-lg">
            <div className="absolute inset-y-0 left-8 w-2/3 rounded border-2 border-[var(--border-strong)] bg-[var(--bg-subtle)] p-3">
              <div className="flex h-full flex-col justify-between">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="h-7 rounded border border-[var(--border)] bg-[var(--bg)]" />
                ))}
              </div>
            </div>
            <div className="absolute inset-y-0 left-1/2 w-2 border-x border-[var(--border-strong)] bg-[var(--bg-muted)]" />
            <div
              className={`absolute left-1/2 top-1/2 z-10 h-8 w-24 -translate-y-1/2 rounded border-2 border-[var(--accent)] bg-[var(--accent-soft)] shadow-md motion-safe:transition-transform motion-safe:duration-700 ${
                atWindow ? 'translate-x-[140%]' : '-translate-x-1/2'
              }`}
              aria-hidden="true"
            />
            <div className="absolute bottom-0 right-0 flex h-12 w-28 items-center justify-center rounded border-2 border-dashed border-[var(--accent)] bg-[var(--accent-soft)] text-center font-mono text-[10px] font-bold text-[var(--accent)]">
              Operating window
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">
            {stolift.concept}
          </p>
          <button
            type="button"
            onClick={() => setAtWindow((current) => !current)}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]"
          >
            {atWindow ? <RotateCcw size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
            {atWindow ? 'Return tray' : 'Retrieve tray'}
          </button>
        </div>
      </section>

      <aside className="space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6 lg:col-span-4">
        <h2 className="text-lg font-bold">STOLIFT details</h2>
        <ul className="space-y-3 text-sm leading-relaxed text-[var(--text-secondary)]">
          {stolift.features.slice(0, 3).map((feature) => (
            <li key={feature} className="border-b border-[var(--border)] pb-3 last:border-0">
              {feature}
            </li>
          ))}
        </ul>
        <Link
          href="/products/stolift"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          View STOLIFT details <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </aside>
    </div>
  )
}
