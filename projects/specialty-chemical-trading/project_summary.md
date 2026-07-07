# Project Summary — Specialty Chemical Trading

## Business Context

Odoo customization for a regional specialty chemical distributor trading raw materials across Asia — covering coatings, construction, home care, personal care, and food science applications. The solution supports indent and ex-stock sales, import landed costs, batch shelf-life control, margin governance, and multi-tier approvals across sales, purchase, inventory, and accounting.

## Standard Odoo Apps Used

- **Sales** — Quotations and orders with margin, incoterms, and trade metadata
- **Purchase** — Import sourcing, agency fees, lead times, and purchase approvals
- **Inventory** — Batch/lot tracking, expiry, landed costs, and delivery operations
- **Accounting** — Invoicing with lot lines, analytic distribution, and tier validation
- **CRM** — Customer segments, applications, product groups, and opportunity tracking
- **eCommerce** — Website quote requests with grouped chemical products
- **Analytic Accounting** — Business units and strategic BU on products and transactions

## Custom Modules (Core Solution)

### maha_operation
Foundation for chemical trading operations:
- **Products** — country of origin, manufacturer, business unit, strategic BU, housebrand flag
- **Partners** — trade/non-trade, agency type, customer group, grading, credit available limit, customer type (ex-stock, RCC, direct, commission)
- **Sales orders** — indent vs ex-stock, ports, shipment terms, incoterm location, RCC planner, agency fee flag, salesperson (HR)
- **Deliveries** — consignee, notify party, gross weight, incoterms propagated from sales
- **Ports & manufacturers** — master data for import/export routing
- **Payment term** revision controls by finance group

### maha_process
Business process and margin governance:
- **VOC / min selling price** — value and margin checks on sale order lines
- **Price approval flags** — block quote send/preview when under approval
- **Customer segments & service levels** on partners and orders
- **SMS product marking** and purchase restrictions on flagged products
- **Margin setup** by manufacturer with exclude-approval rules
- **Forwarder master**, tax deductible rules, analytic text on SO/PO lines
- **Stock lots** — manufacturing date on lot reports

### Tier validation stack
- **maha_sale_tier_validation** — multi-level sales order approval with credit-limit checks
- **maha_purchase_tier_validation** / **maha_stock_picking_tier_validation** — purchase and delivery approvals
- **account_move_tier_validation** — invoice approval workflow
- **maha_partner_tier_validation** — contact change approval

### maha_landed_cost / kis_final_landed_costs
- Landed cost split rules by business unit on import receipts
- Analytic allocation of freight, duty, and handling to chemical batches

### maha_stock_shelf_life_alert
- Blocks goods receipt when shelf-life duration mismatches across batches of the same product

### maha_print / maha_layouts
- Branded trade documents: invoices with lot and expiration lines, delivery notes, billing statements, authorization letters, purchase orders

### Supporting modules (verified in repo)
- **maha_slow_moving_alert** / **maha_stock_shelf_life_alert** — inventory risk alerts
- **maha_sales_contract** — DOCX contract generation from templates
- **kh_maha_ecommerce** — website quote flow, product groups, zero-price contact-us products
- **maha_applications_product_groups** — CRM applications and supplier/product group masters
- **maha_reward_tiers** — sales reward tier setup
- **maha_reports_xl** — trade interest, AR aging, commission, VAT, lead time Excel reports
- **sh_contact_approval** — new contact approval before use on transactions
- **delivery_date_sale_order_line_split** — split deliveries by line delivery dates
- **kis_create_purchase_on_sale** — generate purchase from sales for indent flows

## End-to-End Workflow

1. **Qualify & quote** — CRM opportunity with applications; quotation with margin/VOC checks and tier approval
2. **Confirm order** — Indent or ex-stock routing with ports, incoterms, and agency fee rules
3. **Source & receive** — Purchase or stock move; GR with shelf-life validation and landed cost allocation
4. **Deliver & invoice** — Delivery with lot traceability; branded invoice showing batch and expiration
5. **Monitor** — Credit limits, slow-moving and shelf-life alerts, commission and AR reports

## Key Differentiators (Verified in Code)

- Indent vs ex-stock order types with full shipping master data
- VOC and minimum selling price approval gates on quotations
- Multi-tier validation on sales, purchases, deliveries, and invoices
- Batch shelf-life consistency enforcement on goods receipt
- Landed cost split by business unit for imported chemicals
- Customer grading, segments, and available credit limit on trade accounts
- Invoice lot/expiration traceability for regulated chemical distribution
- eCommerce quote request flow for grouped specialty products

## What We Do NOT Claim

- Client brand "Maha Asia" on marketing flyer
- Full SAP ERP replacement (SAP sales data module exists as supplementary store)
- Automated regulatory SDS/MSDS document management (not verified in core modules)
- Guaranteed multi-country tax compliance beyond implemented localizations

## Flyer Positioning

**Title:** Specialty Chemical Trading  
**Subtitle:** Regional Distribution — Sales, Import & Compliance with Odoo  
**Tone:** Generic specialty chemical distributor solution — no client brand on flyer.
