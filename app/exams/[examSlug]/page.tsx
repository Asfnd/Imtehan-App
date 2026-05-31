'use client'

import { useEffect, useState, Suspense } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, X, ExternalLink, PenLine } from 'lucide-react'
import { getExamConfig, ExamConfig } from '@/lib/exam-configs'
import { examMockSpec } from '@/lib/exam-mock-specs'
import ExamMockSections from '@/components/exams/ExamMockSections'
import ExamPracticeGridCard from '@/components/exams/ExamPracticeGridCard'
import { createClient } from '@/lib/supabase/client'
import NavigationBar from '@/components/NavigationBar'
import { PremiumPopup } from '@/components/auth/PremiumPopup'
import SignInPopup from '@/components/auth/SignInPopup'
import ExamAnalyticsBar from '@/components/ExamAnalyticsBar'
import { PMS_WRITING_COACH_PATH } from '@/lib/routes'
import { isActivePremium } from '@/lib/is-active-premium'
import { examDashboardMockClick } from '@/lib/premium-gates'

interface SubjectProgress {
  subject: string
  attempted: number
  accuracy: number
}

interface ExamGuideView {
  authority: string
  officialLink?: string
  lastUpdated?: string
  eligibility: string[]
  important: string[]
  helpful: string[]
}

const roundMCQs = (n: number) => {
  if (n >= 10000) return `${Math.floor(n / 1000)}k+`
  if (n >= 1000) return `${Math.floor(n / 500) * 500}+`
  if (n >= 100) return `${Math.floor(n / 50) * 50}+`
  return `${n}`
}

const bankCount = (seed: string, base: number): string => {
  let h = 5381
  for (let i = 0; i < seed.length; i++) h = Math.imul(33, h) ^ seed.charCodeAt(i)
  const value = base + (Math.abs(h) % base)
  const rounded = Math.round(value / 100) * 100
  if (rounded >= 1000) {
    const k = Math.round(rounded / 100) / 10
    return k % 1 === 0 ? `${k}k+` : `${k.toFixed(1)}k+`
  }
  return `${rounded}+`
}

const CATEGORY_AUTHORITIES: Record<string, string> = {
  ppsc: 'Punjab Public Service Commission (PPSC)',
  fpsc: 'Federal Public Service Commission (FPSC)',
  fia: 'Federal Investigation Agency (FIA)',
  provincial: 'Relevant Provincial Public Service Commission',
  police: 'Relevant Police Recruitment Authority',
  military: 'Relevant Armed Forces Recruitment Body',
  nts: 'National Testing Service (NTS)',
  ots: 'Open Testing Service (OTS)',
  etea: 'Educational Testing and Evaluation Agency (ETEA)',
  mdcat: 'Relevant Medical Admissions Authority',
}

const CATEGORY_LINKS: Record<string, string> = {
  ppsc: 'https://www.ppsc.gop.pk/',
  fpsc: 'https://www.fpsc.gov.pk/',
  fia: 'https://fia.gov.pk/',
  nts: 'https://www.nts.org.pk/',
  ots: 'https://ots.org.pk/',
  etea: 'https://etea.edu.pk/',
}

function extractBSLevel(examName: string): number | null {
  const match = examName.match(/BS[-\s]?(\d+)/i)
  if (!match) return null
  const parsed = parseInt(match[1], 10)
  return Number.isNaN(parsed) ? null : parsed
}

function buildExamGuide(examSlug: string, config: ExamConfig): ExamGuideView {
  const bsLevel = extractBSLevel(config.name)
  const qualification = bsLevel === null
    ? 'Qualification varies by post (typically Intermediate to Bachelor).'
    : bsLevel >= 16
      ? 'Typically Bachelor (14/16 years education) or higher.'
      : bsLevel >= 11
        ? 'Typically Intermediate (FA/FSc/ICS/ICom) or equivalent.'
        : 'Typically Matric (or equivalent), sometimes with relevant license/experience.'

  const ageRange = ['police', 'fia', 'military'].includes(config.category)
    ? 'Commonly 18-30 years (can vary by post and quota relaxations).'
    : 'Commonly 18-28 years (age relaxations may apply by policy).'

  const sectionBreakdown = config.sections.map((s) => `${s.label} (${s.count})`).join(', ')
  const defaultGuide: ExamGuideView = {
    authority: CATEGORY_AUTHORITIES[config.category] ?? 'Relevant recruiting/testing authority',
    officialLink: CATEGORY_LINKS[config.category],
    eligibility: [
      qualification,
      ageRange,
      'Domicile/quota requirements follow the official advertisement.',
    ],
    important: [
      `Paper pattern: ${config.totalMCQs} MCQs in ${config.duration} minutes.`,
      `Passing threshold in app: ${config.passingPercentage}%.`,
      `Negative marking: ${config.negativeMarking ? 'Yes' : 'No'}.`,
      `Core subjects: ${sectionBreakdown}.`,
    ],
    helpful: [
      'Start with subject-wise practice, then move to timed mocks.',
      'Prioritize weak sections from analytics before attempting full mocks.',
      'Always verify age/qualification rules from the latest official ad before applying.',
    ],
  }

  if (!config.guide) return defaultGuide

  return {
    authority: config.guide.authority ?? defaultGuide.authority,
    officialLink: config.guide.officialLink ?? defaultGuide.officialLink,
    lastUpdated: config.guide.lastUpdated,
    eligibility: config.guide.eligibility.length > 0 ? config.guide.eligibility : defaultGuide.eligibility,
    important: config.guide.important.length > 0 ? config.guide.important : defaultGuide.important,
    helpful: config.guide.helpful.length > 0 ? config.guide.helpful : defaultGuide.helpful,
  }
}

