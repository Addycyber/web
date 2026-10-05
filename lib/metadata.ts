import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/config/site'

interface PageMetadataOptions {
  title: string
  description: string
  path?: string
  ogImage?: string
  noIndex?: boolean
}

export function constructMetadata({
  title,
  description,
  path = '',
  ogImage = '/og-default.png',
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_CONFIG.url}${path}`

  return {
    title: {
      default: `${title} | ${SITE_CONFIG.name}`,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description,
    keywords: [
      'ASRS Systems India',
      'Automated Storage and Retrieval System Pune',
      'Vertical Lift Module Manufacturer India',
      'Industrial Storage Equipment India',
      'STOMAT Compactors',
      'STOLIFT Vertical Carousel',
      'Warehouse Automation India',
      'Space Magnum Equipments',
    ],
    authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_CONFIG.name}`,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  }
}
