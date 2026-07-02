import Image from 'next/image'
import { PLAY_STORE_URL } from '@/lib/routes'
import { cn } from '@/lib/utils'

type PlayStoreButtonProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/** Official Google “Get it on Google Play” badge (646×250). Min display height per Google: 28px. */
const BADGE_HEIGHT_CLASS = {
  sm: 'h-10',      // 40px
  md: 'h-12',      // 48px
  lg: 'h-[54px]',  // 54px — nav / prominent
} as const

export function PlayStoreButton({ size = 'md', className }: PlayStoreButtonProps) {
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get Imtehan on Google Play"
      className={cn(
        'inline-flex shrink-0 items-center',
        'transition-transform duration-200 ease-out',
        'hover:scale-[1.02] active:scale-[0.98]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] focus-visible:ring-offset-2',
        className,
      )}
    >
      <Image
        src="/google-play-badge.png"
        alt="Get it on Google Play"
        width={646}
        height={250}
        priority
        className={cn('w-auto', BADGE_HEIGHT_CLASS[size])}
      />
    </a>
  )
}
