'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
// Removed framer-motion for faster loading
import { BookOpen, FileText, Target, LogOut } from 'lucide-react'
import FeedbackButton from '@/components/FeedbackButton'
import ProfileAvatar from '@/components/ui/ProfileAvatar'
import { createClient } from '@/lib/supabase/client'
// Removed usageTracker import - not needed for dashboard display

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  )
}

function DashboardLoading() {
  return (
    <div className="relative h-screen overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl"></div>
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

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<any>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [authMessage, setAuthMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  // Removed remaining state - not displayed in UI anymore
  const [showEligibilityChecker, setShowEligibilityChecker] = useState(false)
  
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
    
    // Check for auth status in URL parameters
    const authStatus = searchParams.get('auth')
    const authMessageParam = searchParams.get('message')
    
    if (authStatus === 'success') {
      setAuthMessage({ type: 'success', message: 'Successfully signed in!' })
      // Clear URL parameters after showing message
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete('auth')
      newUrl.searchParams.delete('message')
      window.history.replaceState({}, '', newUrl.toString())
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setAuthMessage(null), 3000)
    } else if (authStatus === 'error') {
      setAuthMessage({ 
        type: 'error', 
        message: authMessageParam ? decodeURIComponent(authMessageParam) : 'Authentication failed' 
      })
      // Clear URL parameters after showing message
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete('auth')
      newUrl.searchParams.delete('message')
      window.history.replaceState({}, '', newUrl.toString())
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => setAuthMessage(null), 5000)
    }
    
    checkUser()

    // Listen for auth state changes for smooth sign-in experience
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Dashboard: Auth state change:', event, session ? { user: session.user?.email } : 'no session')

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          console.log('Dashboard: User signed in, updating state')
          setUser(session?.user ?? null)
          setAuthLoading(false)
          // Show success message if not already shown
          if (!authMessage) {
            setAuthMessage({ type: 'success', message: 'Successfully signed in!' })
            setTimeout(() => setAuthMessage(null), 3000)
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('Dashboard: User signed out, clearing state')
          setUser(null)
          setAuthLoading(false)
        }
      }
    )
    
    return () => {
      subscription.unsubscribe()
    }
  }, [searchParams])
  
  // Removed updateRemaining - not needed since we don't display counters

  const checkUser = async () => {
    const supabase = createClient()
    console.log('Dashboard: Checking user session...')
    
    const { data: { user }, error } = await supabase.auth.getUser()
    
    console.log('Dashboard: User check result:', { 
      user: user ? { id: user.id, email: user.email } : null, 
      error: error?.message 
    })
    
    if (user) {
      console.log('Dashboard: User session found, setting user state')
    } else {
      console.log('Dashboard: No user session found')
    }

    setUser(user)
    setAuthLoading(false)
  }



  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    router.refresh()
  }

  const handleGoogleSignIn = async () => {
    const supabase = createClient()
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin
    
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${baseUrl}/auth/callback?next=${encodeURIComponent('/dashboard')}`,
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
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl"></div>
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
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>
      </div>

      {/* Dark Attached Top Bar */}
      <div className="relative z-20 w-full">
        {/* Authentication Status Message */}
        {authMessage && (
          <div className={`w-full px-4 py-3 text-center text-sm font-medium ${
            authMessage.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {authMessage.message}
          </div>
        )}
        
        {/* Dark top bar container - attached to borders */}
        <div className="relative">
          {/* Dark glassmorphism container */}
          <div className="relative bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl overflow-hidden">
            {/* Subtle dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 via-gray-900/20 to-slate-900/30"></div>
            
            {/* Gentle animated accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"></div>
            
            <div className="relative flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 gap-3">
              {/* Left: Enhanced User Info */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                {/* Optimized Profile Avatar with Instant Loading */}
                <ProfileAvatar 
                  user={user} 
                  fullName={fullName} 
                  size="md"
                  showOnlineIndicator={true}
                />
                
                {/* Refined User Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h2 className="font-bold text-white text-sm sm:text-base leading-tight truncate">
                      {fullName}
                    </h2>
                    {user && (
                      <span className="flex-shrink-0 px-2 py-0.5 bg-gradient-to-r from-blue-500/90 to-purple-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-md shadow-sm border border-blue-400/30">
                        PRO
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 font-medium truncate">
                    {user ? (
                      user.email
                    ) : (
                      <>Free Trial</>
                    )}
                  </p>
                </div>
              </div>

              {/* Right: Refined Action Controls */}
              <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
                {/* CSS Eligibility Checker Button - Dark Theme */}
                <button
                  onClick={() => setShowEligibilityChecker(true)}
                  className="group relative flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500 text-white rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 active:scale-95 font-medium text-xs sm:text-sm whitespace-nowrap backdrop-blur-sm border border-emerald-400/30"
                  title="Check CSS 2026 Eligibility"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="hidden md:inline">CSS Eligibility</span>
                  <span className="md:hidden">CSS</span>
                </button>

                {/* Contact Us Button - Dark Theme */}
                <button
                  onClick={() => router.push('/contact')}
                  className="group relative flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 active:scale-95 font-medium text-xs sm:text-sm whitespace-nowrap backdrop-blur-sm border border-blue-400/30"
                  title="Contact Us"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="hidden md:inline">Contact Us</span>
                  <span className="md:hidden">Help</span>
                </button>



                {/* Auth Buttons - Dark Theme */}
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="group relative flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:via-rose-500 hover:to-pink-500 text-white rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/30 active:scale-95 font-medium text-xs sm:text-sm backdrop-blur-sm border border-red-400/30"
                  >
                    <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 drop-shadow-sm" />
                    <span className="hidden md:inline">Sign Out</span>
                    <span className="md:hidden">Out</span>
                  </button>
                ) : (
                  <button
                    onClick={handleGoogleSignIn}
                    className="group relative flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 active:scale-95 font-medium text-xs sm:text-sm whitespace-nowrap backdrop-blur-sm border border-blue-400/30"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 drop-shadow-sm" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white"/>
                    </svg>
                    <span className="hidden md:inline">Sign in with Google</span>
                    <span className="md:hidden">Sign in</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced custom animations */}
      <style jsx>{`
        /* Removed blob animations to prevent visual distraction */
        /* Enhanced glassmorphism */
        .backdrop-blur-2xl {
          backdrop-filter: blur(40px);
        }
        /* Smooth hover transitions */
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
      `}</style>

      {/* Main Content Area - Better Integration */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pb-6 sm:pb-8 pt-2 sm:pt-4 z-10 overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto">{/* Content wrapper */}

          {/* Welcome Header - Refined Spacing */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">
              Welcome back, {firstName}! 🎉
            </h1>
            <p className="text-base sm:text-lg text-gray-700/90 font-medium">
              Choose your practice mode and continue your CSS journey
            </p>
          </div>

          {/* Modern Practice Cards - Perfect Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {/* MPT Practice */}
          <div
            className="group relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-2xl active:shadow-2xl transition-all duration-300 ease-out cursor-pointer border-2 border-blue-200 hover:border-blue-500 active:border-blue-500 hover:-translate-y-1 active:-translate-y-1 hover:scale-102 active:scale-102"
            onClick={() => router.push('/mpt-practice')}
          >
            <div className="relative">
              <div className="text-center mb-4">
                <div className="inline-flex p-3 sm:p-4 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl shadow-xl mb-3 transition-all duration-300">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-gray-900 text-base sm:text-xl mb-1 transition-all duration-300">Past MPT MCQS</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  MCQ-Based Preliminary Test
                </p>
              </div>

              <div className="space-y-2.5 mb-4">
                <div className="flex items-center justify-between text-xs sm:text-sm bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2.5 border border-blue-100 transition-transform">
                  <span className="text-gray-700 font-medium">Questions</span>
                  <span className="font-bold text-blue-600">1000+</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-2.5 border border-indigo-100 transition-transform">
                  <span className="text-gray-700 font-medium">Mock Tests</span>
                  <span className="font-bold text-indigo-600">Timed</span>
                </div>
              </div>

              <button className="group/btn w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 sm:py-3.5 rounded-lg font-bold text-sm sm:text-base active:scale-95 active:shadow-xl transition-all duration-300 ease-out overflow-hidden relative">
                <span className="relative flex items-center justify-center gap-2">
                  <span className="transition-all duration-300">Start Practice</span>
                  <span className="transition-all duration-300">→</span>
                </span>
              </button>
            </div>
          </div>

          {/* CSS Practice */}
          <div
            className="group relative bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-2xl active:shadow-2xl transition-all duration-300 ease-out cursor-pointer border-2 border-purple-200 hover:border-purple-500 active:border-purple-500 hover:-translate-y-1 active:-translate-y-1 hover:scale-102 active:scale-102"
            onClick={() => router.push('/css-practice')}

          >
            <div className="relative">
              <div className="text-center mb-4">
                <div className="inline-flex p-3 sm:p-4 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-xl sm:rounded-2xl shadow-xl mb-3 transition-all duration-300">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-gray-900 text-base sm:text-xl mb-1 transition-all duration-300">Past CSS MCQs</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Practice Past CSS MCQs
                </p>
              </div>

              <div className="space-y-2.5 mb-4">
                <div className="flex items-center justify-between text-xs sm:text-sm bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-2.5 border border-purple-100 transition-transform">
                  <span className="text-gray-700 font-medium">Questions</span>
                  <span className="font-bold text-purple-600">10,000+</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-2.5 border border-pink-100 transition-transform">
                  <span className="text-gray-700 font-medium">Subjects</span>
                  <span className="font-bold text-pink-600">40+</span>
                </div>
              </div>

              <button className="group/btn w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 sm:py-3.5 rounded-lg font-bold text-sm sm:text-base active:scale-95 active:shadow-xl transition-all duration-300 ease-out overflow-hidden relative">
                <span className="relative flex items-center justify-center gap-2">
                  <span className="transition-all duration-300">Start Practice</span>
                  <span className="transition-all duration-300">→</span>
                </span>
              </button>
            </div>
          </div>

          {/* Past Papers */}
          <div
            className="group relative bg-gradient-to-br from-white via-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-2xl active:shadow-2xl transition-all duration-300 ease-out cursor-pointer border-2 border-green-200 hover:border-green-500 active:border-green-500 hover:-translate-y-1 active:-translate-y-1 hover:scale-102 active:scale-102"
            onClick={() => router.push('/past-papers')}
          >
            <div className="relative">
              <div className="text-center mb-4">
                <div className="inline-flex p-3 sm:p-4 bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 rounded-xl sm:rounded-2xl shadow-xl mb-3 transition-all duration-300">
                  <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-gray-900 text-base sm:text-xl mb-1 transition-all duration-300">Official Past Papers</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Previous Year Papers
                </p>
              </div>

              <div className="space-y-2.5 mb-4">
                <div className="flex items-center justify-between text-xs sm:text-sm bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-2.5 border border-green-100 transition-transform">
                  <span className="text-gray-700 font-medium">Papers</span>
                  <span className="font-bold text-green-600">1000+</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-2.5 border border-emerald-100 transition-transform">
                  <span className="text-gray-700 font-medium">Subjects</span>
                  <span className="font-bold text-emerald-600">50+</span>
                </div>
              </div>

              <button className="group/btn w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2.5 sm:py-3.5 rounded-lg font-bold text-sm sm:text-base active:scale-95 active:shadow-xl transition-all duration-300 ease-out overflow-hidden relative">
                <span className="relative flex items-center justify-center gap-2">
                  <span className="transition-all duration-300">View Papers</span>
                  <span className="transition-all duration-300">→</span>
                </span>
              </button>
            </div>
          </div>

          {/* Solved Papers */}
          <div
            className="group relative bg-gradient-to-br from-white via-orange-50 to-red-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-2xl active:shadow-2xl transition-all duration-300 ease-out cursor-pointer border-2 border-orange-200 hover:border-orange-500 active:border-orange-500 hover:-translate-y-1 active:-translate-y-1 hover:scale-102 active:scale-102"
            onClick={() => router.push('/solved-papers')}
          >
            <div className="relative">
              <div className="text-center mb-4">
                <div className="inline-flex p-3 sm:p-4 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-xl sm:rounded-2xl shadow-xl mb-3 transition-all duration-300">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-base sm:text-xl mb-1 transition-all duration-300">Solved Papers</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Compulsory Subjective Solutions
                </p>
              </div>

              <div className="space-y-2.5 mb-4">
                <div className="flex items-center justify-between text-xs sm:text-sm bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-2.5 border border-orange-100 transition-transform">
                  <span className="text-gray-700 font-medium">Solutions</span>
                  <span className="font-bold text-orange-600">Complete</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-2.5 border border-red-100 transition-transform">
                  <span className="text-gray-700 font-medium">Subjects</span>
                  <span className="font-bold text-red-600">6</span>
                </div>
              </div>

              <button className="group/btn w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-2.5 sm:py-3.5 rounded-lg font-bold text-sm sm:text-base active:scale-95 active:shadow-xl transition-all duration-300 ease-out overflow-hidden relative">
                <span className="relative flex items-center justify-center gap-2">
                  <span className="transition-all duration-300">View Solutions</span>
                  <span className="transition-all duration-300">→</span>
                </span>
              </button>
            </div>
          </div>
          </div>


        </div>
      </div>

      {/* CSS Eligibility Checker Modal */}
      {showEligibilityChecker && <CSSEligibilityChecker onClose={() => setShowEligibilityChecker(false)} />}

      {/* Feedback Button */}
      <FeedbackButton page="dashboard" />
    </div>
  )
}

