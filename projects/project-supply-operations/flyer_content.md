# Flyer Content — Project Supply & Inventory Operations

## Hero

- **Title (EN):** Project Supply & Inventory Operations
- **Title (ZH):** 项目供应与库存运营
- **Subtitle (EN):** Sales-to-Invoice Control with Project Analytics, Site Deliveries & Stock Requests
- **Subtitle (ZH):** 项目分析、现场交付与库存申请驱动的销售到发票全流程管控

### Intro paragraph (EN)
Alitec's project supply and inventory operations solution keeps every job costed correctly in Odoo. Sales orders are locked to a project analytic account before confirmation, that account flows automatically onto every outgoing delivery, and site teams raise stock requests against the same project. Purchase orders capture the site delivery address, and one click syncs delivery order numbers and customer PO references onto invoices with your choice of PO or contract reference.

### Intro paragraph (ZH)
Alitec 项目供应与库存运营方案确保每个项目在 Odoo 中都能被准确核算成本。销售订单在确认前必须绑定项目分析账户，该账户会自动带入每一笔出库交货，现场团队也可针对同一项目发起库存申请。采购订单可记录现场收货地址，发票只需一键即可同步交货单号与客户采购单号，并可选择打印采购单号或合同编号。

## Quick Benefits (4)

| # | Icon | EN | ZH |
|---|------|----|----|
| 1 | fa-lock | Mandatory Project Tagging — Sales orders cannot be confirmed without a project analytic account. | 强制项目标记 — 未绑定项目分析账户的销售订单无法确认。 |
| 2 | fa-diagram-project | Auto-Tagged Deliveries — Outgoing stock moves inherit the order's analytic account automatically. | 交货自动打标 — 出库库存移动自动继承订单的分析账户。 |
| 3 | fa-map-location-dot | Site-Aware Logistics — Deliveries and purchase orders carry project, site address & contact. | 现场化物流 — 交货单与采购单均含项目、现场地址与联系人。 |
| 4 | fa-rotate | One-Click Invoice Sync — Pull delivery numbers and customer PO refs onto invoices instantly. | 一键同步发票 — 一键将交货单号与客户采购单号带入发票。 |

## Key Capabilities (8)

1. **Mandatory SO Analytic** — Confirmation is blocked until a project analytic account is set. (`sale.order.action_confirm` override, `ValidationError`)
2. **Description to Invoice** — Order description carries into the invoice automatically. (`sale_description` → `invoice_description` via `_prepare_invoice`)
3. **Auto Analytic on Moves** — Every outgoing stock move is stamped with the project account. (base.automation on `stock.move`, outgoing pickings)
4. **Project-Aware Deliveries** — Delivery notes show project name, site address & contact. (`stock.picking.project_name`, `delivery_address`, `contact_information`)
5. **PO Site Address** — Purchase orders capture a dedicated delivery address & description. (`purchase.order.delivery_address`, `purchase_description`)
6. **Analytic Stock Requests** — Internal material requests tagged to the project for cost control. (OCA `stock_request` + `stock_request_analytic`)
7. **Invoice DO & PO Sync** — One click pulls delivery numbers and customer PO refs onto invoices. (`account.move.action_update`)
8. **Flexible Print Refs** — Print PO # or Contract # on invoices with unit price control. (`print_reference`, `print_unit_price`)

## Workflow — Project Supply Workflow (5 steps)

1. **Confirm & Tag** — Sales confirms the order once a project analytic account is set.
2. **Auto-Tag Moves** — Outgoing stock moves auto-inherit the project analytic account.
3. **Deliver On-Site** — Delivery order shows project, site address and on-site contact.
4. **Request Materials** — Site teams raise stock requests tagged to the project.
5. **Sync & Invoice** — One click syncs DO numbers and PO refs before posting.

### Control Modes (5)
- Mandatory Analytic — Blocks SO confirmation without a project account.
- Site Address — Delivery address & contact info on PO and picking.
- DO/PO Sync — One-click invoice update button for DO and PO refs.
- Print Reference — Choose PO # or Contract # on printed invoices.
- Analytic Access — Financial figures restricted to the accounting role.

### Additional Features (8)
- Automated analytic stamping on outgoing moves
- Purchase order delivery/site address capture
- Internal stock requests for site material needs
- Stock request lines tagged to analytic accounts
- Split pickings for partial site deliveries (`stock_split_picking`)
- Automatic procurement group creation (`procurement_auto_create_group`)
- Unit price print toggle on invoices
- Analytic financials restricted by role

## Dashboard / Operations Visibility

- Stats: Active Project Orders (58), Tagged Deliveries (94), Open Stock Requests (23), Pending DO Sync (11), Site POs This Week (17)
- Donut chart: Analytic Coverage — Auto-Tagged 82% (94) vs Manual Review 18% (21)
- Line chart: Weekly Site Deliveries Trend (Mon–Mon)
- Mini table (Control Area / Owner / Status / Count / Review): Sales Orders / Deliveries / Stock Requests / Invoices
- Bar list: Analytic Spend Mix by Site A/B/C/Warehouse
- Queue table: Stock Requests Awaiting Fulfillment (SR-3041…SR-3052)

## Integrations (8)

Sales, Purchase, Inventory, Accounting, Analytic (Project Costing), Stock Request, Contacts, Reporting

## Business Benefits (4)

1. **Protected Job Costing** — No order slips through without a project analytic account.
2. **Faster, Accurate Invoicing** — DO numbers and PO references sync onto invoices in one click.
3. **Full Site Visibility** — Every delivery shows the project, site address and contact.
4. **Tighter Material Control** — Stock requests keep site consumption tied to project budgets.

## Footer

Same as other Alitec flyers: sales@alitec.asia · +65 6262 2001 · +60 327123253 · www.alitec.asia · Singapore · Malaysia
