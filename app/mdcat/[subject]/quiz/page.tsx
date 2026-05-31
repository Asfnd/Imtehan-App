'use client'

import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState, useRef, Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, BookOpen, CheckCircle2, XCircle, Lightbulb, Zap, Target, Flame } from 'lucide-react'
import { saveQuizResults } from '@/lib/analytics'
import FeedbackPopup from '@/components/FeedbackPopup'
import { registerQuizCompletion, recordFeedbackAction } from '@/lib/feedbackPrompt'

const SUBJECT_CONFIG: Record<string, { name: string; table: string; color: string; totalRows: number }> = {
  'biology':           { name: 'Biology',          table: 'mdcat_biology',           color: 'from-green-600 to-emerald-700', totalRows: 5944 },
  'chemistry':         { name: 'Chemistry',        table: 'mdcat_chemistry',         color: 'from-purple-600 to-violet-700', totalRows: 6218 },
  'physics':           { name: 'Physics',          table: 'mdcat_physics',           color: 'from-blue-600 to-indigo-700',   totalRows: 4695 },
  'english':           { name: 'English',          table: 'mdcat_english',           color: 'from-amber-600 to-orange-700',  totalRows: 925  },
  'logical-reasoning': { name: 'Logical Reasoning',table: 'mdcat_logical_reasoning', color: 'from-rose-600 to-pink-700',    totalRows: 1180 },
}

const DIFFICULTY_META: Record<string, { label: string; icon: typeof Zap; badgeBg: string; badgeText: string }> = {
  Easy:   { label: 'Easy Practice',   icon: Zap,    badgeBg: 'bg-green-100', badgeText: 'text-green-700' },
  Medium: { label: 'Medium Practice', icon: Target, badgeBg: 'bg-amber-100', badgeText: 'text-amber-700' },
  Hard:   { label: 'Hard Practice',   icon: Flame,  badgeBg: 'bg-red-100',   badgeText: 'text-red-700'   },
}

interface MCQ {
  id: number
  question: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  explanation: string
  difficulty: string
  topic: string
  subtopic?: string
}

type AnswerState = 'default' | 'correct' | 'wrong' | 'dimmed'

function getOptionState(opt: string, userAnswer: string | undefined, correct: string): AnswerState {
  if (!userAnswer) return 'default'
  if (opt === correct) return 'correct'
  if (opt === userAnswer) return 'wrong'
  return 'dimmed'
}

const OPTION_STYLES: Record<AnswerState, string> = {
  default: 'border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 cursor-pointer',
  correct: 'border-green-500 bg-green-50 cursor-default',
  wrong:   'border-red-500 bg-red-50 cursor-default',
  dimmed:  'border-gray-200 bg-gray-50 opacity-50 cursor-default',
}

const BADGE_STYLES: Record<AnswerState, string> = {
  default: 'bg-gray-100 text-gray-600',
  correct: 'bg-green-500 text-white',
  wrong:   'bg-red-500 text-white',
  dimmed:  'bg-gray-100 text-gray-400',
}

async function fetchDifficultyMCQs(table: string, difficulty: string, totalRows: number): Promise<MCQ[]> {
  const supabase = createClient()
  const fetchCount = 100
  const maxOffset = Math.max(0, Math.floor(totalRows * 0.8)) // search across first 80% of IDs
  const randomStartId = Math.floor(Math.random() * maxOffset)

  const { data } = await supabase
    .from(table)
    .select('id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty, topic, subtopic')
    .eq('difficulty', difficulty)
    .gte('id', randomStartId)
    .limit(fetchCount)

  if ((data || []).length >= 30) {
    return (data as MCQ[]).sort(() => Math.random() - 0.5).slice(0, 30)
  }

  // Fallback: fetch from beginning if not enough at random offset
  const { data: fallback } = await supabase
    .from(table)
    .select('id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty, topic, subtopic')
    .eq('difficulty', difficulty)
    .limit(60)

  return ((fallback || []) as MCQ[]).sort(() => Math.random() - 0.5).slice(0, 30)
}

