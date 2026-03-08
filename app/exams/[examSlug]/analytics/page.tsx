'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Target, Flame, BookOpen, FileText,
  ArrowLeft, ChevronRight, TrendingUp, Zap
} from 'lucide-react'
import { getExamConfig } from '@/lib/exam-configs'
import { notFound } from 'next/navigation'
import { getUserAnalytics, getStreakMessage, formatStudyTime } from '@/lib/analytics'
import type { UserAnalytics } from '@/lib/analytics/types'

export default function ExamAnalytics() {
  const params   = useParams()
  const router   = useRouter()
  const examSlug = params.examSlug as string
  const config   = getExamConfig(examSlug)

  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null)
  const [loading, setLoading]     = useState(true)
  const [signedIn, setSignedIn]   = useState(false)

  if (!config) notFound()

  useEffect(() => {
    getUserAnalytics().then(data => {
      if (data) { setAnalytics(data); setSignedIn(true) }
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics…</p>
        </div>
      </div>
    )
  }

  if (!signedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">Sign in to view your personal analytics dashboard</p>
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

  const stats  = analytics?.stats
  const weak   = analytics?.weak_subjects ?? []
  const rec    = analytics?.recommendation
  const recent = analytics?.recent_scores ?? []

  const subjectIcons     = [BookOpen, FileText, Target, Zap, TrendingUp]
  const subjectGradients = [
    'from-blue-500 to-indigo-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-cyan-500 to-blue-500',
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 max-w-5xl flex items-center justify-between">
          <button
            onClick={() => router.push(`/exams/${examSlug}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to {config.name}</span>
          </button>
          <h1 className="text-lg font-bold text-gray-900">My Analytics</h1>
          <div className="w-24" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-6">

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats?.total_tests_completed ?? 0}</div>
              <div className="text-xs text-gray-500">Sets Done</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats?.average_score ?? 0}%</div>
              <div className="text-xs text-gray-500">Avg Score</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats?.total_questions_solved ?? 0}</div>
              <div className="text-xs text-gray-500">MCQs Solved</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-5 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats?.current_streak ?? 0}</div>
              <div className="text-xs text-white/80">Day Streak</div>
            </div>
          </div>
        </div>

        {/* Streak message */}
        {(stats?.current_streak ?? 0) > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-5 py-3 flex items-center justify-between">
            <p className="text-sm font-medium text-orange-800">{getStreakMessage(stats!.current_streak)}</p>
            {(stats?.total_study_time_minutes ?? 0) > 0 && (
              <p className="text-xs text-orange-600">{formatStudyTime(stats!.total_study_time_minutes)} studied</p>
            )}
          </div>
        )}

        {/* Today's recommendation */}
        {rec && (
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Today&apos;s Focus</h3>
              <span className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">Priority</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-gray-900 mb-1">{rec.subject}</p>
                <p className="text-sm text-gray-500">{rec.reason}</p>
              </div>
              <button
                onClick={() => {
                  const section = config.sections.find(s =>
                    s.label.toLowerCase() === rec.subject.toLowerCase() || s.slug === rec.subject
                  )
                  router.push(section ? `/exams/${examSlug}/${section.slug}` : `/exams/${examSlug}`)
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ml-4"
              >
                Practice <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Weak subjects */}
        {weak.length > 0 && (
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">Needs Work</h3>
            <div className="space-y-3">
              {weak.map((w) => (
                <div key={w.subject} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-800">{w.subject}</span>
                      <span className="text-red-600 font-bold">{Math.round(Number(w.average_score))}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-400 rounded-full" style={{ width: `${Math.round(Number(w.average_score))}%` }} />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const section = config.sections.find(s =>
                        s.label.toLowerCase() === w.subject.toLowerCase() || s.slug === w.subject
                      )
                      router.push(section ? `/exams/${examSlug}/${section.slug}` : `/exams/${examSlug}`)
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold whitespace-nowrap"
                  >
                    Practice →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent scores */}
        {recent.length > 0 && (
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">Recent Results</h3>
            <div className="space-y-2">
              {recent.map((r, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${r.score >= 80 ? 'bg-green-500' : r.score >= 60 ? 'bg-amber-400' : 'bg-red-400'}`}
                      style={{ width: `${r.score}%` }}
                    />
                  </div>
                  <span className={`text-sm font-bold w-12 text-right ${r.score >= 80 ? 'text-green-600' : r.score >= 60 ? 'text-amber-600' : 'text-red-500'}`}>
                    {Math.round(r.score)}%
                  </span>
                  {r.subject && <span className="text-xs text-gray-400 truncate max-w-[100px]">{r.subject}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subject cards */}
        <div>
          <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider mb-4">Subjects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.sections.map((section, index) => {
              const Icon     = subjectIcons[index % subjectIcons.length]
              const gradient = subjectGradients[index % subjectGradients.length]
              const perf     = weak.find(w => w.subject === section.label || w.subject === section.slug)
              return (
                <div key={section.slug} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-bold text-gray-900 mb-1">{section.label}</p>
                  {perf ? (
                    <p className="text-xs text-gray-500 mb-3">{perf.questions_attempted} MCQs · {Math.round(Number(perf.average_score))}% avg</p>
                  ) : (
                    <p className="text-xs text-gray-400 mb-3">No attempts yet</p>
                  )}
                  <button
                    onClick={() => router.push(`/exams/${examSlug}/${section.slug}`)}
                    className={`w-full bg-gradient-to-r ${gradient} hover:opacity-90 text-white py-2.5 rounded-lg text-sm font-semibold transition-opacity flex items-center justify-center gap-1`}
                  >
                    Practice <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {!stats?.total_tests_completed && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
            <p className="text-blue-800 font-semibold mb-1">No data yet</p>
            <p className="text-blue-600 text-sm">Complete a practice set to start tracking your progress.</p>
          </div>
        )}
      </div>
    </div>
  )
}
