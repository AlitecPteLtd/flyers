# Fine-Tune Instructions — Stainless Steel Spring Manufacturing

## Open Items

- Hero image (`stainless-steel-springs-hero.png`) was already provided in the project assets folder; confirm it reads clearly as a spring/precision-metal manufacturing scene once viewed at full size.
- Dashboard KPIs (open quotations, MOs in progress, WOs pending QC, labels printed, fail qty, pass/fail %, production trend, spring-type mix) are illustrative, not live data.
- Confirm with sales team whether "Barcode" or another Odoo app (e.g. "Follow-up") is the preferred 6th integration icon — `stock_barcode` is a real dependency in the source repo (`ac_print`) but is a light touch, not a headline feature.
- Excluded from this flyer as supporting/utility modules rather than headline value: `partner_statement` (OCA statements), `report_xlsx`/`report_xlsx_helper` (Excel export), `oi_login_as`, `web_dynamic_iframe`, `rmt_bpmn`, `smart_warnings`, `ac_alitec_help`, `elite_print` (marked deactivated in its own manifest). These exist in the source repo but were judged too technical/internal for flyer-level messaging.

## Visual Tuning Notes

- Layout cloned from the housewares-retail modern A4 template (asset paths already retargeted before this pass).
- Left hero fade must keep title/intro/quick-benefit cards readable over the hero photo.
- Two-line hero title uses "Stainless Steel / Spring Manufacturing" — matches the char-count pattern proven safe in `precision-cnc-manufacturing` ("Precision CNC / Manufacturing").
- Donut chart legend colors are overridden inline (`style="background:..."`) so Passed renders green and Failed renders orange, instead of relying on the default `.legend div:last-child` CSS rule (which defaults the last item to green).
- Prefer shorter capability descriptions if two-line titles collide with body text at 100% zoom.

## Export Test Notes

- Serve via local HTTP (not `file://`) when testing PDF/PNG export.
- Shared editor script: `../../editor/flyer-editor.js?v=20260715-pdf-canvas-1`.
- Charts use inline SVG donut/line paths (export-safe); the donut path math was recalculated from scratch (not copy-pasted percentages) for a ~92%/8% pass/fail split — verify visually after any further percentage changes.
- Verify Font Awesome icons and hero PNG load correctly under `stainless-steel-springs-assets/`.

## User-Specific Instructions

- Source repo: `/Users/shawn/PycharmProjects/Odoo Sh Projects/elitesprings` (private reference only — never surface the client name, "ESPL", or any client-specific module prefix on the public flyer or in `flyer_content.md`).
- Content is grounded in verified custom modules: `elite_master` (spring spec fields), `elite_operation` (multi-qty templates, SO-MO link, packing/label fields, PDF doc attachments), `elite_mrp` (work order qty split/backorder logic), `elite_mrp_qc` (pass/fail quantity wizard), `elite_label_print` (label wizard/report), `ac_print` (industrial document set), plus OCA `sale_order_line_date`/`sale_delivery_split_date` (date-driven grouping) and `ac_historical_po` (PO lock).
- Root/en/zh site indexes were intentionally NOT updated for this task — add this project to the indexes in a follow-up if/when requested.
