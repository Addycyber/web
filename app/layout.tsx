import type { Metadata } from 'next'
import { Syne, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'
import { constructMetadata } from '@/lib/metadata'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileActionBar } from '@/components/layout/MobileActionBar'
import { CookieBanner } from '@/components/analytics/CookieBanner'
import { Analytics } from '@/components/analytics/Analytics'
import { JsonLd } from '@/components/seo/JsonLd'

// Syne — bold, geometric display font for headings
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

// DM Sans — clean, modern humanist for body
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

// DM Mono — for technical specs and code
const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = constructMetadata({
  title: 'Automated Storage & Retrieval Systems (ASRS)',
  description:
    'Pune, India based manufacturer of automated vertical lift modules (STOMAT), carousel systems, and heavy-duty industrial compactors. Reclaim up to 85% warehouse floor space.',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${dmMono.variable} dark scroll-smooth`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen bg-[#0A0D14] text-zinc-100 font-sans antialiased selection:bg-orange-500 selection:text-zinc-950 flex flex-col">
        {/* Accessibility Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-orange-500 text-zinc-950 font-bold rounded-md shadow-lg"
        >
          Skip to main content
        </a>

        {/* Global Layout Shell */}
        <Header />
        
        <main id="main-content" className="flex-1 pt-20">
          {children}
        </main>

        <Footer />
        <MobileActionBar />
        
        {/* Compliance & Analytics */}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}
