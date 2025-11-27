'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { usageTracker } from '@/lib/usageTracker'
import FeedbackButton from '@/components/FeedbackButton'
import ProtectedContent from '@/components/security/ProtectedContent'
import DevToolsWarning from '@/components/security/DevToolsWarning'
import SignInPopup from '@/components/auth/SignInPopup'

interface TestStats {
  test_number: number
  question_count: number
}

export default function MPTPracticePage() {
  const router = useRouter()
  const [tests, setTests] = useState<TestStats[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [showSignInPopup, setShowSignInPopup] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    
    loadTests()
    checkUser()
    
    // Listen for auth changes and refresh
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          setUser(session?.user ?? null)
          setShowSignInPopup(false)
          // Refresh the page to show unlocked content
          router.refresh()
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
        }
      }
    )
    
    return () => subscription.unsubscribe()
  }, [])

  const checkUser = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

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

  const startTest = (testNumber: number) => {
    // For non-logged-in users, check if test is locked
    if (!user) {
      // Tests 2 & 3 are locked if user hasn't used their free test yet
      const isLocked = testNumber > 1 && !usageTracker.canTakeMPTTest()
      
      if (isLocked) {
        // Show sign-in popup
        setShowSignInPopup(true)
        return
      }
      
      // Check if they can start Test 1 (haven't used their 1 free test)
      if (!usageTracker.canTakeMPTTest()) {
        // Show sign-in popup
        setShowSignInPopup(true)
        return
      }
      
      // Increment when entering the test (counts as used)
      usageTracker.incrementMPTTest()
    }
    
    router.push(`/mpt-practice/quiz?test=${testNumber}`)
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
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="flex items-center text-gray-600 active:text-gray-900 bg-white/80 backdrop-blur-sm active:bg-white px-3 sm:px-4 py-2 rounded-xl transition-all mb-4 sm:mb-8 shadow-sm active:shadow-md font-medium text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Back
            </motion.button>

            {/* Test Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Select a Mock Test
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {tests.map((test, index) => {
                  // Determine if test is locked for non-logged-in users
                  const isLocked = !user && test.test_number > 1 && !usageTracker.canTakeMPTTest()
                  
                  return (
                  <motion.div
                    key={test.test_number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: isLocked ? 1 : 0.95 }}
                    className="group relative bg-gradient-to-br from-white to-blue-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg active:shadow-xl transition-shadow duration-300 cursor-pointer border-2 border-blue-200 active:border-blue-500 overflow-hidden"
                    onClick={() => startTest(test.test_number)}
                  >
                    {/* Lock Overlay for non-logged-in users */}
                    {isLocked && (
                      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl flex items-center justify-center z-20">
                        <div className="text-center text-white px-4">
                          <Lock className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3" />
                          <p className="font-bold text-base sm:text-lg mb-1">Sign up to unlock</p>
                          <p className="text-xs sm:text-sm text-white/80">Complete Test 1 first or sign up</p>
                        </div>
                      </div>
                    )}

                    <div className="relative text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-2xl">
                        <span className="text-2xl sm:text-3xl font-bold text-white">
                          {test.test_number}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 transition-colors">
                        Mock Test {test.test_number}
                      </h3>

                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 mb-3 sm:mb-4 border border-blue-100">
                        <p className="text-sm sm:text-base text-gray-700 font-semibold">
                          {test.question_count} Questions
                        </p>
                      </div>

                      <div className="bg-blue-100 rounded-xl px-3 sm:px-4 py-2 mb-3 sm:mb-4">
                        <p className="text-xs sm:text-sm text-blue-700 font-bold">
                          ⏱️ 200 Minutes
                        </p>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-2.5 sm:py-3 rounded-xl overflow-hidden text-sm sm:text-base"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Start Test →
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 sm:mt-8 bg-white rounded-2xl p-4 sm:p-6 shadow-lg"
            >
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
            </motion.div>
          </div>

          {/* Feedback Button */}
          <FeedbackButton page="mpt-practice" />
        </div>
      </ProtectedContent>
    </>
  )
}
