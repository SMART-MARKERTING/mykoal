/**
 * Single source of truth for entity, brand, and compliance data used across the
 * /learn authority section (schema, author boxes, compliance footers, CTAs).
 *
 * Identity values (LO name, NMLS IDs, licensed states, Equal Housing text) are
 * the verified values already published across mykoal.com (see index.html and
 * site-footer.tsx) and are reused here so the Person/Organization entity stays
 * consistent everywhere — that consistency is the point of the entity-building
 * layer. Genuinely-unknown compliance fields are kept as swap-in placeholders:
 *
 *   - VA_DISCLAIMER_TEXT      → fill with compliance-approved VA non-affiliation copy
 *   - COMPLIANCE_REVIEW_DATE  → fill with the date each page was compliance-reviewed
 *
 * No rates, APRs, payments, or fees live in this file by design.
 */

export const SITE_URL = "https://mykoal.com";

// --- Loan Officer (Person entity) ---
export const LO_NAME = "Mykoal DeShazo";
export const LO_TITLE = "Vice President, Senior Loan Officer";
export const LO_SHORT_TITLE = "Senior Loan Officer";
export const NMLS_ID = "1912347";
export const LO_HEADSHOT_URL = `${SITE_URL}/og-image.jpg`;

// --- Company / Organization entity ---
export const COMPANY_NAME = "Adaxa Home LLC";
export const COMPANY_NMLS_ID = "2380533";
export const BRAND_NAME = "MyKoal";

// --- Licensing ---
export const LICENSED_STATES = [
  "Arizona",
  "Colorado",
  "Connecticut",
  "Florida",
  "Michigan",
  "Minnesota",
  "Oregon",
  "Pennsylvania",
  "Texas",
  "Virginia",
  "Washington",
] as const;

export const LICENSED_STATES_ABBR = "AZ, CO, CT, FL, MI, MN, OR, PA, TX, VA, WA";

export const EQUAL_HOUSING_TEXT =
  "Adaxa Home LLC is an Equal Housing Lender. We do not discriminate on the basis of race, color, religion, national origin, sex, marital status, age, or any other characteristic protected by federal law.";

// --- Compliance placeholders (compliance to fill before publishing) ---
// Default suggestion for VA_DISCLAIMER_TEXT once approved:
// "MyKoal and Adaxa Home LLC are not affiliated with, endorsed, or sponsored by
//  the U.S. Department of Veterans Affairs or any government agency. VA-backed
//  loan products are subject to VA eligibility and lender underwriting."
export const VA_DISCLAIMER_TEXT = "{{VA_DISCLAIMER_TEXT}}";
export const COMPLIANCE_REVIEW_DATE = "{{COMPLIANCE_REVIEW_DATE}}";

// --- smartr8.com funnel destinations (conversion site) ---
// mykoal.com is the educational source; smartr8.com is the funnel.
export const SMARTR8_BASE = "https://smartr8.com";

export const FUNNELS = {
  heloc: `${SMARTR8_BASE}/heloc`,
  cashOut: `${SMARTR8_BASE}/apply/cash-out`,
  refinance: `${SMARTR8_BASE}/apply/rate-reduction`,
  dscr: `${SMARTR8_BASE}/apply/investor`,
  va: `${SMARTR8_BASE}/apply/va`,
} as const;

export type FunnelKey = keyof typeof FUNNELS;

// --- UTM tagging for every mykoal → smartr8 link ---
export const UTM_PARAMS = {
  utm_source: "mykoal",
  utm_medium: "learn_article",
  utm_campaign: "ai_search_visibility",
} as const;

/**
 * Append the required UTM parameters to a smartr8.com funnel URL.
 * Preserves any existing query string on the destination.
 */
export function withUtm(url: string): string {
  const [base, existingQuery] = url.split("?");
  const params = new URLSearchParams(existingQuery);
  for (const [key, value] of Object.entries(UTM_PARAMS)) {
    params.set(key, value);
  }
  return `${base}?${params.toString()}`;
}

/** Resolve a funnel key to its fully UTM-tagged destination URL. */
export function funnelUrl(key: FunnelKey): string {
  return withUtm(FUNNELS[key]);
}

/** Absolute canonical URL for a site-relative path (e.g. "/learn/..."). */
export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
