'use client'

import Link from 'next/link'
import { Cpu, ArrowRight, Play, Layers } from 'lucide-react'
import { Confirm } from '@/components/confirm/Confirm'

export function SimulatorTeaser() {
  return (
    <section className="py-20 bg-zinc-950 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[150px] pointer-events-none rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" />
                <span>Interactive Product Experience</span>
              </div>

              <h2 className="font-mono text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
                Simulate STOLIFT Carousel Operations Live in 3D
              </h2>

              <p className="font-sans text-zinc-400 text-base sm:text-lg leading-relaxed">
                Watch automated tray selection, goods-to-person delivery, and sensor monitoring in real-time right in your web browser — no app installation required.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-2 bg-zinc-900/90 px-3 py-2 rounded-lg border border-zinc-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Real-time Tray Retrieval Cycles</span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-900/90 px-3 py-2 rounded-lg border border-zinc-800">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>WebGL / 2D Canvas Fallback</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/tools/simulator"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all group"
                >
                  <Play className="w-4 h-4 fill-zinc-950 text-zinc-950" />
                  <span>Launch 3D ASRS Simulator</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Visual Preview Screen */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4 shadow-2xl relative overflow-hidden group">
                <div className="h-56 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                  
                  {/* Decorative Simulator Grid */}
                  <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

                  <div className="w-28 h-40 border-2 border-emerald-500/80 rounded bg-zinc-950 flex flex-col justify-between p-2 shadow-xl shadow-emerald-500/10">
                    <div className="text-[8px] font-mono text-emerald-400 text-center font-bold">STOLIFT SIM 1.0</div>
                    <div className="w-full h-4 bg-emerald-500/20 rounded border border-emerald-500/50 flex items-center justify-center text-[7px] font-mono text-emerald-300">
                      TRAY #14 MOVING
                    </div>
                    <div className="w-full h-4 bg-amber-500 text-zinc-950 font-mono text-[8px] font-extrabold rounded flex items-center justify-center">
                      PICK BAY
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-4 py-2 rounded-lg bg-emerald-500 text-zinc-950 font-mono text-xs font-bold shadow-lg">
                      Click to Launch Demo
                    </span>
                  </div>

                </div>

                <div className="mt-2 text-right">
                  <Confirm id="SIMULATOR_GLB_MODEL" label="3D CAD Mesh (.glb)" compact />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
