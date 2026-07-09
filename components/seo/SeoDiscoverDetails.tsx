import type { ReactNode } from 'react'

/** Collapsed-by-default SEO depth — crawlable HTML without cluttering the UI. */
export function SeoDiscoverDetails({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <section className="border-t border-gray-100 bg-gray-50/80">
      <details className="group mx-auto max-w-5xl px-4 py-5 sm:px-6">
        <summary className="cursor-pointer list-none text-sm font-medium text-gray-600 transition hover:text-gray-900 [&::-webkit-details-marker]:hidden">
          <span className="inline-flex items-center gap-2">
            {label}
            <span
              aria-hidden
              className="text-gray-400 transition group-open:rotate-45"
            >
              +
            </span>
          </span>
          {hint ? (
            <span className="mt-0.5 block text-xs font-normal text-gray-400">{hint}</span>
          ) : null}
        </summary>
        <div className="mt-4 rounded-xl border border-gray-100 bg-white p-5 sm:p-6">{children}</div>
      </details>
    </section>
  )
}

/** One-line visible H1 strip for crawlers and users — not a content wall. */
export function SeoPageHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <h1 className="text-base font-semibold text-gray-900 sm:text-lg">{title}</h1>
        {subtitle ? (
          <p className="mt-0.5 line-clamp-2 text-xs text-gray-500 sm:text-sm">{subtitle}</p>
        ) : null}
      </div>
    </header>
  )
}
