'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Play, Calendar, ArrowLeft } from 'lucide-react'
import FeedbackButton from '@/components/FeedbackButton'
import ProtectedContent from '@/components/security/ProtectedContent'
import DevToolsWarning from '@/components/security/DevToolsWarning'
import SignInPopup from '@/components/auth/SignInPopup'
import { createClient } from '@/lib/supabase/client'
import { usageTracker } from '@/lib/usageTracker'

interface YearData {
  year: number
  count: number
}

export default function MPTPastPapersPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [showSignInPopup, setShowSignInPopup] = useState(false)
  const [yearData, setYearData] = useState<YearData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  useEffect(() => {
    const supabase = createClient()
    
    // Check auth status
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          setUser(session?.user ?? null)
          setShowSignInPopup(false)
          router.refresh()
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
        }
      }
    )
    
    // Load MPT data
    loadMPTData()
    
    return () => subscription.unsubscribe()
  }, [])

  const loadMPTData = async () => {
    try {
      const supabase = createClient()
      
      // Get ALL year data with proper pagination
      let allYearData: { year: number }[] = []
      let from = 0
      const batchSize = 1000
      
      while (true) {
        const { data, error } = await supabase
          .from('css_mcqs_enhanced')
          .select('year')
          .eq('subject', 'MPT Past Papers')
          .range(from, from + batchSize - 1)
        
        if (error) {
          console.error('Year data pagination error:', error)
          break
        }
        
        if (!data || data.length === 0) {
          break
        }
        
        allYearData = [...allYearData, ...data]
        
        if (data.length < batchSize) {
          break // We've got all the data
        }
        
        from += batchSize
      }
      
      if (allYearData.length > 0) {
        // Count MCQs per year efficiently
        const yearCounts = allYearData.reduce((acc: { [key: number]: number }, row) => {
          acc[row.year] = (acc[row.year] || 0) + 1
          return acc
        }, {})
        
        // Convert to array and sort
        const yearArray = Object.entries(yearCounts)
          .map(([year, count]) => ({ year: parseInt(year), count: count as number }))
          .sort((a, b) => b.year - a.year) // Sort by year descending
        
        setYearData(yearArray)

      } else {

        setYearData([])
      }
      
    } catch (error) {
      console.error('Error loading MPT data:', error)
      setYearData([])
    } finally {
      setLoading(false)
    }
  }

  const startQuiz = (year?: number) => {
    
    // Check usage limits for anonymous users
    if (!user) {
      if (!usageTracker.canTakeMPTPastPaper()) {
        setShowSignInPopup(true)
        return
      }
      
      // Increment usage when starting the quiz
      usageTracker.incrementMPTPastPaper()
    }
    
    const params = new URLSearchParams({
      subject: 'MPT Past Papers',
      ...(year && { year: year.toString() })
    })
    
    const quizUrl = `/css-practice/quiz?${params.toString()}`
    router.push(quizUrl)
  }

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-purple-400 border-t-purple-200 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-purple-200 text-sm">Loading...</p>
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
        <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 z-10 shadow-lg">
            <div className="max-w-5xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push('/mpt-practice')}
                  className="flex items-center gap-2 px-3 py-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-xl transition-all active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-medium">Back</span>
                </button>
                
                <div className="text-center">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Official MPT Past Papers</h1>
                </div>
                
                <div className="w-16"></div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="w-full max-w-6xl mx-auto">
              {/* Title Section */}
              <div className="text-center mb-8">
              </div>

              {/* Practice Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto animate-fade-in">
                {/* Practice All Card */}
                <div 
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 hover:shadow-purple-500/25 hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:scale-[1.01] h-96"
                  onClick={() => startQuiz()}
                >
                  <div className="text-center h-full flex flex-col justify-center">
                    <div className="inline-flex p-4 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-2xl shadow-lg mb-5 group-hover:scale-105 transition-all duration-300 mx-auto">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-black text-white mb-2">Quick Practice</h3>
                    <p className="text-purple-200 mb-6 text-sm">Random Official MCQs</p>
                    
                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 mb-6 border border-purple-400/30">
                      <div className="text-3xl font-black bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-1">
                        20
                      </div>
                      <div className="text-xs text-purple-200 font-semibold">MCQs</div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white py-3 px-6 rounded-xl font-bold transition-all active:scale-95 shadow-lg hover:shadow-xl">
                      Start Now
                    </button>
                  </div>
                </div>

                {/* Choose Year Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 hover:shadow-purple-500/25 hover:shadow-2xl transition-all duration-300 flex flex-col h-96">
                  {/* Header */}
                  <div className="flex items-center gap-3 p-6 pb-4 flex-shrink-0">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">By Year</h3>
                      <p className="text-purple-200 text-sm">{yearData.length} Years Available</p>
                    </div>
                  </div>
                  
                  {/* Scrollable Years List - Constrained height to leave space for button */}
                  <div className={`overflow-y-auto px-6 space-y-2 custom-scrollbar ${selectedYear ? 'flex-1 max-h-48' : 'flex-1'}`}>
                    {yearData.map((year) => (
                      <button
                        key={year.year}
                        onClick={() => setSelectedYear(year.year)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] border group shadow-sm hover:shadow-md ${
                          selectedYear === year.year
                            ? 'bg-gradient-to-r from-emerald-500/30 to-green-500/30 border-emerald-400/70 shadow-emerald-500/20'
                            : 'bg-gradient-to-r from-white/5 to-emerald-500/10 hover:from-emerald-500/20 hover:to-green-500/20 border-white/10 hover:border-emerald-400/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 text-white font-bold rounded-lg flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-lg text-sm ${
                            selectedYear === year.year
                              ? 'bg-gradient-to-br from-emerald-400 to-green-400'
                              : 'bg-gradient-to-br from-emerald-500 to-green-500'
                          }`}>
                            {year.year.toString().slice(-2)}
                          </div>
                          <span className="font-bold text-white">{year.year}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            selectedYear === year.year
                              ? 'text-emerald-100 bg-white/20'
                              : 'text-emerald-200 bg-white/10'
                          }`}>{year.count}</span>
                          {selectedYear === year.year && (
                            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {/* Fixed Bottom Start Button - Always visible when year is selected */}
                  {selectedYear && (
                    <div className="p-6 pt-4 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-t border-white/10 animate-fade-in flex-shrink-0 mt-auto">
                      <div className="text-center mb-3">
                        <div className="text-lg font-black text-white mb-1">
                          {selectedYear}
                        </div>
                        <div className="text-xs text-purple-200 font-semibold">
                          {yearData.find(y => y.year === selectedYear)?.count} MCQs Available
                        </div>
                      </div>
                      <button 
                        onClick={() => startQuiz(selectedYear)}
                        className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white py-3 px-6 rounded-xl font-bold transition-all active:scale-95 shadow-lg hover:shadow-xl"
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
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #10b981, #059669);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #059669, #047857);
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