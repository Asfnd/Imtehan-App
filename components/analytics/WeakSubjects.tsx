'use client'

import { AlertCircle, TrendingDown, Clock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import type { WeakSubject } from '@/lib/analytics/types'
import { getPerformanceStatus } from '@/lib/analytics'

interface WeakSubjectsProps {
  subjects: WeakSubject[]
  loading?: boolean
}

export default function WeakSubjects({ subjects, loading }: WeakSubjectsProps) {
  if (loading) {
    return (
      <div className="animate-pulse bg-muted/30 rounded-2xl h-96" />
    )
  }

  if (!subjects || subjects.length === 0) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-8 text-center">
        <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Great Job!</h3>
        <p className="text-gray-600">
          You don't have any weak subjects yet. Keep practicing to build your profile!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-background rounded-2xl border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-orange-600" />
            Areas to Improve
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Focus on these subjects to boost your overall score
          </p>
        </div>
        <div className="hidden sm:block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
          {subjects.length} {subjects.length === 1 ? 'subject' : 'subjects'}
        </div>
      </div>

      {/* Subjects List */}
      <div className="space-y-4">
        {subjects.map((subject, index) => {
          const status = getPerformanceStatus(subject.average_score)
          const isUrgent = subject.days_since_practice >= 7

          return (
            <div
              key={index}
              className={`group relative p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                index === 0
                  ? 'border-red-200 bg-red-50/50 hover:border-red-300'
                  : index === 1
                  ? 'border-orange-200 bg-orange-50/50 hover:border-orange-300'
                  : 'border-yellow-200 bg-yellow-50/50 hover:border-yellow-300'
              }`}
            >
              {/* Priority Badge */}
              <div className="absolute -top-2 -left-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                  index === 0 ? 'bg-red-500' : index === 1 ? 'bg-orange-500' : 'bg-yellow-500'
                }`}>
                  {index + 1}
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Subject Name */}
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-lg font-bold text-gray-900 truncate">
                      {subject.subject}
                    </h4>
                    {isUrgent && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full animate-pulse">
                        <AlertCircle className="w-3 h-3" />
                        Urgent
                      </div>
                    )}
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center gap-4 text-sm mb-3">
                    {/* Score */}
                    <div className="flex items-center gap-2">
                      <span className={`text-2xl ${status.emoji}`}>{status.emoji}</span>
                      <div>
                        <div className={`font-bold ${status.color}`}>
                          {subject.average_score.toFixed(0)}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {status.status}
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-8 bg-gray-300" />

                    {/* Questions Attempted */}
                    <div>
                      <div className="font-semibold text-gray-700">
                        {subject.questions_attempted}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        questions
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-8 bg-gray-300" />

                    {/* Last Practiced */}
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className={`font-semibold ${isUrgent ? 'text-red-600' : 'text-gray-700'}`}>
                          {subject.days_since_practice === 0 ? 'Today' :
                           subject.days_since_practice === 1 ? '1 day ago' :
                           `${subject.days_since_practice} days ago`}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          last practice
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress to 80%</span>
                      <span>{Math.min(100, Math.round((subject.average_score / 80) * 100))}%</span>
                    </div>
                    <div className="w-full h-2 bg-white rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          subject.average_score >= 80
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                            : subject.average_score >= 60
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                            : 'bg-gradient-to-r from-orange-500 to-red-500'
                        }`}
                        style={{ width: `${Math.min(100, (subject.average_score / 80) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Improvement Suggestion */}
                  <p className="text-xs text-gray-600">
                    {subject.average_score < 50 && "🎯 Major improvement needed. Start with basics!"}
                    {subject.average_score >= 50 && subject.average_score < 70 && "💪 You're making progress! Keep practicing."}
                    {subject.average_score >= 70 && subject.average_score < 80 && "⭐ Almost there! A few more sessions to excellence."}
                    {isUrgent && subject.days_since_practice >= 7 && " ⚠️ Don't let this subject get rusty!"}
                  </p>
                </div>

                {/* Practice Button */}
                <Link href={`/css/css-practice?subject=${encodeURIComponent(subject.subject)}`}>
                  <Button
                    size="sm"
                    className={`whitespace-nowrap ${
                      index === 0
                        ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700'
                        : index === 1
                        ? 'bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700'
                        : 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700'
                    }`}
                  >
                    Practice Now
                  </Button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer Tip */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <p className="text-sm text-gray-700 text-center">
          <span className="font-semibold text-blue-700">💡 Pro Tip:</span> Focus on your weakest subject first.
          Improving from 45% to 65% is easier than 75% to 85%!
        </p>
      </div>
    </div>
  )
}
