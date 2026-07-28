# Project Summary — Project Supply & Inventory Operations

## Source

- Source repository: `/Users/shawn/PycharmProjects/Odoo Sh Projects/jinbiao15`
- Odoo version: 15.0
- Primary custom module analyzed: `custom/jb_operation` (depends on `stock`, `sale`, `purchase`, `custom/jb_master`, and OCA modules `stock_analytic`, `stock_request`, `stock_request_analytic`, `base_automation`)
- Supporting OCA modules reviewed: `stock_analytic`, `stock_request`, `stock_request_analytic`, `stock_split_picking`, `procurement_auto_create_group`
- Note: per instructions, the client/company name behind the source repository is never referenced in the flyer or supporting docs — all copy is written in generic "project supply & inventory operations" business language.

## Analyzed Modules & Behaviors

- **Sale Order (`sale.order`)**
  - `action_confirm()` raises a `ValidationError` if `analytic_account_id` is not set — sales orders cannot be confirmed without a project/analytic account.
  - New field `sale_description` (Order Description).
  - `_prepare_invoice()` override copies `sale_description` into `invoice_description` on the generated invoice, and pre-fills `do_number` from the order's `picking_ids` names.
  - View: analytic account field repositioned after payment terms, made readonly once invoiced/confirmed except via `force_save`; order description field added before the notebook.

- **Automated Action (`base.automation` on `stock.move`)**
  - Trigger `on_create_or_write`, filtered to `picking_code = outgoing`.
  - For any outgoing move linked to a sale order line, copies the sale order's `analytic_account_id` onto the stock move automatically — no manual tagging needed on deliveries.

- **Stock Picking (`stock.picking`)**
  - New fields: `delivery_address` (Text), `contact_information` (Text).
  - Computed `project_name`: joins the analytic account name(s) from the picking's move lines — shows which project(s) a delivery belongs to.
  - Computed `purchase_description`: looks up the purchase order matching the picking's `origin` and pulls its description — surfaces PO context directly on delivery/receipt documents.
  - View: these fields added to the picking form before the notebook.

- **Purchase Order (`purchase.order`)**
  - New fields: `purchase_description` (Char, Order Description) and `delivery_address` (Text) — captures a site/job delivery address distinct from the standard vendor/company address.
  - View: order description shown before the notebook; delivery address inserted into the invoicing/delivery info group; the `account_analytic_id` column on PO lines is hidden (analytic control is handled at the order/project level, not per PO line).

- **Account Move / Invoice (`account.move`)**
  - New fields: `analytic_account_id`, `invoice_description` (Char), `do_number` (Char, Delivery Order reference), `print_unit_price` (Boolean, default True), `print_reference` (Selection: `po` = "PO #" or `contract` = "Contract #").
  - `onchange_account_analytic()`: when the invoice-level analytic account changes, it cascades to every invoice line.
  - `action_update()` button (visible only in draft, for customer invoices/credit notes): re-derives `do_number` from the confirmed (`state = done`) delivery pickings of the related sale orders, and re-derives the printed `ref` from the orders' `client_order_ref` (customer PO numbers) — a one-click sync so invoices always reflect the latest delivery and customer PO data.
  - View: "Update" button next to "Reset to Draft"; DO number and invoice description fields shown near payment reference; print-unit-price toggle in the header; print-reference selector near the "Other Info" reference field; analytic account field shown near the journal.

- **Account Analytic (`account.analytic.account`)**
  - Debit/credit/balance columns and the analytic "compute" button restricted to the accounting user group — protects sensitive financial figures from non-finance roles who still need to select/view analytic accounts (e.g. on stock requests).
  - Adds an "Account Analytic" menu entry under Inventory's Stock Request operations menu, so operations/warehouse users can browse analytic accounts (projects) without needing full Accounting access.

- **Stock Request & Stock Request Analytic (OCA)**
  - `stock_request`: internal request-for-stock workflow — request orders/lines that generate stock moves/allocations from source locations, independent of sales/purchase documents. Used for site material requests.
  - `stock_request_analytic`: extends stock requests and their generated moves with an analytic account, so material requested for a project is tagged the same way as sales-driven deliveries — one consistent cost-tracking dimension across sales, purchasing, and internal requests.

- **Other OCA modules (minor, referenced as supporting features)**
  - `stock_split_picking`: splits a picking into two not-yet-transferred pickings — supports partial/staged site deliveries.
  - `procurement_auto_create_group`: automatically proposes new procurement groups during procurement runs.
  - `partner_fax`, `oi_login_as`: administrative/utility modules, not represented in the flyer (not relevant to the project-supply business narrative).

## Business Process Summary

The customization enforces project-based cost control across the sales-to-invoice cycle in a project/site-supply business (e.g. materials, equipment, or consumables delivered to job sites):

1. A sales order cannot be confirmed unless it is tied to a project (analytic account) — this is the anchor for all downstream costing.
2. Every outgoing delivery move generated from that order is automatically tagged with the same project account (no manual re-entry, no missed tagging).
3. Delivery orders and purchase orders both carry a site/project delivery address and contact information, plus a computed project name so warehouse and drivers know exactly where and for which job a shipment is going.
4. Site teams can raise internal stock requests (not tied to a sale) for material replenishment, and those requests carry the same project analytic account for unified cost reporting.
5. At invoicing time, a one-click "Update" action re-syncs the delivery order number(s) and customer PO reference(s) from the confirmed deliveries — so invoices are never out of date even if deliveries happen after the invoice draft is created. Finance can choose whether the printed invoice reference shows the vendor/customer PO number or a contract number, and can toggle whether unit prices print.
6. Analytic (project) financial figures (debit/credit/balance) remain visible for selection but are restricted to accounting-role users, so operational staff can pick/browse projects without seeing sensitive financial totals.

## Exclusions

- `oi_login_as` (admin impersonation utility) and `partner_fax` (legacy contact field) were reviewed but excluded from the flyer as they are administrative/utility features unrelated to the project supply & inventory operations narrative.

## What We Do NOT Claim

- Client/company name behind the source repository (never mentioned on the marketing flyer, per explicit instruction — the flyer and Chinese version use only generic "project supply & inventory operations" business language)
- eCommerce / website storefront (not in custom modules)
- Manufacturing / MRP
- POS or retail checkout workflows (not part of this module)

## Key Assumptions

- "Project" in the flyer copy refers to the Odoo `account.analytic.account` (analytic account), which in this source system is used as the project/job costing dimension.
- Dashboard numbers (order counts, delivery counts, stock request counts, chart percentages) are illustrative placeholder figures consistent with the style of other flyers in this repository, not real client data.
- Hero image is an AI-generated, brand-free warehouse/site materials supply photo (forklift, pallets of construction materials, hi-vis worker, delivery truck) — no embedded text, logos, or readable labels.
