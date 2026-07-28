# Project Summary — Lighting Retail & Installation Operations

## Business Context

Odoo 19 customization for a lighting fixture retailer/installer that sells through quoted sales orders, schedules site installation appointments, plans work on a project Gantt board, closes jobs with Field Service worksheets, and pays staff/interior-designer commissions on invoiced sales. Sales roles are held to tiered VIP/Gold/Silver discount ceilings so margins stay protected even with heavy discounting culture in the fixtures trade.

**Source repo:** `/Users/shawn/PycharmProjects/Odoo Sh Projects/light-avenue` (custom module `light_operation`, plus `ac_stock_price_cost_visibility`)

**Audience:** Showroom sales staff, sales managers/owners approving discounts, project/planning coordinators, field installation technicians, and accounts/finance calculating commissions.

**Note:** The flyer never references the client name. All content is generalized to the lighting retail & installation business process.

## Standard Odoo Apps Used

- **Sales** — Quotations, order lines, discount wizard, analytic accounts
- **Project** — Tasks generated from confirmed sales orders, custom Gantt board
- **Planning** — Planning slots synced to project tasks for site scheduling
- **Field Service (industry_fsm_report)** — FSM worksheets prefilled from task/job data
- **Inventory (stock)** — Discontinued product stock checks, item numbering on moves
- **Accounting (account)** — Invoicing, analytic sync, commission computation on invoice lines

## Custom Module (Core Solution): `light_operation`

### Visual & Stock-Aware Quoting
- `image_1920` related field surfaces the product photo directly on each sale order line.
- `has_discontinued_supply` boolean on product template/product flags fixtures being phased out.
- Sale order line domain and onchange/constraint logic caps orderable quantity to free stock across the current order, other draft/sent quotations, and warehouse reservations — preventing oversell of discontinued fixtures.

### Tiered Discount Governance (`user.discount.restrict`)
- New model defines per-user-group limits: line discount %, unit price reduction, wizard "All Order Lines" %, wizard "Global Discount" %, fixed-amount discount, and three named tiers — **VIP**, **Gold**, and **Silver** — each with its own discount ceiling.
- Extends the standard `sale.order.discount` wizard with `vip_tier_discount`, `gold_tier_discount`, and `silver_tier_discount` options that apply a one-click discount capped by the user's assigned tier limit.
- Validation runs on discount/price writes, onchange, and constraints so limits cannot be bypassed by direct field edits.

### Sales Order → Project & Task Automation
- On order confirmation, the module resolves or creates a single analytic account per order, pushes it to all order lines, and syncs it to any linked project tasks and stock moves — keeping cost/revenue reporting consistent from quote to invoice.
- `duplicate_project_ids` tracks linked projects; invoices generated from the order carry the same analytic accounts and project links forward.

### Site Appointment & Gantt Planning
- Confirming an order with linked tasks stamps `planned_date_begin`, `date_deadline`, `appointment_date`, and a 2-hour default appointment window, and creates/updates a custom `planning.slot` per task.
- A task-scheduling wizard lets planners quickly edit assignees, resource, role, and appointment window from the task form.
- A custom "By Project" Gantt view (JS renderer patch) shows stage-colored pills (To Do / In Progress / Done / Cancelled), widened cells for readability, and one-click navigation from a Gantt row into its task(s).

### Field Service Worksheets & Commissions
- `open_fsm_worksheet()` prefills the FSM worksheet with resource, role, sale line, service customer/mobile, assignees, appointment window, job/pricing details, project, and analytic accounts — every extra worksheet field defined and patched onto the worksheet form automatically on install/upgrade.
- Commission fields (`staff_commission_percentage`, `id_commission_percentage`) on the product template compute onto each invoice line as a percentage of the line subtotal, giving finance an automatic staff and interior-designer commission basis at invoicing.

### Supporting Data Integrity
- Analytic accounts are only kept on allowed account types (income/expense) on invoice lines; disallowed accounts are cleared automatically.
- Sale order lines that generated a task/project cannot be deleted (must be zeroed) to protect completed planning/FSM history.
- Vendor pricelist (`product.supplierinfo`) changes are chatter-logged with tracked value history for procurement audit.

## Supporting / Third-Party Modules (Present, Not Flyer-Facing)

- **OCA report_xlsx / partner_statement** — Reporting infrastructure, not a customer-facing lighting workflow claim.
- **OCA stock_no_negative, web_chatter_position, web_environment_ribbon** — Operational/UX utilities.
- **oi_login_as, product_import, sh_product_customer_code, smart_warnings** — Admin/ops tooling, excluded from flyer claims.
- **ac_stock_price_cost_visibility** — Restricts cost/price visibility by user group (governance feature, not highlighted as a headline capability but consistent with the discount-governance story).

## End-to-End Workflow

1. **Quote fixtures** — Sales rep builds a quotation with product photos on each line; discontinued items are capped to free stock.
2. **Apply tiered discount** — VIP/Gold/Silver (or standard) discount wizard applies a group-limited markdown.
3. **Confirm & schedule** — Order confirmation creates/updates the project task, appointment window, and Gantt planning slot in one step.
4. **Site visit & FSM** — Technician opens the prefilled FSM worksheet on-site, completes the job, and captures a signature.
5. **Invoice & commission** — Invoice posts with synced analytics; staff and ID commission percentages compute automatically from the invoice line.

## Key Differentiators (Verified in Code)

- Product photos on sale order lines for accurate, visual fixture quoting.
- Discontinued-stock sell-down logic enforced via onchange and hard constraint, not just a warning.
- Three named discount tiers (VIP/Gold/Silver) with per-user-group ceilings, on top of standard line/global/fixed-amount limits.
- Automatic, duplicate-safe analytic account propagation from sale order to project tasks, stock, and invoices.
- Auto-generated site appointment windows and planning slots the moment an order confirms.
- Custom "By Project" Gantt rendering with stage-based color coding and quick task drill-down.
- FSM worksheets prefilled with job, customer, and analytic context — no manual re-entry on-site.
- Per-product staff and interior-designer commission percentages computed straight onto invoice lines.

## What We Do NOT Claim

- Client/company name from the source repository (never mentioned in flyer copy).
- eCommerce / website storefront (not part of the custom modules).
- Manufacturing / MRP.
- POS / retail counter checkout (this is a quote-and-install B2B/B2C sales model, not shop-floor POS).
- Multi-currency or multi-company specifics beyond what is generically true of Odoo.

## Flyer Output

- **Slug:** `lighting-retail-installation`
- **Title:** Lighting Retail & Installation Operations
- **Subtitle:** Quote Fixtures, Control Discounts, Schedule Site Jobs & Bill with Commissions
- **Indexes:** Not updated per user instruction (standalone project, no root/en/zh index changes).
