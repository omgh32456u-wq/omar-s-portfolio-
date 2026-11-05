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

export type ProjectStatus = "In development" | "Early prototype";

export const projects: {
  id: string;
  name: string;
  status: ProjectStatus;
  kind: string;
  summary: string;
  planned: string[];
  notYet: string;
  stack: string[];
  visual: "mizano" | "kingdom";
}[] = [
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
  { group: "Building", items: ["React", "Responsive UI", "Git & GitHub", "REST APIs"] }, // [EDIT]
  { group: "AI workflow", items: ["Prompt design", "AI-assisted coding", "LLM tools", "Rapid prototyping"] }, // [EDIT]
  { group: "Thinking", items: ["Product scoping", "Systems design", "Game design", "Learning in public"] }, // [EDIT]
];

export const nav = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
