import Link from 'next/link'

/** sr-only links to sibling practice sets — strengthens crawl mesh without UI clutter. */
export function SeoSiblingSetLinks({
  basePath,
  currentSet,
  maxSet = 3,
  label = 'Practice sets',
}: {
  basePath: string
  currentSet: number
  maxSet?: number
  label?: string
}) {
  const sets = Array.from({ length: maxSet }, (_, i) => i + 1).filter((n) => n !== currentSet)
  if (sets.length === 0) return null

  return (
    <nav aria-label={label} className="sr-only">
      <ul>
        {sets.map((n) => (
          <li key={n}>
            <Link href={`${basePath}/set/${n}`}>Set {n}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
