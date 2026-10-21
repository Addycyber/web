import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { GalleryManifestItem } from '@/scripts/build-gallery'

interface GalleryStripProps {
  title?: string
  subtitle?: string
  category?: string
  items: GalleryManifestItem[]
  limit?: number
  viewAllHref?: string
}

export function GalleryStrip({
  title = 'See It In Action',
  subtitle = 'Real warehouse installations and automated systems engineered by Space Magnum.',
  category,
  items,
  limit = 4,
  viewAllHref = '/gallery',
}: GalleryStripProps) {
  const filtered = category
    ? items.filter(item => item.category === category)
    : items

  const displayItems = (filtered.length > 0 ? filtered : items).slice(0, limit)

  if (displayItems.length === 0) return null

  return (
    <section className="py-16 md:py-20 bg-[var(--bg-subtle)] border-y border-[var(--border)] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-mono font-bold uppercase tracking-wider mb-2">
              Plant Proof
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-1 max-w-xl">
              {subtitle}
            </p>
          </div>

          <Link
            href={category ? `/gallery?category=${category}` : viewAllHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors shrink-0 group"
          >
            <span>Explore full gallery</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map(item => (
            <Link
              key={item.id}
              href={`/gallery?category=${item.category}`}
              className="group block rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg)] shadow-sm hover:shadow-md hover:border-[var(--border-strong)] transition-all duration-200"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--bg-muted)]">
                <Image
                  src={item.src}
                  alt={item.alt || `${item.categoryLabel} photo`}
                  fill
                  placeholder="blur"
                  blurDataURL={item.blurDataURL}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3.5 bg-[var(--bg)]">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
                  {item.categoryLabel}
                </span>
                <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-1 font-medium">
                  {item.caption || item.originalFilename}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
