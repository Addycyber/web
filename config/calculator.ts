/**
 * Space Reclaim Calculator — Configuration
 */

import type { ProductId } from './products'
import type { IndustryId } from './industries'

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
  rentPerSqFtMonthly?: number
  floorCostPerSqFtPerMonth?: number
}

export interface ProductRecommendation {
  productId: ProductId
  reason: string
  confidence: 'primary' | 'secondary'
}

export interface CalculatorResults {
  inputs: CalculatorInputs
  spaceSavedSqFt: { min: number; max: number }
  spaceReclaimedSqFt: { min: number; max: number }
  spaceReclaimedPct: { min: number; max: number }
  newFootprintSqFt: { min: number; max: number }
  annualRentSavingsINR: { min: number; max: number }
  pickingTimeReductionPct: { min: number; max: number }
  labourReductionFte: { min: number; max: number }
  annualSpaceCostSaving?: { min: number; max: number }
  recommendations: ProductRecommendation[]
  paybackBand: string
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

  const rentMonthly = inputs.rentPerSqFtMonthly || inputs.floorCostPerSqFtPerMonth || 75
  const annualRentMin = spaceReclaimedMin * rentMonthly * 12
  const annualRentMax = spaceReclaimedMax * rentMonthly * 12

  const labourMin = Math.max(0, Math.floor(inputs.staffCount * 0.3))
  const labourMax = Math.min(inputs.staffCount, Math.ceil(inputs.staffCount * 0.6))

  return {
    inputs,
    spaceSavedSqFt: { min: spaceReclaimedMin, max: spaceReclaimedMax },
    spaceReclaimedSqFt: { min: spaceReclaimedMin, max: spaceReclaimedMax },
    spaceReclaimedPct: { min: spaceReclaimedPctMin, max: spaceReclaimedPctMax },
    newFootprintSqFt: { min: newFootprintMin, max: newFootprintMax },
    annualRentSavingsINR: { min: annualRentMin, max: annualRentMax },
    pickingTimeReductionPct: { min: 40, max: 70 },
    labourReductionFte: { min: labourMin, max: labourMax },
    annualSpaceCostSaving: { min: annualRentMin, max: annualRentMax },
    recommendations: [
      { productId: 'stolift', reason: 'High ceiling utilization for maximum storage density', confidence: 'primary' },
      { productId: 'stomat', reason: 'Rapid carousel item retrieval for frequent picking', confidence: 'secondary' },
    ],
    paybackBand: '12 – 18 Months',
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
