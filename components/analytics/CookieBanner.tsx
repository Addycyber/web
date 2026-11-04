'use client'

import * as React from 'react'
import { ShieldAlert, Check, X } from 'lucide-react'

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  window.addEventListener('sm_consent_updated', callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener('sm_consent_updated', callback)
  }
}

function getSnapshot(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem('sm_cookie_consent') : 'granted'
}

function getServerSnapshot(): string | null {
  return 'granted'
}

export function CookieBanner() {
  const consent = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const showBanner = consent === null

  const handleAccept = () => {
    localStorage.setItem('sm_cookie_consent', 'granted')
    window.dispatchEvent(new Event('sm_consent_updated'))
  }

  const handleDecline = () => {
    localStorage.setItem('sm_cookie_consent', 'denied')
    window.dispatchEvent(new Event('sm_consent_updated'))
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-24 lg:bottom-6 right-4 left-4 lg:left-auto lg:max-w-md z-50 bg-[var(--bg)]/95 border border-[var(--border-strong)] p-4 rounded-xl shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300 transition-colors">
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase font-bold text-[var(--text)] tracking-wider">
            Privacy &amp; Analytics Notice
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-body">
            We use essential cookies to measure site performance and deliver custom engineering quotes (compliant with India DPDP Act). No marketing tracking is sold to third parties.
          </p>
          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={handleAccept}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-md transition-colors shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              Accept
            </button>
            <button
              type="button"
              onClick={handleDecline}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text)] bg-[var(--bg-subtle)] border border-[var(--border)] rounded-md transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
