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
  
  // Get full name for top bar
  const getFullName = () => {
    if (user?.user_metadata?.name) {
      return user.user_metadata.name
    }
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
    }
    if (user?.email) {
      return user.email.split('@')[0]
    }
    return "Guest User"
  }
  
  // Get first name only for welcome message
  const getFirstName = () => {
    if (user?.user_metadata?.name) {
      return user.user_metadata.name.split(' ')[0]
    }
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')[0]
    }
    if (user?.email) {
      return user.email.split('@')[0]
    }
    return "Guest"
  }
  
  const fullName = getFullName()
  const firstName = getFirstName()

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

      {/* Ultra Modern Premium Top Bar - Glassmorphism Design */}
      <div className="relative z-20 mx-2 sm:mx-4 mt-2 sm:mt-4">
        {/* Floating glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl opacity-20 blur-2xl animate-pulse"></div>
        
        {/* Animated gradient border wrapper */}
        <div className="relative rounded-2xl sm:rounded-3xl p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x shadow-2xl hover:shadow-3xl transition-shadow duration-300">
          {/* Main content with glassmorphism */}
          <div className="bg-white/95 backdrop-blur-3xl rounded-2xl sm:rounded-3xl overflow-hidden">
            {/* Subtle animated background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            </div>
            
            {/* Sparkle effects */}
            <div className="absolute top-2 right-20 w-1 h-1 bg-white rounded-full animate-ping"></div>
            <div className="absolute top-4 right-40 w-1 h-1 bg-white rounded-full animate-ping animation-delay-1000"></div>
            <div className="absolute bottom-3 left-32 w-1 h-1 bg-white rounded-full animate-ping animation-delay-2000"></div>
            
            <div className="relative flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 gap-3">
              {/* Left: User Info with Premium Badge */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                {/* Avatar - Clean & Professional */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                </div>
                
                {/* User Info - Clean & Professional */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-gray-900 text-base sm:text-lg leading-tight truncate">
                      {fullName}
                    </h2>
                    {user && (
                      <>
                        <span className="flex-shrink-0 w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span className="flex-shrink-0 px-2.5 py-0.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-md">
                          PRO
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium truncate mt-0.5">
                    {user ? (
                      user.email
                    ) : (
                      <>Free Trial • {remaining.cssQuizzes} quizzes remaining</>
                    )}
                  </p>
                </div>
              </div>

              {/* Right: Premium Controls */}
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                {/* Sound Toggle - Glassmorphism Style */}
                <button
                  onClick={toggleSound}
                  className={`relative group w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                    soundEnabled 
                      ? 'bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70' 
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 shadow-md hover:shadow-lg'
                  }`}
                  title={soundEnabled ? 'Sound On' : 'Sound Off'}
                >
                  {/* Glow effect on hover */}
                  {soundEnabled && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300"></div>
                      {/* Pulse ring */}
                      <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-30 blur-md animate-pulse"></div>
                    </>
                  )}
                  
                  {soundEnabled ? (
                    <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-lg group-hover:scale-110 transition-transform" />
                  ) : (
                    <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:text-gray-800 transition-colors" />
                  )}
                </button>

                {/* Auth Buttons - Premium Design */}
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="group relative flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 hover:from-red-600 hover:via-rose-600 hover:to-pink-600 text-white rounded-xl sm:rounded-2xl transition-all shadow-lg hover:shadow-xl hover:shadow-red-500/50 active:scale-95 font-bold text-xs sm:text-sm overflow-hidden"
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    
                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                    <span className="hidden sm:inline relative z-10">Sign Out</span>
                    <span className="sm:hidden relative z-10">Out</span>
                  </button>
                ) : (
                  <button
                    onClick={handleGoogleSignIn}
                    className="group relative flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white rounded-xl sm:rounded-2xl transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/50 active:scale-95 font-bold text-xs sm:text-sm whitespace-nowrap overflow-hidden"
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 relative z-10 drop-shadow-lg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white"/>
                    </svg>
                    <span className="hidden sm:inline relative z-10">Sign in with Google</span>
                    <span className="sm:hidden relative z-10">Sign in</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      {/* Main Content Area */}
      <div className="relative flex-1 flex flex-col items-center px-2 sm:px-4 pb-2 sm:pb-4 pt-2 z-10 overflow-y-auto">
        <div className="w-full max-w-5xl">{/* Content wrapper */}

          {/* Modern Header - Compact on mobile */}
          <div className="text-center mb-2 sm:mb-4">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
              Welcome back, {firstName}!
            </h1>
            <p className="text-xs sm:text-base text-gray-700">
              Choose your practice mode
            </p>
          </div>

          {/* Modern Practice Cards - Compact on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
          {/* MPT Practice */}
          <div
            className="group relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-xl sm:rounded-3xl p-3 sm:p-5 shadow-lg hover:shadow-2xl active:shadow-2xl transition-all duration-300 ease-out cursor-pointer border-2 border-blue-200 hover:border-blue-500 active:border-blue-500 hover:-translate-y-2 active:-translate-y-1 hover:scale-105 active:scale-105"
            onClick={() => router.push('/mpt-practice')}
          >
            <div className="relative">
              <div className="text-center mb-2 sm:mb-5">
                <div className="inline-flex p-3 sm:p-5 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-xl sm:rounded-3xl shadow-2xl mb-2 sm:mb-4 transition-all duration-300">
                  <Target className="w-6 h-6 sm:w-10 sm:h-10 text-white transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg sm:text-2xl mb-1 transition-all duration-300">MPT</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  MCQ-Based Preliminary Test
                </p>
              </div>

              <div className="space-y-1.5 sm:space-y-3 mb-2 sm:mb-5">
                <div className="flex items-center justify-between text-xs sm:text-sm bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-blue-100 transition-transform">
                  <span className="text-gray-700 font-medium">Questions</span>
                  <span className="font-bold text-blue-600 text-sm sm:text-lg">500+</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-indigo-100 transition-transform">
                  <span className="text-gray-700 font-medium">Mock Tests</span>
                  <span className="font-bold text-indigo-600 text-sm sm:text-lg">Timed</span>
                </div>
              </div>

              <button className="group/btn w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 sm:py-4 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm active:scale-95 active:shadow-xl transition-all duration-300 ease-out overflow-hidden relative">
                <span className="relative flex items-center justify-center gap-2 sm:gap-3">
                  <span className="transition-all duration-300">Start Practice</span>
                  <span className="transition-all duration-300">→</span>
                </span>
              </button>
            </div>
          </div>

          {/* CSS Practice */}
          <div
            className="group relative bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-xl sm:rounded-3xl p-3 sm:p-5 shadow-lg hover:shadow-2xl active:shadow-2xl transition-all duration-300 ease-out cursor-pointer border-2 border-purple-200 hover:border-purple-500 active:border-purple-500 hover:-translate-y-2 active:-translate-y-1 hover:scale-105 active:scale-105"
            onClick={() => router.push('/css-practice')}
          >
            <div className="relative">
              <div className="text-center mb-2 sm:mb-5">
                <div className="inline-flex p-3 sm:p-5 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-xl sm:rounded-3xl shadow-2xl mb-2 sm:mb-4 transition-all duration-300">
                  <BookOpen className="w-6 h-6 sm:w-10 sm:h-10 text-white transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg sm:text-2xl mb-1 transition-all duration-300">CSS MCQs</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Practice Past CSS MCQs
                </p>
              </div>

              <div className="space-y-1.5 sm:space-y-3 mb-2 sm:mb-5">
                <div className="flex items-center justify-between text-xs sm:text-sm bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-purple-100 transition-transform">
                  <span className="text-gray-700 font-medium">Questions</span>
                  <span className="font-bold text-purple-600 text-sm sm:text-lg">2,500+</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-pink-100 transition-transform">
                  <span className="text-gray-700 font-medium">Subjects</span>
                  <span className="font-bold text-pink-600 text-sm sm:text-lg">40+</span>
                </div>
              </div>

              <button className="group/btn w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 sm:py-4 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm active:scale-95 active:shadow-xl transition-all duration-300 ease-out overflow-hidden relative">
                <span className="relative flex items-center justify-center gap-2 sm:gap-3">
                  <span className="transition-all duration-300">Start Practice</span>
                  <span className="transition-all duration-300">→</span>
                </span>
              </button>
            </div>
          </div>

          {/* Past Papers */}
          <div
            className="group relative bg-gradient-to-br from-white via-green-50 to-emerald-50 rounded-xl sm:rounded-3xl p-3 sm:p-5 shadow-lg hover:shadow-2xl active:shadow-2xl transition-all duration-300 ease-out cursor-pointer border-2 border-green-200 hover:border-green-500 active:border-green-500 hover:-translate-y-2 active:-translate-y-1 hover:scale-105 active:scale-105"
            onClick={() => router.push('/past-papers')}
          >
            <div className="relative">
              <div className="text-center mb-2 sm:mb-5">
                <div className="inline-flex p-3 sm:p-5 bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-xl sm:rounded-3xl shadow-2xl mb-2 sm:mb-4 transition-all duration-300">
                  <FileText className="w-6 h-6 sm:w-10 sm:h-10 text-white transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg sm:text-2xl mb-1 transition-all duration-300">Past Papers</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Previous Year Papers
                </p>
              </div>

              <div className="space-y-1.5 sm:space-y-3 mb-2 sm:mb-5">
                <div className="flex items-center justify-between text-xs sm:text-sm bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-green-100 transition-transform">
                  <span className="text-gray-700 font-medium">Papers</span>
                  <span className="font-bold text-green-600 text-sm sm:text-lg">1000+</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-emerald-100 transition-transform">
                  <span className="text-gray-700 font-medium">Subjects</span>
                  <span className="font-bold text-emerald-600 text-sm sm:text-lg">50+</span>
                </div>
              </div>

              <button className="group/btn w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2.5 sm:py-4 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm active:scale-95 active:shadow-xl transition-all duration-300 ease-out overflow-hidden relative">
                <span className="relative flex items-center justify-center gap-2 sm:gap-3">
                  <span className="transition-all duration-300">View Papers</span>
                  <span className="transition-all duration-300">→</span>
                </span>
              </button>
            </div>
          </div>
          </div>

          {/* Bulletin - Compact on mobile */}
          <div className="mt-1.5 sm:mt-3">
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-lg sm:rounded-xl py-1 sm:py-2 shadow-lg overflow-hidden">
              <div className="flex">
                <div className="animate-marquee whitespace-nowrap">
                  <span className="text-white text-[10px] sm:text-sm font-bold inline-block px-3 sm:px-8">
                    🎓 Coming Soon: MDCAT, ECAT & NTS Resources - Stay Tuned for Updates!
                  </span>
                  <span className="text-white text-[10px] sm:text-sm font-bold inline-block px-3 sm:px-8">
                    🎓 Coming Soon: MDCAT, ECAT & NTS Resources - Stay Tuned for Updates!
                  </span>
                  <span className="text-white text-[10px] sm:text-sm font-bold inline-block px-3 sm:px-8">
                    🎓 Coming Soon: MDCAT, ECAT & NTS Resources - Stay Tuned for Updates!
                  </span>
                </div>
                <div className="animate-marquee whitespace-nowrap" aria-hidden="true">
                  <span className="text-white text-[10px] sm:text-sm font-bold inline-block px-3 sm:px-8">
                    🎓 Coming Soon: MDCAT, ECAT & NTS Resources - Stay Tuned for Updates!
                  </span>
                  <span className="text-white text-[10px] sm:text-sm font-bold inline-block px-3 sm:px-8">
                    🎓 Coming Soon: MDCAT, ECAT & NTS Resources - Stay Tuned for Updates!
                  </span>
                  <span className="text-white text-[10px] sm:text-sm font-bold inline-block px-3 sm:px-8">
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
