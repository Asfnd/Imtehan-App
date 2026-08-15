import type { Metadata } from 'next'
import { ArticleSchema } from '@/components/seo/StructuredData'
import BlogPostShell from '@/components/blog/BlogPostShell'
import { extractHeadings, renderBlogContent } from '@/components/blog/blog-utils'
import type { RelatedPost } from '@/components/blog/blog-utils'

export const metadata: Metadata = {
  title: 'Islamic Studies for CSS: What the Exam Actually Tests',
  description: 'CSS Islamic Studies rewards conceptual understanding over memorization. Here is how to prepare it the right way.',
  alternates: { canonical: 'https://imtehan.com/blog/islamic-studies-css-complete-syllabus' },
  openGraph: {
    title: 'Islamic Studies for CSS',
    description: 'How to prepare Islamic Studies conceptually for CSS.',
    url: 'https://imtehan.com/blog/islamic-studies-css-complete-syllabus',
    type: 'article',
    publishedTime: '2025-02-06T00:00:00Z',
  },
}

const RELATED: RelatedPost[] = [
  { slug: 'pillars-of-islam', title: 'Five Pillars notes', date: 'Notes', category: 'Notes', href: '/notes/css-written/islamic-studies/pillars-of-islam' },
  { slug: 'css-compulsory-subjects-overview',   title: 'CSS Compulsory Subjects Overview',     date: 'Feb 10, 2025', category: 'Guide'    },
  { slug: 'pakistan-affairs-important-facts-by-year', title: 'Pakistan Affairs: Key Timeline', date: 'Feb 5, 2025',  category: 'Guide'    },
  { slug: 'css-exam-preparation-guide-2025',    title: 'CSS Exam Preparation Guide 2025',      date: 'Jan 2, 2025',  category: 'Guide'    },
]

const TAGS = ['Islamic Studies', 'CSS Compulsory', 'Syllabus', 'Preparation']

const CONTENT = `Islamic Studies is one of the compulsory subjects most candidates either over-prepare or under-prepare. Those who over-prepare spend months memorizing Hadith chains and classical jurisprudential debates that the CSS exam rarely tests in detail. Those who under-prepare assume their existing religious education is sufficient and are surprised by the conceptual and contemporary dimensions of the paper. The right preparation occupies a different space entirely.

## What CSS Tests in Islamic Studies

The CSS Islamic Studies paper focuses on three areas. First, the foundational framework: the pillars of Islam, the Quran and Sunnah as sources of guidance, the basic biographical timeline of the Prophet, and the early caliphate period. This is the factual foundation every candidate needs.

Second, and more critically for CSS, it tests the application of Islamic principles to governance, society, and Pakistan's constitutional identity. Questions about the Objectives Resolution, the role of Islam in Pakistan's constitutional framework, and the relationship between Islamic jurisprudence and modern law appear regularly. These questions cannot be answered by quoting Hadith; they require understanding of how Islamic principles have been interpreted and applied in the context of a modern state.

Third, contemporary Islamic world affairs (the Organisation of Islamic Cooperation, major Muslim-majority countries' governance structures, and recent developments affecting Muslim communities globally) form a smaller but consistent part of the paper.

## The Conceptual Preparation Approach

Prepare Islamic Studies the same way you would prepare an analytical subject, not a religious one. For each major topic (the role of Shura, the concept of Ijma, the principles of Islamic economics) build a conceptual understanding: what does the principle mean, where does it come from, and how has it been applied or debated in Pakistan's context?

This is more work than memorization, but it serves you far better. A CSS question asking you to discuss how Islamic principles inform Pakistan's constitutional structure requires synthesis, not recall.

> Candidates who understand Islamic concepts can answer questions about applications they have never specifically studied. Candidates who only memorize facts cannot.

## The Overlap With Pakistan Affairs

A significant portion of Islamic Studies content overlaps with Pakistan Affairs. The Objectives Resolution. The Council of Islamic Ideology. The Islamization policies of the 1970s and 1980s. The role of religious political parties. These topics are central to both subjects.

Prepare them together. Read the Objectives Resolution as a constitutional document and understand both its religious and political significance. Study the Council of Islamic Ideology's mandate and some of its notable recommendations. Understand the Hudood Ordinances in their historical context. This preparation serves both subjects and reduces total study time significantly.

The candidates who score well in Islamic Studies are not necessarily more religious. They are more analytically prepared: they understand the subject as a system of principles with historical and contemporary applications, not as a body of text to be memorized.`

export default function BlogPost() {
  const headings = extractHeadings(CONTENT)
  return (
    <>
      <ArticleSchema
        title="Islamic Studies for CSS"
        description="How to prepare Islamic Studies conceptually for the CSS exam."
        content={CONTENT}
        publishDate="2025-02-06"
        url="https://imtehan.com/blog/islamic-studies-css-complete-syllabus"
      />
      <BlogPostShell
        title="Islamic Studies for CSS: What the Exam Actually Tests"
        subtitle="CSS Islamic Studies rewards conceptual understanding over memorization. Most candidates prepare the wrong way and are surprised by the paper."
        author="Imtehan Team"
        date="February 6, 2025"
        readTime="5 min read"
        category="Guide"
        tags={TAGS}
        slug="islamic-studies-css-complete-syllabus"
        headings={headings}
        otherPosts={RELATED}
      >
        {renderBlogContent(CONTENT)}
      </BlogPostShell>
    </>
  )
}
