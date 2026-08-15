import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked (standard DBMS / one-paper computer teaching):
 * - Keys: primary, candidate, foreign, composite, alternate (classic definitions)
 * - Normalization: 1NF, 2NF, 3NF purpose (reduce redundancy and update anomalies)
 * - DBMS vs file system advantages at concept level
 * Avoid deep SQL dialect specifics unless asked; keep exam-safe basics
 */
export const DATABASE_BASICS_SQL_KIT: NoteKitData = {
  id: 'database-basics-sql',
  title: 'Database Basics and SQL Essentials',
  subtitle:
    'Keys, normalization (1NF-3NF), and basic SQL idea for one-paper computer and IT exams.',
  syllabusTags: [
    'Basic computer',
    'Databases',
    'SQL',
    'Normalization',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper / PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'Primary key vs foreign key',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: '1NF, 2NF, 3NF definitions',
      frequency: 'high',
    },
    {
      year: 'FPSC / CSS MPT pattern',
      directive: 'MCQ fact',
      angle: 'Candidate key and composite key',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Purpose of DBMS and basic SELECT idea',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Database: organised collection of related data. DBMS: software that stores, retrieves, and manages databases (examples in teaching: MySQL, Oracle, SQL Server at name level).',
    'Table/relation: rows (tuples) and columns (attributes). Each row should be uniquely identifiable.',
    'Primary key: unique identifier for each row; not null in standard teaching. Candidate keys: all columns/sets that can uniquely identify rows. One candidate is chosen as primary; others are alternate keys.',
    'Composite key: primary (or candidate) key made of two or more columns. Foreign key: column(s) referencing a primary key in another table to enforce relationships.',
    'SQL (Structured Query Language): language to define and query relational data. SELECT retrieves rows; WHERE filters; JOIN combines related tables (concept level).',
    'Normalization: organise tables to reduce redundancy and update/insert/delete anomalies.',
    '1NF: atomic values; no repeating groups in a cell. 2NF: 1NF + no partial dependency of non-key attributes on part of a composite key. 3NF: 2NF + no transitive dependency of non-key attributes on other non-key attributes.',
    'Exam tip: normalization improves integrity; over-normalization can add joins. For MCQs, match the NF definition precisely.',
  ],
  answerSteps: [
    'Define table, key, and relationship before naming key types.',
    'For key MCQs, test uniqueness and reference role (primary vs foreign).',
    'For normalization, state the goal, then the NF rule asked.',
    'Use a tiny example mentally (StudentID; CourseID) when composite/foreign keys appear.',
    'If SQL is asked, give SELECT/WHERE/JOIN purpose without inventing vendor syntax quirks.',
  ],
  questionVariants: [
    'Differentiate primary key and foreign key.',
    'Explain 1NF, 2NF, and 3NF briefly.',
    'What is a candidate key? How does it relate to a primary key?',
    'Why is normalization used in database design?',
  ],
  citations: [
    {
      label: 'Primary key',
      text: 'Uniquely identifies each row and is not null in standard teaching.',
    },
    {
      label: 'Foreign key',
      text: 'References a primary key in another table to link relations.',
    },
    {
      label: '1NF',
      text: 'Atomic attribute values; no repeating groups.',
    },
    {
      label: 'Normalization goal',
      text: 'Reduce redundancy and anomalies while preserving data meaning.',
    },
  ],
  flashcards: [
    {
      prompt: 'What is a primary key?',
      answer: 'Unique, non-null identifier for each row in a table',
    },
    {
      prompt: 'What is a foreign key?',
      answer: 'Column(s) referencing a primary key in another table',
    },
    {
      prompt: 'Candidate key vs primary key?',
      answer: 'All possible unique identifiers; one chosen as primary',
    },
    {
      prompt: 'What is a composite key?',
      answer: 'Key made of two or more columns together',
    },
    {
      prompt: 'What does SQL stand for?',
      answer: 'Structured Query Language',
    },
    {
      prompt: 'What does SELECT do?',
      answer: 'Retrieves rows from tables',
    },
    {
      prompt: 'State 1NF in one line.',
      answer: 'Atomic values; no repeating groups',
    },
    {
      prompt: 'State 2NF in one line.',
      answer: '1NF plus no partial dependency on part of a composite key',
    },
    {
      prompt: 'State 3NF in one line.',
      answer: '2NF plus no transitive dependency via non-key attributes',
    },
    {
      prompt: 'Why normalize?',
      answer: 'Reduce redundancy and insert/update/delete anomalies',
    },
  ],
  mistakes: [
    {
      trap: 'Saying foreign key must be unique.',
      correct: 'Foreign key values may repeat; they reference another table.',
    },
    {
      trap: 'Confusing 2NF with 3NF.',
      correct: '2NF targets partial dependency; 3NF targets transitive dependency.',
    },
    {
      trap: 'Claiming primary key can be null.',
      correct: 'Standard teaching: primary key is not null.',
    },
    {
      trap: 'Treating SQL as only SELECT.',
      correct: 'SQL also covers definition and modification; exams often test SELECT basics.',
    },
    {
      trap: 'Memorising NF numbers without the goal.',
      correct: 'Always link to redundancy and anomalies.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Key types table with one example each.' },
    { day: 'Day 2', task: '1NF-3NF definitions and contrasts.' },
    { day: 'Day 3', task: 'SQL SELECT/WHERE/JOIN one-liners.' },
    { day: 'Day 4', task: 'Flashcards.' },
    { day: 'Day 5', task: '20 key/normalization MCQs.' },
    { day: 'Day 6', task: 'Draw a two-table PK-FK sketch.' },
    { day: 'Day 7', task: 'Recite one-pager.' },
  ],
  sourcesLine:
    'Sources: standard DBMS fundamentals and one-paper computer notes on keys, normalization, and introductory SQL. Keep definitions mainstream.',
}
