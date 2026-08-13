import { NoteTable, NoteTimeline } from '@/components/notes/NoteTable'

export function Constitution1973Body() {
  return (
    <>
      <h2 id="overview">Overview</h2>
      <p>
        <span className="drop-cap">T</span>
        he 1973 Constitution is Pakistan’s lasting constitutional text. It was passed by the
        National Assembly on 10 April 1973 and came into force on 14 August 1973. It rebuilt a
        parliamentary federal republic after the 1971 crisis.
      </p>
      <p>
        For the exam, do not stop at the date. Examiners want to know why this document lasted when
        the 1956 and 1962 Constitutions did not, and how its design still shapes federalism, rights,
        and amendment politics.
      </p>

      <NoteTable
        caption="Core identity"
        headers={['Point', 'Detail']}
        rows={[
          ['Passed', '10 April 1973 (National Assembly)'],
          ['Authenticated', '12 April 1973'],
          ['Enforced', '14 August 1973'],
          ['System', 'Parliamentary federal republic'],
          ['Rights', 'Fundamental Rights in Articles 8 to 28'],
        ]}
      />

      <h2 id="why-it-lasted">Why it lasted longer</h2>
      <p>
        The 1956 Constitution was Pakistan’s first constitution. It was parliamentary, but it did
        not survive the 1958 martial law. The 1962 Constitution created a presidential system under
        Ayub Khan and ended in 1969.
      </p>
      <p>
        The 1973 text was negotiated in an elected Assembly after 1971. Parties and provinces could
        claim ownership of a parliamentary bargain. Later, when martial law put it in abeyance after
        July 1977, politics revived the same Constitution in 1985 instead of writing a fourth one.
        That continuity is a central exam point.
      </p>

      <NoteTable
        caption="Three constitutions at a glance"
        headers={['Constitution', 'System', 'Outcome']}
        narrowFirst={false}
        rows={[
          ['1956', 'Parliamentary', 'Ended with 1958 martial law'],
          ['1962', 'Presidential (Ayub)', 'Ended in 1969'],
          ['1973', 'Parliamentary federal', 'Held in abeyance, then revived; still the base text'],
        ]}
      />

      <h2 id="design">What the design did</h2>
      <p>
        The Constitution set a federal structure with a parliamentary executive and a bicameral
        Majlis-e-Shoora. It also placed Fundamental Rights in Articles 8 to 28. Those rights give
        courts and citizens a constitutional language for liberty and equality claims.
      </p>
      <p>
        Later amendments changed many details. Article 2A (1985) and the 18th Amendment (2010) are
        two of the biggest later layers. A strong answer keeps the 1973 core clear, then adds those
        layers when the question asks for them.
      </p>

      <NoteTimeline
        caption="Timeline to memorise"
        items={[
          {
            year: '1956',
            title: 'First Constitution',
            why: 'Parliamentary start, short life',
          },
          {
            year: '1962',
            title: 'Ayub Constitution',
            why: 'Presidential model, ended 1969',
          },
          {
            year: '1973',
            title: 'Current base Constitution',
            why: 'Passed 10 April, enforced 14 August',
          },
          {
            year: '1977',
            title: 'Held in abeyance',
            why: 'Martial law interrupted operation',
          },
          {
            year: '1985',
            title: 'Revival',
            why: '1973 text restored in stages, not replaced',
          },
        ]}
      />
    </>
  )
}

export function Constitution1973Tables() {
  return (
    <>
      <h2 id="revision-tables">Revision tables</h2>
      <NoteTable
        caption="Key facts"
        headers={['Point', 'Fact']}
        rows={[
          ['Passed', '10 April 1973'],
          ['Enforced', '14 August 1973'],
          ['System', 'Parliamentary federal'],
          ['Houses', 'National Assembly and Senate'],
          ['Rights', 'Articles 8 to 28'],
          ['Article 6', 'High treason for attacking the Constitution'],
          ['1956 end', '1958 martial law'],
          ['1962 system', 'Presidential'],
          ['Revival', '1985'],
        ]}
      />
    </>
  )
}
