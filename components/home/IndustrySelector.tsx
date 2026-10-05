'use client'

import { useState } from 'react'
import Link from 'next/link'
import { INDUSTRIES, IndustryId } from '@/config/industries'
import { ArrowRight, CheckCircle, Factory, ShieldAlert, Zap, Truck, Beaker } from 'lucide-react'

export function IndustrySelector() {
  const [selectedId, setSelectedId] = useState<IndustryId>('automotive')

  const currentIndustry = INDUSTRIES.find((i) => i.id === selectedId) || INDUSTRIES[0]

  return (
    <section className="py-24 bg-zinc-900/40 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs font-bold uppercase tracking-wider">
            <span>Tailored Industrial Storage</span>
          </div>
          <h2 className="font-mono text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Solutions Built for Your Sector
          </h2>
          <p className="font-sans text-zinc-400 text-base">
            From high-speed spare parts picking in Automotive to batch-controlled cleanroom storage in Pharma.
          </p>
        </div>

        {/* Industry Selector Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {INDUSTRIES.map((ind) => {
            const isActive = ind.id === selectedId
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedId(ind.id)}
                className={`px-5 py-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 shadow-lg shadow-orange-500/20 scale-105'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                }`}
              >
                <span>{ind.name}</span>
              </button>
            )
          })}
        </div>

        {/* Selected Industry Detail Card */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-orange-400 font-bold uppercase tracking-wider">
                  {currentIndustry.name} Solutions
                </span>
                <h3 className="font-mono text-2xl font-bold text-zinc-100">
                  {currentIndustry.headline}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {currentIndustry.description}
                </p>
              </div>

              {/* Pain Points Solved */}
              <div className="space-y-3 pt-2">
                <span className="font-mono text-xs text-zinc-300 font-bold uppercase block">
                  Key Challenges Solved:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                  {currentIndustry.painPoints.map((point, i) => (
                    <div key={i} className="flex items-center gap-2 bg-zinc-900 p-2.5 rounded-lg border border-zinc-800">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended System Card */}
            <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-4">
              <div className="text-xs font-mono uppercase text-zinc-400">
                Recommended ASRS Configuration
              </div>

              <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="text-base font-mono font-bold text-orange-400">
                  {currentIndustry.recommendedProduct}
                </div>
                <p className="text-xs text-zinc-400">
                  Optimized for high-density storage and rapid retrieval in {currentIndustry.name} facilities.
                </p>
              </div>

              <div className="text-xs font-mono text-zinc-400 space-y-1">
                <div className="flex justify-between">
                  <span>Space Reclaim Potential:</span>
                  <span className="text-emerald-400 font-bold">Up to 85%</span>
                </div>
                <div className="flex justify-between">
                  <span>Pick Accuracy:</span>
                  <span className="text-emerald-400 font-bold">99.9%</span>
                </div>
              </div>

              <Link
                href={`/industries/${currentIndustry.id}`}
                className="w-full py-3 px-4 rounded-lg bg-orange-500 hover:bg-orange-400 text-zinc-950 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Read Full {currentIndustry.name} Case Breakdown</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
