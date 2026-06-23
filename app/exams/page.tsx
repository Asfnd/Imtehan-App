'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { EXAM_CONFIGS } from '@/lib/exam-configs'
import { FileText, ChevronDown, LayoutGrid } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'
import ExamsBrowseSeoSection from '@/components/seo/ExamsBrowseSeoSection'

const CATEGORY_CONFIG: Record<string, { label: string; shortLabel: string; description: string }> = {
  medical:     { label: 'MDCAT',        shortLabel: 'MDCAT',        description: 'Medical & Dental College Admission Test: UHS, NUMS, AKU' },
  engineering: { label: 'Engineering',  shortLabel: 'Engineering',  description: 'NUST, COMSATS, FAST, GIKI, PIEAS, LUMS, Air University & more' },
  css:         { label: 'CSS',          shortLabel: 'CSS',          description: 'Central Superior Services: MPT screening & compulsory MCQs' },
  pms:         { label: 'PMS',          shortLabel: 'PMS',          description: 'Provincial Management Services: general paper MCQs, same bank as CSS MPT' },
  ppsc:       { label: 'PPSC',         shortLabel: 'PPSC',         description: 'Punjab Public Service Commission, all posts' },
  fpsc:       { label: 'FPSC',         shortLabel: 'FPSC',         description: 'Federal Public Service Commission, all posts' },
  fia:        { label: 'FIA',          shortLabel: 'FIA',          description: 'Federal Investigation Agency recruitment tests by post' },
  provincial: { label: 'Provincial',   shortLabel: 'Provincial',   description: 'PMS Punjab, Sindh, KPK: KPPSC, SPSC, BPSC, AJKPSC, GBPSC' },
  police:     { label: 'Police',       shortLabel: 'Police',       description: 'Punjab, Sindh, KPK & Islamabad Police: Constable, ASI & SI posts' },
  military:   { label: 'Military',     shortLabel: 'Military',     description: 'Pak Army, Navy, PAF, Rangers, FC, ANF & Coast Guard' },
  nts:        { label: 'NTS',          shortLabel: 'NTS',          description: 'National Testing Service: Railways, WAPDA, FBR & more' },
  ots:        { label: 'OTS',          shortLabel: 'OTS',          description: 'Open Testing Service: Education, Health & Revenue' },
  etea:       { label: 'ETEA',         shortLabel: 'ETEA',         description: 'Educational Testing & Evaluation Agency, KPK' },
  railways:   { label: 'Railways',     shortLabel: 'Railways',     description: 'Pakistan Railways: Station Master, Guard, TTE, Clerk & more' },
  banks:      { label: 'Banks',        shortLabel: 'Banks',        description: 'NBP, SBP, UBL, HBL, MCB, ABL, Meezan & more' },
  judiciary:  { label: 'Judiciary',    shortLabel: 'Judiciary',    description: 'High Court, District Court & Supreme Court clerical posts' },
  devauth:    { label: 'Dev Authority',shortLabel: 'Dev Auth',     description: 'CDA, LDA, KDA, MDA & RDA development authority posts' },
  rescue:     { label: 'Rescue 1122', shortLabel: 'Rescue',       description: 'Punjab Rescue 1122 Emergency Services: Rescuer, Driver & Operator' },
  revenue:    { label: 'Revenue Auth',shortLabel: 'Revenue',      description: 'PRA, SRB, KPRA & BRA: Provincial Revenue & Tax Authorities' },
}

const CATEGORY_ORDER = [
  'medical', 'engineering', 'css', 'pms', 'ppsc', 'fpsc', 'fia', 'provincial', 'police', 'military',
  'nts', 'ots', 'etea', 'railways', 'banks', 'judiciary', 'devauth',
  'rescue', 'revenue',
]

const roundMCQs = (n: number) => {
  if (n >= 10000) return `${Math.floor(n / 1000)}k+`
  if (n >= 1000)  return `${Math.floor(n / 500) * 500}+`
  if (n >= 100)   return `${Math.floor(n / 50) * 50}+`
  return `${n}`
}

// Deterministic varied bank count per exam slug
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

function ExamsInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'css'
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [dropdownOpen, setDropdownOpen]     = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const examsByCategory = Object.entries(EXAM_CONFIGS).reduce((acc, [slug, config]) => {
    if (!acc[config.category]) acc[config.category] = []
    acc[config.category].push({ slug, ...config })
    return acc
  }, {} as Record<string, any[]>)

  const availableCategories = CATEGORY_ORDER.filter((cat) => examsByCategory[cat]?.length)
  const activeExams = examsByCategory[activeCategory] || []
  const activeCat   = CATEGORY_CONFIG[activeCategory]

  const categoryDropdown = (
    <div ref={dropdownRef} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setDropdownOpen((v) => !v)}
        className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-sm"
      >
        <LayoutGrid className="w-4 h-4" />
        Browse Exams
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown panel */}
      {dropdownOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-xl z-50 p-3.5 w-[min(460px,calc(100vw-24px))]">
          {/* Civil Services featured row */}
          <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-2 px-0.5">⭐ Civil Services</p>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {['css', 'pms'].filter(c => examsByCategory[c]?.length).map((cat) => {
              const isActive = cat === activeCategory
              return (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setDropdownOpen(false) }}
                  className={`px-4 py-3 rounded-xl text-sm font-bold text-left border-2 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-transparent shadow-md shadow-indigo-500/25'
                      : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-400'
                  }`}
                >
                  {CATEGORY_CONFIG[cat].label}
                  <span className={`block text-xs font-medium mt-0.5 ${isActive ? 'text-indigo-200' : 'text-indigo-400'}`}>
                    {examsByCategory[cat]?.length} exams
                  </span>
                </button>
              )
            })}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mb-3" />

          {/* All other categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availableCategories.filter(cat => !['css', 'pms'].includes(cat)).map((cat) => {
              const isActive = cat === activeCategory
              return (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setDropdownOpen(false) }}
                  className={`px-3.5 py-2.5 rounded-lg text-sm font-semibold text-left border-2 transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'text-gray-700 border-gray-300 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300'
                  }`}
                >
                  {CATEGORY_CONFIG[cat].label}
                  <span className={`block text-xs mt-0.5 ${isActive ? 'text-blue-200' : 'text-gray-500'}`}>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-xs text-gray-400 mb-5">
          {activeCat.description} • <span className="font-medium text-gray-600">{activeExams.length} exams</span>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {activeExams.map((exam) => (
            <div
              key={exam.slug}
              className="group relative bg-white rounded-lg border-2 border-gray-300 hover:border-blue-500 shadow-sm hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer hover:-translate-y-1 overflow-hidden"
              onClick={() => router.push(`/exams/${exam.slug}`)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative p-5 text-center">
                <div className="w-10 h-10 mx-auto rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-all duration-300">
                  <FileText className="w-5 h-5 text-white" />
                </div>

                <h3 className="text-sm font-semibold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors line-clamp-2 min-h-[2.5rem]">
                  {exam.name}
                </h3>

                <div className="bg-blue-50 rounded-lg p-2.5 mb-3 border border-blue-100">
                  <div className="text-sm font-semibold text-blue-600">MCQs + Mocks</div>
                  <div className="text-[10px] text-gray-500">{exam.sections.length} subjects · {exam.duration}m</div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-3 rounded-md font-semibold text-sm transition-all">
                  Practice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Full catalog of exams as JSON-LD ItemList. Helps search engines discover
// and rank every exam hub. Rendered only on the /exams index page.
const EXAMS_CATALOG_JSONLD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Competitive Exams on Imtehan',
  description: 'Catalog of Pakistani competitive exams available for MCQ practice on Imtehan.',
  numberOfItems: Object.keys(EXAM_CONFIGS).length,
  itemListElement: Object.entries(EXAM_CONFIGS).map(([slug, config], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: config.name,
    url: `https://imtehan.com/exams/${slug}`,
  })),
})

const EXAMS_BREADCRUMB_JSONLD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://imtehan.com' },
    { '@type': 'ListItem', position: 2, name: 'Exams', item: 'https://imtehan.com/exams' },
  ],
})

export default function ExamsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: EXAMS_CATALOG_JSONLD }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: EXAMS_BREADCRUMB_JSONLD }} />
      <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
        <ExamsInner />
      </Suspense>
    </>
  )
}
