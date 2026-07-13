'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight, X, CheckCircle } from 'lucide-react'
import { useCompletions } from '@/lib/completion'
import FeedbackButton from '@/components/FeedbackButton'
import ProtectedContent from '@/components/security/ProtectedContent'
import DevToolsWarning from '@/components/security/DevToolsWarning'
import SignInPopup from '@/components/auth/SignInPopup'
import { SidebarCategoryToggle } from '@/components/css-practice/CategoryToggle'
import { useFreeTrial } from '@/lib/hooks/useFreeTrial'
import { Breadcrumb, breadcrumbTrails } from '@/components/seo/Breadcrumb'
import { getFastSubjects, getFastYearsForSubject } from '@/lib/fast-subjects-data'

import { 
  filterSubjects, 
  calculateCategoryCounts, 
  loadCategoryFromSession, 
  saveCategoryToSession,
  type CategoryFilter 
} from '@/lib/css-subjects/categorization'

interface Subject {
  subject: string
  count: number
  databaseName?: string // The actual name in database (for virtual subjects like Idioms)
}

interface YearData {
  year: number
  count: number
  paper_type?: string | null
}

function withIdiomsVirtualSubject(subjectList: Subject[]): Subject[] {
  const idiomVariations = ['idiom', 'english (idiom', 'english idiom']
  const idiomIndex = subjectList.findIndex((s) => {
    const lower = s.subject.toLowerCase()
    return idiomVariations.some((v) => lower.includes(v))
  })

  if (idiomIndex !== -1) {
    const actualIdiomsSubject = subjectList[idiomIndex].subject
    return [
      ...subjectList.slice(0, idiomIndex),
      ...subjectList.slice(idiomIndex + 1),
      {
        ...subjectList[idiomIndex],
        subject: 'Idioms & Phrases',
        databaseName: actualIdiomsSubject,
      },
    ].sort((a, b) => a.subject.localeCompare(b.subject))
  }

  return [
    ...subjectList,
    {
      subject: 'Idioms & Phrases',
      count: 500,
      databaseName: 'English (Idioms)',
    },
  ].sort((a, b) => a.subject.localeCompare(b.subject))
}

