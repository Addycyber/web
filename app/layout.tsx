import type { Metadata } from 'next'
import './globals.css'
import { fontVariables } from '@/lib/fonts'
import { constructMetadata } from '@/lib/metadata'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileActionBar } from '@/components/layout/MobileActionBar'
import { CookieBanner } from '@/components/analytics/CookieBanner'
import { Analytics } from '@/components/analytics/Analytics'
import { JsonLd } from '@/components/seo/JsonLd'
import { FloatingActions } from '@/components/layout/FloatingActions'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { getApprovedCustomers, hasPublicCustomerWall } from '@/lib/customers'

export const metadata: Metadata = constructMetadata({
  title: 'Automated Storage & Retrieval Systems (ASRS)',
  description:
    'Pune, India based manufacturer of STOMAT vertical carousel storage, STOLIFT shuttle retrieval systems, and mobile shelving.',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const showCustomerLink = hasPublicCustomerWall(getApprovedCustomers().length)

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontVariables} scroll-smooth`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('sm-theme');var t=(s==='dark'||s==='light')?s:'light';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`,
          }}
        />
        <JsonLd />
      </head>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-body antialiased selection:bg-[var(--accent)] selection:text-white flex flex-col transition-colors duration-150">
        <ThemeProvider>
          {/* Accessibility Skip Link */}
          <a
            href="#main-content"
            className="skip-to-content"
          >
            Skip to main content
          </a>

          {/* Scroll progress indicator */}
          <ScrollProgress />

          {/* Global Header */}
          <Header showCustomerLink={showCustomerLink} />
          
          <main id="main-content" className="flex-1 overflow-x-clip">
            {children}
          </main>

          {/* Global Footer */}
          <Footer showCustomerLink={showCustomerLink} />

          {/* Mobile Bottom Quick Action Bar */}
          <MobileActionBar />

          {/* Floating WhatsApp and Call Hub */}
          <FloatingActions />
          
          {/* Compliance & Analytics */}
          <CookieBanner />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
