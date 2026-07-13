# Project Summary — Amitabha Buddhist Centre

## Business Context

This flyer is for the `/Users/guoqiangli/Downloads/github/amitabha_19` customization. It is a separate use case from the existing temple/NGO ceremony and offering flyer.

The project focuses on Amitabha Buddhist Centre member and contact records, legacy database continuity, personal information fields, partner grade descriptions, and Odoo Website homepage migration.

## Source Modules Reviewed

- `custom_contact`: adds member details and contact fields to `res.partner`.
- `website_migration`: migrates Amitabha Buddhist Centre homepage content into Odoo Website.

## Verified Customization Points

- Member number and old database member number.
- NRIC number and house/unit number.
- First-name and last-name fields with fallback full-name creation.
- Last payment date, old last update date, and member expiry date.
- Partner grade description field.
- Contact list and form view additions for faster member review.
- Dependencies on OCA personal information, birthdate, nationality, deduplication, and partner contact modules.
- Website homepage with hero, programs, events snippet, statistics, and centre story.

## Positioning

- **Slug:** `amitabha-buddhist-centre`
- **Title:** Amitabha Buddhist Centre
- **Subtitle:** Member Contacts, Personal Records & Website Migration with Odoo
- **Message:** trusted member data, legacy continuity, and website migration.

## Avoid Claiming

- Ceremony, puja, offering, memorial tablet, or donation workflow as the main scope.
- POS, eCommerce, accounting, subscriptions, or event ticketing unless separately confirmed.
- Generic temple operations already covered by `temple-ngo-religious-operations`.
