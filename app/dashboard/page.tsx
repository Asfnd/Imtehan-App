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

      {/* Modern Premium Top Bar */}
      <div className="relative z-20 mx-4 mt-4">
        <div className="bg-gradient-to-r from-white/95 via-white/90 to-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/60 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between px-5 py-3.5">
            {/* Left: User Info with Modern Badge */}
            <div className="flex items-center gap-4">
              <div className="relative hover:scale-110 transition-transform duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                {user && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-md"></div>
                )}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base leading-tight">{username}</p>
                <p className="text-sm text-gray-600 font-medium">
                  {user ? user.email : `Free Trial • ${remaining.cssQuizzes} quizzes left`}
                </p>
              </div>
            </div>

            {/* Right: Controls with Better Spacing */}
            <div className="flex items-center gap-3">
              {/* Sound Toggle - More Prominent */}
              <button
                onClick={toggleSound}
                className={`relative w-11 h-11 rounded-xl transition-all hover:scale-110 active:scale-90 ${
                  soundEnabled 
                    ? 'bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 shadow-lg hover:shadow-xl' 
                    : 'bg-gray-100 hover:bg-gray-200 shadow-md'
                }`}
                title={soundEnabled ? 'Sound On' : 'Sound Off'}
              >
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                ) : (
                  <VolumeX className="w-5 h-5 text-gray-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                )}
              </button>

              {/* Auth Buttons - Improved Design */}
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 hover:from-red-600 hover:via-rose-600 hover:to-pink-600 text-white rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 font-bold text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <button
                  onClick={handleGoogleSignIn}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 font-bold text-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white"/>
                  </svg>
                  <span>Sign in with Google</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 pb-4 z-10">
        <div className="w-full max-w-5xl">{/* Content wrapper */}

          {/* Modern Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Welcome back, {username}!
            </h1>
            <p className="text-base text-gray-700">
              Choose your practice mode
            </p>
          </div>

          {/* Modern Practice Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* MPT Practice */}
          <div
            className="group relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 ease-out cursor-pointer border-2 border-blue-200 hover:border-blue-500 hover:-translate-y-2 hover:scale-105 hover:rotate-1"
            onClick={() => router.push('/mpt-practice')}
          >
            <div className="relative">
              <div className="text-center mb-5">
                <div className="inline-flex p-5 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-3xl shadow-2xl mb-4 group-hover:shadow-[0_20px_40px_rgba(59,130,246,0.6)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Target className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-gray-900 text-2xl mb-2 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300">MPT</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  MCQ-Based Preliminary Test
                </p>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between text-sm bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100 hover:scale-105 hover:translate-x-1 transition-transform">
                  <span className="text-gray-700 font-medium">Questions</span>
                  <span className="font-bold text-blue-600 text-lg">500+</span>
                </div>
                <div className="flex items-center justify-between text-sm bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-3 border border-indigo-100 hover:scale-105 hover:translate-x-1 transition-transform">
                  <span className="text-gray-700 font-medium">Mock Tests</span>
                  <span className="font-bold text-indigo-600 text-lg">Timed Tests</span>
                </div>
              </div>

              <button className="group/btn w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-sm hover:scale-110 hover:-translate-y-1 active:scale-95 hover:shadow-[0_30px_60px_rgba(59,130,246,0.6)] transition-all duration-300 ease-out overflow-hidden relative">
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="relative flex items-center justify-center gap-3">
                  <span className="group-hover/btn:translate-x-[-8px] group-hover/btn:scale-105 transition-all duration-300">Start Practice</span>
                  <span className="group-hover/btn:translate-x-3 group-hover/btn:scale-125 transition-all duration-300">→</span>
                </span>
              </button>
            </div>
          </div>

          {/* CSS Practice */}
          <div
            className="group relative bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 ease-out cursor-pointer border-2 border-purple-200 hover:border-purple-500 hover:-translate-y-2 hover:scale-105 hover:rotate-1"
            onClick={() => router.push('/css-practice')}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 via-pink-400/0 to-fuchsia-400/0 group-hover:from-purple-400/15 group-hover:via-pink-400/15 group-hover:to-fuchsia-400/15 transition-all duration-300 rounded-3xl" />
            
            <div className="relative">
              <div className="text-center mb-5">
                <div className="inline-flex p-5 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-4 group-hover:shadow-[0_20px_40px_rgba(168,85,247,0.6)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <BookOpen className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-gray-900 text-2xl mb-2 group-hover:text-purple-600 group-hover:scale-110 transition-all duration-300">CSS MCQs</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Practice Past CSS MCQs
                </p>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between text-sm bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100 hover:scale-105 hover:translate-x-1 transition-transform">
                  <span className="text-gray-700 font-medium">Questions</span>
                  <span className="font-bold text-purple-600 text-lg">2,500+</span>
                </div>
                <div className="flex items-center justify-between text-sm bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-3 border border-pink-100 hover:scale-105 hover:translate-x-1 transition-transform">
                  <span className="text-gray-700 font-medium">Subjects</span>
                  <span className="font-bold text-pink-600 text-lg">40+</span>
                </div>
              </div>

              <button className="group/btn w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-sm hover:scale-110 hover:-translate-y-1 active:scale-95 hover:shadow-[0_30px_60px_rgba(168,85,247,0.6)] transition-all duration-300 ease-out overflow-hidden relative">
                <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="relative flex items-center justify-center gap-3">
                  <span className="group-hover/btn:translate-x-[-8px] group-hover/btn:scale-105 transition-all duration-300">Start Practice</span>
                  <span className="group-hover/btn:translate-x-3 group-hover/btn:scale-125 transition-all duration-300">→</span>
                </span>
              </button>
            </div>
          </div>

          {/* Past Papers */}
          <div
            className="group relative bg-gradient-to-br from-white via-green-50 to-emerald-50 rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 ease-out cursor-pointer border-2 border-green-200 hover:border-green-500 hover:-translate-y-2 hover:scale-105 hover:rotate-1"
            onClick={() => router.push('/past-papers')}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 via-emerald-400/0 to-teal-400/0 group-hover:from-green-400/15 group-hover:via-emerald-400/15 group-hover:to-teal-400/15 transition-all duration-300 rounded-3xl" />
            
            <div className="relative">
              <div className="text-center mb-5">
                <div className="inline-flex p-5 bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-3xl shadow-2xl mb-4 group-hover:shadow-[0_20px_40px_rgba(16,185,129,0.6)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <FileText className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-gray-900 text-2xl mb-2 group-hover:text-green-600 group-hover:scale-110 transition-all duration-300">CSS Past Papers</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Previous Year Papers
                </p>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between text-sm bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100 hover:scale-105 hover:translate-x-1 transition-transform">
                  <span className="text-gray-700 font-medium">Papers</span>
                  <span className="font-bold text-green-600 text-lg">1000+</span>
                </div>
                <div className="flex items-center justify-between text-sm bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-3 border border-emerald-100 hover:scale-105 hover:translate-x-1 transition-transform">
                  <span className="text-gray-700 font-medium">Subjects</span>
                  <span className="font-bold text-emerald-600 text-lg">50+</span>
                </div>
              </div>

              <button className="group/btn w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-sm hover:scale-110 hover:-translate-y-1 active:scale-95 hover:shadow-[0_30px_60px_rgba(16,185,129,0.6)] transition-all duration-300 ease-out overflow-hidden relative">
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="relative flex items-center justify-center gap-3">
                  <span className="group-hover/btn:translate-x-[-8px] group-hover/btn:scale-105 transition-all duration-300">View Papers</span>
                  <span className="group-hover/btn:translate-x-3 group-hover/btn:scale-125 transition-all duration-300">→</span>
                </span>
              </button>
            </div>
          </div>
          </div>

          {/* Bulletin */}
          <div className="mt-3">
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl py-2 shadow-lg overflow-hidden">
              <div className="flex">
                <div className="animate-marquee whitespace-nowrap">
                  <span className="text-white text-sm font-bold inline-block px-8">
                    🎓 Coming Soon: MDCAT, ECAT & NTS Resources - Stay Tuned for Updates!
                  </span>
                  <span className="text-white text-sm font-bold inline-block px-8">
                    🎓 Coming Soon: MDCAT, ECAT & NTS Resources - Stay Tuned for Updates!
                  </span>
                  <span className="text-white text-sm font-bold inline-block px-8">
                    🎓 Coming Soon: MDCAT, ECAT & NTS Resources - Stay Tuned for Updates!
                  </span>
                </div>
                <div className="animate-marquee whitespace-nowrap" aria-hidden="true">
                  <span className="text-white text-sm font-bold inline-block px-8">
                    🎓 Coming Soon: MDCAT, ECAT & NTS Resources - Stay Tuned for Updates!
                  </span>
                  <span className="text-white text-sm font-bold inline-block px-8">
                    🎓 Coming Soon: MDCAT, ECAT & NTS Resources - Stay Tuned for Updates!
                  </span>
                  <span className="text-white text-sm font-bold inline-block px-8">
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
