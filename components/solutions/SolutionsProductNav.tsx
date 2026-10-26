'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Product } from '@/lib/company'

export function SolutionsProductNav({ products }: { products: Product[] }) {
  const [activeId, setActiveId] = useState(products[0] ? `solution-${products[0].slug}` : '')

  useEffect(() => {
    const sections = products
      .map((product) => document.getElementById(`solution-${product.slug}`))
      .filter((element): element is HTMLElement => element !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -65% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [products])

  return (
    <nav
      aria-label="Product solutions"
      className="top-24 h-fit rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-3 lg:sticky"
    >
      <h2 className="px-3 py-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
        Solutions
      </h2>
      <ul className="space-y-1">
        {products.map((product) => {
          const id = `solution-${product.slug}`
          return (
            <li key={product.slug}>
              <Link
                href={`#${id}`}
                aria-current={activeId === id ? 'location' : undefined}
                className={`block rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  activeId === id
                    ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg)] hover:text-[var(--text)]'
                }`}
              >
                {product.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
