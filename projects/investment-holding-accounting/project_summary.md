# Project Summary — Investment Holding Accounting

## Business Context

Odoo 17 customization for an investment holding / treasury entity that places time deposits, holds
investments and marketable securities, manages share capital and a member share registry, and reconciles
multi-currency balances with related-party partners. Finance issues a full branded print pack (invoices,
debit notes, journal vouchers, delivery-order invoices, payment-advice invoices) with QR codes and
purchase-order references.

**Source repo:** `/Users/shawn/PycharmProjects/Odoo Sh Projects/kmp` (custom addons only; OCA/others folders not used for flyer claims)

**Audience:** Group finance/treasury managers, corporate secretarial/share registry owners, and accounts
payable/receivable teams handling related-party settlements.

**Naming note:** Per user instruction, the source client/module family name is never referenced on the
flyer or in these notes beyond this source-path citation. All copy uses generic "Alitec investment holding
accounting solution" framing.

## Standard Odoo Apps Used

- **Accounting / Accounting Reports** — Journal entries, custom account reports, ageing
- **Assets** — `account_asset` dependency for asset/approval extensions
- **Analytic Accounting** — Analytic plan/account approval-state extensions
- **Payments** — Payment registration, payment-on-behalf, exchange-difference memo sync
- **Contacts** — Related-party tagging on `res.partner`

## Custom Modules (Core Solution)

### ac_account_time_deposit
`time.deposit` model (name, currency, interest rate, start/due date) linked from `account.move` via
`deposit_id`; onchange populates rate/dates. Custom "Time Deposit" account report handler lists ref, note,
value date, due date, interest rate, currency, amount-in-currency and balance per move line.

### ac_investment_accounting
`investment.investment` model (currency, code, total shares, computed functional-currency total cost from
posted investment moves). `account.move` extended with investment transaction type (Addition / Disposal /
Write Off / Adjustment), quantity, par value in investment currency, functional total. Also carries
`marketable.securities` fields on the same move: is_marketable_securities, transaction type (Purchase /
Disposal / Fair Value Adjustment), par value. Custom Investment Transaction Report and Marketable
Securities Report.

### ac_financial_asset
`financial.asset` (name, code, quantity, unit price, computed total price) and `financial.asset.history`
(date, price) for tracking fair-value price history per asset. Custom report handler lists each asset's
current total balance.

### ac_share_capital
`share.capital` (date, transaction type Issue/Buyback, quantity, currency, par value, amount in company
currency) as the company-level capital ledger. `share.registry` (partner, date, quantity, transaction type
Addition/Disposal) as the member-level register. Report handlers compute opening/movement/closing balances
per member and roll global par/functional value per share back onto each member's holding.

### ac_currency_balance_report
Currency Balance Report and Partner Currency Balance Report — account-report based multi-currency balance
views with a custom account-filter asset bundle.

### ac_partner_ageing_currency_total
Extends the standard Aged Partner Balance report to add a foreign-currency total column across the
0/30/60/90/120-day buckets.

### ac_advanced_accounting
`related.party.type` + `related_party_type_id` on `res.partner` for related-party governance tagging.
`move.reason` + `reason_id` on `account.move.line` for audit-trail reason codes. `over_draft_limit` field
on `account.account`.

### kmp_operation
`account.onbehalf.payment` model referenced from `account.move.line.on_behalf_payment_id` (payment-on-behalf
tracking — client-facing label avoids the source module's internal name). Smart partner domain on
`account.move` by journal type (sale/purchase/other). Register-payment flow enhancements and communication
labeling for batched payments. Exchange-difference move memo sync using the payment communication.
Analytic plan/account/asset approval-state selection field (Under Approved / Approved / Not Approved).

### kmp_print (branded as "Finance Print Pack")
Company-level "No Signature" print option. `account.move` total debit/credit computed fields,
show-quantity toggle, PO reference field, auto-set "checked by" user. `account.move.line` interest rate,
start/end date, formatted-amount helper. Report templates: debit note, delivery-order invoice, journal
voucher, invoice (with and without payment info), and a patched Multicurrency Revaluation Report that
compares balance-at-transaction-rate vs balance-at-current-rate per account/partner to compute the FX
adjustment.

## End-to-End Workflow

1. **Place & book** — Record a time deposit, investment, or marketable-securities transaction with rate/currency
2. **Post & link** — Journal entries carry the deposit/investment/securities reference and transaction type
3. **Settle on behalf** — Payment-on-behalf references and multi-currency reconciliation across related parties
4. **Revalue & report** — Month-end FX revaluation, ageing with currency totals, and share registry rollup
5. **Print & distribute** — Branded invoice, debit note, journal voucher, and payment-advice pack issued

## Key Differentiators (Verified in Code)

- Purpose-built time deposit ledger tied directly to journal entries and a dedicated report
- Investment and marketable-securities holdings tracked with functional-currency cost and FV history
- Share capital ledger that automatically rolls per-member share registry balances
- Multi-currency balance, ageing (with FX total), and automated revaluation-adjustment reporting
- Related-party governance via partner tagging, move-line reason codes, and account overdraft limits
- Dedicated payment-on-behalf reference and smart partner filtering at payment registration
- Full branded finance print pack: invoice, debit note, journal voucher, delivery-order invoice, QR code, PO ref

## What We Do NOT Claim

- Source client or module family name (never mentioned on flyer or notes)
- OCA and "others" module folders in the source repo (not inspected/claimed for this flyer)
- Website/eCommerce, POS, Manufacturing, or CRM (not part of these custom modules)
- Live production figures — dashboard KPIs are illustrative only

## Flyer Output

- **Slug:** `investment-holding-accounting`
- **Title:** Investment Holding Accounting
- **Subtitle:** Multi-Currency Deposits, Securities & Equity Control with Odoo
