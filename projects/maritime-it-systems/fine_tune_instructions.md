# Fine-Tune Instructions — Maritime IT Systems Sales & Lease

## Build Notes

- Shell/CSS copied from `projects/pharmaceutical-trading/` (A4 1024×1448, hero/fade/curve, editor toolbar). Integration row restored to **8 apps** (Sales, CRM, Purchase, Inventory, Project, Accounting, HR, Website) with stainless-style circle sizes (`54×44`, `repeat(8, 1fr)`).
- Shared assets copied from pharmaceutical-trading: `alitec-logo.jpeg`, `odoo-gold-partner.png`, `fontawesome/`, `webfonts/`.
- Hero image: AI-generated ship bridge / marine IT rack photo — no logos, brand names, or readable UI text. Stored at `maritime-it-systems-assets/maritime-it-systems-hero.png`.
- Editor script: `../../editor/flyer-editor.js?v=20260715-pdf-canvas-1` with `data-flyer-version="2026-07-28-maritime-it-systems-v1"`.
- **Brand exclusion:** Client/vendor names from the source repo must never appear on HTML or `flyer_content.md`. Source path is documented only in `project_summary.md`.
- **Indexes intentionally NOT updated** (root / en / zh left untouched per user request).

## Differentiation From storage-rental-business

| Topic | This flyer (`maritime-it-systems`) | `storage-rental-business` |
|-------|------------------------------------|---------------------------|
| Asset | Vessel/port IT equipment | Self-storage units |
| Mode | Sell **or** lease equipment on SO lines | Unit rental occupancy |
| Warehouse | Lease warehouse transfers + returns | Storage location occupancy |
| Docs | Packing list, commercial/overseas invoice, HS/origin | Storage contracts / invoices |

## Content Fidelity Notes

Derived from `/Users/shawn/PycharmProjects/Odoo Sh Projects/precision-infocomm`:

- Dual trade mode + lease warehouse/balance → `precision_operation` `sale.py` / `stock.py`
- Vessel + forwarder → `stock.picking` / `account.move` fields
- Custom DO / invoice lines + HS + origin → `custom.move.line`, `account.move.line.custom`, product HS/origin
- Print suite → `precision_print` reports (packing list, commercial/overseas invoice, credit note, vouchers)
- CRM quotation templates → `crm_quotation_template_*` + `order_content`
- Solution task templates → `project.py` content mixins (flyer uses generic marine network / VoIP / CCTV / port IT / cybersecurity labels)
- Agents, partner restrictions, price/cost visibility → `hr.employee` agents, partner domains, `ac_stock_price_cost_visibility`
- Website SSO → `others/odoo_website_sso` (light mention only)

Dashboard numbers are illustrative placeholders for visual balance, consistent with other flyers in this repo.

## Export / QA Status

- Not yet browser-exported to PDF/PNG in this session. Recommend local HTTP server from repo root and toolbar PDF/PNG checks on both language pages before publish.
- Spot-check hero for accidental AI pseudo-text on rack labels.

## Open Items

- Add index cards when the user wants the project discoverable from site navigation.
- Optional: regenerate hero if a clearer vessel-bridge vs rack composition is preferred.
