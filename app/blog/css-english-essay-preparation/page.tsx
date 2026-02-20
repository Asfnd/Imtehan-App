import type { Metadata } from 'next'
import { ArticleSchema } from '@/components/seo/StructuredData'
import BlogPostShell, { extractHeadings } from '@/components/blog/BlogPostShell'
import type { RelatedPost } from '@/components/blog/BlogPostShell'

export const metadata: Metadata = {
  title: 'CSS English Essay: Why You\'re Failing and How to Fix It | Imtehan',
  description: 'Most candidates approach CSS essays wrong. Here\'s the exact framework that gets 80+.',
  alternates: {
    canonical: 'https://imtehan.com/blog/css-english-essay-preparation',
  },
  openGraph: {
    title: 'CSS English Essay Preparation',
    description: 'The framework that actually gets high scores in CSS essays.',
    url: 'https://imtehan.com/blog/css-english-essay-preparation',
    type: 'article',
    publishedTime: '2025-02-13T00:00:00Z',
  },
}

const RELATED_POSTS: RelatedPost[] = [
  { slug: 'css-english-essay-structure-examples', title: 'CSS English Essay Structure and Examples', date: 'Jan 3, 2026', category: 'Writing Guide' },
  { slug: 'how-to-crack-css-first-attempt', title: 'How to Crack CSS in First Attempt', date: 'Feb 14, 2025', category: 'Strategy' },
  { slug: 'css-exam-preparation-guide-2025', title: 'Complete CSS Exam Preparation Guide 2025', date: 'Jan 2, 2025', category: 'Guide' },
]

const TAGS = ['CSS Essay', 'English Preparation', 'Writing Tips', 'Essay Structure', 'CSS Exam']

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

