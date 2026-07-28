# Fine-Tune Instructions — Interior Design & Renovation Operations

## Open Items

- Hero image (`interior-design-firm-hero.png`) was pre-supplied in the project's assets folder; confirm it still reads as a clean interior-design/renovation lifestyle image with no embedded text before publishing.
- `login_to_shop` module exists in the source repo but has no implementation (manifest only) — intentionally excluded from flyer claims.
- `ft_operation`'s `action_save` override on `sale.order` is a no-op left over from the source code; not surfaced on the flyer.
- Dashboard KPIs (quotations open, jobs ongoing/closed, deliveries pending, handovers signed, renovation type mix) are illustrative, not live data.

## Critical Content Constraints (per user request)

- **Never mention "FT2" or the client's brand name** anywhere on the flyer HTML or in `flyer_content.md`. The source repo path is documented only in `project_summary.md` for internal continuity.
- **Do not claim the Odoo Project app** — job tracking is delivered via Analytic Accounting (`account.analytic.account` with Ongoing/Closed status), not `project.project`/`project.task`. Flyer copy consistently says "analytic job" / "analytic account", never "Project app".
- **Do not claim full self-checkout eCommerce** — the source code explicitly disables the guest checkout wizard and redirects anonymous shop visitors to sign in. Flyer copy frames this as "login-gated catalogue" + "designer-led quoting", never as an online self-checkout store.
- **Do not claim a working/live Peppol submission** — `action_peppol_submit()` and `action_create_bill_from_peppol()` are stub methods returning `False`/`None` in the source. Flyer copy says "Singapore e-invoice field readiness" / "prepared, ready for rollout", never "live Peppol submission" or "e-invoice sending".

## Visual Tuning Notes

- Layout cloned from the housewares-retail modern A4 template (same CSS structure, section order, and card counts).
- Subtitle CSS was widened slightly (`max-width: 486px`, `font-size: 14px`, `font-weight: 600`) versus the shared template's default 440px/15px, because the user-specified subtitle text is longer than other flyers' subtitles. Verify at 100% zoom that it still sits cleanly inside the hero white-fade zone above the quick-benefit cards.
- H1 wraps as "Interior Design &" / "Renovation Operations" (two lines, matching the two-line title pattern used across the site).
- Prefer shorter capability descriptions if two-line titles collide with body text at 100% zoom (same guidance as other flyers).
- Dashboard donut/line charts use inline SVG (export-safe); avoid CSS conic-gradient per the shared build rules.

## Export Test Notes

- Serve via local HTTP (not `file://`) when testing PDF/PNG export:
  `python3 -m http.server 8765 --directory "/Users/shawn/PycharmProjects/Alitec Odoo Flyers"`
  then open `http://127.0.0.1:8765/projects/interior-design-firm/` and `.../index-zh.html`.
- Shared editor script: `../../editor/flyer-editor.js?v=20260715-pdf-canvas-1`, `data-flyer-version="2026-07-28-interior-design-firm-v1"`.
- Verify Font Awesome icons and the hero PNG load under `interior-design-firm-assets/`.
- Both `index.html` and `index-zh.html` were checked for balanced `div`/`section`/`span`/`p`/`h1`/`h3`/`h4` tag counts (197/5/14/27/1/16/19 respectively, matching on both files).

## User-Specific Instructions

- Industry framing: interior design & renovation firm handling CRM intake → login-gated catalogue browsing → designer quoting → delivery/handover → job costing (user-provided).
- Root `index.html`, `en/index.html`, and `zh/index.html` were **not** updated — per explicit instruction, this project is not yet listed in any site index.
- Assets and the shell `index.html` (CSS/skeleton) were already present in the project folder prior to this pass; this pass replaced the English body copy, added `index-zh.html`, and added the three documentation files.
