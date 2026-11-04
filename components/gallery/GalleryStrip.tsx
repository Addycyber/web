import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { GalleryManifestItem } from '@/scripts/build-gallery'
import { VideoCard } from '@/components/gallery/VideoCard'

interface GalleryStripProps {
  title?: string
  subtitle?: string
  category?: string
  items: GalleryManifestItem[]
  limit?: number
  viewAllHref?: string
}

export function GalleryStrip({
  title = 'Gallery',
  subtitle = 'Product images and installation videos.',
  category,
  items,
  limit = 4,
  viewAllHref = '/gallery',
}: GalleryStripProps) {
  const filtered = category ? items.filter((item) => item.category === category) : items
  const seen = new Set<string>()
  const displayItems = (filtered.length > 0 ? filtered : items)
    .filter((item) => {
      const key = `${item.type}:${item.poster ?? item.src}:${item.categoryLabel}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .slice(0, limit)

  if (displayItems.length === 0) return null

  return (
    <section className="border-y border-[var(--border)] bg-[var(--bg-subtle)] py-16 transition-colors duration-150 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 inline-block rounded-full bg-[var(--accent-soft)] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              Gallery
            </div>
            <h2 className="text-2xl font-bold text-[var(--text)] sm:text-3xl">{title}</h2>
            <p className="mt-1 max-w-xl text-sm text-[var(--text-secondary)] sm:text-base">{subtitle}</p>
          </div>
          <Link
            href={category ? `/gallery?category=${category}` : viewAllHref}
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
          >
            <span>Explore gallery</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayItems.map((item) =>
            item.type === 'video' ? (
              <VideoCard key={item.id} item={item} className="self-start" />
            ) : (
              <article
                key={item.id}
                className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-sm transition-all hover:border-[var(--border-strong)] hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--bg-muted)]">
                  <Link href={`/gallery?category=${item.category}`} aria-label={`View ${item.categoryLabel} image in gallery`} className="relative block h-full w-full">
                    <Image
                      src={item.src}
                      alt={item.alt || `${item.categoryLabel} image`}
                      fill
                      placeholder="blur"
                      blurDataURL={item.blurDataURL}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                </div>
                <div className="bg-[var(--bg)] p-3.5">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
                    {item.categoryLabel}
                  </span>
                  {item.caption && (
                    <p className="mt-1 line-clamp-2 text-xs font-medium text-[var(--text-secondary)]">
                      {item.caption}
                    </p>
                  )}
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
