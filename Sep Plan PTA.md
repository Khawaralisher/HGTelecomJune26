# Sep Plan PTA — Accessibility & Compliance Execution Plan

**Site:** hg.com.pk (HG Telecommunication)
**Source audit:** *HG LDI — Web Content Accessibility Report*, 17 August 2026
**Audit engine:** ACRE (Automated Web Compliance Review Engine), run 11 August 2026, by Cyber Hypes
**Plan prepared:** 15 September 2026
**Repository:** HG Telecommunications website (branch `main`)

---

## 1. Audit result as received

| Metric | Value |
|---|---|
| Compliance score | 77 / 100 |
| Current state | Mostly Compliant |
| Compliance risk | Medium |
| Total issues | 23 |

| Annex | Framework | Score | High | Medium | Low |
|---|---|---|---|---|---|
| A | Accessibility — WCAG 2.2 | 67/87 | 4 | 7 | 9 |
| B | Security — OWASP Top Ten / NIST SP 800-53 | 4/6, 6/7 | 0 | 1 | 2 |

The crawler covered 8 URLs: `/`, `index.html`, `About.dc.html`, `Services.dc.html`, `Wavecomm.dc.html`, `LinkTechnology.dc.html`, `Careers.dc.html`, `Contact.dc.html`.

---

## 2. Architecture context (why the numbers are misleading)

The site is a Design-Canvas application, not a set of independent pages:

- Each page is a standalone HTML shell with a minimal `<head>` that loads `./support.js`.
- `support.js` (~1,517 lines) is a client-side React-based runtime that resolves `<dc-import name="X">` into the component file `X.dc.html` and performs `{{ }}` interpolation.
- Shared components: `SiteHeader.dc.html`, `SiteFooter.dc.html`, `PageHero.dc.html`, `GetInTouch.dc.html`, `ImagePlaceholder.dc.html`.
- Styling comes from `_ds/hg-communication-design-system-e7295788-beb5-450f-a12b-213eea38d73b/` (tokens in `tokens/colors.css`) plus 463 inline `style=""` attributes.

**Consequence:** the audit reports most findings against all 8 pages, but the defects live in a handful of shared files. Conversely, several findings that look like one-line fixes require runtime or data-structure changes.

---

## 3. Reconciliation — 23 findings to 14 pieces of work

### 3.1 Duplicate and overlapping findings

| Audit IDs | Reality |
|---|---|
| ACC-07 + ACC-12 | Identical 9 images, reported at AA and AAA. Only **2 of the 9** are genuine failures. |
| ACC-08 + ACC-13 | Identical 63 elements, reported at AA (4.5:1) and AAA (7:1). |
| ACC-04 + ACC-11 + ACC-16 | One "review before submit" theme across three success criteria. |
| ACC-03 + ACC-09 | One error-messaging build (identification + suggestion). |
| ACC-05 | "18 inputs" = **6 source controls** multiplied by `dc-import`. Attributes are *missing*, not *invalid*. |
| ACC-06 | "80 interactive controls" is substantially **one missing `:focus-visible` rule**. |

### 3.2 False positives — recommend documented dismissal

| ID | Criterion | Reason |
|---|---|---|
| **ACC-04** | 3.3.7 Redundant Entry (AA) | **Not violated.** Each form requests each item of information exactly once; there is no multi-step process. |
| **ACC-11** | 3.3.4 Error Prevention, Legal/Financial (AA) | **Out of scope.** 3.3.4 applies to legal commitments, financial transactions, modification/deletion of stored user data, or test submissions. A general enquiry form and a speculative careers form are none of these. Building a confirm-and-review wizard would reduce conversion for no accessibility benefit. |

### 3.3 AAA criteria (optional — WCAG does not recommend AAA as site-wide policy)

ACC-12 (1.4.9), ACC-13 (1.4.6), ACC-15 (2.4.8), ACC-16 (3.3.6), ACC-17 (1.4.8), ACC-19 (3.1.6), ACC-20 (3.1.5).

Note ACC-20 targets reading grade 9 against a measured 19.5. LDI wholesale telecom copy addressed to carrier and enterprise buyers is not realistically reducible to grade 9 without damaging its purpose.

### 3.4 Findings the audit MISSED — four are Level A

| Finding | Criterion | Level | Location |
|---|---|---|---|
| No skip link on any page | 2.4.1 Bypass Blocks | **A** | ~10-12 tab stops of header before content on every page |
| `<h1>` auto-rotates every 3s with no pause/stop/hide | 2.2.2 Pause, Stop, Hide | **A** | `index.html:358-363` |
| All 6 form controls programmatically unlabelled (zero `id`, `for`, `name`, `aria-label`) | 1.3.1, 4.1.2 | **A** | `GetInTouch.dc.html:65,69,73`; `SiteFooter.dc.html:81,82,83` |
| Two factually incorrect alt texts | 1.1.1 Non-text Content | **A** | `Wavecomm.dc.html:34`, `Services.dc.html:35` |
| Heading level skipped, h1 to h3 | 1.3.1 Info and Relationships | A | `Services.dc.html:26,38,50,62` |
| Dropdown and burger lack `aria-expanded`/`aria-haspopup`/`aria-controls` | 4.1.2 Name, Role, Value | A | `SiteHeader.dc.html:28,71` |
| 3 dead `href="#"` links presented as functional | 2.4.4 Link Purpose | A | `SiteFooter.dc.html:44` (social), `:96`, `:97` |
| 58 inline `<svg>` elements, zero with `aria-hidden`/`role`/`<title>` | 1.1.1 | — | All files |
| Mobile viewport (<920px) has **no navigation landmark at all** | 1.3.6 | — | `SiteHeader.dc.html:77-95` |
| Form success panel destroys the focused element; focus drops to `<body>` | 2.4.3 Focus Order | A | `GetInTouch.dc.html:52-60`, `SiteFooter.dc.html:68-78` |

---

## 4. Decisions required before implementation

### Decision 1 — The contact forms do not submit anywhere (BLOCKING)

Both handlers are:

```js
submit: (e) => { e.preventDefault(); this.setState({ sent: true }); },
```

`GetInTouch.dc.html:97` and `SiteFooter.dc.html:110`.

Evidence of no backend: no `action` or `method` attribute on either `<form>`; no `mailto:` form action; the only three `fetch` calls in `support.js` (lines 153, 1017, 1293) all load component HTML; a project-wide search for `formspree|netlify|getform|emailjs|web3forms|/api/|action="http|smtp|sendgrid` returns zero hits; and no field carries a `name` attribute, so nothing would serialise even if native submission were allowed.

The user is nonetheless shown *"Thank you for reaching out — We've received your enquiry and will get back to you soon"* (`GetInTouch.dc.html:57`).

**Every enquiry and job application submitted since launch has been silently discarded.**

This is a business-critical defect, and it also gates the accessibility work: an `aria-live` region whose only function is to announce a false success is worse for a screen-reader user than the current silence, because it makes an untrue claim more prominent.

**Required:** choose and wire a real submission endpoint (Formspree, Netlify Forms, or a server-side mail script) before Package E proceeds.

### Decision 2 — The brand green cannot be used as text (BRAND SIGN-OFF)

`--color-brand` `#00A850` on white measures **3.13:1**. White on `#00A850` also measures **3.13:1** (contrast is symmetric). It clears the 3:1 non-text threshold but never reaches 4.5:1 in either direction.

Therefore **every green eyebrow/label and every white-on-green button label fails 1.4.3.** This single fact accounts for roughly half the 63 flagged text elements.

**Proposed fix** (does not change the brand colour itself):

- Add `--color-brand-text: #00763B` — 5.75:1 on white, 5.23:1 on `--green-50`. This value is already in the palette as `--green-700`, so it is a semantic alias, not a new colour.
- Darken the *fill* on the 9 primary-CTA and active-nav-pill sites to `#00763B`, keeping the white label (5.75:1). Intermediate option `#008542` gives 4.74:1 if the darker fill reads too heavy. `--color-brand-hover` `#009147` is **not** sufficient at 4.08:1.
- `--color-brand` stays `#00A850` for the logo, large fills, icon chips, decorative dots and `--border-brand`.

This is a visible change on every page and needs brand owner approval.

### Decision 3 — `--border-subtle` appears 44 times at 1.30:1 (DESIGN)

Option A: raise `--border-subtle` to `#7F8D85` (3.47:1) — fixes all 44 in one token edit, but turns near-invisible hairlines into clearly visible borders.

Option B: keep `#DCE3DF` for purely decorative cards and introduce `--border-interactive: #7F8D85` applied only to the ~12 interactive containers (hover tiles, nav pill container, dropdown panel, burger, mobile drawer).

Option B preserves the current visual design and is the recommended path if the design team objects to Option A.

### Decision 4 — All security findings are out of repository scope (HAND-OFF)

Exhaustive search found **no** `.htaccess`, `nginx.conf`, `netlify.toml`, `vercel.json`, `_headers`, `_redirects`, `Dockerfile`, `web.config`, `.github/` directory or CI workflow. `git log --all --diff-filter=A` confirms no configuration file has ever existed in this repository.

