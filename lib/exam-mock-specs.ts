/**
 * Single source of truth for CSS-style exam mocks (IDs 1–20).
 * Used by the mock runner route, dashboard, and mock listing page.
 */

export type ExamMockDifficulty = 'Standard' | 'Advanced' | 'Expert'

export const EXAM_MOCK_DIFFICULTY_ORDER: ExamMockDifficulty[] = [
  'Standard',
  'Advanced',
  'Expert',
]

export type ExamMockIconKey =
  | 'Target'
  | 'FileText'
  | 'Layers'
  | 'BookOpen'
  | 'Star'
  | 'Zap'
  | 'Clock'
  | 'TrendingUp'
  | 'Flame'
  | 'BarChart2'
  | 'Brain'
  | 'Activity'
  | 'Trophy'
  | 'Crosshair'
  | 'Shield'
  | 'Award'
  | 'Cpu'
  | 'CheckCircle'
  | 'Sparkles'
  | 'Flag'

export interface ExamMockSpec {
  title: string
  multiplier: number
  qTypes: string[]
  difficulty: ExamMockDifficulty
  /** Short line for lists and dashboard */
  summary: string
  iconKey: ExamMockIconKey
}

export const EXAM_MOCK_SPECS: Record<number, ExamMockSpec> = {
  1: {
    title: 'Full Exam Simulation',
    multiplier: 1.0,
    qTypes: ['most_repeated'],
    difficulty: 'Standard',
    summary: 'Full exam simulation',
    iconKey: 'Target',
  },
  2: {
    title: 'Past Paper Pattern',
    multiplier: 1.0,
    qTypes: ['practice'],
    difficulty: 'Standard',
    summary: 'Past paper pattern',
    iconKey: 'FileText',
  },
  3: {
    title: 'Subject-wise Balanced',
    multiplier: 1.0,
    qTypes: ['most_repeated', 'most_important', 'practice'],
    difficulty: 'Standard',
    summary: 'Subject-wise balanced',
    iconKey: 'Layers',
  },
  4: {
    title: 'Core Concepts Focus',
    multiplier: 1.0,
    qTypes: ['most_important'],
    difficulty: 'Standard',
    summary: 'Core concepts focus',
    iconKey: 'BookOpen',
  },
  5: {
    title: '75% Warm-up Test',
    multiplier: 0.75,
    qTypes: ['most_repeated'],
    difficulty: 'Standard',
    summary: '75% length warm-up',
    iconKey: 'Star',
  },
  6: {
    title: 'Mixed Topics Sampler',
    multiplier: 0.75,
    qTypes: ['most_repeated', 'most_important', 'practice'],
    difficulty: 'Standard',
    summary: 'Mixed topics sampler',
    iconKey: 'Zap',
  },
  7: {
    title: 'Quick 50% Revision',
    multiplier: 0.5,
    qTypes: ['most_important'],
    difficulty: 'Standard',
    summary: 'Quick 50% revision',
    iconKey: 'Clock',
  },
  8: {
    title: 'Advanced Full Simulation',
    multiplier: 1.0,
    qTypes: ['most_repeated'],
    difficulty: 'Advanced',
    summary: 'Advanced full simulation',
    iconKey: 'TrendingUp',
  },
  9: {
    title: 'High-Yield MCQ Focus',
    multiplier: 1.0,
    qTypes: ['most_repeated', 'most_important'],
    difficulty: 'Advanced',
    summary: 'High-yield MCQ focus',
    iconKey: 'Flame',
  },
  10: {
    title: 'Comprehensive Deep-Dive',
    multiplier: 1.0,
    qTypes: ['most_repeated', 'most_important', 'practice'],
    difficulty: 'Advanced',
    summary: 'Comprehensive deep-dive',
    iconKey: 'BarChart2',
  },
  11: {
    title: '75% Analytical Test',
    multiplier: 0.75,
    qTypes: ['most_important'],
    difficulty: 'Advanced',
    summary: '75% analytical test',
    iconKey: 'Brain',
  },
  12: {
    title: 'Speed & Pressure Test',
    multiplier: 0.5,
    qTypes: ['most_repeated'],
    difficulty: 'Advanced',
    summary: 'Speed & pressure test',
    iconKey: 'Activity',
  },
  13: {
    title: 'Intensive Practice Set',
    multiplier: 1.0,
    qTypes: ['practice'],
    difficulty: 'Advanced',
    summary: 'Intensive practice set',
    iconKey: 'Trophy',
  },
  14: {
    title: 'Rapid Fire Blitz',
    multiplier: 0.25,
    qTypes: ['most_repeated'],
    difficulty: 'Advanced',
    summary: 'Rapid fire — 25% blitz',
    iconKey: 'Crosshair',
  },
  15: {
    title: 'Expert Level Full Test',
    multiplier: 1.0,
    qTypes: ['most_repeated', 'most_important', 'practice'],
    difficulty: 'Expert',
    summary: 'Expert level full test',
    iconKey: 'Shield',
  },
  16: {
    title: 'Ultimate Challenge',
    multiplier: 1.0,
    qTypes: ['most_repeated', 'most_important', 'practice'],
    difficulty: 'Expert',
    summary: 'Ultimate challenge',
    iconKey: 'Award',
  },
  17: {
    title: '75% Champions Drill',
    multiplier: 0.75,
    qTypes: ['most_repeated', 'most_important'],
    difficulty: 'Expert',
    summary: '75% champions drill',
    iconKey: 'Cpu',
  },
  18: {
    title: 'Final Comprehensive Review',
    multiplier: 1.0,
    qTypes: ['most_repeated', 'most_important', 'practice'],
    difficulty: 'Expert',
    summary: 'Final comprehensive review',
    iconKey: 'CheckCircle',
  },
  19: {
    title: 'Grand Master Simulation',
    multiplier: 1.0,
    qTypes: ['most_repeated', 'most_important', 'practice'],
    difficulty: 'Expert',
    summary: 'Grand master simulation',
    iconKey: 'Sparkles',
  },
  20: {
    title: 'The Final Assessment',
    multiplier: 1.0,
    qTypes: ['most_repeated', 'most_important', 'practice'],
    difficulty: 'Expert',
    summary: 'The final assessment',
    iconKey: 'Flag',
  },
}

export function examMocksForDifficulty(difficulty: ExamMockDifficulty) {
  return Object.entries(EXAM_MOCK_SPECS)
    .filter(([, spec]) => spec.difficulty === difficulty)
    .map(([id, spec]) => ({ id: Number(id), ...spec }))
    .sort((a, b) => a.id - b.id)
}

export function examMockSpec(mockId: number): ExamMockSpec | undefined {
  return EXAM_MOCK_SPECS[mockId]
}
