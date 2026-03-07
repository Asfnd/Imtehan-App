'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle2, XCircle, Lightbulb } from 'lucide-react'
import { useAuth } from '@/lib/contexts/AuthContext'
import SignInPopup from '@/components/auth/SignInPopup'

interface MCQ {
  id: number
  question: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  explanation?: string
  topic?: string
  subtopic?: string
}

interface Props {
  mcqs: MCQ[]
  subject: string
  subjectName: string
  subjectGradient: string
  difficulty: string  // could be 'easy'/'medium'/'hard' OR an actual topic name
  setNumber: number
  totalSets?: number  // if provided, "Next Set" is hidden on the last set
  theme?: 'blue' | 'green'
  backPath?: string  // optional back URL override
}

type AnswerState = 'default' | 'selected' | 'correct' | 'wrong' | 'dimmed'

const OPTION_STYLES: Record<AnswerState, string> = {
  default:  'border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer',
  selected: 'border-blue-500 bg-blue-50 cursor-pointer',
  correct:  'border-green-500 bg-green-50 cursor-default',
  wrong:    'border-red-500 bg-red-50 cursor-default',
  dimmed:   'border-gray-200 bg-gray-50 opacity-50 cursor-default',
}

const BADGE_STYLES: Record<AnswerState, string> = {
  default:  'bg-gray-100 text-gray-600',
  selected: 'bg-blue-600 text-white',
  correct:  'bg-green-500 text-white',
  wrong:    'bg-red-500 text-white',
  dimmed:   'bg-gray-100 text-gray-400',
}

function getOptionState(opt: string, userAnswer: string | undefined, correct: string, revealed: boolean): AnswerState {
  if (!userAnswer) return 'default'
  if (!revealed) return opt === userAnswer ? 'selected' : 'default'
  if (opt === correct) return 'correct'
  if (opt === userAnswer) return 'wrong'
  return 'dimmed'
}

const THEME = {
  blue: {
    pageBg:      'from-slate-50 via-blue-50 to-indigo-50',
    header:      'from-slate-800 via-blue-900 to-slate-800 border-blue-500/30',
    progress:    'from-blue-400 to-blue-600',
    badge:       'bg-blue-500/20 text-blue-200 border-blue-500/30',
    optHover:    'hover:border-blue-400 hover:bg-blue-50/50',
    btn:         'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
    qBadge:      'from-blue-600 to-blue-700',
    resultIcon:  'from-blue-600 to-blue-700',
    resultScore: 'bg-blue-50 border-blue-200',
    resultText:  'text-blue-700',
    resultSub:   'text-blue-600',
  },
  green: {
    pageBg:      'from-slate-50 via-emerald-50 to-teal-50',
    header:      'from-slate-800 via-emerald-900 to-slate-800 border-emerald-500/30',
    progress:    'from-emerald-400 to-emerald-600',
    badge:       'bg-emerald-500/20 text-emerald-200 border-emerald-500/30',
    optHover:    'hover:border-emerald-400 hover:bg-emerald-50/50',
    btn:         'from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800',
    qBadge:      'from-emerald-600 to-emerald-700',
    resultIcon:  'from-emerald-600 to-emerald-700',
    resultScore: 'bg-emerald-50 border-emerald-200',
    resultText:  'text-emerald-700',
    resultSub:   'text-emerald-600',
  },
}