Deployment appears to be manual: the untracked 6.8 MB `HG Zip 29June26.zip` in the project root is the signature of zip-and-upload via cPanel/FTP. Git remote is a plain GitHub repository with no Pages workflow or deploy hook.

HSTS, X-Frame-Options and Referrer-Policy are **response-header-only** and have no `<meta http-equiv>` equivalent.

| Finding | Fix location | Owner |
|---|---|---|
| SEC-01 — missing CSP, HSTS, X-Frame-Options, Referrer-Policy | `add_header` directives in the nginx `server{}` block | Server admin / hosting provider |
| SEC-02 — DNSSEC not enabled | DS record at the `.pk` registry via registrar control panel | Registrar / DNS admin |
| SEC-03 — `server: nginx/1.29.8` disclosed | `server_tokens off;` in nginx `http{}` or `server{}` | Server admin |

---

## 5. Edit list by work package

### Package A — Document shell and landmarks
**Files:** 7 pages + SiteHeader · **Effort:** ~2h · **Risk:** none · **Covers:** ACC-01, ACC-02, ACC-18, plus missed 2.4.1 and 1.3.1

1. **`<title>` in the static `<head>` of each page** — *not* in `<helmet>`. A helmet `<title>` would technically work (it falls through to the generic branch at `support.js:1194-1208`, which does `document.createElement(tag)` and appends to head), but it is wrong because: it only exists after React boots (`support.js:1451-1459`), so the tab is untitled on slow loads and permanently untitled with JS disabled; `{{ }}` does not interpolate there (line 1206 copies `textContent` verbatim); and the branch always *appends*, never replaces, so a title in a shared component would emit one per instance.

   | File | Proposed title |
   |---|---|
   | `index.html` | HG Telecommunication — Pakistan LDI, Voice, Internet & Data Centre |
   | `About.dc.html` | About HG Telecommunication — Licensed Pakistan LDI Operator |
   | `Services.dc.html` | Services — Voice, Fibre Optic, Data Centre & SMS Gateway \| HG Telecommunication |
   | `Wavecomm.dc.html` | Wavecomm Telecom — FTTH Home & Business Internet \| HG Telecommunication |
   | `LinkTechnology.dc.html` | Link Technology — Global Voice, Data & SMS Carrier \| HG Telecommunication |
   | `Careers.dc.html` | Careers — Work with HG Telecommunication |
   | `Contact.dc.html` | Contact HG Telecommunication — Offices, Phone & Enquiries |

2. **`lang="en"` on line 2** of all 12 HTML files. `support.js` touches `documentElement` exactly once — a class toggle at line 1374 — so a static attribute is safe and will never be stripped.

3. **`<main id="main-content">`** opening immediately after the SiteHeader import and closing immediately before the SiteFooter import. `PageHero` carries each page's only `<h1>` and must sit inside.

   | File | Open after line | Close before line |
   |---|---|---|
   | `index.html` | 37 | 350 |
   | `About.dc.html` | 15 | 77 |
   | `Services.dc.html` | 15 | 82 |
   | `Wavecomm.dc.html` | 15 | 77 |
   | `LinkTechnology.dc.html` | 15 | 72 |
   | `Careers.dc.html` | 15 | 31 |
   | `Contact.dc.html` | 15 | 19 |

   **Do not add `<main>` to `GetInTouch.dc.html`** — it is imported *into* Careers and Contact, so a `<main>` there would nest inside those pages' `<main>`. Give it `aria-labelledby` pointing at its `<h2>` (line 50) instead.

4. **Skip link** as the first child inside `<header>` at `SiteHeader.dc.html:13`, targeting `#main-content`.

5. **`aria-label="Primary"`** on the `<nav>` at `SiteHeader.dc.html:22`; wrap the mobile drawer (`SiteHeader.dc.html:77-95`) in a `<nav aria-label="Mobile">` — below 920px the site currently has no navigation landmark whatsoever.

6. **Fix the heading skip** at `Services.dc.html:26,38,50,62` — promote the four service-card `<h3>`s to `<h2>`, or insert a visually-hidden `<h2>` before line 20.

### Package B — Location indicator, ARIA state, SVGs
**Files:** SiteHeader, PageHero, all files (SVGs) · **Effort:** ~2h · **Risk:** none · **Covers:** ACC-15, ACC-18, plus missed 4.1.2

1. **`aria-current="page"`** — `SiteHeader` receives an `active` prop but spends it entirely on inline colour (`SiteHeader.dc.html:113-114`). Add `current: a ? 'page' : null` to the `item()` factory (line 131) and `aria-current="{{ item.current }}"` at lines 24, 59, 81, 87, plus the hard-coded company links at 84-85.

2. **Rebuild the breadcrumb** — `PageHero.dc.html:18-22` is a bare `<div>` containing an `<a>`, an SVG and a `<span>`. Rebuild as `<nav aria-label="Breadcrumb">` + `<ol>`/`<li>`, with `aria-current="page"` on the terminal item and `aria-hidden="true"` on the chevron.

3. **Disclosure state** — add `aria-expanded`, `aria-haspopup`, `aria-controls` and Escape-to-close to the Companies dropdown (`SiteHeader.dc.html:28`) and the burger (`SiteHeader.dc.html:71`). The burger's `aria-label="Menu"` is static while its icon swaps between hamburger and X — make the name reflect state.

4. **`aria-hidden="true" focusable="false"` on all 58 inline SVGs.** All are decorative and adjacent to real text labels. Locations: `index.html` 67, 107, 116, 125, 145, 150, 225, 230, 255, 314, 319, 324, 329, 344; `About.dc.html` 54, 59, 64, 69; `Careers.dc.html` 21; `GetInTouch.dc.html` 22, 27, 32, 37, 42, 54, 77; `ImagePlaceholder.dc.html` 14; `LinkTechnology.dc.html` 26, 33, 40, 54, 59, 64; `PageHero.dc.html` 20; `Services.dc.html` 29, 41, 53, 65, 77; `SiteFooter.dc.html` 30, 34, 38, 45, 71, 86; `SiteHeader.dc.html` 30, 38, 47, 64, 72, 90; `Wavecomm.dc.html` 54, 59, 64, 69.

5. **Resolve the 3 dead links** — `SiteFooter.dc.html:44` (4 social links), `:96` (Privacy), `:97` (Terms) all point at `href="#"`. Either supply real destinations or remove them.

### Package C — Motion and reduced-motion
**Effort:** ~3h · **Covers:** ACC-14, plus missed 2.2.2

Current state: only two reduced-motion blocks exist, both in `index.html` (lines 19 and 32), covering the three CSS keyframe animations on that page only. Every other page and component has **zero** reduced-motion handling. `matchMedia` appears **nowhere** in the codebase.

1. **Global CSS block**, best placed in `_ds/.../tokens/motion.css` (linked by 10 of 11 pages):

```css
@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{
    animation-duration:.001ms!important; animation-iteration-count:1!important;
    transition-duration:.001ms!important; scroll-behavior:auto!important;
  }
}
```

   Because `!important` in a stylesheet beats inline `style=""`, this correctly neutralises the inline hero cross-fade (`index.html:43,44`) and the JS-injected transition (`index.html:400`). Add the missing design-system `<link>` to `ImagePlaceholder.dc.html`, which is the only file lacking it.

2. **JS guards are unavoidable — CSS cannot stop a `setInterval`.** In `componentDidMount` (`index.html:358`):
   - Guard the 3,000ms headline rotation interval (`index.html:360`) and its inner 380ms timeout (`:362`) behind `!window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
   - In `runCounters` (`index.html:378`), jump straight to the final values `[850, 20, 120, 4000]` instead of running the 1,700ms `requestAnimationFrame` loop (`:384,386`).

3. **Marquee layout fallback** — `animation:none` stops the scroll, but `.hg-marquee{overflow:hidden}` (`index.html:26`) and `.hg-marquee-track{width:max-content}` (`:27`) remain, so partner logos past the viewport edge become **permanently unreachable** under reduced motion. Add `flex-wrap:wrap` / `overflow:visible` in the reduced-motion block.

4. **2.2.2 Pause, Stop, Hide** — add a visible pause control for the rotating headline, mark the rotating `<span>` `aria-hidden="true"` and expose one stable accessible `<h1>`. Do **not** add `aria-live` to the rotating headline; that would cause a screen reader to interrupt every 3 seconds indefinitely.

### Package D — Colour contrast
**Effort:** ~4h · **Covers:** ACC-06, ACC-08, ACC-13 · **Gated by Decisions 2 and 3**

All values verified with the standard WCAG relative-luminance formula, with alpha colours composited over their real backdrop. There is no dark-mode or alternate-theme block anywhere in the design system, so every token edit is unconditional.

**D1 — Token edits in `_ds/.../tokens/colors.css`:**

| # | Token (line) | Current | Proposed | Verification | Reach |
|---|---|---|---|---|---|
| 1 | new `--color-brand-text` (after 46) | — | `#00763B` | 5.75 white / 5.23 green-50 | 17 eyebrow & label spans |
| 2 | `--text-muted` (55) | `#6B7B73` | `#5E6D66` | 5.45 / 5.11 / 4.96 | 12 uses (current value misses by 0.04) |
| 3 | `--text-faint` (56) | `#93A19A` | `#616F68` | 5.27 white | 6 uses + 3 placeholders + breadcrumb chevron |
| 4 | `--border-subtle` (70) | `#DCE3DF` | `#7F8D85` | 3.47 / 3.25 / 3.16 | **44 borders** — see Decision 3 |
| 5 | `--border-default` (71) | `#BCC7C2` | `#7F8D85` | 3.47 white | 3 input borders |
| 6 | `--border-strong` (72) | `#93A19A` | `#616F68` | 5.27 white | currently unused; align for safety |
| 7 | `--ring-brand` (74) | `rgba(0,168,80,0.35)` | `#00763B` opaque | 5.75 white | **Critical** — at 1.49 it cannot be rescued by raising alpha, since `rgba(0,168,80,1)` is only 3.13 |

