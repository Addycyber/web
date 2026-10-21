'use client'

import * as React from 'react'
import Link from 'next/link'
import { FileText, Download, CheckCircle2, Lock, ArrowRight, ShieldCheck } from 'lucide-react'

interface DownloadItem {
  id: string
  title: string
  description: string
  category: string
  fileType: 'PDF' | 'CAD'
  fileSize: string
  lastUpdated: string
  url: string
  isGated: boolean
}

const DOWNLOADS: DownloadItem[] = [
  {
    id: 'brochure-core',
    title: 'Space Magnum Storage Systems Comprehensive Brochure',
    description: 'Overview of automated vertical storage carousels, STOMAT modular units, and industrial compaction systems.',
    category: 'Corporate Overview',
    fileType: 'PDF',
    fileSize: '251 KB',
    lastUpdated: 'Q3 2024',
    url: '/downloads/Space-Magnum-Storage-Systems-Brochure.pdf',
    isGated: false,
  },
  {
    id: 'spec-sheet-technical',
    title: 'Automated Document & Material Storage System Engineering Spec',
    description: 'Detailed mechanical tolerances, floor loading calculations, and drive motor specifications.',
    category: 'Technical Specifications',
    fileType: 'PDF',
    fileSize: '294 KB',
    lastUpdated: 'Q3 2024',
    url: '/downloads/Space-Magnum-Technical-Specs.pdf',
    isGated: true,
  },
  {
    id: 'stomat-vlm-guide',
    title: 'STOMAT Vertical Lift Module Planning & Site Prep Guide',
    description: 'Clearance requirements, electrical feed parameters, and floor flatness requirements for VLM installations.',
    category: 'Installation Guide',
    fileType: 'PDF',
    fileSize: '1.2 MB [CONFIRM]',
    lastUpdated: '2024',
    url: '/downloads/Space-Magnum-Storage-Systems-Brochure.pdf',
    isGated: true,
  },
]

export default function DownloadsCentrePage() {
  const [activeGateItem, setActiveGateItem] = React.useState<DownloadItem | null>(null)
  const [email, setEmail] = React.useState('')
  const [company, setCompany] = React.useState('')
  const [unlockedIds, setUnlockedIds] = React.useState<string[]>([])
  const [hasSubmitted, setHasSubmitted] = React.useState(false)

  const handleDownloadClick = (item: DownloadItem) => {
    if (!item.isGated || unlockedIds.includes(item.id)) {
      window.open(item.url, '_blank')
    } else {
      setActiveGateItem(item)
      setHasSubmitted(false)
    }
  }

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !activeGateItem) return
    setUnlockedIds(prev => [...prev, activeGateItem.id])
    setHasSubmitted(true)
    setTimeout(() => {
      window.open(activeGateItem.url, '_blank')
      setActiveGateItem(null)
    }, 1200)
  }

  return (
    <div className="min-h-screen py-12 md:py-16 bg-[var(--bg)] text-[var(--text)] transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Technical Resources</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mb-3">
            Downloads Centre
          </h1>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            Access official brochures, architectural planning guides, and certified technical specifications for Space Magnum ASRS equipment.
          </p>
        </div>

        {/* Downloads Listing */}
        <div className="space-y-4">
          {DOWNLOADS.map(item => {
            const isUnlocked = !item.isGated || unlockedIds.includes(item.id)

            return (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] hover:border-[var(--border-strong)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[var(--bg-muted)] text-[var(--text-muted)] font-mono text-[11px] font-semibold uppercase">
                      {item.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-[11px] font-bold">
                      {item.fileType} • {item.fileSize}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">
                      Updated {item.lastUpdated}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-[var(--text)]">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-center">
                  <button
                    type="button"
                    onClick={() => handleDownloadClick(item)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      isUnlocked
                        ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] shadow-sm'
                        : 'border border-[var(--border-strong)] bg-[var(--bg)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-[var(--accent)]" />
                        <span>Request Access</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Lead Gate Modal */}
        {activeGateItem && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="gate-modal-title"
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md rounded-2xl bg-[var(--bg)] border border-[var(--border)] p-6 shadow-2xl space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs uppercase font-bold text-[var(--accent)]">
                    Instant Download
                  </span>
                  <h3 id="gate-modal-title" className="text-lg font-bold text-[var(--text)] mt-1">
                    {activeGateItem.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveGateItem(null)}
                  className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  ✕
                </button>
              </div>

              {hasSubmitted ? (
                <div className="py-6 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <p className="font-bold text-sm text-[var(--text)]">Document Unlocked!</p>
                  <p className="text-xs text-[var(--text-muted)] font-mono">Opening your technical document...</p>
                </div>
              ) : (
                <form onSubmit={handleGateSubmit} className="space-y-4 pt-2">
                  <p className="text-xs text-[var(--text-secondary)]">
                    Enter your professional details below to immediately view and download this engineering specification.
                  </p>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--text)]">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="engineer@company.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-strong)] bg-[var(--bg-subtle)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--text)]">Company Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tata Motors, Cipla, BDL"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-strong)] bg-[var(--bg-subtle)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-semibold shadow-sm transition-colors"
                  >
                    Download Now
                  </button>

                  <p className="text-[11px] text-[var(--text-muted)] text-center">
                    Your details are held strictly confidential under Space Magnum Privacy Policy.
                  </p>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
