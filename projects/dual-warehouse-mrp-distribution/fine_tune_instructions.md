# Fine-Tune Instructions — Dual-Warehouse Make-to-Order Distribution

## Build Notes

- Built from `projects/pharmaceutical-trading/` as the shell/CSS template (per explicit user request). A4 dimensions (1024×1448), hero/fade/curve layers, 6-app integration grid, and editor script wiring match that baseline.
- Shared assets copied from pharmaceutical-trading: `alitec-logo.jpeg`, `odoo-gold-partner.png`, `fontawesome/`, `webfonts/`.
- Hero image is a newly generated AI photo (warehouse shelves + light packing/assembly benches) — no embedded brands or readable text. Stored at `dual-warehouse-mrp-distribution-assets/dual-warehouse-mrp-distribution-hero.png`.
- Editor script: `../../editor/flyer-editor.js?v=20260715-pdf-canvas-1` with `data-flyer-version="2026-07-28-dual-wh-mrp-v1"`.
- **Client name exclusion:** Source repos `rising` / `risingtech` and module/field labels that encode client warehouse brands must not appear on HTML or `flyer_content.md`. Marketing copy uses “local warehouse” and “regional/partner warehouse” only. Source paths and module names are documented in `project_summary.md` only.
- **Indexes intentionally NOT updated.** Root `index.html`, `en/index.html`, and `zh/index.html` were left untouched.

## Positioning vs Other Manufacturing Flyers

- Differentiate from `precision-cnc-manufacturing` and `secondary-process-manufacturing`: this flyer sells **distributor make-to-order** with dual stock entities and receipt routing, not CNC tooling/workcenters or secondary-process routings.
- Keep capability copy focused on sale_mrp linkage, dual forecasts, PO receipt wizard, alt codes/COO, sales history, and purchase acknowledge/dates — not shop-floor CNC depth.

## Content Fidelity Notes

Capabilities and workflow map to code in `/Users/shawn/PycharmProjects/Odoo Sh Projects/rising` (duplicate in `risingtech`):

- Dual forecasts → `rising_operation` product template/variant forecast fields + warehouse-scoped forecast report actions
- Receipt routing → `purchase.operation.type.wizard` on PO `button_confirm`
- Sale→MO customer/ref → `mrp.production` `so_partner_id` / `so_client_order_ref`
- BOM remarks / MFG lot → `remarks.line` on BOM/MO; `stock.move.mfg_lot`
- Alt codes / COO → `product_code`, `alt_product1..3`, supplierinfo `country_id`
- Sales history → `sale.history.report` SQL view
- Supplier ack / dates / item no / Incoterms → purchase + partner extensions
- Branded prints → `rising_print` PO + MRP reports
- Cost/price visibility → `ac_stock_price_cost_visibility`

Dashboard numbers are illustrative placeholders for visual balance (same pattern as other flyers).

Donut SVG paths recomputed for a 58/42 local vs regional-partner receipt mix (center 46,46; outer r=31; inner r=20).

## Export / QA Status

- Not yet browser-exported to PDF/PNG in this session — recommend `python3 -m http.server` from the repo root and verify both language pages, then PDF/PNG via the shared editor toolbar before publishing.
- Spot-check hero for accidental readable labels; current image uses plain unlabeled cartons.

## Open Items / Possible Follow-Ups

- Add index cards when the user wants the project discoverable on the GitHub Pages site.
- If dual-warehouse labels need locale-specific wording (e.g. “总部仓 / 区域仓”), adjust both HTML files and `flyer_content.md` together.
