import type { Metadata } from 'next'
import { ArticleSchema } from '@/components/seo/StructuredData'
import BlogPostShell from '@/components/blog/BlogPostShell'
import { extractHeadings, renderBlogContent } from '@/components/blog/blog-utils'
import type { RelatedPost } from '@/components/blog/blog-utils'

export const metadata: Metadata = {
  title: 'CSS Compulsory Subjects: What You Are Actually Dealing With',
  description: 'Seven compulsory subjects, each with its own logic. Here is an honest look at what each one demands and where most candidates go wrong.',
  alternates: { canonical: 'https://imtehan.com/blog/css-compulsory-subjects-overview' },
  openGraph: {
    title: 'CSS Compulsory Subjects Overview',
    description: 'What each compulsory subject actually demands from you.',
    url: 'https://imtehan.com/blog/css-compulsory-subjects-overview',
    type: 'article',
    publishedTime: '2025-02-10T00:00:00Z',
  },
}

const RELATED: RelatedPost[] = [
  { slug: 'css-written-notes', title: 'CSS Written notes', date: 'Notes', category: 'Notes', href: '/notes/css-written' },
  { slug: 'css-optional-subjects-guide',        title: 'How to Choose CSS Optional Subjects',   date: 'Feb 15, 2025', category: 'Guide'    },
  { slug: 'current-affairs-css-how-to-prepare', title: 'Current Affairs for CSS',               date: 'Feb 12, 2025', category: 'Strategy' },
  { slug: 'css-exam-preparation-guide-2025',    title: 'CSS Exam Preparation Guide 2025',       date: 'Jan 2, 2025',  category: 'Guide'    },
]

const TAGS = ['Compulsory Subjects', 'CSS Syllabus', 'Pakistan Affairs', 'Islamic Studies', 'Preparation']

const CONTENT = `Seven compulsory subjects sit between every CSS candidate and the written exam. They cover Pakistan Affairs, Current Affairs, Islamic Studies, General Knowledge, Everyday Science, English Essay, and English Précis. Together they account for the majority of marks, and together they represent the most demanding breadth of content in the exam. Understanding what each one actually requires, not just what it covers, is the first step to preparing for any of them properly.

## The High-Stakes Three

Pakistan Affairs, Islamic Studies, and Current Affairs deserve the most preparation time because they are conceptually connected and frequently tested together in essay questions. Pakistan Affairs rewards candidates who understand the country's political and constitutional history as an evolving story rather than isolated facts. Islamic Studies rewards understanding of core principles and their application to modern governance, not memorization of Hadith without context. Current Affairs rewards the candidate who reads analytically, not the one who reads the most.

These three subjects share content constantly. A question about parliamentary democracy connects Pakistan Affairs and Islamic Studies. A question about water policy connects Current Affairs and Pakistan Affairs. Preparing them together, not separately, is far more efficient.

## General Knowledge and Everyday Science

These two subjects are where candidates underinvest. They feel manageable because the content seems familiar, but the MCQ questions are specific enough to punish shallow preparation. General Knowledge covers international organizations, geography, science milestones, and world history. Everyday Science tests conceptual understanding of physics, chemistry, biology, and environmental topics at a level that rewards reasoning over memorization.

> Most candidates treat General Knowledge as background reading. Candidates who score well treat it as a subject.

## English: Essay and Précis

The English component has two distinct papers. The essay paper rewards the argument-first approach: a clear claim, organized evidence, and a conclusion that follows from the analysis. The précis paper rewards the ability to compress a passage to its essential meaning without distortion.

Both papers reward regular practice over content knowledge. You cannot study your way to a good précis score. You can only write your way there. Set aside two précis exercises per week from the beginning of your preparation. By exam time, the compression skill becomes automatic.

The compulsory subjects as a whole reward consistent daily preparation more than intensive periodic bursts. An hour per day across all seven subjects, sustained for six months, produces knowledge that is genuinely retrievable under exam pressure. That is the standard to work towards.`

export default function BlogPost() {
  const headings = extractHeadings(CONTENT)
  return (
    <>
      <ArticleSchema
        title="CSS Compulsory Subjects Overview"
        description="An honest look at what each compulsory subject demands."
        content={CONTENT}
        publishDate="2025-02-10"
        url="https://imtehan.com/blog/css-compulsory-subjects-overview"
      />
      <BlogPostShell
        title="CSS Compulsory Subjects: What You Are Actually Dealing With"
        subtitle="Seven subjects, each with its own logic. An honest look at what each one demands and where most candidates underestimate the work."
        author="Imtehan Team"
        date="February 10, 2025"
        readTime="5 min read"
        category="Guide"
        tags={TAGS}
        slug="css-compulsory-subjects-overview"
        headings={headings}
        otherPosts={RELATED}
      >
        {renderBlogContent(CONTENT)}
      </BlogPostShell>
    </>
  )
}
