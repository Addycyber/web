import { SITE_CONFIG } from '@/config/site'
import { company } from '@/lib/company'

export function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    legalName: company.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/SMlogo.png`,
    description: company.about,
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: company.unit1,
      },
      {
        '@type': 'PostalAddress',
        streetAddress: company.unit2,
      },
    ],
    contactPoint: company.phones.map((telephone, index) => ({
      '@type': 'ContactPoint',
      telephone,
      contactType: 'sales',
      email: company.emails[index] ?? company.emails[0],
    })),
    sameAs: [SITE_CONFIG.linkedin, SITE_CONFIG.youtube].filter(Boolean),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  )
}
