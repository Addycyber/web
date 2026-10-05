import { notFound } from 'next/navigation'
import Link from 'next/link'
import { constructMetadata } from '@/lib/metadata'
import { INDUSTRIES_MAP, IndustryId } from '@/config/industries'
import { Confirm } from '@/components/confirm/Confirm'
import { ArrowRight, CheckCircle2, ShieldAlert, Calculator, Factory } from 'lucide-react'

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

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const { id } = await params
  const industry = INDUSTRIES_MAP[id as IndustryId]

  if (!industry) {
    notFound()
  }

  return (
    <div className="py-16 bg-zinc-950 text-zinc-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumb */}
        <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
          <Link href="/" className="hover:text-zinc-300">Home</Link>
          <span>/</span>
          <span className="text-orange-400 font-bold">{industry.name}</span>
        </div>

        {/* Hero */}
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs font-bold uppercase tracking-wider">
            <span>{industry.tagline}</span>
          </div>

          <h1 className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tight">
            {industry.name} Automated Storage
          </h1>

          <p className="font-sans text-xl text-orange-300 font-medium">
            "{industry.headline}"
          </p>

          <p className="font-sans text-zinc-400 text-base sm:text-lg leading-relaxed">
            {industry.description}
          </p>
        </div>

        {/* Pain Points Solved */}
        <div className="space-y-6 pt-10 border-t border-zinc-900">
          <h2 className="font-mono text-2xl font-bold text-zinc-100">
            Storage & Operational Challenges We Eliminate
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industry.painPoints.map((point, i) => (
              <div key={i} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs font-sans text-zinc-300 leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Solution Card */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-orange-400 font-bold">
                Recommended ASRS Configuration
              </span>
              <h3 className="font-mono text-2xl font-bold text-zinc-100">
                {industry.recommendedProduct}
              </h3>
            </div>

            <Link
              href={`/get-a-quote?industry=${industry.id}`}
              className="px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-zinc-950 font-mono text-xs font-bold shrink-0 flex items-center justify-center gap-2"
            >
              <span>Get Quote for {industry.shortName}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
            <Link
              href={`/tools/calculator?industry=${industry.id}`}
              className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 hover:underline"
            >
              <Calculator className="w-4 h-4" />
              <span>Launch Calculator with Preset for {industry.shortName} ({industry.calculatorPreset.suggestedFloorArea} sq.ft) &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Compliance Notes */}
        {industry.complianceNotes.length > 0 && (
          <div className="space-y-4 pt-10 border-t border-zinc-900">
            <h3 className="font-mono text-xl font-bold text-zinc-100">
              Regulatory & Compliance Considerations
            </h3>
            <div className="space-y-3">
              {industry.complianceNotes.map((note, i) => (
                <div key={i} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-300">
                  <span>{note.note}</span>
                  {note.isConfirm && <Confirm id={`COMPLIANCE_${industry.id}_${i}`} label="Regulatory Approval" compact />}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
