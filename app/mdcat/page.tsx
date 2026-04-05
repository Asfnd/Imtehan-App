'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen, Microscope, Atom, Lightbulb, Brain, Clock, FileText, CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'
import ExamAnalyticsBar from '@/components/ExamAnalyticsBar'

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
    badge: 'All Provinces',
    desc: 'UHS · SIBA · BUMHS · SZABMU',
    total: 180,
    duration: '3 hrs',
    passMark: '65%',
    negative: false,
    maxMocks: 73,
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
    badge: 'KPK Province',
    desc: 'Khyber Pakhtunkhwa · KMU',
    total: 200,
    duration: '2h 30m',
    passMark: '60%',
    negative: true,
    maxMocks: 46,
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
    badge: 'Military Colleges',
    desc: 'CMH · AMC · Pak Navy · Air Force',
    total: 150,
    duration: '2h 45m',
    passMark: '55%',
    negative: false,
    maxMocks: 61,
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
    badge: 'Private · Prestigious',
    desc: 'Aga Khan University · Karachi',
    total: 100,
    duration: '2h 15m',
    passMark: '70%',
    negative: false,
    maxMocks: 46,
    distribution: [
      { label: 'Biology', count: 20, pct: 20 },
      { label: 'Chemistry', count: 20, pct: 20 },
      { label: 'Physics', count: 20, pct: 20 },
      { label: 'English', count: 20, pct: 20 },
      { label: 'Analytical', count: 20, pct: 20 },
    ],
  },
  {
    variant: 'uhs',
    name: 'UHS Punjab MDCAT',
    badge: 'Punjab',
    desc: 'University of Health Sciences · Public & Private Colleges',
    total: 180,
    duration: '3 hrs',
    passMark: '65%',
    negative: false,
    maxMocks: 73,
    distribution: [
      { label: 'Biology', count: 81, pct: 45 },
      { label: 'Chemistry', count: 45, pct: 25 },
      { label: 'Physics', count: 36, pct: 20 },
      { label: 'English', count: 9, pct: 5 },
      { label: 'LR', count: 9, pct: 5 },
    ],
  },
  {
    variant: 'szabmu',
    name: 'SZABMU MDCAT',
    badge: 'Federal',
    desc: 'Shaheed Zulfiqar Ali Bhutto Medical University',
    total: 180,
    duration: '3 hrs',
    passMark: '65%',
    negative: false,
    maxMocks: 73,
    distribution: [
      { label: 'Biology', count: 81, pct: 45 },
      { label: 'Chemistry', count: 45, pct: 25 },
      { label: 'Physics', count: 36, pct: 20 },
      { label: 'English', count: 9, pct: 5 },
      { label: 'LR', count: 9, pct: 5 },
    ],
  },
  {
    variant: 'siba',
    name: 'SIBA MDCAT',
    badge: 'Sindh',
    desc: 'Sukkur IBA Testing Services',
    total: 180,
    duration: '3 hrs',
    passMark: '65%',
    negative: false,
    maxMocks: 73,
    distribution: [
      { label: 'Biology', count: 81, pct: 45 },
      { label: 'Chemistry', count: 45, pct: 25 },
      { label: 'Physics', count: 36, pct: 20 },
      { label: 'English', count: 9, pct: 5 },
      { label: 'LR', count: 9, pct: 5 },
    ],
  },
  {
    variant: 'bumhs',
    name: 'BUMHS MDCAT',
    badge: 'Balochistan',
    desc: 'Bolan University of Medical & Health Sciences',
    total: 180,
    duration: '3 hrs',
    passMark: '65%',
    negative: false,
    maxMocks: 73,
    distribution: [
      { label: 'Biology', count: 81, pct: 45 },
      { label: 'Chemistry', count: 45, pct: 25 },
      { label: 'Physics', count: 36, pct: 20 },
      { label: 'English', count: 9, pct: 5 },
      { label: 'LR', count: 9, pct: 5 },
    ],
  },
]

const BAR_COLORS = ['bg-blue-500', 'bg-blue-300', 'bg-blue-700', 'bg-blue-400', 'bg-blue-200']

export default function MDCATPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('pmc')
  const exam = EXAM_VARIANTS.find(e => e.variant === activeTab)!

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />

      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* Analytics bar */}
        <ExamAnalyticsBar examSlug="mdcat" signInHref="/signin?next=/mdcat" />

        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">MDCAT Preparation</h1>
          <p className="text-sm text-gray-500 mt-1">Subject practice + full mock tests for all MDCAT variants</p>
        </div>

        {/* ── 1. Subject Practice ── */}
        <section className="mb-10">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Subject-Wise Practice</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {SUBJECTS.map((s) => {
              const Icon = s.icon
              return (
                <button
                  key={s.slug}
                  onClick={() => router.push(`/mdcat/${s.slug}`)}
                  className="group bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-200 cursor-pointer hover:-translate-y-0.5 overflow-hidden text-left"
                >
                  <div className="p-4 text-center">
                    <div className="w-10 h-10 mx-auto rounded-lg bg-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{s.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{s.topics} topics</p>
                    <div className="mt-2 bg-blue-50 rounded-lg py-1 border border-blue-100">
                      <span className="text-sm font-bold text-blue-600">{s.mcqs.toLocaleString()}</span>
                      <span className="text-[10px] text-gray-400 ml-1">MCQs</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* ── 2. Mock Tests ── */}
        <section>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Full Mock Tests</h2>

          {/* Exam tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-4 bg-white border border-gray-200 rounded-xl p-1.5">
            {EXAM_VARIANTS.map(e => (
              <button
                key={e.variant}
                onClick={() => setActiveTab(e.variant)}
                className={`py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === e.variant
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {e.variant.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Active exam card */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-800 to-blue-900 px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white">{exam.name}</h3>
                  <p className="text-blue-200 text-xs mt-0.5">{exam.desc}</p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
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

            <div className="p-5">
              {/* Stats row */}
              <div className="flex gap-3 mb-5">
                <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <FileText className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-base font-bold text-gray-900">{exam.total}</span>
                  </div>
                  <p className="text-[10px] text-gray-400">Questions</p>
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-base font-bold text-gray-900">{exam.duration}</span>
                  </div>
                  <p className="text-[10px] text-gray-400">Duration</p>
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-base font-bold text-gray-900">{exam.passMark}</span>
                  </div>
                  <p className="text-[10px] text-gray-400">Pass Mark</p>
                </div>
              </div>

              {/* Distribution */}
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Subject Distribution</p>
              <div className="flex rounded-full overflow-hidden h-2 mb-2">
                {exam.distribution.map((d, i) => (
                  <div key={d.label} className={BAR_COLORS[i % BAR_COLORS.length]} style={{ width: `${d.pct}%` }} />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mb-5">
                {exam.distribution.map((d, i) => (
                  <div key={d.label} className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${BAR_COLORS[i % BAR_COLORS.length]}`} />
                    <span className="text-xs text-gray-600">{d.label}</span>
                    <span className="text-xs font-bold text-gray-900">{d.count}q</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => router.push(`/mdcat/mock/${exam.variant}`)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                View {exam.maxMocks} Mock Tests <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
