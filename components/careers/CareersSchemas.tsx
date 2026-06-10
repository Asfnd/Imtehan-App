import { FAQSchema } from '@/components/seo/StructuredData'
import { HIRING_FAQ, OPEN_ROLES } from '@/lib/careers-data'

export function CareersSchemas() {
  const jobPostings = {
    '@context': 'https://schema.org',
    '@graph': OPEN_ROLES.map((role) => ({
      '@type': 'JobPosting',
      title: role.title,
      description: role.summary,
      identifier: {
        '@type': 'PropertyValue',
        name: 'Imtehan',
        value: role.id,
      },
      datePosted: '2026-01-01',
      employmentType: role.type.includes('Contract') ? 'CONTRACTOR' : 'FULL_TIME',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'Imtehan',
        sameAs: 'https://imtehan.com',
        logo: 'https://imtehan.com/logo.png',
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'PK',
        },
      },
      applicantLocationRequirements: {
        '@type': 'Country',
        name: 'Pakistan',
      },
      jobLocationType: 'TELECOMMUTE',
      directApply: true,
      url: `https://imtehan.com/careers#${role.id}`,
    })),
  }

  return (
    <>
      <FAQSchema items={HIRING_FAQ} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostings) }}
      />
    </>
  )
}
