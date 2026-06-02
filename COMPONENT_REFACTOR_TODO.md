# Component Separation of Concerns + Semantic HTML — Pending Work

> Companion to [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md). That doc says *how the system
> works*; this one tracks *what's still inconsistent* and the target structure to fix it.
> Nothing here is done yet — these are proposed refactors. The home page was already
> migrated to `Container` + the responsive token rhythm; the items below are the rest.

---

## 1. Separation of concerns — pending

### 1.1 Duplicate / dead card components (highest priority)
There are **three** project-card implementations that render the same thing
(gradient tile + name/description):

| File | Status | Problem |
|---|---|---|
| `src/components/home/ProjectCard.tsx` | **DEAD — unused** | No importer (grep confirms only `project/ProjectCard` is used). Delete. |
| `src/components/project/ProjectCard.tsx` | in use (via `ProjectGrid`) | **Re-defines its own `gradientFor`** instead of importing `@/lib/gradient` — a copy of the lib function. |
| `src/components/home/FeaturedProjects.tsx` → local `FeaturedCard` | in use | Same markup again, just `text-paper` instead of `text-ink` and a `tall` aspect. |

**Action:** one `src/components/shared/ProjectCard.tsx` with props
`{ project, theme?: "ink" | "paper", tall?: boolean }`. Import `gradientFor` from
`@/lib/gradient` (single source). Delete the dead `home/ProjectCard.tsx`. Replace
`FeaturedCard` and `project/ProjectCard` usages with it.

### 1.2 Data still embedded in presentation components
`lib/` already holds `projects.ts` and `blog.ts` — but some data is hard-coded
inside components, mixing content with markup:

- `home/ServicesPreview.tsx` → `SERVICE_CARDS` array → move to **`lib/services.ts`**
  (also consumed by `services/Solutions.tsx` / `services/Benefits.tsx`, which carry
  their own inline item arrays — unify them there).
- `shared/CtaFooter.tsx` → `FOOTER_LINKS` and `SOCIALS` arrays → move to
  **`lib/site.ts`** (nav + socials are site-level config).

**Action:** move arrays to `lib/`, import into components. Keeps components purely
about layout/markup.

### 1.3 Missing reusable primitives (repeated markup)
These blocks are copy-pasted across sections; extract each into `shared/`:

| New component | Replaces (repeated in) | Shape |
|---|---|---|
| `SectionHeading` | `display-xl` `h2` + responsive `mb-14 md:mb-20 lg:mb-28` in `FeaturedProjects`, `ServicesPreview`, `BlogPreview` | `<RevealText as="h2" className="display-xl …">` |
| `SectionCta` | centered `PillButton` block (`mt-20 md:mt-28 lg:mt-32 text-center`) in the same three | wraps a `PillButton` |
| `MediaFrame` | `relative aspect-… overflow-hidden rounded-[20px]` + absolute gradient/`<video>` fill — in every card, `AboutSummary`, `Showreel`, blog list, `ProjectCard` | `{ aspect, children/gradient }` |
| `BlogPostCard` | the blog list item duplicated in `home/BlogPreview.tsx` **and** `app/blog/page.tsx` (near-identical) | `{ post, theme }` |
| `PageHero` | `HomeHero`, `ProjectsHero`, `services/Hero`, `contact/Hero`, blog index hero — five near-identical heroes | `{ eyebrow?, title, lead?, children? }` — **also fixes the heading bug in §2.1 in one place** |

### 1.4 `Container` not yet adopted outside the home page
`Container` exists but these still hand-roll `mx-auto max-w-[1600px] px-6 md:px-12 lg:px-…`:

- `app/blog/page.tsx`, `app/projects/page.tsx`
- `project/ProjectsHero.tsx`, `services/Hero.tsx`, `services/VideoShowcase.tsx`
- `contact/Hero.tsx`, `contact/ContactForm.tsx`, `contact/ContactDetails.tsx`
- `shared/CtaFooter.tsx` (two hand-rolled containers — note it intentionally uses
  `lg:px-[7.5rem]`, so use `<Container width="wide">`), `shared/Navbar.tsx` (evaluate —
  the nav bar may want its own gutters)

**Action:** swap each for `<Container>` / `<Container width="wide">`. Note `blog/page.tsx`
currently uses a one-off `lg:px-30` gutter — reconcile to a Container width.

