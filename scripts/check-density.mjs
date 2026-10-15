// Density check — the half of the CLAUDE.md density targets that `npm run check` cannot model.
// Renders each section of a course at 1920×1080 with ?capture=1, measures the slide's height and the
// scene's bounding box against their panes, and saves a screenshot per section for the by-eye pass.
//
//   npm run dev                                   # in another terminal
//   npm run density -- lifecycle                  # every section of a course
//   npm run density -- lifecycle four-layers      # just one
//
// Env: BASE_URL (default http://localhost:5173/terraform/), CHROME (a Chromium binary, when
// puppeteer's own download is skipped), OUT (screenshot dir, default .tmp/density — gitignored).
// Flags are targets, not thresholds: it reports, it does not fail.
import { mkdirSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import puppeteer from 'puppeteer'

const [course, ...only] = process.argv.slice(2)
if (!course) {
  console.error('usage: npm run density -- <course> [section-id ...]')
  process.exit(1)
}
const BASE = process.env.BASE_URL ?? 'http://localhost:5173/terraform/'
const OUT = process.env.OUT ?? '.tmp/density'
mkdirSync(OUT, { recursive: true })

const dir = join('src/content', course)
const ids = only.length
  ? only
  : readdirSync(dir)
      .filter((f) => /^\d/.test(f))
      .sort()
      .map((f) => readFileSync(join(dir, f), 'utf8').match(/\bid: '([\w-]+)',/)[1])

const browser = await puppeteer.launch({ executablePath: process.env.CHROME, args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })
const pct = (v) => `${Math.round(v * 100)}%`.padStart(4)

for (const id of ids) {
  await page.goto(`${BASE}?capture=1#/${course}-${id}`, { waitUntil: 'networkidle0' })
  await page.reload({ waitUntil: 'networkidle0' }) // a hash-only goto does not re-fit the scene
  await new Promise((r) => setTimeout(r, 1200)) // fitView settles after first paint
  const m = await page.evaluate(() => {
    const pane = document.querySelector('.scene-area').getBoundingClientRect()
    const nodes = [...document.querySelectorAll('.react-flow__node')].map((n) => n.getBoundingClientRect())
    const eyebrow = document.querySelector('.reel-head__eyebrow').getBoundingClientRect()
    const w = Math.max(...nodes.map((r) => r.right)) - Math.min(...nodes.map((r) => r.left))
    const h = Math.max(...nodes.map((r) => r.bottom)) - Math.min(...nodes.map((r) => r.top))
    return {
      slide: document.querySelector('.slide-panel__scaler').getBoundingClientRect().height / pane.height,
      w: w / pane.width,
      h: h / pane.height,
      eyebrow: nodes.some((r) => r.left < eyebrow.right + 10 && r.top < eyebrow.bottom + 6),
    }
  })
  const flags = [
    m.slide < 0.8 && 'slide<80%',
    m.slide > 0.95 && 'slide>95%',
    Math.max(m.w, m.h) < 0.85 && 'scene axis<85%',
    m.w * m.h < 0.55 && 'scene area<55%',
    m.eyebrow && 'node under eyebrow',
  ].filter(Boolean)
  console.log(`${id.padEnd(28)} slide ${pct(m.slide)}  scene ${pct(m.w)} × ${pct(m.h)} = ${pct(m.w * m.h)}  ${flags.join(', ') || 'ok'}`)
  await page.screenshot({ path: join(OUT, `${course}-${id}.png`) })
}
await browser.close()
