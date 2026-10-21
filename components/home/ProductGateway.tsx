'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PRODUCTS } from '@/config/products'
import { ArrowRight, Boxes } from 'lucide-react'
import { VerticalLift, MobileCompactor, Shuttle, StackerCrane } from '@/components/icons'

const PRODUCT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  stomat: Boxes,
  stolift: VerticalLift,
  storder: Shuttle,
  'compactors-racking': MobileCompactor,
}

export function ProductGateway() {
  return (
    <section className="py-20 md:py-28 bg-[var(--bg)] border-b border-[var(--border)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider">
              <span>ASRS Product Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text)] tracking-tight">
              Engineered Storage Systems
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-body">
              Four specialized automated storage product lines manufactured at our Pune industrial facility.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors group shrink-0"
          >
            <span>View Full Catalogue</span>
            <ArrowRight className="w-4 h-4 transition-transform motion-safe:group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map(product => {
            const Icon = PRODUCT_ICONS[product.id] || Boxes

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group relative rounded-2xl overflow-hidden bg-[var(--bg-subtle)] border border-[var(--border)] hover:border-[var(--border-strong)] transition-all duration-200 hover:shadow-md flex flex-col"
              >
                {/* Product Photo with subtle border */}
                <div className="relative h-52 overflow-hidden bg-[var(--bg-muted)] border-b border-[var(--border)] shrink-0">
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-[var(--bg)]/90 backdrop-blur-md border border-[var(--border)] text-[var(--accent)] flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--accent)] mb-1">
                      {product.tagline}
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1.5 line-clamp-2 leading-relaxed">
                      {product.shortDesc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-semibold text-[var(--text)] group-hover:text-[var(--accent)]">
                    <span>Explore Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform motion-safe:group-hover:translate-x-1" />
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
