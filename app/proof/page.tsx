import Link from 'next'
import { constructMetadata } from '@/lib/metadata'
import { SITE_CONFIG } from '@/config/site'
import { Confirm } from '@/components/confirm/Confirm'
import { Award, ShieldCheck, Factory, Layers, ArrowRight } from 'lucide-react'

export const metadata = constructMetadata({
  title: 'Engineering & Quality Proof — Space Magnum ASRS',
  description:
    'Inspect Space Magnum quality certifications, TÜV Austria ISO compliance, engineering tolerances, and Pune manufacturing standards.',
  path: '/proof',
})

export default function ProofPage() {
  return (
    <div className="py-16 bg-zinc-950 min-h-screen text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Verifiable Engineering Evidence</span>
          </div>
          <h1 className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tight">
            Engineering & Quality Proof
          </h1>
          <p className="font-sans text-zinc-400 text-lg leading-relaxed">
            Real engineering proof, verified load ratings, and ISO quality management systems. No vague marketing claims.
          </p>
        </div>

        {/* Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <Award className="w-8 h-8 text-amber-400" />
            <h3 className="font-mono text-xl font-bold text-zinc-100">TÜV Austria ISO Certified</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Certified ISO 9001:2015 quality management system covering design, manufacturing, and servicing of storage systems.
            </p>
            <Confirm id="TUV_PDF_DOC" label="TÜV Austria Certificate PDF" compact />
          </div>

          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <h3 className="font-mono text-xl font-bold text-zinc-100">Safety Interlocks & Curtains</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Photo-electric safety light curtains and emergency stop interlocks protect operators at the access bay.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <Factory className="w-8 h-8 text-orange-400" />
            <h3 className="font-mono text-xl font-bold text-zinc-100">In-House Manufacturing</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Precision laser cutting, CNC bending, and robotic welding at our Pune manufacturing facility.
            </p>
            <Confirm id="PLANT_AUDIT_DOC" label="Pune Factory Audit Document" compact />
          </div>

        </div>

      </div>
    </div>
  )
}
