'use client'

import * as React from 'react'
import Link from 'next/link'
import { INDUSTRIES, IndustryId } from '@/config/industries'
import { ArrowRight, CheckCircle2, Factory, Car, Pill, FlaskConical, Truck, Cpu } from 'lucide-react'

const INDUSTRY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  automotive: Car,
  pharma: Pill,
  chemicals: FlaskConical,
  logistics: Truck,
  electronics: Cpu,
}

export function IndustrySelector() {
  const [selectedId, setSelectedId] = React.useState<IndustryId>('automotive')

  const currentIndustry = INDUSTRIES.find(i => i.id === selectedId) || INDUSTRIES[0]
  const CurrentIcon = INDUSTRY_ICONS[currentIndustry.id] || Factory

  return (
    <section className="py-20 md:py-24 bg-[var(--bg)] border-b border-[var(--border)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider">
            <span>Tailored Industrial Storage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight">
            Solutions Built for Your Sector
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-body">
            From high-speed spare parts picking in Automotive to batch-controlled cleanroom storage in Pharma.
          </p>
        </div>

        {/* Industry Selector Chips */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {INDUSTRIES.map(ind => {
            const isActive = ind.id === selectedId
            const Icon = INDUSTRY_ICONS[ind.id] || Factory

            return (
              <button
                key={ind.id}
                type="button"
                onClick={() => setSelectedId(ind.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-[var(--accent)] text-white shadow-sm'
                    : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:text-[var(--text)]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{ind.name}</span>
              </button>
            )
          })}
        </div>

        {/* Selected Industry Detail Card */}
        <div className="bg-[var(--bg-subtle)] border border-[var(--border)] rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-[var(--accent)] font-bold uppercase tracking-wider">
                  {currentIndustry.name} Engineering Focus
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
                  {currentIndustry.headline}
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-body">
                  {currentIndustry.description}
                </p>
              </div>

              {/* Key Pain Points Solved */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentIndustry.painPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text)]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href={`/industries/${currentIndustry.id}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors group"
                >
                  <span>Explore {currentIndustry.name} Storage Systems</span>
                  <ArrowRight className="w-4 h-4 transition-transform motion-safe:group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Mini Spec Tile */}
            <div className="lg:col-span-4 p-6 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                <CurrentIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Recommended System
                </span>
                <div className="text-base font-bold text-[var(--text)] mt-0.5">
                  {currentIndustry.recommendedProducts[0]}
                </div>
              </div>
              <div className="pt-2 border-t border-[var(--border)] text-xs text-[var(--text-secondary)]">
                Configured with sector-specific containment, tray division, and industrial WMS protocol connectivity.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
