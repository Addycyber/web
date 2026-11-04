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
    <div className="fixed bottom-[4.5rem] right-4 left-4 z-50 rounded-xl border border-[var(--border-strong)] bg-[var(--bg)]/95 p-3 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300 transition-colors lg:bottom-6 lg:left-auto lg:max-w-md lg:p-4">
      {/* Compact mobile bar */}
      <div className="flex items-center gap-2 sm:hidden">
        <ShieldAlert className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
        <p className="min-w-0 flex-1 text-[11px] leading-tight text-[var(--text-secondary)]">
          Essential cookies only.
        </p>
        <button
          type="button"
          onClick={handleAccept}
          className="flex items-center gap-1 rounded-md bg-[var(--accent)] px-2.5 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-[var(--accent-hover)]"
        >
          <Check className="h-3 w-3" aria-hidden="true" />
          Accept
        </button>
        <button
          type="button"
          onClick={handleDecline}
          aria-label="Decline cookies"
          className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      {/* Full notice on larger screens */}
      <div className="hidden items-start gap-3 sm:flex">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase font-bold text-[var(--text)] tracking-wider">
            Privacy &amp; Analytics Notice
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-body">
            We use essential cookies to measure site performance and deliver custom engineering
            quotes (compliant with India DPDP Act). No marketing tracking is sold to third parties.
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
