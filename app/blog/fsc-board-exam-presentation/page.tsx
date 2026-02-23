import type { Metadata } from 'next'
import { ArticleSchema } from '@/components/seo/StructuredData'
import BlogPostShell from '@/components/blog/BlogPostShell'
import { extractHeadings, renderBlogContent } from '@/components/blog/blog-utils'
import type { RelatedPost } from '@/components/blog/blog-utils'

export const metadata: Metadata = {
  title: 'FSc Board Exams: The "Examiner Psychology" Hack for Paper Presentation | Imtehan',
  description: 'In FSc, presentation is 50% of your marks. Learn how to structure headings, use blue/black markers, and make your paper "easy to check" for maximum marks.',
  alternates: { canonical: 'https://imtehan.com/blog/fsc-board-exam-presentation' },
  openGraph: {
    title: 'FSc Board Exams: The "Examiner Psychology" Hack for Paper Presentation',
    description: 'Get full marks in FSc by understanding how examiners check papers.',
    url: 'https://imtehan.com/blog/fsc-board-exam-presentation',
    type: 'article',
    publishedTime: '2025-02-21T00:00:00Z',
  },
}

const RELATED: RelatedPost[] = [
  { slug: 'mdcat-biology-mastery-strategy',    title: 'MDCAT Biology Mastery Strategy',             date: 'Feb 21, 2025', category: 'MDCAT'     },
  { slug: '80-20-english-grammar-guide',       title: '80/20 English Grammar Guide',                date: 'Feb 21, 2025', category: 'Strategy'  },
  { slug: 'social-studying-community-chat-strategy', title: 'Community Chat Strategy',               date: 'Feb 21, 2025', category: 'Community' },
]

const TAGS = ['FSc', 'Board Exams', 'Paper Presentation', 'Topper Secrets', 'Study Strategy']

const CONTENT = `Let's get inside the head of an FSc Board Examiner. They are sitting in a poorly lit room with a stack of 200 papers to check in a single day. They are tired, underpaid, and bored. 

If they pick up your paper and see a wall of cramped blue ink with no paragraphs, their brain instantly labels it as "average." They will skim it, give you a 6/10, and move on.

But if they pick up a paper with bold black headings, clear bullet points, and perfectly drawn diagrams, their brain says "topper." They relax. They start looking for reasons to give you marks, not deduct them. This is the **Examiner Psychology Hack**. In FSc, presentation isn't just decoration; it's persuasion.

## The Hierarchy of Headings

Toppers don't write paragraphs; they write structures. Every long question in FSc Biology or Chemistry should look like this:

1.  **Main Heading (Black Marker 605):** Center aligned, double underlined.
2.  **Definition (Blue Pen):** Always start with a formal definition.
3.  **Explanation (Blue Pen):** Break this into short paragraphs. Never write more than 5 lines without a break.
4.  **Sub-Headings (Black Marker 604):** Use these liberally. "Structure," "Function," "Location," "Example."
5.  **Diagram (Pencil):** A labeled diagram is worth 1000 words. Even if the question doesn't ask for one, draw it.

## The "Blue-Black" Contrast Rule

The human eye loves contrast. A page of solid blue ink is exhausting to read. Use a **Cut Marker (605)** for main headings and a **Round Tip Marker (604)** for sub-headings. 

The rule is simple: **Blue is for content, Black is for navigation.** The examiner should be able to scan down the left side of your page and understand your entire answer just by reading the black headings. If they have to search for your points, you've already lost marks.

## Ending Every Answer

Never let one answer bleed into the next. Draw a solid line with a ruler at the end of every question. This is a psychological signal to the examiner: *"I am done with this thought. Now judge it."*

It also prevents them from missing a short answer if you've written two on the same page.

> Your job isn't just to be right; your job is to be easy to grade. Make the examiner's life easy, and they will reward you with marks.

## Practice Presentation, Not just Content

Most students practice *writing* answers but never practice *presenting* them. Once a week, take a full-length mock test on Imtehan. But don't just solve the MCQs online—write out the subjective portion on paper exactly as you would in the exam hall. Time yourself. Can you draw that diagram in under 2 minutes? Can you switch markers without losing your flow?

Presentation is a motor skill. If you don't practice it, your hand will cramp and your handwriting will deteriorate by question 5. Train for the performance, not just the knowledge.`

export default function BlogPost() {
  const headings = extractHeadings(CONTENT)
  return (
    <>
      <ArticleSchema
        title="FSc Board Exams: The 'Examiner Psychology' Hack for Paper Presentation"
        description="Learn how to present your paper to get full marks."
        content={CONTENT}
        publishDate="2025-02-21"
        url="https://imtehan.com/blog/fsc-board-exam-presentation"
      />
      <BlogPostShell
        title="FSc Board Exams: The 'Examiner Psychology' Hack for Paper Presentation"
        subtitle="Your paper is one of 200 in a stack. Here is exactly how to structure your answers so the examiner *wants* to give you full marks."
        author="Imtehan Team"
        date="February 21, 2025"
        readTime="7 min read"
        category="FSc"
        tags={TAGS}
        slug="fsc-board-exam-presentation"
        headings={headings}
        otherPosts={RELATED}
      >
        {renderBlogContent(CONTENT)}
      </BlogPostShell>
    </>
  )
}
