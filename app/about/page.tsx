import Link from 'next'
import { constructMetadata } from '@/lib/metadata'
import { SITE_CONFIG } from '@/config/site'
import { Confirm } from '@/components/confirm/Confirm'
import { Factory, ShieldCheck, Award, Users, MapPin } from 'lucide-react'

export const metadata = constructMetadata({
  title: 'About Space Magnum Equipments Pvt. Ltd. — Pune ASRS Manufacturer',
  description:
    'Space Magnum Equipments is a leading Pune, India manufacturer of STOMAT vertical carousels, STOLIFT VLMs, and automated industrial storage systems.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <div className="py-16 bg-zinc-950 min-h-screen text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs font-bold uppercase tracking-wider">
            <span>Pune, India Manufacturing Excellence</span>
          </div>
          <h1 className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tight">
            About {SITE_CONFIG.legalName}
          </h1>
          <p className="font-sans text-zinc-400 text-lg leading-relaxed">
            {SITE_CONFIG.tagline}
          </p>
        </div>

        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 border-t border-zinc-900">
          <div className="lg:col-span-7 space-y-4 text-zinc-300 text-sm leading-relaxed">
            <h2 className="font-mono text-2xl font-bold text-zinc-100">Our Story & Mission</h2>
            <p>
              Founded and operating out of Pune, Maharashtra, Space Magnum Equipments Pvt. Ltd. specializes in the design, engineering, fabrication, and commissioning of automated storage and retrieval systems (ASRS) and heavy-duty industrial storage equipment.
            </p>
            <p>
              We bridge the gap between expensive global automation imports and raw manual storage by offering global-grade PLC control logic, high-precision vertical lift modules, and local Indian manufacturing responsiveness.
            </p>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <h3 className="font-mono text-xs font-bold text-orange-400 uppercase tracking-wider">
              Facility & Quality Badges
            </h3>

            <div className="space-y-3 font-mono text-xs text-zinc-300">
              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                <span>Location:</span>
                <span className="text-zinc-100 font-bold">{SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                <span>Quality Management:</span>
                <span className="text-amber-400 font-bold">ISO 9001:2015</span>
              </div>
            </div>

            <Confirm id="ABOUT_FACILITY_PHOTOS" label="Pune Plant Photography & Plant Area" compact />
          </div>
        </div>

      </div>
    </div>
  )
}
