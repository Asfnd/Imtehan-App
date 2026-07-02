import { HomeHeroAnimatedLine } from '@/components/HomeHeroAnimatedLine'
import { HomeExamPicker } from '@/components/HomeExamPicker'

/** Server-rendered hero shell — LCP text paints before client JS hydrates. */
export function HomeHeroShell() {
  return (
    <section className="relative bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 sm:pt-20 sm:pb-16 md:pt-32 md:pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-[28px] sm:text-[38px] md:text-[52px] lg:text-[64px] font-bold tracking-tight mb-6 sm:mb-8 leading-[1.2] text-black">
            <div className="text-center">Prepare for competitive exams</div>
            <HomeHeroAnimatedLine />
          </h1>

          <p className="text-[15px] sm:text-[17px] md:text-[19px] text-gray-600 mb-8 sm:mb-10 leading-[1.6] max-w-2xl mx-auto font-normal px-2 sm:px-0">
            A comprehensive learning platform designed to help you excel in competitive examinations through effective practice, personalized insights, and proven strategies.
          </p>

          <div className="flex justify-center">
            <HomeExamPicker />
          </div>
        </div>
      </div>
    </section>
  )
}
