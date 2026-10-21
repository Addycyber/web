'use client'

import * as React from 'react'
import Link from 'next/link'
import { Confirm } from '@/components/confirm/Confirm'
import { Play, Pause, RefreshCw, Cpu, Layers, Eye, EyeOff, Gauge } from 'lucide-react'

export function SimulatorCanvas() {
  const [mode, setMode] = React.useState<'store' | 'retrieve' | 'idle'>('idle')
  const [speed, setSpeed] = React.useState<number>(1)
  const [showSensors, setShowSensors] = React.useState<boolean>(true)
  const [activeTray, setActiveTray] = React.useState<number>(7)
  const [cycleTime, setCycleTime] = React.useState<number>(14.2)

  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (mode !== 'idle') {
      interval = setInterval(() => {
        setActiveTray((prev) => (prev % 15) + 1)
        setCycleTime((prev) => Math.round((prev > 8 ? prev - 0.4 : 14.2) * 10) / 10)
      }, 1500 / speed)
    }
    return () => clearInterval(interval)
  }, [mode, speed])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Simulation Render Area (Interactive Visualizer) */}
      <div className="lg:col-span-8 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-2xl p-6 relative overflow-hidden space-y-4 shadow-sm">
        
        {/* Top Control Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border)] font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[var(--text)] font-bold uppercase">STOLIFT VLM SIMULATOR 1.0</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSensors(!showSensors)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors ${
                showSensors
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'bg-[var(--bg)] border-[var(--border)] text-[var(--text-muted)]'
              }`}
            >
              {showSensors ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{showSensors ? 'Sensors ON' : 'Sensors OFF'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Animated Machine Screen */}
        <div className="h-96 rounded-xl bg-[var(--bg)] border border-[var(--border)] relative overflow-hidden flex items-center justify-center p-6">
          
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 eng-grid pointer-events-none opacity-40" />

          {/* VLM Machine Column Graphic */}
          <div className="w-60 h-80 border-2 border-[var(--border-strong)] bg-[var(--bg-subtle)] rounded-xl relative flex flex-col justify-between p-3 shadow-md">
            
            {/* Top Elevator Motor / Sensor readout */}
            <div className="flex justify-between items-center text-[9px] font-mono text-[var(--accent)] border-b border-[var(--border)] pb-1">
              <span>ELEVATOR: {mode.toUpperCase()}</span>
              <span>tray #{activeTray}</span>
            </div>

            {/* Vertical Tray Racks */}
            <div className="space-y-1 my-auto">
              {[15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((trayId) => {
                const isActive = activeTray === trayId
                return (
                  <div
                    key={trayId}
                    className={`w-full h-3 rounded transition-all duration-300 flex items-center justify-between px-2 text-[8px] font-mono ${
                      isActive
                        ? 'bg-[var(--accent)] text-white font-extrabold shadow-sm scale-105'
                        : 'bg-[var(--bg-muted)] text-[var(--text-muted)] border border-[var(--border)]'
                    }`}
                  >
                    <span>T-{trayId.toString().padStart(2, '0')}</span>
                    {isActive && <span className="animate-pulse">EXTRACT</span>}
                  </div>
                )
              })}
            </div>

            {/* Bottom Ergonomic Access Window */}
            <div className="border-t border-[var(--border)] pt-2 relative">
              <div className="h-8 rounded bg-[var(--bg)] border border-[var(--accent)]/50 flex items-center justify-between px-3 text-[10px] font-mono font-bold text-[var(--text)]">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  ACCESS BAY
                </span>
                <span className="text-[var(--accent)]">READY</span>
              </div>

              {/* Photoelectric Safety Light Curtain Beam */}
              {showSensors && (
                <div className="absolute inset-x-2 bottom-4 h-0.5 bg-rose-500 animate-pulse opacity-75 shadow-xs" />
              )}
            </div>

          </div>

        </div>

        {/* Bottom Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMode(mode === 'retrieve' ? 'idle' : 'retrieve')}
              className={`px-4 py-2 rounded-lg font-mono text-xs font-bold flex items-center gap-2 transition-all ${
                mode === 'retrieve'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white'
              }`}
            >
              {mode === 'retrieve' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{mode === 'retrieve' ? 'Halt Cycle' : 'Simulate Retrieval Cycle'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTray(1)
                setMode('idle')
              }}
              className="p-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-[var(--text-muted)]">Speed:</span>
            {[1, 2, 4].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpeed(s)}
                className={`px-2 py-1 rounded text-[11px] font-bold ${
                  speed === s
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--bg)] text-[var(--text-muted)] border border-[var(--border)]'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Right Telemetry Column */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Real-time Telemetry Card */}
        <div className="p-6 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border)] space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <div className="font-mono text-xs uppercase font-bold text-[var(--text-muted)]">
              Sensor Telemetry
            </div>
            <div className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              ONLINE
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center py-1 border-b border-[var(--border)]/50">
              <span className="text-[var(--text-muted)]">Active Tray Position:</span>
              <span className="font-bold text-[var(--accent)]">Slot #{activeTray} (Z-Axis)</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-[var(--border)]/50">
              <span className="text-[var(--text-muted)]">Cycle Time:</span>
              <span className="font-bold text-[var(--text)]">{cycleTime}s (Goods-to-Person)</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-[var(--border)]/50">
              <span className="text-[var(--text-muted)]">Light Curtain:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">ARMED (Clear)</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-[var(--border)]/50">
              <span className="text-[var(--text-muted)]">Motor Drive:</span>
              <span className="font-bold text-[var(--text)]">{mode !== 'idle' ? 'VARIABLE 0.8 m/s' : 'STANDBY'}</span>
            </div>
          </div>
        </div>

        {/* 3D CAD Confirmation Box */}
        <div className="p-6 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border)] space-y-4 shadow-sm">
          <div className="font-mono text-xs font-bold uppercase text-[var(--text)]">
            Full 3D WebGL Model
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            A full three.js interactive low-poly digital twin model can be loaded with client-supplied 3D assets (.glb / .gltf).
          </p>
          <Confirm id="C-SIM-3D-ASSETS" label="3D CAD/GLB Model for STOLIFT / STOMAT" compact />
        </div>

        {/* Action Link */}
        <div className="pt-2">
          <Link
            href="/get-a-quote?system=stolift"
            className="w-full py-3 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-xs font-mono uppercase tracking-wide block text-center shadow-xs transition-colors"
          >
            Request Quotation for STOLIFT
          </Link>
        </div>

      </div>

    </div>
  )
}
