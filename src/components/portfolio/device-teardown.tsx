import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useLanguage } from "./language";
import { stackLayers } from "@/content/site";

const LaptopScene = lazy(() => import("./laptop-scene"));

/**
 * Scroll-driven 3D exploded laptop (artistic concept model, not real hardware).
 * Desktop + motion allowed: lazy-loaded WebGL scene driven by scroll progress.
 * Mobile / reduced motion / no-JS: static layered figure + the same story cards.
 */
export function DeviceTeardown() {
  const { t } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [use3D, setUse3D] = useState(false);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setUse3D(!reduced && !mobile);
    setOpen(reduced || mobile);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (!use3D) {
      // Static fallback: open the CSS layers when scrolled into view.
      if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const io = new IntersectionObserver(([e]) => setOpen(!!e?.isIntersecting), { threshold: 0.35 });
        io.observe(el);
        return () => io.disconnect();
      }
      return;
    }
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      progressRef.current = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.75 + r.height * 0.35)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [use3D]);

  return (
    <div ref={rootRef}>
      <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
        {use3D ? (
          <figure className="relative">
            <div className="laptop-canvas relative h-[24rem] w-full sm:h-[27rem]" aria-hidden="true">
              <Suspense fallback={<div className="grid size-full place-items-center font-mono text-xs text-muted-foreground">…</div>}>
                <LaptopScene
                  progressRef={progressRef}
                  visible={visible}
                  onReady={() => rootRef.current?.setAttribute("data-scene-ready", "true")}
                />
              </Suspense>
            </div>
            <figcaption className="mt-2 text-center text-[10px] text-muted-foreground">
              {t("Artistic concept model · not real hardware")} · {t("Scroll to disassemble")}
            </figcaption>
          </figure>
        ) : (
          <figure aria-hidden className={`teardown ${open ? "is-open" : ""} relative mx-auto hidden h-80 w-full max-w-md sm:block`}>
            {stackLayers.slice(0, 4).map((l, i) => (
              <div
                key={l.id}
                className="teardown-layer glass absolute inset-x-6 h-24 rounded-xl"
                style={{ ["--i" as string]: i, top: `${4.5 + i * 0.6}rem`, zIndex: stackLayers.length - i }}
              >
                <span className={`absolute left-4 top-3 font-mono text-[10px] uppercase tracking-widest ${l.tone === "primary" ? "text-primary" : "text-accent"}`}>
                  {t(l.part)}
                </span>
                <span className={`absolute inset-x-4 bottom-3 h-px ${l.tone === "primary" ? "bg-primary/50" : "bg-accent/50"}`} />
              </div>
            ))}
          </figure>
        )}
        <ol className="grid gap-3 sm:grid-cols-2">
          {stackLayers.map((l, i) => (
            <li key={l.id} className="glass rounded-xl p-4">
              <p className="font-mono text-xs text-muted-foreground">
                0{i + 1} · {t(l.part)}
              </p>
              <h3 className={`mt-1 text-lg font-semibold ${l.tone === "primary" ? "text-primary" : "text-accent"}`}>{t(l.label)}</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {l.tools.map((tool) => (
                  <li key={tool} className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-foreground">{t(tool)}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
      {!use3D && (
        <p className="mt-4 text-center text-[10px] text-muted-foreground">{t("Artistic concept model · not real hardware")}</p>
      )}
    </div>
  );
}
