# Project Summary — Installation Field Service Operations

## Business Context

Odoo 18 customization for a general installation contractor running sales into project / field service appointments, Gantt planning, delivery with installers, worksheets, invoicing, and optional payroll totals into accounting journals. Differentiated from HVAC-specific (`air-conditioning`) and lighting retail/install (`lighting-retail-installation`) flyers: this solution emphasizes installer assignment, appointment time windows, resource-team document security, and planning Gantt clarity for general installation field operations.

**Source repo:** `/Users/shawn/PycharmProjects/Odoo Sh Projects/pointone` (Odoo 18). Source path is documented here only. No client company names appear on the public flyer HTML or `flyer_content.md`. Payroll integration is described generically as “payroll journal sync” / “external payroll journal sync” without naming the payroll vendor.

**Audience:** Installation contractor owners, operations/dispatch planners, field supervisors, warehouse/delivery leads, and finance.

## Standard Odoo Apps Used

- **Sales** — Quotations and sales orders with installer fields
- **Field Service / Project** — FSM tasks, worksheets, service projects
- **Planning** — Planning slots linked to tasks, Gantt view and popovers
- **Inventory** — Deliveries / pickings with installed-by and related crew fields
- **Accounting** — Invoicing, customer statements, PDF export templates, optional payroll journals
- **Manufacturing** — MRP-linked delivery print layouts
- **HR** — Employees used as installers / installed-by resources

## Custom Modules (Core Solution)

### pointone_operation
Core field operations: appointment date and start/end time window on `project.task`; service customer + mobile and job/pricing details; planning slots linked to tasks with Gantt popover/render assets; overall installer on sales order and line installer; installed-by (and related pack/remove/deliver crew fields) on stock pickings; customer statement data; PDF export template extensions for accounting reports; task field-edit wizard for appointment/resource updates.

### pointone_print
Branded / extended print layouts: field service report inheritance and MRP-aware delivery slip printing.

### ac_resource_team_security
Field Service group “Team Documents Only” so users see documents for resource teams they belong to.

### ac_stock_price_cost_visibility
Restricts product list price and standard cost visibility by role.

### pointone_talenox (flyer wording: payroll journal sync only)
Syncs payroll totals and creates accounting journal entries. Public flyer never names the payroll product; copy says “payroll journal sync” or “external payroll journal sync”.

### Supporting
- **ac_widget_image_download** — Download images from worksheet image widgets
- **pointone_webservice** — Internal webservice foundation (not flyer-facing)
- **OCA partner_statement / report_xlsx** — Statement of account PDF/XLSX support present in repo
- Ops tooling (login-as, list freeze, smart warnings, environment ribbon) excluded from flyer claims

## End-to-End Workflow

1. **Quote** — Prepare installation quotation
2. **Confirm with installer** — Confirm SO; set overall and line installers
3. **Schedule appointment** — Appointment date/time window on the task
4. **Plan on Gantt** — Planning slots linked to tasks with popover detail
5. **Deliver / install** — Delivery with installers; installed-by on picking
6. **Worksheet** — Complete field worksheet / service report
7. **Invoice** — Invoice the job; customer statements as needed
8. **Payroll journals** — Optional payroll totals → accounting journals

## Key Differentiators (Verified in Code)

- Appointment date + start/end window and display range on tasks
- Service customer and mobile on task / planning
- Job details and pricing details on task and linked planning slots
- Overall installer on SO cascading to line installer
- Installed-by (and related crew) on stock pickings
- Planning Gantt custom popover and slot–task linkage
- Resource team document security for FSM users
- Cost/price visibility controls
- Customer statements and PDF export templates
- FSM report print + MRP-linked delivery print
- Optional payroll totals → accounting journals (generic wording on flyer)

## What We Do NOT Claim

- Client company names (source folder / module brand names) on HTML or flyer_content
- Named payroll vendor brands on the public flyer
- HVAC-specific checklists or lighting retail POS flows (covered by other flyers)
- Website / eCommerce storefront as a primary story

## Flyer Output

- **Slug:** `installation-field-service`
- **EN title:** Installation Field Service Operations
- **ZH title:** 安装现场服务运营
- **Subtitle (EN):** Appointments, installers, and Gantt planning in one flow
- **Integrations shown:** Sales, Field Service, Planning, Project, Inventory, Accounting, Manufacturing, HR (8)
- **Hero image:** Technicians installing equipment on site (no brands/text overlays)
- **Indexes:** Not updated (explicit user instruction)
