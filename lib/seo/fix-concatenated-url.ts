/**
 * Recover paths where an absolute URL was accidentally concatenated onto a
 * relative path (e.g. Next.js <Link href="https://imtehan.com/..."> soft-nav bug):
 *   /exams/hec-law-gathttps://imtehan.com/exams/hec-law-gat
 * Vercel/Next may collapse // → / first, yielding https:/ in the path.
 */
export function cleanConcatenatedAbsoluteUrlPath(pathname: string): string | null {
  const match = pathname.match(/^(.*?)https?:\/{0,2}/i)
  if (!match?.[1] || match[1] === pathname) return null
  const clean = match[1]
  if (!clean.startsWith('/') || clean.includes('://')) return null
  return clean.length > 1 && clean.endsWith('/') ? clean.slice(0, -1) : clean
}

/** Strip a concatenated absolute URL from a single path segment (dynamic param). */
export function stripConcatenatedUrlFromSegment(segment: string): string | null {
  const cut = segment.search(/https?:/i)
  if (cut <= 0) return null
  return segment.slice(0, cut)
}
