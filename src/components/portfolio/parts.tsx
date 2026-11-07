import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, Moon, Sun, X, UserRound, FolderCode, Code2, Mail, Layers, HeartHandshake, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language";
import { activeSocials, displayName, nav } from "@/content/site";
import omarAvatar from "@/assets/omar-avatar.png.asset.json";

const sectionIcons: Record<string, LucideIcon> = { about: UserRound, projects: FolderCode, skills: Code2, contact: Mail, stack: Layers, support: HeartHandshake };

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
    tiktok:
      "M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
    whatsapp:
      "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z",
    instagram:
      "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
    snapchat:
      "M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-2.734 1.258-.137.494-.166 1.021-.211 1.344-.029.209-.058.43-.088.608-.045.26-.266.435-.566.435h-.075c-.148 0-.462-.046-1.154-.136-.36-.046-.764-.089-1.229-.089-.25 0-.508.016-.773.045-.495.06-.973.24-1.424.506-.853.495-1.806 1.035-3.356 1.035-.06 0-.119-.015-.18-.015h-.149c-1.552 0-2.508-.54-3.359-1.035-.452-.266-.93-.446-1.424-.505-.26-.03-.527-.046-.788-.046-.45 0-.87.044-1.229.09-.688.09-1.012.15-1.168.15-.314 0-.524-.18-.573-.436-.03-.177-.061-.398-.09-.608-.046-.314-.075-.839-.211-1.344-1.462-.27-2.481-.688-2.721-1.258-.03-.076-.045-.15-.045-.225-.015-.24.166-.465.42-.51 3.265-.539 4.732-3.878 4.791-4.014l.016-.015c.18-.344.209-.644.119-.867-.195-.45-.885-.676-1.334-.811-.135-.044-.256-.09-.345-.119-1.107-.435-1.257-.884-1.224-1.153.045-.418.465-.703.854-.757.149-.016.299 0 .435.045.435.15.885.3 1.227.3.19 0 .33-.045.42-.09l-.046-.569c-.104-1.628-.229-3.654.301-4.847C7.847 1.068 11.204.793 12.191.793h.015z",
    telegram:
      "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
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
          <img
            src={omarAvatar.url}
            alt=""
            width={32}
            height={32}
            className="size-8 rounded-full border border-primary/30 object-cover"
          />
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
