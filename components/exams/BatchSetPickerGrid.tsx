'use client'

import type { ReactNode } from 'react'

type BatchSetPickerGridProps = {
  totalBatches: number
  totalSets: number
  selectedBatch: number
  onSelectBatch: (batch: number) => void
  setsPerBatch?: number
  children: ReactNode
}

/** Batch sidebar + set list. Mobile: horizontal batch chips, full-width sets. Desktop: 2-column layout. */
export default function BatchSetPickerGrid({
  totalBatches,
  totalSets,
  selectedBatch,
  onSelectBatch,
  setsPerBatch = 10,
  children,
}: BatchSetPickerGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
      <div className="lg:col-span-3">
        <div className="rounded-xl border border-gray-200 bg-white p-3 md:p-4 lg:sticky lg:top-24">
          <h2 className="mb-1 text-sm font-bold text-gray-900">Batches</h2>
          <p className="mb-3 text-[10px] text-gray-500">Select a batch</p>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:max-h-[560px] lg:flex-col lg:space-y-2 lg:overflow-y-auto lg:px-0 lg:pb-0">
            {Array.from({ length: totalBatches }, (_, i) => i + 1).map((batchNum) => {
              const isSelected = batchNum === selectedBatch
              const batchStartSet = (batchNum - 1) * setsPerBatch + 1
              const batchEndSet = Math.min(batchNum * setsPerBatch, totalSets)
              return (
                <button
                  key={batchNum}
                  type="button"
                  onClick={() => onSelectBatch(batchNum)}
                  className={`shrink-0 rounded-lg px-3 py-2.5 text-left transition-all lg:w-full lg:px-4 lg:py-3 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'border border-transparent bg-gray-50 text-gray-900 hover:border-blue-200 hover:bg-blue-50'
                  }`}
                >
                  <div className="whitespace-nowrap text-xs font-semibold md:text-sm">Batch {batchNum}</div>
                  <div className={`mt-0.5 text-[10px] md:text-xs ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                    Sets {batchStartSet}-{batchEndSet}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="lg:col-span-9">
        <div className="rounded-xl border border-gray-200 bg-white p-3 md:p-4 lg:max-h-[640px] lg:overflow-y-auto">
          <h2 className="mb-4 text-base font-bold text-gray-900 md:text-lg">
            Batch {selectedBatch}: Practice Sets
          </h2>
          <div className="space-y-2">{children}</div>
        </div>
      </div>
    </div>
  )
}

export function setMcqRangeLabel(setNum: number, totalMCQs: number, mcqsPerSet = 20) {
  const startMCQ = (setNum - 1) * mcqsPerSet + 1
  const endMCQ = Math.min(setNum * mcqsPerSet, totalMCQs)
  const count = endMCQ - startMCQ + 1
  return `Q ${startMCQ}-${endMCQ} · ${count} MCQ${count !== 1 ? 's' : ''}`
}
