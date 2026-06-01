export type Category = "web" | "app" | "branding";

/** Aspect ratios supported by the case-study media frames (ProjectMedia). */
export type MediaAspect = "ultrawide" | "wide" | "square" | "portrait" | "tall";

export type ProjectStat = { value: string; label: string };
export type Swatch = { name: string; hex: string };

export type GalleryItem = {
  /**
   * Swap-ready image path under /public (e.g.
   * "/assets/projects/crunchies/menu.jpg"). Leave undefined to render a
   * gradient placeholder — drop in a screenshot and set `src` to go live.
   */
  src?: string;
  /** Art-direction note shown faintly on the placeholder; doubles as alt text. */
  label: string;
  aspect?: MediaAspect;
  /** Span both columns in the masonry gallery. */
  full?: boolean;
};

/** Rich case-study content for a project detail page. */
export type ProjectDetail = {
  year: string;
  /** Industry / product area, e.g. "Food & delivery". */
  sector: string;
  /** Optional hero cover image; falls back to a gradient placeholder. */
  cover?: string;
  /** One-line statement under the title. */
  tagline: string;
  /** Lead paragraph. */
  overview: string;
  challenge?: string;
  approach?: string;
  deliverables: string[];
  stack: string[];
  stats: ProjectStat[];
  palette: Swatch[];
  gallery: GalleryItem[];
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  categories: Category[];
  detail?: ProjectDetail;
};

// Four products we designed and built end to end. Cover/gallery images are
// expected at /public/assets/projects/<slug>/<name>.jpg — until those exist,
// both the grid covers and the case-study media render deterministic gradient
// placeholders. Drop in a screenshot and set the matching `src`/`cover` to go
// live (see GalleryItem above).
export const PROJECTS: Project[] = [
  {
    slug: "crunchies",
    name: "Crunchies",
    description: "Food ordering and delivery built around the craving",
    categories: ["web", "app"],
    detail: {
      year: "2026",
      sector: "Food & delivery",
      tagline: "A craving-first food-ordering platform, designed and built end to end.",
      overview:
        "Crunchies is a food-ordering and delivery platform we built from the ground up — a fast, appetite-led storefront where the food does the selling and checkout never breaks stride, on web and in the app.",
      challenge:
        "Food ordering is impulsive. Most apps bury the food under menus, modifiers and forms, killing the craving before it ever reaches checkout. Crunchies had to move at the speed of hunger.",
      approach:
        "We led with full-bleed photography, oversized pricing, and a sticky cart that follows the scroll. Categories snap horizontally, add-to-cart animates with weight, and the path from browsing to ordering stays in one unbroken flow.",
      deliverables: [
        "Product strategy",
        "Art direction",
        "UX & UI design",
        "Design system",
        "Front-end build",
      ],
      stack: ["Next.js", "React Native", "Sanity", "Tailwind CSS", "GSAP"],
      stats: [
        { value: "0.4s", label: "Largest contentful paint" },
        { value: "+38%", label: "Add-to-cart rate" },
        { value: "100", label: "Lighthouse performance" },
        { value: "6", label: "Reusable commerce blocks" },
      ],
      palette: [
        { name: "Char", hex: "#181513" },
        { name: "Cream", hex: "#F4EBDD" },
        { name: "Chili", hex: "#E8462B" },
        { name: "Lime", hex: "#C7F046" },
      ],
      gallery: [
        { label: "Storefront — menu landing", aspect: "ultrawide", full: true },
        { label: "Product detail", aspect: "portrait" },
        { label: "Cart & checkout", aspect: "portrait" },
        { label: "Category filters", aspect: "wide" },
        { label: "Mobile ordering flow", aspect: "wide" },
      ],
    },
  },
  {
    slug: "caldr",
    name: "Caldr",
    description: "Scheduling and booking that feels effortless",
    categories: ["web", "app"],
    detail: {
      year: "2026",
      sector: "Scheduling",
      tagline: "Scheduling infrastructure, built as a calm, human booking moment.",
      overview:
        "Caldr is a scheduling platform we designed and built to make booking feel like a conversation, not a config screen — turning timezones, availability and buffers into a single, confident flow.",
      challenge:
        "Scheduling tools overwhelm: timezones, durations, buffers and availability all competing for attention. We wanted guests to simply pick a time without having to think about any of it.",
      approach:
        "We reduced each step to a single decision, animated the transitions between date, time and details, and let typography carry the hierarchy. Timezones resolve quietly in the background, and confirmation feels like a handshake, not a receipt.",
      deliverables: [
        "Product strategy",
        "UX & UI design",
        "Design system",
        "Interaction design",
        "Front-end build",
      ],
      stack: ["Next.js", "tRPC", "Prisma", "Tailwind CSS", "Radix UI"],
      stats: [
        { value: "3", label: "Steps to book" },
        { value: "+24%", label: "Booking completion" },
        { value: "AA", label: "WCAG contrast across flows" },
        { value: "40+", label: "Components in the system" },
      ],
      palette: [
        { name: "Ink", hex: "#0B0B0F" },
        { name: "Mist", hex: "#EEF1F4" },
        { name: "Iris", hex: "#5B5BD6" },
        { name: "Sage", hex: "#9FB89A" },
      ],
      gallery: [
        { label: "Booking page — pick a time", aspect: "ultrawide", full: true },
        { label: "Date & time step", aspect: "portrait" },
        { label: "Details & confirm", aspect: "portrait" },
        { label: "Availability settings", aspect: "wide" },
        { label: "Confirmation state", aspect: "wide" },
      ],
    },
  },
  {
    slug: "excalia",
    name: "Excalia",
    description: "A collaborative whiteboard for thinking out loud",
    categories: ["web", "app"],
    detail: {
      year: "2025",
      sector: "Productivity",
      tagline: "A collaborative whiteboard that gets out of the way and feels like paper.",
      overview:
        "Excalia is a collaborative whiteboard we designed and built for teams to sketch ideas together — an infinite, hand-drawn canvas that stays focused on the thinking, not the chrome.",
      challenge:
        "A whiteboard lives or dies by focus. The more features a canvas grows, the more toolbars and panels crowd the space meant for actual thinking.",
      approach:
        "We collapsed the chrome into a floating, context-aware toolbar, dimmed everything that isn't the drawing, and built the property panel as a calm, on-demand surface — so the canvas always belongs to the user.",
      deliverables: [
        "Product strategy",
        "UX & UI design",
        "Design system",
        "Interaction design",
        "Iconography",
      ],
      stack: ["React", "TypeScript", "Canvas API", "WebSockets", "Tailwind CSS"],
      stats: [
        { value: "-32%", label: "Chrome on screen" },
        { value: "1", label: "Floating toolbar, always in reach" },
        { value: "60fps", label: "Pan & zoom" },
        { value: "2", label: "Themes, light & dark" },
      ],
      palette: [
        { name: "Slate", hex: "#1E1E1E" },
        { name: "Paper", hex: "#FBFBFB" },
        { name: "Violet", hex: "#6965DB" },
        { name: "Coral", hex: "#FF8A65" },
      ],
      gallery: [
        { label: "Infinite canvas — focused", aspect: "ultrawide", full: true },
        { label: "Floating toolbar", aspect: "wide" },
        { label: "Property panel", aspect: "wide" },
        { label: "Light & dark themes", aspect: "ultrawide", full: true },
      ],
    },
  },
  {
    slug: "dublink",
    name: "Dublink",
    description: "Link management and analytics for modern teams",
    categories: ["web", "branding"],
    detail: {
      year: "2025",
      sector: "Marketing tools",
      tagline: "A link-management platform with a brand and dashboard built to match.",
      overview:
        "Dublink is a link-management and analytics platform we built end to end — brand, product and front-end — so every short link, click and conversion feels measurable at a glance.",
      challenge:
        "Link tools have a reputation for being unglamorous. Dublink needed a brand that signalled speed and precision, and a dashboard that turned raw analytics into something a team actually enjoys reading.",
      approach:
        "We built a tight identity around a monospaced wordmark and a single electric accent, then carried it into a data-dense but legible dashboard. Charts, link rows and QR codes share one rhythm, so the product feels designed end to end.",
      deliverables: [
        "Brand identity",
        "Logo & wordmark",
        "UX & UI design",
        "Design system",
        "Front-end build",
      ],
      stack: ["Next.js", "Tinybird", "Tailwind CSS", "Framer Motion", "PlanetScale"],
      stats: [
        { value: "1", label: "Accent color, used with intent" },
        { value: "2.1×", label: "Faster scan of key metrics" },
        { value: "30+", label: "Dashboard components" },
        { value: "100", label: "Lighthouse accessibility" },
      ],
      palette: [
        { name: "Black", hex: "#0A0A0A" },
        { name: "Snow", hex: "#FAFAFA" },
        { name: "Volt", hex: "#3B82F6" },
        { name: "Steel", hex: "#A1A1AA" },
      ],
      gallery: [
        { label: "Analytics dashboard", aspect: "ultrawide", full: true },
        { label: "Brand & wordmark", aspect: "portrait" },
        { label: "Link rows & QR", aspect: "portrait" },
        { label: "Conversion funnel", aspect: "wide" },
        { label: "Mobile dashboard", aspect: "wide" },
      ],
    },
  },
];

