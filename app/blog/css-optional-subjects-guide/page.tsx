import type { Metadata } from 'next'
import { ArticleSchema } from '@/components/seo/StructuredData'
import BlogPostShell, { extractHeadings } from '@/components/blog/BlogPostShell'
import type { RelatedPost } from '@/components/blog/BlogPostShell'

export const metadata: Metadata = {
  title: 'How to Choose CSS Optional Subjects That Fit Your Strength | Imtehan',
  description: 'Choosing the right optional subjects can make or break your CSS preparation. Learn how top scorers select subjects based on overlap, resources, and personal strength.',
  alternates: {
    canonical: 'https://imtehan.com/blog/css-optional-subjects-guide',
  },
  openGraph: {
    title: 'How to Choose CSS Optional Subjects',
    description: 'Strategic guide to selecting optional subjects that maximize your CSS score.',
    url: 'https://imtehan.com/blog/css-optional-subjects-guide',
    type: 'article',
    publishedTime: '2025-02-15T00:00:00Z',
  },
}

const RELATED_POSTS: RelatedPost[] = [
  { slug: 'css-exam-preparation-guide-2025', title: 'Complete CSS Exam Preparation Guide 2025', date: 'Jan 2, 2025', category: 'Guide' },
  { slug: 'how-to-crack-css-first-attempt', title: 'How to Crack CSS in First Attempt: Insider Tips', date: 'Dec 29, 2024', category: 'Strategy' },
  { slug: 'css-compulsory-subjects-overview', title: 'CSS Compulsory Subjects: Complete Overview & Tips', date: 'Jan 1, 2025', category: 'Subject Guide' },
  { slug: 'css-past-papers-analysis-trends', title: 'CSS Past Papers 2015-2023: Trend Analysis', date: 'Jan 3, 2026', category: 'Analysis' },
]

const TAGS = ['CSS Exam', 'Optional Subjects', 'Subject Selection', 'Preparation Strategy', 'Study Tips']

