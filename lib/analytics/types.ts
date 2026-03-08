// ==========================================
// ANALYTICS TYPES
// ==========================================

export interface UserStats {
  total_questions_solved: number
  total_tests_completed: number
  average_score: number
  current_streak: number
  longest_streak: number
  total_study_time_minutes: number
}

export interface QuizAttempt {
  id: string
  user_id: string
  quiz_type: 'subject' | 'past-paper' | 'mpt' | 'mock' | 'practice'
  subject?: string
  total_questions: number
  correct_answers: number
  wrong_answers: number
  skipped_answers: number
  score_percentage: number
  time_taken_seconds: number
  completed_at: string
}

export interface SubjectPerformance {
  id: string
  user_id: string
  subject: string
  questions_attempted: number
  questions_correct: number
  questions_wrong: number
  average_score: number
  last_practiced_at: string
  practice_count: number
}

export interface WeakSubject {
  subject: string
  average_score: number
  questions_attempted: number
  last_practiced_at: string
  days_since_practice: number
}

export interface TodaysRecommendation {
  subject: string
  reason: string
  priority: number
  average_score: number
  days_since_practice: number
}

export interface RecentScore {
  date: string
  score: number
  subject?: string
}

export interface UserAnalytics {
  stats: UserStats
  weak_subjects: WeakSubject[]
  recommendation: TodaysRecommendation | null
  recent_scores: RecentScore[]
}

export interface QuizData {
  quizType: 'subject' | 'past-paper' | 'mpt' | 'mock' | 'practice'
  examSlug: string
  subject?: string
  totalQuestions: number
  correctAnswers: number
  wrongAnswers: number
  skippedAnswers: number
  timeInSeconds: number
}

export interface SaveQuizResponse {
  success: boolean
  score: number
  streak: number
  total_questions: number
  total_tests: number
}
