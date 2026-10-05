/**
 * Global site configuration for Space Magnum Equipments Pvt. Ltd.
 * All company facts live here. Update this file when [CONFIRM] items are resolved.
 * Never hard-code company data anywhere else in the codebase.
 */

export const SITE_CONFIG = {
  /** Legal name — used in footer, schema, legal pages. Do not abbreviate. */
  legalName: 'Space Magnum Equipments Pvt. Ltd.',
  /** Short name for UI contexts where full name is too long */
  name: 'Space Magnum',
  shortName: 'Space Magnum',
  /** Tagline / positioning line — approved */
  tagline: 'Global-grade automation logic. Indian manufacturing cost. One vendor for your entire store.',
  positioningLine: 'Global-grade automation logic. Indian manufacturing cost. One vendor for your entire store.',
  /** Full address structure */
  address: {
    street: '[CONFIRM: Full street address]',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411009',
    country: 'India',
  },
  geo: {
    latitude: 18.5204,
    longitude: 73.8567,
  },
  /** Phone numbers */
  phone: '+91 20 24352812',
  phonePrimary: '+91 20 24352812',
  phoneSecondary: '+91 20 24355895',
  fax: '+91 20 24358082',
  /** Primary enquiry email */
  email: 'enquire@spacemagnum.com',
  emailSales: 'enquire@spacemagnum.com',
  /** Website canonical origin */
  url: 'https://spacemagnum.com',
  /** WhatsApp Business number & message */
  whatsapp: '912024352812',
  whatsappNumber: '912024352812',
  whatsappDefaultMessage: "Hello Space Magnum team, I'd like to enquire about automated storage systems.",
  /** Social links */
  linkedin: '[CONFIRM]',
  foundingYear: '[CONFIRM]',
  cin: '[CONFIRM]',
  responseTimeHours: '24',
  certifications: [
    {
      name: 'TÜV Austria ISO Certificate',
      scope: '[CONFIRM]',
      number: '[CONFIRM]',
      expiry: '[CONFIRM]',
    },
  ],
  targetAreas: ['Pune', 'Chakan', 'Bhosari', 'Ranjangaon', 'Pimpri-Chinchwad', 'MIDC'],
  analytics: {
    gaMeasurementId: '[CONFIRM]',
    clarityProjectKey: '[CONFIRM]',
  },
} as const

export type SiteConfig = typeof SITE_CONFIG
