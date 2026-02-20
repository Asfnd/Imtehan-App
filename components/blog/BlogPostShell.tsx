'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
  author     = 'Imtehan Team',
  authorBio,
  date,
  readTime,
  category,
  tags       = [],
  slug,
  headings   = [],
  otherPosts = [],
  children,
}: BlogPostShellProps) {
  const [activeHeading, setActiveHeading] = useState('')
  const [clapped, setClapped]             = useState(false)
  const [claps, setClaps]                 = useState(0)
  const [saved, setSaved]                 = useState(false)
  const [copied, setCopied]               = useState(false)

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-80px 0px -65% 0px' }
    )
    headings.forEach(h => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  const initials = author.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />

      <div className="blog-layout">

        {/* ── LEFT — action bar ── */}
        <aside className="blog-action-bar">
          <button
            onClick={() => { setClaps(n => clapped ? n - 1 : n + 1); setClapped(c => !c) }}
            className={`blog-action-icon${clapped ? ' text-black' : ''}`}
            title="Clap"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} width={24} height={24}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            {claps > 0 && <span>{claps}</span>}
          </button>

          <button className="blog-action-icon" title="Comment">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} width={24} height={24}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>

          <div className="relative">
            <button onClick={handleShare} className="blog-action-icon" title="Share">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} width={24} height={24}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </button>
            {copied && (
              <span className="absolute left-9 top-1/2 -translate-y-1/2 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                Copied!
              </span>
            )}
          </div>

          <button
            onClick={() => setSaved(s => !s)}
            className={`blog-action-icon${saved ? ' text-black' : ''}`}
            title="Save"
          >
            <svg fill={saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} width={24} height={24}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </aside>

        {/* ── CENTER — article ── */}
        <main className="blog-main">

          {/* Author meta */}
          <div className="blog-author-meta">
            <div className="blog-avatar">{initials}</div>
            <div>
              <div className="flex items-center gap-3">
                <span className="blog-author-name">{author}</span>
                <span style={{ color: '#ccc' }}>·</span>
                <button className="blog-follow-btn">Follow</button>
              </div>
              <div className="blog-date-read">{date} · {readTime}</div>
            </div>
          </div>

          {/* Title */}
          <h1 className="blog-title">{title}</h1>

          {/* Subtitle */}
          {subtitle && <p className="blog-subtitle">{subtitle}</p>}

          {/* Body */}
          <article className="article-body">
            {children}
          </article>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 mb-4">
              {tags.map(tag => (
                <span key={tag} className="blog-tag-pill">{tag}</span>
              ))}
            </div>
          )}

          {/* Bottom author card */}
          <div className="blog-author-card">
            <div className="blog-avatar blog-avatar-lg">{initials}</div>
            <div className="flex-1">
              <div className="blog-author-card-name">Written by {author}</div>
              <p className="blog-author-card-bio">
                {authorBio ?? "CSS & competitive exam expert. Helping aspirants ace Pakistan's toughest civil service exams with structured preparation strategies and high-yield MCQs."}
              </p>
              <button className="blog-follow-btn-primary">Follow</button>
            </div>
          </div>

          {/* Comments */}
          <BlogComments slug={slug} />
        </main>

        {/* ── RIGHT — sidebar ── */}
        <aside className="blog-sidebar">

          {headings.length > 0 && (
            <div className="mb-12">
              <p className="blog-sidebar-title">On this page</p>
              <ul className="blog-toc-list">
                {headings.map(h => (
                  <li
                    key={h.id}
                    className={activeHeading === h.id ? 'blog-toc-item blog-toc-active' : 'blog-toc-item'}
                  >
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {otherPosts.length > 0 && (
            <div>
              <p className="blog-sidebar-title">Related Reads</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {otherPosts.slice(0, 5).map(post => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                    <p style={{
                      fontFamily: 'var(--font-inter), system-ui, sans-serif',
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: 1.4,
                      color: '#111',
                      marginBottom: '4px',
                    }}
                    className="group-hover:text-gray-500 transition-colors line-clamp-2">
                      {post.title}
                    </p>
                    <p style={{ color: '#52525B', fontSize: '12px' }}>{post.date}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </aside>
      </div>
    </div>
  )
}
