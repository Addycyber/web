'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FloorSpaceSlider } from '@/components/features/FloorSpaceSlider'
import { products } from '@/lib/company'

const eligibleProducts = products.filter((product) =>
  product.facts.some((fact) => fact.label === 'Floor-space saving')
)

export function ReclaimFloorSection() {
  const [productSlug, setProductSlug] = useState(eligibleProducts[0]?.slug ?? '')
  const [floorArea, setFloorArea] = useState('')
  const product = eligibleProducts.find((item) => item.slug === productSlug)

  if (!product) {
    throw new Error('Company data must include a product with a brochure-stated floor-space saving.')
  }

  const savingFact = product.facts.find((fact) => fact.label === 'Floor-space saving')
  const savingValue = savingFact?.value
  if (!savingValue || !/^\d+(?:\.\d+)?%$/.test(savingValue)) {
    throw new Error(`Company data has no valid floor-space saving for ${product.name}.`)
  }

  const savingPercent = Number.parseFloat(savingValue)
  const area = floorArea === '' ? undefined : Number(floorArea)
  const areaReleased = area === undefined || !Number.isFinite(area) || area <= 0
    ? undefined
    : area * savingPercent / 100

  return (
    <section className="overflow-hidden bg-[var(--bg-subtle)] py-16 transition-colors md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-6">
          <div className="inline-block rounded-full bg-[var(--accent-soft)] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            Brochure-stated floor-space saving
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl">
            Explore the stated floor-space saving
          </h2>
          <p className="text-base leading-relaxed text-[var(--text-secondary)]">
            The brochure gives the saving for these systems. Enter a floor area to see a simple
            illustration based on that stated figure; a site-specific layout requires assessment.
          </p>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-[var(--text)]">Select a system</legend>
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

          <label className="block max-w-xs space-y-2 text-sm font-semibold text-[var(--text)]">
            Your floor area (sq ft)
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

          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
            <p className="text-sm text-[var(--text-secondary)]">
              {product.name}: <strong className="text-[var(--text)]">{savingValue}</strong> floor-space
              saving stated in the brochure.
            </p>
            {areaReleased !== undefined ? (
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Illustration: {areaReleased} sq ft indicated as saved from {area} sq ft.
              </p>
            ) : (
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Enter your floor area to see the illustration.
              </p>
            )}
          </div>

          <Link
            href={`/get-a-quote?product=${product.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-bold text-white transition-opacity hover:opacity-90"
          >
            Request a {product.name} quote <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <FloorSpaceSlider />
      </div>
    </section>
  )
}
