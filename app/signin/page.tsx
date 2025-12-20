'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SignInPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null)
    })
    supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null)
    })
  }, [])

  const signIn = () => {
    const supabase = createClient()
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { 
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(window.location.pathname)}`
      }
    })
  }

  const signOut = () => {
    const supabase = createClient()
    supabase.auth.signOut()
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        {user ? (
          <div className="text-center">
            <img src={user.user_metadata?.avatar_url} className="w-16 h-16 rounded-full mx-auto mb-4" />
            <p className="font-bold">{user.user_metadata?.full_name}</p>
            <p className="text-gray-600 mb-4">{user.email}</p>
            <button onClick={signOut} className="w-full bg-red-500 text-white py-2 rounded">
              Sign Out
            </button>
          </div>
        ) : (
          <button onClick={signIn} className="w-full bg-blue-500 text-white py-3 rounded">
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  )
}