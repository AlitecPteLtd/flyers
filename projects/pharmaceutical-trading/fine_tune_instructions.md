# Fine-Tune Instructions — Pharmaceutical Trading Operations

## Build Notes

- Built directly from `projects/housewares-retail` as the shell/CSS template (per explicit user request). All CSS classes, A4 dimensions (1024×1448), hero/fade/curve layers, and editor script wiring are unchanged from that baseline.
- Shared assets copied as-is from housewares-retail: `alitec-logo.jpeg`, `odoo-gold-partner.png`, `fontawesome/`, `webfonts/`.
- Hero image is a newly generated AI photo (pharma warehouse / pharmacist checking stock with a tablet) — no embedded text, no client branding. Stored at `pharmaceutical-trading-assets/pharmaceutical-trading-hero.png`.
- **Client name exclusion:** The source repo folder/module names reference a specific client. Per explicit instruction, that name is never used anywhere in the flyer, summary, or content files — all copy says "pharmaceutical distributors" / "pharma operations" generically.
- **Indexes intentionally NOT updated.** Per explicit user instruction ("No indexes"), the root `index.html`, `en/index.html`, and `zh/index.html` were left untouched. This project is not yet discoverable from the site navigation — link it manually if/when the user wants it published.

## Layout Deviations From Kitchen Template

- **Integrations row uses 6 apps** (Sales, Purchase, Inventory, Accounting, Follow-up, HR) instead of the usual 8, per explicit request. `.integration-grid` was changed from `repeat(8, 1fr)` to `repeat(6, 1fr)` and the `.circle` size was bumped slightly (62×50 vs 54×44) to fill the row width nicely. If a future project needs to revert to 8 apps, restore `repeat(8, 1fr)` and the smaller circle size.
- `.bar-item` label column width was widened from 62px to 92px to fit longer GPO/hospital account names ("Hospital GPO A", "Pharmacy Chain C") without wrapping — kept consistent in both EN and ZH.
- Donut chart SVG path was recomputed (not copy-pasted from kitchen) for an 82/18 split using precise trig (center 46,46; outer r=31; inner r=20) rather than reusing the kitchen template's 68/32 path, since the split ratio differs. If further chart ratios are needed, recompute with the same method (see conversation for the Python snippet) rather than eyeballing SVG path commands.

## Content Fidelity Notes

All 8 capability topics and the workflow/dashboard content were derived from actual code in `/Users/shawn/PycharmProjects/Odoo Sh Projects/md-pharma` (see `project_summary.md` for module-by-module evidence):

- Blanket/GPO agreements → `md_sale_blanket_order` (`sales.requisition`, GPO No, contracted/ordered/delivered/invoiced qty)
- Poison/controlled stock → `md_master.product.poison` field + `md_operation` poison stock move wizard/report + `md_print` poison stock report
- Lot lock/expiry → `md_operation.stock.lot.lock_state` (locked/unlocked, excluded from quant reservation) + `product_expiry` dependency
- Pharmacist e-sign → `md_operation` HR `is_a_pharmacist`/`is_a_director` + `e_signature`, `pharmacist_sign`/`director_sign` on stock/invoice/PO, printed on `md_print` reports
- FOC sales types → `md_operation.sale.order.line.foc` (Sales/Bonus/Sample/Exchange), auto zero price on non-sales lines
- Smart alerts → `smart_warnings` + `md_operation.smart_warning`, `is_approved` gating for danger/warning severities
- Printing UoM/amounts → `product.template.printing_uom_id`, `printing_price_subtotal`/`printing_tax_totals` distinct from stock UoM
- Follow-up/statements → `account_followup` + OCA `partner_statement` + `md_print` follow-up report and outstanding statement extensions

Dashboard numbers (34 agreements, 6 poison alerts, 12 locked lots, 9 pending sign-offs, 21 overdue statements, 82/18 sales mix, GPO utilization %, DO queue) are illustrative placeholder figures for visual balance, consistent with how other flyers in this repo (e.g. housewares-retail) use plausible sample metrics rather than real client data.

## Export / QA Status

- Not yet opened in a browser or exported to PDF/PNG in this session — recommend running the standard local HTTP server check (`python3 -m http.server` from the repo root) and verifying both `index.html` and `index-zh.html` render correctly, then testing PDF and high-res PNG export via the shared editor toolbar before publishing.
- Hero image should be spot-checked at full size for any accidental readable text on packaging (AI-generated photos occasionally produce blurry pseudo-text on labels); current image only has small out-of-focus color blocks, no legible characters.

## Open Items / Possible Follow-Ups

- If the user wants this project discoverable, add cards to `index.html`, `en/index.html`, and `zh/index.html` linking to `projects/pharmaceutical-trading/` (EN) and `projects/pharmaceutical-trading/index-zh.html` (ZH).
- Consider a dedicated hero image reshoot if the client wants a more distribution/logistics-centric shot (e.g. cold-chain packaging, forklift with medicine pallets) instead of the current pharmacist-with-tablet composition.
