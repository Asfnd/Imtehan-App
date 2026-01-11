'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { getAvailableSubjects, getAvailableYears } from '@/lib/simple-pdf-storage'
// Removed lucide-react imports to fix HMR issues
import FeedbackButton from '@/components/FeedbackButton'
import ProtectedContent from '@/components/security/ProtectedContent'
import DevToolsWarning from '@/components/security/DevToolsWarning'
import SignInPopup from '@/components/auth/SignInPopup'
import { SidebarCategoryToggle } from '@/components/css-practice/CategoryToggle'
import { useFreeTrial } from '@/lib/hooks/useFreeTrial'
import { 
  filterSubjects, 
  calculateCategoryCounts, 
  saveCategoryToSession,
  type CategoryFilter 
} from '@/lib/css-subjects/categorization'
import { isTrendingYear, isNewYear, getYearViewCount } from '@/lib/css-subjects/subject-metadata'
import { Breadcrumb, breadcrumbTrails } from '@/components/seo/Breadcrumb'

interface Subject {
  subject: string // kebab-case from database
  displayName: string // Title Case for display
  count: number
}

interface YearData {
  year: number
  count: number
}

export default function PastPapersMain() {
  const router = useRouter()
  const { user, showSignInPopup, setShowSignInPopup, requestAccess } = useFreeTrial()
  
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [years, setYears] = useState<YearData[]>([])
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')
  const [dataSource, setDataSource] = useState<'loading' | 'storage' | 'fallback'>('loading')

  const fetchSubjects = useMemo(() => async () => {
    console.log('🔍 Loading subjects from database...')
    setDataSource('loading')
    setLoading(true)
    
    try {
      // Direct database lookup - no scanning bullshit
      const result = await getAvailableSubjects()
      
      if (result.success && result.subjects && result.subjects.length > 0) {
        // Keep kebab-case for backend, create display name for frontend
        const subjectsWithCount = result.subjects.map(kebabSubject => ({
          subject: kebabSubject, // Keep kebab-case for database queries
          displayName: kebabSubject.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          count: 1 // We'll get actual count from years
        }))
        setSubjects(subjectsWithCount)
        setDataSource('storage')
        console.log(`✅ Loaded ${result.subjects.length} subjects from database`)
        setLoading(false)
        return
      }
      
      // Database is empty
      console.warn('⚠️ Database is empty! Run: node scripts/sync-storage-to-database.js')
      setSubjects([])
      setDataSource('fallback')
      setLoading(false)
    } catch (error) {
      console.error('❌ Database failed:', error)
      setSubjects([])
      setDataSource('fallback')
      setLoading(false)
    }
  }, [])

  const fetchYears = useMemo(() => async () => {
    if (!selectedSubject) return
    
    console.log(`🔍 Loading years for: ${selectedSubject}`)
    
    try {
      // Direct database lookup - no scanning
      const result = await getAvailableYears(selectedSubject)
      
      if (result.success && result.years) {
        // Remove duplicates and sort years in descending order
        const uniqueYears = Array.from(new Set(result.years))
        const yearsWithCount = uniqueYears.map(year => ({
          year,
          count: 1
        })).sort((a, b) => b.year - a.year) // Sort newest first
        console.log(`✅ Loaded ${yearsWithCount.length} unique years from database`)
        setYears(yearsWithCount)
        return
      }
      
      throw new Error(result.error || 'Failed to load years')
    } catch (error) {
      console.error('❌ Database failed:', error)
      setYears([])
    }
  }, [selectedSubject])

  useEffect(() => {
    // Always start with 'all' for past papers to show all subjects
    setActiveCategory('all')
    
    // Load subjects immediately
    fetchSubjects()
  }, [])

  useEffect(() => {
    if (selectedSubject) {
      fetchYears()
    } else {
      setYears([])
      setSelectedYear(null)
    }
  }, [selectedSubject, fetchYears])

  const filteredSubjects = useMemo(() => {
    // Create subjects array with displayName as subject for categorization
    const subjectsForFilter = subjects.map(s => ({
      subject: s.displayName, // Use displayName for categorization
      count: s.count
    }))
    
    // Use the categorization filter (works with display names)
    const filtered = filterSubjects(subjectsForFilter, searchQuery, activeCategory)
    
    // Map back to our original format with kebab-case
    return filtered.map(f => {
      const original = subjects.find(s => s.displayName === f.subject)
      return original!
    }).filter(Boolean)
  }, [subjects, searchQuery, activeCategory])

  const categoryCounts = useMemo(() => {
    // Calculate counts using display names
    const subjectsForCount = subjects.map(s => ({
      subject: s.displayName,
      count: s.count
    }))
    return calculateCategoryCounts(subjectsForCount)
  }, [subjects])

  const handleCategoryChange = (category: CategoryFilter) => {
    setActiveCategory(category)
    saveCategoryToSession(category)
    // Clear selected subject when changing categories to avoid confusion
    setSelectedSubject('')
    setSelectedYear(null)
  }

  const viewPaper = async (year: number) => {
    // Check access and handle free trial limits
    const hasAccess = await requestAccess('officialPast')
    if (hasAccess) {
      // selectedSubject is already in kebab-case, use it directly
      router.push(`/css/past-papers/view?subject=${encodeURIComponent(selectedSubject)}&year=${year}`)
    }
    // If requestAccess returns false, it will show the sign-in popup automatically
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground font-medium">Loading past papers...</p>
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
        message="Sign in to continue accessing papers"
      />
      <ProtectedContent>
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-white overflow-hidden">
          {/* SEO Breadcrumbs */}
          <div className="absolute top-4 left-6 z-10">
            <Breadcrumb items={breadcrumbTrails.pastPapers} className="text-xs" />
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
                    <span className="font-bold text-sm tracking-wide">Back</span>
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h1 className="text-lg md:text-2xl font-bold text-white drop-shadow-lg tracking-tight">
                      Past Papers
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
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                    <span className="text-xl">🔍</span>
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 transition-all shadow-sm hover:shadow-md z-10"
                    >
                      <span className="text-base font-bold">×</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Split Layout: Subjects Left | Years Right - Always Side by Side */}
              <div className="flex-1 grid grid-cols-2 divide-x divide-gray-100 overflow-hidden">
                {/* LEFT: Subjects */}
                <div className="flex flex-col overflow-hidden bg-gradient-to-b from-blue-50/30 via-indigo-50/10 to-transparent">
                  <div className="flex items-center justify-between p-4 sm:p-5 pb-3 sm:pb-4 flex-shrink-0 bg-gradient-to-r from-blue-50/40 to-transparent">
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
                              {subject.displayName.charAt(0).toUpperCase()}
                            </div>
                            {/* Subject Name */}
                            <div className="flex-1 text-left min-w-0">
                              <h3 className={`font-semibold text-xs sm:text-sm leading-tight line-clamp-2 ${isSelected ? 'text-white' : 'text-gray-900'}`} title={subject.displayName}>
                                {subject.displayName}
                              </h3>
                            </div>

                            {/* Checkmark or Arrow */}
                            {isSelected ? (
                              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            ) : (
                              <span className="text-gray-400 group-hover:text-blue-600 transition-all flex-shrink-0 text-sm">→</span>
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
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-4 sm:p-8">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg">
                        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Select a Subject</h3>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">Choose a subject to see available years</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between p-4 sm:p-5 pb-3 sm:pb-4 flex-shrink-0 bg-gradient-to-r from-blue-50/40 via-indigo-50/20 to-transparent">
                        <div className="flex-1 min-w-0 pr-2">
                          <h2 className="text-base sm:text-lg font-bold text-gray-900">
                            Years
                          </h2>
                          <p className="text-xs text-gray-600 mt-0.5 font-semibold leading-tight break-words line-clamp-1">
                            {subjects.find(s => s.subject === selectedSubject)?.displayName || selectedSubject}
                          </p>
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
                        <div className="flex-1 overflow-y-auto px-3 sm:px-4 pb-3 sm:pb-4 space-y-1.5 sm:space-y-2 custom-scrollbar">
                          {years.map((yearData) => {
                            const yearIsNew = isNewYear(yearData.year)

                            return (
                              <button
                                key={yearData.year}
                                onClick={() => viewPaper(yearData.year)}
                                className="w-full group relative overflow-hidden rounded-xl transition-all duration-200 bg-white hover:bg-blue-50/50 border-2 border-blue-50 hover:border-blue-300 hover:shadow-md"
                              >
                                <div className="flex items-center justify-between p-2.5 sm:p-3">
                                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                    {/* Year Badge */}
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 bg-blue-200 text-blue-800">
                                      {yearData.year.toString().slice(-2)}
                                    </div>
                                    <div className="text-left flex-1 min-w-0">
                                      <div className="font-semibold text-sm text-gray-900">
                                        {yearData.year}
                                      </div>
                                      {yearIsNew && (
                                        <span className="text-[10px] font-semibold text-green-600">
                                          New
                                        </span>
                                      )}
                                    </div>
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

          <FeedbackButton page="past-papers" />
        </div>
      </ProtectedContent>
    </>
  )
}