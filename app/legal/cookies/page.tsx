import { constructMetadata } from '@/lib/metadata'

export const metadata = constructMetadata({
  title: 'Cookie Policy — Space Magnum Equipments',
  description: 'Cookie policy and preferences management for Space Magnum Equipments Pvt. Ltd.',
  path: '/legal/cookies',
})

export default function CookiesPage() {
  return (
    <div className="py-12 md:py-16 bg-[var(--bg)] min-h-screen text-[var(--text)] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-body text-sm text-[var(--text-secondary)] leading-relaxed">
        <h1 className="text-3xl font-extrabold text-[var(--text)]">Cookie Policy</h1>
        
        <p>
          We use essential cookies to remember your consent preferences and ensure interactive calculators operate smoothly. Optional performance cookies (Google Analytics 4 &amp; Microsoft Clarity) are injected only after explicit consent.
        </p>

        <h2 className="text-xl font-bold text-[var(--text)] pt-4">Managing Preferences</h2>
        <p>
          You can clear your cookie consent at any time by clearing your browser&apos;s site data for <span className="font-mono text-[var(--accent)]">spacemagnum.com</span>.
        </p>
      </div>
    </div>
  )
}
