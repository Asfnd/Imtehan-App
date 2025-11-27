// Database Types

export interface User {
  id: string
  email: string
  username: string
  avatar_url?: string
  total_xp: number
  level: number
  current_streak: number
  longest_streak: number
  total_quizzes: number
  created_at: string
  updated_at: string
}

export interface Quiz {
  id: string
  topic: string
  difficulty: 'easy' | 'medium' | 'hard'
  questions: Question[]
  generated_by: 'ai' | 'manual'
  cache_key?: string
  expires_at?: string
  created_at: string
}

export interface Question {
  id: string
  question_text: string
  options: string[]
  correct_answer: string
  explanation: string
  difficulty: number
}

export interface QuizHistory {
  id: string
  user_id: string
  quiz_id?: string
  topic: string
  score: number
  total_questions: number
  time_taken: number
  answers: Answer[]
  completed_at: string
}

export interface Answer {
  question_id: string
  selected_answer: string
  is_correct: boolean
  time_spent: number
}

export interface UserTopicPerformance {
  user_id: string
  topic: string
  total_quizzes: number
  accuracy: number
  avg_score: number
  last_quiz_at: string
}

export interface InsightsCache {
  id: string
  user_id: string
  insights: Insights
  expires_at: string
  created_at: string
}

export interface Insights {
  summary: string
  recommendations: string[]
  strongTopics: string[]
  weakTopics: string[]
  nextSteps: string[]
}

export interface QuizPack {
  id: string
  topic: string
  questions: Question[]
  version: number
  created_at: string
}

// API Response Types

export interface QuizResult {
  quiz_id: string
  topic: string
  score: number
  total_questions: number
  time_taken: number
  answers: Answer[]
  xp_earned: number
  level_up: boolean
  new_level?: number
  completed_at: string
}

export interface UserPerformance {
  totalQuizzes: number
  accuracy: number
  averageScore: number
  topicBreakdown: TopicPerformance[]
  weakAreas: string[]
  strongAreas: string[]
  trend: 'improving' | 'stable' | 'declining'
}

export interface TopicPerformance {
  topic: string
  quizzes: number
  accuracy: number
  lastQuiz: string
}

// Available quiz topics
export const QUIZ_TOPICS = [
  'Pakistan Affairs',
  'Islamiat',
  'General Knowledge',
  'Current Affairs',
  'Math',
] as const

export type QuizTopic = (typeof QUIZ_TOPICS)[number]

// Difficulty levels
export const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard'] as const
export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[number]
