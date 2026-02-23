'use client'

interface WordCount {
  submitted: number
  original: number
  target: number
  passed: boolean
}

interface Rule {
  rule: string
  passed: boolean
  comment: string
}

interface PrecisChecklistProps {
  score: number
  grade: string
  wordCount: WordCount
  rules: Rule[]
  missedKeyPoints?: string[]
  overallFeedback: string
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

export default function PrecisChecklist({
  score,
  grade,
  wordCount,
  rules,
  missedKeyPoints,
  overallFeedback
}: PrecisChecklistProps) {
  const passedCount = rules.filter(r => r.passed).length
  const percentage = Math.round(score)
  const deviation = wordCount.submitted - wordCount.target
  const deviationPct = Math.abs(Math.round((deviation / wordCount.target) * 100))

  return (
    <div className="space-y-3">
      {/* Overall score */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-5">
        <CircularProgress percentage={percentage} grade={grade} />
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Précis Score</p>
          <p className="text-3xl font-black text-gray-900 leading-none">
            {score}<span className="text-lg text-gray-300 font-normal">/100</span>
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${GRADE_STYLE[grade] || GRADE_STYLE['F']}`}>
              Grade {grade}
            </span>
            <span className="text-[11px] text-gray-400">{passedCount}/{rules.length} rules passed</span>
          </div>
        </div>
      </div>

      {/* Word Count */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold mb-4">Word Count</p>
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <div className="text-xl font-black text-gray-900">{wordCount.original}</div>
            <div className="text-[11px] text-gray-400 mt-0.5 font-medium">Original</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-xl">
            <div className="text-xl font-black text-blue-700">{wordCount.target}</div>
            <div className="text-[11px] text-blue-400 mt-0.5 font-medium">Target (⅓)</div>
          </div>
          <div className={`text-center p-3 rounded-xl ${wordCount.passed ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className={`text-xl font-black ${wordCount.passed ? 'text-green-700' : 'text-red-700'}`}>
              {wordCount.submitted}
            </div>
            <div className={`text-[11px] mt-0.5 font-medium ${wordCount.passed ? 'text-green-400' : 'text-red-400'}`}>
              Submitted
            </div>
          </div>
        </div>

        {/* Word count bar */}
        <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-green-100 rounded-full"
            style={{
              left: `${Math.max(0, ((wordCount.target * 0.95) / wordCount.original) * 100)}%`,
              width: `${Math.min(100, ((wordCount.target * 0.1) / wordCount.original) * 100)}%`
            }}
          />
          <div
            className={`absolute h-full rounded-full transition-all duration-700 ${wordCount.passed ? 'bg-green-500' : 'bg-red-400'}`}
            style={{ width: `${Math.min(100, (wordCount.submitted / wordCount.original) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
          <span>0</span>
          <span className="text-green-600 font-semibold">Target ±5%</span>
          <span>{wordCount.original}</span>
        </div>

        {!wordCount.passed && (
          <p className="text-xs text-red-500 mt-2 font-medium">
            {deviation > 0
              ? `${Math.abs(deviation)} words over target (${deviationPct}% excess)`
              : `${Math.abs(deviation)} words under target (${deviationPct}% short)`}
          </p>
        )}
      </div>

      {/* Rules Checklist */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold mb-4">Précis Rules</p>
        <div className="space-y-2.5">
          {rules.map((rule, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 p-3 rounded-xl ${
                rule.passed ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] font-black mt-0.5 ${
                rule.passed ? 'bg-green-500' : 'bg-red-400'
              }`}>
                {rule.passed ? '✓' : '✗'}
              </div>
              <div>
                <p className={`text-sm font-semibold ${rule.passed ? 'text-green-800' : 'text-red-800'}`}>
                  {rule.rule}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{rule.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Examiner note */}
      <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4">
        <p className="text-[11px] text-blue-400 uppercase tracking-widest font-semibold mb-2">Examiner's Note</p>
        <p className="text-sm text-blue-900 leading-relaxed">{overallFeedback}</p>
      </div>

      {/* Missed key points */}
      {missedKeyPoints && missedKeyPoints.length > 0 && (
        <div className="bg-amber-50 rounded-2xl border border-amber-100 p-4">
          <p className="text-[11px] text-amber-500 uppercase tracking-widest font-semibold mb-2">Missed Key Points</p>
          <ul className="space-y-1.5">
            {missedKeyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-amber-900">
                <span className="text-amber-300 mt-0.5 flex-shrink-0">·</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
