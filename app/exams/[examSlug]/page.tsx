'use client'

import { useEffect, useState, Suspense } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  BookOpen, FileText, Target, Flame,
  TrendingUp, ChevronRight, Star, Sparkles,
  Zap, Trophy, Award, Clock, Shield, Layers, BarChart2,
  Cpu, Activity, Crosshair, Brain, Flag, CheckCircle, Lock
} from 'lucide-react'
import { getExamConfig } from '@/lib/exam-configs'
import { createClient } from '@/lib/supabase/client'
import NavigationBar from '@/components/NavigationBar'
import { PremiumPopup } from '@/components/auth/PremiumPopup'
import SignInPopup from '@/components/auth/SignInPopup'

interface UserStats {
  totalQuestions: number
  totalQuizzes: number
  accuracy: number
  currentStreak: number
  bestStreak: number
}

interface SubjectProgress {
  subject: string
  attempted: number
  accuracy: number
}

interface TodayFocus {
  subject: string
  subjectLabel: string
  progress: string
  target: number
  needsImprovement: string[]
}

const roundMCQs = (n: number) => {
  if (n >= 10000) return `${Math.floor(n / 1000)}k+`
  if (n >= 1000) return `${Math.floor(n / 500) * 500}+`
  if (n >= 100) return `${Math.floor(n / 50) * 50}+`
  return `${n}`
}

const bankCount = (seed: string, base: number): string => {
  let h = 5381
  for (let i = 0; i < seed.length; i++) h = Math.imul(33, h) ^ seed.charCodeAt(i)
  const value = base + (Math.abs(h) % base)
  const rounded = Math.round(value / 100) * 100
  if (rounded >= 1000) {
    const k = Math.round(rounded / 100) / 10
    return k % 1 === 0 ? `${k}k+` : `${k.toFixed(1)}k+`
  }
  return `${rounded}+`
}

export default function ExamDashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" /></div>}>
      <ExamDashboard />
    </Suspense>
  )
}

