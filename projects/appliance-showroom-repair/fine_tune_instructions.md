# Fine-Tune Instructions — Appliance Showroom & Repair

## Build Notes

- Shell/CSS cloned from `projects/pharmaceutical-trading/` (modern A4 layout). Shared assets copied: `alitec-logo.jpeg`, `odoo-gold-partner.png`, `fontawesome/`, `webfonts/`.
- Hero image: AI-generated appliance showroom with service bench — no brand logos or readable UI text. Path: `appliance-showroom-repair-assets/appliance-showroom-repair-hero.png`.
- **Client brand exclusion:** Source repo path may appear only in `project_summary.md`. Never use the client brand on `index.html`, `index-zh.html`, or `flyer_content.md`.
- **Indexes intentionally NOT updated** (root / en / zh left untouched per user instruction).
- Editor script: `../../editor/flyer-editor.js?v=20260715-pdf-canvas-1`

## Layout Notes

- Integrations row uses 6 apps (Sales, Inventory, Repair, Accounting, Contacts, HR) — HR is light-touch only.
- Flyer workflow compresses the longer operational chain into five A4 steps; full seven-step narrative is in `project_summary.md`.
- Capability titles such as "Warehouse stock buckets" and "Delivery cost visibility" are kept short for eight-column fit.

## Content Fidelity

Derived from the Odoo 11 source repo path recorded in `project_summary.md`:

- Warehouse buckets → product NEW/PROJ/SP/Gallery/Display ready fields
- Multi-product repair → `mrp.repair.item`
- Staff/time → `staff_id`, `repair_date`, `repair_end`
- Service type → retail / project selection
- Delivery cost → `sale.order.line.delivered_cost`
- Scrap valuation → `stock.scrap.scrap_value`
- Ageing / serial import / credit → supporting modules listed in project summary
- Stock usage → `stock.usage` report

Dashboard figures are illustrative placeholders, not live client data.

## Export / QA

- Serve via local HTTP when testing PDF/PNG export.
- Spot-check hero for accidental brand marks or readable pseudo-text.
- Verify Font Awesome and hero PNG under `appliance-showroom-repair-assets/`.

## Open Items

- Link indexes when the user wants the project discoverable on GitHub Pages.
- Optional hero reshoot if client prefers a pure showroom or pure workshop composition.
