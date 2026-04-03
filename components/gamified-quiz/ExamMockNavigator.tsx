'use client'

export interface ExamSectionSlice {
  key: string
  label: string
  dotClass: string
  start: number
  count: number
}

interface ExamMockNavigatorProps {
  total: number
  currentIndex: number
  /** Indices that have any answer selected */
  answeredIndices: Set<number> | number[]
  /** Optional flagged indices */
  flaggedIndices?: Set<number> | number[]
  onJump: (index: number) => void
  /** If omitted, renders a flat grid */
  sections?: ExamSectionSlice[]
  className?: string
}

function toSet(x: Set<number> | number[] | undefined): Set<number> {
  if (!x) return new Set()
  return x instanceof Set ? x : new Set(x)
}

export function ExamMockNavigator({
  total,
  currentIndex,
  answeredIndices,
  flaggedIndices,
  onJump,
  sections,
  className = '',
}: ExamMockNavigatorProps) {
  const answered = toSet(answeredIndices)
  const flagged = toSet(flaggedIndices)

  const renderCell = (gIdx: number) => {
    const isCurrent = gIdx === currentIndex
    const isDone = answered.has(gIdx)
    const isFlag = flagged.has(gIdx)
    return (
      <button
        key={gIdx}
        type="button"
        onClick={() => onJump(gIdx)}
        title={`Question ${gIdx + 1}`}
        className={`flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-semibold tabular-nums transition-all sm:h-8 sm:w-8 sm:text-[11px] ${
          isCurrent
            ? 'bg-indigo-600 text-white ring-2 ring-indigo-300 ring-offset-1'
            : isFlag
              ? 'bg-amber-400 text-white hover:bg-amber-500'
              : isDone
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        }`}
      >
        {gIdx + 1}
      </button>
    )
  }

  return (
    <div className={`flex w-full flex-col ${className}`}>
      <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-widest text-slate-500">
        Question map
      </p>
      <p className="mb-3 text-center text-[10px] text-slate-400">
        <span className="inline-flex items-center gap-1">
          <span className="h-2 w-2 rounded-sm bg-indigo-600" /> Current
        </span>
        <span className="mx-2">·</span>
        <span className="inline-flex items-center gap-1">
          <span className="h-2 w-2 rounded-sm bg-emerald-500" /> Answered
        </span>
        {flagged.size > 0 ? (
          <>
            <span className="mx-2">·</span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm bg-amber-400" /> Flagged
            </span>
          </>
        ) : null}
      </p>

      {sections && sections.length > 0 ? (
        <div className="max-h-[min(52vh,420px)] space-y-3 overflow-y-auto pr-1">
          {sections.map((sec) => (
            <div key={sec.key}>
              <div className="mb-1.5 flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${sec.dotClass}`} />
                <span className="text-[10px] font-medium text-slate-500">{sec.label}</span>
              </div>
              <div className="flex flex-wrap gap-1">{Array.from({ length: sec.count }, (_, i) => renderCell(sec.start + i))}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex max-h-[min(52vh,420px)] flex-wrap content-start gap-1 overflow-y-auto pr-1">
          {Array.from({ length: total }, (_, gIdx) => renderCell(gIdx))}
        </div>
      )}
    </div>
  )
}
