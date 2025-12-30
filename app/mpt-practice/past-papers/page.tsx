'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Play, Calendar, ArrowLeft } from 'lucide-react'
import FeedbackButton from '@/components/FeedbackButton'
import ProtectedContent from '@/components/security/ProtectedContent'
import DevToolsWarning from '@/components/security/DevToolsWarning'
import SignInPopup from '@/components/auth/SignInPopup'
import { createClient } from '@/lib/supabase/client'
import { useFreeTrial } from '@/lib/hooks/useFreeTrial'

interface YearData {
  year: number
  count: number
}

export default function MPTPastPapersPage() {
  const router = useRouter()
  const { showSignInPopup, setShowSignInPopup, requestAccess } = useFreeTrial()
  const [yearData, setYearData] = useState<YearData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  useEffect(() => {
    // Load MPT data
    loadMPTData()
  }, [])

  const loadMPTData = async () => {
    try {
      const supabase = createClient()

      // OPTIMIZED: Use SQL aggregation instead of fetching all records
      // This reduces egress from potentially 500KB-2MB to just a few KB
      const { data, error } = await supabase
        .from('css_mcqs_enhanced')
        .select('year')
        .eq('subject', 'MPT Past Papers')
        .order('year', { ascending: false })
        .limit(1000) // Safety limit

      if (error) {
        console.error('Error loading MPT data:', error)
        setYearData([])
        setLoading(false)
        return
      }

      if (!data || data.length === 0) {
        setYearData([])
        setLoading(false)
        return
      }

      // Count MCQs per year efficiently
      const yearCounts = data.reduce((acc: { [key: number]: number }, row) => {
        acc[row.year] = (acc[row.year] || 0) + 1
        return acc
      }, {})

      // Convert to array and sort
      const yearArray = Object.entries(yearCounts)
        .map(([year, count]) => ({ year: parseInt(year), count: count as number }))
        .sort((a, b) => b.year - a.year) // Sort by year descending

      setYearData(yearArray)

    } catch (error) {
      console.error('Error loading MPT data:', error)
      setYearData([])
    } finally {
      setLoading(false)
    }
  }

  const startQuiz = async (year?: number) => {
    // Check access and handle free trial limits
    const hasAccess = await requestAccess('mptPast')
    if (hasAccess) {
      const params = new URLSearchParams({
        subject: 'MPT Past Papers',
        ...(year && { year: year.toString() })
      })

      const quizUrl = `/css/css-practice/quiz?${params.toString()}`
      router.push(quizUrl)
    }
    // If requestAccess returns false, it will automatically show sign-in popup or redirect to premium
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-muted-foreground text-sm">Loading...</p>
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
        message="Sign in to access unlimited MPT past paper practice"
      />
      <ProtectedContent>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/40 flex flex-col">
          {/* Clean Header */}
          <div className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b-2 border-blue-100 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push('/mpt-practice')}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-semibold text-sm">Back</span>
                </button>

                <h1 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-900">MPT Past Papers</h1>

                <div className="w-20"></div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 py-10 md:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Title Section */}
              <div className="text-center mb-10 md:mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 mb-3">
                  MPT Past Papers Practice
                </h2>
                <p className="text-base md:text-lg text-gray-600">Prepare with previous year MPT questions</p>
              </div>

              {/* Practice Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                {/* Practice All Card */}
                <div
                  className="group relative bg-white rounded-2xl border-2 border-blue-100 hover:border-blue-400 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer hover:-translate-y-2 overflow-hidden"
                  onClick={() => startQuiz()}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative p-8 text-center">
                    <div className="w-18 h-18 mx-auto rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Play className="w-9 h-9 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors">Quick Practice</h3>
                    <p className="text-gray-600 mb-5 text-base">Random MPT questions</p>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-5 mb-5 border-2 border-blue-200">
                      <div className="text-4xl font-bold text-blue-600 mb-1">20</div>
                      <div className="text-sm text-gray-600 font-semibold">Questions</div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl">
                      Start Now
                    </button>
                  </div>
                </div>

                {/* Choose Year Card */}
                <div className="bg-white rounded-2xl border-2 border-blue-100 shadow-xl transition-all duration-300 flex flex-col overflow-hidden max-h-[550px]">
                  {/* Header */}
                  <div className="flex items-center gap-3 p-5 pb-4 flex-shrink-0 border-b-2 border-blue-100 bg-gradient-to-r from-blue-50 to-transparent">
                    <div className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-md">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">By Year</h3>
                      <p className="text-gray-600 text-sm font-medium">{yearData.length} years available</p>
                    </div>
                  </div>

                  {/* Scrollable Years List */}
                  <div className="overflow-y-auto px-5 py-4 space-y-2.5 custom-scrollbar flex-1">
                    {yearData.map((year) => (
                      <button
                        key={year.year}
                        onClick={() => setSelectedYear(year.year)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                          selectedYear === year.year
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg'
                            : 'bg-blue-50/50 hover:bg-blue-100 border-2 border-blue-100 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 font-bold rounded-xl flex items-center justify-center text-sm ${
                            selectedYear === year.year
                              ? 'bg-white/20 text-white'
                              : 'bg-blue-200 text-blue-800'
                          }`}>
                            {year.year.toString().slice(-2)}
                          </div>
                          <span className={`font-bold text-base ${selectedYear === year.year ? 'text-white' : 'text-gray-900'}`}>{year.year}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            selectedYear === year.year
                              ? 'text-white bg-white/20'
                              : 'text-blue-700 bg-blue-200'
                          }`}>{year.count}</span>
                          {selectedYear === year.year && (
                            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Fixed Bottom Start Button */}
                  {selectedYear && (
                    <div className="p-5 pt-4 bg-gradient-to-r from-blue-50 to-transparent border-t-2 border-blue-100 flex-shrink-0 mt-auto">
                      <div className="text-center mb-3">
                        <div className="text-lg font-bold text-gray-900 mb-1">
                          {selectedYear}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          {yearData.find(y => y.year === selectedYear)?.count} questions
                        </div>
                      </div>
                      <button
                        onClick={() => startQuiz(selectedYear)}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl"
                      >
                        Start {selectedYear} Quiz
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <FeedbackButton page="mpt-practice" />
        </div>

        {/* Custom Styles */}
        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #dbeafe;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #3b82f6, #2563eb);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #2563eb, #1d4ed8);
          }
          
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }
          
          /* Smooth performance optimizations */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          .backdrop-blur-xl {
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
          }
          
          .backdrop-blur-sm {
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
          }
        `}</style>
      </ProtectedContent>
    </>
  )
}