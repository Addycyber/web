import { Suspense } from 'react'
import { constructMetadata } from '@/lib/metadata'
import { QuoteForm } from '@/components/quote/QuoteForm'
import { SITE_CONFIG } from '@/config/site'
import { Phone, Mail, Clock, ShieldCheck } from 'lucide-react'

export const metadata = constructMetadata({
  title: 'Get Engineering Quote — Space Magnum ASRS',
  description:
    'Request a custom automated storage layout, volumetric floor analysis, and price quotation from Space Magnum engineering team in Pune.',
  path: '/get-a-quote',
})

export default function GetQuotePage() {
  return (
    <div className="py-12 md:py-16 bg-[var(--bg)] min-h-screen text-[var(--text)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Guaranteed Response Promise</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text)]">
            Request an Engineering Layout &amp; Quote
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-body leading-relaxed">
            Our Pune ASRS application engineers analyze your floor layout, SKU density, and throughput needs to prepare a custom proposal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Form */}
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="text-center font-mono text-xs text-[var(--text-muted)] py-12">Loading Quote Form...</div>}>
              <QuoteForm />
            </Suspense>
          </div>

          {/* Sidebar Guarantee & Direct Contact */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="p-6 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border)] space-y-4 shadow-xs">
              <h3 className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Response Time Guarantee
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-body">
                Every request submitted receives a preliminary technical assessment within business hours.
              </p>

              <div className="p-3.5 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-xs font-mono text-[var(--text)]">
                <span className="text-[var(--text-muted)]">Standard Turnaround:</span>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mt-0.5">Within 24 Hours</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border)] space-y-3 shadow-xs">
              <h3 className="font-mono text-xs font-bold text-[var(--text)] uppercase tracking-wider">
                Direct Engineering Desk
              </h3>

              <div className="space-y-2 text-xs font-mono text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[var(--accent)]" />
                  <span>{SITE_CONFIG.phonePrimary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[var(--accent)]" />
                  <span>{SITE_CONFIG.emailSales}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
