import { constructMetadata } from '@/lib/metadata'
import { SITE_CONFIG } from '@/config/site'

export const metadata = constructMetadata({
  title: 'Terms of Business — Space Magnum Equipments',
  description: 'Terms and conditions governing the use of Space Magnum website, space reclaim calculator, and commercial proposals.',
  path: '/legal/terms',
})

export default function TermsPage() {
  return (
    <div className="py-12 md:py-16 bg-[var(--bg)] min-h-screen text-[var(--text)] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-body text-sm text-[var(--text-secondary)] leading-relaxed">
        <h1 className="text-3xl font-extrabold text-[var(--text)]">Terms of Business</h1>
        
        <h2 className="text-xl font-bold text-[var(--text)] pt-4">1. Indicative Estimates Disclaimer</h2>
        <p>
          All volumetric figures, floor space reclaim percentages, and financial savings displayed on the Space Reclaim Calculator or website are indicative estimates. Final equipment layout drawings, tray load specifications, and prices are subject to physical site survey and formal commercial proposal from {SITE_CONFIG.legalName}.
        </p>

        <h2 className="text-xl font-bold text-[var(--text)] pt-4">2. Intellectual Property</h2>
        <p>
          All product names (STOMAT, STOLIFT, STORDER), CAD diagrams, simulation software models, trademarks, and technical documentation are the property of {SITE_CONFIG.legalName}.
        </p>
      </div>
    </div>
  )
}
