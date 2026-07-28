# Project Summary — Consumer Hardgoods & Sourcing

## Business Context

Odoo customization for a China/Asia sourcing agency that buys and ships consumer hardgoods (home appliances and promotional/gift products) for overseas retail and wholesale customers. The platform runs two order modes side by side — **Agent** (commission-based buying agency) and **Trade** (principal buy-sell) — inside standard Sales, Purchase, Inventory, and Accounting. Merchandising is organized by Sector/Family/Sub-Family with partner SKU and season mapping, production is gated through PPS/PPT/PSI/OK QA quality checkpoints, ocean freight is tracked from loading port through ETD, and factories are screened for social, technical, and environmental compliance including FSC and EUDR.

**Source repo:** `/Users/shawn/PycharmProjects/Odoo Sh Projects/cn_genery` (custom modules: `gs_master`, `gs_operation`, `gs_audit_compliance`, `gs_print`, plus `ac_operation`, `ac_print`, `ac_stock_price_cost_visibility`)

**Audience:** Sourcing/merchandising teams, QA/quality controllers, logistics/shipping desk, compliance/audit team, and finance (commission invoicing).

## Standard Odoo Apps Used

- **Sales** — Agent/Trade order modes, commission lines, merchandising fields, QA gates, logistics fields on order lines
- **Purchase** — Supplier-side ordering for trade/agent sourcing
- **Inventory** — Deliveries, container/ETD fields carried to stock picking
- **Accounting** — Client and supplier commission invoicing
- **Contacts** — Factory/vendor audit register, vendor status, short names

## Custom Modules (Core Solution)

### gs_master
Master data for the sourcing/trading taxonomy: Sector, Family, Sub-Family, Milestone, Season, Buyer, Transit Type, Warehouse Short Name, Country Port, Forwarder, and Delay Reasons.

### gs_operation
Core business logic on `sale.order` / `sale.order.line`: Agent vs Trade order mode, dual client/supplier commission computation ("Commission Compute" / "Refresh"), merchandising fields (sector/family/sub-family, partner SKU, season, promo type), production QA gate fields (PPS, artwork, PPT, PSI, PST, FCT status and pass/fail/capped results, OK QA actual date), ocean logistics fields (loading/discharge port, origin country, transit type, FCL/LCL, container type/qty, forwarder, ETD target/forecast/actual, ETA warehouse), computed shipment milestones (Failed → Alert → Processing → OK QA → SO Released → Loaded → Shipped → Cancelled → Commission), delay reason tracking (internal/external cause codes), vendor status (active/inactive/blacklist) on partners, and hardgoods product attributes (material, colour, dimensions, carton size, unit/inner/master carton quantities, HS code, after-sales service level).

### gs_audit_compliance
Factory Audit page on `res.partner`: social, technical, and environmental audit type/result/date/validity with computed status (valid / about-to-expire / expired), FSC flags (supplier and factory) with expiry dates, and EUDR compliance tracking (need flag, EUDR action, comments).

### gs_print
Print layout adjustments for invoices tied to the sourcing/trading process.

### ac_operation / ac_print / ac_stock_price_cost_visibility
Supporting operational modules: general operations helpers, branded document layouts (quotation, purchase order, delivery note, invoice, credit note, payment/journal voucher), and stock price/cost visibility controls.

## End-to-End Workflow

1. **Order & mode** — Sales books the order as Agent (commission) or Trade (principal); agent mode requires a client commission line before confirmation
2. **Merchandise & confirm** — Order lines tagged with sector/family/sub-family, partner SKU, and season, then confirmed
3. **Production & QA** — PPS, artwork, PPT, and PSI checkpoints tracked with pass/fail/capped results through to the OK QA milestone
4. **Load & ship** — Container loaded and packed, SO released, ETD tracked from target to actual/forecast through to shipped
5. **Invoice & report** — Client and supplier commission computed and invoiced; delay reasons and milestone analytics reported on `sale.report`

## Key Differentiators (Verified in Code)

- Dual order mode (Agent commission vs Trade principal) enforced at sale order confirmation
- Automated dual commission computation for both client and supplier sides
- Sector/Family/Sub-Family merchandising taxonomy with partner SKU and season mapping
- Multi-stage QA gate (PPS, artwork, PPT, PSI, PST, FCT) feeding a computed shipment milestone pipeline
- Ocean logistics fields (port, FCL/LCL, container, forwarder, ETD target vs actual) on sale order and carried to delivery
- Factory compliance register: social/technical/environmental audits plus FSC and EUDR flags
- Structured internal/external delay reason codes rolling up to service-level reporting
- Hardgoods-specific product attributes (material, colour, dimensions, carton specs, HS code)

## What We Do NOT Claim

- Client/source repo name or brand (kept off all flyer copy per instruction)
- eCommerce / website storefront
- Point of Sale (POS)
- Manufacturing / MES / shop-floor execution
- Apparel-specific attributes (size curves, fabric, garment specs) — hardgoods only

## Flyer Output

- **Slug:** `consumer-hardgoods-and-sourcing`
- **Title:** Consumer Hardgoods & Sourcing
- **Subtitle:** Agent and Trade Modes — Merchandising, Factory Audits, QA Gates & Ocean Logistics with Odoo