// Simple Modern CSS Eligibility Checker Component
function CSSEligibilityChecker({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    dateOfBirth: '',
    category: 'general',
    pakistaniCitizen: '',
    bachelorDegree: '',
    cssAttempts: '0',
    domicile: ''
  })
  const [age, setAge] = useState<number | null>(null)
  const [showResultModal, setShowResultModal] = useState(false)
  const [resultData, setResultData] = useState<any>(null)

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return null
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const checkEligibility = () => {
    const currentAge = age
    
    // Check for missing fields
    const missingFields = []
    if (!formData.dateOfBirth) missingFields.push('Date of Birth')
    if (!formData.pakistaniCitizen) missingFields.push('Pakistani Citizen')
    if (!formData.bachelorDegree) missingFields.push("Bachelor's Degree")
    if (!formData.domicile) missingFields.push('Domicile')
    
    if (missingFields.length > 0 || !currentAge) {
      setResultData({
        type: 'missing',
        fields: missingFields
      })
      setShowResultModal(true)
      return
    }

    let maxAge = 30
    if (formData.category === 'government' || formData.category === 'tribal') {
      maxAge = 32
    }

    // Check individual criteria
    const criteria = {
      age: currentAge >= 21 && currentAge <= maxAge,
      citizenship: formData.pakistaniCitizen === 'yes',
      education: formData.bachelorDegree === 'yes',
      attempts: parseInt(formData.cssAttempts) < 3,
      domicile: formData.domicile !== ''
    }

    const passedCriteria = Object.values(criteria).filter(Boolean).length
    const totalCriteria = Object.keys(criteria).length
    const score = Math.round((passedCriteria / totalCriteria) * 100)
    
    // Prepare result data for modal
    const failedCriteria = []
    if (!criteria.age) failedCriteria.push(`Age: ${currentAge} years (must be 21-${maxAge})`)
    if (!criteria.citizenship) failedCriteria.push('Must be Pakistani citizen')
    if (!criteria.education) failedCriteria.push("Bachelor's degree required")
    if (!criteria.attempts) failedCriteria.push('Maximum 3 CSS attempts allowed')
    
    setResultData({
      type: passedCriteria === totalCriteria ? 'eligible' : 'not-eligible',
      score,
      passedCount: passedCriteria,
      totalCount: totalCriteria,
      age: currentAge,
      maxAge,
      attempts: formData.cssAttempts,
      failedCriteria
    })
    setShowResultModal(true)
  }

  const handleDateChange = (date: string) => {
    setFormData({ ...formData, dateOfBirth: date })
    const calculatedAge = calculateAge(date)
    setAge(calculatedAge)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <div className="modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[10000] w-10 h-10 bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800 rounded-full shadow-lg flex items-center justify-center transition-all"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white text-center">
          <h2 className="text-xl font-bold">CSS 2026 Eligibility Checker</h2>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              max={new Date().toISOString().split('T')[0]}
            />
            {age && (
              <p className="mt-1 text-sm text-gray-600">Age: {age}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
            <div className="space-y-2">
              {[
                { value: 'general', label: 'General (≤30 yrs)' },
                { value: 'government', label: 'Government Employee (≤32 yrs)' },
                { value: 'tribal', label: 'Tribal Areas/AJK/GB/Balochistan (≤32 yrs)' }
              ].map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={option.value}
                    checked={formData.category === option.value}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="mr-2 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Pakistani Citizen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Pakistani Citizen?</label>
            <div className="flex gap-4">
              {[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ].map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="pakistaniCitizen"
                    value={option.value}
                    checked={formData.pakistaniCitizen === option.value}
                    onChange={(e) => handleInputChange('pakistaniCitizen', e.target.value)}
                    className="mr-2 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Bachelor's Degree */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Bachelor's Degree?</label>
            <div className="flex gap-4">
              {[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
              ].map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="bachelorDegree"
                    value={option.value}
                    checked={formData.bachelorDegree === option.value}
                    onChange={(e) => handleInputChange('bachelorDegree', e.target.value)}
                    className="mr-2 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* CSS Attempts */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CSS Attempts Used (Max 3)</label>
            <select
              value={formData.cssAttempts}
              onChange={(e) => handleInputChange('cssAttempts', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="0">0 attempts</option>
              <option value="1">1 attempt</option>
              <option value="2">2 attempts</option>
              <option value="3">3 attempts (Maximum)</option>
            </select>
          </div>

          {/* Domicile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Domicile</label>
            <select
              value={formData.domicile}
              onChange={(e) => handleInputChange('domicile', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Select domicile...</option>
              <option value="punjab">Punjab</option>
              <option value="sindh">Sindh</option>
              <option value="kpk">KPK</option>
              <option value="balochistan">Balochistan</option>
              <option value="ajk">AJK</option>
              <option value="gb">GB</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Check Button */}
          <button
            onClick={checkEligibility}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            Check Eligibility
          </button>


        </div>
      </div>

      {/* Result Modal */}
      {showResultModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10001] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            {resultData?.type === 'missing' ? (
              /* Missing Fields Modal */
              <>
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white text-center rounded-t-2xl">
                  <div className="text-4xl mb-2">⚠️</div>
                  <h3 className="text-xl font-bold">Missing Information</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">Please fill in the following fields:</p>
                  <ul className="space-y-2 mb-6">
                    {resultData.fields.map((field: string, index: number) => (
                      <li key={index} className="flex items-center gap-2 text-red-600">
                        <span className="text-red-500">•</span>
                        {field}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setShowResultModal(false)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 px-4 rounded-lg transition-all"
                  >
                    Got it
                  </button>
                </div>
              </>
            ) : (
              /* Eligibility Result Modal */
              <>
                <div className={`p-6 text-white text-center rounded-t-2xl ${
                  resultData?.type === 'eligible' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                    : 'bg-gradient-to-r from-red-500 to-rose-500'
                }`}>
                  <div className="text-5xl mb-3">
                    {resultData?.type === 'eligible' ? '🎉' : '❌'}
                  </div>
                  <h3 className="text-2xl font-bold">
                    {resultData?.type === 'eligible' ? 'ELIGIBLE!' : 'NOT ELIGIBLE'}
                  </h3>
                  <p className="text-lg opacity-90">
                    {resultData?.type === 'eligible' ? 'CSS 2026' : 'Requirements not met'}
                  </p>
                </div>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className={`text-4xl font-bold mb-2 ${
                      resultData?.score === 100 ? 'text-green-600' : 
                      resultData?.score >= 80 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {resultData?.score}%
                    </div>
                    <p className="text-gray-600">
                      {resultData?.passedCount} of {resultData?.totalCount} requirements met
                    </p>
                  </div>

                  {resultData?.type === 'eligible' ? (
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-green-600">
                        <span>✅</span>
                        <span>Age: {resultData.age} years (within {resultData.maxAge} limit)</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <span>✅</span>
                        <span>Pakistani citizenship</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <span>✅</span>
                        <span>Bachelor's degree</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <span>✅</span>
                        <span>CSS attempts: {resultData.attempts}/3 used</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <span>✅</span>
                        <span>Valid domicile</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 mb-6">
                      {resultData?.failedCriteria.map((criteria: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-red-600">
                          <span>❌</span>
                          <span>{criteria}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowResultModal(false)}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-all"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setShowResultModal(false)
                        onClose()
                      }}
                      className={`flex-1 font-medium py-3 px-4 rounded-lg transition-all text-white ${
                        resultData?.type === 'eligible'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                          : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
                      }`}
                    >
                      Done
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modern Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            backdrop-filter: blur(0px);
          }
          to { 
            opacity: 1; 
            backdrop-filter: blur(8px);
          }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateX(20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
        .z-60 {
          z-index: 60;
        }
        
        /* Ensure modal is always on top */
        .modal-overlay {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          z-index: 9999 !important;
        }
      `}</style>
    </div>
  )
}
