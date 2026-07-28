# QA And Publish Checklist

Use this reference before reporting that a flyer project is complete.

## Local HTML Checks

Open or render both language versions:

- `projects/<slug>/index.html`
- `projects/<slug>/index-zh.html`

Check:

- Hero text is readable.
- Logo layers are not blocked.
- Cards and badges are centered.
- No clipped text.
- Charts and icons show correctly.
- Business benefits and footer do not overlap.
- Export toolbar appears and does not cover important flyer content.

## Automated Visual Checks

Use a local HTTP server when testing canvas/PDF export because `file://` can cause missing images or blocked canvas output.

```bash
python3 -m http.server 8765 --directory /Users/guoqiangli/Downloads/github/flyers
```

Then inspect:

```text
http://127.0.0.1:8765/projects/<slug>/
http://127.0.0.1:8765/projects/<slug>/index-zh.html
```

If using Playwright or Chrome screenshots, capture at the flyer’s intended print dimensions and verify the full page, not just the visible viewport.

## Export Checks

Verify both:

- Browser PDF export.
- High-resolution PNG export.

PDF export should rasterize the flyer DOM first so CSS backgrounds, gradients, icons, and charts match the browser view. If vector PDF output loses effects, prefer the high-resolution PNG for printing.

When a PDF is generated, render the first page back to an image and compare visually:

```bash
pdftoppm -png -singlefile <exported.pdf> /tmp/flyer-check
```

Common export fixes:

- Convert CSS conic-gradient charts to inline SVG if blank.
- Ensure images have resolvable relative URLs and are loaded before capture.
- Use `html-to-image` or `html2canvas` through the shared editor script, not browser print alone.
- Use a local HTTP URL or GitHub Pages URL, not direct `file://`, when testing exports.

## Index Checks

After adding a project, verify links in:

- `index.html`
- `en/index.html`
- `zh/index.html`

Each project card should link to:

- English: `projects/<slug>/`
- Chinese: `projects/<slug>/index-zh.html`

Root index should keep the same visual style as the current site. Do not introduce unrelated colors or old project names.

## Git Checks

Before committing:

```bash
git -C /Users/guoqiangli/Downloads/github/flyers status --short
git -C /Users/guoqiangli/Downloads/github/flyers diff --stat
```

Commit only relevant files. Do not revert unrelated user changes.

Recommended commit message:

```text
Add <project name> flyer
```

If publishing:

```bash
git -C /Users/guoqiangli/Downloads/github/flyers push
```

If push fails because of network or credentials, report that local files and commit are ready and give the exact command for the user to run.

## Final Response

Keep the final response concise and include:

- Project path.
- English and Chinese page paths.
- Updated indexes.
- What was verified.
- Commit hash and push status, if applicable.
