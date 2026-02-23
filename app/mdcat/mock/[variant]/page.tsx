'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Play, Clock, FileText, CheckCircle, AlertTriangle, Lock } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'

const VARIANT_META: Record<string, {
  name: string; badge: string; desc: string
  total: number; duration: string; passMark: string
  negative: boolean; maxMocks: number
  headerBg: string; badgeBg: string
  accentBorder: string; accentHover: string; accentBg: string
  activeBatchBg: string; playHover: string
}> = {
  pmc: {
    name: 'PMC National MDCAT', badge: 'All Provinces', desc: 'UHS · SIBA · BUMHS · SZABMU',
    total: 180, duration: '3 hrs', passMark: '65%', negative: false, maxMocks: 73,
    headerBg: 'from-blue-700 to-blue-900', badgeBg: 'bg-blue-100 text-blue-700',
    accentBorder: 'border-blue-100', accentHover: 'hover:border-blue-300 hover:bg-blue-50',
    accentBg: 'bg-slate-50', activeBatchBg: 'bg-blue-600', playHover: 'group-hover:text-blue-600',
  },
  etea: {
    name: 'ETEA / KMU MDCAT', badge: 'KPK Province', desc: 'Khyber Pakhtunkhwa · KMU',
    total: 200, duration: '2h 30m', passMark: '60%', negative: true, maxMocks: 46,
    headerBg: 'from-emerald-700 to-teal-900', badgeBg: 'bg-emerald-100 text-emerald-700',
    accentBorder: 'border-emerald-100', accentHover: 'hover:border-emerald-300 hover:bg-emerald-50',
    accentBg: 'bg-slate-50', activeBatchBg: 'bg-emerald-600', playHover: 'group-hover:text-emerald-600',
  },
  nums: {
    name: 'NUMS MDCAT', badge: 'Military Colleges', desc: 'CMH · AMC · Pak Navy · Air Force',
    total: 150, duration: '2h 45m', passMark: '55%', negative: false, maxMocks: 61,
    headerBg: 'from-slate-700 to-slate-900', badgeBg: 'bg-slate-200 text-slate-700',
    accentBorder: 'border-slate-200', accentHover: 'hover:border-slate-400 hover:bg-slate-100',
    accentBg: 'bg-slate-50', activeBatchBg: 'bg-slate-700', playHover: 'group-hover:text-slate-600',
  },
  aku: {
    name: 'AKU Entry Test', badge: 'Private · Prestigious', desc: 'Aga Khan University · Karachi',
    total: 100, duration: '2h 15m', passMark: '70%', negative: false, maxMocks: 46,
    headerBg: 'from-rose-700 to-rose-900', badgeBg: 'bg-rose-100 text-rose-700',
    accentBorder: 'border-rose-100', accentHover: 'hover:border-rose-300 hover:bg-rose-50',
    accentBg: 'bg-slate-50', activeBatchBg: 'bg-rose-600', playHover: 'group-hover:text-rose-600',
  },
  // Legacy alias
  provincial: {
    name: 'PMC National MDCAT', badge: 'All Provinces', desc: 'UHS · SIBA · BUMHS · SZABMU',
    total: 180, duration: '3 hrs', passMark: '65%', negative: false, maxMocks: 73,
    headerBg: 'from-blue-700 to-blue-900', badgeBg: 'bg-blue-100 text-blue-700',
    accentBorder: 'border-blue-100', accentHover: 'hover:border-blue-300 hover:bg-blue-50',
    accentBg: 'bg-slate-50', activeBatchBg: 'bg-blue-600', playHover: 'group-hover:text-blue-600',
  },
}

const MOCKS_PER_BATCH = 10

