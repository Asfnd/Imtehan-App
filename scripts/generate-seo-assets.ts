/**
 * Generate raster SEO/social assets from brand SVGs.
 *
 * Why: SVG OG images do NOT render on Facebook, X/Twitter, WhatsApp, LinkedIn,
 * etc., and search engines prefer raster logos. This produces the PNG/JPG
 * assets referenced by metadata, manifest, and structured data.
 *
 * Run: npx tsx scripts/generate-seo-assets.ts
 */
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const PUBLIC = path.join(process.cwd(), 'public')
const BRAND = '#4F46E5' // indigo-600, raster-safe stand-in for the oklch brand blue

// Square brand icon (book glyph), hex only so librsvg/resvg rasterizes cleanly.
function iconSvg(size: number, pad = 0) {
  const bg = size
  const inner = size - pad * 2
  const s = inner / 32 // original favicon viewBox is 32
  return `<svg width="${bg}" height="${bg}" viewBox="0 0 ${bg} ${bg}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${bg}" height="${bg}" rx="${pad > 0 ? 0 : bg * 0.22}" fill="${BRAND}"/>
  <g transform="translate(${pad},${pad}) scale(${s})" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M8 22V10c0-.5.5-1.5 2-2 1.5-.5 4-.5 6 1v14c-2-1.5-4.5-1.5-6-1-1.5.5-2 1-2 1z"/>
    <path d="M24 22V10c0-.5-.5-1.5-2-2-1.5-.5-4-.5-6 1v14c2-1.5 4.5-1.5 6-1 1.5.5 2 1 2 1z"/>
  </g>
</svg>`
}

async function fromSvgString(svg: string, out: string, opts?: { jpg?: boolean }) {
  const buf = Buffer.from(svg)
  if (opts?.jpg) {
    await sharp(buf, { density: 200 }).jpeg({ quality: 90 }).toFile(out)
  } else {
    await sharp(buf, { density: 200 }).png().toFile(out)
  }
  console.log('✓', path.relative(process.cwd(), out))
}

async function main() {
  // Escape bare ampersands (e.g. "Mock Tests & Detailed Solutions") because librsvg is strict.
  const ogRaw = fs.readFileSync(path.join(PUBLIC, 'og-image.svg'), 'utf8')
  const ogSvg = Buffer.from(ogRaw.replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;'))

  // OG image as PNG + JPG (1200x630). JPG kept because home page metadata references it.
  await sharp(ogSvg, { density: 200 }).png().toFile(path.join(PUBLIC, 'og-image.png'))
  console.log('✓ og-image.png')
  await sharp(ogSvg, { density: 200 }).jpeg({ quality: 88 }).toFile(path.join(PUBLIC, 'og-image.jpg'))
  console.log('✓ og-image.jpg')

  // Favicons / icons
  await fromSvgString(iconSvg(16), path.join(PUBLIC, 'favicon-16x16.png'))
  await fromSvgString(iconSvg(32), path.join(PUBLIC, 'favicon-32x32.png'))
  await fromSvgString(iconSvg(180), path.join(PUBLIC, 'apple-touch-icon.png'))
  await fromSvgString(iconSvg(192), path.join(PUBLIC, 'icon-192.png'))
  await fromSvgString(iconSvg(512), path.join(PUBLIC, 'icon-512.png'))
  // Maskable: full-bleed background, icon inset into the safe zone (~20% padding)
  await fromSvgString(iconSvg(512, 96), path.join(PUBLIC, 'icon-512-maskable.png'))
  // Square raster logo for Organization schema (Google prefers raster, min 112x112)
  await fromSvgString(iconSvg(512), path.join(PUBLIC, 'logo.png'))

  // favicon.ico (multi-size) for legacy crawlers/browsers
  await sharp(Buffer.from(iconSvg(48)), { density: 200 })
    .resize(48, 48)
    .toFormat('png')
    .toFile(path.join(PUBLIC, 'favicon-48.png'))
  console.log('✓ favicon-48.png (ico source)')

  console.log('\nAll SEO assets generated.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
