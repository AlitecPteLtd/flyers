# Fine-Tune Instructions — Semiconductor Component Trading

## Build Notes

- Built from `projects/pharmaceutical-trading/` as the shell/CSS template (per explicit user request). All CSS classes, A4 dimensions (1024×1448), hero/fade/curve layers, 6-app integration grid, and editor script wiring match that baseline.
- Shared assets copied from pharmaceutical-trading-assets: `alitec-logo.jpeg`, `odoo-gold-partner.png`, `fontawesome/`, `webfonts/`.
- Hero image is a newly generated AI photo (electronics component trays / warehouse shelving) — no embedded text, no client branding. Stored at `semiconductor-component-trading-assets/semiconductor-component-trading-hero.png`.
- **Client name exclusion:** Source repo path and module prefixes reference a specific client. Per explicit instruction, those names are never used in flyer HTML or `flyer_content.md`. Source path is documented only in `project_summary.md`.
- **Indexes intentionally NOT updated.** Per explicit user instruction, root `index.html`, `en/index.html`, and `zh/index.html` were left untouched.

## Layout Notes

- Integrations row uses 6 apps (Sales, Purchase, Inventory, Accounting, Budget, Approvals) matching the pharmaceutical-trading grid (`repeat(6, 1fr)`).
- Workflow kept at 5 steps to match the template CSS (`repeat(5, 1fr)`), compressing the suggested enquire→…→collect sequence into: Enquire → Quote MPN/CPN → Confirm SO → Deliver with CPN → Invoice & Collect.
- `.bar-item` label column remains at the pharmaceutical-trading width (92px) for fab site labels.

## Content Fidelity Notes

Capability and workflow topics were derived from code under `/Users/shawn/PycharmProjects/Odoo Sh Projects/mi-sg` (see `project_summary.md`):

- Manufacturer/MPN/material/size + markup→list_price → `misg_operation` product models
- Customer part templates on SO/DO/invoice → `customer.part.number` + line HTML fields
- FAB + Incoterms → `fab.fab`, partner `fab_id` / `incoterm_id`
- Commercial invoice HS/COO + director approval → `misg_commercial_invoice`
- Director approval on account moves → `misg_operation` `account.move`
- Budget-linked purchasing → `misg_account_budget` above-budget flags
- Branded docs + T&C merge → `misg_print` + `purchase_qweb_merge_pdf`
- Scrap reasons / inventory helpers → `bi_scrap_reason`, `ak_inventory_adjustments`

Dashboard numbers are illustrative placeholders for visual balance (same approach as other flyers), not live client data.

**Not claimed:** Manufacturing/MRP, eCommerce, POS, or any client brand names on marketing surfaces.

## Export / QA Status

- Not yet opened in a browser or exported to PDF/PNG in this session — recommend local HTTP server check from repo root and PDF/PNG export via the shared editor toolbar before publishing.
- Hero image spot-check: realistic IC trays on warehouse shelving; no legible brand text or UI chrome.

## Open Items / Possible Follow-Ups

- If the user wants this project discoverable, add cards to `index.html`, `en/index.html`, and `zh/index.html` linking to `projects/semiconductor-component-trading/` (EN) and `projects/semiconductor-component-trading/index-zh.html` (ZH).
- Optional alternate hero if a more logistics/shipping-forward shot is preferred (e.g. sealed moisture-barrier bags on a packing bench) instead of shelf trays.