export default function MDCATMockListingPage() {
  const params  = useParams()
  const router  = useRouter()
  const variant = params.variant as string
  const meta    = VARIANT_META[variant]

  const [selectedBatch, setSelectedBatch] = useState(1)

  if (!meta) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <button onClick={() => router.push('/mdcat')} className="text-blue-600 hover:text-blue-800">
          ← Back to MDCAT
        </button>
      </div>
    )
  }

  const totalBatches = Math.ceil(meta.maxMocks / MOCKS_PER_BATCH)
  const startMock    = (selectedBatch - 1) * MOCKS_PER_BATCH + 1
  const endMock      = Math.min(selectedBatch * MOCKS_PER_BATCH, meta.maxMocks)
  const mocksInBatch = Array.from({ length: endMock - startMock + 1 }, (_, i) => startMock + i)

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar showCenterNav={false} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">

        {/* Back */}
        <button
          onClick={() => router.push('/mdcat')}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          MDCAT
        </button>

        {/* Header banner */}
        <div className={`bg-gradient-to-r ${meta.headerBg} rounded-2xl p-5 sm:p-6 mb-6 shadow-lg`}>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-0.5">{meta.name}</h1>
              <p className="text-white/60 text-sm">{meta.desc}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${meta.badgeBg}`}>
                {meta.badge}
              </span>
              {meta.negative && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-500/20 text-red-100 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> −ve Marking
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <strong className="text-white">{meta.total}</strong> MCQs per test
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {meta.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-300" />
              Pass: {meta.passMark}
            </span>
            <span className="ml-auto text-white font-semibold text-sm">
              {meta.maxMocks} Mock Tests Available
            </span>
          </div>
        </div>

        {/* Batch selector — horizontal scroll on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 md:hidden">
          {Array.from({ length: totalBatches }, (_, i) => i + 1).map((batchNum) => {
            const isSelected = batchNum === selectedBatch
            return (
              <button
                key={batchNum}
                onClick={() => setSelectedBatch(batchNum)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected ? `${meta.activeBatchBg} text-white shadow-sm` : 'bg-white border border-slate-200 text-slate-700'
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
              <p className="text-[10px] text-slate-400 mb-3">10 mocks each</p>
              <div className="space-y-1.5 max-h-[520px] overflow-y-auto">
                {Array.from({ length: totalBatches }, (_, i) => i + 1).map((batchNum) => {
                  const isSelected = batchNum === selectedBatch
                  const bStart     = (batchNum - 1) * MOCKS_PER_BATCH + 1
                  const bEnd       = Math.min(batchNum * MOCKS_PER_BATCH, meta.maxMocks)
                  return (
                    <button
                      key={batchNum}
                      onClick={() => setSelectedBatch(batchNum)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all text-sm ${
                        isSelected
                          ? `${meta.activeBatchBg} text-white shadow-md`
                          : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border border-transparent hover:border-slate-200'
                      }`}
                    >
                      <div className="font-semibold text-xs">Batch {batchNum}</div>
                      <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-white/70' : 'text-slate-400'}`}>
                        Mocks {bStart}–{bEnd}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mocks panel */}
          <div className="col-span-12 md:col-span-9">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <h2 className="font-bold text-slate-900 mb-0.5">Batch {selectedBatch} — Mock Tests</h2>
              <p className="text-xs text-slate-400 mb-4">
                {meta.total} MCQs · {meta.duration} · Unique non-overlapping questions per mock
              </p>
              <div className="space-y-2">
                {mocksInBatch.map((mockNum) => {
                  const isSignIn  = mockNum === 2
                  const isPremium = mockNum >= 3
                  const isLocked  = isSignIn || isPremium
                  return (
                    <button
                      key={mockNum}
                      onClick={() => router.push(`/mdcat/mock/${variant}/${mockNum}`)}
                      className={`w-full text-left px-4 py-3 rounded-xl border hover:shadow-sm transition-all group ${
                        isLocked
                          ? 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                          : `${meta.accentBorder} ${meta.accentBg} ${meta.accentHover}`
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isLocked ? 'bg-slate-300' : `bg-gradient-to-br ${meta.headerBg}`
                          }`}>
                            {isLocked
                              ? <Lock className="w-4 h-4 text-white" />
                              : <span className="text-white text-sm font-bold">{mockNum}</span>
                            }
                          </div>
                          <div>
                            <p className={`font-semibold text-sm ${isLocked ? 'text-slate-500' : 'text-slate-900'}`}>
                              Mock Test {mockNum}
                              {isSignIn && <span className="ml-2 text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-semibold">Sign In</span>}
                              {isPremium && <span className="ml-2 text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-semibold">Premium</span>}
                            </p>
                            <p className="text-xs text-slate-400">{meta.total} MCQs · {meta.duration}</p>
                          </div>
                        </div>
                        {isLocked
                          ? <Lock className="w-4 h-4 text-slate-300 flex-shrink-0" />
                          : <Play className={`w-4 h-4 text-slate-300 ${meta.playHover} fill-current transition-colors flex-shrink-0`} />
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
    </div>
  )
}
