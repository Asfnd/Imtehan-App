'use client'

import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, BookOpen, Zap, Target, Flame, ChevronRight } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { FAQSchema } from '@/components/seo/StructuredData'

const SUBJECT_CONFIG: Record<string, { name: string; table: string; icon: string }> = {
  'biology':           { name: 'Biology',          table: 'mdcat_biology',           icon: '🧬' },
  'chemistry':         { name: 'Chemistry',        table: 'mdcat_chemistry',         icon: '⚗️' },
  'physics':           { name: 'Physics',          table: 'mdcat_physics',           icon: '⚡' },
  'english':           { name: 'English',          table: 'mdcat_english',           icon: '📖' },
  'logical-reasoning': { name: 'Logical Reasoning',table: 'mdcat_logical_reasoning', icon: '🧩' },
}

const DIFFICULTY_MODES = [
  {
    key: 'easy',
    label: 'Easy',
    icon: Zap,
    desc: 'Foundational questions to build confidence',
    cardBg: 'bg-emerald-50',
    border: 'border-emerald-200',
    hover: 'hover:border-emerald-400 hover:bg-emerald-100/60',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    countColor: 'text-emerald-700',
    dbKey: 'Easy',
  },
  {
    key: 'medium',
    label: 'Medium',
    icon: Target,
    desc: 'Core MDCAT-level questions',
    cardBg: 'bg-amber-50',
    border: 'border-amber-200',
    hover: 'hover:border-amber-400 hover:bg-amber-100/60',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    countColor: 'text-amber-700',
    dbKey: 'Medium',
  },
  {
    key: 'hard',
    label: 'Hard',
    icon: Flame,
    desc: 'Advanced questions to master the exam',
    cardBg: 'bg-red-50',
    border: 'border-red-200',
    hover: 'hover:border-red-400 hover:bg-red-100/60',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-700',
    countColor: 'text-red-700',
    dbKey: 'Hard',
  },
]

interface DiffCounts { Easy: number; Medium: number; Hard: number }
interface TopicStat  { topic: string; count: number }

export default function MDCATSubjectPage() {
  const router  = useRouter()
  const params  = useParams()
  const subject = params.subject as string
  const cfg     = SUBJECT_CONFIG[subject]

  const [counts, setCounts]   = useState<DiffCounts | null>(null)
  const [topics, setTopics]   = useState<TopicStat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!cfg) return
    const supabase = createClient()
    async function loadData() {
      const supabase = createClient()

      const [easy, medium, hard] = await Promise.all([
        supabase.from(cfg.table).select('*', { count: 'exact', head: true }).eq('difficulty', 'Easy'),
        supabase.from(cfg.table).select('*', { count: 'exact', head: true }).eq('difficulty', 'Medium'),
        supabase.from(cfg.table).select('*', { count: 'exact', head: true }).eq('difficulty', 'Hard'),
      ])
      setCounts({ Easy: easy.count ?? 0, Medium: medium.count ?? 0, Hard: hard.count ?? 0 })

      // Paginate through all rows to count topics (Supabase default limit is 1000/page)
      const PAGE = 1000
      const topicCounts: Record<string, number> = {}
      let from = 0
      while (true) {
        const { data, error } = await supabase
          .from(cfg.table)
          .select('topic')
          .range(from, from + PAGE - 1)
        if (error || !data || data.length === 0) break
        data.forEach((r: any) => { topicCounts[r.topic] = (topicCounts[r.topic] || 0) + 1 })
        if (data.length < PAGE) break
        from += PAGE
      }

      setTopics(
        Object.entries(topicCounts)
          .map(([topic, count]) => ({ topic, count }))
          .sort((a, b) => a.topic.localeCompare(b.topic))
      )
      setLoading(false)
    }
    loadData()
  }, [subject]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!cfg) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <button onClick={() => router.push('/mdcat')} className="text-blue-600 hover:text-blue-800">← Back to MDCAT</button>
      </div>
    )
  }

  const total = counts ? counts.Easy + counts.Medium + counts.Hard : 0

  const faqItems = [
    {
      question: `How many MDCAT ${cfg.name} MCQs are available on Imtehan?`,
      answer: `Imtehan has ${total.toLocaleString()} MDCAT ${cfg.name} MCQs across ${topics.length} topics, organised in sets of 20. Questions cover Easy, Medium, and Hard difficulty levels for complete PMC, ETEA, NUMS, and AKU entry test preparation.`,
    },
    {
      question: `What topics are covered in MDCAT ${cfg.name} on Imtehan?`,
      answer: `Imtehan covers ${topics.length} MDCAT ${cfg.name} topics with over ${total.toLocaleString()} MCQs in total. Each topic has its own dedicated sets with detailed explanations to help you master every concept tested in medical entry exams.`,
    },
    {
      question: `How should I study MDCAT ${cfg.name} for 2026?`,
      answer: `Start with Easy difficulty sets to build your foundation, then progress to Medium and Hard for comprehensive preparation. Use topic-wise sets to focus on areas where you need improvement before sitting PMC, ETEA, or NUMS entry tests.`,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar showCenterNav={false} />

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-3 pb-1">
        <Breadcrumb items={[
          { name: 'Home',   url: '/' },
          { name: 'MDCAT',  url: '/mdcat' },
          { name: cfg.name, url: `/mdcat/${subject}` },
        ]} />
      </div>

      <FAQSchema items={faqItems} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Back */}
        <button
          onClick={() => router.push('/mdcat')}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> MDCAT
        </button>

        {/* Subject banner */}
        <div className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 border border-blue-500/30 rounded-2xl p-5 sm:p-6 mb-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-3xl flex-shrink-0 shadow-inner">
              {cfg.icon}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{cfg.name}</h1>
              <p className="text-white/60 text-sm mt-0.5">
                {loading ? 'Loading…' : `${total.toLocaleString()} MCQs · ${topics.length} Topics`}
              </p>
            </div>
          </div>
        </div>



        {/* Difficulty modes */}
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Practice Sets by Difficulty</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {DIFFICULTY_MODES.map(({ key, label, icon: Icon, desc, cardBg, border, hover, iconBg, iconColor, countColor, dbKey }) => {
            const count = counts?.[dbKey as keyof DiffCounts]
            const sets  = count ? Math.ceil(count / 20) : 0
            return (
              <button
                key={key}
                onClick={() => router.push(`/mdcat/${subject}/${key}`)}
                className={`group text-left ${cardBg} border-2 ${border} ${hover} rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-[18px] h-[18px] ${iconColor}`} />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 mt-1 transition-colors" />
                </div>
                <p className="font-bold text-slate-800 mb-0.5">{label}</p>
                <p className="text-xs text-slate-500 mb-3">{desc}</p>
                {count !== undefined ? (
                  <p className={`text-xs font-semibold ${countColor}`}>
                    {count.toLocaleString()} MCQs · {sets} sets
                  </p>
                ) : (
                  <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
                )}
              </button>
            )
          })}
        </div>

        {/* Topic-based practice */}
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Practice Sets by Topic</h2>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 animate-pulse">
                <div className="h-3 bg-slate-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-slate-100 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {topics.map((t) => (
              <button
                key={t.topic}
                onClick={() => router.push(`/mdcat/${subject}/${encodeURIComponent(t.topic)}`)}
                className="group text-left bg-white rounded-xl border-2 border-slate-100 hover:border-blue-400 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 p-4"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm font-semibold text-slate-800 mb-1 line-clamp-2 group-hover:text-blue-700 transition-colors">
                  {t.topic}
                </p>
                <p className="text-xs text-slate-400">{t.count} MCQs · {Math.ceil(t.count / 20)} sets</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
