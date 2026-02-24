import type { Metadata } from 'next'
import { ArticleSchema } from '@/components/seo/StructuredData'
import BlogPostShell from '@/components/blog/BlogPostShell'
import { extractHeadings, renderBlogContent } from '@/components/blog/blog-utils'
import type { RelatedPost } from '@/components/blog/blog-utils'

export const metadata: Metadata = {
  title: 'What to Do the Night Before Your Exam (And What to Avoid) | Imtehan',
  description: 'The night before the CSS, MDCAT, or PPSC exam has one job: protect your preparation. Here is the exact routine that keeps six months of study intact.',
  alternates: { canonical: 'https://imtehan.com/blog/night-before-exam-strategy' },
  openGraph: {
    title: 'What to Do the Night Before Your Exam (And What to Avoid)',
    description: 'Six months of preparation can unravel in one bad night. Here is the routine that protects it.',
    url: 'https://imtehan.com/blog/night-before-exam-strategy',
    type: 'article',
    publishedTime: '2026-02-24T00:00:00Z',
  },
}

const RELATED: RelatedPost[] = [
  { slug: 'how-to-crack-css-first-attempt',      title: 'How to Crack CSS in First Attempt',              date: 'Feb 14, 2025', category: 'Strategy' },
  { slug: 'css-time-management-3-hour-mcq-exam', title: 'CSS MCQ Exam: Managing Three Hours',             date: 'Feb 19, 2025', category: 'Strategy' },
  { slug: 'css-mock-test-strategy',              title: 'CSS Mock Tests: How to Use Them Properly',       date: 'Feb 8, 2025',  category: 'Practice' },
]

const TAGS = ['Exam Day', 'Pre-Exam Routine', 'CSS', 'MDCAT', 'PPSC', 'Mental Game']

const CONTENT = `The exam is tomorrow. Most candidates at this point are in one of two states: frantically cramming new material, or completely frozen by anxiety and doing nothing at all. Neither is the right approach.

The night before the exam has exactly one job: consolidate what you already know and put you in the best possible mental state to access it under pressure. That job does not include learning anything new.

## The Rule: Nothing New After 6 PM

Commit to this completely. No new topics, no new facts, no unfamiliar MCQs. The reason is straightforward: your brain consolidates information into long-term memory during sleep. New information studied in the final hours frequently interferes with established knowledge rather than adding to it.

There is a well-documented phenomenon where cramming a new topic the night before an exam causes that fresh, poorly-encoded material to scramble what you had previously learned well. The new content and the old content compete during consolidation. You wake up less confident in both.

The only exception: a fifteen-minute review of your personal error list — the specific MCQs you consistently got wrong during practice. Not to re-study the topic. Just to remind yourself of the answers you previously struggled with. This is retrieval of known information, not learning of new information.

## What to Actually Do That Evening

Spend the first hour after dinner reviewing your strongest areas. Not your weakest — your strongest. This is counterintuitive but deliberate. Reviewing what you know well builds confidence and primes your brain for active retrieval. You go into the exam room with your mind already producing correct answers, not stuck on gaps.

Then do this: write down five things you feel genuinely solid on. One sentence each. Not a study exercise — an anchoring exercise. When anxiety spikes the following morning, having written confirmation of your own knowledge is a surprisingly effective tool. Read it while you are waiting to enter the hall.

After that, stop studying. Not slow down — stop.

> You cannot study your way to confidence the night before. Confidence comes from preparation already done. The night before is about delivery, not preparation.

## Sleep Is Not Optional — But Anxiety Is Real

You already know you should sleep early. The reason most people cannot is anxiety, not laziness. You lie down and your mind immediately starts cycling through topics, doubts, and worst-case scenarios.

One technique that genuinely works: the brain dump. Before bed, open a blank page and write every exam-related thought currently in your head. Not organised notes. Just a raw list of whatever is spinning — topics you are unsure about, questions you are dreading, logistics you are worried about. Write all of it down.

The act of writing removes it from working memory. Your brain stops trying to hold onto it because it is now on paper. Sleep tends to come much more easily after this.

## Morning of the Exam

Wake up early enough to eat something. Not because of any nutritional performance claim, but because hunger is a variable working against you and you do not need any extra variables on this morning.

Read the five confidence anchors you wrote the night before. Then stop. No newspaper, no MCQs, no last-minute revision.

Get to the venue early. The stress of running late destroys composure that took months to build, in a ten-minute car ride. An extra thirty minutes of buffer is worth more than thirty minutes of additional study.

## What the Exam Actually Tests

The exam does not test what you study the night before. It tests what you built across the months before that. The night before is about delivery — showing up rested, composed, and able to access what you already know.

Protect your sleep. Protect your composure. Then let the preparation speak.`

export default function BlogPost() {
  const headings = extractHeadings(CONTENT)
  return (
    <>
      <ArticleSchema
        title="What to Do the Night Before Your Exam (And What to Avoid)"
        description="The exact routine to protect six months of preparation on the night before your exam."
        content={CONTENT}
        publishDate="2026-02-24"
        url="https://imtehan.com/blog/night-before-exam-strategy"
      />
      <BlogPostShell
        title="What to Do the Night Before Your Exam (And What to Absolutely Avoid)"
        subtitle="Six months of preparation can unravel in twelve hours. Here is how to make sure the last night works for you, not against you."
        author="Imtehan Team"
        date="February 24, 2026"
        readTime="5 min read"
        category="Strategy"
        tags={TAGS}
        slug="night-before-exam-strategy"
        headings={headings}
        otherPosts={RELATED}
      >
        {renderBlogContent(CONTENT)}
      </BlogPostShell>
    </>
  )
}
