'use client'

import { useEffect, useState } from 'react'
import { FollowUsPopup } from '@/components/social/FollowUs'
import {
  markFirstQuizFollowPromptSeen,
  shouldShowFirstQuizFollowPrompt,
} from '@/lib/social-follow'

/**
 * Shows a one-time Instagram/Facebook follow popup shortly after a learner
 * first starts an interactive quiz. Shares a single localStorage gate with
 * the post-auth welcome prompt so we never double-prompt.
 */
export function FirstQuizFollowPrompt({ enabled = true }: { enabled?: boolean }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!enabled) return
    if (!shouldShowFirstQuizFollowPrompt()) return

    const timer = window.setTimeout(() => {
      markFirstQuizFollowPromptSeen()
      setOpen(true)
    }, 1800)

    return () => window.clearTimeout(timer)
  }, [enabled])

  return (
    <FollowUsPopup
      isOpen={open}
      onClose={() => setOpen(false)}
      eyebrow="Welcome to Imtehan"
      title="Follow us for tips & updates"
      description="Short practice tips, exam reminders, and new sets — where you already scroll."
    />
  )
}
