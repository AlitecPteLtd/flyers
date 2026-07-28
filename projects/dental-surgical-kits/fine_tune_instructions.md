# Fine-Tune Instructions — Surgical & Dental Kits Distribution

## Status

- `index.html` and `index-zh.html` built from the `housewares-retail` structural baseline (same CSS, A4 1024×1448 page, hero/fade/curve, 4 quick benefits, 8 capabilities, two-panel workflow/dashboard, integrations row, 4 business benefits, standard footer).
- Editor script kept as-is: `../../editor/flyer-editor.js?v=20260715-pdf-canvas-1` with `data-flyer-version="2026-07-28-dental-surgical-kits-v1"`.
- No root/`en/`/`zh/` index files were touched, per instruction. This project is currently unlisted on the site.

## Deliberate Deviations From The Baseline

- `.integration-grid` changed from `grid-template-columns: repeat(8, 1fr)` to `repeat(6, 1fr)` because only 6 apps were specified (Sales, Purchase, Inventory, Barcode, Accounting, Helpdesk) instead of the usual 8. This is scoped to this project's own `<style>` block only — no shared CSS file was touched.
- Donut chart arc path was recomputed by hand for a 60/40 split (`M 46.00 15.00 A 31 31 0 1 1 27.78 71.08 ...`), not copy-pasted from another flyer's 68/32 or 58/42 paths. Verified visually via headless-Chrome screenshot — renders as a clean two-color ring.

## Verified

- Local HTTP server smoke test: `index.html`, `index-zh.html`, hero image, Alitec logo, Odoo Gold Partner logo, FontAwesome CSS, and the shared editor script all return HTTP 200 from `projects/dental-surgical-kits/`.
- Headless Chrome screenshots (1024×1448) of both language versions confirmed:
  - Hero title/subtitle fit inside the white fade zone, no overlap with the hero image or logos.
  - All 4 quick-benefit cards, 8 capability cards, 5 workflow steps, 5 control slots, and 8 feature rows render without clipped text.
  - Donut chart shows a correct visual 60/40 blue/green split with legend.
  - Business-benefits bar and footer do not overlap.
  - No linter errors on either file.
- Confirmed no occurrences of "Fida" or "Prolink" (client/brand names from the source repo) anywhere in `index.html`, `index-zh.html`, or `flyer_content.md`.
- Confirmed the flyer never claims kit BOM/MRP/manufacturing, and never claims serial *generation* at delivery — copy consistently says "assign existing serial numbers."

## Not Yet Done / Open Items

- Root `index.html`, `en/index.html`, `zh/index.html` were intentionally **not** updated — add this project's card/links there in a follow-up task if/when the user wants it published on the site.
- Browser-based PDF/high-res PNG export via the editor toolbar was not manually clicked through in this session (only the static page render was verified). Recommend a quick manual check of "Save A4 PDF" and "Download HTML" the next time the flyer is opened in a real browser, since those depend on the shared `flyer-editor.js` which was not modified here.
- Dashboard numbers, ticket IDs, and percentages are illustrative placeholders — swap in real client metrics if this flyer is customized for an actual prospect conversation.
