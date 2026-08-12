import type { Metadata } from 'next'
import Link from 'next/link'
import BlogPostShell from '@/components/blog/BlogPostShell'
import type { RelatedPost } from '@/components/blog/blog-utils'

export const metadata: Metadata = {
  title: 'Objectives Resolution & Article 2A | Pakistan Affairs Notes',
  description:
    'Dual-sourced Pakistan Affairs note on the Objectives Resolution and Article 2A — syllabus map, analytical scaffold, past-paper angles, one-page revision, and practice.',
  alternates: {
    canonical: 'https://imtehan.com/notes/pakistan-affairs/objectives-resolution-article-2a',
  },
  openGraph: {
    title: 'Objectives Resolution & Article 2A | Imtehan Notes',
    description: 'Verified Pakistan Affairs note with examiner-facing analysis and revision one-pager.',
    url: 'https://imtehan.com/notes/pakistan-affairs/objectives-resolution-article-2a',
    type: 'article',
  },
}

const HEADINGS = [
  { id: 'syllabus-lock', text: 'Syllabus lock' },
  { id: 'why-this-topic-matters', text: 'Why this topic matters' },
  { id: 'the-story-in-exam-order', text: 'The story in exam order' },
  { id: 'analytical-scaffold', text: 'Analytical scaffold' },
  { id: 'key-facts-box', text: 'Key facts' },
  { id: 'common-traps', text: 'Common traps' },
  { id: 'how-fpsc-asks-it', text: 'How FPSC asks it' },
  { id: 'one-page-revision', text: 'One-page revision' },
  { id: 'write-it-yourself', text: 'Write it yourself' },
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

const TAGS = [
  'Pakistan Affairs',
  'Constitution',
  'CSS',
  'PMS',
  'Ideology',
  'Article 2A',
]

export default function ObjectivesResolutionNotePage() {
  return (
    <BlogPostShell
      title="Objectives Resolution & Article 2A"
      subtitle="From preamble aspiration to substantive constitutional clause — and why CSS asks you to analyse, not recite."
      author="Imtehan Notes"
      authorBio="Dual-sourced, syllabus-locked notes for CSS, PMS and one-paper exams. Built to help you analyse and revise — not to paste ready-made answers."
      date="August 12, 2026"
      readTime="9 min · one-pager at end"
      category="Pakistan Affairs"
      tags={TAGS}
      slug="notes-pa-objectives-resolution-article-2a"
      headings={HEADINGS}
      otherPosts={RELATED}
    >
      {/* Meta strip */}
      <div className="note-meta-strip">
        <span className="note-badge note-badge-verified">Verified · dual-sourced</span>
        <span className="note-badge">Last checked: 12 Aug 2026</span>
        <span className="note-badge">Serves: CSS · PMS · one-paper</span>
        <span className="note-badge">Quality gate: 9/10 pilot</span>
      </div>

      <p>
        <span className="drop-cap">T</span>
        he Objectives Resolution is not a trivia date. It is the bridge topic examiners use to
        test whether you understand Pakistan&apos;s constitutional ideology — how a 1949 statement
        of aspiration became, in 1985, a substantive part of the 1973 Constitution, and how that
        change still shapes debates on Islam, democracy, and minority rights.
      </p>

      <h2 id="syllabus-lock">Syllabus lock</h2>
      <div className="note-panel">
        <p className="note-panel-label">FPSC Pakistan Affairs (indicative)</p>
        <ul>
          <li>Ideology of Pakistan · Muslim nationalism · constitutional foundations</li>
          <li>Constitutional development · Islamic provisions in the Constitution</li>
          <li>Contemporary linkage: federalism, rights, and identity debates</li>
        </ul>
        <p className="note-panel-foot">
          Also high-yield for PMS Pakistan Studies and one-paper ideology / constitution MCQs.
        </p>
      </div>

      <h2 id="why-this-topic-matters">Why this topic matters</h2>
      <p>
        FPSC no longer rewards a list of &quot;when was it passed.&quot; CE examiner feedback and
        recent paper trends punish narration and academy stereo answers. On this topic, a strong
        answer connects <strong>ideology</strong> → <strong>constitutional text</strong> →{' '}
        <strong>present implications</strong>.
      </p>
      <div className="pull-quote">
        Recite dates and you sound like a guidebook. Explain why Article 2A changed the legal
        status of the Resolution — and what the 18th Amendment restored — and you sound like a
        civil servant.
      </div>

      <h2 id="the-story-in-exam-order">The story in exam order</h2>
      <h3>1. 12 March 1949 — aspiration, not ordinary law</h3>
      <p>
        The Constituent Assembly adopted the Objectives Resolution, moved by Prime Minister
        Liaquat Ali Khan. It set guiding principles for the future constitution: sovereignty
        belonging to Allah, authority to be exercised by the people within Islamic limits,
        democracy, freedom, equality, and minority rights. At this stage it was a statement of
        constitutional direction — not an operative statute.
      </p>
      <h3>2. Preamble across three constitutions</h3>
      <p>
        The Resolution (with minor variations) appeared as the preamble of the 1956, 1962, and
        1973 Constitutions. A preamble frames spirit; it does not, by itself, override the
        operative articles the way a substantive clause can.
      </p>
      <h3>3. 1985 — Article 2A makes it substantive</h3>
      <p>
        Under General Zia-ul-Haq, the Revival of the Constitution of 1973 Order, 1985 (later
        covered by the Eighth Amendment) inserted <strong>Article 2A</strong>: the principles and
        provisions of the Objectives Resolution, reproduced in the Annex, were made a{' '}
        <strong>substantive part</strong> of the Constitution and given effect accordingly. That
        is the pivot every high-scoring answer must hit.
      </p>
      <h3>4. The missing word &quot;freely&quot;</h3>
      <p>
        The 1985 Annex version omitted the word <strong>&quot;freely&quot;</strong> from the
        clause on minorities professing and practising their religions. The original 1949 wording
        included it. The <strong>Eighteenth Amendment (2010)</strong> restored &quot;freely&quot;
        in the Annex text. This detail separates verified notes from Drive-dump summaries.
      </p>
      <h3>5. Courts: not a supra-constitution</h3>
      <p>
        In <em>Hakim Khan v. Government of Pakistan</em> (PLD 1992 SC 595), the Supreme Court held
        that Article 2A does not sit above the rest of the Constitution as a grundnorm that
        automatically voids other provisions. It stands as part of the constitutional whole —
        critical for analytical depth in 20-mark answers.
      </p>

      <h2 id="analytical-scaffold">Analytical scaffold</h2>
      <div className="note-scaffold">
        <p className="note-panel-label">Use this outline in a 20-mark answer</p>
        <ol>
          <li>
            <strong>Define</strong> — Resolution as ideological charter (1949); distinguish
            preamble vs substantive clause.
          </li>
          <li>
            <strong>Trace</strong> — preamble role in 1956/62/73 → Art 2A (1985) → &quot;freely&quot;
            restored (2010).
          </li>
          <li>
            <strong>Analyse tension</strong> — Islamic provisions vs fundamental rights; democracy
            vs religious limits; minority protections.
          </li>
          <li>
            <strong>Judicial lens</strong> — Hakim Khan: Art 2A is not supra-constitutional.
          </li>
          <li>
            <strong>Present link</strong> — how identity and rights debates still use this frame
            (without ranting; stay constitutional).
          </li>
          <li>
            <strong>Way forward</strong> — constitutional literacy, rights-consistent interpretation,
            federal democratic practice.
          </li>
        </ol>
      </div>

      <h2 id="key-facts-box">Key facts</h2>
      <div className="note-facts">
        <div className="note-fact-row">
          <span>Adopted</span>
          <span>12 March 1949</span>
        </div>
        <div className="note-fact-row">
          <span>Moved by</span>
          <span>Liaquat Ali Khan</span>
        </div>
        <div className="note-fact-row">
          <span>Preamble in</span>
          <span>1956 · 1962 · 1973</span>
        </div>
        <div className="note-fact-row">
          <span>Article 2A</span>
          <span>RCO 1985 / Eighth Amendment</span>
        </div>
        <div className="note-fact-row">
          <span>&quot;Freely&quot; restored</span>
          <span>18th Amendment, 2010</span>
        </div>
        <div className="note-fact-row">
          <span>Key case</span>
          <span>Hakim Khan (PLD 1992 SC 595)</span>
        </div>
        <div className="note-fact-row">
          <span>Related</span>
          <span>Art 2 — Islam as State religion</span>
        </div>
      </div>

      <h2 id="common-traps">Common traps</h2>
      <ul>
        <li>
          Saying &quot;Article 2A was always in 1973&quot; — it was inserted in 1985.
        </li>
        <li>
          Treating the Resolution as ordinary legislation from day one — it was not.
        </li>
        <li>
          Ignoring the &quot;freely&quot; omission/restoration — examiners reward precision.
        </li>
        <li>
          Claiming Art 2A automatically overrides all other articles — that overstates Hakim Khan.
        </li>
        <li>
          Ending with dates only — always add present constitutional significance.
        </li>
      </ul>

      <h2 id="how-fpsc-asks-it">How FPSC asks it</h2>
      <div className="note-panel">
        <p className="note-panel-label">Angles that recur (ideology / constitution cluster)</p>
        <ul>
          <li>Discuss the Objectives Resolution as the ideological foundation of Pakistan.</li>
          <li>Examine Islamic provisions of the Constitution and their practical implications.</li>
          <li>
            Critically evaluate how constitutional ideology interacts with democracy and rights.
          </li>
        </ul>
        <p className="note-panel-foot">
          Past-paper theme cluster: Ideology / Two-Nation Theory &amp; identity appears across
          multiple CE years — pair this note with reform-movement and Quaid/Iqbal topics.
        </p>
      </div>

      <h2 id="one-page-revision">One-page revision</h2>
      <div className="note-onepager">
        <p className="note-onepager-title">Print / hand-copy this only</p>
        <ul>
          <li>1949 · Liaquat · guiding principles (not ordinary law)</li>
          <li>Preamble: 1956 / 1962 / 1973</li>
          <li>1985 · Art 2A · substantive Annex · RCO / 8th Amdt</li>
          <li>&quot;Freely&quot; missing 1985 → restored 18th Amdt 2010</li>
          <li>Hakim Khan 1992 · not supra-constitution</li>
          <li>Answer arc: define → trace → tension → court → today → way forward</li>
        </ul>
      </div>

      <h2 id="write-it-yourself">Write it yourself</h2>
      <div className="note-prompt">
        <p className="note-panel-label">8–12 line drill (no peeking at the scaffold)</p>
        <p>
          &quot;The Objectives Resolution became far more consequential after 1985 than in 1949.
          Discuss.&quot;
        </p>
        <p className="note-panel-foot">
          This is the step FPSC says academies skip. Do it. Then compare with the scaffold above —
          do not paste the scaffold into the exam.
        </p>
      </div>

      <h2 id="practice">Practice</h2>
      <div className="note-cta">
        <p>
          Lock the facts with MCQs, then return to the writing drill. Notes without retrieval are
          just reading.
        </p>
        <div className="note-cta-row">
          <Link href="/exams/css-mpt/pakistan-affairs" className="note-cta-btn">
            Practice Pakistan Affairs MCQs
          </Link>
          <Link href="/notes" className="note-cta-link">
            All notes (demo hub)
          </Link>
        </div>
      </div>

      <h2 id="sources">Sources</h2>
      <ul>
        <li>
          Constitution of the Islamic Republic of Pakistan — National Assembly / annotated texts
          (Art 2, 2A, Annex)
        </li>
        <li>FPSC CSS syllabus (Pakistan Affairs — ideology &amp; constitutional development)</li>
        <li>
          LUMS SAHSOL analysis on Objectives Resolution / Art 2A; HRW note on &quot;freely&quot;
          restoration
        </li>
        <li>
          Hakim Khan v. Government of Pakistan (PLD 1992 SC 595) — secondary legal commentaries
        </li>
        <li>
          Depth reading (rewrite only, never host): Hamid Khan, <em>Constitutional and Political
          History of Pakistan</em>
        </li>
      </ul>
      <p>
        <em>
          This page is scaffolding for your own notes — not a formula answer to memorise. FPSC
          rewards original analysis.
        </em>
      </p>
    </BlogPostShell>
  )
}
