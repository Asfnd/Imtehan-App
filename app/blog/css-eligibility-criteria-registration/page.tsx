import type { Metadata } from 'next'
import { ArticleSchema } from '@/components/seo/StructuredData'
import BlogPostShell from '@/components/blog/BlogPostShell'
import { extractHeadings, renderBlogContent } from '@/components/blog/blog-utils'
import type { RelatedPost } from '@/components/blog/blog-utils'

export const metadata: Metadata = {
  title: 'CSS Eligibility and Registration: What You Need to Know Before You Apply | Imtehan',
  description: 'Age limits, degree requirements, attempt limits, and the registration process. Everything you need confirmed before committing to CSS preparation.',
  alternates: { canonical: 'https://imtehan.com/blog/css-eligibility-criteria-registration' },
  openGraph: {
    title: 'CSS Eligibility and Registration',
    description: 'Everything you need to know about CSS eligibility and registration.',
    url: 'https://imtehan.com/blog/css-eligibility-criteria-registration',
    type: 'article',
    publishedTime: '2025-02-01T00:00:00Z',
  },
}

const RELATED: RelatedPost[] = [
  { slug: 'css-exam-preparation-guide-2025',  title: 'CSS Exam Preparation Guide 2025',     date: 'Jan 2, 2025',  category: 'Guide'    },
  { slug: 'how-to-crack-css-first-attempt',   title: 'How to Crack CSS in First Attempt',   date: 'Feb 14, 2025', category: 'Strategy' },
  { slug: 'css-optional-subjects-guide',      title: 'How to Choose CSS Optional Subjects', date: 'Feb 15, 2025', category: 'Guide'    },
  { slug: 'css-compulsory-subjects-overview', title: 'CSS Compulsory Subjects Overview',    date: 'Feb 10, 2025', category: 'Guide'    },
]

const TAGS = ['CSS Eligibility', 'Registration', 'FPSC', 'Age Limit', 'Requirements']

const CONTENT = `Before beginning CSS preparation, it is worth confirming that you actually meet the eligibility requirements, not because the criteria are obscure, but because candidates occasionally discover a constraint mid-preparation that affects their planning. Age limits, degree requirements, and domicile rules are the three areas where confusion most commonly arises.

## Age and Attempt Limits

The CSS age limit is 21 to 30 years for most candidates. Provincial and federal employees have modified limits under certain service rules. The FPSC periodically revises these limits, and it is worth checking the current notification on the FPSC website rather than relying on secondhand information.

Each year you sit the exam counts as one attempt. There is a maximum number of attempts permitted, though this has also been subject to revision. The practical implication is that candidates who are near the upper age limit or their final permitted attempt need to treat each sitting with full preparation seriousness rather than treating early attempts as low-stakes practice.

## Degree Requirements

A recognized bachelor's degree of at least second division is the minimum educational qualification. The degree must be from a university recognized by the Higher Education Commission of Pakistan. Candidates in their final year of study at the time of application may apply, but must provide their degree certificate before the viva voce stage.

For candidates with foreign degrees, HEC equivalence certification is required. Processing this can take several weeks, so it should be obtained well before the application deadline.

> Confirming your eligibility takes one afternoon. Discovering an issue after six months of preparation costs far more.

## The Registration Process

FPSC announces the CSS examination schedule and opens online registration through its official website. The registration window is limited, typically a few weeks, and the FPSC does not accept late applications. Missing the registration deadline means waiting another year.

Required at registration: CNIC, domicile certificate, educational qualification documents, and subject selection. The subject selection at registration is important: choosing your optional subjects early forces the commitment that is actually beneficial for preparation.

## Domicile and Province Allocation

CSS candidates are allocated to provinces based on their domicile. This affects the allocation of positions but not the examination itself. All candidates sit the same papers regardless of province. Confirming your domicile is accurate and up to date before registration avoids complications later in the process.

Once registered and confirmed eligible, the administrative side of CSS requires no further attention until the exam itself. All preparation energy can go toward the subjects. That is how it should be: eligibility is a prerequisite, not an ongoing concern.`

export default function BlogPost() {
  const headings = extractHeadings(CONTENT)
  return (
    <>
      <ArticleSchema
        title="CSS Eligibility and Registration"
        description="Everything you need to know about CSS eligibility criteria and registration."
        content={CONTENT}
        publishDate="2025-02-01"
        url="https://imtehan.com/blog/css-eligibility-criteria-registration"
      />
      <BlogPostShell
        title="CSS Eligibility and Registration: What You Need to Know Before You Apply"
        subtitle="Age limits, attempt limits, degree requirements, and the registration window. Confirm all of this before you start preparing."
        author="Imtehan Team"
        date="February 1, 2025"
        readTime="4 min read"
        category="Guide"
        tags={TAGS}
        slug="css-eligibility-criteria-registration"
        headings={headings}
        otherPosts={RELATED}
      >
        {renderBlogContent(CONTENT)}
      </BlogPostShell>
    </>
  )
}
