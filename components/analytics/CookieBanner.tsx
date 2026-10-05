'use client'

import { useState, useEffect } from 'react'
import { ShieldAlert, Check, X } from 'lucide-react'

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('sm_cookie_consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('sm_cookie_consent', 'granted')
    setShowBanner(false)
    window.dispatchEvent(new Event('sm_consent_updated'))
  }

  const handleDecline = () => {
    localStorage.setItem('sm_cookie_consent', 'denied')
    setShowBanner(false)
    window.dispatchEvent(new Event('sm_consent_updated'))
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 left-4 lg:left-auto lg:max-w-md z-50 bg-zinc-900/95 border border-zinc-800 p-4 rounded-xl shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase font-bold text-zinc-200 tracking-wider">
            Privacy & Analytics Notice
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            We use essential cookies to measure site performance and deliver custom engineering quotes (compliant with India DPDP Act). No marketing tracking is sold to third parties.
          </p>
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-zinc-950 bg-orange-500 hover:bg-orange-400 rounded-md transition-colors shadow"
            >
              <Check className="w-3.5 h-3.5" />
              Accept
            </button>
            <button
              onClick={handleDecline}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-200 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