### 1.5 Magic-number radius
`rounded-[20px]` is repeated in ~8 files for media tiles. Promote to a token
(e.g. `--radius-media: 20px` → `rounded-media`) or standardise on
`rounded-apple-card` (18px). Pick one and apply via `MediaFrame` (§1.3).

### 1.6 Inconsistent responsive rhythm on inner pages
Home now uses the `phone → md → lg` ramp from `DESIGN_SYSTEM.md §6`. Inner-page
heroes still use the old fixed `pb-28 pt-48 md:pt-52` (no phone step-down) and big
fixed gaps. Apply the same ramp when they move to `PageHero` / `Container`.

---

## 2. Semantic HTML & heading hierarchy — pending

### 2.1 Inverted `h1`/`h2` in heroes (real a11y issue)
On `/services`, `/contacts`, and `/blog` the **small kicker is the `h1`** and the
**big display headline is an `h2`** — the document outline is upside-down:

```
services/Hero.tsx   h1 "Our services"   (text-xl kicker)   ← should be the kicker, not h1
                    h2 "Going beyond…"  (display-xl)        ← should be the h1
contact/Hero.tsx    h1 "Get in touch"   →  h2 "Let's build…"
app/blog/page.tsx   h1 "Blog"           →  h2 "Notes on design…"
```

`HomeHero` and `ProjectsHero` already do it right (`h1` = display headline, kicker is
a `<p>`). **Target:** the prominent headline is the **`h1`**; the kicker becomes a
`<p className="eyebrow">` (or `text-apple-caption`). Fixing this inside one `PageHero`
(§1.3) corrects all five heroes at once and guarantees **exactly one `h1` per page**.

### 2.2 Card title heading levels are inconsistent
- `ServicesPreview` and `BlogPreview` cards use `<h3>` for the card title. ✅
- Project cards (`FeaturedCard`, `project/ProjectCard`) put the name in a
  `<p><b>…</b></p>` — no heading. Pick one: either all card titles are `<h3>` (so the
  outline is `h1 → h2 (section) → h3 (card)`), or none are. Decide in the shared
  `ProjectCard` (§1.1).

### 2.3 Section landmarks are unnamed
Home stacks several `<section>`s (via `Section`) with no accessible name, so they're
not distinguishable landmarks. **Action:** give each section heading an `id` and set
`aria-labelledby` on the section (easy once `SectionHeading` owns the `h2`). Consider a
`label`/`id` prop on `Section`.

### 2.4 Self-contained items should be `<article>`
Blog post cards and project cards are self-contained syndicatable units — wrap each in
`<article>` (currently `<a><div>…`). Detail pages (`blog/[slug]`, `projects/[slug]`)
already use `<article>`/`<header>` correctly — match that pattern in the list cards.

### 2.5 Eyebrow/kicker styling is ad-hoc
Kickers use a bare `text-xl` (heroes) vs the existing `.eyebrow` utility
(`projects/[slug]`, `services` sub-labels). Standardise kickers on `.eyebrow`
(or `text-apple-caption` + uppercase tracking) when building `PageHero`.

### 2.6 Already-correct (leave as-is)
- `shared/Navbar.tsx` → `<nav>` / `<header>` ✅
- `shared/CtaFooter.tsx` → `<footer>`, `<nav>`, `<address>` ✅ (its `<h2>` "Have an idea?"
  is a CTA living in the footer — acceptable)
- Detail pages use `<article>` / `<header>` ✅

---

## 3. Target heading outline (per page, after fixes)

```
<main>
  h1  — page headline (one per page, from PageHero)
  section[aria-labelledby]
    h2  — section title (SectionHeading)
      article
        h3 — card / post title
<footer>
  h2  — "Have an idea?" CTA
```

---

## 4. Suggested order of work

1. **§1.1** consolidate ProjectCard + delete dead file (removes 2 files of dup).
2. **§1.3 `PageHero`** → also fixes **§2.1** heading inversion across 5 heroes.
3. **§1.3 `SectionHeading` + `SectionCta` + `MediaFrame`** → DRYs the three home sections + cards.
4. **§1.4** adopt `Container` on inner pages; **§1.6** apply the responsive ramp.
5. **§1.2** move inline data to `lib/`.
6. **§2.3 / §2.4** add `aria-labelledby` + `<article>` (cheap once primitives exist).
7. **§1.5** radius token, applied through `MediaFrame`.

> Build/typecheck after each step (`pnpm build`, `pnpm exec tsc --noEmit`). Keep all
> `Reveal*` / cursor / transition behavior intact (see `DESIGN_SYSTEM.md §5`).
