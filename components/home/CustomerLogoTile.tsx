import Image from 'next/image'

export interface CustomerLogoTileData {
  id: string
  name: string
  locations: string[]
  logoSrc: string | null
  preview: boolean
}

export function CustomerLogoTile({
  customer,
  eager = false,
  showLocations = false,
}: {
  customer: CustomerLogoTileData
  eager?: boolean
  showLocations?: boolean
}) {
  return (
    <article className="min-w-0">
      <div className="group relative flex h-20 items-center justify-center overflow-hidden rounded-lg border border-[var(--border)] bg-white p-4 transition-colors hover:border-[var(--border-strong)] focus-within:border-[var(--border-strong)] md:h-24">
        {customer.logoSrc ? (
          <Image
            src={customer.logoSrc}
            alt={customer.name}
            width={200}
            height={80}
            loading={eager ? 'eager' : 'lazy'}
            className="max-h-full w-full object-contain grayscale opacity-70 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-focus-within:grayscale-0 group-focus-within:opacity-100"
          />
        ) : (
          <span className="line-clamp-2 text-center font-heading text-sm font-semibold text-slate-500">
            {customer.name}
          </span>
        )}
        {customer.preview && (
          <span className="absolute inset-x-0 bottom-0 bg-amber-100/95 px-1 py-0.5 text-center font-mono text-[9px] font-bold uppercase leading-tight text-amber-950">
            PREVIEW — not approved
          </span>
        )}
      </div>
      {showLocations && customer.locations.length > 0 && (
        <p className="mt-1.5 truncate text-center text-xs text-[var(--text-muted)]">
          {customer.locations.join(', ')}
        </p>
      )}
    </article>
  )
}
