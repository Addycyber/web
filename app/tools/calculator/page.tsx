import { Suspense } from 'react'
import { constructMetadata } from '@/lib/metadata'
import { CalculatorWizard } from '@/components/calculator/CalculatorWizard'

export const metadata = constructMetadata({
  title: 'Space Reclaim Calculator — ASRS Floor Space Optimizer',
  description:
    'Calculate how much warehouse floor space you can reclaim by switching from static racking to STOMAT or STOLIFT automated storage systems.',
  path: '/tools/calculator',
})

export default function CalculatorPage() {
  return (
    <div className="py-16 bg-zinc-950 min-h-screen text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs font-bold uppercase tracking-wider">
            <span>Interactive Space Calculator</span>
          </div>
          <h1 className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tight">
            Warehouse Space Reclaim Calculator
          </h1>
          <p className="font-sans text-zinc-400 text-base sm:text-lg">
            Complete the 8 quick steps below to calculate your facility's floor space reclaim potential, annual rent savings, and recommended ASRS system.
          </p>
        </div>

        {/* Wizard Container with Suspense */}
        <Suspense fallback={<div className="text-center font-mono text-xs text-zinc-500 py-12">Loading Space Calculator...</div>}>
          <CalculatorWizard />
        </Suspense>

      </div>
    </div>
  )
}
