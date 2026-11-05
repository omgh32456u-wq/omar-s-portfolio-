// Original abstract concept visuals — not real screenshots.

export function HeroDiagram() {
  const nodes = [
    { x: 60, y: 70, label: "learn()", c: "var(--accent)" },
    { x: 300, y: 50, label: "build()", c: "var(--primary)" },
    { x: 340, y: 250, label: "ship()", c: "var(--primary)" },
    { x: 90, y: 290, label: "ai.assist()", c: "var(--accent)" },
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden="true">
      <svg viewBox="0 0 400 360" className="absolute inset-0 size-full">
        <g fill="none" stroke="var(--muted-foreground)" strokeOpacity="0.35" strokeWidth="1.2">
          <path d="M60 70 C 180 20, 220 120, 300 50" strokeDasharray="4 6" className="animate-dash" />
          <path d="M300 50 C 380 120, 280 180, 340 250" strokeDasharray="4 6" className="animate-dash" />
          <path d="M340 250 C 250 330, 170 260, 90 290" strokeDasharray="4 6" className="animate-dash" />
          <path d="M90 290 C 10 220, 120 150, 60 70" strokeDasharray="4 6" className="animate-dash" />
          <path d="M60 70 L200 180 L340 250 M300 50 L200 180 L90 290" strokeOpacity="0.2" />
        </g>
        {nodes.map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r="14" fill={n.c} fillOpacity="0.15" />
            <circle cx={n.x} cy={n.y} r="5" fill={n.c} />
            <text x={n.x + 14} y={n.y - 16} fill="var(--muted-foreground)" fontSize="11" fontFamily="JetBrains Mono, monospace">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="glass animate-float absolute left-1/2 top-1/2 w-56 -translate-x-1/2 -translate-y-1/2 rounded-2xl p-4 font-mono text-xs">
        <div className="mb-3 flex gap-1.5">
          <span className="size-2.5 rounded-full bg-accent/70" />
          <span className="size-2.5 rounded-full bg-primary/70" />
          <span className="size-2.5 rounded-full bg-muted-foreground/40" />
        </div>
        <p><span className="text-accent">const</span> me = {"{"}</p>
        <p className="pl-4">student: <span className="text-primary">true</span>,</p>
        <p className="pl-4">builds: <span className="text-primary">"software"</span>,</p>
        <p className="pl-4">with: <span className="text-primary">"AI"</span>,</p>
        <p>{"}"}</p>
      </div>
    </div>
  );
}

export function MizanoVisual() {
  return (
    <svg viewBox="0 0 320 200" className="size-full" aria-hidden="true">
      <rect x="110" y="14" width="100" height="172" rx="16" fill="var(--surface-2)" stroke="var(--border)" />
      <circle cx="160" cy="70" r="28" fill="none" stroke="var(--muted)" strokeWidth="8" />
      <circle cx="160" cy="70" r="28" fill="none" stroke="var(--primary)" strokeWidth="8" strokeDasharray="120 200" strokeLinecap="round" transform="rotate(-90 160 70)" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="124" y={116 + i * 20} width="72" height="6" rx="3" fill="var(--muted)" />
          <rect x="124" y={116 + i * 20} width={[50, 34, 60][i]} height="6" rx="3" fill={i === 1 ? "var(--accent)" : "var(--primary)"} fillOpacity={i === 2 ? 0.6 : 1} />
        </g>
      ))}
      <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--muted-foreground)">
        <path d="M188 70 H240" stroke="var(--muted-foreground)" strokeOpacity=".4" strokeDasharray="3 3" />
        <text x="244" y="73">calories</text>
        <path d="M124 139 H70" stroke="var(--muted-foreground)" strokeOpacity=".4" strokeDasharray="3 3" />
        <text x="22" y="142">protein</text>
      </g>
    </svg>
  );
}

export function KingdomVisual() {
  const pts = [
    [160, 50, "kingdom"],
    [70, 110, "economy"],
    [250, 110, "military"],
    [110, 170, "citizens"],
    [210, 170, "building"],
  ] as const;
  const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [3, 4], [1, 2]];
  return (
    <svg viewBox="0 0 320 200" className="size-full" aria-hidden="true">
      <g stroke="var(--accent)" strokeOpacity=".4" strokeDasharray="3 4">
        {edges.map(([a, b], i) => (
          <line key={i} x1={pts[a]![0]} y1={pts[a]![1]} x2={pts[b]![0]} y2={pts[b]![1]} />
        ))}
      </g>
      {pts.map(([x, y, l], i) => (
        <g key={l}>
          <polygon
            points={`${x},${y - 14} ${x + 13},${y - 6} ${x + 13},${y + 8} ${x},${y + 15} ${x - 13},${y + 8} ${x - 13},${y - 6}`}
            fill={i === 0 ? "var(--accent)" : "var(--surface-2)"}
            fillOpacity={i === 0 ? 0.35 : 1}
            stroke="var(--accent)"
            strokeOpacity=".6"
          />
          <text x={x} y={y + 30} textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="var(--muted-foreground)">
            {l}
          </text>
        </g>
      ))}
    </svg>
  );
}
