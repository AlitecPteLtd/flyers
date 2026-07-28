# Project Summary — Project Site Procurement

## Business Context

Odoo 18 customization for a construction/project-based business that requisitions materials for project sites, routes requisitions through a multi-step approval chain, converts approved requisitions into purchase orders with vendor price comparison, receives materials at project site stock locations, and verifies vendor bills before payment — with project, division, and cost-code tagging on every transaction line.

**Source repo:** `/Users/shawn/PycharmProjects/Odoo Sh Projects/ken-pal` (branch `production-31-12-25`)

**Audience:** Site/project teams raising requisitions, project managers approving them, purchasing desk, warehouse/site receiving, and accounts payable/finance.

**Naming note:** The client's company name must never appear on the public flyer. Do not mention "Ken-Pal", "Kenpal", or "KP" as a company brand anywhere in flyer copy, image alt text, or file contents. ("KP"-prefixed technical field/model names exist only in the source code and are translated to plain business language in the flyer.)

## Standard Odoo Apps Used

- **Purchase** — RFQs, purchase orders, vendor management
- **Purchase Requisitions** — Alternative/compare purchase order lines across vendors
- **Inventory** — Stock locations, receiving, site-based location restriction
- **Accounting** — Vendor bills, bill verification, project code on journal entries
- **Analytic Accounting / Budgets** — Project/division cost coding on purchase and accounting lines
- **Contacts** — Vendor and site contact management

## Custom Modules (Core Solution)

### kp_custom (Material Requisition & Master Data)
Core Material Requisition (`x_material_requisition`) object with lines, attachments (3 slots), reason for purchase, deliver-to picking type, receiver/alt-receiver contacts, division, and actual project code. Approval workflow field `x_studio_status`: Draft → Submitted → Reviewed (PM Reviewed) → Approved → Finalised (PO Issued), with approved-by/approved-on tracking and activity cleanup on send-back. One-click `action_generate_rfq` / `action_generate_rfq_no_product` create a linked Purchase Order from MR lines (product, quantity, cost code, back-charge, location of use). Master data: Account/Cost Codes, Project Codes, Divisions, Back-Charge Options, Purchasers, Receivers. Site location access control: `stock.location` extended with `block_location` and `user_ids` (assigned users), restricting non-managers to only their assigned internal locations on MR, PO, stock picking, and stock quant domains. Location also links to an analytic budget ("Project").

### Kenpal_operation (Purchase & Accounting Extensions)
Extends `purchase.order`/`purchase.order.line` with cost-code tagging, back-charge, location-of-use, and MR linkage. Auto-creates/updates `product.supplierinfo` vendor price records whenever a new PO line is added or an order line's price is raised to a new high, building a live vendor price history automatically. `action_compare_alternative_lines` compares the latest price per product/vendor across a PO and its alternative POs (leveraging Purchase Requisition's compare view). `compare_price()` opens a deduplicated vendor price list for the products on the current PO. Purchase order location is driven by the linked MR's site location and flows through to the receiving picking. Bill verification: `x_studio_bill_verified` flag with `action_bill_verified()` on the PO/vendor bill. Purchasing report menu built on `purchase.order.line` (list/pivot/graph) grouped by vendor, product, quantity, price, and cost/L1 category for spend visibility.

### kenpal_print (Branded PDF Reports)
Purchase order report with cost-code breakdown, a duplicate/second-copy PO report for site or store use, a Material Requisition PDF, and a goods-receipt/picking-operation report.

## Supporting / Third-Party Modules

- **OCA `stock_account_move_reset_to_draft`** — Allows finance to reset a posted stock accounting entry back to draft for correction (governance/finance-correction tool)
- **OCA `partner_readonly_security`** — Read-only protection on vendor/contact master data for non-authorized users
- **ms_query** and **oi_login_as** — Present in the source repository but **excluded from the flyer** per user instruction (internal query/admin-impersonation tooling, not customer-facing procurement value)

## End-to-End Workflow

1. **Draft MR** — Site team raises a Material Requisition tagged with project, division, cost code, and location of use, with up to 3 supporting attachments
2. **PM Review** — Project manager reviews and either sends it back for correction or moves it to Reviewed
3. **Approve** — Authorized approver approves; approver and approval timestamp are captured
4. **Purchase & Compare** — Approved MR generates an RFQ/PO in one click; purchasing compares vendor prices/alternative POs before confirming
5. **Receive & Verify** — Materials received at the project site's assigned stock location; vendor bill matched and manually verified before payment release

## Key Differentiators (Verified in Code)

- Multi-stage MR approval workflow (Draft → Submitted → PM Reviewed → Approved → PO Issued) with full audit trail
- Project, division, and account/cost-code tagging on requisition lines, PO lines, and accounting entries
- Back-charge/cost-recovery flag to recoup material cost from subcontractors or cost centers
- One-click MR-to-RFQ/PO generation, fully linked and traceable both ways
- Automatic vendor price history capture and side-by-side vendor/alternative PO price comparison
- Site location user control — non-managers restricted to only their assigned project locations across MR, PO, picking, and stock quant
- Bill-verified checkpoint on vendor bills before payment
- Purchasing report (list/pivot/graph) by vendor, product, and cost code for spend analysis
- Branded, cost-coded PO/MR PDF documents including a duplicate PO copy for site use

## What We Do NOT Claim

- Client company brand name (Ken-Pal / Kenpal / KP) anywhere on the public flyer
- `ms_query` internal query tooling
- `oi_login_as` admin impersonation tooling
- Manufacturing/MRP, POS, or eCommerce (not part of this customization)
- Live/real dashboard data — KPI figures on the flyer are illustrative only

## Flyer Output

- **Slug:** `project-site-procurement`
- **Title:** Project Site Procurement
- **Subtitle:** Material Requisition to Purchase, Receipt & Project Cost Control
