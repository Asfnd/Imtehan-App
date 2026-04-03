'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Target,
  FileText,
  Layers,
  BookOpen,
  Star,
  Zap,
  Clock,
  TrendingUp,
  Flame,
  BarChart2,
  Brain,
  Activity,
  Trophy,
  Crosshair,
  Shield,
  Award,
  Cpu,
  CheckCircle,
  Sparkles,
  Flag,
  ArrowLeft,
  type LucideIcon,
} from 'lucide-react'
import type { ExamConfig } from '@/lib/exam-configs'
import {
  EXAM_MOCK_DIFFICULTY_ORDER,
  examMocksForDifficulty,
  type ExamMockDifficulty,
  type ExamMockIconKey,
  type ExamMockSpec,
} from '@/lib/exam-mock-specs'
import ExamPracticeGridCard from '@/components/exams/ExamPracticeGridCard'

type MockRow = { id: number } & ExamMockSpec

const ICON_MAP: Record<ExamMockIconKey, LucideIcon> = {
  Target,
  FileText,
  Layers,
  BookOpen,
  Star,
  Zap,
  Clock,
  TrendingUp,
  Flame,
  BarChart2,
  Brain,
  Activity,
  Trophy,
  Crosshair,
  Shield,
  Award,
  Cpu,
  CheckCircle,
  Sparkles,
  Flag,
}

const TIER_LEVEL: Record<ExamMockDifficulty, { headline: string; tagline: string }> = {
  Standard: {
    headline: 'Mock — Easy',
    tagline: 'Standard level · best to start here',
  },
  Advanced: {
    headline: 'Mock — Advanced',
    tagline: 'Tougher mix · closer to real pressure',
  },
  Expert: {
    headline: 'Mock — Difficult',
    tagline: 'Expert level · full challenge',
  },
}

const HEADER_CHIP =
  'border border-blue-200 bg-blue-50 text-xs font-medium text-blue-600'

function mockQuestionCount(config: ExamConfig, multiplier: number) {
  return Math.round(config.totalMCQs * multiplier)
}

function mockDurationMinutes(config: ExamConfig, multiplier: number) {
  return Math.round(config.duration * multiplier)
}

export type ExamMockSectionsProps = {
  examSlug: string
  config: ExamConfig
  onMockSelect?: (mockId: number) => void
  lockedAfterFirst?: boolean
  isPremium?: boolean
  tieredLevels?: boolean
}

/** Same grid as Practice by Subject — tier cards use the same column width as subject tiles */
const DASHBOARD_GRID =
  'grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5'

export default function ExamMockSections({
  examSlug,
  config,
  onMockSelect,
  lockedAfterFirst = false,
  isPremium = false,
  tieredLevels = true,
}: ExamMockSectionsProps) {
  const router = useRouter()
  const [openDifficulty, setOpenDifficulty] = useState<ExamMockDifficulty | null>(null)

  const counts = useMemo(() => {
    const out: Record<ExamMockDifficulty, number> = {
      Standard: 0,
      Advanced: 0,
      Expert: 0,
    }
    for (const d of EXAM_MOCK_DIFFICULTY_ORDER) {
      out[d] = examMocksForDifficulty(d).length
    }
    return out
  }, [])

  const navigateOrSelect = (mockId: number) => {
    if (onMockSelect) onMockSelect(mockId)
    else router.push(`/exams/${examSlug}/mock/${mockId}`)
  }

  const isLocked = (mockId: number) =>
    lockedAfterFirst && !isPremium && mockId > 1

  const renderMockCard = (spec: MockRow) => {
    const mockId = spec.id
    const locked = isLocked(mockId)
    const Icon = ICON_MAP[spec.iconKey]
    const qs = mockQuestionCount(config, spec.multiplier)
    const mins = mockDurationMinutes(config, spec.multiplier)

    return (
      <ExamPracticeGridCard
        key={mockId}
        onClick={() => navigateOrSelect(mockId)}
        icon={Icon}
        title={`Mock ${mockId}`}
        subtitle={spec.summary}
        statPrimary={String(qs)}
        statSecondary={`questions · ${mins} min`}
        actionLabel={locked ? 'Premium' : 'Start'}
        locked={locked}
      />
    )
  }

  const renderTierPicker = () => (
    <div className={DASHBOARD_GRID}>
      {EXAM_MOCK_DIFFICULTY_ORDER.map((difficulty) => {
        const tier = TIER_LEVEL[difficulty]
        const n = counts[difficulty]

        return (
          <ExamPracticeGridCard
            key={difficulty}
            onClick={() => setOpenDifficulty(difficulty)}
            icon={BookOpen}
            title={tier.headline}
            subtitle={tier.tagline}
            statPrimary={String(n)}
            statSecondary={n === 1 ? 'mock in this level' : 'mocks in this level'}
            actionLabel="Open"
          />
        )
      })}
    </div>
  )

  const renderFlatAllLevels = () => (
    <div className="flex w-full flex-col gap-10">
      {EXAM_MOCK_DIFFICULTY_ORDER.map((difficulty) => {
        const mocks = examMocksForDifficulty(difficulty)

        return (
          <section key={difficulty} aria-labelledby={`mock-diff-${difficulty}`}>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <h4 id={`mock-diff-${difficulty}`} className="text-base font-semibold text-gray-900">
                {difficulty}
              </h4>
              <span className={`rounded-full px-2 py-0.5 ${HEADER_CHIP}`}>
                {counts[difficulty]} mocks
              </span>
              <div className="h-px min-w-[2rem] flex-1 bg-gray-200" />
            </div>

            <div className={DASHBOARD_GRID}>{mocks.map((m) => renderMockCard(m))}</div>
          </section>
        )
      })}
    </div>
  )

  if (!tieredLevels) {
    return renderFlatAllLevels()
  }

  if (openDifficulty === null) {
    return <div className="w-full">{renderTierPicker()}</div>
  }

  const mocks = examMocksForDifficulty(openDifficulty)
  const tier = TIER_LEVEL[openDifficulty]

  return (
    <div className="w-full">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => setOpenDifficulty(null)}
          className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50/60 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          All mock levels
        </button>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <h4 className="text-base font-semibold text-gray-900">{tier.headline}</h4>
        <span className={`rounded-full px-2 py-0.5 ${HEADER_CHIP}`}>
          {counts[openDifficulty]} mocks
        </span>
        <div className="h-px min-w-[2rem] flex-1 bg-gray-200" />
      </div>

      <div className={DASHBOARD_GRID}>{mocks.map((m) => renderMockCard(m))}</div>
    </div>
  )
}
