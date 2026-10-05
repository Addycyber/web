'use client'

import Link from 'next/link'
import { PRODUCTS } from '@/config/products'
import { Confirm } from '@/components/confirm/Confirm'
import { ArrowRight, Layers, RefreshCw, Box, ShieldAlert } from 'lucide-react'

export function ProductGateway() {
  return (
    <section className="py-24 bg-zinc-950 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs font-bold uppercase tracking-wider">
              <span>ASRS Product Matrix</span>
            </div>
            <h2 className="font-mono text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
              Engineered Automated Systems
            </h2>
            <p className="font-sans text-zinc-400 text-base">
              Four core automated storage product families manufactured at our Pune industrial facility for high-density storage and rapid retrieval.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-mono text-sm font-bold group"
          >
            <span>Explore All Product Specs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-2xl bg-zinc-900/90 border border-zinc-800/90 hover:border-orange-500/50 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10"
            >
              <div className="space-y-5">
                
                {/* Visual Icon Container */}
                <div className="w-full h-36 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-center relative overflow-hidden group-hover:border-orange-500/30 transition-colors">
                  
                  {/* Subtle Grid Background */}
                  <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                  {/* SVG Animated Illustration by Product Type */}
                  {product.id === 'stomat' && (
                    <div className="relative w-16 h-24 border-2 border-orange-500 rounded bg-zinc-900 flex flex-col justify-between p-1">
                      <div className="w-full h-2 bg-orange-500/40 rounded animate-pulse" />
                      <div className="space-y-1">
                        <div className="w-full h-1 bg-zinc-700 rounded" />
                        <div className="w-full h-1 bg-zinc-700 rounded" />
                        <div className="w-full h-1 bg-zinc-700 rounded" />
                      </div>
                      <div className="w-full h-2.5 bg-amber-500 text-[6px] font-mono font-bold text-zinc-950 rounded flex items-center justify-center">
                        VLM
                      </div>
                    </div>
                  )}

                  {product.id === 'stolift' && (
                    <div className="relative w-20 h-20 border-2 border-emerald-500 rounded-full bg-zinc-900 flex items-center justify-center p-2">
                      <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin [animation-duration:8s]" />
                    </div>
                  )}

                  {product.id === 'storder' && (
                    <div className="relative w-24 h-16 border-2 border-amber-500 rounded bg-zinc-900 flex items-center justify-between p-2">
                      <div className="w-4 h-full bg-amber-500/20 rounded border border-amber-500/50" />
                      <div className="w-4 h-full bg-amber-500/60 rounded border border-amber-500/80 animate-pulse" />
                      <div className="w-4 h-full bg-amber-500/20 rounded border border-amber-500/50" />
                    </div>
                  )}

                  {product.id === 'compactors-racking' && (
                    <div className="relative w-24 h-16 border-2 border-zinc-600 rounded bg-zinc-900 flex items-center justify-around p-1">
                      <div className="w-3 h-full bg-zinc-800 rounded" />
                      <div className="w-3 h-full bg-zinc-800 rounded" />
                      <div className="w-3 h-full bg-zinc-800 rounded" />
                    </div>
                  )}

                  <span className="absolute bottom-2 right-2 text-[10px] font-mono text-zinc-500 uppercase">
                    {product.id.toUpperCase()}
                  </span>
                </div>

                {/* Card Title & Desc */}
                <div className="space-y-2">
                  <h3 className="font-mono text-xl font-bold text-zinc-100 group-hover:text-orange-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                    {product.shortDesc}
                  </p>
                </div>

                {/* Technical Highlights */}
                <div className="space-y-2 pt-3 border-t border-zinc-800/80 text-xs font-mono">
                  <div className="flex justify-between text-zinc-400">
                    <span>Height / Capacity:</span>
                    <span className="text-zinc-200 font-semibold">{product.primaryMetric}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Payload:</span>
                    <span className="text-zinc-200 font-semibold">{product.secondaryMetric}</span>
                  </div>
                </div>

                {/* Confirm Marker */}
                <div className="pt-1">
                  <Confirm id={`SPEC_${product.id.toUpperCase()}`} label="Verified Load Spec" compact />
                </div>

              </div>

              {/* Action Link */}
              <div className="pt-6">
                <Link
                  href={`/products/${product.id}`}
                  className="w-full py-2.5 px-3 rounded-lg bg-zinc-800 hover:bg-orange-500 text-zinc-200 hover:text-zinc-950 font-mono text-xs font-bold flex items-center justify-between transition-all"
                >
                  <span>View Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
