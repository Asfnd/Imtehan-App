'use client'

import Link from 'next/link'
import { AVAILABLE_NAV_CATEGORIES } from '@/lib/nav-exam-counts'

export type ExamNavItem = { key: string; label: string; href: string }

export const MEDICAL_NAV: ExamNavItem[] = [
  { key: 'mdcat', label: 'MDCAT', href: '/mdcat' },
  { key: 'fsc', label: 'FSc Pre-Medical', href: '/fsc' },
  { key: 'king-edward-medical', label: 'KEMU', href: '/exams/king-edward-medical' },
  { key: 'jsmu-karachi', label: 'JSMU', href: '/exams/jsmu-karachi' },
  { key: 'amc-entry', label: 'AMC', href: '/exams/amc-entry' },
  { key: 'dow-entry', label: 'Dow', href: '/exams/dow-entry' },
  { key: 'medical-all', label: 'All Medical', href: '/exams?category=medical' },
]

export const ENGINEERING_NAV: ExamNavItem[] = [
  { key: 'ecat', label: 'ECAT', href: '/exams?category=engineering&exam=ecat' },
  { key: 'uet-lahore', label: 'UET Lahore', href: '/exams/uet-lahore' },
  { key: 'net-engineering', label: 'NUST NET', href: '/exams?category=engineering&exam=net-engineering' },
  { key: 'giki-entry', label: 'GIKI', href: '/exams?category=engineering&exam=giki-entry' },
  { key: 'pieas-entry', label: 'PIEAS', href: '/exams?category=engineering&exam=pieas-entry' },
  { key: 'bahria-university', label: 'Bahria', href: '/exams/bahria-university' },
  { key: 'lums-engineering', label: 'LUMS LCAT', href: '/exams?category=engineering&exam=lums-engineering' },
  { key: 'comsats', label: 'COMSATS', href: '/exams?category=engineering&exam=comsats-engineering' },
  { key: 'engineering-all', label: 'All Engineering', href: '/exams?category=engineering' },
]

export const HEC_NAV: ExamNavItem[] = [
  { key: 'hec-lat', label: 'LAT', href: '/exams/hec-lat' },
  { key: 'hec-usat-e', label: 'USAT-E', href: '/exams/hec-usat-e' },
  { key: 'hec-usat-m', label: 'USAT-M', href: '/exams/hec-usat-m' },
  { key: 'hec-law-gat', label: 'Law-GAT', href: '/exams/hec-law-gat' },
  { key: 'hec-hat-1', label: 'HAT-1', href: '/exams/hec-hat-1' },
  { key: 'hec-all', label: 'All HEC', href: '/exams?category=hec' },
]

export const CATEGORY_CONFIG: Record<string, { label: string; href: string }> = {
  medical: { label: 'MDCAT', href: '/exams?category=medical' },
  engineering: { label: 'Engineering', href: '/exams?category=engineering' },
  hec: { label: 'HEC / ETC', href: '/exams?category=hec' },
  css: { label: 'CSS', href: '/css' },
  pms: { label: 'PMS', href: '/exams/pms-competitive' },
  ppsc: { label: 'PPSC', href: '/exams?category=ppsc' },
  fpsc: { label: 'FPSC', href: '/exams?category=fpsc' },
  fia: { label: 'FIA', href: '/exams?category=fia' },
  provincial: { label: 'Provincial', href: '/exams?category=provincial' },
  police: { label: 'Police', href: '/exams?category=police' },
  military: { label: 'Military', href: '/exams?category=military' },
  nts: { label: 'NTS', href: '/exams?category=nts' },
  ots: { label: 'OTS', href: '/exams?category=ots' },
  etea: { label: 'ETEA', href: '/exams?category=etea' },
  railways: { label: 'Railways', href: '/exams?category=railways' },
  banks: { label: 'Banks', href: '/exams?category=banks' },
  judiciary: { label: 'Judiciary', href: '/exams?category=judiciary' },
  devauth: { label: 'Dev Authority', href: '/exams?category=devauth' },
  rescue: { label: 'Rescue 1122', href: '/exams?category=rescue' },
  revenue: { label: 'Revenue Auth', href: '/exams?category=revenue' },
}

const OTHER_COMPETITIVE = AVAILABLE_NAV_CATEGORIES.filter(
  (c) => c !== 'medical' && c !== 'engineering' && c !== 'hec' && c !== 'css' && c !== 'pms',
)

const chip =
  'px-3.5 py-1.5 rounded-lg border border-gray-200 text-[11px] font-medium text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-150'
const chipDesktop =
  'px-4 py-2 rounded-lg border-2 border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-150'

type ExamBrowseMenuProps = {
  onNavigate?: () => void
  /** denser chips for mobile / hero */
  compact?: boolean
  className?: string
}

/** Shared exam grid used by Browse Exams + Start Preparing. Scrolls when tall. */
export function ExamBrowseMenu({ onNavigate, compact = false, className = '' }: ExamBrowseMenuProps) {
  const chipClass = compact ? chip : chipDesktop
  const sectionPad = compact ? 'pt-3 mb-4' : 'pt-4 mb-4'
  const border = compact ? 'border-t border-gray-100' : 'border-t-2 border-gray-200'

  return (
    <div
      className={`overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] ${className || 'max-h-[min(70vh,560px)]'}`}
      role="menu"
      aria-label="Browse exams"
    >
      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-2">Medical</p>
      <div className="flex flex-wrap gap-1.5 mb-4 sm:gap-2">
        {MEDICAL_NAV.map((item) => (
          <Link key={item.key} href={item.href} onClick={onNavigate} role="menuitem" className={chipClass}>
            {item.label}
          </Link>
        ))}
      </div>

      <div className={`${border} ${sectionPad}`}>
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-2">Engineering</p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {ENGINEERING_NAV.map((item) => (
            <Link key={item.key} href={item.href} onClick={onNavigate} role="menuitem" className={chipClass}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className={`${border} ${sectionPad}`}>
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-2">HEC / ETC</p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {HEC_NAV.map((item) => (
            <Link key={item.key} href={item.href} onClick={onNavigate} role="menuitem" className={chipClass}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className={`${border} ${compact ? 'pt-3' : 'pt-4'}`}>
        <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-[0.12em] mb-2">Civil Services</p>
        <div className="flex gap-1.5 mb-3 sm:gap-2">
          {(['css', 'pms'] as const).map((cat) => {
            const cfg = CATEGORY_CONFIG[cat]
            return (
              <Link
                key={cat}
                href={cfg.href}
                onClick={onNavigate}
                role="menuitem"
                className={
                  compact
                    ? 'flex-1 px-3.5 py-2 rounded-xl border border-indigo-200 bg-indigo-50 text-[11px] font-bold text-indigo-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-150 text-center'
                    : 'flex-1 px-4 py-2.5 rounded-xl border-2 border-indigo-200 bg-indigo-50 text-xs font-bold text-indigo-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-150 text-center'
                }
              >
                {cfg.label}
              </Link>
            )
          })}
        </div>

        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-2">Other Competitive Exams</p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {OTHER_COMPETITIVE.map((cat) => {
            const cfg = CATEGORY_CONFIG[cat]
            if (!cfg) return null
            return (
              <Link key={cat} href={cfg.href} onClick={onNavigate} role="menuitem" className={chipClass}>
                {cfg.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
