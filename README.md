# Odoo Solution Flyers

This repository stores editable HTML flyers for different Odoo solution projects.

Recommended structure:

```text
projects/
  project-name/
    index.html
    assets/
    export/
```

Each project folder should contain:

- `index.html`: the editable flyer HTML.
- `assets/`: project images, logos, fonts, and icons.
- `export/`: generated PNG/PDF files for sending to customers.

## Browser Editing

All flyer pages can now be edited directly in the browser.

- Open a project `index.html`.
- Use the bottom-right toolbar.
- Click `Edit Text` to enable inline text editing.
- Click `Save Draft` to keep a browser-local draft with `localStorage`.
- Click `Load Draft` to restore that saved draft later.
- Click `Download HTML` to save the edited flyer as a new HTML file from the browser.
- Click `Copy HTML` to copy the full edited HTML markup.

Note:

- Static browser pages cannot overwrite the original local file directly.
- The browser save flow downloads a new edited HTML file instead.

For each new Odoo project:

1. Review the custom Odoo modules and understand the business flow.
2. Separate standard Odoo apps from custom solution areas.
3. Write the flyer around the solution value, key capabilities, workflow, dashboard, integrations, and business benefits.
4. Keep the HTML self-contained except for files inside that project folder.
5. Export a PNG/PDF only after the HTML preview looks correct.
