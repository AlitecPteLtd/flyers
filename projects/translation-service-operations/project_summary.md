# Project Summary — Translation Service Operations (Lingua)

## Business Context

Odoo customization for a professional translation agency managing client quotations, translation projects, vendor assignments, and billing. The solution connects sales and project delivery with third-party CAT tools, automates vendor purchase orders from translation documents, and supports language-pair product catalogs with word/character pricing.

## Standard Odoo Apps Used

- **Sales** — Client quotations and sales orders with project metadata
- **Project** — Translation jobs with deadlines, status, and analytic accounts
- **Purchase** — Vendor POs for translators and reviewers
- **Accounting** — Invoicing with project manager tracking
- **Contacts** — Clients and vendor translators mapped to CAT tool users

## Custom Modules (Core Solution)

### la_master
Master data for translation operations:
- **Turnaround time** and **delivery format** lookup tables
- **Sale order memo** templates for standard quotation notes
- **Products** with `from_lang`, `dest_lang`, and service type (`TR`, `TEP`, `REV`)
- Supplier pricelist support for vendor rates

### la_operation
Core operational flow:
- Sales orders extended with project name, deadline, project manager, client PM, turnaround, delivery format
- Quotation templates pre-fill memo, turnaround, and delivery format
- Sale order lines create projects with start date, deadline, and PM from the order
- **translation.document** model tracks document name, translator, reviewers, assignment type, status, weighted words/chars, deadline
- **Create PO** from documents — auto-selects language-pair product, calculates qty from weighted words/chars or minimum charge
- Purchase orders linked to translation documents and analytic accounts
- Custom project numbering sequence

### la_memoq
Third-party CAT tool integration (MemoQ in this implementation):
- Create/delete CAT projects from confirmed sales orders (source/target language validation)
- Cron sync of project status (Live / Wrapped Up)
- Pull translation documents from the CAT tool — status, target language, weighted counts, translator/reviewer assignments
- Map CAT tool user GUIDs to Odoo vendor contacts
- Email notification when CAT project is ready

### la_file_manager
- Auto-duplicate project folder structure from a template when a sale converts to project
- Configurable source/destination paths via system parameters

### la_import
- Bulk import client contacts and quotations from Excel files
- Multi-step wizard: import contacts → convert to quotations → update database

### la_print
- Custom print layouts for quotations, invoices (including Japan variant), job orders, and purchase orders

### Supporting modules
- **ac_sale_order_do** — Delivery order creation and reports from sales orders
- **sales_team_security** — Restrict CRM/sales data by sales team
- **sendinblue** — Email marketing integration
- **report_excel** — Configurable Excel report export

## End-to-End Workflow

1. **Quote** — Build quotation with language-pair products, turnaround, delivery format, project deadline
2. **Confirm** — Sales order creates analytic account and project; optional CAT project creation
3. **Kickoff** — Project folder copied; translation tool documents synced with assignments
4. **Vendor PO** — Generate purchase orders per translator/reviewer from document weighted counts
5. **Invoice** — Bill client with branded quotation/invoice/job order documents

## Key Differentiators (Verified in Code)

- Language-pair products with TR / TEP / REV service types
- Word and character UoM pricing with minimum charge fallback
- Third-party CAT tool bidirectional sync for projects and documents
- One-click PO creation from translation document assignments
- Quotation templates with translation-specific fields
- Project file folder automation

## What We Do NOT Claim

- Full TMS replacement for external CAT tools
- Machine translation or AI translation features
- Client portal for file upload (not in custom modules reviewed)
- Automated client invoicing from CAT tool word counts (PO side is automated; client billing uses standard SO)

## Flyer Positioning

**Title:** Translation Service Operations  
**Subtitle:** Language Projects — From Quote to Delivery with Odoo  
**Tone:** Professional B2B translation agency operations — no client brand name on flyer.
