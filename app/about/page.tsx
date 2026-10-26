import fs from 'node:fs'
import path from 'node:path'
import { constructMetadata } from '@/lib/metadata'
import { company } from '@/lib/company'
import { Factory, MapPin } from 'lucide-react'
import { GalleryStrip } from '@/components/gallery/GalleryStrip'
import type { GalleryManifestItem } from '@/scripts/build-gallery'

export const metadata = constructMetadata({
  title: 'About Space Magnum Equipments Pvt. Ltd.',
  description: company.about,
  path: '/about',
})

function getGalleryItems(): GalleryManifestItem[] {
  const manifestPath = path.resolve(process.cwd(), 'content/gallery.manifest.json')
  if (!fs.existsSync(manifestPath)) return []
  return JSON.parse(fs.readFileSync(manifestPath, 'utf-8')) as GalleryManifestItem[]
}

export default function AboutPage() {
  const galleryItems = getGalleryItems()

  return (
    <div className="min-h-screen bg-[var(--bg)] py-12 text-[var(--text)] transition-colors md:py-16">
      <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            <Factory className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Company background</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-5xl">
            About {company.name}
          </h1>
          <p className="font-body text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {company.about}
          </p>
        </div>

        <section className="grid items-start gap-10 border-t border-[var(--border)] pt-8 lg:grid-cols-12">
          <div className="space-y-4 font-body text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base lg:col-span-7">
            <h2 className="text-2xl font-bold text-[var(--text)]">Company information</h2>
            <p>Founded {company.founded}.</p>
            <p>{company.about}</p>
          </div>
          <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6 shadow-xs lg:col-span-5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              Locations listed in the brochure
            </h3>
            <div className="space-y-3 text-xs text-[var(--text)]">
              <div className="flex items-start gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                <span>{company.unit1}</span>
              </div>
              <div className="flex items-start gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                <span>Plant II: {company.unit2}</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-16">
        <GalleryStrip
          title="Company gallery"
          items={galleryItems}
          category="facility"
          limit={4}
        />
      </div>
    </div>
  )
}
