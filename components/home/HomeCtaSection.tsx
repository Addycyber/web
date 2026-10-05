'use client'

import Link from 'next/link'
import { ArrowRight, Phone, MessageSquare, Clock } from 'lucide-react'
import { SITE_CONFIG } from '@/config/site'
import { Confirm } from '@/components/confirm/Confirm'

export function HomeCtaSection() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(SITE_CONFIG.whatsappDefaultMessage)}`

  return (
    <section className="py-24 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-orange-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs font-bold uppercase tracking-wider">
          <Clock className="w-4 h-4 text-orange-400" />
          <span>Rapid Turnaround Engineering Team</span>
        </div>

        <h2 className="font-mono text-3xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight max-w-3xl mx-auto leading-tight">
          Ready to Reclaim Up to 85% of Your Warehouse Floor?
        </h2>

        <p className="font-sans text-zinc-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Speak with our Pune-based ASRS application engineers today. Receive a custom layout design, volumetric analysis, and ROI calculation.
        </p>

        {/* Response Guarantee Badge */}
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono">
          <span className="text-emerald-400 font-bold">Guaranteed Response Promise:</span>
          <span>Within</span>
          <Confirm id="RESPONSE_TIME_HOURS" label="24 Hours" compact />
          <span>on business days</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/get-a-quote"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-zinc-950 font-extrabold text-base shadow-2xl shadow-orange-500/30 transition-all flex items-center justify-center gap-3 group"
          >
            <span>Request Detailed Engineering Quote</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-emerald-950/80 border border-emerald-800/80 hover:bg-emerald-900 text-emerald-300 font-bold text-base transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Direct Phone Numbers */}
        <div className="pt-6 text-xs font-mono text-zinc-400 flex items-center justify-center gap-4">
          <Phone className="w-4 h-4 text-orange-500" />
          <span>Call Direct: {SITE_CONFIG.phonePrimary} / {SITE_CONFIG.phoneSecondary}</span>
        </div>

      </div>
    </section>
  )
}
