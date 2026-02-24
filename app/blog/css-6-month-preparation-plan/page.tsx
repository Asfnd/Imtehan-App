import type { Metadata } from 'next'
import { ArticleSchema } from '@/components/seo/StructuredData'
import BlogPostShell from '@/components/blog/BlogPostShell'
import { extractHeadings, renderBlogContent } from '@/components/blog/blog-utils'
import type { RelatedPost } from '@/components/blog/blog-utils'

export const metadata: Metadata = {
  title: 'CSS Preparation in 6 Months: A Realistic Week-by-Week Plan | Imtehan',
  description: 'Six months is not generous time for CSS — it is the minimum. Here is exactly how to use every week without wasting the first two months on the wrong things.',
  alternates: { canonical: 'https://imtehan.com/blog/css-6-month-preparation-plan' },
  openGraph: {
    title: 'CSS Preparation in 6 Months: A Realistic Week-by-Week Plan',
    description: 'The month-by-month CSS preparation plan that works — what to cover, when to start mocks, and how to handle the final weeks.',
    url: 'https://imtehan.com/blog/css-6-month-preparation-plan',
    type: 'article',
    publishedTime: '2026-02-24T00:00:00Z',
  },
}

const RELATED: RelatedPost[] = [
  { slug: 'css-exam-preparation-guide-2025',    title: 'Complete CSS Exam Preparation Guide 2025',     date: 'Jan 2, 2025',  category: 'Guide'    },
  { slug: 'css-optional-subjects-guide',        title: 'CSS Optional Subjects: Choose Smart',          date: 'Dec 21, 2024', category: 'Subject Guide' },
  { slug: 'how-to-crack-css-first-attempt',     title: 'How to Crack CSS in First Attempt',           date: 'Feb 14, 2025', category: 'Strategy' },
]

const TAGS = ['CSS 2026', 'CSS Study Plan', '6 Month Plan', 'CSS Preparation', 'FPSC', 'Civil Service Pakistan']

const CONTENT = `Six months is not generous time for CSS. It is the minimum. Candidates who have twelve months available use ten of them. Candidates who have six months available tend to waste the first two, panic in month four, and arrive at the exam either underprepared or exhausted.

The plan below assumes six months of real, consistent preparation — not six months on the calendar. It is a rough structure. The specific books and MCQ sets you use matter less than the sequence and the daily habit.

## Before Month One: Choose Subjects First

Do not start studying until you have finalised your optional subjects. This sounds obvious. Most candidates spend the first four to six weeks reading broadly, switching between optional choices, and losing time.

The CSS examination includes six compulsory subjects and six optional subjects across two groups. The compulsory subjects are fixed. The optional selection is where candidates lose the most preparation time through indecision.

The practical rule for optional selection: choose subjects you have background in, that have high marks-per-effort ratios, and whose past paper question types suit how you write. History, Political Science, Economics, and Sociology are perennial choices not because they are easy but because they are predictable and the material is learnable within six months if your writing foundation is in place.

Do not choose three new-to-you subjects. Choose at most one subject you are learning from scratch alongside two or three where you have existing familiarity.

## Month One and Two: Compulsory Subjects and Foundation

The first two months should be overwhelmingly weighted toward compulsory subjects — English Essay, English Précis and Composition, Pakistan Affairs, Islamic Studies, Current Affairs, and General Knowledge.

The logic: compulsory subjects are non-negotiable. You cannot bank on optional subjects compensating for weak compulsory scores. Solid compulsory performance creates a floor that optionals build on.

**English specifically** — essay structure, précis technique, and grammar — requires the most lead time. You cannot build writing skills in weeks. Start writing one full essay and one précis per week from day one. Get feedback if possible. Review past CSS English papers to understand what the marking standard looks like.

**Daily reading habit** — Dawn editorial and national pages, forty focused minutes, two-column notes — starts here and does not stop.

## Month Three and Four: Optional Subjects

By month three, your compulsory subject foundation should be solid enough that you can maintain it with two to three sessions per week while building your optional subjects.

This is the knowledge-building phase for optionals. Cover the syllabus topic by topic. Use the read-then-MCQ loop: study a topic, then immediately solve MCQs on that topic before moving on. Do not cover an entire optional subject before testing yourself on any of it.

One full essay or analytical paragraph on each optional subject topic per week. Not to polish your writing — to force yourself to organise and reproduce the material from memory. Writing from memory reveals gaps that reading hides.

At the end of month four, you should have covered the full syllabus for both compulsory and optional subjects at least once, with active testing throughout.

## Month Five: First Mock Tests and Gap Identification

Month five is when most candidates realise how different exam performance is from preparation performance. This realisation is valuable. It is why mock tests should start in month five — not month six.

**Two full mock tests per week**, ideally timed to simulate the actual CSS exam day format. After each test:
- Score every section individually — not just overall.
- List every question you got wrong by topic, not by subject.
- Identify the three topics where your wrong-answer rate is highest. These become next week's focused revision targets.

The mock test is not a measurement tool at this stage. It is a diagnostic. What it tells you about your gaps is more valuable than the score itself.

> The most important number in month five is not your mock score. It is the list of topics where you keep getting things wrong. That list is your preparation plan for month six.

## Month Six: Compression and Performance

Month six has one goal: convert knowledge into exam performance under conditions. New topics end here. This month is about retrieving what you have already built.

**Weeks one and two:** Intensive revision of the weak topics identified in mock testing. MCQs only — no new reading. The goal is retrieval and reinforcement, not learning.

**Weeks three and four:** Full-paper mock tests three times per week. Essay practice every three days. Review only wrong answers after each test — not the full paper.

**Final ten days:** No new MCQs. Review your personal error list — the specific questions and topics you have gotten wrong repeatedly. Read previous essays you have written and note what you would improve. Sleep properly. The preparation is done. Protect it.

## The One Thing Most Six-Month Plans Get Wrong

They spend months one and two on optional subjects and leave compulsory subjects for the end. This is backwards. English and Pakistan Affairs done poorly can fail a strong optional performance. English and Pakistan Affairs done well create a safe floor that even a moderate optional showing can build on.

Compulsory subjects first. Then optionals. Then mocks and compression. In that sequence, six months is genuinely enough.`

export default function BlogPost() {
  const headings = extractHeadings(CONTENT)
  return (
    <>
      <ArticleSchema
        title="CSS Preparation in 6 Months: A Realistic Week-by-Week Plan"
        description="A practical month-by-month CSS preparation plan — what to cover when, how to use mock tests, and the sequence most plans get wrong."
        content={CONTENT}
        publishDate="2026-02-24"
        url="https://imtehan.com/blog/css-6-month-preparation-plan"
      />
      <BlogPostShell
        title="CSS Preparation in 6 Months: What a Realistic Plan Actually Looks Like"
        subtitle="Six months is not generous time for CSS — it is the minimum. Here is how to use every week of it without wasting the first two months on the wrong things."
        author="Imtehan Team"
        date="February 24, 2026"
        readTime="8 min read"
        category="Guide"
        tags={TAGS}
        slug="css-6-month-preparation-plan"
        headings={headings}
        otherPosts={RELATED}
      >
        {renderBlogContent(CONTENT)}
      </BlogPostShell>
    </>
  )
}
