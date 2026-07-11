'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackMetaPageView } from '@/lib/analytics/metaPixel'

/**
 * Fires Meta PageView on client-side navigations (App Router).
 * Initial load is covered by the base pixel snippet in MetaPixel, so we skip the first effect to avoid double counting.
 *
 * Avoids useSearchParams so root layout does not bail out to CSR.
 */
export function MetaPixelRouteTracker() {
  const pathname = usePathname()
  const skipFirst = useRef(true)

  useEffect(() => {
    if (skipFirst.current) {
      skipFirst.current = false
      return
    }
    const search = typeof window !== 'undefined' ? window.location.search.replace(/^\?/, '') : ''
    const url = search ? `${pathname}?${search}` : pathname
    trackMetaPageView({ content_name: url })
  }, [pathname])

  return null
}
