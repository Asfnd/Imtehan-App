import Link from 'next/link'

/**
 * Server-rendered homepage hero so LCP (h1 + subtext) paints without waiting for
 * client JS hydration. Interactive picker stays in HomeClient below the fold.
 */
export function HomeHero() {
  return (
    <section className="relative bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 sm:pt-20 sm:pb-10 md:pt-28 md:pb-12">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-[28px] sm:text-[38px] md:text-[52px] lg:text-[64px] font-bold tracking-tight mb-6 sm:mb-8 leading-[1.2] text-black">
            Prepare for CSS, MPT, PPSC &amp; 200+ exams with 150,000+ MCQs
          </h1>

          <p className="text-[15px] sm:text-[17px] md:text-[19px] text-gray-600 mb-8 sm:mb-10 leading-[1.6] max-w-2xl mx-auto font-normal px-2 sm:px-0">
            Free MCQ practice, past papers, timed mock tests and AI scan-to-solve — built for
            competitive exams in Pakistan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/css"
              className="inline-flex h-[52px] items-center rounded-xl bg-black px-8 text-[16px] font-semibold text-white shadow-sm transition-colors hover:bg-gray-900"
            >
              CSS Preparation
            </Link>
            <Link
              href="/mpt-practice"
              className="inline-flex h-[52px] items-center rounded-xl border border-gray-200 bg-white px-8 text-[16px] font-semibold text-gray-900 shadow-sm transition-colors hover:border-gray-900"
            >
              MPT Practice
            </Link>
            <Link
              href="/css/past-papers"
              className="inline-flex h-[52px] items-center rounded-xl border border-gray-200 bg-white px-8 text-[16px] font-semibold text-gray-900 shadow-sm transition-colors hover:border-gray-900"
            >
              CSS Past Papers
            </Link>
            <Link
              href="/exams"
              className="inline-flex h-[52px] items-center rounded-xl border border-gray-200 bg-white px-8 text-[16px] font-semibold text-gray-900 shadow-sm transition-colors hover:border-gray-900"
            >
              All 200+ Exams
            </Link>
            <Link
              href="/exams/category/ppsc"
              className="inline-flex h-[52px] items-center rounded-xl border border-gray-200 bg-white px-8 text-[16px] font-semibold text-gray-900 shadow-sm transition-colors hover:border-gray-900"
            >
              PPSC MCQs
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