`--text-on-dark-muted` (58) is already compliant on both its real backdrops (7.45 and 6.59) — no change.

**D2 — Global focus indicator (highest-value single change in the entire remediation):**

`:focus-visible` appears **zero times** in the codebase. The only six controls that set `outline:none` are the six form fields, and both of their replacement rings fail 3:1 (1.49 on white, 1.19 on the dark footer — effectively invisible). All other 29 links and 4 buttons rely on the unauthored browser default. `--focus-ring` is defined at `tokens/elevation.css:20` and never referenced.

```css
a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible {
  outline: 3px solid #00763B; outline-offset: 2px;
}
```

With `outline-color: #56D08F` (7.95:1) inside the dark footer region.

**D3 — Inline style edits (enumerated):**

| What | Files:lines | Fix |
|---|---|---|
| White label on brand-green fill (CTAs + active nav pill) | `index.html:55,150,344`; `Services.dc.html:77`; `SiteFooter.dc.html:84`; `SiteHeader.dc.html:63,89,113`; `GetInTouch.dc.html:75` | Change fill to `#00763B`, keep `#fff` (5.75) |
| Primary CTA hover fill | `index.html:408`; `Services.dc.html:90`; `GetInTouch.dc.html:98`; `SiteFooter.dc.html:111` | `#0C5A2F` (8.34) |
| Careers info-card border | `Careers.dc.html:20` | `rgba(0,168,80,0.25)` to `#00763B` (was 1.30) |
| GetInTouch success-card border | `GetInTouch.dc.html:53` | `rgba(0,168,80,0.30)` to `#00763B` (was 1.37) |
| Footer success-card border | `SiteFooter.dc.html:69` | to `#56D08F` (7.95, was 1.75) |
| Footer input borders | `SiteFooter.dc.html:81,82,83` | `rgba(255,255,255,0.16)` to `0.45` (4.23, was 1.65) |
| Footer social-button borders | `SiteFooter.dc.html:44` | `rgba(255,255,255,0.14)` to `0.45` (was 1.54) |
| Footer placeholder | `SiteFooter.dc.html:13` | `rgba(255,255,255,0.40)` to `0.62` (6.01, was 3.42) |
| Footer field focus ring | `SiteFooter.dc.html:14` | to `0 0 0 3px #56D08F` (7.95, was 1.19) |
| ImagePlaceholder dashed borders | `ImagePlaceholder.dc.html:34` | `#00763B` and `rgba(255,255,255,0.45)` |

**D4 — Requires a design decision, not a colour value:** the homepage hero places the `<h1>` and lede over two rotating photographs behind a white scrim that decays to `rgba(255,255,255,0.10)` at the right edge (`index.html:49`). Where text overlaps the transparent end, the effective background is whatever the photograph shows, so contrast is not statically determinable and shifts as the slides cross-fade. Options: constrain the text block to the opaque region (it is already `max-width:680px`), raise the scrim's right-edge alpha, or add a solid text backplate.

**Do not attempt to map the audit's `.scp*` and `data-dc-tpl` selectors back to source.** `data-dc-tpl="N"` is a pre-order depth-first counter reset per component template (`support.js:417-426`) that renumbers on any structural edit. `.scp0`-`.scp8` are generated one per distinct `style-hover` payload in first-render order (`support.js:1216-1233`), which depends on viewport width and interaction state — re-run the audit at a different width and `scp3` means something else. Fix tokens and inline styles wholesale, then re-audit.

### Package E — Forms
**Effort:** ~1 day · **Covers:** ACC-03, ACC-05, ACC-09, ACC-10, plus missed 1.3.1/4.1.2/2.4.3 · **BLOCKED on Decision 1**

1. **Wire the real endpoint** (Decision 1).

2. **Label and identify all 6 controls.** Add `id`, `for`, `name` and `autocomplete`:

   | Control | `id` / `name` | `autocomplete` |
   |---|---|---|
   | `GetInTouch.dc.html:65` Your name | `git-name` / `name` | `name` |
   | `GetInTouch.dc.html:69` Email | `git-email` / `email` | `email` |
   | `GetInTouch.dc.html:73` Message | `git-message` / `message` | `off` |
   | `SiteFooter.dc.html:81` Your name | `foot-name` / `name` | `name` |
   | `SiteFooter.dc.html:82` Email | `foot-email` / `email` | `email` |
   | `SiteFooter.dc.html:83` Message | `foot-message` / `message` | `off` |

   **ID-collision warning:** GetInTouch and SiteFooter both render on Contact and Careers. Bare `id="name"`/`id="email"` would produce duplicate IDs on those pages and `<label for>` would bind to the wrong control. Use the distinct prefixes above.

   The SiteFooter fields are placeholder-only with no `<label>` at all; the three GetInTouch `<label>`s exist but are unassociated siblings.

3. **Error identification and suggestion** — add `aria-invalid` toggled per field and `aria-describedby` pointing at persistent error text. Currently the only feedback is the native browser bubble, which is transient, disappears on blur, is not persistently associated with the field, and covers only `required` and email shape.

4. **Status region and focus management** — the success panel currently unmounts the `<form>`, destroying the focused submit button and dropping focus to `<body>`. Add `role="status"`, give the panel `tabindex="-1"` and move focus to it programmatically.

5. **Proportionate response to ACC-04/11/16** (in place of a review wizard): make the success panel echo back the submitted name, email and message so the user can verify what was sent and self-detect a mistyped address, and offer a "Send another enquiry" control that resets state. This satisfies the spirit of error prevention, fixes the 4.1.3 gap and the focus-loss bug together, and costs one small change per form.

6. **Note:** Contact and Careers each render two independent enquiry forms (GetInTouch mid-page and SiteFooter) with identical field semantics and no distinguishing accessible names. Consider whether both are needed; if so, give each an accessible name.

7. **Functional gap:** the Careers form has no CV/résumé upload.

### Package F — Images of text and alt text
**Effort:** ~1 day · **Covers:** ACC-07, ACC-12, plus missed 1.1.1

Per-image verdicts after visual inspection — **only 2 of the 9 flagged items are genuine failures**:

| Image | Verdict | Action |
|---|---|---|
| `explore-voice-internet.webp` | **Real 1.4.5 failure** | Marketing poster, not a photo. Contains as pixels: the HG logo lockup, the headline "HG Voice Internet", and the tagline "Pakistan's Largest & Fastest-Growing Fibre Network" — a substantive marketing claim available nowhere in page text. Used at `index.html:276` (renders ~265px wide, so the text is both cropped by `object-fit:cover` and shrunk to illegibility) and `Services.dc.html:23`. **Rebuild the headline and tagline as HTML text** over the map graphic. Better alt text is not sufficient. |
| `fibre-network-map.webp` | **Real 1.4.5 failure** | Informational diagram used **3 times** (audit said 2): `index.html:242`, `index.html:284`, `Services.dc.html:35`. Contains baked-in text: "HG TELECOMMUNICATIONS", "FIBRE-OPTIC NETWORK - PAKISTAN", and six city names. Rebuild as inline SVG (cities as `<text>`, routes as `<path>`, `role="img"` plus `<title>`/`<desc>`), or replace with a corrected asset plus a text alternative listing the cities. |
| `hg-logo-commitment.webp` | Logo — **exempt** under 1.4.5 | Used once (audit said 2), at `index.html:346`. Improve alt wording only: it is a building with the logo on its glazing, not a logo file. |
| `noc-operations.webp` | Photo — incidental OCR | No action. Alt is acceptable. |
| `wavecomm-business-video-conference.webp` | Photo for 1.4.5, but **alt is factually wrong (1.1.1)** | Image shows a network operations centre — a dozen staff at monitor banks, server racks, cabling — not a video conference. Rewrite the alt at `Wavecomm.dc.html:34`; reconsider whether the image belongs in a business-FTTH card. |
| `wavecomm-residential-ftth.webp` | Photo — no a11y action | See escalation below. |
| `global-network.webp` | Photo — OCR caught illegible pseudo-text on label chips | No action. Alt is adequate. |

