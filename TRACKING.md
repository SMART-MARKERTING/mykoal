# Analytics Event Tracking — mykoal.com `/learn`

This document is the source of truth for every analytics event fired from the
`/learn` authority section.

## How events are emitted

Events are pushed to `window.dataLayer` (the Google Tag Manager / GA4 convention)
by the helpers in [`client/src/lib/analytics.ts`](client/src/lib/analytics.ts):

- `track(event, params?)` — pushes a raw event name.
- `articleEvent(slug, element, action, params?)` — builds a name using the
  convention below and attaches `{ article_slug, element, action, ...params }`.

If no tag manager is installed, the push is a safe no-op (logged to the console in
dev only). A GTM container or GA4 tag can consume `dataLayer` with **no code
changes**.

## Naming convention

```
{article_slug}_{element}_{action}
```

- All segments are lowercase `snake_case`.
- The `article_slug` segment is the page slug with hyphens converted to
  underscores (e.g. `heloc-vs-cash-out-refinance` → `heloc_vs_cash_out_refinance`).
- On the hub (not an article) the slug segment is the category id (`calculators`).

## Event catalog

### Per-article events

Fired on each of the five article pages. Replace `{slug}` with the snake_case
slug from the table further down.

| Event name | Trigger | Extra params |
| --- | --- | --- |
| `{slug}_cta_click` | Click on the article's primary CTA button (to a smartr8.com funnel) | `funnel`, `href` |
| `{slug}_faq_expand` | A FAQ accordion item is expanded | `question` |
| `{slug}_source_click` | Click on an outbound authoritative source link (CFPB, VA.gov, etc.) | `source`, `href` |
| `{slug}_related_click` | Click on a related-article cross-link | `target` (target slug) |

### Hub events

| Event name | Trigger | Extra params |
| --- | --- | --- |
| `calculators_calculator_click` | Click on a calculator link in the Mortgage Calculators section of `/learn` | `target` (calculator path) |

## Slug reference

| Page | `article_slug` | snake_case event prefix |
| --- | --- | --- |
| HELOC vs. Cash-Out Refinance | `heloc-vs-cash-out-refinance` | `heloc_vs_cash_out_refinance` |
| DSCR Loan Requirements in Arizona | `dscr-loan-requirements-arizona` | `dscr_loan_requirements_arizona` |
| When Does Refinancing Make Sense? | `when-does-refinancing-make-sense` | `when_does_refinancing_make_sense` |
| VA Loan Myths | `va-loan-myths` | `va_loan_myths` |
| VA Cash-Out Refinance | `va-cash-out-refinance` | `va_cash_out_refinance` |

### Fully-enumerated event names

**CTA clicks to smartr8.com funnels**

- `heloc_vs_cash_out_refinance_cta_click`
- `dscr_loan_requirements_arizona_cta_click`
- `when_does_refinancing_make_sense_cta_click`
- `va_loan_myths_cta_click`
- `va_cash_out_refinance_cta_click`

**FAQ expansions**

- `heloc_vs_cash_out_refinance_faq_expand`
- `dscr_loan_requirements_arizona_faq_expand`
- `when_does_refinancing_make_sense_faq_expand`
- `va_loan_myths_faq_expand`
- `va_cash_out_refinance_faq_expand`

**Outbound source link clicks**

- `heloc_vs_cash_out_refinance_source_click`
- `dscr_loan_requirements_arizona_source_click`
- `when_does_refinancing_make_sense_source_click`
- `va_loan_myths_source_click`
- `va_cash_out_refinance_source_click`

**Related-article clicks**

- `heloc_vs_cash_out_refinance_related_click`
- `dscr_loan_requirements_arizona_related_click`
- `when_does_refinancing_make_sense_related_click`
- `va_loan_myths_related_click`
- `va_cash_out_refinance_related_click`

**Calculator clicks (hub)**

- `calculators_calculator_click`

## UTM tagging

Every link from mykoal.com to a smartr8.com funnel is tagged with the campaign
parameters defined in [`client/src/lib/site-config.ts`](client/src/lib/site-config.ts)
(`withUtm` / `funnelUrl`):

| Parameter | Value |
| --- | --- |
| `utm_source` | `mykoal` |
| `utm_medium` | `learn_article` |
| `utm_campaign` | `ai_search_visibility` |

Example destination:

```
https://smartr8.com/heloc?utm_source=mykoal&utm_medium=learn_article&utm_campaign=ai_search_visibility
```
