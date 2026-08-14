import Link from 'next/link'
import type {
  CitationEntry,
  FlashcardAtom,
  MistakeTrap,
  NoteKitData,
  NoteTrack,
  PastPaperEntry,
  RevisionDay,
} from '@/lib/notes/types'
import { NoteTable, NoteTimeline } from '@/components/notes/NoteTable'
import {
  Constitution1973Body,
  Constitution1973Tables,
} from '@/components/notes/bodies/Constitution1973Body'
import {
  EighteenthAmendmentBody,
  EighteenthAmendmentTables,
} from '@/components/notes/bodies/EighteenthAmendmentBody'
import {
  LahoreResolutionBody,
  LahoreResolutionTables,
} from '@/components/notes/bodies/LahoreResolutionBody'

export function NoteMetaStrip({
  track,
  examLabel,
  updated,
  syllabusTags,
}: {
  track: NoteTrack
  examLabel: string
  updated: string
  syllabusTags: string[]
}) {
  return (
    <div className="note-meta-strip">
      <span className="note-badge note-badge-verified">Verified</span>
      <span className="note-badge">{examLabel}</span>
      <span className="note-badge">
        {track === 'written' ? 'Written focus' : 'Fact focus'}
      </span>
      <span className="note-badge">Updated {updated}</span>
      {syllabusTags.map((tag) => (
        <span className="note-badge" key={tag}>
          {tag}
        </span>
      ))}
    </div>
  )
}

export function PastPaperMap({ items }: { items: PastPaperEntry[] }) {
  return (
    <NoteTable
      caption="Past-paper map (how this topic is asked)"
      headers={['Context', 'Directive', 'Angle', 'Yield']}
      narrowFirst={false}
      rows={items.map((p) => [p.year, p.directive, p.angle, p.frequency])}
    />
  )
}

export function OnePager({ bullets }: { bullets: string[] }) {
  return (
    <div className="note-onepager" id="one-pager">
      <p className="note-onepager-title">One-pager (exam week)</p>
      <ul>
        {bullets.map((b) => (
          <li key={b.slice(0, 40)}>{b}</li>
        ))}
      </ul>
      <p className="note-panel-foot">Print or save this block. Revise from here in the last days.</p>
    </div>
  )
}

