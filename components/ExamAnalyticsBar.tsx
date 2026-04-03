'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { Target, Flame, TrendingUp, Award } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { getUserAnalytics } from '@/lib/analytics'
import type { UserStats, TodaysRecommendation, WeakSubject } from '@/lib/analytics/types'

const EMPTY_STATS: UserStats = {
  total_questions_solved: 0,
  total_tests_completed: 0,
  average_score: 0,
  current_streak: 0,
  longest_streak: 0,
  total_study_time_minutes: 0,
}

const CompactInfoBar = dynamic(() => import('@/components/analytics/CompactInfoBar'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 rounded-xl h-16" />,
})

interface Props {
  examSlug: string
  /** If provided, sign-in button will redirect here. Defaults to /dashboard */
  signInHref?: string
}

export default function ExamAnalyticsBar({ examSlug, signInHref = '/dashboard' }: Props) {
  const router = useRouter()
  const [user, setUser]               = useState<any>(null)
  const [loading, setLoading]         = useState(true)
  const [userStats, setUserStats]     = useState<UserStats | null>(null)
  const [recommendation, setRec]      = useState<TodaysRecommendation | null>(null)
  const [weakSubjects, setWeak]       = useState<WeakSubject[]>([])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const supabase = createClient()
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()
      if (cancelled) return
      setUser(authUser ?? null)
      if (!authUser) {
        setLoading(false)
        return
      }
      try {
        const a = await getUserAnalytics(examSlug)
        if (cancelled) return
        if (a?.stats) {
          setUserStats(a.stats)
          setRec(a.recommendation ?? null)
          setWeak(a.weak_subjects || [])
        } else {
          setUserStats(EMPTY_STATS)
          setRec(null)
          setWeak([])
        }
      } catch {
        if (!cancelled) {
          setUserStats(EMPTY_STATS)
          setRec(null)
          setWeak([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [examSlug])

  /* ── Loading / auth ─────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50 shadow-lg p-4">
        <div className="flex items-center gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex-1 h-20 bg-white/50 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div
        className="mb-8 group cursor-pointer"
        onClick={() => router.push(signInHref)}
      >
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 -left-4 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob" />
            <div className="absolute top-0 -right-4 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-4000" />
          </div>
          <div className="relative flex items-center justify-between gap-4 p-5">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex -space-x-2">
                  {[Target, TrendingUp, Flame].map((Icon, i) => (
                    <div key={i} className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                  ))}
                </div>
                <span className="text-white/90 text-xs font-semibold">Track Your Progress</span>
              </div>
              <p className="text-white text-sm font-medium">Sign in to unlock performance analytics, streak tracking &amp; personalized insights</p>
            </div>
            <button className="px-5 py-2.5 bg-white hover:bg-gray-50 text-blue-600 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap">
              Sign In →
            </button>
          </div>
        </div>
      </div>
    )
  }

  const s = userStats ?? EMPTY_STATS

  /* ── Full analytics bar ── */
  return (
    <div className="mb-8 space-y-3">
      {/* Stats row */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />
        <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 opacity-50" />
          <div className="relative flex items-center gap-3 p-4 overflow-x-auto no-scrollbar">

            {/* Questions solved */}
            <StatCard
              value={s.total_questions_solved || 0}
              label="Questions"
              iconBg="from-blue-500 to-blue-600"
              shadowColor="shadow-blue-500/30"
              borderColor="border-blue-100 hover:border-blue-400"
              hoverBg="from-blue-500/10 to-indigo-500/10"
              textGrad="from-blue-600 to-indigo-600"
              progressPct={Math.min(((s.total_questions_solved || 0) / 1000) * 100, 100)}
              progressGrad="from-blue-500 to-indigo-500"
              icon={<Target className="w-5 h-5 text-white" />}
            />

            {/* Tests completed */}
            <StatCard
              value={s.total_tests_completed || 0}
              label="Tests"
              iconBg="from-green-500 to-emerald-600"
              shadowColor="shadow-green-500/30"
              borderColor="border-green-100 hover:border-green-400"
              hoverBg="from-green-500/10 to-emerald-500/10"
              textGrad="from-green-600 to-emerald-600"
              progressPct={Math.min(((s.total_tests_completed || 0) / 50) * 100, 100)}
              progressGrad="from-green-500 to-emerald-500"
              icon={<Award className="w-5 h-5 text-white" />}
            />

            {/* Accuracy */}
            <StatCard
              value={`${(s.average_score || 0).toFixed(0)}%`}
              label="Accuracy"
              iconBg="from-purple-500 to-pink-600"
              shadowColor="shadow-purple-500/30"
              borderColor="border-purple-100 hover:border-purple-400"
              hoverBg="from-purple-500/10 to-pink-500/10"
              textGrad="from-purple-600 to-pink-600"
              progressPct={s.average_score || 0}
              progressGrad="from-purple-500 to-pink-500"
              icon={<TrendingUp className="w-5 h-5 text-white" />}
            />

            {/* Streak — special orange gradient card */}
            <div className="stat-card group/item relative flex-1 min-w-[140px] bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-float" />
                <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-orange-300 rounded-full animate-float animation-delay-1000" />
                <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-red-300 rounded-full animate-float animation-delay-2000" />
              </div>
              <div className="relative p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover/item:scale-125 transition-all duration-300">
                    <Flame className="w-5 h-5 text-white animate-pulse-slow" />
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-white group-hover/item:scale-105 transition-transform duration-300 inline-block drop-shadow-lg">
                      {s.current_streak || 0}
                    </div>
                    <div className="text-[10px] text-white/90 font-semibold uppercase tracking-wider">Day Streak</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-white/80 font-medium">
                  <span>Best: {s.longest_streak || 0}</span>
                  {(s.current_streak || 0) >= 7 && (
                    <span className="px-2 py-0.5 bg-white/20 rounded-full font-bold animate-pulse-slow">🔥 ON FIRE!</span>
                  )}
                </div>
              </div>
            </div>

            {/* Achievement badge */}
            {(s.total_questions_solved || 0) >= 100 && (
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

      {/* Today's Focus + Weak subjects */}
      {(recommendation || weakSubjects.length > 0) && (
        <CompactInfoBar
          recommendation={recommendation}
          subjects={weakSubjects}
          loading={false}
        />
      )}
    </div>
  )
}

/* ── Reusable stat card ──────────────────────────────────────────── */
interface StatCardProps {
  value: string | number
  label: string
  icon: React.ReactNode
  iconBg: string
  shadowColor: string
  borderColor: string
  hoverBg: string
  textGrad: string
  progressPct: number
  progressGrad: string
}

function StatCard({ value, label, icon, iconBg, shadowColor, borderColor, hoverBg, textGrad, progressPct, progressGrad }: StatCardProps) {
  return (
    <div className={`stat-card group/item relative flex-1 min-w-[140px] bg-white rounded-xl border ${borderColor} shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${hoverBg} opacity-0 group-hover/item:opacity-100 transition-opacity duration-300`} />
      <div className="relative p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center shadow-lg ${shadowColor} group-hover/item:scale-110 group-hover/item:rotate-6 transition-all duration-300`}>
            {icon}
          </div>
          <div className="flex-1">
            <div className={`text-2xl font-bold bg-gradient-to-br ${textGrad} bg-clip-text text-transparent group-hover/item:scale-105 transition-transform duration-300 inline-block`}>
              {value}
            </div>
            <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{label}</div>
          </div>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${progressGrad} rounded-full transition-all duration-1000`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
