'use client'

import * as React from 'react'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { ConfirmInline } from '@/components/confirm/Confirm'

interface ProductSpec {
  feature: string
  stomat: string
  stolift: string
  storder: string
  compactors: string
}

const COMPARISON_DATA: ProductSpec[] = [
  {
    feature: 'System Type',
    stomat: 'Vertical Carousel / ASRS',
    stolift: 'Vertical Lift Module (VLM)',
    storder: 'Horizontal Carousel / Picking',
    compactors: 'High-Density Mobile Racking',
  },
  {
    feature: 'Floor Space Saved',
    stomat: 'Up to 85%',
    stolift: 'Up to 85%',
    storder: 'Up to 60%',
    compactors: 'Up to 50%',
  },
  {
    feature: 'Operating Principle',
    stomat: 'Goods-to-Person (Vertical)',
    stolift: 'Goods-to-Person (Dual Tower)',
    storder: 'Goods-to-Person (Batch Pick)',
    compactors: 'Movable Shelving Aisles',
  },
  {
    feature: 'Max Height Reach',
    stomat: 'Up to 14 meters',
    stolift: 'Up to 16 meters [CONFIRM]',
    storder: 'Up to 6 meters',
    compactors: 'Up to 4.5 meters',
  },
  {
    feature: 'Tray / Shelf Capacity',
    stomat: '250 kg – 500 kg per shelf',
    stolift: 'Up to 1,000 kg per tray [CONFIRM]',
    storder: '100 kg – 350 kg per bin',
    compactors: '500 kg – 5,000 kg per bay',
  },
  {
    feature: 'Retrieval Speed',
    stomat: '15 – 25 seconds',
    stolift: '18 – 30 seconds [CONFIRM]',
    storder: '10 – 15 seconds',
    compactors: 'Manual / Push-button aisle shift',
  },
  {
    feature: 'WMS / ERP Integration',
    stomat: 'SAP, Oracle, Custom API',
    stolift: 'SAP, Oracle, Custom API',
    storder: 'Full Pick-to-Light integration',
    compactors: 'Optional PLC / Lockout System',
  },
  {
    feature: 'Ideal Application',
    stomat: 'Tooling, spare parts, dies',
    stolift: 'Heavy parts, mixed tray sizes',
    storder: 'High-velocity order fulfillment',
    compactors: 'Archives, bulk spares, raw coils',
  },
]

