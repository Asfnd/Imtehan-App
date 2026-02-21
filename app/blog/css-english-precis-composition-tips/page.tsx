import type { Metadata } from 'next'
import { ArticleSchema } from '@/components/seo/StructuredData'
import BlogPostShell from '@/components/blog/BlogPostShell'
import { extractHeadings, renderBlogContent } from '@/components/blog/blog-utils'
import type { RelatedPost } from '@/components/blog/blog-utils'

export const metadata: Metadata = {
  title: 'CSS Précis Writing: The Skill Nobody Teaches You Properly | Imtehan',
  description: 'Précis is the most mechanical skill in CSS English — and the most neglected. Here is how to develop it in six weeks.',
  alternates: { canonical: 'https://imtehan.com/blog/css-english-precis-composition-tips' },
  openGraph: {
    title: 'CSS Précis and Composition Tips',
    description: 'How to develop précis writing in six weeks.',
    url: 'https://imtehan.com/blog/css-english-precis-composition-tips',
    type: 'article',
    publishedTime: '2025-02-17T00:00:00Z',
  },
}

const RELATED: RelatedPost[] = [
  { slug: 'css-english-essay-preparation',       title: 'CSS Essay Writing: The Framework',        date: 'Feb 13, 2025', category: 'Writing'  },
  { slug: 'css-english-essay-structure-examples', title: 'CSS English Essay Structure',             date: 'Feb 16, 2025', category: 'Writing'  },
  { slug: 'how-to-crack-css-first-attempt',       title: 'How to Crack CSS in First Attempt',       date: 'Feb 14, 2025', category: 'Strategy' },
  { slug: 'css-exam-preparation-guide-2025',      title: 'CSS Exam Preparation Guide 2025',         date: 'Jan 2, 2025',  category: 'Guide'    },
]

const TAGS = ['Précis Writing', 'CSS English', 'Composition', 'Writing Skills']

const CONTENT = `Précis writing is the most learnable skill in the entire CSS exam. Unlike essays, which require original argument and wide knowledge, précis asks for one thing: compression without distortion. You read a passage, identify its central meaning, and write it back at one third the length. That is the whole task. Most candidates score poorly not because they lack the ability but because they never practice the specific discipline the skill requires.

## What Précis Is Actually Asking

A précis is not a summary and not a paraphrase. A summary captures the main points loosely. A paraphrase rephrases sentence by sentence. A précis compresses the essential meaning of a passage — its argument, not just its content — into a fraction of the original length, using your own words throughout.

The most common failure mode is including too much. Candidates treat the précis as an exercise in coverage — trying to include every point the original passage makes. But many passages contain illustrative examples, tangential observations, and rhetorical elaboration that are not part of the core argument. Identifying what to leave out is the central skill.

## The Three-Step Process

Read the passage once for overall meaning. Do not take notes. Just read to understand what the passage is fundamentally saying.

Read it a second time and mark the sentences that carry the argument — the claims and conclusions — separate from the sentences that illustrate or elaborate. In most passages this reduces the content by half immediately.

Write your précis using only the marked material, in your own words, at the required length. If the target length is one third of the original, count the words in the original first and write to that number.

> A good précis leaves out everything the reader did not need to know the argument. Not everything they did not need to enjoy the passage.

## Building the Skill in Six Weeks

Précis cannot be studied — it can only be practiced. The minimum effective practice is two précis exercises per week from the start of your preparation. Not at the end, not in the final month. From the beginning.

Use newspaper editorials and Dawn opinion columns as source material. They are the right length, the right complexity, and closely aligned with the kind of passages CSS uses. After writing each précis, compare your version to the original:

- Did you preserve the main argument intact?
- Did you use the original's words, or your own?
- Is your version within five percent of the target length?

These three questions reveal exactly where your précis technique is weak. Most candidates fail on the second — they borrow too many phrases from the original, which is penalized heavily in CSS marking.

## The Composition Component

The composition section tests sentence construction, grammar, and the ability to write clearly in formal English. Unlike essay and précis, composition marks are largely determined by accuracy — grammar, punctuation, and word choice.

The most efficient preparation is reading well-written English daily. Dawn editorials, quality long-form journalism, formal correspondence — any source where the English is precise and considered. Absorbing correct written English over months makes composition answers feel natural by exam time.`

export default function BlogPost() {
  const headings = extractHeadings(CONTENT)
  return (
    <>
      <ArticleSchema
        title="CSS Précis and Composition Tips"
        description="How to develop précis writing skill in six weeks."
        content={CONTENT}
        publishDate="2025-02-17"
        url="https://imtehan.com/blog/css-english-precis-composition-tips"
      />
      <BlogPostShell
        title="CSS Précis Writing: The Skill Nobody Teaches You Properly"
        subtitle="Précis is the most mechanical skill in CSS English — and the most neglected. Two exercises a week from the start is all it takes."
        author="Imtehan Team"
        date="February 17, 2025"
        readTime="5 min read"
        category="Writing Guide"
        tags={TAGS}
        slug="css-english-precis-composition-tips"
        headings={headings}
        otherPosts={RELATED}
      >
        {renderBlogContent(CONTENT)}
      </BlogPostShell>
    </>
  )
}
