import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['127.0.0.1'],
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 85],
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
      { source: '/aboutus.html',          destination: '/about',                   permanent: true },
      { source: '/services.htm',          destination: '/about',                   permanent: true },
      { source: '/solutions.htm',         destination: '/solutions',               permanent: true },
      { source: '/solutions.html',        destination: '/solutions',               permanent: true },
      { source: '/stomat.htm',            destination: '/products/stomat',         permanent: true },
      { source: '/stomat.html',           destination: '/products/stomat',         permanent: true },
      { source: '/stolift.htm',           destination: '/products/stolift',        permanent: true },
      { source: '/stolift.html',          destination: '/products/stolift',        permanent: true },
      { source: '/storder.htm',           destination: '/products/storder',        permanent: true },
      { source: '/storder.html',          destination: '/products/storder',        permanent: true },
      { source: '/stopick.htm',           destination: '/products/stopick',       permanent: true },
      { source: '/stopick.html',          destination: '/products/stopick',       permanent: true },
      { source: '/stomat-compactors.htm', destination: '/products/compactors-racking', permanent: true },
      { source: '/stolong.htm',           destination: '/products/stolong',       permanent: true },
      { source: '/stolong.html',          destination: '/products/stolong',       permanent: true },
      { source: '/other-products.htm',    destination: '/products',                permanent: true },
      { source: '/customer.htm',          destination: '/about',                   permanent: true },
      { source: '/contact.htm',           destination: '/contact',                 permanent: true },
      { source: '/contactus.html',        destination: '/contact',                 permanent: true },
      { source: '/enquiry.htm',           destination: '/get-a-quote',             permanent: true },
      { source: '/download.htm',          destination: '/resources/downloads',    permanent: true },
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
