import type { Metadata } from 'next'
import { ArticleSchema } from '@/components/seo/StructuredData'
import BlogPostShell from '@/components/blog/BlogPostShell'
import { extractHeadings, renderBlogContent } from '@/components/blog/blog-utils'
import type { RelatedPost } from '@/components/blog/blog-utils'

export const metadata: Metadata = {
  title: 'How to Choose CSS Optional Subjects | Imtehan',
  description: 'Choosing the wrong optional subjects wastes months of preparation. Here is the overlap-first framework that top scorers use.',
  alternates: { canonical: 'https://imtehan.com/blog/css-optional-subjects-guide' },
  openGraph: {
    title: 'How to Choose CSS Optional Subjects',
    description: 'The overlap-first framework for choosing CSS optionals.',
    url: 'https://imtehan.com/blog/css-optional-subjects-guide',
    type: 'article',
    publishedTime: '2025-02-15T00:00:00Z',
  },
}

const RELATED: RelatedPost[] = [
  { slug: 'css-exam-preparation-guide-2025',    title: 'CSS Exam Preparation Guide 2025',          date: 'Jan 2, 2025',  category: 'Guide'    },
  { slug: 'how-to-crack-css-first-attempt',     title: 'How to Crack CSS in First Attempt',        date: 'Feb 14, 2025', category: 'Strategy' },
  { slug: 'css-compulsory-subjects-overview',   title: 'CSS Compulsory Subjects Overview',         date: 'Feb 10, 2025', category: 'Guide'    },
  { slug: 'css-past-papers-analysis-trends',    title: 'What CSS Past Papers Actually Reveal',     date: 'Feb 11, 2025', category: 'Analysis' },
]

const TAGS = ['Optional Subjects', 'CSS Strategy', 'Subject Selection', 'Civil Services']

const CONTENT = `Optional subjects are worth 200 of the 1400 total CSS marks. That is 14 percent of your score — but more importantly, it is the 14 percent where you have the most control. Most candidates underestimate this and pick subjects based on vague interest. Top scorers pick based on overlap.

## Why Overlap Matters More Than Interest

Your compulsory subjects are: Pakistan Affairs, Current Affairs, Islamic Studies, General Knowledge, Everyday Science, English, and Urdu. These consume 25-30 hours of study time weekly. Your optional subjects must fit into whatever remains.

If your optional subjects share significant content with your compulsories, you are essentially studying once for two subjects. History overlaps heavily with Pakistan Affairs — the same events, the same political figures, the same analytical frameworks. Geography overlaps with Current Affairs. Political Science overlaps with Pakistan Affairs and Islamic Studies.

Choose subjects with zero overlap and you are adding two entirely new subject loads to an already full schedule.

## The Combinations That Work

**History + Geography** is the most consistent combination among top scorers. The overlap with compulsories is the highest of any pairing. Resources are abundant. Both are essay-oriented, which matches the CSS writing format. This combination requires the least additional effort relative to compulsory preparation.

**History + Political Science** works well for candidates who prefer conceptual analysis over memorization. Political Science connects directly to Pakistan Affairs and provides strong essay frameworks. The overlap with compulsory Islamic Studies is also notable through political theory and governance concepts.

**Economics + Political Science** is the analytical choice. Both subjects reward systemic thinking over fact recall. The overlap with compulsories is lower, but candidates with an economics background often score higher here than in humanities subjects they are less comfortable with.

> The subject that fits your preparation is not always the subject that sounds most impressive. Pick what amplifies what you already know.

## Making the Decision

Before finalizing, solve 50 practice MCQs from each subject you are considering. This takes four to five hours total. You will immediately feel which subject requires you to rebuild knowledge from scratch versus which one feels like familiar territory.

Once you decide, commit fully. Changing optional subjects after month four of preparation wastes more time than the alternative subject would have gained. The exam rewards deep preparation of the right subjects, not perfect selection of the ideal ones.`

export default function BlogPost() {
  const headings = extractHeadings(CONTENT)
  return (
    <>
      <ArticleSchema
        title="How to Choose CSS Optional Subjects"
        description="The overlap-first framework for optional subject selection."
        content={CONTENT}
        publishDate="2025-02-15"
        url="https://imtehan.com/blog/css-optional-subjects-guide"
      />
      <BlogPostShell
        title="How to Choose CSS Optional Subjects"
        subtitle="Stop picking based on interest. The overlap-first framework is what actually separates high scorers from the rest."
        author="Imtehan Team"
        date="February 15, 2025"
        readTime="5 min read"
        category="Guide"
        tags={TAGS}
        slug="css-optional-subjects-guide"
        headings={headings}
        otherPosts={RELATED}
      >
        {renderBlogContent(CONTENT)}
      </BlogPostShell>
    </>
  )
}
