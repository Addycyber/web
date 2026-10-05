import { z } from 'zod'

export const phoneRegex = /^(\+91[\-\s]?)?[0-9]{10}$/

export const QuoteLeadSchema = z.object({
  productId: z.string().optional(),
  industryId: z.string().optional(),
  companyName: z.string().min(2, 'Company name is required'),
  contactName: z.string().min(2, 'Contact person name is required'),
  phone: z
    .string()
    .min(10, 'Valid 10-digit Indian phone number is required')
    .refine((val) => phoneRegex.test(val.replace(/\s+/g, '')), {
      message: 'Please enter a valid 10-digit Indian mobile or landline number',
    }),
  email: z.string().email('Valid business email is required'),
  city: z.string().min(2, 'City/Location is required'),
  timeline: z.enum(['immediate', '1-3-months', '3-6-months', 'exploratory']),
  notes: z.string().optional(),
  whatsappOptIn: z.boolean().default(true),
  // Context fields automatically injected from URL/calculator
  sourceUrl: z.string().optional(),
  calcArea: z.string().optional(),
  calcSkus: z.string().optional(),
  intentTag: z.string().default('high-intent:quote-form'),
})

export type QuoteLeadPayload = z.infer<typeof QuoteLeadSchema>