const CONTENT = `CSS candidates treat essays like extended MCQs. They memorize facts, list them chronologically, and hope for a good score. Then they get 50 out of 100, confused why their knowledge didn't translate to marks.

The gap between knowing content and writing a strong essay is exactly where most candidates fail. Here's the framework that actually works.

## What CSS Examiners Actually Want

First, understand what examiners are marking:

- **Thinking clarity (40%):** Can you form an argument? Do you understand the question deeply?
- **Organization (30%):** Does your essay flow? Is it easy to follow your logic?
- **Evidence (20%):** Do you support claims with examples, data, or reasoning?
- **Writing quality (10%):** Grammar, syntax, vocabulary—important but not dominant.

Most candidates over-invest in writing quality and under-invest in thinking clarity. They write beautifully formatted sentences that don't form a coherent argument.

The examiners don't care if your comma placement is perfect. They care if you've thought deeply about the question.

## The Problem With Memorization

You've probably memorized essay outlines. Six paragraphs, introduction, three body, conclusion. Standard structure.

Here's the trap: You memorize "The advantages of X," "The disadvantages of X," "Conclusion," and you fill it with facts. You produce a competent essay that says nothing new.

Examiners read 200+ essays on the same prompt. They recognize memorized structures instantly. Your essay becomes background noise.

What differentiates high-scoring essays is **original thinking within structure.** Not novel content. Not rare facts. But a perspective that shows you've actually processed the question.

## The Framework That Works

Before writing, ask yourself these three questions:

**1. What is the actual question asking?** Not the surface question. The deep question.

If the prompt is "Discuss the role of technology in education," the surface question is "what role?" The deep question is "is this role positive, and what conditions determine that?"

Spend 5 minutes clarifying the real question.

**2. What is my argument?** Not a list. An **argument.** A single coherent claim that answers the deep question.

"Technology improves learning outcomes when properly implemented with teacher training, but creates new inequalities without equitable access."

That's not fact-listing. That's an argument with nuance.

**3. How will I prove this argument?** Not with five random examples. With 2-3 strategic pieces of evidence.

An example of successful implementation. An example of failure without teacher training. One statistic on access inequality.

This is the framework. Question clarity, single argument, strategic proof.

## The Essay Structure That Supports This

Now you structure around your argument:

**Paragraph 1 (Introduction):** State your argument directly. No vague setup. The examiner knows what your essay claims by sentence two.

**Paragraph 2 (Context):** Why does this question matter? What's the current debate? Use 2-3 sentences. Don't waste space.

**Paragraph 3 (First evidence):** Your strongest proof. One example or data point that clearly supports your argument.

**Paragraph 4 (Second evidence):** A different angle or counterargument you address. This shows nuance.

**Paragraph 5 (Third evidence):** Final supporting point or real-world implication.

**Paragraph 6 (Conclusion):** Restate your argument in light of the evidence. What do these proofs show?

Notice: No separate "advantages and disadvantages" sections. Your argument already reflects nuance. Your evidence proves it. Done.

## How to Build This in Practice

Stop writing practice essays by memorizing templates. Instead:

**Week 1:** Practice questions—spend 10 minutes planning (question clarification, argument, three proofs). Write nothing yet. Just plan.

**Week 2:** Plan + write outline (topic sentence per paragraph). Again, don't write full prose yet.

**Week 3:** Plan + outline + write. Full essay.

**Week 4:** Plan + write directly. Skip outlining, move at exam speed.

Most candidates skip planning entirely. They sit down and write. This is why their essays lack coherence. You're thinking while writing, which means you're writing while confused.

Plan first. Always.

## Common Mistakes That Kill Scores

**1. Restating the question as your argument**

Wrong: "Technology has both advantages and disadvantages."

That's not an argument. That's a tautology. Every position has pros and cons.

Right: "Technology's impact on learning depends entirely on implementation quality and teacher preparation, not on the technology itself."

See the difference? One shows thinking. One shows you didn't.

**2. Listing without connecting**

You write five paragraphs about five different benefits. Each paragraph is accurate. Together they're directionless.

Connect each paragraph to your central argument. "This benefit only occurs when..." "This limitation exists because..."

**3. Forgetting the question mid-essay**

You start with a clear argument about education technology. By paragraph 4, you're writing about government funding in general.

Reread the prompt before each paragraph. Stay locked on the specific question.

**4. Using jargon to hide weak thinking**

"The paradigmatic shift in pedagogical methodology manifests in...

Just say what you mean. "Teachers now focus on..." If your thinking is clear, complex vocabulary isn't needed.

## The Timing Strategy

CSS essay exam: 3 hours for 3 essays. 60 minutes per essay.

- 10 minutes: Plan (clarify question, form argument, gather evidence)
- 40 minutes: Write full essay
- 10 minutes: Review and edit

Most candidates spend 50 minutes writing and 10 minutes panicking. Flip this. Planning is your insurance policy.

## Why This Works

This framework works because examiners aren't looking for essay perfection. They're looking for evidence that you understand the question deeply and can defend a position logically.

A perfectly written essay that says nothing scores 40. A slightly rough essay with clear thinking and good evidence scores 75.

Train your brain toward clarity first, eloquence second. That's the shift that gets you from average essay candidate to strong one.

> The best essay isn't the longest or most beautifully written. It's the one where your thinking is clearest and your argument is most defensible.`

export default function BlogPost() {
  const headings = extractHeadings(CONTENT)

  return (
    <>
      <ArticleSchema
        title="CSS English Essay Preparation"
        description="Framework for writing high-scoring CSS essays through clear thinking and strategic argument."
        content={CONTENT}
        publishDate="2025-02-13"
        url="https://imtehan.com/blog/css-english-essay-preparation"
      />
      <BlogPostShell
        title="CSS English Essay: Why You're Failing and How to Fix It"
        subtitle="Most candidates approach essays wrong. They memorize structures and facts. Here's the framework that gets 80+ by focusing on thinking clarity first."
        author="Imtehan Team"
        date="February 13, 2025"
        readTime="10 min read"
        category="Writing Guide"
        tags={TAGS}
        slug="css-english-essay-preparation"
        headings={headings}
        otherPosts={RELATED_POSTS}
      >
        {renderContent(CONTENT)}
      </BlogPostShell>
    </>
  )
}
