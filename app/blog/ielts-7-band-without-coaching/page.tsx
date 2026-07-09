import type { Metadata } from 'next'
import { ArticleSchema } from '@/components/seo/StructuredData'
import BlogPostShell from '@/components/blog/BlogPostShell'
import { extractHeadings, renderBlogContent } from '@/components/blog/blog-utils'
import type { RelatedPost } from '@/components/blog/blog-utils'

export const metadata: Metadata = {
  title: 'How to Score 7 Bands in IELTS Without Coaching',
  description: 'A module-by-module breakdown of what IELTS actually tests and how to score 7+ bands through self-study, without spending Rs. 50,000 on a coaching centre.',
  alternates: { canonical: 'https://imtehan.com/blog/ielts-7-band-without-coaching' },
  openGraph: {
    title: 'How to Score 7 Bands in IELTS Without Coaching',
    description: 'IELTS is a skills test, not a knowledge test. Once you understand what each module measures, self-preparation becomes entirely realistic.',
    url: 'https://imtehan.com/blog/ielts-7-band-without-coaching',
    type: 'article',
    publishedTime: '2026-02-24T00:00:00Z',
  },
}

const RELATED: RelatedPost[] = [
  { slug: '80-20-english-grammar-guide',         title: 'The 80/20 of English Grammar for Exams',    date: 'Feb 21, 2025', category: 'Strategy'      },
  { slug: 'css-english-essay-preparation',       title: 'CSS Essay Writing: A Framework That Works', date: 'Dec 25, 2024', category: 'Writing Guide'  },
  { slug: 'forgetting-curve-spaced-repetition',  title: 'Why You Forget Everything You Study',       date: 'Feb 24, 2026', category: 'Strategy'      },
]

const TAGS = ['IELTS', 'Study Abroad', 'English', '7 Bands', 'Self-Study', 'Writing', 'Speaking']

const CONTENT = `Every year, tens of thousands of Pakistanis sit the IELTS for university admissions, immigration, or professional registration. And every year, a significant number of them walk out disappointed, not because the test was too hard but because they prepared for the wrong things.

Coaching centres charge Rs. 40,000 to Rs. 70,000 for preparation courses. Some are genuinely useful. Many are not. The core material they teach is freely available, and the most important preparation, the part that actually moves your band score, you have to do yourself regardless.

## What the IELTS Is Actually Measuring

The IELTS is a proficiency test, not a knowledge test. It does not test whether you know a specific syllabus. It tests four skills: Reading, Listening, Writing, and Speaking. Each module measures how well you handle real English communication tasks.

This matters because many candidates prepare as if for a knowledge exam: memorising vocabulary lists, copying grammar rules. These things help at the margin but they are not the bottleneck. Skill is the bottleneck, and skill comes from practice, not memorisation.

## Reading: Strategy Beats Vocabulary

Most IELTS Academic candidates run out of time in the Reading section. Not because they are slow readers, but because they read the entire passage before looking at the questions.

Do not do this. Read the questions first. Then scan the passage for the specific information each question needs. Passages are dense by design; you are not expected to understand every sentence. You are expected to extract specific information efficiently.

Three question types cause the most lost marks and deserve focused practice: **True/False/Not Given**, **Matching Headings**, and **Summary Completion**. True/False/Not Given in particular trips up even strong English speakers because the distinction between "False" (the passage contradicts it) and "Not Given" (the passage simply does not mention it) requires careful discipline under time pressure.

Practice these three types with the official Cambridge IELTS books: Cambridge 14 through 18. Nothing else comes close to the authenticity of the official materials.

## Listening: It Only Plays Once

The audio in IELTS Listening plays exactly once. No replays. This means your preparation and note-taking habits before and during the section matter as much as your raw comprehension.

Before each section starts, you get time to read the questions. Use every second of it. Predict the form of the answer. Is it a number? A name? A date? A place? When you know what you are listening for, your brain filters the audio automatically and the answer almost jumps out.

Accent variety is deliberate. The test uses British, Australian, American, and Canadian speakers in the same paper. If you have only practised with one accent, you will lose marks on the others. Diversify your listening practice early: podcasts, audiobooks, and documentaries with varied speakers are better preparation than IELTS-format recordings alone.

## Writing: Task 2 Is Worth More

Task 2 (the essay) is worth twice the marks of Task 1. Most candidates divide their time roughly equally between the two. This is a significant strategic error.

A sensible allocation: 20 minutes on Task 1, 40 minutes on Task 2. If time management is difficult for you, attempt Task 2 first while your energy is highest.

The four marking criteria for Writing are weighted equally: Task Achievement, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy. The most silently lost marks come from Task Achievement: candidates who write technically correct English that does not actually address the question. Examiners give zero extra credit for impressive vocabulary used to avoid engaging with the question directly.

> Examiners do not reward complex vocabulary. They reward vocabulary used accurately and appropriately. A simpler word used correctly consistently outscores a complex word used awkwardly.

## Speaking: The Examiner Is Following a Script

The Speaking test feels the most intimidating but is also the most controllable section. The examiner is not trying to catch you out. They are following a structured format designed to give you multiple opportunities to demonstrate your English.

The two habits that most damage Speaking scores: one-sentence answers in Part 1, and silence in Part 2. Part 1 questions expect natural, slightly extended answers: three or four sentences is appropriate. Part 2 requires you to speak for two full minutes on a topic card. Practise this until two minutes feels short rather than long.

Do not memorise scripted answers to predicted questions. Examiners are specifically trained to identify rehearsed responses and the effect on your band score is negative. Speak naturally, even imperfectly.

## A Realistic 10-Week Self-Study Plan

- **Weeks 1-2:** One full diagnostic test (Cambridge 14 or 15). Identify your weakest module. This is your priority.
- **Weeks 3-6:** Focused skills practice. One Writing Task 2 per week with self-review against official criteria. Daily listening (30 minutes). Reading practice with question-type focus.
- **Weeks 7-9:** Two full timed tests per week. Review only wrong answers, categorised by question type.
- **Week 10:** No new material. Review your own error patterns from the past nine weeks. Rest well.

Six weeks of this, consistently, is enough to move most candidates up by half a band. Ten weeks with genuine daily practice is enough to build a solid 7 for most people with an intermediate English background.

The test is available monthly at British Council and IDP centres across Pakistan. Book your slot before you start preparing. Having a fixed exam date changes how seriously you take the preparation timeline.`

export default function BlogPost() {
  const headings = extractHeadings(CONTENT)
  return (
    <>
      <ArticleSchema
        title="How to Score 7 Bands in IELTS Without Coaching"
        description="A practical module-by-module guide to achieving IELTS 7+ through self-study."
        content={CONTENT}
        publishDate="2026-02-24"
        url="https://imtehan.com/blog/ielts-7-band-without-coaching"
      />
      <BlogPostShell
        title="How to Score 7 Bands in IELTS Without Spending Rs. 50,000 on Coaching"
        subtitle="IELTS is a skills test, not a knowledge test. Once you understand what each module actually measures, self-preparation becomes entirely realistic."
        author="Imtehan Team"
        date="February 24, 2026"
        readTime="7 min read"
        category="IELTS"
        tags={TAGS}
        slug="ielts-7-band-without-coaching"
        headings={headings}
        otherPosts={RELATED}
      >
        {renderBlogContent(CONTENT)}
      </BlogPostShell>
    </>
  )
}
