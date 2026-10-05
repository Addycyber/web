import { constructMetadata } from '@/lib/metadata'
import { Hero } from '@/components/home/Hero'
import { ProofStrip } from '@/components/home/ProofStrip'
import { ReclaimFloorSection } from '@/components/home/ReclaimFloorSection'
import { ProductGateway } from '@/components/home/ProductGateway'
import { IndustrySelector } from '@/components/home/IndustrySelector'
import { SimulatorTeaser } from '@/components/home/SimulatorTeaser'
import { HomeCtaSection } from '@/components/home/HomeCtaSection'

export const metadata = constructMetadata({
  title: 'Automated Storage & Retrieval Systems (ASRS) Manufacturer Pune India',
  description:
    'Space Magnum Equipments manufactures STOMAT Vertical Lift Modules, STOLIFT Carousels, STORDER Stacker Cranes & Industrial Compactors in Pune, India. Reclaim 85% floor space.',
})

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <Hero />
      <ProofStrip />
      <ReclaimFloorSection />
      <ProductGateway />
      <IndustrySelector />
      <SimulatorTeaser />
      <HomeCtaSection />
    </div>
  )
}
