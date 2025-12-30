'use client'

import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react'
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
      <div className="animate-pulse bg-muted/30 rounded-2xl h-64" />
    )
  }

  if (!recommendation) {
    return null
  }

  // Determine urgency level and colors
  const getUrgencyConfig = (priority: number, score: number) => {
    if (priority === 1 || score < 50) {
      return {
        gradient: 'from-red-500 via-orange-500 to-yellow-500',
        bgGradient: 'from-red-50 via-orange-50 to-yellow-50',
        border: 'border-red-200',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        badgeColor: 'bg-red-500',
        buttonGradient: 'from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700',
        urgencyLabel: '🚨 High Priority',
        pulseAnimation: true
      }
    } else if (priority === 2 || score < 60) {
      return {
        gradient: 'from-orange-500 via-yellow-500 to-amber-500',
        bgGradient: 'from-orange-50 via-yellow-50 to-amber-50',
        border: 'border-orange-200',
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-600',
        badgeColor: 'bg-orange-500',
        buttonGradient: 'from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700',
        urgencyLabel: '⚠️ Medium Priority',
        pulseAnimation: true
      }
    } else {
      return {
        gradient: 'from-blue-500 via-indigo-500 to-purple-500',
        bgGradient: 'from-blue-50 via-indigo-50 to-purple-50',
        border: 'border-blue-200',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        badgeColor: 'bg-blue-500',
        buttonGradient: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
        urgencyLabel: '💡 Recommended',
        pulseAnimation: false
      }
    }
  }

  const config = getUrgencyConfig(recommendation.priority, recommendation.average_score)

  return (
    <div className={`relative bg-gradient-to-br ${config.bgGradient} rounded-2xl border-2 ${config.border} p-8 overflow-hidden ${config.pulseAnimation ? 'animate-pulse-slow' : ''}`}>
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
        <div className={`w-full h-full bg-gradient-to-br ${config.gradient} rounded-full blur-3xl`} />
      </div>

      {/* Priority Badge */}
      <div className="absolute top-4 right-4">
        <div className={`px-4 py-2 ${config.badgeColor} text-white text-sm font-bold rounded-full flex items-center gap-2 ${config.pulseAnimation ? 'animate-bounce' : ''}`}>
          {config.urgencyLabel}
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className={`p-4 ${config.iconBg} rounded-2xl ${config.pulseAnimation ? 'animate-pulse' : ''}`}>
            <Lightbulb className={`w-10 h-10 ${config.iconColor}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-3xl font-black text-gray-900 mb-2">
              Today's Recommendation
            </h3>
            <p className="text-gray-600 text-lg">
              Smart pick based on your performance
            </p>
          </div>
        </div>

        {/* Subject Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg border-2 border-white">
          {/* Subject Name */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Focus Subject
              </span>
            </div>
            <h4 className={`text-4xl font-black bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent mb-3`}>
              {recommendation.subject}
            </h4>
          </div>

          {/* Reason */}
          <div className="mb-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              {recommendation.reason}
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Current Score */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
              <div className="text-sm font-medium text-gray-600 mb-1">Current Score</div>
              <div className={`text-3xl font-black ${
                recommendation.average_score < 60 ? 'text-red-600' :
                recommendation.average_score < 70 ? 'text-orange-600' :
                'text-blue-600'
              }`}>
                {recommendation.average_score.toFixed(0)}%
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Target: 80%
              </div>
            </div>

            {/* Days Since Practice */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
              <div className="text-sm font-medium text-gray-600 mb-1">Last Practiced</div>
              <div className={`text-3xl font-black ${
                recommendation.days_since_practice >= 7 ? 'text-red-600' :
                recommendation.days_since_practice >= 3 ? 'text-orange-600' :
                'text-blue-600'
              }`}>
                {recommendation.days_since_practice === 0 ? 'Today' :
                 recommendation.days_since_practice === 1 ? '1 day ago' :
                 `${recommendation.days_since_practice} days ago`}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {recommendation.days_since_practice >= 7 ? 'Getting rusty!' :
                 recommendation.days_since_practice >= 3 ? 'Time to refresh' :
                 'Recently practiced'}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress to Target (80%)</span>
              <span>{Math.min(100, Math.round((recommendation.average_score / 80) * 100))}%</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full bg-gradient-to-r ${config.gradient} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${Math.min(100, (recommendation.average_score / 80) * 100)}%` }}
              />
            </div>
          </div>

          {/* Action Button */}
          <Link href={`/css/css-practice?subject=${encodeURIComponent(recommendation.subject)}`}>
            <Button
              size="lg"
              className={`w-full h-14 text-lg font-bold bg-gradient-to-r ${config.buttonGradient} shadow-lg hover:shadow-xl transition-all duration-300 group`}
            >
              <span>Start Practicing {recommendation.subject}</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Motivational Footer */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg">
              <Sparkles className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">
              <span className="font-bold text-gray-900">Pro Tip:</span> Even 10-15 minutes of focused practice today can make a big difference!
            </p>
          </div>
        </div>
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
