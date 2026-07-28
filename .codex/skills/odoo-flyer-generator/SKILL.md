---
name: odoo-flyer-generator
description: Create or update Alitec Odoo solution flyer projects from a local Odoo Git repository. Use when the user provides an Odoo source folder or module repository and asks to make a flyer, add a new project to the flyers GitHub Pages site, create English and Chinese flyer versions, update root/en/zh indexes, add project summary or fine-tuning notes, or fix flyer export/edit/download behavior.
---

# Odoo Flyer Generator

## Core Workflow

1. Read `references/odoo-analysis.md` before inspecting the source Odoo repository.
2. Read `references/flyer-build-rules.md` before creating or editing flyer HTML.
3. Read `references/qa-and-publish.md` before final verification, commits, or publishing.
4. Analyze the Odoo repository first. Do not write flyer copy from the project folder name alone.
5. Create one flyer project at a time. Do not create PPT and flyer together unless explicitly requested.
6. Preserve existing flyers and indexes. Add new projects without deleting or renaming old projects.

## Expected Repository Shape

Work in the flyers repository:

```text
flyers/
  index.html
  en/index.html
  zh/index.html
  editor/flyer-editor.js
  editor/vendor/
  projects/<project-slug>/
    index.html
    index-zh.html
    project_summary.md
    flyer_content.md
    fine_tune_instructions.md
    <project-slug>-assets/
```

Use the current shared editor/export script from `editor/flyer-editor.js`. New flyer pages must include the browser toolbar behavior already used by the existing flyers: edit text, save draft, load draft, download HTML, copy HTML, save A4 PDF, and high-resolution PNG export when available.

## Creation Rules

- Choose a clear slug, such as `storage-rental-business`, and place all project files under `projects/<slug>/`.
- Create both `index.html` and `index-zh.html`.
- Create `project_summary.md`, `flyer_content.md`, and `fine_tune_instructions.md` for every new project.
- Copy shared assets only when needed. Keep project-specific images inside `<slug>-assets/`.
- Update `index.html`, `en/index.html`, and `zh/index.html` with links to the new project.
- Keep GitHub Pages URLs relative and stable: `projects/<slug>/` for English and `projects/<slug>/index-zh.html` for Chinese.
- Commit only the files required for the project and index updates.

## Design Baseline

Prefer the latest standard flyer structure used by the existing modern flyers:

- A4 portrait canvas with fixed print-safe proportions.
- Full-width hero banner.
- Left hero area has a strong white/fade zone for readable text.
- Right hero area contains the lifestyle or operational image.
- Alitec logo stays on the left, Odoo Gold Partner logo stays on the right.
- Hero image is a background layer, not an element that pushes content down.
- Quick benefit cards sit inside the hero area without clipping.
- Key capabilities use centered icons, centered number circles, and consistent vertical alignment.
- Business benefits and contact footer remain separated, with no overlap.

Do not reuse a source screenshot or hero graphic that contains unreadable embedded text. Generate or select a clean realistic business/lifestyle image and place all important text as editable HTML.

## Content Expectations

Translate technical Odoo modules into business language:

- Hero: solution name, one-line positioning, short business paragraph.
- Quick benefits: 4 short outcome cards.
- Key capabilities: usually 8 capability blocks.
- Workflow panel: operational sequence from enquiry/order to invoicing/reporting.
- Visibility/dashboard panel: metrics, status mix, trend, table.
- Integration row: relevant Odoo apps, not every possible app.
- Business benefits: 4 concise commercial outcomes.
- Footer: Alitec contact details consistent with existing flyers.

When the user gives exclusions, such as ignoring OCR/PDF timesheet modules, follow them and document the exclusion in `project_summary.md`.

## Output

At completion, report:

- Local project path.
- Local English and Chinese HTML files.
- Updated index files.
- Export/edit verification status.
- Git commit hash if committed.
- Push status if publishing was attempted.
