import { Suspense } from 'react'
import { constructMetadata } from '@/lib/metadata'
import { CalculatorWizard } from '@/components/calculator/CalculatorWizard'
import { Calculator } from 'lucide-react'

export const metadata = constructMetadata({
  title: 'Space Reclaim Calculator — ASRS Floor Space Optimizer',
  description:
    'Calculate how much warehouse floor space you can reclaim by switching from static racking to STOMAT or STOLIFT automated storage systems.',
  path: '/tools/calculator',
})

export default function CalculatorPage() {
  return (
    <div className="py-12 md:py-16 bg-[var(--bg)] min-h-screen text-[var(--text)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Space Calculator</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text)]">
            Warehouse Space Reclaim Calculator
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-body leading-relaxed">
            Complete the 8 quick steps below to calculate your facility&apos;s floor space reclaim potential, annual real estate value, and recommended ASRS architecture.
          </p>
        </div>

        {/* Wizard Container with Suspense */}
        <Suspense fallback={<div className="text-center font-mono text-xs text-[var(--text-muted)] py-12">Loading Space Calculator...</div>}>
          <CalculatorWizard />
        </Suspense>

      </div>
    </div>
  )
}
