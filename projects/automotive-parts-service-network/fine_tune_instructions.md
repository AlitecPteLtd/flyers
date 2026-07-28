# Fine-Tune Instructions — Automotive Parts & Service Network

## Build Notes

- Shell/CSS copied from `projects/pharmaceutical-trading/` (A4 1024×1448, hero fade/curve, panels, editor wiring).
- Shared assets copied from pharmaceutical-trading: `alitec-logo.jpeg`, `odoo-gold-partner.png`, `fontawesome/`, `webfonts/`.
- Hero image newly generated (automotive parts warehouse + service bay) — no brand logos or readable text. Stored at `automotive-parts-service-network-assets/automotive-parts-service-network-hero.png`.
- Editor script: `../../editor/flyer-editor.js?v=20260715-pdf-canvas-1` with `data-flyer-version="2026-07-28-auto-parts-svc-v1"`.
- **Client name exclusion:** Client brands must not appear on flyer HTML or `flyer_content.md`. Source path and module evidence live only in `project_summary.md`.
- **Indexes intentionally NOT updated** (root / `en/` / `zh/` untouched per user request).

## Layout Tweaks From Pharma Template

- Integration grid restored to **8 apps** (`repeat(8, 1fr)`, 54×44 circles) — Sales, Purchase, Inventory, Accounting, Field Service, Helpdesk, Project, Sign / PDF.
- H1 font-size reduced slightly (26px) so “Automotive Parts & Service Network” fits the left hero fade zone.
- Hero `object-position` set to `62% center` to favour the service-bay side of the image.
- Donut SVG recomputed for a **64/36** Parts vs Service split (not reused from pharma 82/18).

## Content Fidelity

All capability and workflow claims are grounded in the source custom modules listed in `project_summary.md` (parts master, warranty, FSM worksheets, SPM XLSX, Sales vs COGS, revenue/COGS, invoice COGS tab, HQ consolidation, landed-cost GRN, order-type sequences, price history, helpdesk SLA, digital sign/PDF, MY tax line, inventory valuation).

Dashboard numbers are illustrative placeholders for visual balance (same pattern as other flyers).

## Export / QA Status

- HTML brand-leak check passed (no client names in EN/ZH HTML).
- Browser PDF/PNG export not yet run in this session — recommend `python3 -m http.server` from repo root and test both language pages via the shared editor toolbar before publishing.

## Open Items

- Add index cards when the user wants the project discoverable on the GitHub Pages home/en/zh indexes.
- Spot-check hero at full size for accidental AI pseudo-text on boxes or plates.
