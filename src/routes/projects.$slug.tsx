import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { displayName, getProject, isSet, siteUrl, localizeProject } from "@/content/site";
import { useLanguage } from "@/components/portfolio/language";
import { Header } from "@/components/portfolio/parts";
import { ProjectVisual } from "@/components/portfolio/visuals";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { slug: project.id };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProject(loaderData.slug) : undefined;
    if (!p) return { meta: [{ title: `Project not found — ${displayName}` }, { name: "robots", content: "noindex" }] };
    const title = `${p.name} (${p.status}) — ${displayName}`;
    const description = `${p.kind}. ${p.summary}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: siteUrl ? [{ rel: "canonical", href: `${siteUrl}/projects/${p.id}` }] : [],
    };
  },
  component: ProjectPage,
  notFoundComponent: ProjectNotFound,
});

function ProjectNotFound() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">{t('Project not found')}</h1>
        <p className="mt-3 text-muted-foreground">{t("That project doesn't exist (yet).")}</p>
        <Link to="/" hash="projects" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="size-4" /> {t('Back to projects')}
        </Link>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  const { t } = useLanguage();
  return (
    <section className="border-t py-6 sm:py-8">
      <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">{t(title)}</h2>
      {children}
    </section>
  );
}

function ProjectPage() {
  const { language, t } = useLanguage();
  const { slug } = Route.useLoaderData();
  const source = getProject(slug);
  if (!source) return <ProjectNotFound/>;
  const p = localizeProject(source, language);
  const hasCaseStudy = !!(p.problem || p.approach || p.currentProgress || p.learnings?.length);
  const links = [
    { label: "Source code", href: p.repoUrl },
    { label: "Live version", href: p.liveUrl },
  ].filter((l): l is { label: string; href: string } => isSet(l.href));

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="bg-ambient pointer-events-none absolute inset-x-0 top-0 h-[40rem]" />
      <Header />
      <main className="relative mx-auto max-w-4xl px-5 pb-20 pt-28">
        <nav aria-label={t("Breadcrumb")} className="mb-8 font-mono text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">{t('Home')}</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/" hash="projects" className="hover:text-foreground">{t('Projects')}</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">{p.name}</li>
          </ol>
        </nav>

        <header className="mb-10">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-semibold sm:text-5xl">{p.name}</h1>
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent">
              ● {p.status}
            </span>
          </div>
          <p className="font-mono text-sm text-primary">{p.kind}</p>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{p.summary}</p>
          {links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border bg-surface/60 px-5 py-2.5 text-sm font-semibold hover:border-primary/50">
                  {t(l.label)} <ArrowUpRight className="size-4" />
                </a>
              ))}
            </div>
          )}
        </header>

        <figure className="glass project-figure relative mb-8 h-64 overflow-hidden rounded-xl sm:h-80">
          <ProjectVisual visual={p.visual}/>
          <figcaption className="visual-caption absolute inset-x-0 bottom-0 px-3 py-2 text-center text-[10px] text-muted-foreground">
            {t(p.visual === "kingdom" ? "Concept art · not gameplay" : "Design preview · not a live app")}
          </figcaption>
        </figure>

        <div className="grid gap-6">
          <Section title="Intended scope">
            <ul className="grid gap-2 sm:grid-cols-2">
              {p.planned.map((f) => (
                <li key={f} className="flex gap-2"><span className="text-primary">→</span> {f}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-lg border border-dashed px-3 py-2 text-sm text-muted-foreground">{p.notYet}</p>
          </Section>

          {p.problem && <Section title="The problem"><p className="text-muted-foreground">{p.problem}</p></Section>}
          {p.approach && <Section title="Approach"><p className="text-muted-foreground">{p.approach}</p></Section>}
          {p.currentProgress && <Section title="Current progress"><p className="text-muted-foreground">{p.currentProgress}</p></Section>}
          {!!p.learnings?.length && (
            <Section title="What I'm learning">
              <ul className="space-y-2 text-muted-foreground">{p.learnings.map((l) => <li key={l}>• {l}</li>)}</ul>
            </Section>
          )}
          {!!p.screenshots?.length && (
            <Section title="Screenshots">
              <div className="grid gap-4 sm:grid-cols-2">
                {p.screenshots.map((s) => (
                  <img key={s.src} src={s.src} alt={s.alt} loading="lazy" className="w-full rounded-lg border" />
                ))}
              </div>
            </Section>
          )}
          {!hasCaseStudy && (
            <p className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
              {t('Case study details will be added as the project develops.')}
            </p>
          )}

          <Section title="Stack & skills">
            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">{s}</span>
              ))}
            </div>
          </Section>
        </div>

        <Link to="/" hash="projects" className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft className="size-4" /> {t('Back to all projects')}
        </Link>
      </main>
    </div>
  );
}
