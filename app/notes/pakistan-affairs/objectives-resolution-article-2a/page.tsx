import type { Metadata } from 'next'
import Link from 'next/link'
import BlogPostShell from '@/components/blog/BlogPostShell'
import type { RelatedPost } from '@/components/blog/blog-utils'

export const metadata: Metadata = {
  title: 'Objectives Resolution and Article 2A | Pakistan Affairs Notes',
  description:
    'Study notes on the Objectives Resolution and Article 2A for CSS and PMS: what it means, why it changed, and how to use it in answers.',
  alternates: {
    canonical: 'https://imtehan.com/notes/pakistan-affairs/objectives-resolution-article-2a',
  },
}

const HEADINGS = [
  { id: 'what-is-this', text: 'What is this topic really about?' },
  { id: 'why-1949-mattered', text: 'Why 1949 mattered' },
  { id: 'from-idea-to-law', text: 'From idea to law' },
  { id: 'the-freely-issue', text: 'The freely issue' },
  { id: 'what-courts-said', text: 'What the courts said' },
  { id: 'how-to-use-this', text: 'How to use this in an answer' },
  { id: 'revision-bits', text: 'Revision bits' },
  { id: 'practice', text: 'Practice' },
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
]

const TAGS = ['Pakistan Affairs', 'Constitution', 'CSS', 'PMS']

