'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { usageTracker } from '@/lib/usageTracker'

export function useFreeTrial() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [showSignInPopup, setShowSignInPopup] = useState(false)
  const [showPremiumPopup, setShowPremiumPopup] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    
    // Check auth status
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    checkUser()
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          setUser(session?.user ?? null)
          setShowSignInPopup(false)
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
        }
        setLoading(false)
      }
    )
    
    return () => subscription.unsubscribe()
  }, [])

  const checkAccess = (type: 'cssSubject' | 'cssIdioms' | 'cssIdiomsRandom' | 'mptMock' | 'mptPast' | 'officialPast' | 'solved'): boolean => {
    // Check if user is premium (for future implementation)
    const isPremium = user?.user_metadata?.is_premium || false

    // Premium users get unlimited access
    if (isPremium) return true

    // Solved papers require premium (always blocked for non-premium)
    if (type === 'solved') return false

    // Check limits based on auth status
    const isSignedIn = !!user
    switch (type) {
      case 'cssSubject':
        return usageTracker.canTakeCSSSubjectQuiz(isSignedIn)
      case 'cssIdioms':
        return usageTracker.canTakeCSSIdiomsQuiz(isSignedIn)
      case 'cssIdiomsRandom':
        return usageTracker.canTakeCSSIdiomsRandom(isSignedIn)
      case 'mptMock':
        return usageTracker.canTakeMPTMockTest(isSignedIn)
      case 'mptPast':
        return usageTracker.canTakeMPTPastPaper(isSignedIn)
      case 'officialPast':
        return usageTracker.canViewOfficialPastPaper(isSignedIn)
      default:
        return false
    }
  }

  const requestAccess = (type: 'cssSubject' | 'cssIdioms' | 'cssIdiomsRandom' | 'mptMock' | 'mptPast' | 'officialPast' | 'solved'): boolean => {
    const isPremium = user?.user_metadata?.is_premium || false
    const isSignedIn = !!user

    // Premium users get unlimited access
    if (isPremium) return true

    // Solved papers require premium (redirect to premium page)
    if (type === 'solved') {
      if (isSignedIn) {
        router.push('/css/premium')
      } else {
        setShowSignInPopup(true)
      }
      return false
    }

    if (checkAccess(type)) {
      // Increment usage for the appropriate tier
      switch (type) {
        case 'cssSubject':
          usageTracker.incrementCSSSubjectQuiz(isSignedIn)
          break
        case 'cssIdioms':
          usageTracker.incrementCSSIdiomsQuiz(isSignedIn)
          break
        case 'cssIdiomsRandom':
          usageTracker.incrementCSSIdiomsRandom(isSignedIn)
          break
        case 'mptMock':
          usageTracker.incrementMPTMockTest(isSignedIn)
          break
        case 'mptPast':
          usageTracker.incrementMPTPastPaper(isSignedIn)
          break
        case 'officialPast':
          usageTracker.incrementOfficialPastPaper(isSignedIn)
          break
      }
      return true
    } else {
      // Show appropriate feedback based on user state
      if (isSignedIn) {
        // Signed-in user hit their limit → redirect to premium page
        router.push('/css/premium')
      } else {
        // Guest user hit their limit → show sign-in popup
        setShowSignInPopup(true)
      }
      return false
    }
  }

  const getTrialStatus = () => {
    const isSignedIn = !!user
    const isPremium = user?.user_metadata?.is_premium || false

    if (isPremium) {
      return { isSignedIn: true, isPremium: true, remaining: null }
    }

    const remaining = usageTracker.getRemaining(isSignedIn)
    return {
      isSignedIn,
      isPremium: false,
      remaining,
      hasTrialLeft: Object.values(remaining).some(count => count > 0)
    }
  }

  return {
    user,
    loading,
    showSignInPopup,
    setShowSignInPopup,
    showPremiumPopup,
    setShowPremiumPopup,
    checkAccess,
    requestAccess,
    getTrialStatus
  }
}