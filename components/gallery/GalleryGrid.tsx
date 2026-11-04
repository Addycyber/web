'use client'

import * as React from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import type { GalleryManifestItem } from '@/scripts/build-gallery'
import { VideoCard } from '@/components/gallery/VideoCard'

interface GalleryGridProps {
  items: GalleryManifestItem[]
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'

  // Duplicate clips share a poster frame and category; keep only one of each.
  const uniqueItems = React.useMemo(() => {
    const seen = new Set<string>()
    return items.filter((item) => {
      const key = `${item.type}_${item.poster ?? item.src}_${item.categoryLabel}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }, [items])

  // Extract unique categories and counts
  const categories = React.useMemo(() => {
    const map = new Map<string, { label: string; count: number }>()
    uniqueItems.forEach((item) => {
      const existing = map.get(item.category)
      if (existing) {
        existing.count++
      } else {
        map.set(item.category, { label: item.categoryLabel, count: 1 })
      }
    })
    return Array.from(map.entries()).map(([key, value]) => ({
      key,
      label: value.label,
      count: value.count,
    }))
  }, [uniqueItems])

  // Filter items
  const filteredItems = React.useMemo(() => {
    if (activeCategory === 'all') return uniqueItems
    return uniqueItems.filter((item) => item.category === activeCategory)
  }, [uniqueItems, activeCategory])

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null)
  const [touchStart, setTouchStart] = React.useState<number | null>(null)
  const lightboxRef = React.useRef<HTMLDialogElement>(null)
  const lightboxTriggerRef = React.useRef<HTMLElement | null>(null)

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null
  const isLightboxOpen = activeItem !== null

  React.useEffect(() => {
    const dialog = lightboxRef.current
    if (!dialog) return
    if (isLightboxOpen && !dialog.open) dialog.showModal()
    if (!isLightboxOpen && dialog.open) dialog.close()
  }, [isLightboxOpen])

  const openLightbox = (index: number) => {
    lightboxTriggerRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null
    setLightboxIndex(index)
  }

  const handleLightboxKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowRight') {
      setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0))
    } else if (event.key === 'ArrowLeft') {
      setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1))
    }
  }

  const handleFilterClick = (catKey: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (catKey === 'all') {
      params.delete('category')
    } else {
      params.set('category', catKey)
    }
    router.replace(`/gallery?${params.toString()}`, { scroll: false })
  }

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || lightboxIndex === null) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd
    if (diff > 50) {
      // swipe left -> next
      setLightboxIndex(prev => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0))
    } else if (diff < -50) {
      // swipe right -> prev
      setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1))
    }
    setTouchStart(null)
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-[var(--text-muted)] font-mono text-sm">
          No media items available in the gallery.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-[var(--border)] overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => handleFilterClick('all')}
          className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
            activeCategory === 'all'
              ? 'bg-[var(--accent)] text-white shadow-sm'
              : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:text-[var(--text)]'
          }`}
        >
          All Media <span className="ml-1 opacity-75 font-mono">({items.length})</span>
        </button>

        {categories.map(cat => (
          <button
            key={cat.key}
            type="button"
            onClick={() => handleFilterClick(cat.key)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeCategory === cat.key
                ? 'bg-[var(--accent)] text-white shadow-sm'
                : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:text-[var(--text)]'
            }`}
          >
            {cat.label} <span className="ml-1 opacity-75 font-mono">({cat.count})</span>
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {filteredItems.map((item, idx) => (
          <div key={item.id} className="break-inside-avoid group relative rounded-xl border border-[var(--border)] bg-[var(--bg-muted)] shadow-sm transition-all duration-200 hover:shadow-md">
            {item.type === 'image' ? (
              <button
                type="button"
                onClick={() => openLightbox(idx)}
                aria-label={item.alt || `Open ${item.categoryLabel} image`}
                className="group relative block w-full cursor-pointer overflow-hidden rounded-xl text-left focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
              >
                <div className="relative w-full aspect-auto">
                  <Image
                    src={item.src}
                    alt={item.alt || `${item.categoryLabel} installation photograph`}
                    width={item.width}
                    height={item.height}
                    placeholder="blur"
                    blurDataURL={item.blurDataURL}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                {/* Hover overlay chip with category and expand icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between pointer-events-none">
                  <span className="self-end p-1.5 rounded-lg bg-black/60 text-white backdrop-blur-md">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono uppercase font-bold tracking-wider bg-[var(--accent)] text-white">
                      {item.categoryLabel}
                    </span>
                    {item.caption && (
                      <p className="text-white text-xs mt-1.5 line-clamp-2 drop-shadow">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ) : (
              <VideoCard item={item} onOpenLightbox={() => openLightbox(idx)} />
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <dialog
          ref={lightboxRef}
          aria-label={activeItem ? `${activeItem.categoryLabel} media preview` : 'Media preview'}
          onCancel={() => setLightboxIndex(null)}
          onClose={() => {
            setLightboxIndex(null)
            lightboxTriggerRef.current?.focus()
          }}
          onKeyDown={handleLightboxKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={(event) => {
            if (event.target === event.currentTarget) setLightboxIndex(null)
          }}
          className="fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none border-0 bg-black/92 p-4 text-white backdrop:bg-black/90 sm:p-6"
        >
        {activeItem && lightboxIndex !== null && (
        <div className="flex h-full items-center justify-center">
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            autoFocus
            aria-label="Close lightbox"
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          <button
            type="button"
            onClick={e => {
              e.stopPropagation()
                  setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1))
            }}
            aria-label="Previous item"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={e => {
              e.stopPropagation()
                  setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0))
            }}
            aria-label="Next item"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Media Container */}
          <div className="relative flex max-h-[85vh] w-full max-w-5xl flex-col items-center justify-center">
            <div className="relative max-w-full max-h-[75vh] rounded-xl overflow-hidden border border-white/20 bg-black/60 shadow-2xl flex items-center justify-center">
              {activeItem.type === 'image' ? (
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt || activeItem.categoryLabel}
                  width={activeItem.width}
                  height={activeItem.height}
                  sizes="90vw"
                  className="max-w-full max-h-[75vh] w-auto h-auto object-contain select-none"
                  onContextMenu={e => e.preventDefault()}
                />
              ) : (
                <video
                  src={activeItem.src}
                  controls
                  playsInline
                  className="max-w-full max-h-[75vh] w-auto h-auto"
                />
              )}
            </div>

            {/* Bottom Meta & Caption */}
            <div className="w-full max-w-2xl mt-4 px-4 py-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-between text-xs">
              <div>
                <span className="font-mono uppercase font-bold tracking-wider text-[var(--accent)] mr-3">
                  {activeItem.categoryLabel}
                </span>
                {activeItem.caption && <span className="text-zinc-200">{activeItem.caption}</span>}
              </div>
              <div className="font-mono text-zinc-400 shrink-0 ml-4">
                {lightboxIndex + 1} of {filteredItems.length}
              </div>
            </div>
          </div>
        </div>
        )}
      </dialog>
    </div>
  )
}
