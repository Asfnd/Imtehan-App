import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Play, Lock } from 'lucide-react'
import { getExamConfig } from '@/lib/exam-configs'
import NavigationBar from '@/components/NavigationBar'
import { createPublicSupabaseClient } from '@/lib/supabase/public'

/** Public SEO page — ISR 24h to cut crawl CPU. */
export const revalidate = 86400

export const metadata: Metadata = {
  robots: { index: false, follow: true },
}

const MODE_CONFIG = {
  'most-repeated': { label: 'Most Repeated', icon: '🔥', type: 'most_repeated' },
  'most-important': { label: 'Most Important', icon: '⭐', type: 'most_important' },
  'past-papers': { label: 'Past MCQs', icon: '📄', type: 'practice' },
  practice: { label: 'Practice Mode', icon: '📚', type: 'mixed' }
}

const SETS_PER_BATCH = 10

export default async function BatchSetsPage({
  params
}: {
  params: Promise<{
    examSlug: string
    subjectSlug: string
    mode: string
    batchNumber: string
  }>
}) {
  const { examSlug, subjectSlug, mode, batchNumber: batchNumberStr } = await params
  const config = getExamConfig(examSlug)

  if (!config) {
    notFound()
  }

  const section = config.sections.find((s) => s.slug === subjectSlug)

  if (!section) {
    notFound()
  }

  const modeConfig = MODE_CONFIG[mode as keyof typeof MODE_CONFIG]

  if (!modeConfig) {
    notFound()
  }

  const batchNumber = parseInt(batchNumberStr)
  if (isNaN(batchNumber) || batchNumber < 1) {
    notFound()
  }

  // Get total count
  const supabase = createPublicSupabaseClient()

  let totalMCQs = 0

  if (modeConfig.type === 'mixed') {
    const { count } = await supabase
      .from(section.dbTable)
      .select('*', { count: 'exact', head: true })
    totalMCQs = count || 0
  } else if (mode === 'past-papers' && config.pastPapersExam) {
    const { count } = await supabase
      .from(section.dbTable)
      .select('*', { count: 'exact', head: true })
      .eq('target_exam', config.pastPapersExam)
    totalMCQs = count || 0
  } else {
    const { count } = await supabase
      .from(section.dbTable)
      .select('*', { count: 'exact', head: true })
      .eq('type', modeConfig.type)
    totalMCQs = count || 0
  }

  const totalSets = Math.ceil(totalMCQs / 20)
  const startSet = (batchNumber - 1) * SETS_PER_BATCH + 1
  const endSet = Math.min(batchNumber * SETS_PER_BATCH, totalSets)

  if (startSet > totalSets) {
    notFound()
  }

  const sets = Array.from(
    { length: endSet - startSet + 1 },
    (_, i) => startSet + i
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />

      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* Sets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sets.map((setNumber) => {
            const startMCQ  = (setNumber - 1) * 20 + 1
            const endMCQ    = Math.min(setNumber * 20, totalMCQs)
            const mcqCount  = endMCQ - startMCQ + 1
            const isSignIn  = setNumber === 3
            const isPremium = setNumber >= 4
            const isLocked  = isSignIn || isPremium

            return (
              <Link
                key={setNumber}
                href={`/exams/${examSlug}/${subjectSlug}/${mode}/set/${setNumber}`}
                className="group"
              >
                <div className={`bg-white rounded-xl border-2 p-6 transition-all duration-300 ${
                  isLocked
                    ? 'border-gray-200 hover:border-slate-300 hover:shadow-md'
                    : 'border-gray-200 hover:border-blue-500 hover:shadow-lg'
                }`}>
                  <div className="flex items-center gap-4">
                    {/* Badge */}
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg ${
                      isLocked
                        ? 'bg-slate-300'
                        : 'bg-gradient-to-br from-blue-500 to-blue-600 group-hover:scale-110 transition-transform'
                    }`}>
                      {isLocked
                        ? <Lock className="w-7 h-7 text-white" />
                        : <div className="text-center">
                            <div className="text-white text-xl font-bold">{setNumber}</div>
                            <div className="text-blue-100 text-[10px] font-semibold uppercase">Set</div>
                          </div>
                      }
                    </div>

                    {/* Set Info */}
                    <div className="flex-1">
                      <h3 className={`font-bold mb-1 transition-colors ${isLocked ? 'text-gray-500' : 'text-gray-900 group-hover:text-blue-600'}`}>
                        Practice Set {setNumber}
                        {isSignIn && <span className="ml-2 text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-semibold align-middle">Sign In</span>}
                        {isPremium && <span className="ml-2 text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-semibold align-middle">Premium</span>}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">Questions {startMCQ} - {endMCQ}</p>
                      <div className="flex items-center gap-2">
                        <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-semibold">{mcqCount} MCQs</div>
                        <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-semibold">~{Math.ceil(mcqCount * 1.5)} mins</div>
                      </div>
                    </div>

                    {/* Icon */}
                    {isLocked
                      ? <Lock className="w-5 h-5 text-slate-300" />
                      : <div className="text-blue-600 group-hover:translate-x-1 transition-transform">
                          <Play className="w-6 h-6 fill-current" />
                        </div>
                    }
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Progress Tracker (Optional Enhancement) */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-3">Batch Progress</h3>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full w-0 transition-all duration-500"></div>
            </div>
            <span className="text-sm font-semibold text-gray-600">0/{sets.length}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Complete all sets in this batch to track your progress
          </p>
        </div>
      </div>
    </div>
  )
}
