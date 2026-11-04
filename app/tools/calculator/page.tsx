import { constructMetadata } from '@/lib/metadata'
import { AsrsAnatomyFigure } from '@/components/anatomy'
import { Calculator } from 'lucide-react'

export const metadata = constructMetadata({
  title: 'Brochure-Based Floor-Space Illustration',
  description:
    'Explore the floor-space saving stated in the Space Magnum brochure for STOMAT and STOLIFT.',
  path: '/tools/calculator',
})

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-12 text-[var(--text)] transition-colors md:py-16">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            <Calculator className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Brochure-Based Illustration</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-5xl">
            Floor-Space Saving Illustration
          </h1>
          <p className="font-body text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            Apply the brochure-stated floor-space saving to an area you enter. This does not
            estimate a site layout, cost, or payback.
          </p>
        </div>

        <AsrsAnatomyFigure mode="interactive" initialArea={1000} />
      </div>
    </div>
  )
}
