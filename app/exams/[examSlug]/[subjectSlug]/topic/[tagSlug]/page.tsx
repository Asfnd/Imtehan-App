'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Play, Lock, CheckCircle } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'
import { createClient } from '@/lib/supabase/client'
import { getExamConfig } from '@/lib/exam-configs'
import SignInPopup from '@/components/auth/SignInPopup'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { PREMIUM_PAGE_PATH } from '@/lib/routes'
import { isActivePremium } from '@/lib/is-active-premium'
import { tieredSetTableNavigation } from '@/lib/premium-gates'
import { tagSlugToLabel, isTagArrayTable, topicDbValue } from '@/lib/topic-tags'
import { fetchRemoteCompletions } from '@/lib/completion'

const SETS_PER_BATCH = 10

const roundMCQs = (n: number) => {
  if (n >= 10000) return `${Math.floor(n / 1000)}k+`
  if (n >= 1000)  return `${(Math.floor(n / 100) * 100).toLocaleString()}+`
  if (n >= 100)   return `${Math.floor(n / 10) * 10}+`
  return `${n}`
}

export default function TopicSetPicker() {
  const params      = useParams()
  const router      = useRouter()
  const examSlug    = params.examSlug    as string
  const subjectSlug = params.subjectSlug as string
  const tagSlug     = params.tagSlug     as string

  const [selectedBatch, setSelectedBatch] = useState(1)
  const [totalMCQs, setTotalMCQs]         = useState(0)
  const [loading, setLoading]             = useState(true)
  const [user, setUser]                   = useState<any>(null)
  const [showSignIn, setShowSignIn]       = useState(false)
  const [completedSets, setCompletedSets] = useState<Record<number, number>>({})

  // Completion badges: quiz writes under mode "topic/<tagSlug>". Local-first + DB merge.
  useEffect(() => {
    if (!examSlug || !subjectSlug || !tagSlug) return
    let cancelled = false
    try {
      const stored = JSON.parse(localStorage.getItem(`imtehan_set_done_${examSlug}_${subjectSlug}_topic/${tagSlug}`) || '{}')
      const mapped: Record<number, number> = {}
      for (const [k, v] of Object.entries(stored)) mapped[Number(k)] = Number(v)
      setCompletedSets(mapped)
    } catch { /* storage unavailable */ }
    fetchRemoteCompletions(`exams-set:${examSlug}:${subjectSlug}:topic/${tagSlug}`).then((remote) => {
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
  }, [examSlug, subjectSlug, tagSlug])

  const examConfig = getExamConfig(examSlug)
  const sectionCfg = examConfig?.sections.find((s) => s.slug === subjectSlug)
  const topicLabel = tagSlugToLabel(tagSlug)
  const isPremium  = isActivePremium(user)

  useEffect(() => {
    createClient().auth.getUser().then(({ data: { user } }) => setUser(user))
  }, [])

  useEffect(() => {
    async function fetchCount() {
      const config  = getExamConfig(examSlug)
      const section = config?.sections.find((s) => s.slug === subjectSlug)
      if (!section) { setLoading(false); return }
      const dbVal = topicDbValue(tagSlug, section.dbTable)
      const base  = createClient().from(section.dbTable).select('*', { count: 'exact', head: true })
      const { count } = isTagArrayTable(section.dbTable)
        ? await base.contains('tags', [dbVal])
        : await base.eq('topic', dbVal)
      setTotalMCQs(count || 0)
      setLoading(false)
    }
    fetchCount()
  }, [examSlug, subjectSlug, tagSlug])

  const handleSetClick = (setNum: number) => {
    const next = tieredSetTableNavigation(setNum, !!user, isPremium)
    if (next === 'require_sign_in') { setShowSignIn(true); return }
    if (next === 'require_premium') { router.push(PREMIUM_PAGE_PATH); return }
    router.push(`/exams/${examSlug}/${subjectSlug}/topic/${tagSlug}/set/${setNum}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  const totalSets    = Math.ceil(totalMCQs / 20)
  const totalBatches = Math.ceil(totalSets / SETS_PER_BATCH)
  const startSet     = (selectedBatch - 1) * SETS_PER_BATCH + 1
  const endSet       = Math.min(selectedBatch * SETS_PER_BATCH, totalSets)
  const setsInBatch  = Array.from({ length: Math.max(0, endSet - startSet + 1) }, (_, i) => startSet + i)

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <NavigationBar />

        <div className="container mx-auto px-4 max-w-7xl pt-3 pb-1">
          <Breadcrumb items={[
            { name: 'Home',                           url: '/' },
            { name: examConfig?.name || examSlug,     url: `/exams/${examSlug}` },
            { name: sectionCfg?.label || subjectSlug, url: `/exams/${examSlug}/${subjectSlug}` },
            { name: topicLabel,                       url: `/exams/${examSlug}/${subjectSlug}/topic/${tagSlug}` },
          ]} />
        </div>

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-1">Topic Practice</p>
            <h1 className="text-xl font-semibold text-gray-900">{topicLabel}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {sectionCfg?.label || subjectSlug}
              {' · '}
              <span className="font-medium text-gray-700">{roundMCQs(totalMCQs)} MCQs</span>
              {totalBatches > 0 && (
                <>{' '}across <span className="font-medium text-gray-700">{totalBatches} batch{totalBatches !== 1 ? 'es' : ''}</span></>
              )}
            </p>
          </div>

          {totalSets === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg font-medium mb-2">No MCQs found for this topic</p>
              <button
                onClick={() => router.push(`/exams/${examSlug}/${subjectSlug}`)}
                className="text-blue-600 text-sm hover:underline"
              >
                ← Back to subject
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              {/* LEFT: Batches */}
              <div className="col-span-4 md:col-span-4 lg:col-span-3">
                <div className="bg-white rounded-xl border border-gray-200 p-3 md:p-4 sticky top-24">
                  <h2 className="font-bold text-sm text-gray-900 mb-1">Batches</h2>
                  <p className="text-[10px] text-gray-500 mb-3">Select a batch</p>
                  <div className="space-y-2 max-h-[560px] overflow-y-auto">
                    {Array.from({ length: totalBatches }, (_, i) => i + 1).map((batchNum) => {
                      const isSelected    = batchNum === selectedBatch
                      const batchStartSet = (batchNum - 1) * SETS_PER_BATCH + 1
                      const batchEndSet   = Math.min(batchNum * SETS_PER_BATCH, totalSets)
                      return (
                        <button
                          key={batchNum}
                          onClick={() => setSelectedBatch(batchNum)}
                          className={`w-full text-left px-2 md:px-4 py-2 md:py-3 rounded-lg transition-all ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-gray-50 text-gray-900 hover:bg-blue-50 border border-transparent hover:border-blue-200'
                          }`}
                        >
                          <div className="font-semibold text-xs md:text-sm">Batch {batchNum}</div>
                          <div className={`text-[10px] md:text-xs mt-0.5 ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                            Sets {batchStartSet}-{batchEndSet}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT: Sets */}
              <div className="col-span-8 md:col-span-8 lg:col-span-9">
                <div className="bg-white rounded-xl border border-gray-200 p-3 md:p-4 max-h-[640px] overflow-y-auto">
                  <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4">
                    Batch {selectedBatch}: Practice Sets
                  </h2>
                  <div className="space-y-2">
                    {setsInBatch.map((setNum) => {
                      const startMCQ    = (setNum - 1) * 20 + 1
                      const endMCQ      = Math.min(setNum * 20, totalMCQs)
                      const needSignIn  = setNum === 3 && !user
                      const needPremium = setNum >= 4 && !isPremium
                      const isSetLocked = needSignIn || needPremium
                      const isCompleted = !isSetLocked && completedSets[setNum] != null
                      const score       = isCompleted ? Math.round(completedSets[setNum]) : null
                      return (
                        <button
                          key={setNum}
                          onClick={() => handleSetClick(setNum)}
                          className={`w-full text-left px-2 md:px-4 py-2 md:py-3 rounded-lg transition-all border ${
                            isSetLocked
                              ? 'bg-gray-50 border-gray-100 cursor-pointer hover:border-gray-200'
                              : isCompleted
                                ? 'bg-emerald-50 border-emerald-100 hover:border-emerald-200 hover:shadow-sm'
                                : 'bg-gray-50 border-transparent hover:bg-blue-50 hover:border-blue-200 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isSetLocked ? 'bg-gray-200' : isCompleted ? 'bg-emerald-500' : 'bg-blue-600'}`}>
                                {isSetLocked
                                  ? <Lock className="w-4 h-4 text-gray-400" />
                                  : isCompleted
                                    ? <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                    : <span className="text-white text-sm font-bold">{setNum}</span>
                                }
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className={`font-semibold text-xs md:text-sm ${isSetLocked ? 'text-gray-400' : isCompleted ? 'text-emerald-800' : 'text-gray-900'}`}>
                                  Set {setNum}
                                  {needSignIn  && <span className="ml-1.5 text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-semibold">Sign In</span>}
                                  {needPremium && <span className="ml-1.5 text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-semibold">Premium</span>}
                                </div>
                                <div className="text-[10px] md:text-xs text-gray-400 mt-0.5">
                                  {isSetLocked
                                    ? (needSignIn ? 'Sign in free to unlock' : 'Premium required')
                                    : isCompleted
                                      ? `Completed · ${score}% score`
                                      : `Q ${startMCQ}-${endMCQ} · 20 MCQs`
                                  }
                                </div>
                              </div>
                            </div>
                            {isSetLocked
                              ? <span className="text-[10px] text-gray-400 font-medium bg-gray-100 px-2 py-0.5 rounded-full">Unlock</span>
                              : isCompleted
                                ? <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 flex-shrink-0" />
                                : <Play className="w-4 h-4 md:w-5 md:h-5 text-blue-600 fill-current flex-shrink-0" />
                            }
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isPremium && totalSets > 0 && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-blue-900">
                  {!user ? 'Sign in free to unlock Set 3 · Premium unlocks everything' : 'Set 4+ requires Premium'}
                </p>
                <p className="text-xs text-blue-600 mt-0.5">Unlimited sets, all mock tests, and solved papers</p>
              </div>
              <button
                onClick={() => user ? router.push(PREMIUM_PAGE_PATH) : setShowSignIn(true)}
                className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                {user ? 'Upgrade' : 'Sign In'}
              </button>
            </div>
          )}
        </div>
      </div>

      <SignInPopup isOpen={showSignIn} onClose={() => setShowSignIn(false)} message="Sign in to access more practice sets" />
    </>
  )
}
