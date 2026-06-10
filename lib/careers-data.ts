export type Department = 'All' | 'Engineering' | 'Content' | 'Design' | 'Growth' | 'Operations'

export interface Role {
  id: string
  title: string
  department: Exclude<Department, 'All'>
  location: string
  type: string
  summary: string
  responsibilities: string[]
  requirements: string[]
}

export const DEPARTMENTS: Department[] = [
  'All',
  'Engineering',
  'Content',
  'Design',
  'Growth',
  'Operations',
]

export const OPEN_ROLES: Role[] = [
  {
    id: 'full-stack-engineer',
    title: 'Full Stack Engineer',
    department: 'Engineering',
    location: 'Remote · Pakistan',
    type: 'Full-time',
    summary:
      'Own end-to-end delivery of product features used daily by students preparing for competitive exams across Pakistan.',
    responsibilities: [
      'Design, build, and ship features in Next.js, TypeScript, and Supabase',
      'Improve quiz performance, caching, and platform reliability at scale',
      'Partner with design and content teams on specs and implementation',
      'Participate in code reviews and uphold engineering quality standards',
    ],
    requirements: [
      '2+ years of professional experience with React/Next.js and TypeScript',
      'Working knowledge of PostgreSQL or Supabase',
      'Track record of owning features from concept to production',
      'Edtech, payments, or analytics experience is a plus',
    ],
  },
  {
    id: 'mcq-content-developer',
    title: 'MCQ Content Developer',
    department: 'Content',
    location: 'Remote · Pakistan',
    type: 'Full-time · Contract',
    summary:
      'Produce syllabus-aligned MCQs and explanations for CSS, PPSC, FPSC, MDCAT, and other high-stakes examinations.',
    responsibilities: [
      'Author and peer-review MCQs with accurate, pedagogically sound explanations',
      'Align content to official syllabi and established past-paper patterns',
      'Calibrate difficulty and maintain editorial quality standards',
      'Collaborate with subject-matter experts on specialized topics',
    ],
    requirements: [
      'Deep expertise in at least one exam domain (CSS, PPSC, MDCAT, etc.)',
      'Excellent written English and meticulous attention to detail',
      'Familiarity with competitive exam formats in Pakistan',
      'Teaching, coaching, or editorial experience preferred',
    ],
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote · Pakistan',
    type: 'Full-time',
    summary:
      'Shape focused, accessible study experiences (from practice flows to results) that help students build confidence under exam pressure.',
    responsibilities: [
      'Own UX for practice, analytics, premium, and onboarding journeys',
      'Deliver high-fidelity designs in Figma consistent with the Imtehan brand',
      'Conduct lightweight research with students and educators',
      'Work closely with engineering to ship accessible, responsive interfaces',
    ],
    requirements: [
      'Portfolio demonstrating web or mobile product design',
      'Strong fundamentals in typography, layout, and interaction design',
      'Experience with complex, data-rich or learning products',
      'Familiarity with design systems or Tailwind-based implementation',
    ],
  },
  {
    id: 'growth-marketing',
    title: 'Growth Marketing Lead',
    department: 'Growth',
    location: 'Remote · Pakistan',
    type: 'Full-time',
    summary:
      'Drive sustainable student acquisition through content, partnerships, and experiments grounded in real exam-prep needs.',
    responsibilities: [
      'Plan and execute channel experiments with clear success metrics',
      'Partner on SEO, social, and community initiatives',
      'Analyze funnel performance and iterate on acquisition loops',
      'Build relationships with academies, educators, and creators',
    ],
    requirements: [
      '3+ years in growth, content, or performance marketing',
      'Strong writing and understanding of Pakistani student audiences',
      'Proficiency with analytics and structured experimentation',
      'Edtech or consumer product experience preferred',
    ],
  },
  {
    id: 'customer-success',
    title: 'Customer Success Specialist',
    department: 'Operations',
    location: 'Remote · Pakistan',
    type: 'Full-time · Part-time',
    summary:
      'Deliver responsive, empathetic support that helps students succeed, and channel their feedback into product improvements.',
    responsibilities: [
      'Respond to inquiries via WhatsApp, email, and in-app channels',
      'Guide users through premium activation and platform features',
      'Document recurring issues and surface insights to the product team',
      'Maintain a professional, helpful tone during high-volume periods',
    ],
    requirements: [
      'Excellent written communication in English (Urdu is a plus)',
      'Patient, student-centered approach to support',
      'Comfort with basic troubleshooting and documentation',
      'Familiarity with CSS or competitive exams strongly preferred',
    ],
  },
]

