import fs from 'node:fs'
import path from 'node:path'
import { constructMetadata } from '@/lib/metadata'
import { AsrsHero } from '@/components/home/AsrsHero'
import { ProofStrip } from '@/components/home/ProofStrip'
import { ReclaimFloorSection } from '@/components/home/ReclaimFloorSection'
import { ProductGateway } from '@/components/home/ProductGateway'
import { ProductComparisonTable } from '@/components/features/ProductComparisonTable'
import { IndustrySelector } from '@/components/home/IndustrySelector'
import { CustomerLogos } from '@/components/home/CustomerLogos'
import { GalleryStrip } from '@/components/gallery/GalleryStrip'
import { FaqSection } from '@/components/features/FaqSection'
import { SimulatorTeaser } from '@/components/home/SimulatorTeaser'
import { HomeCtaSection } from '@/components/home/HomeCtaSection'
import type { GalleryManifestItem } from '@/scripts/build-gallery'

export const metadata = constructMetadata({
  title: 'Automated Storage & Retrieval Systems (ASRS) Manufacturer Pune India',
  description:
    'Space Magnum Equipments designs automated storage and retrieval systems, tray-based STOLIFT storage, and industrial mobile shelving in Pune, India.',
})

function getGalleryItems(): GalleryManifestItem[] {
  const manifestPath = path.resolve(process.cwd(), 'content/gallery.manifest.json')
  if (!fs.existsSync(manifestPath)) return []
  return JSON.parse(fs.readFileSync(manifestPath, 'utf-8')) as GalleryManifestItem[]
}

const HOME_FAQS = [
  {
    question: 'How does STOLIFT retrieve a stored tray?',
    answer:
      'The PLC-controlled retrieval platform travels to the selected storage location, retrieves the carrier tray, and brings it to the operating window.',
  },
  {
    question: 'What is STORDER?',
    answer:
      'STORDER is a modular multi-axis storage and retrieval system using X, Y, and Z movement.',
  },
  {
    question: 'What can STOMAT store?',
    answer:
      'The brochure lists office files, documents, machined components, electronic parts, CDs and cassettes, medicines, tools, hardware, and components.',
  },
]

export default function HomePage() {
  const galleryItems = getGalleryItems()

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. Hero */}
      <AsrsHero />

      {/* 2. Product proof */}
      <ProofStrip items={galleryItems} />

      {/* 3. Products Architecture */}
      <ProductGateway />

      {/* 4. Floor Space Savings with Before/After Slider */}
      <ReclaimFloorSection />

      {/* 5. Product Comparison Matrix (Priority 1 Feature) */}
      <ProductComparisonTable />

      {/* 6. Industry Applications */}
      <IndustrySelector />

      {/* Customer logo wall (hidden publicly until the approval threshold is met) */}
      <CustomerLogos />

      {/* 7. Company gallery */}
      <GalleryStrip
        title="Company gallery"
        items={galleryItems}
        limit={4}
      />

      {/* 8. Interactive 3D Simulator Teaser */}
      <SimulatorTeaser />

      {/* 9. Operational FAQ Accordions (Priority 1 Feature) */}
      <FaqSection
        title="Frequently Asked Questions"
        subtitle="Answers based on the company brochure."
        faqs={HOME_FAQS}
      />

      {/* 10. Final Call to Action Band (Single deep-navy band) */}
      <HomeCtaSection />
    </div>
  )
}
