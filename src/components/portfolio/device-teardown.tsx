import { useEffect, useRef, useState } from "react";
import { stackLayers } from "@/content/site";

/**
 * Foundation for a future scroll-driven 3D laptop disassembly.
 * Today: CSS-only layered device that separates when scrolled into view.
 * Reduced motion / no-JS: shown already separated, no animation.
 * Swap the <figure> for a WebGL scene later; keep `stackLayers` as the data source.
 */
export function DeviceTeardown() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setOpen(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setOpen(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid items-center gap-10 md:grid-cols-[1fr_1fr]">
      <figure aria-hidden className={`teardown ${open ? "is-open" : ""} relative mx-auto hidden h-80 w-full max-w-md sm:block`}>
        {stackLayers.map((l, i) => (
          <div
            key={l.id}
            className="teardown-layer glass absolute inset-x-6 h-24 rounded-xl"
            style={{ ["--i" as string]: i, top: `${4.5 + i * 0.6}rem`, zIndex: stackLayers.length - i }}
          >
            <span className={`absolute left-4 top-3 font-mono text-[10px] uppercase tracking-widest ${l.tone === "primary" ? "text-primary" : "text-accent"}`}>
              {l.part}
            </span>
            <span className={`absolute inset-x-4 bottom-3 h-px ${l.tone === "primary" ? "bg-primary/50" : "bg-accent/50"}`} />
          </div>
        ))}
      </figure>
      <ol className="space-y-3">
        {stackLayers.map((l, i) => (
          <li key={l.id} className="glass rounded-xl p-4">
            <p className="font-mono text-xs text-muted-foreground">
              0{i + 1} · {l.part}
            </p>
            <h3 className={`mt-1 text-lg font-semibold ${l.tone === "primary" ? "text-primary" : "text-accent"}`}>{l.label}</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {l.tools.map((t) => (
                <li key={t} className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-foreground">{t}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
