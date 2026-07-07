# Project Summary — Corporate Hamper Gifting

## Business Context

Odoo customization for a corporate hamper and gift distributor selling through eCommerce and counter quick-sale channels. Buyers can place one checkout order with many recipients — each line gets its own delivery address, shipping date, and greeting card message — while operations split fulfilment into separate deliveries.

## Standard Odoo Apps Used

- **Sales** — Quotations and orders with pricelists
- **eCommerce / Website** — Online hamper catalog and checkout
- **Inventory** — Multi-delivery picking and warehouse fulfilment
- **Delivery** — Carrier rules and delivery fee calculation
- **Accounting** — Invoicing and payment registration
- **CRM / Sales Teams** — Roadshow teams with warehouse and payment journal defaults

## Custom Modules (Core Solution)

### aspl_website_delivery_address
Multi-recipient website checkout:
- **Per-line shipping recipient** (`shipping_id`) and **shipping date** on sale order lines
- **Greeting card fields** — recipient, sender, greeting message, delivery note
- **Greeting note pre-fill templates** configurable in backend
- Website UI to add/edit delivery addresses per cart line
- Group lines by address + date → multiple deliveries from one order
- Optional hide-greeting setting per company
- Blocked delivery date wizard
- Greeting data propagated to stock moves and delivery operations

### ac_roadshow (Quick Sale / Counter Sales)
Counter and event sales flow (POS-style, not native Odoo POS):
- **Pickup methods** — Cash & Carry, Self Collection, Delivery
- **Default pricelist** flag (`is_default_pricelist`) auto-applied on roadshow orders
- Sales team linked to warehouse and payment journal
- Receipt printing (standard and Epson)
- Barcode-to-delivery wizard
- Auto-validate shipping on cash-and-carry confirm
- Customer acknowledgment and quick invoice/payment flow for ship-later orders

### jyy_operation
Operational extensions:
- Custom **delivery fee rules** using delivery-fee-per-quantity on products
- Per-line / per-address delivery charge calculation
- Integration with roadshow and multi-address sales views
- Payment acquirer, logistics, and partner extensions

### jyy_print
Branded print layouts for sales orders, invoices, delivery documents, and letterhead variants.

### Supporting modules
- **jyy_multi_terms** — Multiple terms and conditions
- **ac_warehouse_report** — Warehouse reporting for roadshow menu
- **auto_confirm_invoice** — Faster invoice flow on counter sales
- **whatsapp_connector_*** — WhatsApp messaging integration
- **stock_limitation** — Warehouse access restrictions
- **base_location** — Enhanced address/location data

## End-to-End Workflow

1. **Shop or sell** — Customer orders hampers online or staff sells at counter quick sale with default pricelist
2. **Assign recipients** — Each hamper line gets delivery address, date, and greeting message
3. **Pay once** — Single checkout with delivery fees calculated per address/date group
4. **Fulfil** — System splits into multiple deliveries with greeting on pick/pack documents
5. **Deliver** — Branded delivery notes and invoices per corporate gifting order

## Key Differentiators (Verified in Code)

- Multiple delivery addresses and dates within one web checkout
- Greeting card recipient, sender, and message on every gift line
- Greeting note templates for website pre-fill
- Roadshow counter sales with cash-and-carry and receipt printing
- Default pricelist automation for quick-sale teams
- Delivery pricing by weight, volume, and per-hamper delivery fee quantity
- Pickup method routing (carry, collect, ship)

## What We Do NOT Claim

- Client brand name on marketing flyer
- Native Odoo Point of Sale app (counter flow uses **ac_roadshow** quick sale)
- Full gift-card payment gateway unless configured in standard acquirers
- Automatic courier API integration beyond standard delivery carriers

## Flyer Positioning

**Title:** Corporate Hamper Gifting  
**Subtitle:** Multi-Recipient Delivery — eCommerce, Counter Sales & Gifting with Odoo  
**Tone:** Generic corporate gifting / hamper distributor — no client brand on flyer.
