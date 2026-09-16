#!/usr/bin/env node
/* Verification harness for the Sep Plan PTA remediation (packages A, B, C, D, G).
   Static checks only - it does not boot the runtime. Run from the project root. */

const fs = require('fs');
const path = require('path');

const ROOT = process.argv[2] || process.cwd();
const PAGES = ['index.html', 'About.dc.html', 'Services.dc.html', 'Wavecomm.dc.html',
               'LinkTechnology.dc.html', 'Careers.dc.html', 'Contact.dc.html',
               // The legal pages live one directory down so they serve at
               // /privacy-policy and /terms. They carry <base href="../">, without
               // which the runtime would fetch /<dir>/SiteHeader.dc.html and 404 —
               // COMPONENT_DIR in support.js is hardcoded to "." and resolves
               // against the document.
               'privacy-policy/index.html', 'terms/index.html'];
const SUBDIR_PAGES = new Set(['privacy-policy/index.html', 'terms/index.html']);
const COMPONENTS = ['SiteHeader.dc.html', 'SiteFooter.dc.html', 'PageHero.dc.html',
                    'GetInTouch.dc.html', 'ImagePlaceholder.dc.html'];
const ALL = [...PAGES, ...COMPONENTS];

let pass = 0, fail = 0, warn = 0;
const R = (ok, label, detail) => {
  if (ok === 'warn') { warn++; console.log(`  ~ ${label}${detail ? ' — ' + detail : ''}`); }
  else if (ok) { pass++; console.log(`  ✓ ${label}`); }
  else { fail++; console.log(`  ✗ ${label}${detail ? ' — ' + detail : ''}`); }
};
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const count = (s, re) => (s.match(re) || []).length;

