# Project Summary — Housewares Retail

## Business Context

Odoo 16 customization for a housewares and linen retailer selling through shop-floor Point of Sale and trade/wholesale sales orders. Cashiers run branded tax-invoice receipts with receipt printer and cash-drawer hardware; sales teams quote trade customers with historical pricing; finance issues branded quotations, invoices, delivery notes, and statements of account with follow-up.

**Source repo:** `/Users/shawn/PycharmProjects/Odoo Sh Projects/Binlinlinen` (branch `main`, README `# binlinlinen-16`)

**Audience:** Retail store owners, cashiers, sales/trade desks, warehouse, and accounts receivable.

## Standard Odoo Apps Used

- **Point of Sale** — Walk-in retail checkout, receipts, refunds
- **Sales** — Quotations and trade orders with price history
- **Inventory** — Deliveries and stock location moves
- **Accounting / Follow-up** — Invoicing, statement of account, credit follow-up
- **Contacts** — Customer printed-date tracking for statements

## Custom Modules (Core Solution)

### binlin_pos_print
Branded POS receipt as tax invoice: company address, GST/VAT reg, ref no, date, customer name; discounts hidden on receipt lines for cleaner store tickets.

### pos_posagent
POSAgent hardware proxy for Community Edition: receipt printer and cash drawer via configurable proxy port.

### pos_open_cash_drawer
Open cash drawer from the POS product screen without completing a sale.

### pos_refund_tools
Cashier refund UX: total refund quantity indicator and clear-all refund lines from the order ticket area.

### sale_order_line_price_history
On sales order lines, show historical prices sold to the same (or commercial) partner; apply past unit price/discount to the current line. Supports including quotations.

### binlin_print
Branded report layouts for quotations (acceptance signature block, unit price precision), tax invoices, delivery orders (with linked sale origin), follow-up letters, and configurable payment information in settings. Partner field for statement printed date.

### ac_statement_account + binlin_statement_of_account
Statement of Account title/layout on follow-up reports; track follow-up printed date on partners.

## Supporting / Third-Party Modules

- **pw_pos_default_customer** — Default customer on POS sessions
- **smart_warnings** — Configurable document alerts
- **oi_login_as** — Admin impersonation (ops tooling, not flyer-facing)
- **OCA stock_move_location** — Move stock across locations in bulk
- **OCA sales_report_product_image** — Product images on quotation/sale PDFs
- **OCA partner_statement / report_xlsx** — Partner statements and XLSX reporting
- **OCA base_report_to_printer / printing_simple_configuration** — Direct printer routing
- **OCA donation_*** — Present in repo; **excluded from flyer** (not part of housewares retail process)

## End-to-End Workflow

1. **Retail sell** — Cashier rings housewares and linen at POS with default walk-in customer when needed
2. **Print & cash** — Branded tax-invoice receipt; cash drawer via POSAgent or open-drawer control
3. **Refund assist** — Refund qty indicator and clear refund lines when correcting tickets
4. **Trade quote** — Sales desk builds quotation with past customer price history
5. **Deliver** — Delivery note linked to sale origin; stock moves between locations as needed
6. **Invoice & collect** — Branded invoices, Statement of Account, and follow-up with printed-date tracking

## Key Differentiators (Verified in Code)

- Dual channel: POS retail + Sales trade desk in one Odoo database
- POS receipt customized as tax invoice with customer/ref/date
- POSAgent printer and cash-drawer hardware bridge
- Refund quantity visibility and clear-ticket tools for cashiers
- Sale line price history for trade negotiations
- Branded quotation, invoice, delivery, and follow-up PDFs
- Statement of Account follow-up with printed-date control

## What We Do NOT Claim

- Client brand name (Binlin / Binlinlinen) on the marketing flyer
- eCommerce / website storefront (not in custom modules)
- Donation / charity workflows (OCA donation modules excluded)
- Manufacturing / MRP
- Loyalty or membership programmes

## Flyer Output

- **Slug:** `housewares-retail`
- **Title:** Housewares Retail
- **Subtitle:** POS & Trade Sales — Receipts, Pricing History & Statements with Odoo