function DifficultyQuiz() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const subject    = params.subject as string
  const difficulty = searchParams.get('difficulty') || 'Easy'
  const config     = SUBJECT_CONFIG[subject]
  const meta       = DIFFICULTY_META[difficulty] || DIFFICULTY_META.Easy

  const startTimeRef = useRef<number>(Date.now())

  const [mcqs, setMcqs]               = useState<MCQ[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers]           = useState<Record<number, string>>({})
  const [showResults, setShowResults]   = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [loading, setLoading]           = useState(true)

  // Review mode
  const [reviewMCQs, setReviewMCQs]       = useState<MCQ[]>([])
  const [reviewMode, setReviewMode]       = useState(false)
  const [originalScore, setOriginalScore] = useState<{ correct: number; total: number } | null>(null)

  useEffect(() => {
    if (!config) return
    fetchDifficultyMCQs(config.table, difficulty, config.totalRows).then(data => {
      setMcqs(data)
      setLoading(false)
    })
  }, [subject, difficulty]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!showResults || reviewMode) return
    const activeList = reviewMode ? reviewMCQs : mcqs
    const correct = Object.entries(answers).filter(([i, a]) => a === activeList[+i]?.correct_answer).length
    const pct = activeList.length > 0 ? Math.round((correct / activeList.length) * 100) : 0
    if (registerQuizCompletion(pct)) {
      const t = setTimeout(() => setShowFeedback(true), 1500)
      return () => clearTimeout(t)
    }
  }, [showResults, reviewMode])

  const handleAnswer = (opt: string) => {
    if (answers[currentIndex]) return
    setAnswers(prev => ({ ...prev, [currentIndex]: opt }))
  }

  const currentMCQ  = mcqs[currentIndex]
  const userAnswer  = answers[currentIndex]
  const isCorrect   = userAnswer === currentMCQ?.correct_answer
  const score       = Object.entries(answers).filter(([i, a]) => a === mcqs[+i]?.correct_answer).length
  const DiffIcon    = meta.icon

  if (!config) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <p className="text-gray-600">Subject not found.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3" />
          <p className="text-gray-600 text-sm">Loading {difficulty.toLowerCase()} questions...</p>
        </div>
      </div>
    )
  }

  // Results screen
  if (showResults) {
    const pct = ((score / (reviewMode ? reviewMCQs.length : mcqs.length)) * 100).toFixed(1)
    const activeMCQs = reviewMode ? reviewMCQs : mcqs
    const wrongMCQs  = activeMCQs.filter((mcq, i) => answers[i] && answers[i] !== mcq.correct_answer)

    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6">
          <div className="text-center mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${config.color} mx-auto mb-3 flex items-center justify-center`}>
              <DiffIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{reviewMode ? 'Mistakes Review' : 'Session Complete!'}</h2>
            <p className="text-gray-500 text-sm mt-1">
              {config.name} · {difficulty}
              {originalScore && ` · Original: ${((originalScore.correct / originalScore.total) * 100).toFixed(0)}%`}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-xs text-green-700 mt-0.5">Correct</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-red-600">{activeMCQs.length - score}</div>
              <div className="text-xs text-red-700 mt-0.5">Wrong</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">{pct}%</div>
              <div className="text-xs text-blue-700 mt-0.5">Score</div>
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
            <button
              onClick={() => router.push(`/mdcat/${subject}`)}
              className={`w-full bg-gradient-to-r ${config.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all`}
            >
              Back to {config.name}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full border-2 border-gray-200 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              New {difficulty} Set
            </button>
          </div>
        </div>
      </div>
      <FeedbackPopup
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        onAction={recordFeedbackAction}
        examSlug="mdcat"
        quizType="quiz"
        scorePct={Math.round((score / (reviewMode ? reviewMCQs.length : mcqs.length)) * 100)}
      />
      </>
    )
  }

  const activeMCQs = reviewMode ? reviewMCQs : mcqs

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-2 px-2 sm:px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 border border-blue-500/30 rounded-2xl p-3 sm:p-4 mb-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => router.push(`/mdcat/${subject}`)}
              className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {config.name}
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${meta.badgeBg} ${meta.badgeText}`}>
                <DiffIcon className="w-3 h-3" />
                {difficulty}
              </span>
              <span className="text-white/60 text-xs">{currentIndex + 1}/{activeMCQs.length}</span>
            </div>
          </div>

          <p className="text-white font-semibold text-sm mb-2">{meta.label}</p>

          <div className="bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-400 to-blue-600 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / activeMCQs.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 mb-3 border-2 border-gray-100">
          {/* Meta row */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center flex-shrink-0`}>
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            {currentMCQ.topic && (
              <span className="text-xs text-gray-500 truncate max-w-[200px]">{currentMCQ.topic}</span>
            )}
            {currentMCQ.subtopic && (
              <>
                <span className="text-gray-300 text-xs">·</span>
                <span className="text-xs text-gray-400 truncate max-w-[160px]">{currentMCQ.subtopic}</span>
              </>
            )}
          </div>

          <p className="text-gray-900 text-base sm:text-lg font-medium mb-5 leading-relaxed">
            {currentMCQ.question}
          </p>

          {/* Options */}
          <div className="space-y-2.5">
            {(['A', 'B', 'C', 'D'] as const).map(opt => {
              const state   = getOptionState(opt, userAnswer, currentMCQ.correct_answer)
              const optText = currentMCQ[`option_${opt.toLowerCase()}` as keyof MCQ] as string
              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!userAnswer}
                  className={`w-full flex items-start gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${OPTION_STYLES[state]}`}
                >
                  <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-semibold text-sm ${BADGE_STYLES[state]} border-current`}>
                    {opt}
                  </span>
                  <span className="flex-1 text-gray-900">{optText}</span>
                  {state === 'correct' && <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />}
                  {state === 'wrong'   && <XCircle      className="w-5 h-5 text-red-600 flex-shrink-0" />}
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {userAnswer && currentMCQ.explanation && (
            <div className={`mt-4 p-3.5 rounded-xl border-2 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
              <div className="flex items-start gap-2">
                <Lightbulb className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isCorrect ? 'text-green-600' : 'text-amber-600'}`} />
                <p className={`text-sm leading-relaxed ${isCorrect ? 'text-green-800' : 'text-amber-800'}`}>
                  {currentMCQ.explanation}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-2.5">
          <button
            onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
            className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>

          {currentIndex < activeMCQs.length - 1 ? (
            <button
              onClick={() => setCurrentIndex(i => i + 1)}
              disabled={!userAnswer}
              className={`flex-1 bg-gradient-to-r ${config.color} text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-40`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={async () => {
                const finalAnswers = { ...answers, [currentIndex]: userAnswer! }
                const correct = Object.entries(finalAnswers).filter(([i, a]) => a === activeMCQs[+i]?.correct_answer).length
                const wrong   = Object.values(finalAnswers).length - correct
                const skipped = activeMCQs.length - Object.values(finalAnswers).length
                await saveQuizResults({
                  examSlug: 'mdcat',
                  quizType: 'subject',
                  subject: config.name,
                  totalQuestions: activeMCQs.length,
                  correctAnswers: correct,
                  wrongAnswers: wrong,
                  skippedAnswers: skipped,
                  timeInSeconds: Math.round((Date.now() - startTimeRef.current) / 1000),
                })
                setShowResults(true)
              }}
              disabled={!userAnswer}
              className={`flex-1 bg-gradient-to-r ${config.color} text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-40`}
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function MDCATDifficultyQuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    }>
      <DifficultyQuiz />
    </Suspense>
  )
}
