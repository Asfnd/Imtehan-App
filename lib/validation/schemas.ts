import { z } from 'zod'

// Quiz request validation
export const quizRequestSchema = z.object({
  subject: z.enum(['css', 'mpt', 'islamic_history']),
  count: z.number().min(1).max(50),
  year: z.number().min(2000).max(2030).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
})

export type QuizRequest = z.infer<typeof quizRequestSchema>

// Feedback submission validation
export const feedbackSchema = z.object({
  page: z.string().min(1).max(100),
  rating: z.number().min(0.5).max(5).multipleOf(0.5),
  message: z.string().min(10).max(1000),
  email: z.string().email().optional().or(z.literal('')),
})

export type FeedbackSubmission = z.infer<typeof feedbackSchema>

// Question report validation
export const reportSchema = z.object({
  questionId: z.number().positive(),
  questionType: z.enum(['css', 'mpt', 'islamic_history']),
  subject: z.string().max(100).optional(),
  reason: z.string().min(20).max(500),
})

export type QuestionReport = z.infer<typeof reportSchema>

// Security log validation
export const securityLogSchema = z.object({
  eventType: z.string().min(1).max(100),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  details: z.record(z.string(), z.any()).optional(),
})

export type SecurityLog = z.infer<typeof securityLogSchema>

// Bot detection validation
export const botDetectionSchema = z.object({
  score: z.number().min(0).max(1),
  details: z.object({
    mouseMovements: z.number(),
    clickPatterns: z.number(),
    typingSpeed: z.number(),
    navigationPattern: z.number(),
    timeOnPage: z.number(),
  }),
  timestamp: z.string().datetime(),
})

export type BotDetection = z.infer<typeof botDetectionSchema>

// CAPTCHA verification validation
export const captchaVerificationSchema = z.object({
  token: z.string().min(1),
})

export type CaptchaVerification = z.infer<typeof captchaVerificationSchema>

// Admin action validation
export const adminActionSchema = z.object({
  action: z.string().min(1).max(100),
  targetId: z.string().optional(),
  targetType: z.string().optional(),
  changes: z.record(z.string(), z.any()).optional(),
})

export type AdminAction = z.infer<typeof adminActionSchema>

// Helper function to validate and parse
export function validateInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  try {
    const validated = schema.parse(data)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error }
    }
    throw error
  }
}

// Helper to format validation errors
export function formatValidationError(error: z.ZodError<any>): string {
  return error.issues.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')
}
