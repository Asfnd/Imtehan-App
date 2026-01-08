'use client'

import { Lightbulb, ArrowRight, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import type { TodaysRecommendation, WeakSubject } from '@/lib/analytics/types'

interface CompactInfoBarProps {
  recommendation: TodaysRecommendation | null
  subjects: WeakSubject[]
  loading?: boolean
}

export default function CompactInfoBar({ recommendation, subjects, loading }: CompactInfoBarProps) {
  if (loading) {
    return (
      <div className="animate-pulse bg-muted/30 rounded-xl h-20" />
    )
  }

  if (!recommendation && (!subjects || subjects.length === 0)) {
    return null
  }

  const topSubjects = subjects.slice(0, 3)

  // Calculate progress percentage for circular indicator
  const progressPercentage = recommendation ? (recommendation.average_score / 80) * 100 : 0
  const strokeDasharray = 2 * Math.PI * 18 // circumference for radius 18
  const strokeDashoffset = strokeDasharray - (strokeDasharray * Math.min(progressPercentage, 100)) / 100

  return (
    <div className="bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className="px-5 py-4 flex items-center gap-5">
        {/* Left: Recommendation with Circular Progress */}
        {recommendation && (
          <>
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Circular Progress Indicator */}
              <div className="relative flex items-center justify-center">
                {/* Background circle */}
                <svg className="w-14 h-14 transform -rotate-90">
                  <circle
                    cx="28"
                    cy="28"
                    r="18"
                    stroke="#E0E7FF"
                    strokeWidth="4"
                    fill="none"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="28"
                    cy="28"
                    r="18"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="50%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Recommendation Info */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Today's Focus</span>
                  <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded">
                    Priority
                  </span>
                </div>
                <div className="text-base font-bold text-gray-900 mb-0.5">
                  {recommendation.subject}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="font-semibold text-red-600">{recommendation.average_score.toFixed(0)}%</span>
                  <span className="text-gray-400">•</span>
                  <span>{recommendation.days_since_practice === 0 ? 'Today' : `${recommendation.days_since_practice}d ago`}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">Target: <span className="font-semibold text-gray-700">80%</span></span>
                </div>
              </div>
            </div>

            <div className="w-px h-16 bg-gray-200" />
          </>
        )}

        {/* Middle: Quick Subjects with Mini Progress Bars */}
        {topSubjects.length > 0 && (
          <div className="flex items-center gap-3 flex-1 min-w-0 overflow-x-auto scrollbar-hide py-1">
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Improve:</span>
            </div>
            {topSubjects.map((subject, index) => {
              const getScoreColor = (score: number) => {
                if (score < 60) return { text: 'text-red-600', bg: 'bg-red-500', light: 'bg-red-100' }
                if (score < 70) return { text: 'text-orange-600', bg: 'bg-orange-500', light: 'bg-orange-100' }
                if (score < 80) return { text: 'text-yellow-600', bg: 'bg-yellow-500', light: 'bg-yellow-100' }
                return { text: 'text-green-600', bg: 'bg-green-500', light: 'bg-green-100' }
              }

              const colors = getScoreColor(subject.average_score)

              return (
                <Link
                  key={index}
                  href={`/css/css-practice?subject=${encodeURIComponent(subject.subject)}`}
                  className="group flex flex-col gap-1.5 px-3 py-2 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl transition-all flex-shrink-0 min-w-[140px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700 group-hover:text-blue-700 truncate">
                      {subject.subject}
                    </span>
                    <span className={`text-xs font-bold ${colors.text}`}>
                      {subject.average_score.toFixed(0)}%
                    </span>
                  </div>
                  {/* Mini progress bar */}
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors.bg} rounded-full transition-all duration-500`}
                      style={{ width: `${subject.average_score}%` }}
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* Right: Action Button */}
        {recommendation && (
          <Link href={`/css/css-practice?subject=${encodeURIComponent(recommendation.subject)}`}>
            <button className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white text-sm font-bold rounded-xl transition-all hover:shadow-lg hover:scale-105 flex-shrink-0">
              Practice Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
