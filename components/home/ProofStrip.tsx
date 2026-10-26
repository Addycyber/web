import Image from 'next/image'
import { Boxes, CalendarDays, Package, Warehouse } from 'lucide-react'
import { company, getProduct } from '@/lib/company'
import type { GalleryManifestItem } from '@/scripts/build-gallery'

const stomat = getProduct('stomat')
const stolift = getProduct('stolift')
if (!stomat || !stolift) throw new Error('Brochure data must include STOMAT and STOLIFT.')

function requiredFact(product: NonNullable<typeof stomat>, label: string) {
  const value = product.facts.find((fact) => fact.label === label)?.value
  if (!value) throw new Error(`Brochure data is missing "${label}" for ${product.name}.`)
  return value
}

const stats = [
  { icon: CalendarDays, title: `Founded ${company.founded}`, subtitle: company.name },
  {
    icon: Warehouse,
    title: `${requiredFact(stomat, 'Floor-space saving')} floor-space saving`,
    subtitle: 'STOMAT brochure statement',
  },
  {
    icon: Package,
    title: requiredFact(stolift, 'Tray load classes'),
    subtitle: 'STOLIFT tray load classes',
  },
  {
    icon: Boxes,
    title: requiredFact(stolift, 'Designed machine capacity'),
    subtitle: 'STOLIFT designed machine capacity',
  },
]

export function ProofStrip({ items }: { items: GalleryManifestItem[] }) {
  const photos = items.filter((item) => item.type === 'image').slice(0, 5)

  return (
    <section className="overflow-hidden border-b border-[var(--border)] bg-[var(--bg-subtle)] transition-colors">
      {photos.length > 0 && (
        <div className="flex h-36 overflow-hidden border-b border-[var(--border)] sm:h-44">
          {photos.map((photo) => (
          <div key={photo.id} className="relative flex-1 overflow-hidden bg-[var(--bg-muted)]">
            <Image
              src={photo.src}
              alt={photo.alt || 'Space Magnum product and facility imagery'}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 50vw, 20vw"
            />
          </div>
          ))}
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map(({ icon: Icon, title, subtitle }) => (
            <div
              key={title}
              className="flex items-center gap-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 shadow-xs"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm font-bold text-[var(--text)]">{title}</div>
                <div className="mt-0.5 text-xs text-[var(--text-muted)]">{subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
