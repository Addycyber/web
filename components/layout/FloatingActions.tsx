'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { Phone } from 'lucide-react'
import { SiWhatsapp } from '@icons-pack/react-simple-icons'
import { SITE_CONFIG } from '@/config/site'

export function FloatingActions() {
  const pathname = usePathname()

  // Hide on quote and contact pages to keep checkout funnel distraction-free
  if (pathname === '/get-a-quote' || pathname === '/contact' || pathname.startsWith('/get-a-quote/')) {
    return null
  }

  const cleanWhatsappNumber = SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappDefaultMessage
  )}`

  return (
    <div 
      className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 flex flex-col gap-3 items-end"
      aria-label="Direct quick contact channels"
    >
      {/* Direct Phone Call Button */}
      <a
        href={`tel:${SITE_CONFIG.phonePrimary}`}
        title={`Call Space Magnum Sales (${SITE_CONFIG.phonePrimary})`}
        aria-label="Call sales office"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[var(--brand)] text-white shadow-xl hover:scale-105 transition-all duration-150 border-2 border-white/20 focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
      >
        <Phone className="w-5 h-5 text-white" strokeWidth={1.75} />
        {/* Tooltip on desktop */}
        <span className="hidden lg:block absolute right-14 px-3 py-1.5 rounded-lg bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] text-xs font-semibold whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Call: {SITE_CONFIG.phonePrimary}
        </span>
      </a>

      {/* WhatsApp Chat Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with an ASRS engineer on WhatsApp"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 transition-all duration-150 border-2 border-white/20 focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
      >
        <SiWhatsapp size={22} />
        {/* Tooltip on desktop */}
        <span className="hidden lg:block absolute right-14 px-3 py-1.5 rounded-lg bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] text-xs font-semibold whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          WhatsApp Sales
        </span>
      </a>
    </div>
  )
}
