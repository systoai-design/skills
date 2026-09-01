# Systo Skills

**Seven Agent Skills for design and motion work. Free, MIT, and they work in Claude Code, Codex, Antigravity and Cursor.**

These are not demo repos. Each one exists because a real client job needed it, and
each carries the specific failure that produced it. We publish them because a skill
that only we can read is a skill we cannot get corrected.

```
/plugin marketplace add systoai-design/skills
/plugin install systo@systo
```

<sub>Claude Code. Every other agent is one command too, see [Install](#install).</sub>

---

## Contents

- [Which agents this works in](#which-agents-this-works-in)
- [Install](#install)
- [The seven skills](#the-seven-skills)
- [What they save you](#what-they-save-you)
- [Requirements](#requirements)
- [How Agent Skills work](#how-agent-skills-work)
- [Token cost](#token-cost)
- [Updating and removing](#updating-and-removing)
- [Repository layout](#repository-layout)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [Licence](#licence)

---

## Which agents this works in

Agent Skills is an open format: a folder with a `SKILL.md` at its root, YAML
frontmatter carrying a `name` and a `description`, and optional `scripts/`,
`examples/` and `resources/` beside it. Anthropic originated it and other vendors
adopted it, so the same folder is portable.

Every skill in this repo is exactly that. **Nothing here calls a Claude API, and
nothing here is Claude-specific.** The instructions are markdown and the scripts
are plain Node. What differs between agents is only where the folder has to sit.

| Agent | Supported | How it loads them |
|---|---|---|
| **Claude Code** | Yes, verified | Marketplace install, or `~/.claude/skills/` |
| **OpenAI Codex** | Yes | `.agents/skills/` in a repo, or `~/.agents/skills/` for every project |
| **Google Antigravity** | Yes | `.agents/skills/` in a workspace, or `~/.gemini/config/skills/` globally |
| **Cursor** | Yes | `.cursor-plugin/` manifest, or `~/.cursor/skills/` |
| **OpenCode** and others | Should work | Anything that reads the Agent Skills format |

A useful convergence: **Codex and Antigravity both read `.agents/skills/` from the
working directory upward**, so one install into a project serves both at once.

Honest note on the state of this: the Claude Code path is the one we run daily and
the one we tested end to end before publishing. The Codex, Antigravity and Cursor
paths follow each vendor's documented skills directory and the installer writes to
them correctly, but they get far less mileage from us than the Claude Code path
does. If one misbehaves in your setup, open an issue. That is exactly the feedback
publishing is for.

---

## Install

### Claude Code

The supported path, because it also handles updates.

```
/plugin marketplace add systoai-design/skills
```
```
/plugin install systo@systo
```

Type both into Claude Code. All seven skills are then available in every session.

### Codex, Antigravity, Cursor, or all of them

```bash
npx github:systoai-design/skills
```

With no arguments it detects which agents are on the machine and installs for each
of them. To choose explicitly:

```bash
npx github:systoai-design/skills --target codex
```

Valid targets are `claude`, `codex`, `antigravity`, `cursor`, and `here`. Use
`--list` to print the exact directory each one writes to, and `--force` to
overwrite skills that are already present.

### Into one project only

Useful when you want the skills available to a single repo rather than everywhere,
and it covers Codex and Antigravity together:

```bash
cd your-project && npx github:systoai-design/skills --target here
```

That writes `.agents/skills/<name>/` inside the project. Commit it and your whole
team gets the skills with the repo.

### By hand

Every skill is also its own standalone repository, so take just the one you want:

```bash
git clone https://github.com/systoai-design/artboard ~/.claude/skills/artboard
```

Swap the destination for `~/.agents/skills/` (Codex), `~/.gemini/config/skills/`
(Antigravity), or `.agents/skills/` inside a project.

Start a new session after installing. Agents read their skills directory at
startup.

---

## The seven skills

### artboard

**The problem.** A finished ad is a *layout*, not a picture. Its elements sit where
they do because of the shape of the frame. Crop a 16:9 creative to 9:16 and you do
not get a vertical version, you get the middle of a broken one.

**What it does.** Treats a ratio change as a re-layout: measures what must be
reused, lifts type and third-party logos rather than regenerating them, rebrands a
captured composition with new colour, type and copy while keeping its structure,
audits why a creative works, or authors an original from scratch. Every composition
it studies goes into a library that compounds, so the tenth job knows what the
first nine taught it.

**Worth knowing.** It ships a runnable example that builds a 1080x1920 poster out
of torn paper using no image model and no Photoshop. Every edge is a contour with
noise pushed along its normals. Because it is a script, it re-renders at any size
or colour forever.

**Repo:** [systoai-design/artboard](https://github.com/systoai-design/artboard)

---

### swipefile

**The problem.** "Make it like this site" is not a specification. Eyeballing a
reference gets you something that feels close and is wrong in ways nobody can name.

**What it does.** Captures a reference site's design system by measurement rather
than by eye: layout, tokens, typography, interaction states, easing curves,
animations. Five jobs, from cloning a site faithfully with working navigation, to
applying its system to your own content, to explaining what a page is actually
doing, to extracting a brand kit. Verified by measurement and remembered in a
growing local library.

**Use it when** a rebuild is close but feels wrong and you cannot say why. That is
the case it was built for.

**Repo:** [systoai-design/swipefile](https://github.com/systoai-design/swipefile)

---

### manifesto

**The problem.** Every AI video tool guesses at the reference. You give it
something you like, it produces something adjacent, and there is no way to say what
went wrong because nobody measured the original.

**What it does.** Reads a motion-graphics video frame by frame from a file or a URL
and rebuilds it to match, or takes the measured skeleton and derives a new film
from it, swapping in your copy, brand and voice while keeping the original's cuts
and easing. Also covers the work that follows: replacing a voiceover, composing an
original music bed to clear a borrowed one, and raising the frame rate.

**Repo:** [systoai-design/manifesto](https://github.com/systoai-design/manifesto)

---

### motion-brief

**The problem.** The reason an AI video looks wrong is usually that nobody wrote
the brief. Everyone skips to generating, then blames the model.

**What it does.** Turns a reference into a script and a direction document before a
single frame is made. Beat sheet, storyboard, treatment, direction. The boring step
that decides whether everything after it works.

**Repo:** [systoai-design/motion-brief](https://github.com/systoai-design/motion-brief)

---

### motion-graphics-director

**The problem.** Building a full-detail, fully-polished composition straight from a
one-line brief, discovering after a complete render that the direction was wrong,
and starting over.

**What it does.** The process layer that runs *before* any tool-specific skill. It
encodes the industry stage model (brief, concept, storyboard, style frame,
animatic, production, review, delivery) adapted to agent speed, and decides how
much of that pipeline a given piece actually needs. A title card does not need an
animatic. A brand film does.

**Repo:** [systoai-design/motion-graphics-director](https://github.com/systoai-design/motion-graphics-director)

---

### hyperframes-render-discipline

**The problem.** A blank-frame check that counts bytes will happily pass an
all-black video. The file is the right size, the codec is fine, every frame is
empty.

**What it does.** Six verification habits for render and capture work. Each maps to
a real bug that shipped, or nearly shipped, without it: duration source of truth,
duration verification after render, hard-kill pairing for exit tweens, contrast
re-check when a background changes near text, dumping ground truth once a visual
bug survives two blind fixes, and capturing a canvas through a sink while asserting
the frame is not blank.

**Repo:** [systoai-design/hyperframes-render-discipline](https://github.com/systoai-design/hyperframes-render-discipline)

---

### threejs-scroll-sites

**The problem.** The default Three.js render loop does not care whether anything
changed. It redraws sixty times a second at a standing hero, and the visitor's fan
comes on.

**What it does.** Scroll-driven Three.js properly: pinned sections, scroll-linked
camera paths, parallax, progress-driven shaders, horizontal galleries, smooth
scroll. Including an idle render governor that stops the draw loop when the scene
is still.

**Repo:** [systoai-design/threejs-scroll-sites](https://github.com/systoai-design/threejs-scroll-sites)

---

## What they save you

**How to read this table.** Every figure is a **published list price of a named
tool, checked September 2026, with the source linked.** None of it is modelled or
estimated. Whether you actually save it depends entirely on whether that tool is in
your stack and whether this skill covers what you use it for.

Three of these skills have no subscription to cancel. They are process, and their
value is the rework they prevent. We have said so plainly rather than inventing a
number to fill the column.

| Skill | What it can take off your plate | List price of that tool |
|---|---|---|
| **artboard** | The design seat you keep mainly to resize and rebrand social creative | [Canva Pro **$18/mo**](https://www.usecarly.com/blog/canva-pricing/) (~$12/mo annual), or [Photoshop single app **$22.99/mo**](https://josephnilo.com/blog/whats-the-photoshop-price/) |
| **swipefile** | A design-system audit seat, and the manual work of documenting a reference | [Figma Professional **$16/mo** annual, **$20/mo** monthly, per seat](https://www.stackscored.com/pricing/graphic-design/figma/) |
| **manifesto** | The motion suite you keep for occasional replication work | [Adobe Creative Cloud All Apps **up to $69.99/mo**](https://costbench.com/software/design/adobe-creative-cloud/) (the plan that carries After Effects) |
| **threejs-scroll-sites** | Scroll-driven 3D work you would otherwise outsource, and the battery your unthrottled render loop is burning | No clean subscription equivalent. We could not source a 2026 Framer or Spline price we were willing to print, so this column is left honest rather than filled |
| **motion-brief** | Nothing. There is no subscription for writing a brief | Value is one avoided production day on a video shot in the wrong direction |
| **motion-graphics-director** | Nothing. It is a process gate | Value is not building a full pipeline for a piece that needed a title card |
| **hyperframes-render-discipline** | Nothing. It is a checklist | Value is one bad render not reaching a client |

**The honest ceiling.** If you carry Canva Pro, a Figma seat and Adobe All Apps
today, that is roughly **$104 to $112 a month** at list (Canva Pro $18, a Figma seat $16 to $20, Adobe All Apps up to $69.99). These skills will not let
you cancel all three, and anyone who tells you otherwise is selling something. What
they do is remove the reason you open those tools for a large share of routine
work: resizing creative, documenting a reference, replicating a motion piece. Cancel
what you genuinely stop opening, and keep the rest.

The three process skills are the ones we would actually argue are worth the most.
A wrong-direction video costs a production day, and no subscription line item
captures that.

---

## Requirements

- **An agent that reads Agent Skills.** Claude Code, Codex, Antigravity, Cursor.
- **Node 18+** for the installer and for the skills that ship scripts.
- **Per-skill dependencies.** The bundle itself has none. Individual skills declare
  their own in their `package.json`: `artboard` uses `sharp`, `swipefile` uses
  Playwright, the motion skills expect `ffmpeg` on your PATH. Each skill's own
  README covers this, and none of them install anything without you asking.

---

## How Agent Skills work

If you have not used one: a skill is a folder of instructions your agent loads
*only when relevant*. It is not a prompt you paste, and it is not always in
context.

Each `SKILL.md` carries a `description` in its frontmatter that says when it
applies. The agent reads only those descriptions at startup, which costs very
little. When your request matches one, it loads that skill's full body and any
scripts it needs, and follows it.

The practical effect: you say "recut this ad for stories" and the agent already
knows the house method for it, including the mistakes not to repeat, without you
having explained any of that.

---

## Token cost

Measured on Claude Code with all seven installed:

| | Cost |
|---|---|
| Always on, added to every session | **~1,300 tokens** total for all seven |
| `artboard` when it fires | ~4,600 |
| `swipefile` when it fires | ~13,400 |
| `manifesto` when it fires | ~17,200 |
| `motion-brief` when it fires | ~2,800 |
| `motion-graphics-director` when it fires | ~1,600 |
| `hyperframes-render-discipline` when it fires | ~2,300 |
| `threejs-scroll-sites` when it fires | ~2,800 |

The always-on figure is what matters, because that is what you pay on every
session whether you use them or not. The on-invoke cost is paid only when a skill
actually fires. `claude plugin details systo@systo` prints this for your own
install.

---

## Updating and removing

**Claude Code**

```
/plugin marketplace update systo
```
```
/plugin uninstall systo@systo
```

**Everything else**

```bash
npx github:systoai-design/skills --force
```

`--force` overwrites skills already present, which is how you update. To remove,
delete the skill folders from the directory `--list` reports.

---

## Repository layout

```
.claude-plugin/marketplace.json   Claude Code manifest
.claude-plugin/plugin.json        plugin metadata
.cursor-plugin/marketplace.json   Cursor manifest, kept in step with the above
AGENTS.md                         rules file, read by Codex and Antigravity
skills/<name>/                    the seven skills. GENERATED, see below
scripts/sync.mjs                  rebuilds skills/ from the upstream repos
scripts/install.mjs               cross-tool installer
```

**`skills/` is generated and must never be hand-edited.** Each skill has its own
upstream repository. `scripts/sync.mjs` re-clones every one at depth 1 and replaces
the directory wholesale, so local edits are destroyed on the next sync.

The sync excludes `.git`, `node_modules` and `showcase/`. Showcase media is demo
material for a repo's own landing page, and `manifesto` alone carries 9MB of it,
which nobody installing a skill needs to download. That takes the bundle from 19MB
to about 7MB.

---

## Contributing

Issues and pull requests are welcome, **on the individual skill's own repository**,
because changes made here are overwritten by the next sync.

The most useful contribution is not a feature. It is telling us where a skill was
wrong, because each one is a record of mistakes and the record is incomplete.

---

## Troubleshooting

**The skills do not appear after installing.** Start a new session. Agents read
their skills directory at startup, not per message.

**Claude Code says the marketplace is not found.** The source is
`systoai-design/skills`, the org first. Check with `/plugin marketplace list`.

**Installed but never fires.** Skills load on relevance, matched against the
`description` in each `SKILL.md`. Name the skill directly to force it, for example
"use artboard to recut this", and if it should have fired on its own, open an issue
with what you asked. A description that does not match how people actually phrase
the request is a real bug and we want it reported.

**Codex or Antigravity cannot see them.** Both read `.agents/skills/` from the
working directory upward, so confirm you are inside the project you installed into.
For every project, install to `~/.agents/skills/` (Codex) or
`~/.gemini/config/skills/` (Antigravity) instead. `--list` prints both.

**A skill's script fails.** Skills that ship scripts declare their own
dependencies. Run `npm install` inside that skill's folder, and check its README
for anything expected on your PATH, usually `ffmpeg`.

---

## Licence

MIT. Take them, fork them, ship with them, sell what you build with them. No
attribution required, though we would like to hear about it.

---

Built by [Systo](https://systo-ai.com). We run AI operations for clients: a named
human accountable for one operation, on your accounts, with everything checked
before it ships. If you would rather someone ran this for you than ran it yourself,
the calendar is at [systo-ai.com/book](https://systo-ai.com/book).
