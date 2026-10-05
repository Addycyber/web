import { test, expect } from '@playwright/test'

test.describe('Legacy 301 Redirect Smoke Tests', () => {
  const redirects = [
    { from: '/stomat.html', to: '/products/stomat' },
    { from: '/stolift.html', to: '/products/stolift' },
    { from: '/storder.html', to: '/products/storder' },
    { from: '/contactus.html', to: '/contact' },
    { from: '/aboutus.html', to: '/about' },
  ]

  for (const r of redirects) {
    test(`Redirects ${r.from} to ${r.to}`, async ({ page }) => {
      await page.goto(r.from)
      await expect(page).toHaveURL(new RegExp(r.to))
    })
  }
})
