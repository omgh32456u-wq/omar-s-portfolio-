import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, Moon, Sun, X, UserRound, FolderCode, Code2, Mail, Layers, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language";
import { activeSocials, displayInitials, displayName, nav } from "@/content/site";

const sectionIcons: Record<string, LucideIcon> = { about: UserRound, projects: FolderCode, skills: Code2, contact: Mail, stack: Layers };

function SectionIcon({ id }: { id: string }) {
  const Icon = sectionIcons[id] ?? Code2;
  return <Icon className="size-4 shrink-0" aria-hidden="true" />;
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export function SocialIcon({ name, className = "size-5" }: { name: string; className?: string }) {
  const paths: Record<string, string> = {
    github:
      "M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z",
    linkedin:
      "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
    x: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z",
  };
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={paths[name]} />
    </svg>
  );
}

export function SocialRow() {
  if (activeSocials.length === 0) return null;
  return (
    <ul className="flex flex-row items-center gap-2">
      {activeSocials.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={s.label}
            className="grid size-10 place-items-center rounded-full border bg-surface/60 text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
          >
            <SocialIcon name={s.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}

function ThemeToggle() {
  const { t } = useLanguage();
  const [light, setLight] = useState(false);
  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
  }, []);
  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      /* ignore */
    }
  };
  return (
    <Button variant="outline" size="icon"
      onClick={toggle}
      aria-label={t(light ? "Switch to dark theme" : "Switch to light theme")} title={t(light ? "Switch to dark theme" : "Switch to light theme")}
      className="grid size-10 place-items-center rounded-full border bg-surface/60 text-muted-foreground transition hover:text-foreground"
    >
      {light ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </Button>
  );
}

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${scrolled || open ? "glass-nav" : ""}`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5" aria-label={t("Main")}>
        <a href="/" className="flex items-center gap-2 font-display font-semibold">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-brand text-xs text-primary-foreground">
            {displayInitials}
          </span>
          <span className="hidden sm:inline">{t(displayName)}</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`/#${n.id}`}
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:bg-surface hover:text-foreground"
              >
                <SectionIcon id={n.id} /> {t(n.label)}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <div dir="ltr" className="language-switch" role="group" aria-label="Language / اللغة">
            <Button variant="ghost" size="sm" aria-pressed={language === "en"} onClick={() => setLanguage("en")} lang="en">EN</Button>
            <span aria-hidden className="text-muted-foreground">/</span>
            <Button variant="ghost" size="sm" aria-pressed={language === "ar"} onClick={() => setLanguage("ar")} lang="ar">عربي</Button>
          </div>
          <ThemeToggle />
          <Button variant="outline" size="icon"
            className="grid size-10 place-items-center rounded-full border bg-surface/60 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={t(open ? "Close menu" : "Open menu")}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>
      {open && (
        <div id="mobile-nav" className="border-t px-5 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`/#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 border-b py-4 font-display text-lg"
                >
                  <SectionIcon id={n.id} /> {t(n.label)}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <SocialRow />
          </div>
        </div>
      )}
    </header>
  );
}

export function SectionHeading({ index, kicker, title }: { index: string; kicker: string; title: string }) {
  const { t } = useLanguage();
  return (
    <div className="mb-12">
      <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase text-primary">
        <SectionIcon id={({ "01": "about", "02": "projects", "03": "skills", "04": "stack" })[index] ?? "skills"} /> {t(kicker)}
      </p>
      <h2 className="text-3xl font-semibold sm:text-4xl">{t(title)}</h2>
    </div>
  );
}
