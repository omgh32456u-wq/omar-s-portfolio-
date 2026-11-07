import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { contactEmail, displayName, projects, site, siteUrl, skills, localizeProject, projectSelection } from "@/content/site";
import omarPortrait from "@/assets/omar-portrait.png.asset.json";
import { useLanguage } from "@/components/portfolio/language";
import { Button } from "@/components/ui/button";
import { SupportSection } from "@/components/portfolio/support-section";
import { DeviceTeardown } from "@/components/portfolio/device-teardown";
import { Header, Reveal, SectionHeading, SocialRow } from "@/components/portfolio/parts";
import { HeroDiagram, ProjectVisual } from "@/components/portfolio/visuals";

const title = `${displayName} — Student Developer`;
const description =
  "Omar Elhady, a student developer from Egypt learning programming and building software. Explore Mizano, KingdomForge and Nafas, all works in progress.";

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
  const { language, t } = useLanguage();
  const localizedProjects = projects.map((project) => localizeProject(project, language));
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
              <MapPin className="size-3 text-primary" /> {t(site.location)} · {t("open to collaborate")}
            </p>
            <h1 className="text-4xl font-semibold leading-[1.05] sm:text-5xl">
              {site.roles.map((r, i) => (
                <span key={r} className="block">
                  <span className="text-gradient">{t(r)}</span>
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">{t(site.tagline)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className={`${btn} bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-soft`}><a href="#projects">
                {t("See projects")} <ArrowRight className="size-4" />
              </a></Button>
              <Button asChild variant="outline" className={`${btn} border bg-surface/60 hover:border-accent/60`}><a href="#contact">
                {t("Get in touch")}
              </a></Button>
            </div>
            <div className="mt-10">
              <SocialRow />
            </div>
          </Reveal>
          <Reveal>
            <div className="relative mx-auto w-full max-w-md pt-28">
              <img
                src={omarPortrait.url}
                alt={t("Portrait of Omar Elhady")}
                width={1024}
                height={1024}
                loading="eager"
                className="portrait-frame absolute top-0 end-2 w-32 rounded-2xl object-cover sm:w-36"
              />
              <HeroDiagram />
            </div>
          </Reveal>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <SectionHeading index="01" kicker="About" title="Learning by building real things." />
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
              <div className="space-y-5 text-lg text-muted-foreground">
                {site.bio.map((p) => (
                  <p key={p}>{t(p)}</p>
                ))}
              </div>
              <ul className="glass space-y-4 rounded-2xl p-6 font-mono text-sm">
                {[
                  ["role", site.roles.map(t).join(" · ")],
                  ["based", t(site.location)],
                  ["focus", "Apps, games & product thinking"],
                  ["now", "Building Mizano, KingdomForge & Nafas"],
                ].map(([k, v]) => (
                  <li key={k} className="flex justify-between gap-4 border-b pb-3 last:border-0 last:pb-0">
                    <span className="text-primary">{t(k ?? "")}</span>
                    <span className="text-end text-foreground">{t(v ?? "")}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* Projects */}
        <section id="projects" className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <SectionHeading index="02" kicker="Selected projects" title="Ideas becoming real experiences." />
          </Reveal>
          <p className="mb-8 max-w-2xl text-muted-foreground">{t(projectSelection)}</p>
          <div className="grid gap-6 lg:grid-cols-3">
            {localizedProjects.map((p) => (
              <Reveal key={p.id}>
                <article className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:border-primary/40">
                  <figure className="project-figure relative h-56 overflow-hidden border-b bg-surface/40">
                    <ProjectVisual visual={p.visual}/>
                    <figcaption className="visual-caption absolute inset-x-0 bottom-0 px-3 py-2 text-center text-[10px] text-muted-foreground">
                      {t(p.visual === "kingdom" ? "Concept art · not gameplay" : "Design preview · not a live app")}
                    </figcaption>
                  </figure>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold leading-snug">{p.headline}</h3>
                      <p className="w-full text-sm text-muted-foreground" dir="ltr">{p.name}</p>
                      <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent">
                        ● {p.status}
                      </span>
                    </div>
                    <p className="mb-2 font-mono text-xs text-primary">{p.kind}</p>
                    <p className="text-muted-foreground">{p.summary}</p>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("Intended scope")}</p>
                    <ul className="mt-2 grid gap-1.5 text-sm sm:grid-cols-2">
                      {p.planned.map((f) => (
                        <li key={f} className="flex gap-2">
                          <ArrowRight aria-hidden="true" className="directional-icon mt-0.5 size-4 shrink-0 text-primary" /> {f}
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
                      {t("View project details")} <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 border-y py-5 text-sm"><span className="text-primary">{t("+ More projects")}</span><span className="text-muted-foreground">{t("More in progress")}</span></div>
        </section>

        {/* Skills */}
        <section id="skills" className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <SectionHeading index="03" kicker="Skills & tools" title="What I work with." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {skills.map((g) => (
                <div key={t(g.group)} className="glass rounded-2xl p-6 transition hover:border-accent/40">
                  <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-primary">{t(g.group)}</h3>
                  <ul className="space-y-2">
                    {g.items.map((i) => (
                      <li key={i} className="text-foreground">{t(i)}</li>
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
                <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase text-primary"><Mail className="size-4" aria-hidden="true" /> {t("Contact")}</p>
                <h2 className="text-3xl font-semibold sm:text-5xl">{t("Let's build something.")}</h2>
                <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                  {t("Questions, feedback on a project, or an idea to collaborate on — my inbox is open.")}
                </p>
                {contactEmail ? (
                  <div className="mt-8">
                    <p className="mb-3 text-sm text-muted-foreground">{t("Email me")}</p>
                    <Button asChild className={`${btn} contact-email bg-primary text-primary-foreground hover:bg-primary/90`}>
                      <a href={`mailto:${contactEmail}`} dir="ltr"><Mail className="size-4 shrink-0" /> <span>{contactEmail}</span> <ArrowUpRight className="size-4 shrink-0" /></a>
                    </Button>
                  </div>
                ) : (
                  <p className="mt-8 font-mono text-sm text-muted-foreground">{t("Contact details coming soon.")}</p>
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
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 border-b px-5 py-8">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{t("Find me on")}</p>
          <SocialRow />
        </div>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <p>© {new Date().getFullYear()}</p>
            <p>{t(site.creator)}</p>
            <a href={site.phoneTel} dir="ltr" className="inline-flex min-h-11 items-center gap-1.5 hover:text-foreground">
              <Phone className="size-3.5" aria-hidden="true" /> {site.phoneDisplay}
            </a>
            <a href={site.whatsapp} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-11 items-center gap-1.5 hover:text-foreground">
              {t("Chat on WhatsApp")}
            </a>
          </div>
          <a href="#top" className="hover:text-foreground">{t("Back to top ↑")}</a>
        </div>
      </footer>
    </div>
  );
}
