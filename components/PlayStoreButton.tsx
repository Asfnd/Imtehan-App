import { PLAY_STORE_URL } from '@/lib/routes'
import { cn } from '@/lib/utils'

type PlayStoreButtonProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showNewBadge?: boolean
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M3.6 1.8c-.3.2-.6.6-.6 1.1v18.2c0 .5.3.9.6 1.1l10.2-10.2L3.6 1.8zm11.4 9.2-2.5 2.5 2.5 2.5 5.9-3.4c.9-.5.9-1.7 0-2.2l-5.9-3.4zm-3.4 3.4-8.8 8.8c.2.3.6.5 1 .5.2 0 .4 0 .6-.1l7.2-4.2-2.5-2.5 2.1-2.5zm-.6-9.1L4 4.4c-.2-.1-.4-.1-.6-.1-.4 0-.8.2-1 .5l8.8 8.8 2.5-2.5z"
      />
    </svg>
  )
}

export function PlayStoreButton({ size = 'md', className, showNewBadge = false }: PlayStoreButtonProps) {
  const heights = { sm: 'h-10', md: 'h-11', lg: 'h-[52px]' }
  const pads = { sm: 'px-3 gap-2', md: 'px-3.5 gap-2.5', lg: 'px-4 gap-3' }
  const labelSm = { sm: 'text-[8px]', md: 'text-[9px]', lg: 'text-[10px]' }
  const labelLg = { sm: 'text-[13px]', md: 'text-sm', lg: 'text-[17px]' }
  const icon = { sm: 'w-5 h-5', md: 'w-6 h-6', lg: 'w-7 h-7' }

  return (
    <div className={cn('inline-flex flex-col items-center gap-2', className)}>
      {showNewBadge && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
          Now on Google Play
        </span>
      )}
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get Imtehan on Google Play"
        className={cn(
          'inline-flex items-center rounded-xl bg-[#0d0d0d] text-white shadow-lg shadow-black/15',
          'ring-1 ring-black/10 transition-all duration-200',
          'hover:-translate-y-0.5 hover:bg-black hover:shadow-xl hover:shadow-black/20',
          'active:translate-y-0 active:scale-[0.98]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5BDB] focus-visible:ring-offset-2',
          heights[size],
          pads[size],
        )}
      >
        <PlayIcon className={cn(icon[size], 'shrink-0 text-white')} />
        <span className="flex flex-col items-start leading-none">
          <span className={cn(labelSm[size], 'font-medium uppercase tracking-wide text-white/75')}>
            Get it on
          </span>
          <span className={cn(labelLg[size], 'font-semibold tracking-tight')}>Google Play</span>
        </span>
      </a>
    </div>
  )
}
