import fs from 'node:fs'
import path from 'node:path'
import { constructMetadata } from '@/lib/metadata'
import { SITE_CONFIG } from '@/config/site'
import { Confirm } from '@/components/confirm/Confirm'
import { Award, Factory, ShieldCheck, MapPin } from 'lucide-react'
import { GalleryStrip } from '@/components/gallery/GalleryStrip'
import type { GalleryManifestItem } from '@/scripts/build-gallery'

export const metadata = constructMetadata({
  title: 'About Space Magnum Equipments Pvt. Ltd. — Pune ASRS Manufacturer',
  description:
    'Space Magnum Equipments is a leading Pune, India manufacturer of STOMAT vertical carousels, STOLIFT VLMs, and automated industrial storage systems.',
  path: '/about',
})

function getGalleryItems(): GalleryManifestItem[] {
  try {
    const manifestPath = path.resolve(process.cwd(), 'content/gallery.manifest.json')
    if (fs.existsSync(manifestPath)) {
      return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
    }
  } catch (e) {}
  return []
}

export default function AboutPage() {
  const allGalleryItems = getGalleryItems()

  return (
    <div className="py-12 md:py-16 bg-[var(--bg)] min-h-screen text-[var(--text)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider">
            <Factory className="w-3.5 h-3.5" />
            <span>Pune, India Manufacturing Excellence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text)]">
            About {SITE_CONFIG.legalName}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-body">
            {SITE_CONFIG.tagline}
          </p>
        </div>

        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8 border-t border-[var(--border)]">
          <div className="lg:col-span-7 space-y-4 text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed font-body">
            <h2 className="text-2xl font-bold text-[var(--text)]">Our Mission &amp; Engineering Focus</h2>
            <p>
              Operating out of Pune, Maharashtra, Space Magnum Equipments Pvt. Ltd. specializes in the design, engineering, fabrication, and commissioning of automated storage and retrieval systems (ASRS) and heavy-duty industrial storage equipment.
            </p>
            <p>
              We bridge the gap between expensive foreign automation imports and manual shelving by delivering global-grade PLC control architecture, high-precision vertical lift modules, and local Indian engineering responsiveness.
            </p>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border)] space-y-4 shadow-xs">
            <h3 className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
              Facility &amp; Quality Credentials
            </h3>

            <div className="space-y-3 font-mono text-xs text-[var(--text)]">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                  Headquarters:
                </span>
                <span className="font-bold text-[var(--text)]">{SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  Quality Certification:
                </span>
                <span className="text-[var(--text)] font-bold">ISO 9001:2015 (TÜV Austria)</span>
              </div>
            </div>

            <Confirm id="C-ABOUT-FOUNDING-YEAR" label="Founding Year & Plant Area [CONFIRM]" compact />
          </div>
        </div>

      </div>

      {/* ── Facility Plant Gallery Strip ── */}
      <div className="mt-16">
        <GalleryStrip
          title="Pune Manufacturing Facility & Machine Tooling"
          subtitle="A look inside Space Magnum fabrication facilities, CNC machinery, and powder coating lines in Pune."
          category="facility"
          items={allGalleryItems}
          limit={4}
        />
      </div>
    </div>
  )
}
