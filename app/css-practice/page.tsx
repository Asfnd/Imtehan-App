'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Search, ArrowRight, X } from 'lucide-react'
import FeedbackButton from '@/components/FeedbackButton'
import ProtectedContent from '@/components/security/ProtectedContent'
import DevToolsWarning from '@/components/security/DevToolsWarning'
import SignInPopup from '@/components/auth/SignInPopup'

import { usageTracker } from '@/lib/usageTracker'

interface Subject {
  subject: string
  count: number
}

interface YearData {
  year: number
  count: number
}

export default function CSSPracticePage() {
  const router = useRouter()
  
  const [user, setUser] = useState<any>(null)
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [years, setYears] = useState<YearData[]>([])
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSignInPopup, setShowSignInPopup] = useState(false)

  const fetchSubjects = useMemo(() => async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase.rpc('get_enhanced_css_subject_stats')
      if (error) throw error
      if (!data || data.length === 0) {
        setSubjects([])
        setLoading(false)
        return
      }
      const subjectList = data
        .map((row: any) => ({
          subject: row.subject,
          count: row.question_count
        }))
        .sort((a: any, b: any) => a.subject.localeCompare(b.subject))
      setSubjects(subjectList)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching subjects:', error)
      setLoading(false)
    }
  }, [])

  const fetchYears = useMemo(() => async () => {
    if (!selectedSubject) return
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('css_mcqs_enhanced')
        .select('year')
        .eq('subject', selectedSubject)
      if (error) throw error
      if (!data) {
        setYears([])
        return
      }
      const yearMap = data.reduce((acc: any, row: any) => {
        if (!acc[row.year]) {
          acc[row.year] = { year: row.year, count: 0 }
        }
        acc[row.year].count++
        return acc
      }, {})
      const yearList = Object.values(yearMap)
        .map((y: any) => ({ year: y.year, count: y.count }))
        .sort((a: any, b: any) => b.year - a.year)
      setYears(yearList)
    } catch (error) {
      console.error('Error fetching years:', error)
      setYears([])
    }
  }, [selectedSubject])

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
    
    fetchSubjects()
    
    return () => subscription.unsubscribe()
  }, [fetchSubjects])

  useEffect(() => {
    if (selectedSubject) {
      fetchYears()
    } else {
      setYears([])
      setSelectedYear(null)
    }
  }, [selectedSubject, fetchYears])

  const filteredSubjects = useMemo(() => {
    if (!searchQuery) return subjects
    return subjects.filter(s => 
      s.subject.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [subjects, searchQuery])

  const startPractice = () => {
    // Signed-in users have unlimited access - no checks needed
    // Only check limits for anonymous users
    if (!user) {
      if (!usageTracker.canTakeCSSQuiz()) {
        // Show sign-in popup
        setShowSignInPopup(true)
        return
      }
      // Don't increment here - let the quiz page handle it
    }
    
    const params = new URLSearchParams()
    if (selectedSubject) params.append('subject', selectedSubject)
    if (selectedYear) params.append('year', selectedYear.toString())
    router.push(`/css-practice/quiz?${params.toString()}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading subjects...</p>
        </div>
      </div>
    )
  }

  // Helper function to get color for subject - vibrant and modern
  const getSubjectColor = (index: number) => {
    const colors = [
      { 
        gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
        glow: 'shadow-purple-500/50',
        hover: 'hover:shadow-purple-500/70',
        text: 'text-purple-700'
      },
      { 
        gradient: 'from-blue-500 via-cyan-500 to-teal-500',
        glow: 'shadow-blue-500/50',
        hover: 'hover:shadow-blue-500/70',
        text: 'text-blue-700'
      },
      { 
        gradient: 'from-emerald-500 via-green-500 to-lime-500',
        glow: 'shadow-green-500/50',
        hover: 'hover:shadow-green-500/70',
        text: 'text-green-700'
      },
      { 
        gradient: 'from-orange-500 via-amber-500 to-yellow-500',
        glow: 'shadow-orange-500/50',
        hover: 'hover:shadow-orange-500/70',
        text: 'text-orange-700'
      },
      { 
        gradient: 'from-pink-500 via-rose-500 to-red-500',
        glow: 'shadow-pink-500/50',
        hover: 'hover:shadow-pink-500/70',
        text: 'text-pink-700'
      },
      { 
        gradient: 'from-indigo-500 via-blue-500 to-purple-500',
        glow: 'shadow-indigo-500/50',
        hover: 'hover:shadow-indigo-500/70',
        text: 'text-indigo-700'
      },
    ]
    return colors[index % colors.length]
  }

  return (
    <>
      <DevToolsWarning />
      <SignInPopup 
        isOpen={showSignInPopup} 
        onClose={() => setShowSignInPopup(false)}
        message="Sign in to access unlimited CSS practice quizzes"
      />
      <ProtectedContent>
        <div className="fixed inset-0 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 overflow-hidden">
          {/* Animated Background Blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          
          {/* Content Container */}
          <div className="relative h-full flex flex-col p-4 sm:p-6">
            {/* Interactive Header */}
            <div className="flex items-center justify-between mb-3 bg-white/10 backdrop-blur-xl rounded-2xl px-4 py-3 border border-white/20 shadow-lg hover:shadow-xl transition-all group">
              <button
                onClick={() => router.push('/dashboard')}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/20 hover:bg-white/30 transition-all hover:scale-110 active:scale-95 group/btn overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/10 transition-colors"></div>
                <svg className="w-5 h-5 text-white relative z-10 group-hover/btn:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div className="text-center group-hover:scale-105 transition-transform">
                <h1 className="text-xl font-black text-white drop-shadow-lg">
                  CSS MCQs Practice
                </h1>
                <p className="text-xs text-white/80 mt-0.5 font-medium">Master Past CSS Questions</p>
              </div>
              {!user ? (
                <button 
                  onClick={() => setShowSignInPopup(true)}
                  className="relative px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-xs font-bold text-white transition-all hover:scale-110 active:scale-95 overflow-hidden group/badge"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-white/20 to-purple-400/0 translate-x-[-100%] group-hover/badge:translate-x-[100%] transition-transform duration-700"></div>
                  <span className="relative z-10">{usageTracker.getRemaining().cssQuizzes}/3</span>
                </button>
              ) : (
                <div className="w-10"></div>
              )}
            </div>

            {/* Main Card - Fixed Height */}
            <div className="flex-1 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden flex flex-col">
              {/* Modern Search Bar */}
              <div className="p-4 border-b border-gray-100/50 flex-shrink-0">
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <Search className="w-5 h-5 text-gray-400 group-focus-within:text-purple-600 group-focus-within:scale-110 transition-all duration-300" />
                    <div className="h-5 w-px bg-gray-300 group-focus-within:bg-purple-400 transition-colors"></div>
                  </div>
                  <input
                    type="text"
                    placeholder="Type to search subjects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-16 pr-12 py-4 bg-white border-2 border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:bg-gradient-to-r focus:from-purple-50/50 focus:to-fuchsia-50/50 focus:outline-none transition-all focus:shadow-xl focus:shadow-purple-500/20 font-medium hover:border-purple-300 hover:shadow-md"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white transition-all hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {!searchQuery && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                      ⌘K
                    </div>
                  )}
                </div>
              </div>

              {/* Split Layout: Subjects Left | Years Right - Always Side by Side */}
              <div className="flex-1 grid grid-cols-2 divide-x divide-gray-100 overflow-hidden">
                {/* LEFT: Subjects */}
                <div className="flex flex-col overflow-hidden">
                  <div className="flex items-center justify-between p-4 pb-3 flex-shrink-0">
                    <h2 className="text-base font-black text-gray-800 bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                      Subjects
                    </h2>
                    <span className="text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1.5 rounded-full">
                      {filteredSubjects.length}
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 custom-scrollbar">
                    {filteredSubjects.map((subject, index) => {
                      const color = getSubjectColor(index)
                      const isSelected = selectedSubject === subject.subject
                      return (
                        <button
                          key={subject.subject}
                          onClick={() => {
                            setSelectedSubject(subject.subject)
                            setSelectedYear(null)
                          }}
                          className={`w-full group relative overflow-hidden rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                            isSelected 
                              ? `bg-gradient-to-r ${color.gradient} shadow-lg ${color.hover} scale-[1.02]` 
                              : 'bg-white hover:shadow-lg border-2 border-gray-100 hover:border-purple-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 p-3">
                            {/* Colorful Icon Badge */}
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-base flex-shrink-0 transition-all duration-200 ${
                              isSelected 
                                ? 'bg-white/25 text-white' 
                                : `bg-gradient-to-br ${color.gradient} text-white shadow-sm`
                            }`}>
                              {subject.subject.charAt(0).toUpperCase()}
                            </div>
                            
                            {/* Text */}
                            <div className="flex-1 text-left min-w-0">
                              <h3 className={`font-bold text-sm truncate ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                                {subject.subject}
                              </h3>
                              <p className={`text-xs mt-0.5 font-medium ${isSelected ? 'text-white/90' : 'text-gray-500'}`}>
                                Practice MCQs
                              </p>
                            </div>
                            
                            {/* Checkmark or Arrow */}
                            {isSelected ? (
                              <div className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            ) : (
                              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* RIGHT: Years */}
                <div className="flex flex-col overflow-hidden">
                  {!selectedSubject ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-fuchsia-100 rounded-3xl flex items-center justify-center mb-4 animate-pulse">
                        <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Select a Subject</h3>
                      <p className="text-sm text-gray-500">Choose from {subjects.length} subjects to see available years</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between p-4 pb-3 flex-shrink-0">
                        <div>
                          <h2 className="text-base font-black text-gray-800 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            Years
                          </h2>
                          <p className="text-xs text-gray-600 mt-0.5 truncate max-w-[200px] font-semibold">{selectedSubject}</p>
                        </div>
                        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1.5 rounded-full">
                          {years.length}
                        </span>
                      </div>
                      
                      {years.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                          No years available
                        </div>
                      ) : (
                        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 custom-scrollbar">
                          {years.map((yearData) => {
                            const isSelected = selectedYear === yearData.year
                            return (
                              <button
                                key={yearData.year}
                                onClick={() => setSelectedYear(yearData.year)}
                                className={`w-full group relative overflow-hidden rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                                  isSelected 
                                    ? 'bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 shadow-lg hover:shadow-xl hover:shadow-blue-500/50 scale-[1.02]' 
                                    : 'bg-white hover:shadow-lg border-2 border-gray-100 hover:border-blue-300'
                                }`}
                              >
                                <div className="flex items-center justify-between p-3">
                                  <div className="flex items-center gap-3">
                                    {/* Colorful Year Badge */}
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-base transition-all duration-200 ${
                                      isSelected 
                                        ? 'bg-white/25 text-white' 
                                        : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-sm'
                                    }`}>
                                      {yearData.year.toString().slice(-2)}
                                    </div>
                                    <div className="text-left flex-1">
                                      <div className={`font-bold text-base ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                                        {yearData.year}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Tags and Checkmark */}
                                  <div className="flex items-center gap-2">
                                    {/* New tag for recent years (2023+) */}
                                    {yearData.year >= 2023 && !isSelected && (
                                      <span className="px-2 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-sm">
                                        New
                                      </span>
                                    )}
                                    {/* Popular tag for years with many questions */}
                                    {yearData.count > 100 && !isSelected && yearData.year < 2023 && (
                                      <span className="px-2 py-0.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-full shadow-sm">
                                        Popular
                                      </span>
                                    )}
                                    {isSelected && (
                                      <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Bottom: Start Button - Fixed */}
              {selectedSubject && selectedYear && (
                <div className="p-4 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border-t border-gray-100 flex-shrink-0">
                  <button
                    onClick={startPractice}
                    className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white py-4 px-6 rounded-2xl font-black text-base flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-2xl hover:shadow-green-500/50 hover:scale-[1.03] active:scale-[0.97] group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="relative z-10">Start Quiz</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  </button>
                  <div className="mt-2 text-center text-xs">
                    <span className="font-bold text-purple-700">{selectedSubject}</span>
                    {' • '}
                    <span className="font-bold text-blue-700">{selectedYear}</span>
                    {selectedYear && selectedYear >= 2023 && (
                      <>
                        {' • '}
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full text-xs">
                          Latest
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Custom Styles */}
          <style jsx global>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, #a855f7, #ec4899);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, #9333ea, #db2777);
            }
            @keyframes blob {
              0%, 100% { transform: translate(0, 0) scale(1); }
              25% { transform: translate(20px, -50px) scale(1.1); }
              50% { transform: translate(-20px, 20px) scale(0.9); }
              75% { transform: translate(50px, 50px) scale(1.05); }
            }
            .animate-blob {
              animation: blob 7s infinite;
            }
            .animation-delay-2000 {
              animation-delay: 2s;
            }
            .animation-delay-4000 {
              animation-delay: 4s;
            }
          `}</style>

          <FeedbackButton page="css-practice" />
        </div>
      </ProtectedContent>
    </>
  )
}