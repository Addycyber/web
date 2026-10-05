import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { constructMetadata } from '@/lib/metadata'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileActionBar } from '@/components/layout/MobileActionBar'
import { CookieBanner } from '@/components/analytics/CookieBanner'
import { Analytics } from '@/components/analytics/Analytics'
import { JsonLd } from '@/components/seo/JsonLd'

// Font setup with font-display: swap for performance
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-orange-500 selection:text-zinc-950 flex flex-col">
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
