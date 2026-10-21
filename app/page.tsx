import fs from 'node:fs'
import path from 'node:path'
import { constructMetadata } from '@/lib/metadata'
import { Hero } from '@/components/home/Hero'
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
    'Space Magnum Equipments manufactures STOMAT Vertical Lift Modules, STOLIFT Carousels, STORDER Picking Systems & Industrial Compactors in Pune, India. Reclaim up to 85% floor space.',
})

function getGalleryItems(): GalleryManifestItem[] {
  try {
    const manifestPath = path.resolve(process.cwd(), 'content/gallery.manifest.json')
    if (fs.existsSync(manifestPath)) {
      return JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
    }
  } catch (e) {
    // ignore
  }
  return []
}

const HOME_FAQS = [
  {
    question: 'How much warehouse floor space can an ASRS system reclaim?',
    answer:
      'By utilizing vertical clear ceiling height up to 14 to 16 meters and compressing shelving depth, Space Magnum STOMAT and STOLIFT systems typically reclaim 70% to 85% of static shelving floor footprint.',
  },
  {
    question: 'Where are Space Magnum storage systems designed and manufactured?',
    answer:
      'All structural fabrication, mechanical drive assembly, electrical control panels, and PLC automation logic are engineered in-house at Space Magnum manufacturing plants in Pune, Maharashtra, India.',
  },
  {
    question: 'Can Space Magnum ASRS integrate with existing ERP / WMS software?',
    answer:
      'Yes. Our controller systems support standard industrial protocols and bi-directional API interfaces with SAP, Oracle, Microsoft Dynamics, and custom warehouse management systems.',
  },
  {
    question: 'What safety systems protect operators during tray extraction?',
    answer:
      'All operator access windows are equipped with certified photoelectric light curtains, mechanical perimeter interlocks, automatic door locks, and overload weight sensors.',
  },
]

export default function HomePage() {
  const galleryItems = getGalleryItems()

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Proof & Facility Strip */}
      <ProofStrip />

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

      {/* 7. Plant Proof Gallery Strip (Priority 1 Feature) */}
      <GalleryStrip
        title="Verified Plant Installations"
        subtitle="Commissioned automated vertical carousels, mobile compactors, and high-density racking across India."
        items={galleryItems}
        limit={4}
      />

      {/* 8. Interactive 3D Simulator Teaser */}
      <SimulatorTeaser />

      {/* 9. Operational FAQ Accordions (Priority 1 Feature) */}
      <FaqSection
        title="Frequently Asked Questions"
        subtitle="Common engineering questions about ASRS installation requirements, lead times, and space calculations."
        faqs={HOME_FAQS}
      />

      {/* 10. Final Call to Action Band (Single deep-navy band) */}
      <HomeCtaSection />
    </div>
  )
}
