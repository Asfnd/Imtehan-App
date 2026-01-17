'use client'

import { useEffect, useState, Suspense, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BookOpen, FileText, Target, LogOut, ArrowRight, Award, TrendingUp, Flame, Star } from 'lucide-react'
import FeedbackButton from '@/components/FeedbackButton'
import { createClient } from '@/lib/supabase/client'
import { getUserAnalytics } from '@/lib/analytics'
import { useAuth } from '@/lib/contexts/AuthContext'
import type { UserStats, TodaysRecommendation as RecommendationType, WeakSubject } from '@/lib/analytics/types'
import dynamic from 'next/dynamic'
import NavigationBar from '@/components/NavigationBar'
import { CourseSchema } from '@/components/seo/StructuredData'
import { CSSExamCountdown } from '@/components/CSSExamCountdown'

// Lazy load compact info bar component
const CompactInfoBar = dynamic(() => import('@/components/analytics/CompactInfoBar'), {
  loading: () => <div className="animate-pulse bg-gray-200 rounded-xl h-20" />,
  ssr: false
})

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  )
}

function DashboardLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    </div>
  )
}

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, loading: authLoading } = useAuth()
  const [authMessage, setAuthMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  // Analytics state
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [recommendation, setRecommendation] = useState<RecommendationType | null>(null)
  const [weakSubjects, setWeakSubjects] = useState<WeakSubject[]>([])
  const [statsLoading, setStatsLoading] = useState(true)
  const [showEligibilityChecker, setShowEligibilityChecker] = useState(false)

  // Track last analytics refresh time to prevent excessive calls (debounce)
  const lastAnalyticsRefreshRef = useRef<number>(0)
  
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

  // Handle auth status messages from URL (smooth sign-in/sign-out experience)
  useEffect(() => {
    const authStatus = searchParams.get('auth')
    const authMessageParam = searchParams.get('message')

    if (authStatus === 'success') {
      setAuthMessage({ type: 'success', message: 'Successfully signed in!' })
      setTimeout(() => setAuthMessage(null), 3000)
    } else if (authStatus === 'error') {
      setAuthMessage({
        type: 'error',
        message: authMessageParam ? decodeURIComponent(authMessageParam) : 'Authentication failed'
      })
      setTimeout(() => setAuthMessage(null), 5000)
    }

    // Clear URL parameters after processing
    if (authStatus) {
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete('auth')
      newUrl.searchParams.delete('message')
      window.history.replaceState({}, '', newUrl.toString())
    }
  }, [searchParams])

  // Load analytics data with delay to avoid blocking initial render
  // Uses requestIdleCallback if available, falls back to timeout
  useEffect(() => {
    const loadAnalytics = async () => {
      if (!user) {
        // User not logged in - clear analytics
        setUserStats(null)
        setRecommendation(null)
        setWeakSubjects([])
        setStatsLoading(false)
        return
      }

      // Load analytics in background after page is interactive
      try {
        setStatsLoading(true)
        const analytics = await getUserAnalytics()

        if (analytics) {
          setUserStats(analytics.stats)
          setRecommendation(analytics.recommendation)
          setWeakSubjects(analytics.weak_subjects || [])
        }
      } catch (error) {
        // Silently handle analytics loading errors
      } finally {
        setStatsLoading(false)
      }
    }

    // Defer analytics loading until page is interactive
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => loadAnalytics(), { timeout: 1000 })
    } else {
      // Fallback for browsers without requestIdleCallback
      const timeoutId = setTimeout(loadAnalytics, 500)
      return () => clearTimeout(timeoutId)
    }
  }, [user])

  // Refresh analytics when window gains focus (user comes back after quiz)
  // Debounced to prevent excessive API calls (5 minute minimum between refreshes)
  useEffect(() => {
    if (!user) return

    const handleFocus = async () => {
      const now = Date.now()
      const timeSinceLastRefresh = now - lastAnalyticsRefreshRef.current

      // Only refresh if more than 5 minutes (300000ms) has passed
      if (timeSinceLastRefresh < 300000) {
        return
      }

      lastAnalyticsRefreshRef.current = now
      const analytics = await getUserAnalytics()
      if (analytics) {
        setUserStats(analytics.stats)
        setRecommendation(analytics.recommendation)
        setWeakSubjects(analytics.weak_subjects || [])
      }
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [user])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    // User state will update automatically via auth context
    router.refresh()
  }

  const handleGoogleSignIn = async () => {
    const supabase = createClient()
    // Always use current browser location for OAuth redirects
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL || ''

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${baseUrl}/auth/callback?next=${encodeURIComponent('/css')}`,
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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <CourseSchema
        name="CSS Exam Preparation Course"
        description="Comprehensive CSS (Central Superior Services) exam preparation with 10,000+ practice MCQs, past papers from 2015-2023, and expert-curated content covering all compulsory and optional subjects."
        url="https://imtehan.com/css"
      />
      {/* Navigation Bar */}
      {authMessage && (
        <div className={`w-full px-4 py-3 text-center text-sm font-medium z-50 ${
          authMessage.type === 'success'
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
        }`}>
          {authMessage.message}
        </div>
      )}
      <NavigationBar
        showEligibilityButton={true}
        onEligibilityClick={() => setShowEligibilityChecker(true)}
        showCenterNav={false}
      />

      {/* CSS Exam Countdown */}
      <CSSExamCountdown variant="css" />

      {/* Main Content Area */}
      <div className="flex-1 py-8 md:py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Welcome Header - Only for logged-in users */}
          {user && (
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-balance bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                Welcome back, {firstName}
              </h1>
            </div>
          )}

          {/* Interactive Analytics Bar */}
          {user ? (
            statsLoading ? (
              <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50 shadow-lg p-4">
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex-1 h-20 bg-white/50 rounded-xl animate-pulse" />
                  ))}
                </div>
              </div>
            ) : userStats ? (
              <div className="mb-8 relative group">
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>

                <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-xl overflow-hidden">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 opacity-50"></div>

                  <div className="relative flex items-center gap-3 p-4 overflow-x-auto no-scrollbar">
                    {/* Questions Solved */}
                    <div className="stat-card group/item relative flex-1 min-w-[140px] bg-white rounded-xl border border-blue-100 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
                      {/* Hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover/item:scale-110 group-hover/item:rotate-6 transition-all duration-300">
                            <Target className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover/item:scale-105 transition-transform duration-300 inline-block">
                              {userStats.total_questions_solved || 0}
                            </div>
                            <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Questions</div>
                          </div>
                        </div>
                        {/* Progress indicator */}
                        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.min(((userStats.total_questions_solved || 0) / 1000) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Tests Completed */}
                    <div className="stat-card group/item relative flex-1 min-w-[140px] bg-white rounded-xl border border-green-100 hover:border-green-400 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover/item:scale-110 group-hover/item:rotate-6 transition-all duration-300">
                            <Award className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-2xl font-bold bg-gradient-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent group-hover/item:scale-105 transition-transform duration-300 inline-block">
                              {userStats.total_tests_completed || 0}
                            </div>
                            <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Tests</div>
                          </div>
                        </div>
                        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.min(((userStats.total_tests_completed || 0) / 50) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Average Score */}
                    <div className="stat-card group/item relative flex-1 min-w-[140px] bg-white rounded-xl border border-purple-100 hover:border-purple-400 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover/item:scale-110 group-hover/item:rotate-6 transition-all duration-300">
                            <TrendingUp className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-2xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover/item:scale-105 transition-transform duration-300 inline-block">
                              {(userStats.average_score || 0).toFixed(0)}%
                            </div>
                            <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Accuracy</div>
                          </div>
                        </div>
                        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                            style={{ width: `${userStats.average_score || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Streak - Special animated card */}
                    <div className="stat-card group/item relative flex-1 min-w-[140px] bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 cursor-pointer overflow-hidden">
                      {/* Animated fire particles */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-float"></div>
                        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-orange-300 rounded-full animate-float animation-delay-1000"></div>
                        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-red-300 rounded-full animate-float animation-delay-2000"></div>
                      </div>

                      <div className="relative p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover/item:scale-125 transition-all duration-300">
                            <Flame className="w-5 h-5 text-white animate-pulse-slow" />
                          </div>
                          <div className="flex-1">
                            <div className="text-2xl font-bold text-white group-hover/item:scale-105 transition-transform duration-300 inline-block drop-shadow-lg">
                              {userStats.current_streak || 0}
                            </div>
                            <div className="text-[10px] text-white/90 font-semibold uppercase tracking-wider">Day Streak</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-white/80 font-medium">
                          <span>Best: {userStats.longest_streak || 0}</span>
                          {(userStats.current_streak || 0) >= 7 && (
                            <span className="px-2 py-0.5 bg-white/20 rounded-full font-bold animate-pulse-slow">🔥 ON FIRE!</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Achievement Badge */}
                    {(userStats.total_questions_solved || 0) >= 100 && (
                      <div className="flex-shrink-0 px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 group/badge">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl group-hover/badge:scale-125 transition-transform duration-300">🎯</span>
                          <div>
                            <div className="text-xs font-bold text-white">Century Club</div>
                            <div className="text-[10px] text-white/90">100+ Questions</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null
          ) : (
            <div className="mb-8 group">
              <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-2xl border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer" onClick={handleGoogleSignIn}>
                {/* Animated background blobs */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 -left-4 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob"></div>
                  <div className="absolute top-0 -right-4 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-2000"></div>
                  <div className="absolute -bottom-8 left-20 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative flex items-center justify-between gap-4 p-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                          <Target className="w-4 h-4 text-white" />
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                          <TrendingUp className="w-4 h-4 text-white" />
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                          <Flame className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <span className="text-white/90 text-xs font-semibold">Track Your Progress</span>
                    </div>
                    <p className="text-white text-sm font-medium">Sign in to unlock performance analytics, streak tracking & personalized insights</p>
                  </div>
                  <button className="px-5 py-2.5 bg-white hover:bg-gray-50 text-blue-600 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap flex items-center gap-2 group-hover:gap-3">
                    Sign In
                    <svg className="w-4 h-4 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Compact Info Bar - Attached below stats */}
          {user && !statsLoading && (recommendation || (weakSubjects && weakSubjects.length > 0)) && (
            <div className="mb-6">
              <CompactInfoBar
                recommendation={recommendation}
                subjects={weakSubjects}
                loading={statsLoading}
              />
            </div>
          )}

          {/* Decorative Separator */}
          {user && userStats && (
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t-2 border-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Your Learning Journey
                </span>
              </div>
            </div>
          )}

          {/* Practice Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {/* MPT Practice */}
            <div className="group relative rounded-xl bg-white border-2 border-gray-100 hover:border-blue-400 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-5 flex-1 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-4 shadow-md shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold mb-2 text-gray-900 group-hover:text-blue-900 transition-colors">MPT Practice</h3>
                <p className="text-gray-600 text-xs leading-relaxed mb-3 flex-1 break-words">
                  Past MPT MCQs + Mock tests
                </p>
                <div className="flex items-center justify-between text-xs mb-4 pb-3 border-b border-gray-100">
                  <div className="text-center">
                    <span className="font-bold text-blue-600 block">1,000+</span>
                    <span className="text-gray-500">MCQs</span>
                  </div>
                  <div className="w-px h-6 bg-gray-200"></div>
                  <div className="text-center">
                    <span className="font-bold text-blue-600 block">Timed</span>
                    <span className="text-gray-500">Tests</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/mpt-practice')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 text-sm shadow-md hover:shadow-lg overflow-hidden"
                >
                  <span className="truncate">Start Test</span>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </button>
              </div>
            </div>

            {/* Guess Papers */}
            <div className="group relative rounded-xl bg-white border-2 border-gray-100 hover:border-blue-400 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-5 flex-1 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-4 shadow-md shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold mb-2 text-gray-900 group-hover:text-blue-900 transition-colors">2026 Guess Papers</h3>
                <p className="text-gray-600 text-xs leading-relaxed mb-3 flex-1 break-words">
                  CSS 2026 guess papers
                </p>
                <div className="flex items-center justify-between text-xs mb-4 pb-3 border-b border-gray-100">
                  <div className="text-center">
                    <span className="font-bold text-blue-600 block">5</span>
                    <span className="text-gray-500">Subjects</span>
                  </div>
                  <div className="w-px h-6 bg-gray-200"></div>
                  <div className="text-center">
                    <span className="font-bold text-blue-600 block">2026</span>
                    <span className="text-gray-500">Edition</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/css/guess-papers')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 text-sm shadow-md hover:shadow-lg overflow-hidden"
                >
                  <span className="truncate">View Papers</span>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </button>
              </div>
            </div>

            {/* CSS Subject Practice */}
            <div className="group relative rounded-xl bg-white border-2 border-gray-100 hover:border-blue-400 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-5 flex-1 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-4 shadow-md shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold mb-2 text-gray-900 group-hover:text-blue-900 transition-colors">Past MCQs Practice</h3>
                <p className="text-gray-600 text-xs leading-relaxed mb-3 flex-1 break-words">
                  Subject-wise MCQs from past CSS exams
                </p>
                <div className="flex items-center justify-between text-xs mb-4 pb-3 border-b border-gray-100">
                  <div className="text-center">
                    <span className="font-bold text-blue-600 block">10,000+</span>
                    <span className="text-gray-500">MCQs</span>
                  </div>
                  <div className="w-px h-6 bg-gray-200"></div>
                  <div className="text-center">
                    <span className="font-bold text-blue-600 block">40+</span>
                    <span className="text-gray-500">Subjects</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/css/subjects')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 text-sm shadow-md hover:shadow-lg overflow-hidden"
                >
                  <span className="truncate">Start Practice</span>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </button>
              </div>
            </div>

            {/* Past Papers */}
            <div className="group relative rounded-xl bg-white border-2 border-gray-100 hover:border-blue-400 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-5 flex-1 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-4 shadow-md shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold mb-2 text-gray-900 group-hover:text-blue-900 transition-colors">Past Papers</h3>
                <p className="text-gray-600 text-xs leading-relaxed mb-3 flex-1 break-words">
                  CSS past exam papers
                </p>
                <div className="flex items-center justify-between text-xs mb-4 pb-3 border-b border-gray-100">
                  <div className="text-center">
                    <span className="font-bold text-blue-600 block">1,000+</span>
                    <span className="text-gray-500">Papers</span>
                  </div>
                  <div className="w-px h-6 bg-gray-200"></div>
                  <div className="text-center">
                    <span className="font-bold text-blue-600 block">50+</span>
                    <span className="text-gray-500">Subjects</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/css/past-papers')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 text-sm shadow-md hover:shadow-lg overflow-hidden"
                >
                  <span className="truncate">View Papers</span>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </button>
              </div>
            </div>

            {/* Solved Papers */}
            <div className="group relative rounded-xl bg-white border-2 border-gray-100 hover:border-blue-400 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-5 flex-1 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-4 shadow-md shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold mb-2 text-gray-900 group-hover:text-blue-900 transition-colors">Solved Papers</h3>
                <p className="text-gray-600 text-xs leading-relaxed mb-3 flex-1 break-words">
                  Solved CSS past papers
                </p>
                <div className="flex items-center justify-between text-xs mb-4 pb-3 border-b border-gray-100">
                  <div className="text-center">
                    <span className="font-bold text-blue-600 block">Full</span>
                    <span className="text-gray-500">Coverage</span>
                  </div>
                  <div className="w-px h-6 bg-gray-200"></div>
                  <div className="text-center">
                    <span className="font-bold text-blue-600 block">6</span>
                    <span className="text-gray-500">Subjects</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/css/solved-papers')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 text-sm shadow-md hover:shadow-lg overflow-hidden"
                >
                  <span className="truncate">View Solutions</span>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Simple Footer */}
      <footer className="border-t bg-white mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            {/* Left: Logo + Copyright */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="text-sm text-muted-foreground">
                &copy; 2025 Imtehan. All rights reserved.
              </div>
            </div>

            {/* Right: Links */}
            <nav className="flex items-center gap-4 md:gap-6 text-xs md:text-sm">
              <button
                onClick={() => router.push('/')}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Home
              </button>
              <button
                onClick={() => router.push('/css/premium')}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Premium
              </button>
              <button
                onClick={() => router.push('/faq')}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                FAQ
              </button>
              <button
                onClick={() => router.push('/contact')}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Contact
              </button>
              <button
                onClick={() => router.push('/terms')}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Terms
              </button>
              <button
                onClick={() => router.push('/privacy')}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Privacy
              </button>
            </nav>
          </div>
        </div>
      </footer>

      {/* CSS Eligibility Checker Modal */}
      {showEligibilityChecker && <CSSEligibilityChecker onClose={() => setShowEligibilityChecker(false)} />}

      {/* Feedback Button */}
      <FeedbackButton page="dashboard" />

      {/* Animations */}
      <style jsx global>{`
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

        @keyframes float {
          0% {
            transform: translateY(0px) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-15px) scale(1.1);
            opacity: 1;
          }
          100% {
            transform: translateY(0px) scale(1);
            opacity: 0.7;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Stat card hover effects */
        .stat-card:hover {
          transform: translateY(-4px);
        }
      `}</style>
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

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

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
    <div
      className="modal-overlay fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="w-full max-w-xl sm:max-w-2xl my-4">
        {/* Modal Container */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full overflow-hidden flex flex-col relative animate-modal-in">
          {/* Close Button - Optimized */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onClose()
            }}
            className="absolute top-3 right-3 z-50 w-9 h-9 sm:w-10 sm:h-10 bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 border-2 border-gray-200 hover:border-red-300 cursor-pointer group"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header - Compact */}
          <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-4 py-5 sm:px-6 sm:py-6 text-white text-center overflow-hidden pr-14">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-600/30 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="w-12 h-12 mx-auto mb-2.5 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/40 shadow-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold drop-shadow-lg mb-1">CSS 2026 Eligibility Checker</h2>
              <p className="text-xs text-white/90 font-medium">Verify your eligibility for CSS examination</p>
            </div>
          </div>

          {/* Form - Compact with scroll */}
          <div className="overflow-y-auto p-4 sm:p-5 space-y-3 sm:space-y-4 bg-gradient-to-br from-blue-50/30 to-white max-h-[55vh] sm:max-h-[60vh] custom-scrollbar">
          {/* Date of Birth */}
          <div className="bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-blue-100 hover:border-blue-300 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <label className="text-xs sm:text-sm font-bold text-gray-900">Date of Birth</label>
            </div>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-blue-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium text-sm text-gray-700"
              max={new Date().toISOString().split('T')[0]}
            />
            {age && (
              <div className="mt-2 flex items-center gap-2 text-xs">
                <div className="flex-1 bg-blue-50 rounded-lg px-2.5 py-1.5">
                  <span className="text-gray-600">Your age: </span>
                  <span className="font-bold text-blue-600">{age} years</span>
                </div>
              </div>
            )}
          </div>

          {/* Category */}
          <div className="bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-blue-100 hover:border-blue-300 transition-all">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <label className="text-xs sm:text-sm font-bold text-gray-900">Category</label>
            </div>
            <div className="space-y-1.5">
              {[
                { value: 'general', label: 'General', sublabel: '≤30 years' },
                { value: 'government', label: 'Government Employee', sublabel: '≤32 years' },
                { value: 'tribal', label: 'Tribal Areas/AJK/GB/Balochistan', sublabel: '≤32 years' }
              ].map((option) => (
                <label key={option.value} className={`flex items-center p-2 sm:p-2.5 rounded-lg cursor-pointer transition-all ${
                  formData.category === option.value
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : 'bg-gray-50 border-2 border-gray-200 hover:border-blue-300'
                }`}>
                  <input
                    type="radio"
                    name="category"
                    value={option.value}
                    checked={formData.category === option.value}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2 flex-shrink-0"
                  />
                  <div className="ml-2.5 flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-semibold text-gray-900">{option.label}</div>
                    <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{option.sublabel}</div>
                  </div>
                  {formData.category === option.value && (
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Grid for Yes/No Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
            {/* Pakistani Citizen */}
            <div className="bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-blue-100 hover:border-blue-300 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
                <label className="text-xs sm:text-sm font-bold text-gray-900">Pakistani Citizen?</label>
              </div>
              <div className="flex gap-2">
                {[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ].map((option) => (
                  <label key={option.value} className={`flex-1 flex items-center justify-center py-2 sm:py-2.5 rounded-lg cursor-pointer transition-all ${
                    formData.pakistaniCitizen === option.value
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="pakistaniCitizen"
                      value={option.value}
                      checked={formData.pakistaniCitizen === option.value}
                      onChange={(e) => handleInputChange('pakistaniCitizen', e.target.value)}
                      className="sr-only"
                    />
                    <span className="text-xs sm:text-sm font-bold">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Bachelor's Degree */}
            <div className="bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-blue-100 hover:border-blue-300 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <label className="text-xs sm:text-sm font-bold text-gray-900">Bachelor's Degree?</label>
              </div>
              <div className="flex gap-2">
                {[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' }
                ].map((option) => (
                  <label key={option.value} className={`flex-1 flex items-center justify-center py-2 sm:py-2.5 rounded-lg cursor-pointer transition-all ${
                    formData.bachelorDegree === option.value
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="bachelorDegree"
                      value={option.value}
                      checked={formData.bachelorDegree === option.value}
                      onChange={(e) => handleInputChange('bachelorDegree', e.target.value)}
                      className="sr-only"
                    />
                    <span className="text-xs sm:text-sm font-bold">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Grid for Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
            {/* CSS Attempts */}
            <div className="bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-blue-100 hover:border-blue-300 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <label className="text-xs sm:text-sm font-bold text-gray-900">CSS Attempts (Max 3)</label>
              </div>
              <select
                value={formData.cssAttempts}
                onChange={(e) => handleInputChange('cssAttempts', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-blue-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium text-sm text-gray-700 bg-white"
              >
                <option value="0">0 attempts</option>
                <option value="1">1 attempt</option>
                <option value="2">2 attempts</option>
                <option value="3">3 attempts (Maximum)</option>
              </select>
            </div>

            {/* Domicile */}
            <div className="bg-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-blue-100 hover:border-blue-300 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <label className="text-xs sm:text-sm font-bold text-gray-900">Domicile</label>
              </div>
              <select
                value={formData.domicile}
                onChange={(e) => handleInputChange('domicile', e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-blue-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium text-sm text-gray-700 bg-white"
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
          </div>

          </div>

          {/* Fixed Bottom Button */}
          <div className="p-4 sm:p-5 bg-white border-t-2 border-blue-100 flex-shrink-0">
            <button
              onClick={checkEligibility}
              className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-700 text-white font-bold py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:scale-[1.02] group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm sm:text-base">Check Eligibility</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
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
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
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
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setShowResultModal(false)
                        onClose()
                      }}
                      className={`flex-1 font-bold py-3 px-4 rounded-xl transition-all text-white shadow-lg hover:shadow-xl ${
                        resultData?.type === 'eligible'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
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

      {/* Modern Animations & Scrollbar */}
      <style jsx global>{`
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
        @keyframes modal-in {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
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
        .animate-modal-in {
          animation: modal-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }

        /* Custom scrollbar for eligibility modal */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #6366f1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #4f46e5);
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
