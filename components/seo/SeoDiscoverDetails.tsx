import type { ReactNode } from 'react'

/**
 * Crawl layer — full semantic HTML in the document for Google & screen readers,
 * zero visual footprint (Tailwind sr-only). Not display:none (still in layout tree).
 */
export function SeoCrawlLayer({
  label,
  children,
}: {
  label?: string
  children: ReactNode
}) {
  return (
    <section aria-label={label} className="sr-only">
      {children}
    </section>
  )
}

/** Wraps any crawl-only block — use for shells so visible UI can never leak in by mistake. */
export function SeoCrawlOnly({ children }: { children: ReactNode }) {
  return <div className="sr-only">{children}</div>
}

/** Invisible H1 + intro — satisfies crawler heading requirements without UI clutter. */
export function SeoPageHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <header className="sr-only">
      <h1>{title}</h1>
      {subtitle ? <p>{subtitle}</p> : null}
    </header>
  )
}

/** Deep SEO content (FAQs, sample MCQs, internal links) — hidden, still indexable. */
export function SeoDiscoverDetails({
  label,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <section aria-label={label} className="sr-only">
      {children}
    </section>
  )
}

/** Internal link mesh for crawlers — not shown as pill UI. */
export function SeoCrawlNav({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <nav aria-label={label} className="sr-only">
      {children}
    </nav>
  )
}
