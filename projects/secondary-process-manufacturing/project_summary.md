# Project Summary — Secondary Process Manufacturing

## Business Context

Odoo 18 customization for a secondary-process manufacturing factory that receives customer materials, runs them through traveler-based routings, performs IQC/OQC quality control, tracks jobs through split/combine/rework flows, and releases finished work back to customers with supporting documentation.

Source repo: `richport_2025` (internal only — flyer slug is `secondary-process-manufacturing`).

## Odoo Base Apps

- **Manufacturing (MRP)** — production orders, BoMs, work orders, shop floor
- **Inventory** — material movement and picking support
- **Sales** — customer pricing linkage on received items (via `rp_operation`, currently not installable)
- **Accounting** — invoicing helpers on returns (via `rp_operation`)

## Custom Modules

### rp_master
Master data for traveler-driven manufacturing:
- **Traveler template products** (`is_traveler`) with stage BoMs: incoming, in-process, outgoing
- **Customer products** linked to traveler templates via `traveler_id`
- Product specs: PDFs, dimensions, material, packaging, treatment, RoHS, special instructions
- **Work center phases**: IQC, Process, OQC
- BoM engineering check flag on traveler BoMs

### rp_mrp (core execution)
Shop-floor manufacturing extensions:
- MO carries `customer_product_id`; production uses linked **traveler template** routing
- **Split** production orders with work order and quality-check history carry-over
- **Combine** multiple MOs at the next shared ready operation (`combined_pending` state on sources)
- **Reject** quantity → repair MO (`RW-` prefix), engineering hold, quality work center insertion
- **Rework** work orders inserted before OQC (Phantom → Normal → Rework → OQC sequence)
- **IQC reject** wizard with IORA (customer agrees to proceed) flag and return-to-outgoing path
- **Serial registration** via lightweight `rp.serial` model
- Split/combine lineage fields on MO and WO
- Custom manufacturing order print with barcode on origin/reference

### rp_operation (disabled in manifest)
Intended operational wrapper (not installable — do not claim as live unless enabled):
- `customer.item` for incoming received parts → `send_to_production()` creates MO
- `customer.return` groups completed MOs for customer return
- Stock picking owner flags and invoice-from-picking helper

## End-to-End Flow

1. **Master setup** — Define customer part specs and link to traveler template + phased work centers
2. **Receive material** — Register incoming customer items (when `rp_operation` enabled) or create MO directly
3. **Launch job** — MO created from customer product; traveler template drives BoM/operations
4. **IQC / process / OQC** — Execute work orders by phase; record quality checks on shop floor
5. **Handle exceptions** — Split lots, combine batch jobs, reject to repair/engineering, rework before OQC
6. **Track & document** — Serials, split/combine lineage, traveler prints, specs/PDFs on product
7. **Release** — Complete MOs and return finished work to customer

## Key Differentiators (Verified)

- Traveler template pattern separating customer SKU from internal routing
- IQC / Process / OQC work center phase model
- Combine MOs at next common ready operation with QC result push-back
- Rework sequencing before OQC
- IQC rejection with IORA customer-agreement path

## Do NOT Claim on Flyer

- Client name "Richport" or repo name `richport_2025`
- Dedicated automated COC document module (not found — use "compliance / traveler documentation")
- Full Odoo lot/serial traceability (custom `rp.serial` is lightweight)
- `rp_operation` receiving/return flow unless user confirms module is installed

## Flyer Positioning

**Title:** Secondary Process Manufacturing  
**Subtitle:** Incoming Jobs, IQC/OQC & Shop Floor Control with Odoo
