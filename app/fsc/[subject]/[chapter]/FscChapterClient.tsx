'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Play, Lock, CheckCircle } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/lib/contexts/AuthContext'
import SignInPopup from '@/components/auth/SignInPopup'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { FAQSchema } from '@/components/seo/StructuredData'
import { PREMIUM_PAGE_PATH } from '@/lib/routes'
import { isActivePremium } from '@/lib/is-active-premium'
import { tieredSetTableNavigation } from '@/lib/premium-gates'
import { useCompletions } from '@/lib/completion'

const SUBJECT_CONFIG: Record<string, { name: string; table: string; color: string }> = {
  biology:   { name: 'Biology',   table: 'mdcat_biology',   color: 'from-emerald-600 to-teal-700'  },
  chemistry: { name: 'Chemistry', table: 'mdcat_chemistry', color: 'from-cyan-600 to-blue-700'      },
  physics:   { name: 'Physics',   table: 'mdcat_physics',   color: 'from-indigo-600 to-violet-700'  },
}

const SETS_PER_BATCH = 10
const MCQS_PER_SET   = 20

export function FscChapterClient() {
  const params  = useParams()
  const router  = useRouter()
  const subject = params.subject as string
  const chapter = params.chapter as string

  const subjectCfg = SUBJECT_CONFIG[subject]
  const decoded    = decodeURIComponent(chapter)

  const { user } = useAuth()
  const isPremium = isActivePremium(user)
  const [showSignIn, setShowSignIn] = useState(false)

  const [totalMCQs, setTotalMCQs]         = useState(0)
  const [loading, setLoading]             = useState(true)
  const [selectedBatch, setSelectedBatch] = useState(1)
  // Green "completed" badges: local-first, synced from the DB for signed-in users.
  const completions = useCompletions(`fsc:${subject}:${decoded}`)

  useEffect(() => {
    if (!subjectCfg) return
    const supabase = createClient()
    supabase
      .from(subjectCfg.table)
      .select('*', { count: 'exact', head: true })
      .eq('topic', decoded)
      .then(({ count }) => {
        setTotalMCQs(count ?? 0)
        setLoading(false)
      })
  }, [subject, chapter]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!subjectCfg) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <button onClick={() => router.push('/fsc')} className="text-emerald-600 hover:text-emerald-800">← Back to FSc</button>
      </div>
    )
  }

  const totalSets    = Math.ceil(totalMCQs / MCQS_PER_SET)
  const totalBatches = Math.ceil(totalSets / SETS_PER_BATCH)
  const startSet     = (selectedBatch - 1) * SETS_PER_BATCH + 1
  const endSet       = Math.min(selectedBatch * SETS_PER_BATCH, totalSets)
  const setsInBatch  = Array.from({ length: Math.max(0, endSet - startSet + 1) }, (_, i) => startSet + i)

  const handleSetClick = (setNum: number) => {
    const next = tieredSetTableNavigation(setNum, !!user, isPremium)
    if (next === 'require_sign_in') {
      setShowSignIn(true)
      return
    }
    if (next === 'require_premium') {
      router.push(PREMIUM_PAGE_PATH)
      return
    }
    router.push(`/fsc/${subject}/${encodeURIComponent(chapter)}/set/${setNum}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Loading sets…</p>
        </div>
      </div>
    )
  }

  const faqItems = [
    {
      question: `How many FSc ${subjectCfg.name} ${decoded} MCQs are available on Imtehan?`,
      answer: `Imtehan has ${totalMCQs.toLocaleString()} FSc ${subjectCfg.name} ${decoded} MCQs in ${totalSets} practice sets of 20 questions each. All sets are aligned with the Punjab Board curriculum.`,
    },
    {
      question: `Is ${decoded} important for FSc board exams?`,
      answer: `${decoded} is a key chapter in FSc ${subjectCfg.name}. Practising chapter-wise MCQs on Imtehan helps you prepare effectively for Punjab Board exams and MDCAT entry tests.`,
    },
    {
      question: `How can I practice ${decoded} MCQs for FSc?`,
      answer: `Start with Set 1 and work through sets in order. Each set has 20 MCQs with detailed explanations. Regular practice across multiple sets strengthens your understanding of the chapter.`,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar showCenterNav={false} />

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-3 pb-1">
        <Breadcrumb items={[
          { name: 'Home',          url: '/' },
          { name: 'FSc',           url: '/fsc' },
          { name: subjectCfg.name, url: `/fsc/${subject}` },
          { name: decoded,         url: `/fsc/${subject}/${chapter}` },
        ]} />
      </div>

      <FAQSchema items={faqItems} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">

        {/* Back */}
        <button
          onClick={() => router.push(`/fsc/${subject}`)}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {subjectCfg.name}
        </button>

        {/* Header */}
        <div className="mb-3">
          <div className="flex items-center gap-2.5 mb-1">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${subjectCfg.color} flex items-center justify-center`}>
              <span className="text-white text-xs font-bold">Ch</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 line-clamp-1">{decoded}</h1>
          </div>
        </div>

        {/* Batch selector: horizontal scroll on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 md:hidden">
          {Array.from({ length: totalBatches }, (_, i) => i + 1).map((batchNum) => {
            const isSelected = batchNum === selectedBatch
            return (
              <button
                key={batchNum}
                onClick={() => setSelectedBatch(batchNum)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                Batch {batchNum}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Batch sidebar: desktop only */}
          <div className="hidden md:block md:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-200 p-3 sticky top-24 shadow-sm">
              <p className="font-bold text-xs text-slate-700 mb-0.5">Batches</p>
              <p className="text-[10px] text-slate-400 mb-3">Select a batch</p>
              <div className="space-y-1.5 max-h-[520px] overflow-y-auto">
                {Array.from({ length: totalBatches }, (_, i) => i + 1).map((batchNum) => {
                  const isSelected = batchNum === selectedBatch
                  const bStart = (batchNum - 1) * SETS_PER_BATCH + 1
                  const bEnd   = Math.min(batchNum * SETS_PER_BATCH, totalSets)
                  return (
                    <button
                      key={batchNum}
                      onClick={() => setSelectedBatch(batchNum)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all text-sm ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border border-transparent hover:border-slate-200'
                      }`}
                    >
                      <div className="font-semibold text-xs">Batch {batchNum}</div>
                      <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                        Sets {bStart}-{bEnd}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sets panel */}
          <div className="col-span-12 md:col-span-9">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <h2 className="font-bold text-slate-900 mb-4">Batch {selectedBatch}: Practice Sets</h2>
              <div className="space-y-2">
                {setsInBatch.map((setNum) => {
                  const startMCQ  = (setNum - 1) * MCQS_PER_SET + 1
                  const endMCQ    = Math.min(setNum * MCQS_PER_SET, totalMCQs)
                  const needSignIn   = setNum >= 2 && !user
                  const needPremium  = setNum >= 2 && !!user && !isPremium
                  const isLocked     = needSignIn || needPremium
                  const isSignIn     = needSignIn
                  const isPremiumSet = needPremium
                  const doneScore    = !isLocked ? completions[setNum] : undefined
                  const isDone       = doneScore != null
                  return (
                    <button
                      key={setNum}
                      onClick={() => handleSetClick(setNum)}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all group ${
                        isLocked
                          ? 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                          : isDone
                            ? 'border-emerald-300 bg-emerald-50/60 hover:bg-emerald-50 hover:border-emerald-400'
                            : 'border-slate-100 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isLocked ? 'bg-slate-300' : isDone ? 'bg-emerald-600' : `bg-gradient-to-br ${subjectCfg.color}`
                          }`}>
                            {isLocked
                              ? <Lock className="w-4 h-4 text-white" />
                              : isDone
                                ? <CheckCircle className="w-4 h-4 text-white" />
                                : <span className="text-white text-sm font-bold">{setNum}</span>
                            }
                          </div>
                          <div>
                            <p className={`font-semibold text-sm transition-colors ${isLocked ? 'text-slate-500' : 'text-slate-900 group-hover:text-emerald-800'}`}>
                              Set {setNum}
                              {isDone && <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-semibold">Done · {Math.round(doneScore)}%</span>}
                            </p>
                            <p className="text-xs text-slate-400">Q {startMCQ}-{endMCQ} · {MCQS_PER_SET} MCQs</p>
                          </div>
                        </div>
                        {isLocked
                          ? <Lock className="w-4 h-4 text-slate-300 flex-shrink-0" />
                          : isDone
                            ? <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            : <Play className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 fill-current transition-colors flex-shrink-0" />
                        }
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SignInPopup
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
      />
    </div>
  )
}
