# Project Summary — Pet Food & Accessories eCommerce

## Business Context

Odoo 16 eCommerce build for a premium online pet food and accessories retailer in Singapore. The solution centres on a Theme Prime web storefront, pet member registration, loyalty and referral programmes, product bundles, local EasyParcel shipping, and Stripe checkout with PayNow.

**Source repo:** `NutriPetWorld` (read-only input — not used as flyer folder name)

## Standard Odoo Apps Used

- **eCommerce / Website** — Online catalog, checkout, wishlist, comparison
- **Sales** — Web and backend order management
- **Inventory / Delivery** — Stock fulfilment and carrier integration
- **Loyalty** — Points, promotions, and shop redemption
- **Accounting** — Invoicing and payment reconciliation
- **Portal** — Member account and pet profile management
- **Payments** — Stripe acquirer with extended methods

## Custom Modules (Core Solution)

### npw_custom
Pet retail customisation:
- **Pet member profiles** (`npw.pet.line`) — name, breed, type (cat/dog), date of birth
- Public **member registration form** (`/member_form`) with PDPA and marketing consent
- Portal pet management and loyalty balance (`/my/loyalty`)
- Acquisition source tracking (social, influencer, etc.)
- Loyalty point rules — exclude shipping from discountable/pointable amounts
- Referral signup flow integration with loyalty cards
- Branded email and invoice line description tweaks

### npw_print
Branded PDF/report layouts with compact logo and styled footer.

### ac_easyparcel
Post-confirmation EasyParcel shipping changes — update carrier on open pickings after sale order is locked.

### ac_loyalty_future_order
Loyalty balance calculation excludes points already applied on the current order.

### payment_stripe_extended
Adds Singapore **PayNow** to Stripe payment methods on checkout.

## Third-Party / OCA Modules (Supporting)

- **theme_prime** + **droggol_theme_common** — Premium eCommerce theme (brands, quick view, PWA, stock-aware shop)
- **refer_friend_and_earn** — Referral codes, signup points, shop discount redemption
- **sh_product_bundle** / **sh_product_bundle_website** — Product bundles across sales, stock, purchase, invoice, and website
- **easyparcel_odoo_integration** — EasyParcel rates, labels, and tracking
- **loyalty_limit**, **loyalty_criteria_multi_product**, **loyalty_initial_date_validity** — Promotion controls
- **smart_warnings** — Configurable document alerts
- **mrp_tag** (OCA) — Manufacturing order tags (light use)

## End-to-End Workflow

1. **Join** — Customer registers as member with pet details and earns signup loyalty points
2. **Shop** — Browse premium pet food and accessories by brand, category, and bundles
3. **Redeem** — Apply loyalty rewards and referral discounts at web checkout
4. **Pay** — Stripe card or PayNow payment
5. **Fulfil** — Warehouse picking with bundle lines and EasyParcel label generation
6. **Deliver** — Tracking updates and branded order/invoice documents

## Key Differentiators (Verified in Code)

- Pet-centric member data (not just customer contact records)
- Loyalty + referral stack integrated with website checkout
- Product bundles on web and backend
- EasyParcel shipping with post-confirm carrier changes
- PayNow on Stripe for Singapore buyers
- Theme Prime premium storefront with brands and comparison tools
- PDPA and marketing consent on registration

## What We Do NOT Claim

- Client brand name "Nutripet World" on marketing flyer
- Native Odoo POS (not in source repo)
- Custom CRM pipeline or field service
- Manufacturing / MRP workflows beyond light tagging
- Subscription auto-ship unless configured in standard apps

## Flyer Output

- **Slug:** `pet-food-accessories-ecommerce`
- **Title:** Pet Food & Accessories eCommerce
- **Subtitle:** Premium Online Retail — Loyalty, Bundles & Fulfilment with Odoo
