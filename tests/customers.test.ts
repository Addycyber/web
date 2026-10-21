import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { CustomerLogoTile } from '../components/home/CustomerLogoTile'
import {
  filterApprovedCustomers,
  hasPublicCustomerWall,
} from '../lib/customers'

function customer(
  id: number,
  approved: boolean,
  needsReview = false,
  logo: string | null = null
) {
  return { id, approved, needsReview, logo }
}

describe('Customer logo wall approval rules', () => {
  it('hides the public wall when all customer records are unapproved', () => {
    const customers = Array.from({ length: 10 }, (_, index) =>
      customer(index, false)
    )
    const approved = filterApprovedCustomers(customers)

    expect(approved).toHaveLength(0)
    expect(hasPublicCustomerWall(approved.length)).toBe(false)
  })

  it('shows ten customers with approved, review-cleared records and logos', () => {
    const customers = Array.from({ length: 10 }, (_, index) =>
      customer(index, true, false, `customers/${index}.svg`)
    )
    const approved = filterApprovedCustomers(customers)

    expect(approved).toHaveLength(10)
    expect(hasPublicCustomerWall(approved.length)).toBe(true)
  })

  it('keeps approved customers without logos for the text-name fallback', () => {
    const customers = Array.from({ length: 10 }, (_, index) =>
      customer(
        index,
        true,
        false,
        index < 3 ? null : `customers/${index}.svg`
      )
    )
    const approved = filterApprovedCustomers(customers)

    expect(approved).toHaveLength(10)
    expect(approved.filter((record) => record.logo === null)).toHaveLength(3)
    expect(hasPublicCustomerWall(approved.length)).toBe(true)

    const textFallbacks = approved
      .filter((record) => record.logo === null)
      .map((record) =>
        renderToStaticMarkup(
          createElement(CustomerLogoTile, {
            customer: {
              id: String(record.id),
              name: `Customer ${record.id}`,
              locations: [],
              logoSrc: null,
              preview: false,
            },
          })
        )
      )
    expect(textFallbacks).toHaveLength(3)
    expect(textFallbacks.every((markup) => markup.includes('<span'))).toBe(true)
    expect(textFallbacks.every((markup) => !markup.includes('<img'))).toBe(true)
  })

  it('excludes records still marked for review and enforces six approvals', () => {
    expect(filterApprovedCustomers([customer(1, true, true)])).toHaveLength(0)
    expect(hasPublicCustomerWall(5)).toBe(false)
    expect(hasPublicCustomerWall(6)).toBe(true)
  })
})
