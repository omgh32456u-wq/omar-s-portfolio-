# Portfolio Foundation Audit

## 1. Critical issues (confirmed in code)
- **Placeholder links go live.** `site.ts` has `you@example.com` and `github.com/your-username` etc. Once published, the email button and all three social icons lead to wrong or 404 pages. Fix: hide any social/email whose value is still a placeholder (empty string = not rendered), and show a neutral "Contact details coming soon" line instead of a broken mailto.
- **Name shows "Your Name"** in the page title, header, footer and share preview. Same guard: fall back to a neutral label ("Portfolio") until a real name is set.
- **Content-only reveal risk.** Sections start at `opacity: 0` and only appear via JavaScript. If scripts fail or load slowly, the page looks empty. Reduced-motion is handled correctly. Fix: only hide when a `js` class is present on `<html>` (set by the existing inline script).
- **Theme toggle:** persistence and no-flash script work. Minor: it ignores the visitor's system light preference on first visit, and the icon may flicker after load. Low priority.
- **Mobile menu:** works and labelled; it does not close on Escape or when switching to desktop width. Small fix.
- **No 404-safe sitemap / canonical** and the share preview has no image (fine for now; hosting supplies a screenshot).
- Accessibility otherwise good: focus rings, aria labels, decorative SVGs hidden, one `<main>`.

## 2. Worthwhile foundation improvements now
- **Project case-study pages** at `/projects/mizano` and `/projects/kingdomforge`, generated from the existing `projects` data (add `slug`, `problem`, `approach`, `learnings`, optional `screenshots`, `repoUrl`, `liveUrl` fields, all optional and hidden when empty). Each page gets its own title/description/share tags. This is the main lever for credibility, SEO and future expansion.
- **Per-page metadata + canonical** (relative URLs, no domain needed yet).
- **Small tests** for the placeholder guard (placeholder email/links are not rendered) and that both project pages route.

## 3. Do NOT build yet
Blog/CMS, backend contact form, analytics, auth, i18n/Arabic version, 3D/large animations, generated fake screenshots, testimonials or stats, separate About/Contact pages (single page is fine at this size), sitemap (needs final domain).

## 4. Build plan

**Pass 1 — Fix broken/false behavior (~1–1.5 credits, low risk)**
- Placeholder guard for name, email, socials.
- No-JS-safe reveal.
- Mobile menu closes on Escape/resize; theme follows system on first visit.
- Test for the placeholder guard.

**Pass 2 — Case-study structure (~2–3 credits, low–medium risk)**
- Extend project data with optional case-study fields.
- Add one dynamic project page route with "not found" for unknown slugs, linked from each project card ("Read case study").
- Per-page metadata and canonical tags; routing test for both projects.

Total ~3.5–4.5 credits, leaving ~5+ for review and publish. Pass 2 can be skipped without affecting Pass 1.

## 5. Needed from you later (not now)
Real name and initials, short bio, contact email, real GitHub/LinkedIn/X URLs (or which to drop), optional avatar photo, real screenshots of Mizano and KingdomForge, case-study text (problem, what you did, what you learned), final domain for sitemap/canonical.
