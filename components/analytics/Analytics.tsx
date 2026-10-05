'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { SITE_CONFIG } from '@/config/site'

export function Analytics() {
  const [consentGranted, setConsentGranted] = useState(false)

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem('sm_cookie_consent')
      setConsentGranted(consent === 'granted')
    }

    checkConsent()
    window.addEventListener('sm_consent_updated', checkConsent)
    return () => window.removeEventListener('sm_consent_updated', checkConsent)
  }, [])

  if (!consentGranted) return null

  // If GA4 or Clarity IDs are missing, don't crash
  const gaId = SITE_CONFIG.analytics.gaMeasurementId
  const clarityId = SITE_CONFIG.analytics.clarityProjectKey

  return (
    <>
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {clarityId && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      )}
    </>
  )
}
