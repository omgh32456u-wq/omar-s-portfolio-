import { useEffect, useRef, useState, type ComponentType } from "react";
import { useLanguage } from "./language";
import { stackLayers } from "@/content/site";
import { ArrowDown } from "lucide-react";

type SceneProps = { progressRef: { current: number }; visible: boolean; onReady: () => void };

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
  const [Scene, setScene] = useState<ComponentType<SceneProps> | null>(null);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
    const supported = !!context;
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    setUse3D(!reduced && !mobile && supported);
  }, []);

  // Dynamic import without Suspense: a suspense boundary around <Canvas>
  // triggers React 19 "synchronously unmount a root" errors when it resolves.
  useEffect(() => {
    if (!use3D) return;
    let cancelled = false;
    import("./laptop-scene").then((m) => {
      if (!cancelled) setScene(() => m.default);
    }).catch(() => { if (!cancelled) setFailed(true); });
    return () => {
      cancelled = true;
    };
  }, [use3D]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (!use3D) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      progressRef.current = Math.min(1, Math.max(0, (vh * 0.72 - r.top) / (vh * 0.8)));
      el.setAttribute("data-explode-progress", progressRef.current.toFixed(2));
      window.dispatchEvent(new Event("portfolio-laptop-scroll"));
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
      <p className="mb-5 flex items-center gap-2 text-sm text-primary"><ArrowDown className="size-4" />{t("Scroll to disassemble")}</p>
      <p className="mb-6 text-sm text-muted-foreground">{t("Interface, logic and data — each layer connects to the tools below.")}</p>
      <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        {use3D && !failed ? (
          <figure className="relative">
            <div className="laptop-canvas relative h-[32rem] w-full lg:h-[36rem]" aria-hidden="true">
              {Scene ? (
                <Scene
                  progressRef={progressRef}
                  visible={visible}
                  onReady={() => rootRef.current?.setAttribute("data-scene-ready", "true")}
                />
              ) : (
                <LaptopIllustration />
              )}
            </div>
            <figcaption className="mt-2 text-center text-[10px] text-muted-foreground">
              {t("Artistic concept model · not real hardware")} · {t("Scroll to disassemble")}
            </figcaption>
          </figure>
        ) : (
          <figure className="mx-auto w-full max-w-xl">
            <LaptopIllustration />
            <figcaption className="text-center text-xs text-muted-foreground">{t("Laptop illustration")} · {t("Artistic concept model · not real hardware")}</figcaption>
          </figure>
        )}
        <ol className="grid gap-3 sm:grid-cols-2">
          {stackLayers.map((l, i) => (
            <li key={l.id} className="border-b py-3">
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
    </div>
  );
}

function LaptopIllustration() {
  const { t } = useLanguage();
  return <svg className="laptop-illustration" viewBox="0 0 560 440" role="img" aria-label={t("Display, keyboard and internal layers")}>
    <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path className="illustration-body" d="M110 35 L435 65 L405 240 L80 205 Z" />
      <path className="illustration-screen" d="M124 52 L416 79 L391 216 L100 187 Z" />
      <path className="illustration-trace" d="M151 94 L290 107 M146 114 L342 132 M142 136 L258 147" />
      <path className="illustration-body" d="M80 240 L405 274 L495 327 L166 295 Z" />
      {Array.from({length: 5}, (_, row) => <path key={row} className="illustration-keys" d={`M ${117+row*10} ${254+row*5} l 245 25`} />)}
      <path className="illustration-body" d="M110 321 L391 351 L466 389 L181 361 Z" />
      <path className="illustration-board" d="M144 303 L360 325 L407 354 L193 332 Z" />
      <path className="illustration-chip" d="M235 301 L281 306 L300 319 L253 314 Z M167 308 L211 313 L225 322 L181 317 Z" />
      <ellipse className="illustration-chip" cx="354" cy="339" rx="23" ry="10" />
      <path className="illustration-trace" d="M89 212 L89 234 M112 294 L112 316 M410 249 L410 267" strokeDasharray="3 5" />
    </g>
  </svg>;
}
