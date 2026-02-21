'use client'

import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, BookOpen, CheckCircle2, XCircle, Lightbulb, AlertCircle } from 'lucide-react'

const SUBJECT_CONFIG: Record<string, { name: string; table: string; color: string }> = {
  'biology': { name: 'Biology', table: 'mdcat_biology', color: 'from-green-600 to-emerald-700' },
  'chemistry': { name: 'Chemistry', table: 'mdcat_chemistry', color: 'from-purple-600 to-violet-700' },
  'physics': { name: 'Physics', table: 'mdcat_physics', color: 'from-blue-600 to-indigo-700' },
  'english': { name: 'English', table: 'mdcat_english', color: 'from-amber-600 to-orange-700' },
  'logical-reasoning': { name: 'Logical Reasoning', table: 'mdcat_logical_reasoning', color: 'from-rose-600 to-pink-700' },
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
  subtopic: string
}

export default function MDCATQuizPage() {
  const router = useRouter()
  const params = useParams()
  const subject = params.subject as string
  const topic = decodeURIComponent(params.topic as string)

  const [mcqs, setMcqs] = useState<MCQ[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(true)

  const subjectConfig = SUBJECT_CONFIG[subject]

  useEffect(() => {
    async function fetchMCQs() {
      if (!subjectConfig) return

      const supabase = createClient()
      const { data, error } = await supabase
        .from(subjectConfig.table)
        .select('*')
        .eq('topic', topic)
        .limit(50)

      if (error) {
        console.error('Error fetching MCQs:', error)
        setLoading(false)
        return
      }

      // Shuffle and limit to 30 MCQs
      const shuffled = (data || []).sort(() => Math.random() - 0.5).slice(0, 30)
      setMcqs(shuffled)
      setLoading(false)
    }

    fetchMCQs()
  }, [subject, topic, subjectConfig])

  const handleAnswer = (answer: string) => {
    if (answers[currentIndex]) return // Already answered
    setAnswers({ ...answers, [currentIndex]: answer })
  }

  const currentMCQ = mcqs[currentIndex]
  const userAnswer = answers[currentIndex]
  const isCorrect = userAnswer === currentMCQ?.correct_answer

  const score = Object.entries(answers).filter(
    ([idx, ans]) => ans === mcqs[parseInt(idx)]?.correct_answer
  ).length

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    )
  }

  if (!subjectConfig || mcqs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No MCQs found</h1>
          <button
            onClick={() => router.push(`/mdcat/${subject}`)}
            className="text-blue-600 hover:text-blue-700"
          >
            ← Back to {subjectConfig?.name || 'MDCAT'}
          </button>
        </div>
      </div>
    )
  }

  if (showResults) {
    const percentage = ((score / mcqs.length) * 100).toFixed(1)
    const wrongMCQs = mcqs.filter((mcq, idx) => answers[idx] && answers[idx] !== mcq.correct_answer)

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${subjectConfig.color} mx-auto mb-4 flex items-center justify-center`}>
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
            <p className="text-gray-600">{topic}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-xs text-green-700">Correct</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{mcqs.length - score}</div>
              <div className="text-xs text-red-700">Wrong</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{percentage}%</div>
              <div className="text-xs text-blue-700">Score</div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push(`/mdcat/${subject}`)}
              className={`w-full bg-gradient-to-r ${subjectConfig.color} text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all`}
            >
              Back to {subjectConfig.name}
            </button>

            {wrongMCQs.length > 0 && (
              <button
                onClick={() => {
                  setMcqs(wrongMCQs)
                  setCurrentIndex(0)
                  setAnswers({})
                  setShowResults(false)
                }}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                Practice Mistakes ({wrongMCQs.length} MCQs)
              </button>
            )}

            <button
              onClick={() => window.location.reload()}
              className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Retry Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-4 px-2 sm:px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className={`bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 border border-blue-500/30 rounded-2xl p-4 mb-4 shadow-lg`}>
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => router.push(`/mdcat/${subject}`)}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">{subjectConfig.name}</span>
            </button>
            <div className="text-white/80 text-sm">
              {currentIndex + 1} / {mcqs.length}
            </div>
          </div>

          <h2 className="text-white text-lg font-semibold mb-3">{topic}</h2>

          {/* Progress bar */}
          <div className="bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-400 to-blue-600 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / mcqs.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 border-2 border-gray-100">
          <div className="flex items-start gap-3 mb-4">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${subjectConfig.color} flex items-center justify-center flex-shrink-0`}>
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-gray-500">
                  {currentMCQ.difficulty}
                </span>
                {currentMCQ.subtopic && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-500">{currentMCQ.subtopic}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <p className="text-gray-900 text-base sm:text-lg font-medium mb-6 leading-relaxed">
            {currentMCQ.question}
          </p>

          {/* Options */}
          <div className="space-y-3">
            {['A', 'B', 'C', 'D'].map((opt) => {
              const optionText = currentMCQ[`option_${opt.toLowerCase()}` as keyof MCQ] as string
              const isSelected = userAnswer === opt
              const isCorrectOption = opt === currentMCQ.correct_answer

              let bgColor = 'bg-gray-50 hover:bg-blue-50 border-gray-200'
              let textColor = 'text-gray-900'

              if (userAnswer) {
                if (isCorrectOption) {
                  bgColor = 'bg-green-50 border-green-500'
                  textColor = 'text-green-900'
                } else if (isSelected) {
                  bgColor = 'bg-red-50 border-red-500'
                  textColor = 'text-red-900'
                } else {
                  bgColor = 'bg-gray-50 border-gray-200 opacity-50'
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!userAnswer}
                  className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 transition-all text-left ${bgColor} ${
                    !userAnswer && 'hover:border-blue-400'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-semibold text-sm ${
                    userAnswer && isCorrectOption
                      ? 'bg-green-500 border-green-500 text-white'
                      : userAnswer && isSelected
                      ? 'bg-red-500 border-red-500 text-white'
                      : 'border-gray-300 text-gray-700'
                  }`}>
                    {opt}
                  </div>
                  <span className={`flex-1 ${textColor}`}>{optionText}</span>
                  {userAnswer && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />}
                  {userAnswer && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {userAnswer && (
            <div className={`mt-6 p-4 rounded-xl border-2 ${
              isCorrect ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'
            }`}>
              <div className="flex items-start gap-2">
                <Lightbulb className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isCorrect ? 'text-green-600' : 'text-amber-600'}`} />
                <div>
                  <div className={`font-semibold mb-1 text-sm ${isCorrect ? 'text-green-900' : 'text-amber-900'}`}>
                    Explanation
                  </div>
                  <p className={`text-sm leading-relaxed ${isCorrect ? 'text-green-800' : 'text-amber-800'}`}>
                    {currentMCQ.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>

          {currentIndex < mcqs.length - 1 ? (
            <button
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className={`flex-1 bg-gradient-to-r ${subjectConfig.color} text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => setShowResults(true)}
              className={`flex-1 bg-gradient-to-r ${subjectConfig.color} text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all`}
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
