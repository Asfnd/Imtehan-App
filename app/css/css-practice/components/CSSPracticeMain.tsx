'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen, ArrowLeft, ChevronRight } from 'lucide-react'
import FeedbackButton from '@/components/FeedbackButton'
import ProtectedContent from '@/components/security/ProtectedContent'
import DevToolsWarning from '@/components/security/DevToolsWarning'
import SignInPopup from '@/components/auth/SignInPopup'
import { useFreeTrial } from '@/lib/hooks/useFreeTrial'
import { CSSExamCountdownSimple } from '@/components/CSSExamCountdown'
import { ExamNotesBanner } from '@/components/notes/ExamNotesBanner'

export default function CSSPracticeMain() {
  const router = useRouter()
  const { user, loading, showSignInPopup, setShowSignInPopup } = useFreeTrial()
  const [stats, setStats] = useState({
    subjects: '5,500+',
    idioms: '4,500+'
  })

  useEffect(() => {
    // Load real-time statistics
    loadStatistics()
  }, [])

  const loadStatistics = async () => {
    try {
      // Use fixed numbers as requested
      setStats({
        subjects: '5,500+',
        idioms: '4,500+'
      })
    } catch (error) {
      console.error('Error loading statistics:', error)
      // Keep fallback values
    }
  }

  const practiceTypes = [
    {
      id: 'subjects',
      title: 'Practice Past MCQs',
      description: 'Practice Past Paper MCQs from past CSS exams by subject and year. Find Idioms under the Idioms category filter.',
      icon: BookOpen,
      route: '/css/subjects',
      stats: `${stats.subjects} Questions`,
      subjects: '40+ Subjects + Idioms'
    }
  ]

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
      />
      <ProtectedContent>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50/30 flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b-2 border-blue-100 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => router.push('/css')}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-semibold text-sm">Back to Dashboard</span>
                </button>

                <h1 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-900">Choose Practice Mode</h1>

                <div className="w-32"></div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              {/* CSS Exam Countdown */}
              <div className="flex justify-center mb-8">
                <CSSExamCountdownSimple />
              </div>

              <ExamNotesBanner
                examSlug="css-written"
                examName="CSS Written"
                kitHint="Subject-wise revision kits. Organised by topic inside."
              />

              {/* Practice Cards */}
              <div className="flex justify-center">
                {practiceTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <div
                      key={type.id}
                      className="group relative bg-white rounded-2xl border-2 border-blue-100 hover:border-blue-400 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-2"
                      onClick={() => router.push(type.route)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative p-8 md:p-10">
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <Icon className="w-8 h-8 text-white" />
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors">{type.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">{type.description}</p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-blue-50">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-blue-600">{type.stats.split(' ')[0]}</span>
                            <span className="text-xs text-gray-500 font-medium">{type.stats.split(' ').slice(1).join(' ')}</span>
                          </div>
                          <div className="w-px h-5 bg-blue-300"></div>
                          <div className="text-sm text-gray-600 font-medium">{type.subjects}</div>
                        </div>

                        {/* Button */}
                        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                          Start Practice
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <FeedbackButton page="css-practice" />
        </div>
      </ProtectedContent>
    </>
  )
}