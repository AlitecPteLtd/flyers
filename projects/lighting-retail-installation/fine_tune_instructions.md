# Fine-Tune Instructions — Lighting Retail & Installation Operations

## Open Items

- Hero image is a generated lighting showroom/installation lifestyle photo; swap for client-approved photography if needed.
- Dashboard KPIs (open quotations, tier discounts, site jobs, FSM completions, commission payable) are illustrative, not live data.
- OCA/admin modules in the source repo (report_xlsx, partner_statement, oi_login_as, smart_warnings, etc.) are intentionally excluded from flyer claims — they are shared infrastructure/ops tooling, not lighting-specific customization.
- `ac_stock_price_cost_visibility` (cost/price visibility restriction) exists in the source repo and reinforces the discount-governance story but is not called out as its own headline capability; fold it in if the client wants a 9th capability later.

## Visual Tuning Notes

- Layout and CSS cloned from the `housewares-retail` modern A4 template for visual consistency across the flyer library.
- H1 uses 30px font size (vs. the 32px default) because "Lighting Retail & Installation Operations" is longer than most existing titles; confirm it still reads cleanly at 100% zoom after any future copy edits.
- Integration row uses `repeat(6, 1fr)` (not the usual 8) because the user specified exactly 6 apps: Sales, Project, Planning, Field Service, Inventory, Accounting.
- Left hero fade must keep title/intro/quick benefits readable over the showroom photo; the generated hero image is calmer on the left and busier (fixtures/glow) on the right, matching the fade direction.

## Export Test Notes

- Serve via local HTTP (not `file://`) when testing PDF/PNG export.
- Shared editor script: `../../editor/flyer-editor.js?v=20260715-pdf-canvas-1`
- Charts use inline SVG donut/line (export-safe); avoid CSS conic-gradient.
- Verify Font Awesome icons and hero PNG load under `lighting-retail-installation-assets/`.

## User-Specific Instructions

- Source repo: `/Users/shawn/PycharmProjects/Odoo Sh Projects/light-avenue` — custom module `light_operation` (+ `ac_stock_price_cost_visibility`).
- **NEVER mention "Light Avenue" or any client name anywhere in flyer copy, filenames, or metadata.** Verified: no client name appears in `index.html`, `index-zh.html`, or these notes.
- Content must cover: visual quotes, discontinued sell-down, VIP/Gold/Silver discount limits, SO→project/tasks, site appointments, Gantt planning, FSM worksheets, staff+ID commissions — all included as Key Capabilities and/or Workflow steps.
- Structure per user request: 4 quick benefits, 8 key capabilities, workflow + dashboard two-panel section, integrations row (Sales, Project, Planning, Field Service, Inventory, Accounting — exactly these 6 apps), 4 business benefits.
- Per user instruction, root/`en/index.html`/`zh/index.html` were **not** updated for this project (standalone flyer only).