**Alt text corrections:** `index.html:284` "Fibre optic" (fragment; image is a network map), `index.html:276` "Voice & internet" (fragment), `index.html:292` "Data center" (near-filename), `index.html:300` "SMS gateway" (near-filename), `Services.dc.html:35` "Fibre-optic cabling" (wrong — it is a map), `Wavecomm.dc.html:34` (wrong — see above), `index.html:346` (building, not logo). Note the four `index.html` alts are weaker than the equivalents on `Services.dc.html` for the same images.

No `<img>` anywhere is missing an `alt` attribute, and the marquee duplicate-group pattern (`alt=""` plus `aria-hidden` wrappers) is textbook-correct.

### Package G — Text spacing resilience (1.4.12)
**Effort:** ~2h · **Covers:** part of ACC-17

Better than expected: **no `line-height` is expressed in px anywhere** — every value is unitless or a token. That is the single biggest 1.4.12 risk and it is already clean. Typography is fluid `clamp()` throughout with no `!important` font sizing.

Remaining work:

1. **17 `height:NNpx` to `min-height:NNpx` + vertical padding** on text-bearing controls: `index.html:65,69,150,344`; `Services.dc.html:77`; `GetInTouch.dc.html:75,65,69`; `SiteFooter.dc.html:84,81,82`; `SiteHeader.dc.html:63,89`; `LinkTechnology.dc.html:40`. **Highest impact: `SiteHeader.dc.html:14`** (`height:74px` on the flex row containing the full nav) — combined with the single site-wide `white-space:nowrap` on the nav link style, this is the one place a spacing override could genuinely break layout.

2. **One `max-width`** on `Services.dc.html:75` — a paragraph in a full-bleed dark CTA band with no width cap, reaching ~100-120 characters per line on wide desktop. The only clear 1.4.8 line-length failure; everything else is constrained by grid columns.

3. Review `overflow:hidden` on cards that wrap `<h3>` + `<p>`: `index.html:275,283,291,299`; `Services.dc.html:22,34,46,58`; `Wavecomm.dc.html:25,33`.

### Package H — AAA tier (OPTIONAL)
**Effort:** ~3-5 days · **Covers:** ACC-12, ACC-13, ACC-15, ACC-16, ACC-17, ACC-19, ACC-20

Recommend treating as a separate, explicitly-scoped engagement rather than folding into the AA remediation.

1. **ACC-20 reading level** — the 7 densest prose blocks driving grade 19.5: `About.dc.html:23`, `LinkTechnology.dc.html:50`, `Wavecomm.dc.html:38`, `Wavecomm.dc.html:30`, `index.html:251`, `Services.dc.html:16`, `Wavecomm.dc.html:16`. **Implementation caveat:** items 6 and 7 live inside `dc-import` **attribute values** (`subtitle="..."`), not text nodes — any rewrite tooling must handle both. Rather than rewriting to grade 9, consider adding a plain-language summary, which the criterion also accepts.

2. **ACC-19 pronunciation/abbreviations** — ~15 acronyms warrant `<abbr title="...">`: LDI (7 occurrences, **never expanded anywhere on the site** — highest priority), IPT, SIP, TDM, NOC, SMS, B2B, FTTH, ASR, ACD, PDD, NGFW, ADG, SCO, PTCL. **Implementation caveat:** the ASR/ACD/PDD/NGFW tokens at `index.html:436-437` and SIP/TDM at `Services.dc.html:91` live inside **JavaScript string arrays** in `data-dc-script` blocks rendered through `<sc-for>` loops. `<abbr>` cannot be injected as a string — the loop templates must be changed to emit an `<abbr>` element, or the data restructured to `{text, abbr, title}` objects. This moves ACC-19 from find-and-replace to a small refactor.

3. **ACC-13 / ACC-12** — 7:1 enhanced contrast and no-exception images of text.

4. **ACC-17** — user text-presentation controls (spacing, width, colour adjustment).

### Package I — Server hand-off
**Effort:** ~1h to produce artefacts · **Owner:** server admin + registrar

Produce and deliver:

1. **nginx server-block snippet** with `add_header` directives for CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, plus `server_tokens off;`.

2. **Registrar instruction** for enabling DNSSEC on hg.com.pk.

Optionally commit the snippet as `deploy/nginx.conf.example` so the configuration is version-controlled and reviewable, even though this repository does not apply it.

**Realistic CSP** — the site is fully self-hosted (exactly one external URL exists site-wide, an outbound `<a href>`; fonts and React are local), so `default-src 'self'` is trivially achievable:

```
default-src 'self';
script-src 'self' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
font-src 'self';
connect-src 'self';
form-action 'self';
frame-ancestors 'none';
base-uri 'self';
object-src 'none';
upgrade-insecure-requests;
```

**Honest limitation, to be documented rather than hidden:**

- **`'unsafe-eval'` is mandatory.** `support.js:687` and `support.js:1028` compile components at runtime via `new Function(...)`. Nonces and hashes do not help — `new Function` is blocked by CSP regardless. Removing this means replacing the runtime-compiled `.dc.html` model with a build step: a rewrite, not a remediation.
- **`'unsafe-inline'` for styles is mandatory.** 463 inline `style=""` attributes, plus `support.js` injecting `<style>` elements and calling `insertRule()` at runtime (lines 163, 1226-1231, 1431, 1461). Hashing 463 attributes is not practical.

The eleven inline `<script type="text/x-dc">` blocks do **not** require `script-src 'unsafe-inline'` — their type is not a JS MIME type, so the browser never executes them and CSP does not apply. Likewise the `onClick`/`onSubmit` attributes are React-style props consumed by the runtime, not DOM inline handlers.

Report the outcome as "CSP deployed with documented `unsafe-eval`/`unsafe-inline` exceptions inherent to the current architecture", not as a hardened policy. `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'` and the tight `default-src` still deliver real value at zero breakage risk.

### Package J — Repository housekeeping
**Effort:** ~15min

**`HG Zip 29June26.zip` (6.8 MB, untracked, in the project root) contains a complete `.git/` directory** — confirmed via `unzip -l`: `.git/config`, `.git/index`, `.git/logs/refs/remotes/origin/main`, and the full object store. If this archive is ever uploaded into the webroot, the entire repository history becomes publicly downloadable at `hg.com.pk/HG Zip 29June26.zip`.

1. Add the zip to `.gitignore` and exclude it from any deployment payload.
2. Confirm the live server does not serve a `.git/` directory at the docroot.

---

## 6. Phased execution

| Phase | Packages | Gate | Effort |
|---|---|---|---|
| **0** | Decisions 1-4; Package J | — | ~1 day (mostly waiting on approvals) |
| **1** | A, B, G | None — start immediately | ~6h |
| **2** | C | None | ~3h |
| **3** | D | Brand sign-off (Decisions 2-3) | ~4h |
| **4** | E | Endpoint live (Decision 1) | ~1 day |
| **5** | F | Design/content resource | ~1 day |
| **6** | I — runs in parallel, different owner | Server + registrar access | ~1h + admin time |
| **7** | **Re-run ACRE**; triage the residual | After phases 1-5 | ~2h |
| **8** | H — optional AAA | Client decision | ~3-5 days |

**Phases 1-4 achieve WCAG 2.2 Level AA**, which is the conformance level regulators actually require. That is approximately **3-4 developer days**, plus the endpoint decision and brand sign-off.

Phase 8 adds a further 3-5 days for Level AAA criteria, which WCAG itself does not recommend as a site-wide policy.

### Verification after each phase

- Phase 1: validate HTML; confirm one `<main>`, one `<h1>` and a working skip link per page; check heading order with a headings-outline tool.
- Phase 2: test with OS-level "reduce motion" enabled — confirm the headline stops rotating, the counters jump to final values, and all partner logos remain reachable.
- Phase 3: re-check the computed ratios in DevTools; tab through every page confirming a visible focus ring on all 39 source-level controls.
- Phase 4: submit both forms and confirm the message actually arrives; test the error and success paths with a screen reader.
- Phase 7: re-run ACRE and compare against this plan; document any remaining findings as accepted risks with reasons (expected residual: the hero scrim, decorative-border dismissals, the AAA tier, and the CSP exceptions).

---

## 7. Issues outside the audit's scope, raised for escalation

These are not accessibility defects but were identified during the survey and warrant separate attention:

