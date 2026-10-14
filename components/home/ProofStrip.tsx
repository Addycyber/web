'use client'

import Image from 'next/image'
import { ShieldCheck, Award, Factory, Users } from 'lucide-react'

const FACILITY_PHOTOS = [
  '/images/facility/facility-1.jpg',
  '/images/facility/facility-2.jpg',
  '/images/facility/facility-3.jpg',
  '/images/facility/facility-4.jpg',
  '/images/facility/facility-5.jpg',
]

const STATS = [
  {
    icon: Award,
    iconColor: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    title: 'ISO 9001:2015',
    subtitle: 'TÜV Austria Certified',
  },
  {
    icon: Factory,
    iconColor: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    title: 'Pune Plant',
    subtitle: 'In-House Manufacturing',
  },
  {
    icon: ShieldCheck,
    iconColor: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    title: 'Safety Interlocks',
    subtitle: 'Photo-electric Light Curtains',
  },
  {
    icon: Users,
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    title: '100+ Clients',
    subtitle: 'Across Indian Industry',
  },
]

export function ProofStrip() {
  return (
    <section className="py-0 bg-[#0A0D14] border-b border-white/5 overflow-hidden">

      {/* Facility Photo Strip */}
      <div className="flex h-40 sm:h-48 overflow-hidden">
        {FACILITY_PHOTOS.map((src, i) => (
          <div key={i} className="flex-1 relative overflow-hidden">
            <Image
              src={src}
              alt={`Space Magnum facility ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 20vw"
            />
            <div className="absolute inset-0 bg-[#0A0D14]/40 hover:bg-[#0A0D14]/20 transition-colors duration-500" />
          </div>
        ))}
        {/* Left edge fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0A0D14] to-transparent pointer-events-none z-10" />
        {/* Right edge fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0A0D14] to-transparent pointer-events-none z-10" />
      </div>

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.title}
                className={`flex items-center gap-4 p-4 rounded-xl border ${stat.bgColor} ${stat.borderColor}`}
              >
                <div className={`p-2.5 rounded-lg bg-[#0A0D14]/50 flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div>
                  <div className="text-sm font-heading font-bold text-white">{stat.title}</div>
                  <div className="text-xs text-[#8A9BB5] font-body mt-0.5">{stat.subtitle}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
