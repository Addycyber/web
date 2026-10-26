export type IndustryId = 'automotive' | 'pharma' | 'chemicals' | '3pl' | 'manufacturing'

export interface IndustryOption {
  id: IndustryId
  name: string
  shortName: string
}

export const INDUSTRIES: IndustryOption[] = [
  { id: 'automotive', name: 'Automotive & Auto Components', shortName: 'Automotive' },
  { id: 'pharma', name: 'Pharmaceuticals', shortName: 'Pharma' },
  { id: 'chemicals', name: 'Chemicals', shortName: 'Chemicals' },
  { id: '3pl', name: '3PL & Warehousing', shortName: '3PL' },
  { id: 'manufacturing', name: 'General Manufacturing', shortName: 'Manufacturing' },
]

export const INDUSTRY_LIST = INDUSTRIES
