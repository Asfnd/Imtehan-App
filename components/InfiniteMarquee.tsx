'use client'

interface MarqueeItem {
  text: string
  subtext?: string
}

interface InfiniteMarqueeProps {
  items: MarqueeItem[]
  direction?: 'left' | 'right'
  speed?: number
  isReview?: boolean
}

export function InfiniteMarquee({ items, direction = 'left', speed = 40, isReview = false }: InfiniteMarqueeProps) {
  // Only duplicate items twice for seamless loop (instead of 3x)
  // Optimizes DOM size while maintaining animation smoothness
  const allItems = [...items, ...items]

  return (
    <div className="relative overflow-hidden py-4">
      <div
        className={`flex gap-6 md:gap-8 w-fit ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {allItems.map((item, index) => (
          <div
            key={index}
            className={`flex-shrink-0 ${
              isReview
                ? 'bg-white border border-gray-100 rounded-lg px-5 py-4 shadow-sm hover:shadow-md transition-shadow w-[280px] h-[140px] flex flex-col justify-between'
                : 'flex flex-col items-center justify-center min-w-[200px] md:min-w-[240px]'
            }`}
          >
            {isReview ? (
              <>
                <p className="text-[13px] md:text-sm text-gray-700 leading-snug line-clamp-4">
                  {item.text}
                </p>
                {item.subtext && (
                  <p className="text-xs text-gray-500 font-medium mt-2">
                    {item.subtext}
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="text-sm md:text-base font-semibold text-gray-900 whitespace-nowrap">
                  {item.text}
                </div>
                {item.subtext && (
                  <div className="text-xs md:text-sm text-gray-600 whitespace-nowrap mt-0.5">
                    {item.subtext}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />
    </div>
  )
}
