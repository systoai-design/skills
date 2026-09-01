# Systo Skills

Seven Agent Skills for design and motion work. Every one is a plain
`SKILL.md` folder following the open Agent Skills format, so any agent that
reads that format can use them: Claude Code, OpenAI Codex, Google Antigravity,
Cursor, OpenCode.

## Where the skills are

`skills/<name>/SKILL.md`, seven of them:

| Skill | Use it when |
|---|---|
| `artboard` | Recutting a static creative to another aspect ratio, rebranding a captured composition, auditing why a creative works, or authoring a new one |
| `swipefile` | Capturing a reference site's design system by measurement, cloning a site, or extracting a brand kit |
| `manifesto` | Replicating a motion-graphics video frame for frame, or deriving a new film from its measured skeleton |
| `motion-brief` | Turning a video reference into a script and direction document, before anything is built |
| `motion-graphics-director` | Starting any "make a video" request, to decide how much production pipeline it actually needs |
| `hyperframes-render-discipline` | Finalising render timing, or verifying any render or frame capture |
| `threejs-scroll-sites` | Building scroll-driven Three.js, pinned sections, scroll-linked camera paths |

Read the skill's own `SKILL.md` before acting on its subject. Each one states
its own triggers in its frontmatter `description`.

## Rules for working in this repository

- **`skills/` is generated. Never hand-edit it.** Each skill has its own
  upstream repository under `github.com/systoai-design`, and `scripts/sync.mjs`
  re-clones every one and replaces the directory wholesale. Edits made here are
  destroyed on the next sync. Send changes to the upstream repo instead.
- `.claude-plugin/marketplace.json` and `.cursor-plugin/marketplace.json` are
  parallel manifests for the same bundle. Change one, change the other.
- Node 18 or newer. Individual skills declare their own dependencies; the
  bundle itself has none.