export function CitationBank({ items }: { items: CitationEntry[] }) {
  return (
    <div className="note-panel" id="citations">
      <p className="note-panel-label">Citation bank (drop into answers)</p>
      <div className="note-cite-list">
        {items.map((c) => (
          <div className="note-cite-row" key={c.label}>
            <p className="note-cite-label">{c.label}</p>
            <p className="note-cite-text">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FlashcardAtoms({ items }: { items: FlashcardAtom[] }) {
  return (
    <div className="note-panel" id="flashcards">
      <p className="note-panel-label">Fact cards (cover the answer, then check)</p>
      <div className="note-flash-list">
        {items.map((card) => (
          <details className="note-flash" key={card.prompt}>
            <summary>{card.prompt}</summary>
            <p>{card.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}

export function AnswerScaffold({ steps }: { steps: string[] }) {
  return (
    <div className="note-scaffold" id="answer-flow">
      <p className="note-panel-label">Answer flow (skeleton, not a model essay)</p>
      <ol>
        {steps.map((step) => (
          <li key={step.slice(0, 48)}>{step}</li>
        ))}
      </ol>
    </div>
  )
}

export function QuestionVariants({ prompts }: { prompts: string[] }) {
  return (
    <div className="note-prompt" id="variants">
      <p className="note-panel-label">Question variants (pick one and write timed)</p>
      <ol className="note-variant-list">
        {prompts.map((q) => (
          <li key={q.slice(0, 48)}>{q}</li>
        ))}
      </ol>
      <p className="note-panel-foot">Aim for 30 to 40 minutes. Use the answer flow. Then close the notes.</p>
    </div>
  )
}

export function MistakeTraps({ items }: { items: MistakeTrap[] }) {
  return (
    <NoteTable
      caption="Mistakes that cost marks"
      headers={['Trap', 'Correct approach']}
      narrowFirst={false}
      rows={items.map((m) => [m.trap, m.correct])}
    />
  )
}

export function RevisionPath({ items }: { items: RevisionDay[] }) {
  return (
    <div className="note-panel" id="revision-path">
      <p className="note-panel-label">7-day revision path</p>
      <div className="note-rev-list">
        {items.map((d) => (
          <div className="note-rev-row" key={d.day}>
            <span>{d.day}</span>
            <span>{d.task}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function NotePracticeCta({
  examSlug,
  subjectSlug,
  hasMcq,
  writingHref,
}: {
  examSlug: string
  subjectSlug: string
  hasMcq: boolean
  writingHref?: string | null
}) {
  return (
    <div className="note-cta">
      <p>When the idea is clear, lock the facts with practice.</p>
      <div className="note-cta-row">
        {hasMcq ? (
          <Link href={`/exams/${examSlug}/${subjectSlug}`} className="note-cta-btn">
            Practice MCQs for this exam
          </Link>
        ) : null}
        {writingHref ? (
          <Link href={writingHref} className="note-cta-btn">
            Writing practice
          </Link>
        ) : null}
        <Link href={`/notes/${examSlug}/${subjectSlug}`} className="note-cta-link">
          Back to subject topics
        </Link>
      </div>
    </div>
  )
}

/** Shared understand layer for Objectives Resolution (used by the kit page). */
export function ObjectivesResolutionBody() {
  return (
    <>
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
          ['Authority as trust', 'People hold power, but not as unlimited personal power'],
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
    </>
  )
}

export function KitRevisionTables() {
  return (
    <>
      <h2 id="revision-tables">Revision tables</h2>
      <p>After you understand the notes, revise from these tables and the one-pager.</p>
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
    </>
  )
}

export function OverviewFromKit({ kit }: { kit: NoteKitData }) {
  return (
    <div className="note-panel" id="overview">
      <p className="note-panel-label">Overview</p>
      <ul className="note-overview-list">
        {kit.onePager.map((line) => (
          <li key={line.slice(0, 48)}>{line}</li>
        ))}
      </ul>
      <p className="note-panel-foot">{kit.subtitle}</p>
    </div>
  )
}

export function renderKitByContentId(contentId: string) {
  if (contentId === 'objectives-resolution-article-2a') {
    return { Body: ObjectivesResolutionBody, Tables: KitRevisionTables }
  }
  if (contentId === 'constitution-1973') {
    return { Body: Constitution1973Body, Tables: Constitution1973Tables }
  }
  if (contentId === 'eighteenth-amendment') {
    return { Body: EighteenthAmendmentBody, Tables: EighteenthAmendmentTables }
  }
  if (contentId === 'lahore-resolution-1940') {
    return { Body: LahoreResolutionBody, Tables: LahoreResolutionTables }
  }
  return null
}

export function NoteKitShell({
  kit,
  track,
  examLabel,
  examSlug,
  subjectSlug,
  hasMcq,
  writingHref,
}: {
  kit: NoteKitData
  track: NoteTrack
  examLabel: string
  examSlug: string
  subjectSlug: string
  hasMcq: boolean
  writingHref?: string | null
}) {
  const parts = renderKitByContentId(kit.id)
  const factFirst = track === 'fact'

  return (
    <>
      <NoteMetaStrip
        track={track}
        examLabel={examLabel}
        updated={kit.updated}
        syllabusTags={kit.syllabusTags}
      />

      {factFirst ? (
        <>
          <OnePager bullets={kit.onePager} />
          <PastPaperMap items={kit.pastPapers} />
          <FlashcardAtoms items={kit.flashcards} />
          {parts ? <parts.Body /> : null}
          {parts ? <parts.Tables /> : null}
          <CitationBank items={kit.citations} />
          <AnswerScaffold steps={kit.answerSteps} />
          <QuestionVariants prompts={kit.questionVariants} />
          <MistakeTraps items={kit.mistakes} />
          <RevisionPath items={kit.revisionPath} />
        </>
      ) : (
        <>
          <PastPaperMap items={kit.pastPapers} />
          {parts ? <parts.Body /> : <OverviewFromKit kit={kit} />}
          <AnswerScaffold steps={kit.answerSteps} />
          <QuestionVariants prompts={kit.questionVariants} />
          <CitationBank items={kit.citations} />
          <OnePager bullets={kit.onePager} />
          {parts ? <parts.Tables /> : null}
          <FlashcardAtoms items={kit.flashcards} />
          <MistakeTraps items={kit.mistakes} />
          <RevisionPath items={kit.revisionPath} />
        </>
      )}

      <NotePracticeCta
        examSlug={examSlug}
        subjectSlug={subjectSlug}
        hasMcq={hasMcq}
        writingHref={writingHref}
      />

      <p>
        <em>{kit.sourcesLine}</em>
      </p>
    </>
  )
}
