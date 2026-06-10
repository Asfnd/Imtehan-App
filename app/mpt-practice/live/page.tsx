'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useCompletions } from '@/lib/completion'
import { useFreeTrial } from '@/lib/hooks/useFreeTrial'
import FeedbackButton from '@/components/FeedbackButton'
import ProtectedContent from '@/components/security/ProtectedContent'
import DevToolsWarning from '@/components/security/DevToolsWarning'
import SignInPopup from '@/components/auth/SignInPopup'

interface TestStats {
  test_number: number
  question_count: number
}

export default function MPTLiveTestsPage() {
  const router = useRouter()
  const { showSignInPopup, setShowSignInPopup, requestAccess } = useFreeTrial()
  const [tests, setTests] = useState<TestStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTests()
  }, [])

  // Green "completed" badges (local + DB-synced for signed-in users):
  //  • tests 1-3 finish via the MPT quiz → scope "mpt:live"
  //  • tests 4-20 route to /exams/css-mpt/mock/N → MockTestInterface → scope "exams-mock:css-mpt"
  const liveDone = useCompletions('mpt:live')
  const mockDone = useCompletions('exams-mock:css-mpt')
  // Legacy local key from mocks completed before the shared store existed.
  const [legacyMock, setLegacyMock] = useState<Record<string, number>>({})
  useEffect(() => {
    try { setLegacyMock(JSON.parse(localStorage.getItem('imtehan_mock_done_css-mpt') || '{}')) } catch { /* unavailable */ }
  }, [])
  const completed = useMemo(() => {
    const map: Record<number, number> = {}
    const add = (src: Record<string, number>) => {
      for (const [k, v] of Object.entries(src)) {
        const n = Number(k), pct = Number(v)
        if (!Number.isNaN(n) && (map[n] == null || pct > map[n])) map[n] = pct
      }
    }
    add(liveDone); add(mockDone); add(legacyMock)
    return map
  }, [liveDone, mockDone, legacyMock])

  const loadTests = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase.rpc('get_mpt_test_stats')
      if (error) throw error
      setTests(data || [])
    } catch (error) {
      console.error('Error loading MPT tests:', error)
    } finally {
      setLoading(false)
    }
  }

  const startTest = async (testNumber: number) => {
    const hasAccess = await requestAccess('mptMock')
    if (hasAccess) {
      router.push(`/mpt-practice/quiz?test=${testNumber}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading tests...</p>
        </div>
      </div>
    )
  }

  // All 20 tests: DB-backed (1-3) first, then practice pool (4-20)
  type AnyTest =
    | { kind: 'live'; test_number: number; question_count: number }
    | { kind: 'practice'; n: number }

  const allTests: AnyTest[] = [
    ...tests.map((t) => ({ kind: 'live' as const, test_number: t.test_number, question_count: t.question_count })),
    ...Array.from({ length: 17 }, (_, i) => ({ kind: 'practice' as const, n: i + 4 })),
  ]

  return (
    <>
      <DevToolsWarning />
      <SignInPopup
        isOpen={showSignInPopup}
        onClose={() => setShowSignInPopup(false)}
        message="Sign in to access all MPT practice tests"
      />
      <ProtectedContent>
        <div className="min-h-screen bg-gray-50 px-4 py-6">
          <div className="max-w-5xl mx-auto">

            {/* Back Button */}
            <button
              onClick={() => router.push('/mpt-practice')}
              className="flex items-center text-gray-500 hover:text-gray-800 bg-white border border-gray-200 hover:border-gray-300 px-3 py-1.5 rounded-lg transition-all mb-6 shadow-sm text-sm font-medium gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <h1 className="text-xl font-bold text-gray-900 mb-1">MPT Mock Tests</h1>
            <p className="text-sm text-gray-500 mb-6">Full-length timed tests, 200 MCQs, 200 minutes</p>

            {/* Unified grid: all 20 tests */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {allTests.map((item) => {
                const num = item.kind === 'live' ? item.test_number : item.n
                const mcqs = item.kind === 'live' ? item.question_count : 200
                const handleClick = item.kind === 'live'
                  ? () => startTest(item.test_number)
                  : () => router.push(`/exams/css-mpt/mock/${item.n}`)
                const doneScore = completed[num]
                const isDone = doneScore != null

                return (
                  <div
                    key={num}
                    className={`group relative rounded-xl border shadow-sm transition-all duration-200 cursor-pointer hover:-translate-y-0.5 ${
                      isDone
                        ? 'bg-emerald-50/60 border-emerald-200 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-500/10'
                        : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-500/10'
                    }`}
                    onClick={handleClick}
                  >
                    {isDone && (
                      <CheckCircle className="absolute right-2 top-2 w-4 h-4 text-emerald-500" aria-hidden />
                    )}
                    <div className="p-4 text-center">
                      <div className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-2.5 shadow-sm group-hover:scale-105 transition-transform duration-200 ${
                        isDone ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' : 'bg-gradient-to-br from-blue-600 to-indigo-600'
                      }`}>
                        {isDone
                          ? <CheckCircle className="w-5 h-5 text-white" />
                          : <span className="text-white text-sm font-bold">{num}</span>}
                      </div>
                      <div className="text-xs font-semibold text-gray-900 mb-1">Mock Test {num}</div>
                      <div className="text-[10px] text-gray-500 mb-3">
                        {isDone ? `Best ${Math.round(doneScore)}%` : `${mcqs} MCQs • 200 min`}
                      </div>
                      <button className={`w-full text-white py-1.5 rounded-lg font-medium text-xs transition-all shadow-sm ${
                        isDone
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
                          : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                      }`}>
                        {isDone ? 'Retake' : 'Start Test'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Instructions */}
            <div className="mt-8 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Test Instructions</h3>
              <ul className="space-y-1.5 text-xs text-gray-600">
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">•</span>Each test contains 200 multiple choice questions</li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">•</span>Choose the best answer from the four options provided</li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">•</span>You can review your answers at the end of the test</li>
                <li className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">•</span>Take your time and read each question carefully</li>
              </ul>
            </div>

          </div>
          <FeedbackButton page="mpt-practice" />
        </div>
      </ProtectedContent>
    </>
  )
}
