import type { Metadata } from 'next'
import Link from 'next/link'
import BlogPostShell from '@/components/blog/BlogPostShell'
import type { RelatedPost } from '@/components/blog/blog-utils'

export const metadata: Metadata = {
  title: 'Objectives Resolution and Article 2A | Pakistan Affairs Notes',
  description:
    'Simple, verified Pakistan Affairs note on the Objectives Resolution and Article 2A for CSS, PMS, and one-paper exams.',
  alternates: {
    canonical: 'https://imtehan.com/notes/pakistan-affairs/objectives-resolution-article-2a',
  },
  openGraph: {
    title: 'Objectives Resolution and Article 2A | Imtehan Notes',
    description: 'Clear Pakistan Affairs note with key facts, exam tips, and a short revision sheet.',
    url: 'https://imtehan.com/notes/pakistan-affairs/objectives-resolution-article-2a',
    type: 'article',
  },
}

const HEADINGS = [
  { id: 'in-one-minute', text: 'In one minute' },
  { id: 'what-you-must-know', text: 'What you must know' },
  { id: 'simple-timeline', text: 'Simple timeline' },
  { id: 'how-to-answer', text: 'How to answer in the exam' },
  { id: 'mistakes-to-avoid', text: 'Mistakes to avoid' },
  { id: 'quick-revision', text: 'Quick revision sheet' },
  { id: 'try-this', text: 'Try this' },
  { id: 'practice', text: 'Practice' },
  { id: 'sources', text: 'Sources' },
]

const RELATED: RelatedPost[] = [
  {
    slug: 'pakistan-affairs-important-facts-by-year',
    title: 'Pakistan Affairs: Build a Timeline That Helps',
    date: 'Feb 5, 2025',
    category: 'Guide',
  },
  {
    slug: 'islamic-studies-css-complete-syllabus',
    title: 'Islamic Studies for CSS',
    date: 'Feb 6, 2025',
    category: 'Guide',
  },
  {
    slug: 'css-compulsory-subjects-overview',
    title: 'CSS Compulsory Subjects Overview',
    date: 'Feb 10, 2025',
    category: 'Guide',
  },
]

const TAGS = ['Pakistan Affairs', 'Constitution', 'CSS', 'PMS', 'Article 2A']

