'use client'

import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, BookOpen } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'

const SUBJECT_CONFIG: Record<string, {
  name: string; table: string;
  color: string; border: string; hover: string; btnBg: string; textColor: string
}> = {
  biology: {
    name: 'Biology', table: 'mdcat_biology',
    color: 'from-emerald-600 to-teal-700',
    border: 'border-emerald-200', hover: 'hover:border-emerald-400',
    btnBg: 'bg-emerald-600 hover:bg-emerald-700', textColor: 'text-emerald-700',
  },
  chemistry: {
    name: 'Chemistry', table: 'mdcat_chemistry',
    color: 'from-cyan-600 to-blue-700',
    border: 'border-cyan-200', hover: 'hover:border-cyan-400',
    btnBg: 'bg-cyan-600 hover:bg-cyan-700', textColor: 'text-cyan-700',
  },
  physics: {
    name: 'Physics', table: 'mdcat_physics',
    color: 'from-indigo-600 to-violet-700',
    border: 'border-indigo-200', hover: 'hover:border-indigo-400',
    btnBg: 'bg-indigo-600 hover:bg-indigo-700', textColor: 'text-indigo-700',
  },
}

interface ChapterStat { topic: string; count: number }

export default function FSCSubjectPage() {
  const router  = useRouter()
  const params  = useParams()
  const subject = params.subject as string
  const cfg     = SUBJECT_CONFIG[subject]

  const [chapters, setChapters] = useState<ChapterStat[]>([])
  const [loading, setLoading]   = useState(true)
  const [total, setTotal]       = useState(0)

  useEffect(() => {
    if (!cfg) return
    async function loadChapters() {
      const supabase = createClient()
      const PAGE = 1000
      const c: Record<string, number> = {}
      let from = 0
      let totalRows = 0
      while (true) {
        const { data, error } = await supabase
          .from(cfg.table)
          .select('topic')
          .range(from, from + PAGE - 1)
        if (error || !data || data.length === 0) break
        data.forEach((r: any) => { c[r.topic] = (c[r.topic] || 0) + 1 })
        totalRows += data.length
        if (data.length < PAGE) break
        from += PAGE
      }
      const sorted = Object.entries(c)
        .map(([topic, count]) => ({ topic, count }))
        .sort((a, b) => b.count - a.count)
      setChapters(sorted)
      setTotal(totalRows)
      setLoading(false)
    }
    loadChapters()
  }, [subject]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!cfg) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <button onClick={() => router.push('/fsc')} className="text-emerald-600 hover:text-emerald-800">← Back to FSc</button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar showCenterNav={false} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">

        {/* Back */}
        <button
          onClick={() => router.push('/fsc')}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> FSc Pre-Medical
        </button>

        {/* Subject banner */}
        <div className={`bg-gradient-to-r ${cfg.color} rounded-2xl p-5 sm:p-6 mb-6 shadow-lg`}>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">FSc {cfg.name}</h1>
          <p className="text-white/70 text-sm">
            {loading ? 'Loading…' : `${total.toLocaleString()} MCQs · ${chapters.length} Chapters · Sets of 20`}
          </p>
        </div>

        {/* Chapters */}
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Chapters</h2>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 animate-pulse">
                <div className="h-3 bg-slate-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {chapters.map((ch, idx) => (
              <button
                key={ch.topic}
                onClick={() => router.push(`/fsc/${subject}/${encodeURIComponent(ch.topic)}`)}
                className={`group text-left bg-white rounded-xl border-2 ${cfg.border} ${cfg.hover} shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 p-4`}
              >
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${cfg.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <span className="text-white text-[10px] font-bold">{idx + 1}</span>
                </div>
                <p className={`text-sm font-semibold text-slate-800 mb-1 line-clamp-2 group-hover:${cfg.textColor} transition-colors`}>
                  {ch.topic}
                </p>
                <p className="text-xs text-slate-400">{ch.count} MCQs · {Math.ceil(ch.count / 20)} sets</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
