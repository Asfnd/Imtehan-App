'use client'

import { TrendingDown, Clock, Target } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import type { WeakSubject } from '@/lib/analytics/types'

interface WeakSubjectsProps {
  subjects: WeakSubject[]
  loading?: boolean
}

export default function WeakSubjects({ subjects, loading }: WeakSubjectsProps) {
  if (loading) {
    return (
      <div className="animate-pulse bg-muted/30 rounded-xl h-32" />
    )
  }

  if (!subjects || subjects.length === 0) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6 text-center">
        <div className="inline-flex p-3 bg-green-100 rounded-lg mb-3">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Great Job!</h3>
        <p className="text-sm text-gray-600">
          No weak subjects yet. Keep practicing!
        </p>
      </div>
    )
  }

  // Show only top 3 weak subjects for compact display
  const topWeakSubjects = subjects.slice(0, 3)

  return (
    <div className="bg-background rounded-xl border p-6 hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-50 rounded-lg">
            <TrendingDown className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Areas to Improve</h3>
            <p className="text-xs text-muted-foreground">Focus on these to boost your score</p>
          </div>
        </div>
        <div className="hidden sm:block text-xs font-semibold px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
          {subjects.length} {subjects.length === 1 ? 'subject' : 'subjects'}
        </div>
      </div>

      {/* Compact Subjects List */}
      <div className="space-y-3">
        {topWeakSubjects.map((subject, index) => {
          const isUrgent = subject.days_since_practice >= 7

          return (
            <div
              key={index}
              className="group flex items-center justify-between gap-4 p-3 rounded-lg border hover:border-gray-300 transition-all duration-200 bg-muted/30 hover:bg-muted/50"
            >
              {/* Left: Subject Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Priority Number */}
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                  index === 0 ? 'bg-red-500' : index === 1 ? 'bg-orange-500' : 'bg-yellow-500'
                }`}>
                  {index + 1}
                </div>

                {/* Subject Name & Stats */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 truncate mb-1">
                    {subject.subject}
                  </h4>

                  {/* Compact Stats Row */}
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <Target className="w-3 h-3 text-muted-foreground" />
                      <span className={`font-semibold ${
                        subject.average_score < 60 ? 'text-red-600' :
                        subject.average_score < 70 ? 'text-orange-600' :
                        'text-blue-600'
                      }`}>
                        {subject.average_score.toFixed(0)}%
                      </span>
                    </div>

                    <div className="w-px h-3 bg-gray-300" />

                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className={`${isUrgent ? 'text-red-600 font-semibold' : 'text-muted-foreground'}`}>
                        {subject.days_since_practice === 0 ? 'Today' :
                         subject.days_since_practice === 1 ? '1d ago' :
                         `${subject.days_since_practice}d ago`}
                      </span>
                    </div>

                    <div className="w-px h-3 bg-gray-300" />

                    <span className="text-muted-foreground">
                      {subject.questions_attempted} questions
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Action Button */}
              <Link href={`/css/css-practice?subject=${encodeURIComponent(subject.subject)}`}>
                <Button
                  size="sm"
                  className={`bg-gradient-to-r ${
                    index === 0
                      ? 'from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700'
                      : index === 1
                      ? 'from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700'
                      : 'from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700'
                  } whitespace-nowrap`}
                >
                  Practice
                </Button>
              </Link>
            </div>
          )
        })}
      </div>

      {/* Show More Link if there are more subjects */}
      {subjects.length > 3 && (
        <div className="mt-3 text-center">
          <Link href="/css/subjects" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            View {subjects.length - 3} more subjects →
          </Link>
        </div>
      )}

      {/* Compact Progress Indicator */}
      <div className="mt-4 pt-3 border-t">
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted-foreground">Overall improvement needed</span>
          <span className="font-semibold text-gray-700">
            {topWeakSubjects.reduce((acc, s) => acc + s.average_score, 0) / topWeakSubjects.length > 60 ? 'Low' : 'Medium'}
          </span>
        </div>
      </div>
    </div>
  )
}
