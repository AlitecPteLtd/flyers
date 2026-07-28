# Odoo Project To Flyer Workflow

This repository includes a reusable Codex skill for creating Alitec Odoo solution flyers from local Odoo Git repositories.

Skill location:

```text
.codex/skills/odoo-flyer-generator/
```

Use it when a user provides an Odoo source folder and asks to create a new flyer, update the website indexes, create Chinese and English versions, or verify PDF/PNG export.

## Standard Steps

1. Analyze the Odoo Git repository before writing flyer content.
2. Identify custom modules, workflows, reports, dashboards, integrations, and business value.
3. Create one project folder under `projects/<project-slug>/`.
4. Create `index.html`, `index-zh.html`, `project_summary.md`, `flyer_content.md`, and `fine_tune_instructions.md`.
5. Use the existing modern flyer layout and shared editor/export script.
6. Update `index.html`, `en/index.html`, and `zh/index.html`.
7. Verify browser view, A4 layout, PDF export, and high-resolution PNG export.
8. Commit and push so GitHub Pages updates.

## Layout Rules To Keep

- Hero image must be a background layer with a white fade on the left.
- All important hero text must sit in the readable white/fade area.
- Alitec logo and Odoo Gold Partner logo must not be blocked.
- Number circles, icons, titles, and descriptions must be centered/aligned.
- Do not let business benefits overlap the footer.
- Avoid hero images with embedded text because exports and previews become unreadable.
- Use high-resolution PNG export as the print fallback when browser PDF loses effects.

## Project Notes

Every new flyer must keep a project record:

- `project_summary.md`: source path, modules reviewed, exclusions, business flow, assumptions.
- `flyer_content.md`: final message structure for English and Chinese.
- `fine_tune_instructions.md`: visual tuning notes, export issues, and next review instructions.

## Publishing

The live site is:

[https://alitecpteltd.github.io/flyers/](https://alitecpteltd.github.io/flyers/)

After adding or updating flyers, commit and push this repository. GitHub Pages will serve each project at:

```text
https://alitecpteltd.github.io/flyers/projects/<project-slug>/
https://alitecpteltd.github.io/flyers/projects/<project-slug>/index-zh.html
```
