'use client'

import { roundMcqCount } from '@/lib/round-mcq-count'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Play, Lock, CheckCircle } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'
import { getFreshAuthUser } from '@/lib/auth/fresh-user'
import { getExamConfig } from '@/lib/exam-configs'
import SignInPopup from '@/components/auth/SignInPopup'
import { PREMIUM_PAGE_PATH } from '@/lib/routes'
import { isActivePremium } from '@/lib/is-active-premium'
import { tieredSetTableNavigation } from '@/lib/premium-gates'
import { fetchRemoteCompletions } from '@/lib/completion'
import BatchSetPickerGrid, { setMcqRangeLabel } from '@/components/exams/BatchSetPickerGrid'

const MODE_CONFIG = {
  'most-repeated': { label: 'Most Repeated', description: 'High-yield frequently asked questions', dbType: 'most_repeated' as string | null },
  'most-important': { label: 'Most Important', description: 'Critical must-know MCQs', dbType: 'most_important' as string | null },
  'past-papers': { label: 'Past Papers', description: 'Past exam questions from a sister exam board', dbType: 'practice' as string | null },
  practice: { label: 'Practice Mode', description: 'Mixed random sets from all types', dbType: null },
}

const SETS_PER_BATCH = 10

export function ModeSetPicker() {
  const params = useParams()
  const router = useRouter()
  const examSlug = params.examSlug as string
  const subjectSlug = params.subjectSlug as string
  const mode = params.mode as string

  const [selectedBatch, setSelectedBatch] = useState(1)
  const [totalMCQs, setTotalMCQs] = useState(0)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [showSignIn, setShowSignIn] = useState(false)
  const [completedSets, setCompletedSets] = useState<Record<number, number>>({})

  const modeConfig = MODE_CONFIG[mode as keyof typeof MODE_CONFIG]
  const examConfig = getExamConfig(examSlug)

  useEffect(() => {
    async function fetchUser() {
      setUser(await getFreshAuthUser())
    }
    fetchUser()
  }, [])

  useEffect(() => {
    if (!examSlug || !subjectSlug || !mode) return
    let cancelled = false
    try {
      const key = `imtehan_set_done_${examSlug}_${subjectSlug}_${mode}`
      const stored = JSON.parse(localStorage.getItem(key) || '{}')
      const mapped: Record<number, number> = {}
      for (const [k, v] of Object.entries(stored)) mapped[Number(k)] = Number(v)
      setCompletedSets(mapped)
    } catch { /* storage unavailable */ }
    fetchRemoteCompletions(`exams-set:${examSlug}:${subjectSlug}:${mode}`).then((remote) => {
      if (cancelled || Object.keys(remote).length === 0) return
      setCompletedSets((prev) => {
        const next = { ...prev }
        for (const [k, v] of Object.entries(remote)) {
          const n = Number(k)
          if (next[n] == null || v > next[n]) next[n] = v
        }
        return next
      })
    })
    return () => { cancelled = true }
  }, [examSlug, subjectSlug, mode])

  const isPremium = isActivePremium(user)

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
    router.push(`/exams/${examSlug}/${subjectSlug}/${mode}/set/${setNum}`)
  }

  useEffect(() => {
    async function fetchCount() {
      const config = getExamConfig(examSlug)
      const section = config?.sections.find((s) => s.slug === subjectSlug)
      if (!section || !modeConfig) {
        setLoading(false)
        return
      }

      try {
        const qs = new URLSearchParams({ dbTable: section.dbTable, examSlug })
        if (section.questionNeedles?.length) {
          qs.set('needles', section.questionNeedles.join('|'))
        }
        if (section.topicFields?.length) {
          qs.set('topics', section.topicFields.join('|'))
        }
        if (section.subjectField) {
          qs.set('subjectField', section.subjectField)
          qs.set('all', '1')
        } else if (section.subjectFields?.length) {
          qs.set('subjects', section.subjectFields.join('|'))
          qs.set('all', '1')
        } else if (section.subtopicField) {
          qs.set('subtopicField', section.subtopicField)
          qs.set('all', '1')
        } else if (section.topicFields?.length || section.noTypeFilter || mode === 'practice') {
          qs.set('all', '1')
        } else if (mode === 'past-papers' && config?.pastPapersExam) {
          qs.set('targetExam', config.pastPapersExam)
        } else if (modeConfig.dbType) {
          qs.set('type', modeConfig.dbType)
        } else {
          qs.set('all', '1')
        }
        const res = await fetch(`/api/practice/count?${qs}`)
        const json = (await res.json()) as { count?: number }
        setTotalMCQs(res.ok ? Number(json.count) || 0 : 0)
      } catch {
        setTotalMCQs(0)
      }
      setLoading(false)
    }
    fetchCount()
  }, [examSlug, subjectSlug, mode, modeConfig])

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600" />
          <p className="mt-3 text-sm text-gray-500">Loading sets…</p>
        </div>
      </div>
    )
  }

  if (!modeConfig) return null

  const totalSets = Math.ceil(totalMCQs / 20)
  const totalBatches = Math.ceil(totalSets / SETS_PER_BATCH)
  const startSet = (selectedBatch - 1) * SETS_PER_BATCH + 1
  const endSet = Math.min(selectedBatch * SETS_PER_BATCH, totalSets)
  const setsInBatch = Array.from({ length: endSet - startSet + 1 }, (_, i) => startSet + i)

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <NavigationBar />

        <div className="container mx-auto max-w-7xl px-4 py-6">
          <p className="mb-5 text-sm text-gray-500">
            {modeConfig.description} ·{' '}
            <span className="font-medium text-gray-700">{roundMcqCount(totalMCQs)} MCQs</span>
            {' '}· <span className="font-medium text-gray-700">{totalBatches} batches</span>
          </p>

          <BatchSetPickerGrid
            totalBatches={totalBatches}
            totalSets={totalSets}
            selectedBatch={selectedBatch}
            onSelectBatch={setSelectedBatch}
            setsPerBatch={SETS_PER_BATCH}
          >
            {setsInBatch.map((setNum) => {
              const nav = tieredSetTableNavigation(setNum, !!user, isPremium)
              const needSignIn = nav === 'require_sign_in'
              const needPremium = nav === 'require_premium'
              const isSetLocked = needSignIn || needPremium
              const isCompleted = !isSetLocked && completedSets[setNum] != null
              const score = isCompleted ? Math.round(completedSets[setNum]) : null

              return (
                <button
                  key={setNum}
                  onClick={() => handleSetClick(setNum)}
                  className={`w-full rounded-lg border px-2 py-2 text-left transition-all md:px-4 md:py-3 ${
                    isSetLocked
                      ? 'cursor-pointer border-gray-100 bg-gray-50 hover:border-gray-200'
                      : isCompleted
                        ? 'border-emerald-100 bg-emerald-50 hover:border-emerald-200 hover:shadow-sm'
                        : 'border-transparent bg-gray-50 hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
                      <div
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg md:h-10 md:w-10 ${
                          isSetLocked ? 'bg-gray-200' : isCompleted ? 'bg-emerald-500' : 'bg-blue-600'
                        }`}
                      >
                        {isSetLocked ? (
                          <Lock className="h-4 w-4 text-gray-400" />
                        ) : isCompleted ? (
                          <CheckCircle className="h-4 w-4 text-white md:h-5 md:w-5" />
                        ) : (
                          <span className="text-sm font-bold text-white">{setNum}</span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div
                          className={`text-xs font-semibold md:text-sm ${
                            isSetLocked ? 'text-gray-400' : isCompleted ? 'text-emerald-800' : 'text-gray-900'
                          }`}
                        >
                          Set {setNum}
                        </div>
                        <div className="mt-0.5 text-[10px] text-gray-400 md:text-xs">
                          {isCompleted
                            ? `Completed · ${score}% score`
                            : setMcqRangeLabel(setNum, totalMCQs)}
                        </div>
                      </div>
                    </div>
                    {isSetLocked ? (
                      <Lock className="h-4 w-4 flex-shrink-0 text-gray-300" />
                    ) : isCompleted ? (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                        {score}%
                      </span>
                    ) : (
                      <Play className="h-4 w-4 flex-shrink-0 fill-current text-blue-600 md:h-5 md:w-5" />
                    )}
                  </div>
                </button>
              )
            })}
          </BatchSetPickerGrid>
        </div>
      </div>

      <SignInPopup
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
      />
    </>
  )
}
