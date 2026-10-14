'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function ReclaimFloorSection() {
  const [floorArea, setFloorArea] = useState<number>(3000)
  const height = 9

  const reclaimedArea = Math.round(floorArea * 0.85)
  const remainingArea = floorArea - reclaimedArea
  const annualSavingsINR = Math.round(reclaimedArea * 75 * 12)

  return (
    <section className="py-28 bg-[#0A0D14] border-b border-white/5 relative overflow-hidden">
      {/* Background image - full width behind content */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/products/asrs/asrs-2.jpg"
          alt="ASRS Vertical Storage System"
          fill
          className="object-cover opacity-[0.04]"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 mesh-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="pill-signal mx-auto w-fit">
            <span>Vertical Space Optimization</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Stop Paying Rent for{' '}
            <span className="text-gradient-signal">Empty Air</span>
          </h2>
          <p className="font-body text-[#8A9BB5] text-lg leading-relaxed">
            Conventional shelving wastes up to 80% of vertical building height. STOMAT utilizes full ceiling height up to 15+ meters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-5 card-dark p-6 sm:p-8 space-y-6 shadow-2xl shadow-black/50"
          >
            <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-orange-500" />
              Quick Footprint Estimator
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <label className="text-[#8A9BB5] font-body">Current Storage Area:</label>
                <span className="font-mono font-bold text-orange-400 text-base">{floorArea.toLocaleString()} sq.ft</span>
              </div>
              <input
                type="range"
                min="500"
                max="20000"
                step="250"
                value={floorArea}
                onChange={(e) => setFloorArea(Number(e.target.value))}
                className="w-full h-1.5 bg-[#243045] rounded-full appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-[11px] font-mono text-[#6B7FA0]">
                <span>500 sq.ft</span>
                <span>20,000 sq.ft</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#0F1319] p-4 rounded-xl border border-emerald-500/20 space-y-1">
                <span className="text-[10px] font-mono text-[#8A9BB5] uppercase tracking-wide">Space Reclaimed</span>
                <div className="font-heading text-2xl font-bold text-emerald-400">
                  {reclaimedArea.toLocaleString()}
                  <span className="text-xs text-[#8A9BB5] font-normal ml-1">sq.ft</span>
                </div>
                <span className="text-[10px] text-emerald-500 font-mono">↓ 85% reduction</span>
              </div>

              <div className="bg-[#0F1319] p-4 rounded-xl border border-orange-500/20 space-y-1">
                <span className="text-[10px] font-mono text-[#8A9BB5] uppercase tracking-wide">New Footprint</span>
                <div className="font-heading text-2xl font-bold text-orange-400">
                  {remainingArea.toLocaleString()}
                  <span className="text-xs text-[#8A9BB5] font-normal ml-1">sq.ft</span>
                </div>
                <span className="text-[10px] text-[#8A9BB5] font-mono">Vertical VLM bay</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-orange-400 font-medium block">Est. Rent Saved / Year</span>
                <span className="font-heading text-2xl font-extrabold text-white">
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
          </motion.div>

          {/* Right: Real ASRS Photo + Comparison */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            {/* ASRS Real Photo */}
            <div className="relative rounded-2xl overflow-hidden h-72 border border-white/8 shadow-2xl shadow-black/50">
              <Image
                src="/images/products/asrs/asrs-1.jpg"
                alt="STOMAT Vertical Automated Storage System"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="text-orange-400 font-mono text-xs font-medium uppercase tracking-widest mb-1">
                    STOMAT VLM
                  </div>
                  <div className="text-white font-heading font-bold text-lg">
                    Automated Vertical Storage
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-heading font-bold text-3xl">85%</div>
                  <div className="text-[#8A9BB5] font-mono text-xs">Space saved</div>
                </div>
              </div>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#151B25] border border-red-500/15 rounded-xl p-5 space-y-3">
                <div className="text-red-400 font-mono text-xs font-medium uppercase tracking-wide">
                  ✗ Conventional Racking
                </div>
                <div className="text-[#8A9BB5] text-sm space-y-1.5 font-body">
                  {['Forklift aisles waste 70% floor', 'Limited to 3-4m reach height', 'Manual picking — error prone', 'Inefficient cubic utilisation'].map((p, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <span className="text-red-500 mt-0.5 flex-shrink-0">—</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
                <div className="font-mono text-xs text-[#6B7FA0]">Ceiling: {height}m · Used: ~2m</div>
              </div>

              <div className="bg-[#0D1F18] border border-emerald-500/20 rounded-xl p-5 space-y-3">
                <div className="text-emerald-400 font-mono text-xs font-medium uppercase tracking-wide">
                  ✓ STOMAT VLM
                </div>
                <div className="text-[#B0BECE] text-sm space-y-1.5 font-body">
                  {['Full ceiling-height utilisation', 'Goods-to-person delivery', 'PLC-controlled — 99.9% accuracy', 'WMS / ERP integration ready'].map((p, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
                <div className="font-mono text-xs text-emerald-400 font-medium">Ceiling: {height}m · Used: {height}m ✓</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
