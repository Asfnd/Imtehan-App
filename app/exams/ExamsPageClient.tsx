'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { EXAM_CONFIGS } from '@/lib/exam-configs'
import { FileText, ChevronDown, LayoutGrid } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'

const CATEGORY_CONFIG: Record<string, { label: string; shortLabel: string; description: string }> = {
  medical: { label: 'MDCAT', shortLabel: 'MDCAT', description: 'PMC, KEMU, JSMU, AMC, Dow, NUMS, Shifa, CMH, Pharm-D, BDS & FSc Pre-Medical' },
  engineering: { label: 'Engineering', shortLabel: 'Engineering', description: 'NUST NET, ECAT, UET Lahore, GIKI, PIEAS, Bahria, NED, COMSATS, FAST & more' },
  hec: { label: 'HEC / ETC', shortLabel: 'HEC', description: 'USAT, HAT, LAT, Law-GAT, SEE-LAW & NTS HEC GAT for university admissions' },
  css: { label: 'CSS', shortLabel: 'CSS', description: 'Central Superior Services: MPT screening & compulsory MCQs' },
  pms: { label: 'PMS', shortLabel: 'PMS', description: 'Provincial Management Services: general paper MCQs, same bank as CSS MPT' },
  ppsc: { label: 'PPSC', shortLabel: 'PPSC', description: 'Punjab PSC posts, Educators PST/SST/EST hub & more' },
  fpsc: { label: 'FPSC', shortLabel: 'FPSC', description: 'Federal Public Service Commission, all posts' },
  fia: { label: 'FIA', shortLabel: 'FIA', description: 'Federal Investigation Agency recruitment tests by post' },
  provincial: { label: 'Provincial', shortLabel: 'Provincial', description: 'PMS, KPPSC, SPSC, BPSC, GB educators, Sindh STS & more' },
  police: { label: 'Police', shortLabel: 'Police', description: 'Punjab, Sindh, KPK & Islamabad Police: Constable, ASI, SI & Assistant (BS-15)' },
  military: { label: 'Military', shortLabel: 'Military', description: 'Pak Army, Navy, PAF, Rangers, FC, ANF & Coast Guard' },
  nts: { label: 'NTS', shortLabel: 'NTS', description: 'NAT-IE/IM/ICS/IGS/IA, GAT, Railways, WAPDA & more' },
  ots: { label: 'OTS', shortLabel: 'OTS', description: 'TEVTA skills, Open Testing Service posts & revenue' },
  etea: { label: 'ETEA', shortLabel: 'ETEA', description: 'KPK educators, nurses, clerks & KMU entry tests' },
  railways: { label: 'Railways', shortLabel: 'Railways', description: 'Pakistan Railways: Station Master, Guard, TTE, Clerk & more' },
  banks: { label: 'Banks', shortLabel: 'Banks', description: 'NBP, SBP, UBL, HBL, MCB, ABL, Meezan & more' },
  judiciary: { label: 'Judiciary', shortLabel: 'Judiciary', description: 'High Court, District Court & Supreme Court clerical and steno posts' },
  devauth: { label: 'Dev Authority', shortLabel: 'Dev Auth', description: 'CDA, LDA, KDA, MDA & RDA development authority posts' },
  rescue: { label: 'Rescue 1122', shortLabel: 'Rescue', description: 'Punjab Rescue 1122 Emergency Services: Rescuer, Driver & Operator' },
  revenue: { label: 'Revenue Auth', shortLabel: 'Revenue', description: 'PRA, SRB, KPRA & BRA: Provincial Revenue & Tax Authorities' },
}

const CATEGORY_ORDER = [
  'medical', 'engineering', 'hec', 'css', 'pms', 'ppsc', 'fpsc', 'fia', 'provincial', 'police', 'military',
  'nts', 'ots', 'etea', 'railways', 'banks', 'judiciary', 'devauth',
  'rescue', 'revenue',
]

function ExamsInner() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'css'
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('pointerdown', handleClick)
    return () => document.removeEventListener('pointerdown', handleClick)
  }, [])

  const examsByCategory = Object.entries(EXAM_CONFIGS).reduce((acc, [slug, config]) => {
    if (!acc[config.category]) acc[config.category] = []
    acc[config.category].push({ slug, ...config })
    return acc
  }, {} as Record<string, any[]>)

  const availableCategories = CATEGORY_ORDER.filter((cat) => examsByCategory[cat]?.length)
  const activeExams = examsByCategory[activeCategory] || []
  const activeCat = CATEGORY_CONFIG[activeCategory]

  const categoryDropdown = (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setDropdownOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700"
      >
        <LayoutGrid className="h-4 w-4" />
        Browse Exams
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {dropdownOpen && (
        <div className="absolute left-1/2 top-full z-50 mt-2 w-[min(460px,calc(100vw-24px))] -translate-x-1/2 rounded-xl border-2 border-gray-300 bg-white p-3.5 shadow-xl">
          <p className="mb-2 px-0.5 text-[10px] font-bold uppercase tracking-widest text-indigo-400">Civil Services</p>
          <div className="mb-3 grid grid-cols-2 gap-2">
            {['css', 'pms'].filter((c) => examsByCategory[c]?.length).map((cat) => {
              const isActive = cat === activeCategory
              return (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setDropdownOpen(false) }}
                  className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-bold transition-all ${
                    isActive
                      ? 'border-transparent bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/25'
                      : 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:border-indigo-400 hover:bg-indigo-100'
                  }`}
                >
                  {CATEGORY_CONFIG[cat].label}
                  <span className={`mt-0.5 block text-xs font-medium ${isActive ? 'text-indigo-200' : 'text-indigo-400'}`}>
                    {examsByCategory[cat]?.length} exams
                  </span>
                </button>
              )
            })}
          </div>
          <div className="mb-3 border-t border-gray-100" />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {availableCategories.filter((cat) => !['css', 'pms'].includes(cat)).map((cat) => {
              const isActive = cat === activeCategory
              return (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setDropdownOpen(false) }}
                  className={`rounded-lg border-2 px-3.5 py-2.5 text-left text-sm font-semibold transition-all ${
                    isActive
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-300 text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  {CATEGORY_CONFIG[cat].label}
                  <span className={`mt-0.5 block text-xs ${isActive ? 'text-blue-200' : 'text-gray-500'}`}>
                    {examsByCategory[cat]?.length} exams
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar showCenterNav={false} centerContent={categoryDropdown} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="mb-5 text-xs text-gray-400">
          {activeCat.description} · <span className="font-medium text-gray-600">{activeExams.length} exams</span>
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {activeExams.map((exam) => (
            <Link
              key={exam.slug}
              href={`/exams/${exam.slug}`}
              prefetch
              className="group relative block overflow-hidden rounded-lg border-2 border-gray-300 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/10"
            >
              <div className="relative p-5 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-sm transition-all duration-300 group-hover:scale-105">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h3 className="mb-3 line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-gray-900 transition-colors group-hover:text-blue-900">
                  {exam.name}
                </h3>
                <div className="mb-3 rounded-lg border border-blue-100 bg-blue-50 p-2.5">
                  <div className="text-sm font-semibold text-blue-600">MCQs + Mocks</div>
                  <div className="text-[10px] text-gray-500">{exam.sections.length} subjects · {exam.duration}m</div>
                </div>
                <span className="block w-full rounded-md bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-2 text-sm font-semibold text-white transition-all group-hover:from-blue-700 group-hover:to-blue-800">
                  Practice
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ExamsPageClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <ExamsInner />
    </Suspense>
  )
}
