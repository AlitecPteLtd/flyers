# Fine-Tune Instructions — Precision CNC Manufacturing (precision-cnc-manufacturing)

## Confirmed Positioning

- **Industry:** Precision engineering / CNC job-shop manufacturing (high-mix, low-volume)
- **Title:** Precision CNC Manufacturing
- **Subtitle:** High-Mix Job Shop — Materials, Planning & Billing with Odoo
- **No client brand name** on flyer (do not use "ACOT" or "ACOT Precision Engineering")

## Hero

- Theme: CNC machining workshop, precision metal parts
- Fading navy curve over hero image (standard brochure style)
- Steel blue accent `#1565c0` for charts and highlights
- Compact hero ~360px; hero image ~340px; object-position favoring subject on the right
- Page size: 1024 × 1448 px (true A4)

## Must-Keep Claims (Verified in Source)

- Operation routing with work centers and process notes (`acot_operation`)
- Per-operation QC rules on BoM operations
- Multi-level MOs with parent/child scheduling
- SO → MO linkage with commitment-date scheduling
- Shop-floor work orders with partial-completion controls
- Certificate of Conformance on delivery (`acot_print`)
- MO travelers with plan/actual minutes and barcodes
- OCA `mrp_multi_level` scheduler
- Material tracking, stock by location, purchase balance
- SO ↔ MO ↔ DO ↔ invoice traceability

## Avoid Claiming

- Client brand "ACOT" or acot-18 repo name
- Native CNC/DNC machine integration or CAM
- CAD/PLM or drawing management
- Finite-capacity APS optimizer
- ISO certification (only QMS reference fields exist)
- IoT or machine telemetry
- eCommerce or customer portal

## Dashboard Mock Data Theme

- KPIs: Open MOs, WO In Progress, QC Pending, Material Short, Due This Week
- Donut: In Progress vs Pending RM
- Bar chart: Work center load (CNC Mill, Lathe, Grinding, Assembly)
- Queue: MOs due this week with part numbers

## Review Checklist

- [ ] Hero shows precision manufacturing / CNC context
- [ ] Quick benefits box width 720px
- [ ] Footer 6-column grid with alitec.asia contacts
- [ ] Dashboard bottom section filled
- [ ] Business benefits bar at bottom: 87px above footer
- [ ] No client brand names in copy

## PPT Stage

- Wait for flyer approval before building 4–7 page PPT
- Use same copy hierarchy as flyer_content.md
