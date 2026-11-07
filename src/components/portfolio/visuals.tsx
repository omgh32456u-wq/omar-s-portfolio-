import { CalendarDays, Check, Leaf, Timer, Sparkles } from "lucide-react";
import { techSnippets } from "@/content/site";
import { useLanguage } from "./language";
import kingdomConcept from "@/assets/kingdom-concept.jpg";

export function HeroDiagram() {
  const { t } = useLanguage();
  return (
    <div className="code-workspace mx-auto w-full max-w-md">
      <div className="glass code-window overflow-hidden rounded-xl" dir="ltr">
        <div className="flex items-center justify-between border-b px-5 py-3 text-xs text-muted-foreground">
          <div className="flex gap-1.5" aria-hidden><span className="size-2 rounded-full bg-accent/70"/><span className="size-2 rounded-full bg-primary/70"/><span className="size-2 rounded-full bg-muted-foreground/40"/></div>
          <span className="font-mono">identity.js</span><span className="text-primary">JS</span>
        </div>
        <div className="code-lines p-6 font-mono text-sm leading-8 sm:p-8">
          <p><span className="text-accent">const</span> me = {"{"}</p>
          <p className="ps-5">student: <span className="text-primary">true</span>,</p>
          <p className="ps-5">builds: <span className="text-primary">"software"</span>,</p>
          <p className="ps-5">focus: <span className="text-primary">"solve problems"</span>,</p>
          <p className="ps-5">mindset: <span className="text-primary">"keep learning"</span></p>
          <p>{"};"}<span className="code-cursor" aria-hidden>▎</span></p>
        </div>
      </div>
      <p className="mb-3 mt-6 text-xs text-muted-foreground">{t("Technologies I work with / explore")}</p>
      <div className="grid grid-cols-2 gap-2" dir="ltr">
        {techSnippets.map((snippet) => <div key={snippet.language} className="tech-snippet rounded-lg border bg-surface/60 p-3">
          <p className={`mb-2 font-mono text-xs ${snippet.accent === "primary" ? "text-primary" : "text-accent"}`}>{snippet.language}</p>
          <code className="block break-words font-mono text-[10px] leading-5 text-muted-foreground">{snippet.code}</code>
        </div>)}
      </div>
    </div>
  );
}

export function MizanoVisual() {
  const { t } = useLanguage();
  return <div className="product-preview nutrition-preview">
    <div className="preview-top"><span className="flex items-center gap-2 text-primary"><Leaf className="size-4"/> Mizano</span><span>{t("Nutrition")}</span></div>
    <div className="flex items-center gap-6 py-4">
      <div className="nutrition-ring"><Leaf className="size-6 text-primary"/></div>
      <div className="flex-1 space-y-3">{["Meals", "Protein", "Energy"].map((label, index) => <div key={label}><p className="mb-1 text-[10px] text-muted-foreground">{t(label)}</p><div className="preview-track"><span className={`preview-fill preview-fill-${index}`}/></div></div>)}</div>
    </div>
    <div className="flex items-center gap-2 border-t pt-3 text-[10px] text-muted-foreground"><Sparkles className="size-3 text-accent"/>{t("Mizo · planned companion")}</div>
  </div>;
}

export function NafasVisual() {
  const { t } = useLanguage();
  return <div className="product-preview study-preview">
    <div className="preview-top"><span className="text-accent">Nafas</span><span>{t("My learning space")}</span></div>
    <div className="grid grid-cols-[1.2fr_0.8fr] gap-4 py-4">
      <div><p className="mb-3 flex items-center gap-2 text-xs"><CalendarDays className="size-3 text-accent"/>{t("Study plan")}</p>{["Focus", "Review", "Progress"].map(label => <div key={label} className="mb-2 flex items-center gap-2 text-[10px] text-muted-foreground"><Check className="size-3 text-primary"/>{t(label)}<span className="ms-auto h-px w-5 bg-border"/></div>)}</div>
      <div className="flex flex-col items-center justify-center border-s ps-3"><Timer className="mb-2 size-7 text-accent"/><span className="text-xs">{t("Focus")}</span><span className="mt-3 h-1 w-12 rounded-full bg-accent/30"/></div>
    </div>
  </div>;
}

export function KingdomVisual() {
  return <img src={kingdomConcept} alt="" loading="lazy" width={1280} height={768} className="kingdom-image size-full object-cover"/>;
}

export function ProjectVisual({ visual }: { visual: "mizano" | "kingdom" | "nafas" }) {
  return visual === "mizano" ? <MizanoVisual/> : visual === "nafas" ? <NafasVisual/> : <KingdomVisual/>;
}
