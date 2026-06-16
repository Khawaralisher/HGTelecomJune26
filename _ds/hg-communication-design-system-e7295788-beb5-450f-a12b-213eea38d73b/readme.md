# HG Telecommunication — Design System

The brand and product design system for **HG Telecommunication (Private) Limited** — a
technology company providing **telecommunication** (managed fibre, dedicated internet, cloud
voice/PBX) and **IT solutions** (managed IT, networking, cloud, security) to businesses.

This repository is the single source of truth for the brand's color, typography, spacing,
iconography, reusable UI components, and full-screen product recreations. Consuming projects
link the compiled **`styles.css`** and pull components from the generated runtime bundle.

> **Sources provided for this system**
> - `uploads/HG Logo GreenWhite-04.png` — the official logo (green icon + white wordmark,
>   built for dark/colored backgrounds). All other logo treatments in `assets/logo/` are
>   derived from this single file (see Caveats).
> - Brand brief: *modern technology company, IT + telecom solutions, rich green logo. Use the
>   logo green for top-level headings and backgrounds; Inter for headings; a complementary
>   body font.*
>
> No codebase, Figma file, or live website was provided. The visual system below is built
> directly from the logo and brief — it is a **branded foundation**, not a recreation of an
> existing product UI. Treat the UI kits as on-brand reference designs, not pixel copies of a
> shipping product.

---

## Brand at a glance

- **Name:** HG Telecommunication (Private) Limited
- **Category:** Telecom + IT solutions provider
- **Logo:** A halftone **globe** with a **"G"-in-crosshair** monogram, set beside the
  "HG TELECOMMUNICATION" wordmark ("TELE" in ink, "COMMUNICATION" in brand green).
