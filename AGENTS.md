<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- All personal portfolio content (name, bio, email, socials, projects, skills) lives in src/content/site.ts so non-developers edit one file.
- Keep support currency presets and provider availability in src/content/site.ts, with interaction isolated in SupportSection; verified integrations can replace unavailable providers without redesigning the portfolio.
- Keep bilingual copy and project localization in src/content/site.ts; a shared LanguageProvider owns persistence and document direction so all routes switch together.
- Use ProjectVisual for shared illustrative previews on cards and detail pages; preview labels must distinguish concepts from shipped products.
- Mirror only directional navigation icons in RTL; preserve brand, utility and LTR code icons so language switching keeps their meaning.
- The laptop section uses a React Three Fiber scene (laptop-scene.tsx) loaded via dynamic import inside useEffect, never React.lazy/Suspense: a suspense boundary around <Canvas> triggers React 19 "synchronously unmount a root" errors. Scroll progress reaches the scene through a ref, not state.
- Laptop rendering is demand-driven and invalidated on visible scroll events; callouts stay in the accessible HTML list, not drei Html roots, to avoid React 19 nested-root lifecycle errors.
- Coding map nodes and factual portfolio counts live in the shared content config; the map owns only selection and offscreen animation state.
