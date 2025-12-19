'use client'

import { GoogleAnalytics as GA } from '@next/third-parties/google'

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  // Only render if GA ID is configured
  if (!gaId || gaId === 'G-XXXXXXXXXX') {
    return null
  }

  return <GA gaId={gaId} />
}
