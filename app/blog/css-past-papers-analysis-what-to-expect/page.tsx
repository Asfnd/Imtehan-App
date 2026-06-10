import type { Metadata } from 'next'
import { ArticleSchema } from '@/components/seo/StructuredData'
import BlogPostShell from '@/components/blog/BlogPostShell'
import { extractHeadings, renderBlogContent } from '@/components/blog/blog-utils'
import type { RelatedPost } from '@/components/blog/blog-utils'

export const metadata: Metadata = {
  title: 'CSS Past Papers: Patterns, Surprises, and What to Expect | Imtehan',
  description: 'Past papers reveal what CSS consistently tests and where candidates are regularly caught off guard. Here is what ten years of papers show.',
  alternates: { canonical: 'https://imtehan.com/blog/css-past-papers-analysis-what-to-expect' },
  openGraph: {
    title: 'CSS Past Papers Analysis',
    description: 'What ten years of CSS past papers reveal about exam patterns.',
    url: 'https://imtehan.com/blog/css-past-papers-analysis-what-to-expect',
    type: 'article',
    publishedTime: '2025-02-02T00:00:00Z',
  },
}

const RELATED: RelatedPost[] = [
  { slug: 'css-past-papers-analysis-trends',    title: 'What CSS Past Papers Actually Reveal',   date: 'Feb 11, 2025', category: 'Analysis' },
  { slug: 'pakistan-affairs-mcqs-top-100-questions', title: 'Pakistan Affairs MCQs',             date: 'Feb 4, 2025',  category: 'MCQ'      },
  { slug: 'css-mock-test-strategy',             title: 'CSS Mock Tests: How to Use Them',        date: 'Feb 8, 2025',  category: 'Strategy' },
  { slug: 'css-exam-preparation-guide-2025',    title: 'CSS Exam Preparation Guide 2025',        date: 'Jan 2, 2025',  category: 'Guide'    },
]

const TAGS = ['Past Papers', 'CSS Analysis', 'Exam Patterns', 'What to Expect']

const CONTENT = `Reading CSS past papers is one of the most productive things a candidate can do early in preparation, not to practice answering questions, but to calibrate expectations. Candidates who have read five or six years of past papers before starting substantive study know what level of depth the exam requires, which topics recur, and which areas the exam has never tested. This calibration shapes better preparation decisions than any syllabus document.

## The Consistent Patterns

Certain topics appear in Pakistan Affairs questions so reliably that candidates who know them well are prepared for a significant portion of the paper before the exam begins. Constitutional history, the sequence of constitutions, the circumstances of their introduction and abrogation, the key provisions of the 1973 constitution, is tested every year in some form. Significant bilateral relationships, particularly with China, the United States, India, and Afghanistan, also appear annually.

Islamic Studies shows similar consistency. Questions about the relationship between Islam and Pakistani governance, the Objectives Resolution, and the major Islamization policies return in different forms across years. The framing changes. Sometimes it is a direct question about the Objectives Resolution, sometimes it is a question about the Council of Islamic Ideology, but the underlying topic is constant.

## Where Candidates Are Caught Off Guard

Everyday Science is the subject where past paper review most frequently reveals an unexpected depth of specificity. Questions about basic physics and chemistry principles, environmental topics, and health and nutrition appear at a level of detail that surprises candidates who assumed the subject required only general familiarity.

General Knowledge question difficulty varies significantly year to year. Some years include straightforward questions about the capitals of major countries and the founding dates of international organizations. Other years include questions about specific UN resolutions, recent Nobel laureates, or the details of recent multilateral agreements. The inconsistency itself is a finding: it means wide preparation is more reliable than targeted preparation for this subject.

> Past papers do not predict the next exam. They reveal the range of what is possible, which is far more useful for preparation than any prediction.

## How to Use This Information

The practical implication is straightforward. For high-consistency subjects like Pakistan Affairs and Islamic Studies, thorough preparation of the recurring topics is high-yield and reliable. For variable subjects like General Knowledge and Everyday Science, broad preparation that avoids deep gaps is more useful than trying to identify specific likely questions.

Reading past papers also calibrates your sense of question difficulty. The questions that seem hardest when you first encounter them, specific dates, named agreements, exact membership of organizations, are precisely the questions that reward the kind of systematic note-making described elsewhere. When you have seen a topic tested three times across different years, you know it warrants careful preparation.`

export default function BlogPost() {
  const headings = extractHeadings(CONTENT)
  return (
    <>
      <ArticleSchema
        title="CSS Past Papers Analysis"
        description="What ten years of CSS past papers reveal about exam patterns."
        content={CONTENT}
        publishDate="2025-02-02"
        url="https://imtehan.com/blog/css-past-papers-analysis-what-to-expect"
      />
      <BlogPostShell
        title="CSS Past Papers: Patterns, Surprises, and What to Expect"
        subtitle="Ten years of past papers reveal which topics CSS always tests, which vary wildly, and where candidates are consistently caught off guard."
        author="Imtehan Team"
        date="February 2, 2025"
        readTime="5 min read"
        category="Analysis"
        tags={TAGS}
        slug="css-past-papers-analysis-what-to-expect"
        headings={headings}
        otherPosts={RELATED}
      >
        {renderBlogContent(CONTENT)}
      </BlogPostShell>
    </>
  )
}
