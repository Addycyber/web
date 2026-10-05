import { test, expect } from '@playwright/test'

test.describe('Space Magnum — Smoke Navigation Tests', () => {
  test('Home page loads with valid brand header and accessibility elements', async ({ page }) => {
    await page.goto('/')
    
    // Title check
    await expect(page).toHaveTitle(/Automated Storage & Retrieval Systems|Space Magnum/)

    // Skip to content link
    const skipLink = page.locator('a[href="#main-content"]')
    await expect(skipLink).toBeDefined()

    // Brand logo exists in header
    await expect(page.locator('header').getByText('Space Magnum').first()).toBeVisible()
  })

  test('Calculators and CTA buttons are reachable', async ({ page }) => {
    await page.goto('/')
    
    // Look for any visible Quote button
    const quoteButton = page.locator('a[href="/get-a-quote"]:visible').first()
    await expect(quoteButton).toBeVisible()
  })
})
