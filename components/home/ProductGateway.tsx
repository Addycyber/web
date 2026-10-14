'use client'

import Link from 'next/link'
import Image from 'next/image'
import { PRODUCTS } from '@/config/products'
import { ArrowRight, Zap } from 'lucide-react'

export function ProductGateway() {
  return (
    <section className="py-28 bg-[#0F1319] border-b border-white/5 relative overflow-hidden">
      {/* Subtle top gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="absolute inset-0 mesh-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="pill-signal">
              <Zap className="w-3 h-3" />
              <span>ASRS Product Matrix</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Engineered{' '}
              <span className="text-gradient-signal">Automated</span>{' '}
              Systems
            </h2>
            <p className="font-body text-[#8A9BB5] text-lg leading-relaxed">
              Four core automated storage product families manufactured at our Pune industrial facility.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-mono text-sm font-medium group flex-shrink-0"
          >
            <span>View Full Catalogue</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product, idx) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group relative rounded-2xl overflow-hidden bg-[#151B25] border border-white/8 hover:border-orange-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 flex flex-col"
            >
              {/* Product Photo */}
              <div className="relative h-52 overflow-hidden flex-shrink-0">
                <Image
                  src={product.heroImage}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {/* Image gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#151B25]/90 via-[#151B25]/20 to-transparent" />

                {/* Accent colour top bar */}
                <div
                  className="absolute top-0 inset-x-0 h-0.5 opacity-70"
                  style={{ background: `linear-gradient(90deg, transparent, ${product.accentColor}, transparent)` }}
                />

                {/* Product name badge on photo */}
                <div className="absolute bottom-3 left-3">
                  <span
                    className="font-heading font-bold text-lg text-white drop-shadow-lg"
                  >
                    {product.name}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-1 p-5 space-y-4">
                <div className="space-y-1">
                  <span className="font-mono text-xs font-medium uppercase tracking-widest" style={{ color: product.accentColor }}>
                    {product.tagline}
                  </span>
                  <p className="text-sm text-[#8A9BB5] leading-relaxed line-clamp-2">
                    {product.shortDesc}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-[#0F1319] rounded-lg p-2.5 border border-white/5">
                    <div className="text-[#8A9BB5] mb-0.5">Capacity</div>
                    <div className="text-white font-semibold">{product.primaryMetric}</div>
                  </div>
                  <div className="bg-[#0F1319] rounded-lg p-2.5 border border-white/5">
                    <div className="text-[#8A9BB5] mb-0.5">Payload</div>
                    <div className="text-white font-semibold">{product.secondaryMetric}</div>
                  </div>
                </div>

                {/* Space saving bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono text-[#8A9BB5]">
                    <span>Space Reclaim</span>
                    <span className="text-emerald-400 font-medium">
                      {product.spaceSavingRange.min}–{product.spaceSavingRange.max}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#0F1319] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-1000"
                      style={{ width: `${product.spaceSavingRange.max}%` }}
                    />
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-auto pt-2">
                  <div className="flex items-center justify-between text-sm font-semibold text-orange-400 group-hover:text-orange-300 transition-colors">
                    <span>View Specifications</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Grid of extra product images for Compactors & Racking */}
        <div className="mt-16 pt-12 border-t border-white/5">
          <div className="text-center mb-8 space-y-2">
            <h3 className="font-heading text-2xl font-bold text-white">
              Our Full Product Range
            </h3>
            <p className="text-[#8A9BB5] text-sm font-body">
              Mezzanine Floors · Cantilever Racks · Pallet Racking · Slotted Angle · Heavy Duty · Drum Storage
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { src: '/images/products/mezzanine/mezzanine-1.jpg', label: 'Mezzanine Floor' },
              { src: '/images/products/cantilever/cantilever-1.jpg', label: 'Cantilever Rack' },
              { src: '/images/products/pallet/pallet-1.jpg', label: 'Pallet Racking' },
              { src: '/images/products/slotted-angle/slotted-1.jpg', label: 'Slotted Angle' },
              { src: '/images/products/heavy-duty/heavy-duty-1.jpg', label: 'Heavy Duty' },
              { src: '/images/products/compactor/compactor-3.jpg', label: 'Mobile Compactor' },
            ].map((item) => (
              <Link
                key={item.label}
                href="/products/compactors-racking"
                className="group relative aspect-square rounded-xl overflow-hidden bg-[#151B25] border border-white/8 hover:border-orange-500/30 transition-all"
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 17vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14]/80 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-[10px] font-mono text-white/90 uppercase tracking-wide font-medium">
                    {item.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
