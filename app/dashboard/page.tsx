'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
// Removed framer-motion for faster loading
import { BookOpen, FileText, Target, User, Volume2, VolumeX, LogOut } from 'lucide-react'
import FeedbackButton from '@/components/FeedbackButton'
import { createClient } from '@/lib/supabase/client'
import { usageTracker } from '@/lib/usageTracker'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [remaining, setRemaining] = useState({ cssQuizzes: 1, mptTests: 0, papers: 2 })
  // Extract first name only from full name or email
  const getFirstName = () => {
    if (user?.user_metadata?.name) {
      return user.user_metadata.name.split(' ')[0]
    }
    if (user?.email) {
      return user.email.split('@')[0]
    }
    return "Guest"
  }
  const username = getFirstName()

  useEffect(() => {
    const supabase = createClient()
    
    checkUser()
    loadSettings()
    updateRemaining()
    
    // Listen for auth state changes for smooth sign-in experience
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event, 'User:', session?.user?.email)
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setUser(session?.user ?? null)
          setAuthLoading(false)
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          setAuthLoading(false)
        }
      }
    )
    
    // Update counter every second for real-time updates
    const interval = setInterval(updateRemaining, 1000)
    
    return () => {
      subscription.unsubscribe()
      clearInterval(interval)
    }
  }, [])
  
  const updateRemaining = () => {
    const rem = usageTracker.getRemaining()
    setRemaining(rem)
  }

  const checkUser = async () => {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    console.log('Check user result:', user?.email, error)
    setUser(user)
    setAuthLoading(false)
  }

  const loadSettings = () => {
    const sound = localStorage.getItem('soundEnabled')
    setSoundEnabled(sound !== 'false')
  }

  const toggleSound = () => {
    const newValue = !soundEnabled
    setSoundEnabled(newValue)
    localStorage.setItem('soundEnabled', String(newValue))
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    router.refresh()
  }

  const handleGoogleSignIn = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    })
  }



  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="relative h-screen overflow-hidden flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-semibold">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen overflow-hidden flex flex-col">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Modern Premium Top Bar - Mobile Responsive */}
      <div className="relative z-20 mx-2 sm:mx-4 mt-2 sm:mt-4">
        <div className="bg-gradient-to-r from-white/95 via-white/90 to-white/95 backdrop-blur-2xl rounded-xl sm:rounded-2xl shadow-xl border border-white/60 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3.5 gap-2">
            {/* Left: User Info with Modern Badge */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <div className="relative active:scale-110 transition-transform duration-200 flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                {user && (
                  <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 rounded-full border-2 border-white shadow-md"></div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-gray-900 text-sm sm:text-base leading-tight truncate">{username}</p>
                <p className="text-xs sm:text-sm text-gray-600 font-medium truncate">
                  {user ? user.email : `Free Trial • ${remaining.cssQuizzes} quizzes left`}
                </p>
              </div>
            </div>

            {/* Right: Controls with Better Spacing */}
            <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
              {/* Sound Toggle - More Prominent */}
              <button
                onClick={toggleSound}
                className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl transition-all active:scale-90 ${
                  soundEnabled 
                    ? 'bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 shadow-lg' 
                    : 'bg-gray-100 active:bg-gray-200 shadow-md'
                }`}
                title={soundEnabled ? 'Sound On' : 'Sound Off'}
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                ) : (
                  <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                )}
              </button>

              {/* Auth Buttons - Improved Design */}
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 active:from-red-600 active:via-rose-600 active:to-pink-600 text-white rounded-lg sm:rounded-xl transition-all shadow-lg active:shadow-xl active:scale-95 font-bold text-xs sm:text-sm"
                >
                  <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                  <span className="sm:hidden">Out</span>
                </button>
              ) : (
                <button
                  onClick={handleGoogleSignIn}
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 active:from-blue-700 active:via-indigo-700 active:to-purple-700 text-white rounded-lg sm:rounded-xl transition-all shadow-lg active:shadow-xl active:scale-95 font-bold text-xs sm:text-sm whitespace-nowrap"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white"/>
                  </svg>
                  <span className="hidden sm:inline">Sign in with Google</span>
                  <span className="sm:hidden">Sign in</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-2 sm:px-4 pb-2 sm:pb-4 z-10 overflow-y-auto">
        <div className="w-full max-w-5xl">{/* Content wrapper */}

          {/* Modern Header */}
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Welcome back, {username}!
            </h1>
            <p className="text-sm sm:text-base text-gray-700">
              Choose your practice mode
            </p>
          </div>

          {/* Modern Practice Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {/* MPT Practice */}
          <div
            className="group relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-lg active:shadow-2xl transition-all duration-300 ease-out cursor-pointer border-2 border-blue-200 active:border-blue-500 active:-translate-y-1 active:scale-105"
            onClick={() => router.push('/mpt-practice')}
          >
            <div className="relative">
              <div className="text-center mb-4 sm:mb-5">
                <div className="inline-flex p-4 sm:p-5 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl sm:rounded-3xl shadow-2xl mb-3 sm:mb-4 transition-all duration-300">
                  <Target className="w-8 h-8 sm:w-10 sm:h-10 text-white transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-gray-900 text-xl sm:text-2xl mb-2 transition-all duration-300">MPT</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  MCQ-Based Preliminary Test
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
                <div className="flex items-center justify-between text-xs sm:text-sm bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-blue-100 transition-transform">
                  <span className="text-gray-700 font-medium">Questions</span>
                  <span className="font-bold text-blue-600 text-base sm:text-lg">500+</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-indigo-100 transition-transform">
                  <span className="text-gray-700 font-medium">Mock Tests</span>
                  <span className="font-bold text-indigo-600 text-base sm:text-lg">Timed</span>
                </div>
              </div>

              <button className="group/btn w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm active:scale-95 active:shadow-xl transition-all duration-300 ease-out overflow-hidden relative">
                <span className="relative flex items-center justify-center gap-2 sm:gap-3">
                  <span className="transition-all duration-300">Start Practice</span>
                  <span className="transition-all duration-300">→</span>
                </span>
              </button>
            </div>
          </div>

          {/* CSS Practice */}
          <div
            className="group relative bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-lg active:shadow-2xl transition-all duration-300 ease-out cursor-pointer border-2 border-purple-200 active:border-purple-500 active:-translate-y-1 active:scale-105"
            onClick={() => router.push('/css-practice')}
          >
            <div className="relative">
              <div className="text-center mb-4 sm:mb-5">
                <div className="inline-flex p-4 sm:p-5 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl shadow-2xl mb-3 sm:mb-4 transition-all duration-300">
                  <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-gray-900 text-xl sm:text-2xl mb-2 transition-all duration-300">CSS MCQs</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Practice Past CSS MCQs
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
                <div className="flex items-center justify-between text-xs sm:text-sm bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-purple-100 transition-transform">
                  <span className="text-gray-700 font-medium">Questions</span>
                  <span className="font-bold text-purple-600 text-base sm:text-lg">2,500+</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-pink-100 transition-transform">
                  <span className="text-gray-700 font-medium">Subjects</span>
                  <span className="font-bold text-pink-600 text-base sm:text-lg">40+</span>
                </div>
              </div>

              <button className="group/btn w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm active:scale-95 active:shadow-xl transition-all duration-300 ease-out overflow-hidden relative">
                <span className="relative flex items-center justify-center gap-2 sm:gap-3">
                  <span className="transition-all duration-300">Start Practice</span>
                  <span className="transition-all duration-300">→</span>
                </span>
              </button>
            </div>
          </div>

          {/* Past Papers */}
          <div
            className="group relative bg-gradient-to-br from-white via-green-50 to-emerald-50 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-lg active:shadow-2xl transition-all duration-300 ease-out cursor-pointer border-2 border-green-200 active:border-green-500 active:-translate-y-1 active:scale-105"
            onClick={() => router.push('/past-papers')}
          >
            <div className="relative">
              <div className="text-center mb-4 sm:mb-5">
                <div className="inline-flex p-4 sm:p-5 bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-2xl sm:rounded-3xl shadow-2xl mb-3 sm:mb-4 transition-all duration-300">
                  <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-gray-900 text-xl sm:text-2xl mb-2 transition-all duration-300">Past Papers</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Previous Year Papers
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
                <div className="flex items-center justify-between text-xs sm:text-sm bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-green-100 transition-transform">
                  <span className="text-gray-700 font-medium">Papers</span>
                  <span className="font-bold text-green-600 text-base sm:text-lg">1000+</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-emerald-100 transition-transform">
                  <span className="text-gray-700 font-medium">Subjects</span>
                  <span className="font-bold text-emerald-600 text-base sm:text-lg">50+</span>
                </div>
              </div>

              <button className="group/btn w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm active:scale-95 active:shadow-xl transition-all duration-300 ease-out overflow-hidden relative">
                <span className="relative flex items-center justify-center gap-2 sm:gap-3">
                  <span className="transition-all duration-300">View Papers</span>
                  <span className="transition-all duration-300">→</span>
                </span>
              </button>
            </div>
          </div>
          </div>

          {/* Bulletin */}
          <div className="mt-2 sm:mt-3">
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-lg sm:rounded-xl py-1.5 sm:py-2 shadow-lg overflow-hidden">
              <div className="flex">
                <div className="animate-marquee whitespace-nowrap">
                  <span className="text-white text-xs sm:text-sm font-bold inline-block px-4 sm:px-8">
                    🎓 Coming Soon: MDCAT, ECAT & NTS Resources - Stay Tuned for Updates!
                  </span>
                  <span className="text-white text-xs sm:text-sm font-bold inline-block px-4 sm:px-8">
                    🎓 Coming Soon: MDCAT, ECAT & NTS Resources - Stay Tuned for Updates!
                  </span>
                  <span className="text-white text-xs sm:text-sm font-bold inline-block px-4 sm:px-8">
                    🎓 Coming Soon: MDCAT, ECAT & NTS Resources - Stay Tuned for Updates!
                  </span>
                </div>
                <div className="animate-marquee whitespace-nowrap" aria-hidden="true">
                  <span className="text-white text-xs sm:text-sm font-bold inline-block px-4 sm:px-8">
                    🎓 Coming Soon: MDCAT, ECAT & NTS Resources - Stay Tuned for Updates!
                  </span>
                  <span className="text-white text-xs sm:text-sm font-bold inline-block px-4 sm:px-8">
                    🎓 Coming Soon: MDCAT, ECAT & NTS Resources - Stay Tuned for Updates!
                  </span>
                  <span className="text-white text-xs sm:text-sm font-bold inline-block px-4 sm:px-8">
                    🎓 Coming Soon: MDCAT, ECAT & NTS Resources - Stay Tuned for Updates!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Button */}
      <FeedbackButton page="dashboard" />
    </div>
  )
}
