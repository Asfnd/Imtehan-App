'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Lock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
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
    // Check access and handle free trial limits
    const hasAccess = await requestAccess('mptMock')
    if (hasAccess) {
      router.push(`/mpt-practice/quiz?test=${testNumber}`)
    }
    // If requestAccess returns false, it will automatically show sign-in popup or redirect to premium
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading tests...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <DevToolsWarning />
      <SignInPopup 
        isOpen={showSignInPopup} 
        onClose={() => setShowSignInPopup(false)}
        message="Sign in to access all MPT practice tests"
      />
      <ProtectedContent>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-3 sm:px-4 py-4 sm:py-8">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <button
              onClick={() => router.push('/mpt-practice')}
              className="flex items-center text-gray-600 active:text-gray-900 bg-white/80 backdrop-blur-sm active:bg-white px-3 sm:px-4 py-2 rounded-xl transition-all mb-4 sm:mb-8 shadow-sm active:shadow-md font-medium text-sm sm:text-base active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Back to MPT Practice
            </button>

            {/* Test Cards */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Live Mock Tests (Timed)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {tests.map((test) => {
                  return (
                  <div
                    key={test.test_number}
                    className="group relative bg-gradient-to-br from-white to-blue-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl active:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-blue-200 hover:border-blue-400 active:border-blue-500 overflow-hidden hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => startTest(test.test_number)}
                  >

                    <div className="relative text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-2xl group-hover:shadow-blue-500/50 transition-shadow">
                        <span className="text-2xl sm:text-3xl font-bold text-white">
                          {test.test_number}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                        Mock Test {test.test_number}
                      </h3>

                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 mb-3 sm:mb-4 border border-blue-100 group-hover:border-blue-200 transition-colors">
                        <p className="text-sm sm:text-base text-gray-700 font-semibold">
                          {test.question_count} Questions
                        </p>
                      </div>

                      <div className="bg-blue-100 rounded-xl px-3 sm:px-4 py-2 mb-3 sm:mb-4 group-hover:bg-blue-200 transition-colors">
                        <p className="text-xs sm:text-sm text-blue-700 font-bold">
                          ⏱️ 200 Minutes
                        </p>
                      </div>

                      <button
                        className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800 text-white font-bold py-2.5 sm:py-3 rounded-xl overflow-hidden text-sm sm:text-base transition-all active:scale-95 shadow-lg hover:shadow-xl"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Start Test →
                        </span>
                      </button>
                    </div>
                  </div>
                  )
                })}
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-4 sm:mt-8 bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Test Instructions</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Each test contains 200 multiple choice questions
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Choose the best answer from the four options provided
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  You can review your answers at the end of the test
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Take your time and read each question carefully
                </li>
              </ul>
            </div>
          </div>

          {/* Feedback Button */}
          <FeedbackButton page="mpt-practice" />
        </div>
      </ProtectedContent>
    </>
  )
}