import Link from 'next/link'
import { Boxes, Calculator, Image as ImageIcon, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[var(--bg)] text-[var(--text)] transition-colors">
      <div className="max-w-xl text-center space-y-6">
        <div className="inline-block px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider">
          404 Error — Page Not Found
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text)]">
          Storage Coordinate Unlocated
        </h1>

        <p className="text-base text-[var(--text-secondary)] leading-relaxed">
          The warehouse rack position or page you requested does not exist or has been relocated in our storage system.
        </p>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-left">
          <Link
            href="/products"
            className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] hover:border-[var(--accent)] transition-all group"
          >
            <Boxes className="w-5 h-5 text-[var(--accent)] mb-2" />
            <div className="font-bold text-sm text-[var(--text)]">ASRS Products</div>
            <div className="text-xs text-[var(--text-muted)] mt-0.5">Explore STOMAT & VLMs</div>
          </Link>

          <Link
            href="/tools/calculator"
            className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] hover:border-[var(--accent)] transition-all group"
          >
            <Calculator className="w-5 h-5 text-[var(--accent)] mb-2" />
            <div className="font-bold text-sm text-[var(--text)]">ROI Calculator</div>
            <div className="text-xs text-[var(--text-muted)] mt-0.5">Calculate space savings</div>
          </Link>

          <Link
            href="/gallery"
            className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] hover:border-[var(--accent)] transition-all group"
          >
            <ImageIcon className="w-5 h-5 text-[var(--accent)] mb-2" />
            <div className="font-bold text-sm text-[var(--text)]">Plant Gallery</div>
            <div className="text-xs text-[var(--text-muted)] mt-0.5">Real installations</div>
          </Link>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-all shadow-sm"
          >
            <span>Return to Home</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
