'use client'

import { X } from 'lucide-react'
import { FACEBOOK_URL, INSTAGRAM_URL } from '@/lib/routes'

function InstagramGlyph({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function FacebookGlyph({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

interface FollowUsPopupProps {
  isOpen: boolean
  onClose: () => void
}

/** One-time professional follow prompt (Instagram primary, Facebook secondary). */
export function FollowUsPopup({ isOpen, onClose }: FollowUsPopupProps) {
  if (!isOpen) return null

  return (
    <>
      <button
        type="button"
        aria-label="Close"
        className="fixed inset-0 z-[100] bg-slate-900/45 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="follow-us-title"
          className="pointer-events-auto w-full max-w-[400px] overflow-hidden rounded-2xl bg-white shadow-[0_24px_64px_-28px_rgba(15,23,42,0.45)] ring-1 ring-slate-900/[0.06]"
        >
          <div className="relative px-6 pb-2 pt-6 sm:px-7 sm:pt-7">
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Welcome to Imtehan
            </p>
            <h2 id="follow-us-title" className="mt-1.5 text-[1.35rem] font-semibold tracking-tight text-slate-900">
              Follow us for tips & updates
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-slate-500">
              Short practice tips, exam reminders, and new sets — right where you already scroll.
            </p>
          </div>

          <div className="space-y-2.5 px-6 pb-5 pt-4 sm:px-7">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-rose-200/80 bg-rose-50 text-[15px] font-semibold text-[#C13584] transition-all hover:border-rose-300 hover:bg-rose-100/80 active:scale-[0.99]"
            >
              <InstagramGlyph />
              Follow on Instagram
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white text-[15px] font-semibold text-[#1877F2] transition-all hover:border-blue-200 hover:bg-blue-50/60 active:scale-[0.99]"
            >
              <FacebookGlyph />
              Follow on Facebook
            </a>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 text-center text-[13px] font-medium text-slate-400 transition-colors hover:text-slate-600"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

/** Persistent follow strip for quiz results and similar moments. */
export function FollowUsCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`rounded-xl border border-slate-200/90 bg-gradient-to-br from-slate-50 to-white px-4 py-4 sm:px-5 ${className}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-slate-800">Follow Imtehan</p>
          <p className="mt-0.5 text-[12px] leading-snug text-slate-500">
            Tips, reminders & new practice — Instagram & Facebook
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-rose-200/90 bg-white px-3 text-[13px] font-semibold text-[#C13584] transition-colors hover:bg-rose-50 sm:flex-initial"
            aria-label="Follow on Instagram"
          >
            <InstagramGlyph className="h-4 w-4" />
            Instagram
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-[13px] font-semibold text-[#1877F2] transition-colors hover:bg-blue-50 sm:flex-initial"
            aria-label="Follow on Facebook"
          >
            <FacebookGlyph className="h-4 w-4" />
            Facebook
          </a>
        </div>
      </div>
    </div>
  )
}
