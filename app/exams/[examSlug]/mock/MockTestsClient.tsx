'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getExamConfig } from '@/lib/exam-configs'
import { getEffectiveExamSettings } from '@/lib/exam-mock-blueprints'
import { createClient } from '@/lib/supabase/client'
import NavigationBar from '@/components/NavigationBar'
import ExamMockSections from '@/components/exams/ExamMockSections'

export function MockTestsClient() {
  const params = useParams()
  const router = useRouter()
  const examSlug = params.examSlug as string
  const config = getExamConfig(examSlug)

  const [completedMockIds, setCompletedMockIds] = useState<Set<number>>(new Set())
  const [mockScores, setMockScores] = useState<Record<number, number>>({})

  useEffect(() => {
    if (!examSlug) return
    async function fetchCompletions() {
      const ids = new Set<number>()
      const scores: Record<number, number> = {}

      // 1. Local storage: works for guests and as instant fallback
      try {
        const key = `imtehan_mock_done_${examSlug}`
        const stored = JSON.parse(localStorage.getItem(key) || '{}')
        for (const [idStr, pct] of Object.entries(stored)) {
          const id = Number(idStr)
          ids.add(id)
          if (scores[id] == null || Number(pct) > scores[id]) scores[id] = Number(pct)
        }
      } catch { /* storage unavailable */ }

      // 2. DB: signed-in users get authoritative history (merged on top)
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data } = await supabase
            .from('quiz_attempts')
            .select('subject, score_percentage')
            .eq('user_id', user.id)
            .eq('quiz_type', 'mock')

          data?.forEach((attempt: { subject?: string | null; score_percentage?: number | null }) => {
            const match = attempt.subject?.match(/^mock-(\d+)$/)
            if (match) {
              const id = parseInt(match[1])
              ids.add(id)
              const pct = attempt.score_percentage ?? 0
              if (scores[id] == null || pct > scores[id]) scores[id] = pct
            }
          })
        }
      } catch { /* graceful: local completions still show */ }

      setCompletedMockIds(ids)
      setMockScores(scores)
    }
    fetchCompletions()
  }, [examSlug])

  if (!config) {
    router.push('/exams')
    return null
  }

  const official = getEffectiveExamSettings(examSlug, config)
  const d = official.duration
  const t = official.totalMCQs

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-semibold text-gray-900 sm:text-3xl">Mock Tests</h1>
          <p className="text-gray-600">Twenty tests by difficulty. Start with Standard, then level up.</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
            <div>
              <span className="font-semibold text-gray-900">20</span> mock tests
            </div>
            <div className="hidden h-4 w-px bg-gray-300 sm:block" />
            <div>
              <span className="font-semibold text-gray-900">{d}m</span> max duration
            </div>
            <div className="hidden h-4 w-px bg-gray-300 sm:block" />
            <div>
              <span className="font-semibold text-gray-900">{t}</span> MCQs full test
            </div>
          </div>
        </div>

        <ExamMockSections
          examSlug={examSlug}
          config={config}
          completedMockIds={completedMockIds}
          mockScores={mockScores}
        />
      </div>
    </div>
  )
}
