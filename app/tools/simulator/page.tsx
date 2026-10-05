import { constructMetadata } from '@/lib/metadata'
import { SimulatorCanvas } from '@/components/simulator/SimulatorCanvas'

export const metadata = constructMetadata({
  title: 'Live 3D ASRS Simulator — Space Magnum',
  description:
    'Experience interactive STOLIFT Vertical Lift Module tray storage, retrieval cycles, and sensor monitoring live in your web browser.',
  path: '/tools/simulator',
})

export default function SimulatorPage() {
  return (
    <div className="py-16 bg-zinc-950 min-h-screen text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
            <span>Interactive Web Experience</span>
          </div>
          <h1 className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tight">
            Live STOLIFT ASRS Simulator
          </h1>
          <p className="font-sans text-zinc-400 text-base sm:text-lg">
            Simulate automated tray storage and retrieval operations live in real-time. Toggle safety sensors, adjust pick cycle speed, and inspect live operational telemetry.
          </p>
        </div>

        {/* Simulator Component */}
        <SimulatorCanvas />

      </div>
    </div>
  )
}
