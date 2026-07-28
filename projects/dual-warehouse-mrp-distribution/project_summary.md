# Project Summary — Dual-Warehouse Make-to-Order Distribution

## Business Context

Odoo 18 customization for a distributor-style make-to-order operation that runs sales into manufacturing (`sale_mrp`), keeps dual-warehouse forecast visibility on products, and routes purchase receipts to one of two warehouse operation types (local vs regional/partner). Light assembly / packing is in scope; this is **not** a heavy CNC or secondary-process shop floor flyer (contrast `precision-cnc-manufacturing` and `secondary-process-manufacturing`).

**Source repos (duplicate custom code — one flyer covers both):**
- `/Users/shawn/PycharmProjects/Odoo Sh Projects/rising`
- `/Users/shawn/PycharmProjects/Odoo Sh Projects/risingtech`

Client / entity brand names from those repos must **not** appear on HTML or `flyer_content.md`. In marketing copy, dual stock entities are described generically as **local warehouse** and **regional/partner warehouse**. Source folder and module names may be mentioned only in this summary for traceability.

**Audience:** Distributor sales desks, purchasing, warehouse/planning, and light MRP supervisors.

## Standard Odoo Apps Used

- **Sales** — Quotations, sales orders, customer references, line item numbers
- **Purchase** — POs, supplier acknowledgement, delivery-date confirmation, shortage dates
- **Inventory** — Dual-warehouse forecasts, receipt operation types, MFG lot on moves
- **Manufacturing (MRP)** — MOs from sales (`sale_mrp`), BOM remarks, SO customer on MO
- **Accounting** — Invoicing; partner Incoterms for PO; cost/price visibility
- **Contacts** — Partner Incoterms for purchase

## Custom Modules (Core Solution)

### rising_operation / equivalent in risingtech
Core operational layer (`depends`: `purchase`, `base`, `sale_stock`, `sale_mrp`):

- **Sale → MRP:** MO shows SO customer (`so_partner_id`) and SO customer reference (`so_client_order_ref`); BOM remarks (`remarks.line`) flow onto production; MFG Lot on stock moves / production context.
- **Dual warehouse forecasts:** Two forecast quantity columns on product template/variant (hard-coded warehouse IDs in source), plus warehouse-scoped forecast report actions.
- **Purchase confirm wizard:** On PO confirm, wizard routes receipts to one of two warehouse receipt operation types (local vs regional/partner).
- **Product identity:** Product code (sequence for storable products), alternative product codes 1/2/3, supplier COO (`country_id` on `product.supplierinfo`).
- **Sales history:** Analytical SQL view `sale.history.report` — delivered / invoiced / to invoice quantities by order line.
- **Purchase ops fields:** Supplier acknowledge status, delivery date confirmation (Yes/TBA), ERP shortage date, remarks, line item numbers (propagated to stock moves).
- **Partner Incoterms:** `incoterm_id` on partner defaults onto PO.

### rising_print / equivalent
Branded PO and MRP production print layouts (company header/paper format, purchase order and manufacturing reports).

### ac_stock_price_cost_visibility
Restricts list price / cost visibility by role (sales vs accounting/inventory).

## Supporting / Third-Party Modules

- **oi_login_as** — Admin impersonation (ops tooling; not flyer-facing)
- **OCA stock_no_negative** — Prevents negative stock on pickings
- **OCA web_chatter_position / web_environment_ribbon** — Internal/dev UX only; excluded from flyer
- **rising_migration_17_18** — Migration helpers; not marketed

## End-to-End Workflow

1. **Confirm sale** — Sales order confirmed; customer reference and item numbers carried into procurement
2. **Trigger MRP** — Manufacturing order shows SO customer and customer reference; BOM remarks available on the MO
3. **Route receipt** — On PO confirm, choose local or regional/partner warehouse receipt type
4. **Assemble / pack** — Light MTO production with MFG lot on production/stock moves
5. **Deliver & invoice** — Deliver against SO; sales history tracks delivered / invoiced / to invoice

## Key Differentiators (Verified in Code)

- Dual-column warehouse forecast quantities on products (local vs regional/partner)
- PO confirm wizard that sets receipt picking type before confirmation
- MO linked display of SO customer and customer reference (`sale_mrp` chain)
- BOM revision/remarks lines and MFG Lot on stock moves
- Alt product codes (1/2/3) + product code + supplier country of origin
- Sales history analytical list (delivered / invoiced / qty to invoice)
- Supplier ack, delivery-date confirmation, ERP shortage date, PO remarks, item numbers
- Partner-default Incoterms on purchase orders
- Branded PO and MRP print layouts
- Role-based cost/price visibility

## What We Do NOT Claim

- Client brand or legal entity names from the source repos on the marketing flyer
- Heavy CNC machining, tooling libraries, or secondary-process routings (those are other flyers)
- eCommerce / website storefront
- Multi-company intercompany accounting beyond dual warehouse stock entities

## Flyer Output

- **Slug:** `dual-warehouse-mrp-distribution`
- **Title (EN):** Dual-Warehouse Make-to-Order Distribution
- **Title (ZH):** 双仓按单生产分销运营
- **Integrations shown:** Sales, Purchase, Inventory, Manufacturing, Accounting, Contacts (6 apps, matching pharmaceutical-trading shell)
- **Hero image:** AI-generated warehouse + light packing/assembly photo (no embedded brands/text)
- **Indexes:** Not updated (per explicit user instruction)
