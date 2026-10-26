'use client'

import * as React from 'react'
import Link from 'next/link'
import { SITE_CONFIG } from '@/config/site'
import { Phone, ArrowRight } from 'lucide-react'
import { SiWhatsapp } from '@icons-pack/react-simple-icons'

export function MobileActionBar() {
  const whatsappUrl = SITE_CONFIG.whatsappUrl

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[var(--bg)]/95 backdrop-blur-xl border-t border-[var(--border)] p-2 px-3 shadow-xl transition-colors">
      <div className={`mx-auto grid max-w-md gap-2 ${whatsappUrl ? 'grid-cols-3' : 'grid-cols-2'}`}>
        
        {/* Direct Call */}
        <a
          href={`tel:${SITE_CONFIG.phonePrimary}`}
          className="flex flex-col items-center justify-center py-2 px-2 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text)] active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 text-[var(--accent)] mb-0.5" strokeWidth={1.75} />
          <span className="text-[10px] font-mono uppercase font-semibold">Call Sales</span>
        </a>

        {/* WhatsApp Chat */}
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center rounded-lg border border-[#25D366]/30 bg-[#25D366]/10 px-2 py-2 font-semibold text-[#25D366] transition-all active:scale-95 dark:text-[#25D366]"
          >
            <SiWhatsapp size={16} className="mb-0.5" />
            <span className="text-[10px] font-mono uppercase font-semibold">WhatsApp</span>
          </a>
        )}

        {/* Get Quote */}
        <Link
          href="/get-a-quote"
          className="flex flex-col items-center justify-center py-2 px-2 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold active:scale-95 transition-all shadow-sm"
        >
          <ArrowRight className="w-4 h-4 text-white mb-0.5" strokeWidth={2} />
          <span className="text-[10px] font-mono uppercase font-bold tracking-tight">Get Quote</span>
        </Link>

      </div>
    </div>
  )
}
