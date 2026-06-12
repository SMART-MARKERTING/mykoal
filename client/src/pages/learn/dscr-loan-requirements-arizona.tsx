import ArticleLayout, { type TocItem } from "@/components/learn/article-layout";
import {
  ArticleSection,
  P,
  SourceLink,
  StatCallout,
} from "@/components/learn/article-content";
import type { FAQ } from "@/lib/schema";

const SLUG = "dscr-loan-requirements-arizona";

const toc: TocItem[] = [
  { id: "what-is-dscr", label: "What is a DSCR loan?" },
  { id: "formula", label: "How the DSCR formula works" },
  { id: "requirements", label: "Common DSCR requirements" },
  { id: "review", label: "What lenders usually review" },
  { id: "vs-conventional", label: "DSCR vs. conventional investment loan" },
  { id: "short-term", label: "Can you use DSCR for short-term rentals?" },
  { id: "arizona", label: "Arizona investor considerations" },
];

const faqs: FAQ[] = [
  {
    question: "What is a DSCR loan?",
    answer:
      "A DSCR (debt-service-coverage ratio) loan is a mortgage for investment property that qualifies based on the property's rental cash flow rather than your personal income. Instead of reviewing pay stubs and tax returns to calculate your debt-to-income ratio, the lender compares the property's expected rent to its monthly payment.",
  },
  {
    question: "How is DSCR calculated?",
    answer:
      "DSCR is the property's monthly rental income divided by its monthly property payment (principal, interest, taxes, insurance, and any HOA dues). A ratio of 1.0 means the rent exactly covers the payment; above 1.0 means the property produces more income than the payment, and below 1.0 means it produces less.",
  },
  {
    question: "Do DSCR loans require tax returns or proof of income?",
    answer:
      "Generally no. Because qualification is based on the property's cash flow, many DSCR programs do not require personal income documentation like tax returns or pay stubs. Lenders still verify other items such as credit, assets for reserves, and the property's rental value, and all approvals are subject to a full application review.",
  },
  {
    question: "What down payment do DSCR loans require?",
    answer:
      "Down payment requirements vary by lender and program and depend on factors like credit, the property type, and the DSCR itself. Investment-property financing generally requires a larger down payment than an owner-occupied loan. The exact figure for your scenario is determined during underwriting, so it is best to have it quoted for your specific deal.",
  },
  {
    question: "Can I use a DSCR loan for a short-term rental like an Airbnb?",
    answer:
      "Many DSCR programs allow short-term rentals, but the way income is documented can differ from a long-term lease. Some lenders use projected market rent while others may consider short-term rental history or a specialized appraisal form. Availability and terms vary, so confirm short-term rental treatment with your lender up front.",
  },
  {
    question: "Can I hold a DSCR loan in an LLC?",
    answer:
      "Often yes. Many DSCR programs are designed for business-purpose investing and allow the property to be held in an LLC, which is one reason investors favor them. Requirements vary by lender and are subject to a full application review.",
  },
  {
    question: "How many DSCR loans can I have?",
    answer:
      "Because DSCR loans qualify on property cash flow rather than your personal debt-to-income ratio, many programs allow investors to finance multiple properties without the loan caps common on conventional financing. Specific limits vary by lender.",
  },
];