// ---- WCAG relative luminance / contrast ------------------------------------
const lum = hex => {
  const c = hex.replace('#', '');
  const v = [0, 2, 4].map(i => {
    const s = parseInt(c.slice(i, i + 2), 16) / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
};
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

console.log('\n=== Contrast sanity (independent recomputation) ===');
const WHITE = '#FFFFFF', INK = '#0B2A1A', GREEN50 = '#E8F8EF';
[
  ['--color-brand #00A850 on white (must FAIL AA)', ratio('#00A850', WHITE), r => r < 4.5],
  ['--color-brand-text #00763B on white >= 4.5', ratio('#00763B', WHITE), r => r >= 4.5],
  ['--color-brand-text #00763B on --green-50 >= 4.5', ratio('#00763B', GREEN50), r => r >= 4.5],
  ['--text-muted #5E6D66 on white >= 4.5', ratio('#5E6D66', WHITE), r => r >= 4.5],
  ['--text-faint #616F68 on white >= 4.5', ratio('#616F68', WHITE), r => r >= 4.5],
  ['--border-interactive #7F8D85 on white >= 3', ratio('#7F8D85', WHITE), r => r >= 3],
  ['--ring-brand #00763B on white >= 3', ratio('#00763B', WHITE), r => r >= 3],
  ['--ring-on-dark #56D08F on ink >= 3', ratio('#56D08F', INK), r => r >= 3],
  ['green-800 #0C5A2F under white label >= 4.5', ratio('#0C5A2F', WHITE), r => r >= 4.5],
  ['brand-hover #009147 under white label (must FAIL)', ratio('#009147', WHITE), r => r < 4.5],
  ['#00763B on ink (must FAIL - do not use on dark)', ratio('#00763B', INK), r => r < 4.5],
  ['#00A850 on ink (passes - ok to keep on dark)', ratio('#00A850', INK), r => r >= 4.5],
].forEach(([label, r, ok]) => R(ok(r), `${label}  [${r.toFixed(2)}:1]`));

// ---- Token file ------------------------------------------------------------
console.log('\n=== Design system ===');
const DS = '_ds/hg-communication-design-system-e7295788-beb5-450f-a12b-213eea38d73b';
const colors = read(`${DS}/tokens/colors.css`);
const motion = read(`${DS}/tokens/motion.css`);
const styles = read(`${DS}/styles.css`);
R(/--color-brand-text:\s*var\(--green-700\)/.test(colors), '--color-brand-text defined');
R(/--border-interactive:\s*#7F8D85/.test(colors), '--border-interactive defined');
R(/--ring-brand:\s*#00763B/.test(colors), '--ring-brand is opaque');
R(/--ring-on-dark:\s*#56D08F/.test(colors), '--ring-on-dark defined');
R(/--border-subtle:\s*var\(--neutral-200\)/.test(colors), '--border-subtle unchanged (Decision 3 Option B)');
R(/prefers-reduced-motion:\s*reduce/.test(motion), 'global reduced-motion block in motion.css');
R(/animation-duration:\s*0?\.001ms\s*!important/.test(motion), 'reduced-motion uses !important (beats inline style)');
R(fs.existsSync(path.join(ROOT, DS, 'tokens/a11y.css')), 'tokens/a11y.css exists');
R(/a11y\.css/.test(styles), 'a11y.css imported from styles.css');
if (fs.existsSync(path.join(ROOT, DS, 'tokens/a11y.css'))) {
  const a11y = read(`${DS}/tokens/a11y.css`);
  R(/:focus-visible/.test(a11y), ':focus-visible rule authored');
  R(/\.hg-skip-link/.test(a11y), '.hg-skip-link authored');
  R(/\.hg-visually-hidden/.test(a11y), '.hg-visually-hidden authored');
  R(/\.hg-on-dark/.test(a11y), '.hg-on-dark focus scope authored');
}

// ---- Per-file structural checks -------------------------------------------
console.log('\n=== Per-file ===');
for (const f of ALL) {
  const s = read(f);
  const isPage = PAGES.includes(f);
  console.log(`\n${f}`);

  R(/<html[^>]*\slang=("|')en\1/i.test(s), 'html lang="en"');

  if (isPage) {
    const headEnd = s.indexOf('</head>');
    const head = s.slice(0, headEnd < 0 ? 400 : headEnd);
    R(/<title>[^<]{10,}<\/title>/.test(head), 'static <title> in real <head>');
    R(/<meta\s+name=("|')description\1/i.test(head), '<meta name="description">');
    const mainOpen = count(s, /<main[\s>]/g), mainClose = count(s, /<\/main>/g);
    R(mainOpen === 1 && mainClose === 1, 'exactly one <main>', `open=${mainOpen} close=${mainClose}`);
    R(/<main[^>]*id=("|')main-content\1/.test(s), '<main id="main-content">');
    R(/<main[^>]*tabIndex=("|')-1\1/i.test(s), '<main tabIndex="-1"> (programmatic focus target)');
    if (SUBDIR_PAGES.has(f)) {
      R(/<base href=("|')\.\.\/\1>/.test(s), 'relative <base href="../"> present');
      R(s.indexOf('<base') > -1 && s.indexOf('<base') < s.indexOf('<script src'),
        '<base> precedes the first URL in <head>');
      R(/active=("|')legal\1/.test(s),
        'SiteHeader active="legal" — no nav item falsely marked current');
    }
    // <main> must contain the PageHero/h1 and must not contain the header/footer imports
    const m = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
    R(!/dc-import\s+name=("|')SiteHeader\1/.test(m), 'SiteHeader import is OUTSIDE <main>');
    R(!/dc-import\s+name=("|')SiteFooter\1/.test(m), 'SiteFooter import is OUTSIDE <main>');
    if (f !== 'index.html') {
      R(/dc-import\s+name=("|')PageHero\1/.test(m), 'PageHero (the h1) is INSIDE <main>');
    }
  }

  // SVG decoration
  const svgs = count(s, /<svg[\s>]/g);
  if (svgs) {
    const hidden = count(s, /<svg[^>]*aria-hidden=("|')true\1/g);
    const focusable = count(s, /<svg[^>]*focusable=("|')false\1/g);
    R(hidden === svgs, `all ${svgs} <svg> have aria-hidden="true"`, `${hidden}/${svgs}`);
    R(focusable === svgs, `all ${svgs} <svg> have focusable="false"`, `${focusable}/${svgs}`);
  }

  // Brand green used as TEXT. The lookbehind excludes border-color / outline-color,
  // which are non-text and only need 3:1 — #00A850 clears that at 3.13:1.
  const lines = s.split('\n');
  const brandText = (s.match(/(?<![-\w])color:\s*var\(--color-brand\)/g) || []).length;
  R(brandText === 0 ? true : 'warn', 'no "color:var(--color-brand)" as text',
    brandText ? `${brandText} occurrence(s) - check each: 4.94:1 on the dark footer (passes), 3.13:1 on white (fails)` : '');

  // Brand fill behind a white label. Only counts when the SAME element also sets a
  // font, i.e. it really renders text. A fixed-size icon chip whose color:#fff only
  // drives currentColor for an aria-hidden <svg> glyph is non-text content, and
  // 3.13:1 already clears the 3:1 threshold — flagging it would be a false positive.
  const badFill = lines.reduce((acc, ln, i) => {
    const isCssRule = /^\s*[.#a-zA-Z][^{]*\{/.test(ln);
    const rendersText = /font-family|font-size/.test(ln);
    if (!isCssRule && rendersText &&
        /background:\s*var\(--color-brand\)/.test(ln) &&
        /(?<![-\w])color:\s*#fff/i.test(ln)) acc.push(i + 1);
    return acc;
  }, []);
  R(badFill.length === 0, 'no white label on --color-brand fill (3.13:1)',
    badFill.length ? `lines ${badFill.join(', ')}` : '');

  // brand-hover behind a white label
  const hoverBad = /var\(--color-brand-hover\)/.test(s);
  R(!hoverBad ? true : 'warn', 'no --color-brand-hover as a fill under white text (4.08:1)',
    hoverBad ? 'present - verify the label colour at each site' : '');

  // fixed heights on text controls
  // A fixed height only clips text if the box actually holds text. Square boxes
  // (width === height) are icon chips, avatars and badges - they hold an <svg>,
  // so a spacing override cannot overflow them. Excluded to keep this signal honest.
  const fixedH = lines.reduce((acc, ln, i) => {
    if (!/height:\s*\d+px/.test(ln) || /min-height/.test(ln)) return acc;
    if (!/font-family|font-size/.test(ln)) return acc;
    const squares = [...ln.matchAll(/width:\s*(\d+)px;\s*height:\s*(\1)px/g)];
    const heights = (ln.match(/(?<!min-)height:\s*\d+px/g) || []).length;
    if (squares.length >= heights) return acc;   // every fixed height is a square chip
    acc.push(i + 1);
    return acc;
  }, []);
  R(fixedH.length === 0 ? true : 'warn', 'no fixed height on text-bearing controls (1.4.12)',
    fixedH.length ? `lines ${fixedH.join(', ')}` : '');

  // dead links
  const dead = count(s, /href=("|')#\1/g);
  R(dead === 0, 'no dead href="#" links (2.4.4)', dead ? `${dead} remaining` : '');

  // tag balance on the elements we touched
  for (const tag of ['nav', 'main', 'ol', 'header', 'footer', 'section', 'button', 'form']) {
    const o = count(s, new RegExp(`<${tag}[\\s>]`, 'g'));
    const c = count(s, new RegExp(`</${tag}>`, 'g'));
    if (o !== c) R(false, `<${tag}> balance`, `${o} open / ${c} close`);
  }
}

// ---- Cross-file ------------------------------------------------------------
console.log('\n=== Cross-file ===');
const header = read('SiteHeader.dc.html');
R(/class=("|')hg-skip-link\1/.test(header), 'skip link present in SiteHeader');
R(/href=("|')#main-content\1/.test(header), 'skip link targets #main-content');
R(/<nav[^>]*aria-label=("|')Primary\1/.test(header), 'desktop nav has aria-label="Primary"');
R(/<nav[^>]*aria-label=("|')Mobile\1/.test(header), 'mobile drawer wrapped in a nav landmark');
R(/aria-expanded/.test(header), 'aria-expanded on disclosure triggers');
R(/aria-controls/.test(header), 'aria-controls on disclosure triggers');
R(/aria-haspopup/.test(header), 'aria-haspopup on the dropdown trigger');
R(/aria-current/.test(header), 'aria-current wired in SiteHeader');
const hero = read('PageHero.dc.html');
R(/<nav[^>]*aria-label=("|')Breadcrumb\1/.test(hero), 'breadcrumb is a nav landmark');
R(/<ol[\s>]/.test(hero), 'breadcrumb uses an ordered list');
R(/aria-current=("|')page\1/.test(hero), 'breadcrumb terminal item has aria-current="page"');
const idx = read('index.html');
R(/matchMedia/.test(idx), 'reduced-motion JS guard present in index.html');
R(/prefers-reduced-motion/.test(idx), 'index.html queries prefers-reduced-motion');
R(/aria-hidden=("|')true\1[^>]*>\{\{ phrase \}\}|\{\{ phrase \}\}/.test(idx) &&
  /hg-visually-hidden/.test(idx), 'rotating h1 has a stable hidden text alternative (2.2.2)');
const ip = read('ImagePlaceholder.dc.html');
R(/styles\.css/.test(ip), 'ImagePlaceholder links the design system');

console.log(`\n=== ${pass} passed, ${fail} failed, ${warn} to review ===\n`);
process.exit(fail ? 1 : 0);
