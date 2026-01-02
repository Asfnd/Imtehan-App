import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'
import { ArticleSchema } from '@/components/seo/StructuredData'
import { Breadcrumb } from '@/components/seo/Breadcrumb'

export const metadata: Metadata = {
  title: 'CSS Compulsory Subjects: Complete Overview & Study Tips | Imtehan',
  description: 'Master all 7 CSS compulsory subjects including English, Urdu, Islamic Studies, Pakistan Affairs, Current Affairs, General Knowledge, and Everyday Science.',
  alternates: {
    canonical: 'https://imtehan.com/blog/css-compulsory-subjects-overview',
  },
  openGraph: {
    title: 'CSS Compulsory Subjects Overview',
    description: 'Complete guide to all 7 CSS compulsory subjects.',
    url: 'https://imtehan.com/blog/css-compulsory-subjects-overview',
    type: 'article',
    publishedTime: '2025-01-01T00:00:00Z',
  },
}

const content = `CSS examination requires mastery of seven compulsory subjects. These subjects form the foundation of your exam and account for 70% of total marks. This guide covers each subject's importance and preparation strategy.

## The Seven Compulsory Subjects

### 1. English (100 Marks)
**Format**: Essay (40 marks) + Objective (60 marks)

**What's Tested**:
- Essay writing on given topics
- Reading comprehension
- Grammar and vocabulary
- Paraphrasing

**Preparation Strategy**:
- Read quality newspapers and articles daily
- Practice writing 2-3 essays per week
- Master essay structure: introduction, body, conclusion
- Build vocabulary through reading
- Solve comprehension passages under timed conditions

**Time Allocation**: 3-4 hours weekly

### 2. Urdu (100 Marks)
**Format**: Essay (50 marks) + Objective (50 marks)

**What's Tested**:
- Essay writing in Urdu
- Reading comprehension
- Grammar and vocabulary
- Idioms and phrases

**Preparation Strategy**:
- Read Urdu newspapers and literary works
- Write essays on current affairs topics
- Understand Urdu grammar rules
- Learn idioms and proverbs
- Practice handwriting clarity

**Time Allocation**: 2-3 hours weekly

### 3. Islamic Studies (100 Marks)
**Format**: Essay (50 marks) + Objective (50 marks)

**What's Tested**:
- Prophet Muhammad's life
- Quranic teachings
- Islamic history
- Islamic political system

**Preparation Strategy**:
- Read Islamic history books
- Understand Quranic verses and Hadith
- Study constitutional development
- Connect Islamic teachings to modern issues
- Practice date memorization

**Time Allocation**: 4-5 hours weekly

### 4. Pakistan Affairs (100 Marks)
**Format**: Essay (50 marks) + Objective (50 marks)

**What's Tested**:
- Pakistan's geography
- Historical events
- Political system
- Current national issues

**Preparation Strategy**:
- Read Pakistan studies books
- Follow current affairs closely
- Understand geographical features
- Learn dates of important events
- Practice on Imtehan's 600+ MCQs

**Time Allocation**: 4-5 hours weekly

### 5. Current Affairs (100 Marks)
**Format**: Objective questions only (100 marks)

**What's Tested**:
- Recent national events
- International relations
- Economic news
- Political developments
- Environmental issues

**Preparation Strategy**:
- Read newspapers daily (must-do)
- Follow news channels
- Read international news sources
- Make current affairs notes monthly
- Practice recent MCQs regularly

**Time Allocation**: 1-2 hours daily

### 6. General Knowledge & Ability (100 Marks)
**Format**: Objective questions (100 marks)

**What's Tested**:
- General factual knowledge
- Scientific discoveries
- Historical facts
- Geographical information
- Logical reasoning

**Preparation Strategy**:
- Read widely on diverse topics
- Follow science magazines
- Learn important dates and facts
- Practice logical reasoning
- Solve 20+ MCQs daily

**Time Allocation**: 1-2 hours daily

### 7. Everyday Science (100 Marks)
**Format**: Objective questions (100 marks)

**What's Tested**:
- Physics, Chemistry, Biology basics
- Medical science
- Technology and innovations
- Environmental science
- Daily life science

**Preparation Strategy**:
- Review school-level science
- Read science news and discoveries
- Understand application of science
- Learn scientific terminology
- Practice 30+ MCQs daily

**Time Allocation**: 1-2 hours daily

## Subject-wise Time Allocation

**Daily Schedule** (6 hours):
- Current Affairs: 1 hour (newspaper reading)
- General Knowledge: 30 minutes (MCQs + reading)
- Everyday Science: 30 minutes (MCQs)
- English Essay: 1 hour (writing practice)
- Islamic Studies: 1 hour (reading + revision)
- Pakistan Affairs: 1 hour (reading + MCQs)
- Urdu: 30 minutes (reading + writing)

## Scoring Tips

1. **English**: 75-80% achievable through consistent writing practice
2. **Urdu**: 70-75% achievable for Urdu speakers, lower for non-speakers
3. **Islamic Studies**: 75-80% achievable with thorough preparation
4. **Pakistan Affairs**: 70-75% achievable with newspaper reading
5. **Current Affairs**: 60-70% achievable (continuously updating)
6. **General Knowledge**: 65-70% achievable (broad reading)
7. **Everyday Science**: 70-75% achievable (school knowledge refresh)

## Weak Area Management

If struggling with any subject:
- Allocate extra time
- Use online resources
- Join study groups
- Seek tutor help
- Practice regularly

## Integration Strategy

Connect subjects through current affairs:
- Science news connects to Everyday Science
- International relations to Pakistan Affairs
- Policy changes to Islamic Studies principles
- New developments to General Knowledge

Master these seven compulsory subjects with Imtehan's 10,000+ MCQs organized by subject!`

export default function BlogPost() {
  const articleSchema = {
    title: 'CSS Compulsory Subjects: Complete Overview & Study Tips',
    description: 'Master all 7 CSS compulsory subjects with comprehensive study strategies.',
    content,
    publishDate: '2025-01-01',
    url: 'https://imtehan.com/blog/css-compulsory-subjects-overview',
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
            { name: 'Compulsory Subjects', url: '#' },
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
          CSS Compulsory Subjects: Complete Overview & Study Tips
        </h1>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-gray-600 mb-8 pb-8 border-b">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>January 1, 2025</span>
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
            if (paragraph.startsWith('1.')) {
              return (
                <ol key={index} className="list-decimal list-inside space-y-2 text-gray-700">
                  {paragraph.split('\n').map((item, i) => (
                    <li key={i}>{item.replace(/^\d+\.\s*/, '')}</li>
                  ))}
                </ol>
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
            Practice all compulsory subjects on Imtehan
          </h3>
          <p className="text-gray-700 mb-4">
            10,000+ MCQs organized by subject with performance tracking.
          </p>
          <Link
            href="/css/css-practice/subjects"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Practicing
          </Link>
        </div>
      </article>
    </main>
  )
}
