'use client'

import { GoogleAnalytics as GA } from '@next/third-parties/google'
import Script from 'next/script'

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  // Only render if GA ID is configured
  if (!gaId || gaId === 'G-XXXXXXXXXX') {
    console.log('GA ID not configured:', gaId)
    return null
  }

  console.log('Loading Google Analytics with ID:', gaId)

  return (
    <>
      {/* Method 1: Using @next/third-parties */}
      <GA gaId={gaId} />
      
      {/* Method 2: Direct script as fallback */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
