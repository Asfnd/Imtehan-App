'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Flag, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { trackQuizStart, trackQuizComplete } from '@/lib/analytics/events'
import { saveQuizResults } from '@/lib/analytics'
import FeedbackPopup from '@/components/FeedbackPopup'

interface MCQ {
  id: number
  question: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  subject: string
  explanation?: string
}

interface MockTestInterfaceProps {
  mcqs: MCQ[]
  examName: string
  duration: number
  passingPercentage: number
  negativeMarking?: boolean
  examSlug: string
  mockNumber?: number
  mockTitle?: string
  sections?: { label: string; count: number; slug: string }[]
}

type AnswerState = 'default' | 'correct' | 'wrong' | 'dimmed'

function getOptionState(option: string, userAnswer: string | undefined, correctAnswer: string): AnswerState {
  if (!userAnswer) return 'default'
  if (option === correctAnswer) return 'correct'
  if (option === userAnswer) return 'wrong'
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

export default function MockTestInterface({
  mcqs,
  examName,
  duration,
  passingPercentage,
  negativeMarking = false,
  examSlug,
  mockNumber,
  mockTitle,
  sections,
}: MockTestInterfaceProps) {
  const router = useRouter()

  // Intro screen shown before timer starts
  const [showIntro, setShowIntro] = useState(true)

  // Core quiz state — answers locked per question on first click
  const [currentIndex, setCurrentIndex]   = useState(0)
  const [answers, setAnswers]             = useState<Record<number, string>>({})
  const [showResults, setShowResults]     = useState(false)
  const [timeLeft, setTimeLeft]           = useState(duration * 60)
  const [timerActive, setTimerActive]     = useState(false) // starts paused until intro dismissed

  // Review mode state
  const [reviewMode, setReviewMode]       = useState(false)
  const [reviewMCQs, setReviewMCQs]       = useState<MCQ[]>([])
  const [originalScore, setOriginalScore] = useState<{ correct: number; total: number } | null>(null)

  // Submit confirm
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)

  // Report toast
  const [showReportToast, setShowReportToast] = useState(false)

  // Feedback popup
  const [showFeedback, setShowFeedback] = useState(false)
  const [resultPct, setResultPct]       = useState(0)

  const activeMCQs = reviewMode ? reviewMCQs : mcqs
  const currentMCQ = activeMCQs[currentIndex]
  const userAnswer = answers[currentIndex]
  const progress   = ((currentIndex + 1) / activeMCQs.length) * 100

  // Track quiz start on mount
  useEffect(() => {
    trackQuizStart(mockTitle || examSlug, 'mock-test')
  }, [])

  // ── Timer ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!timerActive || showResults || reviewMode) return
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { setTimerActive(false); setShowResults(true); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [timerActive, showResults, reviewMode])

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  const timerColor = () => {
    const pct = (timeLeft / (duration * 60)) * 100
    if (pct > 50) return 'text-green-400'
    if (pct > 20) return 'text-yellow-400'
    return 'text-red-400 animate-pulse'
  }

  // ── Actions ──────────────────────────────────────────────────────────────────
  // Lock on first click — show correct/wrong immediately
  const handleAnswer = (option: string) => {
    if (userAnswer) return
    setAnswers(prev => ({ ...prev, [currentIndex]: option }))
  }

  const goNext     = () => { if (currentIndex < activeMCQs.length - 1) setCurrentIndex(i => i + 1) }
  const goPrevious = () => { if (currentIndex > 0) setCurrentIndex(i => i - 1) }

  const handleReport = useCallback(async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from('question_reports').insert({
        question_id:   currentMCQ.id,
        question_type: examSlug,
        subject:       currentMCQ.subject,
        user_id:       user?.id || null,
      })
    } catch (_) { /* silent */ }
    setShowReportToast(true)
    setTimeout(() => setShowReportToast(false), 3000)
  }, [currentMCQ, examSlug])

  const handleSubmit = () => {
    setTimerActive(false)
    const { correct, incorrect, unanswered } = calcScore()
    const timeTaken = (duration * 60) - timeLeft
    saveQuizResults({
      quizType:       'mock',
      examSlug:       examSlug,
      subject:        mockTitle || examSlug,
      totalQuestions: activeMCQs.length,
      correctAnswers: correct,
      wrongAnswers:   incorrect,
      skippedAnswers: unanswered,
      timeInSeconds:  timeTaken,
    })
    trackQuizComplete(mockTitle || examSlug, correct, activeMCQs.length, 'mock-test')
    setShowResults(true)
  }

  const calcScore = () => {
    let correct = 0, incorrect = 0, unanswered = 0
    activeMCQs.forEach((mcq, idx) => {
      if (answers[idx] === undefined) unanswered++
      else if (answers[idx] === mcq.correct_answer) correct++
      else incorrect++
    })
    const obtained = negativeMarking ? correct - incorrect * 0.25 : correct
    const pct = Math.round((Math.max(0, obtained) / activeMCQs.length) * 100)
    return { correct, incorrect, unanswered, obtained: Math.max(0, obtained), pct, passed: pct >= passingPercentage }
  }

  // Trigger feedback popup once per session after results appear
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!showResults || reviewMode) return
    setResultPct(calcScore().pct)
    try {
      if (typeof window !== 'undefined' && !sessionStorage.getItem('feedback_shown')) {
        sessionStorage.setItem('feedback_shown', '1')
        const t = setTimeout(() => setShowFeedback(true), 1500)
        return () => clearTimeout(t)
      }
    } catch {
      // sessionStorage unavailable (private browsing) — skip feedback popup
    }
  }, [showResults, reviewMode])

  const practiceMistakes = () => {
    const wrong = activeMCQs.filter((mcq, idx) => {
      const ua = answers[idx]
      return !!ua && ua !== mcq.correct_answer
    })
    let correct = 0
    activeMCQs.forEach((mcq, idx) => { if (answers[idx] === mcq.correct_answer) correct++ })
    setOriginalScore({ correct, total: activeMCQs.length })
    setReviewMCQs(wrong)
    setReviewMode(true)
    setCurrentIndex(0)
    setAnswers({})
    setShowResults(false)
    setTimerActive(false)
  }

  // ── Intro / pattern screen ─────────────────────────────────────────────────
  if (showIntro) {
    const total = sections?.reduce((s, x) => s + x.count, 0) ?? mcqs.length
    const BAR_COLORS = ['bg-blue-500','bg-violet-500','bg-emerald-500','bg-amber-500','bg-rose-500','bg-cyan-500']
    const TEXT_COLORS = ['text-blue-600','text-violet-600','text-emerald-600','text-amber-600','text-rose-600','text-cyan-600']
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-blue-900 px-5 py-5">
            {mockNumber && <p className="text-[11px] text-blue-300 font-medium uppercase tracking-wider mb-0.5">Mock {mockNumber}</p>}
            <h2 className="text-base font-bold text-white">{mockTitle ?? 'Mock Test'}</h2>
            <p className="text-xs text-blue-200 mt-0.5">{examName}</p>
          </div>

          <div className="px-5 py-5">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Exam Pattern</p>

            {/* Distribution bar */}
            {sections && sections.length > 0 && (
              <>
                <div className="flex rounded-full overflow-hidden h-2 mb-3">
                  {sections.map((sec, i) => (
                    <div key={sec.slug} className={BAR_COLORS[i % BAR_COLORS.length]} style={{ width: `${(sec.count/total)*100}%` }} />
                  ))}
                </div>
                <div className="space-y-2 mb-4">
                  {sections.map((sec, i) => (
                    <div key={sec.slug} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${BAR_COLORS[i % BAR_COLORS.length]}`} />
                        <span className="text-sm text-gray-700">{sec.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">{Math.round((sec.count/total)*100)}%</span>
                        <span className={`text-sm font-bold ${TEXT_COLORS[i % TEXT_COLORS.length]}`}>{sec.count}q</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Stats */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                <div className="text-base font-bold text-gray-900">{mcqs.length}</div>
                <div className="text-[10px] text-gray-400">Questions</div>
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                <div className="text-base font-bold text-gray-900">{duration}m</div>
                <div className="text-[10px] text-gray-400">Duration</div>
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                <div className="text-base font-bold text-gray-900">{passingPercentage}%</div>
                <div className="text-[10px] text-gray-400">Pass Mark</div>
              </div>
            </div>

            {negativeMarking && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                <span className="text-xs text-red-600 font-medium">Negative marking applies</span>
              </div>
            )}

            <button
              onClick={() => { setShowIntro(false); setTimerActive(true) }}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
            >
              Start Test →
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Results screen ────────────────────────────────────────────────────────────
  if (showResults) {
    const score  = calcScore()
    const timeTaken = (duration * 60) - timeLeft
    const timeExpired = timeLeft === 0

    const wrongCount = activeMCQs.filter((mcq, idx) => {
      const ua = answers[idx]
      return !!ua && ua !== mcq.correct_answer
    }).length

    const improvement = reviewMode && originalScore
      ? {
          original: Math.round((originalScore.correct / originalScore.total) * 100),
          current: score.pct,
          improved: score.pct > Math.round((originalScore.correct / originalScore.total) * 100),
          diff: score.pct - Math.round((originalScore.correct / originalScore.total) * 100),
        }
      : null

    return (
      <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-3 py-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-center max-w-lg w-full">
          <div className="text-5xl mb-3">
            {timeExpired ? '⏰' : score.pct >= 80 ? '🎉' : score.pct >= 60 ? '👍' : '📚'}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {timeExpired ? 'Time Up!' : reviewMode ? 'Practice Complete!' : 'Test Complete!'}
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            {reviewMode ? `Practice Session` : `${examName}${mockTitle ? ` — ${mockTitle}` : ''}`}
          </p>

          {/* Improvement in review mode */}
          {improvement && (
            <div className="mb-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border-2 border-green-200/50">
              <div className="text-2xl mb-1">{improvement.improved ? '🎉' : '💪'}</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                {improvement.improved ? `Improved by ${improvement.diff}%!` : 'Keep Practicing!'}
              </h3>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-white/70 rounded-xl p-2 text-center">
                  <div className="text-xs text-gray-500 font-semibold">Original</div>
                  <div className="text-xl font-bold text-gray-700">{improvement.original}%</div>
                </div>
                <div className="bg-white/70 rounded-xl p-2 text-center">
                  <div className="text-xs text-gray-500 font-semibold">Practice</div>
                  <div className="text-xl font-bold text-green-700">{improvement.current}%</div>
                </div>
              </div>
            </div>
          )}

          <div className={`bg-gradient-to-r ${score.passed ? 'from-blue-600 to-indigo-600' : 'from-slate-700 to-blue-800'} rounded-xl p-5 text-white mb-5`}>
            <div className="text-4xl font-bold">{score.correct}/{activeMCQs.length}</div>
            <div className="text-base mt-1">{score.pct}% • {score.passed ? '✓ Passed' : '✗ Not Passed'}</div>
            {!reviewMode && (
              <div className="text-xs mt-1 text-white/70">
                Time: {formatTime(timeTaken)}
                {negativeMarking && ` • Marks: ${score.obtained.toFixed(2)}`}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-green-50 rounded-xl p-3 border border-green-100">
              <div className="text-2xl font-bold text-green-600">{score.correct}</div>
              <div className="text-xs text-gray-500 mt-0.5">Correct</div>
            </div>
            <div className="bg-red-50 rounded-xl p-3 border border-red-100">
              <div className="text-2xl font-bold text-red-500">{score.incorrect}</div>
              <div className="text-xs text-gray-500 mt-0.5">Incorrect</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="text-2xl font-bold text-gray-500">{score.unanswered}</div>
              <div className="text-xs text-gray-500 mt-0.5">Skipped</div>
            </div>
          </div>

          {/* Practice Mistakes button */}
          {wrongCount > 0 && !reviewMode && (
            <button
              onClick={practiceMistakes}
              className="w-full mb-4 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
            >
              📚 Practice {wrongCount} Incorrect {wrongCount === 1 ? 'Question' : 'Questions'} →
            </button>
          )}

          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => router.push(`/exams/${examSlug}`)}
              className="px-5 py-2.5 bg-gray-100 text-gray-800 rounded-xl font-semibold hover:bg-gray-200 text-sm transition-all"
            >
              Back to Exam
            </button>
            <button
              onClick={() => { setCurrentIndex(0); setShowResults(false) }}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 text-sm transition-all"
            >
              Review Answers
            </button>
            <button
              onClick={() => {
                setCurrentIndex(0); setAnswers({}); setShowResults(false)
                setTimeLeft(duration * 60); setTimerActive(true)
                setReviewMode(false); setReviewMCQs([])
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:opacity-90 text-sm transition-all"
            >
              Retake
            </button>
          </div>
        </div>
      </div>
      <FeedbackPopup
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        examSlug={examSlug}
        quizType="mock"
        scorePct={resultPct}
      />
      </>
    )
  }

  // ── Quiz screen ───────────────────────────────────────────────────────────────
  const options = [
    { label: 'A', text: currentMCQ.option_a },
    { label: 'B', text: currentMCQ.option_b },
    { label: 'C', text: currentMCQ.option_c },
    { label: 'D', text: currentMCQ.option_d },
  ]
  const answeredCount = Object.keys(answers).length

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-2 px-2 sm:px-4">
        <div className="max-w-3xl mx-auto">

          {/* Dark Blue Header */}
          <div className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 rounded-xl sm:rounded-2xl shadow-2xl p-2 sm:p-3 mb-2 sm:mb-3 border border-blue-500/30">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-white/10 active:bg-white/20 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm font-semibold text-white shadow-lg border border-white/20"
              >
                <span>←</span>
                <span className="hidden sm:inline">Exit</span>
              </button>

              {/* Q counter */}
              <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/20">
                <span className="text-xs font-medium text-blue-300">Q</span>
                <span className="text-sm sm:text-base font-bold text-white">{currentIndex + 1}</span>
                <span className="text-blue-300">/</span>
                <span className="text-sm sm:text-base text-blue-200">{activeMCQs.length}</span>
              </div>

              {/* Timer (hidden in review mode) */}
              {!reviewMode ? (
                <div className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 rounded-lg sm:rounded-xl border border-white/20 font-mono font-bold text-xs sm:text-sm ${timerColor()}`}>
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              ) : (
                <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 rounded-lg sm:rounded-xl border border-white/20 text-xs text-blue-200">
                  {answeredCount} answered
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div className="mt-2 sm:mt-3">
              <div className="w-full bg-white/10 rounded-full h-1.5 sm:h-2 shadow-inner border border-white/10">
                <div
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-1.5 sm:h-2 rounded-full shadow-lg transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div
            key={currentIndex}
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 mb-2 sm:mb-3 border-2 border-gray-100"
          >
            {/* Subject tag + Report */}
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-200">
                {currentMCQ.subject}
              </span>
              <button
                onClick={handleReport}
                className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-red-50 text-red-600 active:bg-red-100 rounded-full text-xs font-semibold transition-colors border border-red-200"
                title="Report an issue"
              >
                <Flag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">Report</span>
                <span className="sm:hidden">⚠️</span>
              </button>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4 leading-relaxed">
              {currentMCQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-2">
              {options.map(({ label, text }) => {
                const state = getOptionState(label, userAnswer, currentMCQ.correct_answer)
                return (
                  <button
                    key={label}
                    onClick={() => handleAnswer(label)}
                    disabled={!!userAnswer || showResults}
                    className={`w-full text-left p-3 sm:p-3.5 rounded-xl border-2 transition-all duration-150 ${OPTION_STYLES[state]}`}
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <span
                        className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${BADGE_STYLES[state]}`}
                      >
                        {label}
                      </span>
                      <span className="flex-1 text-xs sm:text-sm leading-relaxed pt-0.5 sm:pt-1 text-gray-700">
                        {text}
                      </span>
                      {state === 'correct' && <span className="text-green-500 text-base flex-shrink-0 mt-0.5">✓</span>}
                      {state === 'wrong'   && <span className="text-red-500 text-base flex-shrink-0 mt-0.5">✗</span>}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Explanation — shown after answer is locked or in review mode */}
          {(!!userAnswer || reviewMode) && currentMCQ.explanation && (
            <div className="mx-4 sm:mx-6 mb-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
              <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-wider mb-1">Explanation</p>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{currentMCQ.explanation}</p>
            </div>
          )}
          <div className="flex items-center justify-between pt-1 sm:pt-2 mb-3">
            <button
              onClick={goPrevious}
              disabled={currentIndex === 0}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 active:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm text-sm sm:text-base font-semibold"
            >
              ← Previous
            </button>

            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="px-3 sm:px-4 py-2 bg-white/80 border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 rounded-xl text-xs font-medium transition-all"
            >
              Submit early
            </button>

            {currentIndex === activeMCQs.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg font-bold text-sm sm:text-base"
              >
                Finish Test ✓
              </button>
            ) : (
              <button
                onClick={goNext}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg text-sm sm:text-base font-semibold"
              >
                Next →
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Report Toast */}
      {showReportToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-white/20">
            <span className="text-xl">✓</span>
            <div>
              <div className="font-bold">Question Flagged!</div>
              <div className="text-xs text-white/90">Thanks for helping us improve</div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Early Confirm Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Submit Test Early?</h3>
            <p className="text-gray-600 text-sm mb-1">
              {Object.keys(answers).length} of {activeMCQs.length} questions answered.
            </p>
            {activeMCQs.length - Object.keys(answers).length > 0 && (
              <p className="text-amber-600 text-sm font-medium">
                {activeMCQs.length - Object.keys(answers).length} unanswered questions will count as wrong.
              </p>
            )}
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 border-2 border-gray-200 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-50"
              >
                Continue
              </button>
              <button
                onClick={() => { setShowSubmitConfirm(false); handleSubmit() }}
                className="flex-1 bg-red-600 text-white py-2.5 rounded-xl font-semibold hover:bg-red-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
