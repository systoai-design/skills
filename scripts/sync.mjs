/* Rebuild skills/ from the canonical per-skill repos.
 *
 *   node scripts/sync.mjs
 *
 * Each skill lives in its own public repo and is ALSO bundled here so that one
 * marketplace install gets all of them. That duplication is the price of a
 * one-command install, and duplication drifts, so this script is the only
 * sanctioned way to update the bundle: it re-clones each source at depth 1 and
 * replaces the directory wholesale. Never hand-edit anything under skills/.
 *
 * Excluded from the bundle: .git, node_modules, and showcase/. Showcase media is
 * demo material for a repo's own landing page, and manifesto alone carries 9MB of
 * it. Nobody installing a skill needs to download the demo reel. */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, mkdirSync, cpSync, existsSync, readdirSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const ORG = 'systoai-design'
const SKIP = new Set(['.git', 'node_modules', 'showcase'])

/* Order matters: this is the order they appear in the README and on the site. */
export const SKILLS = [
  'artboard',
  'swipefile',
  'manifesto',
  'motion-brief',
  'motion-graphics-director',
  'hyperframes-render-discipline',
  'threejs-scroll-sites',
]

function size(dir) {
  let n = 0, bytes = 0
  const walk = d => readdirSync(d, { withFileTypes: true }).forEach(e => {
    if (SKIP.has(e.name)) return
    const p = join(d, e.name)
    if (e.isDirectory()) walk(p); else { n++; bytes += statSync(p).size }
  })
  walk(dir)
  return { n, mb: (bytes / 1048576).toFixed(1) }
}

const tmp = mkdtempSync(join(tmpdir(), 'systo-skills-'))
const dest = join(ROOT, 'skills')
let total = 0

try {
  for (const s of SKILLS) {
    const src = join(tmp, s)
    execFileSync('git', ['clone', '-q', '--depth', '1', `https://github.com/${ORG}/${s}.git`, src],
      { stdio: ['ignore', 'ignore', 'inherit'] })

    if (!existsSync(join(src, 'SKILL.md'))) throw new Error(`${s} has no SKILL.md at its root`)

    const out = join(dest, s)
    rmSync(out, { recursive: true, force: true })
    mkdirSync(out, { recursive: true })
    cpSync(src, out, { recursive: true, filter: p => !p.split(/[\\/]/).some(seg => SKIP.has(seg)) })

    const { n, mb } = size(out)
    total += Number(mb)
    console.log(`${s.padEnd(32)} ${String(n).padStart(4)} files  ${mb.padStart(6)} MB`)
  }
  console.log(`${''.padEnd(32)} ${'total'.padStart(4)}        ${total.toFixed(1)} MB`)
} finally {
  rmSync(tmp, { recursive: true, force: true })
}
