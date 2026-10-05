/**
 * Industry definitions for Space Magnum Equipments Pvt. Ltd.
 */

import type { ProductId } from './products'

export type IndustryId = 'automotive' | 'pharma' | 'chemicals' | '3pl' | 'manufacturing'

export interface Industry {
  id: IndustryId
  name: string
  shortName: string
  tagline: string
  headline: string
  description: string
  painPoints: string[]
  recommendedProducts: ProductId[]
  recommendedProduct: string
  complianceNotes: { note: string; isConfirm: boolean }[]
  calculatorPreset: {
    suggestedFloorArea: number
    suggestedCeilingHeight: number
    suggestedSkuCount: number
    suggestedDailyPicks: string
  }
  icon: string
  accentColor: string
  href: string
}

export const INDUSTRIES_MAP: Record<IndustryId, Industry> = {
  automotive: {
    id: 'automotive',
    name: 'Automotive & Auto Components',
    shortName: 'Automotive',
    tagline: 'Precision storage for a just-in-time world',
    headline: 'Zero Line-Stoppage JIT/JIS Component Storage',
    description:
      'Automotive and auto components manufacturers demand zero picking errors, rapid retrieval and inventory traceability that keeps pace with JIT and JIS production schedules.',
    painPoints: [
      'High SKU count with frequent stock rotation in JIT/JIS environments',
      'Picking errors that halt the line — costing thousands per minute',
      'Sprawling floor storage eating valuable production space',
      'Manual counting and traceability gaps causing audit failures',
    ],
    recommendedProducts: ['stolift', 'storder', 'stomat'],
    recommendedProduct: 'STOLIFT Vertical Lift Module + STORDER Picking',
    complianceNotes: [
      {
        note: 'IATF 16949 traceability requirements for component storage',
        isConfirm: true,
      },
    ],
    calculatorPreset: {
      suggestedFloorArea: 5000,
      suggestedCeilingHeight: 20,
      suggestedSkuCount: 5000,
      suggestedDailyPicks: '200-500',
    },
    icon: 'Cog',
    accentColor: '#FF6A1A',
    href: '/industries/automotive',
  },
  pharma: {
    id: 'pharma',
    name: 'Pharmaceuticals',
    shortName: 'Pharma',
    tagline: 'GDP-compliant storage, zero-error retrieval',
    headline: 'GDP & FEFO Audit-Ready Controlled Storage',
    description:
      'Pharmaceutical storage demands strict environmental control, batch traceability, FEFO compliance and audit-ready records.',
    painPoints: [
      'FEFO / FIFO compliance in manual storage is error-prone and time-consuming',
      'Batch traceability gaps expose manufacturers to regulatory risk',
      'Temperature-sensitive zones are difficult to manage in large floor layouts',
    ],
    recommendedProducts: ['stolift', 'stomat', 'storder'],
    recommendedProduct: 'STOLIFT VLM with Batch & Access Control',
    complianceNotes: [],
    calculatorPreset: {
      suggestedFloorArea: 3000,
      suggestedCeilingHeight: 18,
      suggestedSkuCount: 3000,
      suggestedDailyPicks: '100-300',
    },
    icon: 'FlaskConical',
    accentColor: '#1FBF8F',
    href: '/industries/pharma',
  },
  chemicals: {
    id: 'chemicals',
    name: 'Chemicals',
    shortName: 'Chemicals',
    tagline: 'Safe, segregated, software-controlled storage',
    headline: 'Hazmat-Safe Segregated Industrial Stores',
    description:
      'Chemical storage requires physical segregation of incompatible materials, access control, spillage containment design and chemical inventory records.',
    painPoints: [
      'Physical segregation of incompatible chemicals in dense storage is complex',
      'Spillage risk in floor-stacked chemical storage',
    ],
    recommendedProducts: ['compactors-racking', 'stolift'],
    recommendedProduct: 'STOMAT Mobile Compactors + Segregated Trays',
    complianceNotes: [],
    calculatorPreset: {
      suggestedFloorArea: 4000,
      suggestedCeilingHeight: 16,
      suggestedSkuCount: 1000,
      suggestedDailyPicks: '50-150',
    },
    icon: 'Beaker',
    accentColor: '#4F8EF7',
    href: '/industries/chemicals',
  },
  '3pl': {
    id: '3pl',
    name: '3PL & Warehousing',
    shortName: '3PL',
    tagline: 'Higher density. Faster turns. Happier clients.',
    headline: 'Maximum Density & High-Throughput Fulfillment',
    description:
      '3PL operators compete on throughput, accuracy and cost per pick. Space Magnum systems increase storage density to accommodate more clients.',
    painPoints: [
      'Floor space is the primary cost — density improvements go directly to margin',
      'Client SLAs demand pick accuracy and speed that manual stores cannot sustain',
    ],
    recommendedProducts: ['stolift', 'storder', 'compactors-racking'],
    recommendedProduct: 'STORDER Goods-to-Person Multi-Client System',
    complianceNotes: [],
    calculatorPreset: {
      suggestedFloorArea: 10000,
      suggestedCeilingHeight: 25,
      suggestedSkuCount: 10000,
      suggestedDailyPicks: '500-2000',
    },
    icon: 'Warehouse',
    accentColor: '#9B59B6',
    href: '/industries/3pl',
  },
  manufacturing: {
    id: 'manufacturing',
    name: 'General Manufacturing',
    shortName: 'Manufacturing',
    tagline: 'Stores that keep production moving',
    headline: 'High-Density Spare Parts & Tooling Storage',
    description:
      'General manufacturers need stores that are fast, accurate and space-efficient — without the complexity of bespoke automation.',
    painPoints: [
      'Production downtime caused by delayed or missing stores items',
      'Sprawling stores taking space that could be used for production',
    ],
    recommendedProducts: ['stolift', 'stomat', 'compactors-racking'],
    recommendedProduct: 'STOMAT Vertical Carousel for Spare Parts & Tooling',
    complianceNotes: [],
    calculatorPreset: {
      suggestedFloorArea: 6000,
      suggestedCeilingHeight: 20,
      suggestedSkuCount: 4000,
      suggestedDailyPicks: '100-400',
    },
    icon: 'Factory',
    accentColor: '#E74C3C',
    href: '/industries/manufacturing',
  },
}

export const INDUSTRIES: Industry[] = Object.values(INDUSTRIES_MAP)
export const INDUSTRY_LIST = INDUSTRIES
