'use client'

import * as React from 'react'
import { CustomerLogoTile, type CustomerLogoTileData } from './CustomerLogoTile'

interface CustomerGridProps {
  customers: (CustomerLogoTileData & { sector: string })[]
  sectors: { id: string; label: string }[]
}

export function CustomerGrid({ customers, sectors }: CustomerGridProps) {
  const [selectedSector, setSelectedSector] = React.useState('all')
  const visibleCustomers =
    selectedSector === 'all'
      ? customers
      : customers.filter((customer) => customer.sector === selectedSector)

  return (
    <>
      <div
        aria-label="Filter customers by sector"
        className="mb-8 flex flex-wrap justify-center gap-2"
        role="group"
      >
        <button
          type="button"
          aria-pressed={selectedSector === 'all'}
          onClick={() => setSelectedSector('all')}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
            selectedSector === 'all'
              ? 'border-[var(--brand)] bg-[var(--brand)] text-white'
              : 'border-[var(--border)] bg-[var(--bg)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
          }`}
        >
          All
        </button>
        {sectors.map((sector) => (
          <button
            key={sector.id}
            type="button"
            aria-pressed={selectedSector === sector.id}
            onClick={() => setSelectedSector(sector.id)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              selectedSector === sector.id
                ? 'border-[var(--brand)] bg-[var(--brand)] text-white'
                : 'border-[var(--border)] bg-[var(--bg)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
            }`}
          >
            {sector.label}
          </button>
        ))}
      </div>
      {visibleCustomers.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5">
          {visibleCustomers.map((customer, index) => (
            <CustomerLogoTile
              key={customer.id}
              customer={customer}
              eager={index < 5}
              showLocations
            />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-sm text-[var(--text-muted)]">
          No customers are listed for this sector.
        </p>
      )}
    </>
  )
}
