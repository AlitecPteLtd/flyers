# Project Summary — Automotive Parts & Service Network

## Business Context

Odoo 18 customization for a multi-store automotive parts distributor with field service / parts maintenance (SPM). The solution combines a heavy NAV-style product master (part group, posting groups, service item group, item group/type, model, brand, HS/tariff), warranty dates on serialised equipment, FSM worksheets/checklists, SPM XLSX reporting (national store #, technician, serial, equipment model, brand, parts replaced), Japan HQ inventory consolidation, Sales vs COGS reconciliation, revenue/COGS export, invoice COGS tab, inventory valuation, Malaysia tax line report, digital sign / PDF forms, sale order types with sequences, landed costs with GRN transfer filtering, price history, and helpdesk with SLA times.

**Source repo:** `/Users/shawn/PycharmProjects/Odoo Sh Projects/nkr-continental` (Odoo 18). Client brand names from the source path/modules are documented here only — they must not appear on flyer HTML or `flyer_content.md`.

**Audience:** Parts master/data teams, store operations, field technicians, finance (margin/COGS), and HQ inventory/reporting.

## Standard Odoo Apps Used

- **Sales** — Quotations, SO, sale order types, price history
- **Purchase** — PO, purchase order types, sequences
- **Inventory** — Stock, GRN, landed costs, valuation
- **Accounting** — Invoicing, COGS entries, tax line reporting
- **Field Service / Project** — FSM tasks, worksheets, SPM jobs
- **Helpdesk** — Tickets with incident/response/resolution (SLA) times
- **Sign / PDF forms** — Digital signature and PDF form capture (add-on)

## Custom Modules (Core Solution)

### nkr_my_master
Core master and operations: NAV-style `product.template` fields (part group, gen product posting group, service item group, item group/type, model, tariff/HS); brand master; warranty start/end on lots; FSM task onsite equipment (brand, model, serial, warranty); helpdesk brand; landed cost `include_grn_transfer`; sale/purchase HS and location; partner franchisee/region taxonomy; aging report tweaks.

### nkr_worksheet_form_template
FSM worksheet form templates with checklist lines, equipment status/type, service type, and serial reference masters.

### nkr_spm_report
SPM XLSX: one row per sale order with national store #, technician, serial, equipment model, brand, parts replaced, and SLA-related timestamps (incident/responded/resolution).

### nkr_sales_cogs_compare
NAV-style Sales vs COGS reconciliation with stronger invoice, delivery (DO), and stock/GRN origin matching.

### nkr_revenue_cogs_report
Date-range XLSX export of revenue and COGS by sale order (P&L summary, Revenue, COGS sheets).

### nkr_invoice_cogs_tab
COGS Entries tab on customer invoices; generate related COGS journal entries on demand.

### nkr_reporting / nkr_consolidated_report
Japan HQ inventory consolidation — quantities, valuation, purchases, movements, manufacturing output across companies.

### nkr_inventory_valuation_report
Opening / increases / decreases / closing inventory valuation by product for a date range (XLSX).

### ac_tax_line_report
Malaysia tax line report (tax amount and base for journal items).

### sale_order_type_invoice_sequence / purchase_order_type_sequence
Sale and purchase order types drive dedicated invoice/document sequences.

### sale_order_line_price_history
Wizard to review and apply historical sale prices for a partner/product.

### Supporting / add-on
- **just_digital_sign / just_pdfform / pdf_form_config** — Digital sign and PDF form capture
- **nkr_print** — Branded document layouts (MY EDI / statement extensions)
- **product_category_code**, **OCA sale_order_type**, **stock_landed_costs**, **report_xlsx**

## End-to-End Workflow

1. **Master parts** — Classify parts with brand, model, posting groups, and HS/tariff.
2. **Sell / stock** — Sell across the store network; receive with landed cost and GRN transfer filter.
3. **Service order** — Open SPM service order for national store and equipment.
4. **FSM task → parts replace** — Run FSM checklist; capture serial, warranty, and parts replaced.
5. **Invoice → SPM/HQ reports** — Invoice with COGS tab; export SPM, Sales vs COGS, revenue/COGS, and HQ inventory.

## Key Differentiators (Verified in Code)

- NAV-style parts taxonomy (part/posting/service/item group/type + brand/model + HS/tariff)
- Warranty dates on serialised equipment linked to FSM onsite lines
- FSM worksheet checklists via form templates
- SPM XLSX with national store #, technician, serial, model, brand, parts replaced
- NAV-style Sales vs COGS reconciliation
- Revenue/COGS and inventory valuation XLSX exports
- Invoice COGS tab with on-demand journal entries
- HQ multi-company inventory consolidation reporting
- Landed cost GRN transfer filter
- Order-type driven sequences; price history; helpdesk SLA timestamps; digital sign/PDF forms

## What We Do NOT Claim

- Client brand names (source folder/module prefixes) on flyer HTML or `flyer_content.md`
- Consumer eCommerce / website storefront
- POS retail checkout as the primary channel (this is distributor + field service)
- Full APS / route optimisation for technicians

## Flyer Output

- **Slug:** `automotive-parts-service-network`
- **EN title:** Automotive Parts & Service Network
- **ZH title:** 汽车配件与服务网络运营
- **Subtitle (EN):** Parts mastery, store network service, and HQ margin visibility
- **Integrations shown:** Sales, Purchase, Inventory, Accounting, Field Service, Helpdesk, Project, Sign / PDF (8 apps)
- **Hero image:** AI-generated automotive parts warehouse / service bay (no brand logos/text)
- **Indexes:** Not updated (per explicit user instruction)
