import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { products } from '@/lib/company'

export function IndustrySelector() {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--bg)] py-20 transition-colors md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            Brochure-listed applications
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl">
            Applications across the product range
          </h2>
          <p className="font-body text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            Applications below are taken from the company brochure.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.slug}
              className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6"
            >
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                  {product.type}
                </p>
                <h3 className="mt-1 text-xl font-bold text-[var(--text)]">{product.name}</h3>
              </div>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                {product.applications.map((application) => (
                  <li key={application} className="border-b border-[var(--border)] pb-2 last:border-0">
                    {application}
                  </li>
                ))}
              </ul>
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] hover:underline"
              >
                View {product.name} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
