'use client'

import { useParams, useRouter } from 'next/navigation'
import { getExamConfig } from '@/lib/exam-configs'
import NavigationBar from '@/components/NavigationBar'
import ExamMockSections from '@/components/exams/ExamMockSections'

export default function MockTestsPage() {
  const params = useParams()
  const router = useRouter()
  const examSlug = params.examSlug as string
  const config = getExamConfig(examSlug)

  if (!config) {
    router.push('/exams')
    return null
  }

  const { totalMCQs: t, duration: d } = config

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-semibold text-gray-900 sm:text-3xl">Mock Tests</h1>
          <p className="text-gray-600">Twenty tests by difficulty — start with Standard, then level up.</p>
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

        <ExamMockSections examSlug={examSlug} config={config} />
      </div>
    </div>
  )
}
