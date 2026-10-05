import { describe, it, expect } from 'vitest'
import { calculateSpaceReclaim } from '../config/calculator'

describe('Space Reclaim Calculator Formulas', () => {
  it('calculates floor area reduction correctly for standard inputs', () => {
    const result = calculateSpaceReclaim({
      floorAreaSqFt: 5000,
      ceilingHeightFt: 20,
      skuCount: 5000,
      storageType: 'static-racking',
      dailyPicks: '200-500',
      staffCount: 4,
      rentPerSqFtMonthly: 75,
    })

    expect(result.spaceSavedSqFt.min).toBeGreaterThan(0)
    expect(result.spaceSavedSqFt.max).toBeGreaterThan(result.spaceSavedSqFt.min)
    expect(result.newFootprintSqFt.max).toBeLessThan(5000)
    expect(result.annualRentSavingsINR.min).toBeGreaterThan(0)
  })

  it('handles small floor area edge cases without negative values', () => {
    const result = calculateSpaceReclaim({
      floorAreaSqFt: 500,
      ceilingHeightFt: 12,
      skuCount: 500,
      storageType: 'open-shelving',
      dailyPicks: 'under-50',
      staffCount: 1,
    })

    expect(result.spaceSavedSqFt.min).toBeGreaterThanOrEqual(0)
    expect(result.newFootprintSqFt.min).toBeGreaterThan(0)
  })
})
