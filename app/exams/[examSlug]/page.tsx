'use client'

import { useEffect, useState, Suspense } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  BookOpen, FileText, Target, Flame,
  TrendingUp, ChevronRight, Star, Sparkles,
  Zap, Trophy, Award, Clock, Shield, Layers, BarChart2,
  Cpu, Activity, Crosshair, Brain, Flag, CheckCircle, Lock, X, ExternalLink
} from 'lucide-react'
import { getExamConfig, ExamConfig } from '@/lib/exam-configs'
import { createClient } from '@/lib/supabase/client'
import NavigationBar from '@/components/NavigationBar'
import { PremiumPopup } from '@/components/auth/PremiumPopup'
import SignInPopup from '@/components/auth/SignInPopup'
import ExamAnalyticsBar from '@/components/ExamAnalyticsBar'

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
    ? 'Commonly 18–30 years (can vary by post and quota relaxations).'
    : 'Commonly 18–28 years (age relaxations may apply by policy).'

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

  const isPremium = user?.user_metadata?.is_premium || false
  const examGuide = buildExamGuide(examSlug, config)

  const handleMockClick = (mockId: number) => {
    if (mockId === 1 || isPremium) {
      setPendingMockId(mockId)
      return
    }
    if (!user) {
      setShowSignIn(true)
    } else {
      setShowPremium(true)
    }
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
        <ExamAnalyticsBar examSlug={examSlug} />

        {/* Welcome */}
        {user && (
          <h2 className="text-3xl font-bold text-blue-600 mb-8">
            Welcome back, {getFirstName()}
          </h2>
        )}

        {/* Mock Tests Section */}
        {!preselectedMode && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <h3 className="text-base font-semibold text-gray-900">Mock Tests</h3>
              <span className="text-xs text-purple-600 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full font-medium">
                20 Tests
              </span>
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-500">{config.totalMCQs} Qs · {config.duration}m</span>
            </div>

            {[
              {
                group: 'Standard', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200',
                mocks: [
                  { id: 1,  icon: Target,    title: 'Mock 1',  desc: 'Full simulation',    pct: 1.00 },
                  { id: 2,  icon: FileText,  title: 'Mock 2',  desc: 'Past paper pattern', pct: 1.00 },
                  { id: 3,  icon: Layers,    title: 'Mock 3',  desc: 'Subject-balanced',   pct: 1.00 },
                  { id: 4,  icon: BookOpen,  title: 'Mock 4',  desc: 'Core concepts',      pct: 1.00 },
                  { id: 5,  icon: Star,      title: 'Mock 5',  desc: '75% warm-up',        pct: 0.75 },
                  { id: 6,  icon: Zap,       title: 'Mock 6',  desc: 'Mixed topics',       pct: 0.75 },
                  { id: 7,  icon: Clock,     title: 'Mock 7',  desc: 'Quick 50% rev.',     pct: 0.50 },
                ],
              },
              {
                group: 'Advanced', color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200',
                mocks: [
                  { id: 8,  icon: TrendingUp, title: 'Mock 8',  desc: 'Advanced sim.',      pct: 1.00 },
                  { id: 9,  icon: Flame,      title: 'Mock 9',  desc: 'High-yield focus',   pct: 1.00 },
                  { id: 10, icon: BarChart2,  title: 'Mock 10', desc: 'Deep-dive',          pct: 1.00 },
                  { id: 11, icon: Brain,      title: 'Mock 11', desc: '75% analytical',     pct: 0.75 },
                  { id: 12, icon: Activity,   title: 'Mock 12', desc: 'Speed & pressure',   pct: 0.50 },
                  { id: 13, icon: Trophy,     title: 'Mock 13', desc: 'Intensive practice', pct: 1.00 },
                  { id: 14, icon: Crosshair,  title: 'Mock 14', desc: 'Rapid fire 25%',     pct: 0.25 },
                ],
              },
              {
                group: 'Expert', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200',
                mocks: [
                  { id: 15, icon: Shield,      title: 'Mock 15', desc: 'Expert full test',   pct: 1.00 },
                  { id: 16, icon: Award,       title: 'Mock 16', desc: 'Ultimate challenge', pct: 1.00 },
                  { id: 17, icon: Cpu,         title: 'Mock 17', desc: '75% champions',      pct: 0.75 },
                  { id: 18, icon: CheckCircle, title: 'Mock 18', desc: 'Final review',       pct: 1.00 },
                  { id: 19, icon: Sparkles,    title: 'Mock 19', desc: 'Grand master',       pct: 1.00 },
                  { id: 20, icon: Flag,        title: 'Mock 20', desc: 'Final assessment',   pct: 1.00 },
                ],
              },
            ].map(({ group, color, bg, border, mocks }) => (
              <div key={group} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold ${color}`}>{group}</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {mocks.map(({ id, icon: Icon, title, desc, pct }) => {
                    const qs = Math.round(config.totalMCQs * pct)
                    const mins = Math.round(config.duration * pct)
                    const locked = id > 1 && !isPremium
                    return (
                      <button
                        key={id}
                        onClick={() => handleMockClick(id)}
                        className={`group relative flex flex-col items-center text-center border rounded-xl p-2 sm:p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 ${
                          locked
                            ? 'bg-gray-50 border-gray-200 cursor-pointer hover:border-gray-300'
                            : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-md'
                        }`}
                      >
                        {locked && (
                          <div className="absolute top-1.5 right-1.5">
                            <Lock className="w-2.5 h-2.5 text-gray-400" />
                          </div>
                        )}
                        <div className={`w-8 h-8 rounded-lg ${locked ? 'bg-gray-100 border-gray-200' : bg} border ${locked ? 'border-gray-200' : border} flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform`}>
                          <Icon className={`w-3.5 h-3.5 ${locked ? 'text-gray-400' : color}`} />
                        </div>
                        <span className={`text-[11px] font-semibold leading-tight ${locked ? 'text-gray-400' : 'text-gray-900'}`}>{title}</span>
                        <div className={`mt-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${locked ? 'bg-gray-100 text-gray-400 border border-gray-200' : `${bg} ${color} border ${border}`}`}>
                          {locked ? 'Premium' : `${qs}Q`}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Subjects */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <h3 className="text-base font-semibold text-gray-900">
              {preselectedMode === 'most-repeated' && 'Most Repeated — Pick a Subject'}
              {preselectedMode === 'most-important' && 'Most Important — Pick a Subject'}
              {!preselectedMode && 'Practice by Subject'}
            </h3>
            {preselectedMode && (
              <span className="text-xs text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full font-medium">
                {preselectedMode === 'most-repeated' ? 'Most Repeated' : 'Most Important'}
              </span>
            )}
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {subjectsWithCounts.map((section) => {
              const progress = subjectProgress.find(p => p.subject === section.slug)
              const Icon = BookOpen
              const roundedCount = roundMCQs(section.totalMCQs)

              return (
                <div
                  key={section.slug}
                  className="group relative bg-white rounded-lg border border-gray-200 hover:border-blue-400 shadow-sm hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer hover:-translate-y-1 overflow-hidden"
                  onClick={() => router.push(preselectedMode
                    ? `/exams/${examSlug}/${section.slug}/${preselectedMode}`
                    : `/exams/${examSlug}/${section.slug}`
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative p-4 text-center">
                    <div className="w-9 h-9 mx-auto rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-2.5 shadow-sm group-hover:scale-105 transition-all duration-300">
                      <Icon className="w-4 h-4 text-white" />
                    </div>

                    <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-900 transition-colors leading-tight">{section.label}</h3>

                    <div className="bg-blue-50 rounded-lg p-2 my-2 border border-blue-100">
                      {user && progress ? (
                        <>
                          <div className="text-base font-bold text-blue-600">{progress.accuracy}%</div>
                          <div className="text-[10px] text-gray-500">{progress.attempted} done</div>
                        </>
                      ) : (
                        <div className="text-xs font-semibold text-blue-600">Practice</div>
                      )}
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-1.5 px-3 rounded-md font-medium text-xs transition-all">
                      {user && progress ? 'Continue' : 'Start'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>

    <SignInPopup isOpen={showSignIn} onClose={() => setShowSignIn(false)} message="Sign in to access more mock tests and practice sets" />
    <PremiumPopup isOpen={showPremium} onClose={() => setShowPremium(false)} />
    {pendingMockId && (
      <MockPatternPopup
        config={config}
        examSlug={examSlug}
        mockId={pendingMockId}
        onConfirm={() => { router.push(`/exams/${examSlug}/mock/${pendingMockId}`); setPendingMockId(null) }}
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

const MOCK_TITLES: Record<number, string> = {
  1: 'Full Exam Simulation', 2: 'Past Paper Pattern', 3: 'Subject-wise Balanced',
  4: 'Core Concepts Focus', 5: '75% Warm-up', 6: 'Mixed Topics', 7: 'Quick 50% Revision',
  8: 'Advanced Full Sim', 9: 'High-Yield Focus', 10: 'Comprehensive Deep-Dive',
  11: '75% Analytical', 12: 'Speed & Pressure', 13: 'Intensive Practice', 14: 'Rapid Fire',
  15: 'Expert Full Test', 16: 'Ultimate Challenge', 17: '75% Champions', 18: 'Final Review',
  19: 'Grand Master', 20: 'Final Assessment',
}

const MOCK_MULTIPLIERS: Record<number, number> = {
  1:1,2:1,3:1,4:1,5:.75,6:.75,7:.5,
  8:1,9:1,10:1,11:.75,12:.5,13:1,14:.25,
  15:1,16:1,17:.75,18:1,19:1,20:1,
}

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
  'fast-nuces':         { negative: false, passMark: '50%', note: 'FAST NU own test — heavy on Math & IQ' },
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
  const multiplier = MOCK_MULTIPLIERS[mockId] ?? 1
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
          <h3 className="text-base font-bold text-white">{MOCK_TITLES[mockId]}</h3>
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
              Start Mock {mockId}
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
