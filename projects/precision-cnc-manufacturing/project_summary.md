# Project Summary — Precision CNC Manufacturing

## Business Context

Odoo 18 job-shop manufacturing solution for precision engineering — high-mix, low-volume CNC-style production. Covers sales-to-manufacturing linkage, operation routing, shop-floor work orders, material tracking, multi-level MRP planning, in-process quality control, and billing through delivery and invoicing.

**Source repo:** `acot-18` (read-only input — not used as flyer folder name)

## Standard Odoo Apps Used

- **Manufacturing (MRP)** — BoMs, manufacturing orders, routings, consumption
- **Work Orders** — Shop-floor tablet UI (extended)
- **Quality** — Quality points, checks, alerts
- **Sales** — Quotations, SO, make-to-order via `sale_mrp`
- **Purchase** — RFQ, PO, direct/indirect procurement
- **Inventory** — Stock moves, locations, barcodes, delivery
- **Accounting** — Invoicing, payments, aged receivables
- **Project / Timesheet** — MO labour via manufacturing timesheet
- **Employees** — Shop-floor permissions and operator assignment

## Custom Modules (Core Solution)

### acot_operation
Main operations layer:
- Operation master data (`operation.name`) tied to work centers
- BoM operations with `process_note`, sequenced ops, per-step QC rules (`acot_qcp_ids`)
- Multi-level MOs with parent/child scheduling (`adjust_schedule_date`, `days_to_produce`)
- SO → MO linkage with commitment-date back-scheduling and MO progress on sales
- Shop-floor states: Pending RM, Pending ASSY, In Progress
- Partial completion password gate and NCR-aware shop-floor wizard
- Purchase extensions: direct/indirect PO type, balance-to-receive, QMS references
- Stock, sales, accounting, and quality extensions

### acot_print
Branded PDF pack: MO travelers (ops, plan/actual minutes, barcodes, QC rules), Certificate of Conformance (CoC), RFQ/PO, invoice, delivery, BoM overview

### ac_operation / ac_print
Base operational and report layouts for stock, sales, purchase, accounting, repair

### Supporting modules
- **mrp_multi_level** — Multi-level MRP scheduler and planned orders
- **mrp_warehouse_calendar** / **stock_warehouse_calendar** — Calendar-aware lead times
- **app_mrp_production_zchart** — MO hierarchy chart
- **app_mrp_superbar** — MO navigator by state and material availability
- **manufacturing_timesheet** — Work-order time to project timesheets
- **sh_stock_by_location** — Stock quantities by location
- **custom_barcode_labels** — Barcode labels from delivery orders
- **mrp_bom_tracking** / **mrp_bom_structure_xlsx** — BoM audit and Excel export
- **sale_order_line_date** — Per-line commitment dates on sales

## End-to-End Workflow

1. **Win the job** — Quotation/SO with commitment dates, credit check, QMS refs; confirm creates procurement/MOs
2. **Engineer & plan** — Single BoM per part with routed operations; MRP scheduler; MO planning status
3. **Release to floor** — Work orders with barcodes, QC rules, process notes, operator assignments
4. **Make & inspect** — Shop-floor execution; per-operation QC; gated partial completion
5. **Ship & certify** — Delivery with barcode labels and CoC; invoice linked to SO and DO

## Key Differentiators (Verified in Code)

- High-mix job-shop operation routing with per-step QC
- Multi-level manufacturing orders and hierarchy visibility
- Commitment-date-driven back-scheduling from sales lines
- Shop-floor partial-qty supervisor controls
- Certificate of Conformance on delivery
- MO travelers with plan vs actual minutes
- OCA multi-level MRP with warehouse calendars
- Full SO ↔ MO ↔ DO ↔ invoice traceability

## What We Do NOT Claim

- Client brand name "ACOT" on marketing flyer
- Native CNC/DNC machine integration or CAM/G-code
- CAD/PLM or engineering drawing management
- Finite-capacity advanced planning and scheduling (APS)
- ISO certification by Odoo (only QMS reference fields)
- IoT or real-time machine monitoring
- Customer portal or eCommerce

## Flyer Output

- **Slug:** `precision-cnc-manufacturing`
- **Title:** Precision CNC Manufacturing
- **Subtitle:** High-Mix Job Shop — Materials, Planning & Billing with Odoo
