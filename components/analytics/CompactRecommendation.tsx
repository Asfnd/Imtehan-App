'use client'

import { ArrowRight, Lightbulb, TrendingDown, Clock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import type { TodaysRecommendation, WeakSubject } from '@/lib/analytics/types'

interface CompactRecommendationProps {
  recommendation: TodaysRecommendation | null
  subjects: WeakSubject[]
  loading?: boolean
}

export default function CompactRecommendation({ recommendation, subjects, loading }: CompactRecommendationProps) {
  if (loading) {
    return (
      <div className="animate-pulse bg-muted/30 rounded-2xl h-40" />
    )
  }

  if (!recommendation && (!subjects || subjects.length === 0)) {
    return null
  }

  const topSubjects = subjects.slice(0, 4)

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-blue-200/50 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Top: Recommendation Bar - Blue Gradient */}
      {recommendation && (
        <div className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-4">
          {/* Decorative blur circles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
          </div>

          {/* Content */}
          <div className="relative flex items-center gap-4">
            {/* Icon */}
            <div className="flex-shrink-0 w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>

            {/* Main Info */}
            <div className="flex-1 min-w-0">
              {/* Top Labels */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-white/80 uppercase tracking-wide font-medium">
                  Today's Focus
                </span>
                <span className="px-2 py-0.5 bg-red-500/30 backdrop-blur-sm border border-white/30 rounded-md text-xs text-white font-semibold">
                  🔥 High Priority
                </span>
              </div>

              {/* Subject Title */}
              <h3 className="text-xl font-bold text-white mb-2">
                {recommendation.subject}
              </h3>

              {/* Stats Row */}
              <div className="flex items-center gap-3 text-sm text-white/95">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold">{recommendation.average_score.toFixed(0)}%</span>
                  <span className="text-white/70">score</span>
                </div>

                <span className="text-white/50">•</span>

                <div className="flex items-center gap-1.5">
                  <span className="font-bold">
                    {recommendation.days_since_practice === 0 ? 'Today' :
                     recommendation.days_since_practice === 1 ? '1 day' :
                     `${recommendation.days_since_practice} days`}
                  </span>
                  <span className="text-white/70">ago</span>
                </div>

                <span className="text-white/50">•</span>

                <span className="text-white/70">Target: <span className="font-bold text-white">80%</span></span>
              </div>
            </div>

            {/* Action Button */}
            <Link href={`/css/css-practice?subject=${encodeURIComponent(recommendation.subject)}`}>
              <Button
                size="default"
                className="bg-white text-blue-600 hover:bg-white/90 font-bold whitespace-nowrap shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Practice
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Bottom: Subjects Horizontal Scroll */}
      {topSubjects.length > 0 && (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Label */}
            <div className="flex-shrink-0 text-xs font-bold text-gray-600 uppercase tracking-wide">
              📈 Improve
            </div>

            {/* Horizontal Scrolling Subjects */}
            <div className="flex gap-2.5 overflow-x-auto scrollbar-hide flex-1 py-1">
              {topSubjects.map((subject, index) => {
                const getRankColor = (idx: number) => {
                  if (idx === 0) return 'from-red-500 to-orange-500'
                  if (idx === 1) return 'from-orange-500 to-yellow-500'
                  if (idx === 2) return 'from-yellow-500 to-amber-500'
                  return 'from-green-500 to-emerald-500'
                }

                const getScoreColor = (score: number) => {
                  if (score < 60) return 'text-red-600'
                  if (score < 70) return 'text-orange-600'
                  if (score < 80) return 'text-yellow-600'
                  return 'text-green-600'
                }

                return (
                  <Link
                    key={index}
                    href={`/css/css-practice?subject=${encodeURIComponent(subject.subject)}`}
                    className="group"
                  >
                    <div className="flex items-center gap-2.5 px-3 py-2 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer flex-shrink-0 hover:-translate-y-0.5">
                      {/* Rank Badge */}
                      <div className={`flex-shrink-0 w-6 h-6 bg-gradient-to-br ${getRankColor(index)} rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-sm`}>
                        {index + 1}
                      </div>

                      {/* Subject Info */}
                      <div className="flex flex-col min-w-0">
                        <div className="text-sm font-semibold text-gray-900 truncate max-w-[140px]">
                          {subject.subject}
                        </div>
                        <div className="text-xs text-gray-500">
                          {subject.days_since_practice === 0 ? 'Today' :
                           subject.days_since_practice === 1 ? '1d ago' :
                           `${subject.days_since_practice}d ago`} • {subject.questions_attempted} Q
                        </div>
                      </div>

                      {/* Score */}
                      <div className={`text-base font-bold ${getScoreColor(subject.average_score)} ml-1`}>
                        {subject.average_score.toFixed(0)}%
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

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
