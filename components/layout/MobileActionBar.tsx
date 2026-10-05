'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/config/site'
import { Phone, MessageSquare, ArrowRight } from 'lucide-react'

export function MobileActionBar() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(SITE_CONFIG.whatsappDefaultMessage)}`

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800 p-2.5 px-4 shadow-2xl shadow-black">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        
        {/* Direct Call */}
        <a
          href={`tel:${SITE_CONFIG.phonePrimary}`}
          className="flex flex-col items-center justify-center py-2 px-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-orange-400 mb-0.5" />
          <span className="text-[10px] font-mono uppercase font-semibold">Call Sales</span>
        </a>

        {/* WhatsApp Chat */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-2 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 active:scale-95 transition-transform"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span className="text-[10px] font-mono uppercase font-semibold">WhatsApp</span>
        </a>

        {/* Get Quote */}
        <Link
          href="/get-a-quote"
          className="flex flex-col items-center justify-center py-2 px-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-bold active:scale-95 transition-transform shadow-lg shadow-orange-500/20"
        >
          <ArrowRight className="w-4 h-4 text-zinc-950 mb-0.5" />
          <span className="text-[10px] font-mono uppercase font-black">Get Quote</span>
        </Link>

      </div>
    </div>
  )
}
