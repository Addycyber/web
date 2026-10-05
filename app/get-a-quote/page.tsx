import { Suspense } from 'react'
import { constructMetadata } from '@/lib/metadata'
import { QuoteForm } from '@/components/quote/QuoteForm'
import { SITE_CONFIG } from '@/config/site'
import { Confirm } from '@/components/confirm/Confirm'
import { Phone, Mail, Clock, ShieldCheck, Award } from 'lucide-react'

export const metadata = constructMetadata({
  title: 'Get Engineering Quote — Space Magnum ASRS',
  description:
    'Request a custom automated storage layout, volumetric floor analysis, and price quotation from Space Magnum engineering team in Pune.',
  path: '/get-a-quote',
})

export default function GetQuotePage() {
  return (
    <div className="py-16 bg-zinc-950 min-h-screen text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Guaranteed Response Promise</span>
          </div>
          <h1 className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tight">
            Request an Engineering Layout & Quote
          </h1>
          <p className="font-sans text-zinc-400 text-base sm:text-lg">
            Our Pune ASRS application engineers analyze your floor layout, SKU density, and throughput needs to prepare a custom proposal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Form */}
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="text-center font-mono text-xs text-zinc-500 py-12">Loading Quote Form...</div>}>
              <QuoteForm />
            </Suspense>
          </div>

          {/* Sidebar Guarantee & Direct Contact */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <h3 className="font-mono text-sm font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Response Time Guarantee
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Every request submitted receives a preliminary technical assessment within business hours.
              </p>

              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300">
                <span>Standard Turnaround:</span>
                <div className="text-emerald-400 font-bold text-sm mt-0.5">Within 24 Hours</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <h3 className="font-mono text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Direct Engineering Desk
              </h3>

              <div className="space-y-2 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500" />
                  <span>{SITE_CONFIG.phonePrimary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-500" />
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
