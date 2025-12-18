'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { usageTracker } from '@/lib/usageTracker'

export function useFreeTrial() {
  const [user, setUser] = useState<any>(null)
  const [showSignInPopup, setShowSignInPopup] = useState(false)
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
    // If user is signed in, allow unlimited access
    if (user) return true

    // Solved papers require sign-in (no free trial)
    if (type === 'solved') return false

    // Check free trial limits for other types - persistent across sessions
    switch (type) {
      case 'cssSubject':
        return usageTracker.canTakeCSSSubjectQuiz()
      case 'cssIdioms':
        return usageTracker.canTakeCSSIdiomsQuiz()
      case 'cssIdiomsRandom':
        return usageTracker.canTakeCSSIdiomsRandom()
      case 'mptMock':
        return usageTracker.canTakeMPTMockTest()
      case 'mptPast':
        return usageTracker.canTakeMPTPastPaper()
      case 'officialPast':
        return usageTracker.canViewOfficialPastPaper()
      default:
        return false
    }
  }

  const requestAccess = (type: 'cssSubject' | 'cssIdioms' | 'cssIdiomsRandom' | 'mptMock' | 'mptPast' | 'officialPast' | 'solved'): boolean => {
    if (user) return true

    // Solved papers require sign-in (no free trial)
    if (type === 'solved') {
      setShowSignInPopup(true)
      return false
    }

    if (checkAccess(type)) {
      // Increment usage for free trial types - persistent tracking
      switch (type) {
        case 'cssSubject':
          usageTracker.incrementCSSSubjectQuiz()
          break
        case 'cssIdioms':
          usageTracker.incrementCSSIdiomsQuiz()
          break
        case 'cssIdiomsRandom':
          usageTracker.incrementCSSIdiomsRandom()
          break
        case 'mptMock':
          usageTracker.incrementMPTMockTest()
          break
        case 'mptPast':
          usageTracker.incrementMPTPastPaper()
          break
        case 'officialPast':
          usageTracker.incrementOfficialPastPaper()
          break
      }
      return true
    } else {
      // Show sign-in popup when limits exceeded
      setShowSignInPopup(true)
      return false
    }
  }

  const getTrialStatus = () => {
    if (user) return { isSignedIn: true, remaining: null }
    
    const remaining = usageTracker.getRemaining()
    return { 
      isSignedIn: false, 
      remaining,
      hasTrialLeft: Object.values(remaining).some(count => count > 0)
    }
  }

  return {
    user,
    loading,
    showSignInPopup,
    setShowSignInPopup,
    checkAccess,
    requestAccess,
    getTrialStatus
  }
}