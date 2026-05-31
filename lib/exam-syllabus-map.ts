/**
 * Official syllabus topic map for all 223 exams.
 *
 * Structure:
 *   TOPICS_BY_DB_TABLE  — baseline topics per shared MCQ table (used when no exam override exists)
 *   EXAM_TOPIC_OVERRIDES — per-exam topic lists keyed by dbTable, replacing the baseline for that exam
 *
 * Generation script usage:
 *   const topics = getTopicsForExamSection(examSlug, dbTable)
 */

// ─────────────────────────────────────────────────────────────────────────────
// BASELINE TOPICS PER DB TABLE
// ─────────────────────────────────────────────────────────────────────────────
export const TOPICS_BY_DB_TABLE: Record<string, string[]> = {

  english: [
    'Parts of speech (nouns, pronouns, verbs, adjectives, adverbs)',
    'Tenses: simple, continuous, perfect, perfect-continuous',
    'Subject-verb agreement and sentence structure',
    'Prepositions and conjunctions in context',
    'Vocabulary: synonyms, antonyms, one-word substitution',
    'Idioms and phrases',
    'Sentence correction and improvement',
    'Reading comprehension (short passages)',
    'Active and passive voice',
    'Direct and indirect (reported) speech',
    'Articles: definite and indefinite usage',
    'Spellings and commonly confused words',
  ],

  pakistan_studies: [
    'Freedom movement (1857–1947): key events, leaders, milestones',
    'Partition of Bengal 1905 and Simla Deputation 1906',
    'Lucknow Pact 1916, Khilafat Movement, Non-Cooperation',
    'Simon Commission, Allahabad Address 1930, Round Table Conferences',
    'Pakistan Resolution 1940 (Lahore Resolution)',
    'Independence 1947: Radcliffe Award, refugee crisis, early challenges',
    'Quaid-e-Azam Muhammad Ali Jinnah: life, role, speeches',
    'Liaquat Ali Khan and early governance',
    'Constitutions of Pakistan: 1956, 1962, 1973',
    'Constitutional amendments (1st–26th)',
    'Parliamentary system: National Assembly, Senate, President, PM',
    'Provincial setup: Punjab, Sindh, KPK, Balochistan, AJK, GB',
    'Federally Administered Tribal Areas (FATA) merger with KPK',
    'Foreign policy: relations with India, China, USA, Middle East',
    'CPEC (China-Pakistan Economic Corridor)',
    'Pakistan geography: mountains, rivers, plains, deserts',
    'Major rivers: Indus, Jhelum, Chenab, Ravi, Sutlej, Kabul',
    'Mountain ranges: Himalayas, Karakoram, Hindu Kush',
    'Natural resources: coal, gas, oil, minerals',
    'Agriculture: crops, crop seasons (Kharif, Rabi)',
    'Culture, languages, and festivals of Pakistan',
    'National symbols: flag, anthem, animal, bird, flower',
  ],

  general_knowledge: [
    'World geography: continents, oceans, major rivers, mountain ranges',
    'Countries, capitals, and currencies of the world',
    'International organizations: UN, NATO, SAARC, OIC, SCO, G20',
    'UN agencies: WHO, UNESCO, UNICEF, UNDP, FAO, IMF, World Bank',
    'World history: ancient civilizations, colonialism, world wars',
    'Famous historical personalities and their contributions',
    'Books and authors (world literature)',
    'Nobel Prize winners (Peace, Literature, Science)',
    'Scientific discoveries and inventors',
    'Technology: internet, AI, space exploration milestones',
    'Current world records and superlatives (tallest, largest, longest)',
    'Sports: cricket, football, Olympics — records and champions',
    'Awards and international honors',
    'Basic astronomy: planets, stars, solar system',
    'Environment: climate change, biodiversity, global summits',
    'Famous paintings, music, and cultural heritage (UNESCO sites)',
  ],

  everyday_science: [
    'Human body systems: digestive, respiratory, circulatory, nervous, skeletal',
    'Vitamins, minerals, and their deficiency diseases',
    'Infectious and non-infectious diseases; vaccines and antibiotics',
    'Cell biology: cell types, organelles, mitosis, meiosis',
    'Genetics: DNA, chromosomes, heredity basics',
    'Ecology: food chains, food webs, ecosystems, biomes',
    'Environmental issues: pollution, deforestation, global warming, ozone layer',
    'Basic chemistry: elements, compounds, mixtures, acids, bases, salts',
    'Periodic table: groups, periods, properties',
    'Chemical reactions in daily life (rust, burning, photosynthesis)',
    'Physics: force, motion, Newton\'s laws, gravity',
    'Energy forms and conversion: kinetic, potential, thermal, electrical',
    'Sound: properties, speed, frequency, ultrasound',
    'Light: reflection, refraction, lenses, spectrum, lasers',
    'Electricity: current, voltage, resistance, circuits',
    'Heat: conduction, convection, radiation, thermometers',
    'Scientific instruments and their uses',
    'Inventions and the scientists behind them',
    'Space: planets, satellites, comets, black holes',
  ],

  current_affairs: [
    'Pakistan domestic politics: elections, government decisions, legislation',
    'Pakistan economy: budget, GDP, inflation, CPEC updates',
    'Regional affairs: India-Pakistan relations, Afghanistan, Iran, China',
    'International relations: US, UK, EU, Gulf states',
    'United Nations: resolutions, peacekeeping, summits',
    'Climate and environment summits (COP, UNFCCC)',
    'Global conflicts and peace processes',
    'Science and technology breakthroughs',
    'Major appointments: PM, President, Army Chief, foreign leaders',
    'Sports: recent cricket, football, Olympics results',
    'Natural disasters and humanitarian responses',
    'Global economy: trade deals, sanctions, oil prices',
  ],

  islamiat: [
    'Pillars of Islam: Shahada, Salah, Zakat, Sawm, Ramadan, Hajj',
    'Pillars of Iman (faith): six articles of faith',
    'Holy Quran: total Surahs (114), Paras (30), revelation, memorization',
    'Important Quranic Surahs and their themes',
    'Prophet Muhammad (PBUH): life (Seerah), key events',
    'Hijra (migration to Madinah) 622 CE',
    'Ghazwat (battles): Badr, Uhud, Khandaq, Khyber, Makkah conquest',
    'Farewell Hajj and Last Sermon',
    'Khulafa-e-Rashideen: Abu Bakr, Umar, Uthman, Ali (RA)',
    'Umayyad Caliphate (661–750 CE): key caliphs and events',
    'Abbasid Caliphate (750–1258 CE)',
    'Hadith: definition, major collections (Bukhari, Muslim, Tirmizi)',
    'Islamic jurisprudence (Fiqh): four madhabs',
    'Zakat: nisab, calculation, eligible recipients',
    'Hajj: rituals, conditions, Arkan-ul-Hajj',
    'Islamic months and their significance',
    'Islamic ethics: honesty, justice, compassion, brotherhood',
    'Famous Islamic scholars: Al-Kindi, Ibn Sina, Al-Ghazali, Al-Biruni',
    'Role of Islam in Pakistan\'s creation (Two-Nation Theory)',
  ],

  urdu: [
    'Urdu grammar: اسم، ضمیر، فعل، صفت، متعلق فعل (parts of speech)',
    'Tenses in Urdu: ماضی، حال، مستقبل',
    'Urdu sentence structure: فاعل، فعل، مفعول',
    'مترادفات (synonyms) اور متضادات (antonyms)',
    'محاورے اور ضرب الامثال (idioms and proverbs)',
    'Literary terms: غزل، نظم، قصیدہ، مرثیہ، افسانہ، ناول',
    'Famous Urdu poets: Mir Taqi Mir, Ghalib, Iqbal, Faiz, Josh',
    'Allama Iqbal: life, philosophy, famous works (Bang-e-Dara, Bal-e-Jibril)',
    'Famous Urdu prose writers: Manto, Prem Chand, Qurrat-ul-Ain',
    'Urdu literature history: Dilli Darbar to Pakistan movement',
    'Urdu spelling and punctuation rules',
    'Translation: English to Urdu and Urdu to English',
    'Comprehension of Urdu passages',
  ],

  basic_computer: [
    'Computer history: generations of computers',
    'Hardware components: CPU, RAM, ROM, HDD, SSD, GPU, motherboard',
    'Input devices (keyboard, mouse, scanner) and output devices (monitor, printer)',
    'Software: system software vs application software',
    'Operating systems: Windows, Linux, macOS — basics and features',
    'File management: folders, paths, extensions, copying, moving',
    'MS Word: formatting, tables, mail merge, track changes',
    'MS Excel: formulas (SUM, AVERAGE, IF, VLOOKUP), charts, pivot tables',
    'MS PowerPoint: slides, transitions, animations, presentations',
    'Internet: WWW, browsers, URLs, HTTP/HTTPS, search engines',
    'Email: composing, CC/BCC, attachments, spam, phishing',
    'Networking: LAN, WAN, Wi-Fi, IP address, DNS, router basics',
    'Cybersecurity: viruses, malware, antivirus, passwords, encryption',
    'Database basics: tables, records, queries, SQL concepts',
    'Binary number system and data representation',
    'Programming concepts: algorithms, flowcharts, variables, loops',
    'Cloud computing: storage, SaaS, Google Drive, OneDrive',
    'Social media and digital communication tools',
  ],

  geography: [
    'Physical geography: landforms, plate tectonics, volcanoes, earthquakes',
    'Rivers and drainage systems: Pakistan and world',
    'Climate types: tropical, arid, temperate, polar',
    'Soils: types, formation, importance for agriculture',
    'Vegetation and biomes: forests, grasslands, deserts, tundra',
    'Pakistan geography: Northern Areas, Punjab plains, Sindh delta',
    'Khyber Pakhtunkhwa and tribal belt geography',
    'Balochistan plateau and coastal areas',
    'World capitals, countries, and major landmarks',
    'Oceans, seas, gulfs, straits, and islands',
    'Map reading: scale, contour lines, compass directions, projections',
    'Economic geography: natural resources, agriculture, industries',
    'Population geography: density, distribution, urbanization, migration',
    'Environmental geography: deforestation, desertification, water scarcity',
  ],

  ethics_civics: [
    'Definition and scope of ethics; ethical theories (consequentialism, deontology)',
    'Civic virtues: honesty, integrity, accountability, transparency',
    'Human rights: UDHR, fundamental rights in Pakistan Constitution',
    'Social justice, equality, and non-discrimination',
    'Democracy and democratic values',
    'Civil society and role of institutions',
    'Governance: good governance principles, e-governance',
    'Rule of law and due process',
    'Professional ethics: public service, civil service code of conduct',
    'Environmental ethics and sustainable development',
    'Conflict resolution and peaceful coexistence',
    'Citizenship duties and responsibilities',
  ],

  general_math: [
    'Number system: natural, whole, integers, rational, irrational numbers',
    'HCF and LCM with word problems',
    'Fractions, decimals, and percentages — conversions and calculations',
    'Profit and loss, discount, and marked price',
    'Simple interest and compound interest',
    'Ratio and proportion; partnership problems',
    'Time and work problems',
    'Time, speed, and distance; trains and boats',
    'Pipes and cisterns',
    'Average, weighted average',
    'Basic algebra: linear equations, simplification, factoring',
    'Geometry: triangles (area, perimeter, Pythagoras theorem)',
    'Circles: area, circumference, arc, sector',
    'Quadrilaterals and polygons',
    'Volume and surface area of cubes, cuboids, cylinders, spheres',
    'Basic statistics: mean, median, mode, range',
    'Probability basics',
    'Number series and patterns',
  ],

  // ── Engineering entry test tables ──────────────────────────────────────────
  engineering_mathematics: [
    'Algebra: quadratic equations, polynomials, matrices, determinants',
    'Complex numbers: modulus, argument, De Moivre\'s theorem',
    'Binomial theorem and sequences/series',
    'Trigonometry: identities, equations, inverse functions',
    'Coordinate geometry: lines, circles, parabola, ellipse, hyperbola',
    'Differential calculus: limits, derivatives, chain rule, maxima/minima',
    'Integral calculus: definite and indefinite integrals, area under curves',
    'Differential equations: first order, separable, linear',
    'Statistics and probability: distributions, permutations, combinations',
    'Vectors: dot product, cross product, scalar and vector fields',
    'Boolean algebra and logic gates',
    'Numerical methods basics: Newton-Raphson, Euler\'s method',
  ],

  engineering_physics: [
    'Kinematics: displacement, velocity, acceleration, projectile motion',
    'Newton\'s laws of motion, friction, circular motion',
    'Work, energy, and power; conservation laws',
    'Momentum and impulse; elastic and inelastic collisions',
    'Rotational motion: torque, moment of inertia, angular momentum',
    'Gravitation: Kepler\'s laws, satellite motion, orbital velocity',
    'Fluid mechanics: pressure, Archimedes\' principle, Bernoulli\'s equation',
    'Heat and thermodynamics: laws of thermodynamics, heat engines, entropy',
    'Waves: types, properties, interference, diffraction, Doppler effect',
    'Sound: speed, resonance, beats, echoes',
    'Light: reflection, refraction, lenses, mirrors, optical instruments',
    'Wave optics: interference, diffraction, polarization',
    'Electrostatics: Coulomb\'s law, electric field, Gauss\'s law, capacitors',
    'Current electricity: Ohm\'s law, Kirchhoff\'s laws, resistors, circuits',
    'Magnetism and electromagnetic induction: Faraday\'s law, Lenz\'s law',
    'AC circuits: impedance, resonance, transformers',
    'Modern physics: photoelectric effect, Bohr model, X-rays, radioactivity',
    'Nuclear physics: fission, fusion, binding energy, half-life',
    'Semiconductors: p-n junction, diodes, transistors',
  ],

  engineering_chemistry: [
    'Stoichiometry and mole concept; chemical equations and balancing',
    'Atomic structure: Bohr model, quantum numbers, orbitals, electron configuration',
    'Periodic table: trends in atomic radius, ionization energy, electronegativity',
    'Chemical bonding: ionic, covalent, metallic, VSEPR theory, hybridization',
    'States of matter: kinetic molecular theory, gas laws (Boyle, Charles, Ideal Gas)',
    'Thermodynamics: enthalpy, Hess\'s law, bond energies, Gibb\'s free energy',
    'Chemical kinetics: rate laws, activation energy, Arrhenius equation',
    'Chemical equilibrium: Le Chatelier\'s principle, Kc, Kp',
    'Acids and bases: Bronsted-Lowry, Lewis, pH, buffer solutions',
    'Electrochemistry: oxidation-reduction, electrochemical cells, electrolysis',
    'Organic chemistry: IUPAC nomenclature, functional groups, reaction mechanisms',
    'Hydrocarbons: alkanes, alkenes, alkynes, aromatic compounds',
    'Reactions: substitution, addition, elimination, condensation',
    'Polymers: natural and synthetic polymers, polymerization types',
    'Industrial chemistry: Haber process, Contact process, petroleum refining',
    'Environmental chemistry: air/water pollution, greenhouse gases, ozone depletion',
  ],

  engineering_computer_science: [
    'Data structures: arrays, linked lists, stacks, queues, trees, graphs',
    'Algorithms: sorting (bubble, merge, quick), searching, complexity analysis',
    'Object-oriented programming: classes, objects, inheritance, polymorphism',
    'Database management: ER diagrams, SQL queries, normalization',
    'Computer networks: OSI model, TCP/IP, routing, switching, protocols',
    'Operating systems: processes, threads, memory management, file systems',
    'Digital logic: Boolean algebra, logic gates, flip-flops, combinational circuits',
    'Computer architecture: CPU design, instruction set, memory hierarchy, cache',
    'Software engineering: SDLC, design patterns, testing, version control',
    'Web technologies: HTML, CSS, JavaScript basics, HTTP, REST APIs',
    'Cybersecurity: cryptography, authentication, network security, ethical hacking basics',
    'Discrete mathematics: set theory, graph theory, propositional logic, combinatorics',
  ],

  engineering_english: [
    'Reading comprehension: technical and scientific passages',
    'Grammar for technical writing: sentence structure, punctuation, tense consistency',
    'Vocabulary: technical and academic word usage',
    'Synonyms, antonyms, analogies for engineers',
    'Sentence completion and error identification',
    'Technical writing basics: reports, memos, abstracts',
  ],

  engineering_intelligence: [
    'Verbal reasoning: analogies, classification, series completion, odd one out',
    'Non-verbal reasoning: pattern recognition, matrix completion, mirror images',
    'Logical deduction: syllogisms, if-then reasoning',
    'Mathematical reasoning: number series, data sufficiency',
    'Spatial intelligence: 2D/3D shapes, rotations, paper folding',
    'Critical thinking and problem-solving scenarios',
    'Coding-decoding and direction sense',
  ],

  // ── MDCAT tables ───────────────────────────────────────────────────────────
  mdcat_biology: [
    'Cell structure and function: prokaryotic vs eukaryotic cells',
    'Biological molecules: carbohydrates, proteins, lipids, nucleic acids',
    'Enzymes: structure, mechanism, factors affecting enzyme activity',
    'Cell membrane: structure, transport mechanisms (active, passive, osmosis)',
    'Cell cycle: mitosis (phases) and meiosis I and II',
    'Photosynthesis: light reactions, Calvin cycle, factors',
    'Respiration: glycolysis, Krebs cycle, electron transport chain',
    'Genetics: Mendel\'s laws, dominance, codominance, sex-linked traits',
    'DNA structure: Watson-Crick model, nucleotides, base pairing',
    'DNA replication, transcription, translation (protein synthesis)',
    'Gene regulation and mutations',
    'Evolution: natural selection, speciation, Hardy-Weinberg equilibrium',
    'Classification of living organisms: five kingdoms',
    'Kingdom Prokaryotae (bacteria): structure, nutrition, reproduction',
    'Kingdom Protoctista (algae, protozoa) and Kingdom Fungi',
    'Plant kingdom: classification, adaptations, life cycles',
    'Animal kingdom: invertebrates to vertebrates, phyla characteristics',
    'Plant tissues: meristematic, permanent; root, stem, leaf anatomy',
    'Transport in plants: water uptake, transpiration, stomata, phloem',
    'Plant growth: hormones (auxins, gibberellins, cytokinins, ABA, ethylene)',
    'Human digestive system: organs, enzymes, absorption',
    'Human respiratory system: breathing mechanism, gas exchange',
    'Human circulatory system: heart, blood vessels, blood composition',
    'Human excretory system: kidneys, urine formation, nephron',
    'Human nervous system: neurons, brain, spinal cord, reflexes',
    'Human endocrine system: glands, hormones and their functions',
    'Human immune system: antigens, antibodies, B and T cells, immunity types',
    'Human reproductive system: male and female, gametogenesis, fertilization',
    'Support and movement: bones, joints, muscles, antagonistic pairs',
    'Coordination and control: neuromuscular junction, action potential',
    'Ecology: populations, communities, ecosystems, succession, energy flow',
    'Biodiversity and conservation; endangered species',
    'Biotechnology: genetic engineering, PCR, gel electrophoresis, GMOs',
  ],

  mdcat_chemistry: [
    'Stoichiometry: mole concept, Avogadro\'s number, empirical and molecular formulas',
    'Atomic structure: subatomic particles, Bohr model, quantum numbers, orbitals',
    'Electronic configuration, Aufbau principle, Pauli exclusion, Hund\'s rule',
    'Periodic table: periodicity, trends (atomic radius, IE, EA, electronegativity)',
    'Chemical bonding: ionic, covalent, metallic, coordinate; VSEPR theory',
    'Hybridization: sp, sp2, sp3; molecular geometry',
    'Intermolecular forces: van der Waals, dipole-dipole, hydrogen bonding',
    'States of matter: gas laws (Boyle, Charles, Avogadro, Ideal Gas Law)',
    'Liquids and solids: vapor pressure, phase diagrams, crystal structures',
    'Solutions: types, concentration units, colligative properties',
    'Thermodynamics: enthalpy, entropy, Gibbs free energy, Hess\'s law',
    'Chemical kinetics: rate law, order of reaction, activation energy, catalysis',
    'Chemical equilibrium: Kc, Kp, Le Chatelier\'s principle',
    'Acids and bases: Arrhenius, Bronsted-Lowry, Lewis; pH calculations, buffers',
    'Electrochemistry: redox reactions, electrochemical cells, electrolysis, Faraday\'s laws',
    'Organic chemistry: IUPAC naming, functional groups, isomerism',
    'Hydrocarbons: alkanes (reactions: halogenation), alkenes (addition, Markovnikov), alkynes',
    'Aromatic compounds: benzene structure, substitution reactions',
    'Alcohols, ethers, aldehydes, ketones: preparation and reactions',
    'Carboxylic acids and derivatives: esters, amides, acid chlorides',
    'Amines: classification, reactions, basicity',
    'Carbohydrates: monosaccharides, disaccharides, polysaccharides',
    'Amino acids and proteins: peptide bonds, protein structure levels',
    'Nucleic acids: DNA vs RNA, nucleotides, double helix',
    'Polymers: addition and condensation polymerization; nylon, PVC, polyethylene',
    'Industrial chemistry: Haber (ammonia), Contact (H2SO4), Solvay (soda ash), petroleum fractionation',
    'Environmental chemistry: pollutants, acid rain, ozone depletion, water treatment',
  ],

  mdcat_physics: [
    'Measurement: SI units, significant figures, errors, dimensional analysis',
    'Kinematics: equations of motion, free fall, projectile motion',
    'Newton\'s laws of motion and their applications',
    'Friction: static and kinetic; limiting friction',
    'Work, energy, and power; conservative vs non-conservative forces',
    'Momentum and collisions: elastic, inelastic; law of conservation',
    'Circular motion: centripetal acceleration, banking of roads',
    'Gravitation: Newton\'s law of gravitation, orbital velocity, escape velocity, satellites',
    'Fluid dynamics: Archimedes\' principle, Bernoulli\'s equation, viscosity',
    'Simple harmonic motion: period, frequency, energy in SHM',
    'Waves: transverse vs longitudinal, speed, wavelength, frequency, Doppler effect',
    'Sound: resonance, beats, musical instruments',
    'Thermodynamics: temperature scales, thermal expansion, specific heat, calorimetry',
    'Laws of thermodynamics, Carnot engine, entropy',
    'Electrostatics: Coulomb\'s law, electric field, potential, capacitors',
    'Current electricity: Ohm\'s law, resistivity, Kirchhoff\'s laws, power in circuits',
    'Electromagnetism: magnetic field, force on moving charge, Faraday\'s law',
    'AC circuits: impedance, resonance, transformers, power factor',
    'Geometric optics: reflection, refraction, total internal reflection, lenses and mirrors',
    'Wave optics: interference (Young\'s experiment), diffraction, polarization',
    'Modern physics: photoelectric effect, Compton effect, de Broglie waves',
    'Bohr\'s atomic model: energy levels, spectral series (hydrogen)',
    'Nuclear physics: radioactivity types (alpha, beta, gamma), half-life, nuclear reactions',
    'Fission and fusion; nuclear reactors and atomic bombs',
    'Semiconductor physics: intrinsic vs extrinsic, p-n junction, diodes, transistors',
    'Logic gates and basic digital electronics',
    'Cathode ray oscilloscope (CRO) and its applications',
  ],

  mdcat_english: [
    'Reading comprehension: inference, main idea, tone, purpose',
    'Vocabulary in context: meaning from passage, connotation vs denotation',
    'Synonyms and antonyms',
    'Grammar: articles, prepositions, conjunctions, modifiers',
    'Sentence correction: grammatical errors, awkward phrasing',
    'Analogies and word relationships',
    'Sentence completion',
    'Idioms and phrases in context',
  ],

  mdcat_logical_reasoning: [
    'Number series and letter series completion',
    'Analogies: word, number, and figure analogies',
    'Classification: odd one out (words, numbers, figures)',
    'Syllogisms and logical deduction',
    'Blood relations and family tree problems',
    'Direction sense and distance calculation',
    'Coding-decoding',
    'Seating arrangement and scheduling puzzles',
    'Data sufficiency',
    'Critical reasoning: strengthen/weaken argument, assumptions, conclusions',
    'Pattern recognition: missing figures, matrix reasoning',
    'Venn diagrams: set intersections and problems',
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// PER-EXAM TOPIC OVERRIDES
// Key: examSlug → { dbTable: topics[] }
// When present, these REPLACE the baseline TOPICS_BY_DB_TABLE for that exam+table.
// ─────────────────────────────────────────────────────────────────────────────
export const EXAM_TOPIC_OVERRIDES: Record<string, Record<string, string[]>> = {

  // ── CSS / PMS ────────────────────────────────────────────────────────────
  'css-mpt': {
    english: [
      'Synonyms and antonyms (advanced level)',
      'Analogies and vocabulary in context',
      'Idioms and phrases (standard British/American usage)',
      'Sentence correction (CSS level grammar)',
      'One-word substitution and word formation',
      'Prepositions, articles, and conjunctions (advanced)',
      'Reading comprehension (CSS standard passages)',
      'Spotting errors in sentences',
    ],
    general_knowledge: [
      'World geography: countries, capitals, borders, landlocked nations',
      'Major rivers, lakes, seas, and mountain ranges of the world',
      'International organizations: UN, NATO, EU, ASEAN, OIC, SAARC, SCO',
      'World history: ancient civilizations, colonial era, World Wars I and II',
      'Famous personalities: scientists, leaders, writers, reformers',
      'Current world affairs: major conflicts, treaties, summits',
      'Books and authors: Nobel Literature laureates, global classics',
      'Inventions and technology milestones',
      'International awards: Nobel (all categories), Pulitzer, Booker',
      'Sports: cricket, football, athletics world records and champions',
      'Basic astronomy and space exploration',
      'Environmental issues and global climate agreements',
    ],
    pakistan_studies: [
      'Freedom movement: All India Muslim League, key resolutions, acts',
      'Quaid-e-Azam\'s role, vision, and key speeches',
      'Pakistan Resolutions and formation of Pakistan (1947)',
      'Constitutional history: 1956, 1962, 1973 constitutions and amendments',
      'Governance: parliamentary system, role of President, PM, judiciary',
      'Pakistan foreign policy: India, Afghanistan, China, USA, Gulf',
      'CPEC and Gwadar port significance',
      'Pakistan economy: sectors, major exports, fiscal challenges',
      'National culture, languages, arts, and UNESCO heritage sites of Pakistan',
      'Pakistan\'s nuclear program and defence policy',
      'Regional organizations: SAARC, ECO, SCO — Pakistan\'s role',
    ],
    current_affairs: [
      'Pakistan domestic affairs: political events, government decisions 2022–2025',
      'Pakistan economy: IMF programs, budget, inflation, fiscal policy',
      'CPEC: latest developments and projects',
      'Pakistan foreign relations: recent developments with India, Afghanistan, China, USA',
      'Regional security: Afghanistan post-2021, TTP, regional stability',
      'International affairs: Gaza conflict, Russia-Ukraine war, global summits',
      'Climate: COP agreements, Pakistan floods, climate finance',
      'Science and tech: AI, space, Pakistan\'s IT exports',
      'Appointments: new heads of state, army chief, key international posts',
    ],
  },

  'pms-competitive': {
    english: [
      'Synonyms and antonyms (PMS/CSS level)',
      'Analogies and vocabulary in context',
      'Idioms and phrases',
      'Sentence correction',
      'Reading comprehension',
      'One-word substitution',
      'Prepositions and conjunctions',
    ],
    general_knowledge: [
      'World capitals, currencies, and official languages',
      'International organizations and their headquarters',
      'World history: major events and personalities',
      'Nobel Prize categories and recent winners',
      'Famous books, authors, and literary awards',
      'World records: geographic, demographic, technological',
      'Sports: cricket, Olympics, world cups',
      'Environmental summits and climate agreements',
    ],
    pakistan_studies: [
      'Pakistan\'s constitution 1973 and amendments',
      'Pakistan\'s political system: institutions, separation of powers',
      'National Assembly and Senate: composition, powers, procedures',
      'Provincial governments: powers, functions, 18th Amendment devolution',
      'Foreign policy: relations with neighbours, global partners',
      'Economy: agriculture, industry, services, budget highlights',
      'CPEC and regional connectivity',
      'Pakistan\'s geographic features and natural resources',
    ],
  },

  'pms-punjab': {
    pakistan_studies: [
      'Punjab history: pre-partition Punjab, Sikh Empire, British Punjab',
      'Punjab geography: rivers, canal system, plains, districts',
      'Punjab government: Chief Minister, Governor, assembly, departments',
      'Punjab\'s agricultural economy: wheat, rice, cotton, sugarcane',
      'Punjab\'s industrial zones: Lahore, Faisalabad, Sialkot, Gujranwala',
      'Pakistan constitution 1973: federal vs provincial powers',
      'Punjab Public Service Commission (PPSC) structure',
      'Social development indicators: education, health in Punjab',
      'Freedom movement and Punjab\'s role: partition of Punjab 1947',
    ],
  },

  'pms-sindh': {
    pakistan_studies: [
      'Sindh history: Indus Valley Civilization, Arab conquest, British Sindh',
      'Sindh geography: Indus delta, Thar Desert, coastal belt',
      'Sindh government: Chief Minister, Governor, Sindh Assembly',
      'Sindh economy: agriculture (rice, cotton), Karachi industry',
      'Karachi: port city, commercial hub, megacity challenges',
      'Sindh public service and governance structure',
      'Sindh cultural heritage: Mohenjo-daro, Shah Abdul Latif Bhittai',
      'Freedom movement: Sindh\'s role, G.M. Syed, Sindh Assembly 1940',
    ],
  },

  'pms-kpk': {
    pakistan_studies: [
      'KPK (Khyber Pakhtunkhwa) history: Pashtun heritage, NWFP era',
      'KPK geography: mountain ranges, rivers (Kabul, Swat), valleys',
      'KPK government: CM, Governor, KPK Assembly, merged districts (FATA)',
      'FATA merger: 25th Constitutional Amendment, new districts',
      'KPK economy: tourism, hydropower, timber, mining',
      'Tribal culture: Pashtunwali code, Jirga system',
      'ETEA (Educational Testing and Evaluation Agency) role in KPK recruitment',
      'KPK development: PTI government reforms, Billion Tree Tsunami',
    ],
  },

  'pms-balochistan': {
    pakistan_studies: [
      'Balochistan history: Baloch tribes, Khanate of Kalat, British era',
      'Balochistan geography: Makran coast, Chagai Hills, Bolan Pass, Quetta',
      'Balochistan government: CM, Governor, Balochistan Assembly',
      'Balochistan economy: natural gas, coal, minerals, fisheries',
      'CPEC and Gwadar Port: strategic importance, development projects',
      'Balochistan\'s challenges: development gaps, security, water scarcity',
      'BPSC (Balochistan Public Service Commission) structure',
    ],
  },

  'pms-ajk': {
    pakistan_studies: [
      'AJK (Azad Jammu & Kashmir) history: 1947 Kashmir crisis, liberation movement',
      'AJK geography: Neelum Valley, Jhelum River, Mangla Dam',
      'AJK constitutional status: autonomous setup, legislative assembly',
      'AJK government: President, Prime Minister, AJK Legislative Assembly',
      'AJK economy: tourism, hydropower, agriculture',
      'Kashmir dispute: UNSC resolutions, Line of Control (LoC), peace process',
    ],
  },

  'pms-gb': {
    pakistan_studies: [
      'Gilgit-Baltistan (GB) history: Dogra rule, 1947 liberation, accession to Pakistan',
      'GB geography: Karakoram, Himalayas, Hindu Kush; K2 (world\'s second highest)',
      'GB government: Governor, Chief Minister, GB Legislative Assembly (GBLA)',
      'GB Order 2018 and constitutional status',
      'GB economy: tourism (Fairy Meadows, Attabad Lake), agriculture, mining',
      'CPEC routes through GB: Karakoram Highway (KKH)',
      'GB\'s distinct cultures: Balti, Shina, Burusho (Hunza)',
    ],
  },

  // ── PPSC Police / SI / ASI ────────────────────────────────────────────────
  'ppsc-sub-inspector': {
    pakistan_studies: [
      'Pakistan Penal Code (PPC) 1860: major offenses, punishment schedules',
      'Code of Criminal Procedure (CrPC) 1898: arrest, bail, FIR, trial',
      'Police Order 2002: structure, functions, police hierarchy',
      'Punjab Police Rules 1934: key provisions',
      'Pakistan Evidence Act 1872: admissibility, types of evidence',
      'Human rights in law enforcement: UN standards, police use of force',
      'Criminal investigation basics: scene preservation, chain of custody',
      'Cybercrime Act 2016: major offenses, punishments',
      'Pakistan\'s constitution: fundamental rights, Article 10-A fair trial',
      'Anti-Terrorism Act: provisions relevant to police',
    ],
    current_affairs: [
      'Law and order situation in Pakistan: recent crimes, security operations',
      'Police reforms in Pakistan: Safe Cities, E-Sahulat, digital policing',
      'Women safety initiatives: Punjab police women safety app, 1099 helpline',
      'Counter-terrorism: National Action Plan (NAP), NACTA',
      'Pakistan\'s Interpol cooperation and extradition treaties',
      'Current affairs: Pakistan political, economic and international events',
    ],
  },

  'ppsc-asi': {
    pakistan_studies: [
      'Pakistan Penal Code (PPC): offenses against persons, property, state',
      'Code of Criminal Procedure (CrPC): arrest procedures, bailable/non-bailable offenses',
      'Police Order 2002: ranks, duties of ASI',
      'First Information Report (FIR): procedure, contents, legal value',
      'Pakistan Evidence Act: types of evidence, witness testimony',
      'Criminal law basics: mens rea, actus reus, defenses',
      'Pakistan Constitution: fundamental rights, Article 9 (right to life)',
      'Anti-Narcotics laws: CNSA 1997',
    ],
  },

  'ppsc-tehsildar': {
    pakistan_studies: [
      'Land Revenue Act 1967 (Punjab): major provisions, records',
      'Land terminology: khasra, khatauni, jamabandi, fard, tatimma',
      'Land classification: chahi, barani, sailaba, banjar types',
      'Tehsildar\'s duties: revenue collection, record maintenance, mutation',
      'Mutation (intiqal) procedure: types, documentation required',
      'Survey and settlement operations: field book, shajra nasb',
      'Punjab Tenancy Act: rights of tenants, landlord-tenant relations',
      'Pakistan Constitution: federal and provincial legislative lists',
      'Administrative structure: district, tehsil, patwar circle',
    ],
    geography: [
      'Punjab districts and tehsils: administrative map',
      'Canal irrigation system in Punjab: headworks, canals, distributaries',
      'Punjab rivers: Indus, Jhelum, Chenab, Ravi, Sutlej',
      'Land use in Punjab: agricultural, urban, forest, barren',
      'Soil types in Punjab: alluvial, clay, sandy',
      'Flood plains and river management in Punjab',
      'Physical geography: plains, hills, desert (Cholistan)',
      'Climate of Punjab: monsoon, winter, summer patterns',
    ],
  },

  'ppsc-naib-tehsildar': {
    pakistan_studies: [
      'Land Revenue Act 1967: key concepts and provisions',
      'Land records: khasra, khatauni, shajra, jamabandi, fard',
      'Mutation process: types, legal requirements',
      'Punjab land terminology and survey terms',
      'Patwari system: role, records maintained, chain of command',
      'Revenue hierarchy: Patwari → Naib Tehsildar → Tehsildar → AC → DC',
      'Pakistan Constitution: property rights, Article 23-24',
      'Punjab Tenancy Act: landlord-tenant rights',
    ],
    geography: [
      'Punjab canal irrigation network: major canals and their feeders',
      'Punjab administrative divisions: districts, tehsils, union councils',
      'Physical geography of Punjab: rivers, plains, salt ranges',
      'Soil and land use in Punjab',
      'Climate and agriculture seasons in Punjab',
    ],
  },

  'ppsc-patwari': {
    pakistan_studies: [
      'Land Revenue Act 1967: Patwari\'s official duties and responsibilities',
      'Land records maintained by Patwari: khasra, khatauni, shajra, jamabandi',
      'Measurement units: marla, kanal, acre, hectare conversions',
      'Field book (missal haqiyat) and register preparation',
      'Mutation and record corrections procedure',
      'Crop reporting duties: girdawari, crop inspection',
      'Revenue hierarchy and chain of command',
      'Punjab Land Records Authority (PLRA) and computerized records (LRMIS)',
    ],
    geography: [
      'Punjab land topography: alluvial plains, river basins',
      'Survey of Pakistan: maps, grid references, scale',
      'Irrigation channels and their nomenclature: canal, distributary, minor, watercourse',
      'Soil types: loam, clay, sandy, silt in Punjab',
      'Rivers of Punjab and their flow direction',
    ],
    general_math: [
      'Area calculation: squares, rectangles, triangles, irregular shapes',
      'Unit conversion: marla-kanal-acre, feet-meter-yard',
      'Percentage and ratio problems for land division',
      'Simple arithmetic for revenue calculations',
      'Mensuration: perimeter and area of farm plots',
    ],
  },

  'ppsc-zilladar': {
    pakistan_studies: [
      'Land Revenue Act 1967: Zilladar\'s supervisory role',
      'Patwari management: inspections, record checking, disciplinary',
      'Revenue department hierarchy: Zilladar role between Patwari and Naib Tehsildar',
      'Land records: shajra, jamabandi, khasra inspection procedures',
      'Administrative laws applicable to revenue officers',
    ],
    geography: [
      'Punjab districts and their revenue administration',
      'Canal colonies and agricultural settlement history of Punjab',
      'Land use classification in Punjab revenue records',
    ],
  },

  // ── PPSC Revenue ──────────────────────────────────────────────────────────
  'ppsc-tehsildar-revenue': {
    geography: [
      'Punjab canal irrigation: major headworks and canal networks',
      'Punjab river system and its significance for agriculture',
      'Districts and tehsils of Punjab',
      'Soil types and land classification in Punjab',
      'Flood management and drainage in Punjab',
    ],
  },

  // ── PPSC Clerks / DEO / Steno ─────────────────────────────────────────────
  'ppsc-deo': {
    basic_computer: [
      'Typing speed and accuracy (theory: touch typing techniques)',
      'Data entry methods: keyboard shortcuts, auto-fill, data validation',
      'MS Excel: data entry, sorting, filtering, basic formulas (SUM, AVERAGE, COUNT)',
      'MS Word: tables, forms, mail merge',
      'Database data entry: forms, records, basic SQL SELECT',
      'Scanning and OCR: document management',
      'File naming conventions and data organization',
      'Network file sharing and cloud storage (Google Sheets, SharePoint)',
      'Data accuracy and verification techniques',
      'Computer hardware: keyboard, mouse, monitor maintenance',
      'Cybersecurity for data entry: password policies, data protection',
    ],
  },

  'ppsc-computer-operator': {
    basic_computer: [
      'MS Office suite: advanced Word, Excel, PowerPoint, Access',
      'MS Excel: VLOOKUP, HLOOKUP, pivot tables, conditional formatting, macros basics',
      'Database: MS Access forms, queries, reports; introduction to SQL',
      'Networking: LAN setup, printer sharing, IP configuration',
      'Troubleshooting: common hardware/software issues, error messages',
      'Operating system administration: Windows user accounts, permissions, Group Policy',
      'Internet: email management, web research, digital collaboration tools',
      'Data backup: methods, scheduling, cloud vs local backup',
      'Computer security: antivirus, firewall, phishing awareness',
      'Programming logic: algorithms and flowcharts (no coding required)',
    ],
  },

  'ppsc-steno-typist': {
    english: [
      'Advanced grammar: complex sentence structures, clause types',
      'Vocabulary: formal/official language, legal and administrative terminology',
      'Business correspondence: letter writing formats, memos, minutes of meetings',
      'Note-taking and summarizing techniques',
      'Shorthand principles (theoretical: Pitman system basics)',
      'Transcription accuracy and proofreading',
      'Formal and informal register in English',
      'Reading comprehension: official/administrative passages',
    ],
  },

  'ppsc-education-officer': {
    pakistan_studies: [
      'Pakistan education system: levels, structure, policy framework',
      'National Education Policy (NEP) and its revisions',
      'Punjab school education department: structure, hierarchy',
      'Elementary and secondary education in Punjab',
      'School management: administration, supervision, inspection',
      'Teacher recruitment and service rules in Punjab',
      'Educational assessment: board exams, BISE structure',
      'UNESCO education goals: SDG-4 (quality education)',
      'Special education and inclusive education policies',
      'Pakistan\'s literacy rate and education challenges',
    ],
  },

  // ── Police Constable ──────────────────────────────────────────────────────
  'police-punjab-constable': {
    general_knowledge: [
      'Basic Pakistan general knowledge: capital, provinces, national symbols',
      'Pakistan history: important dates, leaders, events',
      'Pakistan geography: provinces, major cities, rivers',
      'Famous personalities of Pakistan',
      'Basic science: everyday science facts',
      'Pakistan sports achievements: cricket, hockey, squash',
      'International organizations: UN, OIC, SAARC',
      'Current affairs: important recent events in Pakistan',
    ],
    pakistan_studies: [
      'Pakistan Penal Code: major crimes and punishments (basic)',
      'Police constable duties: patrol, law enforcement, first response',
      'Pakistan Constitution: fundamental rights of citizens',
      'Punjab Police structure: ranks from Constable to DIG',
      'Community policing: public cooperation, crime prevention',
      'First aid basics and emergency response',
      'Traffic laws: road rules, signals, Motor Vehicles Ordinance',
      'Women and child protection laws: basic provisions',
    ],
    urdu: [
      'Basic Urdu grammar and comprehension',
      'Simple Urdu paragraph reading',
      'Urdu vocabulary: everyday and official terms',
      'Urdu writing: simple sentences and paragraphs',
    ],
  },

  'police-sindh-constable': {
    pakistan_studies: [
      'Sindh Police structure and hierarchy',
      'Pakistan Penal Code: major offenses (basic awareness)',
      'Police duties: patrolling, FIR, arrest procedure basics',
      'Sindh geography and major cities',
      'Pakistan Constitution: basic rights',
      'Traffic rules and Motor Vehicles Act',
    ],
  },

  'police-kpk-constable': {
    pakistan_studies: [
      'KPK Police structure and hierarchy',
      'Pakistan Penal Code: major offenses (basic awareness)',
      'Pashtun culture and tribal administration basics',
      'KPK geography: major cities, districts',
      'Police duties: patrolling, law enforcement basics',
    ],
    islamiat: [
      'Basic pillars of Islam',
      'Islamic ethics: justice, truth, brotherhood',
      'Prophet\'s teachings on community welfare',
    ],
  },

  'police-punjab-si': {
    pakistan_studies: [
      'Pakistan Penal Code 1860: offenses, punishments, defenses',
      'Code of Criminal Procedure (CrPC) 1898: investigation, arrest, bail, trial',
      'Police Order 2002: powers and duties of Sub Inspector',
      'Punjab Police Rules 1934',
      'Pakistan Evidence Act 1872',
      'Anti-Terrorism Act 1997: key provisions',
      'Cybercrime Act 2016',
      'Human trafficking and PECA offenses',
      'Crime scene management and investigation techniques',
      'Report writing: FIR, challan, police reports',
    ],
  },

  'police-islamabad-si': {
    pakistan_studies: [
      'ICT Police structure: Islamabad Capital Territory Police Act',
      'Pakistan Penal Code and CrPC: Sub Inspector level knowledge',
      'Police Order 2002: powers, duties, accountability',
      'Islamabad administration: CDA, district administration',
      'Federal laws relevant to Islamabad: Federal Capital laws',
      'High Court and Supreme Court jurisdiction for Islamabad',
      'Cyber crime unit: PECA 2016, digital forensics basics',
    ],
  },

  // ── FIA ───────────────────────────────────────────────────────────────────
  'fia-sub-inspector': {
    pakistan_studies: [
      'FIA Act 1974: FIA structure, powers, mandate, jurisdiction',
      'Investigation techniques: surveillance, interrogation, digital forensics',
      'Immigration and Passport Ordinance 1974',
      'Human trafficking laws: Prevention of Trafficking in Persons Act 2018',
      'Cybercrime Act (PECA) 2016: major offenses and FIA role',
      'Anti-Money Laundering Act 2010 (AMLA)',
      'Narcotics laws: CNSA 1997 and FIA\'s counter-narcotics role',
      'Pakistan Penal Code: offenses under FIA jurisdiction',
      'Mutual Legal Assistance Treaty (MLAT) and international cooperation',
      'FIA Branches: Counter Terrorism, Immigration, Cybercrime, Anti-Corruption',
    ],
    current_affairs: [
      'Cybercrime statistics and major FIA cases in Pakistan',
      'Human trafficking: routes, prevention, international efforts',
      'Money laundering: FATF, Pakistan\'s grey/white list status',
      'Pakistan\'s immigration challenges: illegal immigration, Afghan refugees',
      'FIA digital transformation: e-passport, automated immigration',
      'Counter-terrorism: Pakistan\'s ongoing operations',
    ],
  },

  'fia-assistant-sub-inspector': {
    pakistan_studies: [
      'FIA Act 1974: FIA mandate and major functions',
      'Pakistan Penal Code: offenses relevant to FIA',
      'Cybercrime Act 2016: key offenses (hacking, harassment, fraud)',
      'Anti-Money Laundering basics: suspicious transaction reporting',
      'Immigration laws: illegal entry, passport fraud',
      'Human trafficking: definitions, penalties',
      'Pakistan\'s intelligence agencies: ISI, MI, IB, FIA — comparative overview',
    ],
  },

  'fia-constable': {
    pakistan_studies: [
      'FIA structure: branches, hierarchy, mandate',
      'Basic criminal laws: Pakistan Penal Code fundamentals',
      'Constable duties in FIA: guarding, escorting, assisting investigation',
      'Pakistan Constitution: citizens\' rights and duties',
      'Basic law and order: arrest, detention, search',
    ],
    general_knowledge: [
      'Pakistan general knowledge: government, geography, history',
      'Basic international awareness: UN, OIC, SAARC',
      'Current affairs: Pakistan events',
    ],
  },

  'fia-assistant': {
    basic_computer: [
      'Data management: records, filing systems, database entry',
      'MS Office: Word reports, Excel case tracking, PowerPoint briefings',
      'Email communication: official correspondence, encryption basics',
      'Digital evidence handling basics: screenshots, logs, chain of custody',
      'Cybersecurity awareness: phishing, password management',
      'Online research and verification techniques',
    ],
    current_affairs: [
      'FIA recent operations and achievements',
      'Cybercrime trends in Pakistan',
      'Money laundering: FATF evaluation of Pakistan',
      'Immigration statistics: Pakistan border management',
    ],
  },

  'fia-udc': {
    basic_computer: [
      'MS Office proficiency: Word, Excel, PowerPoint, Outlook',
      'Data entry and record management',
      'FIA data systems: case management, record keeping',
      'Email and digital communication in government',
      'File management: naming, archiving, retrieval',
    ],
  },

  'fia-ldc': {
    basic_computer: [
      'Basic computer operation: Windows, file management',
      'MS Word: typing, formatting documents',
      'MS Excel: basic data entry, simple formulas',
      'Email basics: composing, sending, receiving official emails',
      'Printing and scanning documents',
    ],
  },

  // ── FPSC ──────────────────────────────────────────────────────────────────
  'fpsc-assistant': {
    pakistan_studies: [
      'Federal government structure: Federal Cabinet, ministries, attached departments',
      'Pakistan Civil Service: CSS exam, occupational groups, BS system',
      'Establishment Division: service rules, conduct rules for federal employees',
      'Office procedures: file movement, noting, drafting, official correspondence',
      'Public Finance: federal budget process, fiscal policy, FBR',
      'Right of Access to Information Act 2017',
      'Pakistan Constitution: Articles on federation, parliamentary government',
    ],
    basic_computer: [
      'E-Office system: federal government digital workflow',
      'Official correspondence: letters, UO notes, DO letters, endorsement',
      'MS Office for government: Word templates, Excel reports',
      'Data protection in government: record classification',
    ],
  },

  'fpsc-udc': {
    basic_computer: [
      'Federal government e-office procedures',
      'MS Office: advanced document preparation',
      'Data management and filing in government offices',
      'Official communication formats: letters, memos, circulars',
    ],
    pakistan_studies: [
      'Federal government structure and departments',
      'Establishment Division: service rules',
      'Secretariat procedures: noting, drafting, diarising',
      'Public service ethics and conduct',
    ],
  },

  'fpsc-ldc': {
    basic_computer: [
      'Basic typing and word processing',
      'File management in government offices',
      'MS Word: basic document typing',
      'Government record keeping basics',
    ],
    everyday_science: [
      'Basic everyday science facts',
      'Pakistan science and technology development',
      'Technology in daily government work',
    ],
  },

  'fpsc-inspector-ir': {
    pakistan_studies: [
      'Income Tax Ordinance 2001: tax heads, rates, exemptions',
      'Sales Tax Act 1990: registration, filing, input-output tax',
      'Federal Excise Duty: excisable goods, rates, procedures',
      'FBR structure: Inland Revenue Service (IRS) hierarchy',
      'Tax audit procedures: assessment, appeal, penalties',
      'Tax collection methods: withholding tax, advance tax',
      'Double Taxation Avoidance Agreements (DTAA)',
      'Anti-money laundering for revenue officers',
      'Transfer pricing and tax avoidance',
    ],
    general_math: [
      'Tax calculations: income tax slabs, deductions, credits',
      'Sales tax computation: input tax, output tax, refund',
      'Financial ratios and accounting basics for tax assessment',
      'Business math: profit, loss, depreciation',
    ],
  },

  'fpsc-inspector-customs': {
    pakistan_studies: [
      'Customs Act 1969: major provisions, powers of customs officers',
      'Pakistan Custom Tariff (PCT) codes and HS classification',
      'Import and export procedures: Bill of Lading, L/C, Bill of Entry',
      'Anti-Smuggling Act and Customs Confiscation Rules',
      'Duty drawback and rebate procedures',
      'WTO Agreement on Customs Valuation (GATT Valuation Agreement)',
      'FBR Customs structure: appraisement, ports, dry ports',
      'Pakistan Trade Policy and export facilitation',
      'Containerized trade: shipping lines, ports (Karachi, Qasim, Gwadar)',
    ],
  },

  // ── NTS ───────────────────────────────────────────────────────────────────
  'nts-general': {
    general_knowledge: [
      'Pakistan general knowledge: history, geography, government',
      'World general knowledge: countries, capitals, organizations',
      'Science and technology: discoveries, inventions, current tech',
      'Sports: Pakistan cricket, hockey, world sports records',
      'National and international current affairs',
      'Famous personalities: politicians, scientists, writers',
    ],
    current_affairs: [
      'Pakistan current affairs: government decisions, new policies',
      'Economic developments: projects, budgets, CPEC',
      'International current affairs: major world events',
      'Science and tech news: Pakistan space program, IT sector',
    ],
  },

  'nts-education': {
    pakistan_studies: [
      'Pakistan education system: formal, non-formal, private sector',
      'National Education Policy 2009, Single National Curriculum (SNC)',
      'Primary, middle, secondary, higher secondary education structure',
      'Higher Education Commission (HEC): role, accreditation, scholarships',
      'Teacher training: B.Ed, M.Ed, ADE programs',
      'Educational measurement and evaluation: standardized testing',
      'Special education and inclusive education in Pakistan',
      'Curriculum development: learning objectives, assessment alignment',
    ],
    english: [
      'Teaching English as Second Language (TESL) methods',
      'Reading, writing, speaking, listening skills for teachers',
      'Grammar for teaching: lesson planning, error correction',
      'Academic English: report writing, research methodology basics',
    ],
  },

  'nts-railway': {
    general_knowledge: [
      'Pakistan Railways: history, network, major routes',
      'Railway terminology: gauge, traction, signaling, rolling stock',
      'Pakistan Railways division structure: Lahore, Karachi, Rawalpindi, Multan, Peshawar',
      'Train operations: timetabling, ticketing, freight operations',
      'Railway Act 1890: major provisions',
      'Safety rules on railway premises',
      'ML-1: Main Line 1 modernization project (CPEC)',
      'Station hierarchy: Junction, Wayside, Halt stations',
    ],
    general_math: [
      'Distance-speed-time problems for trains',
      'Scheduling and timetable math',
      'Basic arithmetic for ticket and freight calculations',
    ],
  },

  'nts-wapda': {
    everyday_science: [
      'Electricity generation: hydro, thermal, nuclear, solar, wind power plants',
      'WAPDA (Water and Power Development Authority): role, projects',
      'Major dams of Pakistan: Tarbela, Mangla, Warsak, Chashma',
      'Electricity distribution: transformers, transmission lines, substations',
      'Load management: demand side management, power factor',
      'Water management: irrigation, flood control, water storage',
      'Renewable energy: solar, wind, biogas in Pakistan',
      'National Transmission and Despatch Company (NTDC) role',
      'NEPRA: regulatory authority for power sector',
      'Energy crisis: causes, solutions, load shedding history in Pakistan',
    ],
  },

  'nts-fbr': {
    current_affairs: [
      'FBR tax collection targets and achievements',
      'Tax reforms: broadening the tax base, tax amnesty schemes',
      'Sales tax: goods and services, e-filing portal',
      'Income tax: IRIS portal, filing deadlines, tax brackets',
      'Customs: Pakistan trade, import/export statistics',
      'Pakistan FATF status and anti-money laundering measures',
      'Digital economy taxation: e-commerce, freelancers',
    ],
    general_math: [
      'Tax calculations: income tax, sales tax, customs duty',
      'Percentage calculations for tax rates',
      'Financial arithmetic: profit, loss, interest',
    ],
  },

  'nts-hec': {
    general_knowledge: [
      'Academic and research vocabulary',
      'Higher education systems: global and Pakistan',
      'Scientific method: research design, hypothesis, variables',
      'Academic writing: structure, citation, plagiarism',
      'Critical reasoning and analytical skills',
      'Quantitative aptitude: statistics, data interpretation',
      'Current research trends: AI, climate science, biotechnology',
    ],
    general_math: [
      'Statistics: mean, standard deviation, correlation, regression',
      'Probability theory and distributions',
      'Data analysis and interpretation',
      'Algebra and calculus concepts for graduate level',
      'Research methods: sampling, hypothesis testing',
    ],
  },

  // ── OTS ───────────────────────────────────────────────────────────────────
  'ots-police': {
    pakistan_studies: [
      'Police laws: Pakistan Penal Code (basics), Police Order 2002',
      'Citizen rights during police interaction',
      'Community policing principles',
      'Crime types: property crime, violent crime, cyber crime',
      'Police hierarchy and departmental structure',
    ],
  },

  'ots-health': {
    everyday_science: [
      'Human anatomy and physiology: body systems',
      'Common diseases: causes, symptoms, prevention, treatment',
      'Public health: epidemiology, vaccination programs, WHO programs',
      'Pakistan health system: NHSP, Lady Health Workers program',
      'Nutrition: macro and micronutrients, malnutrition in Pakistan',
      'Maternal and child health: antenatal care, immunization',
      'Primary healthcare: Sehat Sahulat Card, BISP health benefits',
      'Hospital administration basics',
      'Medical terminology: basic prefixes, suffixes, roots',
    ],
  },

  'ots-education': {
    pakistan_studies: [
      'Pakistan education policy: National Education Policy 2009',
      'Single National Curriculum (SNC): aims, subjects, implementation',
      'School management: administration, governance, inspection',
      'Teacher competencies: content knowledge, pedagogy, assessment',
      'Educational assessment: formative, summative, diagnostic',
      'Inclusive and special education',
      'Student welfare: counseling, child protection policies',
    ],
  },

  // ── ETEA ─────────────────────────────────────────────────────────────────
  'etea-pst': {
    pakistan_studies: [
      'Child development: cognitive, emotional, social, physical stages',
      'Learning theories: Piaget, Vygotsky, Bloom\'s Taxonomy',
      'Primary education curriculum: KPK syllabus structure',
      'Teaching methods for primary level: activity-based, play-based learning',
      'Classroom management for primary school',
      'Assessment at primary level: formative assessment, observation',
      'Special needs education at primary level',
      'KPK Elementary & Secondary Education Department policies',
    ],
    english: [
      'Teaching English to young learners: communicative approach',
      'Primary English curriculum: phonics, reading, writing',
      'Grammar for primary teachers: simple tenses, basic sentence types',
      'Storytelling and reading aloud techniques',
    ],
    islamiat: [
      'Islamic education for primary level: Nazirah, basic Surahs',
      'Teaching Islamiat: methods, resources for children',
      'Islamic values in education: respect, honesty, cleanliness',
    ],
  },

  'etea-sst': {
    pakistan_studies: [
      'Adolescent development: cognitive, emotional, identity stages',
      'Secondary education curriculum: KPK matric level',
      'Subject-specific pedagogy: teaching science, math, social studies',
      'Lesson planning: objectives, methods, assessment, feedback',
      'Classroom management for secondary level',
      'Assessment: internal, board exams, marking schemes',
      'KPK education reforms and teacher policy',
    ],
  },

  'etea-ct': {
    pakistan_studies: [
      'Middle school education curriculum: KPK Class 6–8',
      'Teaching methods for middle level: inquiry-based learning',
      'Subject content for Certificate Teachers: general knowledge',
      'Classroom management strategies',
      'Student assessment at middle level',
    ],
  },

  // ── Teaching posts (PPSC) ─────────────────────────────────────────────────
  'ppsc-pst': {
    pakistan_studies: [
      'Child development theories: Piaget, Vygotsky, Montessori',
      'Primary school curriculum: Punjab syllabus structure',
      'Activity-based learning and play-based methods',
      'Classroom management for young learners',
      'Formative and summative assessment at primary level',
      'Inclusive education and special needs in Punjab schools',
      'Punjab School Education Department: policies, AEO role',
      'Bloom\'s Taxonomy for primary level objectives',
    ],
  },

  'ppsc-sst': {
    pakistan_studies: [
      'Adolescent psychology and learning styles',
      'Punjab secondary curriculum structure: Matric subjects',
      'Subject pedagogy: teaching Mathematics, Science, or Social Studies',
      'Lesson planning: constructivist approach',
      'Assessment techniques: rubrics, portfolios, examinations',
      'Punjab education reforms: Punjab Curriculum Authority',
      'Smart Schools Initiative: Punjab',
      'Teacher evaluation and continuous professional development (CPD)',
    ],
  },

  // ── Military ─────────────────────────────────────────────────────────────
  'military-pak-army': {
    everyday_science: [
      'Basic physics: Newton\'s laws, energy, thermodynamics (FSc level)',
      'Basic chemistry: elements, compounds, reactions',
      'Biology: human body, health, nutrition',
      'Geography and maps: reading topographic maps',
      'Pakistan Army: structure, ranks, weapons systems overview',
    ],
    general_math: [
      'Arithmetic: percentages, fractions, ratios (FSc level)',
      'Basic algebra and linear equations',
      'Geometry: triangles, circles, coordinate geometry',
      'Statistics: mean, median, mode',
      'IQ mathematics: number series, pattern completion',
    ],
    general_knowledge: [
      'Pakistan Army history: major wars, operations, achievements',
      'Pakistan defence: nuclear program, strategic importance',
      'Pakistan geography: strategic locations, borders',
      'Military ranks and command structure',
      'Wars of Pakistan: 1948, 1965, 1971, Kargil 1999',
      'Current military operations: Zarb-e-Azb, Raddul Fasaad',
    ],
    pakistan_studies: [
      'Pakistan defence policy and national security',
      'Role of Pakistan Army in nation building',
      'Military courts and governance in Pakistan',
      'Pakistan Army\'s role in UN peacekeeping',
      'Constitution: emergency provisions, Article 245 (military aid to civil)',
    ],
  },

  'military-pak-navy': {
    everyday_science: [
      'Physics: buoyancy, hydrodynamics, marine physics',
      'Oceanography basics: ocean currents, tides, marine ecosystems',
      'Navigation fundamentals: compass, GPS, charts',
      'Basic electronics and electrical engineering concepts',
      'Meteorology for maritime: weather patterns at sea',
    ],
    general_knowledge: [
      'Pakistan Navy: history, fleet, major bases (PNS Mehran, Karachi)',
      'Indian Ocean strategy: Pakistan\'s maritime interests',
      'Gwadar Port: CPEC and naval significance',
      'Maritime law: UNCLOS, territorial waters, EEZ',
      'Famous naval battles in history',
      'Naval ranks and command structure',
    ],
  },

  'military-paf-airman': {
    everyday_science: [
      'Physics: flight principles, aerodynamics, Bernoulli\'s theorem',
      'Atmosphere: layers, pressure, temperature at altitude',
      'Basic electricity and electronics for aircraft systems',
      'Communication systems: radio, radar, transponder basics',
      'Weather: aviation weather, METAR, TAF interpretation basics',
    ],
    general_knowledge: [
      'Pakistan Air Force: history, aircraft fleet, major bases',
      'Famous air battles: 1965 Indo-Pak air war',
      'PAF officers and achievements: MM Alam (air ace)',
      'Modern aircraft: F-16, JF-17 Thunder',
      'SUPARCO: Pakistan\'s space program',
      'Aviation acronyms and terminology',
    ],
  },

  'pma-long-course': {
    general_math: [
      'Mathematics FSc level: calculus basics, algebra, trigonometry',
      'IQ and aptitude: number series, spatial reasoning',
      'Statistics: data interpretation',
      'Physics-based math: force, energy calculations',
    ],
    everyday_science: [
      'Physics FSc level: mechanics, electricity, waves, optics',
      'Military technology: basics of weapons, missiles, radar',
      'Navigation and GPS technology',
      'Pakistan Army Corps and Command structure',
    ],
    pakistan_studies: [
      'Pakistan military history: wars, operations, achievements',
      'Pakistan defence and nuclear program',
      'Role of Army in Pakistan\'s history and governance',
      'UN Peacekeeping: Pakistan\'s role and missions',
      'Pakistan Constitution: military and civil relations',
    ],
  },

  'paf-initial': {
    engineering_mathematics: [
      'Mathematics FSc Pre-Engineering: all topics at FSc-II level',
    ],
    engineering_physics: [
      'Physics FSc: mechanics, thermodynamics, electricity, modern physics',
      'Aerodynamics basics: lift, drag, thrust principles',
    ],
    engineering_intelligence: [
      'Spatial reasoning: 2D and 3D shape recognition',
      'Mechanical aptitude: gears, levers, pulleys',
      'Verbal reasoning: comprehension, analogies',
      'Mathematical reasoning: number patterns, data analysis',
    ],
  },

  // ── Banking ───────────────────────────────────────────────────────────────
  'banks-nbp-officer': {
    general_knowledge: [
      'Banking and finance concepts: deposits, loans, interest rates',
      'State Bank of Pakistan: monetary policy, KIBOR, reserve requirements',
      'Commercial banking: products, services, operations',
      'Islamic banking: Murabaha, Ijara, Musharaka, Mudaraba',
      'Stock market: PSX, shares, bonds, debentures',
      'International finance: IMF, World Bank, ADB, FATF',
      'Microfinance in Pakistan: PPAF, Akhuwat, Kashf Foundation',
      'Financial inclusion: Asaan Account, Roshan Digital Account',
      'Pakistan banking history: nationalization, privatization',
      'Basel III: capital adequacy, risk management',
    ],
    general_math: [
      'Financial mathematics: compound interest, EMI calculation',
      'Present value and future value calculations',
      'Ratio analysis: liquidity, profitability, solvency ratios',
      'Break-even analysis',
      'Profit and loss in banking context',
      'Currency exchange: buying/selling rates, cross rates',
    ],
    basic_computer: [
      'Core Banking System (CBS): TEMENOS, Misys, Oracle FLEXCUBE concepts',
      'Online banking: internet banking, mobile banking apps',
      'SWIFT messaging: MT formats for international transfers',
      'Data security in banking: PCI-DSS, two-factor authentication',
      'ATM and POS machine operations',
      'Financial reporting software: Excel for banking analysis',
    ],
  },

  'banks-sbp-junior': {
    general_knowledge: [
      'State Bank of Pakistan: history, mandate, departments',
      'Monetary policy: instruments (interest rate, open market operations, CRR, SLR)',
      'Foreign exchange reserves management',
      'SBP regulations: prudential regulations, BPRD circulars',
      'Payment systems: PRISM, RTGS, IBFT, 1LINK',
      'Financial stability: systemic risk, macroprudential policy',
      'Consumer protection in banking: Banking Mohtasib',
      'Export finance schemes: EFS, LTFF',
    ],
    general_math: [
      'Econometrics basics: regression, time series',
      'Monetary math: money supply (M0, M1, M2), multiplier',
      'Statistical analysis for economic data',
    ],
  },

  'banks-bop-officer': {
    general_knowledge: [
      'Bank of Punjab: history, mandate, government-owned bank role',
      'Punjab economy: agriculture finance, SME lending',
      'Pakistan banking sector: scheduled banks, DFIs, MFBs',
      'Credit risk assessment: 5 C\'s of credit',
      'Loan products: consumer, SME, agricultural, corporate loans',
      'KYC and AML: know your customer, anti-money laundering',
      'SBP prudential regulations for commercial banks',
    ],
  },

  // ── Judiciary / Legal posts ───────────────────────────────────────────────
  'judiciary-high-court-clerk': {
    pakistan_studies: [
      'Pakistan judiciary structure: Supreme Court, High Courts, District Courts',
      'High Court: original jurisdiction, appellate jurisdiction, supervisory jurisdiction',
      'Writ jurisdiction: habeas corpus, mandamus, certiorari, quo warranto, prohibition',
      'Civil Procedure Code (CPC) 1908: suits, pleadings, written statement, judgment',
      'Criminal Procedure Code (CrPC): trial procedure, magistrate powers',
      'Court administration: cause lists, case numbering, file management',
      'Legal drafting: applications, petitions, legal notices',
      'Court etiquette and decorum',
    ],
    english: [
      'Legal English: Latin terms (in absentia, ex parte, ultra vires)',
      'Formal legal drafting: petitions, affidavits, applications',
      'Reading comprehension of legal passages',
      'Vocabulary: legal and administrative terminology',
    ],
  },

  'judiciary-supreme-court-assistant': {
    pakistan_studies: [
      'Supreme Court of Pakistan: original, appellate, advisory jurisdiction',
      'Constitution: Articles 184, 185, 186, 187, 188 (Supreme Court powers)',
      'Chief Justice appointment and tenure (26th Constitutional Amendment)',
      'Constitutional benches and judicial commission',
      'Supreme Court Practice and Procedure Act 2023',
      'Original jurisdiction: fundamental rights enforcement',
      'Landmark Supreme Court judgments of Pakistan',
    ],
    basic_computer: [
      'Supreme Court IT systems: case management software',
      'Digital court: e-filing, video link hearings',
      'Legal database management',
      'MS Office for court administration: correspondence, scheduling',
    ],
  },

  // ── Railways ─────────────────────────────────────────────────────────────
  'railways-station-master': {
    general_knowledge: [
      'Pakistan Railways history: Karachi-Kotri 1861, British expansion',
      'Railway network: track length, divisions, major stations',
      'Train operations: departure/arrival, scheduling, delay management',
      'Station master duties: platform management, safety, public announcements',
      'Railway signaling systems: fixed signals, block instruments',
      'Passenger services: ticketing, reservations, refunds, POS machines',
      'Railway Act 1890: Station Master powers, liability',
      'Goods/freight operations: consignment, invoicing, delivery',
      'Emergency procedures: accident response, evacuation protocols',
      'Train categories: Express, Mail, Local, Freight',
    ],
    general_math: [
      'Time and distance problems for train scheduling',
      'Ticket revenue calculations',
      'Freight weight and tariff computation',
    ],
  },

  'railways-guard': {
    general_knowledge: [
      'Guard\'s duties: train safety, communication with driver, brake testing',
      'Railway signaling: hand signals, detonators, flags',
      'Railway Act: guard\'s powers and responsibilities',
      'Emergency procedures for train guards',
      'Goods train handling: wagon sealing, transit documents',
    ],
  },

  // ── ECAT / Engineering Entry Tests ────────────────────────────────────────
  'ecat': {
    engineering_mathematics: [
      'Sets, functions, and groups',
      'Complex numbers and De Moivre\'s theorem',
      'Matrices and determinants',
      'Sequences and series: AP, GP, HP',
      'Permutations, combinations, and binomial theorem',
      'Trigonometric functions, identities, and equations',
      'Inverse trigonometric functions',
      'Coordinate geometry: straight lines, circles, conic sections',
      'Introduction to calculus: limits, derivatives, integration',
      'Differential equations: first order',
      'Statistics and probability',
      'Vectors and vector algebra',
    ],
    engineering_physics: [
      'Measurements, scalars and vectors',
      'Motion in one and two dimensions, projectile motion',
      'Newton\'s laws, friction, circular motion',
      'Work, energy, power, momentum, conservation laws',
      'Rotational motion and angular momentum',
      'Fluid statics and dynamics',
      'Heat and thermodynamics (laws, heat transfer)',
      'Oscillations: SHM',
      'Waves: mechanical and electromagnetic',
      'Optics: reflection, refraction, diffraction, polarization',
      'Electrostatics: Coulomb\'s law, Gauss\'s law, capacitors',
      'DC and AC circuits, Kirchhoff\'s laws',
      'Electromagnetism: magnetic force, induction, transformers',
      'Nuclear physics: radioactivity, fission, fusion',
    ],
    engineering_chemistry: [
      'Stoichiometry and mole concept',
      'Atomic structure and chemical bonding',
      'States of matter: gas laws, liquids, solids',
      'Thermodynamics and chemical equilibrium',
      'Reaction kinetics',
      'Acids, bases, buffers, and pH',
      'Electrochemistry',
      'Hydrocarbons: naming, reactions, isomerism',
      'Functional groups: alcohols, aldehydes, carboxylic acids, amines',
      'Industrial chemistry: Haber, Contact, Solvay processes',
      'Polymers and macromolecules',
      'Biochemistry: carbohydrates, proteins, lipids, nucleic acids',
    ],
    engineering_english: [
      'Reading comprehension: scientific and technical passages',
      'Grammar: sentence correction, error identification',
      'Vocabulary: technical terms, synonyms, word usage',
      'Sentence completion',
    ],
  },

  'net-engineering': {
    engineering_mathematics: [
      'Calculus: differential, integral, multivariable',
      'Linear algebra: matrices, eigenvalues, vector spaces',
      'Differential equations: ODEs, PDEs',
      'Complex analysis: analytic functions, contour integration',
      'Numerical methods: Newton-Raphson, Gauss-Seidel, Euler\'s',
      'Statistics: probability distributions, hypothesis testing',
      'Discrete mathematics: logic, sets, graph theory',
    ],
    engineering_physics: [
      'Engineering mechanics: statics and dynamics',
      'Material properties: stress, strain, elasticity',
      'Thermodynamics: cycles, refrigeration, heat transfer',
      'Fluid mechanics: flow equations, turbomachinery basics',
      'Electrical theory: circuits, AC analysis, power systems',
      'Modern physics: quantum, solid state',
    ],
    engineering_computer_science: [
      'Programming: C/C++ fundamentals',
      'Data structures and algorithms',
      'Computer organization and architecture',
      'Digital circuits and microprocessors',
      'Software development: SDLC, UML',
    ],
  },

  'giki-entry': {
    engineering_mathematics: [
      'Pre-calculus: functions, logarithms, trigonometry',
      'Calculus: limits, derivatives, integration applications',
      'Vectors and 3D geometry',
      'Matrices and determinants (advanced)',
      'Probability and statistics (introductory)',
    ],
    engineering_physics: [
      'Mechanics: kinematics, dynamics, work-energy',
      'Thermodynamics: laws, processes',
      'Optics: wave theory, diffraction, interference',
      'Electromagnetism: Maxwell\'s equations conceptually',
      'Modern physics: quantum and nuclear',
    ],
    engineering_chemistry: [
      'Organic chemistry: functional groups, reactions',
      'Physical chemistry: thermodynamics, kinetics, electrochemistry',
      'Inorganic chemistry: periodic trends, compounds',
    ],
    engineering_intelligence: [
      'Abstract reasoning: patterns, sequences, spatial puzzles',
      'Analytical reasoning: logical deduction',
      'Critical thinking: argument evaluation',
    ],
  },

  'pieas-entry': {
    engineering_mathematics: [
      'Calculus: differentiation, integration, series',
      'Algebra: complex numbers, matrices, binomial theorem',
      'Trigonometry: identities, equations',
      'Statistics and probability',
    ],
    engineering_physics: [
      'Nuclear physics: radioactivity, fission, fusion, reactors',
      'Quantum mechanics: wave-particle duality, Heisenberg, Schrödinger basics',
      'Classical mechanics and electromagnetism',
      'Thermodynamics and statistical physics',
      'Optics and modern physics',
    ],
    engineering_chemistry: [
      'Nuclear chemistry: isotopes, radioactive decay',
      'Physical chemistry: thermodynamics, electrochemistry',
      'Analytical chemistry basics',
    ],
    engineering_intelligence: [
      'Logical and analytical reasoning',
      'Spatial visualization',
      'Data interpretation',
    ],
  },

  'lums-engineering': {
    engineering_mathematics: [
      'Pre-calculus and calculus (SAT/ACT level)',
      'Algebra: equations, functions, polynomials',
      'Statistics and data analysis',
      'Combinatorics and probability',
    ],
    engineering_physics: [
      'Mechanics, energy, waves (concept-based)',
      'Electricity and magnetism',
      'Modern physics',
    ],
    engineering_intelligence: [
      'Critical reasoning: LSAT-style arguments',
      'Analytical writing evaluation criteria',
      'Verbal and quantitative reasoning (SAT-style)',
    ],
  },

  'fast-nuces': {
    engineering_mathematics: [
      'Mathematics: algebra, calculus, discrete math',
      'Quantitative reasoning: number systems, word problems',
    ],
    engineering_intelligence: [
      'Verbal reasoning: analogies, comprehension',
      'Analytical reasoning: logical puzzles, deduction',
      'Numerical reasoning: data interpretation',
      'Spatial reasoning for CS track',
    ],
    engineering_computer_science: [
      'Programming logic: algorithms, flowcharts',
      'Basic programming: C/C++ syntax concepts',
      'Data structures: arrays, stacks, basic sorting',
      'Number systems: binary, octal, hexadecimal',
    ],
  },

  'comsats-engineering': {
    engineering_mathematics: [
      'FSc Pre-Engineering Mathematics: all topics',
    ],
    engineering_physics: [
      'FSc Physics: all topics at intermediate level',
    ],
    engineering_chemistry: [
      'FSc Chemistry: all topics at intermediate level',
    ],
    engineering_english: [
      'English comprehension and grammar at intermediate level',
    ],
  },

  'air-university': {
    engineering_mathematics: [
      'Mathematics (FSc level) and quantitative reasoning',
    ],
    engineering_physics: [
      'Physics (FSc level): focus on mechanics, electricity, modern physics',
      'Aerospace concepts: aerodynamics, propulsion basics',
    ],
    engineering_intelligence: [
      'Verbal reasoning: comprehension, vocabulary',
      'Analytical reasoning: logical puzzles',
      'Spatial visualization: shapes, rotations',
    ],
  },

  'nts-nat-ie': {
    engineering_mathematics: [
      'Mathematics (FSc Pre-Engineering level)',
    ],
    engineering_physics: [
      'Physics (FSc level)',
    ],
    engineering_chemistry: [
      'Chemistry (FSc level)',
    ],
    engineering_english: [
      'English grammar and comprehension',
    ],
  },

  'muet': {
    engineering_mathematics: [
      'Mathematics: Pre-Engineering syllabus (FSc / A-levels equivalent)',
    ],
    engineering_physics: [
      'Physics: Pre-Engineering syllabus',
    ],
    engineering_chemistry: [
      'Chemistry: Pre-Engineering syllabus',
    ],
    engineering_english: [
      'English: grammar, reading, writing for engineering applicants',
    ],
  },

  'nts-gat': {
    general_math: [
      'Quantitative reasoning: algebra, geometry, data analysis (GRE-style)',
      'Statistics: descriptive, inferential statistics',
      'Number theory and arithmetic reasoning',
      'Data interpretation: tables, charts, graphs',
    ],
    english: [
      'Verbal reasoning: reading comprehension (GRE-level passages)',
      'Vocabulary: context-based, analogies',
      'Sentence equivalence and text completion',
      'Critical reasoning: argument analysis',
    ],
  },

  // ── Revenue Authorities ────────────────────────────────────────────────────
  'pra-assistant': {
    pakistan_studies: [
      'Punjab Revenue Authority (PRA) Act 2012: mandate, services under PRA jurisdiction',
      'Punjab Sales Tax on Services: taxable services, rates, exemptions',
      'Tax registration: PRA registration requirements and process',
      'Filing returns: quarterly returns, payment of sales tax',
      'Audit procedures: PRA audit mechanism, penalty provisions',
      'Punjab Finance Acts: amendments and updates',
      'Tax enforcement: recovery, appeals, Appellate Tribunal',
    ],
    general_math: [
      'Sales tax calculation: taxable value, tax payable',
      'Input tax credit and output tax reconciliation',
      'Financial arithmetic for tax assessment',
    ],
  },

  'srb-assistant': {
    pakistan_studies: [
      'Sindh Revenue Board (SRB) Act: mandate and jurisdiction',
      'Sindh Sales Tax on Services Act 2011',
      'Services taxable under SRB: key categories',
      'Registration, returns, and payment process',
      'Enforcement and audit powers',
      'Sindh finance policy and revenue targets',
    ],
  },

  'kpra-assistant': {
    pakistan_studies: [
      'KP Revenue Authority (KPRA) Act: mandate and functions',
      'KPK Finance Act: sales tax on services provisions',
      'KPRA registration and compliance procedures',
      'Revenue collection and enforcement in KPK',
    ],
  },

  'bra-assistant': {
    pakistan_studies: [
      'Balochistan Revenue Authority (BRA): establishment and mandate',
      'Balochistan Sales Tax on Services Act',
      'BRA registration and compliance',
      'Revenue enforcement in Balochistan',
    ],
  },

  // ── Rescue 1122 ───────────────────────────────────────────────────────────
  'rescue-1122-rescuer': {
    everyday_science: [
      'First aid: CPR, Heimlich maneuver, wound care, fracture management',
      'Fire science: combustion triangle, fire types (A, B, C, D), extinguisher use',
      'Rescue operations: flood rescue, building collapse, road accident response',
      'Disaster management: earthquake, flood, fire, chemical spill response',
      'Medical emergencies: cardiac arrest, stroke, anaphylaxis',
      'Stretcher handling and patient transport techniques',
      'Personal protective equipment (PPE) for rescue workers',
      'Knot tying and rope rescue basics',
      'Water rescue: swimming, use of ropes and life rings',
      'CBRN awareness: chemical, biological, radiological, nuclear basics',
    ],
    pakistan_studies: [
      'Punjab Emergency Service Act 2006: Rescue 1122 mandate',
      'Rescue 1122 call center procedures: call handling, dispatch',
      'Punjab Disaster Management Authority (PDMA) structure',
      'National Disaster Management Authority (NDMA) role',
      'Pakistan disaster history: 2005 earthquake, 2010 floods',
    ],
    islamiat: [
      'Islamic teachings on helping others: hadith on saving lives',
      'Islamic ethics for emergency responders: duty, sacrifice',
    ],
  },

  'rescue-1122-driver': {
    everyday_science: [
      'Vehicle maintenance basics: engine, brakes, tires, hydraulics',
      'Emergency driving: convoy protocols, traffic laws for emergency vehicles',
      'Basic first aid knowledge for rescue drivers',
      'Fire engine operation: pump systems, aerial ladder basics',
    ],
    general_knowledge: [
      'Pakistan traffic laws: Motor Vehicles Ordinance',
      'Road signs and signals',
      'Punjab road network: major highways, emergency routes in cities',
    ],
  },

  'rescue-1122-computer-operator': {
    basic_computer: [
      'Rescue 1122 dispatch system: computer-aided dispatch (CAD)',
      'GIS and mapping: location tracking of rescue teams',
      'Database management: incident records, patient data',
      'Communication systems: radio, telephone, digital dispatch',
      'MS Office for rescue administration: reports, statistics',
      'Data entry accuracy for emergency records',
    ],
  },

  // ── Utility exams (NTS/OTS) ───────────────────────────────────────────────
  'nts-lesco': {
    everyday_science: [
      'Electricity distribution: power lines, substations, transformers',
      'Meter reading and billing: types of meters, units (kWh)',
      'LESCO (Lahore Electric Supply Company) area and functions',
      'Load shedding management and load balancing',
      'Electrical safety: hazards, protective gear, safety standards',
      'Energy conservation techniques',
    ],
    general_math: [
      'Electricity bill calculation: units consumed, tariff slabs',
      'Basic electrical calculations: voltage, current, resistance, power',
      'Unit conversions: kW, kWh, MW',
    ],
  },

  'nts-wapda-energy': {
    everyday_science: [
      'Hydroelectric power: dam operations, penstock, turbines, generators',
      'WAPDA dams: Tarbela (Khyber PK), Mangla (AJK), Chashma, Warsak',
      'Irrigation canals: headworks, canal outlets, watercourses',
      'Flood control: barrage operations, spillways',
      'Renewable energy: solar, wind projects by WAPDA',
      'NEPRA: electricity regulation in Pakistan',
    ],
  },

  // ── NAB ───────────────────────────────────────────────────────────────────
  'nab-investigation-officer': {
    pakistan_studies: [
      'NAB Ordinance 1999: establishment, powers, mandate',
      'Corruption offenses: definition, types, penalties under NAB',
      'Asset declaration laws: elected and public officials',
      'National Anti-Corruption Strategy (NACS)',
      'Whistleblower Protection Act',
      'Money laundering: detection, investigation, prosecution',
      'FATF: recommendations, Pakistan\'s compliance',
      'International cooperation: Mutual Legal Assistance (MLAT)',
      'NAB investigation process: inquiry, investigation, reference, plea bargain',
    ],
    general_knowledge: [
      'Major corruption cases in Pakistan (context awareness)',
      'Transparency International: Corruption Perceptions Index',
      'Anti-corruption agencies globally: comparison',
      'Corporate governance: fraud prevention, audit, compliance',
    ],
  },

  // ── PPSC Specialized ──────────────────────────────────────────────────────
  'ppsc-drug-inspector': {
    everyday_science: [
      'Drug Act 1976: licensing, inspection, enforcement powers',
      'Drug Regulatory Authority of Pakistan (DRAP): registration, quality control',
      'Pharmaceutical manufacturing: GMP (Good Manufacturing Practices)',
      'Drug storage and transport standards: cold chain',
      'Counterfeit and substandard drugs: detection, penalties',
      'Drug abuse: narcotics, psychotropics, controlled substances',
      'Drug testing: pharmacopoeial standards, laboratory testing',
      'Human body and drug interaction: pharmacokinetics, pharmacodynamics basics',
      'Antimicrobial resistance (AMR): global concern, Pakistan policy',
    ],
  },

  'ppsc-food-inspector': {
    everyday_science: [
      'Pakistan Pure Food Regulations 1965 and 2018: key provisions',
      'Food adulteration: common adulterants, detection methods',
      'Foodborne diseases: bacteria (Salmonella, E. coli), viruses, toxins',
      'Food storage and preservation: refrigeration, canning, drying',
      'Food labeling requirements: Pakistan Standards',
      'Nutritional standards: macronutrients, micronutrients in food',
      'Pakistan Standards and Quality Control Authority (PSQCA) role',
      'Food processing industries: dairy, meat, grain',
    ],
  },

  'ppsc-agriculture-officer': {
    everyday_science: [
      'Crop science: cereals (wheat, rice, maize), cash crops (cotton, sugarcane)',
      'Kharif and Rabi crops of Pakistan: sowing, harvesting seasons',
      'Soil science: types, pH, nutrient composition, fertility management',
      'Fertilizers: types (Urea, DAP, SOP), application methods, overuse problems',
      'Pesticides and herbicides: classification, safe use, environmental impact',
      'Irrigation methods: flood, furrow, drip, sprinkler',
      'Plant diseases: fungal, bacterial, viral; prevention and treatment',
      'Crop pests: locusts, aphids, stem borers; Integrated Pest Management (IPM)',
      'Agricultural machinery: tractors, combine harvesters, threshers',
      'Livestock in Pakistan: cattle, buffalo, sheep, goat — breeds and management',
      'Green Revolution and agricultural productivity',
      'Pakistan Agriculture Policy and subsidies',
    ],
    pakistan_studies: [
      'Agriculture\'s share in Pakistan GDP and employment',
      'Punjab Agriculture Department: extension services, ARI',
      'National Food Security Policy',
      'Water scarcity and agriculture: Indus Waters Treaty',
    ],
  },

  'ppsc-fisheries-officer': {
    everyday_science: [
      'Fisheries resources: marine, inland (rivers, lakes, ponds)',
      'Fish species of Pakistan: Rohu, Catla, Tilapia, hilsa, pomfret',
      'Fish farming (aquaculture): pond preparation, seed, feeding, harvesting',
      'Fish diseases and treatment',
      'Fishing regulations: closed seasons, size limits, gear restrictions',
      'Marine fishing: trawling, gill nets, purse seines',
      'Fisheries Act and fisheries policy of Pakistan',
      'Karachi fish harbor: operations, cold chain',
    ],
    pakistan_studies: [
      'Pakistan fishing industry: economic importance, export',
      'Balochistan and Sindh coastline fisheries',
    ],
  },

  'ppsc-forest-officer': {
    everyday_science: [
      'Forest types in Pakistan: tropical, subtropical, alpine, riverine, mangroves',
      'Forest Act 1927: provisions, offenses, penalties',
      'Punjab Forest Department: structure, services',
      'Afforestation and reforestation: techniques, species selection',
      'Wildlife protection: WWF Pakistan, IUCN Red List species in Pakistan',
      'Wildlife Act 1974: protected species, hunting restrictions',
      'National parks and protected areas: Margalla Hills, Chitral Gol, Hingol',
      'Deforestation: causes, consequences, solutions',
      'Timber management: sustainable forestry practices',
      'Agro-forestry: trees with crops systems',
      'Billion Tree Tsunami: KPK and Pakistan afforestation project',
    ],
  },

  'ppsc-livestock-officer': {
    everyday_science: [
      'Animal husbandry: cattle, buffalo, sheep, goat, poultry management',
      'Livestock breeds of Pakistan: Sahiwal, Nili-Ravi buffalo, Beetal goat',
      'Animal nutrition: feeds, fodder, nutritional requirements',
      'Livestock diseases: FMD, PPR, Anthrax, Brucellosis — vaccines and treatment',
      'Veterinary basics: vaccination, deworming, hoof care',
      'Dairy farming: milk yield, milking hygiene, cold chain',
      'Poultry farming: broiler and layer management',
      'Pakistan Livestock Policy and economic importance',
      'Livestock extension services',
    ],
  },

  'ppsc-pharmacist': {
    everyday_science: [
      'Drug regulatory framework: DRAP Act 2012, Drug Act 1976',
      'Pharmacology: drug categories, mechanism of action basics',
      'Pharmaceutical forms: tablets, capsules, syrups, injections, patches',
      'Drug storage and dispensing: cold chain, controlled drugs',
      'Prescription drugs vs OTC: categories, dispensing rules',
      'Essential Medicines List: WHO and Pakistan national list',
      'Drug interactions: common interactions to avoid',
      'Antibiotics: classes, appropriate use, antimicrobial resistance',
      'Pharmacy practice: dispensing, counseling, record keeping',
      'Quality control in pharmacies: GPhP (Good Pharmacy Practice)',
    ],
  },

  // ── Additional police/security ─────────────────────────────────────────────
  'police-motorway-si': {
    pakistan_studies: [
      'National Highway and Motorway Police (NH&MP) Act 2007',
      'Pakistan motorway network: M-1 to M-9, NHA major roads',
      'Traffic laws: Motor Vehicles Ordinance 1965',
      'Road safety regulations: speed limits, seat belts, drunk driving',
      'Accident investigation and reporting procedures',
      'CCTV and surveillance on motorways: Trafigura system',
      'Patrol and enforcement on highways',
      'Accident first response: NH&MP coordination with Rescue 1122',
    ],
  },

  'police-motorway-constable': {
    pakistan_studies: [
      'NH&MP: role and mandate, ranks',
      'Traffic rules: motorway-specific rules (minimum/maximum speed)',
      'Road signs and markings on motorways',
      'Emergency procedures: accident response, vehicle breakdown',
      'Public dealing and motorist assistance',
    ],
  },

  // ── PPSC Assistant Director / Research Officer ─────────────────────────────
  'ppsc-assistant-director': {
    pakistan_studies: [
      'Pakistan public administration: federal and provincial structure',
      'Civil service rules: Efficiency and Discipline Rules, Conduct Rules',
      'Policy making process: policy formulation, implementation, evaluation',
      'Public finance management: MTBF, budget cycle, PFM Act',
      'Project management: PC-1, PC-2, CDWP, ECNEC procedures',
      'Anti-corruption and accountability: NAB, FIA, Ombudsman',
      'RTI (Right to Information): provincial RTI Acts',
      'E-governance and digital Pakistan initiatives',
      'Human resource management in public sector',
      'Urban and rural development planning',
    ],
    current_affairs: [
      'Pakistan governance reforms: NCGR, devolution under 18th Amendment',
      'CPEC governance and project monitoring',
      'SDGs: Pakistan\'s progress on Sustainable Development Goals',
      'Public sector reform programs: performance management',
    ],
  },

  'ppsc-research-officer': {
    general_math: [
      'Research methodology: quantitative and qualitative methods',
      'Statistics: descriptive, inferential, regression, correlation',
      'Survey design: sampling methods, questionnaire design',
      'Data analysis tools: SPSS concepts, Excel data analysis',
      'Report writing: presenting research findings',
      'Literature review: academic database searching, citation styles',
    ],
    pakistan_studies: [
      'Pakistan social indicators: poverty, inequality, HDI',
      'Punjab development indicators: MICS, DHIS data',
      'Pakistan economic data: GDP, fiscal deficit, trade balance',
      'Planning Commission Pakistan: MTDF, five-year plans (history)',
      'Development research in Pakistan: PIDE, SDPI, IDS research',
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: Get topics for a specific exam + db_table combination
// ─────────────────────────────────────────────────────────────────────────────
export function getTopicsForExamSection(examSlug: string, dbTable: string): string[] {
  const override = EXAM_TOPIC_OVERRIDES[examSlug]?.[dbTable]
  if (override?.length) return override
  const base = TOPICS_BY_DB_TABLE[dbTable]
  if (base?.length) return base
  return [`${dbTable} (add official syllabus topics)`]
}
