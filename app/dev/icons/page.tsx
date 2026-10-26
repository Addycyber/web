import { notFound } from 'next/navigation'
import {
  Boxes,
  Warehouse,
  PackageSearch,
  ScanBarcode,
  Maximize2,
  Ruler,
  Gauge,
  Target,
  CheckCheck,
  ShieldCheck,
  Workflow,
  Cpu,
  Car,
  Pill,
  FlaskConical,
  Truck,
  Factory,
  Calculator,
  Play,
  Box,
  Download,
  FileText,
  Phone,
  Mail,
  MapPin,
  Sun,
  Moon,
  Menu,
  X,
  ArrowRight,
  Linkedin as SiLinkedin,
} from 'lucide-react'
import {
  SiWhatsapp,
  SiYoutube,
} from '@icons-pack/react-simple-icons'
import {
  VerticalLift,
  MobileCompactor,
  Shuttle,
  StackerCrane,
} from '@/components/icons'

export default function DevIconsPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }

  const iconRegistry = [
    { name: 'STOMAT / High-Density', icon: Boxes },
    { name: 'Warehouse Storage', icon: Warehouse },
    { name: 'VerticalLift (Custom VLM)', icon: VerticalLift },
    { name: 'STORDER / Multi-Axis Storage', icon: PackageSearch },
    { name: 'Scan Barcode', icon: ScanBarcode },
    { name: 'MobileCompactor (Custom)', icon: MobileCompactor },
    { name: 'Shuttle (Custom)', icon: Shuttle },
    { name: 'StackerCrane (Custom)', icon: StackerCrane },
    { name: 'Space Saved (Maximize2)', icon: Maximize2 },
    { name: 'Dimensions (Ruler)', icon: Ruler },
    { name: 'Speed / Velocity (Gauge)', icon: Gauge },
    { name: 'Accuracy (Target)', icon: Target },
    { name: 'Verified (CheckCheck)', icon: CheckCheck },
    { name: 'Safety (ShieldCheck)', icon: ShieldCheck },
    { name: 'Integration (Workflow)', icon: Workflow },
    { name: 'PLC / Automation (Cpu)', icon: Cpu },
    { name: 'Automotive Sector (Car)', icon: Car },
    { name: 'Pharma Sector (Pill)', icon: Pill },
    { name: 'Chemicals (FlaskConical)', icon: FlaskConical },
    { name: 'Logistics / 3PL (Truck)', icon: Truck },
    { name: 'Manufacturing (Factory)', icon: Factory },
    { name: 'ROI Tool (Calculator)', icon: Calculator },
    { name: 'Simulator (Play)', icon: Play },
    { name: '3D Simulation (Box)', icon: Box },
    { name: 'Brochure (Download)', icon: Download },
    { name: 'Spec Sheet (FileText)', icon: FileText },
    { name: 'Phone Call (Phone)', icon: Phone },
    { name: 'Email Inquiry (Mail)', icon: Mail },
    { name: 'Plant Location (MapPin)', icon: MapPin },
    { name: 'Theme Light (Sun)', icon: Sun },
    { name: 'Theme Dark (Moon)', icon: Moon },
    { name: 'Navigation Menu (Menu)', icon: Menu },
    { name: 'Close Dialog (X)', icon: X },
    { name: 'Action Next (ArrowRight)', icon: ArrowRight },
  ]

  const brandIcons = [
    { name: 'WhatsApp Sales Channel', icon: SiWhatsapp },
    { name: 'LinkedIn Company Page', icon: SiLinkedin },
    { name: 'YouTube Video Tours', icon: SiYoutube },
  ]

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-[var(--bg)] text-[var(--text)] transition-colors">
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            Development Tooling
          </span>
          <h1 className="text-3xl font-extrabold mt-1 text-[var(--text)]">
            Icon System & Alignment QA
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Validating 1.75px stroke Lucide icons, Simple Icons brands, and custom industrial equipment SVGs.
          </p>
        </div>

        {/* 1. Icon Grid Inventory */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold border-b border-[var(--border)] pb-2 text-[var(--text)]">
            1. Icon Matrix (Standard 20px / Stroke 1.75)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {iconRegistry.map(({ name, icon: Icon }) => (
              <div
                key={name}
                className="flex flex-col items-center justify-center p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] text-center gap-2"
              >
                <div className="w-9 h-9 rounded-md bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                  <Icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <span className="text-[11px] font-mono text-[var(--text-muted)] line-clamp-1">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Brand Icons */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold border-b border-[var(--border)] pb-2 text-[var(--text)]">
            2. Brand Icons (Simple Icons)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {brandIcons.map(({ name, icon: Icon }) => (
              <div
                key={name}
                className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)]"
              >
                <div className="w-9 h-9 rounded-md bg-[var(--bg-muted)] text-[var(--text)] flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <span className="text-xs font-medium text-[var(--text)]">{name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Optical Alignment Tests */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold border-b border-[var(--border)] pb-2 text-[var(--text)]">
            3. Strict Alignment Tests
          </h2>

          {/* Inline Alignment */}
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-[var(--accent)]">
              Inline with Body Text (inline-flex items-center gap-2)
            </h3>
            <p className="text-base text-[var(--text)]">
              Commissioned with{' '}
              <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--brand)]">
                <ShieldCheck className="w-5 h-5 text-[var(--accent)] shrink-0" strokeWidth={1.75} />
                ISO 9001:2015 TÜV Austria Certification
              </span>{' '}
              guaranteeing continuous operational accuracy.
            </p>
          </div>

          {/* Multi-line Paragraph Alignment */}
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-[var(--accent)]">
              Beside Multi-Line Paragraph (flex items-start gap-3 with h-[1lh])
            </h3>
            <div className="flex items-start gap-3 max-w-xl">
              <div className="h-[1.65rem] flex items-center shrink-0">
                <VerticalLift className="w-5 h-5 text-[var(--accent)]" strokeWidth={1.75} />
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                A brochure-based example of automated material storage and retrieval.
              </p>
            </div>
          </div>

          {/* Feature Card Tile Alignment */}
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-[var(--accent)]">
              Feature Card 44px Tile Alignment
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center mb-3">
                  <MobileCompactor className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <h4 className="text-base font-bold text-[var(--text)]">Dynamic Compaction</h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Eliminates idle aisles by moving shelving blocks on ground-level precision rails.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center mb-3">
                  <Shuttle className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <h4 className="text-base font-bold text-[var(--text)]">Radio Shuttle</h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  High-density multi-deep lane pallet handling without lift trucks entering the rack.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center mb-3">
                  <StackerCrane className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <h4 className="text-base font-bold text-[var(--text)]">High-Bay Crane</h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Reaches up to 30 meters with dual mast stability and full PLC/WMS synchronization.
                </p>
              </div>
            </div>
          </div>

          {/* Button Icon Hover Animation */}
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-[var(--accent)]">
              Primary Button Action (Arrow 2px nudge on hover)
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--accent)] text-white font-semibold text-sm shadow-sm hover:bg-[var(--accent-hover)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
              >
                <span>Request Facility Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform motion-safe:group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--brand)] text-[var(--brand)] font-semibold text-sm hover:bg-[var(--bg-muted)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
              >
                <span>Download Technical Catalog</span>
                <Download className="w-4 h-4 transition-transform motion-safe:group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
