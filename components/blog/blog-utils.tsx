// No 'use client': this file is safe to import from server components

export interface Heading {
  id: string
  text: string
}

export interface RelatedPost {
  slug: string
  title: string
  date: string
  category: string
  /** When set, related-read links go here instead of `/blog/{slug}`. */
  href?: string
}

export function extractHeadings(content: string): Heading[] {
  return content
    .split('\n')
    .filter(line => line.startsWith('## '))
    .map(line => {
      const text = line.replace(/^#{1,3}\s/, '')
      const id   = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return { id, text }
    })
}

function bold(html: string) {
  return html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}

export function renderBlogContent(raw: string) {
  const paragraphs = raw.split('\n\n')
  let isFirst = true

  return paragraphs.map((block, idx) => {
    const trimmed = block.trim()
    if (!trimmed) return null

    if (trimmed.startsWith('## ')) {
      const text = trimmed.replace(/^## /, '')
      const id   = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return <h2 key={idx} id={id}>{text}</h2>
    }

    if (trimmed.startsWith('### ')) {
      const text = trimmed.replace(/^### /, '')
      const id   = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return <h3 key={idx} id={id}>{text}</h3>
    }

    if (trimmed.startsWith('> ')) {
      return (
        <div key={idx} className="pull-quote">
          {trimmed.slice(2)}
        </div>
      )
    }

    if (trimmed.startsWith('- ')) {
      return (
        <ul key={idx}>
          {trimmed.split('\n').filter(l => l.startsWith('- ')).map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: bold(item.slice(2)) }} />
          ))}
        </ul>
      )
    }

    if (/^\d+\./.test(trimmed)) {
      return (
        <ol key={idx}>
          {trimmed.split('\n').filter(l => /^\d+\./.test(l)).map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: bold(item.replace(/^\d+\.\s*/, '')) }} />
          ))}
        </ol>
      )
    }

    if (isFirst) {
      isFirst = false
      const firstChar = trimmed[0]
      const rest = bold(trimmed.slice(1))
      return (
        <p key={idx}>
          <span className="drop-cap">{firstChar}</span>
          <span dangerouslySetInnerHTML={{ __html: rest }} />
        </p>
      )
    }

    return (
      <p key={idx} dangerouslySetInnerHTML={{ __html: bold(trimmed) }} />
    )
  })
}
