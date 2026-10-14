import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/config/site'
import { PRODUCTS } from '@/config/products'
import { INDUSTRIES } from '@/config/industries'

/**
 * Sitemap — only lists routes that have a corresponding page.tsx
 * Add a route here only once the page file is created and building cleanly.
 *
 * URL naming decision (reconciling audit note):
 *   Legal pages live at /legal/privacy, /legal/terms, /legal/cookies
 *   (matching the existing app/legal/* folder structure).
 *   The plan used /privacy-policy etc — this file uses the actual folder paths.
 *   Update implementation_plan.md Section 5 when the canonical name is settled.
 *
 * Routes intentionally omitted until pages are built:
 *   /resources, /resources/blog, /resources/downloads, /resources/buyers-guide
 *   /resources/faq, /resources/glossary, /tools/product-finder, /studio
 *   /get-a-quote/thank-you, /case-studies, /case-studies/[slug]
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url

  // ─── Static pages that exist ──────────────────────────────────────────────
  const staticRoutes = [
    '',              // /   ← homepage
    '/products',
    '/tools/calculator',
    '/tools/simulator',
    '/proof',
    '/about',
    '/contact',
    '/get-a-quote',
    '/legal/privacy',
    '/legal/terms',
    '/legal/cookies',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // ─── Product detail pages (/products/[id]) — all 4 exist ──────────────────
  const productRoutes = PRODUCTS.map((p) => ({
    url: `${baseUrl}/products/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // ─── Industry pages (/industries/[id]) — all 5 exist ──────────────────────
  const industryRoutes = INDUSTRIES.map((ind) => ({
    url: `${baseUrl}/industries/${ind.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...staticRoutes, ...productRoutes, ...industryRoutes]
}
