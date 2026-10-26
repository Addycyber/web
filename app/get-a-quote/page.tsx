import { Suspense } from 'react'
import { constructMetadata } from '@/lib/metadata'
import { QuoteForm } from '@/components/quote/QuoteForm'
import { Phone, Mail } from 'lucide-react'
import { company } from '@/lib/company'

export const metadata = constructMetadata({
  title: `Request a Quote — ${company.name}`,
  description:
    `Send a quote request to ${company.name}.`,
  path: '/get-a-quote',
})

export default function GetQuotePage() {
  return (
    <div className="py-12 md:py-16 bg-[var(--bg)] min-h-screen text-[var(--text)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider">
            <span>Product and project enquiries</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text)]">
            Request an Engineering Layout &amp; Quote
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-body leading-relaxed">
            Share your storage requirements and contact details using the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Form */}
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="text-center font-mono text-xs text-[var(--text-muted)] py-12">Loading Quote Form...</div>}>
              <QuoteForm />
            </Suspense>
          </div>

          {/* Direct Contact */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border)] space-y-3 shadow-xs">
              <h3 className="font-mono text-xs font-bold text-[var(--text)] uppercase tracking-wider">
                Direct Engineering Desk
              </h3>

              <div className="space-y-2 text-xs font-mono text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[var(--accent)]" />
                  <span>{company.phones.join(' / ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[var(--accent)]" />
                  <span>{company.emails.join(' / ')}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
