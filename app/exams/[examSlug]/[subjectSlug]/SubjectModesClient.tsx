'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Flame, Star, FileText, Target,
  BookOpen, CheckCircle, TrendingUp, ChevronRight, Lock,
} from 'lucide-react'
import { getExamConfig } from '@/lib/exam-configs'
import { createClient } from '@/lib/supabase/client'
import { getFreshAuthUser } from '@/lib/auth/fresh-user'
import {
  TABLE_POPULAR_TAGS, tagSlugToLabel,
  TITLE_CASE_DIFFICULTY_TABLES,
  TOPIC_COL_TABLES, topicDbValue,
} from '@/lib/topic-tags'
import { isActivePremium } from '@/lib/is-active-premium'
import { PREMIUM_PAGE_PATH } from '@/lib/routes'
import NavigationBar from '@/components/NavigationBar'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { FAQSchema } from '@/components/seo/StructuredData'

const roundMCQs = (n: number) => {
  if (n >= 10000) return `${Math.floor(n / 1000)}k+`
  if (n >= 1000) return `${Math.floor(n / 500) * 500}+`
  if (n >= 100) return `${Math.floor(n / 50) * 50}+`
  return `${n}`
}

// ─── Reusable card matching ExamPracticeGridCard structure exactly ────────────

type PracticeCardProps = {
  onClick: () => void
  icon: React.ElementType
  title: string
  subtitle: string
  statPrimary: string
  statSecondary: string
  actionLabel?: string
  accentFrom?: string
  accentTo?: string
  borderHover?: string
  shadowHover?: string
  gradientFrom?: string
  statBg?: string
  statBorder?: string
  statColor?: string
  btnFrom?: string
  btnTo?: string
  btnHoverFrom?: string
  btnHoverTo?: string
  titleHover?: string
}

