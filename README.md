# Odoo Solution Flyers

This repository stores editable HTML flyers for different Odoo solution projects and publishes them through GitHub Pages.

Reusable flyer-generation skill:

```text
.codex/skills/odoo-flyer-generator/
```

Full workflow:

```text
ODOO_TO_FLYER_WORKFLOW.md
```

Recommended project structure:

```text
projects/
  project-name/
    index.html
    index-zh.html
    project_summary.md
    flyer_content.md
    fine_tune_instructions.md
    project-name-assets/
```

Each project folder should contain:

- `index.html`: English editable flyer HTML.
- `index-zh.html`: Chinese editable flyer HTML.
- `project_summary.md`: source analysis and assumptions.
- `flyer_content.md`: final content structure.
- `fine_tune_instructions.md`: tuning and review notes.
- `project-name-assets/`: project images and supporting assets.

## Browser Editing

All flyer pages can now be edited directly in the browser.

- Open a project `index.html`.
- Use the bottom-right toolbar.
- Click `Edit Text` to enable inline text editing.
- Click `Save Draft` to keep a browser-local draft with `localStorage`.
- Click `Load Draft` to restore that saved draft later.
- Click `Download HTML` to save the edited flyer as a new HTML file from the browser.
- Click `Copy HTML` to copy the full edited HTML markup.
- Click `Save A4 PDF` for PDF export.
- Click `Download PNG` or the high-resolution PNG option for print fallback when PDF effects differ from the browser view.

Note:

- Static browser pages cannot overwrite the original local file directly.
- The browser save flow downloads a new edited HTML file instead.

For each new Odoo project:

1. Review the custom Odoo modules and understand the business flow.
2. Separate standard Odoo apps from custom solution areas.
3. Write the flyer around the solution value, key capabilities, workflow, dashboard, integrations, and business benefits.
4. Keep the HTML self-contained except for files inside that project folder.
5. Create both English and Chinese flyer pages.
6. Update `index.html`, `en/index.html`, and `zh/index.html`.
7. Export a PNG/PDF only after the HTML preview looks correct.
