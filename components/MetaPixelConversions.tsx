'use client'

import { useEffect, useRef } from 'react'
import { useAuth } from '@/lib/contexts/AuthContext'
import {
  trackCompleteRegistration,
  trackStartTrial,
  trackSubscribe,
} from '@/lib/analytics/metaPixel'
import { isActivePremium } from '@/lib/is-active-premium'

const keyCr = (id: string) => `fbq_complete_registration_${id}`
const keyTrial = (id: string) => `fbq_start_trial_${id}`
const keySub = (id: string) => `fbq_subscribe_${id}`

/**
 * One-time conversion events tied to Supabase auth (client-side).
 * Deduplicated with localStorage so refreshes don't re-fire.
 */
export function MetaPixelConversions() {
  const { user, loading } = useAuth()
  const prevPremium = useRef<boolean | null>(null)

  // CompleteRegistration + StartTrial (free tier): once per user id
  useEffect(() => {
    if (loading || !user?.id) return

    const id = user.id

    if (typeof window === 'undefined') return

    if (!localStorage.getItem(keyCr(id))) {
      trackCompleteRegistration()
      localStorage.setItem(keyCr(id), '1')
    }

    if (!localStorage.getItem(keyTrial(id))) {
      if (!isActivePremium(user)) {
        trackStartTrial()
        localStorage.setItem(keyTrial(id), '1')
      }
    }
  }, [user, loading])

  // Subscribe: when active premium flips from false to true (activation after payment)
  useEffect(() => {
    if (loading || !user?.id) {
      if (!user) prevPremium.current = null
      return
    }

    const premium = isActivePremium(user)
    const id = user.id

    if (prevPremium.current === false && premium === true) {
      if (typeof window !== 'undefined' && !localStorage.getItem(keySub(id))) {
        trackSubscribe({ currency: 'PKR' })
        localStorage.setItem(keySub(id), '1')
      }
    }

    prevPremium.current = premium
  }, [user, loading])

  return null
}
