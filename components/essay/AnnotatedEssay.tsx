'use client'

import { useState } from 'react'

export interface Annotation {
  quote: string
  type: 'strength' | 'weakness' | 'suggestion'
  comment: string
}

interface AnnotatedEssayProps {
  text: string
  annotations: Annotation[]
}

interface Segment {
  text: string
  annotation?: Annotation
}

const TYPE_STYLES: Record<string, string> = {
  strength: 'bg-green-100 border-b-2 border-green-400 cursor-pointer hover:bg-green-200 transition-colors',
  weakness: 'bg-red-100 border-b-2 border-red-400 cursor-pointer hover:bg-red-200 transition-colors',
  suggestion: 'bg-amber-100 border-b-2 border-amber-400 cursor-pointer hover:bg-amber-200 transition-colors',
}

const TYPE_BADGE: Record<string, string> = {
  strength: 'bg-green-500 text-white',
  weakness: 'bg-red-500 text-white',
  suggestion: 'bg-amber-500 text-white',
}

const TYPE_LABEL: Record<string, string> = {
  strength: 'Strength',
  weakness: 'Weakness',
  suggestion: 'Suggestion',
}

function findQuotePosition(essay: string, quote: string): number {
  const exact = essay.indexOf(quote)
  if (exact !== -1) return exact
  // Fuzzy: try first 6 words
  const words = quote.split(' ').slice(0, 6).join(' ')
  if (words.length > 10) return essay.indexOf(words)
  return -1
}

function buildSegments(text: string, annotations: Annotation[]): Segment[] {
  // Sort annotations by their position in text
  const positioned = annotations
    .map(ann => ({ ann, pos: findQuotePosition(text, ann.quote) }))
    .filter(({ pos }) => pos !== -1)
    .sort((a, b) => a.pos - b.pos)

  const segments: Segment[] = []
  let cursor = 0

  for (const { ann, pos } of positioned) {
    const quoteLen = ann.quote.length
    const end = pos + quoteLen

    // Skip overlapping annotations
    if (pos < cursor) continue

    // Text before this annotation
    if (pos > cursor) {
      segments.push({ text: text.slice(cursor, pos) })
    }

    // The annotated segment
    segments.push({ text: text.slice(pos, end), annotation: ann })
    cursor = end
  }

  // Remaining text
  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor) })
  }

  return segments
}

export default function AnnotatedEssay({ text, annotations }: AnnotatedEssayProps) {
  const [activeAnnotation, setActiveAnnotation] = useState<Annotation | null>(null)

  const segments = buildSegments(text, annotations)

  const strengthCount = annotations.filter(a => a.type === 'strength').length
  const weaknessCount = annotations.filter(a => a.type === 'weakness').length
  const suggestionCount = annotations.filter(a => a.type === 'suggestion').length

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full font-medium text-green-700">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
          Strengths ({strengthCount})
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full font-medium text-red-700">
          <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
          Weaknesses ({weaknessCount})
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full font-medium text-amber-700">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
          Suggestions ({suggestionCount})
        </span>
        <span className="text-gray-400 self-center ml-1 hidden sm:inline">· tap to view comments</span>
      </div>

      {/* Essay with inline highlights */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm">
        <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-wrap font-serif">
          {segments.map((seg, i) =>
            seg.annotation ? (
              <span
                key={i}
                className={TYPE_STYLES[seg.annotation.type]}
                onClick={() => setActiveAnnotation(
                  activeAnnotation?.quote === seg.annotation!.quote ? null : seg.annotation!
                )}
                title={seg.annotation.comment}
              >
                {seg.text}
              </span>
            ) : (
              <span key={i}>{seg.text}</span>
            )
          )}
        </p>
      </div>

      {/* Active annotation tooltip */}
      {activeAnnotation && (
        <div className={`rounded-2xl border p-4 ${
          activeAnnotation.type === 'strength' ? 'bg-green-50 border-green-200' :
          activeAnnotation.type === 'weakness' ? 'bg-red-50 border-red-200' :
          'bg-amber-50 border-amber-200'
        }`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${TYPE_BADGE[activeAnnotation.type]} mb-2 inline-block`}>
                {TYPE_LABEL[activeAnnotation.type]}
              </span>
              <p className="text-xs text-gray-600 italic mb-2">"{activeAnnotation.quote}"</p>
              <p className="text-sm text-gray-800">{activeAnnotation.comment}</p>
            </div>
            <button
              onClick={() => setActiveAnnotation(null)}
              className="text-gray-400 hover:text-gray-600 text-lg leading-none mt-0.5"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Annotations list */}
      {annotations.length > 0 && (
        <div className="space-y-2">
          <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">All Annotations</p>
          {annotations.map((ann, i) => (
            <div
              key={i}
              className={`rounded-xl border p-3 cursor-pointer transition-all hover:shadow-sm ${
                ann.type === 'strength' ? 'bg-green-50 border-green-200 hover:border-green-400' :
                ann.type === 'weakness' ? 'bg-red-50 border-red-200 hover:border-red-400' :
                'bg-amber-50 border-amber-200 hover:border-amber-400'
              }`}
              onClick={() => setActiveAnnotation(ann)}
            >
              <div className="flex items-start gap-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${TYPE_BADGE[ann.type]}`}>
                  {TYPE_LABEL[ann.type]}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 italic truncate">"{ann.quote}"</p>
                  <p className="text-sm text-gray-700 mt-0.5">{ann.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
