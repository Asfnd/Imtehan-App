import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'
import { ArticleSchema } from '@/components/seo/StructuredData'
import { Breadcrumb } from '@/components/seo/Breadcrumb'

export const metadata: Metadata = {
  title: 'Islamic Studies for CSS: Complete Syllabus & Topics | Imtehan',
  description: 'Detailed breakdown of Islamic Studies syllabus for CSS exam. Understand key topics, important themes, and effective study approach for success.',
  alternates: {
    canonical: 'https://imtehan.com/blog/islamic-studies-css-complete-syllabus',
  },
  openGraph: {
    title: 'Islamic Studies CSS Syllabus',
    description: 'Complete syllabus and study guide for Islamic Studies.',
    url: 'https://imtehan.com/blog/islamic-studies-css-complete-syllabus',
    type: 'article',
    publishedTime: '2024-12-22T00:00:00Z',
  },
}

const content = `Islamic Studies is a core compulsory subject in the CSS examination and appears in every paper. Success requires understanding both religious teachings and their historical-political context. This guide covers the complete syllabus.

## Syllabus Overview

The Islamic Studies curriculum covers:
- Islamic history and personalities
- Quranic teachings and principles
- Hadith and Islamic jurisprudence
- Islamic political and economic systems
- Islam in contemporary world

## Major Topics

### Part 1: Life of Prophet Muhammad (PBUH)

**Pre-Islamic Arabia**
- Social structure (tribes, trade, slavery)
- Religious beliefs and practices
- Economic conditions
- Literary achievements

**Early Life of Prophet**
- Birth and early years
- Marriage to Hazrat Khadija
- Spiritual experiences
- First revelations

**Prophethood in Makkah (13 years)**
- Early converts
- Opposition from Quraysh
- Persecution of believers
- Boycott of Hashim

**Hijrah and Madinah Period**
- Migration and its significance
- Medina Constitution
- Treaties (Hudaybiyyah, etc.)
- Battles and military strategies

**Later Life**
- Consolidation of Islamic state
- Conquest of Mecca
- Farewell pilgrimage
- Legacy and significance

### Part 2: Quran and its Teachings

**Quran as Divine Revelation**
- Structure and chapters
- Revelation sequence
- Compilation history
- Preserved nature

**Core Teachings**
- Monotheism (Tawhid)
- Justice and equity
- Mercy and compassion
- Knowledge and wisdom
- Rights and responsibilities

**Jurisprudential Principles**
- Qiyas (analogy)
- Ijma (consensus)
- Ijtihad (independent reasoning)
- Maslaha (public interest)

### Part 3: Hadith and Sunnah

**Collection and Compilation**
- Oral tradition to written
- Famous Hadith collectors
- Verification methods
- Six major Hadith collections

**Classification**
- Authentic, good, weak grades
- Sound chains (Isnad)
- Text analysis (Matn)

**Practical Application**
- Daily practices (Salah, Zakat, etc.)
- Social etiquette
- Business ethics
- Family relations

### Part 4: Islamic History

**Early Islamic State**
- Four Rightly Guided Caliphs
- Major conquests
- Administration systems
- Expansion of Islamic empire

**Umayyad Period (661-750 CE)**
- Political development
- Military achievements
- Cultural contributions
- Decline factors

**Abbasid Period (750-1258 CE)**
- Golden age of Islam
- Scientific advancement
- Architectural achievements
- Administrative structure

**Islamic Spain and Other Regions**
- Islamic civilization in Spain
- Contributions to Europe
- Cultural synthesis
- Scientific heritage

### Part 5: Islamic Political System

**Caliphate Concept**
- Definition and purpose
- Qualifications of Caliph
- Methods of selection
- Historical practices

**Governance Principles**
- Consultation (Shura)
- Justice system
- Rights of subjects
- Accountability mechanisms

**Islamic Law (Sharia)**
- Sources of law
- Development of schools
- Contemporary application
- Comparative analysis

### Part 6: Islamic Economics

**Economic Principles**
- Prohibition of Riba (interest)
- Zakat system
- Waqf institution
- Trade ethics

**Social Welfare**
- Protection of poor
- Worker rights
- Prohibition of exploitation
- Community responsibility

### Part 7: Contemporary Islam

**Modern Muslim States**
- Islamic republics
- Secularism vs. Islamization
- Reform movements
- Contemporary challenges

**Issues and Movements**
- Extremism and terrorism
- Women in Islam
- Education and science
- Interfaith relations

## Study Approach

### Phase 1: Foundational Knowledge (2-3 weeks)
- Read comprehensive Islamic history book
- Understand chronological development
- Note major personalities and events
- Create timeline charts

### Phase 2: Detailed Learning (4-6 weeks)
- Study each topic systematically
- Focus on Quranic and Hadith evidence
- Understand historical context
- Note interconnections

### Phase 3: Thematic Analysis (2-3 weeks)
- Identify recurring themes
- Connect topics across eras
- Analyze contemporary relevance
- Prepare essay topics

### Phase 4: Revision and Practice (2-3 weeks)
- Solve MCQs regularly
- Write essays on key topics
- Answer past paper questions
- Get feedback on answers

## High-Frequency Topics

Appearing in 80%+ of CSS papers:
- Prophet Muhammad's (PBUH) life
- Quranic teachings on justice
- Four Rightly Guided Caliphs
- Islamic legal system
- Islamic contributions to civilization

## Common Essay Topics

- Role of Islam in shaping civilizations
- Islamic principles of governance
- Women's rights in Islam
- Islam and democracy
- Islamic approach to science and education
- Unity and diversity in Islamic world
- Contemporary challenges for Islam

## Effective Memorization

For historical dates and personalities:
- Create flashcards with key dates
- Group events by era
- Use mnemonic devices
- Connect to world events
- Review regularly (spaced repetition)

## Resources for Study

Imtehan provides:
- 500+ Islamic Studies MCQs
- Detailed explanations
- Historical context
- Topic-wise organization
- Performance tracking

Success in Islamic Studies comes from combining knowledge of teachings with historical understanding. Practice regularly on Imtehan to build confidence!`

