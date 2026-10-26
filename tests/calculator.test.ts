import { describe, expect, it } from 'vitest'
import { calculateBrochureSpaceSaving } from '../config/calculator'

describe('brochure-based floor-space illustration', () => {
  it('applies the selected product brochure percentage to the entered area', () => {
    expect(calculateBrochureSpaceSaving('stomat', 5000)).toEqual({
      inputAreaSqFt: 5000,
      statedSaving: '40%',
      areaSavedSqFt: 2000,
    })
  })

  it('preserves a fractional result rather than rounding it', () => {
    expect(calculateBrochureSpaceSaving('stolift', 12.5).areaSavedSqFt).toBe(5)
  })

  it('rejects invalid floor areas and products without a sourced saving', () => {
    expect(() => calculateBrochureSpaceSaving('stomat', 0)).toThrow(RangeError)
    expect(() => calculateBrochureSpaceSaving('storder', 500)).toThrow(/No valid brochure-stated/)
    expect(() => calculateBrochureSpaceSaving('unknown', 500)).toThrow(/Unknown product/)
  })
})