- **Brand color:** Rich emerald green **`#00A850`** (sampled from the logo).
- **Brand ink:** Near-black green **`#0B2A1A`** (from the logo's dark elements).

---

## Content fundamentals — how HG writes

**Voice:** Confident, plain-spoken, and reassuring — a dependable infrastructure partner, not a
flashy startup. Lead with the customer outcome (uptime, coverage, support), then the product.

- **Person:** Address the customer as **"you"** / **"your business"**; refer to the company as
  **"we"** / **"HG"**. e.g. *"We keep your business online."*
- **Casing:** Sentence case for headings and buttons (*"Get started"*, *"Talk to an engineer"*).
  ALL-CAPS is reserved for short eyebrow/overline labels (*"WHY HG"*, *"ENTERPRISE"*) and the
  logo wordmark. Never set sentences in all-caps.
- **Tone words:** *reliable, managed, always-on, enterprise-grade, nationwide, 24/7, SLA-backed.*
- **Numbers carry weight:** Quantify claims — "99.9% uptime SLA", "24/7 NOC monitoring",
  "1,284 active sites". Use real-looking, specific figures rather than vague superlatives.
- **Sentences:** Short and active. Prefer "We resolve issues before they reach your team" over
  passive constructions.
- **CTAs:** Action + value. *"Get started", "Contact sales", "Check coverage", "Talk to an
  engineer", "View plans".* Avoid "Click here" / "Submit".
- **Emoji:** **Not used.** This is a B2B infrastructure brand — keep copy clean and professional.
- **Mono usage:** Account IDs, IP/MAC addresses, ticket numbers and data are set in JetBrains
  Mono (e.g. `HG-90210`, `10.0.4.21`) to read as precise/technical.

**Example microcopy**
- Hero: *"Connectivity your business can count on."*
- Sub: *"Managed fibre, cloud voice and IT services — monitored around the clock and backed by
  a 99.9% uptime SLA."*
- Empty state: *"No active tickets. Your services are running smoothly."*

---

## Visual foundations

**Color.** The system is monochromatic-green forward. The brand green `#00A850` is the single
hero accent; the neutral scale is a **green-tinted slate** (cool grays with a faint green cast)
so the palette feels cohesive. **Top-level headings and hero numbers use the brand ink green
`#0B2A1A`** (`--text-strong`); secondary headings use near-black neutral. Green is used
generously for primary actions, key stats, links, active states, and **full-bleed brand blocks
/ dark footers** (`--surface-inverse` = green-950). Avoid rainbow accents — status colors
(blue/amber/red) appear only for semantic feedback, never decoration.

**Typography.** **Inter** for all headings/UI labels (weights 600–900, tight tracking
`-0.018em` to `-0.03em` on large sizes). **Source Sans 3** for body and long-form copy
(400/600, line-height 1.6) — a humanist sans that pairs cleanly with Inter without competing.
**JetBrains Mono** for IDs and tabular data. Display sizes get the most negative tracking;
body stays at 0.

**Spacing & layout.** 4px base grid. Generous section rhythm (`--section-y` 96px) on marketing
pages; denser 16–24px gaps in product UI. Max content width 1200px. Layouts are clean and
grid-based — lots of whitespace, clear hierarchy, no clutter.

**Backgrounds.** Mostly flat: white cards on a faint `--surface-page` (#F6F8F7). For emphasis,
**solid brand-green or brand-ink panels** (full-bleed) rather than gradients. A *subtle*
single-direction green wash is acceptable on hero sections; **avoid heavy multi-stop gradients,
glassmorphism, and purple/blue gradients entirely.** The globe motif may appear as a large,
low-opacity watermark on dark brand panels.

**Corners & cards.** Soft but not pill-round: inputs/buttons `--radius-md` (10px), cards
`--radius-lg` (14px), feature panels `--radius-xl` (20px). Cards are **white, 1px
`--border-subtle` hairline, soft neutral shadow** (`--shadow-sm`), 24–32px padding. Interactive
cards lift 2px with `--shadow-lg` on hover.

**Shadows.** Soft, low-spread, **neutral-cool** (tinted with green-950 at low alpha), never
harsh black. A single **brand glow** (`--shadow-brand`) is reserved for primary CTA hover only.

**Borders.** Hairline 1px `--border-subtle` for dividers/cards; 1.5px for input fields; the
brand green border defines outline buttons and focus.

**Motion.** Calm and quick. Hover/press feedback at 120ms, most transitions 200ms, panels
320ms — all ease-out (`--ease-standard`). Reveals are a gentle 12px fade-up (`hg-fade-up`).
**No bounce, no spin, no long durations.** Respects `prefers-reduced-motion`.

**Hover states.** Primary button → darker green (`--green-600`) + brand glow; outline/ghost →
faint green-subtle fill; cards → lift + stronger shadow; links → green, no underline by default.
**Press states.** 1px nudge down + inset shadow; no color-shrink gimmicks.

**Focus.** Always visible: 3px `--ring-brand` (green at 35% alpha) ring on fields and controls.

**Imagery.** When photography is used, prefer **clean, bright, cool-neutral** shots of
infrastructure, network operations, city/fibre, and teams — not warm or heavily filtered.
Pair with the green via overlays or adjacent panels. (No stock imagery ships in this system —
see Iconography/Caveats; UI kits use neutral placeholders.)

---

## Iconography

- **Style:** Line icons, ~1.5–1.7px stroke, rounded caps/joins, on a 20–24px grid — matching
  the geometric, modern feel of the logo. Icons inherit `currentColor` so they pick up text or
  brand color contextually.
- **Source:** No icon set was provided with the brand. This system standardizes on
  **[Lucide](https://lucide.dev)** (ISC license) as the closest match to the required stroke
  weight and rounded style. **⚠ Substitution — flagged:** swap for HG's official icon set if one
  exists. Load via CDN in prototypes:
  `<script src="https://unpkg.com/lucide@latest"></script>` then `lucide.createIcons()`,
  or copy individual SVGs inline (as the component cards do).
- **Inline SVGs:** Component and kit files draw small icons as inline `<svg>` with
  `stroke="currentColor"` so no build step or font is required.
- **Emoji:** **Never** used in product or marketing surfaces.
- **Brand mark as icon:** The globe **monogram** (`assets/logo/hg-monogram-*.png`) is the app
  icon / favicon / avatar mark — do not redraw it; use the asset.

---

## Index — what's in this system

**Foundations (root)**
- `styles.css` — global entry point (consumers link this only; `@import`s the tokens below).
- `tokens/colors.css` — brand green scale, neutral scale, semantic hues + semantic aliases.
- `tokens/typography.css` — font families, weights, type scale, line-height, tracking.
- `tokens/spacing.css` — 4px spacing scale + layout (container, gutter, section rhythm).
- `tokens/radius.css` · `tokens/elevation.css` · `tokens/motion.css` · `tokens/fonts.css`.
- `foundations/*.html` — specimen cards rendered in the Design System tab (Colors, Type,
  Spacing, Brand).

**Assets** — `assets/logo/`
- `hg-logo-lockup-light.png` — full lockup for light backgrounds (derived).
- `hg-logo-lockup-onDark.png` — full lockup for dark/brand backgrounds (original artwork).
- `hg-monogram-dark.png` / `hg-monogram-green.png` — globe monogram for light / dark.

**Components** — `components/<group>/` (React, consumed via the runtime bundle)
- `buttons/` — `Button`, `IconButton`
- `forms/` — `Input`, `Select`, `Checkbox`, `Switch`
- `display/` — `Card`, `Stat`, `Badge`, `Avatar`
- `feedback/` — `Alert`
- `navigation/` — `Tabs`

**UI kits** — `ui_kits/<product>/`
- `website/` — HG marketing website (homepage hero, services, plans, dark CTA/footer).
- `portal/` — HG customer portal / NOC dashboard (overview, services, tickets, billing).

**Other**
- `SKILL.md` — Agent Skill manifest (for use as a downloadable Claude skill).

---

## Using the system

Consumers link the single stylesheet and read components from the generated namespace:

```html
<link rel="stylesheet" href="styles.css" />
<script src="_ds_bundle.js"></script>
<script>
  const { Button, Card, Stat, Badge } = window.HGCommunicationDesignSystem_e72957;
</script>
```

Always reference the **semantic color aliases** (`--text-strong`, `--surface-card`,
`--color-brand`) in new work, not the raw scale steps.

---

## Caveats & open questions

- **Only one logo file was provided.** The light-background lockup and both monograms were
  **derived programmatically** by recoloring the white wordmark/icon to brand ink. They look
  correct, but please supply official vector (SVG/EPS) and any reversed/mono variants for
  production fidelity.
- **Fonts** load from Google Fonts CDN (`tokens/fonts.css`). Self-host the woff2 files for
  production. The body-font pairing (**Source Sans 3**) is a recommendation, not a confirmed
  brand choice — confirm or swap.
- **Icon set (Lucide)** is a substitution — replace if HG has an official set.
- **No product screenshots / codebase** were provided, so the UI kits are on-brand *reference*
  designs of a plausible HG website and customer portal, not recreations of live products.
