'use client'

import { useEffect, useState } from 'react'
import { FollowUsPopup } from '@/components/social/FollowUs'
import {
  markFirstQuizFollowPromptSeen,
  shouldShowFirstQuizFollowPrompt,
} from '@/lib/social-follow'

/**
 * Shows a one-time Instagram/Facebook follow popup shortly after a learner
 * first starts an interactive quiz. Safe to mount on every quiz surface.
 */
export function FirstQuizFollowPrompt({ enabled = true }: { enabled?: boolean }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!enabled) return
    if (!shouldShowFirstQuizFollowPrompt()) return

    const timer = window.setTimeout(() => {
      markFirstQuizFollowPromptSeen()
      setOpen(true)
    }, 1600)

    return () => window.clearTimeout(timer)
  }, [enabled])

  return <FollowUsPopup isOpen={open} onClose={() => setOpen(false)} />
}
