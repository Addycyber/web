'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Search, Boxes, Factory, Calculator, Play, Image as ImageIcon, Download, Phone, ArrowRight, X } from 'lucide-react'
import { products } from '@/lib/company'

interface SearchItem {
  id: string
  title: string
  category: 'Products' | 'Industries' | 'Tools' | 'Resources' | 'Actions'
  keywords: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const SEARCH_REGISTRY: SearchItem[] = [
  ...products.map((product) => ({
    id: product.slug,
    title: `${product.name} — ${product.type}`,
    category: 'Products' as const,
    keywords: `${product.name} ${product.type} ${product.summary}`,
    href: `/products/${product.slug}`,
    icon: Boxes,
  })),

  // Industries
  { id: 'ind-auto', title: 'Automotive & Heavy Engineering Storage', category: 'Industries', keywords: 'automotive tier 1 spare parts dies tooling tata mahindra', href: '/industries/automotive', icon: Factory },
  { id: 'ind-pharma', title: 'Pharmaceutical Cleanroom & Batch Storage', category: 'Industries', keywords: 'pharma cleanroom temperature batch tracking cipla serum', href: '/industries/pharma', icon: Factory },
  { id: 'ind-chem', title: 'Chemicals & Hazardous Material Storage', category: 'Industries', keywords: 'chemicals drums hazardous containment safety', href: '/industries/chemicals', icon: Factory },
  { id: 'ind-3pl', title: 'Logistics, 3PL & E-Commerce Fulfillment', category: 'Industries', keywords: 'logistics 3pl warehousing distribution center', href: '/industries/logistics', icon: Factory },

  // Tools
  { id: 'calc', title: 'Brochure-Based Floor-Space Illustration', category: 'Tools', keywords: 'calculator brochure floor space saving', href: '/tools/calculator', icon: Calculator },
  { id: 'sim', title: 'ASRS Simulation', category: 'Tools', keywords: 'asrs simulator storage retrieval', href: '/simulator', icon: Play },

  // Resources
  { id: 'gallery', title: 'Product & Installation Gallery', category: 'Resources', keywords: 'gallery photos product videos pictures installations', href: '/gallery', icon: ImageIcon },
  { id: 'downloads', title: 'Technical Downloads & Spec Sheets Centre', category: 'Resources', keywords: 'downloads brochures pdf technical specs cad catalog', href: '/brochure', icon: Download },
  { id: 'brochure', title: 'Digital Brochure', category: 'Resources', keywords: 'brochure pages catalogue snapshots', href: '/brochure', icon: Download },
  { id: 'solutions', title: 'Solutions', category: 'Resources', keywords: 'solutions products storage planning', href: '/solutions', icon: Boxes },

  // Actions
  { id: 'quote', title: 'Request a Customized Engineering Quote', category: 'Actions', keywords: 'quote pricing get a quote proposal inquiry', href: '/get-a-quote', icon: ArrowRight },
  { id: 'contact', title: 'Contact Pune Head Office & Factory', category: 'Actions', keywords: 'contact phone email address location pune sasewadi', href: '/contact', icon: Phone },
]

export function CommandSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter()
  const [query, setQuery] = React.useState('')
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const handleClose = React.useCallback(() => {
    setQuery('')
    setSelectedIndex(0)
    onClose()
  }, [onClose])

  // Filter items
  const filtered = React.useMemo(() => {
    if (!query.trim()) return SEARCH_REGISTRY.slice(0, 8)
    const q = query.toLowerCase()
    return SEARCH_REGISTRY.filter(
      item =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
    )
  }, [query])

  // Focus input on open
  React.useEffect(() => {
    if (isOpen) {
      const focusTimer = window.setTimeout(() => {
        inputRef.current?.focus()
        setSelectedIndex(0)
      }, 50)
      return () => window.clearTimeout(focusTimer)
    }
  }, [isOpen])

  // Keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev < filtered.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : filtered.length - 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filtered[selectedIndex]) {
          router.push(filtered[selectedIndex].href)
          handleClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filtered, selectedIndex, router, handleClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick search palette"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4"
      onClick={handleClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-2xl overflow-hidden flex flex-col max-h-[75vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
          <Search className="w-5 h-5 text-[var(--accent)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Search products, industries, tools, gallery..."
            className="w-full bg-transparent text-[var(--text)] text-sm focus:outline-none placeholder:text-[var(--text-muted)] font-medium"
          />
          <button
            type="button"
            onClick={handleClose}
            className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-muted)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results */}
        <div className="overflow-y-auto p-2 divide-y divide-[var(--border)]/40">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-[var(--text-muted)] font-mono">
              No matching storage systems or resources found for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon
              const isSelected = idx === selectedIndex

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    router.push(item.href)
                    handleClose()
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors ${
                    isSelected
                      ? 'bg-[var(--accent-soft)] text-[var(--text)] border border-[var(--border)]'
                      : 'hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-[var(--text)]">
                        {item.title}
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 text-[var(--accent)] shrink-0 transition-transform ${
                    isSelected ? 'translate-x-1 opacity-100' : 'opacity-0'
                  }`} />
                </button>
              )
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-[var(--border)] bg-[var(--bg-subtle)] text-[11px] font-mono text-[var(--text-muted)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-muted)] border border-[var(--border)]">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-muted)] border border-[var(--border)]">↓</kbd> navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-muted)] border border-[var(--border)]">↵</kbd> select</span>
          </div>
          <span><kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-muted)] border border-[var(--border)]">esc</kbd> close</span>
        </div>
      </div>
    </div>
  )
}
