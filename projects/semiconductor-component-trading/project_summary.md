# Project Summary — Semiconductor Component Trading

## Business Context

Odoo 18 customization for a semiconductor/electronics component distributor serving fab and electronics customers. The solution covers manufacturer + MPN product masters (with material/size), markup%→list price, customer part-number templates on SO/DO/invoice lines, partner FAB + Incoterms, a commercial invoice model with HS Code + Country of Origin, purchase types, director approval on invoices, budget-linked purchasing, branded print layouts, purchase/sale T&C PDF merge, and scrap/inventory helpers.

**Source repo:** `/Users/shawn/PycharmProjects/Odoo Sh Projects/mi-sg` (client brand names are source-path only; never used on flyer HTML or `flyer_content.md`).

**Audience:** Component trading sales desks, purchasing, warehouse/shipping, finance/commercial invoice teams, and directors approving invoices.

## Standard Odoo Apps Used

- **Sales** — Quotations, sales orders, customer part templates, FAB context
- **Purchase** — Purchase orders, purchase types, budget overrun flags, T&C merge
- **Inventory** — Deliveries with CPN, scrap reasons, inventory adjustments, serial/lot helpers
- **Accounting** — Customer invoices, director approval, commercial invoice linkage
- **Budget** — Analytic budget lines linked to purchasing
- **Approvals** — Director invoice/commercial-invoice approval gates (plus OCA tier validation modules present in repo)

## Custom Modules (Core Solution)

### misg_operation
Core trading operations: `product.manufacturer` / material / size masters; product `manufacturer_part_number`, `markup` → computed `list_price`; `customer.part.number` templates applied to SO/picking/invoice lines as HTML CPN text; `fab.fab` master with partner FAB tagging and Incoterm defaults; SO fields (RFQ date, lead time, project title, revision, attention); `purchase.type` on POs; analytic account context on sale/purchase/picking; serial/lot Many2many helpers on lines; director approval fields on `account.move`.

### misg_commercial_invoice
Dedicated `commercial.invoice` / `commercial.invoice.line` model with HS Code, Country of Origin, Incoterms, shipper/shipping partner, SO/PO references, CPN text, and director approval before print. Created/linked from pickings and purchase orders; branded commercial invoice report.

### misg_print
Branded report layouts for sale order, purchase order, delivery slip, invoice, payment receipt, product labels, location barcodes, and related paper formats — depends on commercial invoice and operation modules.

### purchase_qweb_merge_pdf
Merges company purchase and sale Terms & Conditions PDFs into PO and selected SO report output (configurable binary attachments per company / language).

### misg_account_budget
Extends budget lines and purchase order lines to flag `it_is_above_budget` when committed + uncommitted amounts exceed budget; visual danger decoration on PO lines.

### misg_employee
HR employee view/rule extensions (supporting org context; not a flyer headline feature).

## Supporting / Third-Party Modules (Flyer-Relevant)

- **bi_scrap_reason** — Scrap reason capture
- **ak_inventory_adjustments** — Inventory adjustment helpers
- **order_line_sequences** — Line numbering on documents
- **bi_multi_product_selection** — Multi-product picking helpers
- **OCA base_tier_validation / sale_tier_validation / purchase_tier_validation / account_move_tier_validation** — Tier approval framework present in repo
- **OCA stock_no_negative / stock_inventory / partner_statement / report_xlsx** — Stock and reporting utilities
- **smart_warnings** — Configurable document warnings (ops tooling)

## End-to-End Workflow

1. **Enquire** — Fab enquiry captured with RFQ date, lead time, and project title
2. **Quote MPN / CPN** — Quotation lines show manufacturer MPN and customer part mapping
3. **Confirm SO** — Sales order confirmed with FAB, Incoterms, and analytic context
4. **Deliver with CPN** — Delivery lines carry customer part numbers for fab receiving
5. **Invoice & Collect** — Commercial invoice with HS/COO; director approval then collection

## Key Differentiators (Verified in Code)

- Manufacturer + MPN (+ material/size) product masters for component catalogues
- Markup % drives stored list price from standard cost
- Customer part-number templates flow to SO, DO, and invoice lines
- Partner FAB tagging and Incoterm defaults
- Commercial invoice model with HS Code and Country of Origin
- Director approval gate on commercial invoices and account moves
- Purchase types and budget overrun highlighting on PO lines
- Branded prints plus purchase/sale T&C PDF merge

## What We Do NOT Claim

- Client brand names (source folder / module prefixes) on flyer HTML or `flyer_content.md`
- Manufacturing / MRP / shop-floor production (this is trading/distribution)
- eCommerce / website storefront
- POS retail

## Flyer Output

- **Slug:** `semiconductor-component-trading`
- **Title (EN):** Semiconductor Component Trading
- **Title (ZH):** 半导体元器件贸易运营
- **Subtitle (EN):** Part-number accuracy from fab enquiry to commercial invoice
- **Integrations shown:** Sales, Purchase, Inventory, Accounting, Budget, Approvals (6 apps, matching pharmaceutical-trading template layout)
- **Hero image:** AI-generated electronics warehouse / component trays photo (no embedded text), stored in `semiconductor-component-trading-assets/`
- **Indexes:** Not updated (excluded per explicit user instruction — root/en/zh indexes untouched)
