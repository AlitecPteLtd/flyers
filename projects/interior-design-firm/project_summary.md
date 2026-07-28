# Project Summary — Interior Design & Renovation Operations

## Business Context

Odoo 19 customization for an interior design and renovation firm that runs the full job lifecycle inside Odoo: CRM captures renovation type, design preference, and key collection details at enquiry stage; a login-gated website catalogue lets signed-in homeowners browse product selections; designers convert selections into quotations with tracked revisions and a deliberate "Manual Accept" confirmation; deliveries route per order line to different addresses; each project is tracked as an analytic job (Ongoing/Closed) for cost visibility; and completed jobs close out with printed, signable Handover & Joint Inspection and Rectification Acknowledgement forms. Singapore e-invoice (Peppol) fields exist on partners and invoices for future readiness.

**Source repo:** `/Users/shawn/PycharmProjects/Odoo Sh Projects/ft2` (branch `main`)

**Audience:** Interior design firm owners, sales/design desk, project managers, delivery/ops, and finance.

## Standard Odoo Apps Used

- **CRM** — Lead intake with renovation type, design preference, and key collection
- **Sales** — Quotations, revisions, Manual Accept confirmation, per-line delivery address
- **Website / Portal** — Login-gated shop catalogue for signed-in customers
- **Purchase** — Procurement supporting project material sourcing
- **Inventory** — Deliveries routed to per-line shipping addresses
- **Accounting** — Invoicing with Attention contact and e-invoice-ready fields
- **Analytic** — Job costing via analytic accounts (Ongoing/Closed status)

## Custom Modules (Core Solution)

### ac_operation
Base operations module. Adds `renovation.type` and `key.collection` models; extends `crm.lead` with renovation type and key collection fields; extends `sale.order`/`sale.order.line` with Attention contact, revision parent link, quotation "add revision" (auto-numbered R1, R2…), per-line delivery address (`delivery_address` on `sale.order.line`, flowing into `_prepare_procurement_values` and stock picking `partner_contact_id`), handover signature/description/sign-by/sign-on fields, and `rectification.acknowledgement` child records (description, photo attachment, date, work-done flag). Extends `account.analytic.account` with `status` (Ongoing/Closed), `completion_date` (required via constraint when closed), and salesperson/sales-team fields.

### ft_operation
Thin layer depending on `ac_operation`; view changes to the sale order form; a no-op `action_save` override left in place from the source (not surfaced as a flyer claim).

### ft_website
Depends on `website_sale`, `portal`, `sale`. Overrides the `/shop` controller so anonymous visitors are redirected to `/web/login` before browsing — the product catalogue is login-gated, not public. Also disables the standalone guest checkout wizard (`wizard_checkout` / `website_sale_cart` templates are set `active="False"`), and the "Process Checkout" button prompts guests to sign in rather than complete a self-service checkout — the intended flow is designer-led quoting, not full self-checkout eCommerce.

### ac_print
Report layouts for sale/purchase/invoice/delivery documents plus two project-specific PDF reports: **Handover & Joint Inspection Form** (customer/address/reference block, key-return and indemnity acknowledgement checkboxes, signature block bound to `handover_joint_sign*` fields) and **Rectification Acknowledgement Form** (itemized description/date/photo/work-done table bound to `rectification.acknowledgement`).

### account_peppol_sg
Adds Peppol/e-invoice fields: `peppol_sent`, `peppol_submitted`, `peppol_vendor_ref`, `peppol_order_ref`, `guid`, and structured `account.move.einvoice_line` records on `account.move`; `peppol` ID and `peppol_scheme` (default `SG:UEN`) on `res.partner`; `peppol`/`storecove`/`tenantID` fields on `res.company`. **Verified in code:** `action_peppol_submit()` and `action_create_bill_from_peppol()` are stubs that return `False`/`None`, and `_compute_show_convert_peppol_bill` always returns `False` — this is field/data-model readiness for Singapore e-invoicing, not a working live Peppol submission integration.

### login_to_shop
Present in the source repo (depends on `website_sale`) but contains no models, controllers, or views beyond the manifest — not a functioning feature and excluded from flyer claims.

## End-to-End Workflow

1. **Capture lead** — CRM records renovation type, design preference, and key collection details
2. **Login & browse** — Homeowner signs in to browse the login-gated product catalogue (no public/anonymous shopping)
3. **Quote & revise** — Designer builds the quotation from selected products; revisions are auto-numbered copies that preserve the original
4. **Accept & deliver** — Order is confirmed only via the relabelled "Manual Accept" button; each order line can ship to its own delivery address
5. **Handover & cost** — Job closes with signed Handover & Joint Inspection and Rectification Acknowledgement PDFs; the analytic account is marked Closed with a completion date, giving job-level cost visibility

## Key Differentiators (Verified in Code)

- CRM fields purpose-built for renovation type, design preference, and key collection scheduling
- Website `/shop` controller enforces sign-in before product browsing (no public catalogue)
- Guest self-checkout wizard explicitly disabled; flow directs guests to sign in, not to complete checkout unattended
- Sale order confirm button relabelled "Manual Accept" on both the primary and secondary confirm buttons
- One-click quotation revision with auto-incrementing revision suffix, preserving the parent quotation
- Per-order-line delivery address that flows into stock picking and procurement partner assignment
- Analytic account Ongoing/Closed status with a database constraint requiring a completion date before closing
- Two dedicated printed/signable PDF forms for handover and rectification sign-off
- Peppol/e-invoice data model (partner ID+scheme, invoice fields, structured invoice lines) present but submission actions are explicit stubs

## What We Do NOT Claim

- Client brand name from the source repository — not shown anywhere on the public flyer
- The Odoo **Project** app (job tracking here is via **Analytic Accounting**, not `project.project`/`project.task`)
- Full self-checkout eCommerce — checkout for guests is disabled by design; the flow is login-gated browsing + designer-led quoting
- A working/live Peppol e-invoice submission — the code stubs (`action_peppol_submit` returns `False`) show field readiness only, not a live integration
- Manufacturing/MRP, POS, or membership/loyalty workflows (not part of this custom module set)

## Flyer Output

- **Slug:** `interior-design-firm`
- **Title:** Interior Design & Renovation Operations
- **Subtitle:** From Design Preference and Product Selection to Quotation, Delivery, Handover & Job Costing with Odoo
