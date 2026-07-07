# Project Summary — Gym Equipment Sales & Service

## Business Context

Odoo customization for a gym equipment distributor selling to commercial and retail customers (B2B and B2C), with after-sales maintenance contracts, field service, and equipment lifecycle tracking from delivery through recurring service visits.

## Standard Odoo Apps Used

- **Sales** — B2B quotations and orders with discount and contact controls
- **CRM** — Sales teams split between standard sales and after-sales
- **Inventory** — Delivery operations with serial numbers and signed delivery slips
- **Accounting** — Invoicing linked to sales and service follow-up
- **Website / eCommerce** — Online product catalog with fitness-themed storefront, brands, and filters
- **Subscriptions** — Recurring billing support (with UI customization)
- **MRP** — Optional assembly customization before manufacturing orders are confirmed

## Custom Modules (Core Solution)

### reflexo_master
Product and partner master data for equipment distribution:
- **SubCategory 1 & 2** and **brand** on products
- Product dimensions, footprint, and barcode/picking description fields
- Partner and sales extensions

### reflexo_sale
B2B sales enhancements:
- Target discount with line-level discount application
- Delivery contact and attention fields on orders
- Internal notes and invoice contact propagation

### reflexo_repair (After-Sales Service)
Core service and equipment lifecycle:
- **reflexo.equipment** — Customer-installed machines with serial, site location, warranty, and contract link
- **reflexo.contract** — Maintenance contracts with billing types (free, lump sum, per service, leasing, no service), duration, and next service date
- **reflexo.service** — Service orders for maintenance, repair, troubleshooting, shifting, and commissioning
- **Checklist templates** on products/equipment with per-visit checklist completion
- **Parts replacement list** on service orders
- Equipment registration from delivery; signed delivery validation
- **Monthly maintenance wizard** — batch-create service orders for contracts due in a month
- Contract renewal quotations (`sale_type` = after-sale)
- Maintenance and repair service order PDF reports with email wizard
- Digital signatures on deliveries and completed service visits

### reflexo_print
Branded print layouts for sales orders, purchase orders, invoices, delivery slips, consignment, barcodes, and picking documents.

### reflexo_subscription
Subscription UI patch (hides online preview button on subscription form).

### reflexo_consignment_patch
Consignment picking updates linked sale order line quantities.

### Supporting / eCommerce stack (verified in repo)
- **ks_theme_kinetik** — Fitness-themed website storefront
- **website_product_brands**, **website_product_sorting_and_shopping** — Brand and catalog browsing
- **cap_ecom_downpayment** — Website down-payment checkout option
- **affiliate_management** — Affiliate program support
- **ks_dashboard_ninja**, **ks_crm_dashboard_ninja** — Operational dashboards

## End-to-End Workflow

1. **Sell** — B2B quotation or B2C web order with branded catalog, warranties, and pricelists
2. **Deliver** — Outgoing delivery with serial capture and customer signature on delivery slip
3. **Register equipment** — Installed machines pushed to after-sales with warranty and checklist template
4. **Contract** — Open maintenance contract with billing type, frequency, and linked equipment
5. **Service** — Schedule monthly maintenance or create repair/troubleshooting orders with checklists
6. **Report & bill** — Signed maintenance/repair PDFs, optional follow-up quotation or invoice

## Key Differentiators (Verified in Code)

- Installed equipment registry tied to delivery serial numbers and customer sites
- Maintenance contracts with scheduled next-service dates and batch monthly order generation
- Service types: maintenance, repair, troubleshooting, shifting, commissioning
- Product-linked service checklists completed per equipment line
- Separate after-sales sales team and quotation type for renewals and service billing
- Signed delivery and service documentation with PDF email workflow
- B2B discount tools plus B2C eCommerce with fitness storefront theme

## What We Do NOT Claim

- Client brand name "Reflexo" on marketing flyer
- Full IoT or remote equipment monitoring
- Native mobile technician app (uses Odoo web + portal patterns)
- Automated parts procurement from service orders (parts list exists; full auto-replenishment not verified)

## Flyer Positioning

**Title:** Gym Equipment Sales & Service  
**Subtitle:** B2B & B2C Distribution — Sales, Delivery & Maintenance with Odoo  
**Tone:** Generic gym equipment distributor solution — no client brand on flyer.
