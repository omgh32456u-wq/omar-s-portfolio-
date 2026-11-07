import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { contactEmail, displayName, projects, site, siteUrl, skills } from "@/content/site";
import { SupportSection } from "@/components/portfolio/support-section";
import { DeviceTeardown } from "@/components/portfolio/device-teardown";
import { Header, Reveal, SectionHeading, SocialRow } from "@/components/portfolio/parts";
import { HeroDiagram, KingdomVisual, MizanoVisual } from "@/components/portfolio/visuals";

const title = `${displayName} — Student, Developer & AI Builder`;
const description =
  "Portfolio of a student, developer and AI builder from Egypt. Projects in progress: Mizano and KingdomForge.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: siteUrl ? [{ rel: "canonical", href: `${siteUrl}/` }] : [],
  }),
  component: Index,
});

const btn =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition";

function Index() {
  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden">
      <div className="bg-ambient pointer-events-none absolute inset-x-0 top-0 h-[60rem]" />
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <Header />

      <main className="relative">
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-32 md:grid-cols-[1.1fr_0.9fr] md:pt-40">
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border bg-surface/60 px-3 py-1 font-mono text-xs text-muted-foreground">
              <MapPin className="size-3 text-primary" /> {site.location} · open to collaborate
            </p>
            <h1 className="text-4xl font-semibold leading-[1.05] sm:text-6xl">
              {site.roles.map((r, i) => (
                <span key={r} className="block">
                  {i === 2 ? <span className="text-gradient">{r}.</span> : `${r}.`}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">{site.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className={`${btn} bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-soft`}>
                See projects <ArrowRight className="size-4" />
              </a>
              <a href="#contact" className={`${btn} border bg-surface/60 hover:border-accent/60`}>
                Get in touch
              </a>
            </div>
            <div className="mt-10">
              <SocialRow />
            </div>
          </Reveal>
          <Reveal>
            <HeroDiagram />
          </Reveal>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <SectionHeading index="01" kicker="About" title="Learning by building real things." />
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
              <div className="space-y-5 text-lg text-muted-foreground">
                {site.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <ul className="glass space-y-4 rounded-2xl p-6 font-mono text-sm">
                {[
                  ["role", site.roles.join(" · ")],
                  ["based", site.location],
                  ["focus", "Apps, games, AI workflows"],
                  ["now", "Building Mizano & KingdomForge"],
                ].map(([k, v]) => (
                  <li key={k} className="flex justify-between gap-4 border-b pb-3 last:border-0 last:pb-0">
                    <span className="text-primary">{k}</span>
                    <span className="text-right text-foreground">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* Projects */}
        <section id="projects" className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <SectionHeading index="02" kicker="Selected projects" title="Work in progress, honestly labeled." />
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((p) => (
              <Reveal key={p.id}>
                <article className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:border-primary/40">
                  <figure className="relative h-52 border-b bg-grid bg-surface/40 p-4">
                    {p.visual === "mizano" ? <MizanoVisual /> : <KingdomVisual />}
                    <figcaption className="absolute bottom-2 right-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Concept visual
                    </figcaption>
                  </figure>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-semibold">{p.name}</h3>
                      <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent">
                        ● {p.status}
                      </span>
                    </div>
                    <p className="mb-2 font-mono text-xs text-primary">{p.kind}</p>
                    <p className="text-muted-foreground">{p.summary}</p>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Intended scope</p>
                    <ul className="mt-2 grid gap-1.5 text-sm sm:grid-cols-2">
                      {p.planned.map((f) => (
                        <li key={f} className="flex gap-2">
                          <span className="text-primary">→</span> {f}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 rounded-lg border border-dashed px-3 py-2 text-xs text-muted-foreground">{p.notYet}</p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {p.stack.map((s) => (
                        <span key={s} className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                    <Link
                      to="/projects/$slug"
                      params={{ slug: p.id }}
                      className="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-primary hover:underline"
                    >
                      View project details <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <SectionHeading index="03" kicker="Skills & tools" title="What I work with." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {skills.map((g) => (
                <div key={g.group} className="glass rounded-2xl p-6 transition hover:border-accent/40">
                  <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-primary">{g.group}</h3>
                  <ul className="space-y-2">
                    {g.items.map((i) => (
                      <li key={i} className="text-foreground">{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Device teardown (3D foundation) */}
        <section id="stack" className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <SectionHeading index="04" kicker="Under the hood" title="The layers I build with." />
            <DeviceTeardown />
          </Reveal>
        </section>

        {/* Support */}
        <section id="support" aria-labelledby="support-title" className="mx-auto max-w-6xl px-5 py-12">
          <Reveal>
            <SupportSection />
          </Reveal>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <div className="glass relative overflow-hidden rounded-3xl p-8 text-center sm:p-14">
              <div className="bg-ambient pointer-events-none absolute inset-0" />
              <div className="relative">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">05 // Contact</p>
                <h2 className="text-3xl font-semibold sm:text-5xl">Let's build something.</h2>
                <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                  Questions, feedback on a project, or an idea to collaborate on — my inbox is open.
                </p>
                {contactEmail ? (
                  <a href={`mailto:${contactEmail}`} className={`${btn} mt-8 bg-gradient-brand text-primary-foreground hover:-translate-y-0.5`}>
                    <Mail className="size-4" /> {contactEmail} <ArrowUpRight className="size-4" />
                  </a>
                ) : (
                  <p className="mt-8 font-mono text-sm text-muted-foreground">Contact details coming soon.</p>
                )}
                <div className="mt-8 flex justify-center">
                  <SocialRow />
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="relative border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {displayName}</p>
          <a href="#top" className="hover:text-foreground">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
