# Project Summary — Stainless Steel Spring Manufacturing

## Business Context

Odoo 18 make-to-order (MTO) manufacturing solution for a precision stainless-steel spring maker (compression, extension, torsion springs, flat springs/shims). Covers multi-quantity engineered quoting, explicit sales-to-manufacturing traceability, delivery-date-driven order splitting, shop-floor work order quantity splitting, pass/fail quality capture, packing and label printing, and a full branded industrial document suite.

**Source repo:** `/Users/shawn/PycharmProjects/Odoo Sh Projects/elitesprings` (read-only input — client name not used anywhere in flyer folder name or copy)

## Standard Odoo Apps Used

- **Sales** — Quotations, SO, pricelists, multi-line quantity breaks
- **Manufacturing (MRP)** — BoMs, manufacturing orders, work orders, routings
- **Quality (`quality_mrp`)** — Quality points and checks on manufacturing orders
- **Inventory** — Stock moves, pickings, deliveries, barcode
- **Purchase** — RFQ, PO, procurement
- **Accounting** — Invoicing, debit notes, proforma/commercial invoices
- **Contacts** — Partner records, account managers

## Custom Modules (Core Solution)

### elite_master
Spring engineering master data on `product.template`: outside/inside diameter, wire diameter, free length/height, overall height, max load, spring rate (incl. per-25mm and K variants), torque, deflection angle, pitch, suggested mandrel size, leg length, and load-at-height figures. Also a "Update Customer" wizard that stamps a `customer_ref` from a selected partner, and an auto-generated partner reference code (`button_generate_reference`).

### elite_operation
- Multi-line quotation templates (`quotation.multi.line.template`) — a reusable set of quantities; a wizard adds one SO line per template quantity, each priced via `pricelist_id._get_product_price()` — this is the "multi-qty quote" capability.
- Explicit `elite_sale_line_id` link from `mrp.production` to `sale.order.line` (kept even when the standard MTO chain breaks for consumable products).
- MO shows `partner_ref`, `partner_order_ref`, and a job reference number, all computed from the linked SO.
- Sale order line PDF attachments (`pdf_doc_ids`) for engineering drawings, viewable from the MO via a "View PDFs" button.
- SO-level packing type and quantity-per-pack fields; label type (Ad-hoc / Project) selection.
- Sale order cancel guard: blocks cancellation while linked MOs are confirmed/in progress/done.

### elite_mrp / elite_mrp_qc
- `mrp.workorder` fields `wo_to_do_qty` / `wo_produced_qty`: on `button_finish`, if produced < to-do, a backorder WO is created; the next BOM operation's WO quantity is updated or split automatically. Overproduction is blocked except on the first operation.
- `quality.check` extended with `elite_failed_qty` / `elite_passed_qty`; a fail wizard (`elite.qc.fail.wizard`) prompts for the failed quantity and computes the passed quantity automatically, for both move-line and MO-level quality checks.

### elite_label_print
Label print wizard (number of labels, quantity per label) driven from stock moves; label report shows PO number, part name/description (ad-hoc vs project layout), customer ID, quantity, and up to three custom label text/value pairs from the sale order line.

### ac_print
Branded PDF layouts: quotation, MO order sheet, delivery slip (+ carbon copy), invoice (+ carbon, + delivery combined), purchase order, payment receipt, journal voucher, debit note (+ carbon), commercial invoice (+ carbon), proforma invoice, transfer labels.

### Supporting modules
- **ac_historical_po** — Manually lock historical POs to prevent confirmation/receipt.
- **elite_partner_sale_users** — Dedicated account manager field on `res.partner`.
- **sale_order_line_date / sale_delivery_split_date (OCA)** — Per-line commitment dates that drive separate procurement groups/MOs by delivery date.
- **ac_operation** — Base stock/sales/purchase/accounting layout customisation.
- **partner_statement / report_xlsx (OCA)** — Statement and Excel export tooling (not the headline feature for this flyer).

## End-to-End Workflow

1. **Quote** — Sales picks a product and a multi-line quantity template; the wizard bulk-adds priced lines for each order-quantity break using the spring's engineering specs and pricelist.
2. **Confirm & split** — Confirming the SO groups lines by delivery date into separate, traceable manufacturing orders; each MO keeps an explicit link back to its sale line.
3. **Produce** — Work orders route through forming/cutting/shim operations; to-do vs produced quantity drives automatic backorders and next-operation WO creation.
4. **QC check** — Shop floor captures pass/fail quantity at each quality checkpoint via the fail wizard.
5. **Pack & ship** — Ad-hoc or project labels print with PO number, part identity, customer ID and pack quantity; delivery, invoice and other branded documents complete the trail.

## Key Differentiators (Verified in Code)

- Full spring engineering spec sheet (OD/ID/wire/rate/load/torque/etc.) as native product fields
- One-click multi-quantity quoting using pricelist-driven quantity templates
- Explicit SO-line ↔ MO link surviving MTO chain breaks on consumable products
- Delivery-date-driven automatic order/MO splitting
- Work order to-do/produced quantity tracking with auto backorder and next-operation propagation
- Structured pass/fail quantity capture wizard integrated into standard Odoo Quality checks
- Ad-hoc/Project label printing with custom per-line label fields
- Full branded industrial document set (quotation through commercial/proforma invoice and carbon copies)

## What We Do NOT Claim

- Client brand name on the public flyer (source repo and modules use client-specific prefixes; the flyer describes the generic capability only)
- CAD/CAM or spring design/simulation software
- IoT or real-time machine monitoring
- Finite-capacity advanced planning and scheduling (APS)
- Customer portal or eCommerce
- Barcode/RFID hardware integration beyond standard `stock_barcode`

## Flyer Output

- **Slug:** `stainless-steel-springs`
- **Title:** Stainless Steel Spring Manufacturing
- **Subtitle:** MTO Production — Engineered Quotes, Shop Floor QC & Packing Labels with Odoo