export default function ObjectivesResolutionNotePage() {
  return (
    <BlogPostShell
      title="Objectives Resolution and Article 2A"
      subtitle="The short version that actually helps you write an answer, not just collect facts."
      author="Imtehan Notes"
      authorBio="Clear, checked notes for CSS, PMS, and one-paper exams. Made for understanding and revision."
      date="August 12, 2026"
      readTime="6 min read"
      category="Pakistan Affairs"
      tags={TAGS}
      slug="notes-pa-objectives-resolution-article-2a"
      headings={HEADINGS}
      otherPosts={RELATED}
    >
      <div className="note-meta-strip">
        <span className="note-badge note-badge-verified">Checked and verified</span>
        <span className="note-badge">For CSS, PMS, one-paper</span>
        <span className="note-badge">Updated 12 Aug 2026</span>
      </div>

      <h2 id="in-one-minute">In one minute</h2>
      <p>
        <span className="drop-cap">I</span>
        n 1949, Pakistan passed the Objectives Resolution. It said what kind of state Pakistan
        should be: Islamic values, democracy, and rights for minorities.
      </p>
      <p>
        At first it was only a guiding idea at the start of the Constitution (a preamble). In
        <strong> 1985</strong>, it became much stronger through <strong>Article 2A</strong>. After
        that, it was a real part of the Constitution, not only an introduction.
      </p>
      <div className="pull-quote">
        1949 = idea. 1985 = legal power. That one difference is what most questions are about.
      </div>

      <h2 id="what-you-must-know">What you must know</h2>
      <div className="note-facts">
        <div className="note-fact-row">
          <span>When</span>
          <span>12 March 1949</span>
        </div>
        <div className="note-fact-row">
          <span>Who moved it</span>
          <span>Liaquat Ali Khan</span>
        </div>
        <div className="note-fact-row">
          <span>What it was</span>
          <span>A guiding statement for the future Constitution</span>
        </div>
        <div className="note-fact-row">
          <span>Where it sat</span>
          <span>Preamble of the 1956, 1962, and 1973 Constitutions</span>
        </div>
        <div className="note-fact-row">
          <span>Big change</span>
          <span>Article 2A in 1985 made it a real part of the Constitution</span>
        </div>
        <div className="note-fact-row">
          <span>Important fix</span>
          <span>The word &quot;freely&quot; for minorities was put back in 2010 (18th Amendment)</span>
        </div>
        <div className="note-fact-row">
          <span>Court point</span>
          <span>Hakim Khan case (1992): Article 2A is not above the whole Constitution</span>
        </div>
      </div>

      <h2 id="simple-timeline">Simple timeline</h2>
      <ol>
        <li>
          <strong>1949:</strong> Assembly passes the Objectives Resolution. It sets goals. It is
          not ordinary law yet.
        </li>
        <li>
          <strong>1956, 1962, 1973:</strong> It appears as the preamble (opening statement) of each
          Constitution.
        </li>
        <li>
          <strong>1985:</strong> Article 2A is added. The Resolution in the Annex becomes a
          substantive part of the Constitution. This happened under Zia through the Revival Order,
          later covered by the 8th Amendment.
        </li>
        <li>
          <strong>1985 problem:</strong> The word &quot;freely&quot; was missing from the minority
          rights line in the Annex text.
        </li>
        <li>
          <strong>2010:</strong> The 18th Amendment puts &quot;freely&quot; back.
        </li>
        <li>
          <strong>1992 court:</strong> In Hakim Khan, the Supreme Court said Article 2A does not
          sit above every other article. It is part of the Constitution as a whole.
        </li>
      </ol>

      <h2 id="how-to-answer">How to answer in the exam</h2>
      <p>
        Do not write a long history story. Use this 5-step shape for a 20-mark question:
      </p>
      <div className="note-scaffold">
        <p className="note-panel-label">Answer shape</p>
        <ol>
          <li>
            <strong>Say what it is:</strong> 1949 guiding statement for an Islamic democratic
            state with minority rights.
          </li>
          <li>
            <strong>Say the big change:</strong> Before 1985 it was mainly a preamble. After
            Article 2A it became enforceable constitutional text.
          </li>
          <li>
            <strong>Add the precise detail:</strong> &quot;Freely&quot; was removed in 1985 and
            restored in 2010.
          </li>
          <li>
            <strong>Add the court point:</strong> Hakim Khan (1992) stopped people from treating
            Article 2A as higher than the whole Constitution.
          </li>
          <li>
            <strong>Link to today:</strong> This topic still matters for debates on Islam,
            democracy, and minority rights in Pakistan. End with one clear way forward, such as
            rights-respecting constitutional practice.
          </li>
        </ol>
      </div>

      <h2 id="mistakes-to-avoid">Mistakes to avoid</h2>
      <ul>
        <li>Writing only the 1949 date and stopping.</li>
        <li>Saying Article 2A was always in the 1973 Constitution from day one.</li>
        <li>Forgetting the &quot;freely&quot; point (1985 missing, 2010 restored).</li>
        <li>Claiming Article 2A cancels every other article. That is too strong.</li>
        <li>Copying a ready-made academy answer. Examiners notice the same wording.</li>
      </ul>

      <h2 id="quick-revision">Quick revision sheet</h2>
      <div className="note-onepager">
        <p className="note-onepager-title">Copy this on one page</p>
        <ul>
          <li>12 Mar 1949 · Liaquat · guiding idea</li>
          <li>Preamble in 1956, 1962, 1973</li>
          <li>1985 · Article 2A · becomes real constitutional text</li>
          <li>&quot;Freely&quot; missing in 1985 · restored in 2010</li>
          <li>Hakim Khan 1992 · not above the whole Constitution</li>
          <li>Exam answer: what it is → 1985 change → freely → court → today</li>
        </ul>
      </div>

      <h2 id="try-this">Try this</h2>
      <div className="note-prompt">
        <p className="note-panel-label">Write 8 to 10 lines without looking up</p>
        <p>
          Question: Why did the Objectives Resolution become more important after 1985 than in
          1949?
        </p>
        <p className="note-panel-foot">
          Check your answer against the 5-step shape above. Fix gaps. Then write it once more from
          memory.
        </p>
      </div>

      <h2 id="practice">Practice</h2>
      <div className="note-cta">
        <p>Read once. Revise the one-page sheet. Then lock the facts with MCQs.</p>
        <div className="note-cta-row">
          <Link href="/exams/css-mpt/pakistan-affairs" className="note-cta-btn">
            Practice Pakistan Affairs MCQs
          </Link>
          <Link href="/notes" className="note-cta-link">
            Back to notes
          </Link>
        </div>
      </div>

      <h2 id="sources">Sources</h2>
      <ul>
        <li>Constitution of Pakistan (Articles 2 and 2A, and the Annex)</li>
        <li>FPSC CSS Pakistan Affairs syllabus</li>
        <li>Hakim Khan v. Government of Pakistan (PLD 1992 SC 595)</li>
        <li>18th Amendment text on restoration of &quot;freely&quot;</li>
        <li>Hamid Khan, Constitutional and Political History of Pakistan (for deeper reading)</li>
      </ul>
      <p>
        <em>
          Use this page to understand and revise. Write your own short notes. Do not paste this as
          a ready answer in the exam.
        </em>
      </p>
    </BlogPostShell>
  )
}
