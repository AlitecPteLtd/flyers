# Fine-Tune Instructions — Air-Conditioning Service Operations

## Open Items

- Hero image (`air-conditioning-hero.png`) is a generated HVAC technician/service lifestyle photo; swap for client-approved photography if needed.
- Dashboard KPIs (appointments, worksheets, chits, commission splits) are illustrative, not live data.
- Confirm whether "Field Service" or "Project" is the preferred integration label depending on how the sales team positions the Worksheet app.

## Visual Tuning Notes

- Layout and CSS cloned exactly from `housewares-retail/index.html` (A4 portrait, 1024×1448, same hero/fade/curve/panels/dashboard/integration/benefit structure).
- Left hero fade must keep title/intro/quick benefits readable over the technician/hero photo.
- Icon color rotation on the 8-capability grid follows the same default→orange→purple→default→green→orange→purple→default pattern as the reference flyer.
- Chinese version (`index-zh.html`) keeps CSS byte-identical to the English version — only text content, `lang`, `title`, and nav active state differ (verified via diff).

## Export Test Notes

- Serve via local HTTP (not `file://`) when testing PDF/PNG export: `python3 -m http.server 8765` from the repo root, then open `http://127.0.0.1:8765/projects/air-conditioning/`.
- Shared editor script: `../../editor/flyer-editor.js?v=20260715-pdf-canvas-1`.
- Charts use inline SVG donut/line (export-safe); avoid CSS conic-gradient.
- Verified with a full-page Playwright screenshot at 1024×1448 for both `index.html` and `index-zh.html`: hero readable, cards/badges centered, no clipped text, charts/icons render, business-benefits bar does not overlap the footer.
- Verify Font Awesome icons and hero PNG load under `air-conditioning-assets/`.

## User-Specific Instructions

- Industry framing: air-conditioning (HVAC) field service, quotation through worksheets, delivery and invoicing (user-provided).
- Do not put the client brand "Euconair" / "EAS" (or bizSAFE certification logos) on public flyer copy or `flyer_content.md`.
- Do not claim CRM/lead pipeline, website/portal booking, GPS/technician location tracking, or MRP/manufacturing — the source modules do not include these.
- Verified content anchors: service site/appointment fields on tasks, SO-confirm → project/task + analytic automation, FSM worksheet with HVAC checklist (filters/fan/motor), service chit PDF with photos and signatures, drag-and-drop worksheet images, commission-by-resource reporting, branded documents, and role-based price/cost visibility.
- Indexes (`index.html`, `en/index.html`, `zh/index.html`) were intentionally **not** updated for this task — add links separately if/when requested.
