'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Flag, TrendingUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { trackQuizStart, trackQuizComplete } from '@/lib/analytics/events'
import { saveQuizResults } from '@/lib/analytics'
import FeedbackPopup from '@/components/FeedbackPopup'
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
}

interface QuizInterfaceProps {
  mcqs: MCQ[]
  examSlug: string
  subjectSlug: string
  mode: string
  setNumber: number
}

type AnswerState = 'default' | 'correct' | 'wrong' | 'dimmed'

function getOptionState(
  option: string,
  userAnswer: string | undefined,
  correctAnswer: string
): AnswerState {
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

export default function QuizInterface({
  mcqs,
  examSlug,
  subjectSlug,
  mode,
  setNumber,
}: QuizInterfaceProps) {
  const router = useRouter()

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

  const backUrl = `/${examSlug}/${subjectSlug}/${mode}`

  // Core quiz state
  const [currentIndex, setCurrentIndex]     = useState(0)
  const [answers, setAnswers]               = useState<Record<number, string>>({})
  const [showResults, setShowResults]       = useState(false)
  const [startTime]                         = useState(Date.now())
  const [saving, setSaving]                 = useState(false)

  // Review mode state
  const [reviewMode, setReviewMode]         = useState(false)
  const [reviewMCQs, setReviewMCQs]         = useState<MCQ[]>([])
  const [originalScore, setOriginalScore]   = useState<{ correct: number; total: number } | null>(null)

  // Report toast
  const [showReportToast, setShowReportToast] = useState(false)

  // Feedback popup
  const [showFeedback, setShowFeedback] = useState(false)
  const [resultPct, setResultPct]       = useState(0)

  // Track quiz start on mount
  useEffect(() => {
    trackQuizStart(`${examSlug}/${mode}`, subjectSlug)
  }, [])

  const activeMCQs  = reviewMode ? reviewMCQs : mcqs
  const currentMCQ  = activeMCQs[currentIndex]
  const userAnswer  = answers[currentIndex]
  const progress    = ((currentIndex + 1) / activeMCQs.length) * 100

  // Trigger feedback popup every 7th quiz after results appear
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!showResults || reviewMode) return
    let correct = 0
    activeMCQs.forEach((mcq, idx) => { if (answers[idx] === mcq.correct_answer) correct++ })
    setResultPct(Math.round((correct / activeMCQs.length) * 100))
    try {
      if (typeof window !== 'undefined') {
        const count = parseInt(localStorage.getItem('quiz_complete_count') || '0', 10) + 1
        localStorage.setItem('quiz_complete_count', String(count))
        if (count % 7 === 0) {
          const t = setTimeout(() => setShowFeedback(true), 1500)
          return () => clearTimeout(t)
        }
      }
    } catch {
      // localStorage unavailable (private browsing) — skip feedback popup
    }
  }, [showResults, reviewMode])

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
        subject:       subjectSlug,
        user_id:       user?.id || null,
      })
    } catch (_) { /* silent */ }
    setShowReportToast(true)
    setTimeout(() => setShowReportToast(false), 3000)
  }, [currentMCQ, examSlug, subjectSlug])

  const handleSubmit = async () => {
    setSaving(true)
    let correct = 0
    const detailedAnswers = activeMCQs.map((mcq, idx) => {
      const ua = answers[idx]
      const isCorrect = ua === mcq.correct_answer
      if (isCorrect) correct++
      return { questionId: mcq.id, userAnswer: ua || null, correctAnswer: mcq.correct_answer, isCorrect }
    })
    const timeTaken = Math.floor((Date.now() - startTime) / 1000)
    const wrong    = Object.keys(answers).length - correct
    const skipped  = activeMCQs.length - Object.keys(answers).length
    const modeToType: Record<string, 'subject' | 'past-paper' | 'practice'> = {
      'most-repeated':  'subject',
      'most-important': 'subject',
      'past-papers':    'past-paper',
      'practice':       'practice',
    }
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('quiz_attempts').insert({
          user_id: user.id, exam_slug: examSlug, subject_slug: subjectSlug,
          mode, set_number: setNumber, score: correct,
          total_questions: activeMCQs.length, time_taken: timeTaken, answers: detailedAnswers,
        })
      }
    } catch (_) { /* silent */ }
    // Update analytics dashboard (user_stats, streak, weak subjects)
    await saveQuizResults({
      quizType: modeToType[mode] ?? 'practice',
      examSlug,
      subject:  subjectSlug,
      totalQuestions:  activeMCQs.length,
      correctAnswers:  correct,
      wrongAnswers:    wrong,
      skippedAnswers:  skipped,
      timeInSeconds:   timeTaken,
    })
    setSaving(false)
    trackQuizComplete(`${examSlug}/${mode}`, correct, activeMCQs.length, subjectSlug)
    setShowResults(true)
  }

  const practiceMistakes = () => {
    // Collect only answered-wrong MCQs (not unanswered/skipped)
    const wrong = activeMCQs.filter((mcq, idx) => {
      const ua = answers[idx]
      return !!ua && ua !== mcq.correct_answer
    })
    // Save original score for comparison
    let correct = 0
    activeMCQs.forEach((mcq, idx) => { if (answers[idx] === mcq.correct_answer) correct++ })
    setOriginalScore({ correct, total: activeMCQs.length })
    // Start review session
    setReviewMCQs(wrong)
    setReviewMode(true)
    setCurrentIndex(0)
    setAnswers({})
    setShowResults(false)
  }

  // ── Results screen ──────────────────────────────────────────────────────────
  if (showResults) {
    let correct = 0
    activeMCQs.forEach((mcq, idx) => { if (answers[idx] === mcq.correct_answer) correct++ })
    const incorrect  = Object.keys(answers).length - correct
    const unanswered = activeMCQs.length - Object.keys(answers).length
    const percentage = Math.round((correct / activeMCQs.length) * 100)

    // Count only answered-wrong (not unanswered/skipped)
    const wrongCount = activeMCQs.filter((mcq, idx) => {
      const ua = answers[idx]
      return !!ua && ua !== mcq.correct_answer
    }).length

    // Improvement data for review mode
    const improvement = reviewMode && originalScore
      ? {
          original: Math.round((originalScore.correct / originalScore.total) * 100),
          current:  percentage,
          improved: percentage > Math.round((originalScore.correct / originalScore.total) * 100),
          diff:     percentage - Math.round((originalScore.correct / originalScore.total) * 100),
        }
      : null

    return (
      <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-3 py-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-center max-w-lg w-full">
          <div className="text-5xl mb-3">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {reviewMode ? 'Practice Complete!' : 'Quiz Complete!'}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {reviewMode ? `Reviewing ${activeMCQs.length} questions` : `Set ${setNumber} • ${activeMCQs.length} questions`}
          </p>

          {/* Improvement comparison in review mode */}
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

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-5 text-white mb-5">
            <div className="text-4xl font-bold">{correct}/{activeMCQs.length}</div>
            <div className="text-base mt-1">{percentage}% Correct</div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-green-50 rounded-xl p-3 border border-green-100">
              <div className="text-2xl font-bold text-green-600">{correct}</div>
              <div className="text-xs text-gray-500 mt-0.5">Correct</div>
            </div>
            <div className="bg-red-50 rounded-xl p-3 border border-red-100">
              <div className="text-2xl font-bold text-red-500">{incorrect}</div>
              <div className="text-xs text-gray-500 mt-0.5">Incorrect</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="text-2xl font-bold text-gray-500">{unanswered}</div>
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
              onClick={() => router.push(`/exams/${examSlug}/${subjectSlug}/${mode}`)}
              className="px-5 py-2.5 bg-gray-100 text-gray-800 rounded-xl font-semibold hover:bg-gray-200 text-sm transition-all"
            >
              Back to Sets
            </button>
            <button
              onClick={() => { setCurrentIndex(0); setShowResults(false) }}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 text-sm transition-all"
            >
              Review Answers
            </button>
            <button
              onClick={() => router.push(`/exams/${examSlug}/analytics`)}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:opacity-90 text-sm flex items-center gap-1.5 transition-all"
            >
              <TrendingUp className="w-4 h-4" />
              Analytics
            </button>
          </div>
        </div>
      </div>
      <FeedbackPopup
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        examSlug={examSlug}
        quizType="quiz"
        scorePct={resultPct}
      />
      </>
    )
  }

  // ── Quiz screen ─────────────────────────────────────────────────────────────
  const options = [
    { label: 'A', text: currentMCQ.option_a },
    { label: 'B', text: currentMCQ.option_b },
    { label: 'C', text: currentMCQ.option_c },
    { label: 'D', text: currentMCQ.option_d },
  ]

  return (
    <>
      {/* Access gate popups */}
      <SignInPopup
        isOpen={showSignIn}
        onClose={() => { setShowSignIn(false); router.push(backUrl) }}
      />
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

              <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/20">
                <span className="text-xs font-medium text-blue-300">Q</span>
                <span className="text-sm sm:text-base font-bold text-white">{currentIndex + 1}</span>
                <span className="text-blue-300">/</span>
                <span className="text-sm sm:text-base text-blue-200">{activeMCQs.length}</span>
              </div>

              <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 rounded-lg sm:rounded-xl border border-white/20 text-xs text-blue-200">
                {Object.keys(answers).length} answered
              </div>
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
            {/* Topic row + Report */}
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-xs font-medium text-gray-400">Question {currentIndex + 1}</span>
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
                    disabled={!!userAnswer}
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

          {/* Explanation — shown immediately after answering */}
          {userAnswer && currentMCQ.explanation && (
            <div className="mx-0 mb-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
              <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-wider mb-1">Explanation</p>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{currentMCQ.explanation}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-1 sm:pt-2 mb-3">
            <button
              onClick={goPrevious}
              disabled={currentIndex === 0}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 active:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm text-sm sm:text-base font-semibold"
            >
              ← Previous
            </button>

            <span className="text-sm sm:text-base text-gray-600 font-semibold px-2 sm:px-3">
              {currentIndex + 1} / {activeMCQs.length}
            </span>

            {currentIndex === activeMCQs.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg font-bold text-sm sm:text-base disabled:opacity-60"
              >
                {saving ? 'Saving…' : 'Finish Test ✓'}
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
    </>
  )
}
