# Project Summary — Appliance Showroom & Repair

## Business Context

Odoo 11-era customization for a premium appliance showroom retailer with multi-warehouse stock visibility (new ready for sale, project ready, spare-parts ready, gallery, display) and after-sales repair. The flyer focuses on sales, inventory, and repair; Singapore HR leave/payroll modules exist in the source repo but are mentioned only lightly in integrations.

**Source repo:** `/Users/shawn/PycharmProjects/Odoo Sh Projects/smeg11` (path only — do not name the client brand on flyer HTML or `flyer_content.md`).

**Audience:** Showroom sales, warehouse, after-sales/repair workshop, sales managers, and finance/credit control.

## Standard Odoo Apps Used

- **Sales** — Quotations and sales orders (manager confirm gate)
- **Inventory** — Multi-warehouse stock, pickings, scrap, serial/lot
- **Repair** (`mrp_repair`) — Repair orders, parts, fees, invoice before/after
- **Accounting** — Invoicing, scrap accounting value, stock valuation moves
- **HR** — Employee assignment on repair; SG leave/payroll modules present but not flyer-primary
- **Contacts** — Partners, delivery addresses, credit limit / lock flags

## Custom Modules (Core Solution)

### Core customisation module (sales / inventory / repair)
- Multi-product repair via `mrp.repair.item` (first line syncs to standard repair product)
- Staff assignment (`staff_id`) and repair date window (`repair_date` / `repair_end`)
- Service type: Retail Service / Project Service
- Product warehouse buckets: NEW Ready, PROJ Ready, SP Ready, Gallery Sales, Display Set
- Sales order line `delivered_cost` (actual delivery cost from related stock moves; sales manager group)
- Scrap `scrap_value` (accounting value from related account moves)
- Warehouse picking actions regrouped by warehouse; internal transfer approval for non-managers
- Partner `locked` flag; repair delivery address unconstrained; serial mandatory option on repair lines
- Sale confirm limited to sales managers (server action / group gate described in manifest)

### Report customisation module
- Stock usage report (`stock.usage`) with usage lines
- Aged partner balance invoice-ref extensions

## Supporting Modules (featured lightly)

- **inventory_ageing_report** / **product_ageing_report** — Inventory and product ageing
- **inventory_serial_import** — Bulk serial number import
- **partner_credit_limit** — Partner credit limit warnings on sales
- **stock_no_negative** — Prevent negative stock on pickings
- SG HR suite (`l10n_sg_hr_payroll`, leave/holiday modules, etc.) — present in repo; not primary flyer story

## End-to-End Workflow

1. **Sell / Showroom** — Quote from catalogue with ready-to-sell quantities by warehouse bucket
2. **Reserve stock** — Confirm (sales manager) and reserve from the correct warehouse
3. **Deliver** — Outgoing pickings; delivery cost visible on SO lines for margin review
4. **Repair intake** — Multi-item repair order with service type, staff, and date window
5. **Parts / ops** — Add parts (SP warehouse default), operations/fees, serial where required
6. **Invoice** — Invoice before or after repair (warning when invoicing before repair)
7. **Report** — Stock usage, inventory/product ageing, scrap valuation, credit control

## Key Differentiators (Verified in Code)

- Multi-warehouse ready-to-sell fields on product (NEW / PROJ / SP / Gallery / Display)
- Multi-product repair orders with warranty status and issue description per item
- Staff + repair time window on every job
- Retail vs project service type routing
- Delivery cost on sales lines for margin-safe confirm
- Scrap accounting value on scrap records
- Stock usage and ageing reports; serial import; partner credit limit

## What We Do NOT Claim

- Client brand name on flyer HTML or `flyer_content.md`
- eCommerce / POS as primary channels
- Manufacturing/MRP beyond repair stock moves
- Deep HR/payroll as a selling point (modules exist; flyer stays sales + inventory + repair)

## Flyer Output

- **Slug:** `appliance-showroom-repair`
- **Title (EN):** Appliance Showroom & Repair
- **Title (ZH):** 电器展厅与维修
- **Subtitle (EN):** Showroom stock clarity with workshop-ready repair control
- **Hero image:** AI-generated appliance showroom / service bench (no brand logos or readable UI text)
- **Indexes:** Not updated (per explicit user instruction)
