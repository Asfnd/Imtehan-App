import { NextRequest, NextResponse } from 'next/server'
import { createAdminSupabaseClient } from '@/lib/supabase/admin'
import { getRoleById, GENERAL_APPLICATION } from '@/lib/careers-data'
import { rateLimit, getClientIP, RATE_LIMITS } from '@/lib/security/rateLimiter'
import { csrfProtection } from '@/lib/security/csrf'
import {
  isValidEmail,
  isValidUrl,
  validateName,
  validateMessage,
  detectSuspiciousPatterns,
  sanitizeText,
} from '@/lib/security/input-validation'

const MAX_RESUME_BYTES = 5 * 1024 * 1024
const ALLOWED_RESUME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimit(`careers:${clientIP}`, RATE_LIMITS.CAREERS)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many applications. Please try again in a minute.' },
        { status: 429 }
      )
    }

    const csrfError = csrfProtection(request)
    if (csrfError) return csrfError

    const form = await request.formData()

    const website = form.get('website')
    if (website && typeof website === 'string' && website.trim() !== '') {
      return NextResponse.json({ error: 'Spam detected' }, { status: 403 })
    }

    const fullName = form.get('fullName')
    const email = form.get('email')
    const phone = form.get('phone')
    const linkedinUrl = form.get('linkedinUrl')
    const portfolioUrl = form.get('portfolioUrl')
    const coverNote = form.get('coverNote')
    const roleId = form.get('roleId')
    const resume = form.get('resume')

    if (
      typeof fullName !== 'string' ||
      typeof email !== 'string' ||
      typeof coverNote !== 'string'
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const nameValidation = validateName(fullName)
    if (!nameValidation.valid) {
      return NextResponse.json({ error: nameValidation.error }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const noteValidation = validateMessage(coverNote, { minLength: 40, maxLength: 8000 })
    if (!noteValidation.valid) {
      return NextResponse.json({ error: noteValidation.error }, { status: 400 })
    }

    const suspicious = detectSuspiciousPatterns(coverNote)
    if (suspicious.length > 0) {
      return NextResponse.json({ error: 'Application contains invalid content' }, { status: 400 })
    }

    const roleIdStr = typeof roleId === 'string' ? roleId.trim() : ''
    const role = getRoleById(roleIdStr || null)
    const roleTitle =
      role?.title ??
      (roleIdStr === GENERAL_APPLICATION.id || !roleIdStr
        ? GENERAL_APPLICATION.title
        : 'Unknown role')

    if (roleIdStr && roleIdStr !== GENERAL_APPLICATION.id && !role) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    const phoneStr =
      typeof phone === 'string' && phone.trim() ? sanitizeText(phone, 32) : null
    const linkedinStr =
      typeof linkedinUrl === 'string' && linkedinUrl.trim() ? linkedinUrl.trim() : null
    const portfolioStr =
      typeof portfolioUrl === 'string' && portfolioUrl.trim() ? portfolioUrl.trim() : null

    if (linkedinStr && !isValidUrl(linkedinStr)) {
      return NextResponse.json({ error: 'Invalid LinkedIn URL' }, { status: 400 })
    }
    if (portfolioStr && !isValidUrl(portfolioStr)) {
      return NextResponse.json({ error: 'Invalid portfolio URL' }, { status: 400 })
    }

    let resumePath: string | null = null

    if (resume instanceof File && resume.size > 0) {
      if (resume.size > MAX_RESUME_BYTES) {
        return NextResponse.json({ error: 'Resume must be 5 MB or smaller' }, { status: 400 })
      }
      if (!ALLOWED_RESUME_TYPES.has(resume.type)) {
        return NextResponse.json(
          { error: 'Resume must be PDF or Word document' },
          { status: 400 }
        )
      }

      const ext =
        resume.type === 'application/pdf'
          ? 'pdf'
          : resume.type === 'application/msword'
            ? 'doc'
            : 'docx'
      const objectPath = `${Date.now()}-${crypto.randomUUID()}.${ext}`

      const supabase = createAdminSupabaseClient()
      const buffer = Buffer.from(await resume.arrayBuffer())
      const { error: uploadError } = await supabase.storage
        .from('career-resumes')
        .upload(objectPath, buffer, { contentType: resume.type, upsert: false })

      if (uploadError) {
        console.error('Resume upload failed:', uploadError.message)
        return NextResponse.json({ error: 'Failed to upload resume' }, { status: 500 })
      }
      resumePath = objectPath
    }

    const supabase = createAdminSupabaseClient()
    const { data, error } = await supabase
      .from('career_applications')
      .insert({
        role_id: role?.id ?? (roleIdStr === GENERAL_APPLICATION.id ? null : roleIdStr || null),
        role_title: roleTitle,
        full_name: nameValidation.sanitized || fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phoneStr,
        linkedin_url: linkedinStr,
        portfolio_url: portfolioStr,
        cover_note: noteValidation.sanitized || coverNote.trim(),
        resume_path: resumePath,
      })
      .select('id')
      .single()

    if (error) {
      console.error('career_applications insert:', error.message)
      return NextResponse.json({ error: 'Failed to save application' }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Application submitted successfully',
      id: data.id,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    if (message.includes('SUPABASE_SERVICE_ROLE_KEY')) {
      return NextResponse.json(
        { error: 'Applications are not configured on this server yet' },
        { status: 503 }
      )
    }
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
