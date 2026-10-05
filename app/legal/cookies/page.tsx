import { constructMetadata } from '@/lib/metadata'
import { SITE_CONFIG } from '@/config/site'

export const metadata = constructMetadata({
  title: 'Cookie Policy — Space Magnum Equipments',
  description: 'Cookie policy and preferences management for Space Magnum Equipments Pvt. Ltd.',
  path: '/legal/cookies',
})

export default function CookiesPage() {
  return (
    <div className="py-16 bg-zinc-950 min-h-screen text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans text-sm text-zinc-300 leading-relaxed">
        <h1 className="font-mono text-3xl font-bold text-zinc-100">Cookie Policy</h1>
        
        <p>
          We use essential cookies to remember your consent preferences and ensure interactive calculators operate smoothly. Optional performance cookies (Google Analytics 4 & Microsoft Clarity) are injected only after explicit consent.
        </p>

        <h2 className="font-mono text-xl font-bold text-zinc-100 pt-4">Managing Preferences</h2>
        <p>
          You can clear your cookie consent at any time by clearing your browser's site data for <span className="font-mono text-orange-400">spacemagnum.com</span>.
        </p>
      </div>
    </div>
  )
}
