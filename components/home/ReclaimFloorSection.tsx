'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, ArrowRight, CheckCircle2, TrendingUp, Maximize2 } from 'lucide-react'
import Link from 'next/link'

export function ReclaimFloorSection() {
  const [floorArea, setFloorArea] = useState<number>(3000) // sq ft
  const height = 9 // meters

  // Calculations: STOMAT reclaims ~85% floor space
  const reclaimedArea = Math.round(floorArea * 0.85)
  const remainingArea = floorArea - reclaimedArea
  const annualSavingsINR = Math.round(reclaimedArea * 75 * 12) // Assuming avg ₹75/sqft rent

  return (
    <section className="py-24 bg-zinc-900/60 border-b border-zinc-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs font-bold uppercase tracking-wider">
            <span>Vertical Space Optimization</span>
          </div>
          <h2 className="font-mono text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Stop Paying Rent for Empty Air Above Your Floor
          </h2>
          <p className="font-sans text-zinc-400 text-base sm:text-lg leading-relaxed">
            Conventional shelving wastes up to 80% of vertical building height on wide forklift aisles and unreachable top racks. STOMAT utilizes full ceiling height up to 15+ meters.
          </p>
        </div>

        {/* Interactive Interactive Space Reclaim Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 p-6 sm:p-8 rounded-2xl space-y-6 shadow-2xl">
            <h3 className="font-mono text-lg font-bold text-zinc-200 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-orange-500" />
              Quick Footprint Estimator
            </h3>

            {/* Slider 1: Floor Area */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="text-zinc-400 font-medium">Current Storage Area:</label>
                <span className="font-mono font-bold text-orange-400 text-base">{floorArea.toLocaleString()} sq.ft</span>
              </div>
              <input 
                type="range"
                min="500"
                max="20000"
                step="250"
                value={floorArea}
                onChange={(e) => setFloorArea(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                <span>500 sq.ft</span>
                <span>20,000 sq.ft</span>
              </div>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-900">
              <div className="bg-zinc-900/90 p-4 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-[11px] font-mono text-zinc-400 uppercase">Floor Space Reclaimed</span>
                <div className="font-mono text-2xl font-bold text-emerald-400">
                  {reclaimedArea.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">sq.ft</span>
                </div>
                <span className="text-[10px] text-emerald-500/90 font-mono">85% reduction</span>
              </div>

              <div className="bg-zinc-900/90 p-4 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-[11px] font-mono text-zinc-400 uppercase">New Footprint Needed</span>
                <div className="font-mono text-2xl font-bold text-orange-400">
                  {remainingArea.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">sq.ft</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">Vertical VLM bay</span>
              </div>
            </div>

            {/* Estimated Financial Savings */}
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-orange-400 font-bold block">Est. Rent Saved / Year</span>
                <span className="font-mono text-xl font-extrabold text-zinc-100">
                  ₹{(annualSavingsINR / 100000).toFixed(2)} Lakhs
                </span>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-400" />
            </div>

            <Link
              href="/tools/calculator"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 hover:from-orange-400 hover:to-amber-400 transition-all"
            >
              <span>Launch Full 8-Step Space Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Visual Comparison Graphic */}
          <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 p-6 sm:p-8 rounded-2xl relative overflow-hidden space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider font-bold">
                Comparison Visualizer
              </span>
              <span className="text-xs font-mono text-orange-400 font-semibold">
                Ceiling Height: {height}m
              </span>
            </div>

            {/* Floor Graphic Render */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Conventional Racking */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-red-400 font-semibold">Conventional Static Racking</span>
                  <span className="text-zinc-500">15% Volumetric Efficiency</span>
                </div>

                <div className="h-48 border border-red-500/20 rounded-lg p-2 bg-zinc-950 flex flex-col justify-between relative overflow-hidden">
                  <div className="grid grid-cols-3 gap-1.5 h-full opacity-60">
                    {[1, 2, 3, 4, 5, 6].map((idx) => (
                      <div key={idx} className="border border-zinc-700 bg-zinc-900 rounded p-1 flex flex-col justify-end">
                        <div className="w-full h-2 bg-red-500/30 rounded" />
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="text-xs font-mono text-zinc-300 bg-zinc-900/90 px-3 py-1 rounded border border-zinc-700">
                      Forklift Aisles Waste 70% Space
                    </span>
                  </div>
                </div>
              </div>

              {/* STOMAT VLM Solution */}
              <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold">STOMAT Vertical Module</span>
                  <span className="text-emerald-400 font-semibold">85% Volumetric Efficiency</span>
                </div>

                <div className="h-48 border border-emerald-500/30 rounded-lg p-2 bg-zinc-950 flex items-center justify-center relative">
                  <div className="w-24 h-40 border-2 border-orange-500 bg-zinc-900 rounded flex flex-col justify-between p-1 shadow-lg shadow-orange-500/20">
                    <div className="w-full h-1.5 bg-orange-500/80 rounded" />
                    <div className="space-y-1">
                      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <div key={i} className="w-full h-1 bg-zinc-800 rounded" />
                      ))}
                    </div>
                    <div className="w-full h-3 bg-amber-500 text-[8px] font-mono font-bold text-zinc-950 rounded flex items-center justify-center">
                      BAY
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300 pt-2 border-t border-zinc-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Goods-to-person delivery at ergonomic height</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dual tray delivery reduces pick cycle time</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dust-proof & secure inventory access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Integrated WMS / ERP connectivity</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
