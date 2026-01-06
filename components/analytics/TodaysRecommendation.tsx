'use client'

import { ArrowRight, Lightbulb, TrendingDown, Clock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import type { TodaysRecommendation as RecommendationType } from '@/lib/analytics/types'

interface TodaysRecommendationProps {
  recommendation: RecommendationType | null
  loading?: boolean
}

export default function TodaysRecommendation({ recommendation, loading }: TodaysRecommendationProps) {
  if (loading) {
    return (
      <div className="animate-pulse bg-muted/30 rounded-xl h-32" />
    )
  }

  if (!recommendation) {
    return null
  }

  // Determine urgency level and colors
  const getUrgencyConfig = (priority: number, score: number) => {
    if (priority === 1 || score < 50) {
      return {
        gradient: 'from-red-500 to-orange-600',
        bgColor: 'bg-red-50',
        iconColor: 'text-red-600',
        buttonGradient: 'from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700',
        urgencyLabel: '🚨 High Priority'
      }
    } else if (priority === 2 || score < 60) {
      return {
        gradient: 'from-orange-500 to-yellow-600',
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-600',
        buttonGradient: 'from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700',
        urgencyLabel: '⚠️ Medium Priority'
      }
    } else {
      return {
        gradient: 'from-blue-500 to-indigo-600',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600',
        buttonGradient: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
        urgencyLabel: '💡 Recommended'
      }
    }
  }

  const config = getUrgencyConfig(recommendation.priority, recommendation.average_score)

  return (
    <div className="bg-background rounded-xl border p-6 hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 ${config.bgColor} rounded-lg`}>
            <Lightbulb className={`w-5 h-5 ${config.iconColor}`} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Today's Recommendation</h3>
            <p className="text-xs text-muted-foreground">Smart pick based on your performance</p>
          </div>
        </div>
        <div className="hidden sm:block text-xs font-semibold px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full">
          {config.urgencyLabel}
        </div>
      </div>

      {/* Main Content - Compact Grid */}
      <div className="grid md:grid-cols-[1fr,auto] gap-4 items-center">
        {/* Left: Subject Info & Stats */}
        <div className="flex items-center gap-4">
          {/* Subject Name */}
          <div className="flex-1">
            <h4 className={`text-2xl font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent mb-1`}>
              {recommendation.subject}
            </h4>
            <p className="text-sm text-gray-600 mb-3">{recommendation.reason}</p>

            {/* Compact Stats Row */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <TrendingDown className={`w-4 h-4 ${config.iconColor}`} />
                <div>
                  <span className={`font-bold ${
                    recommendation.average_score < 60 ? 'text-red-600' :
                    recommendation.average_score < 70 ? 'text-orange-600' :
                    'text-blue-600'
                  }`}>
                    {recommendation.average_score.toFixed(0)}%
                  </span>
                  <span className="text-muted-foreground ml-1">score</span>
                </div>
              </div>

              <div className="w-px h-4 bg-gray-300" />

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className={`font-semibold ${
                  recommendation.days_since_practice >= 7 ? 'text-red-600' :
                  recommendation.days_since_practice >= 3 ? 'text-orange-600' :
                  'text-gray-700'
                }`}>
                  {recommendation.days_since_practice === 0 ? 'Today' :
                   recommendation.days_since_practice === 1 ? '1 day ago' :
                   `${recommendation.days_since_practice} days ago`}
                </span>
              </div>

              <div className="w-px h-4 bg-gray-300" />

              <div className="text-muted-foreground">
                Target: <span className="font-semibold text-gray-700">80%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Action Button */}
        <Link href={`/css/css-practice?subject=${encodeURIComponent(recommendation.subject)}`}>
          <Button
            size="lg"
            className={`bg-gradient-to-r ${config.buttonGradient} whitespace-nowrap group`}
          >
            <span>Practice Now</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Compact Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
          <span>Progress to 80%</span>
          <span className="font-semibold">{Math.min(100, Math.round((recommendation.average_score / 80) * 100))}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${config.gradient} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${Math.min(100, (recommendation.average_score / 80) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