export default function ObjectivesResolutionNotePage() {
  return (
    <BlogPostShell
      title="Objectives Resolution and Article 2A"
      subtitle="Notes on what the Resolution was trying to do, why Article 2A changed its weight, and how that still shows up in Pakistan Affairs answers."
      author="Imtehan Notes"
      authorBio="Study notes for CSS, PMS, and related exams. Written to build understanding, then help you revise."
      date="August 12, 2026"
      readTime="8 min read"
      category="Pakistan Affairs"
      tags={TAGS}
      slug="notes-pa-objectives-resolution-article-2a"
      headings={HEADINGS}
      otherPosts={RELATED}
    >
      <div className="note-meta-strip">
        <span className="note-badge note-badge-verified">Verified</span>
        <span className="note-badge">Pakistan Affairs</span>
        <span className="note-badge">Updated 12 Aug 2026</span>
      </div>

      <h2 id="what-is-this">What is this topic really about?</h2>
      <p>
        <span className="drop-cap">M</span>
        any students treat the Objectives Resolution as a date to memorise. That is why their
        answers feel empty. The real topic is this question: what kind of state was Pakistan meant
        to be, and how did that idea enter the Constitution?
      </p>
      <p>
        The Resolution tried to hold two things together. On one side, Islamic principles and the
        idea that authority comes within limits set by faith. On the other side, democracy, justice,
        and protection for minorities. Almost every later debate on ideology, Islam, and rights in
        Pakistan comes back to this tension. If you understand that, the dates start to make sense
        instead of sitting as a list.
      </p>

      <h2 id="why-1949-mattered">Why 1949 mattered</h2>
      <p>
        On 12 March 1949, the Constituent Assembly passed the Objectives Resolution. Liaquat Ali
        Khan moved it. Pakistan was still young, and the Assembly needed a shared starting point
        before it could write a full constitution.
      </p>
      <p>
        So the Resolution worked like a compass. It said Pakistan should be an Islamic democratic
        state, that people would exercise authority as a sacred trust, and that minorities should
        be able to practise their religion and culture. At this stage, though, it was still an
        aspiration. It guided constitution making. It was not yet an ordinary law you could enforce
        in court the way you enforce a normal article.
      </p>
      <div className="pull-quote">
        Think of 1949 as Pakistan writing down its direction. The hard part came later: turning
        that direction into living constitutional text.
      </div>

      <h2 id="from-idea-to-law">From idea to law</h2>
      <p>
        For a long time, the Resolution lived as a preamble. You will find it at the start of the
        1956, 1962, and 1973 Constitutions. A preamble matters because it shows spirit and purpose.
        But it is still different from an operative article that courts treat as a full part of the
        text.
      </p>
      <p>
        That changed in 1985. Under Zia-ul-Haq, Article 2A was inserted through the Revival of the
        Constitution Order, later covered by the 8th Amendment. Article 2A said the principles of
        the Objectives Resolution, placed in the Annex, were now a substantive part of the
        Constitution and would have effect accordingly.
      </p>
      <p>
        This is the heart of the topic for CSS and PMS. Before 1985, the Resolution mainly told
        you what the Constitution aimed at. After Article 2A, it sat inside the Constitution with
        much greater weight. When a question asks about the ideological foundation of the
        Constitution, examiners often want this shift explained, not only praised.
      </p>

      <h2 id="the-freely-issue">The freely issue</h2>
      <p>
        One detail shows why careful notes beat random PDFs. In the original Resolution, minorities
        were to freely profess and practise their religions. In the 1985 Annex version, the word
        freely was missing. That was not a small grammar issue. It weakened the wording of a core
        protection.
      </p>
      <p>
        The 18th Amendment in 2010 restored the word. If you mention this in an answer, you show
        you understand the topic as constitutional history, not as a slogan. It also helps when
        questions touch minority rights, Islamic provisions, or constitutional amendments.
      </p>

      <h2 id="what-courts-said">What the courts said</h2>
      <p>
        After Article 2A, some people argued that the Objectives Resolution now stood above the
        rest of the Constitution, almost like a higher law that could knock everything else down.
        The Supreme Court rejected that extreme reading in Hakim Khan (1992).
      </p>
      <p>
        The court treated Article 2A as part of the Constitution, not as something floating above
        it. That matters for your analysis. A good answer does two things at once: it recognises
        that 1985 made the Resolution much more powerful, and it avoids claiming that Article 2A
        silently cancels every other article. Balance is what high scores look like here.
      </p>

      <h2 id="how-to-use-this">How to use this in an answer</h2>
      <p>
        When a question asks about ideology, Islamic provisions, or the constitutional foundation
        of Pakistan, do not dump the timeline. Build an argument.
      </p>
      <div className="note-scaffold">
        <p className="note-panel-label">A clean answer path</p>
        <ol>
          <li>
            Open with the problem the Resolution tried to solve: how to found a state that is both
            Islamic in orientation and democratic in political life.
          </li>
          <li>
            Explain 1949 as the founding statement of direction, then show how it remained a
            preamble through the early constitutions.
          </li>
          <li>
            Show why 1985 is the turning point: Article 2A gave the Resolution substantive force.
          </li>
          <li>
            Add one precise point (freely restored in 2010, or Hakim Khan in 1992) so the answer
            feels controlled, not vague.
          </li>
          <li>
            Close by linking the topic to today: Pakistan still argues over how faith, democracy,
            and rights sit together inside one constitution.
          </li>
        </ol>
      </div>
      <p>
        That structure works for many related questions. You are not memorising one essay. You are
        learning one explanation you can reshape.
      </p>

      <h2 id="revision-bits">Revision bits</h2>
      <p>
        After you understand the note, keep only this for last-day revision:
      </p>
      <div className="note-onepager">
        <ul>
          <li>1949: founding direction for an Islamic democratic state</li>
          <li>Long phase: lives as preamble in 1956, 1962, 1973</li>
          <li>1985: Article 2A makes it substantive constitutional text</li>
          <li>Freely: missing in 1985 Annex, restored by 18th Amendment in 2010</li>
          <li>Hakim Khan 1992: Article 2A is part of the Constitution, not above it</li>
          <li>Exam use: explain the shift from aspiration to constitutional force</li>
        </ul>
      </div>

      <h2 id="practice">Practice</h2>
      <div className="note-prompt">
        <p className="note-panel-label">Write from memory</p>
        <p>
          In your own words: why is Article 2A more important than the simple fact that the
          Objectives Resolution was passed in 1949?
        </p>
      </div>
      <div className="note-cta">
        <p>When the idea is clear, lock the supporting facts with MCQs.</p>
        <div className="note-cta-row">
          <Link href="/exams/css-mpt/pakistan-affairs" className="note-cta-btn">
            Practice Pakistan Affairs MCQs
          </Link>
          <Link href="/notes" className="note-cta-link">
            Back to notes
          </Link>
        </div>
      </div>

      <p>
        <em>
          Sources: Constitution of Pakistan (Arts. 2, 2A, Annex); 18th Amendment; Hakim Khan (PLD
          1992 SC 595); FPSC Pakistan Affairs syllabus; Hamid Khan for deeper constitutional
          history.
        </em>
      </p>
    </BlogPostShell>
  )
}
