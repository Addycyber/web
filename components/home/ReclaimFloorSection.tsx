'use client'

import * as React from 'react'
import Link from 'next/link'
import { Calculator, ArrowRight, TrendingUp } from 'lucide-react'
import { FloorSpaceSlider } from '@/components/features/FloorSpaceSlider'

export function ReclaimFloorSection() {
  const [floorArea, setFloorArea] = React.useState<number>(3000)

  const reclaimedArea = Math.round(floorArea * 0.85)
  const remainingArea = floorArea - reclaimedArea
  const annualSavingsINR = Math.round(reclaimedArea * 75 * 12)

  return (
    <section className="py-20 md:py-28 bg-[var(--bg-subtle)] border-b border-[var(--border)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider mx-auto">
            <span>Vertical Space Optimization</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text)] tracking-tight">
            Stop Paying Rent for <span className="text-[var(--accent)]">Empty Air</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-body">
            Conventional static shelving wastes up to 80% of vertical warehouse volume. Space Magnum vertical systems leverage full overhead height up to 16 meters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left: Quick Footprint Estimator Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                  <Calculator className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text)]">
                  Quick Footprint Estimator
                </h3>
              </div>

              {/* Slider for Current Floor Area */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-semibold text-[var(--text-secondary)]">
                    Current Shelving Footprint
                  </label>
                  <span className="font-mono text-xl font-bold text-[var(--text)] tabular-nums">
                    {floorArea.toLocaleString()} <span className="text-xs font-normal text-[var(--text-muted)]">sq ft</span>
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={20000}
                  step={250}
                  value={floorArea}
                  onChange={e => setFloorArea(Number(e.target.value))}
                  aria-label="Current warehouse shelving footprint"
                  className="w-full h-2 rounded-lg bg-[var(--bg-muted)] accent-[var(--accent)] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-[var(--text-muted)]">
                  <span>500 sq ft</span>
                  <span>10,000 sq ft</span>
                  <span>20,000 sq ft</span>
                </div>
              </div>

              {/* Output Numbers */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                  <div className="font-mono text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {reclaimedArea.toLocaleString()}
                  </div>
                  <div className="text-xs font-semibold text-[var(--text)] mt-1">Sq Ft Reclaimed (85%)</div>
                  <div className="text-[10px] text-[var(--text-muted)]">Repurposed for production</div>
                </div>

                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                  <div className="font-mono text-2xl font-extrabold text-[var(--text)] tabular-nums">
                    {remainingArea.toLocaleString()}
                  </div>
                  <div className="text-xs font-semibold text-[var(--text)] mt-1">New ASRS Footprint</div>
                  <div className="text-[10px] text-[var(--text-muted)]">Compact vertical tower</div>
                </div>
              </div>

              {/* Estimated Floor Cost Value */}
              <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-[var(--text-secondary)] font-medium">Estimated Annual Real Estate Value:</span>
                </div>
                <span className="font-mono font-bold text-[var(--text)]">
                  ₹{(annualSavingsINR / 100000).toFixed(1)}L / yr
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)]">
              <Link
                href={`/tools/calculator?area=${floorArea}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-semibold transition-colors shadow-xs"
              >
                <span>Run Full ROI Model</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: FloorSpaceSlider interactive before/after */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <FloorSpaceSlider initialPosition={52} />
          </div>

        </div>

      </div>
    </section>
  )
}
