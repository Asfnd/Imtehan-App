'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Bookmark, Share2 } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'
import BlogComments from './BlogComments'

export interface Heading {
  id: string
  text: string
}

export interface RelatedPost {
  slug: string
  title: string
  date: string
  category: string
}

interface BlogPostShellProps {
  title: string
  subtitle?: string
  author?: string
  authorBio?: string
  date: string
  readTime: string
  category: string
  tags?: string[]
  slug: string
  headings?: Heading[]
  otherPosts?: RelatedPost[]
  children: React.ReactNode
}

/** Extract ## headings from a markdown-like content string */
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

export default function BlogPostShell({
  title,
  subtitle,
  author      = 'Imtehan Team',
  authorBio,
  date,
  readTime,
  category,
  tags        = [],
  slug,
  headings    = [],
  otherPosts  = [],
  children,
}: BlogPostShellProps) {
  const [liked, setLiked]         = useState(false)
  const [likes, setLikes]         = useState(0)
  const [bookmarked, setBookmarked] = useState(false)
  const [copied, setCopied]       = useState(false)

  const initials = author
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleLike = () => {
    setLikes(n => liked ? n - 1 : n + 1)
    setLiked(l => !l)
  }

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />

      {/* ── Article header ── */}
      <header className="max-w-3xl mx-auto px-6 pt-10 pb-0">
        {/* Author row */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0 border border-gray-100">
            {initials}
          </div>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-sm font-medium text-gray-900 truncate">{author}</span>
            <span className="text-xs font-medium text-gray-500 border border-gray-300 rounded-full px-3 py-0.5 hover:border-gray-500 hover:text-gray-700 cursor-pointer transition-colors flex-shrink-0">
              Follow
            </span>
          </div>
          <span className="text-xs text-gray-400 flex-shrink-0 whitespace-nowrap">
            {date} · {readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-[2.4rem] font-bold text-gray-900 leading-tight mb-4 tracking-tight">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-lg text-gray-500 leading-relaxed mb-7 font-normal">
            {subtitle}
          </p>
        )}

        <div className="border-b border-gray-100" />
      </header>

      {/* ── 3-column body ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex gap-6 lg:gap-10">

          {/* LEFT — floating action bar */}
          <div className="hidden md:flex flex-col items-center gap-5 pt-10 sticky top-24 self-start w-11 flex-shrink-0">
            <button onClick={toggleLike} className="flex flex-col items-center gap-0.5 group">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${liked ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}>
                <Heart className={`w-5 h-5 transition-all ${liked ? 'fill-red-500 scale-110' : ''}`} />
              </div>
              {likes > 0 && <span className="text-[11px] text-gray-400">{likes}</span>}
            </button>

            <button
              onClick={() => setBookmarked(b => !b)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${bookmarked ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-blue-600' : ''}`} />
            </button>

            <div className="relative">
              <button
                onClick={handleShare}
                className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                title="Copy link"
              >
                <Share2 className="w-5 h-5" />
              </button>
              {copied && (
                <span className="absolute left-10 top-1/2 -translate-y-1/2 text-[10px] text-green-700 font-medium bg-green-50 border border-green-200 px-2 py-1 rounded-lg whitespace-nowrap">
                  Copied!
                </span>
              )}
            </div>
          </div>

          {/* CENTER — article */}
          <main className="flex-1 min-w-0 pt-10 pb-20">
            <div className="article-body text-[18px] leading-[1.9] text-gray-700">
              {children}
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author bio card */}
            <div className="flex items-start gap-4 mt-10 p-5 border border-gray-100 rounded-2xl bg-gray-50/50">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-base font-bold text-gray-600 flex-shrink-0 border border-gray-100">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-gray-900 text-sm">{author}</span>
                  <span className="text-xs font-medium text-gray-500 border border-gray-300 rounded-full px-3 py-0.5 hover:border-gray-500 hover:text-gray-700 cursor-pointer transition-colors">
                    Follow
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {authorBio ?? "CSS & competitive exam expert. Helping aspirants ace Pakistan's toughest civil service exams with structured preparation strategies and high-yield MCQs."}
                </p>
              </div>
            </div>

            {/* Comments */}
            <BlogComments slug={slug} />
          </main>

          {/* RIGHT — sidebar */}
          <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0 pt-10">
            <div className="sticky top-24 space-y-9">

              {/* On This Page */}
              {headings.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">
                    On This Page
                  </p>
                  <nav className="space-y-1.5">
                    {headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className="block text-[13px] text-gray-500 hover:text-gray-900 transition-colors leading-snug"
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* All Other Posts */}
              {otherPosts.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">
                    All Other Posts
                  </p>
                  <div className="space-y-5">
                    {otherPosts.slice(0, 5).map(post => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="block group"
                      >
                        <p className="text-[13px] font-medium text-gray-800 group-hover:text-gray-900 transition-colors leading-snug mb-1 line-clamp-2">
                          {post.title}
                        </p>
                        <p className="text-[11px] text-gray-400">{post.date}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}