export default function ExamDashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" /></div>}>
      <ExamDashboard />
    </Suspense>
  )
}

function ExamDashboard() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const examSlug = params.examSlug as string
  const config = getExamConfig(examSlug)
  const preselectedMode = searchParams.get('mode') // e.g. 'most-repeated' or 'most-important'

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showPremium, setShowPremium] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const [pendingMockId, setPendingMockId] = useState<number | null>(null)
  const [subjectProgress, setSubjectProgress] = useState<SubjectProgress[]>([])
  const [subjectsWithCounts, setSubjectsWithCounts] = useState<any[]>([])

  useEffect(() => {
    if (config) {
      loadSubjectCounts()
      checkUser()
    }
  }, [config])

  useEffect(() => {
    if (user && config) {
      loadAnalytics()
    }
  }, [user, config])

  if (!config) {
    router.push('/exams')
    return null
  }

  const isPremium = isActivePremium(user)
  const examGuide = buildExamGuide(examSlug, config)

  const handleMockClick = (mockId: number) => {
    const action = examDashboardMockClick(mockId, !!user, isPremium)
    if (action === 'open') {
      setPendingMockId(mockId)
      return
    }
    if (action === 'require_sign_in') setShowSignIn(true)
    else setShowPremium(true)
  }

  const checkUser = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    setLoading(false)
  }

  const loadSubjectCounts = async () => {
    const supabase = createClient()

    const counts = await Promise.all(
      config.sections.map(async (section) => {
        const { count: pastCount } = await supabase
          .from(section.dbTable)
          .select('*', { count: 'exact', head: true })
          .eq('type', 'practice')

        const { count: importantCount } = await supabase
          .from(section.dbTable)
          .select('*', { count: 'exact', head: true })
          .eq('type', 'most_important')

        const { count: repeatedCount } = await supabase
          .from(section.dbTable)
          .select('*', { count: 'exact', head: true })
          .eq('type', 'most_repeated')

        const totalMCQs = (pastCount || 0) + (importantCount || 0) + (repeatedCount || 0)

        return {
          ...section,
          repeatedCount: repeatedCount || 0,
          importantCount: importantCount || 0,
          pastCount: pastCount || 0,
          totalMCQs
        }
      })
    )

    setSubjectsWithCounts(counts)
  }

  const loadAnalytics = async () => {
    const supabase = createClient()
    const { data: attempts } = await supabase
      .from('quiz_attempts')
      .select('subject_slug, score, total_questions')
      .eq('exam_slug', examSlug)
      .eq('user_id', user.id)

    if (attempts && attempts.length > 0) {
      const subjectMap = new Map<string, { correct: number; total: number }>()
      attempts.forEach(a => {
        const e = subjectMap.get(a.subject_slug) || { correct: 0, total: 0 }
        e.correct += a.score || 0
        e.total   += a.total_questions || 0
        subjectMap.set(a.subject_slug, e)
      })
      setSubjectProgress(
        Array.from(subjectMap.entries()).map(([subject, d]) => ({
          subject,
          attempted: d.total,
          accuracy:  Math.round((d.correct / Math.max(d.total, 1)) * 100),
        }))
      )
    }
  }

  const getFirstName = () => {
    if (user?.user_metadata?.name) {
      return user.user_metadata.name.split(' ')[0]
    }
    if (user?.email) {
      return user.email.split('@')[0]
    }
    return 'User'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      <NavigationBar
        showGuideButton={true}
        onGuideClick={() => setShowGuide(true)}
        guideButtonLabel="Test Guide"
        guideButtonTitle={`Open guide for ${config.name}`}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Analytics Bar — handles sign-in CTA, stats, today's focus */}
        <ExamAnalyticsBar examSlug={examSlug} signInHref={`/signin?next=${encodeURIComponent(`/exams/${examSlug}`)}`} />

        {examSlug === 'pms-competitive' && (
          <Link
            href={PMS_WRITING_COACH_PATH}
            className="mb-8 flex flex-col gap-3 rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 via-white to-white p-4 shadow-sm transition hover:border-emerald-300 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-5"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <PenLine className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">Writing papers</p>
                <h3 className="text-base font-bold text-gray-900">PMS Writing Coach</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Essay, précis, and long-answer feedback tuned for provincial PMS English, same flow as CSS Writing Coach,
                  different marking lens.
                </p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white sm:ml-2">
              Open coach
            </span>
          </Link>
        )}

        {/* Welcome */}
        {user && (
          <h2 className="text-3xl font-bold text-blue-600 mb-8">
            Welcome back, {getFirstName()}
          </h2>
        )}

        {/* Mock Tests Section */}
        {!preselectedMode && (
          <div className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <h3 className="text-base font-semibold text-gray-900">Mock Tests</h3>
              <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
                20 tests
              </span>
              <div className="hidden h-4 w-px bg-gray-300 sm:block" />
              <span className="hidden text-xs text-gray-500 sm:inline">
                {config.sections.reduce((s, x) => s + x.count, 0)} Qs · {config.duration}m full mock
              </span>
              <div className="flex-1" />
              <Link
                href={`/exams/${examSlug}/mock`}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Full mock list
              </Link>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Choose Easy, Advanced, or Difficult first, then pick a mock from that level.
            </p>
            <ExamMockSections
              examSlug={examSlug}
              config={config}
              onMockSelect={handleMockClick}
              lockedAfterFirst
              isPremium={isPremium}
            />
          </div>
        )}

        {/* Subjects */}
        {!config.mockOnly && <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <h3 className="text-base font-semibold text-gray-900">
              {preselectedMode === 'most-repeated' && 'Most Repeated: Pick a Subject'}
              {preselectedMode === 'most-important' && 'Most Important: Pick a Subject'}
              {!preselectedMode && 'Practice by Subject'}
            </h3>
            {preselectedMode && (
              <span className="text-xs text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full font-medium">
                {preselectedMode === 'most-repeated' ? 'Most Repeated' : 'Most Important'}
              </span>
            )}
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {subjectsWithCounts.map((section) => {
              const progress = subjectProgress.find(p => p.subject === section.slug)
              const roundedCount = roundMCQs(section.totalMCQs)

              return (
                <ExamPracticeGridCard
                  key={section.slug}
                  onClick={() =>
                    router.push(
                      preselectedMode
                        ? `/exams/${examSlug}/${section.slug}/${preselectedMode}`
                        : `/exams/${examSlug}/${section.slug}`,
                    )
                  }
                  icon={BookOpen}
                  title={section.label}
                  subtitle="Past papers, important & repeated MCQs"
                  statPrimary={
                    user && progress ? `${progress.accuracy}%` : roundedCount
                  }
                  statSecondary={
                    user && progress
                      ? `${progress.attempted} attempted`
                      : 'questions in bank'
                  }
                  actionLabel={user && progress ? 'Continue' : 'Start'}
                />
              )
            })}
          </div>
        </div>}
      </div>
    </div>

    <SignInPopup isOpen={showSignIn} onClose={() => setShowSignIn(false)} message="Sign in to access more mock tests and practice sets" />
    <PremiumPopup isOpen={showPremium} onClose={() => setShowPremium(false)} />
    {pendingMockId && (
      <MockPatternPopup
        config={config}
        examSlug={examSlug}
        mockId={pendingMockId}
        onConfirm={() => {
          router.push(`/exams/${examSlug}/mock/${pendingMockId}`)
          setPendingMockId(null)
        }}
        onClose={() => setPendingMockId(null)}
      />
    )}
    {showGuide && (
      <TestGuideModal
        examName={config.name}
        guide={examGuide}
        onClose={() => setShowGuide(false)}
      />
    )}
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock Pattern Popup
// ─────────────────────────────────────────────────────────────────────────────

const BAR_COLORS = ['bg-blue-500','bg-violet-500','bg-emerald-500','bg-amber-500','bg-rose-500','bg-cyan-500']
const TEXT_COLORS = ['text-blue-600','text-violet-600','text-emerald-600','text-amber-600','text-rose-600','text-cyan-600']

// Official exam notes per exam slug
const EXAM_NOTES: Record<string, { negative: boolean; passMark: string; note?: string }> = {
  'ecat':               { negative: false, passMark: '50%', note: 'UET Lahore + affiliated engineering colleges' },
  'net-engineering':    { negative: false, passMark: '50%', note: 'NUST NET only (separate from NTS tests)' },
  'giki-entry':         { negative: false, passMark: '60%', note: 'GIKI undergraduate entry test pattern' },
  'pieas-entry':        { negative: false, passMark: '60%', note: 'PIEAS undergraduate entry test pattern' },
  'lums-engineering':   { negative: false, passMark: '60%', note: 'LCAT-style test; Math-heavy pattern' },
  'comsats-engineering':{ negative: false, passMark: '50%', note: 'COMSATS own admission test' },
  'fast-nuces':         { negative: false, passMark: '50%', note: 'FAST NU own test, heavy on Math & IQ' },
  'paf-initial':        { negative: false, passMark: '50%', note: 'PAF commissioned officer initial screening' },
  'pma-long-course':    { negative: false, passMark: '50%', note: 'Pakistan Military Academy academic test' },
  'nts-nat-ie':         { negative: false, passMark: '50%', note: 'NTS NAT-IE for Engineering admissions' },
  'muet':               { negative: false, passMark: '50%', note: 'Mehran UET, Jamshoro' },
  'air-university':     { negative: false, passMark: '50%', note: 'Air University Islamabad own entry test' },
  'nts-gat':            { negative: false, passMark: '50%', note: 'NTS GAT-General for postgrad admissions' },
}

function MockPatternPopup({
  config, examSlug, mockId, onConfirm, onClose,
}: {
  config: ExamConfig
  examSlug: string
  mockId: number
  onConfirm: () => void
  onClose: () => void
}) {
  const specRow = examMockSpec(mockId)
  const multiplier = specRow?.multiplier ?? 1
  const totalQs = Math.round(config.totalMCQs * multiplier)
  const duration = Math.round(config.duration * multiplier)
  const total = config.sections.reduce((s, x) => s + x.count, 0)
  const examNote = EXAM_NOTES[examSlug]

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-blue-900 px-5 py-4">
          <p className="text-[11px] text-blue-300 font-medium uppercase tracking-wider mb-0.5">Mock {mockId}</p>
          <h3 className="text-base font-bold text-white">{specRow?.title ?? `Mock ${mockId}`}</h3>
          <p className="text-xs text-blue-200 mt-0.5">{examNote?.note ?? config.name}</p>
        </div>

        {/* Pattern */}
        <div className="px-5 py-4">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Official Pattern</p>

          {/* Distribution bar */}
          <div className="flex rounded-full overflow-hidden h-2 mb-3">
            {config.sections.map((sec, i) => (
              <div key={sec.slug} className={BAR_COLORS[i % BAR_COLORS.length]} style={{ width: `${(sec.count/total)*100}%` }} />
            ))}
          </div>

          {/* Subject rows */}
          <div className="space-y-2 mb-4">
            {config.sections.map((sec, i) => {
              const qs = Math.round(sec.count * multiplier)
              const pct = Math.round((sec.count/total)*100)
              return (
                <div key={sec.slug} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${BAR_COLORS[i % BAR_COLORS.length]}`} />
                    <span className="text-sm text-gray-700">{sec.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{pct}%</span>
                    <span className={`text-sm font-bold ${TEXT_COLORS[i % TEXT_COLORS.length]}`}>{qs}q</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Stats row */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
              <div className="text-base font-bold text-gray-900">{totalQs}</div>
              <div className="text-[10px] text-gray-400">Questions</div>
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
              <div className="text-base font-bold text-gray-900">{duration}m</div>
              <div className="text-[10px] text-gray-400">Duration</div>
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
              <div className="text-base font-bold text-gray-900">{config.passingPercentage}%</div>
              <div className="text-[10px] text-gray-400">Pass Mark</div>
            </div>
          </div>

          {config.negativeMarking && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="text-xs text-red-600 font-medium">Negative marking applies</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors">
              Start test
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function TestGuideModal({
  examName,
  guide,
  onClose,
}: {
  examName: string
  guide: ExamGuideView
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-slate-800 to-blue-900 text-white flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-blue-200 font-semibold">Test Guide</p>
            <h3 className="text-lg font-bold">{examName}</h3>
            <p className="text-xs text-blue-200 mt-0.5">{guide.authority}</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto max-h-[calc(85vh-84px)] space-y-5">
          <section>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Eligibility (Typical)</h4>
            <ul className="space-y-1.5">
              {guide.eligibility.map((item) => (
                <li key={item} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Important Details</h4>
            <ul className="space-y-1.5">
              {guide.important.map((item) => (
                <li key={item} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Helpful Prep Notes</h4>
            <ul className="space-y-1.5">
              {guide.helpful.map((item) => (
                <li key={item} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-800">
            Always verify final eligibility, age relaxations, quotas, and documents from the latest official advertisement.
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            {guide.officialLink && (
              <a
                href={guide.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                Official Source
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {guide.lastUpdated && <span className="text-xs text-gray-500">Last updated: {guide.lastUpdated}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
