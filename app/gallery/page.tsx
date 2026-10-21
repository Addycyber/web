import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import type { GalleryManifestItem } from '@/scripts/build-gallery'
import { constructMetadata } from '@/lib/metadata'
import { Suspense } from 'react'

export const metadata: Metadata = constructMetadata({
  title: 'Installation Gallery | Industrial Storage & ASRS Systems',
  description:
    'Explore photography and video of Space Magnum ASRS installations across India, including STOMAT, STOLIFT, STORDER, heavy-duty mobile compactors, and factory facilities.',
})

function getGalleryManifest(): GalleryManifestItem[] {
  try {
    const manifestPath = path.resolve(process.cwd(), 'content/gallery.manifest.json')
    if (fs.existsSync(manifestPath)) {
      const raw = fs.readFileSync(manifestPath, 'utf-8')
      return JSON.parse(raw)
    }
  } catch (err) {
    console.error('Failed to load gallery manifest:', err)
  }
  return []
}

export default function GalleryPage() {
  const items = getGalleryManifest()

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-150 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-mono font-semibold uppercase tracking-wider mb-4 border border-[var(--border)]">
            Verified Plant Photography
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--text)] mb-4">
            Industrial Systems in Action
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-body">
            Browse our archive of commissioned automated vertical lift modules, order picking carousels, heavy-duty compactors, and Pune manufacturing facility photos.
          </p>
        </div>

        {/* Gallery Grid wrapped in Suspense for useSearchParams */}
        <Suspense fallback={<div className="py-20 text-center font-mono text-sm text-[var(--text-muted)]">Loading installation gallery...</div>}>
          <GalleryGrid items={items} />
        </Suspense>

      </div>
    </div>
  )
}
