'use client'

interface CriterionScore {
  score: number
  max: number
  comment: string
}

interface ScoreCardProps {
  score: number
  grade: string
  breakdown: Record<string, CriterionScore>
  overallFeedback: string
  missingPoints?: string[]
  mode?: 'essay' | 'long-answer'
  marks?: number
}

const CRITERION_LABELS: Record<string, string> = {
  content: 'Content & Knowledge',
  analysis: 'Critical Analysis',
  structure: 'Structure & Organization',
  language: 'Language & Expression',
}

const GRADE_STYLE: Record<string, string> = {
  A: 'bg-green-50 text-green-700 border-green-200',
  B: 'bg-blue-50 text-blue-700 border-blue-200',
  C: 'bg-amber-50 text-amber-700 border-amber-200',
  D: 'bg-orange-50 text-orange-700 border-orange-200',
  F: 'bg-red-50 text-red-700 border-red-200',
}

function CircularProgress({ percentage, grade }: { percentage: number; grade: string }) {
  const r = 44
  const stroke = 6
  const nr = r - stroke / 2
  const circ = 2 * Math.PI * nr
  const offset = circ - (percentage / 100) * circ
  const color = percentage >= 70 ? '#22c55e' : percentage >= 50 ? '#f59e0b' : '#ef4444'

  return (
    <div className="relative inline-flex items-center justify-center flex-shrink-0">
      <svg width={r * 2} height={r * 2} className="-rotate-90">
        <circle cx={r} cy={r} r={nr} fill="none" stroke="#f1f5f9" strokeWidth={stroke} />
        <circle
          cx={r} cy={r} r={nr} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center leading-none">
        <span className="text-xl font-black text-gray-900">{percentage}%</span>
        <span className="text-[11px] font-bold text-gray-400 mt-0.5">{grade}</span>
      </div>
    </div>
  )
}

export default function ScoreCard({ score, grade, breakdown, overallFeedback, missingPoints, mode, marks }: ScoreCardProps) {
  const totalMax = mode === 'long-answer' && marks ? marks : 100
  const percentage = Math.round((score / totalMax) * 100)

  return (
    <div className="space-y-3">
      {/* Overall score */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-5">
        <CircularProgress percentage={percentage} grade={grade} />
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Overall Score</p>
          <p className="text-3xl font-black text-gray-900 leading-none">
            {score}<span className="text-lg text-gray-300 font-normal">/{totalMax}</span>
          </p>
          <span className={`inline-block mt-2 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${GRADE_STYLE[grade] || GRADE_STYLE['F']}`}>
            Grade {grade}
          </span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold mb-4">Breakdown</p>
        <div className="space-y-4">
          {Object.entries(breakdown).map(([key, val]) => {
            const pct = Math.round((val.score / val.max) * 100)
            const bar = pct >= 70 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-400' : 'bg-red-400'
            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-700">{CRITERION_LABELS[key] || key}</span>
                  <span className="text-sm font-bold text-gray-900 tabular-nums">
                    {val.score}<span className="text-gray-300 font-normal">/{val.max}</span>
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${bar} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{val.comment}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Examiner note */}
      <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4">
        <p className="text-[11px] text-blue-400 uppercase tracking-widest font-semibold mb-2">Examiner's Note</p>
        <p className="text-sm text-blue-900 leading-relaxed">{overallFeedback}</p>
      </div>

      {/* Missing points */}
      {missingPoints && missingPoints.length > 0 && (
        <div className="bg-amber-50 rounded-2xl border border-amber-100 p-4">
          <p className="text-[11px] text-amber-500 uppercase tracking-widest font-semibold mb-2">Missing Points</p>
          <ul className="space-y-1.5">
            {missingPoints.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-amber-900">
                <span className="text-amber-300 mt-0.5 flex-shrink-0">·</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
