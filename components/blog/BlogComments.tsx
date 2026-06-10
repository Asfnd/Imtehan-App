'use client'

import { useState, useEffect } from 'react'
import { MessageSquare } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Comment {
  id: number
  author_name: string
  comment: string
  created_at: string
}

export default function BlogComments({ slug }: { slug: string }) {
  const [comments, setComments]   = useState<Comment[]>([])
  const [loading, setLoading]     = useState(true)
  const [name, setName]           = useState('')
  const [text, setText]           = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('blog_comments')
        .select('id, author_name, comment, created_at')
        .eq('post_slug', slug)
        .eq('approved', true)
        .order('created_at', { ascending: true })
      setComments(data ?? [])
      setLoading(false)
    }
    load()
  }, [slug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !text.trim()) return
    setSubmitting(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from('blog_comments').insert({
        post_slug:   slug,
        author_name: name.trim(),
        comment:     text.trim(),
        user_id:     user?.id ?? null,
        approved:    false,
      })
      setSubmitted(true)
      setName('')
      setText('')
    } catch (_) { /* silent */ }
    setSubmitting(false)
  }

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div className="mt-14 pt-10 border-t border-gray-100">
      <div className="flex items-center gap-2 mb-7">
        <MessageSquare className="w-5 h-5 text-gray-400" />
        <h3 className="text-lg font-bold text-gray-900">
          {loading ? 'Comments' : `${comments.length} Comment${comments.length !== 1 ? 's' : ''}`}
        </h3>
      </div>

      {/* Form */}
      {!submitted ? (
        <form onSubmit={handleSubmit} className="mb-10 bg-gray-50 rounded-2xl p-5 border border-gray-100">
          <p className="text-sm font-semibold text-gray-700 mb-4">Leave a comment</p>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            required
            className="w-full text-sm border border-gray-200 bg-white rounded-xl px-4 py-2.5 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
          />
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Share your thoughts…"
            rows={4}
            required
            className="w-full text-sm border border-gray-200 bg-white rounded-xl px-4 py-2.5 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-400"
          />
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-gray-400">Comments are reviewed before publishing</p>
            <button
              type="submit"
              disabled={submitting || !name.trim() || !text.trim()}
              className="px-5 py-2 text-sm font-semibold bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? 'Posting…' : 'Post Comment'}
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-10 bg-green-50 border border-green-200 rounded-2xl p-5 text-sm text-green-700 font-medium">
          ✓ Thanks! Your comment will appear after review.
        </div>
      )}

      {/* Comments list */}
      {loading ? (
        <div className="space-y-5">
          {[1, 2].map(i => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0" />
              <div className="flex-1 space-y-2 pt-1">
                <div className="h-3 bg-gray-200 rounded w-28" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <div className="space-y-7">
          {comments.map(c => (
            <div key={c.id} className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 flex-shrink-0 border border-gray-200">
                {c.author_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-sm font-semibold text-gray-900">{c.author_name}</span>
                  <span className="text-xs text-gray-400">{fmt(c.created_at)}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{c.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
