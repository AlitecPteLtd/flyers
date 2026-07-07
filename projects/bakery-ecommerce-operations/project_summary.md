# Project Summary

## Project Name

Bakery E-Commerce & Production Control

## Industry / Business Type

Premium cake and patisserie bakery with online ordering, outlet collection, delivery scheduling, membership, and in-store loyalty. The business sells cakes and bakery products through e-commerce and POS, with production governed by daily capacity limits rather than full manufacturing resource planning.

## Odoo Base Apps

- eCommerce (Website Sale)
- Sales
- Inventory
- Delivery
- Membership
- Loyalty
- Point of Sale (via loyalty extensions)
- Accounting / Invoicing
- Payment

## Main Custom Solution

This Odoo 17 bakery platform sells cakes and patisserie products online with mandatory customer login, delivery or self-collection, and date and time slot selection controlled by product category, holidays, and daily production capacity. Orders validate against category-level daily maximums before confirmation and payment. Fulfillment is supported through kitchen production lists, delivery run sheets, and collection reports, plus branded invoices and delivery documents.

Membership products issue automatic loyalty coupons and tiered pricing. Loyalty coupons work on both the website and POS. Checkout can integrate with 2C2P payment, and customer engagement includes birthday-month notifications and portal access to membership and coupons.

## Key Customized Areas

- daily production capacity per product category with sold-quantity tracking
- delivery and collection date and time slot booking
- holiday and blocked-date rules by outlet type
- meringue vs non-meringue fulfillment time windows
- product lead times for in-stock vs made-to-order items
- login-required cart and checkout flow
- annual and lifetime membership with auto coupon generation
- multi-coupon loyalty rules on website and POS
- kitchen ordered list Excel export by fulfillment date
- daily kitchen, delivery, and collection PDF reports
- invoice and delivery document branding with variant descriptions
- Singapore timezone handling in order commitment dates

## End-to-End Business Flow

1. customer registers or logs in with birthdate and mobile captured at signup
2. customer browses the online shop and selects products, variants, and membership offers where applicable
3. customer adds items to cart and proceeds through login-enforced checkout
4. customer chooses delivery or collection, available date, and time slot based on product rules and capacity
5. order validates against daily production maximums and holiday blackouts before confirmation and payment
6. kitchen and fulfillment teams use production lists and delivery or collection reports to prepare orders
7. stock pickings and invoices carry collection or delivery date, time, and variant detail
8. members receive coupons, tiered pricing, and birthday-month engagement through loyalty and membership flows

## Main Business Benefits

- prevents overselling beyond real daily bakery production capacity
- aligns customer delivery promises with kitchen lead times and product handling rules
- supports both delivery and outlet collection in one commerce flow
- unifies website and POS loyalty for member retention
- automates membership rewards with coupons and pricing tiers
- gives operations actionable kitchen and fulfillment reports by date
- reduces checkout errors with mandatory scheduling and address validation