function renderContent(raw: string) {
  const paragraphs = raw.split('\n\n')
  let isFirstParagraph = true

  return paragraphs.map((block, idx) => {
    const trimmed = block.trim()
    if (!trimmed) return null

    if (trimmed.startsWith('## ')) {
      const text = trimmed.replace(/^## /, '')
      const id   = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return <h2 key={idx} id={id}>{text}</h2>
    }

    if (trimmed.startsWith('### ')) {
      const text = trimmed.replace(/^### /, '')
      const id   = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return <h3 key={idx} id={id}>{text}</h3>
    }

    if (trimmed.startsWith('> ')) {
      return (
        <blockquote key={idx}>
          <p dangerouslySetInnerHTML={{ __html: trimmed.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        </blockquote>
      )
    }

    if (trimmed.startsWith('- ')) {
      return (
        <ul key={idx}>
          {trimmed.split('\n').filter(l => l.startsWith('- ')).map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
        </ul>
      )
    }

    if (/^\d+\./.test(trimmed)) {
      return (
        <ol key={idx}>
          {trimmed.split('\n').filter(l => /^\d+\./.test(l)).map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
        </ol>
      )
    }

    const isFirst = isFirstParagraph
    if (isFirstParagraph) isFirstParagraph = false

    return (
      <p
        key={idx}
        className={isFirst ? '' : undefined}
        dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
      />
    )
  })
}

const CONTENT = `Most CSS candidates never think strategically about their optional subjects. They pick based on what sounds interesting, or worse, what their friend chose. Two years later, buried under subjects that don't overlap with their compulsories, they realize it was the wrong choice.

The truth is, your optional subjects can be the difference between scoring 55% and 75% overall. They're worth 200 marks out of 1400, which means about 14% of your total score. Unlike compulsory subjects where everyone competes fiercely, optional subjects are where you can genuinely excel.

## The Real Constraint: Overlaps Matter More Than Interest

Everyone tells you to pick subjects you're interested in. That's backwards. What matters is **overlap with your compulsory subjects**.

CSS compulsory subjects are: English, Urdu, Islamic Studies, Pakistan Affairs, Current Affairs, General Knowledge, and Everyday Science.

Now look at which optional subjects connect naturally:

**History** — connects directly to Pakistan Affairs and Current Affairs. You'll see the same dates, same movements, same political figures. Studying Pakistan's partition once covers both Islamic Studies and History. Essays in History use the same framework as your English compulsory essay. This is the single best overlap.

**Geography** — overlaps with Current Affairs. Major climate events, water crises, border disputes, resource distribution—these appear in both subjects. The spatial thinking is similar.

**Economics** — overlaps with Current Affairs. Budget announcements, inflation, unemployment, trade policies—you'll encounter these in both. Banking MCQs in General Knowledge connect to Economics concepts.

**Political Science** — directly relevant to Pakistan Affairs. Government systems, constitutional law, political theory—all connected.

**Sociology** — stands alone somewhat, but connects to Pakistan Affairs through social issues. Less overlap overall.

**Law, Philosophy, Agriculture, Geology** — minimal overlap with compulsories. You're essentially studying two separate subjects.

## How Much Time Do You Actually Have?

Here's the hidden math most candidates ignore. You have about 40-50 hours per week available for study (accounting for sleep, meals, basic life needs). Your compulsory subjects demand 25-30 hours weekly. That leaves 15-20 hours for two optional subjects.

Per optional subject, that's 7-10 hours weekly. Over 6 months, that's about 180-240 hours per subject. That's enough to become competent, not expert.

This is why overlap matters. If you choose two subjects with minimal overlap, you're essentially studying four separate subjects in the time you should study three. You'll skim both instead of mastering either.

## The Scoring Reality

Realistic targets based on preparation quality:

- Average candidate with decent effort: 55-65 marks per optional (110-130 total from 200)
- Good preparation and consistency: 70-80 marks per optional (140-160 total)
- Exceptional preparation: 80+ marks per optional (160+ total)

Top scorers almost always choose overlapping optionals. History + Geography scorers often get 75+ in both because one exam feeds the other. History + Law scorers struggle because they're solving two entirely different puzzles.

## The Selection Checklist

Before you finalize, run through this:

**Do these subjects overlap with your compulsories?** Rate each optional on overlap (High/Medium/Low). Prioritize High overlap.

**Are good resources available in Pakistan?** Can you find textbooks? Coaching institutes? Past papers? Subjects like History have abundant resources. Law and Philosophy have scarce local resources.

**Do you have foundational knowledge?** If you studied History in college, start with History. It's easier to deepen than rebuild.

**Do you have a teacher or mentor?** Coaching guidance matters more for some subjects (Law, Philosophy) than others (Geography, History).

**Most importantly: Will you actually study this for two years?** You'll study these subjects for 4-6 months seriously, then maintain knowledge for another 1-2 years. Choose something you won't hate revisiting.

## Sample Winning Combinations

**The Humanities Stack** — History + Geography
- Highest overlap with Pakistan Affairs and Current Affairs
- Essay-oriented format suits both
- Resources abundant
- Most popular choice among top scorers

**The Strategic Stack** — History + Political Science
- History covers events, Political Science covers theory
- Pakistan Affairs knowledge serves both
- Good essay potential
- Slightly harder than History + Geography

**The Analytical Stack** — Economics + Political Science
- Both abstract subjects requiring analytical thinking
- Less essay-heavy, more concept-focused
- Lower overlap with compulsories
- Choose this if you naturally think in systems and frameworks

**Avoid: Combining Subjects With Zero Overlap**
- History + Law (two separate worlds)
- Geography + Philosophy (minimal connection)
- Agriculture + Sociology (different skill sets)

## The One Thing Nobody Tells You

Once you choose and register, changing is expensive in terms of lost study time. But here's what top scorers do: they make the final decision after solving 50-100 practice MCQs from each optional. This takes about 4-5 hours total. They see which subjects "click" and which feel like pushing uphill.

Choose the subjects that feel natural after practice. Your instinct after actual studying is more valuable than any advice.

> The optional subjects are where you control your score. Everyone studies compulsories at similar depth. But few candidates study optionals strategically. This is your edge.

## Timeline for Decision

- By Month 2 of preparation: Make a tentative choice based on overlap analysis
- By Month 3: Do practice MCQs to test your choice
- By Month 4: Finalize and register if you haven't already
- After Month 4: Don't change. Even a "better" subject isn't worth restarting

Your optional subjects are your score multiplier. Choose overlapping subjects, commit fully, and become genuinely strong. That's how top scorers reach 1200+.`

export default function BlogPost() {
  const headings = extractHeadings(CONTENT)

  return (
    <>
      <ArticleSchema
        title="How to Choose CSS Optional Subjects"
        description="Strategic guide to selecting optional subjects based on overlap with compulsories."
        content={CONTENT}
        publishDate="2025-02-15"
        url="https://imtehan.com/blog/css-optional-subjects-guide"
      />
      <BlogPostShell
        title="How to Choose CSS Optional Subjects That Fit Your Strength"
        subtitle="Stop picking subjects based on interest. Pick them based on overlap, resources, and your actual strength. Here's the system top scorers use."
        author="Imtehan Team"
        date="February 15, 2025"
        readTime="9 min read"
        category="Guide"
        tags={TAGS}
        slug="css-optional-subjects-guide"
        headings={headings}
        otherPosts={RELATED_POSTS}
      >
        {renderContent(CONTENT)}
      </BlogPostShell>
    </>
  )
}
