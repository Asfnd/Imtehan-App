import { NoteTable, NoteTimeline } from '@/components/notes/NoteTable'

export function LahoreResolutionBody() {
  return (
    <>
      <h2 id="overview">Overview</h2>
      <p>
        <span className="drop-cap">T</span>
        he Lahore Resolution of 23 March 1940 is a turning point in the Pakistan Movement. The
        All-India Muslim League adopted it at Lahore. A. K. Fazlul Huq moved it.
      </p>
      <p>
        The Resolution asked for independent states in contiguous Muslim-majority regions of the
        north-western and eastern zones of British India. The text does not use the word Pakistan.
        That later popular name is why exams also call it the Pakistan Resolution.
      </p>

      <NoteTable
        caption="Core identity"
        headers={['Point', 'Detail']}
        rows={[
          ['Date', '23 March 1940'],
          ['Place', 'Lahore'],
          ['Party', 'All-India Muslim League'],
          ['Moved by', 'A. K. Fazlul Huq'],
          ['Also called', 'Pakistan Resolution'],
        ]}
      />

      <h2 id="what-it-said">What it said</h2>
      <p>
        Read the demand carefully. It spoke of independent states for contiguous Muslim-majority
        units. It did not draw today’s provincial map in one line. Later politics, elections, and
        partition negotiations shaped the final form of Pakistan.
      </p>
      <p>
        Mentioning that careful reading is useful. Examiners reward students who avoid mythology and
        still explain why 1940 mattered for League mobilisation.
      </p>

      <NoteTable
        caption="Careful reading"
        headers={['Weak claim', 'Stronger claim']}
        narrowFirst={false}
        rows={[
          [
            '1940 already fixed modern Pakistan’s borders',
            '1940 set a territorial principle for Muslim-majority regions',
          ],
          [
            'The text named Pakistan',
            'The text does not use the word Pakistan',
          ],
          [
            'Jinnah moved the Resolution',
            'Fazlul Huq moved it. Jinnah led League politics',
          ],
          [
            'Iqbal drafted the 1940 Resolution',
            'Iqbal’s 1930 Allahabad Address is background. He died in 1938',
          ],
        ]}
      />

      <h2 id="why-it-mattered">Why it mattered</h2>
      <p>
        Before 1940, much Muslim politics still argued about safeguards inside a future united
        India. After 1940, the League had a clearer territorial goal for mass campaigning. That
        change helps explain the intensity of League politics in the 1940s.
      </p>

      <NoteTimeline
        caption="Place in the movement"
        items={[
          {
            year: '1930',
            title: 'Allahabad Address context',
            why: 'Earlier intellectual push toward Muslim political destiny',
          },
          {
            year: '1940',
            title: 'Lahore Resolution',
            why: 'Territorial demand adopted by the League',
          },
          {
            year: '1946',
            title: 'League electoral strength',
            why: 'Mass politics after a clearer goal',
          },
          {
            year: '1947',
            title: 'Independence and partition',
            why: 'Final outcome after later bargaining',
          },
        ]}
      />
    </>
  )
}

export function LahoreResolutionTables() {
  return (
    <>
      <h2 id="revision-tables">Revision tables</h2>
      <NoteTable
        caption="Key facts"
        headers={['Point', 'Fact']}
        rows={[
          ['Date', '23 March 1940'],
          ['Place', 'Lahore'],
          ['Party', 'All-India Muslim League'],
          ['Mover', 'A. K. Fazlul Huq'],
          ['Demand', 'Independent states in Muslim-majority contiguous zones'],
          ['Careful point', 'Original wording used states (plural)'],
        ]}
      />
    </>
  )
}
