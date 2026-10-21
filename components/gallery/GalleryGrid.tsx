'use client'

import * as React from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { X, ChevronLeft, ChevronRight, Play, Maximize2 } from 'lucide-react'
import type { GalleryManifestItem } from '@/scripts/build-gallery'

interface GalleryGridProps {
  items: GalleryManifestItem[]
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'

  // Extract unique categories and counts
  const categories = React.useMemo(() => {
    const map = new Map<string, { label: string; count: number }>()
    items.forEach(item => {
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
  }, [items])

  // Filter items
  const filteredItems = React.useMemo(() => {
    if (activeCategory === 'all') return items
    return items.filter(item => item.category === activeCategory)
  }, [items, activeCategory])

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null)
  const [touchStart, setTouchStart] = React.useState<number | null>(null)
  const lightboxRef = React.useRef<HTMLDivElement>(null)

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null

  const handleFilterClick = (catKey: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (catKey === 'all') {
      params.delete('category')
    } else {
      params.set('category', catKey)
    }
    router.replace(`/gallery?${params.toString()}`, { scroll: false })
  }

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null)
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex(prev => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, filteredItems.length])

  // Trap focus in lightbox
  React.useEffect(() => {
    if (lightboxIndex !== null && lightboxRef.current) {
      lightboxRef.current.focus()
    }
  }, [lightboxIndex])

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
          <div
            key={item.id}
            onClick={() => setLightboxIndex(idx)}
            className="break-inside-avoid group relative rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg-muted)] cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
          >
            {item.type === 'image' ? (
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
            ) : (
              <div className="relative w-full aspect-video bg-[var(--bg-muted)] flex items-center justify-center">
                <video
                  src={item.src}
                  preload="none"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </div>
            )}

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
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && lightboxIndex !== null && (
        <div
          ref={lightboxRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.categoryLabel} media preview`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 outline-none"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
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
              setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1))
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
              setLightboxIndex(prev => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0))
            }}
            aria-label="Next item"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Media Container */}
          <div 
            onClick={e => e.stopPropagation()} 
            className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center"
          >
            <div className="relative max-w-full max-h-[75vh] rounded-xl overflow-hidden border border-white/20 bg-black/60 shadow-2xl flex items-center justify-center">
              {activeItem.type === 'image' ? (
                <img
                  src={activeItem.src}
                  alt={activeItem.alt || activeItem.categoryLabel}
                  className="max-w-full max-h-[75vh] w-auto h-auto object-contain select-none"
                  onContextMenu={e => e.preventDefault()}
                />
              ) : (
                <video
                  src={activeItem.src}
                  controls
                  autoPlay
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
                {activeItem.caption ? (
                  <span className="text-zinc-200">{activeItem.caption}</span>
                ) : (
                  <span className="text-zinc-400 font-mono text-[11px]">{activeItem.originalFilename}</span>
                )}
              </div>
              <div className="font-mono text-zinc-400 shrink-0 ml-4">
                {lightboxIndex + 1} of {filteredItems.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
