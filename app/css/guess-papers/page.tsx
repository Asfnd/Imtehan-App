'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, FileText, BookOpen, Briefcase, Globe, Edit } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'

interface GuessPaper {
  id: string
  subject: string
  icon: any
}

const guessPapers: GuessPaper[] = [
  {
    id: '1',
    subject: 'Current Affairs',
    icon: Globe
  },
  {
    id: '2',
    subject: 'Essay',
    icon: Edit
  },
  {
    id: '3',
    subject: 'General Science & Ability',
    icon: Briefcase
  },
  {
    id: '4',
    subject: 'Pakistan Affairs',
    icon: FileText
  },
  {
    id: '5',
    subject: 'Precis',
    icon: BookOpen
  }
]

export default function GuessPapersPage() {
  const router = useRouter()
  const [showEligibilityChecker, setShowEligibilityChecker] = useState(false)

  const handleViewPaper = (subject: string) => {
    const encodedSubject = encodeURIComponent(subject)
    router.push(`/css/guess-papers/view?subject=${encodedSubject}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/30">
      <NavigationBar
        showEligibilityButton={true}
        onEligibilityClick={() => setShowEligibilityChecker(true)}
        showCenterNav={false}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Back Button */}
        <button
          onClick={() => router.push('/css')}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-900 bg-clip-text text-transparent">
            CSS 2026 Guess Papers
          </h1>
          <p className="text-gray-600 text-lg">
            Select a subject to view guess papers
          </p>
        </div>

        {/* Guess Papers Grid - Dashboard Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {guessPapers.map((paper) => {
            const IconComponent = paper.icon
            return (
              <div
                key={paper.id}
                className="group relative rounded-xl bg-white border-2 border-gray-100 hover:border-blue-400 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 flex-1 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-4 shadow-md shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-6 text-gray-900 group-hover:text-blue-900 transition-colors">
                    {paper.subject}
                  </h3>
                  <button
                    onClick={() => handleViewPaper(paper.subject)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg mt-auto"
                  >
                    <span>View Paper</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
