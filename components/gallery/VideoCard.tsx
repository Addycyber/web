'use client'

import * as React from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import type { GalleryManifestItem } from '@/scripts/build-gallery'

interface VideoCardProps {
  item: GalleryManifestItem
  onOpenLightbox?: () => void
  className?: string
}

export function VideoCard({ item, onOpenLightbox, className = '' }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const posterSrc = item.poster || (item.blurDataURL.startsWith('/') ? item.blurDataURL : undefined)

  const handlePlayToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation()
    // On small screens, prefer lightbox if provided
    if (typeof window !== 'undefined' && window.innerWidth < 640 && onOpenLightbox) {
      onOpenLightbox()
      return
    }

    if (!isPlaying) {
      setIsPlaying(true)
      videoRef.current?.play().catch(() => {
        // Fallback to lightbox if inline autoplay fails
        if (onOpenLightbox) onOpenLightbox()
      })
    } else {
      if (videoRef.current) {
        if (videoRef.current.paused) {
          videoRef.current.play()
        } else {
          videoRef.current.pause()
        }
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handlePlayToggle(e)
    }
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[#0B1220] transition-all hover:border-[var(--accent)] hover:shadow-lg ${className}`}
    >
      {/* 16:9 Fixed Ratio Container (Prevents Layout Shift) */}
      <div className="relative aspect-video w-full overflow-hidden bg-black/80">
        <video
          ref={videoRef}
          src={item.src}
          poster={posterSrc}
          preload="none"
          playsInline
          controls={isPlaying}
          aria-label={item.alt || `${item.categoryLabel} video`}
          className="h-full w-full object-cover"
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        />

        {/* Poster overlay with custom centered play button when not actively playing */}
        {!isPlaying && (
          <button
            type="button"
            onClick={handlePlayToggle}
            onKeyDown={handleKeyDown}
            aria-label={`Play video: ${item.categoryLabel}`}
            className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          >
            {posterSrc && (
              <Image
                src={posterSrc}
                alt={item.alt || item.categoryLabel}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--accent-hover)]">
              <Play className="ml-1 h-6 w-6" fill="currentColor" aria-hidden="true" />
            </div>

            {/* Video pill indicator */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-black/70 px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-white backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span>{item.categoryLabel}</span>
            </div>
          </button>
        )}
      </div>

      {/* Caption from real facts if present */}
      {item.caption && (
        <div className="p-3 text-xs text-[var(--text-secondary)]">
          <p className="line-clamp-1">{item.caption}</p>
        </div>
      )}
    </div>
  )
}
