import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'spacemagnum.com',
      },
    ],
  },
  async redirects() {
    return [
      // ─── 301 Redirects for legacy spacemagnum.com URLs ──────────────────
      // Matches implementation_plan.md Section 2 exactly.
      // Extension: old site used .htm (not .html) per Section 2 table.

      { source: '/index.html',            destination: '/',                        permanent: true },
      { source: '/about.htm',             destination: '/about',                   permanent: true },
      { source: '/services.htm',          destination: '/about',                   permanent: true },
      { source: '/solutions.htm',         destination: '/products',                permanent: true },
      { source: '/stomat.htm',            destination: '/products/stomat',         permanent: true },
      { source: '/stolift.htm',           destination: '/products/stolift',        permanent: true },
      { source: '/storder.htm',           destination: '/products/storder',        permanent: true },
      // STOPICK merged into STORDER family per implementation_plan.md §2
      { source: '/stopick.htm',           destination: '/products/storder',        permanent: true },
      { source: '/stomat-compactors.htm', destination: '/products/compactors-racking', permanent: true },
      // STOLONG merged into compactors-racking per implementation_plan.md §2
      { source: '/stolong.htm',           destination: '/products/compactors-racking', permanent: true },
      { source: '/other-products.htm',    destination: '/products',                permanent: true },
      { source: '/customer.htm',          destination: '/proof',                   permanent: true },
      { source: '/contact.htm',           destination: '/contact',                 permanent: true },
      { source: '/enquiry.htm',           destination: '/get-a-quote',             permanent: true },
      { source: '/download.htm',          destination: '/resources',               permanent: true },
      { source: '/sitemap.htm',           destination: '/sitemap.xml',             permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
