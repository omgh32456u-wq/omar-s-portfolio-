import { useEffect, useRef, useState } from "react";
import { Code2, Network } from "lucide-react";
import { codingNodes } from "@/content/site";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language";

export function CodingMap() {
  const { t } = useLanguage();
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("apps");
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!!entry?.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const selected = codingNodes.find((node) => node.id === active);
  return <div ref={root} className={`coding-map ${visible ? "map-visible" : ""}`}>
    <div className="flex flex-wrap items-end justify-between gap-3 border-b pb-5">
      <div><p className="mb-2 flex items-center gap-2 text-xs text-primary"><Network className="size-4" />{t("Interactive coding map")}</p><h3 className="text-2xl font-semibold">{t("Connecting ideas through code.")}</h3></div>
      <p aria-live="polite" className="text-sm text-muted-foreground">{t(selected?.detail ?? "")}</p>
    </div>
    <div className="map-network" dir="ltr">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" className="map-lines">
        {codingNodes.filter((node) => node.id !== "apps").map((node) => <g key={node.id} className={active === node.id || active === "apps" ? "connection-active" : ""}><path d={`M ${node.x} ${node.y} Q 50 ${node.y} 50 48`} /><path className="map-trace" d={`M ${node.x} ${node.y} Q 50 ${node.y} 50 48`} /></g>)}
      </svg>
      {codingNodes.map((node) => <Button key={node.id} variant="outline" aria-pressed={active === node.id} onClick={() => setActive(node.id)} onMouseEnter={() => setActive(node.id)} className={`map-node ${node.id === "apps" ? "map-hub" : ""}`} style={{ left: `${node.x}%`, top: `${node.y}%` }}><Code2 className="size-4 shrink-0" aria-hidden />{t(node.label)}</Button>)}
    </div>
  </div>;
}