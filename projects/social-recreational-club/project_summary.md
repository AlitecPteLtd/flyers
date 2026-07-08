# Project Summary — Social/Recreational Club

## Business Context

Odoo 16 club operating platform for membership-based social and recreational clubs. Covers online membership enrolment with approvals, subscription billing, member portal with digital QR cards, facility booking, events and banquets, restaurant POS, minimum spending levy (MSL), and club finance reporting.

**Source repo:** `SPGG` (read-only input — not used as flyer folder name)

## Standard Odoo Apps Used

- **Membership** — Member types, subscriptions, member states
- **Events** — Event registration, barcode attendance, website events
- **Appointments** — Facility/resource booking with capacity
- **Sales & Subscriptions** — Membership orders, banquet sales
- **POS / Restaurant** — F&B outlets, split bills, service charges
- **Website & Portal** — Online signup, member self-service
- **Accounting** — Invoicing, bulk payments, facility invoice tagging
- **Approvals** — Membership onboarding workflow
- **Helpdesk** — Member services tickets
- **Loyalty** — Facility cancellation coupons

## Custom Modules (Core Solution)

### bv_membership_extension
Membership lifecycle: multi-tier member types (student, ordinary, life, social, corporate, family), MSL groups and billing from POS spend, reception desk, family/juniors, GIRO/payment details, QR membership cards, POS member linkage

### bv_event_extension
Events, banquets, promotions/notices CMS, membership codes, banquet LOF/LOC workflow, group registration, seminar/banquet PDFs, facility accounting, late fees

### bv_appointment
Resource-based facility booking with capacity, public holidays/peak charges, unpaid booking cleanup cron, Mahjong room website booking

### bv_website_extension
Online membership signup, PDPA consent, portal sales, facility cancellation loyalty coupons, recruitment reports

### bv_accounting_extension
Bulk payment wizard, payment voucher reports

### bv_pos_extended
Export POS product, reception, and facilities booking details to Excel

### Supporting modules
- **bi_website_portal_dashboard** — Member portal dashboard with charts
- **customer_product_qrcode** — QR generation for members
- **service_charges_pos**, **pos_split_bill_bits**, **qrcode_table** — Restaurant POS features
- **bv_two_factor_authentication** — 2FA and password policy
- **bv_visitor_info** — Visitor registration form

## End-to-End Workflow

1. **Apply online** — Membership signup with documents, PDPA consent, payment/GIRO details
2. **Approve member** — Approvals workflow activates membership and subscription billing
3. **Portal access** — Digital QR card, transactions, MSL view, helpdesk services
4. **Book & register** — Facility slots and event registration with group booking
5. **Dine & spend** — POS identifies members; spend feeds MSL calculation
6. **Finance & report** — Facility invoices, bulk payments, banquet/F&B/facility exports

## Key Differentiators (Verified in Code)

- Multi-tier membership with family/corporate profiles
- Approval-gated membership onboarding
- Member portal with digital QR membership card
- Resource-based facility booking with capacity and peak pricing
- Events and banquets with LOF/LOC workflow and barcode attendance
- Restaurant POS with split bills, service charges, table QR ordering
- MSL automation from POS consumption by member group
- Banquet, F&B, facility, and recruitment Excel/PDF reports

## What We Do NOT Claim

- Client brand name "SPGG" or Singapore Polytechnic Graduates' Guild on flyer
- Native mobile app (website + portal only)
- Meta WhatsApp Business API (browser automation modules exist but not core)
- HitPay/e-wallet as bundled core (modules in repo, not in bv_* depends)
- Golf/swimming/gym management (only courts/rooms referenced generically)
- MSL/late fees always automated (crons exist but inactive by default)
- GIRO bank file generation
- Odoo Community-only deployment (heavy Enterprise dependency)

## Flyer Output

- **Slug:** `social-recreational-club`
- **Title:** Social/Recreational Club
- **Subtitle:** Membership, Facilities, Events & F&B — Managed with Odoo
