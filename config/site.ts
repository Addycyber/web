import { company } from '@/lib/company'

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
if (process.env.NODE_ENV === 'production' && !configuredSiteUrl) {
  throw new Error('NEXT_PUBLIC_SITE_URL must be set for production metadata and sitemap URLs.')
}

export const SITE_CONFIG = {
  legalName: company.name,
  name: company.name.replace(' Equipments Pvt. Ltd.', ''),
  shortName: company.name.replace(' Equipments Pvt. Ltd.', ''),
  tagline: company.tagline,
  positioningLine: company.tagline,
  address: {
    unit1: company.unit1,
    unit2: company.unit2,
  },
  phone: company.phones[0],
  phonePrimary: company.phones[0],
  phoneSecondary: company.phones[1],
  fax: company.fax,
  email: company.emails[0],
  emailSales: company.emails[1],
  url: configuredSiteUrl ?? 'http://localhost:3000',
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? '',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? '',
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? '',
  foundingYear: company.founded,
  analytics: {
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '',
    clarityProjectKey: process.env.NEXT_PUBLIC_CLARITY_PROJECT_KEY ?? '',
  },
} as const

export type SiteConfig = typeof SITE_CONFIG
