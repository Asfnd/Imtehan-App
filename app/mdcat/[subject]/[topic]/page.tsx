'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Play, Zap, Target, Flame, Lock } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/lib/contexts/AuthContext'
import SignInPopup from '@/components/auth/SignInPopup'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { FAQSchema } from '@/components/seo/StructuredData'
import { PREMIUM_PAGE_PATH } from '@/lib/routes'
import { isActivePremium } from '@/lib/is-active-premium'
import { tieredSetTableNavigation } from '@/lib/premium-gates'

const SUBJECT_CONFIG: Record<string, { name: string; table: string }> = {
  'biology':           { name: 'Biology',          table: 'mdcat_biology'           },
  'chemistry':         { name: 'Chemistry',        table: 'mdcat_chemistry'         },
  'physics':           { name: 'Physics',          table: 'mdcat_physics'           },
  'english':           { name: 'English',          table: 'mdcat_english'           },
  'logical-reasoning': { name: 'Logical Reasoning',table: 'mdcat_logical_reasoning' },
}

const DIFFICULTY_CONFIG: Record<string, { label: string; dbKey: string; icon: typeof Zap }> = {
  easy:   { label: 'Easy',   dbKey: 'Easy',   icon: Zap    },
  medium: { label: 'Medium', dbKey: 'Medium', icon: Target },
  hard:   { label: 'Hard',   dbKey: 'Hard',   icon: Flame  },
}

const SETS_PER_BATCH = 10
const MCQS_PER_SET   = 20

