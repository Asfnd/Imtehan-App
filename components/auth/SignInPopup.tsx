'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { X, Lock } from 'lucide-react'
import { useAnimation } from '@/lib/hooks/useAnimation'

interface SignInPopupProps {
  isOpen: boolean
  onClose: () => void
  message?: string
}

export default function SignInPopup({ isOpen, onClose, message = "Sign in to unlock this content" }: SignInPopupProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const supabase = createClient()
      
      // Store current path to redirect back after sign-in
      const currentPath = window.location.pathname + window.location.search
      
      // Use the correct base URL for production
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin
      const redirectTo = `${baseUrl}/auth/callback?next=${encodeURIComponent(currentPath)}`
      
      console.log('🔐 Initiating Google OAuth with redirectTo:', redirectTo)
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      })
      
      if (error) {
        console.error('❌ OAuth error:', error)
        
        // Provide more helpful error messages
        let errorMessage = error.message
        if (error.message.includes('redirect_uri_mismatch')) {
          errorMessage = 'Redirect URI mismatch. Please check Google Console configuration. Visit /oauth-diagnostic for help.'
        } else if (error.message.includes('invalid_client')) {
          errorMessage = 'OAuth client not configured. Please check Supabase dashboard → Authentication → Providers → Google.'
        }
        
        setError(errorMessage)
        setLoading(false)
        return
      }
      
      console.log('✅ OAuth initiated successfully')
      // The browser will redirect automatically
      
    } catch (error: any) {
      console.error('❌ Error signing in with Google:', error)
      setError(error?.message || 'Failed to sign in. Please try again.')
      setLoading(false)
    }
  }

  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-backdrop-in"
          >
            {/* Popup */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-modal-in"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Content */}
              <div className="p-8 text-center">
                {/* Lock Icon with Animation */}
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Lock className="w-10 h-10 text-white" />
                </div>

                {/* Message */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Unlock Premium Content
                </h2>
                <p className="text-gray-600 mb-8">
                  {message}
                </p>

                {/* Google Sign In Button */}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group hover-scale-sm"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                  ) : (
                    <>
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span className="text-base">Sign in with Google</span>
                    </>
                  )}
                </button>

                {/* Error Message */}
                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-xs text-red-600 font-medium">{error}</p>
                  </div>
                )}

                {/* Additional Info */}
                <p className="text-xs text-gray-500 mt-4">
                  By signing in, you agree to our Terms of Service
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full -translate-x-16 -translate-y-16" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-400/10 rounded-full translate-x-16 translate-y-16" />
            </div>
          </div>
        </>
      )}
    </>
  )
}
