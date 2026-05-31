'use client'

import Link from 'next/link'
import { ChevronDown, Clock, MapPin, ArrowRight } from 'lucide-react'
import type { Role } from '@/lib/careers-data'
import { applicationHref } from '@/lib/careers-data'
import { Button } from '@/components/ui/Button'

interface RoleCardProps {
  role: Role
  expanded: boolean
  onToggle: () => void
}

export function RoleCard({ role, expanded, onToggle }: RoleCardProps) {
  const panelId = `role-panel-${role.id}`

  return (
    <article
      id={role.id}
      className="group scroll-mt-28 bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden transition-all duration-200 hover:border-primary/25 hover:shadow-md"
    >
      <button
        type="button"
        id={`role-trigger-${role.id}`}
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full text-left p-6 md:p-7 flex flex-col sm:flex-row sm:items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/8 px-2.5 py-1 rounded-md">
              {role.department}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" aria-hidden />
              {role.type}
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 tracking-tight group-hover:text-primary transition-colors">
            {role.title}
          </h3>
          <p className="text-gray-600 text-sm mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-1">
            {role.summary}
          </p>
          <p className="inline-flex items-center gap-1.5 mt-3 text-sm text-gray-500">
            <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden />
            {role.location}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 sm:pl-4">
          <Button size="sm" className="min-w-[88px] rounded-lg" asChild>
            <Link
              href={applicationHref(role.id)}
              onClick={(e) => e.stopPropagation()}
            >
              Apply
            </Link>
          </Button>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </div>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={`role-trigger-${role.id}`}
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 md:px-7 pb-7 pt-2 border-t border-gray-100">
            <div className="grid md:grid-cols-2 gap-8 mb-7">
              <div>
                <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
                  Responsibilities
                </h4>
                <ul className="space-y-2.5">
                  {role.responsibilities.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-gray-600 leading-relaxed">
                      <span className="mt-2 h-1 w-1 rounded-full bg-primary shrink-0" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
                  Requirements
                </h4>
                <ul className="space-y-2.5">
                  {role.requirements.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-gray-600 leading-relaxed">
                      <span className="mt-2 h-1 w-1 rounded-full bg-primary shrink-0" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Button className="rounded-xl" asChild>
              <Link href={applicationHref(role.id)}>
                Apply for {role.title}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
