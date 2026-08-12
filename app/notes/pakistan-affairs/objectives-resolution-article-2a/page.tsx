import type { Metadata } from 'next'
import Link from 'next/link'
import BlogPostShell from '@/components/blog/BlogPostShell'
import type { RelatedPost } from '@/components/blog/blog-utils'
import { NoteTable, NoteTimeline } from '@/components/notes/NoteTable'

export const metadata: Metadata = {
  title: 'Objectives Resolution and Article 2A | Pakistan Affairs Notes',
  description:
    'Complete Pakistan Affairs notes on the Objectives Resolution and Article 2A, with clean tables for revision.',
  alternates: {
    canonical: 'https://imtehan.com/notes/pakistan-affairs/objectives-resolution-article-2a',
  },
}

const HEADINGS = [
  { id: 'overview', text: 'Overview' },
  { id: 'background', text: 'Background' },
  { id: 'what-the-resolution-said', text: 'What the Resolution said' },
  { id: 'from-preamble-to-article-2a', text: 'From preamble to Article 2A' },
  { id: 'freely-issue', text: 'The freely issue' },
  { id: 'court-view', text: 'What the Court decided' },
  { id: 'exam-use', text: 'How to use this in the exam' },
  { id: 'revision-tables', text: 'Revision tables' },
  { id: 'mistakes', text: 'Mistakes to avoid' },
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
      subtitle="Complete notes for understanding the topic, plus clean tables for quick memorisation."
      author="Imtehan Notes"
      authorBio="Study notes for CSS, PMS, and one-paper exams. Written for clear understanding and fast revision."
      date="August 12, 2026"
      readTime="11 min read"
      category="Pakistan Affairs"
      tags={TAGS}
      slug="notes-pa-objectives-resolution-article-2a"
      headings={HEADINGS}
      otherPosts={RELATED}
    >
      <div className="note-meta-strip">
        <span className="note-badge note-badge-verified">Verified</span>
        <span className="note-badge">CSS · PMS · one-paper</span>
        <span className="note-badge">Updated 12 Aug 2026</span>
      </div>

      <h2 id="overview">Overview</h2>
      <p>
        <span className="drop-cap">T</span>
        he Objectives Resolution is a core ideology topic in Pakistan Affairs. It asks a founding
        question: what kind of state was Pakistan meant to become? The Assembly tried to hold two
        ideas together at once. Pakistan would have an Islamic orientation. It would also be
        democratic, just, and protective of minority rights.
      </p>
      <p>
        For the exam, the topic is incomplete if you only remember 1949. The real depth is the
        journey from a guiding statement to a much stronger constitutional position after Article
        2A in 1985. Once you understand that journey, you can use the same notes for questions on
        ideology, Islamic provisions, constitutional development, and minority rights.
      </p>

      <h2 id="background">Background</h2>
      <p>
        Pakistan achieved independence in 1947, but it still needed a clear constitutional
        direction. On 12 March 1949, the Constituent Assembly passed the Objectives Resolution.
        Liaquat Ali Khan moved it. The Resolution was meant to guide the writing of the future
        Constitution.
      </p>
      <p>
        At that stage, it worked like a compass. It told constitution makers where the state should
        go. It was not yet ordinary enforceable law in the same way a normal constitutional article
        is. That distinction matters, because later Article 2A changes the weight of the same
        document.
      </p>

      <NoteTable
        caption="Core identity of the topic"
        headers={['Point', 'Detail']}
        rows={[
          ['Date', '12 March 1949'],
          ['Moved by', 'Liaquat Ali Khan'],
          ['Passed by', 'Constituent Assembly of Pakistan'],
          ['First role', 'Guiding statement for constitution making'],
          ['Later role', 'Substantive constitutional text through Article 2A (1985)'],
        ]}
      />

      <h2 id="what-the-resolution-said">What the Resolution said</h2>
      <p>
        The Resolution is best remembered by themes. If you learn only scattered lines, your answer
        becomes a list. If you learn the themes, you can explain the founding vision clearly.
      </p>
      <p>
        The main message was this: sovereignty belongs to Allah, the people of Pakistan exercise
        authority as a sacred trust, and the state should follow democracy, freedom, equality,
        tolerance, and social justice as taught by Islam. Muslims should be able to live according
        to Islam. Minorities should be able to practise their religion and develop their culture.
        Fundamental rights, an independent judiciary, and the integrity of the federation should
        also be protected.
      </p>

      <NoteTable
        caption="Themes to remember"
        headers={['Theme', 'Meaning in your answer']}
        narrowFirst
        rows={[
          [
            'Islamic orientation',
            'State principles should follow Islamic teachings of justice and morality',
          ],
          [
            'Authority as trust',
            'People hold power, but not as unlimited personal power',
          ],
          [
            'Democracy and rights',
            'Democracy, equality, and fundamental rights belong in the founding vision',
          ],
          [
            'Minority protection',
            'Non-Muslims should practise religion and develop culture freely',
          ],
          [
            'Institutional safeguards',
            'Independent judiciary and federation integrity support a stable state',
          ],
        ]}
      />

      <div className="pull-quote">
        The Resolution is not only religious language. It is an early attempt to define Pakistan as
        both an Islamic and a democratic constitutional project.
      </div>

      <h2 id="from-preamble-to-article-2a">From preamble to Article 2A</h2>
      <p>
        After 1949, the Resolution did not vanish. It became the preamble of the 1956, 1962, and
        1973 Constitutions. A preamble is the opening statement of purpose. It shows spirit and
        direction. It is important, but it is still different from a full operative article.
      </p>
      <p>
        The turning point came in 1985. Under General Zia-ul-Haq, Article 2A was inserted through
        the Revival of the Constitution of 1973 Order. This was later covered by the 8th Amendment.
        Article 2A said that the principles and provisions of the Objectives Resolution, reproduced
        in the Annex, are a substantive part of the Constitution and shall have effect accordingly.
      </p>
      <p>
        That one change is the heart of the topic. Before 1985, the Resolution mainly expressed
        constitutional spirit. After Article 2A, it sat inside the Constitution with much greater
        force. Also keep Article 2 in mind: Islam is the State religion. Articles 2 and 2A often
        appear together when examiners ask about Islamic provisions.
      </p>

      <NoteTable
        caption="Before and after Article 2A"
        headers={['Before 1985', 'After Article 2A']}
        narrowFirst={false}
        rows={[
          ['Mainly a guiding idea and preamble', 'Substantive part of the Constitution'],
          ['Showed constitutional spirit', 'Given direct constitutional effect'],
          ['Strong for ideology discussion', 'Strong for ideology and constitutional law answers'],
          ['Weaker operative force', 'Much stronger constitutional weight'],
        ]}
      />

      <h2 id="freely-issue">The freely issue</h2>
      <p>
        One precise detail separates careful notes from weak notes. In the original Objectives
        Resolution, minorities were to freely profess and practise their religions. In the 1985
        Annex version, the word freely was missing. That was not a small wording change. It weakened
        an important minority protection.
      </p>
      <p>
        The 18th Amendment in 2010 restored the word freely. If you mention this in an answer, you
        show control over the topic. It also helps when a question links ideology with minority
        rights or with major amendments.
      </p>

      <NoteTable
        caption="Freely: what changed"
        headers={['Stage', 'Status of freely']}
        rows={[
          ['Original Resolution (1949)', 'Included'],
          ['Annex after Article 2A (1985)', 'Missing'],
          ['18th Amendment (2010)', 'Restored'],
        ]}
      />

      <h2 id="court-view">What the Court decided</h2>
      <p>
        After Article 2A, some people argued that the Objectives Resolution now stood above the
        rest of the Constitution, almost like a higher law that could defeat every other article.
        The Supreme Court rejected that extreme reading in Hakim Khan v. Government of Pakistan
        (1992).
      </p>
      <p>
        The Court treated Article 2A as part of the Constitution, not as something floating above
        it. So a strong answer does two things at once. It recognises that 1985 made the Resolution
        much more powerful. It also avoids the exaggeration that Article 2A silently cancels the
        rest of the Constitution. Balance is what high scores look like here.
      </p>

      <h2 id="exam-use">How to use this in the exam</h2>
      <p>
        Examiners like this topic because one explanation can serve several syllabus areas:
        ideology of Pakistan, constitutional development, Islamic provisions, democracy and rights,
        and minority protections. Do not narrate dates only. Build an argument.
      </p>

      <div className="note-scaffold">
        <p className="note-panel-label">Answer flow</p>
        <ol>
          <li>
            Open with the founding problem: how to create a state that is Islamic in orientation
            and democratic in political life.
          </li>
          <li>
            Explain the 1949 Resolution as the first clear statement of that direction.
          </li>
          <li>
            Show that it remained a preamble through 1956, 1962, and 1973.
          </li>
          <li>
            Explain Article 2A (1985) as the turning point that made it substantive.
          </li>
          <li>
            Add one precise point: freely restored in 2010, or Hakim Khan in 1992.
          </li>
          <li>
            Close with present relevance: Pakistan still debates how faith, democracy, and rights
            sit together under one constitution.
          </li>
        </ol>
      </div>

      <h2 id="revision-tables">Revision tables</h2>
      <p>
        After you understand the notes, revise from these tables only.
      </p>

      <NoteTable
        caption="Key facts"
        headers={['Point', 'Fact']}
        rows={[
          ['Date', '12 March 1949'],
          ['Moved by', 'Liaquat Ali Khan'],
          ['Body', 'Constituent Assembly'],
          ['Early status', 'Guiding statement / preamble'],
          ['Preamble in', '1956, 1962, 1973 Constitutions'],
          ['Article 2A', '1985 (RCO 1985 / 8th Amendment cover)'],
          ['Article 2', 'Islam is the State religion'],
          ['Freely restored', '18th Amendment, 2010'],
          ['Key case', 'Hakim Khan (PLD 1992 SC 595)'],
        ]}
      />

      <NoteTimeline
        caption="Timeline to memorise"
        items={[
          {
            year: '1949',
            title: 'Objectives Resolution passed',
            why: 'Sets founding direction for the future Constitution',
          },
          {
            year: '1956',
            title: 'Used as preamble',
            why: 'Enters the first Constitution as opening spirit',
          },
          {
            year: '1962',
            title: 'Used as preamble',
            why: 'Continues as guiding statement',
          },
          {
            year: '1973',
            title: 'Used as preamble',
            why: 'Still the opening spirit of the Constitution',
          },
          {
            year: '1985',
            title: 'Article 2A inserted',
            why: 'Becomes substantive constitutional text',
          },
          {
            year: '1992',
            title: 'Hakim Khan judgment',
            why: 'Article 2A is part of the Constitution, not above it',
          },
          {
            year: '2010',
            title: '18th Amendment',
            why: 'Restores the word freely',
          },
        ]}
      />

      <NoteTable
        caption="One line memory aid"
        headers={['Year / stage', 'Remember this']}
        rows={[
          ['1949', 'Founding direction'],
          ['1956 / 1962 / 1973', 'Preamble = spirit'],
          ['1985', 'Article 2A = legal weight'],
          ['1992', 'Not above the whole Constitution'],
          ['2010', 'Freely restored'],
        ]}
      />

      <h2 id="mistakes">Mistakes to avoid</h2>
      <ul>
        <li>Memorising only 1949 and ignoring Article 2A.</li>
        <li>Saying Article 2A was always in the original 1973 text.</li>
        <li>Forgetting the freely issue.</li>
        <li>Claiming Article 2A cancels every other article.</li>
        <li>Writing a date list with no argument.</li>
      </ul>

      <h2 id="practice">Practice</h2>
      <div className="note-prompt">
        <p className="note-panel-label">Write from memory</p>
        <p>
          Question: The Objectives Resolution became far more important after 1985 than in 1949.
          Discuss.
        </p>
        <p className="note-panel-foot">
          Use the answer flow above. Then close the notes, revise from the tables only, and rewrite
          once more.
        </p>
      </div>

      <div className="note-cta">
        <p>When the idea is clear, lock the facts with MCQs.</p>
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
          1992 SC 595); FPSC Pakistan Affairs syllabus; Hamid Khan for deeper reading.
        </em>
      </p>
    </BlogPostShell>
  )
}
