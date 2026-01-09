'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Download, Eye, ArrowLeft, Sparkles } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'

interface GuessPaper {
  id: string
  title: string
  subject: string
  filename: string
  icon: string
  color: string
  description: string
}

const guessPapers: GuessPaper[] = [
  {
    id: '1',
    title: 'Current Affairs',
    subject: 'Current Affairs',
    filename: 'Current Affairs.pdf',
    icon: '🌍',
    color: 'from-blue-500 to-blue-600',
    description: 'CSS 2026 Current Affairs guess paper with important topics'
  },
  {
    id: '2',
    title: 'Essay Writing',
    subject: 'Essay',
    filename: 'Essay.pdf',
    icon: '✍️',
    color: 'from-purple-500 to-purple-600',
    description: 'Probable essay topics and preparation guide for CSS 2026'
  },
  {
    id: '3',
    title: 'General Science & Ability',
    subject: 'GSA',
    filename: 'General Science & Ability.pdf',
    icon: '🔬',
    color: 'from-green-500 to-green-600',
    description: 'GSA guess paper covering science and analytical reasoning'
  },
  {
    id: '4',
    title: 'Pakistan Affairs',
    subject: 'Pakistan Affairs',
    filename: 'Pakistan Affairs.pdf',
    icon: '🇵🇰',
    color: 'from-emerald-500 to-emerald-600',
    description: 'Pakistan Affairs guess paper with key historical events'
  },
  {
    id: '5',
    title: 'Precis & Composition',
    subject: 'Precis',
    filename: 'Precis.pdf',
    icon: '📝',
    color: 'from-indigo-500 to-indigo-600',
    description: 'Precis writing and composition guide with practice material'
  }
]

export default function GuessPapersPage() {
  const router = useRouter()
  const [showEligibilityChecker, setShowEligibilityChecker] = useState(false)

  const handleViewPaper = (filename: string, title: string) => {
    const encodedFilename = encodeURIComponent(filename)
    const encodedTitle = encodeURIComponent(title)
    router.push(`/css/guess-papers/view?file=${encodedFilename}&title=${encodedTitle}`)
  }

  const handleDownload = (filename: string) => {
    const link = document.createElement('a')
    link.href = `/guess-papers-2026/${filename}`
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/30">
      <NavigationBar
        showEligibilityButton={true}
        onEligibilityClick={() => setShowEligibilityChecker(true)}
        showCenterNav={false}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Back Button */}
        <button
          onClick={() => router.push('/css')}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-bold text-yellow-800">CSS 2026 Exclusive</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-900 bg-clip-text text-transparent">
            CSS 2026 Guess Papers
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Expert-curated guess papers covering probable questions and important topics for CSS 2026 examination
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 text-center">
            <div className="text-2xl font-bold text-blue-600">{guessPapers.length}</div>
            <div className="text-xs text-gray-600 mt-1">Subjects Covered</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100 text-center">
            <div className="text-2xl font-bold text-green-600">2026</div>
            <div className="text-xs text-gray-600 mt-1">CSS Edition</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100 text-center">
            <div className="text-2xl font-bold text-purple-600">100%</div>
            <div className="text-xs text-gray-600 mt-1">Free Access</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100 text-center">
            <div className="text-2xl font-bold text-orange-600">New</div>
            <div className="text-xs text-gray-600 mt-1">Just Added</div>
          </div>
        </div>

        {/* Guess Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guessPapers.map((paper) => (
            <div
              key={paper.id}
              className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-300 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
            >
              {/* Card Header with Gradient */}
              <div className={`bg-gradient-to-r ${paper.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                <div className="relative">
                  <div className="text-4xl mb-3">{paper.icon}</div>
                  <h3 className="text-xl font-bold mb-1">{paper.title}</h3>
                  <p className="text-white/90 text-sm">{paper.subject}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {paper.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleViewPaper(paper.filename, paper.title)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>

                  <button
                    onClick={() => handleDownload(paper.filename)}
                    className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Footer Badge */}
              <div className="px-6 pb-6">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FileText className="w-3.5 h-3.5" />
                  <span>PDF Format • Free Download</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">How to Use Guess Papers?</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Review all topics covered in each guess paper thoroughly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Practice writing answers for essay and subjective questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Cross-reference with official CSS syllabus and past papers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Use as a final revision tool 2-3 weeks before exam</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
