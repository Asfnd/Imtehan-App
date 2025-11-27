'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { FileText, Calendar, Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import FeedbackButton from '@/components/FeedbackButton'
import ProtectedContent from '@/components/security/ProtectedContent'
import DevToolsWarning from '@/components/security/DevToolsWarning'
import { usageTracker } from '@/lib/usageTracker'
import SignInPopup from '@/components/auth/SignInPopup'

interface Paper {
  id: number
  subject: string
  year: number | null
  filename: string
  storage_path: string
  file_size: number
  is_available: boolean
  download_count: number
}

export default function PastPapersPage() {
  const router = useRouter()
  const [papers, setPapers] = useState<Record<string, number[]>>({})
  const [loading, setLoading] = useState(true)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState<any>(null)
  const [showSignInPopup, setShowSignInPopup] = useState(false)

  // Check auth status
  useEffect(() => {
    const supabase = createClient()
    
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
    
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    loadPapers()
  }, [])

  async function loadPapers() {
    try {
      console.log('Loading papers from past_papers table...')
      
      const supabase = createClient()
      // Fetch all papers from the database
      const { data, error } = await supabase
        .from('past_papers')
        .select('*')
        .eq('is_available', true)
        .order('year', { ascending: false })

      console.log('Database response:', { data, error })

      if (error) {
        console.error('Database error:', error)
        throw error
      }

      if (!data || data.length === 0) {
        console.warn('No papers found in database')
        setPapers({})
        return
      }

      console.log(`Found ${data.length} papers`)

      // Organize by subject
      const organized: Record<string, number[]> = {}
      
      data.forEach((paper: Paper) => {
        if (paper.year) {
          if (!organized[paper.subject]) {
            organized[paper.subject] = []
          }
          if (!organized[paper.subject].includes(paper.year)) {
            organized[paper.subject].push(paper.year)
          }
        }
      })

      // Sort years for each subject (newest first)
      Object.keys(organized).forEach(subject => {
        organized[subject].sort((a, b) => b - a)
      })

      console.log('Organized papers:', organized)
      setPapers(organized)
    } catch (error: unknown) {
      console.error('Error loading papers:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      alert(`Error loading papers: ${errorMessage}. Check console for details.`)
    } finally {
      setLoading(false)
    }
  }



  const formatSubjectName = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const subjects = useMemo(() => Object.keys(papers).sort(), [papers])

  const filteredSubjects = useMemo(() => {
    if (!searchQuery) return subjects
    return subjects.filter(subject =>
      formatSubjectName(subject).toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [subjects, searchQuery])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading papers...</p>
        </div>
      </div>
    )
  }

  // Helper function to get color for subject
  const getSubjectColor = (index: number) => {
    const colors = [
      { gradient: 'from-emerald-500 via-green-500 to-teal-500', glow: 'shadow-green-500/50' },
      { gradient: 'from-teal-500 via-cyan-500 to-blue-500', glow: 'shadow-teal-500/50' },
      { gradient: 'from-green-500 via-lime-500 to-emerald-500', glow: 'shadow-lime-500/50' },
      { gradient: 'from-cyan-500 via-teal-500 to-green-500', glow: 'shadow-cyan-500/50' },
      { gradient: 'from-lime-500 via-green-500 to-emerald-500', glow: 'shadow-green-500/50' },
      { gradient: 'from-blue-500 via-cyan-500 to-teal-500', glow: 'shadow-blue-500/50' },
    ]
    return colors[index % colors.length]
  }

  return (
    <>
      <DevToolsWarning />
      <SignInPopup 
        isOpen={showSignInPopup} 
        onClose={() => setShowSignInPopup(false)}
        message="Sign in to access unlimited past papers"
      />
      <ProtectedContent>
        <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 relative">
          {/* Animated Background Blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          
          {/* Content Container */}
          <div className="relative flex flex-col p-3 sm:p-4 md:p-6 min-h-screen">
            {/* Interactive Header */}
            <div className="flex items-center justify-between mb-3 sm:mb-4 bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 border border-white/20 shadow-lg flex-shrink-0">
              <button
                onClick={() => router.back()}
                className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl bg-white/20 active:bg-white/30 transition-all active:scale-95"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div className="text-center">
                <h1 className="text-base sm:text-xl font-black text-white drop-shadow-lg">
                  CSS Past Papers
                </h1>
                <p className="text-xs text-white/80 mt-0.5 font-medium hidden sm:block">Access Previous Year Papers</p>
              </div>
              {!user ? (
                <button 
                  onClick={() => setShowSignInPopup(true)}
                  className="relative px-2.5 sm:px-3 py-1.5 bg-white/20 active:bg-white/30 backdrop-blur-sm rounded-lg sm:rounded-xl text-xs font-bold text-white transition-all active:scale-95"
                >
                  <span className="relative z-10">{usageTracker.getRemaining().papers}/5</span>
                </button>
              ) : (
                <div className="w-9 sm:w-10"></div>
              )}
            </div>

            {/* Main Card - Scrollable */}
            <div className="flex-1 bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/30 overflow-hidden flex flex-col min-h-0">
              {/* Modern Search Bar */}
              <div className="p-3 sm:p-4 border-b border-gray-100/50 flex-shrink-0">
                <div className="relative group">
                  <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-green-600 transition-all duration-300" />
                    <div className="h-4 sm:h-5 w-px bg-gray-300 group-focus-within:bg-green-400 transition-colors hidden sm:block"></div>
                  </div>
                  <input
                    type="text"
                    placeholder="Search subjects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 sm:pl-16 pr-10 sm:pr-12 py-3 sm:py-4 bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none transition-all font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white transition-all active:scale-95 shadow-md"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Split Layout: Subjects Left | Years Right - Always Side by Side */}
              <div className="flex-1 grid grid-cols-2 divide-x divide-gray-100 min-h-0">
                {/* LEFT: Subjects */}
                <div className="flex flex-col overflow-hidden">
                  <div className="flex items-center justify-between p-4 pb-3 flex-shrink-0">
                    <h2 className="text-base font-black text-gray-800 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Subjects
                    </h2>
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1.5 rounded-full">
                      {filteredSubjects.length}
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 custom-scrollbar">
                    {filteredSubjects.map((subject, index) => {
                      const color = getSubjectColor(index)
                      const isSelected = selectedSubject === subject
                      return (
                        <button
                          key={subject}
                          onClick={() => {
                            setSelectedSubject(subject)
                          }}
                          className={`w-full group relative overflow-hidden rounded-xl transition-all duration-200 ${
                            isSelected 
                              ? `bg-gradient-to-r ${color.gradient} shadow-lg scale-[1.02]` 
                              : 'bg-white hover:shadow-md border-2 border-gray-100 hover:border-green-200'
                          }`}
                        >
                          <div className="flex items-center gap-3 p-3">
                            {/* Colorful Icon Badge with First Letter */}
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0 transition-all duration-200 ${
                              isSelected 
                                ? 'bg-white/25 text-white' 
                                : `bg-gradient-to-br ${color.gradient} text-white shadow-sm`
                            }`}>
                              {formatSubjectName(subject).charAt(0).toUpperCase()}
                            </div>
                            
                            {/* Text */}
                            <div className="flex-1 text-left min-w-0">
                              <h3 className={`font-bold text-xs sm:text-sm leading-tight ${isSelected ? 'text-white' : 'text-gray-900'}`} title={formatSubjectName(subject)}>
                                {formatSubjectName(subject)}
                              </h3>
                              <p className={`text-[10px] sm:text-xs mt-0.5 sm:mt-1 ${
                                isSelected 
                                  ? 'text-white/80' 
                                  : 'text-gray-500 group-hover:text-gray-700'
                              } transition-colors duration-300`}>
                                {papers[subject].length} years
                              </p>
                            </div>
                            
                            {/* Arrow */}
                            <FileText className={`w-5 h-5 flex-shrink-0 ${
                              isSelected 
                                ? 'text-white opacity-100 translate-x-0' 
                                : 'text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-green-600'
                            } transition-all duration-300`} />
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
                      <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl flex items-center justify-center mb-4 animate-pulse">
                        <Calendar className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Select a Subject</h3>
                      <p className="text-sm text-gray-500">Choose from {subjects.length} subjects to see available years</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between p-4 pb-3 flex-shrink-0">
                        <div className="flex-1 min-w-0 pr-2">
                          <h2 className="text-base font-black text-gray-800 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            Years
                          </h2>
                          <p className="text-xs text-gray-600 mt-0.5 font-semibold leading-tight break-words">{formatSubjectName(selectedSubject)}</p>
                        </div>
                        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1.5 rounded-full flex-shrink-0">
                          {papers[selectedSubject].length}
                        </span>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3 custom-scrollbar">
                        {papers[selectedSubject].map((year, index) => {
                          const totalYears = papers[selectedSubject].length
                          const progress = ((totalYears - index) / totalYears) * 100
                          const isRecent = index < 3
                          
                          return (
                            <Link
                              key={year}
                              href={`/past-papers/view?subject=${selectedSubject}&year=${year}`}
                              onClick={(e) => {
                                // Check if non-logged-in user can view paper
                                if (!user && !usageTracker.canViewPaper()) {
                                  e.preventDefault()
                                  setShowSignInPopup(true)
                                  return
                                }
                                // Track paper view for non-logged-in users
                                if (!user) {
                                  usageTracker.incrementPaperView()
                                }
                              }}
                              className="block group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                            >
                              {/* Animated Gradient Background */}
                              <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              
                              {/* Shimmer Effect */}
                              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                              
                              {/* Content */}
                              <div className="relative bg-gradient-to-br from-gray-50 to-white group-hover:bg-transparent border-2 border-gray-100 group-hover:border-transparent rounded-2xl transition-all duration-300">
                                <div className="flex items-center gap-4 p-4">
                                  {/* Clean Paper Document Badge */}
                                  <div className="relative">
                                    {/* Subtle Shadow Layers */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl transform translate-x-0.5 translate-y-0.5 opacity-30"></div>
                                    
                                    {/* Main Badge */}
                                    <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300 overflow-hidden`}>
                                      {/* Document Icon */}
                                      <svg className="w-8 h-8 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                      
                                      {/* Year Label */}
                                      <div className="absolute bottom-1 right-1 bg-white/20 backdrop-blur-sm px-1.5 py-0.5 rounded text-xs font-bold">
                                        '{year.toString().slice(-2)}
                                      </div>
                                      
                                      {/* Subtle Corner Fold */}
                                      <div className="absolute top-0 right-0 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-white/20"></div>
                                    </div>
                                    
                                    {/* NEW Badge */}
                                    {isRecent && (
                                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                                        ✓
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Year Info */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="font-black text-base sm:text-lg text-gray-900 transition-colors duration-300">
                                        {year}
                                      </div>
                                      {isRecent && (
                                        <span className="px-2 py-0.5 bg-gradient-to-r from-orange-400 to-red-400 text-white text-[10px] sm:text-xs font-bold rounded-full">
                                          NEW
                                        </span>
                                      )}
                                    </div>
                                    
                                    {/* Progress Bar */}
                                    <div className="relative h-2 bg-gray-200 group-hover:bg-gray-300 rounded-full overflow-hidden mb-1 transition-colors duration-300">
                                      <div 
                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 group-hover:from-green-500 group-hover:via-emerald-500 group-hover:to-teal-500 rounded-full transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                      >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                                      </div>
                                    </div>
                                    
                                    <div className="text-xs font-semibold text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                                      Click to view paper
                                    </div>
                                  </div>
                                  
                                  {/* Arrow Icon */}
                                  <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-green-100 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                                      <svg className="w-5 h-5 text-gray-600 group-hover:text-green-700 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
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
              background: linear-gradient(to bottom, #10b981, #14b8a6);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, #059669, #0d9488);
            }
            @keyframes blob {
              0%, 100% { transform: translate(0, 0) scale(1); }
              25% { transform: translate(20px, -50px) scale(1.1); }
              50% { transform: translate(-20px, 20px) scale(0.9); }
              75% { transform: translate(50px, 50px) scale(1.05); }
            }
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
            .animate-blob {
              animation: blob 7s infinite;
            }
            .animate-shimmer {
              animation: shimmer 2s infinite;
            }
            .animation-delay-150 {
              animation-delay: 150ms;
            }
            .animation-delay-2000 {
              animation-delay: 2s;
            }
            .animation-delay-4000 {
              animation-delay: 4s;
            }
          `}</style>

          <FeedbackButton page="past-papers" />
        </div>
      </ProtectedContent>
    </>
  )
}
