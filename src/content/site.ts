// ─────────────────────────────────────────────────────────────
// Edit everything personal here. All placeholders are marked [EDIT].
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Omar Elhady", // [EDIT] Public display name
  initials: "OE", // [EDIT]
  location: "Egypt",
  roles: ["Student Developer"],
  tagline: "I learn programming by building software, solving problems and thinking through product decisions.",
  bio: [
    "I'm a student developer from Egypt. I learn by writing code, solving everyday problems and turning ideas into useful software. AI tools assist my workflow; programming and product decisions remain my responsibility.", // [EDIT]
    "Right now I'm exploring nutrition tracking, medieval strategy simulation and student-life tools. These projects are works in progress, and I'm documenting what I learn along the way.", // [EDIT]
  ],
  email: "omar.lhd4dev@gmail.com", // [EDIT] Public professional contact only
  creator: "Creator: Omar Elhady",
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
  headline: string;
  status: ProjectStatus;
  kind: string;
  summary: string;
  planned: string[];
  notYet: string;
  stack: string[];
  visual: "mizano" | "kingdom" | "nafas";
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
    headline: "A smarter way to track meals and understand nutrition",
    status: "In development",
    kind: "Nutrition tracking app",
    summary:
      "A focused app for tracking meals, calories, protein and macros — designed to make daily logging quick and progress easy to read. Mizo, a personal AI companion, is planned — not live.",
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
    headline: "Build, manage, and expand a living medieval kingdom in 3D",
    status: "Early prototype",
    kind: "3D medieval strategy game · Android",
    summary:
      "A Stronghold-inspired medieval 3D kingdom and strategy simulation concept, connecting economy, buildings, citizens and military into a living system.",
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
  {
    id: "nafas",
    name: "Nafas",
    headline: "Your student life, intelligently organized in one place",
    status: "In development",
    kind: "Student-life & academic ecosystem",
    summary: "A developing ecosystem for study planning, focus, review, progress and performance — bringing connected student tools into one thoughtful experience.",
    planned: ["Study planning", "Focus & review", "Progress & performance", "Connected student tools"],
    notYet: "In development. The preview illustrates the design direction, not completed functionality.",
    stack: ["Product design", "Student workflows", "AI-assisted prototyping"],
    visual: "nafas",
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


// Bilingual copy stays beside the portfolio content. Technology and project
// proper names intentionally retain their original spelling in either language.
export const projectSelection = "A selection of my work — alongside other completed projects, active builds and future concepts.";
export const techSnippets = [
  { language: "JavaScript", code: "const idea = build();", accent: "primary" },
  { language: "Python", code: "def learn(): return build()", accent: "accent" },
  { language: "Dart", code: "final journey = <Idea>[];", accent: "primary" },
  { language: "Flutter", code: "Widget build() => Experience();", accent: "accent" },
] as const;

export const arabic: Record<string, string> = {
  "Portfolio": "أعمالي",
  "Egypt": "مصر",
  "Student": "طالب",
  "Developer": "مطوّر",
  "Student Developer": "طالب ومطوّر برمجيات",
  "Omar Elhady": "عمر الهادي",
  "Creator: Omar Elhady": "إعداد وتطوير: عمر الهادي",
  "Email me": "راسلني عبر البريد",
  "Apps, games & product thinking": "تطبيقات وألعاب وتصميم منتجات",
  "I learn programming by building software, solving problems and thinking through product decisions.": "أتعلّم البرمجة ببناء برامج مفيدة، وحلّ المشكلات، وفهم القرارات التي تصنع منتجًا جيدًا.",
  "I'm a student developer from Egypt. I learn by writing code, solving everyday problems and turning ideas into useful software. AI tools assist my workflow; programming and product decisions remain my responsibility.": "أنا طالب ومطوّر برمجيات من مصر. أتعلّم بكتابة الكود وحلّ مشكلات يومية وتحويل الأفكار إلى برامج مفيدة. أستعين بأدوات الذكاء الاصطناعي في العمل، لكن كتابة البرامج وقرارات المنتج مسؤوليتي.",
  "Right now I'm exploring nutrition tracking, medieval strategy simulation and student-life tools. These projects are works in progress, and I'm documenting what I learn along the way.": "أعمل حاليًا على أفكار لتتبّع التغذية، ومحاكاة الممالك، وتنظيم الدراسة. المشاريع المعروضة قيد التطوير، وأشارك ما أتعلّمه أثناء بنائها.",
  "open to collaborate": "متاح للتعاون",
  "See projects": "شاهد مشاريعي",
  "Get in touch": "تواصل معي",
  "About": "نبذة عني",
  "Projects": "مشاريعي",
  "Skills": "مهاراتي",
  "Contact": "تواصل معي",
  "Main": "القائمة الرئيسية",
  "Open menu": "افتح القائمة",
  "Close menu": "أغلق القائمة",
  "Switch to dark theme": "استخدم المظهر الداكن",
  "Switch to light theme": "استخدم المظهر الفاتح",
  "Learning by building real things.": "أتعلّم بالبرمجة وبناء المشاريع.",
  "role": "التخصص",
  "based": "من مصر",
  "focus": "اهتماماتي",
  "now": "حاليًا",
  "Apps, games, AI workflows": "تطبيقات وألعاب وأدوات مساعدة للتطوير",
  "Building Mizano, KingdomForge & Nafas": "تطوير Mizano وKingdomForge وNafas",
  "Selected projects": "مشاريع مختارة",
  "Ideas becoming real experiences.": "مشاريع أعمل على تطويرها.",
  "A selection of my work — alongside other completed projects, active builds and future concepts.": "هذه مجموعة من مشاريعي؛ لديّ أيضًا أعمال مكتملة، ومشاريع أعمل عليها، وأفكار لمراحل قادمة.",
  "+ More projects": "+ مشاريع أخرى",
  "More in progress": "المزيد قيد التطوير",
  "In development": "قيد التطوير",
  "Early prototype": "نموذج أولي",
  "Intended scope": "ما أخطّط لبنائه",
  "View project details": "تفاصيل المشروع",
  "Design preview · not a live app": "معاينة للتصميم · ليست تطبيقًا جاهزًا",
  "Concept art · not gameplay": "صورة تصوّرية · ليست لقطة من اللعبة",
  "A smarter way to track meals and understand nutrition": "طريقة أذكى لتتبّع الوجبات وفهم التغذية",
  "Build, manage, and expand a living medieval kingdom in 3D": "بناء مملكة من العصور الوسطى وإدارتها في عالم ثلاثي الأبعاد",
  "Your student life, intelligently organized in one place": "تنظيم الدراسة وأدواتها في مكان واحد",
  "Nutrition tracking app": "تطبيق لتتبّع التغذية",
  "3D medieval strategy game · Android": "لعبة استراتيجية ثلاثية الأبعاد في العصور الوسطى · Android",
  "Student-life & academic ecosystem": "منظومة لتنظيم الدراسة",
  "A focused app for tracking meals, calories, protein and macros — designed to make daily logging quick and progress easy to read. Mizo, a personal AI companion, is planned — not live.": "تطبيق لتسجيل الوجبات والسعرات والبروتين والمغذّيات الرئيسية، مع متابعة التقدّم بوضوح. أخطّط لإضافة Mizo، مساعد شخصي بالذكاء الاصطناعي، لكنه غير متاح حاليًا.",
  "A Stronghold-inspired medieval 3D kingdom and strategy simulation concept, connecting economy, buildings, citizens and military into a living system.": "فكرة للعبة استراتيجية ثلاثية الأبعاد مستوحاة من Stronghold، تحاكي إدارة مملكة في العصور الوسطى. يرتبط فيها الاقتصاد والبناء والسكان والجيش ضمن نظام واحد.",
  "A developing ecosystem for study planning, focus, review, progress and performance — bringing connected student tools into one thoughtful experience.": "مشروع قيد التطوير يجمع تخطيط الدراسة وجلسات التركيز والمراجعة ومتابعة التقدّم. الهدف ربط أدوات الدراسة ببعضها في تجربة واضحة وسهلة الاستخدام.",
  "Meal and calorie logging": "تسجيل الوجبات والسعرات",
  "Protein and macro breakdowns": "توزيع البروتين والمغذّيات الرئيسية",
  "Progress screens": "شاشات متابعة التقدّم",
  "Food management library": "مكتبة الأطعمة",
  "AI features, accounts, reminders and rewards are ideas on the roadmap — not live.": "الذكاء الاصطناعي والحسابات والتذكيرات والمكافآت ضمن الخطط القادمة، وليست ميزات متاحة الآن.",
  "Kingdom & territory systems": "أنظمة المملكة والأراضي",
  "Resource-driven economy": "اقتصاد قائم على الموارد",
  "Building and citizen simulation": "محاكاة المباني والسكان",
  "Military that depends on the economy": "جيش يعتمد على الاقتصاد",
  "Concept / prototype stage. Not finished and not published.": "في مرحلة الفكرة والنموذج الأولي؛ لم تكتمل اللعبة ولم تُنشر.",
  "Study planning": "تخطيط الدراسة",
  "Focus & review": "التركيز والمراجعة",
  "Progress & performance": "التقدّم والأداء",
  "Connected student tools": "أدوات دراسة مترابطة",
  "In development. The preview illustrates the design direction, not completed functionality.": "قيد التطوير؛ المعاينة توضّح فكرة التصميم، لا ميزات جاهزة للاستخدام.",
  "Mobile UI": "واجهات الهاتف",
  "Data modeling": "نمذجة البيانات",
  "AI-assisted prototyping": "تجربة الأفكار بأدوات مساعدة",
  "Game design": "تصميم الألعاب",
  "Systems thinking": "فهم ترابط الأنظمة",
  "3D / Android": "الأبعاد الثلاثية / Android",
  "Product design": "تصميم المنتجات",
  "Student workflows": "تنظيم مهام الدراسة",
  "Skills & tools": "مهاراتي وأدواتي",
  "What I work with.": "أدوات أستخدمها وأتعلّمها.",
  "Technologies I work with / explore": "تقنيات أستخدمها وأتعلّمها",
  "HTML & CSS": "HTML وCSS",
  "Git & GitHub": "Git وGitHub",
  "REST APIs": "واجهات REST",
  "Languages": "لغات البرمجة",
  "Mobile": "تطبيقات الهاتف",
  "Building": "التطوير",
  "AI workflow": "أدوات مساعدة بالذكاء الاصطناعي",
  "Thinking": "التفكير وحلّ المشكلات",
  "Cross-platform UI": "واجهات متعددة المنصات",
  "Responsive UI": "واجهات متجاوبة",
  "Prompt design": "كتابة تعليمات واضحة للأدوات",
  "AI-assisted coding": "برمجة بمساعدة الذكاء الاصطناعي",
  "LLM tools": "أدوات النماذج اللغوية",
  "Rapid prototyping": "بناء نماذج أولية",
  "Product scoping": "تحديد نطاق المنتج",
  "Systems design": "تصميم الأنظمة",
  "Learning in public": "مشاركة رحلة التعلّم",
  "Under the hood": "خلف الكواليس",
  "The layers I build with.": "من الواجهة إلى منطق البرنامج.",
  "Display": "الشاشة",
  "Interface": "الواجهة",
  "Logic board": "اللوحة الرئيسية",
  "Processor": "المعالج",
  "Chassis": "الهيكل",
  "Foundations": "الأساسيات",
  "Let's build something.": "يسعدني التواصل معك.",
  "Questions, feedback on a project, or an idea to collaborate on — my inbox is open.": "لديك سؤال، أو ملاحظة على مشروع، أو فكرة للتعاون؟ راسلني عبر البريد.",
  "Contact details coming soon.": "بيانات التواصل قريبًا.",
  "Back to top ↑": "العودة للأعلى ↑",
  "Home": "الرئيسية",
  "Breadcrumb": "مسار الصفحة",
  "Source code": "الكود المصدري",
  "Live version": "النسخة المنشورة",
  "The problem": "المشكلة",
  "Approach": "طريقة العمل",
  "Current progress": "أين وصل المشروع",
  "What I'm learning": "ما أتعلّمه",
  "Screenshots": "لقطات الشاشة",
  "Case study details will be added as the project develops.": "سأضيف تفاصيل العمل والقرارات التقنية مع تقدّم المشروع.",
  "Stack & skills": "التقنيات والمهارات",
  "Back to all projects": "العودة إلى مشاريعي",
  "Project not found": "المشروع غير موجود",
  "That project doesn't exist (yet).": "لم أعثر على هذا المشروع.",
  "Back to projects": "العودة إلى المشاريع",
  "Page not found": "الصفحة غير موجودة",
  "The page you're looking for doesn't exist or has been moved.": "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
  "Go home": "العودة للرئيسية",
  "This page didn't load": "تعذّر تحميل الصفحة",
  "Something went wrong on our end. You can try refreshing or head back home.": "حدث خطأ. يمكنك المحاولة مجددًا أو العودة للرئيسية.",
  "Try again": "حاول مجددًا",
  "Support my journey": "ادعم رحلتي",
  "If my work resonates with you, a small contribution helps me keep building and learning. Always optional, always appreciated.": "إذا أعجبك عملي، تساعدني مساهمة بسيطة على مواصلة البناء والتعلّم. الدعم اختياري دائمًا ومحل تقدير.",
  "Payments are not available yet. No transfer will be initiated here.": "الدفع غير متاح بعد. لن يتم بدء أي تحويل هنا.",
  "Contribution amount": "مبلغ المساهمة",
  "Display currency": "عملة العرض",
  "Custom amount": "مبلغ مخصّص",
  "Enter amount": "أدخل المبلغ",
  "Enter an amount greater than zero, with up to two decimal places.": "أدخل مبلغًا أكبر من الصفر، بما لا يزيد عن منزلتين عشريتين.",
  "USD is display-only for now. ": "الدولار للعرض فقط حاليًا. ",
  "Local transfers are settled in EGP. No exchange rate or currency conversion is applied.": "تُسوّى التحويلات المحلية بالجنيه المصري. لا يُطبّق سعر صرف أو تحويل للعملة.",
  "Payment method": "طريقة الدفع",
  "InstaPay / Meeza": "إنستاباي / ميزة",
  "Vodafone Cash": "فودافون كاش",
  "Coming soon": "قريبًا",
  "Payment details will be available soon": "تفاصيل الدفع ستكون متاحة قريبًا",
  " is not configured yet. No payment has been initiated.": " غير مُعدّة بعد. لم يتم بدء أي دفع.",
  "Payment details will be available soon for both methods.": "ستتوفر تفاصيل الدفع قريبًا لكلتا الطريقتين.",
  "Today": "اليوم",
  "Nutrition": "التغذية",
  "Meals": "الوجبات",
  "Protein": "البروتين",
  "Energy": "الطاقة",
  "Mizo · planned companion": "Mizo · مساعد ضمن الخطط القادمة",
  "Study plan": "خطة الدراسة",
  "Focus": "التركيز",
  "Review": "المراجعة",
  "Progress": "التقدّم",
  "My learning space": "تنظيم الدراسة",
};
export const translate = (text: string, language: "en" | "ar") => language === "ar" ? arabic[text] ?? text : text;
export const localizeProject = (project: Project, language: "en" | "ar"): Project => ({
  ...project,
  headline: translate(project.headline, language),
  status: translate(project.status, language) as ProjectStatus,
  kind: translate(project.kind, language),
  summary: translate(project.summary, language),
  planned: project.planned.map((text) => translate(text, language)),
  notYet: translate(project.notYet, language),
  stack: project.stack.map((text) => translate(text, language)),
  ...(project.problem ? { problem: translate(project.problem, language) } : {}),
  ...(project.approach ? { approach: translate(project.approach, language) } : {}),
  ...(project.currentProgress ? { currentProgress: translate(project.currentProgress, language) } : {}),
  ...(project.learnings ? { learnings: project.learnings.map((text) => translate(text, language)) } : {}),
});
