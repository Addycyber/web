'use client'

import Link from 'next/link'
import { ArrowRight, Phone, MessageSquare, Clock } from 'lucide-react'
import { SITE_CONFIG } from '@/config/site'

export function HomeCtaSection() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(SITE_CONFIG.whatsappDefaultMessage)}`

  return (
    <section className="py-28 bg-[#0A0D14] relative overflow-hidden">

      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-orange-500/6 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-10">

        <div className="pill-signal mx-auto w-fit">
          <Clock className="w-3 h-3" />
          <span>Rapid Turnaround Engineering Team</span>
        </div>

        <h2 className="font-heading text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight">
          Ready to Reclaim{' '}
          <span className="text-gradient-signal">Up to 85%</span>{' '}
          of Your Warehouse?
        </h2>

        <p className="font-body text-[#8A9BB5] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Speak with our Pune-based ASRS application engineers. Receive a custom layout design, volumetric analysis, and ROI calculation.
        </p>

        {/* Response Guarantee */}
        <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#151B25] border border-white/10 text-xs text-[#B0BECE] font-mono">
          <span className="text-emerald-400 font-bold">Guaranteed Response:</span>
          <span>Within 24 hours on business days</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/get-a-quote"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-zinc-950 font-extrabold text-base shadow-2xl shadow-orange-500/25 transition-all flex items-center justify-center gap-3 group"
          >
            <span>Request Detailed Engineering Quote</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#0D1F18] border border-emerald-800/60 hover:bg-emerald-950/80 hover:border-emerald-600/60 text-emerald-300 font-bold text-base transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Phone Numbers */}
        <div className="pt-4 text-xs font-mono text-[#6B7FA0] flex items-center justify-center gap-3">
          <Phone className="w-4 h-4 text-orange-500" />
          <span>Call: {SITE_CONFIG.phonePrimary} / {SITE_CONFIG.phoneSecondary}</span>
        </div>
      </div>
    </section>
  )
}
