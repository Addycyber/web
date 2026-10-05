import { SITE_CONFIG } from '@/config/site'

export function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    description: SITE_CONFIG.positioningLine,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.pincode,
      addressCountry: SITE_CONFIG.address.country,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.phonePrimary,
        contactType: 'sales',
        email: SITE_CONFIG.emailSales,
        areaServed: 'IN',
        availableLanguage: ['en', 'hi', 'mr'],
      },
    ],
    sameAs: [
      // Social links when available
    ],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutomatedStorageSystemManufacturer',
    '@id': `${SITE_CONFIG.url}/#localbusiness`,
    name: SITE_CONFIG.name,
    image: `${SITE_CONFIG.url}/factory-preview.jpg`,
    telePhone: SITE_CONFIG.phonePrimary,
    email: SITE_CONFIG.emailSales,
    url: SITE_CONFIG.url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.pincode,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '₹₹₹₹',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  )
}
