'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Clock,
  Loader2,
  MapPin,
  Upload,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SectionLabel } from '@/components/careers/SectionLabel'
import { useCSRFToken } from '@/lib/hooks/useCSRFToken'
import { GENERAL_APPLICATION } from '@/lib/careers-data'
import { cn } from '@/lib/utils'

const fieldClass = cn(
  'h-11 w-full rounded-xl border border-gray-200/90 bg-white px-4 text-[15px] text-gray-900',
  'placeholder:text-gray-400 shadow-sm',
  'transition-[border-color,box-shadow] duration-200',
  'focus:border-primary/35 focus:outline-none focus:ring-[3px] focus:ring-primary/10',
  'disabled:cursor-not-allowed disabled:opacity-60'
)

const labelClass = 'mb-2 block text-sm font-medium text-gray-800'

interface ApplicationFormProps {
  roleId: string | null
  roleTitle: string
  roleDepartment?: string
  roleLocation?: string
  roleType?: string
}

export function ApplicationForm({
  roleId,
  roleTitle,
  roleDepartment,
  roleLocation,
  roleType,
}: ApplicationFormProps) {
  const formId = useId()
  const { token, loading: csrfLoading, error: csrfError } = useCSRFToken()
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [showOptional, setShowOptional] = useState(false)

  const isReady = Boolean(token) && !csrfLoading
  const isSubmitting = status === 'submitting'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!token) {
      setErrorMessage('Please wait a moment, then try again.')
      setStatus('error')
      return
    }

    setStatus('submitting')
    setErrorMessage(null)

    const form = e.currentTarget
    const body = new FormData(form)
    body.set('roleId', roleId ?? GENERAL_APPLICATION.id)

    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'x-csrf-token': token },
        body,
      })
      const data = (await res.json()) as { error?: string }

      if (!res.ok) {
        setErrorMessage(data.error ?? 'Unable to submit. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
      form.reset()
      setFileName(null)
      setShowOptional(false)
    } catch {
      setErrorMessage('Connection error. Check your network and try again.')
      setStatus('error')
    }
  }

  function clearResume() {
    setFileName(null)
    const input = document.getElementById(`${formId}-resume`) as HTMLInputElement | null
    if (input) input.value = ''
  }

  if (status === 'success') {
    return (
      <div
        className="py-12 md:py-20 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/[0.08] text-primary mb-6 ring-1 ring-primary/10">
          <CheckCircle2 className="w-7 h-7" strokeWidth={1.75} aria-hidden />
        </div>
        <h2 className="text-2xl md:text-[1.75rem] font-bold tracking-tight text-gray-900 mb-3">
          Application received
        </h2>
        <p className="text-base text-gray-600 leading-relaxed max-w-md mx-auto mb-10">
          Thank you for applying for{' '}
          <span className="font-medium text-gray-900">{roleTitle}</span>. Our team will
          review your submission and respond if there is a match.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/careers">
            <Button variant="outline" className="h-11 rounded-xl px-6 border-gray-200">
              View open roles
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="h-11 rounded-xl px-6 text-gray-600">
              Back to home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const displayError = errorMessage ?? (status === 'error' ? csrfError : null)

  return (
    <div className="w-full">
      <Link
        href="/careers"
        className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-10"
      >
        <ArrowLeft
          className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
          aria-hidden
        />
        Careers
      </Link>

      <header className="mb-10 md:mb-12">
        <SectionLabel>Application</SectionLabel>
        <h1 className="text-3xl md:text-[2.125rem] font-bold tracking-tight text-gray-900 text-balance leading-tight">
          {roleTitle}
        </h1>

        {(roleDepartment || roleLocation || roleType) && (
          <ul className="flex flex-wrap items-center gap-2 mt-5 list-none p-0 m-0">
            {roleDepartment && (
              <li>
                <span className="inline-flex text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/8 px-2.5 py-1 rounded-md">
                  {roleDepartment}
                </span>
              </li>
            )}
            {roleLocation && (
              <li className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden />
                {roleLocation}
              </li>
            )}
            {roleType && (
              <li className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden />
                {roleType}
              </li>
            )}
          </ul>
        )}

        <p className="mt-5 text-base text-gray-600 leading-relaxed max-w-2xl">
          Complete the form below. A concise note on your experience and motivation is all we need.
        </p>
      </header>

      {displayError && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-8 flex items-start justify-between gap-3 rounded-xl border border-red-200/80 bg-red-50/90 px-4 py-3.5 text-sm text-red-800"
        >
          <span>{displayError}</span>
          <button
            type="button"
            onClick={() => {
              setErrorMessage(null)
              setStatus('idle')
            }}
            className="shrink-0 rounded-md p-0.5 text-red-600 hover:bg-red-100/80 transition-colors"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <form
        id={formId}
        onSubmit={handleSubmit}
        className="relative space-y-10 md:space-y-12"
        noValidate
      >
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="sr-only"
          aria-hidden
        />

        {/* Contact */}
        <section aria-labelledby={`${formId}-contact-heading`}>
          <h2 id={`${formId}-contact-heading`} className="sr-only">
            Contact information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            <FormField label="Full name" htmlFor={`${formId}-name`} required>
              <Input
                id={`${formId}-name`}
                name="fullName"
                required
                autoComplete="name"
                placeholder="Jane Doe"
                className={fieldClass}
                disabled={isSubmitting}
              />
            </FormField>
            <FormField label="Email" htmlFor={`${formId}-email`} required>
              <Input
                id={`${formId}-email`}
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="jane@example.com"
                className={fieldClass}
                disabled={isSubmitting}
              />
            </FormField>
          </div>
        </section>

        {/* Message */}
        <section aria-labelledby={`${formId}-message-heading`}>
          <h2 id={`${formId}-message-heading`} className="sr-only">
            Cover note
          </h2>
          <FormField
            label="Cover note"
            htmlFor={`${formId}-cover`}
            required
            hint="Minimum a few sentences"
          >
            <textarea
              id={`${formId}-cover`}
              name="coverNote"
              required
              rows={6}
              placeholder="Share relevant experience, what draws you to this role, and why Imtehan."
              className={cn(fieldClass, 'min-h-[168px] py-3.5 resize-y leading-relaxed')}
              disabled={isSubmitting}
            />
          </FormField>
        </section>

        {/* Resume */}
        <section aria-labelledby={`${formId}-resume-heading`}>
          <span id={`${formId}-resume-heading`} className={labelClass}>
            Resume
            <span className="font-normal text-gray-400"> · optional</span>
          </span>
          <label
            className={cn(
              'mt-2 flex items-center gap-4 cursor-pointer rounded-xl border border-dashed px-5 py-4 md:py-5 transition-all duration-200',
              fileName
                ? 'border-primary/25 bg-primary/[0.03]'
                : 'border-gray-200/90 bg-gray-50/50 hover:border-gray-300 hover:bg-white'
            )}
          >
            <span
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                fileName ? 'bg-primary/10 text-primary' : 'bg-white text-gray-400 ring-1 ring-gray-200/80'
              )}
            >
              <Upload className="w-4 h-4" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-gray-800 truncate">
                {fileName ?? 'Upload resume'}
              </span>
              <span className="block text-xs text-gray-500 mt-0.5">
                PDF or Word · up to 5 MB
              </span>
            </span>
            {fileName && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  clearResume()
                }}
                className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                aria-label="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <input
              id={`${formId}-resume`}
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="sr-only"
              disabled={isSubmitting}
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            />
          </label>
        </section>

        {/* Optional */}
        <section className="border-t border-gray-100 pt-8 md:pt-10">
          <button
            type="button"
            onClick={() => setShowOptional((v) => !v)}
            className="flex w-full items-center justify-between gap-4 text-left group"
            aria-expanded={showOptional}
            aria-controls={`${formId}-optional-panel`}
          >
            <span>
              <span className="block text-sm font-medium text-gray-800">
                Additional details
              </span>
              <span className="block text-sm text-gray-500 mt-0.5">
                Phone, LinkedIn, or portfolio
              </span>
            </span>
            <ChevronDown
              className={cn(
                'w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200',
                showOptional && 'rotate-180'
              )}
              aria-hidden
            />
          </button>

          <div
            id={`${formId}-optional-panel`}
            className={cn(
              'grid transition-[grid-template-rows] duration-300 ease-out',
              showOptional ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            )}
          >
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 pt-6">
                <FormField label="Phone" htmlFor={`${formId}-phone`}>
                  <Input
                    id={`${formId}-phone`}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+92 300 0000000"
                    className={fieldClass}
                    disabled={isSubmitting}
                  />
                </FormField>
                <FormField label="LinkedIn" htmlFor={`${formId}-linkedin`}>
                  <Input
                    id={`${formId}-linkedin`}
                    name="linkedinUrl"
                    type="url"
                    placeholder="linkedin.com/in/…"
                    className={fieldClass}
                    disabled={isSubmitting}
                  />
                </FormField>
                <FormField label="Portfolio" htmlFor={`${formId}-portfolio`} className="sm:col-span-2 lg:col-span-1">
                  <Input
                    id={`${formId}-portfolio`}
                    name="portfolioUrl"
                    type="url"
                    placeholder="yoursite.com"
                    className={fieldClass}
                    disabled={isSubmitting}
                  />
                </FormField>
              </div>
            </div>
          </div>
        </section>

        {/* Submit */}
        <footer className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-400 leading-relaxed max-w-sm order-2 sm:order-1">
            We use your information only to evaluate this application. By submitting, you confirm
            the details are accurate.
          </p>
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || !isReady}
            className="order-1 sm:order-2 h-12 min-w-[200px] rounded-xl text-[15px] font-medium shadow-sm shrink-0"
          >
            {!isReady && !csrfError ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                Preparing…
              </>
            ) : isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                Submitting…
              </>
            ) : (
              'Submit application'
            )}
          </Button>
        </footer>
      </form>
    </div>
  )
}

function FormField({
  label,
  htmlFor,
  required,
  hint,
  className,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  hint?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('min-w-0', className)}>
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
        {required && (
          <span className="text-primary/80 ml-0.5" aria-hidden>
            *
          </span>
        )}
        {hint && (
          <span className="font-normal text-gray-400 ml-1.5">({hint})</span>
        )}
      </label>
      <div className="mt-0">{children}</div>
    </div>
  )
}
