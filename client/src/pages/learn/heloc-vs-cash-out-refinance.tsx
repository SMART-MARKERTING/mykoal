import ArticleLayout, { type TocItem } from "@/components/learn/article-layout";
import {
  ArticleSection,
  P,
  SourceLink,
  StatCallout,
  ComparisonTable,
} from "@/components/learn/article-content";
import type { FAQ } from "@/lib/schema";

const SLUG = "heloc-vs-cash-out-refinance";

const toc: TocItem[] = [
  { id: "compare", label: "HELOC vs. cash-out at a glance" },
  { id: "what-is-heloc", label: "What is a HELOC?" },
  { id: "what-is-cash-out", label: "What is a cash-out refinance?" },
  { id: "heloc-better", label: "When a HELOC usually makes more sense" },
  { id: "cash-out-better", label: "When a cash-out usually makes more sense" },
  { id: "real-cost", label: "How to compare the real cost" },
  { id: "questions", label: "Questions to ask before choosing" },
];

const faqs: FAQ[] = [
  {
    question: "Is a HELOC or a cash-out refinance cheaper?",
    answer:
      "It depends on your situation. A cash-out refinance usually has higher upfront closing costs because it replaces your entire mortgage, while a HELOC often has lower upfront costs but a variable rate that can rise over time. The cheaper option over the life of the loan depends on your current mortgage rate, how much you borrow, and how long you keep the balance. Comparing the total cost — not just the rate — is the only way to know.",
  },
  {
    question: "Does a HELOC replace my first mortgage?",
    answer:
      "No. A HELOC is a second loan that sits behind your existing first mortgage, so you keep your current mortgage and its rate untouched. A cash-out refinance is different — it pays off and replaces your first mortgage with a new, larger loan.",
  },
  {
    question: "Can I get a HELOC and keep my low mortgage rate?",
    answer:
      "Yes. Because a HELOC is a separate second lien, it lets you access equity without disturbing the rate on your first mortgage. That is one of the main reasons borrowers with a low existing rate often prefer a HELOC over a cash-out refinance.",
  },
  {
    question: "How much equity do I need to borrow against my home?",
    answer:
      "Most lenders want you to keep some equity in the home after you borrow, so your available amount is based on your home's value minus what you owe. The exact limit varies by lender and program and is subject to a full application review, so the best way to find your number is to have it calculated for your specific property.",
  },
  {
    question: "Are HELOC rates fixed or variable?",
    answer:
      "Most HELOCs carry a variable rate tied to an index such as the prime rate, which means your payment can change over time. Some lenders offer the option to lock a portion of your balance at a fixed rate. A cash-out refinance, by contrast, is typically a fixed-rate loan with a predictable payment.",
  },
  {
    question: "Can I use either option for an investment property?",
    answer:
      "Both can sometimes be used on investment properties, but guidelines are stricter and availability is more limited than on a primary residence. Many programs require more equity and a stronger credit profile for non-owner-occupied homes. For investors, a DSCR loan may also be worth comparing.",
  },
  {
    question: "Which is better for debt consolidation?",
    answer:
      "Either can work. A cash-out refinance can roll everything into one fixed payment, which some borrowers prefer for simplicity, while a HELOC lets you draw only what you need and pay interest on just that amount. The right choice depends on your current mortgage rate and how disciplined you want the payoff structure to be.",
  },
];

