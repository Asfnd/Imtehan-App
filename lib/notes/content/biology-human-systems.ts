import type { NoteKitData } from '@/lib/notes/types'

/**
 * Cross-checked:
 * - Digestive: mouth-esophagus-stomach-small intestine-large intestine; liver/pancreas accessory
 * - Circulatory: heart chambers, arteries away / veins toward, RBC/WBC/platelets, pulmonary vs systemic
 * - Nervous: CNS (brain+spinal cord) and PNS; neuron as unit; synapse
 * - Respiratory: nose/pharynx/larynx/trachea/bronchi/lungs; alveoli gas exchange; diaphragm
 * - Everyday science one-paper facts; avoid inventing clinical dosages
 */
export const BIOLOGY_HUMAN_SYSTEMS_KIT: NoteKitData = {
  id: 'biology-human-systems',
  title: 'Human Body Systems (Digestive, Circulatory, Nervous, Respiratory)',
  subtitle:
    'Everyday science map of four high-yield systems for one-paper and CSS MPT science MCQs.',
  syllabusTags: [
    'Everyday science',
    'Human body',
    'Biology basics',
    'One-paper science',
  ],
  updated: '15 Aug 2026',
  pastPapers: [
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'Organs of digestion and absorption site',
      frequency: 'high',
    },
    {
      year: 'PPSC / NTS',
      directive: 'MCQ fact',
      angle: 'Heart chambers, arteries vs veins, blood cells',
      frequency: 'high',
    },
    {
      year: 'One-paper',
      directive: 'MCQ fact',
      angle: 'CNS vs PNS; alveoli gas exchange',
      frequency: 'high',
    },
    {
      year: 'CSS MPT',
      directive: 'MCQ fact',
      angle: 'Diaphragm, trachea, neuron basics',
      frequency: 'medium',
    },
  ],
  onePager: [
    'Digestive path: mouth (mechanical + salivary amylase) to esophagus to stomach (acid + pepsin) to small intestine (main absorption) to large intestine (water absorption) to rectum/anus.',
    'Accessory organs: liver (bile for fat emulsification), gallbladder (stores bile), pancreas (digestive enzymes and bicarbonate; also insulin/glucagon endocrine role).',
    'Circulatory: four-chambered heart (RA, RV, LA, LV). Arteries carry blood away from the heart; veins carry blood toward the heart. Capillaries are exchange vessels.',
    'Pulmonary circuit: right heart to lungs to left heart. Systemic circuit: left heart to body to right heart. Blood: RBC (oxygen via haemoglobin), WBC (defence), platelets (clotting), plasma (liquid).',
    'Nervous system: CNS = brain + spinal cord. PNS = nerves outside CNS. Neuron is the functional unit; synapse is the junction for signal transfer.',
    'Respiratory path: nose/mouth to pharynx to larynx to trachea to bronchi to bronchioles to alveoli. Alveoli: site of O2-CO2 exchange with blood.',
    'Breathing mechanics: diaphragm and intercostal muscles change thoracic volume. Inhalation increases volume (pressure falls); exhalation reverses.',
    'Exam links: vitamins/hormones kit for deficiencies and endocrine overlaps; do not invent drug doses or rare disease trivia.',
  ],
  answerSteps: [
    'If the question names a system, open with its primary function in one line.',
    'Give the organ sequence (digestive or respiratory) or circuit map (heart/blood).',
    'Add the key exchange or control fact (absorption site, alveoli, synapse, artery/vein rule).',
    'Name one accessory or supporting structure (liver/pancreas, diaphragm, haemoglobin).',
    'Close with a common trap correction if MCQ-style.',
  ],
  questionVariants: [
    'Trace the path of food through the human digestive system.',
    'Differentiate pulmonary and systemic circulation.',
    'Where does gaseous exchange occur in the lungs? Explain briefly.',
    'Differentiate the central and peripheral nervous systems.',
  ],
  citations: [
    {
      label: 'Absorption',
      text: 'Most nutrient absorption occurs in the small intestine.',
    },
    {
      label: 'Arteries vs veins',
      text: 'Arteries carry blood away from the heart; veins carry blood toward the heart.',
    },
    {
      label: 'Gas exchange',
      text: 'Alveoli are the primary site of oxygen and carbon dioxide exchange.',
    },
    {
      label: 'CNS',
      text: 'Central nervous system comprises the brain and spinal cord.',
    },
  ],
  flashcards: [
    { prompt: 'Main site of nutrient absorption?', answer: 'Small intestine' },
    { prompt: 'Enzyme starting starch digestion in the mouth?', answer: 'Salivary amylase' },
    { prompt: 'Bile is produced by which organ?', answer: 'Liver' },
    { prompt: 'Arteries carry blood in which direction?', answer: 'Away from the heart' },
    { prompt: 'How many chambers in the human heart?', answer: 'Four' },
    { prompt: 'RBC main function?', answer: 'Carry oxygen (haemoglobin)' },
    { prompt: 'CNS consists of?', answer: 'Brain and spinal cord' },
    { prompt: 'Functional unit of the nervous system?', answer: 'Neuron' },
    { prompt: 'Site of gas exchange in lungs?', answer: 'Alveoli' },
    { prompt: 'Main muscle of quiet breathing?', answer: 'Diaphragm' },
  ],
  mistakes: [
    {
      trap: 'Saying the large intestine is the main nutrient absorption site.',
      correct: 'Small intestine absorbs most nutrients. Large intestine mainly absorbs water and forms faeces.',
    },
    {
      trap: 'Saying all arteries carry oxygenated blood.',
      correct: 'Direction defines artery. Pulmonary arteries carry deoxygenated blood to the lungs.',
    },
    {
      trap: 'Placing gas exchange in the trachea.',
      correct: 'Gas exchange occurs in the alveoli.',
    },
    {
      trap: 'Calling the spinal cord part of the PNS.',
      correct: 'Spinal cord is CNS. Spinal nerves belong to PNS.',
    },
    {
      trap: 'Confusing pepsin with amylase.',
      correct: 'Amylase acts on starch (starts in mouth). Pepsin acts on proteins in the stomach.',
    },
  ],
  revisionPath: [
    { day: 'Day 1', task: 'Digestive path + liver/pancreas roles.' },
    { day: 'Day 2', task: 'Heart chambers + artery/vein + blood cells.' },
    { day: 'Day 3', task: 'Pulmonary vs systemic circuits.' },
    { day: 'Day 4', task: 'CNS/PNS/neuron + respiratory path to alveoli.' },
    { day: 'Day 5', task: 'Drill flashcards across all four systems.' },
    { day: 'Day 6', task: 'Mistake-trap quiz (arteries, absorption, alveoli).' },
    { day: 'Day 7', task: 'One-pager only.' },
  ],
  sourcesLine:
    'Sources: standard intermediate biology / everyday science human physiology outlines. Pair with vitamins-hormones notes for deficiency MCQs.',
}
