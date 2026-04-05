/**
 * Renders each public/marketing/*.html to a matching .png (same basename).
 * Run: npm run export-marketing-pngs
 * Requires: npm install && npx playwright install chromium
 *
 * If launch fails with "Executable doesn't exist", unset PLAYWRIGHT_BROWSERS_PATH
 * (the npm script does this) and install browsers so they land in the default
 * ~/Library/Caches/ms-playwright cache on macOS.
 */

import { chromium } from 'playwright'
import { join } from 'path'
import { pathToFileURL } from 'url'
import { existsSync } from 'fs'

const MARKETING = join(process.cwd(), 'public', 'marketing')

/** Viewport must match fixed dimensions in each HTML artboard */
const JOBS: { file: string; w: number; h: number }[] = [
  { file: 'showcase-mcq-premium-1080.html', w: 1080, h: 1080 },
  { file: 'showcase-mcq-premium-1350.html', w: 1080, h: 1350 },
  { file: 'showcase-mcq-igfb-square.html', w: 1080, h: 1080 },
  { file: 'showcase-mcq-igfb-vertical.html', w: 1080, h: 1350 },
  { file: 'imtehan-mcq-ui-stories-9x16.html', w: 1080, h: 1920 },
  { file: 'mcq-social-post-wide-1920.html', w: 1920, h: 1080 },
  { file: 'mcq-social-post-dark.html', w: 1080, h: 1080 },
  { file: 'mcq-social-post-light.html', w: 1080, h: 1350 },
  { file: 'mcq-social-post-mobile-9x16.html', w: 1080, h: 1920 },
]

async function main() {
  const browser = await chromium.launch({ headless: true })
  try {
    for (const { file, w, h } of JOBS) {
      const htmlPath = join(MARKETING, file)
      if (!existsSync(htmlPath)) {
        console.warn(`Skip (missing): ${file}`)
        continue
      }
      const page = await browser.newPage({
        viewport: { width: w, height: h },
        deviceScaleFactor: 1,
      })
      await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load', timeout: 60_000 })
      await new Promise((r) => setTimeout(r, 600))
      const outPath = htmlPath.replace(/\.html$/i, '.png')
      await page.screenshot({ path: outPath, type: 'png', clip: { x: 0, y: 0, width: w, height: h } })
      await page.close()
      console.log(`Wrote ${outPath}`)
    }
  } finally {
    await browser.close()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
