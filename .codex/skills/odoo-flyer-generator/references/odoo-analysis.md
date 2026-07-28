# Odoo Source Analysis

Use this reference when turning a local Odoo Git repository into flyer content.

## Inputs To Confirm

- Source repository path.
- Target flyer slug and solution name.
- Any module or feature exclusions from the user.
- Whether the project should be a new flyer or an update to an existing flyer.
- Whether the target audience is owner, operations manager, finance, warehouse, service, sales, or customer portal users.

If the user gives enough context, proceed without asking. Ask only when the source path is missing or the target project conflicts with an existing slug.

## Repository Inspection

Inspect source files before writing copy:

```bash
git -C <source-repo> status --short
git -C <source-repo> branch --show-current
find <source-repo> -name "__manifest__.py" -o -name "__openerp__.py"
rg -n "depends|summary|description|category|application|installable" <source-repo> -g "__manifest__.py" -g "__openerp__.py"
rg -n "class |fields\\.|Many2one|One2many|Many2many|@api|_name|_inherit|state|selection" <source-repo> -g "*.py"
rg -n "<record|menuitem|act_window|report|template|kanban|tree|form|search|pivot|graph" <source-repo> -g "*.xml"
rg -n "controller|route|portal|website|mail.template|ir.actions.report|qweb|xlsx|barcode|qr|serial|lot|approval|workflow" <source-repo>
```

Also read any `README`, documentation, sample data, migrations, or tests.

## What To Extract

Map technical files to business meaning:

- Custom modules and their dependencies.
- New models and important inherited Odoo models.
- Main users and actions.
- Workflow states, approvals, callbacks, scheduled jobs, and automated computations.
- Portal, website, print/report, XLSX, PDF, barcode, hardware, and integration features.
- Operational pain points solved by the customization.
- Data continuity across Sales, Purchase, Inventory, Project, Accounting, Manufacturing, Website, CRM, Helpdesk, Documents, Approvals, or other Odoo apps.

Separate standard Odoo features from custom project value. The flyer should sell the customization and complete business process, not list raw models.

## Content Mapping

Use this mapping:

- Modules and dependencies -> Integration row.
- New models and fields -> Key capabilities.
- State machines and buttons -> Workflow panel.
- Reports, charts, lists, and metrics -> Dashboard/visibility panel.
- Automation and validations -> Business benefits.
- Portal/website/controller features -> Customer-facing benefits.
- Access control, approval, audit trail -> Governance benefits.

## Project Notes

Each project must include:

- `project_summary.md`: source repo path, analyzed modules, user exclusions, business process summary, key assumptions.
- `flyer_content.md`: final English and Chinese messaging blocks or a structured content map.
- `fine_tune_instructions.md`: open issues, visual tuning notes, export test notes, and any user-specific instructions.

Keep these files concise but specific enough that another agent can continue the flyer later.
