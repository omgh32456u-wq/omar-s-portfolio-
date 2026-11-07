import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LanguageProvider, useLanguage } from "@/components/portfolio/language";
import { arabic, localizeProject, projects, techSnippets } from "@/content/site";

afterEach(() => { cleanup(); localStorage.clear(); document.documentElement.dir = "ltr"; document.documentElement.lang = "en"; });

function Switch() {
  const { language, setLanguage } = useLanguage();
  return <button onClick={() => setLanguage(language === "en" ? "ar" : "en")}>{language}</button>;
}

describe("portfolio language and truthful scope", () => {
  it("persists Arabic and switches document direction back to English", async () => {
    localStorage.clear();
    const view = render(<LanguageProvider><Switch/></LanguageProvider>);
    fireEvent.click(screen.getByRole("button", { name: "en" }));
    expect(document.documentElement.dir).toBe("rtl");
    expect(document.documentElement.lang).toBe("ar");
    expect(localStorage.getItem("portfolio-language")).toBe("ar");
    view.unmount();
    render(<LanguageProvider><Switch/></LanguageProvider>);
    await waitFor(() => expect(screen.getByRole("button", { name: "ar" })).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: "ar" }));
    expect(document.documentElement.dir).toBe("ltr");
    expect(localStorage.getItem("portfolio-language")).toBe("en");
  });
  it("translates every displayed project field", () => {
    for (const project of projects) {
      for (const field of [project.headline, project.status, project.kind, project.summary, project.notYet, ...project.planned, ...project.stack]) expect(arabic[field]).toBeDefined();
      expect(localizeProject(project, "ar").summary).not.toBe(project.summary);
    }
  });
  it("keeps Mizo planned and Nafas in development", () => {
    expect(projects.find(p => p.id === "mizano")?.summary).toContain("planned — not live");
    expect(projects.find(p => p.id === "nafas")?.status).toBe("In development");
    expect(projects.find(p => p.id === "kingdomforge")?.summary).toContain("Stronghold-inspired");
  });
  it("includes the four requested code identities", () => {
    expect(techSnippets.map(s => s.language)).toEqual(["JavaScript", "Python", "Dart", "Flutter"]);
  });
});