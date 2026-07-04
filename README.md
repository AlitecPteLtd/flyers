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

For each new Odoo project:

1. Review the custom Odoo modules and understand the business flow.
2. Separate standard Odoo apps from custom solution areas.
3. Write the flyer around the solution value, key capabilities, workflow, dashboard, integrations, and business benefits.
4. Keep the HTML self-contained except for files inside that project folder.
5. Export a PNG/PDF only after the HTML preview looks correct.
