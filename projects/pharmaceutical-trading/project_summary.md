# Project Summary — Pharmaceutical Trading Operations

## Business Context

Odoo 19 customization for a pharmaceutical trading/distribution business selling to hospitals, pharmacy chains, and clinics under blanket/GPO agreements. The solution combines contracted-quantity sales agreements, controlled/poison stock compliance, lot lock and expiry control, pharmacist e-signature capture on regulated documents, free-of-charge (FOC) sales classification, configurable smart alerts with approval gating, printing-UoM invoicing, and follow-up/statement of account collections.

**Source repo:** `/Users/shawn/PycharmProjects/Odoo Sh Projects/md-pharma` (no client name referenced anywhere in the flyer; all copy is generic "pharmaceutical distributors" / "pharma operations").

**Audience:** Pharma distributor sales desks, warehouse/pharmacist staff, compliance/QA, and accounts receivable teams.

## Standard Odoo Apps Used

- **Sales** — Quotations, sales orders, blanket/GPO agreements
- **Purchase** — Purchase orders, director sign-off on POs
- **Inventory** — Stock moves, lot/serial tracking, expiry, poison stock
- **Accounting** — Invoicing, printing-UoM amounts, cost/price visibility
- **Follow-up** — Statement of account, activity/outstanding/detailed statements
- **HR** — Pharmacist/director employee flags and e-signature storage

## Custom Modules (Core Solution)

### md_sale_blanket_order
`sales.requisition` model for Blanket Order / Sale Template agreements with GPO number, date range, and per-line contracted/ordered/delivered/invoiced/balanced quantities. Clickable quantity widgets drill from the agreement into related sales orders, deliveries, and invoices. On confirmation, generates customer-specific product price records.

### md_master
Base pharma master data: `product.template.poison` (Yes/No) classification, sales-employee model and security, and partner/product view extensions.

### md_operation
Core operational logic: `stock.lot.lock_state` (locked/unlocked) excluding locked lots from stock reservation; poison stock move report wizard and view; `foc` sales type (Sales/Bonus/Sample/Exchange) with automatic zero pricing for non-sales lines; pharmacist/director e-signature capture on stock pickings, invoices, and purchase orders; `smart.warning`-driven document alerts with `is_approved` gating for danger/warning severities; `printing_uom_id` and printing amounts distinct from operational stock UoM; sales employee gross-profit reporting from invoices; scheduled jobs for rolling alert domains.

### md_print
Branded report layouts: poison stock report ("POISONS STOCK REPORT"), invoice and PO reports with printing UoM/amounts and pharmacist/director signatures, sale order confirmation (with extra page when poison lines present), delivery slip, follow-up report (adds customer reference column), and extended outstanding statement of account.

### ac_stock_price_cost_visibility
Restricts `list_price` visibility to sales/invoicing roles and `standard_price` (cost) visibility to accounting/inventory managers.

## Supporting / Third-Party Modules

- **sh_product_customer_code** — Customer-specific product codes/names printed on sales and invoice documents
- **product_import** — Bulk product image import by URL/path
- **smart_warnings** — Configurable model+domain document alerts with severity levels
- **oi_login_as** — Admin impersonation (ops tooling, not flyer-facing)
- **OCA partner_statement / report_xlsx** — Activity, outstanding, and detailed statements of account (PDF + XLSX)
- **OCA stock_no_negative** — Prevents negative stock on pickings
- **OCA web_chatter_position / web_environment_ribbon** — Present in repo; internal/dev UX only, excluded from flyer

## End-to-End Workflow

1. **Set contract** — Blanket or GPO agreement fixes contracted quantity and price for a hospital/pharmacy account
2. **Confirm & alert** — Sales order is confirmed; configurable smart alerts require approval before proceeding when severity is high
3. **Pick & sign** — Warehouse picks stock; pharmacist e-signs the delivery document
4. **Controlled dispatch** — Poison/controlled stock movement is logged; locked or expiring lots are blocked from shipping
5. **Invoice & follow-up** — Invoice prints with customer packing UoM and amounts; statements of account chase overdue balances

## Key Differentiators (Verified in Code)

- Blanket/GPO sales agreements with contracted-quantity tracking and drill-down to orders/deliveries/invoices
- Poison/controlled product classification with regulated stock movement reporting
- Lot lock state that removes suspect/expired batches from stock reservation
- Pharmacist and director e-signature capture on deliveries, invoices, and purchase orders
- FOC sales type (Bonus/Sample/Exchange) held at zero value, separated from paid sales
- Configurable smart alerts with mandatory approval before confirming or shipping
- Printing UoM and printing amounts independent from warehouse stock units
- Follow-up and statement of account reporting (activity/outstanding/detailed, PDF + XLSX)

## What We Do NOT Claim

- Client brand name (source repo name) anywhere on the marketing flyer
- Manufacturing/MRP
- eCommerce / website storefront
- POS retail (this is a B2B distribution flow, not shop-floor retail)
- Multi-warehouse routing beyond standard Odoo Inventory

## Flyer Output

- **Slug:** `pharmaceutical-trading`
- **Title:** Pharmaceutical Trading Operations
- **Subtitle:** Controlled Stock, Blanket Contracts & Compliant Order-to-Cash for Pharma Distributors
- **Integrations shown:** Sales, Purchase, Inventory, Accounting, Follow-up, HR (6 apps, per request — not the usual 8-app row)
- **Hero image:** AI-generated pharma warehouse/pharmacist photo (no embedded text), stored in `pharmaceutical-trading-assets/`
- **Indexes:** Not updated (excluded per explicit user instruction — root/en/zh indexes untouched)
