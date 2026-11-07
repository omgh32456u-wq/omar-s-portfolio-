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
    "Right now I'm exploring nutrition tracking, medieval strategy simulation and student-life tools. These projects are works in progress, and I'm documenting what I learn along the way.", // [EDIT]
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
  "Portfolio": "ملف الأعمال",
  "Egypt": "مصر",
  "Student": "طالب",
  "Developer": "مطوّر",
  "AI Builder": "صانع أدوات بالذكاء الاصطناعي",
  "I build software and AI-assisted tools — and learn in public while doing it.": "أبني برامج وأدوات بمساعدة الذكاء الاصطناعي، وأشارك ما أتعلمه خلال رحلتي.",
  "I'm a student and developer from Egypt. I like turning everyday problems into small, well-made products, and I use AI tools as part of how I design, prototype and ship.": "أنا طالب ومطوّر من مصر. أحب تحويل المشكلات اليومية إلى منتجات بسيطة ومتقنة، وأستخدم أدوات الذكاء الاصطناعي في التصميم وتجربة الأفكار والتطوير.",
  "Right now I'm exploring nutrition tracking, medieval strategy simulation and student-life tools. These projects are works in progress, and I'm documenting what I learn along the way.": "أستكشف حاليًا تتبّع التغذية ومحاكاة الاستراتيجية في العصور الوسطى وأدوات الحياة الطلابية. هذه المشاريع قيد التطوير، وأوثّق ما أتعلمه خلال العمل عليها.",
  "open to collaborate": "متاح للتعاون",
  "See projects": "استعرض المشاريع",
  "Get in touch": "تواصل معي",
  "About": "عني",
  "Projects": "المشاريع",
  "Skills": "المهارات",
  "Contact": "التواصل",
  "Main": "التنقل الرئيسي",
  "Open menu": "فتح القائمة",
  "Close menu": "إغلاق القائمة",
  "Switch to dark theme": "التبديل إلى المظهر الداكن",
  "Switch to light theme": "التبديل إلى المظهر الفاتح",
  "Learning by building real things.": "أتعلّم ببناء أشياء حقيقية.",
  "role": "الدور",
  "based": "الموقع",
  "focus": "الاهتمام",
  "now": "حاليًا",
  "Apps, games, AI workflows": "تطبيقات وألعاب وأدوات ذكاء اصطناعي",
  "Building Mizano, KingdomForge & Nafas": "تطوير Mizano وKingdomForge وNafas",
  "Selected projects": "مشاريع مختارة",
  "Ideas becoming real experiences.": "أفكار تتحوّل إلى تجارب حقيقية.",
  "A selection of my work — alongside other completed projects, active builds and future concepts.": "مجموعة مختارة من أعمالي، إلى جانب مشاريع أخرى مكتملة وأعمال قيد التطوير وأفكار مستقبلية.",
  "+ More projects": "+ مشاريع أخرى",
  "More in progress": "المزيد قيد التطوير",
  "In development": "قيد التطوير",
  "Early prototype": "نموذج أولي مبكر",
  "Intended scope": "النطاق المخطّط",
  "View project details": "تفاصيل المشروع",
  "Design preview · not a live app": "تصوّر تصميمي · ليس تطبيقًا منشورًا",
  "Concept art · not gameplay": "رسم تصوّري · ليس من اللعب الفعلي",
  "A smarter way to track meals and understand nutrition": "طريقة أذكى لتتبّع الوجبات وفهم التغذية",
  "Build, manage, and expand a living medieval kingdom in 3D": "ابنِ مملكة حية في العصور الوسطى وأدِرها ووسّعها بالأبعاد الثلاثية",
  "Your student life, intelligently organized in one place": "حياتك الطلابية منظّمة بذكاء في مكان واحد",
  "Nutrition tracking app": "تطبيق لتتبّع التغذية",
  "3D medieval strategy game · Android": "لعبة استراتيجية ثلاثية الأبعاد في العصور الوسطى · Android",
  "Student-life & academic ecosystem": "منظومة للحياة الطلابية والدراسة",
  "A focused app for tracking meals, calories, protein and macros — designed to make daily logging quick and progress easy to read. Mizo, a personal AI companion, is planned — not live.": "تطبيق مركّز لتتبّع الوجبات والسعرات والبروتين والعناصر الغذائية، بهدف تسهيل التسجيل اليومي وقراءة التقدّم. Mizo، الرفيق الشخصي بالذكاء الاصطناعي، ميزة مخطّطة وليست متاحة بعد.",
  "A Stronghold-inspired medieval 3D kingdom and strategy simulation concept, connecting economy, buildings, citizens and military into a living system.": "تصوّر لمحاكاة مملكة واستراتيجية ثلاثية الأبعاد في العصور الوسطى مستوحاة من Stronghold، تربط الاقتصاد والمباني والسكان والجيش في منظومة حية.",
  "A developing ecosystem for study planning, focus, review, progress and performance — bringing connected student tools into one thoughtful experience.": "منظومة قيد التطوير لتخطيط الدراسة والتركيز والمراجعة ومتابعة التقدّم والأداء، تجمع أدوات الطالب المترابطة في تجربة متكاملة.",
  "Meal and calorie logging": "تسجيل الوجبات والسعرات",
  "Protein and macro breakdowns": "تفاصيل البروتين والعناصر الغذائية",
  "Progress screens": "شاشات متابعة التقدّم",
  "Food management library": "مكتبة لإدارة الأطعمة",
  "AI features, accounts, reminders and rewards are ideas on the roadmap — not live.": "ميزات الذكاء الاصطناعي والحسابات والتذكيرات والمكافآت أفكار مخطّطة وليست متاحة بعد.",
  "Kingdom & territory systems": "أنظمة المملكة والأراضي",
  "Resource-driven economy": "اقتصاد قائم على الموارد",
  "Building and citizen simulation": "محاكاة المباني والسكان",
  "Military that depends on the economy": "جيش يعتمد على الاقتصاد",
  "Concept / prototype stage. Not finished and not published.": "في مرحلة التصوّر والنموذج الأولي. غير مكتمل وغير منشور.",
  "Study planning": "تخطيط الدراسة",
  "Focus & review": "التركيز والمراجعة",
  "Progress & performance": "التقدّم والأداء",
  "Connected student tools": "أدوات طلابية مترابطة",
  "In development. The preview illustrates the design direction, not completed functionality.": "قيد التطوير. المعاينة توضّح اتجاه التصميم ولا تمثّل وظائف مكتملة.",
  "Mobile UI": "واجهات الهاتف",
  "Data modeling": "نمذجة البيانات",
  "AI-assisted prototyping": "نماذج أولية بمساعدة الذكاء الاصطناعي",
  "Game design": "تصميم الألعاب",
  "Systems thinking": "التفكير المنظومي",
  "3D / Android": "الأبعاد الثلاثية / Android",
  "Product design": "تصميم المنتجات",
  "Student workflows": "مسارات العمل الطلابية",
  "Skills & tools": "المهارات والأدوات",
  "What I work with.": "تقنيات أعمل بها وأستكشفها.",
  "Technologies I work with / explore": "تقنيات أعمل بها وأستكشفها",
  "Languages": "لغات البرمجة",
  "Mobile": "تطبيقات الهاتف",
  "Building": "التطوير",
  "AI workflow": "العمل بالذكاء الاصطناعي",
  "Thinking": "التفكير",
  "Cross-platform UI": "واجهات متعددة المنصات",
  "Responsive UI": "واجهات متجاوبة",
  "Prompt design": "صياغة التوجيهات",
  "AI-assisted coding": "برمجة بمساعدة الذكاء الاصطناعي",
  "LLM tools": "أدوات النماذج اللغوية",
  "Rapid prototyping": "تجربة الأفكار سريعًا",
  "Product scoping": "تحديد نطاق المنتج",
  "Systems design": "تصميم الأنظمة",
  "Learning in public": "مشاركة رحلة التعلّم",
  "Under the hood": "خلف الكواليس",
  "The layers I build with.": "الطبقات التي أبني بها.",
  "Display": "الشاشة",
  "Interface": "الواجهة",
  "Logic board": "لوحة المنطق",
  "Processor": "المعالج",
  "Chassis": "الهيكل",
  "Foundations": "الأساسيات",
  "Let's build something.": "لنبنِ شيئًا معًا.",
  "Questions, feedback on a project, or an idea to collaborate on — my inbox is open.": "سؤال أو ملاحظة على مشروع أو فكرة للتعاون، يسعدني أن نتواصل.",
  "Contact details coming soon.": "بيانات التواصل قريبًا.",
  "Back to top ↑": "العودة للأعلى ↑",
  "Home": "الرئيسية",
  "Breadcrumb": "مسار الصفحة",
  "Source code": "الشيفرة المصدرية",
  "Live version": "النسخة المنشورة",
  "The problem": "المشكلة",
  "Approach": "النهج",
  "Current progress": "التقدّم الحالي",
  "What I'm learning": "ما أتعلّمه",
  "Screenshots": "لقطات الشاشة",
  "Case study details will be added as the project develops.": "ستُضاف تفاصيل دراسة المشروع مع تقدّم تطويره.",
  "Stack & skills": "التقنيات والمهارات",
  "Back to all projects": "العودة إلى جميع المشاريع",
  "Project not found": "المشروع غير موجود",
  "That project doesn't exist (yet).": "هذا المشروع غير موجود بعد.",
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
  "Mizo · planned companion": "Mizo · رفيق مخطّط",
  "Study plan": "خطة الدراسة",
  "Focus": "التركيز",
  "Review": "المراجعة",
  "Progress": "التقدّم",
  "My learning space": "مساحتي للتعلّم",
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
  problem: project.problem && translate(project.problem, language),
  approach: project.approach && translate(project.approach, language),
  currentProgress: project.currentProgress && translate(project.currentProgress, language),
  learnings: project.learnings?.map((text) => translate(text, language)),
});
