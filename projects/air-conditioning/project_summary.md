# Project Summary — Air-Conditioning Service Operations

## Business Context

Odoo 17 customization for an air-conditioning (HVAC) field service business running quotation-to-invoice service jobs on Field Service / Project. Service tasks carry site, contact, and appointment details; confirmed sales orders auto-generate linked projects and tasks with shared analytics; technicians complete FSM worksheets against a built-in HVAC checklist and close jobs with a signed, photo-backed service chit; finance issues branded documents with role-based price/cost visibility and reports commission by resource.

**Source repo:** `/Users/shawn/PycharmProjects/Odoo Sh Projects/euconair` (custom modules only)

**Audience:** HVAC service company owners, dispatch/planning, field technicians, sales, and finance.

## Standard Odoo Apps Used

- **Sales** — Quotation to confirmed service order, analytic distribution
- **Project / Field Service (Worksheet)** — Service tasks, appointments, FSM worksheets
- **Planning** — Resource/role scheduling for service visits
- **Inventory** — Stock moves tied to service parts
- **Accounting** — Invoicing, branded documents, price/cost fields
- **Contacts** — Service site and customer records

## Custom Modules (Core Solution)

### euconair_operation
Core FSM/operations layer:
- Service task fields: service customer/address (street, city, zip, state, country), service mobile/phone, appointment date, start/end appointment time, resource, role, job/service details
- SO confirmation creates/links an analytic account, applies it at 100% on order lines, and carries it onto generated project tasks
- Service project planning window (SO date to +1 year), appointment window auto-set on generated tasks
- Default HTML service checklist seeded on task job details (filters cleaned, fan checked, motor greased/oiled) that flows into the FSM worksheet
- `commission.resource` reporting model: allocates each sales order line's value across the resource(s) assigned to its tasks; "Commission" flag on products/order lines; sales analysis extended with commission and resource grouping
- Reference unit cost shown next to unit price on sales/invoice lines and stock moves; price/trend indicator

### euconair_print
Branded document pack: tax invoice, quotation/order, purchase order, delivery order, credit note, payment receipt, outstanding statement, and a job-completion **service chit** report — analytic account, appointment/service details, order-line worksheet items, up to 10 job photos, and technician + client signature blocks.

### euconair_worksheet_image_dragdrop
Drag-and-drop image widget for FSM worksheets; technicians drop job photos directly onto worksheet image fields (falls back to a standard image widget in generated PDF output).

### ac_stock_price_cost_visibility
Role-based visibility: sale price restricted to Salesman/Invoicing groups; cost price restricted (read-only) to Accounting/Stock Manager groups.

## End-to-End Workflow

1. **Quote & confirm** — Quote air-conditioning service and confirm the sales order
2. **Schedule the visit** — Task carries service address, contact, resource, and appointment window
3. **Complete the worksheet** — Technician runs the HVAC checklist (filters, fan, motor) and attaches job photos via drag-and-drop
4. **Sign off** — Print the service chit with photos and technician/client signatures
5. **Deliver & invoice** — Branded delivery, invoice, and commission-by-resource reporting close out the job

## Key Differentiators (Verified in Code)

- Service site and appointment window captured directly on project tasks
- Automatic order-to-project/task generation with a shared analytic account
- Built-in HVAC checklist (filters/fan/motor) default on every worksheet
- Signed service chit PDF with parts list, photos, and dual signatures
- Drag-and-drop worksheet photo capture
- Commission-for-resource list/pivot reporting split by task assignment
- Reference unit cost beside price, with role-restricted price/cost visibility
- Consistent branded documents across the sales-to-invoice cycle

## What We Do NOT Claim

- Client brand name (Euconair / EAS) on the marketing flyer
- CRM or lead-to-opportunity pipeline
- Website or customer self-service portal booking
- GPS / live technician location tracking
- Manufacturing / MRP
- bizSAFE or other certification logos (client-specific branding)

## Flyer Output

- **Slug:** `air-conditioning`
- **Title:** Air-Conditioning Service Operations
- **Subtitle:** From Quotation and On-Site Appointments to Worksheets, Delivery & Invoicing with Odoo
