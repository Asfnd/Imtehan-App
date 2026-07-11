'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FollowUsPopup } from '@/components/social/FollowUs'
import {
  markFirstQuizFollowPromptSeen,
  shouldShowFirstQuizFollowPrompt,
} from '@/lib/social-follow'

/**
 * After OAuth, auth callback appends ?welcome=1. Show a one-time follow
 * popup, then strip the query so refreshes stay clean. Shares the same
 * localStorage gate as the first-quiz prompt (never spam twice).
 */
export function PostAuthFollowPrompt() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)

  const clearWelcomeParam = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (!params.has('welcome')) return
    params.delete('welcome')
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }, [pathname, router, searchParams])

  useEffect(() => {
    if (searchParams.get('welcome') !== '1') return
    if (!shouldShowFirstQuizFollowPrompt()) {
      clearWelcomeParam()
      return
    }

    markFirstQuizFollowPromptSeen()
    const t = window.setTimeout(() => setOpen(true), 700)
    return () => window.clearTimeout(t)
  }, [searchParams, clearWelcomeParam])

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
