'use client'

import * as React from 'react'
import Link from 'next/link'
import { Cpu, ArrowRight, Play, Layers } from 'lucide-react'

export function SimulatorTeaser() {
  return (
    <section className="py-20 md:py-24 bg-[var(--bg-subtle)] border-b border-[var(--border)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8 sm:p-12 shadow-sm">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" />
                <span>Interactive Product Experience</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight">
                Simulate STOLIFT Carousel Operations Live in 3D
              </h2>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-body">
                Watch automated tray selection, goods-to-person delivery, and sensor monitoring in real-time right in your web browser — no software installation required.
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-secondary)]">
                <div className="flex items-center gap-2 bg-[var(--bg-subtle)] px-3 py-2 rounded-lg border border-[var(--border)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Real-time Tray Retrieval Cycles</span>
                </div>
                <div className="flex items-center gap-2 bg-[var(--bg-subtle)] px-3 py-2 rounded-lg border border-[var(--border)]">
                  <Layers className="w-4 h-4 text-[var(--accent)]" />
                  <span>WebGL / 2D Canvas Fallback</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/tools/simulator"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-sm shadow-sm transition-colors group"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Launch 3D ASRS Simulator</span>
                  <ArrowRight className="w-4 h-4 transition-transform motion-safe:group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Visual Preview Frame */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center shadow-xs">
                  <Play className="w-8 h-8 ml-1 fill-current" />
                </div>
                <div>
                  <div className="font-mono text-sm font-bold text-[var(--text)] uppercase tracking-wider">
                    Browser-Based Simulation
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-1 max-w-xs">
                    Inspect elevator carriage kinematics, tray slot allocations, and cycle dispatch logic.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
