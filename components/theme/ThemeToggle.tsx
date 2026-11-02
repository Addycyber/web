'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

const subscribeToMount = () => () => {}
const getClientMounted = () => true
const getServerMounted = () => false

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    subscribeToMount,
    getClientMounted,
    getServerMounted,
  )

  if (!mounted) {
    // Render placeholder with same dimensions to avoid layout shift
    return (
      <div 
        className={`w-9 h-9 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] opacity-60 ${className}`} 
        aria-hidden="true" 
      />
    )
  }

  const isDark = theme === 'dark'
  const nextTheme = isDark ? 'light' : 'dark'
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={label}
      title={label}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-muted)] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] focus-visible:outline-offset-2 shrink-0 ${className}`}
    >
      <span className="sr-only">{label}</span>
      {/* Sun icon for light mode transition */}
      <Sun
        strokeWidth={1.75}
        className={`w-[18px] h-[18px] transition-all duration-150 motion-reduce:transition-none ${
          isDark
            ? 'rotate-90 scale-0 opacity-0 absolute'
            : 'rotate-0 scale-100 opacity-100'
        }`}
        aria-hidden="true"
      />
      {/* Moon icon for dark mode transition */}
      <Moon
        strokeWidth={1.75}
        className={`w-[18px] h-[18px] transition-all duration-150 motion-reduce:transition-none ${
          isDark
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0 absolute'
        }`}
        aria-hidden="true"
      />
    </button>
  )
}
