# Fine-Tune Instructions — Project Site Procurement

## Open Items

- Hero image is a generated, brand-free construction-site material yard photo (site supervisor checking a delivery); swap for client-approved site photography if needed.
- `ms_query` and `oi_login_as` modules exist in the source repo but are intentionally excluded from flyer claims per user instruction.
- Dashboard KPI figures (MRs pending, PO value trend, spend mix, etc.) are illustrative only, not live data.
- Confirm with the client whether "Project Site Procurement" is the preferred external-facing name, since the internal system uses client-specific module names that must not appear publicly.

## Visual Tuning Notes

- Layout cloned directly from the `housewares-retail` modern A4 template (same CSS, same section order).
- Left hero fade must keep title/intro/quick benefits readable over the construction-site photo.
- Prefer shorter capability descriptions if two-line titles collide with body text at 100% zoom.
- Icon color cycle follows the template pattern: default blue, orange, purple, blue, green, orange, purple, blue across the 8 capability cards.

## Export Test Notes

- Serve via local HTTP (not `file://`) when testing PDF/PNG export.
- Shared editor script: `../../editor/flyer-editor.js?v=20260715-pdf-canvas-1` (unchanged from other current flyers — no version bump needed since the shared script itself was not modified).
- Charts use inline SVG donut/line (export-safe); avoid CSS conic-gradient.
- Verify Font Awesome icons and hero PNG load under `project-site-procurement-assets/`.

## User-Specific Instructions

- Industry framing: project-based construction/site procurement (user-provided), covering Material Requisition approval, project/cost coding, back-charge, MR-to-PO automation, vendor price comparison, site location control, PO/MR PDFs, bill verification, and purchasing reporting.
- **NEVER** mention "Ken-Pal", "Kenpal", or "KP" as a company brand anywhere in the flyer, alt text, or file contents. Technical "KP"-prefixed model/field names from the source code (e.g. `x_kp_account_codes`, `x_kp_purchasers`) are translated into plain business language only.
- `ms_query` and `oi_login_as` custom modules are explicitly excluded from all flyer claims (per user instruction).
- No root/`en`/`zh` index updates were made for this project — per user instruction, this flyer is intentionally not linked from the site indexes.
- Integrations row uses the user-specified app set: Purchase, Inventory, Accounting, Analytic Accounting, Budgets — plus Contacts, Documents, and Reporting to fill the standard 8-icon grid.
