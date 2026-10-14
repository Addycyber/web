/**
 * Space Reclaim Calculator — Configuration
 *
 * CONFIRM REGISTER:
 * - The default rentPerSqFtMonthly fallback of 75 INR/sq.ft/month is a
 *   conservative placeholder. [CONFIRM C-25] exact default with engineering team.
 * - Space-saving % bands per storage type: [CONFIRM C-25] with engineering.
 * - Labour reduction % bands: [CONFIRM C-26] with engineering.
 * - Payback range: excluded from v1 per [CONFIRM C-24]; removed from output.
 */

import type { ProductId } from './products'
import type { IndustryId } from './industries'
import { INDUSTRIES_MAP } from './industries'

export type StorageType = 'open-shelving' | 'static-racking' | 'floor-stacking' | 'other'

export type DailyPicksBand =
  | 'under-50'
  | '50-200'
  | '200-500'
  | '500-1000'
  | 'over-1000'

export interface CalculatorInputs {
  industry?: IndustryId
  floorAreaSqFt: number
  ceilingHeightFt: number
  skuCount: number
  storageType: StorageType
  dailyPicks: DailyPicksBand
  staffCount: number
  /** Monthly rent / opportunity cost per sq.ft in INR.
   *  If not supplied, defaults to 75 INR — see [CONFIRM C-25] */
  rentPerSqFtMonthly?: number
  floorCostPerSqFtPerMonth?: number
}

export interface ProductRecommendation {
  productId: ProductId
  reason: string
  confidence: 'primary' | 'secondary'
}

/** Throughput boost lookup: higher daily-pick volumes → larger picking-time reduction */
const PICKS_THROUGHPUT_BOOST: Record<DailyPicksBand, { min: number; max: number }> = {
  'under-50':    { min: 25, max: 45 },
  '50-200':      { min: 35, max: 55 },
  '200-500':     { min: 45, max: 65 },
  '500-1000':    { min: 55, max: 72 },
  'over-1000':   { min: 60, max: 80 },
}

export interface CalculatorResults {
  inputs: CalculatorInputs
  spaceSavedSqFt: { min: number; max: number }
  spaceReclaimedSqFt: { min: number; max: number }
  spaceReclaimedPct: { min: number; max: number }
  newFootprintSqFt: { min: number; max: number }
  annualRentSavingsINR: { min: number; max: number }
  /** Picking-time reduction %; wired to dailyPicks band — [CONFIRM C-26] */
  pickingTimeReductionPct: { min: number; max: number }
  labourReductionFte: { min: number; max: number }
  annualSpaceCostSaving?: { min: number; max: number }
  recommendations: ProductRecommendation[]
  /** rentFallbackUsed: true if user didn't supply rent and default 75 was applied */
  rentFallbackUsed: boolean
}

export const SPACE_SAVING_BY_STORAGE_TYPE: Record<
  StorageType,
  { min: number; max: number }
> = {
  'floor-stacking': { min: 0.55, max: 0.75 },
  'open-shelving': { min: 0.45, max: 0.65 },
  'static-racking': { min: 0.35, max: 0.55 },
  other: { min: 0.35, max: 0.60 },
}

export function ceilingHeightMultiplier(heightFt: number): number {
  if (heightFt >= 30) return 1.15
  if (heightFt >= 24) return 1.10
  if (heightFt >= 18) return 1.05
  if (heightFt >= 12) return 1.00
  return 0.90
}

/** Resolve product recommendations from the industry config, falling back
 *  to a sensible generic pair if no industry is selected. */
