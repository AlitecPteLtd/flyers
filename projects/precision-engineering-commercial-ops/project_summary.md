# Project Summary — Precision Engineering Commercial Operations

## Business Context

Odoo customization for a precision engineering / commercial manufacturing business that quotes, confirms, delivers, and invoices engineered goods with certification-ready commercial documents. The solution covers the full quote-to-cash paper trail: certified letterhead PDFs, a single Quotation/Order Confirmation report, GST tax invoices, sale-line descriptions carried onto stock moves, consistent item numbering, a Delivery/GRN document suite, multi-company print routing, and foreign-currency (SGD) tax display control.

**Source repo:** `/Users/shawn/PycharmProjects/Odoo Sh Projects/elh19` (branch `main`, clean working tree)

**Audience:** Sales/quoting desk, warehouse/logistics, finance/accounts receivable, and operations managers across multiple operating companies.

**Important constraint:** No client brand names appear anywhere in this flyer or its supporting documents. All findings below are described generically per the user's instruction to never reference the source client or company.

## Standard Odoo Apps Used

- **Sales** — Quotations, Order Confirmations, pricing, customer remarks
- **Inventory** — Stock moves, delivery orders, goods receipt notes (GRN)
- **Accounting** — GST tax invoices, foreign-currency handling, multi-company
- **Manufacturing** — Kit/BOM line sections shown on delivery documents
- **Contacts** — Quote-to / Bill-to / Ship-to party management

## Custom Modules (Core Solution, Generic Description)

### Custom operations base module
Adds company-level certification logo fields (ISO/BizSAFE-style images) and fax number for use on letterhead; adds a `sale_description` text field on stock moves populated from the sale order line; adds a computed `item_no` sequence on stock moves for consistent line numbering; adds `is_hide_sgd_taxes` boolean (default True) and `currency_name` on invoices to control local-currency tax display.

### Custom print/report module
Provides QWeb report templates and inherits `web.external_layout_boxed` / `web.external_layout_striped` to render certification logos on letterhead. Implements:
- State-aware Quotation/Order Confirmation title switching (draft/sent → Quotation; confirmed → Order Confirmation; pro-forma supported).
- Dedicated GST Tax Invoice report set as the default send/print template, with Bill-To/Ship-To, payment terms, item numbers, and optional QR payment image.
- Delivery/GRN suite: outgoing pickings print as "Delivery No", incoming pickings print as "Goods Receipt Note", internal moves as "Internal Move" — each with signature/acknowledgment blocks and sale-description context. A separate "Delivery Slip (Separate)" report shows ordered vs. delivered quantity per line, with optional auto-print on validation.
- Multi-company print routing: `action_print_pdf` overrides on Sales Orders, Invoices, and Pickings select an alternate report layout based on the operating company, so each entity's documents follow its own letterhead automatically.
- Foreign-currency tax hide: SGD tax totals in company currency are hidden by default on foreign-currency invoices via `is_hide_sgd_taxes`, toggleable per invoice.

### Supporting OCA-style modules
Company-currency total helpers on Sales/Purchase orders (internal reporting only, not flyer-core).

## End-to-End Workflow

1. **Quote job** — Sales issues a certified quotation with numbered engineered line items.
2. **Confirm order** — The same print path reprints as an Order Confirmation once approved.
3. **Produce & pick** — Sale-line descriptions carry onto stock moves for shop-floor/warehouse context.
4. **Deliver & receive** — Delivery notes (outgoing) and goods receipt notes (incoming) print with signature/acknowledgment blocks.
5. **Invoice GST** — A dedicated GST tax invoice bills the job with correct currency and tax-display handling.

## Key Differentiators (Verified in Code)

- One report path that switches Quotation ⇄ Order Confirmation by sale order state
- Dedicated GST-ready tax invoice used as the default send/print template
- Sale-line description and computed item numbers flow through to warehouse documents
- Delivery/GRN suite with signature blocks, separate ordered-vs-delivered slip, and kit/BOM sections
- Multi-company print routing so each operating entity's letterhead applies automatically
- Foreign-currency invoices hide local-currency (SGD) tax totals by default, with an opt-in toggle
- Certification-style (ISO/BizSAFE) logos and fax/registry details on company letterhead

## What We Do NOT Claim

- Any client, project, or company name from the source repository
- E-commerce / website storefront features
- Point of Sale / retail checkout
- HR, payroll, or timesheet functionality present elsewhere in the source repo (OTP login, login-as, iframe menus, smart alerts, UAT toolkit) — excluded as not relevant to this flyer's commercial-document theme

## Flyer Output

- **Slug:** `precision-engineering-commercial-ops`
- **Title:** Precision Engineering Commercial Operations
- **Subtitle:** Quote, Deliver, and GST-Invoice Engineered Goods with Certification-Ready Documents
