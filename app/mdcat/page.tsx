'use client'

import { useRouter } from 'next/navigation'
import { BookOpen, Microscope, Atom, Lightbulb, Brain, Clock, FileText, CheckCircle, AlertTriangle } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'

const SUBJECTS = [
  { slug: 'biology',           name: 'Biology',          icon: Microscope, mcqs: 5944, topics: 16 },
  { slug: 'chemistry',         name: 'Chemistry',        icon: Atom,       mcqs: 6218, topics: 19 },
  { slug: 'physics',           name: 'Physics',          icon: Lightbulb,  mcqs: 4695, topics: 16 },
  { slug: 'english',           name: 'English',          icon: BookOpen,   mcqs: 925,  topics: 6  },
  { slug: 'logical-reasoning', name: 'Logical Reasoning',icon: Brain,      mcqs: 1180, topics: 6  },
]

const EXAM_VARIANTS = [
  {
    variant: 'pmc',
    name: 'PMC National MDCAT',
    year: '2025',
    badge: 'All Provinces',
    desc: 'UHS · SIBA · BUMHS · SZABMU',
    total: 180,
    duration: '3 hrs',
    passMark: '65%',
    negative: false,
    maxMocks: 73,
    accentBg: 'bg-blue-50',
    accentBorder: 'border-blue-200',
    accentHover: 'hover:border-blue-400',
    headerBg: 'from-slate-800 to-blue-900',
    badgeBg: 'bg-blue-100 text-blue-700',
    btnBg: 'bg-blue-600 hover:bg-blue-700',
    distribution: [
      { label: 'Biology', count: 81, pct: 45 },
      { label: 'Chemistry', count: 45, pct: 25 },
      { label: 'Physics', count: 36, pct: 20 },
      { label: 'English', count: 9, pct: 5 },
      { label: 'LR', count: 9, pct: 5 },
    ],
  },
  {
    variant: 'etea',
    name: 'ETEA / KMU MDCAT',
    year: '2025',
    badge: 'KPK Province',
    desc: 'Khyber Pakhtunkhwa · KMU',
    total: 200,
    duration: '2h 30m',
    passMark: '60%',
    negative: true,
    maxMocks: 46,
    accentBg: 'bg-emerald-50',
    accentBorder: 'border-emerald-200',
    accentHover: 'hover:border-emerald-400',
    headerBg: 'from-slate-800 to-emerald-900',
    badgeBg: 'bg-emerald-100 text-emerald-700',
    btnBg: 'bg-emerald-600 hover:bg-emerald-700',
    distribution: [
      { label: 'Biology', count: 60, pct: 30 },
      { label: 'Chemistry', count: 60, pct: 30 },
      { label: 'Physics', count: 60, pct: 30 },
      { label: 'English', count: 20, pct: 10 },
    ],
  },
  {
    variant: 'nums',
    name: 'NUMS MDCAT',
    year: '2025',
    badge: 'Military Colleges',
    desc: 'CMH · AMC · Pak Navy · Air Force',
    total: 150,
    duration: '2h 45m',
    passMark: '55%',
    negative: false,
    maxMocks: 61,
    accentBg: 'bg-slate-50',
    accentBorder: 'border-slate-300',
    accentHover: 'hover:border-slate-500',
    headerBg: 'from-slate-800 to-slate-900',
    badgeBg: 'bg-slate-200 text-slate-700',
    btnBg: 'bg-slate-700 hover:bg-slate-800',
    distribution: [
      { label: 'Biology', count: 60, pct: 40 },
      { label: 'Chemistry', count: 38, pct: 25 },
      { label: 'Physics', count: 37, pct: 25 },
      { label: 'English', count: 15, pct: 10 },
    ],
  },
  {
    variant: 'aku',
    name: 'AKU Entry Test',
    year: '2025',
    badge: 'Private · Prestigious',
    desc: 'Aga Khan University · Karachi',
    total: 100,
    duration: '2h 15m',
    passMark: '70%',
    negative: false,
    maxMocks: 46,
    accentBg: 'bg-rose-50',
    accentBorder: 'border-rose-200',
    accentHover: 'hover:border-rose-400',
    headerBg: 'from-slate-800 to-rose-900',
    badgeBg: 'bg-rose-100 text-rose-700',
    btnBg: 'bg-rose-600 hover:bg-rose-700',
    distribution: [
      { label: 'Biology', count: 20, pct: 20 },
      { label: 'Chemistry', count: 20, pct: 20 },
      { label: 'Physics', count: 20, pct: 20 },
      { label: 'English', count: 20, pct: 20 },
      { label: 'Analytical', count: 20, pct: 20 },
    ],
  },
]

export default function MDCATPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            MDCAT Practice Bank
          </h1>
        </div>

        {/* Subject Practice Cards */}
        <div className="mb-10">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Subject-Wise Practice</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {SUBJECTS.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.slug}
                  onClick={() => router.push(`/mdcat/${s.slug}`)}
                  className="group bg-white rounded-xl border border-gray-200 hover:border-blue-400 shadow-sm hover:shadow-md hover:shadow-blue-500/10 transition-all duration-200 cursor-pointer hover:-translate-y-0.5 overflow-hidden"
                >
                  <div className="p-4 text-center">
                    <div className="w-10 h-10 mx-auto rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">{s.name}</h3>
                    <p className="text-[11px] text-gray-500 mb-2">{s.topics} topics</p>
                    <div className="bg-blue-50 rounded-lg p-1.5 border border-blue-100">
                      <div className="text-sm font-bold text-blue-600">{s.mcqs.toLocaleString()}</div>
                      <div className="text-[10px] text-gray-400">MCQs</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Exam Mock Tests */}
        <div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Full Exam Mock Tests</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EXAM_VARIANTS.map((exam) => (
              <div
                key={exam.variant}
                className={`bg-white rounded-xl border-2 ${exam.accentBorder} ${exam.accentHover} shadow-sm transition-all duration-200 overflow-hidden`}
              >
                {/* Card header */}
                <div className={`bg-gradient-to-r ${exam.headerBg} px-4 py-3`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">{exam.name}</h3>
                      <p className="text-white/60 text-[11px] mt-0.5">{exam.desc}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${exam.badgeBg}`}>
                        {exam.badge}
                      </span>
                      {exam.negative && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-500/20 text-red-200 flex items-center gap-0.5">
                          <AlertTriangle className="w-2.5 h-2.5" /> −ve Marking
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4">
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-gray-400" />
                      <strong className="text-gray-800">{exam.total}</strong> MCQs
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {exam.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      Pass: {exam.passMark}
                    </span>
                  </div>

                  {/* Distribution bar */}
                  <div className="flex rounded-full overflow-hidden h-1.5 mb-2">
                    {exam.distribution.map((d, i) => (
                      <div
                        key={d.label}
                        className={`h-full ${['bg-emerald-500','bg-purple-500','bg-blue-500','bg-amber-500','bg-rose-500'][i % 5]}`}
                        style={{ width: `${d.pct}%` }}
                        title={`${d.label}: ${d.count}`}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mb-4">
                    {exam.distribution.map(d => (
                      <span key={d.label} className="text-[10px] text-gray-400">{d.label}: {d.count}</span>
                    ))}
                  </div>

                  <button
                    onClick={() => router.push(`/mdcat/mock/${exam.variant}`)}
                    className={`w-full ${exam.btnBg} text-white py-2 rounded-lg font-semibold text-sm transition-colors`}
                  >
                    View {exam.maxMocks} Mock Tests
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
