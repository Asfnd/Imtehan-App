import { MetadataRoute } from 'next'
import { EXAM_CONFIGS } from '@/lib/exam-configs'
import { PREMIUM_PAGE_PATH } from '@/lib/routes'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://imtehan.com'
  const currentDate = new Date().toISOString().split('T')[0]

  // Main pages — highest priority
  const mainPages: MetadataRoute.Sitemap = [
    { url: baseUrl,               lastModified: currentDate, changeFrequency: 'weekly',  priority: 1.0  },
    { url: `${baseUrl}/css`,      lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${baseUrl}/mdcat`,    lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${baseUrl}/fsc`,      lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.9  },
    { url: `${baseUrl}/community`,lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.8  },
  ]

  // CSS section pages
  const cssPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/css/subjects`,           lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.9  },
    { url: `${baseUrl}/css/past-papers`,        lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.9  },
    { url: `${baseUrl}/css/solved-papers`,      lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${baseUrl}/css/guess-papers`,       lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${baseUrl}/css/essay-grader`,       lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.9  },
    { url: `${baseUrl}/exams/pms-competitive`,  lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.88 },
    { url: `${baseUrl}/css/css-practice`,       lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.8  },
    { url: `${baseUrl}/css/css-practice/quiz`,  lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${baseUrl}/css/css-practice/idioms`,lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.7  },
    { url: `${baseUrl}/css/css-gsa`,            lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${baseUrl}${PREMIUM_PAGE_PATH}`,      lastModified: currentDate, changeFrequency: 'monthly', priority: 0.85 },
  ]

  // MPT section
  const mptPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/mpt-practice`,           lastModified: currentDate, changeFrequency: 'weekly',  priority: 0.8  },
    { url: `${baseUrl}/mpt-practice/past-papers`,lastModified: currentDate, changeFrequency: 'weekly', priority: 0.75 },
  ]

  // MDCAT section
  const mdcatPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/mdcat/biology`,            lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/mdcat/chemistry`,          lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/mdcat/physics`,            lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/mdcat/english`,            lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8  },
    { url: `${baseUrl}/mdcat/logical-reasoning`,  lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8  },
    { url: `${baseUrl}/mdcat/mock/pmc`,           lastModified: currentDate, changeFrequency: 'monthly',priority: 0.8  },
    { url: `${baseUrl}/mdcat/mock/etea`,          lastModified: currentDate, changeFrequency: 'monthly',priority: 0.8  },
    { url: `${baseUrl}/mdcat/mock/nums`,          lastModified: currentDate, changeFrequency: 'monthly',priority: 0.8  },
    { url: `${baseUrl}/mdcat/mock/aku`,           lastModified: currentDate, changeFrequency: 'monthly',priority: 0.75 },
  ]

  // FSc section
  const fscPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/fsc/biology`,  lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/fsc/chemistry`,lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/fsc/physics`,  lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
  ]

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blog`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    // CSS-focused articles
    { url: `${baseUrl}/blog/css-exam-preparation-guide-2025`,       lastModified: '2026-01-02', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/css-english-essay-structure-examples`,  lastModified: '2026-01-03', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/css-time-management-3-hour-mcq-exam`,   lastModified: '2026-01-03', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/css-english-precis-composition-tips`,   lastModified: '2026-01-03', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/css-past-papers-analysis-trends`,       lastModified: '2026-01-03', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/pakistan-affairs-important-facts-by-year`,lastModified: '2026-01-03', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/css-compulsory-subjects-overview`,      lastModified: '2026-01-01', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/how-to-crack-css-first-attempt`,        lastModified: '2024-12-29', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/best-css-preparation-books-resources`,  lastModified: '2024-12-29', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/pakistan-affairs-mcqs-top-100-questions`,lastModified: '2024-12-28', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/css-interview-preparation`,             lastModified: '2024-12-26', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/css-english-essay-preparation`,         lastModified: '2024-12-25', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/current-affairs-css-how-to-prepare`,    lastModified: '2024-12-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/css-eligibility-criteria-registration`, lastModified: '2024-12-23', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/islamic-studies-css-complete-syllabus`, lastModified: '2024-12-22', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/css-optional-subjects-guide`,           lastModified: '2024-12-21', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/css-past-papers-analysis-what-to-expect`,lastModified: '2024-12-20', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/time-management-css-exam`,              lastModified: '2024-12-19', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/css-mock-test-strategy`,                lastModified: '2024-12-17', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/general-knowledge-css-exam`,            lastModified: '2024-12-16', changeFrequency: 'monthly', priority: 0.8 },
    // New articles — MDCAT, FSc, PPSC, Strategy
    { url: `${baseUrl}/blog/80-20-english-grammar-guide`,           lastModified: '2026-02-20', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/fsc-board-exam-presentation`,           lastModified: '2026-02-20', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/mdcat-biology-mastery-strategy`,        lastModified: '2026-02-20', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/mdcat-physics-shortcuts`,               lastModified: '2026-02-20', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/ppsc-fpsc-general-knowledge-strategy`,  lastModified: '2026-02-20', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/smart-guessing-mcq-strategy`,           lastModified: '2026-02-20', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/social-studying-community-chat-strategy`,lastModified: '2026-02-20', changeFrequency: 'monthly', priority: 0.75 },
    // Feb 2026 batch — strategy, MDCAT, FSc, PPSC, IELTS, NTS, engineering
    { url: `${baseUrl}/blog/forgetting-curve-spaced-repetition`,    lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/mdcat-chemistry-high-yield-topics`,     lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/css-current-affairs-dawn-reading-strategy`, lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/night-before-exam-strategy`,            lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/ppsc-paper-pattern-decoded`,            lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/fsc-chemistry-organic-tips`,            lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/why-smart-students-fail-exams`,         lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/ielts-7-band-without-coaching`,         lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/nts-test-preparation-strategy`,         lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/negative-marking-exam-strategy`,        lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/how-to-study-with-no-motivation`,       lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/engineering-entry-test-pakistan`,       lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/is-coaching-academy-worth-it`,          lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/mdcat-drop-year-decision`,              lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/css-vs-corporate-career`,               lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/css-6-month-preparation-plan`,          lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/what-css-toppers-actually-do`,          lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/css-preparation-while-working`,         lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/fsc-marks-mdcat-trap`,                  lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/why-you-fail-mock-tests`,               lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/exam-prep-myths-pakistan`,              lastModified: '2026-02-24', changeFrequency: 'monthly', priority: 0.8 },
  ]

  // Info pages
  const infoPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/about`,   lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faq`,     lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: currentDate, changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${baseUrl}/terms`,   lastModified: currentDate, changeFrequency: 'yearly',  priority: 0.5 },
  ]

  // Dynamically generated exam + subject pages from all 211 exam configs
  const examPages: MetadataRoute.Sitemap = []

  // /exams browse page
  examPages.push({ url: `${baseUrl}/exams`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 })

  for (const [slug, config] of Object.entries(EXAM_CONFIGS)) {
    // Exam hub page
    examPages.push({
      url: `${baseUrl}/exams/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    })
    // Subject pages
    for (const section of config.sections) {
      examPages.push({
        url: `${baseUrl}/exams/${slug}/${section.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.75,
      })
    }
  }

  return [
    ...mainPages,
    ...cssPages,
    ...mptPages,
    ...mdcatPages,
    ...fscPages,
    ...blogPages,
    ...infoPages,
    ...examPages,
  ]
}
