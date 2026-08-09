'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getFreshAuthUser } from '@/lib/auth/fresh-user'
import type { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * AuthProvider - Single source of truth for user authentication
 * Prevents duplicate Supabase calls across the entire app
 * Shares auth state across all components via context
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // Only initialize once
    if (initialized) return

    const supabase = createClient()

    // Check initial auth state (fires once on mount)
    const checkInitialAuth = async () => {
      try {
        const currentUser = await getFreshAuthUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Failed to check initial auth:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    const runAuthCheck = () => {
      void checkInitialAuth()
    }

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(runAuthCheck, { timeout: 2500 })
    } else {
      setTimeout(runAuthCheck, 0)
    }

    // Re-sync when tab regains focus (picks up admin premium grants without re-login).
    // Soft refresh only — hard Auth refreshes are rate-limited inside getFreshAuthUser.
    let lastVisibleAt = 0
    const onVisible = () => {
      if (document.visibilityState !== 'visible') return
      const now = Date.now()
      if (now - lastVisibleAt < 5 * 60 * 1000) return
      lastVisibleAt = now
      void getFreshAuthUser().then(setUser).catch(() => {})
    }
    document.addEventListener('visibilitychange', onVisible)

    // Subscribe to auth changes (triggered by sign in/out/token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (
          event === 'SIGNED_IN' ||
          event === 'TOKEN_REFRESHED' ||
          event === 'USER_UPDATED'
        ) {
          setUser(session?.user ?? null)
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
        }
        setLoading(false)
      }
    )

    setInitialized(true)

    // Cleanup subscription on unmount
    return () => {
      document.removeEventListener('visibilitychange', onVisible)
      subscription?.unsubscribe()
    }
  }, [initialized])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to access auth context
 * Ensures components don't make their own Supabase auth calls
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
