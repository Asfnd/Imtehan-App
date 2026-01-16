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
    publicR2: `https://pub-67225b43c28cc0f6b36a9d5c5ad11b31.r2.dev`,
  },
  get baseUrl() {
    return this.urls.customDomain || this.urls.directR2
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
  return `${R2_CONFIG.baseUrl}/${encodedSubject}/${year}/${encodedFilename}`
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
