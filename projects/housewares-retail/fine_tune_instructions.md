# Fine-Tune Instructions — Housewares Retail

## Open Items

- Hero image is a generated housewares lifestyle photo; swap for client-approved photography if needed.
- Donation OCA modules exist in the source repo but are intentionally excluded from flyer claims.
- Confirm live POS hardware model list (Epson, etc.) if the sales team wants vendor names on the flyer.

## Visual Tuning Notes

- Layout cloned from the industrial-equipment-wholesale modern A4 template.
- Left hero fade must keep title/intro/quick benefits readable over the housewares photo.
- Prefer shorter capability descriptions if two-line titles collide with body text at 100% zoom.
- Dashboard KPIs are illustrative (POS tickets, trade quotes, SOA overdue) — not live data.

## Export Test Notes

- Serve via local HTTP (not `file://`) when testing PDF/PNG export.
- Shared editor script: `../../editor/flyer-editor.js?v=20260715-pdf-canvas-1`
- Charts use inline SVG donut/line (export-safe); avoid CSS conic-gradient.
- Verify Font Awesome icons and hero PNG load under `housewares-retail-assets/`.

## User-Specific Instructions

- Industry framing: housewares / linen retail (user-provided).
- Do not put client brand "Binlin" / "Binlinlinen" on public flyer copy.
- Dual-channel story (POS + trade sales + SOA) is the verified customisation value.
