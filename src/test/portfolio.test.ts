import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import {
  activeSocials,
  activeSupportPlatforms,
  contactEmail,
  displayName,
  isSet,
  isValidUrl,
  projects,
  skills,
  stackLayers,
} from "@/content/site";
import { routeTree } from "@/routeTree.gen";

describe("placeholder guard", () => {
  it("treats template placeholders as unset", () => {
    expect(isSet("you@example.com")).toBe(false);
    expect(isSet("Your Name")).toBe(false);
    expect(isSet("https://github.com/your-username")).toBe(false);
    expect(isSet("")).toBe(false);
    expect(isSet("omar@gmail.com")).toBe(true);
  });
  it("never exposes placeholder email or socials", () => {
    expect(contactEmail).not.toBe("you@example.com");
    expect(activeSocials.some((s) => s.href.includes("your-username"))).toBe(false);
    expect(displayName).not.toBe("Your Name");
  });
});

describe("skills and support", () => {
  it("lists Dart and Flutter in skills and teardown layers", () => {
    const all = skills.flatMap((g) => g.items);
    expect(all).toContain("Dart");
    expect(all).toContain("Flutter");
    const layerTools = stackLayers.flatMap((l) => l.tools);
    expect(layerTools).toContain("Dart");
    expect(layerTools).toContain("Flutter");
  });
  it("hides support platforms without a real https URL", () => {
    expect(isValidUrl("")).toBe(false);
    expect(isValidUrl("https://buymeacoffee.com/your-username")).toBe(false);
    expect(isValidUrl("http://buymeacoffee.com/omar")).toBe(false);
    expect(isValidUrl("https://buymeacoffee.com/omar")).toBe(true);
    expect(activeSupportPlatforms.every((p) => isValidUrl(p.url))).toBe(true);
  });
});

describe("project routes", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
  it.each(projects.map((p) => p.id))("matches /projects/%s", (slug) => {
    expect(router.matchRoutes(`/projects/${slug}`).at(-1)?.routeId).toBe("/projects/$slug");
  });
  it("keeps honest status labels", () => {
    expect(projects.find((p) => p.id === "mizano")?.status).toBe("In development");
    expect(projects.find((p) => p.id === "kingdomforge")?.status).toBe("Early prototype");
  });
});
