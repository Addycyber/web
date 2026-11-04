import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import customersJson from '../data/customers.json'
import { z } from 'zod'

const SectorSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
})

const CustomerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  sector: z.string().min(1),
  locations: z.array(z.string()),
  note: z.string(),
  logo: z
    .string()
    .regex(/^customers\/[a-z0-9-]+\.(?:svg|png|webp|jpe?g)$/i)
    .nullable(),
  logoInvert: z.boolean().optional(),
  approved: z.boolean(),
  needsReview: z.boolean(),
  reviewReason: z.string(),
  original: z.array(z.string()),
})

const CustomerDataSchema = z
  .object({
    _readme: z.string(),
    sectors: z.array(SectorSchema).min(1),
    customers: z.array(CustomerSchema),
  })
  .superRefine((data, context) => {
    const sectorIds = new Set(data.sectors.map((sector) => sector.id))
    const customerIds = new Set<string>()

    data.customers.forEach((customer, index) => {
      if (customerIds.has(customer.id)) {
        context.addIssue({
          code: 'custom',
          path: ['customers', index, 'id'],
          message: `Duplicate customer id "${customer.id}"`,
        })
      }
      customerIds.add(customer.id)

      if (!sectorIds.has(customer.sector)) {
        context.addIssue({
          code: 'custom',
          path: ['customers', index, 'sector'],
          message: `Unknown sector "${customer.sector}"`,
        })
      }

      if (customer.logo && !customer.logo.startsWith(`customers/${customer.id}.`)) {
        context.addIssue({
          code: 'custom',
          path: ['customers', index, 'logo'],
          message: `Logo filename must use customers/${customer.id}.<extension>`,
        })
      }
    })
  })

const parsedCustomerData = CustomerDataSchema.safeParse(customersJson)

if (!parsedCustomerData.success) {
  const details = parsedCustomerData.error.issues
    .map((issue) => `${issue.path.join('.') || 'root'}: ${issue.message}`)
    .join('\n')

  throw new Error(`Invalid data/customers.json:\n${details}`)
}

export const CUSTOMER_DATA = parsedCustomerData.data
export type CustomerSector = (typeof CUSTOMER_DATA.sectors)[number]
export type CustomerRecord = (typeof CUSTOMER_DATA.customers)[number]

export const CUSTOMER_WALL_MINIMUM = 6

export function filterApprovedCustomers<
  T extends Pick<CustomerRecord, 'approved' | 'needsReview'>,
>(customers: readonly T[]): T[] {
  return customers.filter((customer) => customer.approved && !customer.needsReview)
}

export function hasPublicCustomerWall(approvedCount: number): boolean {
  return approvedCount >= CUSTOMER_WALL_MINIMUM
}

export function getApprovedCustomers(): CustomerRecord[] {
  return filterApprovedCustomers(CUSTOMER_DATA.customers)
}

export function getCustomerLogoSrc(customer: CustomerRecord): string | null {
  if (!customer.logo) return null

  const logoPath = path.join(
    process.cwd(),
    'public',
    ...customer.logo.split('/')
  )

  if (!existsSync(logoPath)) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Customer logo is missing: public/${customer.logo}`)
    } else {
      console.error(`Customer logo is missing: public/${customer.logo}`)
    }
    return null
  }

  if (path.extname(logoPath).toLowerCase() === '.png') {
    const header = readFileSync(logoPath).subarray(0, 24)
    const isPng =
      header.length >= 24 &&
      header[0] === 0x89 &&
      header.toString('ascii', 1, 4) === 'PNG'

    if (!isPng) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Customer logo is not a valid PNG: public/${customer.logo}`)
      } else {
        console.error(`Customer logo is not a valid PNG: public/${customer.logo}`)
      }
      return null
    }

    if (header.readUInt32BE(16) < 400) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `Customer logo is under 400px wide; using text fallback: public/${customer.logo}`
        )
      } else {
        console.error(
          `Customer logo is under 400px wide: public/${customer.logo}`
        )
      }
      return null
    }
  }

  return `/${customer.logo}`
}
