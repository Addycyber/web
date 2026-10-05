'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calculator, Cpu, ShieldCheck, Layers, ChevronDown } from 'lucide-react'
import { Confirm } from '@/components/confirm/Confirm'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-zinc-950 pt-12 pb-20 border-b border-zinc-800/80">
      
      {/* Background Architectural Grid Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />
      
      {/* Subtle Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Positioning & Messaging */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-zinc-400 uppercase tracking-wide">Pune, India Engineering</span>
              <span className="text-zinc-600">•</span>
              <span className="font-medium text-orange-400">ISO 9001:2015</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="font-mono text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-100 leading-[1.08]">
                Reclaim <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">85% Floor Space</span> with Automated Vertical Storage
              </h1>
              <p className="font-sans text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed">
                Precision Indian engineering for heavy industrial storage. Transform high-cost factory floor space into vertical automated storage with STOMAT Vertical Lift Modules and STOLIFT Carousels.
              </p>
            </div>

            {/* Core CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/tools/calculator"
                className="group flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-zinc-950 font-bold text-base shadow-xl shadow-orange-500/20 hover:shadow-orange-500/35 transition-all active:scale-[0.98]"
              >
                <Calculator className="w-5 h-5 text-zinc-950" />
                <span>Calculate Your Space Reclaim</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/get-a-quote"
                className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-semibold text-base transition-colors"
              >
                <span>Request Custom Quote</span>
              </Link>
            </div>

            {/* Key Trust Signals Grid */}
            <div className="pt-6 border-t border-zinc-900 grid grid-cols-3 gap-4 text-xs font-mono text-zinc-400">
              <div className="space-y-1">
                <div className="text-zinc-200 font-bold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-orange-500" /> Up to 85%
                </div>
                <div className="text-[11px]">Floor Space Saved</div>
              </div>

              <div className="space-y-1">
                <div className="text-zinc-200 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> TÜV Certified
                </div>
                <div className="text-[11px]">Quality Management</div>
              </div>

              <div className="space-y-1">
                <div className="text-zinc-200 font-bold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-amber-500" /> 100% In-House
                </div>
                <div className="text-[11px]">Pune Manufacturing</div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Hero Visual Graphic / Blueprint Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 0.100 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl bg-zinc-900/90 border border-zinc-800/90 p-6 shadow-2xl overflow-hidden group">
              
              {/* Top Bar of Blueprint Box */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800/80 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-zinc-500 font-semibold">STOMAT VLM VISUALIZER</span>
                </div>
                <span className="text-orange-400 font-bold">MODE: VERTICAL 12M</span>
              </div>

              {/* Blueprint Graphic */}
              <div className="relative h-72 rounded-xl bg-zinc-950 border border-zinc-800/60 p-4 flex items-center justify-between overflow-hidden">
                
                {/* Traditional Racking Visual */}
                <div className="w-1/2 h-full border-r border-dashed border-zinc-800 pr-3 flex flex-col justify-between text-center">
                  <span className="text-[10px] font-mono text-red-400/90 uppercase tracking-wide">
                    Conventional Racking (Floor Wasted)
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2 h-44 my-auto">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="border border-red-500/20 bg-red-500/5 rounded flex items-center justify-center p-1 text-[9px] font-mono text-red-400/60">
                        Aisle {i}
                      </div>
                    ))}
                  </div>

                  <span className="text-[10px] font-mono text-zinc-500">Floor Footprint: 200 sq.m</span>
                </div>

                {/* STOMAT VLM Visual */}
                <div className="w-1/2 h-full pl-3 flex flex-col justify-between text-center bg-orange-500/5">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wide font-bold">
                    STOMAT VLM (Vertical Space)
                  </span>

                  <div className="w-20 h-44 mx-auto my-auto border-2 border-orange-500/60 rounded bg-zinc-900/90 relative overflow-hidden flex flex-col justify-between p-1">
                    <div className="w-full h-2 bg-orange-500/40 rounded animate-pulse" />
                    <div className="space-y-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="w-full h-2 bg-zinc-800 rounded border border-zinc-700/50" />
                      ))}
                    </div>
                    <div className="w-full h-3 bg-amber-500/60 rounded flex items-center justify-center text-[7px] font-mono font-bold text-zinc-950">
                      ACCESS BAY
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-emerald-400 font-bold">Floor Footprint: 30 sq.m (-85%)</span>
                </div>

              </div>

              {/* Teaser Footer */}
              <div className="mt-4 pt-3 flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-mono text-[11px]">Experience interactive simulation</span>
                <Link 
                  href="/tools/simulator"
                  className="text-orange-400 font-mono font-bold hover:underline flex items-center gap-1 text-[11px]"
                >
                  Launch Simulator &rarr;
                </Link>
              </div>

            </div>

            {/* Confirmation indicator */}
            <div className="mt-3 text-right">
              <Confirm id="CAD_BLUEPRINT_3D" label="3D Product Render Asset" compact />
            </div>

          </motion.div>

        </div>
      </div>

    </section>
  )
}
