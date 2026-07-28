# Flyer Build Rules

Use this reference before creating or editing project flyer HTML.

## File Requirements

Create these files for every new project:

```text
projects/<slug>/index.html
projects/<slug>/index-zh.html
projects/<slug>/project_summary.md
projects/<slug>/flyer_content.md
projects/<slug>/fine_tune_instructions.md
projects/<slug>/<slug>-assets/
```

Use relative paths so the flyer works locally and on GitHub Pages.

## A4 Layout

- Use one A4 portrait page with print-safe dimensions matching existing flyers.
- Keep the visible flyer width consistent across all projects.
- Use `box-sizing: border-box` globally.
- Avoid content that depends on browser scroll width.
- Keep the footer inside the page, not fixed to the viewport.
- Do not let the business benefits bar touch or overlap the contact footer.
- Test at the intended flyer width and at browser zoom 100%.

## Hero Rules

- Hero image must be a background layer or absolute layer inside the hero, not a normal block that pushes content down.
- Put a white-to-transparent fade over the left side of the hero image.
- Put all title, subtitle, and intro text inside the white/fade zone.
- Keep Alitec logo clear on the left and Odoo Gold Partner logo clear on the right.
- Do not place text over busy image areas.
- Do not use hero images containing embedded text, UI panels, or unreadable labels.
- Prefer realistic business/lifestyle images that match the use case.
- Ensure decorative waves, ribbons, and curves stay behind text/cards.

## Text And Card Alignment

- Center number text inside all circular badges using flex centering.
- Align icon circles, titles, and descriptions consistently within repeated cards.
- Give two-line card titles enough line-height and margin so they do not collide with descriptions.
- Do not clip card text with fixed heights unless the text is deliberately shortened.
- Keep capability card descriptions concise. Shorten text before shrinking font too far.
- Use consistent gutters between columns and rows.

## Standard Page Sections

Recommended order:

1. Hero with logos, title, subtitle, intro paragraph, and four quick benefit cards.
2. Key capabilities, usually eight cards.
3. Two-panel operational section: workflow/control and dashboard/visibility.
4. Seamless integration with Odoo apps.
5. Business benefits.
6. Contact footer.

Only change this order when the project requires it and the final A4 layout remains clean.

## Charts And Icons

- Prefer CSS or SVG charts that render consistently in browser export.
- Pie/donut charts must not use unsupported PDF/canvas effects that can disappear in exports.
- If a CSS conic-gradient chart fails in PDF/PNG export, replace it with inline SVG paths.
- Line charts must space month labels evenly; avoid known May/Jun label gaps.
- Use Font Awesome or inline SVG consistently. Confirm icons render in local HTML and exported output.

## Editing And Export Controls

Include the shared editor script:

```html
<script src="../../editor/flyer-editor.js?v=<date-or-version>"></script>
```

The page must support:

- Edit text.
- Save draft to browser local storage.
- Load draft.
- Download edited HTML.
- Copy HTML.
- Save A4 PDF.
- Download high-resolution PNG for print fallback.

If the shared editor script changes, update the version query string across all flyer pages so GitHub Pages does not serve stale JavaScript.

## Bilingual Rules

- English file: `index.html`.
- Chinese file: `index-zh.html`.
- Chinese content should be natural Chinese, not word-by-word machine translation.
- Keep the same layout, card counts, and visual hierarchy in both versions.
- Update `en/index.html`, `zh/index.html`, and root `index.html` for every new project.

## Common Mistakes To Avoid

- Header image covering the title or logos.
- Odoo logo placed over dark or busy image areas without enough contrast.
- Hero title too large for the A4 width.
- Number circles not centered.
- Two-line titles too close to descriptions.
- Business benefits overlapping the footer.
- Integration section hidden behind the benefits bar.
- PDF missing background hero image, icons, or charts.
- Browser-only edits that are not downloadable or documented.
- New project added to one index but missing from another.
