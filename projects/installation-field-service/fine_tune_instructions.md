# Fine-Tune Instructions — Installation Field Service Operations

## Build Notes

- Built from `projects/pharmaceutical-trading/` layout/CSS shell (per explicit request). A4 canvas 1024×1448, hero/fade/curve layers, and shared editor wiring retained.
- Shared assets copied from pharmaceutical-trading: `alitec-logo.jpeg`, `odoo-gold-partner.png`, `fontawesome/`, `webfonts/`.
- Hero image newly generated: technicians installing wall-mounted equipment on site — no brands, no text overlays. Stored at `installation-field-service-assets/installation-field-service-hero.png`.
- Editor script: `../../editor/flyer-editor.js?v=20260715-pdf-canvas-1` with `data-flyer-version="2026-07-28-installation-fsm-v1"`.
- **Client / brand exclusion:** Source repo and payroll module names must not appear on HTML or `flyer_content.md`. `project_summary.md` may reference the source path and internal module folder names for analysis only. Public payroll wording stays generic (“payroll journal sync”).
- **Indexes intentionally NOT updated** (`index.html`, `en/index.html`, `zh/index.html` untouched).

## Layout Deviations From Pharma Template

- **Integrations row restored to 8 apps** (Sales, Field Service, Planning, Project, Inventory, Accounting, Manufacturing, HR) with `repeat(8, 1fr)` and 54×44 circles (stainless/kitchen standard), not pharma’s 6-app row.
- **Workflow steps use 8 tiles in a 4×2 grid** (connector line disabled) to match the full Quote → Payroll Journals sequence. Step boxes slightly smaller than the original 5-step layout.
- `.bar-item` label column set to 78px for team names (Team Alpha / 甲组).

## Differentiation From Sibling Flyers

- vs `air-conditioning`: no HVAC checklist / service-chit story; focus is general installation, installer assignment, team security, Gantt popovers.
- vs `lighting-retail-installation`: no lighting retail / showroom POS angle; this is contractor field ops and installer accountability.

## Content Fidelity Notes

Derived from `/Users/shawn/PycharmProjects/Odoo Sh Projects/pointone` custom modules:

- Appointment window / service customer / job+pricing / Gantt popover → `pointone_operation` task + planning models and assets
- SO overall + line installer, picking installed-by → `pointone_operation` sale/stock models
- Resource team security → `ac_resource_team_security`
- Cost/price visibility → `ac_stock_price_cost_visibility`
- Customer statements / PDF export → `pointone_operation` data XML + OCA partner_statement in repo
- FSM + MRP delivery print → `pointone_print`
- Payroll journals → `pointone_talenox` (generic flyer wording only)

Dashboard numbers are illustrative placeholders for visual balance, consistent with other flyers.

## Export / QA Status

- Not browser-exported to PDF/PNG in this session. Recommend `python3 -m http.server` from repo root and verify both language pages, then toolbar PDF/PNG export before publishing.
- Spot-check hero for accidental readable text on equipment labels (current image is clean).

## Open Items / Possible Follow-Ups

- Add index cards when the user wants the project discoverable on the site.
- If 8-step workflow feels tight on A4 after print proof, compress visual steps to 5 stages while keeping the full sequence in intro/`flyer_content.md`.
- Optional: regenerate hero with a more warehouse-to-site delivery composition if marketing prefers logistics over wall-equipment install.
