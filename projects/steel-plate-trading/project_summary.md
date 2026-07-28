# Project Summary — Steel Plate Trading

## Business Context

Odoo 19 customization for a steel stockist/trader that quotes and ships steel plate by
dimension. Sales and purchase teams quote and order using length, width and thickness, the
system auto-calculates shipped weight from material density and converts cost into a live
price-per-ton, customer and supplier price history is captured automatically from confirmed
orders and invoices, deliveries are scheduled to a fixed date/time window, documents are
branded with a custom PDF letterhead, and finance exports AR/AP entries directly to MYOB.

**Source repo:** `/Users/shawn/PycharmProjects/Odoo Sh Projects/Kah_Teck` (branch `main`)

**Audience:** Steel trading business owners, sales desk, purchasing, warehouse/yard, and
accounts/finance.

## Standard Odoo Apps Used

- **Sales** — Quotations, dimension capture, delivery scheduling
- **Purchase** — Supplier ordering with price-book auto-fill
- **Inventory** — Stock moves carrying dimensions and computed weight
- **Delivery** — Delivery carrier and timed delivery windows
- **Accounting** — Invoicing, tax codes, MYOB AR/AP export
- **CRM / Sales Teams** — External sales team isolation
- **Contacts** — Customer and supplier price book records

## Custom Modules (Core Solution)

### delcie_sales *(internal module name — not shown on the flyer)*
Adds delivery instructions and a delivery end-time slot to quotations, sale orders and stock
pickings. Adds length/width/thickness fields to sale order lines that flow through to stock
moves. Adds `density` (default 7.85, i.e. steel) and a computed `price_per_ton` field on
products. Adds an "External Sales Team" flag on CRM sales teams that manages a dedicated
security group for isolating external salespeople from full data visibility.

### delcie_operation *(internal module name — not shown on the flyer)*
Introduces `customer.price.book.line` and `supplier.price.book.line` models. On sale order
confirmation and purchase order confirmation, the latest line price per partner/product/UoM is
recorded automatically; new order lines and purchase line pricing auto-fill from the most
recent recorded price. Invoice/bill posting also updates the same price books. Adds
`myob_tax_code` / `myob_tax_name` on account taxes and `vendor_do_number` / `vendor_reference`
on vendor bills.

### delcie_custom_reports *(internal module name — not shown on the flyer)*
Branded report layouts (with/without letterhead) for quotations, sale orders, purchase orders,
delivery slips, packing lists, invoices and pro-forma invoices, using a custom PDF letterhead
and Halal logo field on the company record. The packing list report totals shipment weight in
kilograms (`computed_weight` from length × width × thickness × density). Includes an AR/AP
Export to MYOB wizard that produces a tab-delimited text file (Inclusive, Invoice #, Date,
Description, Account #, Amount, Inc-Tax Amount, Journal Memo, Tax Code, GST Amount, Card ID)
mapped to configured MYOB tax codes, with an exported flag to prevent duplicate export.

### delcie_wb_tnc_custom + wb_terms_and_conditions
Dynamic Terms & Conditions on sales, purchase and invoice documents, with company-level default
terms text set per document type.

## Supporting / Third-Party Modules

- **bi_sales_different_number** — Separate sequence numbers for draft quotations vs confirmed
  sales orders (and RFQ vs confirmed purchase orders)
- **od_journal_sequence** — Journal entry sequencing for accounting — **excluded from flyer**
  (generic accounting utility, not a customer-facing differentiator)
- **app_common / app_odoo_customize** — Generic Odoo whitelabel/admin tooling —
  **excluded from flyer** (backend developer/admin utilities, not part of the trading workflow)
- Stock location `vendor_id` field for vendor consignment tracking, applied automatically from
  source/destination location on transfers

## End-to-End Workflow

1. **Quote & measure** — Sales quotes by length × width × thickness; weight and price-per-ton
   calculate instantly from product density and cost
2. **Confirm & price** — On order confirmation, the customer (or supplier) price book is
   created or refreshed with the latest confirmed unit price
3. **Schedule delivery** — A delivery date and a fixed end-time window are set on the order,
   carried through to the delivery and invoice
4. **Pack & ship** — Delivery order and packing list print with computed total weight in
   kilograms, using the same dimension × density formula
5. **Invoice & export** — Branded invoice/bill posts, price books refresh again from invoice
   lines, and AR/AP entries export to a MYOB-ready text file mapped by tax code

## Key Differentiators (Verified in Code)

- Length × width × thickness capture on sale/purchase lines and stock moves
- Automatic weight computation from dimensions and configurable material density (default 7.85)
- Live price-per-ton computed from standard cost and product weight
- Customer and supplier price books auto-populated from confirmed orders and posted invoices,
  with auto-fill on new lines
- Fixed delivery date + end-time window on sale orders, invoices and pickings
- External Sales Team security group restricting partner/lead/order/user visibility to only the
  external team's own records
- Branded, letterhead-driven quotations, delivery orders, invoices, pro-forma and packing lists,
  with packing list total weight shown in kilograms
- One-click AR/AP export to a MYOB-compatible tab-delimited text file, tax-code mapped, with
  duplicate-export protection

## What We Do NOT Claim

- Client brand name(s) on the marketing flyer (kept generic as a "steel plate trading" solution)
- Generic whitelabel/admin developer tooling (`app_common`, `app_odoo_customize`)
- Manufacturing / MRP or eCommerce storefront (not present in the custom modules)
- Journal sequence numbering as a standalone selling point (folded into "branded documents"
  narrative rather than called out separately)

## Flyer Output

- **Slug:** `steel-plate-trading`
- **Title:** Steel Plate Trading
- **Subtitle:** Dimensional Quoting, Timed Delivery & Weight-Based Operations for Steel Stockists
