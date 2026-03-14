'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  ArrowLeft, ArrowRight, Clock, CheckCircle2, XCircle,
  Lightbulb, Flag, Send, RotateCcw, BookOpen,
} from 'lucide-react'
import { useAuth } from '@/lib/contexts/AuthContext'
import SignInPopup from '@/components/auth/SignInPopup'
import { saveQuizResults } from '@/lib/analytics'

// ── Types ──────────────────────────────────────────────────────────────────────

interface MockMCQ {
  id: number
  question: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  difficulty: string
  topic: string
  subtopic?: string
  explanation?: string
  _subject: string
  _color: string
  _bgColor: string
  _sectionIndex: number
}

interface Section {
  key: string
  table: string
  label: string
  count: number
  color: string
  bgColor: string
}

interface MockConfig {
  name: string
  badge: string
  shortBadge: string
  durationMinutes: number
  passingPercent: number
  negativeMarking: boolean
  maxMocks: number   // max fully non-overlapping numbered mocks
  sections: Section[]
}

type Phase = 'loading' | 'intro' | 'quiz' | 'results'

// ── Configs ────────────────────────────────────────────────────────────────────

const MOCK_CONFIGS: Record<string, MockConfig> = {
  // Legacy alias — keep for backward compat
  provincial: {
    name: 'PMC National MDCAT 2025',
    badge: 'UHS · SIBA · BUMHS · SZABMU · All Provinces',
    shortBadge: 'All Provinces',
    durationMinutes: 180,
    passingPercent: 65,
    negativeMarking: false,
    maxMocks: 73,
    sections: [
      { key: 'biology',          table: 'mdcat_biology',           label: 'Biology',          count: 81, color: 'from-emerald-600 to-green-700',  bgColor: 'bg-emerald-500' },
      { key: 'chemistry',        table: 'mdcat_chemistry',         label: 'Chemistry',        count: 45, color: 'from-purple-600 to-violet-700',  bgColor: 'bg-purple-500'  },
      { key: 'physics',          table: 'mdcat_physics',           label: 'Physics',          count: 36, color: 'from-blue-600 to-indigo-700',    bgColor: 'bg-blue-500'    },
      { key: 'english',          table: 'mdcat_english',           label: 'English',          count: 9,  color: 'from-amber-600 to-orange-700',   bgColor: 'bg-amber-500'   },
      { key: 'logical-reasoning',table: 'mdcat_logical_reasoning', label: 'Logical Reasoning',count: 9,  color: 'from-rose-600 to-pink-700',      bgColor: 'bg-rose-500'    },
    ],
  },
  pmc: {
    name: 'PMC National MDCAT 2025',
    badge: 'UHS · SIBA · BUMHS · SZABMU · All Provinces',
    shortBadge: 'All Provinces',
    durationMinutes: 180,
    passingPercent: 65,
    negativeMarking: false,
    maxMocks: 73,
    sections: [
      { key: 'biology',          table: 'mdcat_biology',           label: 'Biology',          count: 81, color: 'from-emerald-600 to-green-700',  bgColor: 'bg-emerald-500' },
      { key: 'chemistry',        table: 'mdcat_chemistry',         label: 'Chemistry',        count: 45, color: 'from-purple-600 to-violet-700',  bgColor: 'bg-purple-500'  },
      { key: 'physics',          table: 'mdcat_physics',           label: 'Physics',          count: 36, color: 'from-blue-600 to-indigo-700',    bgColor: 'bg-blue-500'    },
      { key: 'english',          table: 'mdcat_english',           label: 'English',          count: 9,  color: 'from-amber-600 to-orange-700',   bgColor: 'bg-amber-500'   },
      { key: 'logical-reasoning',table: 'mdcat_logical_reasoning', label: 'Logical Reasoning',count: 9,  color: 'from-rose-600 to-pink-700',      bgColor: 'bg-rose-500'    },
    ],
  },
  uhs: {
    name: 'UHS Punjab MDCAT 2025',
    badge: 'University of Health Sciences · Punjab',
    shortBadge: 'Punjab',
    durationMinutes: 180,
    passingPercent: 65,
    negativeMarking: false,
    maxMocks: 73,
    sections: [
      { key: 'biology',          table: 'mdcat_biology',           label: 'Biology',          count: 81, color: 'from-emerald-600 to-green-700',  bgColor: 'bg-emerald-500' },
      { key: 'chemistry',        table: 'mdcat_chemistry',         label: 'Chemistry',        count: 45, color: 'from-purple-600 to-violet-700',  bgColor: 'bg-purple-500'  },
      { key: 'physics',          table: 'mdcat_physics',           label: 'Physics',          count: 36, color: 'from-blue-600 to-indigo-700',    bgColor: 'bg-blue-500'    },
      { key: 'english',          table: 'mdcat_english',           label: 'English',          count: 9,  color: 'from-amber-600 to-orange-700',   bgColor: 'bg-amber-500'   },
      { key: 'logical-reasoning',table: 'mdcat_logical_reasoning', label: 'Logical Reasoning',count: 9,  color: 'from-rose-600 to-pink-700',      bgColor: 'bg-rose-500'    },
    ],
  },
  szabmu: {
    name: 'SZABMU MDCAT 2025',
    badge: 'SZABMU · Federal Medical Admissions',
    shortBadge: 'Federal',
    durationMinutes: 180,
    passingPercent: 65,
    negativeMarking: false,
    maxMocks: 73,
    sections: [
      { key: 'biology',          table: 'mdcat_biology',           label: 'Biology',          count: 81, color: 'from-emerald-600 to-green-700',  bgColor: 'bg-emerald-500' },
      { key: 'chemistry',        table: 'mdcat_chemistry',         label: 'Chemistry',        count: 45, color: 'from-purple-600 to-violet-700',  bgColor: 'bg-purple-500'  },
      { key: 'physics',          table: 'mdcat_physics',           label: 'Physics',          count: 36, color: 'from-blue-600 to-indigo-700',    bgColor: 'bg-blue-500'    },
      { key: 'english',          table: 'mdcat_english',           label: 'English',          count: 9,  color: 'from-amber-600 to-orange-700',   bgColor: 'bg-amber-500'   },
      { key: 'logical-reasoning',table: 'mdcat_logical_reasoning', label: 'Logical Reasoning',count: 9,  color: 'from-rose-600 to-pink-700',      bgColor: 'bg-rose-500'    },
    ],
  },
  siba: {
    name: 'SIBA MDCAT 2025',
    badge: 'Sukkur IBA Testing Services · Sindh',
    shortBadge: 'Sindh',
    durationMinutes: 180,
    passingPercent: 65,
    negativeMarking: false,
    maxMocks: 73,
    sections: [
      { key: 'biology',          table: 'mdcat_biology',           label: 'Biology',          count: 81, color: 'from-emerald-600 to-green-700',  bgColor: 'bg-emerald-500' },
      { key: 'chemistry',        table: 'mdcat_chemistry',         label: 'Chemistry',        count: 45, color: 'from-purple-600 to-violet-700',  bgColor: 'bg-purple-500'  },
      { key: 'physics',          table: 'mdcat_physics',           label: 'Physics',          count: 36, color: 'from-blue-600 to-indigo-700',    bgColor: 'bg-blue-500'    },
      { key: 'english',          table: 'mdcat_english',           label: 'English',          count: 9,  color: 'from-amber-600 to-orange-700',   bgColor: 'bg-amber-500'   },
      { key: 'logical-reasoning',table: 'mdcat_logical_reasoning', label: 'Logical Reasoning',count: 9,  color: 'from-rose-600 to-pink-700',      bgColor: 'bg-rose-500'    },
    ],
  },
  bumhs: {
    name: 'BUMHS MDCAT 2025',
    badge: 'Bolan University of Medical & Health Sciences',
    shortBadge: 'Balochistan',
    durationMinutes: 180,
    passingPercent: 65,
    negativeMarking: false,
    maxMocks: 73,
    sections: [
      { key: 'biology',          table: 'mdcat_biology',           label: 'Biology',          count: 81, color: 'from-emerald-600 to-green-700',  bgColor: 'bg-emerald-500' },
      { key: 'chemistry',        table: 'mdcat_chemistry',         label: 'Chemistry',        count: 45, color: 'from-purple-600 to-violet-700',  bgColor: 'bg-purple-500'  },
      { key: 'physics',          table: 'mdcat_physics',           label: 'Physics',          count: 36, color: 'from-blue-600 to-indigo-700',    bgColor: 'bg-blue-500'    },
      { key: 'english',          table: 'mdcat_english',           label: 'English',          count: 9,  color: 'from-amber-600 to-orange-700',   bgColor: 'bg-amber-500'   },
      { key: 'logical-reasoning',table: 'mdcat_logical_reasoning', label: 'Logical Reasoning',count: 9,  color: 'from-rose-600 to-pink-700',      bgColor: 'bg-rose-500'    },
    ],
  },
  etea: {
    name: 'ETEA / KMU MDCAT',
    badge: 'Khyber Pakhtunkhwa · KMU · Negative Marking',
    shortBadge: 'KPK Province',
    durationMinutes: 150,
    passingPercent: 60,
    negativeMarking: true,
    maxMocks: 46,
    sections: [
      { key: 'biology',   table: 'mdcat_biology',   label: 'Biology',   count: 60, color: 'from-emerald-600 to-teal-700',  bgColor: 'bg-emerald-500' },
      { key: 'chemistry', table: 'mdcat_chemistry', label: 'Chemistry', count: 60, color: 'from-purple-600 to-violet-700', bgColor: 'bg-purple-500'  },
      { key: 'physics',   table: 'mdcat_physics',   label: 'Physics',   count: 60, color: 'from-blue-600 to-indigo-700',   bgColor: 'bg-blue-500'    },
      { key: 'english',   table: 'mdcat_english',   label: 'English',   count: 20, color: 'from-amber-600 to-orange-700',  bgColor: 'bg-amber-500'   },
    ],
  },
  nums: {
    name: 'NUMS MDCAT',
    badge: 'National University of Medical Sciences · Military',
    shortBadge: 'Military Colleges',
    durationMinutes: 165,
    passingPercent: 55,
    negativeMarking: false,
    maxMocks: 61,
    sections: [
      { key: 'biology',   table: 'mdcat_biology',   label: 'Biology',   count: 60, color: 'from-emerald-600 to-green-700', bgColor: 'bg-emerald-500' },
      { key: 'chemistry', table: 'mdcat_chemistry', label: 'Chemistry', count: 38, color: 'from-purple-600 to-violet-700', bgColor: 'bg-purple-500'  },
      { key: 'physics',   table: 'mdcat_physics',   label: 'Physics',   count: 37, color: 'from-blue-600 to-indigo-700',   bgColor: 'bg-blue-500'    },
      { key: 'english',   table: 'mdcat_english',   label: 'English',   count: 15, color: 'from-amber-600 to-orange-700',  bgColor: 'bg-amber-500'   },
    ],
  },
  aku: {
    name: 'AKU Entry Test',
    badge: 'Aga Khan University · Karachi · Highly Competitive',
    shortBadge: 'Private University',
    durationMinutes: 135,
    passingPercent: 70,
    negativeMarking: false,
    maxMocks: 46,
    sections: [
      { key: 'biology',          table: 'mdcat_biology',           label: 'Biology',            count: 20, color: 'from-emerald-600 to-green-700',  bgColor: 'bg-emerald-500' },
      { key: 'chemistry',        table: 'mdcat_chemistry',         label: 'Chemistry',          count: 20, color: 'from-purple-600 to-violet-700',  bgColor: 'bg-purple-500'  },
      { key: 'physics',          table: 'mdcat_physics',           label: 'Physics',            count: 20, color: 'from-blue-600 to-indigo-700',    bgColor: 'bg-blue-500'    },
      { key: 'english',          table: 'mdcat_english',           label: 'English',            count: 20, color: 'from-amber-600 to-orange-700',   bgColor: 'bg-amber-500'   },
      { key: 'logical-reasoning',table: 'mdcat_logical_reasoning', label: 'Analytical Reasoning',count: 20, color: 'from-rose-600 to-pink-700',     bgColor: 'bg-rose-500'    },
    ],
  },
}

