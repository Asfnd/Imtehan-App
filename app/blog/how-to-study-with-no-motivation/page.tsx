import type { Metadata } from 'next'
import { ArticleSchema } from '@/components/seo/StructuredData'
import BlogPostShell from '@/components/blog/BlogPostShell'
import { extractHeadings, renderBlogContent } from '@/components/blog/blog-utils'
import type { RelatedPost } from '@/components/blog/blog-utils'

export const metadata: Metadata = {
  title: 'How to Study When You Have Zero Motivation',
  description: 'Motivation disappears during every long exam preparation. The candidates who make it through are not the most motivated. They are the ones who stopped waiting for it.',
  alternates: { canonical: 'https://imtehan.com/blog/how-to-study-with-no-motivation' },
  openGraph: {
    title: 'How to Study When You Have Zero Motivation',
    description: 'Motivation is not reliable. Here is how to keep preparing through the weeks when it completely disappears.',
    url: 'https://imtehan.com/blog/how-to-study-with-no-motivation',
    type: 'article',
    publishedTime: '2026-02-24T00:00:00Z',
  },
}

const RELATED: RelatedPost[] = [
  { slug: 'how-to-crack-css-first-attempt',     title: 'How to Crack CSS in First Attempt',      date: 'Feb 14, 2025', category: 'Strategy' },
  { slug: 'forgetting-curve-spaced-repetition', title: 'Why You Forget Everything You Study',    date: 'Feb 24, 2026', category: 'Strategy' },
  { slug: 'night-before-exam-strategy',         title: 'What to Do the Night Before Your Exam', date: 'Feb 24, 2026', category: 'Strategy' },
]

const TAGS = ['Motivation', 'Study Habits', 'Consistency', 'CSS', 'MDCAT', 'Mental Game', 'Burnout']

const CONTENT = `There will be stretches of your preparation where you sit down to study and feel nothing. No urgency, no interest in the material, no sense that it is going anywhere. You open the book, an hour passes where you stared at words without absorbing a single one. You close it feeling worse than before.

This is not a personal failure. It is the predictable middle phase of every long preparation journey, and almost every student experiences it, usually somewhere between months two and four. The candidates who come out the other side are not the ones who had more motivation. They are the ones who stopped waiting for it to return before acting.

## The Motivation Myth

Motivation is the feeling that makes starting easy. It is not what sustains long-term preparation. Waiting for motivation before you study is the same as waiting to feel like exercising before you work out: the feeling rarely arrives first. Action comes first. The feeling sometimes follows.

Every CSS officer and MDCAT top scorer you could speak to had weeks where opening a book felt impossible. They kept going not because they felt inspired but because they had built a system that did not require inspiration to operate. The system ran on habit and environment, not on how they felt that day.

## The Minimum Viable Session

When motivation is absent, the goal is not a productive three-hour session. The goal is simply showing up.

The minimum viable session looks like this: sit down in your study spot, open the material, solve fifteen MCQs. That is it. If you want to stop after fifteen questions, stop. You maintained the chain. That is the entire win for that day.

This matters because of something every experienced student discovers: starting is the hardest part. Once you have been working for ten minutes, continuing becomes significantly easier. The motivation that was completely absent when you sat down often arrives ten minutes into the session.

Do not wait for it. Let it catch up after you have already started.

> Discipline is deciding what your future self needs and acting on that, even when your present self does not want to. It is not a personality trait. It is a practice.

## Redesign Your Environment, Not Your Willpower

If you keep losing study sessions to your phone, the problem is not a lack of willpower. Willpower is a limited, depletable resource, and it runs out faster when you are already unmotivated.

The solution is not trying harder. It is making distraction harder to access. Put the phone in another room. Delete the most consuming apps temporarily. Use a website blocker during your designated study hours. These are not hacks or tricks. They are the same approach that professional writers, athletes, and researchers use because relying on willpower alone is structurally unsound.

Your environment shapes your behaviour more reliably than your intentions. Arrange it deliberately.

## The Invisible Progress Problem

Motivation often disappears when progress becomes invisible, which it always does after the first month or two. You cannot feel yourself knowing more than you did. The chapters do not look different. The mock test scores move slowly.

The progress is real. It is just not visible. And invisible progress does not fuel motivation.

This is why tracking matters, even in a minimal form. A simple tally of MCQs solved this week, marked on a physical calendar or notebook, creates visible evidence of progress where your brain would otherwise see nothing. The mark on Wednesday tells you that you showed up Tuesday, Monday, and Sunday. That chain has real motivational weight, separate from how you feel about the material.

You are not tracking to compete with anyone. You are tracking to make your own progress tangible to yourself.

## What to Do After a Lost Week

If you have lost an entire week (it happens to almost everyone at least once in a long preparation cycle), do not attempt to recover by tripling your workload the following week. That approach almost always leads to another crash within days.

Return at the normal pace instead. One normal day of sessions resets the psychology far more effectively than a punishing catch-up schedule that reinforces the feeling that studying is suffering.

The calendar does not care about last week. It only measures what you do from today.

## The One Honest Thing Nobody Tells You

Some days during exam preparation will feel genuinely terrible. You will study for four hours and feel like you learned nothing. You will take a mock test and score lower than you did three weeks ago. You will question whether any of this is working.

On those days, the goal is not excellence. The goal is continuation. A bad study session is infinitely more valuable than no study session. The student who shows up badly for six months consistently will almost always outperform the student who studied brilliantly for two months and then faded.

Long preparation is not about your best days. It is about your worst ones.`

export default function BlogPost() {
  const headings = extractHeadings(CONTENT)
  return (
    <>
      <ArticleSchema
        title="How to Study When You Have Zero Motivation"
        description="How to maintain exam preparation through the weeks when motivation completely disappears."
        content={CONTENT}
        publishDate="2026-02-24"
        url="https://imtehan.com/blog/how-to-study-with-no-motivation"
      />
      <BlogPostShell
        title="How to Study When You Have Absolutely Zero Motivation"
        subtitle="Motivation is not reliable and it will disappear. Here is how to keep moving when it does, which it will, multiple times."
        author="Imtehan Team"
        date="February 24, 2026"
        readTime="6 min read"
        category="Strategy"
        tags={TAGS}
        slug="how-to-study-with-no-motivation"
        headings={headings}
        otherPosts={RELATED}
      >
        {renderBlogContent(CONTENT)}
      </BlogPostShell>
    </>
  )
}
