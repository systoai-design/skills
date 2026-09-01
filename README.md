# Systo Skills

**The skills our operators actually use on client work. Free, MIT, installable in one line.**

These are not demo repos. Every one of them exists because a real job needed it,
and each carries the specific mistakes that produced it. They are [Claude
Code](https://claude.com/claude-code) skills, so they run inside your terminal
against your own files.

## Install

```
/plugin marketplace add systoai-design/skills
```

```
/plugin install systo@systo
```

Type those two into Claude Code. That is the whole thing. All seven skills are
then available in every session.

To update later:

```
/plugin marketplace update systo
```

Prefer one skill rather than all of them? Each has its own repo, linked below.

## What is in here

| Skill | What it does |
|---|---|
| [artboard](skills/artboard) | Recut a static creative into another aspect ratio as a real re-layout instead of a crop, rebrand a captured composition, audit why one works, or author a new one. Remembers every composition it studies in a library that compounds. |
| [swipefile](skills/swipefile) | Capture a reference site's design system by measurement rather than by eye: layout, tokens, typography, interaction states, animation. Match, adapt, or extend. |
| [manifesto](skills/manifesto) | Replicate a motion-graphics video frame for frame from a file or URL, or build a new film on its measured skeleton with your own copy, brand and voice. |
| [motion-brief](skills/motion-brief) | Turn a video reference into a script and direction document before anything gets built. The boring step that decides whether the rest works. |
| [motion-graphics-director](skills/motion-graphics-director) | The process layer that runs before any tool-specific motion skill and decides how much real pipeline a piece actually needs. |
| [hyperframes-render-discipline](skills/hyperframes-render-discipline) | Six verification habits for render and capture work. Each maps to a bug that shipped, or nearly did, without it. |
| [threejs-scroll-sites](skills/threejs-scroll-sites) | Scroll-driven Three.js: pinned sections, camera paths, progress-linked shaders, and an idle render governor that stops the draw loop when nothing moves. |

## Why these exist

Systo runs AI operations for clients. A named human is accountable for each one,
and nothing ships without that person checking it. Skills are how the checking
gets written down: when something breaks, the fix goes into a skill so it cannot
break the same way twice.

Publishing them costs us nothing and the feedback is worth more than the secrecy.

## A worked example

`artboard` ships a runnable one. `examples/systo-papier-mache/poster.mjs` builds a
1080x1920 poster out of torn paper with no image model and no Photoshop: every
edge is a contour with noise pushed along its normals, the pale fringe is the same
contour grown outward by a varying amount, and the whole thing re-renders at any
size or colour because it is a script. The library entry beside it records what
went wrong four times before it looked right.

## Contributing

Issues and pull requests welcome on any of the individual repos. This repo is a
bundle: everything under `skills/` is synced from those repos by
`node scripts/sync.mjs`, so changes made here get overwritten. Send them upstream.

## Licence

MIT. Take them, fork them, ship with them, sell what you build with them.

---

Built by [Systo](https://systo-ai.com). If you would rather someone just ran this
for you, the calendar is at [systo-ai.com/book](https://systo-ai.com/book).
