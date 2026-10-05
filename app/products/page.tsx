import Link from 'next/link'
import { constructMetadata } from '@/lib/metadata'
import { PRODUCTS } from '@/config/products'
import { Confirm } from '@/components/confirm/Confirm'
import { ArrowRight, CheckCircle2, ShieldAlert, Layers } from 'lucide-react'

export const metadata = constructMetadata({
  title: 'Automated Storage Products — STOMAT, STOLIFT, STORDER',
  description:
    'Explore Space Magnum automated storage & retrieval systems: STOMAT vertical carousels, STOLIFT vertical lift modules, STORDER goods-to-person picking, and heavy compactors.',
  path: '/products',
})

export default function ProductsPage() {
  return (
    <div className="py-16 bg-zinc-950 min-h-screen text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs font-bold uppercase tracking-wider">
            <span>Engineering Product Range</span>
          </div>
          <h1 className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tight">
            Automated Industrial Storage Systems
          </h1>
          <p className="font-sans text-zinc-400 text-lg leading-relaxed">
            All Space Magnum systems are manufactured at our Pune industrial plant, utilizing robust PLC controls, safety interlocks, and WMS/ERP connectivity.
          </p>
        </div>

        {/* Product Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl bg-zinc-900 border border-zinc-800 p-8 flex flex-col justify-between space-y-8 hover:border-orange-500/40 transition-all shadow-xl"
            >
              <div className="space-y-6">
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-xs text-orange-400 font-bold uppercase tracking-wider">
                      {product.tagline}
                    </span>
                    <h2 className="font-mono text-2xl font-bold text-zinc-100 mt-1">
                      {product.name}
                    </h2>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 font-mono text-xs text-zinc-300 font-bold">
                    {product.primaryMetric}
                  </span>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed">
                  {product.description}
                </p>

                {/* Key Metrics */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-zinc-400 block">Space Reclaim</span>
                    <span className="text-emerald-400 font-bold text-base">
                      {product.spaceSavingRange.min}% – {product.spaceSavingRange.max}%
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Labour Efficiency</span>
                    <span className="text-orange-400 font-bold text-base">
                      {product.labourReductionRange.min}% – {product.labourReductionRange.max}%
                    </span>
                  </div>
                </div>

                {/* Confirm Flag */}
                <Confirm id={`SPEC_${product.id.toUpperCase()}`} label={`${product.name} Verified Technical Data Sheet`} compact />

              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                <Link
                  href={`/products/${product.id}`}
                  className="flex-1 py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-zinc-950 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Full Specifications & CAD</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={`/get-a-quote?product=${product.id}`}
                  className="py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs font-semibold"
                >
                  Get Quote
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
