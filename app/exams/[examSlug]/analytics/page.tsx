'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  TrendingUp, Target, Award, Flame,
  BookOpen, FileText, Star, Sparkles,
  ArrowLeft, ChevronRight
} from 'lucide-react'
import { getExamConfig } from '@/lib/exam-configs'
import { notFound } from 'next/navigation'

interface UserStats {
  totalQuizzes: number
  totalTests: number
  accuracy: number
  currentStreak: number
}

interface SubjectProgress {
  subject: string
  attempted: number
  accuracy: number
}

export default function ExamAnalytics() {
  const params = useParams()
  const router = useRouter()
  const examSlug = params.examSlug as string
  const config = getExamConfig(examSlug)

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<UserStats>({
    totalQuizzes: 0,
    totalTests: 0,
    accuracy: 0,
    currentStreak: 0
  })
  const [subjectProgress, setSubjectProgress] = useState<SubjectProgress[]>([])
  const [todayFocus, setTodayFocus] = useState<string>('')

  useEffect(() => {
    checkUser()
  }, [])

  useEffect(() => {
    if (user) {
      loadAnalytics()
    }
  }, [user, examSlug])

  if (!config) {
    notFound()
  }

  const checkUser = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    setLoading(false)
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
      // Calculate stats
      const totalQuizzes = attempts.length
      const totalCorrect = attempts.reduce((sum, a) => sum + a.score, 0)
      const totalQuestions = attempts.reduce((sum, a) => sum + a.total_questions, 0)
      const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0

      // Calculate streak
      const streak = calculateStreak(attempts)

      setStats({
        totalQuizzes,
        totalTests: 0, // Can add mock test tracking later
        accuracy,
        currentStreak: streak
      })

      // Calculate subject-wise progress
      const subjectMap = new Map<string, { correct: number, total: number }>()
      attempts.forEach(attempt => {
        const existing = subjectMap.get(attempt.subject_slug) || { correct: 0, total: 0 }
        existing.correct += attempt.score
        existing.total += attempt.total_questions
        subjectMap.set(attempt.subject_slug, existing)
      })

      const progress = Array.from(subjectMap.entries()).map(([subject, data]) => ({
        subject,
        attempted: data.total,
        accuracy: Math.round((data.correct / data.total) * 100)
      }))
      .sort((a, b) => b.attempted - a.attempted)

      setSubjectProgress(progress)

      // Set today's focus (lowest accuracy subject)
      const lowestAccuracy = progress.sort((a, b) => a.accuracy - b.accuracy)[0]
      if (lowestAccuracy) {
        const section = config.sections.find(s => s.slug === lowestAccuracy.subject)
        setTodayFocus(section?.label || lowestAccuracy.subject)
      }
    }
  }

  const calculateStreak = (attempts: any[]) => {
    if (attempts.length === 0) return 0

    let streak = 0
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    for (let i = 0; i < attempts.length; i++) {
      const attemptDate = new Date(attempts[i].created_at)
      attemptDate.setHours(0, 0, 0, 0)

      const diffDays = Math.floor((currentDate.getTime() - attemptDate.getTime()) / (1000 * 60 * 60 * 24))

      if (diffDays === streak) {
        streak++
      } else if (diffDays > streak) {
        break
      }
    }

    return streak
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
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to view your analytics dashboard</p>
          <button
            onClick={() => router.push('/exams')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Go to Exams
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push(`/exams/${examSlug}`)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to {config.name}</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Analytics Dashboard</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome */}
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
          Welcome back, {getFirstName()}
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Quizzes */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{stats.totalQuizzes}</div>
                <div className="text-sm text-gray-600">Quizzes</div>
              </div>
            </div>
          </div>

          {/* Tests */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{stats.totalTests}</div>
                <div className="text-sm text-gray-600">Tests</div>
              </div>
            </div>
          </div>

          {/* Accuracy */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
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
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{stats.currentStreak}</div>
                <div className="text-sm text-white/90">Day Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Focus */}
        {todayFocus && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">TODAY'S FOCUS</h3>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                Priority
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{todayFocus}</h4>
                <p className="text-sm text-gray-600">
                  <span className="text-red-500 font-semibold">IMPROVE: </span>
                  {todayFocus} needs practice
                </p>
              </div>
              <button
                onClick={() => {
                  const section = config.sections.find(s => s.label === todayFocus)
                  if (section) {
                    router.push(`/exams/${examSlug}/${section.slug}`)
                  }
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                Practice Now
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Your Learning Journey */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">YOUR LEARNING JOURNEY</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.sections.map((section, index) => {
              const progress = subjectProgress.find(p => p.subject === section.slug)
              const icons = [BookOpen, Star, FileText, Sparkles]
              const Icon = icons[index % icons.length]
              const gradients = [
                'from-blue-500 to-indigo-500',
                'from-purple-500 to-pink-500',
                'from-green-500 to-emerald-500',
                'from-orange-500 to-red-500'
              ]
              const gradient = gradients[index % gradients.length]

              return (
                <div key={section.slug} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h4 className="font-bold text-gray-900 mb-2">{section.label}</h4>
                  <p className="text-sm text-gray-600 mb-4">Practice MCQs + Mock Tests</p>

                  {progress && (
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Attempted</span>
                        <span className="font-bold text-gray-900">{progress.attempted} MCQs</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Accuracy</span>
                        <span className="font-bold text-gray-900">{progress.accuracy}%</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => router.push(`/exams/${examSlug}/${section.slug}`)}
                    className={`w-full bg-gradient-to-r ${gradient} hover:opacity-90 text-white py-3 rounded-lg font-semibold transition-opacity flex items-center justify-center gap-2`}
                  >
                    Start Practice
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
