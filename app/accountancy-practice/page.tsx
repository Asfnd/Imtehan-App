'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Lightbulb, BookOpen, CheckCircle2, XCircle, ChevronRight, ChevronLeft, Eye, X } from 'lucide-react'

interface MCQ {
  id: number
  question: string
  topic: string
  difficulty: string
  tags: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  explanation_a: string
  explanation_b: string
  explanation_c: string
  explanation_d: string
  explanation_detailed: string
  hint_1: string
  hint_2: string
  hint_3: string
  year: number
}

export default function AccountancyPractice() {
  const [mcqs, setMcqs] = useState<MCQ[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showHints, setShowHints] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [hintsRevealed, setHintsRevealed] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [yearFilter, setYearFilter] = useState<number | 'all'>('all')
  
  const supabase = createClientComponentClient()

  useEffect(() => {
    loadMCQs()
  }, [yearFilter])

  const loadMCQs = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('css_mcqs')
        .select('*')
        .eq('subject', 'Accountancy and Auditing')
        .order('year', { ascending: false })

      if (yearFilter !== 'all') {
        query = query.eq('year', yearFilter)
      }

      const { data, error } = await query

      if (error) throw error
      setMcqs(data || [])
      resetQuestion()
    } catch (error) {
      console.error('Error loading MCQs:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetQuestion = () => {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setShowHints(false)
    setShowExplanation(false)
    setHintsRevealed(0)
  }

  const currentMCQ = mcqs[currentIndex]

  const handleAnswerSelect = (answer: string) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answer)
    }
  }

  const nextQuestion = () => {
    if (currentIndex < mcqs.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setShowHints(false)
      setShowExplanation(false)
      setHintsRevealed(0)
    }
  }

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setSelectedAnswer(null)
      setShowHints(false)
      setShowExplanation(false)
      setHintsRevealed(0)
    }
  }

  const revealNextHint = () => {
    if (hintsRevealed < 3) {
      setHintsRevealed(hintsRevealed + 1)
      setShowHints(true)
    }
  }

  const getOptionStyle = (option: string) => {
    if (!selectedAnswer) {
      return 'border-gray-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
    }
    
    if (option === currentMCQ?.correct_answer) {
      return 'border-green-500 bg-green-50'
    }
    
    if (option === selectedAnswer && option !== currentMCQ?.correct_answer) {
      return 'border-red-500 bg-red-50'
    }
    
    return 'border-gray-200 opacity-60'
  }

  const getOptionIcon = (option: string) => {
    if (!selectedAnswer) return null
    
    if (option === currentMCQ?.correct_answer) {
      return <CheckCircle2 className="w-5 h-5 text-green-600" />
    }
    
    if (option === selectedAnswer && option !== currentMCQ?.correct_answer) {
      return <XCircle className="w-5 h-5 text-red-600" />
    }
    
    return null
  }

  const getOptionExplanation = (option: string) => {
    if (!currentMCQ) return ''
    const key = `explanation_${option.toLowerCase()}` as keyof MCQ
    return currentMCQ[key] as string
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading MCQs...</p>
        </div>
      </div>
    )
  }

  if (mcqs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No MCQs Found</h2>
          <p className="text-gray-600">Please upload MCQs first.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translate(-100%, -50%);
          }
          to {
            opacity: 1;
            transform: translate(0, -50%);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translate(100%, -50%);
          }
          to {
            opacity: 1;
            transform: translate(0, -50%);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
        
        /* Smooth scrollbar for floating boxes */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #fef3c7;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #fbbf24;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #f59e0b;
        }
      `}</style>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                📊 Accountancy & Auditing Practice
              </h1>
              <p className="text-gray-600">Master your concepts with detailed explanations</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Year:</label>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Years</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentMCQ?.difficulty)}`}>
                {currentMCQ?.difficulty}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {currentMCQ?.year}
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentIndex + 1} of {mcqs.length}</span>
              <span>{Math.round(((currentIndex + 1) / mcqs.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / mcqs.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          {/* Topic Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              {currentMCQ?.topic}
            </span>
            {currentMCQ?.tags && currentMCQ.tags.split(',').map((tag, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                {tag.trim()}
              </span>
            ))}
          </div>

          {/* Question */}
          <h2 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
            {currentMCQ?.question}
          </h2>

          {/* Options with inline explanations */}
          <div className="space-y-3 mb-6">
            {['A', 'B', 'C', 'D'].map((option) => {
              const optionText = currentMCQ?.[`option_${option.toLowerCase()}` as keyof MCQ] as string
              const optionExplanation = getOptionExplanation(option)
              const isCorrect = option === currentMCQ?.correct_answer
              const isSelected = option === selectedAnswer
              
              return (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={!!selectedAnswer}
                  className={`w-full text-left p-5 border-2 rounded-xl transition-all ${getOptionStyle(option)}`}
                >
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full font-bold text-gray-700">
                      {option}
                    </span>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium mb-2">{optionText}</p>
                      {/* Short explanation inside option */}
                      {selectedAnswer && optionExplanation && (
                        <p className={`text-sm mt-2 pt-2 border-t ${
                          isCorrect 
                            ? 'text-green-700 border-green-200' 
                            : 'text-gray-600 border-gray-200'
                        }`}>
                          {optionExplanation}
                        </p>
                      )}
                    </div>
                    {getOptionIcon(option)}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Action Buttons Below MCQ - Left and Right Layout */}
          <div className="flex justify-between gap-3">
            {/* Hints Button - Left Side */}
            <button
              onClick={() => {
                setShowHints(true)
                setHintsRevealed(0)
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              <Lightbulb className="w-5 h-5" />
              💡 Need a Hint?
            </button>

            {/* Explanation Button - Right Side */}
            {selectedAnswer && (
              <button
                onClick={() => setShowExplanation(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                <BookOpen className="w-5 h-5" />
                📖 Full Explanation
              </button>
            )}
          </div>
        </div>

        {/* Floating Hints Box - Left Side */}
        {showHints && (
          <div 
            className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-80 max-w-[calc(100vw-2rem)] animate-slideInLeft"
          >
            <div 
              className="bg-white rounded-xl shadow-2xl border-2 border-yellow-400 max-h-[80vh] overflow-y-auto"
            >
              {/* Compact Header */}
              <div className="sticky top-0 bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-3 rounded-t-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-900" />
                  <h3 className="text-base font-bold text-yellow-900">Hints</h3>
                </div>
                <button
                  onClick={() => {
                    setShowHints(false)
                    setHintsRevealed(0)
                  }}
                  className="p-1 hover:bg-yellow-600 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-yellow-900" />
                </button>
              </div>

              {/* Compact Content */}
              <div className="p-3 space-y-2">
                {/* Hint 1 - Always visible */}
                {currentMCQ?.hint_1 && (
                  <div className="p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-300 animate-fadeIn">
                    <p className="text-xs text-yellow-900">
                      <strong className="text-yellow-800">💡 Hint 1:</strong>
                      <span className="ml-1 block mt-1">{currentMCQ.hint_1}</span>
                    </p>
                  </div>
                )}
                
                {/* Hint 2 - Revealed on demand */}
                {hintsRevealed >= 1 && currentMCQ?.hint_2 && (
                  <div className="p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-300 animate-fadeIn">
                    <p className="text-xs text-yellow-900">
                      <strong className="text-yellow-800">💡 Hint 2:</strong>
                      <span className="ml-1 block mt-1">{currentMCQ.hint_2}</span>
                    </p>
                  </div>
                )}
                
                {/* Hint 3 - Revealed on demand */}
                {hintsRevealed >= 2 && currentMCQ?.hint_3 && (
                  <div className="p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-300 animate-fadeIn">
                    <p className="text-xs text-yellow-900">
                      <strong className="text-yellow-800">💡 Hint 3:</strong>
                      <span className="ml-1 block mt-1">{currentMCQ.hint_3}</span>
                    </p>
                  </div>
                )}
                
                {/* Show Next Hint Button */}
                {hintsRevealed < 2 && (
                  <button
                    onClick={revealNextHint}
                    className="w-full px-3 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-yellow-900 rounded-lg font-semibold text-xs transition-all transform hover:scale-102 active:scale-98 shadow-md hover:shadow-lg flex items-center justify-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    {hintsRevealed === 0 && currentMCQ?.hint_2 && 'Reveal Hint 2'}
                    {hintsRevealed === 1 && currentMCQ?.hint_3 && 'Reveal Hint 3'}
                  </button>
                )}
                
                {hintsRevealed >= 2 && (
                  <div className="text-center p-2 bg-yellow-100 rounded-lg">
                    <p className="text-yellow-800 text-xs font-semibold">
                      ✨ All hints revealed!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Floating Explanation Box - Right Side */}
        {selectedAnswer && showExplanation && currentMCQ?.explanation_detailed && (
          <div 
            className="fixed right-4 top-1/2 -translate-y-1/2 z-50 w-96 max-w-[calc(100vw-2rem)] animate-slideInRight"
          >
            <div 
              className="bg-white rounded-xl shadow-2xl border-2 border-blue-400 max-h-[80vh] overflow-y-auto"
            >
              {/* Compact Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 rounded-t-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-white" />
                  <h3 className="text-base font-bold text-white">Explanation</h3>
                </div>
                <button
                  onClick={() => setShowExplanation(false)}
                  className="p-1 hover:bg-blue-700 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="prose prose-sm max-w-none">
                  <div className="text-gray-800 leading-relaxed whitespace-pre-line text-sm">
                    {currentMCQ.explanation_detailed}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <span className="text-gray-600 font-medium">
            {currentIndex + 1} / {mcqs.length}
          </span>

          <button
            onClick={nextQuestion}
            disabled={currentIndex === mcqs.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
