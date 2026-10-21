import { constructMetadata } from '@/lib/metadata'
import { Confirm } from '@/components/confirm/Confirm'
import { Award, ShieldCheck, Factory } from 'lucide-react'

export const metadata = constructMetadata({
  title: 'Engineering & Quality Proof — Space Magnum ASRS',
  description:
    'Inspect Space Magnum quality certifications, TÜV Austria ISO compliance, engineering tolerances, and Pune manufacturing standards.',
  path: '/proof',
})

export default function ProofPage() {
  return (
    <div className="py-12 md:py-16 bg-[var(--bg)] min-h-screen text-[var(--text)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Verifiable Engineering Evidence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text)]">
            Engineering &amp; Quality Proof
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-body">
            Real engineering proof, verified load ratings, and ISO quality management systems. No fabricated or unverified claims.
          </p>
        </div>

        {/* Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border)] space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text)]">TÜV Austria ISO Certified</h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-body">
              Certified ISO 9001:2015 quality management system covering design, manufacturing, and servicing of storage systems.
            </p>
            <div className="pt-2">
              <Confirm id="C-TUV-PDF-DOC" label="TÜV Austria Certificate PDF [CONFIRM]" compact />
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border)] space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text)]">Safety Interlocks &amp; Curtains</h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-body">
              Photoelectric safety light curtains and emergency stop interlocks protect operators at the access bay.
            </p>
            <div className="pt-2">
              <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                Standard on all STOMAT &amp; STOLIFT units
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border)] space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
              <Factory className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text)]">In-House Manufacturing</h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-body">
              Precision laser cutting, CNC bending, and robotic welding at our Pune manufacturing facility.
            </p>
            <div className="pt-2">
              <Confirm id="C-PLANT-AUDIT-DOC" label="Pune Factory Audit Document [CONFIRM]" compact />
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
