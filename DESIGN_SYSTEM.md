# Design System — Lade (read this before building)

> **Purpose:** so a fresh session understands how this site is put together *before*
> adding anything. Reuse the primitives and tokens below; don't reinvent them.

## 1. Identity in one line

A black/white **editorial agency** look ("Lade") — one variable typeface, pure
`ink`/`paper` palette, tight negative tracking on display type, generous space,
**no drop shadows**. On top of that sits an **additive "Apple System Kit"**
layer (`*-apple-*` tokens) that adds an Apple-grade responsive type ramp,
contextual margins, and geometry. The Apple layer *extends*; it never replaces
the ink/paper brand.

## 2. Stack

- **Next.js 16** (App Router, Turbopack) · **React 19**
- **Tailwind CSS v4** — config lives in `src/app/globals.css` via `@theme`, not a JS config
- **GSAP** + **Lenis** smooth scroll (driven by the GSAP ticker)
- **shadcn** token layer (the `oklch` `--background`/`--foreground`/… block) — leave intact
- **Author** variable font, **self-hosted via `next/font/local`** (`src/font/Author_Complete`), exposed as `--font-author`.
  - ⚠️ Do **not** add the Fontshare CDN `@import` for Author. It's redundant and the pasted URL was markdown-wrapped (won't parse).

## 3. Tokens (all defined in `src/app/globals.css`)

### Brand palette (use these for brand surfaces/text)
| Token | Value | Notes |
|---|---|---|
| `--color-ink` | `#000000` | primary text / dark panels. Utilities: `text-ink`, `bg-ink`, `text-ink/70` for muted |
| `--color-paper` | `#ffffff` | page bg / text on dark panels (`text-paper`, `text-paper/70`) |

### Apple type ramp — **responsive via one class**
`text-apple-{hero,headline,subhead,body,caption}` compile to `font-size: var(--text-apple-*)`.
The vars are overridden at `max-width:1023px` and `max-width:833px` in `:root`, so a
single class steps down on tablet/phone **with no `md:`/`lg:` variants**.

| Class | Desktop | ≤1023px | ≤833px |
|---|---|---|---|
| `text-apple-hero` | 56px | 48px | 40px |
| `text-apple-headline` | 40px | 36px | 32px |
| `text-apple-subhead` | 24px | 24px | 20px |
| `text-apple-body` | 17px | 17px | 16px |
| `text-apple-caption` | 14px | — | — |

### Display headline — `.display-xl`
The big editorial headlines use `.display-xl`, which now reads `var(--text-display)`
and steps at the **same** 1023/833px breakpoints as the Apple ramp (one class, no
`md:`/`lg:` variants):

| | Desktop | ≤1023px | ≤833px |
|---|---|---|---|
| `.display-xl` | ~88px (`5.5rem`) | 64px (`4rem`) | 44px (`2.75rem`) |

Tracking (`-0.025em`) and leading (`0.98`) travel with it. Use `.display-xl` for
page/section headlines; use the `text-apple-*` ramp for leads, sub-text and body.

### Tracking & leading — keep them paired with the size
Per the kit: a size token should travel with its tracking + leading.
- `tracking-apple-{hero,headline,subhead,body}` → `-0.035 / -0.03 / -0.015 / -0.022 em`
- `leading-apple-{hero,headline,subhead,body}` → `1.07 / 1.1 / 1.15 / 1.4705…`

### Geometry
- `rounded-apple-card` = 18px · `rounded-apple-pill` = 28px
- Media tiles use the **`rounded-media`** token (20px, `--radius-media`) — applied
  through `MediaFrame`, not a bare `rounded-[20px]`.
- Stacked panels use a **responsive** radius
  `rounded-t-[40px] md:rounded-t-[60px] lg:rounded-t-[80px]` (in `Section`).

### Contextual (font-relative) stacked margins
Apple spaces by proportion, not fixed px. Apply to the *following* element:
- headline after a paragraph/block → `mt-[1.6em]` (or `mt-apple-margin-headline`)
- sub-element after a header block → `mt-[0.8em]` (or `mt-apple-margin-element`)
- directly stacked items → `mt-[0.4em]` (or `mt-apple-margin-stack`)

### Available but intentionally NOT applied (additive only)
These exist so the kit's snippets compile, but the brand stays ink/paper — only
reach for them on purpose: `text-apple-text{,-secondary,-tertiary}` (translucent
black), `bg-apple-bg{,-secondary,-tertiary}` (off-white canvases),
`text-apple-link` / `text-apple-fill-blue` / `--color-apple-focus` (system blue).

## 4. Layout primitives — **use these, don't hand-roll containers**

### `Container` — `src/components/shared/Container.tsx`
Single source of truth for max-width + responsive gutters. Replaces the four
slightly-different container strings that used to be copy-pasted.
```tsx
<Container>…</Container>                 // px-6 md:px-12 lg:px-60, max-w-[1600px]
<Container width="wide">…</Container>    // tighter gutters for media-led sections (showreel)
```
`max-w-[1600px]` == the old `max-w-400` (400 × 0.25rem = 100rem).

### `Section` — `src/components/shared/Section.tsx`
Section wrapper with `variant`:
- `normal` — centered container + vertical padding
- `rounded` / `overlap` — rounded-top panel; `overlap` pulls up `-mt-20` over the
  previous section for the stacked-reveal look. Pass `bg` for the panel color.
- `bleed` — full-bleed (skips Container). Non-bleed sections route through `Container`.
- `labelledBy` — id of the section's heading → sets `aria-labelledby` so the
  section is a named landmark. Pair with `<SectionHeading id>`.