export const FILTERS: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Websites" },
  { id: "app", label: "Applications" },
  { id: "branding", label: "Branding" },
];

export const CATEGORY_LABEL: Record<Category, string> = {
  web: "Web",
  app: "App",
  branding: "Branding",
};

/** A project by slug, or undefined if it doesn't exist. */
export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** The next project in the list, wrapping around — powers the detail footer. */
export function getNextProject(slug: string): Project {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}

/** Detail content with a sensible fallback, so any project route renders a
 *  coherent case-study layout. Sections with no data (stats, palette,
 *  challenge…) are simply omitted by the page. */
export function getProjectDetail(project: Project): ProjectDetail {
  if (project.detail) return project.detail;
  return {
    year: "—",
    sector: "Selected work",
    tagline: project.description,
    overview: `${project.description}. A closer look at this project is on the way.`,
    deliverables: ["UX & UI design", "Art direction", "Front-end build"],
    stack: [],
    stats: [],
    palette: [],
    gallery: [
      { label: `${project.name} — overview`, aspect: "ultrawide", full: true },
      { label: "Detail", aspect: "portrait" },
      { label: "Detail", aspect: "portrait" },
    ],
  };
}

// Curated subset shown on the home page, split into two columns with the
// right column offset downward. `tall` controls the card aspect (3:4 vs 1:1)
// to reproduce the source's varied masonry rhythm.
export type FeaturedProject = Project & { tall?: boolean };

const bySlug = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug) as Project;

export const FEATURED_LEFT: FeaturedProject[] = [
  { ...bySlug("crunchies"), tall: true },
  { ...bySlug("excalia") },
];

export const FEATURED_RIGHT: FeaturedProject[] = [
  { ...bySlug("caldr"), tall: true },
  { ...bySlug("dublink") },
];
