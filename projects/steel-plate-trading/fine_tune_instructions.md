# Fine-Tune Instructions — Steel Plate Trading

## Open Items

- Hero image is a generated steel-warehouse/stockyard photo (no brands, no readable text);
  swap for client-approved yard photography if needed.
- `app_common` / `app_odoo_customize` (generic Odoo whitelabel/admin tooling) and
  `od_journal_sequence` are present in the source repo but intentionally excluded from flyer
  claims as they are not customer-facing trading differentiators.
- Dashboard KPIs (tons quoted, price book syncs, MYOB exports due, channel mix, tonnage trend,
  plate grade mix) are illustrative, not live data.
- Confirm final grade/product names (Mild Steel, SS 304, SS 316, Galvanized) match the actual
  product catalogue before external use.

## Visual Tuning Notes

- Layout cloned directly from the `housewares-retail` modern A4 template — same CSS,
  section order, and card counts.
- Left hero fade must keep title/subtitle/intro/quick benefits readable over the steel plate
  photo; hero image has more open space on the left third by design.
- 8 key capability cards map 1:1 to the 8 requested content pillars: L×W×T dimensions, density
  weight, ton pricing, customer/supplier price books, timed delivery, external sales isolation,
  branded docs + packing list kg, and MYOB AR/AP export.
- Integration row uses 8 apps (Sales, Purchase, Inventory, Delivery, Accounting, CRM, Sales
  Teams, Contacts) to match the standard 8-column grid; "Contacts" was added because price books
  live on `res.partner`.

## Export Test Notes

- Serve via local HTTP (not `file://`) when testing PDF/PNG export.
- Shared editor script: `../../editor/flyer-editor.js?v=20260715-pdf-canvas-1`
- Charts use inline SVG donut/line (export-safe); avoid CSS conic-gradient.
- Verify Font Awesome icons and hero PNG load under `steel-plate-trading-assets/`.

## User-Specific Instructions

- Industry framing: steel plate trading / stockist (user-provided).
- Do NOT mention "Kah Teck", "Delcie", or any client brand names anywhere in flyer copy —
  verified clean via repo-wide search of the project folder.
- No project index files were created or updated for this project per explicit instruction —
  root/`en`/`zh` indexes were intentionally left untouched.
- Source repo modules use the internal name "Delcie" in code (e.g. `delcie_sales`,
  `delcie_operation`, `delcie_custom_reports`); these are documented by internal module name only
  in `project_summary.md` for engineering traceability and never appear in the flyer HTML.