### Composition primitives — **reach for these before hand-rolling markup**
All in `src/components/shared/`:
- `PageHero` `{ eyebrow?, title, lead?, children? }` — the centered page hero used by
  every top-level page. Owns the responsive top padding (`pt-36 md:pt-52`), renders the
  single `<h1>` (`.display-xl`), demotes the kicker to `<p class="eyebrow">`, and puts
  the lead on the `text-apple-subhead` ramp. **Use it for every page hero** so the
  heading hierarchy and phone spacing stay correct in one place.
- `SectionHeading` `{ text, id?, className? }` — `<h2>` via `RevealText` with the
  `mb-14 md:mb-20 lg:mb-28` rhythm. `id` wires `<Section labelledBy>`.
- `SectionCta` `{ href, label, variant? }` — centered closing `PillButton`
  (`mt-20 md:mt-28 lg:mt-32`).
- `MediaFrame` `{ aspect?, className?, children }` — the clipped, `rounded-media` media
  tile (gradient / `<video>` / `<Image>` fill). Pass a named `aspect` (case-study set)
  or an `aspect-*` via `className` for bespoke ratios.
- `ProjectCard` `{ project, theme?, tall?, layout? }` — the one project card (grid +
  featured). `<article>` + `<h3>`, `-explore` cursor, gradient cover via `MediaFrame`.
- `BlogPostCard` `{ post, theme?, showExcerpt?, layout? }` — the one blog list item
  (home preview + `/blog` index). `<article>`, thumb via `MediaFrame`.

## 5. Motion system — **don't break it**

- **Reveals:** wrap blocks in `Reveal` / `RevealUp` / `RevealScale` / `RevealFade`
  (CSS-driven via `data-shown`, see `InView`/`useInView`). Per-word heading reveal:
  `RevealText`. Timing knobs live in `:root` (`--reveal-*`, `--word-*`, `--nav-*`).
- **Page transitions:** `TransitionProvider` + `TransitionLink`. It gates reveals via
  `<html data-reveal="wait|go">` so incoming reveals don't play behind the sheet.
  `::view-transition-*` CSS is injected as a raw `<style>` tag (Turbopack strips it
  from processed stylesheets) — don't move it into `globals.css`.
- **Custom cursor:** `CursorProvider` + the `.cb-cursor*` CSS. Trigger states with
  `data-cursor="-explore|-play|-blend|…"` or `useCursor().set({...})`. GSAP owns the
  cursor's `transform`; never set `transform` on `.cb-cursor` / `.cb-cursor-inner` in CSS.
- All of the above honor `prefers-reduced-motion` and a no-JS fallback. Keep that.

## 6. Spacing rhythm convention (responsive)

Big fixed spacing felt cramped on phones, so section spacing now scales. Follow
this 3-step pattern for new sections (phone → tablet → desktop):
- Heading→content gap: `mb-14 md:mb-20 lg:mb-28`
- Card-grid gaps: `gap-12 md:gap-16 lg:gap-24`
- CTA blocks: `my-20 md:my-28 lg:my-32` (or `mt-…`)
- Panel top padding (in `Section`): `pt-20 md:pt-28 lg:pt-36`
- Lead/body copy: step the size, e.g. `text-xl md:text-2xl`, and pair `tracking-apple-body`.

## 7. Guardrails (from the System Kit + brand)

1. **No drop shadows** (`shadow-md/-xl` etc.). Depth comes from layered light shapes
   on the rounded panels, not blur.
2. **Keep the ink/paper brand.** Don't repaint sections Apple-blue / off-white unless
   explicitly asked — those tokens are available, not the default.
3. **Type tokens travel together** — pair a size with its `tracking-apple-*` /
   `leading-apple-*` (or the existing `leading-tight`/`leading-snug`).
4. **Containers come from `Container`/`Section`**, not new bespoke `mx-auto max-w-… px-…` strings.
5. **Author stays local** (no CDN import).
6. **Don't fight the motion system** — wrap with the `Reveal*` components; leave cursor/transition internals alone.

## 8. File map (home page = the reference implementation)

```
src/app/
  globals.css            ← all tokens + base + motion CSS (Tailwind v4 @theme)
  layout.tsx             ← Author font, providers (Transition/Cursor/SmoothScroll), metadata
  page.tsx               ← home page composition (the canonical example)
src/components/
  shared/Container.tsx   ← max-width + gutters
  shared/Section.tsx     ← section/panel wrapper (uses Container)
  shared/PageHero.tsx    ← shared centered hero (h1 + eyebrow + lead) for every page
  shared/SectionHeading.tsx, SectionCta.tsx  ← section title + closing CTA
  shared/MediaFrame.tsx  ← rounded-media tile (covers/video/blog thumbs)
  shared/ProjectCard.tsx, BlogPostCard.tsx   ← the single card per content type
  shared/Reveal*.tsx, InView.tsx, useInView.ts, RevealText.tsx  ← motion wrappers
  shared/PillButton.tsx, HoverButton.tsx, Navbar.tsx, CtaFooter.tsx, GetInTouch.tsx
  home/                  ← Showreel, AboutSummary, FeaturedProjects,
                            ServicesPreview, BlogPreview (heroes now use PageHero)
  cursor/CursorProvider.tsx, transition/TransitionProvider.tsx
```

**TL;DR for the next session:** reach for `Container`/`Section` + the `*-apple-*`
tokens + the responsive spacing pattern in §6, keep it black/white with no shadows,
and wrap anything animated in the existing `Reveal*` components.
