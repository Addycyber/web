import Link from 'next/link'
import Image from 'next/image'
import { constructMetadata } from '@/lib/metadata'
import { products } from '@/lib/company'
import { ArrowRight, Boxes, CheckCircle2 } from 'lucide-react'

export const metadata = constructMetadata({
  title: 'Automated Storage Products — Space Magnum',
  description:
    'Explore Space Magnum storage and retrieval systems, mobile shelving, and racking products.',
  path: '/products',
})

export default function ProductsPage() {
  return (
    <div className="bg-[var(--bg)] min-h-screen text-[var(--text)] transition-colors">

      {/* Page Hero */}
      <div className="relative py-14 md:py-20 border-b border-[var(--border)] bg-[var(--bg-subtle)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider">
              <Boxes className="w-3.5 h-3.5" />
              <span>Engineering Product Range</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text)]">
              Automated Industrial Storage Systems
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-body">
              Browse the product range using the descriptions and facts published in the company brochure.
            </p>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        {products.map((product, idx) => {
          const thumbnailPage = product.brochurePages[0]
          return (
          <div
            key={product.slug}
            className="group rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-all overflow-hidden shadow-sm hover:shadow-md"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

              {/* Photo */}
              <div className={`lg:col-span-5 relative h-64 lg:h-auto ${idx % 2 !== 0 ? 'lg:order-last' : ''} bg-[var(--bg-muted)] border-b lg:border-b-0 border-[var(--border)]`}>
                <Image
                  src={`/brochure/p${String(thumbnailPage).padStart(2, '0')}.webp`}
                  alt={`${product.name} – brochure page ${thumbnailPage}`}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>

              {/* Content */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
                        {product.type}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">
                        {product.name}
                      </h2>
                    </div>
                    {product.facts[0] && <div className="flex gap-2 shrink-0">
                      <span className="px-3 py-1 rounded-full bg-[var(--bg)] border border-[var(--border)] font-mono text-xs font-semibold text-[var(--text)]">
                        {product.facts[0]?.value ?? '—'}
                      </span>
                    </div>}
                  </div>

                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-body">
                    {product.summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.facts.slice(0, 2).map((fact) => (
                      <div key={fact.label} className="bg-[var(--bg)] rounded-xl p-3.5 border border-[var(--border)]">
                        <div className="text-[var(--accent)] font-mono font-bold text-lg">{fact.value}</div>
                        <div className="text-[11px] font-mono text-[var(--text-muted)] mt-0.5">{fact.label}</div>
                      </div>
                    ))}
                    <div className="bg-[var(--bg)] rounded-xl p-3.5 border border-[var(--border)] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <div className="text-xs font-medium text-[var(--text)] line-clamp-2">{product.summary}</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                  <Link
                    href={`/products/${product.slug}`}
                    className="py-2.5 px-5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <span>Full Specifications</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/get-a-quote?product=${product.slug}`}
                    className="py-2.5 px-4 rounded-lg bg-[var(--bg)] hover:bg-[var(--bg-muted)] border border-[var(--border-strong)] text-[var(--text)] font-semibold text-xs sm:text-sm transition-colors"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}
