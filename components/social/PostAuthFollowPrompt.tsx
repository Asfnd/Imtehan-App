'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { FollowUsPopup } from '@/components/social/FollowUs'
import {
  markFirstQuizFollowPromptSeen,
  shouldShowFirstQuizFollowPrompt,
} from '@/lib/social-follow'

/**
 * After OAuth, auth callback appends ?welcome=1. Show a one-time follow
 * popup, then strip the query so refreshes stay clean. Shares the same
 * localStorage gate as the first-quiz prompt (never spam twice).
 *
 * Reads window.location.search in an effect (not useSearchParams) so the
 * root layout does not bail out to full client-side rendering.
 */
export function PostAuthFollowPrompt() {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const clearWelcomeParam = useCallback(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (!params.has('welcome')) return
    params.delete('welcome')
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }, [pathname, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('welcome') !== '1') return
    if (!shouldShowFirstQuizFollowPrompt()) {
      clearWelcomeParam()
      return
    }

    markFirstQuizFollowPromptSeen()
    const t = window.setTimeout(() => setOpen(true), 700)
    return () => window.clearTimeout(t)
  }, [clearWelcomeParam, pathname])

  const handleClose = () => {
    setOpen(false)
    clearWelcomeParam()
  }

  return (
    <FollowUsPopup
      isOpen={open}
      onClose={handleClose}
      eyebrow="Welcome"
      title="You're in — follow along"
      description="Get practice tips and exam updates on Instagram & Facebook."
    />
  )
}
