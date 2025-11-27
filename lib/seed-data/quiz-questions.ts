import type { Question, QuizTopic } from '../supabase/types'

export interface SeedQuestion extends Omit<Question, 'id'> {
  topic: QuizTopic
}

export const seedQuestions: SeedQuestion[] = [
  // Pakistan Affairs - Easy
  {
    topic: 'Pakistan Affairs',
    question_text: 'What is the capital of Pakistan?',
    options: ['Karachi', 'Lahore', 'Islamabad', 'Peshawar'],
    correct_answer: 'Islamabad',
    explanation:
      'Islamabad became the capital of Pakistan in 1967, replacing Karachi.',
    difficulty: 1,
  },
  {
    topic: 'Pakistan Affairs',
    question_text: 'When did Pakistan gain independence?',
    options: ['August 14, 1947', 'August 15, 1947', 'July 14, 1947', 'September 14, 1947'],
    correct_answer: 'August 14, 1947',
    explanation:
      'Pakistan gained independence from British rule on August 14, 1947.',
    difficulty: 1,
  },
  {
    topic: 'Pakistan Affairs',
    question_text: 'Who is known as the founder of Pakistan?',
    options: ['Allama Iqbal', 'Liaquat Ali Khan', 'Quaid-e-Azam Muhammad Ali Jinnah', 'Fatima Jinnah'],
    correct_answer: 'Quaid-e-Azam Muhammad Ali Jinnah',
    explanation:
      'Muhammad Ali Jinnah, known as Quaid-e-Azam, is the founder of Pakistan.',
    difficulty: 1,
  },
  {
    topic: 'Pakistan Affairs',
    question_text: 'What is the national language of Pakistan?',
    options: ['Punjabi', 'Urdu', 'English', 'Sindhi'],
    correct_answer: 'Urdu',
    explanation:
      'Urdu is the national language of Pakistan, though English is also an official language.',
    difficulty: 1,
  },
  {
    topic: 'Pakistan Affairs',
    question_text: 'Which is the largest province of Pakistan by area?',
    options: ['Punjab', 'Sindh', 'Balochistan', 'Khyber Pakhtunkhwa'],
    correct_answer: 'Balochistan',
    explanation:
      'Balochistan is the largest province of Pakistan by area, covering about 44% of the country.',
    difficulty: 1,
  },

  // Pakistan Affairs - Medium
  {
    topic: 'Pakistan Affairs',
    question_text: 'When was the Constitution of Pakistan 1973 adopted?',
    options: ['April 10, 1973', 'August 14, 1973', 'March 23, 1973', 'December 25, 1973'],
    correct_answer: 'April 10, 1973',
    explanation:
      'The Constitution of Pakistan 1973 was adopted on April 10, 1973, and came into effect on August 14, 1973.',
    difficulty: 2,
  },
  {
    topic: 'Pakistan Affairs',
    question_text: 'Who was the first Prime Minister of Pakistan?',
    options: ['Muhammad Ali Jinnah', 'Liaquat Ali Khan', 'Khawaja Nazimuddin', 'Hussain Shaheed Suhrawardy'],
    correct_answer: 'Liaquat Ali Khan',
    explanation:
      'Liaquat Ali Khan served as the first Prime Minister of Pakistan from 1947 until his assassination in 1951.',
    difficulty: 2,
  },
  {
    topic: 'Pakistan Affairs',
    question_text: 'What is the name of Pakistan\'s national anthem?',
    options: ['Pak Sarzameen', 'Qaumi Taranah', 'Dil Dil Pakistan', 'Jeevay Pakistan'],
    correct_answer: 'Qaumi Taranah',
    explanation:
      'Qaumi Taranah (National Anthem) was written by Hafeez Jalandhari and composed by Ahmad G. Chagla.',
    difficulty: 2,
  },

  // Islamiat - Easy
  {
    topic: 'Islamiat',
    question_text: 'How many pillars of Islam are there?',
    options: ['3', '4', '5', '6'],
    correct_answer: '5',
    explanation:
      'The five pillars of Islam are: Shahada (faith), Salah (prayer), Zakat (charity), Sawm (fasting), and Hajj (pilgrimage).',
    difficulty: 1,
  },
  {
    topic: 'Islamiat',
    question_text: 'What is the first pillar of Islam?',
    options: ['Prayer', 'Fasting', 'Shahada (Declaration of Faith)', 'Charity'],
    correct_answer: 'Shahada (Declaration of Faith)',
    explanation:
      'Shahada is the declaration of faith: "There is no god but Allah, and Muhammad is His messenger."',
    difficulty: 1,
  },
  {
    topic: 'Islamiat',
    question_text: 'How many times do Muslims pray each day?',
    options: ['3', '4', '5', '6'],
    correct_answer: '5',
    explanation:
      'Muslims perform five daily prayers: Fajr, Dhuhr, Asr, Maghrib, and Isha.',
    difficulty: 1,
  },
  {
    topic: 'Islamiat',
    question_text: 'In which month do Muslims fast?',
    options: ['Muharram', 'Ramadan', 'Shawwal', 'Dhul Hijjah'],
    correct_answer: 'Ramadan',
    explanation:
      'Muslims fast during the month of Ramadan, the ninth month of the Islamic calendar.',
    difficulty: 1,
  },
  {
    topic: 'Islamiat',
    question_text: 'What is the holy book of Islam?',
    options: ['Torah', 'Bible', 'Quran', 'Vedas'],
    correct_answer: 'Quran',
    explanation:
      'The Quran is the holy book of Islam, revealed to Prophet Muhammad (PBUH) over 23 years.',
    difficulty: 1,
  },

  // Islamiat - Medium
  {
    topic: 'Islamiat',
    question_text: 'How many Surahs are in the Quran?',
    options: ['110', '114', '120', '124'],
    correct_answer: '114',
    explanation:
      'The Quran contains 114 Surahs (chapters), starting with Al-Fatiha and ending with An-Nas.',
    difficulty: 2,
  },
  {
    topic: 'Islamiat',
    question_text: 'What is the meaning of "Zakat"?',
    options: ['Prayer', 'Fasting', 'Charity/Almsgiving', 'Pilgrimage'],
    correct_answer: 'Charity/Almsgiving',
    explanation:
      'Zakat is obligatory charity, typically 2.5% of wealth, given to those in need.',
    difficulty: 2,
  },

  // General Knowledge - Easy
  {
    topic: 'General Knowledge',
    question_text: 'How many continents are there in the world?',
    options: ['5', '6', '7', '8'],
    correct_answer: '7',
    explanation:
      'The seven continents are: Asia, Africa, North America, South America, Antarctica, Europe, and Australia.',
    difficulty: 1,
  },
  {
    topic: 'General Knowledge',
    question_text: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correct_answer: 'Pacific Ocean',
    explanation:
      'The Pacific Ocean is the largest ocean, covering about 46% of Earth\'s water surface.',
    difficulty: 1,
  },
  {
    topic: 'General Knowledge',
    question_text: 'How many days are in a leap year?',
    options: ['364', '365', '366', '367'],
    correct_answer: '366',
    explanation:
      'A leap year has 366 days, with an extra day added to February (29th).',
    difficulty: 1,
  },
  {
    topic: 'General Knowledge',
    question_text: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Rome'],
    correct_answer: 'Paris',
    explanation:
      'Paris is the capital and largest city of France, known as the "City of Light".',
    difficulty: 1,
  },
  {
    topic: 'General Knowledge',
    question_text: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correct_answer: 'Mars',
    explanation:
      'Mars is called the Red Planet due to iron oxide (rust) on its surface.',
    difficulty: 1,
  },

  // General Knowledge - Medium
  {
    topic: 'General Knowledge',
    question_text: 'Who wrote "Romeo and Juliet"?',
    options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
    correct_answer: 'William Shakespeare',
    explanation:
      'William Shakespeare wrote Romeo and Juliet around 1594-1596.',
    difficulty: 2,
  },
  {
    topic: 'General Knowledge',
    question_text: 'What is the smallest country in the world?',
    options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'],
    correct_answer: 'Vatican City',
    explanation:
      'Vatican City is the smallest country, with an area of about 0.44 square kilometers.',
    difficulty: 2,
  },

  // Current Affairs - Easy
  {
    topic: 'Current Affairs',
    question_text: 'What does UN stand for?',
    options: ['United Nations', 'Universal Network', 'Union of Nations', 'United Network'],
    correct_answer: 'United Nations',
    explanation:
      'The United Nations is an international organization founded in 1945.',
    difficulty: 1,
  },
  {
    topic: 'Current Affairs',
    question_text: 'What does WHO stand for?',
    options: ['World Health Organization', 'World Human Organization', 'World Help Organization', 'World Hospital Organization'],
    correct_answer: 'World Health Organization',
    explanation:
      'WHO is a specialized agency of the UN responsible for international public health.',
    difficulty: 1,
  },
  {
    topic: 'Current Affairs',
    question_text: 'What does GDP stand for?',
    options: ['Gross Domestic Product', 'General Development Plan', 'Global Development Product', 'Gross Development Plan'],
    correct_answer: 'Gross Domestic Product',
    explanation:
      'GDP measures the total value of goods and services produced in a country.',
    difficulty: 1,
  },

  // Math - Easy
  {
    topic: 'Math',
    question_text: 'What is 15 + 27?',
    options: ['40', '42', '44', '46'],
    correct_answer: '42',
    explanation: '15 + 27 = 42',
    difficulty: 1,
  },
  {
    topic: 'Math',
    question_text: 'What is 8 × 7?',
    options: ['54', '56', '58', '60'],
    correct_answer: '56',
    explanation: '8 × 7 = 56',
    difficulty: 1,
  },
  {
    topic: 'Math',
    question_text: 'What is 100 ÷ 4?',
    options: ['20', '25', '30', '35'],
    correct_answer: '25',
    explanation: '100 ÷ 4 = 25',
    difficulty: 1,
  },
  {
    topic: 'Math',
    question_text: 'What is 50% of 200?',
    options: ['50', '75', '100', '150'],
    correct_answer: '100',
    explanation: '50% of 200 = 200 × 0.5 = 100',
    difficulty: 1,
  },
  {
    topic: 'Math',
    question_text: 'What is the square root of 64?',
    options: ['6', '7', '8', '9'],
    correct_answer: '8',
    explanation: '√64 = 8, because 8 × 8 = 64',
    difficulty: 1,
  },

  // Math - Medium
  {
    topic: 'Math',
    question_text: 'What is 15² (15 squared)?',
    options: ['200', '215', '225', '235'],
    correct_answer: '225',
    explanation: '15² = 15 × 15 = 225',
    difficulty: 2,
  },
  {
    topic: 'Math',
    question_text: 'If a triangle has angles of 60° and 70°, what is the third angle?',
    options: ['40°', '50°', '60°', '70°'],
    correct_answer: '50°',
    explanation:
      'The sum of angles in a triangle is 180°. So 180° - 60° - 70° = 50°',
    difficulty: 2,
  },
  {
    topic: 'Math',
    question_text: 'What is 20% of 150?',
    options: ['20', '25', '30', '35'],
    correct_answer: '30',
    explanation: '20% of 150 = 150 × 0.20 = 30',
    difficulty: 2,
  },
  {
    topic: 'Islamiat',
    question_text: 'In which month do Muslims fast?',
    options: ['Shawwal', 'Ramadan', 'Muharram', 'Rajab'],
    correct_answer: 'Ramadan',
    explanation:
      'Muslims fast during the month of Ramadan, the ninth month of the Islamic calendar.',
    difficulty: 1,
  },
  {
    topic: 'Islamiat',
    question_text: 'What is the holy book of Islam?',
    options: ['Torah', 'Bible', 'Quran', 'Vedas'],
    correct_answer: 'Quran',
    explanation:
      'The Quran is the holy book of Islam, revealed to Prophet Muhammad (PBUH) over 23 years.',
    difficulty: 1,
  },
  {
    topic: 'Islamiat',
    question_text: 'How many times do Muslims pray daily?',
    options: ['3', '4', '5', '6'],
    correct_answer: '5',
    explanation:
      'Muslims pray five times daily: Fajr, Dhuhr, Asr, Maghrib, and Isha.',
    difficulty: 1,
  },
  {
    topic: 'Islamiat',
    question_text: 'What is Zakat?',
    options: ['Prayer', 'Fasting', 'Charity', 'Pilgrimage'],
    correct_answer: 'Charity',
    explanation:
      'Zakat is the obligatory charity that Muslims give to help the poor and needy.',
    difficulty: 1,
  },
  {
    topic: 'Islamiat',
    question_text: 'Where is the Kaaba located?',
    options: ['Medina', 'Mecca', 'Jerusalem', 'Cairo'],
    correct_answer: 'Mecca',
    explanation:
      'The Kaaba is located in Mecca, Saudi Arabia, and is the holiest site in Islam.',
    difficulty: 1,
  },
  {
    topic: 'Islamiat',
    question_text: 'How many Surahs are in the Quran?',
    options: ['110', '112', '114', '116'],
    correct_answer: '114',
    explanation:
      'The Quran contains 114 Surahs (chapters).',
    difficulty: 1,
  },
  {
    topic: 'Islamiat',
    question_text: 'What is the first Surah of the Quran?',
    options: ['Al-Baqarah', 'Al-Fatiha', 'Al-Ikhlas', 'An-Nas'],
    correct_answer: 'Al-Fatiha',
    explanation:
      'Al-Fatiha (The Opening) is the first Surah of the Quran.',
    difficulty: 1,
  },
  {
    topic: 'Islamiat',
    question_text: 'In which city was Prophet Muhammad (PBUH) born?',
    options: ['Medina', 'Mecca', 'Jerusalem', 'Damascus'],
    correct_answer: 'Mecca',
    explanation:
      'Prophet Muhammad (PBUH) was born in Mecca in 570 CE.',
    difficulty: 1,
  },
  {
    topic: 'Islamiat',
    question_text: 'What is the Islamic calendar based on?',
    options: ['Solar year', 'Lunar year', 'Both solar and lunar', 'Seasonal changes'],
    correct_answer: 'Lunar year',
    explanation:
      'The Islamic calendar is based on the lunar year, consisting of 12 lunar months.',
    difficulty: 2,
  },

  // General Knowledge
  {
    topic: 'General Knowledge',
    question_text: 'How many continents are there?',
    options: ['5', '6', '7', '8'],
    correct_answer: '7',
    explanation:
      'There are 7 continents: Africa, Antarctica, Asia, Europe, North America, Australia, and South America.',
    difficulty: 1,
  },
  {
    topic: 'General Knowledge',
    question_text: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correct_answer: 'Pacific Ocean',
    explanation:
      'The Pacific Ocean is the largest ocean, covering about 46% of Earth\'s water surface.',
    difficulty: 1,
  },
  {
    topic: 'General Knowledge',
    question_text: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correct_answer: 'Mars',
    explanation:
      'Mars is called the Red Planet because of its reddish appearance caused by iron oxide on its surface.',
    difficulty: 1,
  },
  {
    topic: 'General Knowledge',
    question_text: 'How many days are in a leap year?',
    options: ['364', '365', '366', '367'],
    correct_answer: '366',
    explanation:
      'A leap year has 366 days, with an extra day added to February (29th).',
    difficulty: 1,
  },
  {
    topic: 'General Knowledge',
    question_text: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Rome'],
    correct_answer: 'Paris',
    explanation:
      'Paris is the capital and largest city of France.',
    difficulty: 1,
  },
  {
    topic: 'General Knowledge',
    question_text: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
    correct_answer: 'Leonardo da Vinci',
    explanation:
      'Leonardo da Vinci painted the Mona Lisa in the early 16th century.',
    difficulty: 1,
  },
  {
    topic: 'General Knowledge',
    question_text: 'What is the largest mammal in the world?',
    options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Polar Bear'],
    correct_answer: 'Blue Whale',
    explanation:
      'The Blue Whale is the largest mammal, reaching lengths of up to 100 feet.',
    difficulty: 1,
  },
  {
    topic: 'General Knowledge',
    question_text: 'Which is the smallest country in the world?',
    options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'],
    correct_answer: 'Vatican City',
    explanation:
      'Vatican City is the smallest country in the world, with an area of about 0.44 km².',
    difficulty: 2,
  },
  {
    topic: 'General Knowledge',
    question_text: 'What is the speed of light?',
    options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '600,000 km/s'],
    correct_answer: '300,000 km/s',
    explanation:
      'The speed of light in vacuum is approximately 300,000 kilometers per second.',
    difficulty: 2,
  },
  {
    topic: 'General Knowledge',
    question_text: 'Who invented the telephone?',
    options: ['Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla', 'Guglielmo Marconi'],
    correct_answer: 'Alexander Graham Bell',
    explanation:
      'Alexander Graham Bell is credited with inventing the telephone in 1876.',
    difficulty: 1,
  },
  {
    topic: 'General Knowledge',
    question_text: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    correct_answer: 'Au',
    explanation:
      'Au is the chemical symbol for gold, derived from the Latin word "aurum".',
    difficulty: 2,
  },

  // Current Affairs
  {
    topic: 'Current Affairs',
    question_text: 'Which organization was awarded the Nobel Peace Prize in 2020?',
    options: ['WHO', 'World Food Programme', 'UNICEF', 'Red Cross'],
    correct_answer: 'World Food Programme',
    explanation:
      'The World Food Programme was awarded the Nobel Peace Prize in 2020 for its efforts to combat hunger.',
    difficulty: 2,
  },
  {
    topic: 'Current Affairs',
    question_text: 'What is the name of the first COVID-19 vaccine approved for emergency use?',
    options: ['Moderna', 'Pfizer-BioNTech', 'AstraZeneca', 'Johnson & Johnson'],
    correct_answer: 'Pfizer-BioNTech',
    explanation:
      'The Pfizer-BioNTech vaccine was the first COVID-19 vaccine to receive emergency use authorization.',
    difficulty: 2,
  },
  {
    topic: 'Current Affairs',
    question_text: 'Which country hosted the 2022 FIFA World Cup?',
    options: ['Russia', 'Brazil', 'Qatar', 'Germany'],
    correct_answer: 'Qatar',
    explanation:
      'Qatar hosted the 2022 FIFA World Cup, the first World Cup held in the Middle East.',
    difficulty: 1,
  },
  {
    topic: 'Current Affairs',
    question_text: 'Who is the current Secretary-General of the United Nations?',
    options: ['Ban Ki-moon', 'António Guterres', 'Kofi Annan', 'Boutros Boutros-Ghali'],
    correct_answer: 'António Guterres',
    explanation:
      'António Guterres has been serving as UN Secretary-General since January 2017.',
    difficulty: 2,
  },
  {
    topic: 'Current Affairs',
    question_text: 'What is the name of the Mars rover that landed in 2021?',
    options: ['Curiosity', 'Opportunity', 'Perseverance', 'Spirit'],
    correct_answer: 'Perseverance',
    explanation:
      'NASA\'s Perseverance rover successfully landed on Mars in February 2021.',
    difficulty: 2,
  },

  // Math
  {
    topic: 'Math',
    question_text: 'What is 15 + 27?',
    options: ['40', '41', '42', '43'],
    correct_answer: '42',
    explanation:
      '15 + 27 = 42',
    difficulty: 1,
  },
  {
    topic: 'Math',
    question_text: 'What is 8 × 7?',
    options: ['54', '55', '56', '57'],
    correct_answer: '56',
    explanation:
      '8 × 7 = 56',
    difficulty: 1,
  },
  {
    topic: 'Math',
    question_text: 'What is 100 ÷ 4?',
    options: ['20', '25', '30', '35'],
    correct_answer: '25',
    explanation:
      '100 ÷ 4 = 25',
    difficulty: 1,
  },
  {
    topic: 'Math',
    question_text: 'What is 12²?',
    options: ['124', '134', '144', '154'],
    correct_answer: '144',
    explanation:
      '12² = 12 × 12 = 144',
    difficulty: 1,
  },
  {
    topic: 'Math',
    question_text: 'What is the square root of 81?',
    options: ['7', '8', '9', '10'],
    correct_answer: '9',
    explanation:
      '√81 = 9 because 9 × 9 = 81',
    difficulty: 1,
  },
  {
    topic: 'Math',
    question_text: 'What is 50% of 200?',
    options: ['50', '75', '100', '150'],
    correct_answer: '100',
    explanation:
      '50% of 200 = 0.5 × 200 = 100',
    difficulty: 1,
  },
  {
    topic: 'Math',
    question_text: 'What is 3/4 as a decimal?',
    options: ['0.25', '0.5', '0.75', '1.0'],
    correct_answer: '0.75',
    explanation:
      '3/4 = 3 ÷ 4 = 0.75',
    difficulty: 1,
  },
  {
    topic: 'Math',
    question_text: 'What is the perimeter of a square with side length 5?',
    options: ['15', '20', '25', '30'],
    correct_answer: '20',
    explanation:
      'Perimeter of square = 4 × side = 4 × 5 = 20',
    difficulty: 1,
  },
  {
    topic: 'Math',
    question_text: 'If x + 5 = 12, what is x?',
    options: ['5', '6', '7', '8'],
    correct_answer: '7',
    explanation:
      'x + 5 = 12, so x = 12 - 5 = 7',
    difficulty: 2,
  },
  {
    topic: 'Math',
    question_text: 'What is 15% of 80?',
    options: ['10', '11', '12', '13'],
    correct_answer: '12',
    explanation:
      '15% of 80 = 0.15 × 80 = 12',
    difficulty: 2,
  },
  {
    topic: 'Math',
    question_text: 'What is the area of a circle with radius 7? (Use π ≈ 22/7)',
    options: ['144', '154', '164', '174'],
    correct_answer: '154',
    explanation:
      'Area = πr² = (22/7) × 7² = (22/7) × 49 = 154',
    difficulty: 2,
  },
  {
    topic: 'Math',
    question_text: 'What is 2³ + 3²?',
    options: ['15', '16', '17', '18'],
    correct_answer: '17',
    explanation:
      '2³ + 3² = 8 + 9 = 17',
    difficulty: 2,
  },

  // More Pakistan Affairs
  {
    topic: 'Pakistan Affairs',
    question_text: 'What is the national flower of Pakistan?',
    options: ['Rose', 'Jasmine', 'Lotus', 'Sunflower'],
    correct_answer: 'Jasmine',
    explanation:
      'Jasmine (Chambeli) is the national flower of Pakistan.',
    difficulty: 1,
  },
  {
    topic: 'Pakistan Affairs',
    question_text: 'What is the national animal of Pakistan?',
    options: ['Lion', 'Tiger', 'Markhor', 'Snow Leopard'],
    correct_answer: 'Markhor',
    explanation:
      'The Markhor, a wild goat species, is the national animal of Pakistan.',
    difficulty: 1,
  },
  {
    topic: 'Pakistan Affairs',
    question_text: 'Which river is the longest in Pakistan?',
    options: ['Jhelum', 'Chenab', 'Indus', 'Ravi'],
    correct_answer: 'Indus',
    explanation:
      'The Indus River is the longest river in Pakistan, flowing about 3,180 km.',
    difficulty: 1,
  },
  {
    topic: 'Pakistan Affairs',
    question_text: 'What is the highest mountain peak in Pakistan?',
    options: ['Nanga Parbat', 'K2', 'Broad Peak', 'Gasherbrum'],
    correct_answer: 'K2',
    explanation:
      'K2, at 8,611 meters, is the highest mountain in Pakistan and the second highest in the world.',
    difficulty: 2,
  },
]
