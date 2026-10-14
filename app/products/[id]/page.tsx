import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { constructMetadata } from '@/lib/metadata'
import { PRODUCTS_MAP, ProductId } from '@/config/products'
import { Confirm } from '@/components/confirm/Confirm'
import { HelpCircle, ArrowRight, ArrowLeft, CheckCircle2, Zap } from 'lucide-react'

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

  if (!product) notFound()

  return (
    <div className="bg-[#0A0D14] text-zinc-100 min-h-screen">

      {/* Schema.org Product JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            brand: { '@type': 'Brand', name: 'Space Magnum' },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'INR',
              offerCount: '1',
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />

      {/* ── Hero Section with Full-width Photo ── */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src={product.heroImage}
          alt={product.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D14]/95 via-[#0A0D14]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14]/80 to-transparent" />
        <div className="absolute inset-0 grid-lines opacity-20" />

        {/* Accent top bar */}
        <div
          className="absolute top-0 inset-x-0 h-1"
          style={{ background: `linear-gradient(90deg, ${product.accentColor}, transparent 60%)` }}
        />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

            {/* Breadcrumb */}
            <div className="text-xs font-mono text-[#6B7FA0] flex items-center gap-2 mb-6">
              <Link href="/" className="hover:text-[#B0BECE] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-[#B0BECE] transition-colors">Products</Link>
              <span>/</span>
              <span style={{ color: product.accentColor }} className="font-bold">{product.name}</span>
            </div>

            <div className="max-w-2xl space-y-4">
              <div className="pill-signal" style={{ borderColor: `${product.accentColor}40`, color: product.accentColor, background: `${product.accentColor}15` }}>
                <Zap className="w-3 h-3" />
                <span>{product.tagline}</span>
              </div>

              <h1 className="font-heading text-5xl sm:text-7xl font-extrabold text-white tracking-tight">
                {product.name}
              </h1>

              <p className="font-body text-[#B0BECE] text-lg leading-relaxed">
                &ldquo;{product.promise}&rdquo;
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={`/get-a-quote?product=${product.id}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-zinc-950 font-bold text-sm shadow-xl shadow-orange-500/20 transition-all"
                >
                  Get Custom Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm backdrop-blur-sm transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  All Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* Product Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Description + Best For */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="font-heading text-2xl font-bold text-white">About {product.name}</h2>
              <p className="font-body text-[#8A9BB5] text-base leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Best For */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#6B7FA0] font-medium">
                Best For Industries
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.bestFor.map(b => (
                  <span
                    key={b}
                    className="px-3 py-1.5 rounded-full bg-[#151B25] border border-white/10 text-xs font-mono text-[#B0BECE] uppercase tracking-wide"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="card-dark p-5">
                <div className="font-heading text-3xl font-bold text-emerald-400">
                  {product.spaceSavingRange.min}–{product.spaceSavingRange.max}%
                </div>
                <div className="text-[#6B7FA0] text-xs font-mono mt-1 uppercase tracking-wide">Space Reclaim</div>
              </div>
              <div className="card-dark p-5">
                <div className="font-heading text-3xl font-bold text-orange-400">
                  {product.labourReductionRange.min}–{product.labourReductionRange.max}%
                </div>
                <div className="text-[#6B7FA0] text-xs font-mono mt-1 uppercase tracking-wide">Labour Efficiency</div>
              </div>
              <div className="card-dark p-5">
                <div className="font-heading text-2xl font-bold text-white">
                  {product.primaryMetric}
                </div>
                <div className="text-[#6B7FA0] text-xs font-mono mt-1 uppercase tracking-wide">Height / Capacity</div>
              </div>
            </div>
          </div>

          {/* Right: Key Highlights */}
          <div className="lg:col-span-5 card-dark p-6 space-y-5 h-fit">
            <div className="text-xs font-mono uppercase tracking-widest text-[#6B7FA0] border-b border-white/5 pb-3">
              Key Highlights
            </div>
            {[
              'Manufactured 100% in Pune, Maharashtra',
              'PLC-based automated control system',
              'WMS / ERP software integration ready',
              'Photo-electric safety light curtains',
              'TÜV Austria ISO 9001:2015 certified',
              'Custom layout engineering included',
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-[#B0BECE] font-body">{point}</span>
              </div>
            ))}

            <div className="pt-3 border-t border-white/5">
              <Confirm id={`CAD_RENDER_${product.id.toUpperCase()}`} label="3D CAD Assembly & Exploded Diagram" compact />
            </div>
          </div>
        </div>

        {/* ── Photo Gallery ── */}
        {product.galleryImages.length > 0 && (
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-bold text-white">
              Product Gallery
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {product.galleryImages.map((src, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-xl bg-[#151B25] border border-white/8 hover:border-orange-500/30 transition-all group ${
                    i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${product.name} photo ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-[#0A0D14]/20 group-hover:bg-[#0A0D14]/0 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Technical Specifications Table ── */}
        {product.specs.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-end border-t border-white/5 pt-10">
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">Technical Specifications</h2>
                <p className="text-xs font-mono text-[#6B7FA0] mt-1">
                  Values marked [CONFIRM] require Space Magnum engineering verification per custom order.
                </p>
              </div>
              <Confirm id={`SPEC_SHEET_${product.id.toUpperCase()}`} label="Engineering Spec Sheet" compact />
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/8">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#151B25] border-b border-white/8 text-[#6B7FA0] uppercase tracking-wide">
                  <tr>
                    <th className="p-4">Parameter</th>
                    <th className="p-4">Specification</th>
                    <th className="p-4">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-[#0F1319] text-[#B0BECE]">
                  {product.specs.map((spec, i) => (
                    <tr key={i} className="hover:bg-[#151B25] transition-colors">
                      <td className="p-4 font-semibold text-white">{spec.label}</td>
                      <td className="p-4 font-bold text-orange-400">
                        {spec.value} {spec.unit || ''}
                      </td>
                      <td className="p-4 text-[#6B7FA0]">
                        {spec.isConfirm ? (
                          <Confirm id={`SPEC_${product.id}_${i}`} label="Engineering Value" compact />
                        ) : 'Standard Specification'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── FAQs ── */}
        {product.faqs.length > 0 && (
          <div className="space-y-6 border-t border-white/5 pt-10">
            <h2 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-orange-500" />
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.faqs.map((faq, i) => (
                <div key={i} className="card-dark p-6 space-y-2">
                  <h3 className="font-heading text-sm font-bold text-white">{faq.question}</h3>
                  <p className="text-xs text-[#8A9BB5] leading-relaxed font-body">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div className="border-t border-white/5 pt-12">
          <div className="card-dark p-8 sm:p-12 text-center space-y-6">
            <h2 className="font-heading text-3xl font-bold text-white">
              Ready to Reclaim Your Warehouse Space?
            </h2>
            <p className="font-body text-[#8A9BB5] text-base max-w-xl mx-auto">
              Get a custom {product.name} layout design and ROI calculation from our Pune engineering team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/get-a-quote?product=${product.id}`}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-zinc-950 font-bold shadow-2xl shadow-orange-500/25 transition-all"
              >
                Request Engineering Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/tools/calculator"
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#151B25] border border-white/10 hover:border-orange-500/30 text-white font-semibold transition-all"
              >
                Space Calculator
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
