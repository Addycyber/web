import { constructMetadata } from '@/lib/metadata'
import { SimulatorCanvas } from '@/components/simulator/SimulatorCanvas'
import { Play } from 'lucide-react'

export const metadata = constructMetadata({
  title: 'STOLIFT Simulator',
  description: 'Interactive visualization of STOLIFT tray storage and retrieval.',
  path: '/tools/simulator',
})

export default function SimulatorPage() {
  return (
    <div className="py-12 md:py-16 bg-[var(--bg)] min-h-screen text-[var(--text)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider">
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Interactive Web Experience</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text)]">
            STOLIFT Simulator
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-body leading-relaxed">
            Explore an interactive visualization of tray storage and retrieval.
          </p>
        </div>

        {/* Simulator Component */}
        <SimulatorCanvas />

      </div>
    </div>
  )
}
