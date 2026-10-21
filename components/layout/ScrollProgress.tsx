'use client'

import * as React from 'react'
import { ArrowUp } from 'lucide-react'

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = React.useState(0)
  const [showBackToTop, setShowBackToTop] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const progress = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0
      setScrollProgress(progress)
      setShowBackToTop(totalScroll > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Top Hairline Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-transparent z-[60] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[var(--accent)] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top of page"
          title="Back to top"
          className="fixed bottom-20 lg:bottom-6 left-4 sm:left-6 z-40 w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md text-[var(--text)] shadow-lg hover:border-[var(--accent)] hover:text-[var(--accent)] hover:scale-105 transition-all flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
        >
          <ArrowUp className="w-4 h-4" strokeWidth={2} />
        </button>
      )}
    </>
  )
}
