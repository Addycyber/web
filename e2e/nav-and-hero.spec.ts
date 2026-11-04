import { expect, test } from '@playwright/test'

test('navigation and hero work across desktop and mobile widths without browser errors', async ({ page }, testInfo) => {
  const consoleErrors: string[] = []
  const consoleWarnings: string[] = []
  const pageErrors: string[] = []
  const failedRequests: string[] = []

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
    if (message.type() === 'warning') consoleWarnings.push(message.text())
  })
  page.on('pageerror', (error) => pageErrors.push(error.message))
  page.on('requestfailed', (request) => {
    const failure = request.failure()?.errorText ?? 'failed'
    if (failure !== 'net::ERR_ABORTED') {
      failedRequests.push(`${request.method()} ${request.url()}: ${failure}`)
    }
  })

  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /AUTOMATED STORAGE/ })).toBeVisible()

  for (const width of [1440, 1024]) {
    await page.setViewportSize({ width, height: 900 })
    const products = page.getByRole('button', { name: 'Products' })
    await products.click()
    await expect(page.locator('#products-menu')).toBeVisible()
    await products.click()
    await expect(page.locator('#products-menu')).toHaveCount(0)

    await products.focus()
    await products.press('ArrowDown')
    await expect(page.locator('#products-menu a').first()).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(products).toBeFocused()

    await page.mouse.move(0, 0)
    await products.hover()
    await expect(page.locator('#products-menu')).toBeVisible()
    await page.locator('main').click({ position: { x: 8, y: 180 } })
    await expect(page.locator('#products-menu')).toHaveCount(0)

    const resources = page.getByRole('button', { name: 'Resources' })
    await resources.click()
    await expect(page.locator('#resources-menu')).toBeVisible()
    await page.locator('main').click({ position: { x: 8, y: 180 } })
    await expect(page.locator('#resources-menu')).toHaveCount(0)
  }

  if (testInfo.project.name === 'mobile-chrome') {
    const products = page.getByRole('button', { name: 'Products' })
    const bounds = await products.boundingBox()
    if (!bounds) throw new Error('The desktop Products control is not visible at 1024px.')
    await page.touchscreen.tap(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2)
    await expect(page.locator('#products-menu')).toBeVisible()
    await page.touchscreen.tap(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2)
    await expect(page.locator('#products-menu')).toHaveCount(0)
  }

  await page.getByRole('button', { name: 'Next slide' }).click()
  await expect(page.getByRole('heading', { name: /RECLAIM/ })).toBeVisible()
  const themeToggle = page.getByRole('button', { name: /Switch to (light|dark) theme/ }).first()
  const previousThemeLabel = await themeToggle.getAttribute('aria-label')
  await themeToggle.click()
  await expect(themeToggle).not.toHaveAttribute('aria-label', previousThemeLabel ?? '')

  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open navigation menu' }).click()
  await expect(page.locator('#mobile-navigation')).toBeVisible()
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
  await page.locator('#mobile-navigation').getByRole('link', { name: /^STOMAT/ }).click()
  await expect(page).toHaveURL(/\/products\/stomat$/)
  await expect(page.locator('#mobile-navigation')).toHaveCount(0)
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')

  for (const route of [
    '/',
    '/products',
    '/products/stomat',
    '/solutions',
    '/brochure',
    '/gallery',
    '/simulator',
    '/tools/calculator',
    '/contact',
    '/get-a-quote',
  ]) {
    const response = await page.goto(route)
    expect(response?.status(), `${route} should load`).toBeLessThan(400)
  }

  const diagnostics = { consoleErrors, consoleWarnings, pageErrors, failedRequests }
  console.log(`Browser diagnostics: ${JSON.stringify(diagnostics)}`)
  expect(diagnostics).toEqual({
    consoleErrors: [],
    consoleWarnings: [],
    pageErrors: [],
    failedRequests: [],
  })
})