export default function DscrLoanRequirementsArizona() {
  return (
    <ArticleLayout
      slug={SLUG}
      category={{ id: "dscr", name: "DSCR & Investor Loans" }}
      title="DSCR Loan Requirements in Arizona: What Investors Should Know"
      description="How DSCR loans qualify Arizona investment property on rental cash flow instead of personal income — the DSCR formula, common requirements, and short-term rental notes."
      datePublished="2026-06-12"
      dateModified="2026-06-12"
      displayDate="June 12, 2026"
      shortAnswer={
        <>
          A DSCR loan qualifies an Arizona investment property based on its rental cash
          flow instead of your personal income, using the ratio of monthly rent to the
          monthly property payment. Many programs skip tax returns and pay stubs entirely,
          which is why investors use them — though exact terms vary by lender and are
          subject to a full application review.
        </>
      }
      toc={toc}
      faqs={faqs}
      related={["heloc-vs-cash-out-refinance", "when-does-refinancing-make-sense"]}
      cta={{
        heading: "See if a DSCR loan fits your deal",
        body: "Get DSCR options matched to your Arizona investment property — subject to a full application review.",
        funnel: "dscr",
        label: "Explore investor loan options",
      }}
    >
      <ArticleSection id="what-is-dscr" heading="What is a DSCR loan?">
        <P>
          A DSCR loan is a mortgage for investment property that qualifies on the property's
          income rather than yours. DSCR stands for debt-service-coverage ratio — a simple
          comparison of how much rent the property brings in versus what the mortgage costs
          each month.
        </P>
        <P>
          This matters for investors whose tax returns understate their real cash flow, or
          who are buying through an LLC. Instead of asking "does the borrower earn enough?",
          a DSCR lender asks "does the property pay for itself?"
        </P>
        <StatCallout>
          DSCR loans are business-purpose, investor loans — not consumer mortgages. The
          Consumer Financial Protection Bureau's Ability-to-Repay rule, which governs how
          lenders verify a borrower's personal income on consumer home loans, generally does
          not apply to business-purpose investment lending.{" "}
          <SourceLink href="https://www.consumerfinance.gov/" source="cfpb">
            Source: CFPB
          </SourceLink>
        </StatCallout>
      </ArticleSection>

      <ArticleSection id="formula" heading="How the DSCR formula works">
        <P>The formula is plain math:</P>
        <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-center my-2">
          <p className="text-white text-sm font-semibold">
            DSCR = monthly rental income ÷ monthly property payment
          </p>
        </div>
        <P>
          The "monthly property payment" generally includes principal, interest, taxes,
          insurance, and any HOA dues. A few quick examples of how the ratio reads:
        </P>
        <ul className="list-disc pl-5 space-y-1.5 text-blue-100/80 text-sm">
          <li>
            <strong className="text-white">DSCR of 1.0</strong> — rent exactly covers the
            payment.
          </li>
          <li>
            <strong className="text-white">Above 1.0</strong> — the property brings in more
            than the payment (positive cash flow on paper).
          </li>
          <li>
            <strong className="text-white">Below 1.0</strong> — the rent does not fully cover
            the payment on its own.
          </li>
        </ul>
        <P>
          The specific ratio a program wants to see varies by lender and is determined in
          underwriting, so treat these as how to read the number, not a qualification
          promise.
        </P>
      </ArticleSection>

      <ArticleSection id="requirements" heading="Common DSCR requirements">
        <P>
          Requirements differ across lenders, but DSCR programs tend to weigh a similar set
          of factors. Many programs look at:
        </P>
        <ul className="list-disc pl-5 space-y-1.5 text-blue-100/80 text-sm">
          <li>The property's DSCR, based on market rent or an existing lease.</li>
          <li>Your credit profile.</li>
          <li>A down payment or equity stake (larger than an owner-occupied loan).</li>
          <li>Cash reserves after closing.</li>
          <li>The property type and condition.</li>
        </ul>
        <P>
          Notice what is usually not on the list: personal income documentation. That is the
          defining feature of the product. Specific thresholds vary by program and are
          subject to a full application review.
        </P>
      </ArticleSection>

      <ArticleSection id="review" heading="What lenders usually review">
        <P>
          Even without tax returns, a DSCR lender still does real due diligence. Expect a
          review of your credit, the property's appraised value and market rent (often via a
          rent schedule on the appraisal), proof of funds for the down payment and reserves,
          and the entity holding title if you are buying through an LLC. The rent figure the
          lender uses is typically the lower of the in-place lease or appraised market rent.
        </P>
      </ArticleSection>

      <ArticleSection id="vs-conventional" heading="DSCR vs. conventional investment loan">
        <P>
          A conventional investment-property loan qualifies you personally: the lender adds
          the new payment to your other debts and checks your debt-to-income ratio using your
          documented income. That works well for W-2 borrowers with clean returns, and often
          comes with competitive pricing.
        </P>
        <P>
          A DSCR loan skips the personal income test and leans on the property instead. It is
          usually the better fit for self-employed investors, those whose write-offs shrink
          their qualifying income, and investors scaling past the point where conventional
          loan limits get in the way. The trade-off is typically a larger down payment and
          different pricing. Many investors keep both tools and use whichever fits the deal.
        </P>
      </ArticleSection>

      <ArticleSection id="short-term" heading="Can you use DSCR for short-term rentals?">
        <P>
          Often, yes. Many DSCR lenders finance short-term rentals such as vacation homes and
          Airbnb-style properties, but they handle the income differently. Some use projected
          long-term market rent to be conservative, while others will consider documented
          short-term rental performance or a specialized appraisal form.
        </P>
        <P>
          Because approaches vary widely, confirm how a lender treats short-term rental income
          before you get too far down the road — it can meaningfully change the DSCR the deal
          pencils out at.
        </P>
      </ArticleSection>

      <ArticleSection id="arizona" heading="Arizona investor considerations">
        <P>
          Arizona is a popular DSCR market, with strong investor demand across metro Phoenix,
          Scottsdale, Tucson, and fast-growing suburbs. A few local factors are worth keeping
          in mind:
        </P>
        <ul className="list-disc pl-5 space-y-1.5 text-blue-100/80 text-sm">
          <li>
            Short-term rental rules can vary by city and HOA — confirm what is allowed before
            you underwrite a property on short-term income.
          </li>
          <li>
            Property taxes and insurance feed directly into the payment side of the DSCR
            formula, so get accurate local figures when you run the numbers.
          </li>
          <li>
            Strong rent demand in many Arizona markets can support healthier DSCRs, but every
            property pencils out differently.
          </li>
        </ul>
        <P>
          The honest next step is to run your specific property's numbers with someone who
          knows Arizona investor lending, rather than relying on a rule of thumb.
        </P>
      </ArticleSection>
    </ArticleLayout>
  );
}
