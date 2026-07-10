'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { ExamBrowseMenu } from '@/components/ExamBrowseMenu'

export function HomeExamPicker() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2.5 h-[52px] px-8 text-[16px] font-semibold bg-black hover:bg-gray-900 text-white rounded-xl shadow-sm transition-colors"
      >
        Start Preparing
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-1/2 z-50 mt-2.5 w-[min(92vw,480px)] -translate-x-1/2 rounded-2xl border border-gray-200/70 bg-white p-4 shadow-xl sm:p-5">
          <ExamBrowseMenu compact onNavigate={() => setOpen(false)} />
        </div>
      )}
    </div>
  )
}
