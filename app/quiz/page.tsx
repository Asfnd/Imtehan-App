'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import TopicSelector from '@/components/quiz/TopicSelector'
import { showToast } from '@/components/ui/Toast'
import type { QuizTopic, Quiz, Answer, QuizResult } from '@/lib/supabase/types'

// Lazy load heavy quiz components
const QuizArena = dynamic(() => import('@/components/quiz/QuizArena'), {
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading quiz...</p>
      </div>
    </div>
  ),
  ssr: false
})

const ResultsScreen = dynamic(() => import('@/components/quiz/ResultsScreen'), {
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading results...</p>
      </div>
    </div>
  ),
  ssr: false
})

type QuizState = 'topic-selection' | 'quiz-active' | 'results'

export default function QuizPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [state, setState] = useState<QuizState>('topic-selection')
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [result, setResult] = useState<QuizResult | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/css')
        return
      }
      
      setUser({ id: session.user.id, email: session.user.email })
      setAuthChecked(true)
    } catch (error) {
      console.error('Auth check failed:', error)
      router.push('/css')
    }
  }

  const handleSelectTopic = async (topic: QuizTopic) => {
    if (!user) return

    setSelectedTopic(topic)
    setLoading(true)

    try {
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, userId: user.id }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate quiz')
      }

      const data = await response.json()
      setQuiz(data.quiz)
      setState('quiz-active')

      if (data.fromCache) {
        showToast('Quiz loaded from cache', 'info')
      } else if (data.generatedBy === 'ai') {
        showToast('AI-generated quiz ready!', 'success')
      } else {
        showToast('Quiz ready!', 'success')
      }
    } catch (error) {
      console.error('Error generating quiz:', error)
      showToast('Failed to generate quiz. Please try again.', 'error')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const handleQuizComplete = async (quizAnswers: Answer[], timeTaken: number) => {
    if (!user || !quiz) return

    setAnswers(quizAnswers)
    setLoading(true)

    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          quizId: quiz.id,
          topic: quiz.topic,
          answers: quizAnswers,
          timeTaken,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit quiz')
      }

      const data = await response.json()
      setResult(data.result)
      setState('results')

      if (data.result.level_up) {
        showToast(
          `🎉 Level Up! You're now Level ${data.result.new_level}!`,
          'success'
        )
      }
    } catch (error) {
      console.error('Error submitting quiz:', error)
      showToast('Failed to submit quiz. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleRetake = () => {
    setQuiz(null)
    setAnswers([])
    setResult(null)
    setState('topic-selection')
  }

  const handleExit = () => {
    router.push('/css')
  }

  if (!authChecked || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            {state === 'topic-selection'
              ? 'Generating your personalized quiz...'
              : 'Submitting your answers...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {state === 'topic-selection' && (
        <TopicSelector onSelectTopic={handleSelectTopic} />
      )}

      {state === 'quiz-active' && quiz && (
        <QuizArena
          questions={quiz.questions}
          onComplete={handleQuizComplete}
          onExit={handleExit}
        />
      )}

      {state === 'results' && quiz && result && (
        <ResultsScreen
          questions={quiz.questions}
          answers={answers}
          result={result}
          onRetake={handleRetake}
          onHome={handleExit}
        />
      )}
    </div>
  )
}
