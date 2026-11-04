import fs from 'node:fs'
import path from 'node:path'
import { constructMetadata } from '@/lib/metadata'
import { HeroSlider } from '@/components/home/HeroSlider'
import { ProofStrip } from '@/components/home/ProofStrip'
import { WhatWeSell } from '@/components/home/WhatWeSell'
import { AsrsInMotionSection } from '@/components/home/AsrsInMotionSection'
import { TotalStoreManagement } from '@/components/home/TotalStoreManagement'
import { GalleryStrip } from '@/components/gallery/GalleryStrip'
import { HomeCtaSection } from '@/components/home/HomeCtaSection'
import type { GalleryManifestItem } from '@/scripts/build-gallery'

export const metadata = constructMetadata({
  title: 'Automated Storage & Retrieval Systems (ASRS) Manufacturer Pune India',
  description:
    'Space Magnum Equipments Pvt. Ltd. manufactures automated storage and retrieval systems, vertical carousels, STOLIFT vertical lifts, and mobile compactor shelving in Pune, India.',
})

function getGalleryItems(): GalleryManifestItem[] {
  const manifestPath = path.resolve(process.cwd(), 'content/gallery.manifest.json')
  if (!fs.existsSync(manifestPath)) return []
  return JSON.parse(fs.readFileSync(manifestPath, 'utf-8')) as GalleryManifestItem[]
}

export default function HomePage() {
  const galleryItems = getGalleryItems()

  return (
    <div className="flex w-full flex-col overflow-x-clip bg-[var(--bg)] text-[var(--text)]">
      {/* 1. Hero (100svh, full-bleed cinematic slider) */}
      <HeroSlider />

      {/* 2. Proof strip (Single full-width row with 4 brochure-sourced figures) */}
      <ProofStrip />

      {/* 3. What we sell (Product showcase with 6 cards and rhythmic sizing) */}
      <WhatWeSell />

      {/* 4. ASRS in motion (Full-bleed dark section with Anatomy figure and 3 callouts) */}
      <AsrsInMotionSection />

      {/* 5. Total Store Management (data-sourced sticky horizontal timeline) */}
      <TotalStoreManagement />

      {/* Gallery & videos (Mixed grid with real WebP video posters and photography) */}
      <GalleryStrip
        title="Gallery & Plant Demonstrations"
        subtitle="Operational photographs and video captures from Pune installations."
        items={galleryItems}
        limit={8}
      />

      {/* 7. Closing CTA (Full-bleed photo, bold proposition, direct contact details) */}
      <HomeCtaSection />
    </div>
  )
}
