import type { Metadata } from 'next'
import { ArticleSchema } from '@/components/seo/StructuredData'
import BlogPostShell from '@/components/blog/BlogPostShell'
import { extractHeadings, renderBlogContent } from '@/components/blog/blog-utils'
import type { RelatedPost } from '@/components/blog/blog-utils'

export const metadata: Metadata = {
  title: 'CSS Essay Writing: The Framework That Gets High Marks | Imtehan',
  description: 'Most CSS essays fail not because of weak writing but because of weak thinking. Here is the argument-first framework that examiners reward.',
  alternates: { canonical: 'https://imtehan.com/blog/css-english-essay-preparation' },
  openGraph: {
    title: 'CSS Essay Writing: The Framework That Gets High Marks',
    description: 'The argument-first framework that CSS examiners reward.',
    url: 'https://imtehan.com/blog/css-english-essay-preparation',
    type: 'article',
    publishedTime: '2025-02-13T00:00:00Z',
  },
}

const RELATED: RelatedPost[] = [
  { slug: 'css-english-essay-structure-examples', title: 'CSS Essay Structure with Examples',       date: 'Jan 3, 2026',  category: 'Writing'  },
  { slug: 'how-to-crack-css-first-attempt',       title: 'How to Crack CSS in First Attempt',      date: 'Feb 14, 2025', category: 'Strategy' },
  { slug: 'time-management-css-exam',             title: 'Time Management During the CSS Exam',    date: 'Feb 9, 2025',  category: 'Strategy' },
  { slug: 'css-exam-preparation-guide-2025',      title: 'CSS Exam Preparation Guide 2025',        date: 'Jan 2, 2025',  category: 'Guide'    },
]

const TAGS = ['Essay Writing', 'CSS English', 'Writing Framework', 'Civil Services']

const CONTENT = `CSS essays are marked on thinking, not grammar. Most candidates lose marks not because their sentences are weak but because their argument is weak, or absent entirely. An examiner reading two hundred essays on the same prompt can tell within the first paragraph whether the candidate has an actual position or is simply listing facts in sequence.

## What Examiners Are Actually Scoring

The breakdown is roughly this: forty percent for clarity of argument, thirty percent for structure and flow, twenty percent for evidence and examples, ten percent for writing quality. Most candidates invert these priorities. They polish sentences and neglect the central claim.

A perfectly written paragraph that says nothing memorable scores lower than a slightly rough paragraph with a clear, defensible argument. This is the fundamental shift in mindset that separates average essays from high-scoring ones.

## The Argument-First Framework

Before writing a single sentence, answer three questions on paper:

What is the essay really asking? Not the surface question, but the underlying tension or debate. A prompt about technology and education is really asking whether the benefits outweigh the risks given specific conditions.

What is my single answer to that question? Not a list. One clear claim. "Technology improves learning outcomes only when teachers are adequately trained to use it."

What three pieces of evidence best support that claim? One strong example. One counter-consideration you address. One implication for Pakistan specifically.

Write nothing until you have answered all three. This planning stage, ten minutes at most, is what keeps an essay coherent from beginning to end.

> A well-written essay without an argument is a list with punctuation. The argument is everything.

## The Structure That Carries the Argument

Once you have your three answers, structure follows naturally. Open with context and your claim, two sentences maximum. The examiner should know your position before the end of the first paragraph.

Each body paragraph proves one part of your argument. Topic sentence first, then evidence, then connection back to your central claim. End with a conclusion that restates what the evidence showed, not a summary of what you wrote, but a conclusion from it.

Avoid the temptation to show everything you know. A focused essay covering three points deeply scores higher than an exhaustive essay covering seven points shallowly. Examiners reward precision.

Practice this framework weekly on current affairs topics, not by writing perfect essays, but by practicing the three-question planning stage until it becomes fast and automatic. The writing itself improves through repetition. The thinking improves through deliberate planning.`

export default function BlogPost() {
  const headings = extractHeadings(CONTENT)
  return (
    <>
      <ArticleSchema
        title="CSS Essay Writing: The Framework That Gets High Marks"
        description="Argument-first essay framework for CSS English."
        content={CONTENT}
        publishDate="2025-02-13"
        url="https://imtehan.com/blog/css-english-essay-preparation"
      />
      <BlogPostShell
        title="CSS Essay Writing: The Framework That Gets High Marks"
        subtitle="Examiners score thinking first, writing second. Here is the argument-first framework that changes how you approach every essay prompt."
        author="Imtehan Team"
        date="February 13, 2025"
        readTime="5 min read"
        category="Writing Guide"
        tags={TAGS}
        slug="css-english-essay-preparation"
        headings={headings}
        otherPosts={RELATED}
      >
        {renderBlogContent(CONTENT)}
      </BlogPostShell>
    </>
  )
}
