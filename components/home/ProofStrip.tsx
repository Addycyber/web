'use client'

import * as React from 'react'
import Image from 'next/image'
import { ShieldCheck, Award, Factory, Users } from 'lucide-react'
import { ConfirmInline } from '@/components/confirm/Confirm'

const FACILITY_PHOTOS = [
  '/gallery/img_facility_1_960w.webp',
  '/gallery/img_asrs_4_960w.webp',
  '/gallery/img_compactors_17_960w.webp',
  '/gallery/img_stolift_14_960w.webp',
  '/gallery/img_facility_2_960w.webp',
]

const STATS = [
  {
    icon: Award,
    title: 'ISO 9001:2015',
    subtitle: 'TÜV Austria Certified',
  },
  {
    icon: Factory,
    title: 'Pune Plant',
    subtitle: 'In-House Fabrication',
  },
  {
    icon: ShieldCheck,
    title: 'Safety Interlocks',
    subtitle: 'Photoelectric Light Curtains',
  },
  {
    icon: Users,
    title: 'Commissioned Installs',
    subtitle: 'Across Indian Industry [CONFIRM]',
  },
]

export function ProofStrip() {
  return (
    <section className="bg-[var(--bg-subtle)] border-b border-[var(--border)] overflow-hidden transition-colors">

      {/* Facility Photo Strip */}
      <div className="flex h-36 sm:h-44 overflow-hidden border-b border-[var(--border)]">
        {FACILITY_PHOTOS.map((src, i) => (
          <div key={i} className="flex-1 relative overflow-hidden bg-[var(--bg-muted)]">
            <Image
              src={src}
              alt={`Space Magnum Pune manufacturing facility photo ${i + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 20vw"
            />
          </div>
        ))}
      </div>

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(stat => {
            const Icon = stat.icon

            return (
              <div
                key={stat.title}
                className="flex items-center gap-3.5 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="text-sm font-bold text-[var(--text)]">{stat.title}</div>
                  <div className="text-xs text-[var(--text-muted)] mt-0.5">
                    {stat.subtitle.includes('[CONFIRM]') ? (
                      <ConfirmInline id="C-PROOF-CLIENTS" label={stat.subtitle} fallback="Verified Industrial Installations" />
                    ) : (
                      stat.subtitle
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
