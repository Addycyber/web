import Link from 'next/link'
import Image from 'next/image'
import { constructMetadata } from '@/lib/metadata'
import { PRODUCTS } from '@/config/products'
import { ArrowRight, Zap, CheckCircle2 } from 'lucide-react'

export const metadata = constructMetadata({
  title: 'Automated Storage Products — STOMAT, STOLIFT, STORDER & Racking',
  description:
    'Explore Space Magnum automated storage & retrieval systems: STOMAT vertical carousels, STOLIFT vertical lift modules, STORDER goods-to-person picking, and heavy compactors.',
  path: '/products',
})

export default function ProductsPage() {
  return (
    <div className="bg-[#0A0D14] min-h-screen text-zinc-100">

      {/* Page Hero */}
      <div className="relative py-20 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 mesh-bg pointer-events-none" />
        <div className="absolute inset-0 grid-lines opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-5">
            <div className="pill-signal">
              <Zap className="w-3 h-3" />
              <span>Engineering Product Range</span>
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
              Automated{' '}
              <span className="text-gradient-signal">Industrial</span>
              <br />
              Storage Systems
            </h1>
            <p className="font-body text-[#8A9BB5] text-xl leading-relaxed max-w-2xl">
              All Space Magnum systems are manufactured at our Pune industrial plant, utilizing robust PLC controls, safety interlocks, and WMS/ERP connectivity.
            </p>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
        {PRODUCTS.map((product, idx) => (
          <div
            key={product.id}
            className="group rounded-2xl bg-[#151B25] border border-white/8 hover:border-orange-500/30 transition-all overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-orange-500/5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

              {/* Photo - alternating sides */}
              <div className={`lg:col-span-4 relative h-64 lg:h-auto ${idx % 2 !== 0 ? 'lg:order-last' : ''}`}>
                <Image
                  src={product.heroImage}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className={`absolute inset-0 ${
                  idx % 2 !== 0
                    ? 'bg-gradient-to-l from-transparent to-[#151B25]/80'
                    : 'bg-gradient-to-r from-transparent to-[#151B25]/80'
                } lg:block hidden`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151B25]/80 to-transparent lg:hidden" />

                {/* Accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: `linear-gradient(90deg, ${product.accentColor}, transparent)` }}
                />
              </div>

              {/* Content */}
              <div className="lg:col-span-8 p-8 lg:p-10 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <span
                        className="font-mono text-xs font-medium uppercase tracking-widest block mb-1"
                        style={{ color: product.accentColor }}
                      >
                        {product.tagline}
                      </span>
                      <h2 className="font-heading text-3xl font-extrabold text-white">
                        {product.name}
                      </h2>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <span className="px-3 py-1.5 rounded-full bg-[#0F1319] border border-white/8 font-mono text-xs text-[#B0BECE]">
                        {product.primaryMetric}
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-[#0F1319] border border-white/8 font-mono text-xs text-[#B0BECE]">
                        {product.secondaryMetric}
                      </span>
                    </div>
                  </div>

                  <p className="font-body text-[#8A9BB5] text-base leading-relaxed">
                    {product.description}
                  </p>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-[#0F1319] rounded-xl p-4 border border-emerald-500/15">
                      <div className="text-emerald-400 font-heading font-bold text-xl">
                        {product.spaceSavingRange.min}–{product.spaceSavingRange.max}%
                      </div>
                      <div className="text-[#6B7FA0] text-xs font-mono mt-1">Space Reclaim</div>
                    </div>
                    <div className="bg-[#0F1319] rounded-xl p-4 border border-orange-500/15">
                      <div className="text-orange-400 font-heading font-bold text-xl">
                        {product.labourReductionRange.min}–{product.labourReductionRange.max}%
                      </div>
                      <div className="text-[#6B7FA0] text-xs font-mono mt-1">Labour Efficiency</div>
                    </div>
                    <div className="col-span-2 bg-[#0F1319] rounded-xl p-4 border border-white/5 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div>
                        <div className="text-white font-heading font-semibold text-sm">{product.promise}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-white/5">
                  <Link
                    href={`/products/${product.id}`}
                    className="flex-1 sm:flex-none py-3 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20"
                  >
                    <span>Full Specifications</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/get-a-quote?product=${product.id}`}
                    className="py-3 px-5 rounded-xl bg-[#0F1319] hover:bg-[#243045] border border-white/8 text-[#B0BECE] font-semibold text-sm transition-colors"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>

            {/* Gallery Strip - show extra product photos */}
            {product.galleryImages.length > 1 && (
              <div className="border-t border-white/5 flex gap-0 overflow-hidden h-24">
                {product.galleryImages.slice(1, 6).map((imgSrc, i) => (
                  <div key={i} className="flex-1 relative overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={`${product.name} gallery ${i + 2}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-[#0A0D14]/30 hover:bg-[#0A0D14]/0 transition-colors" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
