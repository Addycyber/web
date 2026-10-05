import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/config/site'
import { PRODUCTS } from '@/config/products'
import { INDUSTRIES } from '@/config/industries'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url

  const staticRoutes = [
    '',
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

  const productRoutes = PRODUCTS.map((p) => ({
    url: `${baseUrl}/products/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const industryRoutes = INDUSTRIES.map((ind) => ({
    url: `${baseUrl}/industries/${ind.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...staticRoutes, ...productRoutes, ...industryRoutes]
}
