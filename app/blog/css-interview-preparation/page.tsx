import type { Metadata } from 'next'
import { ArticleSchema } from '@/components/seo/StructuredData'
import BlogPostShell from '@/components/blog/BlogPostShell'
import { extractHeadings, renderBlogContent } from '@/components/blog/blog-utils'
import type { RelatedPost } from '@/components/blog/blog-utils'

export const metadata: Metadata = {
  title: 'CSS Viva Voce: What the Interview Actually Tests | Imtehan',
  description: 'The CSS viva is not a knowledge test. It is a character and composure test. Most candidates prepare for the wrong thing.',
  alternates: { canonical: 'https://imtehan.com/blog/css-interview-preparation' },
  openGraph: {
    title: 'CSS Interview Preparation',
    description: 'What the CSS viva actually tests and how to prepare.',
    url: 'https://imtehan.com/blog/css-interview-preparation',
    type: 'article',
    publishedTime: '2025-02-18T00:00:00Z',
  },
}

const RELATED: RelatedPost[] = [
  { slug: 'how-to-crack-css-first-attempt',   title: 'How to Crack CSS in First Attempt',     date: 'Feb 14, 2025', category: 'Strategy' },
  { slug: 'css-exam-preparation-guide-2025',  title: 'CSS Exam Preparation Guide 2025',       date: 'Jan 2, 2025',  category: 'Guide'    },
  { slug: 'css-optional-subjects-guide',      title: 'How to Choose CSS Optional Subjects',   date: 'Feb 15, 2025', category: 'Guide'    },
  { slug: 'current-affairs-css-how-to-prepare', title: 'Current Affairs for CSS',             date: 'Feb 12, 2025', category: 'Strategy' },
]

const TAGS = ['CSS Interview', 'Viva Voce', 'FPSC', 'Interview Tips']

const CONTENT = `The CSS viva voce is the final stage of the selection process, and it is evaluated very differently from the written exam. The written papers test what you know. The interview tests who you are: your composure under pressure, your ability to reason out loud, and whether you can hold a position when challenged. Preparing for it the same way you prepared for the written exam will not work.

## What the Panel Is Looking For

FPSC interview panels are experienced civil servants. They have heard every rehearsed answer about your reasons for joining the CSS and your vision for Pakistan. These answers land flatly. What they remember is how a candidate handles a question they do not know the answer to, or how they respond when a panelist directly challenges something they have said.

Composure is the primary quality being assessed. A candidate who says calmly "I am not certain about that, but my understanding is..." scores better than one who stumbles, over-explains, or becomes visibly rattled. Honesty about the limits of your knowledge is a strength in an interview context. It signals self-awareness, exactly what a senior civil servant needs to demonstrate.

## Preparing Your Positions

You will be asked about current issues, Pakistan's foreign policy, economic challenges, and governance problems. These are not questions with single correct answers. The panel wants to see that you can reason about complex situations, not that you have memorized a position.

Prepare by reading Dawn editorials and forming your own views on five or six major ongoing issues. Not for the purpose of reciting those views, but so that when asked, you have genuinely thought through the question. Candidates who have actually formed opinions are noticeably different from those reciting what they think the panel wants to hear.

> Panels can tell within two minutes whether a candidate is thinking or recalling. The ones who think out loud, even imperfectly, make a stronger impression.

## Your Optional Subjects

Expect questions on your optional subjects. This is where many candidates are caught off guard after spending months on compulsories. The panel may ask you to explain a key concept, discuss a contemporary application, or defend a position within your optional subject's framework.

Review the core themes of your optional subjects before the interview, not to memorize facts, but to be able to speak about them conversationally. The standard being applied is: does this person actually know their subject, or did they just study for an exam?

## The Practical Preparation

Mock interviews with someone who will genuinely challenge you are far more valuable than solo preparation. If you know someone who has cleared CSS or has interviewing experience, ask them. If not, practice answering questions out loud, alone, and time yourself. The physical experience of speaking your reasoning under a time constraint is very different from thinking it through quietly.

Your presentation, how you dress, how you sit, how you speak, matters proportionally less than candidates assume, but it matters. Dress conservatively and professionally. Speak at a measured pace. The substance of what you say will determine the outcome.`

export default function BlogPost() {
  const headings = extractHeadings(CONTENT)
  return (
    <>
      <ArticleSchema
        title="CSS Interview Preparation"
        description="What the CSS viva actually tests, and how to prepare for it."
        content={CONTENT}
        publishDate="2025-02-18"
        url="https://imtehan.com/blog/css-interview-preparation"
      />
      <BlogPostShell
        title="CSS Viva Voce: What the Interview Actually Tests"
        subtitle="The written exam tests knowledge. The viva tests composure, reasoning, and self-awareness. Most candidates prepare for the wrong thing."
        author="Imtehan Team"
        date="February 18, 2025"
        readTime="5 min read"
        category="Strategy"
        tags={TAGS}
        slug="css-interview-preparation"
        headings={headings}
        otherPosts={RELATED}
      >
        {renderBlogContent(CONTENT)}
      </BlogPostShell>
    </>
  )
}
