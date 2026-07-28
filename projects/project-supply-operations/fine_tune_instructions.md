# Fine-Tune Instructions — Project Supply & Inventory Operations

## Status

- Created from scratch following the `housewares-retail` layout/CSS pattern exactly (A4 1024×1448 page, hero image + fade + curve, 4 quick-benefit cards, 8 key capability cards, two-panel workflow/dashboard section, 8-app integration row, 4-item business benefits bar, footer).
- English (`index.html`) and Chinese (`index-zh.html`) versions created with matching structure, card counts, and visual hierarchy.
- Shared editor script included: `../../editor/flyer-editor.js?v=20260715-pdf-canvas-1` (same version as `housewares-retail`; update the version query string across all flyers if the shared script changes).
- Root `index.html`, `en/index.html`, and `zh/index.html` were **intentionally not updated** per explicit user instruction ("No index updates"). Whoever adds this project to the site indexes later should follow the existing pattern: link to `projects/project-supply-operations/` for English and `projects/project-supply-operations/index-zh.html` for Chinese.

## Assets

- `project-supply-operations-assets/alitec-logo.jpeg` and `odoo-gold-partner.png` copied from `housewares-retail-assets/` (shared brand assets, unchanged).
- `project-supply-operations-assets/fontawesome/` and `project-supply-operations-assets/webfonts/` copied from `housewares-retail-assets/` (Font Awesome Free 6.5.2 — all icons used in this flyer were verified present in `all.min.css` before use: `fa-lock`, `fa-diagram-project`, `fa-map-location-dot`, `fa-rotate`, `fa-truck-field`, `fa-location-dot`, `fa-boxes-packing`, `fa-file-contract`, `fa-file-invoice-dollar`, `fa-file-invoice`, `fa-file-lines`, `fa-sitemap`, `fa-code-compare`, `fa-shuffle`, `fa-shield-halved`, `fa-list-check`, `fa-chart-line`, `fa-cart-shopping`, `fa-warehouse`, `fa-address-book`, `fa-chart-column`, `fa-bolt`).
- `project-supply-operations-assets/project-supply-operations-hero.png` — AI-generated hero image (warehouse interior, palletized construction/site materials, forklift, hi-vis worker with clipboard, flatbed delivery truck through open roller door). No brand names, logos, or embedded text. No client name (Jinbiao/JB) referenced anywhere, per instruction.

## Open Issues / Follow-Ups

- Dashboard figures (order counts, percentages, bar widths, queue rows) are illustrative placeholders in the same style as other flyers (e.g. `housewares-retail`), not real client data — replace with real KPIs if the client wants a data-accurate version later.
- No PPT version was requested or created — flyer only, per the "one project at a time" rule.
- Not yet visually QA'd in-browser or exported to PDF/PNG in this session; recommend running the standard local HTTP server check before publishing:
  ```bash
  python3 -m http.server 8765 --directory "/Users/shawn/PycharmProjects/Alitec Odoo Flyers"
  # then open:
  # http://127.0.0.1:8765/projects/project-supply-operations/
  # http://127.0.0.1:8765/projects/project-supply-operations/index-zh.html
  ```
- Verify hero image contrast under the white fade — the hero photo is brighter/lighter than some previous flyers (interior warehouse daylight scene), confirm the "PROJECT SUPPLY & INVENTORY OPERATIONS" title and subtitle remain fully legible after PDF/PNG export.
- Not committed to git — no commit was requested for this task.
