import { PLAY_STORE_URL } from '@/lib/routes'
import { cn } from '@/lib/utils'

type PlayStoreButtonProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showNewBadge?: boolean
}

/** Official-style multicolor Google Play triangle. */
function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden>
      <path
        fill="#34A853"
        d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z"
      />
      <path
        fill="#FBBC04"
        d="M325.3 234.3L385.4 174.3 256 44.9 104.6 13l280.8 161.2-60.1 60.1z"
      />
      <path
        fill="#EA4335"
        d="M325.3 234.3l60.1 60.1 82.4-47.4c26.2-15.1 26.2-52.8 0-67.9L325.3 234.3z"
      />
      <path
        fill="#4285F4"
        d="M104.6 13l280.8 161.2-60.1 60.1-200.1-208.1z"
      />
    </svg>
  )
}

export function PlayStoreButton({ size = 'md', className, showNewBadge = false }: PlayStoreButtonProps) {
  const heights = { sm: 'h-10', md: 'h-11', lg: 'h-[54px]' }
  const pads = { sm: 'px-3 gap-2.5', md: 'px-3.5 gap-3', lg: 'px-4 gap-3.5' }
  const labelSm = { sm: 'text-[8px]', md: 'text-[9px]', lg: 'text-[10px]' }
  const labelLg = { sm: 'text-[13px]', md: 'text-sm', lg: 'text-[17px]' }
  const icon = { sm: 'w-[22px] h-[22px]', md: 'w-6 h-6', lg: 'w-7 h-7' }

  return (
    <div className={cn('inline-flex flex-col items-start gap-2', className)}>
      {showNewBadge && (
        <span
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5',
            'border border-[#3DDC84]/35 bg-gradient-to-r from-[#3DDC84]/12 to-[#4285F4]/8',
            'text-xs font-semibold text-[#0d652d] shadow-sm',
          )}
        >
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3DDC84] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3DDC84]" />
          </span>
          Now on Google Play
        </span>
      )}
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get Imtehan on Google Play"
        className={cn(
          'group inline-flex items-center rounded-[10px]',
          'bg-gradient-to-b from-[#1a1a1a] to-black text-white',
          'border border-white/10 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.45)]',
          'transition-all duration-200 ease-out',
          'hover:-translate-y-0.5 hover:border-[#3DDC84]/35',
          'hover:shadow-[0_14px_32px_-8px_rgba(61,220,132,0.28)]',
          'active:translate-y-0 active:scale-[0.98]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DDC84] focus-visible:ring-offset-2',
          heights[size],
          pads[size],
        )}
      >
        <span
          className={cn(
            'flex shrink-0 items-center justify-center rounded-md bg-white/[0.06] p-0.5',
            'ring-1 ring-white/10 transition-colors group-hover:bg-white/[0.1]',
            icon[size],
          )}
        >
        <GooglePlayIcon className="h-full w-full drop-shadow-sm" />
        </span>
        <span className="flex flex-col items-start leading-none">
          <span
            className={cn(
              labelSm[size],
              'font-medium uppercase tracking-[0.14em] text-white/70',
            )}
          >
            Get it on
          </span>
          <span className={cn(labelLg[size], 'font-semibold tracking-tight text-white')}>
            Google Play
          </span>
        </span>
      </a>
    </div>
  )
}
