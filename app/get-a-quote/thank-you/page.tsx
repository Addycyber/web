'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, Phone, ArrowRight, ShieldCheck } from 'lucide-react'
import { SITE_CONFIG } from '@/config/site'

function ThankYouContent() {
  const searchParams = useSearchParams()
  const leadId = searchParams.get('leadId') || 'SM-PENDING'

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8 py-16">
      
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-3">
        <span className="font-mono text-xs text-orange-400 font-bold uppercase tracking-wider">
          Quote Reference ID: {leadId}
        </span>
        <h1 className="font-mono text-3xl sm:text-4xl font-extrabold text-zinc-100">
          Your Request Has Been Received
        </h1>
        <p className="font-sans text-zinc-400 text-base leading-relaxed">
          Our Pune application engineering team is reviewing your requirements. We will contact you within 24 business hours with an initial volumetric layout proposal.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-left space-y-3 font-mono text-xs">
        <div className="text-orange-400 font-bold">NEXT STEPS:</div>
        <div className="text-zinc-300">1. An engineer will call to verify floor dimensions and SKU characteristics.</div>
        <div className="text-zinc-300">2. CAD volumetric floor layout option drawing will be generated.</div>
        <div className="text-zinc-300">3. Proposal & budget quotation will be delivered to your email & WhatsApp.</div>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-zinc-950 font-mono text-xs font-bold"
        >
          Return to Home Page
        </Link>
        <Link
          href="/tools/simulator"
          className="px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-mono text-xs font-bold"
        >
          Explore Live 3D Simulator &rarr;
        </Link>
      </div>

    </div>
  )
}

export default function ThankYouPage() {
  return (
    <div className="py-16 bg-zinc-950 min-h-screen text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-center font-mono text-xs text-zinc-500 py-12">Loading confirmation...</div>}>
          <ThankYouContent />
        </Suspense>
      </div>
    </div>
  )
}
