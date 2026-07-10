'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getFreshAuthUser } from '@/lib/auth/fresh-user'
import { usageTracker } from '@/lib/usageTracker'
import { PREMIUM_PAGE_PATH } from '@/lib/routes'
import { isActivePremium } from '@/lib/is-active-premium'
import { SIGNED_IN_LIMITS, type FreeTrialUsageType } from '@/lib/free-trial-limits'
import { claimDemoPractice } from '@/lib/practice-client'

async function fetchWithSupabaseAuth(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  const headers = new Headers(init?.headers)
  if (session?.access_token) {
    headers.set('Authorization', `Bearer ${session.access_token}`)
  }
  return fetch(input, { ...init, credentials: 'include', headers })
}

interface DatabaseUsage {
  cssSubjectQuizzes: number
  cssIdiomsQuizzes: number
  cssIdiomsRandom: number
  mptMockTests: number
  mptPastPapers: number
  officialPastPapers: number
  solvedPapers: number
}

export function useFreeTrial() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [showSignInPopup, setShowSignInPopup] = useState(false)
  const [showPremiumPopup, setShowPremiumPopup] = useState(false)
  const [loading, setLoading] = useState(true)
  const [dbUsage, setDbUsage] = useState<DatabaseUsage | null>(null)
  const [usageLoading, setUsageLoading] = useState(false)

  // Fetch database usage for signed-in users
  const fetchDatabaseUsage = async () => {
    if (!user) return

    setUsageLoading(true)
    try {
      const response = await fetchWithSupabaseAuth('/api/usage')
      if (response.ok) {
        const data = await response.json()
        setDbUsage(data.usage)
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to fetch database usage:', error)
      }
    } finally {
      setUsageLoading(false)
    }
  }

  useEffect(() => {
    const supabase = createClient()

    // Check auth status — refresh session so premium metadata from Supabase is current
    const checkUser = async () => {
      const user = await getFreshAuthUser()
      setUser(user)
      setLoading(false)

      // Fetch database usage if signed in
      if (user) {
        await fetchDatabaseUsage()
      }
    }
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (
          event === 'SIGNED_IN' ||
          event === 'TOKEN_REFRESHED' ||
          event === 'USER_UPDATED'
        ) {
          setUser(session?.user ?? null)
          setShowSignInPopup(false)
          // Fetch database usage immediately
          if (session?.user) {
            await fetchDatabaseUsage()
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          setDbUsage(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Re-fetch database usage when user changes
  useEffect(() => {
    if (user && !dbUsage && !usageLoading) {
      fetchDatabaseUsage()
    }
  }, [user])

  const checkAccess = (type: FreeTrialUsageType): boolean => {
    const isPremium = isActivePremium(user)
    const isSignedIn = !!user

    // Premium users get unlimited access
    if (isPremium) return true

    // Solved papers and guess papers require premium
    if (type === 'solved' || type === 'guessPapers') return false

    // Signed-in free: database limits only (never fall back to guest localStorage)
    if (isSignedIn) {
      if (!dbUsage) return false
      const usageMap: Record<string, keyof DatabaseUsage> = {
        cssSubject: 'cssSubjectQuizzes',
        cssIdioms: 'cssIdiomsQuizzes',
        cssIdiomsRandom: 'cssIdiomsRandom',
        mptMock: 'mptMockTests',
        mptPast: 'mptPastPapers',
        officialPast: 'officialPastPapers',
        solved: 'solvedPapers',
      }

      const usageKey = usageMap[type]
      const currentUsage = dbUsage[usageKey] || 0
      const limit = SIGNED_IN_LIMITS[type]

      return currentUsage < limit
    }

    // Guest: localStorage demo credits
    switch (type) {
      case 'cssSubject':
        return usageTracker.canTakeCSSSubjectQuiz(false)
      case 'cssIdioms':
        return usageTracker.canTakeCSSIdiomsQuiz(false)
      case 'cssIdiomsRandom':
        return usageTracker.canTakeCSSIdiomsRandom(false)
      case 'mptMock':
        return usageTracker.canTakeMPTMockTest(false)
      case 'mptPast':
        return usageTracker.canTakeMPTPastPaper(false)
      case 'officialPast':
        return usageTracker.canViewOfficialPastPaper(false)
      default:
        return false
    }
  }

  const requestAccess = async (type: FreeTrialUsageType): Promise<boolean> => {
    const isPremium = isActivePremium(user)
    const isSignedIn = !!user

    // Premium users get unlimited access
    if (isPremium) return true

    // Solved papers and guess papers require premium
    if (type === 'solved' || type === 'guessPapers') {
      if (isSignedIn) {
        router.push(PREMIUM_PAGE_PATH)
      } else {
        setShowSignInPopup(true)
      }
      return false
    }

    // Check if user has access
    if (checkAccess(type)) {
      // Server-side demo claim for guests (localStorage alone is not enough)
      if (!isSignedIn) {
        const claim = await claimDemoPractice(`credit:${type}`)
        if (!claim.ok) {
          if (claim.code === 'PREMIUM_REQUIRED') {
            router.push(PREMIUM_PAGE_PATH)
          } else {
            setShowSignInPopup(true)
          }
          return false
        }
      }

      // For signed-in users, increment in database
      if (isSignedIn) {
        try {
          const response = await fetchWithSupabaseAuth('/api/usage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type }),
          })

          if (response.ok) {
            // Refresh database usage after increment
            await fetchDatabaseUsage()
          }
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Failed to increment database usage:', error)
          }
        }
      } else {
        // For guest users, use localStorage
        switch (type) {
          case 'cssSubject':
            usageTracker.incrementCSSSubjectQuiz(false)
            break
          case 'cssIdioms':
            usageTracker.incrementCSSIdiomsQuiz(false)
            break
          case 'cssIdiomsRandom':
            usageTracker.incrementCSSIdiomsRandom(false)
            break
          case 'mptMock':
            usageTracker.incrementMPTMockTest(false)
            break
          case 'mptPast':
            usageTracker.incrementMPTPastPaper(false)
            break
          case 'officialPast':
            usageTracker.incrementOfficialPastPaper(false)
            break
        }
      }
      return true
    } else {
      // User hit their limit
      if (isSignedIn) {
        // Signed-in user → redirect to premium page
        router.push(PREMIUM_PAGE_PATH)
      } else {
        // Guest user → show sign-in popup
        setShowSignInPopup(true)
      }
      return false
    }
  }

  const getTrialStatus = () => {
    const isSignedIn = !!user
    const isPremium = isActivePremium(user)

    if (isPremium) {
      return { isSignedIn: true, isPremium: true, remaining: null }
    }

    // For signed-in users, calculate from database usage
    if (isSignedIn && dbUsage) {
      return {
        isSignedIn: true,
        isPremium: false,
        remaining: {
          cssSubjectQuizzes: Math.max(0, SIGNED_IN_LIMITS.cssSubject - (dbUsage.cssSubjectQuizzes || 0)),
          cssIdiomsQuizzes: Math.max(0, SIGNED_IN_LIMITS.cssIdioms - (dbUsage.cssIdiomsQuizzes || 0)),
          cssIdiomsRandom: Math.max(0, SIGNED_IN_LIMITS.cssIdiomsRandom - (dbUsage.cssIdiomsRandom || 0)),
          mptMockTests: Math.max(0, SIGNED_IN_LIMITS.mptMock - (dbUsage.mptMockTests || 0)),
          mptPastPapers: Math.max(0, SIGNED_IN_LIMITS.mptPast - (dbUsage.mptPastPapers || 0)),
          officialPastPapers: Math.max(0, SIGNED_IN_LIMITS.officialPast - (dbUsage.officialPastPapers || 0)),
          solvedPapers: 0,
        },
        hasTrialLeft: Object.entries(dbUsage).some(([key, value]) => {
          // Map database field names to limit keys
          const limitKey = key === 'cssSubjectQuizzes' ? 'cssSubject' :
                           key === 'cssIdiomsQuizzes' ? 'cssIdioms' :
                           key === 'cssIdiomsRandom' ? 'cssIdiomsRandom' :
                           key === 'mptMockTests' ? 'mptMock' :
                           key === 'mptPastPapers' ? 'mptPast' :
                           key === 'officialPastPapers' ? 'officialPast' : 'solved'
          const limit = SIGNED_IN_LIMITS[limitKey as keyof typeof SIGNED_IN_LIMITS]
          return value < limit
        })
      }
    }

    // For guest users, use localStorage
    const remaining = usageTracker.getRemaining(false)
    return {
      isSignedIn: false,
      isPremium: false,
      remaining,
      hasTrialLeft: Object.values(remaining).some(count => count > 0)
    }
  }

  return {
    user,
    loading: loading || usageLoading,
    showSignInPopup,
    setShowSignInPopup,
    showPremiumPopup,
    setShowPremiumPopup,
    checkAccess,
    requestAccess,
    getTrialStatus,
  }
}
