'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

const MEDICAL_CATEGORIES = [
  { key: 'mdcat', label: 'MDCAT', href: '/mdcat' },
  { key: 'fsc', label: 'FSc Pre-Medical', href: '/fsc' },
]

const ENGINEERING_CATEGORIES = [
  { key: 'ecat', label: 'ECAT', href: '/exams?category=engineering&exam=ecat' },
  { key: 'net-engineering', label: 'NUST NET', href: '/exams?category=engineering&exam=net-engineering' },
  { key: 'giki-entry', label: 'GIKI', href: '/exams?category=engineering&exam=giki-entry' },
  { key: 'pieas-entry', label: 'PIEAS', href: '/exams?category=engineering&exam=pieas-entry' },
  { key: 'lums-engineering', label: 'LUMS LCAT', href: '/exams?category=engineering&exam=lums-engineering' },
  { key: 'comsats', label: 'COMSATS', href: '/exams?category=engineering&exam=comsats-engineering' },
]

const COMPETITIVE_CATEGORIES = [
  { key: 'css', label: 'CSS', href: '/css' },
  { key: 'pms', label: 'PMS', href: '/exams/pms-competitive' },
  { key: 'ppsc', label: 'PPSC', href: '/exams?category=ppsc' },
  { key: 'fpsc', label: 'FPSC', href: '/exams?category=fpsc' },
  { key: 'fia', label: 'FIA', href: '/exams?category=fia' },
  { key: 'provincial', label: 'Provincial', href: '/exams?category=provincial' },
  { key: 'police', label: 'Police', href: '/exams?category=police' },
  { key: 'military', label: 'Military', href: '/exams?category=military' },
  { key: 'nts', label: 'NTS', href: '/exams?category=nts' },
  { key: 'ots', label: 'OTS', href: '/exams?category=ots' },
  { key: 'etea', label: 'ETEA', href: '/exams?category=etea' },
  { key: 'railways', label: 'Railways', href: '/exams?category=railways' },
  { key: 'banks', label: 'Banks', href: '/exams?category=banks' },
  { key: 'judiciary', label: 'Judiciary', href: '/exams?category=judiciary' },
  { key: 'devauth', label: 'Dev Authority', href: '/exams?category=devauth' },
  { key: 'rescue', label: 'Rescue 1122', href: '/exams?category=rescue' },
  { key: 'revenue', label: 'Revenue Auth', href: '/exams?category=revenue' },
]

export function HomeExamPicker() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 h-[52px] px-8 text-[16px] font-semibold bg-black hover:bg-gray-900 text-white rounded-xl shadow-sm transition-colors"
      >
        Start Preparing
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 bg-white border border-gray-200/70 rounded-2xl shadow-xl z-50 p-5 w-[92vw] max-w-[440px]">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-2">Medical</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {MEDICAL_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => {
                  router.push(cat.href)
                  setOpen(false)
                }}
                className="px-3.5 py-1.5 rounded-lg border border-gray-200 text-[11px] font-medium text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-150"
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-4 mb-4">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-2">Engineering</p>
            <div className="flex flex-wrap gap-1.5">
              {ENGINEERING_CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => {
                    router.push(cat.href)
                    setOpen(false)
                  }}
                  className="px-3.5 py-1.5 rounded-lg border border-gray-200 text-[11px] font-medium text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-150"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-2">Competitive Exams</p>
            <div className="flex flex-wrap gap-1.5">
              {COMPETITIVE_CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => {
                    router.push(cat.href)
                    setOpen(false)
                  }}
                  className="px-3.5 py-1.5 rounded-lg border border-gray-200 text-[11px] font-medium text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-150"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