export const VALUES = [
  {
    title: 'Mission-first',
    description:
      'We measure success by student outcomes: every decision should make preparation more effective, not just ship faster.',
  },
  {
    title: 'Rigorous quality',
    description:
      'From MCQ accuracy to interface polish, we hold a high bar because students stake their futures on our platform.',
  },
  {
    title: 'Student empathy',
    description:
      'We design for real constraints: limited time, exam pressure, and the diversity of preparation journeys across Pakistan.',
  },
  {
    title: 'Clear ownership',
    description:
      'Small team, direct accountability, async-friendly collaboration: we value thoughtful execution over process for its own sake.',
  },
]

export const BENEFITS = [
  { label: 'Remote-first', detail: 'Work from anywhere in Pakistan' },
  { label: 'Flexible schedule', detail: 'Outcome-focused, async collaboration' },
  { label: 'Competitive pay', detail: 'Market-aligned compensation for your role' },
  { label: 'Meaningful impact', detail: 'Products used by exam aspirants nationwide' },
  { label: 'Early influence', detail: 'Shape direction on a growing platform' },
  { label: 'Learning support', detail: 'Budget for courses, books, and conferences' },
]

export const HIRING_STEPS = [
  { step: '01', title: 'Application', detail: 'Submit your CV, portfolio, and a brief note on fit' },
  { step: '02', title: 'Introductory call', detail: '30-minute conversation with the hiring manager' },
  { step: '03', title: 'Skills assessment', detail: 'Role-specific exercise or portfolio review' },
  { step: '04', title: 'Team interview', detail: 'Meet colleagues you would collaborate with' },
  { step: '05', title: 'Offer', detail: 'Clear terms, start date, and structured onboarding' },
]

export const HIRING_FAQ = [
  {
    question: 'Do you hire outside Pakistan?',
    answer:
      'Our roles are remote within Pakistan. We prioritize candidates who understand the local exam landscape and can collaborate effectively in PKT-friendly hours.',
  },
  {
    question: 'What should I include in my application?',
    answer:
      'Send your CV, relevant work samples (portfolio, writing samples, or GitHub), and a short paragraph on why Imtehan and the specific role interest you.',
  },
  {
    question: 'How long does the process take?',
    answer:
      'Most candidates complete the full process in one to two weeks. We communicate timelines clearly at each stage.',
  },
  {
    question: 'Can I apply if there is no matching open role?',
    answer:
      'Yes. Use the general application form on our careers page, or email careers@imtehan.com with your CV and a brief note. We review exceptional candidates on a rolling basis.',
  },
]

export const CAREERS_EMAIL = 'careers@imtehan.com'

export const GENERAL_APPLICATION = {
  id: 'general',
  title: 'General application',
} as const

export function getRoleById(roleId: string | null | undefined): Role | null {
  if (!roleId || roleId === GENERAL_APPLICATION.id) return null
  return OPEN_ROLES.find((r) => r.id === roleId) ?? null
}

export function applicationHref(roleId?: string | null): string {
  if (!roleId || roleId === GENERAL_APPLICATION.id) return '/careers/apply'
  return `/careers/apply?role=${encodeURIComponent(roleId)}`
}

export function generalApplicationMailto() {
  const subject = encodeURIComponent('General application: Imtehan')
  const body = encodeURIComponent(
    'Dear Imtehan team,\n\nI would like to be considered for future opportunities.\n\nRole of interest:\n\nLinkedIn / portfolio:\n\nRelevant experience:\n\nWhy Imtehan:\n\n'
  )
  return `mailto:${CAREERS_EMAIL}?subject=${subject}&body=${body}`
}

export function roleApplicationMailto(role: Role) {
  const subject = encodeURIComponent(`Application: ${role.title}`)
  const body = encodeURIComponent(
    `Dear Imtehan team,\n\nI am applying for the ${role.title} position.\n\nLinkedIn / portfolio:\n\nRelevant experience:\n\nWhy this role and Imtehan:\n\n`
  )
  return `mailto:${CAREERS_EMAIL}?subject=${subject}&body=${body}`
}