export default function BlogPost() {
  const articleSchema = {
    title: 'Islamic Studies for CSS: Complete Syllabus & Topics',
    description: 'Detailed breakdown of Islamic Studies syllabus for CSS exam.',
    content,
    publishDate: '2024-12-22',
    url: 'https://imtehan.com/blog/islamic-studies-css-complete-syllabus',
  }

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <ArticleSchema {...articleSchema} />
      <NavigationBar />

      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        <Breadcrumb
          items={[
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: 'Islamic Studies', url: '#' },
          ]}
          className="mb-8"
        />

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Islamic Studies for CSS: Complete Syllabus & Topics
        </h1>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-gray-600 mb-8 pb-8 border-b">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>December 22, 2024</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span>Imtehan Team</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>13 min read</span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          {content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('##')) {
              return (
                <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  {paragraph.replace('## ', '')}
                </h2>
              )
            }
            if (paragraph.startsWith('###')) {
              return (
                <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  {paragraph.replace('### ', '')}
                </h3>
              )
            }
            if (paragraph.startsWith('- ')) {
              return (
                <ul key={index} className="list-disc list-inside space-y-2 text-gray-700">
                  {paragraph.split('\n').map((item, i) => (
                    <li key={i}>{item.replace('- ', '')}</li>
                  ))}
                </ul>
              )
            }
            return (
              <p key={index} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            )
          })}
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Master Islamic Studies with practice
          </h3>
          <p className="text-gray-700 mb-4">
            Access 500+ Islamic Studies MCQs with detailed explanations on Imtehan.
          </p>
          <Link
            href="/css/css-practice/subjects"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Practice Now
          </Link>
        </div>
      </article>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-16 border-t">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Link
            href="/blog/css-exam-preparation-guide-2025"
            className="group p-6 bg-white rounded-lg border hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
              CSS Exam Guide
            </h3>
            <p className="text-gray-600 text-sm">Master the CSS examination.</p>
          </Link>
          <Link
            href="/blog/pakistan-affairs-mcqs-top-100-questions"
            className="group p-6 bg-white rounded-lg border hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
              Pakistan Affairs MCQs
            </h3>
            <p className="text-gray-600 text-sm">Practice essential questions.</p>
          </Link>
        </div>
      </section>
    </main>
  )
}
