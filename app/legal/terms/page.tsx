import { constructMetadata } from '@/lib/metadata'
import { SITE_CONFIG } from '@/config/site'

export const metadata = constructMetadata({
  title: 'Terms of Business — Space Magnum Equipments',
  description: 'Terms and conditions governing the use of Space Magnum website, space reclaim calculator, and commercial proposals.',
  path: '/legal/terms',
})

export default function TermsPage() {
  return (
    <div className="py-16 bg-zinc-950 min-h-screen text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans text-sm text-zinc-300 leading-relaxed">
        <h1 className="font-mono text-3xl font-bold text-zinc-100">Terms of Business</h1>
        
        <h2 className="font-mono text-xl font-bold text-zinc-100 pt-4">1. Indicative Estimates Disclaimer</h2>
        <p>
          All volumetric figures, floor space reclaim percentages, and financial savings displayed on the Space Reclaim Calculator or website are indicative estimates. Final equipment layout drawings, tray load specifications, and prices are subject to physical site survey and formal commercial proposal from {SITE_CONFIG.legalName}.
        </p>

        <h2 className="font-mono text-xl font-bold text-zinc-100 pt-4">2. Intellectual Property</h2>
        <p>
          All product names (STOMAT, STOLIFT, STORDER), CAD diagrams, simulation software models, trademarks, and technical documentation are the property of {SITE_CONFIG.legalName}.
        </p>
      </div>
    </div>
  )
}
