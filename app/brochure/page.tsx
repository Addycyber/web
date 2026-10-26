import Link from 'next/link'
import { Download } from 'lucide-react'
import { constructMetadata } from '@/lib/metadata'
import { pageMap } from '@/lib/company'
import { BrochureViewer } from '@/components/brochure/BrochureViewer'

export const metadata = constructMetadata({
  title: 'Digital Brochure',
  description: 'Browse the available Space Magnum brochure pages.',
  path: '/brochure',
})

export default function BrochurePage() {
  const pages = pageMap.map((entry) => entry.page)

  return (
    <div className="min-h-screen bg-[var(--bg)] py-12 text-[var(--text)] transition-colors md:py-16">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col justify-between gap-6 border-b border-[var(--border)] pb-8 sm:flex-row sm:items-end">
          <div className="max-w-3xl space-y-3">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              Space Magnum
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Digital brochure</h1>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Browse the brochure snapshots available with the product data.
              The supplied catalogue contains {pages.length} pages.
            </p>
          </div>
          <Link
            href="/brochure/space-magnum-brochure.pdf"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]"
            download
          >
            <Download size={16} aria-hidden="true" />
            Download PDF
          </Link>
        </header>

        <nav className="space-y-3" aria-label="Brochure chapters">
          <h2 className="text-lg font-bold">Chapters</h2>
          <div className="flex flex-wrap gap-2">
            {pageMap.map(({ page, title }) => (
              <Link
                key={page}
                href={`#brochure-page-${page}`}
                className="rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {title}
              </Link>
            ))}
          </div>
        </nav>

        <BrochureViewer pages={pages} />
      </div>
    </div>
  )
}