1. **Contact forms discard all submissions** (Decision 1) — business-critical.
2. **`fibre-network-map.webp` contains garbled AI-generated place labels** — "Baralmgbavria", "Eartom", "Wortitar", "Murrchi", "Mamm", "Maranor Fahnconi", "Muitarn", "Khahnah", "Koarah" — and labels **"Islamabad" twice**, the second time in southern Sindh where Hyderabad or Sukkur would be. A credibility problem independent of WCAG, on a map presented as the company's network footprint.
3. **`wavecomm-residential-ftth.webp` displays a fabricated Netflix interface including the NETFLIX wordmark.** Using a third party's trademark in a synthesised marketing image that implies a service relationship is a commercial and legal risk.
4. **Brand-name inconsistency** — "HG TELECOMMUNICATION PRIVATE LIMITED" (singular) on one image, "HG TELECOMMUNICATIONS" (plural) on two others, and `alt="HG Telecommunication"` in `SiteHeader.dc.html:17` and `SiteFooter.dc.html:26`. Needs a single decision applied consistently.
5. **Three dead `href="#"` links** in the footer, rendered on all 7 pages (Package B.5).
6. **Careers form has no CV upload** (Package E.7).
7. **Duplicate enquiry forms** on Contact and Careers (Package E.6).

---

## 8. Source material

- `D:\Wavecom\HG Telecom\Sep 26\HG LDI - Web Content Accessibility Report 17th August 2026.pdf` — 19 pages, ACRE report schema `acre.report.v1`.
- Legal notice from that report: it is generated by automated technical analysis, is informational only, and does not constitute legal advice, certification, or a guarantee of regulatory compliance. Findings should be validated with qualified accessibility professionals before business or legal decisions. This plan's dismissal of ACC-04 and ACC-11 as false positives, and its treatment of the AAA tier as optional, are engineering judgements that should be reviewed on that basis.

---

# 9. Implementation log

> **Purpose.** This section is the durable state of the remediation. It is updated as work
> lands so a new session can resume without re-deriving context. Sections 1-8 above are the
> *plan*; this section is the *record*.
>
> **How to resume:** read 9.1 (decisions), then 9.3 (status board). Anything marked
> `NOT STARTED` or `BLOCKED` is the next work. Anything marked `DONE` has been applied to
> the working tree.

## 9.1 Decisions taken

Recorded 16 September 2026. These resolve the four blocking decisions in section 4.

| # | Decision | Outcome | Consequence |
|---|---|---|---|
| **1** | Form submission endpoint | **Web3Forms**, to be wired in a later, separate piece of work. | **Package E stays BLOCKED.** See 9.5 - the false "we've received your enquiry" message is still live and every submission is still discarded. |
| **2** | Brand green as text | **Approved:** add `--color-brand-text: #00763B` (5.75:1 on white). Darken CTA and active-nav-pill *fills* to the same value, keeping the white label. `--color-brand` `#00A850` is retained for the logo, large fills, icon chips, decorative dots and `--border-brand`. | Visible change on every page: green eyebrows and primary buttons read darker. |
| **3** | `--border-subtle` at 1.30:1 | **Option B:** keep `#DCE3DF` for purely decorative hairlines; add `--border-interactive: #7F8D85` (3.47:1) applied only to boundaries of interactive elements. | Current visual design preserved. WCAG 1.4.11 requires 3:1 only for boundaries that convey state or delimit a control, so ornamental card hairlines are legitimately exempt. |
| **4** | Security findings | Confirmed out of repository scope. | Package I not executed this session. SEC-01/02/03 remain open with the server admin and registrar. |

**Scope selected for this session:** Packages **A, B, C, D, G** (plan phases 1-3).
**Not selected:** E (blocked on Decision 1), F, H, I, J.

## 9.2 Session 1 - 16 September 2026

### Foundation (done directly, not delegated)

All paths relative to `_ds/hg-communication-design-system-e7295788-beb5-450f-a12b-213eea38d73b/`.

| File | Change |
|---|---|
| `tokens/colors.css` | Added `--color-brand-text: var(--green-700)`. `--text-muted` `#6B7B73` to `#5E6D66` (4.46 to 5.45:1). `--text-faint` `#93A19A` to `#616F68` (2.79 to 5.27:1). Added `--border-interactive: #7F8D85`. `--border-default` `#BCC7C2` to `#7F8D85` (1.85 to 3.47:1). `--border-strong` to `#616F68`. `--ring-brand` `rgba(0,168,80,0.35)` to opaque `#00763B` (1.49 to 5.75:1). Added `--ring-on-dark: #56D08F` (7.95:1 on `--surface-inverse`). `--border-subtle` deliberately unchanged per Decision 3. Every change carries an inline comment with its ratio and rationale. |
| `tokens/motion.css` | Added the global `@media (prefers-reduced-motion: reduce)` block zeroing `animation-duration`, `animation-iteration-count`, `animation-delay`, `transition-duration`, `transition-delay` and `scroll-behavior` on `*`, `*::before`, `*::after` with `!important` - which outranks inline `style=""`, so it also neutralises the hero cross-fade and the runtime-injected transitions. |
| `tokens/a11y.css` | **New file.** Global `:focus-visible` ring (`3px solid var(--ring-brand)`, offset 2px) across `a`, `button`, `input`, `textarea`, `select`, `summary`, `[tabindex]`; a `.hg-on-dark` scope switching the ring to `--ring-on-dark`; `.hg-skip-link`; `.hg-visually-hidden`; and a `[tabindex="-1"]:focus:not(:focus-visible)` suppressor so programmatic focus moves do not draw a ring. |
| `styles.css` | Added `@import url('./tokens/a11y.css')` as the last import, so focus rules win over component styles. |
| `_ds_manifest.json` | Registered `tokens/a11y.css` in `globalCssPaths`; synced the five changed token values and added the three new tokens so the Design Canvas editor does not show stale values. Metadata only - the runtime loads `styles.css` via `<link>`. |

**Why `:focus-visible` matters most.** It appeared **zero times** in the codebase before this
change. The only six controls that set `outline:none` are the six form fields, and both of
their replacement rings measured under 1.5:1. Every other control relied on the unauthored
browser default.

### Delegated file work

Partitioned by **file**, not by package, so no two workers touch the same file. Each worker
received the runtime contract (`{{ }}` interpolation, `null`-prop attribute omission,
`class` to `className`, camelCase attribute survival, `sc-if`/`sc-for`, the `data-dc-script`
block) plus the token names above.

| Worker | Files | Packages applied |
|---|---|---|
| 1 | `index.html` | A1-A3, B4, C2-C4, D3, D4, G1, G3 |
| 2 | `SiteHeader.dc.html`, `PageHero.dc.html` | A2, A4, A5, B1-B4, D3, G1 |
| 3 | `SiteFooter.dc.html`, `GetInTouch.dc.html`, `ImagePlaceholder.dc.html` | A2, B4, B5, C1, D3, G1 |
| 4 | `About`, `Services`, `Wavecomm`, `LinkTechnology`, `Careers`, `Contact` | A1-A3, A6, B4, D3, G1-G3 |

Worker 3 was given an explicit **scope boundary**: it may change colour and sizing values on
form elements, but must not touch any form control attribute, label, handler or the
success-panel behaviour - that is Package E, blocked on Decision 1.

*(Outcomes recorded in 9.3 as each worker reports.)*

### Worker 1 outcome — `index.html` (443 → 477 lines) — VERIFIED

| Task | Applied |
|---|---|
| A1 | `<title>` + `<meta name="description">` in the **real static** `<head>` (lines 6-7), above the `support.js` tag. |
| A2 | `<html lang="en">`. |
| A3 | `<main id="main-content" tabIndex="-1">` at line 45 (after the SiteHeader import), `</main>` at line 365 (before the SiteFooter import). Body re-indented +2. |
| B4 | All 17 pre-existing inline `<svg>` got `aria-hidden="true" focusable="false"` (18 now, including the new pause glyph). |
| C2 | `prefersReducedMotion()` helper; `startRotation()` / `stopRotation()` extracted, idempotent and null-guarded; `componentDidMount` starts rotation only when motion is allowed; `runCounters()` jumps straight to `[850, 20, 120, 4000]` and returns under reduced motion. |
| C3 | Reduced-motion block now sets `overflow:visible`, clears the mask, and makes the track `width:auto; flex-wrap:wrap`, plus `.hg-marquee-dup{display:none}`. |
| C4 | `<h1>` carries a `.hg-visually-hidden` stable sentence; the rotating content is wrapped `aria-hidden="true"`. No `aria-live`. A visible pause/play `<button>` renders inside `<sc-if value="{{ showRotationToggle }}">` so it never appears as a dead control under reduced motion; state-driven `aria-label` **and** visible text label (also satisfies 2.5.3 Label in Name). |
| D3 | 3 CTA fills → `--color-brand-text`; 6 eyebrow spans → `--color-brand-text`; `btnPrimaryHover` → `var(--green-800)` (8.34:1). |
| D4 | Hero scrim stops changed so the `max-width:680px` text column always sits over near-opaque white; right-edge falloff preserved. |
| G1 | 4 text-bearing controls converted `height` → `min-height` + symmetric padding, default rendering pixel-identical. |

**Plan corrections found by this worker** — the plan's own figures were wrong in three places:

