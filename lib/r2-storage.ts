/**
 * R2 Storage - Cloudflare R2 URL generation
 * PDFs are served through /api/pdf/proxy to allow iframe embedding
 */

const R2_CONFIG = {
  accountId: '67225b43c28cc0f6b36a9d5c5ad11b31',
  bucketName: 'past-papers',
  urls: {
    customDomain: process.env.NEXT_PUBLIC_R2_CUSTOM_DOMAIN
      ? `https://${process.env.NEXT_PUBLIC_R2_CUSTOM_DOMAIN}`
      : null,
    directR2: `https://67225b43c28cc0f6b36a9d5c5ad11b31.r2.cloudflarestorage.com`,
    publicR2: `https://pub-b79915de15ce4fb583c638c3c7043a1f.r2.dev`,
  },
  get baseUrl() {
    // Fallback to public R2 if custom domain not set (temporary during migration)
    return this.urls.customDomain || this.urls.publicR2
  }
}

function encodePathSegment(segment: string): string {
  return encodeURIComponent(segment)
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
}

export function getR2PastPaperUrl(subject: string, year: number, filename: string): string {
  const encodedSubject = encodePathSegment(subject)
  const encodedFilename = encodePathSegment(filename)
  const url = `${R2_CONFIG.baseUrl}/${encodedSubject}/${year}/${encodedFilename}`
  console.log('📦 Generated R2 URL:', url)
  console.log('   Base URL:', R2_CONFIG.baseUrl)
  console.log('   Subject:', subject, '→', encodedSubject)
  console.log('   Year:', year)
  console.log('   Filename:', filename, '→', encodedFilename)
  return url
}

export function getR2SolvedPaperUrl(filename: string): string {
  const encodedFilename = encodePathSegment(filename)
  return `${R2_CONFIG.baseUrl}/Solved Paper/${encodedFilename}`
}

export function getR2GuessPaperUrl(filename: string): string {
  const encodedFilename = encodePathSegment(filename)
  return `${R2_CONFIG.baseUrl}/Guess Papers/${encodedFilename}`
}

export function getR2BaseUrl(): string {
  return R2_CONFIG.baseUrl
}

export function getR2BucketName(): string {
  return R2_CONFIG.bucketName
}