function ExamDashboard() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const examSlug = params.examSlug as string
  const config = getExamConfig(examSlug)
  const preselectedMode = searchParams.get('mode') // e.g. 'most-repeated' or 'most-important'

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showPremium, setShowPremium] = useState(false)
  const [stats, setStats] = useState<UserStats>({
    totalQuestions: 0,
    totalQuizzes: 0,
    accuracy: 0,
    currentStreak: 0,
    bestStreak: 0,
  })
  const [subjectProgress, setSubjectProgress] = useState<SubjectProgress[]>([])
  const [todayFocus, setTodayFocus] = useState<TodayFocus | null>(null)
  const [subjectsWithCounts, setSubjectsWithCounts] = useState<any[]>([])

  useEffect(() => {
    if (config) {
      loadSubjectCounts()
      checkUser()
    }
  }, [config])

  useEffect(() => {
    if (user && config) {
      loadAnalytics()
    }
  }, [user, config])

  if (!config) {
    router.push('/exams')
    return null
  }

  const isPremium = user?.user_metadata?.is_premium || false

  const handleMockClick = (mockId: number) => {
    if (mockId === 1 || isPremium) {
      router.push(`/exams/${examSlug}/mock/${mockId}`)
      return
    }
    if (!user) {
      setShowSignIn(true)
    } else {
      setShowPremium(true)
    }
  }

  const checkUser = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    setLoading(false)
  }

  const loadSubjectCounts = async () => {
    const supabase = createClient()

    const counts = await Promise.all(
      config.sections.map(async (section) => {
        const { count: pastCount } = await supabase
          .from(section.dbTable)
          .select('*', { count: 'exact', head: true })
          .eq('type', 'practice')

        const { count: importantCount } = await supabase
          .from(section.dbTable)
          .select('*', { count: 'exact', head: true })
          .eq('type', 'most_important')

        const { count: repeatedCount } = await supabase
          .from(section.dbTable)
          .select('*', { count: 'exact', head: true })
          .eq('type', 'most_repeated')

        const totalMCQs = (pastCount || 0) + (importantCount || 0) + (repeatedCount || 0)

        return {
          ...section,
          repeatedCount: repeatedCount || 0,
          importantCount: importantCount || 0,
          pastCount: pastCount || 0,
          totalMCQs
        }
      })
    )

    setSubjectsWithCounts(counts)
  }

  const loadAnalytics = async () => {
    const supabase = createClient()

    // Fetch quiz attempts for this exam
    const { data: attempts, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('exam_slug', examSlug)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (!error && attempts) {
      const totalQuizzes    = attempts.length
      const totalQuestions  = attempts.reduce((sum, a) => sum + a.total_questions, 0)
      const totalCorrect    = attempts.reduce((sum, a) => sum + a.score, 0)
      const accuracy        = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
      const { current, best } = calculateStreak(attempts)

      setStats({
        totalQuestions,
        totalQuizzes,
        accuracy,
        currentStreak: current,
        bestStreak:    best,
      })

      // Calculate subject-wise progress
      const subjectMap = new Map<string, { correct: number, total: number, count: number }>()
      attempts.forEach(attempt => {
        const existing = subjectMap.get(attempt.subject_slug) || { correct: 0, total: 0, count: 0 }
        existing.correct += attempt.score
        existing.total += attempt.total_questions
        existing.count += 1
        subjectMap.set(attempt.subject_slug, existing)
      })

      const progress = Array.from(subjectMap.entries()).map(([subject, data]) => ({
        subject,
        attempted: data.total,
        accuracy: Math.round((data.correct / data.total) * 100),
        quizCount: data.count
      }))
      .sort((a, b) => b.attempted - a.attempted)

      setSubjectProgress(progress)

      // Set today's focus (lowest accuracy subject with attempts)
      const sorted = [...progress].sort((a, b) => a.accuracy - b.accuracy)
      if (sorted.length > 0 && sorted[0].accuracy < 80) {
        const lowestAccuracy = sorted[0]
        const section = config.sections.find(s => s.slug === lowestAccuracy.subject)

        // Find other subjects that need improvement
        const needsImprovement = sorted
          .slice(0, 3)
          .filter(s => s.accuracy < 80)
          .map(s => {
            const sec = config.sections.find(c => c.slug === s.subject)
            return `${sec?.label || s.subject} ${80 - s.accuracy}%`
          })

        setTodayFocus({
          subject: lowestAccuracy.subject,
          subjectLabel: section?.label || lowestAccuracy.subject,
          progress: `${lowestAccuracy.accuracy}% · ${lowestAccuracy.attempted} attempted`,
          target: 80,
          needsImprovement
        })
      }
    }
  }

  const calculateStreak = (attempts: any[]): { current: number; best: number } => {
    if (attempts.length === 0) return { current: 0, best: 0 }

    // Get unique dates (YYYY-MM-DD) sorted descending
    const dates = [...new Set(
      attempts.map(a => new Date(a.created_at).toISOString().slice(0, 10))
    )].sort((a, b) => b.localeCompare(a))

    let current = 0
    let best    = 0
    let temp    = 1
    const today = new Date().toISOString().slice(0, 10)

    // Current streak — count back from today
    let expected = today
    for (const d of dates) {
      if (d === expected) {
        current++
        const prev = new Date(expected)
        prev.setDate(prev.getDate() - 1)
        expected = prev.toISOString().slice(0, 10)
      } else break
    }

    // Best streak — find longest consecutive run
    for (let i = 1; i < dates.length; i++) {
      const prev = new Date(dates[i - 1])
      const curr = new Date(dates[i])
      const diff = Math.round((prev.getTime() - curr.getTime()) / 86400000)
      if (diff === 1) { temp++ } else { best = Math.max(best, temp); temp = 1 }
    }
    best = Math.max(best, temp, current)

    return { current, best }
  }

  const getFirstName = () => {
    if (user?.user_metadata?.name) {
      return user.user_metadata.name.split(' ')[0]
    }
    if (user?.email) {
      return user.email.split('@')[0]
    }
    return 'User'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Sign In Banner for Non-Logged In Users */}
        {!user && (
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-4 sm:p-6 mb-8 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Track Your Progress</h3>
                  <p className="text-xs text-blue-100">Sign in for analytics, streak tracking & insights</p>
                </div>
              </div>
              <button
                onClick={() => router.push('/dashboard')}
                className="self-end sm:self-auto px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors flex items-center gap-1.5"
              >
                Sign In <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Welcome */}
        {user && (
          <h2 className="text-3xl font-bold text-blue-600 mb-8">
            Welcome back, {getFirstName()}
          </h2>
        )}

        {/* Stats Cards - Always show for logged in users */}
        {user && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Questions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">{stats.totalQuestions}</div>
                  <div className="text-sm text-gray-600">Questions</div>
                </div>
              </div>
            </div>

            {/* Quizzes */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">{stats.totalQuizzes}</div>
                  <div className="text-sm text-gray-600">Quizzes</div>
                </div>
              </div>
            </div>

            {/* Accuracy */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">{stats.accuracy}%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
              </div>
            </div>

            {/* Streak */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{stats.currentStreak}</div>
                  <div className="text-sm text-white/90">Day Streak</div>
                  {stats.bestStreak > 0 && (
                    <div className="text-xs text-white/70 mt-0.5">Best: {stats.bestStreak}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Today's Focus - Show if user has attempts and needs improvement */}
        {user && todayFocus && (
          <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-purple-200 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Today's Focus</h3>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                  Priority
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{todayFocus.subjectLabel}</h4>
                <p className="text-sm text-gray-600 mb-1">
                  {todayFocus.progress} • Target: {todayFocus.target}%
                </p>
                <p className="text-sm">
                  <span className="text-red-500 font-semibold">IMPROVE: </span>
                  <span className="text-gray-600">{todayFocus.needsImprovement.join(', ')}</span>
                </p>
              </div>
              <button
                onClick={() => {
                  const section = config.sections.find(s => s.slug === todayFocus.subject)
                  if (section) {
                    router.push(`/exams/${examSlug}/${section.slug}`)
                  }
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                Practice Now
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Mock Tests Section */}
        {!preselectedMode && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <h3 className="text-base font-semibold text-gray-900">Mock Tests</h3>
              <span className="text-xs text-purple-600 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full font-medium">
                20 Tests
              </span>
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-500">{config.totalMCQs} Qs · {config.duration}m</span>
            </div>

            {[
              {
                group: 'Standard', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200',
                mocks: [
                  { id: 1,  icon: Target,    title: 'Mock 1',  desc: 'Full simulation',    pct: 1.00 },
                  { id: 2,  icon: FileText,  title: 'Mock 2',  desc: 'Past paper pattern', pct: 1.00 },
                  { id: 3,  icon: Layers,    title: 'Mock 3',  desc: 'Subject-balanced',   pct: 1.00 },
                  { id: 4,  icon: BookOpen,  title: 'Mock 4',  desc: 'Core concepts',      pct: 1.00 },
                  { id: 5,  icon: Star,      title: 'Mock 5',  desc: '75% warm-up',        pct: 0.75 },
                  { id: 6,  icon: Zap,       title: 'Mock 6',  desc: 'Mixed topics',       pct: 0.75 },
                  { id: 7,  icon: Clock,     title: 'Mock 7',  desc: 'Quick 50% rev.',     pct: 0.50 },
                ],
              },
              {
                group: 'Advanced', color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200',
                mocks: [
                  { id: 8,  icon: TrendingUp, title: 'Mock 8',  desc: 'Advanced sim.',      pct: 1.00 },
                  { id: 9,  icon: Flame,      title: 'Mock 9',  desc: 'High-yield focus',   pct: 1.00 },
                  { id: 10, icon: BarChart2,  title: 'Mock 10', desc: 'Deep-dive',          pct: 1.00 },
                  { id: 11, icon: Brain,      title: 'Mock 11', desc: '75% analytical',     pct: 0.75 },
                  { id: 12, icon: Activity,   title: 'Mock 12', desc: 'Speed & pressure',   pct: 0.50 },
                  { id: 13, icon: Trophy,     title: 'Mock 13', desc: 'Intensive practice', pct: 1.00 },
                  { id: 14, icon: Crosshair,  title: 'Mock 14', desc: 'Rapid fire 25%',     pct: 0.25 },
                ],
              },
              {
                group: 'Expert', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200',
                mocks: [
                  { id: 15, icon: Shield,      title: 'Mock 15', desc: 'Expert full test',   pct: 1.00 },
                  { id: 16, icon: Award,       title: 'Mock 16', desc: 'Ultimate challenge', pct: 1.00 },
                  { id: 17, icon: Cpu,         title: 'Mock 17', desc: '75% champions',      pct: 0.75 },
                  { id: 18, icon: CheckCircle, title: 'Mock 18', desc: 'Final review',       pct: 1.00 },
                  { id: 19, icon: Sparkles,    title: 'Mock 19', desc: 'Grand master',       pct: 1.00 },
                  { id: 20, icon: Flag,        title: 'Mock 20', desc: 'Final assessment',   pct: 1.00 },
                ],
              },
            ].map(({ group, color, bg, border, mocks }) => (
              <div key={group} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold ${color}`}>{group}</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {mocks.map(({ id, icon: Icon, title, desc, pct }) => {
                    const qs = Math.round(config.totalMCQs * pct)
                    const mins = Math.round(config.duration * pct)
                    const locked = id > 1 && !isPremium
                    return (
                      <button
                        key={id}
                        onClick={() => handleMockClick(id)}
                        className={`group relative flex flex-col items-center text-center border rounded-xl p-2 sm:p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 ${
                          locked
                            ? 'bg-gray-50 border-gray-200 cursor-pointer hover:border-gray-300'
                            : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-md'
                        }`}
                      >
                        {locked && (
                          <div className="absolute top-1.5 right-1.5">
                            <Lock className="w-2.5 h-2.5 text-gray-400" />
                          </div>
                        )}
                        <div className={`w-8 h-8 rounded-lg ${locked ? 'bg-gray-100 border-gray-200' : bg} border ${locked ? 'border-gray-200' : border} flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform`}>
                          <Icon className={`w-3.5 h-3.5 ${locked ? 'text-gray-400' : color}`} />
                        </div>
                        <span className={`text-[11px] font-semibold leading-tight ${locked ? 'text-gray-400' : 'text-gray-900'}`}>{title}</span>
                        <div className={`mt-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${locked ? 'bg-gray-100 text-gray-400 border border-gray-200' : `${bg} ${color} border ${border}`}`}>
                          {locked ? 'Premium' : `${qs}Q`}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Subjects */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <h3 className="text-base font-semibold text-gray-900">
              {preselectedMode === 'most-repeated' && 'Most Repeated — Pick a Subject'}
              {preselectedMode === 'most-important' && 'Most Important — Pick a Subject'}
              {!preselectedMode && 'Practice by Subject'}
            </h3>
            {preselectedMode && (
              <span className="text-xs text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full font-medium">
                {preselectedMode === 'most-repeated' ? 'Most Repeated' : 'Most Important'}
              </span>
            )}
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {subjectsWithCounts.map((section) => {
              const progress = subjectProgress.find(p => p.subject === section.slug)
              const Icon = BookOpen
              const roundedCount = roundMCQs(section.totalMCQs)

              return (
                <div
                  key={section.slug}
                  className="group relative bg-white rounded-lg border border-gray-200 hover:border-blue-400 shadow-sm hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer hover:-translate-y-1 overflow-hidden"
                  onClick={() => router.push(preselectedMode
                    ? `/exams/${examSlug}/${section.slug}/${preselectedMode}`
                    : `/exams/${examSlug}/${section.slug}`
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative p-4 text-center">
                    <div className="w-9 h-9 mx-auto rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-2.5 shadow-sm group-hover:scale-105 transition-all duration-300">
                      <Icon className="w-4 h-4 text-white" />
                    </div>

                    <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-900 transition-colors leading-tight">{section.label}</h3>

                    <div className="bg-blue-50 rounded-lg p-2 my-2 border border-blue-100">
                      {user && progress ? (
                        <>
                          <div className="text-base font-bold text-blue-600">{progress.accuracy}%</div>
                          <div className="text-[10px] text-gray-500">{progress.attempted} done</div>
                        </>
                      ) : (
                        <div className="text-xs font-semibold text-blue-600">Practice</div>
                      )}
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-1.5 px-3 rounded-md font-medium text-xs transition-all">
                      {user && progress ? 'Continue' : 'Start'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>

    <SignInPopup isOpen={showSignIn} onClose={() => setShowSignIn(false)} message="Sign in to access more mock tests and practice sets" />
    <PremiumPopup isOpen={showPremium} onClose={() => setShowPremium(false)} />
    </>
  )
}
