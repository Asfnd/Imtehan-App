import { PLAY_STORE_URL } from '@/lib/routes'
import { cn } from '@/lib/utils'

type PlayStoreButtonProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showNewBadge?: boolean
}

/** Official Google Play multicolor triangle. */
function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden>
      <path fill="#34A853" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" />
      <path fill="#FBBC04" d="M325.3 234.3L385.4 174.3 256 44.9 104.6 13l280.8 161.2-60.1 60.1z" />
      <path fill="#EA4335" d="M325.3 234.3l60.1 60.1 82.4-47.4c26.2-15.1 26.2-52.8 0-67.9L325.3 234.3z" />
      <path fill="#4285F4" d="M104.6 13l280.8 161.2-60.1 60.1-200.1-208.1z" />
    </svg>
  )
}

export function PlayStoreButton({ size = 'md', className, showNewBadge = false }: PlayStoreButtonProps) {
  const heights = { sm: 'h-10', md: 'h-11', lg: 'h-[52px]' }
  const pads = { sm: 'px-2.5 gap-2', md: 'px-3 gap-2.5', lg: 'px-3.5 gap-3' }
  const labelSm = { sm: 'text-[7px]', md: 'text-[8px]', lg: 'text-[9px]' }
  const labelLg = { sm: 'text-[12px]', md: 'text-[13px]', lg: 'text-base' }
  const icon = { sm: 'w-[22px] h-[22px]', md: 'w-6 h-6', lg: 'w-[26px] h-[26px]' }

  return (
    <div className={cn('inline-flex flex-col items-start gap-2', className)}>
      {showNewBadge && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DADCE0] bg-white px-3 py-1 text-xs font-medium text-[#5F6368] shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#34A853]" aria-hidden />
          Now on Google Play
        </span>
      )}
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get Imtehan on Google Play"
        className={cn(
          'group inline-flex items-center rounded-md',
          'bg-white text-[#202124]',
          'border border-[#DADCE0]',
          'shadow-[0_1px_2px_rgba(60,64,67,0.08)]',
          'transition-all duration-200 ease-out',
          'hover:border-[#BDC1C6] hover:bg-[#FAFAFA] hover:shadow-[0_1px_3px_rgba(60,64,67,0.14)]',
          'active:scale-[0.98]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] focus-visible:ring-offset-2',
          heights[size],
          pads[size],
        )}
      >
        <GooglePlayIcon className={cn(icon[size], 'shrink-0')} />
        <span className="flex flex-col items-start justify-center leading-none">
          <span
            className={cn(
              labelSm[size],
              'font-normal uppercase tracking-[0.08em] text-[#5F6368]',
            )}
          >
            Get it on
          </span>
          <span className={cn(labelLg[size], 'mt-0.5 font-medium tracking-tight text-[#202124]')}>
            Google Play
          </span>
        </span>
      </a>
    </div>
  )
}
