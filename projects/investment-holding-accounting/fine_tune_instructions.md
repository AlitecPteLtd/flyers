# Fine-Tune Instructions — Investment Holding Accounting

## Open Items

- Hero image is a generated finance/treasury office photo; swap for client-approved photography if needed.
- Source repo's `oca` and `others` addon folders were not inspected for this flyer; only `custom` modules
  are represented in the claims.
- Dashboard KPI numbers (18 deposits, 27 investments, currency mix, etc.) are illustrative placeholders,
  not live client data — confirm with the account team before any client-specific use.

## Naming / Confidentiality Rule

- The source client/module family name must **never** appear on the flyer, in visible copy, or in these
  notes beyond the source-path citation in `project_summary.md`. All public-facing text uses generic
  "Alitec investment holding accounting solution" language only.

## Visual Tuning Notes

- Layout cloned from the `housewares-retail` modern A4 template (shared CSS structure, section
  order, and editor script wiring).
- Left hero fade must keep title/intro/quick benefits readable over the finance office photo; hero image
  object-position tuned to `62% 30%` to keep the main subject visible on the right without pushing into the
  fade zone.
- Prefer shorter capability descriptions if two-line titles collide with body text at 100% zoom.
- Dashboard KPIs and charts are illustrative — not live data.

## Export Test Notes

- Serve via local HTTP (not `file://`) when testing PDF/PNG export.
- Shared editor script: `../../editor/flyer-editor.js?v=20260715-pdf-canvas-1`
- Charts use inline SVG donut/line (export-safe); avoid CSS conic-gradient.
- Verify Font Awesome icons and the hero PNG load correctly under
  `investment-holding-accounting-assets/`.

## User-Specific Instructions

- Industry framing: investment holding / treasury accounting (user-provided).
- Content scope confirmed by user: time deposits, investment holdings, marketable securities FV, share
  capital/registry, multi-currency balances/revaluation, related parties, payment-on-behalf, finance print
  pack (8 items — mapped 1:1 to the 8 key-capability cards).
- Integration row must include Accounting, Assets, Analytic, Payments, Reports (user-specified) plus
  Contacts, Multi-Currency and Printing to fill the standard 8-app grid.
- 4 quick-benefit cards, 8 capability cards, workflow + dashboard two-panel section, integrations row, and
  4 business-benefit cards — matches the `housewares-retail` structure exactly.
- No root/en/zh index updates requested or made for this project; only the project folder was created.