export default function CSSSubjectMCQsPage() {
  const router = useRouter()
  const { user, showSignInPopup, setShowSignInPopup, requestAccess } = useFreeTrial()
  
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [years, setYears] = useState<YearData[]>([])
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')
  const [usingFastFallback, setUsingFastFallback] = useState(false)

  const fetchSubjects = useMemo(() => async () => {
    try {
      const res = await fetch('/api/css/subject-stats')
      if (!res.ok) throw new Error(`subject-stats ${res.status}`)
      const json = (await res.json()) as {
        subjects?: { subject: string; question_count: number; years?: number[] }[]
      }
      const subjectList = (json.subjects || [])
        .filter((row) => !!row?.subject)
        .map((row) => ({
          subject: row.subject,
          count: Number(row.question_count) || 0,
        }))
        .sort((a, b) => a.subject.localeCompare(b.subject))

      if (subjectList.length === 0) {
        setSubjects([])
        setLoading(false)
        return
      }

      setSubjects(withIdiomsVirtualSubject(subjectList))
      setUsingFastFallback(false)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching subjects:', error)
      setSubjects(
        getFastSubjects().map((s) => ({
          subject: s.subject,
          count: s.count,
        }))
      )
      setUsingFastFallback(true)
      setLoading(false)
    }
  }, [])

  const fetchYears = useMemo(() => async () => {
    if (!selectedSubject) return
    if (usingFastFallback) {
      setYears(
        getFastYearsForSubject(selectedSubject).map((y) => ({
          year: y.year,
          count: y.count,
          paper_type: null,
        }))
      )
      return
    }
    try {
      const subjectObj = subjects.find((s) => s.subject === selectedSubject)
      const subjectQuery = subjectObj?.databaseName || selectedSubject
      const candidates = [subjectQuery]
      if (
        selectedSubject === 'Idioms & Phrases' ||
        subjectQuery.toLowerCase().includes('idiom')
      ) {
        for (const alt of [
          'English (Idioms)',
          'English Idioms',
          'Idioms',
          'Idioms & Phrases',
        ]) {
          if (!candidates.includes(alt)) candidates.push(alt)
        }
      }

      let yearList: YearData[] = []
      for (const candidate of candidates) {
        const res = await fetch(
          `/api/css/year-stats?subject=${encodeURIComponent(candidate)}`
        )
        if (!res.ok) continue
        const json = (await res.json()) as {
          years?: { year: number; paper_type: string | null; question_count: number }[]
        }
        yearList = (json.years || [])
          .filter((y) => Number.isFinite(Number(y.year)))
          .map((y) => ({
            year: Number(y.year),
            count: Number(y.question_count) || 0,
            paper_type: y.paper_type || null,
          }))
          .sort((a, b) => {
            if (b.year !== a.year) return b.year - a.year
            if (!a.paper_type && !b.paper_type) return 0
            if (!a.paper_type) return -1
            if (!b.paper_type) return 1
            return a.paper_type.localeCompare(b.paper_type)
          })
        if (yearList.length > 0) break
      }

      if (yearList.length === 0) {
        setYears(
          getFastYearsForSubject(selectedSubject).map((y) => ({
            year: y.year,
            count: y.count,
            paper_type: null,
          }))
        )
        return
      }
      setYears(yearList)
    } catch (error) {
      console.error('Error fetching years:', error)
      setYears(
        getFastYearsForSubject(selectedSubject).map((y) => ({
          year: y.year,
          count: y.count,
          paper_type: null,
        }))
      )
    }
  }, [selectedSubject, subjects, usingFastFallback])

  useEffect(() => {
    // Restore user's previous category choice.
    setActiveCategory(loadCategoryFromSession())
    fetchSubjects()
  }, [fetchSubjects])

  useEffect(() => {
    console.log('=== useEffect triggered ===')
    console.log('selectedSubject:', selectedSubject)
    console.log('fetchYears function:', typeof fetchYears)

    if (selectedSubject) {
      console.log('Calling fetchYears()...')
      const result = fetchYears()
      console.log('fetchYears() returned:', result)
      if (result instanceof Promise) {
        result.catch((err) => {
          console.error('Promise rejection:', err)
        })
      }
    } else {
      setYears([])
      setSelectedYear(null)
    }
  }, [selectedSubject, fetchYears])

  const filteredSubjects = useMemo(() => {
    return filterSubjects(subjects, searchQuery, activeCategory)
  }, [subjects, searchQuery, activeCategory])

  const categoryCounts = useMemo(() => {
    return calculateCategoryCounts(subjects)
  }, [subjects])

  const handleCategoryChange = (category: CategoryFilter) => {
    setActiveCategory(category)
    saveCategoryToSession(category)
    // Clear selected subject when changing categories to avoid confusion
    setSelectedSubject('')
    setSelectedYear(null)
  }

  // Green "completed" badges on year cards. The quiz keys completion by the subject's
  // databaseName (what startPractice passes), so read with the same key.
  const completionScope = useMemo(() => {
    if (!selectedSubject) return null
    const subjectObj = subjects.find(s => s.subject === selectedSubject)
    return `css:${subjectObj?.databaseName || selectedSubject}`
  }, [selectedSubject, subjects])
  const completions = useCompletions(completionScope)

  const startPractice = async (yearData: YearData) => {
    // Check access and handle free trial limits
    const hasAccess = await requestAccess('cssSubject')
    if (hasAccess) {
      // Find the subject to get its database name
      const subjectObj = subjects.find(s => s.subject === selectedSubject)
      const subjectForQuery = subjectObj?.databaseName || selectedSubject

      const params = new URLSearchParams()
      if (subjectForQuery) params.append('subject', subjectForQuery)
      params.append('year', yearData.year.toString())
      // Pass paper_type if it exists
      if (yearData.paper_type) params.append('paper_type', yearData.paper_type)
      router.push(`/css/css-practice/quiz?${params.toString()}`)
    }
    // If requestAccess returns false, it will show the sign-in popup or redirect automatically
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground font-medium">Loading subjects...</p>
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
      />
      <ProtectedContent>
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-white overflow-hidden">
          {/* SEO Breadcrumbs */}
          <div className="absolute top-4 left-6 z-10">
            <Breadcrumb items={breadcrumbTrails.practice} className="text-xs" />
          </div>
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
          </div>

          {/* Content Container */}
          <div className="relative h-full flex flex-col">
            {/* Premium Header with Gradient */}
            <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 shadow-2xl">
              {/* Subtle top highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => router.push('/css')}
                    className="flex items-center gap-2.5 px-4 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white rounded-xl transition-all border border-white/30 hover:border-white/40 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-bold text-sm tracking-wide">Dashboard</span>
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h1 className="text-lg md:text-2xl font-bold text-white drop-shadow-lg tracking-tight">
                      Subject Practice
                    </h1>
                  </div>
                  <div className="w-20"></div>
                </div>
              </div>

              {/* Subtle bottom shadow */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
            </div>

            {/* Premium Main Card with Enhanced Design */}
            <div className="relative flex-1 bg-white/95 backdrop-blur-sm m-4 sm:m-6 rounded-3xl shadow-2xl border border-blue-200/50 overflow-hidden flex flex-col max-w-7xl mx-auto w-full">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/30 pointer-events-none"></div>

              {/* Premium Search Bar */}
              <div className="relative p-6 border-b border-blue-100/50 flex-shrink-0 bg-gradient-to-br from-blue-50/40 via-indigo-50/20 to-transparent">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Search className="w-5 h-5 text-blue-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search subjects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 bg-white/90 backdrop-blur-sm border-2 border-blue-200/60 rounded-2xl text-sm text-foreground placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all font-medium shadow-sm hover:shadow-md"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Split Layout: Responsive - Stack on mobile, side by side on desktop */}
              <div className="relative flex-1 flex flex-col sm:grid sm:grid-cols-2 sm:divide-x divide-blue-100/30 overflow-hidden">
                {/* LEFT: Subjects */}
                <div className="relative flex flex-col overflow-hidden flex-1 sm:flex-none bg-gradient-to-b from-blue-50/30 via-indigo-50/10 to-transparent">
                  <div className="flex items-center justify-between p-4 sm:p-5 pb-3 sm:pb-4 flex-shrink-0 relative">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                      Subjects
                    </h2>
                    <span className="text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 px-3 sm:px-3.5 py-1.5 rounded-full shadow-md">
                      {filteredSubjects.length}
                    </span>
                  </div>
                  
                  {/* Category Filter in Sidebar */}
                  <div className="px-3 sm:px-4 pb-2 sm:pb-3 flex-shrink-0">
                    <SidebarCategoryToggle
                      activeCategory={activeCategory}
                      onCategoryChange={handleCategoryChange}
                      categoryCounts={categoryCounts}
                    />
                  </div>
                  
                  <div className="flex-1 overflow-y-auto px-3 sm:px-4 pb-3 sm:pb-4 space-y-1.5 sm:space-y-2 custom-scrollbar">
                    {filteredSubjects.map((subject) => {
                      const isSelected = selectedSubject === subject.subject
                      return (
                        <button
                          key={subject.subject}
                          onClick={() => {
                            setSelectedSubject(subject.subject)
                            setSelectedYear(null)
                          }}
                          className={`w-full group relative overflow-hidden rounded-xl transition-all duration-200 ${
                            isSelected
                              ? 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg scale-[1.02]'
                              : 'bg-white hover:bg-blue-50/50 border-2 border-blue-50 hover:border-blue-300 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3">
                            {/* Icon Badge */}
                            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-blue-200 text-blue-800'
                            }`}>
                              {subject.subject.charAt(0).toUpperCase()}
                            </div>

                            {/* Text */}
                            <div className="flex-1 text-left min-w-0">
                              <h3 className={`font-semibold text-xs sm:text-sm leading-tight line-clamp-2 ${isSelected ? 'text-white' : 'text-gray-900'}`} title={subject.subject}>
                                {subject.subject}
                              </h3>
                              <p className={`text-[10px] sm:text-xs mt-0.5 font-medium ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                                {subject.count} MCQs
                              </p>
                            </div>

                            {/* Checkmark or Arrow */}
                            {isSelected ? (
                              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            ) : (
                              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-blue-600 transition-all flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* RIGHT: Years - Hidden on mobile when no subject selected */}
                <div className={`flex flex-col overflow-hidden flex-1 sm:flex-none ${!selectedSubject ? 'hidden sm:flex' : ''}`}>
                  {!selectedSubject ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-4 sm:p-8">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg">
                        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Select a Subject</h3>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">Choose from {subjects.length} subjects to see available years</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between p-4 sm:p-5 pb-3 sm:pb-4 flex-shrink-0 bg-gradient-to-r from-blue-50/30 to-transparent">
                        <div className="flex-1 min-w-0 pr-2">
                          <h2 className="text-base sm:text-lg font-bold text-gray-900">
                            Years
                          </h2>
                          <p className="text-xs text-gray-600 mt-0.5 font-semibold leading-tight break-words line-clamp-1">{selectedSubject}</p>
                        </div>
                        <span className="text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 px-3 sm:px-3.5 py-1.5 rounded-full shadow-md flex-shrink-0">
                          {years.length}
                        </span>
                      </div>
                      
                      {years.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm p-4">
                          No years available
                        </div>
                      ) : (
                        <>
                          <div className="flex-1 overflow-y-auto px-3 sm:px-4 pb-3 sm:pb-4 space-y-1.5 sm:space-y-2 custom-scrollbar">
                            {years.map((yearData) => {
                              const doneScore = completions[yearData.year]
                              const isDone = doneScore != null
                              return (
                                <button
                                  key={`${yearData.year}-${yearData.paper_type || 'single'}`}
                                  onClick={() => startPractice(yearData)}
                                  className={`w-full group relative overflow-hidden rounded-xl transition-all duration-200 border-2 hover:shadow-md ${
                                    isDone
                                      ? 'bg-emerald-50/60 hover:bg-emerald-50 border-emerald-200 hover:border-emerald-300'
                                      : 'bg-white hover:bg-blue-50/50 border-blue-50 hover:border-blue-300'
                                  }`}
                                >
                                  <div className="flex items-center justify-between p-2.5 sm:p-3">
                                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                      {/* Year Badge */}
                                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                                        isDone ? 'bg-emerald-200 text-emerald-800' : 'bg-blue-200 text-blue-800'
                                      }`}>
                                        {isDone ? <CheckCircle className="w-5 h-5" /> : yearData.year.toString().slice(-2)}
                                      </div>
                                      <div className="text-left flex-1 min-w-0">
                                        <div className="font-semibold text-sm text-gray-900">
                                          {yearData.year}{yearData.paper_type ? ` - ${yearData.paper_type}` : ''}
                                        </div>
                                        <div className="text-[10px] sm:text-xs mt-0.5 text-gray-600">
                                          {yearData.count} questions
                                        </div>
                                      </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                      {isDone && (
                                        <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] sm:text-xs font-semibold rounded-full">
                                          {Math.round(doneScore)}%
                                        </span>
                                      )}
                                      {yearData.year >= 2023 && (
                                        <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[9px] sm:text-xs font-semibold rounded-full">
                                          New
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </button>
                              )
                            })}
                          </div>
                        </>
                      )}
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

            /* Text truncation utilities */
            .line-clamp-1 {
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .line-clamp-2 {
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }

            /* Mobile optimizations */
            @media (max-width: 640px) {
              .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
              }
            }
          `}</style>

          <FeedbackButton page="css-practice" />
        </div>
      </ProtectedContent>
    </>
  )
}