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
      // 301 Redirects for legacy spacemagnum.com URLs
      { source: '/aboutus.html', destination: '/about', permanent: true },
      { source: '/stomat.html', destination: '/products/stomat', permanent: true },
      { source: '/stolift.html', destination: '/products/stolift', permanent: true },
      { source: '/storder.html', destination: '/products/storder', permanent: true },
      { source: '/stopick.html', destination: '/products/stomat', permanent: true },
      { source: '/stolong.html', destination: '/products/stomat', permanent: true },
      { source: '/compactors.html', destination: '/products/compactors-racking', permanent: true },
      { source: '/contactus.html', destination: '/contact', permanent: true },
      { source: '/clients.html', destination: '/proof', permanent: true },
      { source: '/gallery.html', destination: '/products', permanent: true },
      { source: '/products.html', destination: '/products', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
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
