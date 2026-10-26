import { getProduct } from '../lib/company'

export interface BrochureSpaceSaving {
  inputAreaSqFt: number
  statedSaving: string
  areaSavedSqFt: number
}

export function calculateBrochureSpaceSaving(
  productSlug: string,
  inputAreaSqFt: number,
): BrochureSpaceSaving {
  if (!Number.isFinite(inputAreaSqFt) || inputAreaSqFt <= 0) {
    throw new RangeError('Floor area must be a positive finite number.')
  }

  const product = getProduct(productSlug)
  if (!product) throw new Error(`Unknown product "${productSlug}".`)

  const statedSaving = product.facts.find((fact) => fact.label === 'Floor-space saving')?.value
  if (!statedSaving || !/^\d+(?:\.\d+)?%$/.test(statedSaving)) {
    throw new Error(`No valid brochure-stated floor-space saving is available for ${product.name}.`)
  }

  const percentage = Number.parseFloat(statedSaving) / 100
  return {
    inputAreaSqFt,
    statedSaving,
    areaSavedSqFt: inputAreaSqFt * percentage,
  }
}