function resolveRecommendations(industry?: IndustryId): ProductRecommendation[] {
  if (industry && INDUSTRIES_MAP[industry]) {
    const ind = INDUSTRIES_MAP[industry]
    const products = ind.recommendedProducts
    return products.slice(0, 3).map((productId, i) => ({
      productId,
      reason:
        i === 0
          ? `Top-rated configuration for ${ind.shortName} sector requirements`
          : `Complementary system for ${ind.shortName} throughput and density`,
      confidence: i === 0 ? 'primary' : 'secondary',
    }))
  }
  // Generic fallback — no industry selected
  return [
    { productId: 'stolift', reason: 'High ceiling utilisation for maximum storage density', confidence: 'primary' },
    { productId: 'stomat',  reason: 'Rapid carousel item retrieval for frequent picking',   confidence: 'secondary' },
  ]
}

const DEFAULT_RENT_PER_SQFT = 75 // INR/sq.ft/month — [CONFIRM C-25]

export function calculateResults(inputs: CalculatorInputs): CalculatorResults {
  const storageType = inputs.storageType || 'static-racking'
  const spaceSaving = SPACE_SAVING_BY_STORAGE_TYPE[storageType] || SPACE_SAVING_BY_STORAGE_TYPE.other
  const heightMult = ceilingHeightMultiplier(inputs.ceilingHeightFt || 15)

  const spaceReclaimedMin = Math.round(inputs.floorAreaSqFt * spaceSaving.min * heightMult)
  const spaceReclaimedMax = Math.round(inputs.floorAreaSqFt * spaceSaving.max * heightMult)

  const spaceReclaimedPctMin = Math.min(85, Math.round((spaceReclaimedMin / inputs.floorAreaSqFt) * 100))
  const spaceReclaimedPctMax = Math.min(85, Math.round((spaceReclaimedMax / inputs.floorAreaSqFt) * 100))

  const newFootprintMin = Math.max(50, inputs.floorAreaSqFt - spaceReclaimedMax)
  const newFootprintMax = Math.max(50, inputs.floorAreaSqFt - spaceReclaimedMin)

  const suppliedRent = inputs.rentPerSqFtMonthly || inputs.floorCostPerSqFtPerMonth
  const rentFallbackUsed = !suppliedRent
  const rentMonthly = suppliedRent ?? DEFAULT_RENT_PER_SQFT

  const annualRentMin = spaceReclaimedMin * rentMonthly * 12
  const annualRentMax = spaceReclaimedMax * rentMonthly * 12

  const labourMin = Math.max(0, Math.floor(inputs.staffCount * 0.3))
  const labourMax = Math.min(inputs.staffCount, Math.ceil(inputs.staffCount * 0.6))

  // Wire dailyPicks into throughput output
  const dailyPicks = inputs.dailyPicks || '200-500'
  const throughput = PICKS_THROUGHPUT_BOOST[dailyPicks] || PICKS_THROUGHPUT_BOOST['200-500']

  return {
    inputs,
    spaceSavedSqFt:       { min: spaceReclaimedMin,    max: spaceReclaimedMax },
    spaceReclaimedSqFt:   { min: spaceReclaimedMin,    max: spaceReclaimedMax },
    spaceReclaimedPct:    { min: spaceReclaimedPctMin, max: spaceReclaimedPctMax },
    newFootprintSqFt:     { min: newFootprintMin,       max: newFootprintMax },
    annualRentSavingsINR: { min: annualRentMin,         max: annualRentMax },
    pickingTimeReductionPct: { min: throughput.min,     max: throughput.max },
    labourReductionFte:   { min: labourMin,             max: labourMax },
    annualSpaceCostSaving:{ min: annualRentMin,         max: annualRentMax },
    recommendations: resolveRecommendations(inputs.industry),
    rentFallbackUsed,
    // paybackBand intentionally omitted — see [CONFIRM C-24]
  }
}

export const calculateSpaceReclaim = calculateResults

export function encodeCalculatorInputs(inputs: CalculatorInputs): string {
  return Buffer.from(JSON.stringify(inputs)).toString('base64url')
}

export function decodeCalculatorInputs(encoded: string): CalculatorInputs | null {
  try {
    return JSON.parse(Buffer.from(encoded, 'base64url').toString('utf-8')) as CalculatorInputs
  } catch {
    return null
  }
}
