type NoteTableProps = {
  caption: string
  headers: string[]
  rows: string[][]
  /** Make the first column narrower (good for Point / Fact tables). */
  narrowFirst?: boolean
}

export function NoteTable({ caption, headers, rows, narrowFirst = true }: NoteTableProps) {
  const cols = headers.length
  const template =
    narrowFirst && cols === 2
      ? 'minmax(140px, 0.38fr) minmax(0, 1fr)'
      : `repeat(${cols}, minmax(0, 1fr))`

  const totalRows = rows.length

  return (
    <div className="nt-block">
      <p className="nt-caption">{caption}</p>
      <div
        className="nt-grid"
        style={{ gridTemplateColumns: template }}
        role="table"
        aria-label={caption}
      >
        {headers.map((header, i) => {
          const classes = [
            'nt-th',
            i === cols - 1 ? 'nt-last-col' : '',
            totalRows === 0 ? 'nt-last-row' : '',
          ]
            .filter(Boolean)
            .join(' ')
          return (
            <div key={`h-${header}`} className={classes} role="columnheader">
              {header}
            </div>
          )
        })}
        {rows.map((row, rowIndex) =>
          row.map((cell, cellIndex) => {
            const isLastCol = cellIndex === cols - 1
            const isLastRow = rowIndex === totalRows - 1
            const classes = [
              'nt-td',
              cellIndex === 0 && narrowFirst ? 'nt-td-key' : '',
              isLastCol ? 'nt-last-col' : '',
              isLastRow ? 'nt-last-row' : '',
            ]
              .filter(Boolean)
              .join(' ')
            return (
              <div
                key={`r${rowIndex}-c${cellIndex}`}
                className={classes}
                role="cell"
              >
                {cell}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

type TimelineItem = {
  year: string
  title: string
  why: string
}

export function NoteTimeline({
  caption,
  items,
}: {
  caption: string
  items: TimelineItem[]
}) {
  return (
    <div className="nt-block">
      <p className="nt-caption">{caption}</p>
      <div className="nt-timeline" role="list">
        {items.map((item) => (
          <div className="nt-timeline-row" role="listitem" key={`${item.year}-${item.title}`}>
            <div className="nt-timeline-year">{item.year}</div>
            <div className="nt-timeline-body">
              <p className="nt-timeline-title">{item.title}</p>
              <p className="nt-timeline-why">{item.why}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
