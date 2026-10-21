'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowRight, Phone, Clock } from 'lucide-react'
import { SiWhatsapp } from '@icons-pack/react-simple-icons'
import { SITE_CONFIG } from '@/config/site'

export function HomeCtaSection() {
  const cleanWhatsappNumber = SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappDefaultMessage
  )}`

  return (
    <section className="py-20 md:py-28 bg-[#0B2A4A] dark:bg-[#070D18] text-white relative overflow-hidden transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider mx-auto border border-white/20">
          <Clock className="w-3.5 h-3.5 text-[#FF8A4C]" />
          <span>Rapid Turnaround Engineering Team</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
          Ready to Reclaim <span className="text-[#FF8A4C]">Up to 85%</span> of Your Warehouse?
        </h2>

        <p className="text-base sm:text-xl text-[#C9D7E8] max-w-2xl mx-auto leading-relaxed font-body">
          Speak with our Pune-based ASRS application engineers. Receive a custom volumetric analysis, architectural layout design, and verified space-reclamation proposal.
        </p>

        {/* Response Guarantee Chip */}
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-[#E1ECF7] font-mono">
          <span className="text-emerald-400 font-bold">Guaranteed Response:</span>
          <span>Within 24 business hours</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/get-a-quote"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold text-base shadow-lg transition-colors flex items-center justify-center gap-2 group"
          >
            <span>Request Detailed Engineering Quote</span>
            <ArrowRight className="w-5 h-5 transition-transform motion-safe:group-hover:translate-x-1" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-base transition-colors flex items-center justify-center gap-2.5"
          >
            <SiWhatsapp size={20} className="text-[#25D366]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Phone Numbers */}
        <div className="pt-2 text-xs font-mono text-[#A2B9D4] flex items-center justify-center gap-2">
          <Phone className="w-4 h-4 text-[#FF8A4C]" />
          <span>Call Pune Office: {SITE_CONFIG.phonePrimary} / {SITE_CONFIG.phoneSecondary}</span>
        </div>

      </div>
    </section>
  )
}
