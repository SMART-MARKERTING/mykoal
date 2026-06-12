/**
 * Taxonomy + article registry for the /learn authority section.
 *
 * The taxonomy lists the full mortgage product coverage so the site architecture
 * signals complete topical authority even before every article exists. Categories
 * without published articles render a "coming soon" state on the hub (never a 404).
 *
 * The article registry holds lightweight metadata (title, excerpt, category) used
 * by the hub cards and the related-article cross-links. Full article bodies live
 * in their own page components under pages/learn/.
 */

export interface LearnArticleMeta {
  slug: string;
  title: string;
  /** Short hub-card / related-link summary. */
  excerpt: string;
  categoryId: CategoryId;
}

export type CategoryId =
  | "heloc"
  | "va"
  | "dscr"
  | "cash-out"
  | "rate-term"
  | "fha"
  | "conventional"
  | "calculators";

export interface LearnCategory {
  id: CategoryId;
  name: string;
  description: string;
  /** Marks the three primary business focus lanes. */
  focus?: boolean;
  /** Article slugs that belong to this category, in display order. */
  articleSlugs: string[];
}

/** Article metadata keyed by slug. */
export const learnArticles: Record<string, LearnArticleMeta> = {
  "heloc-vs-cash-out-refinance": {
    slug: "heloc-vs-cash-out-refinance",
    title: "HELOC vs. Cash-Out Refinance: Which Is Better?",
    excerpt:
      "Two ways to tap your home equity, compared side by side — which one fits your rate, your goal, and your monthly budget.",
    categoryId: "heloc",
  },
  "dscr-loan-requirements-arizona": {
    slug: "dscr-loan-requirements-arizona",
    title: "DSCR Loan Requirements in Arizona: What Investors Should Know",
    excerpt:
      "How DSCR loans qualify the property instead of your personal income, and what Arizona investors should expect.",
    categoryId: "dscr",
  },
  "when-does-refinancing-make-sense": {
    slug: "when-does-refinancing-make-sense",
    title: "When Does Refinancing a Mortgage Make Sense?",
    excerpt:
      "The break-even math that tells you whether a refinance is actually worth it — explained in plain English.",
    categoryId: "rate-term",
  },
  "va-loan-myths": {
    slug: "va-loan-myths",
    title: "VA Loan Myths That Cost Veterans Money",
    excerpt:
      "The most common VA loan beliefs are outdated or wrong — and they cost eligible borrowers real money.",
    categoryId: "va",
  },
  "va-cash-out-refinance": {
    slug: "va-cash-out-refinance",
    title: "VA Cash-Out Refinance: How It Works and Who Qualifies",
    excerpt:
      "How veterans tap home equity with a VA cash-out refinance — including converting a non-VA loan into a VA loan.",
    categoryId: "va",
  },
};

/** Full product taxonomy. Order drives the hub layout; focus lanes come first. */
export const learnCategories: LearnCategory[] = [
  {
    id: "heloc",
    name: "HELOC & Home Equity",
    description:
      "Lines of credit, home equity loans, and how to access what you've built without overpaying.",
    focus: true,
    articleSlugs: ["heloc-vs-cash-out-refinance"],
  },
  {
    id: "va",
    name: "VA Loans",
    description:
      "VA-backed purchase, refinance, and cash-out options for veterans, service members, and eligible spouses.",
    focus: true,
    articleSlugs: ["va-loan-myths", "va-cash-out-refinance"],
  },
  {
    id: "dscr",
    name: "DSCR & Investor Loans",
    description:
      "Financing that qualifies on the property's cash flow, built for real estate investors.",
    focus: true,
    articleSlugs: ["dscr-loan-requirements-arizona"],
  },
  {
    id: "cash-out",
    name: "Cash-Out Refinance",
    description:
      "Replacing your mortgage with a larger one to turn equity into usable cash.",
    articleSlugs: [],
  },
  {
    id: "rate-term",
    name: "Rate-and-Term Refinance",
    description:
      "Lowering your rate or changing your loan term without taking cash out.",
    articleSlugs: ["when-does-refinancing-make-sense"],
  },
  {
    id: "fha",
    name: "FHA Loans",
    description:
      "Lower-down-payment, flexible-credit financing backed by the Federal Housing Administration.",
    articleSlugs: [],
  },
  {
    id: "conventional",
    name: "Conventional & First-Time Buyers",
    description:
      "Conventional financing and the basics every first-time homebuyer should understand.",
    articleSlugs: [],
  },
  {
    id: "calculators",
    name: "Mortgage Calculators",
    description:
      "Run the numbers on payments, equity, and break-even before you talk to anyone.",
    articleSlugs: [],
  },
];

/** Look up article metadata by slug. */
export function getArticleMeta(slug: string): LearnArticleMeta | undefined {
  return learnArticles[slug];
}

/** Resolve a list of slugs to their metadata, skipping any that don't exist. */
export function getRelatedArticles(slugs: string[]): LearnArticleMeta[] {
  return slugs
    .map((slug) => learnArticles[slug])
    .filter((a): a is LearnArticleMeta => Boolean(a));
}

/** Category lookup by id. */
export function getCategory(id: CategoryId): LearnCategory | undefined {
  return learnCategories.find((c) => c.id === id);
}