export default function MDCATTopicOrDifficultyPage() {
  const params  = useParams()
  const router  = useRouter()
  const subject = params.subject as string
  const topic   = params.topic   as string
  const decodedTopic = decodeURIComponent(topic)

  const subjectCfg    = SUBJECT_CONFIG[subject]
  const difficultyCfg = DIFFICULTY_CONFIG[topic]
  const isDifficulty  = !!difficultyCfg

  // Display label: for difficulty use the label, for topic use the decoded topic name
  const displayLabel = isDifficulty ? difficultyCfg.label : decodedTopic

  const { user } = useAuth()
  const isPremium = isActivePremium(user)
  const [showSignIn, setShowSignIn] = useState(false)

  const [totalMCQs, setTotalMCQs]         = useState(0)
  const [loading, setLoading]             = useState(true)
  const [selectedBatch, setSelectedBatch] = useState(1)

  useEffect(() => {
    if (!subjectCfg) return

    const supabase = createClient()
    const base     = supabase.from(subjectCfg.table).select('*', { count: 'exact', head: true })

    const countQuery = isDifficulty
      ? base.eq('difficulty', difficultyCfg!.dbKey)
      : base.eq('topic', decodedTopic)

    countQuery.then(({ count }) => {
      setTotalMCQs(count ?? 0)
      setLoading(false)
    })
  }, [subject, topic]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!subjectCfg) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <button onClick={() => router.push('/mdcat')} className="text-blue-600 hover:text-blue-800">← Back to MDCAT</button>
      </div>
    )
  }

  const DiffIcon    = isDifficulty ? difficultyCfg.icon : null
  const totalSets   = Math.ceil(totalMCQs / MCQS_PER_SET)
  const totalBatches = Math.ceil(totalSets / SETS_PER_BATCH)
  const startSet    = (selectedBatch - 1) * SETS_PER_BATCH + 1
  const endSet      = Math.min(selectedBatch * SETS_PER_BATCH, totalSets)
  const setsInBatch = Array.from({ length: Math.max(0, endSet - startSet + 1) }, (_, i) => startSet + i)

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
    router.push(`/mdcat/${subject}/${encodeURIComponent(decodedTopic)}/set/${setNum}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Loading sets…</p>
        </div>
      </div>
    )
  }

  const faqItems = [
    {
      question: `How many MDCAT ${subjectCfg.name} ${displayLabel} MCQs are available on Imtehan?`,
      answer: `Imtehan has ${totalMCQs.toLocaleString()} MDCAT ${subjectCfg.name} ${displayLabel} MCQs organised in ${totalSets} practice sets of 20 questions each. Every question includes a detailed explanation.`,
    },
    {
      question: `Is ${displayLabel} important for MDCAT 2026?`,
      answer: `${displayLabel} is a regularly tested area in MDCAT ${subjectCfg.name}. Practising topic-wise MCQ sets on Imtehan helps you score higher in PMC, ETEA, NUMS, and AKU entry tests.`,
    },
    {
      question: `How should I prepare ${displayLabel} for MDCAT?`,
      answer: `Begin with Set 1 to assess your level, then work through sets systematically. Read the explanation for every incorrect answer. Aim to complete at least 3 sets per session for strong retention.`,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar showCenterNav={false} />

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-3 pb-1">
        <Breadcrumb items={[
          { name: 'Home',           url: '/' },
          { name: 'MDCAT',          url: '/mdcat' },
          { name: subjectCfg.name,  url: `/mdcat/${subject}` },
          { name: displayLabel,     url: `/mdcat/${subject}/${topic}` },
        ]} />
      </div>

      <FAQSchema items={faqItems} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Back */}
        <button
          onClick={() => router.push(`/mdcat/${subject}`)}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {subjectCfg.name}
        </button>

        {/* Header */}
        <div className="mb-3">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              {DiffIcon
                ? <DiffIcon className="w-4 h-4 text-white" />
                : <span className="text-white text-xs font-bold">T</span>
              }
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              {subjectCfg.name} — {displayLabel}
            </h1>
          </div>
        </div>

        {/* Batch selector — horizontal scroll on mobile, vertical sidebar on md+ */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 md:hidden">
          {Array.from({ length: totalBatches }, (_, i) => i + 1).map((batchNum) => {
            const isSelected = batchNum === selectedBatch
            return (
              <button
                key={batchNum}
                onClick={() => setSelectedBatch(batchNum)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                Batch {batchNum}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Batch sidebar — desktop only */}
          <div className="hidden md:block md:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-200 p-3 sticky top-24 shadow-sm">
              <p className="font-bold text-xs text-slate-700 mb-0.5">Batches</p>
              <p className="text-[10px] text-slate-400 mb-3">Select a batch</p>
              <div className="space-y-1.5 max-h-[520px] overflow-y-auto">
                {Array.from({ length: totalBatches }, (_, i) => i + 1).map((batchNum) => {
                  const isSelected = batchNum === selectedBatch
                  const bStart     = (batchNum - 1) * SETS_PER_BATCH + 1
                  const bEnd       = Math.min(batchNum * SETS_PER_BATCH, totalSets)
                  return (
                    <button
                      key={batchNum}
                      onClick={() => setSelectedBatch(batchNum)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all text-sm ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border border-transparent hover:border-slate-200'
                      }`}
                    >
                      <div className="font-semibold text-xs">Batch {batchNum}</div>
                      <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                        Sets {bStart}–{bEnd}
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
              <h2 className="font-bold text-slate-900 mb-4">Batch {selectedBatch} — Practice Sets</h2>

              <div className="space-y-2">
                {setsInBatch.map((setNum) => {
                  const startMCQ  = (setNum - 1) * MCQS_PER_SET + 1
                  const endMCQ    = Math.min(setNum * MCQS_PER_SET, totalMCQs)
                  const isSignIn     = setNum === 3
                  const isPremiumSet = setNum >= 4
                  const isLocked     = (isSignIn && !user) || (isPremiumSet && !isPremium)
                  return (
                    <button
                      key={setNum}
                      onClick={() => handleSetClick(setNum)}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all group ${
                        isLocked
                          ? 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                          : 'border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isLocked ? 'bg-slate-300' : 'bg-blue-600'
                          }`}>
                            {isLocked
                              ? <Lock className="w-4 h-4 text-white" />
                              : <span className="text-white text-sm font-bold">{setNum}</span>
                            }
                          </div>
                          <div>
                            <p className={`font-semibold text-sm transition-colors ${isLocked ? 'text-slate-500' : 'text-slate-900 group-hover:text-blue-800'}`}>
                              Set {setNum}
                              {isSignIn && !user && <span className="ml-2 text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-semibold">Sign In</span>}
                              {isPremiumSet && !isPremium && <span className="ml-2 text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-semibold">Premium</span>}
                            </p>
                            <p className="text-xs text-slate-400">Q {startMCQ}–{endMCQ} · {MCQS_PER_SET} MCQs</p>
                          </div>
                        </div>
                        {isLocked
                          ? <Lock className="w-4 h-4 text-slate-300 flex-shrink-0" />
                          : <Play className="w-4 h-4 text-slate-300 group-hover:text-blue-600 fill-current transition-colors flex-shrink-0" />
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
        message="Sign in free to unlock Set 3 — then upgrade for full access"
      />
    </div>
  )
}
