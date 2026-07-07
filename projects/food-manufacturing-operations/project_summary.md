# Project Summary

## Project Name

Outlet Food Manufacturing Operations

## Industry / Business Type

Fresh food manufacturing and multi-outlet distribution for perishable goods, including sushi and prepared food production. The solution supports central kitchen manufacturing, outlet delivery, expiry-aware documents, and commission-based third-party sales reconciliation.

## Odoo Base Apps

- Manufacturing (MRP)
- Inventory
- Sales
- Purchase
- Accounting / Invoicing
- Analytic Accounting
- eCommerce (Website Sale)
- Product Expiry

## Main Custom Solution

This Odoo 16 solution is built for outlet-driven food production. Production templates define outlet, finished-goods location, analytic account, day schedule, and product quantities. A single “To Produce” action generates manufacturing orders and an outgoing delivery order to the outlet with analytic distribution on stock moves.

Supporting operations enforce delivery dates on sales, split deliveries by line-level delivery address, track lot manufacturing and expiration dates, and require analytic accounts on sales, purchases, production, invoicing, and inventory adjustments. A separate sales import workflow reads Excel third-party sales, maps products and outlets, calculates commission, and creates customer invoices plus matching commission credit notes.

## Key Customized Areas

- outlet production templates with day scheduling
- bulk manufacturing order and delivery order generation wizard
- analytic accounting enforcement on sales, purchase, MO, invoice, and inventory adjustment flows
- Excel sales import with product and outlet mapping
- automated commission invoice and credit note creation
- per-line delivery address and split picking support
- lot manufacturing date and expiration on delivery slips and invoices
- scrap approval gate before validation
- finance-approved partner filtering and credit-limit controls
- branded operational and financial PDF reports
- website cart customizations for B2B ordering

## End-to-End Business Flow

1. configure outlets, products, analytic accounts, and production templates
2. run “To Produce” for the scheduled production day
3. system creates manufacturing orders and outlet delivery orders with analytics
4. manufacture, fulfill, and ship finished goods to each outlet
5. process sales and purchases with mandatory delivery dates and analytic accounts
6. import third-party Excel sales for commission billing by outlet
7. post invoices with analytic controls and print branded documents with lot and expiry detail
8. review outlet performance, open deliveries, scrap approvals, and receivables

## Main Business Benefits

- launches daily outlet production and delivery from one template action
- tracks profitability and cost control by outlet through enforced analytic accounting
- speeds commission billing with Excel import into invoice and credit note pairs
- improves food traceability with lot, serial, and expiration detail on operational documents
- strengthens governance through finance-approved customers, scrap approval, and credit controls
- supports multi-destination fulfillment with split deliveries by delivery address
