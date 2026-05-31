'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Globe,
  GraduationCap,
  Heart,
  Laptop,
  Rocket,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'
import { Button } from '@/components/ui/Button'
import { Footer } from '@/components/Footer'
import { RoleCard } from '@/components/careers/RoleCard'
import { CareersSchemas } from '@/components/careers/CareersSchemas'
import { SectionLabel } from '@/components/careers/SectionLabel'
import {
  applicationHref,
  BENEFITS,
  CAREERS_EMAIL,
  DEPARTMENTS,
  HIRING_FAQ,
  HIRING_STEPS,
  OPEN_ROLES,
  VALUES,
  type Department,
} from '@/lib/careers-data'

const STATS = [
  { value: '70,000+', label: 'Practice questions' },
  { value: '200+', label: 'Exams supported' },
  { value: 'Remote', label: 'Pakistan-wide team' },
]

const BENEFIT_ICONS = [Globe, Laptop, Briefcase, Heart, Rocket, Sparkles]
const VALUE_ICONS = [Target, Sparkles, Users, GraduationCap]

export default function CareersPage() {
  const [department, setDepartment] = useState<Department>('All')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const filteredRoles = useMemo(() => {
    if (department === 'All') return OPEN_ROLES
    return OPEN_ROLES.filter((r) => r.department === department)
  }, [department])

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <CareersSchemas />
      <NavigationBar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-gray-200/80">
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, oklch(0.55 0.22 253 / 0.12), transparent 45%), radial-gradient(circle at 80% 60%, oklch(0.62 0.21 168 / 0.08), transparent 40%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 pt-20 pb-14 md:pt-28 md:pb-20 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary mb-8">
            <Briefcase className="w-4 h-4" aria-hidden />
            Careers at Imtehan
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-bold tracking-tight text-gray-900 leading-[1.1] mb-6 text-balance">
            Help students prepare
            <span className="block text-primary mt-1">with confidence</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10 text-pretty">
            We are building Pakistan&apos;s most trusted platform for competitive exam preparation.
            Join a focused team where your work directly shapes how aspirants study for CSS, PPSC, MDCAT, and beyond.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#open-roles">
              <Button size="lg" className="h-12 px-8 shadow-sm">
                View open positions
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <Link href={applicationHref()}>
              <Button size="lg" variant="outline" className="h-12 px-8 bg-white">
                General application
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 pb-14 md:pb-16">
          <div className="grid grid-cols-3 divide-x divide-gray-200 rounded-2xl border border-gray-200/80 bg-white shadow-sm overflow-hidden">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-4 py-6 md:py-7 text-center">
                <p className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
                <p className="text-xs md:text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-20 border-b border-gray-200/60 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <SectionLabel>Our mission</SectionLabel>
          <p className="text-xl md:text-2xl font-medium text-gray-900 leading-relaxed text-balance">
            Imtehan exists to give every competitive exam aspirant access to rigorous practice,
            clear explanations, and tools that turn preparation into measurable progress — regardless of background or location.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12 md:mb-14">
            <SectionLabel>Culture</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              How we work
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We are a small, high-trust team building long-term infrastructure for exam preparation — with the discipline students expect from the content they study.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {VALUES.map((v, i) => {
              const Icon = VALUE_ICONS[i]
              return (
                <div
                  key={v.title}
                  className="bg-white rounded-2xl border border-gray-200/80 p-6 md:p-7 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-primary" aria-hidden />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 tracking-tight">{v.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{v.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 bg-white border-y border-gray-200/60">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <SectionLabel>Benefits</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              Why join Imtehan
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We offer competitive compensation, meaningful ownership, and an environment built for focused, high-quality work.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {BENEFITS.map((b, i) => {
              const Icon = BENEFIT_ICONS[i]
              return (
                <div
                  key={b.label}
                  className="flex items-start gap-4 p-5 md:p-6 rounded-2xl bg-[#F9FAFB] border border-gray-200/80"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center shrink-0 shadow-sm">
                    <Icon className="w-5 h-5 text-primary" aria-hidden />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{b.label}</p>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{b.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section id="open-roles" className="py-16 md:py-24 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="mb-10 md:mb-12">
            <SectionLabel>Open roles</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              Current openings
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {OPEN_ROLES.length} positions across engineering, content, design, growth, and operations.
              Each role is remote within Pakistan.
            </p>
          </div>

          <div
            className="flex flex-wrap gap-2 mb-8"
            role="tablist"
            aria-label="Filter by department"
          >
            {DEPARTMENTS.map((d) => (
              <button
                key={d}
                type="button"
                role="tab"
                aria-selected={department === d}
                onClick={() => {
                  setDepartment(d)
                  setExpandedId(null)
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  department === d
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-primary/30 hover:text-primary'
                }`}
              >
                {d}
                {d !== 'All' && (
                  <span className="ml-1.5 opacity-70">
                    ({OPEN_ROLES.filter((r) => r.department === d).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-500 mb-5">
            Showing {filteredRoles.length} {filteredRoles.length === 1 ? 'position' : 'positions'}
            {department !== 'All' ? ` in ${department}` : ''}
          </p>

          <div className="space-y-3">
            {filteredRoles.length === 0 ? (
              <div className="text-center py-16 px-6 rounded-2xl border border-dashed border-gray-200 bg-white">
                <p className="text-gray-600 mb-4">No openings in this department at the moment.</p>
                <Link href={applicationHref()}>
                  <Button variant="outline">Submit a general application</Button>
                </Link>
              </div>
            ) : (
              filteredRoles.map((role) => (
                <RoleCard
                  key={role.id}
                  role={role}
                  expanded={expandedId === role.id}
                  onToggle={() =>
                    setExpandedId((prev) => (prev === role.id ? null : role.id))
                  }
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Hiring process */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-200/60">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
            <SectionLabel>Hiring</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              Our process
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Structured, respectful of your time, and transparent at every stage — typically one to two weeks from application to offer.
            </p>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {HIRING_STEPS.map((s) => (
              <li key={s.step} className="relative text-center list-none">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary text-primary-foreground text-sm font-bold mb-4 ring-4 ring-primary/10">
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5 text-sm md:text-base">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed px-1">{s.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 border-t border-gray-200/60">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-3">
            {HIRING_FAQ.map((item, index) => {
              const isOpen = openFaq === index
              return (
                <div
                  key={item.question}
                  className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left font-medium text-gray-900 hover:bg-gray-50/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                  >
                    {item.question}
                    <span
                      className={`text-primary text-xl leading-none transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-200 ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm md:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-14 md:px-14 md:py-16 text-center shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(255,255,255,0.08),transparent_50%)]" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 border border-white/10 mb-6">
                <CheckCircle2 className="w-7 h-7 text-white" aria-hidden />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                Ready to apply?
              </h2>
              <p className="text-slate-300 text-lg max-w-lg mx-auto mb-8 leading-relaxed">
                Submit your details online or email{' '}
                <a
                  href={`mailto:${CAREERS_EMAIL}`}
                  className="text-white font-medium underline underline-offset-4 hover:text-white/90"
                >
                  {CAREERS_EMAIL}
                </a>
                . We review every application carefully.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href={applicationHref()}>
                  <Button size="lg" className="h-12 px-8 bg-white text-slate-900 hover:bg-white/95">
                    Apply online
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-8 border-white/25 text-white hover:bg-white/10 hover:text-white bg-transparent"
                  >
                    About Imtehan
                  </Button>
                </Link>
              </div>
              <p className="mt-8 text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Imtehan is an equal opportunity employer. We welcome applicants from all backgrounds
                and do not discriminate on the basis of gender, ethnicity, religion, or disability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
