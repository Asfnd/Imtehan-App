import { NoteTable, NoteTimeline } from '@/components/notes/NoteTable'

export function EighteenthAmendmentBody() {
  return (
    <>
      <h2 id="overview">Overview</h2>
      <p>
        <span className="drop-cap">T</span>
        he 18th Amendment is the major federalism reset of 2010. Parliament passed a large package
        that strengthened provincial autonomy and restored more parliamentary balance after the LFO
        and Seventeenth Amendment period.
      </p>
      <p>
        For exams, lead with substance, not slogans. The Concurrent Legislative List was abolished.
        Most subjects moved to the provinces, while criminal law, criminal procedure, and evidence
        stay shared. The Annex also regained the word freely. A high score needs both the gains and
        the capacity limits that followed.
      </p>

      <NoteTable
        caption="Core identity"
        headers={['Point', 'Detail']}
        rows={[
          ['Act', 'Constitution (Eighteenth Amendment) Act, 2010'],
          ['Assent', '19 April 2010'],
          ['Published', '20 April 2010'],
          ['Main theme', 'Provincial autonomy and parliamentary federalism'],
          ['Rights detail', 'Freely restored in Objectives Resolution Annex'],
        ]}
      />

      <h2 id="federalism">What changed in federalism</h2>
      <p>
        Before 2010, the Concurrent List kept many subjects shared between the centre and the
        provinces. After the amendment, that list was abolished and many subjects became provincial.
        Education and health are the examples students use most often.
      </p>
      <p>
        The province formerly called the North-West Frontier Province was renamed Khyber
        Pakhtunkhwa. Naming matters for MCQs. Autonomy and the Concurrent List matter more for
        written answers.
      </p>

      <NoteTable
        caption="Before and after (federalism)"
        headers={['Before 18th Amendment', 'After 18th Amendment']}
        narrowFirst={false}
        rows={[
          ['Concurrent List shared many subjects', 'Concurrent List abolished'],
          [
            'Heavy central legislative overlap',
            'Most former concurrent subjects become provincial',
          ],
          [
            'Shared leftovers unclear in student answers',
            'Criminal law, criminal procedure, and evidence stay shared',
          ],
          ['CCI weaker in practice', 'PM chairs CCI; meet at least once in 90 days'],
          ['No hard NFC floor in the same form', 'Later award share cannot fall below previous share'],
          ['NWFP name in Constitution', 'Renamed Khyber Pakhtunkhwa'],
          ['Annex freely missing since 1985 text', 'Freely restored in Annex'],
        ]}
      />

      <h2 id="balance">Balance your answer</h2>
      <p>
        Autonomy is real. So are the problems that came with it. Provinces needed money, trained
        staff, and coordination systems. A one-sided celebration sounds like a pamphlet. A short
        critique on capacity and fiscal stress sounds like a civil service answer.
      </p>

      <NoteTimeline
        caption="Link timeline"
        items={[
          {
            year: '1973',
            title: 'Base Constitution',
            why: 'Federal parliamentary framework',
          },
          {
            year: '1985',
            title: 'Article 2A',
            why: 'Objectives Resolution made substantive',
          },
          {
            year: '2010',
            title: '18th Amendment',
            why: 'Autonomy reset and freely restored',
          },
        ]}
      />
    </>
  )
}

export function EighteenthAmendmentTables() {
  return (
    <>
      <h2 id="revision-tables">Revision tables</h2>
      <NoteTable
        caption="Key facts"
        headers={['Point', 'Fact']}
        rows={[
          ['Year', '2010'],
          ['Assent', '19 April 2010'],
          ['Concurrent List', 'Abolished'],
          ['NWFP', 'Renamed Khyber Pakhtunkhwa'],
          ['Freely', 'Restored in Annex'],
          ['Main theme', 'Provincial autonomy'],
        ]}
      />
    </>
  )
}
