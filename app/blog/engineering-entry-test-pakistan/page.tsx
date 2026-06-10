import type { Metadata } from 'next'
import { ArticleSchema } from '@/components/seo/StructuredData'
import BlogPostShell from '@/components/blog/BlogPostShell'
import { extractHeadings, renderBlogContent } from '@/components/blog/blog-utils'
import type { RelatedPost } from '@/components/blog/blog-utils'

export const metadata: Metadata = {
  title: 'NUST, UET, or GIKI? Engineering Entry Tests in Pakistan Compared | Imtehan',
  description: 'NUST NET, UET ECAT, and GIKI entry tests test different things despite sharing the same syllabus. Here is what each rewards, and how to prepare for the one you are targeting.',
  alternates: { canonical: 'https://imtehan.com/blog/engineering-entry-test-pakistan' },
  openGraph: {
    title: 'NUST, UET, or GIKI? Engineering Entry Tests in Pakistan Compared',
    description: 'The three top engineering entry tests in Pakistan reward different things. Here is how they differ and what your preparation should prioritise.',
    url: 'https://imtehan.com/blog/engineering-entry-test-pakistan',
    type: 'article',
    publishedTime: '2026-02-24T00:00:00Z',
  },
}

const RELATED: RelatedPost[] = [
  { slug: 'mdcat-physics-shortcuts',            title: 'MDCAT Physics: Solving Without a Calculator', date: 'Feb 21, 2025', category: 'MDCAT'    },
  { slug: 'mdcat-chemistry-high-yield-topics',  title: 'MDCAT Chemistry: The 5 High-Yield Topics',   date: 'Feb 24, 2026', category: 'MDCAT'    },
  { slug: 'smart-guessing-mcq-strategy',        title: 'The Smart-Guessing Framework',               date: 'Feb 21, 2025', category: 'Strategy' },
]

const TAGS = ['NUST', 'UET', 'GIKI', 'ECAT', 'Engineering', 'Entry Test', 'Pakistan', 'NET']

const CONTENT = `Every year, hundreds of thousands of FSc pre-engineering students prepare for university entry tests without a clear picture of how NUST NET, UET ECAT, and GIKI's entry test actually differ. They study the same way for all three and sometimes discover the differences after they have already sat the paper.

All three tests share the same general syllabus: Physics, Chemistry, Mathematics, and English from FSc pre-engineering. But they reward different things, weight subjects differently, and integrate with their merit formulas differently. These differences should affect how you prepare in the final six weeks.

## NUST NET: Concepts Over Calculations

The NUST entry test has three variants (NET-1 for engineering, NET-2 for management, NET-3 for architecture). For engineering, Physics and Mathematics carry significantly more weight than Chemistry or English.

**Format:** 200 questions, 3 hours. Multiple choice throughout.

**What makes it distinctive:** NUST questions are concept-heavy relative to other tests. The paper does not ask for extensive numerical calculation. It tests whether you understand *why* a physical principle holds, not just whether you can apply a formula to numbers. A student who has spent their preparation doing formula-application drills without building conceptual understanding frequently finds NUST questions unexpectedly confusing. They know the formula. They do not understand the concept the question is testing.

For NUST, the preparation shift is: after practising standard problems, ask yourself why each formula works. Understand the physical or mathematical principle behind it, not just the procedure.

**Merit formula note:** NUST combines FSc marks, matric marks, and NET score. The NET component carries substantial weight, more than at most other institutions. A strong FSc percentage compensates less here than it does at UET. Your test score genuinely matters.

## UET ECAT: Speed and Formula Fluency

The UET entry test, the ECAT, covers most UET campuses including Lahore, Taxila, and Peshawar. It consistently attracts the highest combined applicant numbers of any engineering entry test in Pakistan.

**Format:** 100 questions, 75 minutes. Physics, Chemistry, Mathematics, and English in roughly equal proportions. The time constraint is more severe than NUST, roughly 45 seconds per question with no differential weighting.

**What makes it distinctive:** ECAT questions are more directly formula-application focused than NUST. If you know the material and can execute quickly, the questions are manageable. The difficulty is the time pressure. Hesitation kills your score here. Students who perform well in ECAT have practised enough that standard question types feel automatic. They do not need to reconstruct the method under pressure.

**Merit formula note:** UET gives considerably higher weight to FSc percentage relative to the entry test compared to NUST. A student with 90%+ in FSc and a moderate ECAT score will often outperform a student with 80% FSc and a high ECAT score. If your board results are strong, UET's formula works in your favour.

> NUST rewards understanding why. UET rewards executing quickly. The syllabus is identical. The preparation should be different.

## GIKI: Mathematics-Heavy and Analytically Demanding

GIKI (Ghulam Ishaq Khan Institute in Topi, KP) is smaller in applicant volume than NUST or UET but consistently attracts motivated, ambitious students. Its entry test is administered independently.

**Format:** Physics, Mathematics, Chemistry, and English, with noticeably heavier weighting on Mathematics and Physics than most other tests.

**What makes it distinctive:** GIKI questions have a reputation for requiring more sustained analytical thinking: some questions involve multi-step reasoning rather than single-step formula application. The student who works quickly under pressure and enjoys Mathematical problem-solving tends to find GIKI a better fit than students who are stronger in Chemistry or general knowledge.

**Scholarship consideration:** GIKI's merit-based scholarship system means that a very strong entry test performance can significantly reduce or eliminate fees. For strong students who might otherwise choose a public university primarily for cost reasons, this merit-scholarship dynamic is worth knowing about and factoring into the decision.

## The Practical Preparation Structure

The syllabus overlap means your core preparation should be identical regardless of which institution you are targeting. Solid Physics, Mathematics, and Chemistry at the FSc level is the foundation for all three.

The institution-specific adjustment happens in the final four to six weeks:

- **NUST preparation:** Shift from formula practice to concept questioning. After solving each problem, ask why the approach works. Review conceptual explanations, not just worked examples.
- **UET preparation:** Shift to speed drills. Timed sets of 25 questions in 20 minutes. Identify which question types still slow you down and drill those specifically.
- **GIKI preparation:** Focus on Mathematics problem sets requiring multiple steps. Do not skip the harder problems in your textbook. GIKI specifically rewards students who have worked through them.

## One Note on Multiple Applications

Most students apply to all three (and others). This is sensible and the preparation is not fundamentally different for each. The caveat: do not try to do institution-specific preparation for all three simultaneously in the final weeks. Pick your first-priority institution, do targeted preparation for that one, and let the general preparation carry the other papers. Trying to optimise for three different test styles at once in the final month usually means you do not optimise for any.`

export default function BlogPost() {
  const headings = extractHeadings(CONTENT)
  return (
    <>
      <ArticleSchema
        title="NUST, UET, or GIKI? Engineering Entry Tests in Pakistan Compared"
        description="How NUST NET, UET ECAT, and GIKI entry tests differ, and what each rewards in your preparation."
        content={CONTENT}
        publishDate="2026-02-24"
        url="https://imtehan.com/blog/engineering-entry-test-pakistan"
      />
      <BlogPostShell
        title="NUST, UET, or GIKI? A Practical Comparison of Pakistan's Engineering Entry Tests"
        subtitle="Three tests, the same syllabus, but they reward different things. Here is what each one actually measures and how to prepare accordingly."
        author="Imtehan Team"
        date="February 24, 2026"
        readTime="7 min read"
        category="Guide"
        tags={TAGS}
        slug="engineering-entry-test-pakistan"
        headings={headings}
        otherPosts={RELATED}
      >
        {renderBlogContent(CONTENT)}
      </BlogPostShell>
    </>
  )
}
