#!/usr/bin/env node
/* Install the Systo skills for any agent that reads the Agent Skills format.
 *
 *   npx github:systoai-design/skills            # auto-detect, install for all found
 *   node scripts/install.mjs --target codex     # or: claude, antigravity, cursor, here
 *   node scripts/install.mjs --list             # show where each target installs to
 *
 * Claude Code users do not need this: `/plugin marketplace add systoai-design/skills`
 * then `/plugin install systo@systo` is the supported path and handles updates.
 * This exists for Codex, Antigravity and Cursor, which read SKILL.md folders from
 * a directory but have no marketplace fetch of their own.
 *
 * Paths below are each tool's documented skills directory. `.agents/skills` is
 * shared: Codex and Antigravity both read it at workspace level, so a project
 * install serves both at once. */
import { cpSync, mkdirSync, existsSync, readdirSync, rmSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'skills')
const HOME = homedir()

const TARGETS = {
  claude: { label: 'Claude Code (user)', dir: join(HOME, '.claude', 'skills') },
  codex: { label: 'Codex CLI (user)', dir: join(HOME, '.agents', 'skills') },
  antigravity: { label: 'Antigravity (global)', dir: join(HOME, '.gemini', 'config', 'skills') },
  cursor: { label: 'Cursor (user)', dir: join(HOME, '.cursor', 'skills') },
  // Codex and Antigravity both read .agents/skills from the working directory
  // upward, so this one install covers both for the current project.
  here: { label: 'this project (Codex + Antigravity)', dir: join(process.cwd(), '.agents', 'skills') },
}

const args = process.argv.slice(2)
const pick = args.includes('--target') ? args[args.indexOf('--target') + 1] : null
const force = args.includes('--force')

if (args.includes('--list') || args.includes('-l')) {
  console.log('\nSysto skills install locations:\n')
  for (const [k, t] of Object.entries(TARGETS)) {
    console.log(`  ${k.padEnd(12)} ${t.label.padEnd(38)} ${t.dir}`)
  }
  console.log('\n  --target <name> to choose one. Default installs to every tool already on this machine.\n')
  process.exit(0)
}

if (!existsSync(SRC)) {
  console.error('No skills/ directory. Run this from a clone of systoai-design/skills.')
  process.exit(1)
}
const skills = readdirSync(SRC, { withFileTypes: true })
  .filter(e => e.isDirectory() && existsSync(join(SRC, e.name, 'SKILL.md')))
  .map(e => e.name)

if (!skills.length) { console.error('skills/ contains no SKILL.md folders.'); process.exit(1) }

/* Default to whatever is actually installed, rather than scattering skill folders
 * into config directories for tools the user does not have. `here` is opt-in
 * because writing into the current project is a bigger assumption. */
let chosen
if (pick) {
  if (!TARGETS[pick]) {
    console.error(`Unknown target "${pick}". One of: ${Object.keys(TARGETS).join(', ')}`)
    process.exit(1)
  }
  chosen = [[pick, TARGETS[pick]]]
} else {
  chosen = Object.entries(TARGETS)
    .filter(([k, t]) => k !== 'here' && existsSync(dirname(t.dir)))
  if (!chosen.length) {
    console.error('No supported agent found on this machine. Pass --target here to install into this project,')
    console.error('or --list to see every location.')
    process.exit(1)
  }
}

console.log(`\nInstalling ${skills.length} skills\n`)
for (const [key, t] of chosen) {
  mkdirSync(t.dir, { recursive: true })
  let written = 0, skipped = 0
  for (const s of skills) {
    const dest = join(t.dir, s)
    if (existsSync(dest) && !force) { skipped++; continue }
    rmSync(dest, { recursive: true, force: true })
    cpSync(join(SRC, s), dest, { recursive: true })
    written++
  }
  const note = skipped ? `  (${skipped} already present, --force to overwrite)` : ''
  console.log(`  ${t.label.padEnd(38)} ${String(written).padStart(2)} installed${note}`)
  console.log(`  ${''.padEnd(38)} ${t.dir}\n`)
}
console.log('Restart your agent, or start a new session, for the skills to load.\n')
