/**
 * Same-origin redirect allowlist for OAuth `next` param and post-sign-in navigation.
 * Keep in sync with any route that should receive users after Google sign-in.
 */

const SAFE_PATH_PREFIXES = [
  '/dashboard',
  '/profile',
  '/quiz',
  '/subjects',
  '/past-papers',
  '/practice',
  '/mdcat',
  '/fsc',
  '/css',
  '/exams',
  '/blog',
  '/contact',
  '/faq',
  '/about',
  '/terms',
  '/privacy',
  '/signin',
  '/portal',
  '/community',
] as const

/** Returns true if pathname is allowed for post-auth redirects (same-origin only; check origin separately). */
export function matchesSafeRedirectPath(pathname: string): boolean {
  if (pathname === '/') return true
  if (!pathname.startsWith('/')) return false
  return SAFE_PATH_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  )
}

/** Sanitize `next` query from /signin (path only; rejects protocol-relative and absolute URLs). */
export function getSafeRedirectPath(nextParam: string | null): string {
  if (!nextParam || nextParam.includes('://') || nextParam.startsWith('//')) {
    return '/css'
  }
  try {
    const pathname = new URL(nextParam, 'https://imtehan.com').pathname
    return matchesSafeRedirectPath(pathname) ? pathname : '/css'
  } catch {
    return '/css'
  }
}
