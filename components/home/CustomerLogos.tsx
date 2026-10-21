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
      className="overflow-hidden border-y border-[var(--border)] bg-[var(--bg)] py-12 md:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="customer-logos-heading"
          className="mb-7 text-center text-xl font-bold text-[var(--text)] sm:text-2xl"
        >
          Our customers
        </h2>
        {process.env.NODE_ENV === 'development' &&
          !hasPublicCustomerWall(approvedCustomers.length) && (
            <p className="mb-5 text-center font-mono text-xs font-bold uppercase tracking-wide text-amber-800">
              Development preview — customer names are not approved for
              publication
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