export default function MDCATSetQuiz({ mcqs, subject, subjectName, difficulty, setNumber, totalSets, theme = 'blue', backPath }: Props) {
  const router  = useRouter()
  const t       = THEME[theme]
  const backUrl = backPath ?? `/mdcat/${subject}/${encodeURIComponent(difficulty)}`

  const { user, loading: authLoading } = useAuth()
  const isPremium = !!user?.user_metadata?.is_premium

  const [showSignIn, setShowSignIn] = useState(false)

  // Access gate: sets 1-2 = free, set 3 = sign-in required, set 4+ = premium page
  useEffect(() => {
    if (authLoading) return
    if (setNumber >= 4 && !isPremium) {
      router.replace('/premium')
    } else if (setNumber === 3 && !user) {
      setShowSignIn(true)
    }
  }, [authLoading, user, isPremium, setNumber])

  const [currentIndex, setCurrentIndex]   = useState(0)
  const [answers, setAnswers]             = useState<Record<number, string>>({})
  const [showResults, setShowResults]     = useState(false)
  const [reviewMode, setReviewMode]       = useState(false)
  const [reviewMCQs, setReviewMCQs]       = useState<MCQ[]>([])
  const [originalScore, setOriginalScore] = useState<{ correct: number; total: number } | null>(null)

  const activeMCQs = reviewMode ? reviewMCQs : mcqs

  // Guard: parent page should prevent this, but protect against empty data
  if (!activeMCQs || activeMCQs.length === 0) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${t.pageBg} flex items-center justify-center`}>
        <div className="text-center">
          <p className="text-slate-500 mb-4">No questions available for this set.</p>
          <button onClick={() => router.push(backUrl)} className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            ← Back to Sets
          </button>
        </div>
      </div>
    )
  }

  const handleAnswer = useCallback((opt: string) => {
    setAnswers(prev => ({ ...prev, [currentIndex]: opt }))
  }, [currentIndex])

  const score      = Object.entries(answers).filter(([i, a]) => a === activeMCQs[+i]?.correct_answer).length
  const currentMCQ = activeMCQs[currentIndex]
  const userAnswer = answers[currentIndex]
  const topicLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1)

  // Results screen
  if (showResults) {
    const pct       = ((score / activeMCQs.length) * 100).toFixed(1)
    const wrongMCQs = activeMCQs.filter((mcq, i) => answers[i] && answers[i] !== mcq.correct_answer)

    return (
      <div className={`min-h-screen bg-gradient-to-br ${t.pageBg} flex items-center justify-center p-4`}>
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6">
          <div className="text-center mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${t.resultIcon} mx-auto mb-3 flex items-center justify-center shadow-lg`}>
              <span className="text-white text-xl font-bold">{pct}%</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-0.5">
              {reviewMode ? 'Mistakes Review' : 'Set Complete!'}
            </h2>
            <p className="text-slate-400 text-sm">
              {subjectName} · Set {setNumber}
              {originalScore && (
                <span className="text-amber-600"> · Original {((originalScore.correct / originalScore.total) * 100).toFixed(0)}%</span>
              )}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-green-700">{score}</div>
              <div className="text-xs text-green-600 mt-0.5">Correct</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-red-600">{activeMCQs.length - score}</div>
              <div className="text-xs text-red-600 mt-0.5">Wrong</div>
            </div>
            <div className={`${t.resultScore} border rounded-xl p-3 text-center`}>
              <div className={`text-2xl font-bold ${t.resultText}`}>{pct}%</div>
              <div className={`text-xs ${t.resultSub} mt-0.5`}>Score</div>
            </div>
          </div>

          <div className="space-y-2.5">
            {wrongMCQs.length > 0 && !reviewMode && (
              <button
                onClick={() => {
                  setOriginalScore({ correct: score, total: mcqs.length })
                  setReviewMCQs(wrongMCQs)
                  setReviewMode(true)
                  setCurrentIndex(0)
                  setAnswers({})
                  setShowResults(false)
                }}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition-colors"
              >
                Practice Mistakes ({wrongMCQs.length} MCQs)
              </button>
            )}
            {(!totalSets || setNumber < totalSets) && (
              <button
                onClick={() => router.push(`${backUrl}/set/${setNumber + 1}`)}
                className={`w-full bg-gradient-to-r ${t.btn} text-white py-3 rounded-xl font-semibold transition-all`}
              >
                Next Set →
              </button>
            )}
            <button
              onClick={() => router.push(backUrl)}
              className="w-full border-2 border-slate-200 text-slate-600 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
            >
              Back to Sets
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${t.pageBg} py-2 px-2 sm:px-4`}>
      {/* Access gate popups */}
      <SignInPopup
        isOpen={showSignIn}
        onClose={() => { setShowSignIn(false); router.push(backUrl) }}
      />
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className={`bg-gradient-to-r ${t.header} border rounded-2xl p-3 sm:p-4 mb-3 shadow-lg`}>
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => router.push(backUrl)}
              className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {subjectName}
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${t.badge} max-w-[140px] truncate`}>
                {topicLabel}
              </span>
              <span className="text-white/50 text-xs">{currentIndex + 1}/{activeMCQs.length}</span>
            </div>
          </div>

          <p className="text-white/80 text-sm font-medium mb-2">Set {setNumber}</p>

          <div className="bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div
              className={`bg-gradient-to-r ${t.progress} h-full transition-all duration-300`}
              style={{ width: `${((currentIndex + 1) / activeMCQs.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 mb-3 border-2 border-gray-100">
          {(currentMCQ.topic || currentMCQ.subtopic) && (
            <div className="flex items-center gap-1.5 mb-3 flex-wrap">
              <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${t.qBadge} flex items-center justify-center flex-shrink-0`}>
                <span className="text-white text-[9px] font-bold">Q</span>
              </div>
              {currentMCQ.topic && (
                <span className="text-xs text-slate-400 truncate max-w-[180px]">{currentMCQ.topic}</span>
              )}
              {currentMCQ.subtopic && (
                <>
                  <span className="text-slate-200">·</span>
                  <span className="text-xs text-slate-300 truncate max-w-[140px]">{currentMCQ.subtopic}</span>
                </>
              )}
            </div>
          )}

          <p className="text-slate-900 text-base sm:text-lg font-medium mb-5 leading-relaxed">
            {currentMCQ.question}
          </p>

          <div className="space-y-2.5">
            {(['A', 'B', 'C', 'D'] as const).map(opt => {
              const state   = getOptionState(opt, userAnswer, currentMCQ.correct_answer, reviewMode)
              const optText = currentMCQ[`option_${opt.toLowerCase()}` as keyof MCQ] as string
              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  disabled={reviewMode}
                  className={`w-full flex items-start gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${OPTION_STYLES[state].replace('hover:border-blue-400 hover:bg-blue-50/50', t.optHover)}`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm border-2 border-current ${BADGE_STYLES[state]}`}>
                    {opt}
                  </span>
                  <span className="flex-1 text-slate-800">{optText}</span>
                  {state === 'correct' && <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />}
                  {state === 'wrong'   && <XCircle      className="w-5 h-5 text-red-500 flex-shrink-0"   />}
                </button>
              )
            })}
          </div>

          {/* Explanation — only in review mode */}
          {reviewMode && userAnswer && currentMCQ.explanation && (
            <div className="mt-4 p-3.5 rounded-xl border-2 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
                <p className="text-sm leading-relaxed text-blue-900">{currentMCQ.explanation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-2.5">
          <button
            onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
            className="flex-1 bg-white border-2 border-slate-200 text-slate-700 py-3 px-4 rounded-xl font-semibold disabled:opacity-40 hover:bg-slate-50 transition-colors"
          >
            Previous
          </button>
          {currentIndex < activeMCQs.length - 1 ? (
            <button
              onClick={() => setCurrentIndex(i => i + 1)}
              disabled={!userAnswer}
              className={`flex-1 bg-gradient-to-r ${t.btn} text-white py-3 px-4 rounded-xl font-semibold transition-all disabled:opacity-40`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => setShowResults(true)}
              disabled={!userAnswer}
              className={`flex-1 bg-gradient-to-r ${t.btn} text-white py-3 px-4 rounded-xl font-semibold transition-all disabled:opacity-40`}
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
