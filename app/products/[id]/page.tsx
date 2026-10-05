import { notFound } from 'next/navigation'
import Link from 'next/link'
import { constructMetadata } from '@/lib/metadata'
import { PRODUCTS_MAP, ProductId } from '@/config/products'
import { Confirm } from '@/components/confirm/Confirm'
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu, Layers, HelpCircle } from 'lucide-react'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return [
    { id: 'stomat' },
    { id: 'stolift' },
    { id: 'storder' },
    { id: 'compactors-racking' },
  ]
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params
  const product = PRODUCTS_MAP[id as ProductId]

  if (!product) {
    return constructMetadata({ title: 'Product Not Found', description: 'Product not found' })
  }

  return constructMetadata({
    title: `${product.name} — ${product.tagline}`,
    description: product.description,
    path: `/products/${product.id}`,
  })
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = PRODUCTS_MAP[id as ProductId]

  if (!product) {
    notFound()
  }

  return (
    <div className="py-16 bg-zinc-950 text-zinc-100 min-h-screen">
      
      {/* Schema.org Product JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            brand: {
              '@type': 'Brand',
              name: 'Space Magnum',
            },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'INR',
              offerCount: '1',
              priceValidUntil: '2027-12-31',
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumb */}
        <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
          <Link href="/" className="hover:text-zinc-300">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-zinc-300">Products</Link>
          <span>/</span>
          <span className="text-orange-400 font-bold">{product.name}</span>
        </div>

        {/* Product Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs font-bold uppercase tracking-wider">
              <span>{product.tagline}</span>
            </div>

            <h1 className="font-mono text-4xl sm:text-6xl font-extrabold tracking-tight">
              {product.name}
            </h1>

            <p className="font-sans text-xl text-orange-300/90 font-medium">
              "{product.promise}"
            </p>

            <p className="font-sans text-zinc-400 text-base leading-relaxed">
              {product.description}
            </p>

            {/* Best for tags */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-zinc-300 uppercase font-bold block">Best For Sectors:</span>
              <div className="flex flex-wrap gap-2">
                {product.bestFor.map(b => (
                  <span key={b} className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 uppercase">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href={`/get-a-quote?product=${product.id}`}
                className="px-6 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 font-bold text-sm shadow-xl shadow-orange-500/20 hover:from-orange-400 hover:to-amber-400 transition-all"
              >
                Request Custom {product.name} Layout & Quote
              </Link>
              <Link
                href="/tools/calculator"
                className="px-6 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-mono text-xs font-bold flex items-center gap-2"
              >
                Calculate Space Reclaim
              </Link>
            </div>

          </div>

          {/* Product Diagram / Visualizer Card */}
          <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 p-8 rounded-2xl space-y-4 shadow-2xl">
            <div className="text-xs font-mono text-zinc-400 uppercase font-bold flex justify-between">
              <span>Working Diagram</span>
              <span className="text-orange-400">100% Pune Made</span>
            </div>

            <div className="h-64 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-center relative overflow-hidden p-4">
              <div className="w-32 h-48 border-2 border-orange-500 rounded bg-zinc-900 flex flex-col justify-between p-2">
                <div className="w-full h-3 bg-orange-500/40 rounded animate-pulse" />
                <div className="space-y-1">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="w-full h-1.5 bg-zinc-800 rounded" />
                  ))}
                </div>
                <div className="w-full h-4 bg-amber-500 text-zinc-950 font-mono text-[9px] font-bold rounded flex items-center justify-center">
                  ACCESS BAY
                </div>
              </div>
            </div>

            <Confirm id={`CAD_RENDER_${product.id.toUpperCase()}`} label="3D CAD Assembly & Exploded Diagram" compact />
          </div>

        </div>

        {/* Technical Specification Table */}
        <div className="space-y-6 pt-12 border-t border-zinc-900">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="font-mono text-2xl font-bold text-zinc-100">
                Technical Specifications
              </h2>
              <p className="text-xs font-mono text-zinc-400">
                Values marked [CONFIRM] require Space Magnum engineering verification per custom order
              </p>
            </div>
            <Confirm id={`SPEC_SHEET_${product.id.toUpperCase()}`} label="Engineering Spec Sheet" compact />
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 uppercase">
                <tr>
                  <th className="p-4">Parameter</th>
                  <th className="p-4">Specification Value</th>
                  <th className="p-4">Notes / Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {product.specs.map((spec, i) => (
                  <tr key={i} className="hover:bg-zinc-800/40">
                    <td className="p-4 font-semibold text-zinc-200">{spec.label}</td>
                    <td className="p-4 font-bold text-orange-400">
                      {spec.value} {spec.unit || ''}
                    </td>
                    <td className="p-4 text-zinc-500">
                      {spec.isConfirm ? (
                        <Confirm id={`SPEC_${product.id}_${i}`} label="Engineering Value" compact />
                      ) : (
                        'Standard Specification'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        {product.faqs.length > 0 && (
          <div className="space-y-6 pt-12 border-t border-zinc-900">
            <h2 className="font-mono text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-orange-500" />
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.faqs.map((faq, i) => (
                <div key={i} className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                  <h3 className="font-mono text-sm font-bold text-zinc-200">{faq.question}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
