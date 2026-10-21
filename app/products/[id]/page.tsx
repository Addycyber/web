import fs from 'node:fs'
import path from 'node:path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { constructMetadata } from '@/lib/metadata'
import { PRODUCTS_MAP, ProductId } from '@/config/products'
import { Confirm } from '@/components/confirm/Confirm'
import { ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'
import { FaqSection } from '@/components/features/FaqSection'
import { GalleryStrip } from '@/components/gallery/GalleryStrip'
import type { GalleryManifestItem } from '@/scripts/build-gallery'

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

function getGalleryItems(): GalleryManifestItem[] {
  try {
    const manifestPath = path.resolve(process.cwd(), 'content/gallery.manifest.json')
    if (fs.existsSync(manifestPath)) {
      return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
    }
  } catch (e) {}
  return []
}

// Map product ID to gallery category
const CATEGORY_MAP: Record<string, string> = {
  stomat: 'stomat',
  stolift: 'stolift',
  storder: 'storder',
  'compactors-racking': 'compactors',
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = PRODUCTS_MAP[id as ProductId]

  if (!product) notFound()

  const allGalleryItems = getGalleryItems()
  const galleryCat = CATEGORY_MAP[product.id] || 'general'

  return (
    <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen transition-colors">

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

      {/* ── Product Hero Section ── */}
      <div className="relative border-b border-[var(--border)] bg-[var(--bg-subtle)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-2 mb-6">
            <Link href="/" className="hover:text-[var(--text)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[var(--text)] transition-colors">Products</Link>
            <span>/</span>
            <span className="font-bold text-[var(--accent)]">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" />
                <span>{product.tagline}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text)]">
                {product.name}
              </h1>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-body">
                &ldquo;{product.promise}&rdquo;
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                <Link
                  href={`/get-a-quote?product=${product.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-sm shadow-sm transition-colors"
                >
                  <span>Get Custom Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg)] text-[var(--text)] font-semibold text-sm hover:border-[var(--brand)] transition-colors shadow-xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>All Products</span>
                </Link>
              </div>
            </div>

            {/* Right Photo Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg)] shadow-md aspect-[4/3]">
                <Image
                  src={product.heroImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Main Details Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Description + Best For */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-[var(--text)]">About {product.name}</h2>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed font-body">
                {product.description}
              </p>
            </div>

            {/* Best For Industries */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] font-bold">
                Best For Industries
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.bestFor.map(b => (
                  <span
                    key={b}
                    className="px-3 py-1.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)] text-xs font-mono text-[var(--text-secondary)] font-semibold uppercase"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <div className="font-mono text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {product.spaceSavingRange.min}–{product.spaceSavingRange.max}%
                </div>
                <div className="text-[11px] font-mono text-[var(--text-muted)] mt-1 uppercase">Space Reclaim</div>
              </div>

              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <div className="font-mono text-3xl font-extrabold text-[var(--accent)]">
                  {product.labourReductionRange.min}–{product.labourReductionRange.max}%
                </div>
                <div className="text-[11px] font-mono text-[var(--text-muted)] mt-1 uppercase">Labour Efficiency</div>
              </div>

              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <div className="font-mono text-2xl font-extrabold text-[var(--text)]">
                  {product.primaryMetric}
                </div>
                <div className="text-[11px] font-mono text-[var(--text-muted)] mt-1 uppercase">Height / Capacity</div>
              </div>
            </div>
          </div>

          {/* Right Highlights Card */}
          <div className="lg:col-span-5 p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] space-y-4 h-fit shadow-xs">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold border-b border-[var(--border)] pb-3">
              Manufacturing &amp; Engineering Highlights
            </div>
            {[
              'Manufactured 100% in Pune, Maharashtra',
              'PLC-based automated control system',
              'WMS / ERP software integration ready',
              'Photo-electric safety light curtains',
              'TÜV Austria ISO 9001:2015 certified',
              'Custom layout engineering included',
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-[var(--text)]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{point}</span>
              </div>
            ))}

            <div className="pt-3 border-t border-[var(--border)]">
              <Confirm id={`CAD_RENDER_${product.id.toUpperCase()}`} label="3D CAD Assembly & Exploded Diagram" compact />
            </div>
          </div>

        </div>

        {/* ── Technical Specifications Table ── */}
        {product.specs.length > 0 && (
          <div className="space-y-6 border-t border-[var(--border)] pt-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[var(--text)]">Technical Specifications</h2>
                <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
                  Values marked [CONFIRM] require Space Magnum engineering verification per custom order.
                </p>
              </div>
              <Confirm id={`SPEC_SHEET_${product.id.toUpperCase()}`} label="Engineering Spec Sheet" compact />
            </div>

            <div className="rounded-xl overflow-hidden border border-[var(--border)] shadow-xs">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[var(--bg-subtle)] border-b border-[var(--border)] text-[var(--text-muted)] uppercase tracking-wide">
                  <tr>
                    <th className="p-4">Parameter</th>
                    <th className="p-4">Specification</th>
                    <th className="p-4">Verification Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] bg-[var(--bg)] text-[var(--text-secondary)]">
                  {product.specs.map((spec, i) => (
                    <tr key={i} className="hover:bg-[var(--bg-subtle)] transition-colors">
                      <td className="p-4 font-semibold text-[var(--text)]">{spec.label}</td>
                      <td className="p-4 font-bold text-[var(--accent)]">
                        {spec.value} {spec.unit || ''}
                      </td>
                      <td className="p-4 text-[var(--text-muted)]">
                        {spec.isConfirm ? (
                          <Confirm id={`SPEC_${product.id}_${i}`} label="Engineering Value" compact />
                        ) : (
                          'Standard Factory Specification'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* ── Reusable Curated Gallery Strip for this Product Category ── */}
      <GalleryStrip
        title={`${product.name} Verified Installations`}
        subtitle={`Field photography of commissioned ${product.name} units across manufacturing and distribution facilities.`}
        category={galleryCat}
        items={allGalleryItems}
        limit={4}
      />

      {/* ── Product FAQ Accordions with FAQPage Schema ── */}
      {product.faqs.length > 0 && (
        <FaqSection
          title={`${product.name} FAQ`}
          subtitle={`Engineering and operational questions about ${product.name} sizing, delivery, and commissioning.`}
          faqs={product.faqs}
        />
      )}

      {/* ── Bottom Quote CTA Band ── */}
      <div className="bg-[#0B2A4A] dark:bg-[#070D18] text-white py-16 transition-colors">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Ready to Spec {product.name} for Your Facility?
          </h2>
          <p className="text-sm sm:text-base text-[#C9D7E8] max-w-xl mx-auto font-body">
            Our Pune engineering team provides customized layout drawings, floor load calculations, and payback models.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              href={`/get-a-quote?product=${product.id}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-[#C2410C] hover:bg-[#9A3412] text-white font-semibold text-sm shadow-sm transition-colors"
            >
              <span>Request Engineering Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools/calculator"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition-colors"
            >
              <span>Space ROI Calculator</span>
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
