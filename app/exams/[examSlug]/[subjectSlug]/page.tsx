'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Flame, Star, FileText, Target } from 'lucide-react'
import { getExamConfig } from '@/lib/exam-configs'
import { createClient } from '@/lib/supabase/client'
import NavigationBar from '@/components/NavigationBar'

const roundMCQs = (n: number) => {
  if (n >= 10000) return `${Math.floor(n / 1000)}k+`
  if (n >= 1000) return `${Math.floor(n / 500) * 500}+`
  if (n >= 100) return `${Math.floor(n / 50) * 50}+`
  return `${n}`
}

const bankCount = (seed: string, base: number): string => {
  let h = 5381
  for (let i = 0; i < seed.length; i++) h = Math.imul(33, h) ^ seed.charCodeAt(i)
  const value = base + (Math.abs(h) % base)
  const rounded = Math.round(value / 100) * 100
  if (rounded >= 1000) {
    const k = Math.round(rounded / 100) / 10
    return k % 1 === 0 ? `${k}k+` : `${k.toFixed(1)}k+`
  }
  return `${rounded}+`
}

export default function SubjectModesPage() {
  const params = useParams()
  const router = useRouter()
  const examSlug = params.examSlug as string
  const subjectSlug = params.subjectSlug as string
  const config = getExamConfig(examSlug)

  const [loading, setLoading] = useState(true)
  const [counts, setCounts] = useState({
    pastCount: 0,
    importantCount: 0,
    repeatedCount: 0
  })

  useEffect(() => {
    if (config) {
      const section = config.sections.find((s) => s.slug === subjectSlug)
      if (section) {
        loadCounts(section)
      }
    }
  }, [])

  if (!config) {
    router.push('/exams')
    return null
  }

  const section = config.sections.find((s) => s.slug === subjectSlug)

  if (!section) {
    router.push(`/exams/${examSlug}`)
    return null
  }

  const loadCounts = async (section: any) => {
    const supabase = createClient()

    const { count: pastCount } = await supabase
      .from(section.dbTable)
      .select('*', { count: 'exact', head: true })
      .eq('type', 'practice')

    const { count: importantCount } = await supabase
      .from(section.dbTable)
      .select('*', { count: 'exact', head: true })
      .eq('type', 'most_important')

    const { count: repeatedCount } = await supabase
      .from(section.dbTable)
      .select('*', { count: 'exact', head: true })
      .eq('type', 'most_repeated')

    setCounts({
      pastCount: pastCount || 0,
      importantCount: importantCount || 0,
      repeatedCount: repeatedCount || 0
    })
    setLoading(false)
  }

  const totalPracticeCount = counts.pastCount + counts.importantCount + counts.repeatedCount

  const modes = [
    {
      slug: 'most-repeated',
      label: 'Most Repeated',
      description: 'High-yield frequently asked questions',
      icon: Flame,
      count: counts.repeatedCount,
      tag: 'MCQs + Sets',
      tagSub: 'Exam focused',
      freeBatches: 1
    },
    {
      slug: 'most-important',
      label: 'Most Important',
      description: 'Critical must-know MCQs',
      icon: Star,
      count: counts.importantCount,
      tag: 'MCQs + Sets',
      tagSub: 'Core concepts',
      freeBatches: 2
    },
    {
      slug: 'past-papers',
      label: 'Past MCQs',
      description: 'Actual exam questions (2015 onwards)',
      icon: FileText,
      count: counts.pastCount,
      tag: 'Past Papers',
      tagSub: '2015 – 2026',
      freeBatches: 3
    },
    {
      slug: 'practice',
      label: 'Practice Mode',
      description: 'Mixed random sets from all types',
      icon: Target,
      count: totalPracticeCount,
      tag: 'MCQ + Mock',
      tagSub: 'All types mixed',
      freeBatches: 5
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
            {section.label}
          </h1>
          <p className="text-gray-600">Choose your practice mode</p>
        </div>

        {/* Mode Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {modes.map((mode) => {
            const Icon = mode.icon
            const sets = Math.ceil(mode.count / 20)
            const batches = Math.ceil(sets / 10)
            const roundedCount = roundMCQs(mode.count)

            return (
              <div
                key={mode.slug}
                className="group relative bg-white rounded-lg border border-gray-200 hover:border-blue-400 shadow-sm hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer hover:-translate-y-1 overflow-hidden"
                onClick={() => router.push(`/exams/${examSlug}/${subjectSlug}/${mode.slug}`)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative p-5 text-center">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-all duration-300">
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-900 transition-colors">{mode.label}</h3>
                  <p className="text-[11px] text-gray-500 mb-3">{mode.description}</p>

                  <div className="bg-blue-50 rounded-lg p-2.5 mb-3 border border-blue-100">
                    <div className="text-sm font-semibold text-blue-600">{mode.tag}</div>
                    <div className="text-[10px] text-gray-500">{mode.tagSub}</div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-1.5 px-3 rounded-md font-medium text-xs transition-all">
                    Start
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