export function ProductComparisonTable() {
  return (
    <section className="py-16 md:py-24 bg-[var(--bg)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-wider mb-3">
            System Comparison
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--text)] tracking-tight">
            Choosing the Right Storage Architecture
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2 leading-relaxed">
            Compare key parameters across Space Magnum product lines to match your facility footprint, payload, and picking velocity requirements.
          </p>
        </div>

        {/* Desktop Sticky Table View */}
        <div className="hidden md:block overflow-x-auto rounded-2xl border border-[var(--border)] shadow-sm bg-[var(--bg-subtle)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--bg)] sticky top-20 z-20">
                <th className="p-4 pl-6 text-xs font-mono font-bold uppercase text-[var(--text-muted)] w-1/4">
                  Feature / Parameter
                </th>
                <th className="p-4 text-sm font-bold text-[var(--text)]">
                  <div>STOMAT</div>
                  <span className="text-[11px] font-normal text-[var(--text-muted)] font-mono">Vertical Carousel</span>
                </th>
                <th className="p-4 text-sm font-bold text-[var(--text)]">
                  <div>STOLIFT</div>
                  <span className="text-[11px] font-normal text-[var(--text-muted)] font-mono">Vertical Lift Module</span>
                </th>
                <th className="p-4 text-sm font-bold text-[var(--text)]">
                  <div>STORDER</div>
                  <span className="text-[11px] font-normal text-[var(--text-muted)] font-mono">Order Carousel</span>
                </th>
                <th className="p-4 pr-6 text-sm font-bold text-[var(--text)]">
                  <div>Compactors</div>
                  <span className="text-[11px] font-normal text-[var(--text-muted)] font-mono">Mobile Racking</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-sm">
              {COMPARISON_DATA.map((row, idx) => (
                <tr
                  key={row.feature}
                  className={idx % 2 === 0 ? 'bg-[var(--bg)]' : 'bg-[var(--bg-subtle)]'}
                >
                  <td className="p-4 pl-6 font-semibold text-[var(--text)] text-xs font-mono">
                    {row.feature}
                  </td>
                  <td className="p-4 text-[var(--text-secondary)]">
                    {row.stomat.includes('[CONFIRM]') ? (
                      <ConfirmInline id={`C-SPEC-${idx}-1`} label={row.stomat} fallback={row.stomat} />
                    ) : (
                      row.stomat
                    )}
                  </td>
                  <td className="p-4 text-[var(--text-secondary)]">
                    {row.stolift.includes('[CONFIRM]') ? (
                      <ConfirmInline id={`C-SPEC-${idx}-2`} label={row.stolift} fallback={row.stolift} />
                    ) : (
                      row.stolift
                    )}
                  </td>
                  <td className="p-4 text-[var(--text-secondary)]">
                    {row.storder.includes('[CONFIRM]') ? (
                      <ConfirmInline id={`C-SPEC-${idx}-3`} label={row.storder} fallback={row.storder} />
                    ) : (
                      row.storder
                    )}
                  </td>
                  <td className="p-4 pr-6 text-[var(--text-secondary)]">
                    {row.compactors.includes('[CONFIRM]') ? (
                      <ConfirmInline id={`C-SPEC-${idx}-4`} label={row.compactors} fallback={row.compactors} />
                    ) : (
                      row.compactors
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-[var(--border)] bg-[var(--bg)]">
                <td className="p-4 pl-6 text-xs font-mono text-[var(--text-muted)]">
                  Technical Specifications
                </td>
                <td className="p-4">
                  <Link href="/products/stomat" className="text-xs font-bold text-[var(--accent)] hover:underline inline-flex items-center gap-1">
                    Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
                <td className="p-4">
                  <Link href="/products/stolift" className="text-xs font-bold text-[var(--accent)] hover:underline inline-flex items-center gap-1">
                    Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
                <td className="p-4">
                  <Link href="/products/storder" className="text-xs font-bold text-[var(--accent)] hover:underline inline-flex items-center gap-1">
                    Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
                <td className="p-4 pr-6">
                  <Link href="/products/compactors-racking" className="text-xs font-bold text-[var(--accent)] hover:underline inline-flex items-center gap-1">
                    Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile Responsive Card View */}
        <div className="grid grid-cols-1 gap-6 md:hidden">
          {[
            { id: 'stomat', name: 'STOMAT Vertical Carousel', key: 'stomat' as const, href: '/products/stomat' },
            { id: 'stolift', name: 'STOLIFT Vertical Lift Module', key: 'stolift' as const, href: '/products/stolift' },
            { id: 'storder', name: 'STORDER Order Picking', key: 'storder' as const, href: '/products/storder' },
            { id: 'compactors', name: 'Mobile Compactors & Racks', key: 'compactors' as const, href: '/products/compactors-racking' },
          ].map(product => (
            <div
              key={product.id}
              className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <h3 className="font-bold text-base text-[var(--text)]">{product.name}</h3>
                <Link
                  href={product.href}
                  className="text-xs font-bold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                >
                  View <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-2 text-xs">
                {COMPARISON_DATA.map(spec => (
                  <div key={spec.feature} className="flex justify-between py-1 border-b border-[var(--border)]/50">
                    <span className="font-mono text-[var(--text-muted)]">{spec.feature}:</span>
                    <span className="font-semibold text-[var(--text)] text-right ml-2">
                      {spec[product.key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
