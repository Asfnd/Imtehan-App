'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle, ArrowRight, LogOut, Zap, Users, BookOpen, Trophy } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [signingIn, setSigningIn] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null)
      setLoading(false)
    })
    supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null)
      setLoading(false)
    })
  }, [])

  const handleSignIn = async () => {
    try {
      setSigningIn(true)
      const supabase = createClient()
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin
      const redirectTo = `${baseUrl}/auth/callback?next=${encodeURIComponent('/dashboard')}`

      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      })
    } catch (error) {
      console.error('Sign in error:', error)
      setSigningIn(false)
    }
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-600 text-lg">You're signed in and ready to practice</p>
          </div>

          {/* User Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-200">
            <div className="flex items-center gap-6 mb-8">
              {user.user_metadata?.avatar_url && (
                <img
                  src={user.user_metadata.avatar_url}
                  alt={user.user_metadata?.full_name}
                  className="w-24 h-24 rounded-full border-4 border-purple-200 shadow-lg"
                />
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {user.user_metadata?.full_name || 'User'}
                </h2>
                <p className="text-gray-600 mb-3">{user.email}</p>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Account Active</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105"
              >
                <Zap className="w-5 h-5" />
                Go to Dashboard
              </Link>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
                Back to Home
              </Link>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors border border-red-200"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-gray-900">Unlimited Access</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Access all 10,000+ practice questions, past papers, and solutions without limits.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-6 h-6 text-purple-600" />
                <h3 className="font-bold text-gray-900">Join 2,000+ Students</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Join successful CSS candidates and achieve your 95% pass rate.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CSS Practice Hub
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Benefits & Features */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                  Start Your CSS Exam Journey Today
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  Sign in to access unlimited practice questions, past papers, and expert solutions. Join 2,000+ successful CSS candidates.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Try First with Free Trial</h3>
                    <p className="text-sm text-gray-600">Experience the platform with limited free trials before committing</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-200/50">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">10,000+ Practice Questions</h3>
                    <p className="text-sm text-gray-600">Comprehensive MCQs across all CSS subjects with detailed explanations</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-pink-200/50">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">1,000+ Past Papers</h3>
                    <p className="text-sm text-gray-600">Official CSS exam papers from previous years with complete solutions</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-indigo-200/50">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Performance Tracking</h3>
                    <p className="text-sm text-gray-600">Monitor your progress, identify weak areas, and improve systematically</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-300">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">2000+</div>
                  <p className="text-sm text-gray-600">Students Prepared</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">95%</div>
                  <p className="text-sm text-gray-600">Pass Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-1">100%</div>
                  <p className="text-sm text-gray-600">Free Access</p>
                </div>
              </div>
            </div>

            {/* Right Column - Sign In Card */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                  {/* Gradient Header */}
                  <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 flex items-end p-8">
                    <h2 className="text-2xl font-bold text-white">Get Started Free</h2>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <p className="text-gray-600 text-center mb-6">
                      Sign in with your Google account to unlock unlimited access to all CSS preparation resources.
                    </p>

                    {/* Google Sign In Button */}
                    <button
                      onClick={handleSignIn}
                      disabled={signingIn}
                      className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mb-6"
                    >
                      {signingIn ? (
                        <>
                          <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                          <span>Signing in...</span>
                        </>
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
                          <span>Sign in with Google</span>
                        </>
                      )}
                    </button>

                    {/* Divider */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">or</span>
                      </div>
                    </div>

                    {/* Secondary CTA */}
                    <Link
                      href="/"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-900 font-semibold rounded-xl hover:from-blue-200 hover:to-purple-200 transition-all"
                    >
                      <ArrowRight className="w-5 h-5" />
                      Back to Home
                    </Link>

                    {/* Footer */}
                    <p className="text-xs text-gray-500 text-center mt-6">
                      By signing in, you agree to our{' '}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </p>

                    {/* Free Trial Badge */}
                    <div className="mt-6 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <p className="text-xs text-green-800 text-center font-medium">
                        ✨ Try free with limited trial before signing in
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}