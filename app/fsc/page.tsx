'use client'

import { useRouter } from 'next/navigation'
import { Microscope, Atom, Zap, BookOpen, GraduationCap, ChevronRight } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'

const SUBJECTS = [
  {
    slug: 'biology',
    name: 'Biology',
    icon: Microscope,
    mcqs: 5944,
    color: 'from-emerald-600 to-teal-700',
    lightBg: 'bg-emerald-50',
    border: 'border-emerald-200',
    hover: 'hover:border-emerald-400',
    text: 'text-emerald-700',
    btnBg: 'bg-emerald-600 hover:bg-emerald-700',
    desc: 'Cell Biology, Genetics, Ecology & more',
  },
  {
    slug: 'chemistry',
    name: 'Chemistry',
    icon: Atom,
    mcqs: 6218,
    color: 'from-cyan-600 to-blue-700',
    lightBg: 'bg-cyan-50',
    border: 'border-cyan-200',
    hover: 'hover:border-cyan-400',
    text: 'text-cyan-700',
    btnBg: 'bg-cyan-600 hover:bg-cyan-700',
    desc: 'Atomic Structure, Bonding, Organic & more',
  },
  {
    slug: 'physics',
    name: 'Physics',
    icon: Zap,
    mcqs: 4695,
    color: 'from-indigo-600 to-violet-700',
    lightBg: 'bg-indigo-50',
    border: 'border-indigo-200',
    hover: 'hover:border-indigo-400',
    text: 'text-indigo-700',
    btnBg: 'bg-indigo-600 hover:bg-indigo-700',
    desc: 'Mechanics, Waves, Electromagnetism & more',
  },
]

const FEATURES = [
  { icon: BookOpen, title: 'Chapter-by-Chapter', desc: 'Practice each chapter individually, just like studying your textbook' },
  { icon: GraduationCap, title: 'FSc Syllabus Aligned', desc: 'Topics follow Punjab Textbook Board FSc Pre-Medical curriculum' },
  { icon: ChevronRight, title: 'Sets of 20 MCQs', desc: 'Manageable practice sets — perfect for daily revision sessions' },
]

export default function FSCPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 via-emerald-900 to-slate-800 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 mb-8 shadow-lg text-center">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl">
            📗
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            FSc Pre-Medical Practice
          </h1>
          <p className="text-emerald-200 text-sm">
            16,857 MCQs · Biology · Chemistry · Physics · Chapter-by-Chapter
          </p>
          <p className="text-white/50 text-xs mt-2">
            Aligned with Punjab Textbook Board · MDCAT-level difficulty
          </p>
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {SUBJECTS.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.slug}
                onClick={() => router.push(`/fsc/${s.slug}`)}
                className={`group bg-white rounded-xl border-2 ${s.border} ${s.hover} shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5 overflow-hidden`}
              >
                <div className={`bg-gradient-to-r ${s.color} p-4`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{s.name}</h3>
                      <p className="text-white/70 text-xs">{s.mcqs.toLocaleString()} MCQs</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-4">{s.desc}</p>
                  <button className={`w-full ${s.btnBg} text-white py-2 rounded-lg font-semibold text-sm transition-colors`}>
                    Practice Chapters
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Why use FSc Practice */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Why FSc Practice?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-0.5">{f.title}</p>
                    <p className="text-xs text-gray-500">{f.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
