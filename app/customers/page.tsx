import { notFound } from 'next/navigation'
import { CustomerGrid } from '@/components/home/CustomerGrid'
import {
  CUSTOMER_DATA,
  getApprovedCustomers,
  getCustomerLogoSrc,
  hasPublicCustomerWall,
} from '@/lib/customers'
import { constructMetadata } from '@/lib/metadata'

export const metadata = constructMetadata({
  title: 'Our Customers',
  description: 'Explore Space Magnum customer organisations by sector.',
})

export default function CustomersPage() {
  const approvedCustomers = getApprovedCustomers()
  const showDevelopmentPreview =
    process.env.NODE_ENV === 'development' &&
    !hasPublicCustomerWall(approvedCustomers.length)

  if (
    !hasPublicCustomerWall(approvedCustomers.length) &&
    !showDevelopmentPreview
  ) {
    notFound()
  }

  const records = showDevelopmentPreview
    ? CUSTOMER_DATA.customers
    : approvedCustomers
  const customers = records.map((customer) => ({
    id: customer.id,
    name: customer.name,
    sector: customer.sector,
    locations: customer.locations,
    logoSrc: getCustomerLogoSrc(customer),
    preview: !customer.approved || customer.needsReview,
  }))

  return (
    <section
      aria-labelledby="customers-heading"
      className="bg-[var(--bg)] py-12 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-9 text-center">
          <h1
            id="customers-heading"
            className="text-3xl font-extrabold text-[var(--text)] sm:text-4xl"
          >
            Our customers
          </h1>
          {showDevelopmentPreview && (
            <p className="mt-3 font-mono text-xs font-bold uppercase tracking-wide text-amber-800">
              Development preview — customer names are not approved for
              publication
            </p>
          )}
        </header>
        <CustomerGrid customers={customers} sectors={CUSTOMER_DATA.sectors} />
      </div>
    </section>
  )
}
