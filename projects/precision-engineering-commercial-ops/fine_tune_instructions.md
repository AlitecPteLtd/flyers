# Fine-Tune Instructions — Precision Engineering Commercial Operations

## Open Items

- Hero image was generated (photorealistic precision-machined metal parts on a workshop bench, no text/logos/people) rather than copied from an existing project, since it matched the brief more precisely than any existing industrial hero (`precision-cnc-manufacturing` and `stainless-steel-springs` were reviewed as reuse candidates but were rejected: the CNC hero includes a visible face, and the springs hero is product-specific rather than general engineering-ops).
- Confirm with the sales team whether "ISO/BizSAFE-style" phrasing is acceptable, or whether it should reference a specific certification scheme once known.
- Dashboard KPIs (open quotations, confirmed orders, GRN counts, etc.) are illustrative, not live data.

## Visual Tuning Notes

- Layout, CSS, and structure cloned exactly from `housewares-retail` (same A4 canvas size, hero/fade/curve treatment, capability grid, panel/workflow/dashboard layout, integration row, bottom-benefits bar, and footer).
- Left hero fade keeps title/intro/quick benefits readable over the machined-parts photo.
- Prefer shorter capability descriptions if two-line titles collide with body text at 100% zoom.

## Export Test Notes

- Serve via local HTTP (not `file://`) when testing PDF/PNG export.
- Shared editor script: `../../editor/flyer-editor.js?v=20260715-pdf-canvas-1` (same version as other current flyers — kept flyer-editor.js untouched).
- Charts use inline SVG donut/line (export-safe); avoid CSS conic-gradient.
- Verify Font Awesome icons and hero PNG load under `precision-engineering-commercial-ops-assets/`.

## User-Specific Instructions

- Source repo: `/Users/shawn/PycharmProjects/Odoo Sh Projects/elh19`.
- **Hard constraint, verified:** No mention of "ELH", "Sing Geyi", or any client/company brand name anywhere in `index.html`, `index-zh.html`, `project_summary.md`, `flyer_content.md`, or this file. All module and workflow descriptions are generalized (e.g. "custom operations module", "custom print module") rather than naming the source app/module technical names.
- Root `index.html`, `en/index.html`, and `zh/index.html` were intentionally **NOT** updated per explicit instruction — this project is not yet linked from the site indexes.
- `flyer-editor.js` was not modified; the new pages reference the existing shared script/version used by other current flyers.