- §5 Package B.4 lists **14** SVGs in `index.html`; there are **17**. It missed the three "Read more" arrows in the service-highlight cards.
- §5 Package C.3 assumes the marquee duplicates its logo list **twice**; it duplicates **four** times (one real group + three `aria-hidden` groups, across two marquees = **6** duplicate groups). All six now carry `.hg-marquee-dup`.
- §5 Package D3 names **one** `color:var(--color-brand)` eyebrow in `index.html`; there are **six**.

**Deliberately not changed, with reasons:**

- **G3 — `overflow:hidden` on the four Explore cards.** There is no image wrapper to move it to: the `<img>` is a direct child and the `overflow:hidden` is the only thing clipping the photo to the card's 16px corners. The cards are auto-height, so a text-spacing override grows the card rather than clipping it — the 1.4.12 risk is nil and the visual risk of removing it is not.
- **`phraseStyle.color: var(--color-brand)`** (the rotating hero phrase). Left at `#00A850`. It renders at `clamp(34px,5.4vw,62px)` weight 800, which is WCAG large-scale text, where the threshold is 3:1 — and it measures **3.13:1**. It passes, but by 0.13. It is also now `aria-hidden`. **This is the one remaining use of `--color-brand` as text on the site**; recorded as an accepted marginal pass rather than a fix, because moving it to `--color-brand-text` would noticeably darken the hero accent.


### Worker 2 outcome — `SiteHeader.dc.html` (163 → 188), `PageHero.dc.html` (32 → 38) — VERIFIED

- **A2** `lang="en"` on both. **A4** skip link as first child of `<header>` (line 14), targeting `#main-content`.
- **A5** `<nav aria-label="Primary">` (line 23). The mobile drawer's existing flex-column `<div>` was *converted* to `<nav aria-label="Mobile">` rather than wrapped, so the `gap:4px` rhythm and the CTA's `margin-top:12px` are byte-identical — below 920px the site now has a navigation landmark for the first time.
- **B1** `item()` returns `current: a ? 'page' : null`; `aria-current="{{ item.current }}"` on lines 25, 60, 82, 88, plus new `compLinkCurrent` / `compWaveCurrent` / `mCompLinkCurrent` / `mCompWaveCurrent` for the four hard-coded company links. The desktop Companies `<button>` correctly received **no** `aria-current` — it is a disclosure trigger, not a link.
- **B3** Companies: `aria-expanded` / `aria-haspopup="true"` / `aria-controls="hg-companies-menu"`, Escape-to-close restoring focus to the trigger via `React.createRef()`. Burger: state-driven `aria-label` (`Open menu` / `Close menu`), `aria-expanded`, `aria-controls="hg-mobile-menu"`, Escape-to-close from inside the drawer.
- **B4** all 6 SVGs. **B2** breadcrumb rebuilt as `<nav aria-label="Breadcrumb">` + `<ol>`/`<li>`, chevron `aria-hidden`, terminal item `aria-current="page"`, appearance preserved.
- **D3** both `tel:` CTA fills, `navStyle()` active fill → `--color-brand-text`; `navHover()` active and `callHover` → `--green-800`. Nav pill, dropdown panel, dropdown arrow and burger borders → `--border-interactive`; the header `border-bottom` and drawer `border-top` stayed `--border-subtle` (decorative).
- **G1** line 15 (`height:74px` on the row holding the whole nav — the single highest-risk 1.4.12 site, combined with the site-wide `whiteSpace:'nowrap'`), plus lines 64 and 90, converted to `min-height` + padding.

**`ref="{{ ... }}"` is safe** — not an invention. `index.html:327` already used `ref="{{ statsRef }}"` before this work, and `collectProps` passes `ref` straight through to `React.createElement`, which extracts it.

**Corrected in review:** the worker added `box-sizing:border-box` to its three G1 elements, reasoning that no global reset exists. That premise is wrong — it grepped the design system but not the page helmets, and **all 7 pages carry `*{ box-sizing:border-box }`** in their `<helmet>` `<style>`. The additions are harmless, and are in fact an improvement: they make the component render correctly when previewed standalone in the Canvas editor, where the page helmet is absent. Kept.

**Known limitation:** `aria-controls` points at IDs that exist only while the disclosure is open (both panels are inside `sc-if`). This is the common pattern and is what was specified, but a strict validator may flag the dangling reference in the collapsed state. No focus trap was added to the Companies dropdown — tabbing out leaves it open until the mouseleave timer fires.

### Worker 3 outcome — `SiteFooter` (119), `GetInTouch` (104), `ImagePlaceholder` (51) — VERIFIED WITH CORRECTIONS

Scope boundary held: **zero** changes to form control attributes, labels, handlers or success-panel behaviour. The only `id` added was `hg-git-heading` on a `<h2>`.

- **A2** all three. **B4** all 13 SVGs. **C1** `ImagePlaceholder` now links the design system — it was the only file missing it, so it previously inherited neither the reduced-motion block nor the focus rules.
- **A3** `GetInTouch` got `<section aria-labelledby="hg-git-heading">` rather than a `<main>`, which would have nested inside Careers' and Contact's.
- **`.hg-on-dark`** on the `<footer>`: focus rings inside it now resolve to 7.95:1 instead of 1.9:1.
- **D3 footer:** placeholder 3.42 → 6.01:1; field focus ring 1.83 → 7.95:1; success-card border 2.00 → 7.95:1; input borders 1.96 → 4.66:1.
- **D3 GetInTouch:** success border 1.50 → 5.75:1; submit fill 3.13 → 5.75:1; hover 4.08 → 8.34:1. The `--ring-brand` reference at line 15 now resolves opaque and passes at 5.75:1 with no markup change.

**This worker recomputed the plan's own figures and found several wrong.** §5 Package D3 computed the footer values against bare `--surface-inverse`, ignoring the `rgba(255,255,255,0.06)` field fill that actually sits beneath those borders. Verdicts are unaffected, but the corrected numbers are: input border 0.16 = **1.96:1** (not 1.65), at 0.45 = **4.66:1** (not 4.23); social border **1.84:1** (not 1.54); footer success border **2.00:1** (not 1.75); footer focus ring **1.83:1** (not 1.19); GetInTouch success border **1.50:1** (not 1.37).

**Corrected in review — the footer submit button.** The worker applied `--color-brand-text` #00763B per the plan, then correctly noticed this fixes the label (3.13 → 5.75:1) but drops the *button-vs-footer edge* to 2.69:1, under the 1.4.11 3:1 floor. It concluded "there is no single fill that satisfies both" — **that conclusion is wrong**, and its own figures disprove it: the constraint window is `L ∈ [0.154, 0.183]`, which is non-empty.

| Fill | White label (1.4.3) | Edge vs footer (1.4.11) | Both? |
|---|---|---|---|
| `#00A850` original | 3.13:1 ✗ | 4.94:1 ✓ | no |
| `#00763B` as applied | 5.75:1 ✓ | 2.69:1 ✗ | no |
| **`#008542`** | **4.74:1 ✓** | **3.26:1 ✓** | **yes** |
| `#0C5A2F` hover as applied | 8.34:1 ✓ | 1.85:1 ✗ | no |

