# Fine-Tune Instructions — Consumer Hardgoods & Sourcing

## Open Items

- Hero image is a stock container-yard/carton photo; swap for client-approved warehouse or factory photography if needed.
- Dashboard KPI numbers (58, 21, 14, 6, 9, milestone counts, sector mix %, donut split) are illustrative, not live data.
- Confirm whether "Sourcing Visibility" panel title should instead read "Operations Visibility" to match other flyers' naming — kept distinct here to reflect the sourcing/merchandising audience.

## Visual Tuning Notes

- Layout cloned from the `housewares-retail` A4 template structure (hero, 4 quick benefits, 8 capabilities, two-panel workflow/dashboard, integrations, 4 business benefits, standard footer).
- `h1` font-size reduced from the template default 32px to 26px (line-height 1.05 EN / 1.15 ZH) so the longer title "Consumer Hardgoods & Sourcing" wraps cleanly across two lines without overflowing the hero width.
- `.capabilities` padding tightened slightly (24px → 20px) to keep 8 capability cards with longer titles ("Agent & Trade Order Modes", "Factory Audit Register") from crowding the outer columns.
- `.integration-grid` changed from `repeat(8, 1fr)` to `repeat(6, 1fr)` (gap increased to 16px) because this project uses exactly 6 integration apps (Sales, Purchase, Inventory, Accounting, Contacts, Delivery) per the requested scope — do not add POS/eCommerce/MES apps.
- Donut chart path coordinates were recalculated (not reused from another flyer) for the 58%/42% Agent/Trade split — see the SVG `<path>` d-attribute math in `index.html`/`index-zh.html` if the split ratio changes.
- Weekly line chart re-labeled to `W1`–`W8` (EN) / `周1`–`周8` (ZH) instead of weekday labels, since ocean shipment cadence is weekly, not daily.

## Export Test Notes

- Serve via local HTTP (not `file://`) when testing PDF/PNG export.
- Shared editor script: `../../editor/flyer-editor.js?v=20260715-pdf-canvas-1`
- Charts use inline SVG donut/line (export-safe); avoid CSS conic-gradient.
- Verified via headless Chrome screenshot at 1024×1448 for both `index.html` and `index-zh.html`: hero text readable, logos clear, capability/step/slot/feature grids aligned, dashboard table and queue-table columns not clipped, business benefits do not overlap the footer.
- Verify Font Awesome icons and hero PNG load under `consumer-hardgoods-and-sourcing-assets/`.

## User-Specific Instructions

- Industry framing: Consumer hardgoods sourcing and trading (Asia factory network) (home appliances, promotional/gift products) with Agent commission and Trade principal order modes (user-provided, confirmed against `gs_master`/`gs_operation`/`gs_audit_compliance` source modules).
- **Never** mention Genery, cn_genery, AMC, CDI, or any client/source-repo brand name on the flyer HTML or in `flyer_content.md` — verified clean via text search of both HTML files.
- Do **not** claim eCommerce, POS, MES, or apparel-specific capabilities — this solution is hardgoods sourcing/trading only.
- Content scope followed exactly as requested: 4 quick benefits, 8 key capabilities, one workflow panel (5-step process + 5 order milestones + 8 additional features), one dashboard panel (5 KPIs + 2 charts + milestone table + 2 bottom cards), 6-app integration row (Sales, Purchase, Inventory, Accounting, Contacts, Delivery), 4 business benefits, standard Alitec footer.
- Root/`en`/`zh` index pages intentionally **not** updated per instruction — this project is not yet linked from the site navigation.