// Approximate table sizes for random offset calculation
const TABLE_SIZES: Record<string, number> = {
  mdcat_biology: 5944,
  mdcat_chemistry: 6218,
  mdcat_physics: 4695,
  mdcat_english: 925,
  mdcat_logical_reasoning: 1180,
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

async function fetchSectionMCQs(
  section: Section,
  supabase: ReturnType<typeof createClient>,
  sectionIndex: number,
  mockNumber?: number,
): Promise<MockMCQ[]> {
  // Deterministic mode — Mock N uses rows [(N-1)*count … N*count-1], ordered by id
  if (mockNumber !== undefined) {
    const offset = (mockNumber - 1) * section.count
    const { data, error } = await supabase
      .from(section.table)
      .select('id, question, option_a, option_b, option_c, option_d, correct_answer, difficulty, topic, subtopic')
      .order('id')
      .range(offset, offset + section.count - 1)
    if (error || !data) return []
    return (data as any[]).map(row => ({
      ...row,
      _subject: section.label,
      _color: section.color,
      _bgColor: section.bgColor,
      _sectionIndex: sectionIndex,
    }))
  }

  // Random mode — fetch a large window and shuffle
  const totalRows = TABLE_SIZES[section.table] ?? 1000
  const fetchCount = Math.min(section.count * 5, 400)
  const maxOffset = Math.max(0, totalRows - fetchCount)
  const randomOffset = Math.floor(Math.random() * maxOffset)

  const { data, error } = await supabase
    .from(section.table)
    .select('id, question, option_a, option_b, option_c, option_d, correct_answer, difficulty, topic, subtopic')
    .range(randomOffset, randomOffset + fetchCount - 1)

  if (error || !data) return []

  return (data as any[])
    .sort(() => Math.random() - 0.5)
    .slice(0, section.count)
    .map(row => ({
      ...row,
      _subject: section.label,
      _color: section.color,
      _bgColor: section.bgColor,
      _sectionIndex: sectionIndex,
    }))
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function MDCATMockTest({ variant, mockNumber }: { variant: string; mockNumber?: number }) {
  const router = useRouter()
  const config = MOCK_CONFIGS[variant]

  const { user, loading: authLoading } = useAuth()
  const isPremium = !!user?.user_metadata?.is_premium

  const [showSignIn, setShowSignIn] = useState(false)

  // Access gate: mock 1 = free, mock 2 = sign-in required, mock 3+ = premium page
  useEffect(() => {
    if (!mockNumber || authLoading) return
    if (mockNumber >= 3 && !isPremium) {
      router.replace('/premium')
    } else if (mockNumber === 2 && !user) {
      setShowSignIn(true)
    }
  }, [authLoading, user, isPremium, mockNumber])

  const [phase, setPhase]                     = useState<Phase>('loading')
  const [mcqs, setMcqs]                       = useState<MockMCQ[]>([])
  const [answers, setAnswers]                 = useState<Record<number, string>>({})
  const [flagged, setFlagged]                 = useState<Set<number>>(new Set())
  const [currentIndex, setCurrentIndex]       = useState(0)
  const [timeLeft, setTimeLeft]               = useState(0)
  const [timerActive, setTimerActive]         = useState(false)
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)
  const [reviewIndex, setReviewIndex]         = useState(0)
  const [reviewMode, setReviewMode]           = useState(false)
  const submittedRef                          = useRef(false)

  // Pre-compute section boundaries once mcqs are loaded
  const sectionBoundaries = config
    ? config.sections.reduce((acc, section, idx) => {
        const start = idx === 0 ? 0 : acc[idx - 1].end
        acc.push({ start, end: start + section.count })
        return acc
      }, [] as { start: number; end: number }[])
    : []

  // Load MCQs on mount
  useEffect(() => {
    if (!config) return
    const supabase = createClient()
    Promise.all(config.sections.map((section, idx) => fetchSectionMCQs(section, supabase, idx, mockNumber)))
      .then(sectionMCQs => {
        const allMCQs: MockMCQ[] = []
        sectionMCQs.forEach(mcqsForSection => allMCQs.push(...mcqsForSection))
        setMcqs(allMCQs)
        setPhase('intro')
      })
      .catch(() => setPhase('intro'))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Timer countdown
  useEffect(() => {
    if (!timerActive || timeLeft <= 0) {
      if (timerActive && timeLeft <= 0 && !submittedRef.current) handleSubmit()
      return
    }
    const interval = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(interval)
  }, [timerActive, timeLeft]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleStart = () => {
    setTimeLeft(config.durationMinutes * 60)
    setTimerActive(true)
    setCurrentIndex(0)
    setPhase('quiz')
  }

  const handleSubmit = useCallback(() => {
    if (submittedRef.current) return
    submittedRef.current = true
    setTimerActive(false)
    setShowSubmitConfirm(false)
    setPhase('results')
  }, [])

  // Save analytics when results phase is reached
  useEffect(() => {
    if (phase !== 'results' || mcqs.length === 0) return
    const correct  = mcqs.filter((mcq, idx) => answers[idx] === mcq.correct_answer).length
    const wrong    = mcqs.filter((mcq, idx) => answers[idx] && answers[idx] !== mcq.correct_answer).length
    const skipped  = mcqs.length - Object.keys(answers).length
    const timeUsed = config ? Math.max(0, config.durationMinutes * 60 - timeLeft) : 0
    saveQuizResults({
      quizType:       'mock',
      examSlug:       `mdcat-${variant}`,
      subject:        config?.name ?? 'MDCAT',
      totalQuestions: mcqs.length,
      correctAnswers: correct,
      wrongAnswers:   wrong,
      skippedAnswers: skipped,
      timeInSeconds:  timeUsed,
    }).catch(() => {/* silent — analytics failure should never block UI */})
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleFlag = (index: number) => {
    setFlagged(prev => {
      const next = new Set(prev)
      next.has(index) ? next.delete(index) : next.add(index)
      return next
    })
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Test not found.</p>
          <button
            onClick={() => router.push('/mdcat/mock')}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            ← Back to MDCAT Mocks
          </button>
        </div>
      </div>
    )
  }

  const total = config.sections.reduce((s, c) => s + c.count, 0)

  // ── Loading ──────────────────────────────────────────────────────────────────

  if (phase === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-700 font-medium">
            {mockNumber ? `Preparing Mock Test #${mockNumber}…` : 'Preparing your mock test…'}
          </p>
          <p className="text-sm text-gray-400 mt-1">Fetching {total} questions</p>
        </div>
      </div>
    )
  }

  // ── Intro ────────────────────────────────────────────────────────────────────

  if (phase === 'intro') {
    const h = Math.floor(config.durationMinutes / 60)
    const m = config.durationMinutes % 60

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        {/* Access gate popups */}
        <SignInPopup
          isOpen={showSignIn}
          onClose={() => { setShowSignIn(false); router.push(`/mdcat/mock/${variant}`) }}
        />
        <div className="max-w-lg w-full">
          <button
            onClick={() => router.push(mockNumber ? `/mdcat/mock/${variant}` : '/mdcat')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {mockNumber ? 'All Mock Tests' : 'Back to MDCAT'}
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 p-6">
              <h1 className="text-2xl font-bold text-white mb-1">{config.name}</h1>
              {mockNumber && (
                <p className="text-white/90 text-base font-semibold">Mock Test #{mockNumber}</p>
              )}
              <p className="text-blue-200 text-sm">{config.badge}</p>
            </div>

            <div className="p-6">
              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-blue-700">{total}</div>
                  <div className="text-xs text-blue-600 mt-0.5">MCQs</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-slate-700">{h > 0 ? `${h}h${m > 0 ? ` ${m}m` : ''}` : `${m}m`}</div>
                  <div className="text-xs text-slate-600 mt-0.5">Duration</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-green-700">{config.passingPercent}%</div>
                  <div className="text-xs text-green-600 mt-0.5">Pass Mark</div>
                </div>
              </div>

              {/* Subject distribution */}
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Subject Distribution</p>
              <div className="space-y-2 mb-6">
                {config.sections.map(section => (
                  <div key={section.key} className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${section.bgColor}`} />
                    <span className="text-sm text-gray-700 flex-1">{section.label}</span>
                    <div className="w-24 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${section.bgColor}`}
                        style={{ width: `${(section.count / total) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-14 text-right">{section.count} MCQs</span>
                  </div>
                ))}
              </div>

              {/* Instructions */}
              <div className={`border rounded-xl p-4 mb-6 ${config.negativeMarking ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                <p className={`font-semibold text-sm mb-2 ${config.negativeMarking ? 'text-red-900' : 'text-amber-900'}`}>Instructions</p>
                <ul className={`space-y-1 text-xs list-disc list-inside ${config.negativeMarking ? 'text-red-700' : 'text-amber-700'}`}>
                  <li>Navigate freely between all questions</li>
                  <li>You can change answers before submitting</li>
                  <li>Flag questions to revisit later</li>
                  <li>Test auto-submits when time expires</li>
                  {config.negativeMarking
                    ? <li className="font-semibold">⚠ Negative marking: −0.25 for each wrong answer</li>
                    : <li>No negative marking</li>
                  }
                </ul>
              </div>

              <button
                onClick={handleStart}
                disabled={mcqs.length === 0}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3.5 px-6 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {mcqs.length === 0 ? 'Loading questions...' : 'Start Mock Test'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Quiz ─────────────────────────────────────────────────────────────────────

  if (phase === 'quiz') {
    const currentMCQ = mcqs[currentIndex]
    const userAnswer = answers[currentIndex]
    const answeredCount = Object.keys(answers).length
    const section = config.sections[currentMCQ._sectionIndex]
    const isFlagged = flagged.has(currentIndex)
    const isLowTime = timeLeft <= 300

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-2 px-2 sm:px-4">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 border border-blue-500/30 rounded-2xl p-3 mb-3 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${section.bgColor}`} />
                <span className="text-white/90 text-sm font-medium">{currentMCQ._subject}</span>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono font-bold text-sm ${
                isLowTime ? 'bg-red-500/20 text-red-300 animate-pulse' : 'bg-white/10 text-white'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                {formatTime(timeLeft)}
              </div>
            </div>

            <div className="flex items-center justify-between text-white/60 text-xs mb-2">
              <span>Q {currentIndex + 1} / {mcqs.length}</span>
              <span>{answeredCount} answered · {mcqs.length - answeredCount} remaining</span>
            </div>

            <div className="bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / mcqs.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 mb-3 border-2 border-gray-100">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-gradient-to-r ${currentMCQ._color} text-white`}>
                {currentMCQ._subject}
              </span>
              <span className="text-xs text-gray-400">{currentMCQ.difficulty}</span>
              {currentMCQ.topic && (
                <span className="text-xs text-gray-400 truncate max-w-[140px]">{currentMCQ.topic}</span>
              )}
              <button
                onClick={() => toggleFlag(currentIndex)}
                className={`ml-auto flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs border transition-colors ${
                  isFlagged
                    ? 'bg-yellow-50 border-yellow-400 text-yellow-700'
                    : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-yellow-300 hover:text-yellow-600'
                }`}
              >
                <Flag className="w-3 h-3" />
                {isFlagged ? 'Flagged' : 'Flag'}
              </button>
            </div>

            <p className="text-gray-900 text-base font-medium mb-5 leading-relaxed">
              {currentMCQ.question}
            </p>

            <div className="space-y-2.5">
              {(['A', 'B', 'C', 'D'] as const).map(opt => {
                const optText = currentMCQ[`option_${opt.toLowerCase()}` as keyof MockMCQ] as string
                const isSelected = userAnswer === opt
                return (
                  <button
                    key={opt}
                    onClick={() => setAnswers(prev => ({ ...prev, [currentIndex]: opt }))}
                    className={`w-full flex items-start gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? 'bg-blue-50 border-blue-500'
                        : 'bg-gray-50 hover:bg-blue-50 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-semibold text-sm ${
                      isSelected ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300 text-gray-600'
                    }`}>
                      {opt}
                    </div>
                    <span className={`flex-1 ${isSelected ? 'text-blue-900' : 'text-gray-800'}`}>{optText}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Prev
            </button>

            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-green-700 text-white py-2.5 px-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit ({answeredCount}/{mcqs.length})
            </button>

            <button
              onClick={() => setCurrentIndex(i => Math.min(mcqs.length - 1, i + 1))}
              disabled={currentIndex === mcqs.length - 1}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Question Navigator */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-medium">Navigator</span>
              <div className="flex items-center gap-2.5 text-[10px] text-gray-400">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-blue-500 inline-block" /> Current</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-green-500 inline-block" /> Done</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-yellow-400 inline-block" /> Flagged</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-gray-200 inline-block" /> Skip</span>
              </div>
            </div>

            <div className="space-y-2">
              {config.sections.map((sec, sIdx) => {
                const { start, end } = sectionBoundaries[sIdx]
                return (
                  <div key={sec.key}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${sec.bgColor}`} />
                      <span className="text-[10px] text-gray-400 font-medium">{sec.label}</span>
                    </div>
                    <div className="flex flex-wrap gap-0.5">
                      {Array.from({ length: end - start }, (_, i) => {
                        const gIdx = start + i
                        const isAnswered = gIdx in answers
                        const isCurrent = gIdx === currentIndex
                        const isFlaggedQ = flagged.has(gIdx)
                        return (
                          <button
                            key={gIdx}
                            onClick={() => setCurrentIndex(gIdx)}
                            title={`Q${gIdx + 1}`}
                            className={`w-5 h-5 rounded text-[7px] font-medium transition-all flex items-center justify-center ${
                              isCurrent
                                ? 'bg-blue-500 text-white ring-1 ring-blue-300'
                                : isFlaggedQ
                                ? 'bg-yellow-400 text-white'
                                : isAnswered
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                          >
                            {gIdx + 1}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Submit Confirm Modal */}
        {showSubmitConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Submit Test?</h3>
              <p className="text-gray-600 text-sm mb-1">{answeredCount} of {mcqs.length} questions answered.</p>
              {mcqs.length - answeredCount > 0 && (
                <p className="text-amber-600 text-sm font-medium">
                  {mcqs.length - answeredCount} questions unanswered — will count as wrong.
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
                  onClick={handleSubmit}
                  className="flex-1 bg-green-600 text-white py-2.5 rounded-xl font-semibold hover:bg-green-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ── Results ──────────────────────────────────────────────────────────────────

  if (phase === 'results') {
    const totalCorrect = mcqs.filter((mcq, idx) => answers[idx] === mcq.correct_answer).length
    const totalWrong   = mcqs.filter((mcq, idx) => answers[idx] && answers[idx] !== mcq.correct_answer).length
    const rawScore     = config.negativeMarking ? totalCorrect - (totalWrong * 0.25) : totalCorrect
    const maxScore     = config.negativeMarking ? mcqs.length : mcqs.length
    const totalPercent = mcqs.length > 0 ? (Math.max(0, rawScore) / maxScore * 100).toFixed(1) : '0.0'
    const passed = parseFloat(totalPercent) >= config.passingPercent

    // Per-section breakdown
    const sectionScores = config.sections.map((section, sIdx) => {
      const { start, end } = sectionBoundaries[sIdx]
      const sectionMCQs = mcqs.slice(start, end)
      const correct = sectionMCQs.filter((mcq, i) => answers[start + i] === mcq.correct_answer).length
      return { ...section, correct, total: end - start, percent: Math.round((correct / (end - start)) * 100) }
    })

    const wrongItems = mcqs
      .map((mcq, idx) => ({ mcq, idx, userAnswer: answers[idx] }))
      .filter(({ mcq, idx }) => answers[idx] !== mcq.correct_answer)

    // Review mode — show wrong answers one by one
    if (reviewMode) {
      // Guard: if somehow reviewMode is active with no wrong items, exit cleanly
      if (wrongItems.length === 0 || reviewIndex >= wrongItems.length) {
        setReviewMode(false)
        return null
      }
      const { mcq, userAnswer } = wrongItems[reviewIndex]
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-2 px-2 sm:px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 border border-blue-500/30 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <button onClick={() => setReviewMode(false)} className="text-white/80 hover:text-white text-sm flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" /> Results
                </button>
                <span className="text-white/70 text-sm">Review {reviewIndex + 1} / {wrongItems.length}</span>
              </div>
              <div className="bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-full transition-all"
                  style={{ width: `${((reviewIndex + 1) / wrongItems.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 mb-4 border-2 border-gray-100">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-gradient-to-r ${mcq._color} text-white`}>
                  {mcq._subject}
                </span>
                <span className="text-xs text-gray-400">{mcq.topic}</span>
              </div>

              <p className="text-gray-900 font-medium mb-5 leading-relaxed">{mcq.question}</p>

              <div className="space-y-2.5">
                {(['A', 'B', 'C', 'D'] as const).map(opt => {
                  const optText = mcq[`option_${opt.toLowerCase()}` as keyof MockMCQ] as string
                  const isCorrect = opt === mcq.correct_answer
                  const isSelected = userAnswer === opt
                  return (
                    <div key={opt} className={`flex items-start gap-3 p-3.5 rounded-xl border-2 ${
                      isCorrect
                        ? 'bg-green-50 border-green-500'
                        : isSelected
                        ? 'bg-red-50 border-red-400 opacity-80'
                        : 'bg-gray-50 border-gray-200 opacity-50'
                    }`}>
                      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-semibold text-sm ${
                        isCorrect ? 'bg-green-500 border-green-500 text-white'
                        : isSelected ? 'bg-red-500 border-red-500 text-white'
                        : 'border-gray-300 text-gray-400'
                      }`}>{opt}</div>
                      <span className={`flex-1 ${isCorrect ? 'text-green-900' : isSelected ? 'text-red-900' : 'text-gray-400'}`}>
                        {optText}
                      </span>
                      {isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
                    </div>
                  )
                })}
              </div>

              {mcq.explanation && (
                <div className="mt-4 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm text-amber-900 mb-1">Explanation</p>
                      <p className="text-sm text-amber-800 leading-relaxed">{mcq.explanation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setReviewIndex(i => Math.max(0, i - 1))}
                disabled={reviewIndex === 0}
                className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-medium disabled:opacity-40 hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Prev
              </button>
              {reviewIndex < wrongItems.length - 1 ? (
                <button
                  onClick={() => setReviewIndex(i => i + 1)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setReviewMode(false)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )
    }

    // Results summary
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-4">
            {/* Score header */}
            <div className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 p-6 text-center">
              <div className={`w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold ${
                passed ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}>
                {totalPercent}%
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{config.name}</h2>
              <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${
                passed ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {passed ? '✓ PASS' : '✗ FAIL'} — {config.passingPercent}% required for MBBS
              </span>
            </div>

            <div className="p-6">
              {/* Overall breakdown */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-green-700">{totalCorrect}</div>
                  <div className="text-xs text-green-600 mt-0.5">Correct</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-red-700">{Object.keys(answers).length - totalCorrect}</div>
                  <div className="text-xs text-red-600 mt-0.5">Wrong</div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-gray-600">{mcqs.length - Object.keys(answers).length}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Skipped</div>
                </div>
              </div>

              {/* Per-subject breakdown */}
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Subject Breakdown</p>
              <div className="space-y-2.5 mb-6">
                {sectionScores.map(s => (
                  <div key={s.key} className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.bgColor}`} />
                    <span className="text-sm text-gray-700 w-28 flex-shrink-0">{s.label}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className={`h-full rounded-full ${s.bgColor} transition-all`} style={{ width: `${s.percent}%` }} />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-14 text-right">{s.correct}/{s.total}</span>
                    <span className="text-xs text-gray-400 w-8 text-right">{s.percent}%</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="space-y-2.5">
                {wrongItems.length > 0 && (
                  <button
                    onClick={() => { setReviewIndex(0); setReviewMode(true) }}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    Review Wrong Answers ({wrongItems.length})
                  </button>
                )}
                {mockNumber ? (
                  <button
                    onClick={() => router.push(`/mdcat/mock/${variant}`)}
                    className="w-full border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Try Another Mock
                  </button>
                ) : (
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    New Mock Test
                  </button>
                )}
                <button
                  onClick={() => router.push('/mdcat')}
                  className="w-full text-blue-600 hover:text-blue-700 py-2 text-sm font-medium transition-colors"
                >
                  ← Back to MDCAT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
