'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackMetaPageView } from '@/lib/analytics/metaPixel'

/**
 * Fires Meta PageView on client-side navigations (App Router).
 * Initial load is covered by the base pixel snippet in MetaPixel — we skip the first effect to avoid double counting.
 */
export function MetaPixelRouteTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const skipFirst = useRef(true)

  useEffect(() => {
    if (skipFirst.current) {
      skipFirst.current = false
      return
    }
    const search = searchParams?.toString()
    const url = search ? `${pathname}?${search}` : pathname
    trackMetaPageView({ content_name: url })
  }, [pathname, searchParams])

  return null
}
