import fs from 'node:fs'
import path from 'node:path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { constructMetadata } from '@/lib/metadata'
import { INDUSTRIES_MAP, IndustryId } from '@/config/industries'
import { Confirm } from '@/components/confirm/Confirm'
import { ArrowRight, CheckCircle2, Calculator, Factory, ShieldCheck } from 'lucide-react'
import { FaqSection } from '@/components/features/FaqSection'
import { GalleryStrip } from '@/components/gallery/GalleryStrip'
import type { GalleryManifestItem } from '@/scripts/build-gallery'

interface IndustryPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return [
    { id: 'automotive' },
    { id: 'pharma' },
    { id: 'chemicals' },
    { id: '3pl' },
    { id: 'manufacturing' },
  ]
}

export async function generateMetadata({ params }: IndustryPageProps) {
  const { id } = await params
  const industry = INDUSTRIES_MAP[id as IndustryId]

  if (!industry) {
    return constructMetadata({ title: 'Industry Not Found', description: 'Industry not found' })
  }

  return constructMetadata({
    title: `${industry.name} ASRS Solutions — Space Magnum`,
    description: industry.description,
    path: `/industries/${industry.id}`,
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

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const { id } = await params
  const industry = INDUSTRIES_MAP[id as IndustryId]

  if (!industry) {
    notFound()
  }

  const allGalleryItems = getGalleryItems()

  const industryFaqs = [
    {
      question: `How does Space Magnum ASRS adhere to ${industry.name} requirements?`,
      answer: `Our systems incorporate industry-certified tray divisions, weight monitoring, and custom PLC logic designed specifically for ${industry.name} workflows.`,
    },
    {
      question: 'What is the typical deployment timeline for a facility commissioning?',
      answer:
        'Standard unit engineering and manufacturing takes between 6 to 12 weeks, followed by on-site mechanical erection and commissioning at your facility.',
    },
    {
      question: 'Can these storage systems interface directly with our ERP or WMS?',
      answer:
        'Yes. Space Magnum controllers support standard industrial Ethernet protocols and direct API connectors for SAP, Oracle, and proprietary warehouse systems.',
    },
  ]

  return (
    <div className="py-12 md:py-16 bg-[var(--bg)] text-[var(--text)] min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumb */}
        <div className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-2">
          <Link href="/" className="hover:text-[var(--text)] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[var(--accent)] font-bold">{industry.name}</span>
        </div>

        {/* Hero */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider">
            <Factory className="w-3.5 h-3.5" />
            <span>{industry.tagline}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text)]">
            {industry.name} Automated Storage
          </h1>

          <p className="text-lg sm:text-xl text-[var(--accent)] font-semibold">
            &ldquo;{industry.headline}&rdquo;
          </p>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-body">
            {industry.description}
          </p>
        </div>

        {/* Pain Points Solved */}
        <div className="space-y-6 pt-8 border-t border-[var(--border)]">
          <h2 className="text-2xl font-bold text-[var(--text)]">
            Storage &amp; Operational Challenges We Eliminate
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industry.painPoints.map((point, i) => (
              <div key={i} className="p-5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] flex items-start gap-3 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[var(--text)] leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Solution Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border)] space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-[var(--accent)] font-bold">
                Recommended ASRS Configuration
              </span>
              <h3 className="text-2xl font-bold text-[var(--text)]">
                {industry.recommendedProduct}
              </h3>
            </div>

            <Link
              href={`/get-a-quote?industry=${industry.id}`}
              className="px-6 py-3.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold text-sm shrink-0 flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <span>Get Quote for {industry.shortName}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
            <Link
              href={`/tools/calculator?industry=${industry.id}`}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              <Calculator className="w-4 h-4" />
              <span>Launch Calculator with Preset for {industry.shortName} ({industry.calculatorPreset.suggestedFloorArea} sq.ft) &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Regulatory & Compliance Notes */}
        {industry.complianceNotes.length > 0 && (
          <div className="space-y-4 pt-8 border-t border-[var(--border)]">
            <h3 className="text-xl font-bold text-[var(--text)] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[var(--accent)]" />
              <span>Regulatory &amp; Compliance Considerations</span>
            </h3>
            <div className="space-y-3">
              {industry.complianceNotes.map((note, i) => (
                <div key={i} className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--text)]">
                  <span>{note.note}</span>
                  {note.isConfirm && <Confirm id={`COMPLIANCE_${industry.id}_${i}`} label="Regulatory Approval" compact />}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── Related Gallery Strip ── */}
      <div className="mt-16">
        <GalleryStrip
          title={`${industry.name} Field Proof`}
          subtitle={`Commissioned storage systems engineered for ${industry.name} facilities.`}
          items={allGalleryItems}
          limit={4}
        />
      </div>

      {/* ── Industry FAQ with Schema ── */}
      <FaqSection
        title={`${industry.name} Storage FAQ`}
        subtitle={`Frequently asked operational questions regarding ${industry.name} ASRS commissioning.`}
        faqs={industryFaqs}
      />
    </div>
  )
}