Resolution: added **`--color-brand-on-dark: #008542`** to `colors.css` and applied it to the footer submit fill. This is the value §4 Decision 2 already named as the intermediate option. Hover moved from `--green-800` to `--color-brand-text` (#00763B) — the plan's blanket "`#0C5A2F` for primary CTA hover" was written for light backgrounds; on the dark footer it made the button melt into the background at 1.85:1 on hover.

**Corrected in review — `ImagePlaceholder`.** The worker changed the `light` tone's dashed border from `--border-default` #7F8D85 to brand green. #7F8D85 was **already passing at 3.05:1**, and this placeholder is non-interactive decoration, so the swap was a designer-visible change (grey dashed boxes turning green) for no conformance gain. **Reverted to `--border-default`.** The `green` tone's change was kept — that one was a genuine 1.52:1 failure.

**Fixed in review — a defect none of the workers were briefed on.** `ImagePlaceholder`'s "IMAGE PLACEHOLDER" caption carried `opacity:0.75`, compositing `--text-faint` to **2.91:1** at 10.5px — a real 1.4.3 failure in live markup, since `GetInTouch:84` renders this component on both Contact and Careers as the Lahore office map. Removed the opacity: light tone now **4.63:1**, green tone **5.23:1**.

**Dead links (B5) — CONTENT REMOVED, needs client sign-off.** An exhaustive search of the repository found **no real social profile URL anywhere**. So:
- The 4 social links and their wrapper were **removed**. The `.hg-foot-social:hover` rule and the `socials` array in `renderVals` were deliberately left in place, inert, so real URLs could be restored by re-adding markup alone. **This paid off - see 9.6, where the client supplied the URLs and the row was restored without touching the hover rule or the styling.**
- **Privacy and Terms were removed.** A dead `href="#"` fails 2.4.4, and no real pages exist to point at. **→ The client must supply real Privacy and Terms pages, or formally accept their absence.** For a telco collecting names and email addresses through two forms, this is a commercial and legal exposure well beyond the accessibility question. Flagged in 9.5.

### Worker 4 outcome — the six page files — VERIFIED

- **A1** `<title>` + `<meta name="description">` in the real static `<head>` of all six, descriptions written from each page's own content. **A2** `lang="en"` on all six. **A3** `<main id="main-content" tabIndex="-1">` on all six, with PageHero (the `<h1>`) inside and both SiteHeader and SiteFooter outside.
- **B4** all 20 SVGs across the five files that have them; `Contact.dc.html` confirmed to have zero, as the plan predicted.
- **A6 — the heading skip was real, and worse than the plan described.** `Services.dc.html`'s actual outline was `h1 → h3 → h3 → h3 → h3 → h2`: the four cards skipped a level *and* the only `<h2>` came last, as the CTA heading. All four cards promoted to `<h2>`; their `font-size:22px; font-weight:700` were already explicit inline, so the tag change is visually inert. New outline: `h1 → h2 ×5`. The worker checked the other five files' outlines and found **no other skip**.
- **D3** nine eyebrow spans across About, Services, Wavecomm and LinkTechnology → `--color-brand-text`; Services CTA fill 3.13 → 5.75:1; `btnPrimaryHover` 4.08 → 8.34:1; `.hg-on-dark` on the Services dark CTA band; Careers info-card border 1.30 → 5.23:1 (visibly darker green hairline).
- **G1** Services and LinkTechnology CTAs converted to `min-height` + padding, rendered height preserved.
- **G3** `overflow:hidden` removed from six cards (Services ×4, Wavecomm ×2) and the corner clipping moved onto the images as `border-radius:17px 17px 0 0` — 17px being the card's 18px radius minus its 1px border, which is exactly what `overflow:hidden` clipped to. Pixel-identical, and the text can now grow under a spacing override.

**Two more plan errors found:**

1. **§5 Package G2 is a false positive.** The plan calls for a `max-width` on the Services dark-band paragraph. It is *already* capped — its parent is `max-width:620px`, roughly 77 characters at 16px, which is inside 1.4.8's 80-character limit and **tighter than the 680px the plan proposed**. Applying the plan would have been a regression. No change made.
2. **§5 Package A6's premise about the Services outline was incomplete** — see above.

**Deliberate refusal, upheld on review.** The worker declined to swap `--border-subtle` → `--border-interactive` on ~17 card borders. Its reasoning is correct: none of those cards is an operable control — no `href`, no `onClick`, no `tabIndex`, not keyboard-reachable — and their `style-hover` applies only a decorative `translateY(-4px)` lift. WCAG 1.4.11 scopes the 3:1 requirement to *user interface components* and state indicators. Swapping them would have darkened 17 hairlines across four pages for zero conformance gain. The only genuinely interactive elements in those six files are two `<a>` buttons, and neither uses `--border-subtle`.

### Review corrections applied directly

| # | Correction | File |
|---|---|---|
| 1 | Added `--color-brand-on-dark: #008542` — the only tone satisfying both 1.4.3 and 1.4.11 on the inverse surface | `tokens/colors.css` |
| 2 | Footer submit fill → `--color-brand-on-dark`; hover → `--color-brand-text` (was melting into the footer at 1.85:1) | `SiteFooter.dc.html` |
| 3 | Reverted the `light`-tone dashed border to `--border-default` (already passing at 3.05:1) | `ImagePlaceholder.dc.html` |
| 4 | Removed `opacity:0.75` from the placeholder caption — a real 2.91:1 failure in live markup | `ImagePlaceholder.dc.html` |

### Verification harness

`tools/verify-a11y.js` — committed so the Phase 7 re-audit and any future session can re-run it:

```
node tools/verify-a11y.js
```

It recomputes every contrast ratio from first principles (WCAG relative luminance, alpha composited over the real backdrop) rather than trusting the figures in this document, then checks per file: `lang`, static `<title>`/description, exactly one `<main>` with the header and footer outside it and the `<h1>` inside, complete `aria-hidden`/`focusable` coverage on SVGs, no brand green as text, no white label on a 3.13:1 fill, no fixed height on a text-bearing control, no dead `href="#"`, and tag balance — plus cross-file checks for the skip link, nav landmarks, disclosure ARIA, breadcrumb semantics and the reduced-motion guards.

It deliberately does **not** flag: `border-color`/`outline-color` uses of brand green (non-text, 3:1 applies and 3.13:1 clears it), square icon chips whose `color:#fff` only drives `currentColor` for an `aria-hidden` glyph, or fixed heights on square boxes. Those were all false positives in an earlier revision.

**Current result: 189 passed, 0 failed, 0 to review.**

Additionally validated: every `data-dc-script` logic block parses through `new Function()` (8 blocks; Careers, Contact and PageHero have none), all 8 token stylesheets have balanced braces, and `_ds_manifest.json` is still valid JSON.

## 9.3 Status board

| Package | Status | Note |
|---|---|---|
| A - Document shell and landmarks | **DONE** | 7 titles + descriptions, 12 `lang`, 7 `<main>`, skip link, 2 nav landmarks, Services heading skip fixed |
| B - Location indicator, ARIA state, SVGs | **DONE** | `aria-current` wired, breadcrumb rebuilt, both disclosures + Escape, 46 SVGs hidden. B5 CLOSED: social links restored with real URLs; Privacy Policy and Terms pages built - see 9.6, 9.7 |
| C - Motion and reduced-motion | **DONE** | Global CSS block, JS guards, marquee wrap-fallback, 2.2.2 pause control |
| D - Colour contrast | **DONE** | D1 tokens, D2 focus ring, D3 inline styles. D4 hero scrim narrowed. +1 token `--color-brand-on-dark` added in review |
| E - Forms | **BLOCKED** | Decision 1 - Web3Forms, later |
| F - Images of text and alt text | NOT STARTED | Not in this session's scope |
| G - Text spacing resilience | **DONE** | 13 controls to `min-height`, 6 cards un-clipped. G2 was a false positive - already capped |
| H - AAA tier | NOT STARTED | Optional; recommend separate engagement |
| I - Server hand-off | NOT STARTED | Different owner (server admin / registrar) |
| J - Repository housekeeping | NOT STARTED | |

## 9.4 Verification status

Checked items have actually been run. Unchecked items have **not** - recorded so they are
not mistaken for completed work. Nothing below has been confirmed in a real browser.

- [x] Tag-balance and structural validation of all 12 files (`tools/verify-a11y.js`, plus a
      stack parser per worker). **Not** a full W3C validator run.
- [x] Confirmed exactly one `<main>` per page, header/footer outside it, `<h1>` inside, and a
      skip link targeting it. Statically verified.
- [x] Heading outline read per page by hand; one real skip found (Services) and fixed.
- [x] All 8 `data-dc-script` logic blocks parse through `new Function()`.
- [x] All 8 token stylesheets brace-balanced; `_ds_manifest.json` still valid JSON.
- [ ] Full W3C HTML validator run.
- [ ] Load each page in a browser and confirm the runtime still boots - the token and
      markup edits are not covered by any test.
- [ ] OS-level "reduce motion" enabled: headline stops rotating, counters jump to final
      values, all partner logos reachable.
- [ ] Tab through every page confirming a visible focus ring on all 39 source-level controls.
- [ ] Re-check computed ratios in DevTools.
- [ ] Re-run ACRE (plan phase 7) and triage the residual. **Add the two new URLs to the
      crawl list** - the original run covered 8 URLs and predates `/privacy-policy` and `/terms`.
- [ ] Legal review of the Privacy Policy and Terms copy (see 9.7).

## 9.5 Carried forward - open items

1. **Package E / Decision 1 - Web3Forms.** Until this lands, both forms still show
   *"Thank you for reaching out - We've received your enquiry and will get back to you soon"*
   while discarding the submission. The six controls also remain programmatically
   unlabelled (zero `id`, `for`, `name`, `aria-label`), which is a **Level A** failure of
   1.3.1 and 4.1.2 independent of the endpoint.
   **When wiring Web3Forms, do these together:** the `name` attributes are a prerequisite for
   Web3Forms serialisation anyway, so labelling and endpoint are one job, not two.
   Remaining sub-tasks: section 5, Package E items 2-7.
2. **Package F** - two genuine images-of-text failures (`explore-voice-internet.webp`,
   `fibre-network-map.webp`) and seven incorrect or fragmentary alt texts.
3. **Package I** - nginx header snippet, `server_tokens off;`, DNSSEC DS record.
4. **Package J** - `HG Zip 29June26.zip` (6.8 MB, untracked, project root) contains a
   complete `.git/` directory. Add to `.gitignore`; exclude from any deployment payload;
   confirm the live server does not serve `.git/` at the docroot.
6. ~~**Privacy and Terms pages do not exist.**~~ **RESOLVED 16 Sep 2026** - both pages were
   written and the footer links restored. See 9.7. **The copy still needs review by a
   qualified lawyer before it is relied on** - it is drafted from the company facts on this
   site plus standard Pakistani telecom-sector practice, not from legal advice.
7. ~~**Social profile URLs do not exist anywhere in the repository.**~~ **RESOLVED 16 Sep 2026** -
   the client confirmed the accounts are active and supplied the URLs. See 9.6.
8. **One accepted marginal pass:** the rotating hero phrase keeps `--color-brand` #00A850 at
   **3.13:1**. It qualifies as WCAG large-scale text (clamp(34px,5.4vw,62px), weight 800),
   where the threshold is 3:1, so it passes - by 0.13. It is the only remaining use of
   `--color-brand` as text on the site. Moving it to `--color-brand-text` would darken the
   homepage's most prominent accent; recorded as a conscious trade, revisit if the brand owner
   prefers the margin.

5. **Escalations from section 7** that are not accessibility defects: the garbled AI place
   names on `fibre-network-map.webp`, the fabricated Netflix interface on
   `wavecomm-residential-ftth.webp`, and the singular/plural brand-name inconsistency.

## 9.6 Session 1, follow-up — social links restored

**16 September 2026.** The client confirmed the social accounts are active; only the markup
was never wired. Three URLs supplied (no Twitter/X account, so that entry was dropped —
the inert array had carried a fourth, speculative Twitter item).

| Network | URL | HTTP |
|---|---|---|
| Facebook | `https://www.facebook.com/hgtelecomgroup` | 200 |
| Instagram | `https://www.instagram.com/hgtelecomgroup/` | 200 |
| LinkedIn | `https://www.linkedin.com/company/hg-telecomm` | 200 |

All three verified to resolve before wiring, not assumed.

Restored in `SiteFooter.dc.html`: the `sc-for` row at lines 42-50 and the `socials` array at
lines 115-125. Because worker 3 had left the `.hg-foot-social:hover` rule and the array in
place, this was a markup-only restore — no styling was re-derived.

**Accessibility properties of the restored controls.** These are icon-only links, so the
border is the only thing identifying the control and 1.4.11 applies to it. Ratios computed
over the real composited backdrop (the button's own `rgba(255,255,255,0.06)` fill over
`--surface-inverse`), not over bare footer:

| Property | Value | Ratio | Requirement |
|---|---|---|---|
| Border | `rgba(255,255,255,0.45)` | **4.66:1** vs footer | 1.4.11 — 3:1. The original `0.14` was **1.84:1** and failed. |
| Icon glyph | `--text-on-dark-muted` | **6.57:1** vs the button fill | 1.4.11 — 3:1 |
| Hover glyph | `#fff` on `--color-brand` | **3.13:1** | 1.4.11 — 3:1 (non-text) |
| Hover fill | `#00A850` vs footer | **4.94:1** | — |
| Focus ring | `--ring-on-dark` via `.hg-on-dark` | **7.95:1** | 1.4.11 — 3:1 |
| Target size | 40 × 40 px | — | **2.5.8 Target Size (Minimum), new at AA in WCAG 2.2** — 24 px floor, passes |

Each `<a>` carries `aria-label="HG Telecommunication on <Network> (opens in a new tab)"` and
the `<svg>` is `aria-hidden="true" focusable="false"`, so the accessible name comes from the
label alone rather than from an unnamed graphic. This also satisfies 2.4.4 Link Purpose out
of context, which a bare "Facebook" would not.

`target="_blank"` with `rel="noopener noreferrer"` was added — standard for outbound social
links, and `noopener` closes the reverse-tabnabbing hole that `target="_blank"` otherwise
opens. The new-tab behaviour is announced in the accessible name, which is what 3.2.5 asks
for. **If the client would rather these open in the same tab, remove `target`/`rel` and the
trailing "(opens in a new tab)" from all three labels together** — they must stay in sync.

**Follow-on:** the Privacy and Terms pages were built in the same session - see 9.7, which closes the remaining half of B5.

## 9.7 Session 1, follow-up — Privacy Policy and Terms pages

**16 September 2026.** Two new pages, closing the remaining half of B5.

| Page | Served at | File |
|---|---|---|
| Privacy Policy | `/privacy-policy` | `privacy-policy/index.html` |
| Terms & Conditions | `/terms` | `terms/index.html` |

### Why they are directories, and why each needs `<base href="../">`

The requested URLs have no file extension, and this repository has **no server configuration
at all** (§4 Decision 4) — no `.htaccess`, no nginx conf, deployment is zip-and-upload. A
rewrite rule was therefore not available. A directory containing `index.html` produces the
requested URL using nothing but the web server's default `DirectoryIndex` / `index index.html`
behaviour, which both Apache and nginx have on by default.

That introduces one hazard. `support.js:1268` hardcodes:

```js
var COMPONENT_DIR = ".";
// …
const url = COMPONENT_DIR + "/" + encodeURIComponent(name) + ".dc.html";
```

`fetch("./SiteHeader.dc.html")` resolves against the **document**, so from
`/privacy-policy/index.html` it would request `/privacy-policy/SiteHeader.dc.html` and 404 —
taking the header, hero and footer with it. Every relative asset (`./support.js`, `_ds/…`,
`assets/…`) would break the same way, **and so would every link emitted by the shared header
and footer**, since those render into this document and resolve against its base.

`<base href="../">` fixes all of them at once. It is deliberately **relative, not `/`** — a
relative base resolves against the document's own address, so it keeps working if the site is
ever deployed into a subfolder rather than at the domain root. It must appear before the first
URL-bearing element in `<head>`; the harness asserts that.

**Boot-name side effect, verified harmless.** `rootNameForDocument()` (`support.js:129`) takes
`location.pathname`, finds it does not end in `.dc.html`, and falls back to
`new URL(doc.baseURI).pathname` — which the base tag makes `"/"`. `dcNameFromPath("/")`
returns the fallback string `"Root"`. That name is only ever a registry key for the current
document; `grep '"Root"'` over `support.js` shows no special handling, and nothing imports a
component by that name. Each page load is independent, so the two pages sharing the key is
also harmless.

### Verification performed

A local static server reproducing `DirectoryIndex` behaviour was used to check this for real,
not by inspection:

- `/privacy-policy` → **301** → `/privacy-policy/` → **200**. Same for `/terms`. This is what
  nginx and Apache will do unaided.
- Every URL either page references — both components (`./SiteHeader.dc.html`,
  `./PageHero.dc.html`, `./SiteFooter.dc.html`), `./support.js`, the design-system stylesheet
  and in-page links — resolved against `../` and fetched: **all 200**.
- The footer's `href="privacy-policy/"` and `href="terms/"` resolve correctly from **all nine**
  pages that render the footer, including from the two new pages themselves.

`tools/verify-a11y.js` now covers both pages, with three extra assertions that only apply to
them: the relative `<base>` exists, it precedes the first URL, and `active="legal"` is passed
to `SiteHeader`. **Result: 223 passed, 0 failed.**

### Accessibility properties

Both pages follow the same contract as the seven original pages: static `<title>` and
`<meta name="description">` in the real `<head>`, `lang="en"`, one
`<main id="main-content" tabIndex="-1">` with the header and footer outside it and the
PageHero `<h1>` inside, and a heading outline of `h1 → h2 → h3` with no skips.

`active="legal"` is passed to `SiteHeader` deliberately. `item()` compares the prop against
keys like `home` and `about`; `legal` matches none, so no nav item is falsely marked
`aria-current="page"`. **Omitting the prop would have been wrong** — `navStyle()` defaults to
`this.props.active || 'home'` and would have highlighted Home.

Prose is capped at `max-width:760px` (roughly 72 characters at 16px) for 1.4.8, and body links
use `--text-link` #00763B at **5.75:1** with a persistent underline, so they are not
distinguished by colour alone (1.4.1).

### Content — needs legal review

The copy is drafted from facts already published on this site (incorporated 2022, PTA-licensed
LDI operator since 2023, registered address, `info@hg.com.pk`, the two office addresses and
phone numbers) plus standard practice for a Pakistani telecom licensee. It references the
Pakistan Telecommunication (Re-organization) Act 1996, the Prevention of Electronic Crimes Act
2016 and PTA licence conditions.

**No company registration number, PTA licence number or named data-protection officer was
invented.** If the client wants those on the page they must supply them.

Two clauses were written to reflect how this business actually works and should be checked
against reality rather than assumed correct:

1. **Privacy §8 states the site uses only strictly necessary cookies.** That is true of the
   current build — there is no analytics or advertising script anywhere in the repository. It
   stops being true the moment anyone adds Google Analytics or a Meta pixel, at which point the
   clause must change and a consent mechanism is required.
2. **Privacy §2 describes call-detail-record processing** and §5 describes disclosure to the
   PTA and law-enforcement. This is normal for an LDI licensee but should be confirmed against
   the company's actual retention practice and licence conditions.

**This is drafted copy, not legal advice, and should be reviewed by a qualified lawyer before
the client relies on it.**
