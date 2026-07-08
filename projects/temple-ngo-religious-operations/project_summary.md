# Project Summary — Temple & Religious Organization

## Business Context

Odoo 18 platform for Buddhist temple and faith-based NGO operations: online merit offerings, ceremony scheduling, memorial dedications, donor CRM, recurring sponsorships, counter POS, and accounting.

**Source repo:** `tcsl18` (read-only input — not used as flyer folder name)

## Standard Odoo Apps Used

- **Sales & Subscriptions** — Offerings, recurring deity-light sponsorships
- **Website & eCommerce** — Merit shop, donation pages, events
- **POS** — Counter sales with guided wizards
- **Accounting** — Invoicing, payment vouchers, bank reconciliation
- **Events & Appointments** — Event registration, scheduling
- **HR** — Staff/sangha assignment on ceremonies
- **Portal** — Devotee self-service, subscriptions, quick records

## Custom Modules (Core Solution)

### tcsl_master / tcsl_sale
Puja and ceremony orders, recipient relatives, product flags, sale-to-ceremony workflow, communications

### tcsl_relic_hall
Memorial tablets, deity light units, reservations, subscriptions, wall grid, renewal notices

### tcsl_nectar_offering
Scheduled offerings with daily capacity and print tracking

### tcsl_donor / ac_tcsl_custom
Donor categories, bilingual contact fields, PDPA, communication preferences

### ac_tcsl_website_custom / tcsl_template_website
Shop UX, dedication capture at checkout, subscription split, portal templates

### puja_gongde_dash / puja_calendar_print
Ceremony dashboards, calendar views, Excel/PDF exports

### print_employee_card / tcsl_print
Tablet and certificate printing, branded invoices and reports

## End-to-End Workflow

1. **Register devotee** — Portal signup with PDPA/OTP
2. **Choose offering** — Donations, ceremonies, memorial units, events
3. **Add dedication** — Bilingual recipient details at checkout
4. **Plan ceremony** — Staff, location, calendar, print jobs
5. **Bill & engage** — Invoice, subscriptions, automated reminders

## Key Differentiators (Verified in Code)

- Online merit shop with structured dedications
- Bilingual recipient and relative registry
- Ceremony order-to-calendar workflow
- Memorial unit tracking with reservations and subscriptions
- Daily offering capacity slots
- Counter/POS with guided wizards
- Donor CRM with categories and PDPA
- Ceremony dashboards and print pipeline

## What We Do NOT Claim

- Client brand "TCSL" or temple name on flyer
- Dedicated volunteer management module
- Generic NGO grant/case management
- Full warehouse/inventory ERP
- Built-in helpdesk for devotees (dependency only)
- AI temple management as core feature

## Flyer Output

- **Slug:** `temple-ngo-religious-operations`
- **Title:** Temple & Religious Organization
- **Subtitle:** Offerings, Ceremonies, Donors & Accounting with Odoo
