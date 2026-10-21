import { Manrope, Inter, IBM_Plex_Mono } from 'next/font/google'

/**
 * SPACE MAGNUM TYPOGRAPHY SYSTEM
 * Headings: Manrope (600, 700, 800)
 * Body & UI: Inter (400, 500, 600)
 * Technical specs, measurements, numbers: IBM Plex Mono (400, 500)
 *
 * Designed to cleanly allow future Hindi / Marathi addition (e.g. Noto_Sans_Devanagari)
 * without touching component markup.
 */

export const fontHeading = Manrope({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['600', '700', '800'],
})

export const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

// Combined font class name for the RootLayout <html> tag
export const fontVariables = `${fontHeading.variable} ${fontBody.variable} ${fontMono.variable}`
