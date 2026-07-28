# Project Summary — Maritime IT Systems Sales & Lease

## Business Context

Odoo 17 customization for a maritime IT supplier that **sells and leases** vessel/port equipment (marine networking, wireless AP, VoIP/DID, managed switches, vessel NAS/servers, workstations, CCTV, cybersecurity, port IT). Dual trade mode on sales order lines drives either standard delivery (Direct Sales) or lease warehouse transfers with qty/delivered/returned/balance tracking. Deliveries and invoices carry vessel and forwarder addressing; custom DO/invoice lines add HS code and country of origin for trade documents. CRM quotation templates and project task solution-content templates support sales and field delivery updates.

**Not self-storage.** This is equipment sell/lease for ships and ports — distinct from `storage-rental-business` (self-storage unit rental).

**Source repo:** `/Users/shawn/PycharmProjects/Odoo Sh Projects/precision-infocomm` (path OK here only). Do **not** name the client or vendor brands (Precision Infocomm, Peplink, GTMaritime, Infinity, etc.) on HTML or `flyer_content.md` — use generic industry language only.

**Audience:** Maritime IT sales desks, warehouse/logistics, project delivery teams, and accounts.

## Standard Odoo Apps Used

- **Sales** — Quotations, sales orders, dual trade mode lines
- **CRM** — Opportunities, quotation templates, order-confirmation content
- **Purchase** — Purchase orders with purchase agent
- **Inventory** — Deliveries, lease pickings/returns, custom DO lines
- **Project** — Tasks with solution content templates (linked via `sale_project`)
- **Accounting** — Invoices, overseas docs, vouchers, custom invoice lines
- **HR** — Sales/purchase agents as employees
- **Website** — Optional SSO present in repo (light mention only)

## Custom Modules (Core Solution)

### precision_operation
Core operational logic (v17.0.0.0.95):

- **Dual trade mode** on `sale.order.line`: `direct_sales` vs `lease_sales`
- **Lease warehouse** on SO; `create_lease_tranfer` on confirm; lease picking smart button
- Lease qty / delivered / returned / balance on lease lines; lease return pickings
- **Vessel** + **forwarder** address/attention/contact on `stock.picking` and `account.move`
- **Custom DO lines** (`custom.move.line`) and **custom invoice lines** with HS code + country of origin
- Sales/purchase agents (`hr.employee`), partner selection restrictions, CRM quotation templates
- Project task solution content templates: logistics updates, marine network / wireless AP / VoIP / vessel managed servers / workstations / managed switches / port IT / cybersecurity / CCTV / service updates (field names in code may reference vendor brands — flyer uses generic labels only)

### precision_print
Branded report suite: delivery slip, custom DO, packing list, commercial invoice, overseas invoice/credit note, petty cash / payment / receipt vouchers, CRM templates, PO/invoice terms.

### ac_stock_price_cost_visibility
Restricts product list price / cost visibility by role.

## Supporting / Third-Party Modules

- **odoo_website_sso** — Website SSO (optional light mention)
- **smart_warnings**, **oi_login_as**, **auto_backup** — ops tooling; not flyer-facing
- **OCA** partner_statement, report_xlsx, stock_no_negative, stock_split_picking, etc. — support printing/stock hygiene

## End-to-End Workflow

1. **Quote & template** — CRM opportunity uses quotation / order-confirmation content templates
2. **Confirm dual mode** — SO lines set Direct Sales or Lease Sales; lease warehouse assigned
3. **Lease transfer** — Lease pickings move gear to lease warehouse; qty/balance update
4. **Deliver to vessel** — DO carries vessel/forwarder data; custom lines add HS + origin
5. **Invoice & docs** — Commercial, overseas, and voucher prints close the cycle

## Key Differentiators (Verified in Code)

- Per-line Direct Sales vs Lease Sales with lease warehouse and balance tracking
- Vessel and forwarder fields on deliveries and invoices
- Custom DO/invoice lines with HS code and country of origin
- Full marine trade print set (packing list, commercial/overseas invoice, credit note, vouchers)
- CRM quotation templates and project solution-content templates for maritime IT delivery
- Sales/purchase agents, partner restrictions, price/cost visibility; optional website SSO

## What We Do NOT Claim

- Client or vendor brand names on the marketing flyer or `flyer_content.md`
- Self-storage unit rental (see `storage-rental-business`)
- Manufacturing/MRP as a primary process (MRP appears only as a print dependency)
- eCommerce storefront product catalog

## Flyer Output

- **Slug:** `maritime-it-systems`
- **EN title:** Maritime IT Systems Sales & Lease
- **ZH title:** 海事IT系统销售与租赁
- **Integrations shown:** Sales, CRM, Purchase, Inventory, Project, Accounting, HR, Website (8 apps)
- **Hero image:** AI-generated ship bridge / marine IT rack photo (no brands or UI text)
- **Indexes:** Not updated (per explicit user instruction)
