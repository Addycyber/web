import { constructMetadata } from '@/lib/metadata'
import { WhatWeSell } from '@/components/home/WhatWeSell'
import { Boxes } from 'lucide-react'

export const metadata = constructMetadata({
  title: 'Automated Storage Products — Space Magnum',
  description:
    'Explore Space Magnum storage and retrieval systems, mobile shelving, and racking products.',
  path: '/products',
})

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors">
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg-subtle)] py-14 md:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              <Boxes className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Engineering Product Range</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl">
              Automated Industrial Storage Systems
            </h1>
            <p className="font-body text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              Browse the product range using the descriptions and facts published in the company
              brochure. Every figure is brochure-stated; site layouts need an assessment.
            </p>
          </div>
        </div>
      </div>

      <WhatWeSell
        id="product-range"
        eyebrow="Six System Families"
        heading="What We Sell"
        subtitle="Each system solves a different storage problem — from small parts to long sections."
        showAllLink={false}
      />
    </div>
  )
}
