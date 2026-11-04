'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { products } from '@/lib/company'

const FEATURED_PRODUCTS = new Set(['stomat', 'stolift'])

interface WhatWeSellProps {
  id?: string
  eyebrow?: string
  heading?: string
  subtitle?: string
  showAllLink?: boolean
}

export function WhatWeSell({
  id = 'what-we-sell',
  eyebrow = 'Product Architecture',
  heading = 'What We Sell',
  subtitle = 'Engineered automated storage and retrieval systems, vertical carousels, and mobile compactor shelving manufactured in Pune.',
  showAllLink = true,
}: WhatWeSellProps) {
  return (
    <section id={id} className="scroll-mt-20 bg-[var(--bg)] py-24 transition-colors sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                {eyebrow}
              </span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-[var(--text)] sm:text-5xl">
              {heading}
            </h2>
            <p className="text-base font-normal leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              {subtitle}
            </p>
          </div>

          {showAllLink && (
            <Link
              href="/products"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
            >
              <span>View all systems</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            const isLarge = FEATURED_PRODUCTS.has(product.slug)
            const fact = product.facts[0]

            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-xl ${
                  isLarge ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                <div
                  className={`relative flex w-full items-end overflow-hidden border-b border-[var(--border)] bg-[#0B1220] ${
                    isLarge ? 'h-64 sm:h-80' : 'h-52 sm:h-60'
                  }`}
                >
                  {product.heroImage ? (
                    <Image
                      src={product.heroImage}
                      alt={product.heroImageAlt ?? ''}
                      fill
                      sizes={isLarge ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 1024px) 100vw, 25vw'}
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#0B1220_0%,#16233B_100%)]"
                    >
                      <span className="font-mono text-2xl font-black uppercase tracking-[0.3em] text-white/25">
                        {product.name}
                      </span>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  {fact && (
                    <div className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-black/75 px-3 py-1.5 backdrop-blur-md">
                      <span className="font-mono text-xs font-bold text-[var(--accent)]">{fact.value}</span>
                      <span className="ml-1.5 font-mono text-[10px] uppercase text-zinc-300">{fact.label}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      {product.type}
                    </span>
                    <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text)] transition-colors group-hover:text-[var(--accent)] sm:text-2xl">
                      {product.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                      {product.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                    <span>View details</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
