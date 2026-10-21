'use client'

import * as React from 'react'
import Link from 'next/link'
import { AlertTriangle, RotateCcw } from 'lucide-react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    console.error('System error:', error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[var(--bg)] text-[var(--text)] transition-colors">
      <div className="max-w-md text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-rose-500/10 text-[var(--danger)] flex items-center justify-center mx-auto">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)]">
            Operational Exception
          </h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            An unexpected error occurred while rendering this view. Our engineering logs have been notified.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-all shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-subtle)] text-[var(--text)] text-sm font-semibold hover:border-[var(--text)] transition-all"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
