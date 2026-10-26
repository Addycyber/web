import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { constructMetadata } from '@/lib/metadata'
import { company, products } from '@/lib/company'
import { ProductDetail } from '@/components/products/ProductDetail'
import { SolutionsProductNav } from '@/components/solutions/SolutionsProductNav'

export const metadata = constructMetadata({
  title: 'Solutions',
  description: company.about,
  path: '/solutions',
})

export default function SolutionsPage() {
  return (
    <div className="bg-[var(--bg)] text-[var(--text)]">
      <header className="border-b border-[var(--border)] bg-[var(--bg-subtle)] py-14 md:py-20">
        <div className="mx-auto max-w-7xl space-y-5 px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            Total Store Management (TSM)
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Solutions we provide
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {company.about}
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8" aria-labelledby="product-solutions-heading">
        <div className="mb-8">
          <h2 id="product-solutions-heading" className="text-3xl font-extrabold">
            Product solutions in detail
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Product descriptions and specifications below follow the available company brochure data.
          </p>
        </div>
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
          <SolutionsProductNav products={products} />
          <div className="min-w-0 space-y-12">
            {products.map((product) => (
              <ProductDetail
                key={product.slug}
                id={`solution-${product.slug}`}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg-subtle)] py-14">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-extrabold">Discuss a storage requirement</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Contact {company.name} using the details listed in the brochure.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]"
            >
              Request a quote <ArrowRight size={16} aria-hidden="true" />
            </Link>
            {company.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone}`}
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm font-semibold"
              >
                <Phone size={16} aria-hidden="true" /> {phone}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