function PracticeCard({
  onClick, icon: Icon, title, subtitle,
  statPrimary, statSecondary, actionLabel = 'Start',
  accentFrom = 'from-blue-600', accentTo = 'to-blue-700',
  borderHover = 'hover:border-blue-400', shadowHover = 'hover:shadow-blue-500/10',
  gradientFrom = 'from-blue-50/30',
  statBg = 'bg-blue-50', statBorder = 'border-blue-100', statColor = 'text-blue-600',
  btnFrom = 'from-blue-600', btnTo = 'to-blue-700',
  btnHoverFrom = 'hover:from-blue-700', btnHoverTo = 'hover:to-blue-800',
  titleHover = 'group-hover:text-blue-900',
}: PracticeCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white text-center shadow-sm transition-all duration-300 hover:-translate-y-1 ${borderHover} hover:shadow-md ${shadowHover}`}
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradientFrom} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="relative flex flex-1 flex-col p-3 text-center sm:p-3.5">
        <div className={`mx-auto mb-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${accentFrom} ${accentTo} shadow-sm transition-transform duration-300 group-hover:scale-105`}>
          <Icon className="h-3.5 w-3.5 text-white" />
        </div>
        <div className="mb-2 flex min-h-[2.75rem] flex-col justify-start gap-0.5">
          <h3 className={`line-clamp-2 text-sm font-semibold leading-snug text-gray-900 transition-colors ${titleHover}`}>
            {title}
          </h3>
          <p className="line-clamp-2 text-[10px] leading-snug text-gray-500 sm:text-[11px]">
            {subtitle}
          </p>
        </div>
        <div className={`mb-2 shrink-0 rounded-lg border p-1.5 ${statBg} ${statBorder}`}>
          <div className={`text-sm font-bold tabular-nums leading-tight ${statColor}`}>{statPrimary}</div>
          <div className="text-[10px] leading-tight text-gray-500">{statSecondary}</div>
        </div>
        <span className={`mt-auto block w-full shrink-0 rounded-md bg-gradient-to-r py-1.5 text-xs font-medium text-white transition-all ${btnFrom} ${btnTo} ${btnHoverFrom} ${btnHoverTo}`}>
          {actionLabel}
        </span>
      </div>
    </button>
  )
}

// ─── Section heading matching the exam dashboard style ─────────────────────

function SectionLabel({
  children, chip,
}: { children: React.ReactNode; chip?: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h3 className="text-base font-semibold text-gray-900 whitespace-nowrap">{children}</h3>
      {chip && (
        <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
          {chip}
        </span>
      )}
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export function SubjectModesClient() {
  const params = useParams()
  const router = useRouter()
  const examSlug = params.examSlug as string
  const subjectSlug = params.subjectSlug as string
  const config = getExamConfig(examSlug)
  const section = config?.sections.find((s) => s.slug === subjectSlug)

  const [loading, setLoading] = useState(true)
  const [user, setUser]       = useState<any>(null)
  const [counts, setCounts] = useState({
    pastCount: 0, importantCount: 0, repeatedCount: 0,
    easyCount: 0, mediumCount: 0, hardCount: 0,
  })
  const [topicCounts, setTopicCounts] = useState<Record<string, number>>({})

  const isPremium = isActivePremium(user)

  useEffect(() => {
    void getFreshAuthUser().then(setUser)
  }, [])

  useEffect(() => {
    if (!config || !section) { setLoading(false); return }

    let cancelled = false
    setLoading(true)
    const dbTable = section.dbTable

    async function loadCounts() {
      const supabase = createClient()
      const titleCase = TITLE_CASE_DIFFICULTY_TABLES.has(dbTable)
      const skipType = !!section?.noTypeFilter

      if (skipType) {
        const [
          { count: totalCount },
          { count: easyCount }, { count: mediumCount }, { count: hardCount },
        ] = await Promise.all([
          supabase.from(dbTable).select('*', { count: 'exact', head: true }),
          supabase.from(dbTable).select('*', { count: 'exact', head: true }).eq('difficulty', titleCase ? 'Easy'   : 'easy'),
          supabase.from(dbTable).select('*', { count: 'exact', head: true }).eq('difficulty', titleCase ? 'Medium' : 'medium'),
          supabase.from(dbTable).select('*', { count: 'exact', head: true }).eq('difficulty', titleCase ? 'Hard'   : 'hard'),
        ])
        const total = totalCount || 0

        const tags = TABLE_POPULAR_TAGS[dbTable] ?? []
        const useTopicCol = TOPIC_COL_TABLES.has(dbTable)
        const topicResults = tags.length && useTopicCol
          ? await Promise.all(
              tags.map((tag) => {
                const dbVal = topicDbValue(tag, dbTable)
                return supabase
                  .from(dbTable)
                  .select('*', { count: 'exact', head: true })
                  .eq('topic', dbVal)
              })
            )
          : []

        if (cancelled) return
        setCounts({
          pastCount: total, importantCount: total, repeatedCount: total,
          easyCount: easyCount || 0, mediumCount: mediumCount || 0, hardCount: hardCount || 0,
        })
        setTopicCounts(
          tags.length && useTopicCol
            ? Object.fromEntries(tags.map((tag, i) => [tag, topicResults[i].count || 0]))
            : {}
        )
        setLoading(false)
        return
      }

      const [
        { count: pastCount }, { count: importantCount }, { count: repeatedCount },
        { count: easyCount }, { count: mediumCount }, { count: hardCount },
      ] = await Promise.all([
        supabase.from(dbTable).select('*', { count: 'exact', head: true }).eq('type', 'practice'),
        supabase.from(dbTable).select('*', { count: 'exact', head: true }).eq('type', 'most_important'),
        supabase.from(dbTable).select('*', { count: 'exact', head: true }).eq('type', 'most_repeated'),
        supabase.from(dbTable).select('*', { count: 'exact', head: true }).eq('difficulty', titleCase ? 'Easy'   : 'easy'),
        supabase.from(dbTable).select('*', { count: 'exact', head: true }).eq('difficulty', titleCase ? 'Medium' : 'medium'),
        supabase.from(dbTable).select('*', { count: 'exact', head: true }).eq('difficulty', titleCase ? 'Hard'   : 'hard'),
      ])

      const tags = TABLE_POPULAR_TAGS[dbTable] ?? []
      const useTopicCol = TOPIC_COL_TABLES.has(dbTable)
      const topicResults = await Promise.all(
        tags.map((tag) => {
          const dbVal = useTopicCol ? topicDbValue(tag, dbTable) : tag
          const base  = supabase.from(dbTable).select('*', { count: 'exact', head: true })
          return useTopicCol ? base.eq('topic', dbVal) : base.contains('tags', [dbVal])
        })
      )

      if (cancelled) return
      setCounts({
        pastCount: pastCount || 0, importantCount: importantCount || 0,
        repeatedCount: repeatedCount || 0, easyCount: easyCount || 0,
        mediumCount: mediumCount || 0, hardCount: hardCount || 0,
      })
      setTopicCounts(Object.fromEntries(tags.map((tag, i) => [tag, topicResults[i].count || 0])))
      setLoading(false)
    }

    loadCounts()
    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examSlug, subjectSlug])

  if (!config) { router.push('/exams'); return null }
  if (!section) { router.push(`/exams/${examSlug}`); return null }

  const skipType = !!section.noTypeFilter
  const totalPracticeCount = skipType
    ? counts.pastCount
    : counts.pastCount + counts.importantCount + counts.repeatedCount
  const topicsWithCounts = (TABLE_POPULAR_TAGS[section.dbTable] ?? [])
    .map(tag => ({ tag, count: topicCounts[tag] ?? 0 }))
    .filter(t => t.count > 0)
    .sort((a, b) => b.count - a.count)
  const totalDifficultyCount = counts.easyCount + counts.mediumCount + counts.hardCount
  const hasDifficulty = totalDifficultyCount > 0
  const hasTopics = topicsWithCounts.length > 0

  const faqItems = skipType
    ? [
        {
          question: `How many ${config.name} ${section.label} MCQs are available on Imtehan?`,
          answer: `Imtehan has ${totalPracticeCount.toLocaleString()} ${config.name} ${section.label} MCQs organised in unique sets of 20.`,
        },
        {
          question: `How should I practise ${config.name} ${section.label}?`,
          answer: `Work through Practice Sets in order, then use By Difficulty or By Topic when available. Finish with full timed mocks on the exam dashboard.`,
        },
        {
          question: `Are ${config.name} ${section.label} MCQs on Imtehan updated for 2026?`,
          answer: `Yes. Imtehan's ${config.name} ${section.label} bank is continuously updated for the current admission cycle.`,
        },
      ]
    : [
        {
          question: `How many ${config.name} ${section.label} MCQs are available on Imtehan?`,
          answer: `Imtehan has ${totalPracticeCount.toLocaleString()} ${config.name} ${section.label} MCQs across Most Repeated, Most Important, and Past Papers categories, organised in sets of 20.`,
        },
        {
          question: `Which ${config.name} ${section.label} practice mode should I start with?`,
          answer: `Start with Most Repeated MCQs to cover the highest-yield questions first, then move to Most Important for core concepts, and finally Past MCQs to practise actual exam questions from 2015 to 2026.`,
        },
        {
          question: `Are ${config.name} ${section.label} MCQs on Imtehan updated for 2026?`,
          answer: `Yes. Imtehan's ${config.name} ${section.label} question bank is continuously updated with the latest past papers and high-priority MCQs.`,
        },
      ]

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
        <Breadcrumb items={[
          { name: 'Home',        url: '/' },
          { name: config.name,   url: `/exams/${examSlug}` },
          { name: section.label, url: `/exams/${examSlug}/${subjectSlug}` },
        ]} />
      </div>

      <FAQSchema items={faqItems} />

      <div className="container mx-auto px-4 py-8 max-w-7xl space-y-10">

        {/* ── Page header ── */}
        <div className="text-center">
          <span className="inline-block px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-semibold text-blue-600 uppercase tracking-wider mb-3">
            {config.name}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {section.label}
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Sets of 20 MCQs
            {totalPracticeCount > 0 && <> &middot; <span className="font-medium text-gray-700">{roundMCQs(totalPracticeCount)} questions</span> in bank</>}
          </p>
        </div>

        {/* ── Practice modes ── */}
        <section>
          <SectionLabel>{skipType ? 'Practice Sets' : 'Practice Modes'}</SectionLabel>
          {skipType ? (
            <div className="grid grid-cols-1 items-stretch gap-3 sm:max-w-sm sm:mx-auto">
              <PracticeCard
                onClick={() => router.push(`/exams/${examSlug}/${subjectSlug}/practice`)}
                icon={Target}
                title="Practice Sets"
                subtitle="Timed-style sets of 20 unique MCQs"
                statPrimary={roundMCQs(totalPracticeCount)}
                statSecondary="Stem-deduped sets"
              />
            </div>
          ) : (
          <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-4 sm:gap-4">
            <PracticeCard
              onClick={() => router.push(`/exams/${examSlug}/${subjectSlug}/most-repeated`)}
              icon={Flame}
              title="Most Repeated"
              subtitle="High-yield frequently asked questions"
              statPrimary={roundMCQs(counts.repeatedCount)}
              statSecondary="Exam focused"
            />
            <PracticeCard
              onClick={() => router.push(`/exams/${examSlug}/${subjectSlug}/most-important`)}
              icon={Star}
              title="Most Important"
              subtitle="Critical must-know MCQs"
              statPrimary={roundMCQs(counts.importantCount)}
              statSecondary="Core concepts"
            />
            <PracticeCard
              onClick={() => router.push(`/exams/${examSlug}/${subjectSlug}/past-papers`)}
              icon={FileText}
              title="Past MCQs"
              subtitle="Actual exam questions, 2015 onwards"
              statPrimary={roundMCQs(counts.pastCount)}
              statSecondary="2015 - 2026"
            />
            <PracticeCard
              onClick={() => router.push(`/exams/${examSlug}/${subjectSlug}/practice`)}
              icon={Target}
              title="Practice Mode"
              subtitle="Mixed random sets from all types"
              statPrimary={roundMCQs(totalPracticeCount)}
              statSecondary="All types mixed"
            />
          </div>
          )}
        </section>

        {/* ── By Topic: premium-gated featured card ── */}
        {hasTopics && (
          <section>
            <SectionLabel chip={`${topicsWithCounts.length} topics`}>
              Practice by Topic
            </SectionLabel>
            <button
              type="button"
              onClick={() => {
                // TODO: re-enable premium gate when testing is done
                // if (!isPremium) { router.push(PREMIUM_PAGE_PATH); return }
                router.push(`/exams/${examSlug}/${subjectSlug}/topics`)
              }}
              className="group relative w-full rounded-xl border shadow-sm transition-all duration-300 overflow-hidden text-left bg-gradient-to-br from-blue-50 via-indigo-50/50 to-blue-50/70 border-blue-200 hover:border-blue-400 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/20"
            >
              <div className="flex items-center gap-4 p-5 sm:p-6">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-md flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>

                {/* Text + pills */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold mb-2 text-gray-900 group-hover:text-blue-900 transition-colors">
                    Browse by Topic
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {topicsWithCounts.slice(0, 5).map(t => (
                      <span
                        key={t.tag}
                        className="text-[10px] bg-white border border-blue-100 text-blue-700 shadow-sm rounded-full px-2 py-0.5 font-medium"
                      >
                        {tagSlugToLabel(t.tag)}
                      </span>
                    ))}
                    {topicsWithCounts.length > 5 && (
                      <span className="text-[10px] text-blue-500 self-center font-medium">
                        +{topicsWithCounts.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <span className="flex-shrink-0 flex items-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:from-blue-700 group-hover:to-indigo-700 text-white pl-4 pr-3 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm">
                  Browse
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </button>
          </section>
        )}

        {/* ── By Difficulty ── */}
        {hasDifficulty && (
          <section>
            <SectionLabel chip={`${roundMCQs(totalDifficultyCount)} MCQs`}>
              Practice by Difficulty
            </SectionLabel>
            <div className="grid grid-cols-3 items-stretch gap-3 sm:gap-4">
              {counts.easyCount > 0 && (
                <PracticeCard
                  onClick={() => router.push(`/exams/${examSlug}/${subjectSlug}/difficulty/easy`)}
                  icon={CheckCircle}
                  title="Easy"
                  subtitle="Straightforward questions to build confidence"
                  statPrimary={roundMCQs(counts.easyCount)}
                  statSecondary="Easy level"
                  accentFrom="from-emerald-500" accentTo="to-emerald-600"
                  borderHover="hover:border-emerald-400" shadowHover="hover:shadow-emerald-500/10"
                  gradientFrom="from-emerald-50/30"
                  statBg="bg-emerald-50" statBorder="border-emerald-100" statColor="text-emerald-600"
                  btnFrom="from-emerald-500" btnTo="to-emerald-600"
                  btnHoverFrom="hover:from-emerald-600" btnHoverTo="hover:to-emerald-700"
                  titleHover="group-hover:text-emerald-900"
                />
              )}
              {counts.mediumCount > 0 && (
                <PracticeCard
                  onClick={() => router.push(`/exams/${examSlug}/${subjectSlug}/difficulty/medium`)}
                  icon={TrendingUp}
                  title="Medium"
                  subtitle="Moderate challenge for steady progress"
                  statPrimary={roundMCQs(counts.mediumCount)}
                  statSecondary="Medium level"
                  accentFrom="from-amber-500" accentTo="to-amber-600"
                  borderHover="hover:border-amber-400" shadowHover="hover:shadow-amber-500/10"
                  gradientFrom="from-amber-50/30"
                  statBg="bg-amber-50" statBorder="border-amber-100" statColor="text-amber-600"
                  btnFrom="from-amber-500" btnTo="to-amber-600"
                  btnHoverFrom="hover:from-amber-600" btnHoverTo="hover:to-amber-700"
                  titleHover="group-hover:text-amber-900"
                />
              )}
              {counts.hardCount > 0 && (
                <PracticeCard
                  onClick={() => router.push(`/exams/${examSlug}/${subjectSlug}/difficulty/hard`)}
                  icon={Flame}
                  title="Hard"
                  subtitle="High-difficulty sets for exam edge"
                  statPrimary={roundMCQs(counts.hardCount)}
                  statSecondary="Hard level"
                  accentFrom="from-rose-500" accentTo="to-rose-600"
                  borderHover="hover:border-rose-400" shadowHover="hover:shadow-rose-500/10"
                  gradientFrom="from-rose-50/30"
                  statBg="bg-rose-50" statBorder="border-rose-100" statColor="text-rose-600"
                  btnFrom="from-rose-500" btnTo="to-rose-600"
                  btnHoverFrom="hover:from-rose-600" btnHoverTo="hover:to-rose-700"
                  titleHover="group-hover:text-rose-900"
                />
              )}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
