'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { BookOpen } from 'lucide-react'
import { getExamConfig } from '@/lib/exam-configs'
import { createClient } from '@/lib/supabase/client'
import {
  TABLE_POPULAR_TAGS,
  tagSlugToLabel,
  TOPIC_COL_TABLES,
  topicDbValue,
} from '@/lib/topic-tags'
import NavigationBar from '@/components/NavigationBar'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import ExamPracticeGridCard from '@/components/exams/ExamPracticeGridCard'

const roundMCQs = (n: number) => {
  if (n >= 10000) return `${Math.floor(n / 1000)}k+`
  if (n >= 1000) return `${Math.floor(n / 500) * 500}+`
  if (n >= 100) return `${Math.floor(n / 50) * 50}+`
  return `${n}`
}

export function TopicsListClient() {
  const params = useParams()
  const router = useRouter()
  const examSlug = params.examSlug as string
  const subjectSlug = params.subjectSlug as string
  const config = getExamConfig(examSlug)
  const section = config?.sections.find((s) => s.slug === subjectSlug)

  const [loading, setLoading] = useState(true)
  const [topicCounts, setTopicCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    if (!config || !section) {
      setLoading(false)
      return
    }

    let cancelled = false
    const dbTable = section.dbTable
    const tags = TABLE_POPULAR_TAGS[dbTable] ?? []
    const useTopicCol = TOPIC_COL_TABLES.has(dbTable)

    async function load() {
      const supabase = createClient()
      const results = await Promise.all(
        tags.map((tag) => {
          const dbVal = useTopicCol ? topicDbValue(tag, dbTable) : tag
          const base = supabase.from(dbTable).select('*', { count: 'exact', head: true })
          return useTopicCol ? base.eq('topic', dbVal) : base.contains('tags', [dbVal])
        }),
      )
      if (cancelled) return
      setTopicCounts(Object.fromEntries(tags.map((tag, i) => [tag, results[i].count || 0])))
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [config, section])

  if (!config) {
    router.push('/exams')
    return null
  }
  if (!section) {
    router.push(`/exams/${examSlug}`)
    return null
  }

  const topicsWithCounts = (TABLE_POPULAR_TAGS[section.dbTable] ?? [])
    .map((tag) => ({ tag, count: topicCounts[tag] ?? 0 }))
    .filter((t) => t.count > 0)
    .sort((a, b) => b.count - a.count)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />

      <div className="container mx-auto px-4 max-w-7xl pt-3 pb-1">
        <Breadcrumb
          items={[
            { name: 'Home', url: '/' },
            { name: config.name, url: `/exams/${examSlug}` },
            { name: section.label, url: `/exams/${examSlug}/${subjectSlug}` },
            { name: 'Topics', url: `/exams/${examSlug}/${subjectSlug}/topics` },
          ]}
        />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-8">
          <span className="inline-block px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-semibold text-blue-600 uppercase tracking-wider mb-3">
            {config.name} · {section.label}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Practice by Topic</h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            {topicsWithCounts.length} topics &middot; pick one and work through focused sets of 20
          </p>
        </div>

        {topicsWithCounts.length > 0 ? (
          <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {topicsWithCounts.map(({ tag, count }) => (
              <ExamPracticeGridCard
                key={tag}
                onClick={() => router.push(`/exams/${examSlug}/${subjectSlug}/topic/${tag}`)}
                icon={BookOpen}
                title={tagSlugToLabel(tag)}
                subtitle={`${config.name} · ${section.label}`}
                statPrimary={roundMCQs(count)}
                statSecondary="MCQs in topic"
                actionLabel="Start"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400 text-sm">No topics available for this subject.</div>
        )}
      </div>
    </div>
  )
}
