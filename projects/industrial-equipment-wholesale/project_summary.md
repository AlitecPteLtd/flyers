# Project Summary — Industrial Equipment Wholesale

## Business Context

Odoo 13 B2B wholesale platform for industrial/automation equipment distribution. Covers portal/API order sync, model and part-number product catalog, SO-to-PO procurement, stock visibility on sales, delivery modes, package-aware GST invoicing, and landed cost accounting.

**Source repo:** `020-scigate` (read-only input — not used as flyer folder name)

## Standard Odoo Apps Used

- **Sales** — Quotations, SO, delivery, customer PO references
- **Purchase** — Vendor PO, receipts, deposits
- **Inventory** — Stock moves, serial tracking, landed costs
- **Accounting** — Invoicing, GST, payment modes, reports
- **HR** — Sales staff / delivery engineer assignment
- **Analytic** — Order-level analytic accounts on stock moves

## Custom Modules (Core Solution)

### sci_master
Product master: model, part number, ERP reference, unit freight charge, custom categories, last purchase price, partner shipping notes

### sci_operation
Delivery modes (self collection, local, ex-works, sales engineer), SO/PO outstanding qty, stock/delivery customizations, analytic on moves

### sci_purchase_back2sale
Create or extend PO from SO lines; link SO lines to PO lines (`sci_po_line_id`)

### sci_package
Package grouping on SO/invoice lines; print-line builder for bundled invoice presentation

### sci_sync
Bidirectional portal/API sync: products, partners, SO, PO, daily batch sync, stock quantity API

### sci_print
Branded tax invoice and purchase order PDF templates

### sci_account
Accounting access control, payment mode fields

## End-to-End Workflow

1. **Sync master data** — Products, customers, suppliers from external portal
2. **Receive sales order** — SO with customer PO ref, shipping note, analytic account
3. **Raise vendor PO** — Create PO from SO lines with line-level linkage
4. **Receive & deliver** — Goods receipt, delivery with mode and shipping instructions
5. **Invoice & pay** — Package-aware GST invoice, landed costs, payment modes

## Key Differentiators (Verified in Code)

- Portal/API inbound sync for SO, PO, products, partners
- Industrial SKU: model + part number + serial tracking
- SO-to-PO wizard with explicit line mapping
- Live stock on sales orders (on-hand, incoming, available)
- Delivery mode management for B2B fulfillment
- Package invoice engine with hide-line control on PDFs
- Branded tax invoice and PO documents
- Landed costs, analytic per order, negative-stock prevention

## What We Do NOT Claim

- Client brand "Scigate" on marketing flyer
- CRM / lead pipeline
- Manufacturing / MRP
- eCommerce / online storefront
- Real-time bi-directional sync everywhere (batch + on-demand API)
- Modern Odoo 17/18/19 out of the box (codebase is Odoo 13)

## Flyer Output

- **Slug:** `industrial-equipment-wholesale`
- **Title:** Industrial Equipment Wholesale
- **Subtitle:** B2B Distribution — Portal Sync, Procurement & Invoicing with Odoo
