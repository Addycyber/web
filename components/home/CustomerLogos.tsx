import {
  CUSTOMER_DATA,
  hasPublicCustomerWall,
  getApprovedCustomers,
  getCustomerLogoSrc,
} from '@/lib/customers'
import { CustomerLogoTile, type CustomerLogoTileData } from './CustomerLogoTile'

function getDisplayCustomers(): CustomerLogoTileData[] {
  const approvedCustomers = getApprovedCustomers()
  const showDevelopmentPreview =
    process.env.NODE_ENV === 'development' &&
    !hasPublicCustomerWall(approvedCustomers.length)
  const records = showDevelopmentPreview
    ? CUSTOMER_DATA.customers
    : approvedCustomers

  return records.map((customer) => ({
    id: customer.id,
    name: customer.name,
    locations: customer.locations,
    logoSrc: getCustomerLogoSrc(customer),
    logoInvert: customer.logoInvert === true,
    preview: !customer.approved || customer.needsReview,
  }))
}

export function CustomerLogos() {
  const approvedCustomers = getApprovedCustomers()
  const customers = getDisplayCustomers()

  if (
    customers.length === 0 ||
    (!hasPublicCustomerWall(approvedCustomers.length) &&
      process.env.NODE_ENV !== 'development')
  ) {
    return null
  }

  return (
    <section
      aria-labelledby="customer-logos-heading"
      className="overflow-hidden border-b border-[var(--border)] bg-[var(--bg)] py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                Trusted by Indian industry
              </span>
            </div>
            <h2
              id="customer-logos-heading"
              className="text-2xl font-black uppercase tracking-tight text-[var(--text)] sm:text-4xl"
            >
              Companies we have built for
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[var(--text-secondary)] md:text-right">
            A selection of the organisations whose stores and warehouses carry Space Magnum
            systems.
          </p>
        </div>
        {process.env.NODE_ENV === 'development' &&
          !hasPublicCustomerWall(approvedCustomers.length) && (
            <p className="mb-5 text-center font-mono text-xs font-bold uppercase tracking-wide text-amber-800">
              Development preview — customer names are not approved for publication
            </p>
          )}
      </div>
      <div className="customer-marquee">
        <div className="customer-marquee-track">
          <div className="customer-marquee-set">
            {customers.map((customer, index) => (
              <div className="w-40 shrink-0 sm:w-48" key={customer.id}>
                <CustomerLogoTile customer={customer} eager={index === 0} />
              </div>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="customer-marquee-set customer-marquee-duplicate"
          >
            {customers.map((customer) => (
              <div className="w-40 shrink-0 sm:w-48" key={customer.id}>
                <CustomerLogoTile customer={{ ...customer, preview: false }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
