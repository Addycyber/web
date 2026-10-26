'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { products } from '@/lib/company'
import { calculateBrochureSpaceSaving } from '@/config/calculator'

const eligibleProducts = products.filter((product) =>
  product.facts.some((fact) => fact.label === 'Floor-space saving')
)

export function CalculatorWizard() {
  const [productSlug, setProductSlug] = useState(eligibleProducts[0]?.slug ?? '')
  const [floorArea, setFloorArea] = useState('')
  const product = eligibleProducts.find((item) => item.slug === productSlug)

  if (!product) {
    throw new Error('Company data must include a product with a brochure-stated floor-space saving.')
  }

  const area = floorArea === '' ? undefined : Number(floorArea)
  const estimate = area !== undefined && Number.isFinite(area) && area > 0
    ? calculateBrochureSpaceSaving(product.slug, area)
    : undefined

  return (
    <div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-2">
      <section className="space-y-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6 shadow-sm sm:p-8">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text)]">Select a product</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            Choose a system with a floor-space saving stated in the brochure.
          </p>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-[var(--text)]">Product</legend>
          <div className="flex flex-wrap gap-2">
            {eligibleProducts.map((item) => (
              <button
                key={item.slug}
                type="button"
                aria-pressed={item.slug === product.slug}
                onClick={() => setProductSlug(item.slug)}
                className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                  item.slug === product.slug
                    ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                    : 'border-[var(--border)] bg-[var(--bg)] text-[var(--text-secondary)]'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="block space-y-2 text-sm font-semibold text-[var(--text)]">
          Current floor area allocated to storage (sq ft)
          <input
            type="number"
            min="0"
            step="any"
            value={floorArea}
            onChange={(event) => setFloorArea(event.target.value)}
            placeholder="Enter area"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-[var(--text)]"
          />
        </label>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4" aria-live="polite">
          {estimate ? (
            <>
              <p className="text-sm text-[var(--text-secondary)]">
                Brochure-stated floor-space saving: <strong className="text-[var(--text)]">{estimate.statedSaving}</strong>
              </p>
              <p className="mt-2 text-lg font-bold text-[var(--accent)]">
                Illustration: {estimate.areaSavedSqFt} sq ft of {estimate.inputAreaSqFt} sq ft
              </p>
            </>
          ) : (
            <p className="text-sm text-[var(--text-muted)]">Enter your floor area to see an illustration based on the brochure.</p>
          )}
        </div>

        <p className="text-xs leading-relaxed text-[var(--text-muted)]">
          This is a simple illustration applying the brochure-stated percentage to your input, not a site-specific layout, cost, or payback estimate.
        </p>

        <Link
          href={`/get-a-quote?product=${product.slug}`}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-bold text-white transition-opacity hover:opacity-90"
        >
          Request a {product.name} quote <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text)]">Storage layout illustration</h2>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          The brochure percentage is shown separately from this conceptual comparison; actual storage layout depends on a project assessment.
        </p>
      </div>
    </div>
  )
}
