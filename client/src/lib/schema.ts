/**
 * JSON-LD schema builders for the /learn authority section.
 *
 * These are pure functions that return schema.org objects. They are serialized
 * into <script type="application/ld+json"> tags by <SeoHead>. The Person and
 * Organization builders define the entity-building layer and are reused as the
 * author/publisher inside every Article, so the entity stays identical sitewide.
 *
 * Compliance note: no rates, APRs, fees, payments, or guarantees ever appear in
 * schema. FAQ schema is generated from the exact same data that renders the
 * visible on-page FAQ, so the two can never drift.
 */
import {
  SITE_URL,
  LO_NAME,
  LO_TITLE,
  NMLS_ID,
  LO_HEADSHOT_URL,
  COMPANY_NAME,
  COMPANY_NMLS_ID,
  BRAND_NAME,
  LICENSED_STATES,
  canonicalUrl,
} from "./site-config";

export interface FAQ {
  question: string;
  answer: string;
}

const PERSON_ID = `${SITE_URL}/#person`;
const ORG_ID = `${SITE_URL}/#organization`;

/** Person schema for the loan officer — the core entity for AI search. */
export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: LO_NAME,
    jobTitle: LO_TITLE,
    url: SITE_URL,
    image: LO_HEADSHOT_URL,
    identifier: `NMLS #${NMLS_ID}`,
    worksFor: {
      "@type": "Organization",
      name: COMPANY_NAME,
      identifier: `NMLS #${COMPANY_NMLS_ID}`,
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Mortgage License",
      name: `NMLS #${NMLS_ID}`,
      recognizedBy: {
        "@type": "Organization",
        name: "Nationwide Multistate Licensing System",
      },
    },
    areaServed: LICENSED_STATES.map((name) => ({ "@type": "State", name })),
    knowsAbout: [
      "HELOC",
      "Home equity",
      "Cash-out refinance",
      "Rate-and-term refinance",
      "VA loans",
      "VA cash-out refinance",
      "DSCR investor loans",
      "FHA loans",
      "Conventional mortgages",
    ],
  };
}

/** Organization schema for the MyKoal lending brand. */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: BRAND_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/equal-housing-logo.png`,
    description:
      "Educational mortgage hub from a licensed loan officer covering HELOCs, home equity, VA loans, DSCR investor loans, and refinancing.",
    founder: { "@type": "Person", "@id": PERSON_ID, name: LO_NAME },
    member: {
      "@type": "Organization",
      name: COMPANY_NAME,
      identifier: `NMLS #${COMPANY_NMLS_ID}`,
    },
    areaServed: LICENSED_STATES.map((name) => ({ "@type": "State", name })),
  };
}

export interface ArticleSchemaInput {
  path: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
}

/** Article schema with the LO as author and the brand as publisher. */
export function getArticleSchema(input: ArticleSchemaInput) {
  const url = canonicalUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: input.title,
    description: input.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: LO_NAME,
      jobTitle: LO_TITLE,
      identifier: `NMLS #${NMLS_ID}`,
    },
    reviewedBy: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: LO_NAME,
      identifier: `NMLS #${NMLS_ID}`,
    },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: BRAND_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/equal-housing-logo.png`,
      },
    },
  };
}

/**
 * FAQPage schema. MUST be built from the same FAQ array that renders on-page so
 * the visible text and the structured data match exactly. One block per page.
 */
export function getFaqPageSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export interface Breadcrumb {
  name: string;
  path: string;
}

/** BreadcrumbList schema from an ordered list of crumbs. */
export function getBreadcrumbSchema(crumbs: Breadcrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: canonicalUrl(crumb.path),
    })),
  };
}
