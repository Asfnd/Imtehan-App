import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react'
import NavigationBar from '@/components/NavigationBar'
import { ArticleSchema } from '@/components/seo/StructuredData'
import { Breadcrumb } from '@/components/seo/Breadcrumb'

export const metadata: Metadata = {
  title: 'Best CSS Preparation Books & Online Resources 2025 | Imtehan',
  description: 'Comprehensive list of recommended books, websites, and resources for CSS exam preparation covering all subjects with expert reviews.',
  alternates: {
    canonical: 'https://imtehan.com/blog/best-css-preparation-books-resources',
  },
  openGraph: {
    title: 'Best CSS Preparation Books & Resources',
    description: 'Expert-recommended resources for CSS exam preparation.',
    url: 'https://imtehan.com/blog/best-css-preparation-books-resources',
    type: 'article',
    publishedTime: '2024-12-18T00:00:00Z',
  },
}

const content = `Choosing the right preparation resources is crucial for CSS success. With countless books and websites available, it's easy to get overwhelmed. This guide recommends proven resources used by top CSS candidates.

## English Language Books

### Grammar & Composition
- **"A Dictionary of Modern English Usage" by H.W. Fowler**
  - Comprehensive grammar reference
  - Essential for essays and comprehension
  - Investment: PKR 1,500-2,000

- **"English Grammar in Use" by Raymond Murphy**
  - Practical exercises
  - Clear explanations
  - Investment: PKR 800-1,200

### Essay Writing
- **"The Art of Essay Writing" by Khalid Hassan**
  - CSS-specific essay techniques
  - Sample essays with analysis
  - Investment: PKR 600-900

## Islamic Studies Resources

### Recommended Books
- **"Seerat-ul-Nabi" by Allama Ibn-e-Hisham** (Urdu translation)
  - Prophet Muhammad's life
  - Historical accuracy
  - Investment: PKR 1,000-1,500

- **"Islamic Law and Constitution" by Maududi**
  - Political system understanding
  - Jurisprudence basics
  - Investment: PKR 800-1,200

## Pakistan Affairs & Current Affairs

### Essential Reading
- **Newspapers**: Dawn, The News, Express Tribune
  - Daily current affairs
  - Cost: PKR 20-30/day
  - Frequency: Essential daily reading

- **"Administrative History of Pakistan" by Riaz Hassan**
  - Governance structure
  - Government organization
  - Investment: PKR 1,200-1,800

- **"Pakistan: Geography, Economy, Politics" by Stephen P. Cohen**
  - International perspective
  - Comprehensive overview
  - Investment: PKR 2,000-2,800

## General Knowledge & History

### Reference Books
- **"History of Pakistan" by K.K. Aziz**
  - Detailed historical events
  - Independence to present
  - Investment: PKR 1,500-2,200

- **"Oxford Dictionary of World History"**
  - Global context
  - Easy reference
  - Investment: PKR 2,000-2,500

## Online Resources (Free/Paid)

### Free Websites
- **Wikipedia**: Quick reference on any topic
- **BBC Learning English**: Grammar and vocabulary
- **TED Talks**: Current affairs and thinking
- **Coursera**: Subject-specific courses (free audit)
- **YouTube Channels**:
  - CSS MCQs channels (Pakistan-based)
  - TED-Ed (educational videos)
  - Geography and history channels

### Paid Platforms
- **Imtehan**:
  - 10,000+ MCQs
  - Past papers 2015-2023
  - Performance analytics
  - Cost: Subscription-based

- **Online Academies**:
  - Khan Academy
  - Coursera specializations
  - Cost: PKR 500-2,000/month

## Magazines & Journals

### Important Publications
- **"The Economist"**: Global current affairs
- **"National Geographic"**: Geography and environment
- **"Science Magazine"**: Science and innovation updates
- **Monthly Digest of Pakistan**: Local current affairs
  - Cost: PKR 500-800/month

## Study Strategy for Resources

### Phase 1: Foundation (Months 1-2)
- Read core subject books
- Build vocabulary
- Learn essay structure
- Understand history timelines

### Phase 2: Practice (Months 3-4)
- Solve MCQs from Imtehan
- Read newspaper editorials
- Analyze past papers
- Write practice essays

### Phase 3: Revision (Months 5-6)
- Review notes
- Solve more MCQs
- Read recent current affairs
- Mock tests

## Budget-Friendly Approach

**Total investment: PKR 10,000-15,000**
- Core books: PKR 6,000-8,000
- Newspaper subscriptions: PKR 3,000-5,000
- Online platform: PKR 1,000-2,000

**Free Resources**
- University libraries
- Online free courses
- Government publications
- YouTube channels

## Digital vs Physical Books

### Digital Advantages
- Searchable content
- Portable on devices
- Often cheaper
- Updates easier

### Physical Advantages
- Better retention
- Distraction-free reading
- Easier annotation
- Reference ease

## Expert Recommendations

Top CSS candidates use:
1. **Quality newspapers daily** (Non-negotiable)
2. **Subject-specific reference books** (For depth)
3. **MCQ platforms** (For practice)
4. **Past papers** (For patterns)
5. **Selective online courses** (For weak areas)

Don't fall for the trap of buying too many books. Focus on recommended ones and practice consistently.

## Final Tips

- **Prioritize newspapers**: Most important resource
- **Use libraries**: Borrow instead of buying
- **Share resources**: Split costs with study group
- **Focus on practice**: Resources matter only if you practice
- **Quality over quantity**: Few quality books beat many mediocre ones

Success comes from smart resource selection and consistent practice, not from expensive materials. Use Imtehan's comprehensive platform to complement your reading!`

export default function BlogPost() {
  const articleSchema = {
    title: 'Best CSS Preparation Books & Online Resources 2025',
    description: 'Comprehensive list of recommended books and resources for CSS exam preparation.',
    content,
    publishDate: '2024-12-18',
    url: 'https://imtehan.com/blog/best-css-preparation-books-resources',
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
            { name: 'CSS Resources', url: '#' },
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
          Best CSS Preparation Books & Online Resources 2025
        </h1>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-gray-600 mb-8 pb-8 border-b">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>December 18, 2024</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span>Imtehan Team</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>11 min read</span>
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
            if (paragraph.startsWith('- **"')) {
              return (
                <ul key={index} className="list-disc list-inside space-y-3 text-gray-700">
                  {paragraph.split('\n').map((item, i) => (
                    <li key={i} className="ml-4">{item.replace('- ', '')}</li>
                  ))}
                </ul>
              )
            }
            if (paragraph.startsWith('1.') || paragraph.startsWith('- ')) {
              return (
                <ul key={index} className="list-disc list-inside space-y-2 text-gray-700">
                  {paragraph.split('\n').map((item, i) => (
                    <li key={i}>{item.replace(/^[-\d.]\s*/, '')}</li>
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
            Start practicing with quality resources
          </h3>
          <p className="text-gray-700 mb-4">
            Use Imtehan alongside books for comprehensive CSS preparation.
          </p>
          <Link
            href="/css/css-practice/subjects"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Access All Resources
          </Link>
        </div>
      </article>
    </main>
  )
}
