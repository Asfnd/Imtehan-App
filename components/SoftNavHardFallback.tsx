'use client'

import { useEffect } from 'react'

/**
 * If a same-origin <Link> soft-nav stalls (common when an edge HTML shell
 * and RSC payload disagree after deploy), hard-navigate so the first click
 * still lands on the destination.
 */
export function SoftNavHardFallback() {
  useEffect(() => {
    let pendingHref: string | null = null
    let timer: ReturnType<typeof setTimeout> | null = null

    const clear = () => {
      pendingHref = null
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    }

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor) return
      if (anchor.target && anchor.target !== '_self') return
      if (anchor.hasAttribute('download')) return

      const raw = anchor.getAttribute('href')
      if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return

      let url: URL
      try {
        url = new URL(raw, window.location.href)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname && url.search === window.location.search) return

      clear()
      pendingHref = `${url.pathname}${url.search}${url.hash}`
      const startedPath = window.location.pathname + window.location.search
      timer = setTimeout(() => {
        if (!pendingHref) return
        const now = window.location.pathname + window.location.search
        if (now === startedPath) {
          window.location.assign(pendingHref)
        }
        clear()
      }, 900)
    }

    document.addEventListener('click', onClick, true)
    window.addEventListener('popstate', clear)
    window.addEventListener('pageshow', clear)
    return () => {
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('popstate', clear)
      window.removeEventListener('pageshow', clear)
      clear()
    }
  }, [])

  return null
}
