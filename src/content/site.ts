// ─────────────────────────────────────────────────────────────
// Edit everything personal here. All placeholders are marked [EDIT].
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Your Name", // [EDIT]
  initials: "YN", // [EDIT]
  location: "Egypt",
  roles: ["Student", "Developer", "AI Builder"],
  tagline: "I build software and AI-assisted tools — and learn in public while doing it.",
  bio: [
    "I'm a student and developer from Egypt. I like turning everyday problems into small, well-made products, and I use AI tools as part of how I design, prototype and ship.", // [EDIT]
    "Right now I'm focused on two projects: a nutrition tracker and a strategy game prototype. Both are works in progress, and I'm documenting what I learn along the way.", // [EDIT]
  ],
  email: "you@example.com", // [EDIT]
  socials: [
    { label: "GitHub", icon: "github", href: "https://github.com/your-username" }, // [EDIT]
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/your-username" }, // [EDIT]
    { label: "X", icon: "x", href: "https://x.com/your-username" }, // [EDIT]
  ] as const,
};

// Optional: your live site address, e.g. "https://yourname.dev" (no trailing slash).
// Leave empty until you have one — canonical links are only added when set.
export const siteUrl = ""; // [EDIT]

// ── Placeholder guards ───────────────────────────────────────
// Values still containing the template placeholders are treated as unset,
// so the live site never shows "Your Name" or links to fake addresses.
const PLACEHOLDER = /your name|you@example\.com|your-username|^yn$/i;
export const isSet = (v: string | undefined | null): v is string =>
  !!v && v.trim() !== "" && !PLACEHOLDER.test(v);

export const displayName = isSet(site.name) ? site.name : "Portfolio";
export const displayInitials = isSet(site.initials) ? site.initials : "◆";
export const contactEmail = isSet(site.email) ? site.email : null;
export const activeSocials = site.socials.filter((s) => isSet(s.href));

export type ProjectStatus = "In development" | "Early prototype";

export type Project = {
  id: string; // also the URL: /projects/<id>
  name: string;
  status: ProjectStatus;
  kind: string;
  summary: string;
  planned: string[];
  notYet: string;
  stack: string[];
  visual: "mizano" | "kingdom";
  // Optional case-study fields — leave out until you have real content.
  problem?: string;
  approach?: string;
  currentProgress?: string;
  learnings?: string[];
  screenshots?: { src: string; alt: string }[];
  repoUrl?: string;
  liveUrl?: string;
};

export const getProject = (slug: string) => projects.find((p) => p.id === slug);

export const projects: Project[] = [
  {
    id: "mizano",
    name: "Mizano",
    status: "In development",
    kind: "Nutrition tracking app",
    summary:
      "A focused app for tracking meals, calories, protein and macros — designed to make daily logging quick and progress easy to read.",
    planned: [
      "Meal and calorie logging",
      "Protein and macro breakdowns",
      "Progress screens",
      "Food management library",
    ],
    notYet: "AI features, accounts, reminders and rewards are ideas on the roadmap — not live.",
    stack: ["Mobile UI", "Data modeling", "AI-assisted prototyping"],
    visual: "mizano",
  },
  {
    id: "kingdomforge",
    name: "KingdomForge",
    status: "Early prototype",
    kind: "3D medieval strategy game · Android",
    summary:
      "An early-stage concept for a strategy game where kingdom, economy, building, citizens and military are interconnected systems rather than separate menus.",
    planned: [
      "Kingdom & territory systems",
      "Resource-driven economy",
      "Building and citizen simulation",
      "Military that depends on the economy",
    ],
    notYet: "Concept / prototype stage. Not finished and not published.",
    stack: ["Game design", "Systems thinking", "3D / Android"],
    visual: "kingdom",
  },
];

export const skills = [
  { group: "Languages", items: ["JavaScript", "TypeScript", "Python", "HTML & CSS"] }, // [EDIT]
  { group: "Mobile", items: ["Dart", "Flutter", "Cross-platform UI"] }, // [EDIT]
  { group: "Building", items: ["React", "Responsive UI", "Git & GitHub", "REST APIs"] }, // [EDIT]
  { group: "AI workflow", items: ["Prompt design", "AI-assisted coding", "LLM tools", "Rapid prototyping"] }, // [EDIT]
  { group: "Thinking", items: ["Product scoping", "Systems design", "Game design", "Learning in public"] }, // [EDIT]
];

// ── Device "teardown" layers ─────────────────────────────────
// Each layer of the laptop placeholder reveals one discipline. Later this
// same data can drive a real 3D/WebGL scene — keep the shape stable.
export type StackLayer = { id: string; part: string; label: string; tools: string[]; tone: "primary" | "accent" };
export const stackLayers: StackLayer[] = [
  { id: "screen", part: "Display", label: "Interface", tools: ["Flutter", "React", "HTML & CSS"], tone: "primary" },
  { id: "board", part: "Logic board", label: "Languages", tools: ["Dart", "TypeScript", "Python"], tone: "accent" },
  { id: "chip", part: "Processor", label: "AI workflow", tools: ["Prompt design", "LLM tools"], tone: "primary" },
  { id: "chassis", part: "Chassis", label: "Foundations", tools: ["Git & GitHub", "Systems design"], tone: "accent" },
];

// ── Support my work ──────────────────────────────────────────
// Platforms only render as links once `url` is a real https:// address.
export const support = {
  title: "Support my journey",
  body:
    "If my work resonates with you, a small contribution helps me keep building and learning. Always optional, always appreciated.", // [EDIT]
  currencies: {
    EGP: { presets: [50, 100, 200, 500] },
    USD: { presets: [1, 3, 5, 10] },
  },
  settlementCurrency: "EGP",
  paymentMethods: [
    { id: "instapay-meeza", label: "InstaPay / Meeza", kind: "bank", availability: "coming-soon" },
    { id: "vodafone-cash", label: "Vodafone Cash", kind: "wallet", availability: "coming-soon" },
  ] as const,
  platforms: [
    { id: "buymeacoffee", label: "Buy Me a Coffee", url: "" }, // [EDIT] e.g. https://buymeacoffee.com/yourname
  ],
};
export const isValidUrl = (u: string) => /^https:\/\/[^\s/$.?#].[^\s]*$/i.test(u) && isSet(u);
export const activeSupportPlatforms = support.platforms.filter((p) => isValidUrl(p.url));

export type SupportCurrency = keyof typeof support.currencies;
export const isValidSupportAmount = (value: string) =>
  /^\d+(\.\d{1,2})?$/.test(value) && Number.isFinite(Number(value)) && Number(value) > 0;

export const nav = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
