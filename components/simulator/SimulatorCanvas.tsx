'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Confirm } from '@/components/confirm/Confirm'
import { Play, Pause, RefreshCw, Cpu, Layers, Eye, EyeOff, Gauge } from 'lucide-react'

export function SimulatorCanvas() {
  const [mode, setMode] = useState<'store' | 'retrieve' | 'idle'>('idle')
  const [speed, setSpeed] = useState<number>(1)
  const [showSensors, setShowSensors] = useState<boolean>(true)
  const [activeTray, setActiveTray] = useState<number>(7)
  const [cycleTime, setCycleTime] = useState<number>(14.2) // seconds

  useEffect(() => {
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
      
      {/* Simulation Render Area (Interactive 2D Canvas / WebGL Visualizer) */}
      <div className="lg:col-span-8 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden space-y-4 shadow-2xl">
        
        {/* Top Control Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-zinc-200 font-bold uppercase">STOLIFT VLM SIMULATOR 1.0</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSensors(!showSensors)}
              className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                showSensors
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400'
              }`}
            >
              {showSensors ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{showSensors ? 'Sensors ON' : 'Sensors OFF'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Animated Machine Screen */}
        <div className="h-96 rounded-xl bg-zinc-900 border border-zinc-800/80 relative overflow-hidden flex items-center justify-center p-6">
          
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

          {/* VLM Machine Column Graphic */}
          <div className="w-56 h-80 border-2 border-emerald-500/60 bg-zinc-950 rounded-xl relative flex flex-col justify-between p-3 shadow-2xl shadow-emerald-500/10">
            
            {/* Top Elevator Motor / Sensor readout */}
            <div className="flex justify-between items-center text-[9px] font-mono text-emerald-400 border-b border-zinc-800 pb-1">
              <span>ELEVATOR: RUNNING</span>
              <span> tray #{activeTray}</span>
            </div>

            {/* Vertical Tray Racks */}
            <div className="space-y-1.5 my-auto">
              {[15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((trayId) => {
                const isActive = activeTray === trayId
                return (
                  <div
                    key={trayId}
                    className={`w-full h-3 rounded transition-all duration-300 flex items-center justify-between px-2 text-[8px] font-mono ${
                      isActive
                        ? 'bg-amber-500 text-zinc-950 font-extrabold shadow-lg scale-105'
                        : 'bg-zinc-800/80 text-zinc-500 border border-zinc-700/40'
                    }`}
                  >
                    <span>Tray {trayId}</span>
                    {isActive && <span>ACTIVE</span>}
                  </div>
                )
              })}
            </div>

            {/* Bottom Ergonomic Access Bay */}
            <div className="w-full h-10 bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 rounded-lg flex items-center justify-between px-3 font-mono text-xs font-black shadow-lg">
              <span>DELIVERY BAY</span>
              <span className="text-[10px] bg-zinc-950 text-orange-400 px-2 py-0.5 rounded">READY</span>
            </div>

            {/* Sensor Overlays */}
            {showSensors && (
              <div className="absolute inset-x-2 top-10 bottom-16 border border-dashed border-emerald-500/40 pointer-events-none rounded flex flex-col justify-between p-1">
                <span className="text-[7px] font-mono text-emerald-400 bg-zinc-950/90 px-1 rounded w-max">
                  Light Curtain Active
                </span>
                <span className="text-[7px] font-mono text-emerald-400 bg-zinc-950/90 px-1 rounded w-max self-end">
                  Height Matrix Sensor OK
                </span>
              </div>
            )}

          </div>

          {/* Permanent Disclaimer */}
          <div className="absolute bottom-3 left-4 right-4 text-center">
            <span className="text-[10px] font-mono text-zinc-500 bg-zinc-950/90 px-3 py-1 rounded border border-zinc-800">
              Illustrative Simulation • STOLIFT VLM Standard Model
            </span>
          </div>

        </div>

        {/* Confirmation Indicator */}
        <div className="flex justify-between items-center text-xs font-mono text-zinc-500">
          <span>Engineered by Space Magnum R&D (Pune)</span>
          <Confirm id="SIMULATOR_GLB_3D_ASSET" label="3D WebGL Model (.glb)" compact />
        </div>

      </div>

      {/* Control Panel Column */}
      <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-6">
        
        <h3 className="font-mono text-lg font-bold text-zinc-100 flex items-center gap-2">
          <Gauge className="w-5 h-5 text-orange-500" />
          Simulator Controls
        </h3>

        {/* Operation Mode */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase text-zinc-400 font-bold block">
            Operation State:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setMode(mode === 'retrieve' ? 'idle' : 'retrieve')}
              className={`py-3 px-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                mode === 'retrieve'
                  ? 'bg-emerald-500 text-zinc-950 shadow-lg'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-300 hover:border-zinc-700'
              }`}
            >
              {mode === 'retrieve' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>Retrieve Tray</span>
            </button>

            <button
              onClick={() => setMode(mode === 'store' ? 'idle' : 'store')}
              className={`py-3 px-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                mode === 'store'
                  ? 'bg-amber-500 text-zinc-950 shadow-lg'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-300 hover:border-zinc-700'
              }`}
            >
              {mode === 'store' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>Store Tray</span>
            </button>
          </div>
        </div>

        {/* Speed Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-zinc-400">
            <span>Cycle Speed:</span>
            <span className="text-orange-400 font-bold">{speed}x Speed</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>

        {/* Real-Time Operational Readout Table */}
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 font-mono text-xs">
          <div className="text-orange-400 font-bold border-b border-zinc-800 pb-1">
            LIVE OPERATIONAL TELEMETRY
          </div>
          
          <div className="flex justify-between text-zinc-300">
            <span>Status:</span>
            <span className="text-emerald-400 font-bold uppercase">{mode}</span>
          </div>

          <div className="flex justify-between text-zinc-300">
            <span>Active Tray ID:</span>
            <span className="text-zinc-100 font-bold">#00{activeTray}</span>
          </div>

          <div className="flex justify-between text-zinc-300">
            <span>Pick Cycle Time:</span>
            <span className="text-amber-400 font-bold">{cycleTime}s</span>
          </div>

          <div className="flex justify-between text-zinc-300">
            <span>Accuracy:</span>
            <span className="text-emerald-400 font-bold">100% Verified</span>
          </div>
        </div>

        {/* Quote CTA */}
        <div className="pt-2">
          <Link
            href="/get-a-quote"
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Request STOLIFT Custom Specification</span>
          </Link>
        </div>

      </div>

    </div>
  )
}