export default function HelocVsCashOutRefinance() {
  return (
    <ArticleLayout
      slug={SLUG}
      category={{ id: "heloc", name: "HELOC & Home Equity" }}
      title="HELOC vs. Cash-Out Refinance: Which Is Better?"
      description="HELOC vs. cash-out refinance compared side by side — keep your mortgage or replace it, closing costs, payment structure, and which fits a low existing rate."
      datePublished="2026-06-12"
      dateModified="2026-06-12"
      displayDate="June 12, 2026"
      shortAnswer={
        <>
          A HELOC usually makes more sense when you want to keep a low existing mortgage
          rate and borrow flexibly, while a cash-out refinance usually makes more sense
          when today's rate is at or below your current rate and you want one fixed
          payment. The right choice comes down to your current rate, how much you need,
          and whether you prefer flexible access or a single predictable payment.
        </>
      }
      toc={toc}
      faqs={faqs}
      related={["when-does-refinancing-make-sense", "va-cash-out-refinance"]}
      cta={{
        heading: "Compare your HELOC options",
        body: "See real HELOC options matched to your equity and goals — subject to a full application review.",
        funnel: "heloc",
        label: "Explore HELOC options",
      }}
    >
      <ArticleSection id="compare" heading="HELOC vs. cash-out at a glance">
        <P>
          Both let you turn home equity into cash, but they work in opposite ways. Here is
          the side-by-side comparison most borrowers care about.
        </P>
        <ComparisonTable
          rowHeader="Consideration"
          columns={[
            { key: "heloc", label: "HELOC" },
            { key: "cashout", label: "Cash-out refinance" },
          ]}
          rows={[
            {
              label: "Keeps your current first mortgage?",
              values: { heloc: "Yes — sits behind it", cashout: "No" },
            },
            {
              label: "Replaces your current mortgage?",
              values: { heloc: "No", cashout: "Yes — new, larger loan" },
            },
            {
              label: "Best when your current rate is low?",
              values: { heloc: "Often a strong fit", cashout: "Usually not ideal" },
            },
            {
              label: "Closing cost profile",
              values: {
                heloc: "Typically lower upfront",
                cashout: "Typically higher upfront",
              },
            },
            {
              label: "Access to funds",
              values: {
                heloc: "Revolving — draw as needed",
                cashout: "Lump sum at closing",
              },
            },
            {
              label: "Monthly payment structure",
              values: {
                heloc: "Often variable; can change",
                cashout: "Usually fixed and predictable",
              },
            },
            {
              label: "Main risk to weigh",
              values: {
                heloc: "Rising variable payment",
                cashout: "Resetting your mortgage term",
              },
            },
          ]}
        />
        <P>
          Figures like rates and closing costs vary by lender and program and are subject
          to a full application review — the table above compares structure, not pricing.
        </P>
      </ArticleSection>

      <ArticleSection id="what-is-heloc" heading="What is a HELOC?">
        <P>
          A HELOC — home equity line of credit — is a revolving line of credit secured by
          your home, similar in feel to a credit card. During the draw period you can
          borrow, repay, and borrow again up to your limit, then you enter a repayment
          period. Because it is a second lien, it sits behind your existing first mortgage
          and leaves that loan untouched.
        </P>
        <StatCallout>
          The Consumer Financial Protection Bureau describes a HELOC as a loan in which
          "your home is being used as collateral," which means the lender can foreclose if
          you do not keep up with payments.{" "}
          <SourceLink href="https://www.consumerfinance.gov/" source="cfpb">
            Source: CFPB
          </SourceLink>
        </StatCallout>
        <P>
          That flexibility is the HELOC's biggest strength: you pay interest only on what
          you actually draw, which suits expenses that arrive over time, like a phased
          renovation.
        </P>
      </ArticleSection>

      <ArticleSection id="what-is-cash-out" heading="What is a cash-out refinance?">
        <P>
          A cash-out refinance replaces your existing mortgage with a new, larger loan and
          gives you the difference in cash at closing. You end up with one mortgage and one
          payment, and because it is typically a fixed-rate loan, that payment is usually
          predictable for the life of the loan.
        </P>
        <P>
          The trade-off is that you are resetting your first mortgage. If your current rate
          is well below today's market, replacing it can mean giving up a rate you would
          rather keep. Closing costs also apply, since you are originating a brand-new first
          mortgage.
        </P>
      </ArticleSection>

      <ArticleSection id="heloc-better" heading="When a HELOC usually makes more sense">
        <P>A HELOC is often the better fit when:</P>
        <ul className="list-disc pl-5 space-y-1.5 text-blue-100/80 text-sm">
          <li>
            Your current mortgage rate is low and you do not want to give it up.
          </li>
          <li>
            You need flexible access to funds over time rather than one lump sum.
          </li>
          <li>
            You want to keep upfront costs down and may not borrow the full amount.
          </li>
          <li>
            You expect to pay the balance back relatively quickly.
          </li>
        </ul>
      </ArticleSection>

      <ArticleSection id="cash-out-better" heading="When a cash-out usually makes more sense">
        <P>A cash-out refinance is often the better fit when:</P>
        <ul className="list-disc pl-5 space-y-1.5 text-blue-100/80 text-sm">
          <li>
            Today's rate is at or below your current rate, so refinancing is not a step
            backward.
          </li>
          <li>
            You want one fixed payment instead of a variable second payment.
          </li>
          <li>
            You need a larger lump sum for a defined purpose, such as a major project or
            consolidating higher-interest debt.
          </li>
          <li>
            Long-term payment predictability matters more to you than flexibility.
          </li>
        </ul>
      </ArticleSection>

      <ArticleSection id="real-cost" heading="How to compare the real cost">
        <P>
          Do not compare on the rate alone. To see the true cost of each option, look at the
          full picture: upfront closing costs, how the payment can change over time, how long
          you plan to keep the balance, and the total interest you would pay across that
          period.
        </P>
        <P>
          A HELOC with a lower upfront cost but a variable rate can become more expensive than
          a fixed cash-out if rates rise and you carry the balance for years. A cash-out with
          higher upfront costs can still win if it locks a payment you keep for a long time.
          Running both scenarios side by side on your actual numbers is the only reliable way
          to compare.
        </P>
      </ArticleSection>

      <ArticleSection id="questions" heading="Questions to ask before choosing">
        <ul className="list-disc pl-5 space-y-1.5 text-blue-100/80 text-sm">
          <li>What is my current mortgage rate, and how does it compare to today's?</li>
          <li>Do I need all the money at once, or over time?</li>
          <li>How long do I realistically plan to carry this balance?</li>
          <li>Can my budget absorb a payment that could rise on a variable HELOC?</li>
          <li>What are the all-in upfront costs of each option for my loan amount?</li>
          <li>How does each choice affect my long-term financial plan?</li>
        </ul>
      </ArticleSection>
    </ArticleLayout>
  );
}
